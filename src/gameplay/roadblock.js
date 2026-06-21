import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// Cached fence components to avoid dynamic canvas texture allocation and duplicate geometries
let sharedFenceMat = null;
let sharedLegMat = null;
let sharedBarGeo = null;
let sharedLegGeo = null;

function getSharedFenceMat() {
  if (!sharedFenceMat) {
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
    sharedFenceMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8 });
  }
  return sharedFenceMat;
}

function getSharedLegMat() {
  if (!sharedLegMat) {
    sharedLegMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.5 });
  }
  return sharedLegMat;
}

function getSharedBarGeo() {
  if (!sharedBarGeo) {
    sharedBarGeo = new THREE.BoxGeometry(4.5, 0.5, 0.2);
  }
  return sharedBarGeo;
}

function getSharedLegGeo() {
  if (!sharedLegGeo) {
    sharedLegGeo = new THREE.BoxGeometry(0.3, 1.2, 0.8);
  }
  return sharedLegGeo;
}

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
    // 1. Spawning 2 parked cop cars blocking the lanes (Staggered longitudinally: "aage piche", parallel to road)
    // Left lane: Cop car 1 at X = -5.0, Z = -4.5 (facing forward, angled slightly)
    // Right lane: Cop car 2 at X = 5.0, Z = 4.5 (facing backward, angled slightly)
    
    // Cop car 1 (left lane)
    const { carGroup: cop1Group } = this.app.createVoxelCarMesh(0x000000, 'cop');
    cop1Group.position.set(-5.0, 0.15, -4.5);
    cop1Group.rotation.y = 0.1; // angled slightly along the lane
    this.meshGroup.add(cop1Group);

    // Cop car 2 (right lane)
    const { carGroup: cop2Group } = this.app.createVoxelCarMesh(0x000000, 'cop');
    cop2Group.position.set(5.0, 0.15, 4.5);
    cop2Group.rotation.y = Math.PI - 0.1; // angled slightly, facing player oncoming
    this.meshGroup.add(cop2Group);

    // Concrete barrier in the center (Z = 0)
    const barrierMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.8 });
    const barrierGeo = new THREE.BoxGeometry(4.0, 1.4, 1.5);
    const barrierMesh = new THREE.Mesh(barrierGeo, barrierMat);
    barrierMesh.position.set(0, 0.7, 0);
    barrierMesh.castShadow = true;
    barrierMesh.receiveShadow = true;
    this.meshGroup.add(barrierMesh);

    // 2. Spawn wooden fences on the sidewalks with full physical collision and breakability
    // We compute their world positions and add them directly to the main breakables system so they can fly/spin!
    const fenceOffset = 16.0;
    const cosH = Math.cos(this.heading);
    const sinH = Math.sin(this.heading);

    // Left Fence
    const fenceL = this.createFenceMesh();
    // In local space left fence is at X = -16.0, Z = 0
    const localX_L = -fenceOffset;
    const localZ_L = 0;
    const worldX_L = this.position.x + localX_L * cosH + localZ_L * sinH;
    const worldZ_L = this.position.z - localX_L * sinH + localZ_L * cosH;
    const worldY_L = 0.0 + this.app.world.getBaseHeight(worldX_L, worldZ_L);
    
    fenceL.position.set(worldX_L, worldY_L, worldZ_L);
    fenceL.rotation.y = this.heading;
    this.app.scene.add(fenceL);

    const breakableL = {
      position: new THREE.Vector3(worldX_L, worldY_L + 0.6, worldZ_L),
      group: fenceL,
      broken: false,
      radius: 2.2,
      velocity: new THREE.Vector3(),
      angularVelocity: new THREE.Vector3(),
      fadeTimer: 10.0,
      comHeight: 0.6,
      type: 'fence',
      lights: [],
      flares: [],
      poolMeshes: []
    };
    this.app.world.breakables.push(breakableL);
    this.fences.push(breakableL);

    // Right Fence
    const fenceR = this.createFenceMesh();
    // In local space right fence is at X = 16.0, Z = 0
    const localX_R = fenceOffset;
    const localZ_R = 0;
    const worldX_R = this.position.x + localX_R * cosH + localZ_R * sinH;
    const worldZ_R = this.position.z - localX_R * sinH + localZ_R * cosH;
    const worldY_R = 0.0 + this.app.world.getBaseHeight(worldX_R, worldZ_R);
    
    fenceR.position.set(worldX_R, worldY_R, worldZ_R);
    fenceR.rotation.y = this.heading;
    this.app.scene.add(fenceR);

    const breakableR = {
      position: new THREE.Vector3(worldX_R, worldY_R + 0.6, worldZ_R),
      group: fenceR,
      broken: false,
      radius: 2.2,
      velocity: new THREE.Vector3(),
      angularVelocity: new THREE.Vector3(),
      fadeTimer: 10.0,
      comHeight: 0.6,
      type: 'fence',
      lights: [],
      flares: [],
      poolMeshes: []
    };
    this.app.world.breakables.push(breakableR);
    this.fences.push(breakableR);

    // 3. Register solid obstacles in world.obstacles for the cop cars & concrete barrier
    // Covering both cars in their new staggered positions (length: 13.0m along road)
    this.addWorldObstacle(0, 0, 24.0, 13.0, 2.5);
  }

  createFenceMesh() {
    const group = new THREE.Group();
    
    const barMesh = new THREE.Mesh(getSharedBarGeo(), getSharedFenceMat());
    barMesh.position.y = 1.0;
    barMesh.castShadow = true;
    group.add(barMesh);

    // Legs
    const legL = new THREE.Mesh(getSharedLegGeo(), getSharedLegMat());
    legL.position.set(-2.0, 0.6, 0);
    legL.castShadow = true;
    group.add(legL);

    const legR = new THREE.Mesh(getSharedLegGeo(), getSharedLegMat());
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

      // Update baked headlight pool based on distance to player
      if (child.name === "headlightPool") {
        const worldPos = new THREE.Vector3();
        child.getWorldPosition(worldPos);
        const dist = worldPos.distanceTo(playerPos);
        if (dist <= 80.0) {
          child.material.opacity = 0.0;
        } else if (dist >= 120.0) {
          child.material.opacity = 0.35;
        } else {
          const t = (dist - 80.0) / 40.0;
          const smoothT = t * t * (3.0 - 2.0 * t);
          child.material.opacity = 0.35 * smoothT;
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

    // Clean up fences if they aren't broken yet
    this.fences.forEach(fence => {
      if (!fence.broken) {
        this.app.scene.remove(fence.group);
        fence.shouldRemove = true;
      }
    });

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
