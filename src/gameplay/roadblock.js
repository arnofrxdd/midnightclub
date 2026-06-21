import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export class Roadblock {
  constructor(id, tileX, tileZ, position, heading, isVertical, app) {
    this.id = id;
    this.tileX = tileX;
    this.tileZ = tileZ;
    this.position = position.clone();
    this.heading = heading;
    this.isVertical = isVertical;
    this.app = app;
    this.active = true;

    this.meshGroup = new THREE.Group();
    this.meshGroup.position.copy(this.position);
    this.meshGroup.rotation.y = this.heading;
    this.app.scene.add(this.meshGroup);

    this.fences = []; // { mesh, localX, localZ, broken: false }
    this.obstacles = []; // Registered AABBs

    this.buildRoadblock();
  }

  buildRoadblock() {
    // 1. Spawning 2 parked cop cars blocking the lanes
    // In local coordinates:
    // Left lane: X = -5.5
    // Right lane: X = 5.5
    // Concrete barrier in center: X = 0
    // Sidewalk fences at X = -16.0 and X = 16.0
    
    // Cop car 1 (left lane)
    const { carGroup: cop1Group } = this.app.createVoxelCarMesh(0x000000, 'cop');
    cop1Group.position.set(-5.5, 0.15, 0);
    cop1Group.rotation.y = 0.2; // angled slightly
    this.meshGroup.add(cop1Group);

    // Cop car 2 (right lane)
    const { carGroup: cop2Group } = this.app.createVoxelCarMesh(0x000000, 'cop');
    cop2Group.position.set(5.5, 0.15, 0);
    cop2Group.rotation.y = -0.2; // angled slightly
    this.meshGroup.add(cop2Group);

    // Concrete barrier in the center
    const barrierMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.8 });
    const barrierGeo = new THREE.BoxGeometry(4.0, 1.4, 1.5);
    const barrierMesh = new THREE.Mesh(barrierGeo, barrierMat);
    barrierMesh.position.set(0, 0.7, 0);
    barrierMesh.castShadow = true;
    barrierMesh.receiveShadow = true;
    this.meshGroup.add(barrierMesh);

    // 2. Spawn wooden fences on the sidewalks
    // Fence left
    const fenceL = this.createFenceMesh();
    fenceL.position.set(-16.0, 0.0, 0);
    this.meshGroup.add(fenceL);
    this.fences.push({ mesh: fenceL, localX: -16.0, localZ: 0, broken: false });

    // Fence right
    const fenceR = this.createFenceMesh();
    fenceR.position.set(16.0, 0.0, 0);
    this.meshGroup.add(fenceR);
    this.fences.push({ mesh: fenceR, localX: 16.0, localZ: 0, broken: false });

    // 3. Register solid obstacles in world.obstacles for the cop cars & concrete barrier
    // The lanes are blocked from X = -12.0 to X = 12.0.
    // Size of lane block: sx = 24.0, sz = 4.0, height = 2.5
    this.addWorldObstacle(0, 0, 24.0, 4.0, 2.5);
  }

  createFenceMesh() {
    const group = new THREE.Group();
    
    // Horizontal bar (striped red/white)
    const barGeo = new THREE.BoxGeometry(4.5, 0.5, 0.2);
    
    // Create canvas texture for stripes
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 64, 16);
    ctx.fillStyle = '#ff3333';
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 16, 16);
      ctx.lineTo(i * 16 + 8, 16);
      ctx.lineTo(i * 16 + 16, 0);
      ctx.lineTo(i * 16 + 8, 0);
      ctx.closePath();
      ctx.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    
    const barMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8 });
    const barMesh = new THREE.Mesh(barGeo, barMat);
    barMesh.position.y = 1.0;
    barMesh.castShadow = true;
    group.add(barMesh);

    // Legs
    const legMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.5 });
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, 0.8), legMat);
    legL.position.set(-2.0, 0.6, 0);
    legL.castShadow = true;
    group.add(legL);

    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, 0.8), legMat);
    legR.position.set(2.0, 0.6, 0);
    legR.castShadow = true;
    group.add(legR);

    return group;
  }

  addWorldObstacle(lx, lz, sx, sz, height) {
    let worldX = this.position.x;
    let worldZ = this.position.z;
    let finalSx = sx;
    let finalSz = sz;

    if (this.isVertical) {
      // Runs along Z, so local X runs across Z (world X).
      worldX += lx;
      worldZ += lz;
    } else {
      // Runs along X, so local X runs across X (world Z).
      worldX += lz;
      worldZ += lx;
      finalSx = sz;
      finalSz = sx;
    }

    const obs = {
      xMin: worldX - finalSx/2,
      xMax: worldX + finalSx/2,
      zMin: worldZ - finalSz/2,
      zMax: worldZ + finalSz/2,
      height: height
    };

    this.obstacles.push(obs);
    this.app.world.obstacles.push(obs);

    // Insert into spatial hash grid
    const cs = this.app.world.spatialCellSize;
    const x0 = Math.floor(obs.xMin / cs);
    const x1 = Math.floor(obs.xMax / cs);
    const z0 = Math.floor(obs.zMin / cs);
    const z1 = Math.floor(obs.zMax / cs);
    for (let cx = x0; cx <= x1; cx++) {
      for (let cz = z0; cz <= z1; cz++) {
        const k = `${cx},${cz}`;
        if (!this.app.world.obstacleGrid.has(k)) {
          this.app.world.obstacleGrid.set(k, []);
        }
        this.app.world.obstacleGrid.get(k).push(obs);
      }
    }
  }

  update(dt, playerPos) {
    // 1. Flash siren bar lights on cop cars inside roadblock meshGroup
    const flashState = (Math.floor(Date.now() / 250) % 2 === 0);
    this.meshGroup.traverse(child => {
      if (child.isMesh) {
        if (child.name === "sirenBlue") {
          child.material.emissiveIntensity = flashState ? 0.05 : 6.0;
        } else if (child.name === "sirenRed") {
          child.material.emissiveIntensity = flashState ? 6.0 : 0.05;
        }
      }
    });

    // 2. Check collision with breakable fences
    this.fences.forEach(fence => {
      if (fence.broken) return;

      // Compute world position of this fence
      let fWorldX = this.position.x;
      let fWorldZ = this.position.z;
      if (this.isVertical) {
        fWorldX += fence.localX;
        fWorldZ += fence.localZ;
      } else {
        fWorldX += fence.localZ;
        fWorldZ += fence.localX;
      }

      const fencePos = new THREE.Vector3(fWorldX, 0.5 + this.app.world.getBaseHeight(fWorldX, fWorldZ), fWorldZ);
      const dist = playerPos.distanceTo(fencePos);

      // If player crashes through the fence (within 3.5m)
      if (dist < 3.5) {
        fence.broken = true;
        
        // Remove fence mesh visually
        this.meshGroup.remove(fence.mesh);

        // Spawn wood splinter particles!
        if (typeof this.app.spawnParticles === 'function') {
          const dir = playerPos.clone().sub(fencePos).normalize();
          this.app.spawnParticles(fencePos, dir, 0xd2a679, 12);
        }
      }
    });
  }

  cleanup() {
    if (this.meshGroup) {
      this.meshGroup.traverse(child => {
        if (child.isMesh && child.geometry) child.geometry.dispose();
      });
      this.app.scene.remove(this.meshGroup);
    }

    // Remove solid obstacles
    const obsSet = new Set(this.obstacles);
    this.app.world.obstacles = this.app.world.obstacles.filter(obs => !obsSet.has(obs));

    // Remove from spatial hash grid
    const cs = this.app.world.spatialCellSize;
    for (const obs of this.obstacles) {
      const x0 = Math.floor(obs.xMin / cs);
      const x1 = Math.floor(obs.xMax / cs);
      const z0 = Math.floor(obs.zMin / cs);
      const z1 = Math.floor(obs.zMax / cs);
      for (let cx = x0; cx <= x1; cx++) {
        for (let cz = z0; cz <= z1; cz++) {
          const k = `${cx},${cz}`;
          const cell = this.app.world.obstacleGrid.get(k);
          if (cell) {
            const idx = cell.indexOf(obs);
            if (idx !== -1) cell.splice(idx, 1);
            if (cell.length === 0) this.app.world.obstacleGrid.delete(k);
          }
        }
      }
    }
  }
}
