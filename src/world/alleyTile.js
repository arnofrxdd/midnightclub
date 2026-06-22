import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export function buildAlleyTile(gridX, gridZ, posX, posZ, group, obstacles, lights) {
    const matIndex = Math.abs(gridX * 17 + gridZ * 23) % this.asphaltMaterials.length;
    const chosenMat = this.asphaltMaterials[matIndex];

    // Alley floor: dark gritty concrete or asphalt (using high-quality asphalt materials)
    const floorGeo = new THREE.BoxGeometry(this.tileSize, 0.2, this.tileSize, 8, 1, 8);
    floorGeo.translate(posX, 0.1, posZ);
    this.deformGeometryToHills(floorGeo, 0, 0);

    // Shift UV mapping deterministically to prevent puddle/texture repetition
    const ox = Math.abs((gridX * 0.317 + gridZ * 0.713) % 1.0);
    const oy = Math.abs((gridX * 0.893 + gridZ * 0.149) % 1.0);
    const uvs = floorGeo.attributes.uv;
    for (let i = 0; i < uvs.count; i++) {
      uvs.setXY(i, uvs.getX(i) + ox, uvs.getY(i) + oy);
    }
    uvs.needsUpdate = true;

    const floorMesh = new THREE.Mesh(floorGeo, chosenMat);
    floorMesh.receiveShadow = true;
    group.add(floorMesh);

    const isNS = this.shortcutColumns.has(gridX);
    const isEW = this.shortcutRows.has(gridZ);

    const seed = Math.sin(gridX * 12.9898 + gridZ * 78.233) * 43758.5453;
    const rand = seed - Math.floor(seed);

    const addBox = (lx, lz, sx, sy, sz) => {
      const h = this.getBaseHeight(posX + lx, posZ + lz);
      const boxGeo = new THREE.BoxGeometry(sx, sy, sz);
      boxGeo.translate(posX + lx, 0.35 + h + sy/2, posZ + lz);
      const boxMesh = new THREE.Mesh(boxGeo, this.doorMat); // Wooden crate style
      boxMesh.castShadow = true;
      boxMesh.receiveShadow = true;
      group.add(boxMesh);
      obstacles.push({
        xMin: posX + lx - sx/2,
        xMax: posX + lx + sx/2,
        zMin: posZ + lz - sz/2,
        zMax: posZ + lz + sz/2,
        height: sy
      });
    };

    const addTrashBin = (lx, lz) => {
      const h = this.getBaseHeight(posX + lx, posZ + lz);
      const binGeo = new THREE.BoxGeometry(1.4, 2.2, 1.4);
      binGeo.translate(posX + lx, 0.35 + h + 1.1, posZ + lz);
      const binMesh = new THREE.Mesh(binGeo, this.accessoryMat); // Metallic grey bin
      binMesh.castShadow = true;
      binMesh.receiveShadow = true;
      group.add(binMesh);
      obstacles.push({
        xMin: posX + lx - 0.7,
        xMax: posX + lx + 0.7,
        zMin: posZ + lz - 0.7,
        zMax: posZ + lz + 0.7,
        height: 2.2
      });
    };

    const addDumpster = (lx, lz, rotationY = 0) => {
      const h = this.getBaseHeight(posX + lx, posZ + lz);
      if (Math.abs(h) > 0.1) return;
      const dumpsterGroup = new THREE.Group();
      
      // Dumpster Body
      const bodyGeo = new THREE.BoxGeometry(3.2, 2.2, 2.0);
      const bodyMesh = new THREE.Mesh(bodyGeo, this.dumpsterMat);
      bodyMesh.position.y = 1.1;
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      dumpsterGroup.add(bodyMesh);

      // Dumpster Lid
      const lidGeo = new THREE.BoxGeometry(3.4, 0.15, 2.1);
      const lidMesh = new THREE.Mesh(lidGeo, this.trashBagMat);
      lidMesh.position.y = 2.2 + 0.075;
      lidMesh.castShadow = true;
      dumpsterGroup.add(lidMesh);

      dumpsterGroup.position.set(posX + lx, 0.35 + h, posZ + lz);
      dumpsterGroup.rotation.y = rotationY;
      group.add(dumpsterGroup);

      obstacles.push({
        xMin: posX + lx - 1.7,
        xMax: posX + lx + 1.7,
        zMin: posZ + lz - 1.1,
        zMax: posZ + lz + 1.1,
        height: 2.5
      });
    };

    const addCardboardBoxes = (lx, lz) => {
      const h = this.getBaseHeight(posX + lx, posZ + lz);
      if (Math.abs(h) > 0.1) return;
      // Base box
      const box1Geo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
      const box1 = new THREE.Mesh(box1Geo, this.cardboardMat);
      box1.position.set(posX + lx, 0.35 + h + 0.8, posZ + lz);
      box1.rotation.y = rand * 2.0;
      box1.castShadow = true;
      box1.receiveShadow = true;
      group.add(box1);

      // Stacked box on top (slightly smaller and rotated)
      if (rand > 0.45) {
        const box2Geo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
        const box2 = new THREE.Mesh(box2Geo, this.cardboardMat);
        box2.position.set(posX + lx + (rand - 0.5) * 0.4, 0.35 + h + 1.6 + 0.6, posZ + lz + (rand - 0.5) * 0.4);
        box2.rotation.y = (rand + 1) * 3.5;
        box2.castShadow = true;
        group.add(box2);
      }

      obstacles.push({
        xMin: posX + lx - 0.9,
        xMax: posX + lx + 0.9,
        zMin: posZ + lz - 0.9,
        zMax: posZ + lz + 0.9,
        height: 2.8
      });
    };

    const addTrashBags = (lx, lz) => {
      const h = this.getBaseHeight(posX + lx, posZ + lz);
      if (Math.abs(h) > 0.1) return;
      const numBags = 2 + Math.floor(rand * 2);
      for (let i = 0; i < numBags; i++) {
        const size = 0.8 + (i * 0.15);
        const bagGeo = new THREE.BoxGeometry(size, size, size);
        const bag = new THREE.Mesh(bagGeo, this.trashBagMat);
        
        const offsetX = (i === 0 ? 0 : (i === 1 ? 0.6 : -0.6)) + (rand - 0.5) * 0.2;
        const offsetZ = (i === 0 ? 0 : (i === 1 ? -0.4 : 0.5)) + (rand - 0.5) * 0.2;
        
        bag.position.set(posX + lx + offsetX, 0.35 + h + size/2, posZ + lz + offsetZ);
        bag.rotation.set(rand * 2.0, rand * 3.0, rand * 1.5);
        bag.castShadow = true;
        group.add(bag);
      }
      
      obstacles.push({
        xMin: posX + lx - 1.2,
        xMax: posX + lx + 1.2,
        zMin: posZ + lz - 1.2,
        zMax: posZ + lz + 1.2,
        height: 1.2
      });
    };

    const addUtilityPole = (lx, lz) => {
      const h = this.getBaseHeight(posX + lx, posZ + lz);
      if (Math.abs(h) > 0.1) return;
      const poleGroup = new THREE.Group();

      // Main wooden vertical pole
      const poleGeo = new THREE.BoxGeometry(0.6, 9.5, 0.6);
      const pole = new THREE.Mesh(poleGeo, this.woodPoleMat);
      pole.position.y = 4.75;
      pole.castShadow = true;
      pole.receiveShadow = true;
      poleGroup.add(pole);

      // Horizontal crossbar
      const crossGeo = new THREE.BoxGeometry(2.4, 0.3, 0.4);
      const cross = new THREE.Mesh(crossGeo, this.woodPoleMat);
      cross.position.set(0, 8.5, 0);
      cross.castShadow = true;
      poleGroup.add(cross);

      // Metal fixture hanging down
      const fixtureGeo = new THREE.BoxGeometry(0.8, 0.5, 0.8);
      const fixture = new THREE.Mesh(fixtureGeo, this.accessoryMat);
      fixture.position.set(0, 8.1, 0);
      poleGroup.add(fixture);

      // Emissive bulb
      const bulbGeo = new THREE.BoxGeometry(0.4, 0.3, 0.4);
      const bulb = new THREE.Mesh(bulbGeo, this.streetlightBulbMat);
      bulb.position.set(0, 7.8, 0);
      poleGroup.add(bulb);

      // Volumetric light cone
      const coneMesh = new THREE.Mesh(this.lightConeGeo, this.lightConeMatSodium);
      coneMesh.position.set(0, 3.9, 0);
      coneMesh.name = "lightCone";
      poleGroup.add(coneMesh);

      // Glowing lens flare sprite
      const flare = new THREE.Sprite(new THREE.SpriteMaterial({
        map: this.slFlareTex,
        color: 0xffaa44,
        transparent: true,
        opacity: 0.70,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      }));
      flare.position.set(0, 7.8, 0);
      flare.scale.set(3.8, 3.8, 1.0);
      poleGroup.add(flare);

      poleGroup.position.set(posX + lx, 0.35 + h, posZ + lz);
      group.add(poleGroup);

      // Baked ground light pool under utility pole
      const poolMesh = new THREE.Mesh(
        this.alleyLightPoolGeo,
        this.sodiumGroundLightPoolMat.clone()
      );
      poolMesh.position.set(posX + lx, 0.36 + h, posZ + lz);
      group.add(poolMesh);

      // Add a working point light
      lights.push({
        x: posX + lx,
        y: 8.0 + h,
        z: posZ + lz,
        intensity: 15.0, // Boosted to make it feel bright in the dark alley
        color: 0xffaa44, // Warm amber/orange
        poolMesh: poolMesh,
        defaultOpacity: 0.35
      });

      obstacles.push({
        xMin: posX + lx - 0.4,
        xMax: posX + lx + 0.4,
        zMin: posZ + lz - 0.4,
        zMax: posZ + lz + 0.4,
        height: 9.5
      });
    };

    const addDumpsterRamp = (lx, lz, slopeType, slopeDir) => {
      // 1. Spawn Dumpster Group
      const dumpsterGroup = new THREE.Group();
      const h = this.getBaseHeight(posX + lx, posZ + lz);
      const bodyGeo = new THREE.BoxGeometry(3.2, 2.2, 2.0);
      const bodyMesh = new THREE.Mesh(bodyGeo, this.dumpsterMat);
      bodyMesh.position.y = 1.1;
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      dumpsterGroup.add(bodyMesh);

      const lidGeo = new THREE.BoxGeometry(3.4, 0.15, 2.1);
      const lidMesh = new THREE.Mesh(lidGeo, this.trashBagMat);
      lidMesh.position.y = 2.2 + 0.075;
      lidMesh.castShadow = true;
      dumpsterGroup.add(lidMesh);

      if (slopeType === 'X') {
        dumpsterGroup.rotation.y = Math.PI / 2;
      }
      dumpsterGroup.position.set(posX + lx, 0.35 + h, posZ + lz);
      group.add(dumpsterGroup);
      const plankGeo = new THREE.BoxGeometry(slopeType === 'Z' ? 2.6 : 3.4, 0.12, slopeType === 'Z' ? 3.4 : 2.6);
      const plankMesh = new THREE.Mesh(plankGeo, this.woodPoleMat);
      plankMesh.castShadow = true;
      plankMesh.receiveShadow = true;

      if (slopeType === 'Z') {
        if (slopeDir === 1) { // Slopes up along +Z (plank runs from south to north)
          plankMesh.rotation.x = Math.PI / 8.5;
          plankMesh.position.set(posX + lx, 0.35 + h + 0.95, posZ + lz - 2.0);
        } else { // Slopes up along -Z
          plankMesh.rotation.x = -Math.PI / 8.5;
          plankMesh.position.set(posX + lx, 0.35 + h + 0.95, posZ + lz + 2.0);
        }
      } else { // X Slope
        if (slopeDir === 1) { // Slopes up along +X
          plankMesh.rotation.z = -Math.PI / 8.5;
          plankMesh.position.set(posX + lx - 2.0, 0.35 + h + 0.95, posZ + lz);
        } else { // Slopes up along -X
          plankMesh.rotation.z = Math.PI / 8.5;
          plankMesh.position.set(posX + lx + 2.0, 0.35 + h + 0.95, posZ + lz);
        }
      }
      group.add(plankMesh);

      // 3. Register ramp obstacle
      const wX = slopeType === 'Z' ? 1.6 : 3.7;
      const wZ = slopeType === 'Z' ? 3.7 : 1.6;
      obstacles.push({
        xMin: posX + lx - wX,
        xMax: posX + lx + wX,
        zMin: posZ + lz - wZ,
        zMax: posZ + lz + wZ,
        height: 2.25,
        isRamp: true,
        slopeType: slopeType,
        slopeDir: slopeDir
      });
    };

    const addLogRamp = (lx, lz, slopeType, slopeDir) => {
      const logGroup = new THREE.Group();
      const h = this.getBaseHeight(posX + lx, posZ + lz);
      const numLogs = 4;
      const logLength = 3.2;
      const logRadius = 0.4;
      
      const logGeo = new THREE.CylinderGeometry(logRadius, logRadius, logLength, 8);
      if (slopeType === 'Z') {
        logGeo.rotateZ(Math.PI / 2);
      } else {
        logGeo.rotateX(Math.PI / 2);
      }

      for (let i = 0; i < numLogs; i++) {
        const stepVal = (i - 1.5) * 0.78 * slopeDir;
        const stepY = logRadius + i * 0.42;
        
        const logMesh = new THREE.Mesh(logGeo, this.woodPoleMat);
        if (slopeType === 'Z') {
          logMesh.position.set(0, stepY, stepVal);
        } else {
          logMesh.position.set(stepVal, stepY, 0);
        }
        logMesh.castShadow = true;
        logMesh.receiveShadow = true;
        logGroup.add(logMesh);
      }

      logGroup.position.set(posX + lx, 0.35 + h, posZ + lz);
      group.add(logGroup);

      // Register ramp obstacle
      obstacles.push({
        xMin: posX + lx - 1.6,
        xMax: posX + lx + 1.6,
        zMin: posZ + lz - 1.6,
        zMax: posZ + lz + 1.6,
        height: logRadius + numLogs * 0.42 + 0.1,
        isRamp: true,
        slopeType: slopeType,
        slopeDir: slopeDir
      });
    };

    if (isNS && !isEW) {
      // NS Alley: place props along left (lx = -13) and right (lx = 13) edges to keep center clear
      // Guaranteed Utility Pole for lighting on one side
      if (rand < 0.5) {
        addUtilityPole(-13, -8);
        addBox(13, 5, 2.5, 2.5, 2.5);
      } else {
        addUtilityPole(13, 8);
        addBox(-13, -8, 2.5, 2.5, 2.5);
      }

      // Decorative minor trash/cardboard details
      if (rand > 0.6) {
        addTrashBin(-13 * (rand < 0.5 ? -1 : 1), 2);
      } else {
        addTrashBags(-13 * (rand < 0.5 ? -1 : 1), 2);
      }
      if (rand > 0.3 && rand < 0.7) {
        addCardboardBoxes(13 * (rand < 0.5 ? -1 : 1), -4);
      }
    } else if (isEW && !isNS) {
      // EW Alley: place props along top (lz = -13) and bottom (lz = 13) edges to keep center clear
      // Guaranteed Utility Pole for lighting on one side
      if (rand < 0.5) {
        addUtilityPole(-8, -13);
        addBox(5, 13, 2.5, 2.5, 2.5);
      } else {
        addUtilityPole(8, 13);
        addBox(-8, -13, 2.5, 2.5, 2.5);
      }

      // Decorative minor trash/cardboard details
      if (rand > 0.6) {
        addTrashBin(2, -13 * (rand < 0.5 ? -1 : 1));
      } else {
        addTrashBags(2, -13 * (rand < 0.5 ? -1 : 1));
      }
      if (rand > 0.3 && rand < 0.7) {
        addCardboardBoxes(-4, 13 * (rand < 0.5 ? -1 : 1));
      }
    } else if (isNS && isEW) {
      // Alley-Alley Intersection: keep intersection center clear, place props in corners
      // Guaranteed Utility Pole for lighting in one corner
      if (rand < 0.5) {
        addUtilityPole(-13, 13);
        addTrashBags(13, -13);
      } else {
        addUtilityPole(13, -13);
        addTrashBags(-13, 13);
      }
    }
  }
