import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createDetailedWindowGeometry, applySidewalkUVs } from './geometry.js';

export function buildRoadTile(gridX, gridZ, posX, posZ, group, obstacles, lights) {
    const { rwX, rwZ } = this.getRoadWidthForGrid(gridX, gridZ);
    const isIntersection = this.roadColumns.has(gridX) && this.roadRows.has(gridZ);
    const roadWidth = this.roadRows.has(gridZ) ? rwZ : rwX;
    const sidewalkWidth = (this.tileSize - roadWidth) / 2;

    const matIndex = Math.abs(gridX * 17 + gridZ * 23) % this.asphaltMaterials.length;
    const chosenMat = this.asphaltMaterials[matIndex];

    // Shift UV mapping deterministically based on tile coords to prevent puddle repetition
    const randomizeRoadUVs = (roadGroup) => {
      const ox = Math.abs((gridX * 0.317 + gridZ * 0.713) % 1.0);
      const oy = Math.abs((gridX * 0.893 + gridZ * 0.149) % 1.0);
      
      roadGroup.traverse(child => {
        if (child.isMesh && (child.material === this.asphaltMat || this.asphaltMaterials.includes(child.material))) {
          child.material = chosenMat;
          child.geometry = child.geometry.clone();
          const uvs = child.geometry.attributes.uv;
          for (let i = 0; i < uvs.count; i++) {
            uvs.setXY(i, uvs.getX(i) + ox, uvs.getY(i) + oy);
          }
          uvs.needsUpdate = true;
        }
      });
    };

    const localPoles = [];
    const localBulbs = [];
    const localTrunks = [];
    const localLeaves = [];
    const localLeavesCherry = [];
    const localLeavesAutumn = [];

    const addTree = (tx, tz) => {
      const h = this.getBaseHeight(tx, tz);
      const trunkGeo = new THREE.BoxGeometry(0.8, 4.0, 0.8);
      trunkGeo.translate(tx, 2.35 + h, tz);
      localTrunks.push(trunkGeo);

      // Randomize tree style (Green, Cherry, Autumn)
      const tSeed = Math.sin(tx * 12.9898 + tz * 78.233) * 43758.5453;
      const tRand = tSeed - Math.floor(tSeed);
      const treeType = tRand > 0.85 ? 'cherry' : (tRand > 0.70 ? 'autumn' : 'normal');

      // Randomize tree shape (standard, pine, oak)
      let clusters = [];
      const shapeRand = (tRand * 10) % 1;
      if (shapeRand > 0.66) {
        // Pine shape
        clusters = [
          { size: 3.6, y: 3.5 },
          { size: 2.8, y: 4.3 },
          { size: 2.0, y: 5.1 },
          { size: 1.2, y: 5.9 }
        ];
      } else if (shapeRand > 0.33) {
        // Oak shape
        clusters = [
          { size: 3.5, y: 4.0 },
          { size: 3.5, y: 4.4 },
          { size: 2.8, y: 5.0 }
        ];
      } else {
        // Standard shape
        clusters = [
          { size: 3.5, y: 3.8 },
          { size: 2.8, y: 4.8 },
          { size: 1.8, y: 5.6 }
        ];
      }

      clusters.forEach(c => {
        const lg = new THREE.BoxGeometry(c.size, c.size * 0.85, c.size);
        lg.translate(tx, c.y + 0.35 + h, tz);
        
        if (treeType === 'cherry') {
          localLeavesCherry.push(lg);
        } else if (treeType === 'autumn') {
          localLeavesAutumn.push(lg);
        } else {
          localLeaves.push(lg);
        }
      });

      obstacles.push({
        xMin: tx - 0.4,
        xMax: tx + 0.4,
        zMin: tz - 0.4,
        zMax: tz + 0.4,
        height: 6
      });
    };

    const addFireHydrant = (fhx, fhz) => {
      const fh = this.templates.fireHydrant.clone();
      const h = this.getBaseHeight(fhx, fhz);
      fh.position.set(fhx, 0.35 + h, fhz);
      group.add(fh);
      obstacles.push({
        xMin: fhx - 0.25,
        xMax: fhx + 0.25,
        zMin: fhz - 0.25,
        zMax: fhz + 0.25,
        height: 1.0
      });
    };

    const addNewspaperBox = (nbx, nbz, rotY) => {
      const nb = this.templates.newspaperBox.clone();
      const h = this.getBaseHeight(nbx, nbz);
      nb.position.set(nbx, 0.35 + h, nbz);
      nb.rotation.y = rotY;
      group.add(nb);
      obstacles.push({
        xMin: nbx - 0.4,
        xMax: nbx + 0.4,
        zMin: nbz - 0.4,
        zMax: nbz + 0.4,
        height: 1.2
      });
    };

    const addBench = (bx, bz, rotY) => {
      const h = this.getBaseHeight(bx, bz);
      if (Math.abs(h) > 0.1) return;
      const bench = this.createBenchMesh();
      bench.position.set(bx, 0.6 + h, bz);
      bench.rotation.y = rotY;
      group.add(bench);
      
      this.breakables.push({
        type: 'bench',
        comHeight: 0.6,
        radius: 0.4,
        position: new THREE.Vector3(bx, 0.6 + h, bz),
        group: bench,
        flares: [],
        lights: [],
        broken: false,
        tileX: posX,
        tileZ: posZ,
        velocity: new THREE.Vector3(),
        angularVelocity: new THREE.Vector3()
      });
    };

    const addPhoneBooth = (pbx, pbz, rotY) => {
      const h = this.getBaseHeight(pbx, pbz);
      if (Math.abs(h) > 0.1) return;
      const pb = this.createPhoneBoothMesh();
      pb.position.set(pbx, 1.4 + h, pbz);
      pb.rotation.y = rotY;
      group.add(pb);
      
      this.breakables.push({
        type: 'phonebooth',
        comHeight: 1.4,
        radius: 0.6,
        position: new THREE.Vector3(pbx, 1.4 + h, pbz),
        group: pb,
        flares: [],
        lights: [],
        broken: false,
        tileX: posX,
        tileZ: posZ,
        velocity: new THREE.Vector3(),
        angularVelocity: new THREE.Vector3()
      });
    };

    const addTrashCan = (tcx, tcz) => {
      const h = this.getBaseHeight(tcx, tcz);
      if (Math.abs(h) > 0.1) return;
      const tc = this.createTrashCanMesh();
      tc.position.set(tcx, 0.5 + h, tcz);
      tc.rotation.y = Math.random() * Math.PI * 2;
      group.add(tc);
      
      this.breakables.push({
        type: 'trashcan',
        comHeight: 0.5,
        radius: 0.3,
        position: new THREE.Vector3(tcx, 0.5 + h, tcz),
        group: tc,
        flares: [],
        lights: [],
        broken: false,
        tileX: posX,
        tileZ: posZ,
        velocity: new THREE.Vector3(),
        angularVelocity: new THREE.Vector3()
      });
    };

    const addRoadRamp = (lx, lz, slopeType, slopeDir) => {
      const rampWidth = 4.2;
      const rampLength = 7.0;
      const rampHeight = 1.7;
      
      const rampGroup = new THREE.Group();
      
      const wedgeGeo = new THREE.BoxGeometry(
        slopeType === 'Z' ? rampWidth : rampLength,
        0.12,
        slopeType === 'Z' ? rampLength : rampWidth
      );
      
      const wedgeMesh = new THREE.Mesh(wedgeGeo, this.concreteMat);
      wedgeMesh.castShadow = true;
      wedgeMesh.receiveShadow = true;
      
      if (slopeType === 'Z') {
        if (slopeDir === 1) {
          wedgeMesh.rotation.x = Math.PI / 10;
          wedgeMesh.position.set(0, rampHeight / 2, -rampLength / 6);
        } else {
          wedgeMesh.rotation.x = -Math.PI / 10;
          wedgeMesh.position.set(0, rampHeight / 2, rampLength / 6);
        }
      } else {
        if (slopeDir === 1) {
          wedgeMesh.rotation.z = -Math.PI / 10;
          wedgeMesh.position.set(-rampLength / 6, rampHeight / 2, 0);
        } else {
          wedgeMesh.rotation.z = Math.PI / 10;
          wedgeMesh.position.set(rampLength / 6, rampHeight / 2, 0);
        }
      }
      rampGroup.add(wedgeMesh);

      const sideGeo = new THREE.BoxGeometry(
        slopeType === 'Z' ? 0.15 : rampLength,
        rampHeight,
        slopeType === 'Z' ? rampLength : 0.15
      );
      
      const side1 = new THREE.Mesh(sideGeo, this.asphaltMat);
      side1.position.set(
        slopeType === 'Z' ? -rampWidth / 2 + 0.075 : 0,
        rampHeight / 2,
        0
      );
      rampGroup.add(side1);

      const side2 = new THREE.Mesh(sideGeo, this.asphaltMat);
      side2.position.set(
        slopeType === 'Z' ? rampWidth / 2 - 0.075 : 0,
        rampHeight / 2,
        0
      );
      rampGroup.add(side2);

      const h = this.getBaseHeight(posX + lx, posZ + lz);
      rampGroup.position.set(posX + lx, 0.175 + h, posZ + lz);
      group.add(rampGroup);

      const wX = slopeType === 'Z' ? rampWidth / 2 : rampLength / 2;
      const wZ = slopeType === 'Z' ? rampLength / 2 : rampWidth / 2;
      
      obstacles.push({
        xMin: posX + lx - wX,
        xMax: posX + lx + wX,
        zMin: posZ + lz - wZ,
        zMax: posZ + lz + wZ,
        height: rampHeight + 0.35,
        isRamp: true,
        slopeType: slopeType,
        slopeDir: slopeDir
      });
    };

    if (isIntersection) {
      // Build dynamic intersection geometry matching rwX and rwZ
      const road = new THREE.Group();
      
      const asphaltGeo = new THREE.BoxGeometry(this.tileSize, 0.2, this.tileSize, 8, 1, 8);
      asphaltGeo.translate(0, 0.1, 0);
      this.deformGeometryToHills(asphaltGeo, posX, posZ);
      const asphalt = new THREE.Mesh(asphaltGeo, this.asphaltMat);
      asphalt.receiveShadow = true;
      road.add(asphalt);

      // Crosswalks
      const lineW = 0.5;
      const lineL = 5.0;
      const crosswalkWhiteGeoms = [];
      
      // North & South crosswalks (along the horizontal road of width rwZ)
      for (let offset = -rwX/2 + 2; offset <= rwX/2 - 2; offset += 3) {
        const gN = new THREE.BoxGeometry(lineL, 0.21, lineW, 4, 1, 1);
        gN.translate(offset, 0.11, -rwZ/2 - 1);
        crosswalkWhiteGeoms.push(gN);

        const gS = new THREE.BoxGeometry(lineL, 0.21, lineW, 4, 1, 1);
        gS.translate(offset, 0.11, rwZ/2 + 1);
        crosswalkWhiteGeoms.push(gS);
      }
      
      // West & East crosswalks (along the vertical road of width rwX)
      for (let offset = -rwZ/2 + 2; offset <= rwZ/2 - 2; offset += 3) {
        const gW = new THREE.BoxGeometry(lineW, 0.21, lineL, 1, 1, 4);
        gW.translate(-rwX/2 - 1, 0.11, offset);
        crosswalkWhiteGeoms.push(gW);

        const gE = new THREE.BoxGeometry(lineW, 0.21, lineL, 1, 1, 4);
        gE.translate(rwX/2 + 1, 0.11, offset);
        crosswalkWhiteGeoms.push(gE);
      }
      
      if (crosswalkWhiteGeoms.length > 0) {
        const mergedWhite = BufferGeometryUtils.mergeGeometries(crosswalkWhiteGeoms);
        this.deformGeometryToHills(mergedWhite, posX, posZ);
        road.add(new THREE.Mesh(mergedWhite, this.whiteLineMat));
      }

      // 4 Corner sidewalk slabs
      const swWidthX = 20 - rwX/2;
      const swWidthZ = 20 - rwZ/2;
      const concreteGeoms = [];
      if (swWidthX > 0 && swWidthZ > 0) {
        // NW Corner
        const slabNW = new THREE.BoxGeometry(swWidthX, 0.35, swWidthZ, 4, 1, 4);
        applySidewalkUVs(slabNW);
        slabNW.translate(-20 + swWidthX/2, 0.175, -20 + swWidthZ/2);
        concreteGeoms.push(slabNW);
        
        // NE Corner
        const slabNE = new THREE.BoxGeometry(swWidthX, 0.35, swWidthZ, 4, 1, 4);
        applySidewalkUVs(slabNE);
        slabNE.translate(20 - swWidthX/2, 0.175, -20 + swWidthZ/2);
        concreteGeoms.push(slabNE);
        
        // SW Corner
        const slabSW = new THREE.BoxGeometry(swWidthX, 0.35, swWidthZ, 4, 1, 4);
        applySidewalkUVs(slabSW);
        slabSW.translate(-20 + swWidthX/2, 0.175, 20 - swWidthZ/2);
        concreteGeoms.push(slabSW);
        
        // SE Corner
        const slabSE = new THREE.BoxGeometry(swWidthX, 0.35, swWidthZ, 4, 1, 4);
        applySidewalkUVs(slabSE);
        slabSE.translate(20 - swWidthX/2, 0.175, 20 - swWidthZ/2);
        concreteGeoms.push(slabSE);
      }
      
      if (concreteGeoms.length > 0) {
        const iMergedConcrete = BufferGeometryUtils.mergeGeometries(concreteGeoms);
        this.deformGeometryToHills(iMergedConcrete, posX, posZ);
        const iConcreteMesh = new THREE.Mesh(iMergedConcrete, this.concreteMat);
        iConcreteMesh.receiveShadow = true;
        road.add(iConcreteMesh);
      }

      randomizeRoadUVs(road);
      road.position.set(posX, 0, posZ);
      group.add(road);

      // Add streetlight poles on corners
      const corners = [
        [-rwX/2 - 1, -rwZ/2 - 1],
        [rwX/2 + 1, -rwZ/2 - 1],
        [-rwX/2 - 1, rwZ/2 + 1],
        [rwX/2 + 1, rwZ/2 + 1]
      ];
      corners.forEach(([ox, oz]) => {
        const slX = posX + ox;
        const slZ = posZ + oz;

        const slObject = new THREE.Group();
        const h = this.getBaseHeight(slX, slZ);
        slObject.position.set(slX, 4.25 + h, slZ); // Centered at Center of Mass (y=4.25)
        group.add(slObject);

        // Streetlight pole mesh (local coordinates relative to center of mass y=4.25)
        const pole = new THREE.Mesh(new THREE.BoxGeometry(0.3, 8.5, 0.3), this.streetlightPoleMat);
        pole.position.y = 0; // Centered at local origin
        pole.castShadow = true;
        slObject.add(pole);

        const armDirX = ox > 0 ? -1 : 1;
        const isLED = Math.sin(slX * 5.0 + slZ * 3.0) > 0.0;
        const lightColor = isLED ? 0xd2e5ff : 0xffd5a1;

        // Streetlight arm/handle
        const arm = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.15, 0.15), this.streetlightPoleMat);
        arm.position.set(armDirX * 0.65, 4.15, 0);
        arm.castShadow = true;
        slObject.add(arm);

        // Streetlight bulb mesh (local y offset is 8.4 - 4.25 = 4.15)
        const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.6), this.streetlightBulbMat);
        bulb.position.set(armDirX * 1.3, 4.15, 0);
        slObject.add(bulb);

        // Baked ground light pool under streetlight 1
        const poolMesh1 = new THREE.Mesh(
          this.lightPoolGeo,
          (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
        );
        poolMesh1.position.set(armDirX * 1.3, -3.89, 0);
        slObject.add(poolMesh1);

        // Double-arm variety (35% chance)
        const isDoubleArm = (Math.sin(slX * 1.2 + slZ * 2.8) - Math.floor(Math.sin(slX * 1.2 + slZ * 2.8))) > 0.65;
        const localFlares = [];
        const localLights = [];
        let poolMesh2 = null;

        if (isDoubleArm) {
          const arm2 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.15, 0.15), this.streetlightPoleMat);
          arm2.position.set(-armDirX * 0.65, 4.15, 0);
          arm2.castShadow = true;
          slObject.add(arm2);

          const bulb2 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.6), this.streetlightBulbMat);
          bulb2.position.set(-armDirX * 1.3, 4.15, 0);
          slObject.add(bulb2);

          // Baked ground light pool under streetlight 2
          poolMesh2 = new THREE.Mesh(
            this.lightPoolGeo,
            (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
          );
          poolMesh2.position.set(-armDirX * 1.3, -3.89, 0);
          slObject.add(poolMesh2);

          const flare2 = new THREE.Sprite(new THREE.SpriteMaterial({
            map: this.slFlareTex,
            color: lightColor,
            transparent: true,
            opacity: 0.70,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          }));
          flare2.position.set(-armDirX * 1.3, 4.15, 0);
          flare2.scale.set(3.8, 3.8, 1.0);
          slObject.add(flare2);
          localFlares.push(flare2);
        }

        // Add glowing lens flare sprite
        const flareSpriteMat = new THREE.SpriteMaterial({
          map: this.slFlareTex,
          color: lightColor,
          transparent: true,
          opacity: 0.70,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        const flare = new THREE.Sprite(flareSpriteMat);
        flare.position.set(armDirX * 1.3, 4.15, 0);
        flare.scale.set(3.8, 3.8, 1.0);
        slObject.add(flare);
        localFlares.push(flare);

        // Register main street lights in the lights pool with poolMesh reference for cross-fading
        const lightSrc1 = {
          x: slX + armDirX * 1.3,
          y: 7.5 + h,
          z: slZ,
          intensity: 12.0,
          color: lightColor,
          poolMesh: poolMesh1,
          defaultOpacity: isLED ? 0.16 : 0.22
        };
        lights.push(lightSrc1);
        localLights.push(lightSrc1);

        if (isDoubleArm) {
          const lightSrc2 = {
            x: slX - armDirX * 1.3,
            y: 7.5 + h,
            z: slZ,
            intensity: 12.0,
            color: lightColor,
            poolMesh: poolMesh2,
            defaultOpacity: isLED ? 0.16 : 0.22
          };
          lights.push(lightSrc2);
          localLights.push(lightSrc2);
        }

        // Add Traffic Lights
        // 1. X Axis Traffic Light (extends along Z, towards the road)
        const xArmOffsetZ = -Math.sign(oz) * 3.5;
        const xArm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 3.5), this.streetlightPoleMat);
        xArm.position.set(0, 2.5, -Math.sign(oz) * 1.75);
        xArm.castShadow = true;
        slObject.add(xArm);

        const xHousing = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 0.4), this.tlHousingMat);
        xHousing.position.set(0, 2.1, xArmOffsetZ);
        xHousing.rotation.y = ox > 0 ? -Math.PI / 2 : Math.PI / 2;
        slObject.add(xHousing);

        const bulbGeoTL = new THREE.BoxGeometry(0.24, 0.24, 0.1);

        const xRedGroup = new THREE.Group();
        xRedGroup.position.set(0, 2.1, xArmOffsetZ);
        xRedGroup.rotation.y = ox > 0 ? -Math.PI / 2 : Math.PI / 2;
        const xRed = new THREE.Mesh(bulbGeoTL, this.tlRedOffMat);
        xRed.position.set(0, 0.35, 0.21);
        xRedGroup.add(xRed);
        slObject.add(xRedGroup);

        const xYellowGroup = new THREE.Group();
        xYellowGroup.position.set(0, 2.1, xArmOffsetZ);
        xYellowGroup.rotation.y = ox > 0 ? -Math.PI / 2 : Math.PI / 2;
        const xYellow = new THREE.Mesh(bulbGeoTL, this.tlYellowOffMat);
        xYellow.position.set(0, 0, 0.21);
        xYellowGroup.add(xYellow);
        slObject.add(xYellowGroup);

        const xGreenGroup = new THREE.Group();
        xGreenGroup.position.set(0, 2.1, xArmOffsetZ);
        xGreenGroup.rotation.y = ox > 0 ? -Math.PI / 2 : Math.PI / 2;
        const xGreen = new THREE.Mesh(bulbGeoTL, this.tlGreenOffMat);
        xGreen.position.set(0, -0.35, 0.21);
        xGreenGroup.add(xGreen);
        slObject.add(xGreenGroup);

        // 2. Z Axis Traffic Light (extends along X, towards the road)
        const zArmOffsetX = -Math.sign(ox) * 3.5;
        const zArm = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.15, 0.15), this.streetlightPoleMat);
        zArm.position.set(-Math.sign(ox) * 1.75, 2.5, 0);
        zArm.castShadow = true;
        slObject.add(zArm);

        const zHousing = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 0.4), this.tlHousingMat);
        zHousing.position.set(zArmOffsetX, 2.1, 0);
        zHousing.rotation.y = oz > 0 ? Math.PI : 0;
        slObject.add(zHousing);

        const zRedGroup = new THREE.Group();
        zRedGroup.position.set(zArmOffsetX, 2.1, 0);
        zRedGroup.rotation.y = oz > 0 ? Math.PI : 0;
        const zRed = new THREE.Mesh(bulbGeoTL, this.tlRedOffMat);
        zRed.position.set(0, 0.35, 0.21);
        zRedGroup.add(zRed);
        slObject.add(zRedGroup);

        const zYellowGroup = new THREE.Group();
        zYellowGroup.position.set(zArmOffsetX, 2.1, 0);
        zYellowGroup.rotation.y = oz > 0 ? Math.PI : 0;
        const zYellow = new THREE.Mesh(bulbGeoTL, this.tlYellowOffMat);
        zYellow.position.set(0, 0, 0.21);
        zYellowGroup.add(zYellow);
        slObject.add(zYellowGroup);

        const zGreenGroup = new THREE.Group();
        zGreenGroup.position.set(zArmOffsetX, 2.1, 0);
        zGreenGroup.rotation.y = oz > 0 ? Math.PI : 0;
        const zGreen = new THREE.Mesh(bulbGeoTL, this.tlGreenOffMat);
        zGreen.position.set(0, -0.35, 0.21);
        zGreenGroup.add(zGreen);
        slObject.add(zGreenGroup);

        // Store references to update traffic light bulb colors dynamically
        this.trafficLights.push({
          tileX: posX,
          tileZ: posZ,
          intersectionX: posX,
          intersectionZ: posZ,
          axis: 'x',
          redMesh: xRed,
          yellowMesh: xYellow,
          greenMesh: xGreen
        });
        
        this.trafficLights.push({
          tileX: posX,
          tileZ: posZ,
          intersectionX: posX,
          intersectionZ: posZ,
          axis: 'z',
          redMesh: zRed,
          yellowMesh: zYellow,
          greenMesh: zGreen
        });

        this.breakables.push({
          type: 'trafficlight',
          position: new THREE.Vector3(slX, h, slZ),
          group: slObject,
          flares: localFlares,
          lights: localLights,
          poolMeshes: isDoubleArm ? [poolMesh1, poolMesh2] : [poolMesh1],
          broken: false,
          tileX: posX,
          tileZ: posZ,
          velocity: new THREE.Vector3(),
          angularVelocity: new THREE.Vector3()
        });
      });
    } 
    else {
      const isVertical = this.roadRows.has(gridZ);

      if (isVertical) {
        // Build dynamic vertical road mesh matching roadWidth (rwZ)
        const road = new THREE.Group();
        
        const asphaltGeo = new THREE.BoxGeometry(this.tileSize, 0.2, roadWidth, 8, 1, 4);
        asphaltGeo.translate(0, 0.1, 0);
        this.deformGeometryToHills(asphaltGeo, posX, posZ);
        const asphalt = new THREE.Mesh(asphaltGeo, this.asphaltMat);
        asphalt.receiveShadow = true;
        road.add(asphalt);

        const sw1 = new THREE.BoxGeometry(this.tileSize, 0.35, sidewalkWidth, 8, 1, 2);
        applySidewalkUVs(sw1);
        sw1.translate(0, 0.175, roadWidth/2 + sidewalkWidth/2);
        const sw2 = new THREE.BoxGeometry(this.tileSize, 0.35, sidewalkWidth, 8, 1, 2);
        applySidewalkUVs(sw2);
        sw2.translate(0, 0.175, -roadWidth/2 - sidewalkWidth/2);
        const mergedConcrete = BufferGeometryUtils.mergeGeometries([sw1, sw2]);
        this.deformGeometryToHills(mergedConcrete, posX, posZ);
        const concreteMesh = new THREE.Mesh(mergedConcrete, this.concreteMat);
        concreteMesh.receiveShadow = true;
        road.add(concreteMesh);

        const div1 = new THREE.BoxGeometry(this.tileSize, 0.22, 0.15, 8, 1, 1);
        div1.translate(0, 0.11, -0.2);
        const div2 = new THREE.BoxGeometry(this.tileSize, 0.22, 0.15, 8, 1, 1);
        div2.translate(0, 0.11, 0.2);
        const mergedYellow = BufferGeometryUtils.mergeGeometries([div1, div2]);
        this.deformGeometryToHills(mergedYellow, posX, posZ);
        road.add(new THREE.Mesh(mergedYellow, this.yellowLineMat));

        randomizeRoadUVs(road);
        road.position.set(posX, 0, posZ);
        group.add(road);

        // Spawn a tree or a flat road ramp
        const seed = Math.sin(gridX * 12.9898) * 43758.5453;
        const rand = seed - Math.floor(seed);
        
        const zPositiveSide = posZ + roadWidth/2 + sidewalkWidth/2;
        const zNegativeSide = posZ - roadWidth/2 - sidewalkWidth/2;

        // Left side of tile sidewalk (+X direction offset -13)
        const randLeft = (rand * 10) - Math.floor(rand * 10);
        if (randLeft > 0.85) {
          addTree(posX - 13, zPositiveSide);
        } else if (randLeft > 0.70) {
          addBench(posX - 13, zPositiveSide, Math.PI); // facing towards road (-Z)
        } else if (randLeft > 0.58) {
          addPhoneBooth(posX - 13, zPositiveSide, Math.PI);
        } else if (randLeft > 0.46) {
          addNewspaperBox(posX - 13, zPositiveSide, Math.PI);
        } else if (randLeft > 0.34) {
          addTrashCan(posX - 13, zPositiveSide);
        } else if (randLeft > 0.24) {
          addFireHydrant(posX - 13, zPositiveSide);
        }

        // Right side of tile sidewalk (+X direction offset +13)
        const randRight = (rand * 100) - Math.floor(rand * 100);
        if (randRight > 0.85) {
          addTree(posX + 13, zPositiveSide);
        } else if (randRight > 0.70) {
          addBench(posX + 13, zPositiveSide, Math.PI);
        } else if (randRight > 0.58) {
          addPhoneBooth(posX + 13, zPositiveSide, Math.PI);
        } else if (randRight > 0.46) {
          addNewspaperBox(posX + 13, zPositiveSide, Math.PI);
        } else if (randRight > 0.34) {
          addTrashCan(posX + 13, zPositiveSide);
        } else if (randRight > 0.24) {
          addFireHydrant(posX + 13, zPositiveSide);
        }

        // Left side of tile sidewalk (Negative side, offset -13)
        const randLeftN = (rand * 1000) - Math.floor(rand * 1000);
        if (randLeftN > 0.85) {
          addTree(posX - 13, zNegativeSide);
        } else if (randLeftN > 0.70) {
          addBench(posX - 13, zNegativeSide, 0); // facing towards road (+Z)
        } else if (randLeftN > 0.58) {
          addPhoneBooth(posX - 13, zNegativeSide, 0);
        } else if (randLeftN > 0.46) {
          addNewspaperBox(posX - 13, zNegativeSide, 0);
        } else if (randLeftN > 0.34) {
          addTrashCan(posX - 13, zNegativeSide);
        } else if (randLeftN > 0.24) {
          addFireHydrant(posX - 13, zNegativeSide);
        }

        // Right side of tile sidewalk (Negative side, offset +13)
        const randRightN = (rand * 10000) - Math.floor(rand * 10000);
        if (randRightN > 0.85) {
          addTree(posX + 13, zNegativeSide);
        } else if (randRightN > 0.70) {
          addBench(posX + 13, zNegativeSide, 0);
        } else if (randRightN > 0.58) {
          addPhoneBooth(posX + 13, zNegativeSide, 0);
        } else if (randRightN > 0.46) {
          addNewspaperBox(posX + 13, zNegativeSide, 0);
        } else if (randRightN > 0.34) {
          addTrashCan(posX + 13, zNegativeSide);
        } else if (randRightN > 0.24) {
          addFireHydrant(posX + 13, zNegativeSide);
        }

        // Spawn streetlight (excluding intersections)
        if (gridX % 2 === 0 && !isIntersection) {
          const sy = posZ + roadWidth/2 + sidewalkWidth/2;
          const isLED = Math.sin(posX * 5.0 + sy * 3.0) > 0.0;
          const lightColor = isLED ? 0xd2e5ff : 0xffd5a1;

          // Main streetlight (Positive side)
          const slObject = new THREE.Group();
          const h = this.getBaseHeight(posX, sy);
          slObject.position.set(posX, 4.25 + h, sy); // Centered at Center of Mass (y=4.25)
          group.add(slObject);

          // Pole mesh local
          const pole = new THREE.Mesh(new THREE.BoxGeometry(0.3, 8.5, 0.3), this.streetlightPoleMat);
          pole.position.y = 0; // Centered at local origin
          pole.castShadow = true;
          slObject.add(pole);

          // Streetlight arm/handle (extends along Z, towards the road)
          const arm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 1.3), this.streetlightPoleMat);
          arm.position.set(0, 4.15, -0.65);
          arm.castShadow = true;
          slObject.add(arm);
          
          // Bulb geometry local (local y offset is 8.4 - 4.25 = 4.15)
          const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.6), this.streetlightBulbMat);
          bulb.position.set(0, 4.15, -1.3);
          slObject.add(bulb);

          // Baked ground light pool under streetlight 1
          const poolMesh1 = new THREE.Mesh(
            this.lightPoolGeo,
            (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
          );
          poolMesh1.position.set(0, -3.89, -1.3);
          slObject.add(poolMesh1);

          // Add glowing lens flare sprite
          const flare = new THREE.Sprite(new THREE.SpriteMaterial({
            map: this.slFlareTex,
            color: lightColor,
            transparent: true,
            opacity: 0.70,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          }));
          flare.position.set(0, 4.15, -1.3);
          flare.scale.set(3.8, 3.8, 1.0);
          slObject.add(flare);

          // Register main street lights in the lights pool with poolMesh reference for cross-fading
          const lightSrc1 = {
            x: posX,
            y: 7.5 + h,
            z: sy - 1.3,
            intensity: 26.0,
            color: lightColor,
            poolMesh: poolMesh1,
            defaultOpacity: isLED ? 0.16 : 0.22
          };
          lights.push(lightSrc1);

          // Register in the breakables array
          this.breakables.push({
            type: 'streetlight',
            position: new THREE.Vector3(posX, h, sy),
            group: slObject,
            flares: [flare],
            lights: [lightSrc1],
            poolMeshes: [poolMesh1],
            broken: false,
            tileX: posX,
            tileZ: posZ,
            velocity: new THREE.Vector3(),
            angularVelocity: new THREE.Vector3()
          });

          // Second streetlight on the opposite side (30% chance)
          const isDoubleArm = (Math.sin(posX * 1.2 + sy * 2.8) - Math.floor(Math.sin(posX * 1.2 + sy * 2.8))) > 0.70;
          if (isDoubleArm) {
            const sy2 = posZ - roadWidth/2 - sidewalkWidth/2;
            const slObject2 = new THREE.Group();
            const h2 = this.getBaseHeight(posX, sy2);
            slObject2.position.set(posX, 4.25 + h2, sy2);
            group.add(slObject2);

            const pole2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 8.5, 0.3), this.streetlightPoleMat);
            pole2.position.y = 0;
            pole2.castShadow = true;
            slObject2.add(pole2);

            // Streetlight arm/handle (extends along Z, towards the road)
            const arm2 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 1.3), this.streetlightPoleMat);
            arm2.position.set(0, 4.15, 0.65);
            arm2.castShadow = true;
            slObject2.add(arm2);

            const bulb2 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.6), this.streetlightBulbMat);
            bulb2.position.set(0, 4.15, 1.3); // Offset towards the road (+Z)
            slObject2.add(bulb2);

            const poolMesh2 = new THREE.Mesh(
              this.lightPoolGeo,
              (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
            );
            poolMesh2.position.set(0, -3.89, 1.3);
            slObject2.add(poolMesh2);

            const flare2 = new THREE.Sprite(new THREE.SpriteMaterial({
              map: this.slFlareTex,
              color: lightColor,
              transparent: true,
              opacity: 0.70,
              blending: THREE.AdditiveBlending,
              depthWrite: false
            }));
            flare2.position.set(0, 4.15, 1.3);
            flare2.scale.set(3.8, 3.8, 1.0);
            slObject2.add(flare2);

            const lightSrc2 = {
              x: posX,
              y: 7.5 + h2,
              z: sy2 + 1.3,
              intensity: 26.0,
              color: lightColor,
              poolMesh: poolMesh2,
              defaultOpacity: isLED ? 0.16 : 0.22
            };
            lights.push(lightSrc2);

            this.breakables.push({
              type: 'streetlight',
              position: new THREE.Vector3(posX, h2, sy2),
              group: slObject2,
              flares: [flare2],
              lights: [lightSrc2],
              poolMeshes: [poolMesh2],
              broken: false,
              tileX: posX,
              tileZ: posZ,
              velocity: new THREE.Vector3(),
              angularVelocity: new THREE.Vector3()
            });
          }
        }
      } 
      else {
        // Build dynamic horizontal road mesh matching roadWidth (rwX)
        const road = new THREE.Group();
        
        const asphaltGeo = new THREE.BoxGeometry(roadWidth, 0.2, this.tileSize, 4, 1, 8);
        asphaltGeo.translate(0, 0.1, 0);
        this.deformGeometryToHills(asphaltGeo, posX, posZ);
        const asphalt = new THREE.Mesh(asphaltGeo, this.asphaltMat);
        asphalt.receiveShadow = true;
        road.add(asphalt);

        const sw1 = new THREE.BoxGeometry(sidewalkWidth, 0.35, this.tileSize, 2, 1, 8);
        applySidewalkUVs(sw1);
        sw1.translate(roadWidth/2 + sidewalkWidth/2, 0.175, 0);
        const sw2 = new THREE.BoxGeometry(sidewalkWidth, 0.35, this.tileSize, 2, 1, 8);
        applySidewalkUVs(sw2);
        sw2.translate(-roadWidth/2 - sidewalkWidth/2, 0.175, 0);
        const mergedConcrete = BufferGeometryUtils.mergeGeometries([sw1, sw2]);
        this.deformGeometryToHills(mergedConcrete, posX, posZ);
        const concreteMesh = new THREE.Mesh(mergedConcrete, this.concreteMat);
        concreteMesh.receiveShadow = true;
        road.add(concreteMesh);

        const div1 = new THREE.BoxGeometry(0.15, 0.22, this.tileSize, 1, 1, 8);
        div1.translate(-0.2, 0.11, 0);
        const div2 = new THREE.BoxGeometry(0.15, 0.22, this.tileSize, 1, 1, 8);
        div2.translate(0.2, 0.11, 0);
        const mergedYellow = BufferGeometryUtils.mergeGeometries([div1, div2]);
        this.deformGeometryToHills(mergedYellow, posX, posZ);
        road.add(new THREE.Mesh(mergedYellow, this.yellowLineMat));

        randomizeRoadUVs(road);
        road.position.set(posX, 0, posZ);
        group.add(road);

        // Spawn a tree or flat road ramp
        const seed = Math.sin(gridZ * 53.1198) * 43758.5453;
        const rand = seed - Math.floor(seed);
        
        const xPositiveSide = posX + roadWidth/2 + sidewalkWidth/2;
        const xNegativeSide = posX - roadWidth/2 - sidewalkWidth/2;

        // Negative Side sidewalk (Z offset -13)
        const randLeft = (rand * 10) - Math.floor(rand * 10);
        if (randLeft > 0.85) {
          addTree(xNegativeSide, posZ - 13);
        } else if (randLeft > 0.70) {
          addBench(xNegativeSide, posZ - 13, -Math.PI / 2); // facing towards road (+X)
        } else if (randLeft > 0.58) {
          addPhoneBooth(xNegativeSide, posZ - 13, -Math.PI / 2);
        } else if (randLeft > 0.46) {
          addNewspaperBox(xNegativeSide, posZ - 13, -Math.PI / 2);
        } else if (randLeft > 0.34) {
          addTrashCan(xNegativeSide, posZ - 13);
        } else if (randLeft > 0.24) {
          addFireHydrant(xNegativeSide, posZ - 13);
        }

        // Negative Side sidewalk (Z offset +13)
        const randRight = (rand * 100) - Math.floor(rand * 100);
        if (randRight > 0.85) {
          addTree(xNegativeSide, posZ + 13);
        } else if (randRight > 0.70) {
          addBench(xNegativeSide, posZ + 13, -Math.PI / 2);
        } else if (randRight > 0.58) {
          addPhoneBooth(xNegativeSide, posZ + 13, -Math.PI / 2);
        } else if (randRight > 0.46) {
          addNewspaperBox(xNegativeSide, posZ + 13, -Math.PI / 2);
        } else if (randRight > 0.34) {
          addTrashCan(xNegativeSide, posZ + 13);
        } else if (randRight > 0.24) {
          addFireHydrant(xNegativeSide, posZ + 13);
        }

        // Positive Side sidewalk (Z offset -13)
        const randLeftP = (rand * 1000) - Math.floor(rand * 1000);
        if (randLeftP > 0.85) {
          addTree(xPositiveSide, posZ - 13);
        } else if (randLeftP > 0.70) {
          addBench(xPositiveSide, posZ - 13, Math.PI / 2); // facing towards road (-X)
        } else if (randLeftP > 0.58) {
          addPhoneBooth(xPositiveSide, posZ - 13, Math.PI / 2);
        } else if (randLeftP > 0.46) {
          addNewspaperBox(xPositiveSide, posZ - 13, Math.PI / 2);
        } else if (randLeftP > 0.34) {
          addTrashCan(xPositiveSide, posZ - 13);
        } else if (randLeftP > 0.24) {
          addFireHydrant(xPositiveSide, posZ - 13);
        }

        // Positive Side sidewalk (Z offset +13)
        const randRightP = (rand * 10000) - Math.floor(rand * 10000);
        if (randRightP > 0.85) {
          addTree(xPositiveSide, posZ + 13);
        } else if (randRightP > 0.70) {
          addBench(xPositiveSide, posZ + 13, Math.PI / 2);
        } else if (randRightP > 0.58) {
          addPhoneBooth(xPositiveSide, posZ + 13, Math.PI / 2);
        } else if (randRightP > 0.46) {
          addNewspaperBox(xPositiveSide, posZ + 13, Math.PI / 2);
        } else if (randRightP > 0.34) {
          addTrashCan(xPositiveSide, posZ + 13);
        } else if (randRightP > 0.24) {
          addFireHydrant(xPositiveSide, posZ + 13);
         // Spawn streetlight (excluding intersections)
        if (gridZ % 2 === 0 && !isIntersection) {
          const sx = posX + roadWidth/2 + sidewalkWidth/2;
          const isLED = Math.sin(sx * 5.0 + posZ * 3.0) > 0.0;
          const lightColor = isLED ? 0xd2e5ff : 0xffd5a1;

          // Main streetlight (Positive side)
          const slObject = new THREE.Group();
          const h = this.getBaseHeight(sx, posZ);
          slObject.position.set(sx, 4.25 + h, posZ); // Centered at Center of Mass (y=4.25)
          group.add(slObject);

          // Pole mesh local
          const pole = new THREE.Mesh(new THREE.BoxGeometry(0.3, 8.5, 0.3), this.streetlightPoleMat);
          pole.position.y = 0; // Centered at local origin
          pole.castShadow = true;
          slObject.add(pole);

          // Streetlight arm/handle (extends along X, towards the road)
          const arm = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.15, 0.15), this.streetlightPoleMat);
          arm.position.set(-0.65, 4.15, 0);
          arm.castShadow = true;
          slObject.add(arm);
          
          // Bulb geometry local (local y offset is 8.4 - 4.25 = 4.15)
          const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.6), this.streetlightBulbMat);
          bulb.position.set(-1.3, 4.15, 0);
          slObject.add(bulb);

          // Baked ground light pool under streetlight 1
          const poolMesh1 = new THREE.Mesh(
            this.lightPoolGeo,
            (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
          );
          poolMesh1.position.set(-1.3, -3.89, 0);
          slObject.add(poolMesh1);

          // Add glowing lens flare sprite
          const flare = new THREE.Sprite(new THREE.SpriteMaterial({
            map: this.slFlareTex,
            color: lightColor,
            transparent: true,
            opacity: 0.70,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          }));
          flare.position.set(-1.3, 4.15, 0);
          flare.scale.set(3.8, 3.8, 1.0);
          slObject.add(flare);

          // Register main street lights in the lights pool with poolMesh reference for cross-fading
          const lightSrc1 = {
            x: sx - 1.3,
            y: 7.5 + h,
            z: posZ,
            intensity: 26.0,
            color: lightColor,
            poolMesh: poolMesh1,
            defaultOpacity: isLED ? 0.16 : 0.22
          };
          lights.push(lightSrc1);

          // Register in the breakables array
          this.breakables.push({
            type: 'streetlight',
            position: new THREE.Vector3(sx, h, posZ),
            group: slObject,
            flares: [flare],
            lights: [lightSrc1],
            poolMeshes: [poolMesh1],
            broken: false,
            tileX: posX,
            tileZ: posZ,
            velocity: new THREE.Vector3(),
            angularVelocity: new THREE.Vector3()
          });

          // Second streetlight on the opposite side (30% chance)
          const isDoubleArm = (Math.sin(sx * 1.2 + posZ * 2.8) - Math.floor(Math.sin(sx * 1.2 + posZ * 2.8))) > 0.70;
          if (isDoubleArm) {
            const sx2 = posX - roadWidth/2 - sidewalkWidth/2;
            const slObject2 = new THREE.Group();
            const h2 = this.getBaseHeight(sx2, posZ);
            slObject2.position.set(sx2, 4.25 + h2, posZ);
            group.add(slObject2);

            const pole2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 8.5, 0.3), this.streetlightPoleMat);
            pole2.position.y = 0;
            pole2.castShadow = true;
            slObject2.add(pole2);

            // Streetlight arm/handle (extends along X, towards the road)
            const arm2 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.15, 0.15), this.streetlightPoleMat);
            arm2.position.set(0.65, 4.15, 0);
            arm2.castShadow = true;
            slObject2.add(arm2);

            const bulb2 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.6), this.streetlightBulbMat);
            bulb2.position.set(1.3, 4.15, 0); // Offset towards the road (+X)
            slObject2.add(bulb2);

            const poolMesh2 = new THREE.Mesh(
              this.lightPoolGeo,
              (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
            );
            poolMesh2.position.set(1.3, -3.89, 0);
            slObject2.add(poolMesh2);

            const flare2 = new THREE.Sprite(new THREE.SpriteMaterial({
              map: this.slFlareTex,
              color: lightColor,
              transparent: true,
              opacity: 0.70,
              blending: THREE.AdditiveBlending,
              depthWrite: false
            }));
            flare2.position.set(1.3, 4.15, 0);
            flare2.scale.set(3.8, 3.8, 1.0);
            slObject2.add(flare2);

            const lightSrc2 = {
              x: sx2 + 1.3,
              y: 7.5 + h2,
              z: posZ,
              intensity: 26.0,
              color: lightColor,
              poolMesh: poolMesh2,
              defaultOpacity: isLED ? 0.16 : 0.22
            };
            lights.push(lightSrc2);

            this.breakables.push({
              type: 'streetlight',
              position: new THREE.Vector3(sx2, h2, posZ),
              group: slObject2,
              flares: [flare2],
              lights: [lightSrc2],
              poolMeshes: [poolMesh2],
              broken: false,
              tileX: posX,
              tileZ: posZ,
              velocity: new THREE.Vector3(),
              angularVelocity: new THREE.Vector3()
            });
          }
        }
        }
      }
    }

    // Merge & instantiate collected geometries to minimize draw calls
    if (localPoles.length > 0) {
      const mergedPoles = BufferGeometryUtils.mergeGeometries(localPoles);
      const poleMesh = new THREE.Mesh(mergedPoles, this.streetlightPoleMat);
      poleMesh.castShadow = true;
      group.add(poleMesh);
    }
    if (localBulbs.length > 0) {
      const mergedBulbs = BufferGeometryUtils.mergeGeometries(localBulbs);
      const bulbMesh = new THREE.Mesh(mergedBulbs, this.streetlightBulbMat);
      group.add(bulbMesh);
    }
    if (localTrunks.length > 0) {
      const mergedTrunks = BufferGeometryUtils.mergeGeometries(localTrunks);
      const trunkMesh = new THREE.Mesh(mergedTrunks, this.trunkMat);
      trunkMesh.castShadow = true;
      group.add(trunkMesh);
    }
    if (localLeaves.length > 0) {
      const mergedLeaves = BufferGeometryUtils.mergeGeometries(localLeaves);
      const leavesMesh = new THREE.Mesh(mergedLeaves, this.leafMat);
      leavesMesh.castShadow = true;
      group.add(leavesMesh);
    }
    if (localLeavesCherry.length > 0) {
      const mergedLeaves = BufferGeometryUtils.mergeGeometries(localLeavesCherry);
      const leavesMesh = new THREE.Mesh(mergedLeaves, this.leafCherryMat);
      leavesMesh.castShadow = true;
      group.add(leavesMesh);
    }
    if (localLeavesAutumn.length > 0) {
      const mergedLeaves = BufferGeometryUtils.mergeGeometries(localLeavesAutumn);
      const leavesMesh = new THREE.Mesh(mergedLeaves, this.leafAutumnMat);
      leavesMesh.castShadow = true;
      group.add(leavesMesh);
    }
  }

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

export function buildBuildingTile(gridX, gridZ, posX, posZ, group, obstacles, lights) {
    // Helper to check if a neighbor grid cell is a building tile (excluding alleys)
    const isBuildingTile = (gx, gz) => {
      return !this.roadColumns.has(gx) && !this.roadRows.has(gz) && !this.isAlley(gx, gz);
    };

    // Generate building geometries (remains merged for high performance)
    const seed = Math.sin(gridX * 12.9898 + gridZ * 78.233) * 43758.5453;
    const rand = seed - Math.floor(seed);
    
    const levelsCount = rand > 0.8 ? 4 : (rand > 0.45 ? 3 : 2);
    const bMat = this.materials[Math.floor(rand * this.materials.length)];

    // Calculate bounds relative to tile center (tileSize is 40)
    let xMin = -14;
    let xMax = 14;
    let zMin = -14;
    let zMax = 14;

    // Determine boundaries based on neighbor tiles (roads, alleys, buildings)
    // West (xMin)
    if (isBuildingTile(gridX - 1, gridZ)) {
      xMin = -20;
    } else if (this.isAlley(gridX - 1, gridZ)) {
      // Alley neighbor: randomize width
      const alleySeed = Math.sin((gridX - 1) * 12.9898 + gridZ * 78.233) * 43758.5453;
      const alleyRand = alleySeed - Math.floor(alleySeed);
      if (alleyRand < 0.4) xMin = -19; // narrow alley (building brought closer)
      else if (alleyRand < 0.7) xMin = -16; // medium alley
      else xMin = -13; // wide alley
    } else if (this.roadColumns.has(gridX - 1) || this.roadRows.has(gridZ)) {
      // Road neighbor
      const { rwX } = this.getRoadWidthForGrid(gridX - 1, gridZ);
      if (rwX === 14 && rand < 0.5) {
        xMin = -19; // bring buildings closer sometimes for narrow roads
      }
    }

    // East (xMax)
    if (isBuildingTile(gridX + 1, gridZ)) {
      xMax = 20;
    } else if (this.isAlley(gridX + 1, gridZ)) {
      const alleySeed = Math.sin((gridX + 1) * 12.9898 + gridZ * 78.233) * 43758.5453;
      const alleyRand = alleySeed - Math.floor(alleySeed);
      if (alleyRand < 0.4) xMax = 19;
      else if (alleyRand < 0.7) xMax = 16;
      else xMax = 13;
    } else if (this.roadColumns.has(gridX + 1) || this.roadRows.has(gridZ)) {
      const { rwX } = this.getRoadWidthForGrid(gridX + 1, gridZ);
      if (rwX === 14 && rand > 0.5) {
        xMax = 19;
      }
    }

    // North (zMin)
    if (isBuildingTile(gridX, gridZ - 1)) {
      zMin = -20;
    } else if (this.isAlley(gridX, gridZ - 1)) {
      const alleySeed = Math.sin(gridX * 12.9898 + (gridZ - 1) * 78.233) * 43758.5453;
      const alleyRand = alleySeed - Math.floor(alleySeed);
      if (alleyRand < 0.4) zMin = -19;
      else if (alleyRand < 0.7) zMin = -16;
      else zMin = -13;
    } else if (this.roadColumns.has(gridX) || this.roadRows.has(gridZ - 1)) {
      const { rwZ } = this.getRoadWidthForGrid(gridX, gridZ - 1);
      if (rwZ === 14 && rand < 0.5) {
        zMin = -19;
      }
    }

    // South (zMax)
    if (isBuildingTile(gridX, gridZ + 1)) {
      zMax = 20;
    } else if (this.isAlley(gridX, gridZ + 1)) {
      const alleySeed = Math.sin(gridX * 12.9898 + (gridZ + 1) * 78.233) * 43758.5453;
      const alleyRand = alleySeed - Math.floor(alleySeed);
      if (alleyRand < 0.4) zMax = 19;
      else if (alleyRand < 0.7) zMax = 16;
      else zMax = 13;
    } else if (this.roadColumns.has(gridX) || this.roadRows.has(gridZ + 1)) {
      const { rwZ } = this.getRoadWidthForGrid(gridX, gridZ + 1);
      if (rwZ === 14 && rand > 0.5) {
        zMax = 19;
      }
    }

    const wX = xMax - xMin;
    const wZ = zMax - zMin;
    const centerX = (xMin + xMax) / 2;
    const centerZ = (zMin + zMax) / 2;
    const buildingBaseHeight = this.getBaseHeight(posX + centerX, posZ + centerZ);
    const hasDoor = Math.abs(buildingBaseHeight) < 0.1;

    let currentHeight = 0;
    
    const facadeGeoms = [];
    const windowGeoms = [];
    const doorGeoms = [];
    const accessoryGeoms = [];
    const billboardGeoms = [];
    const beaconGeoms = [];

    // Voxel Columns Configuration
    const colW = 0.8;
    const colOffset = colW / 2;
    const ledgeHeight = 0.8;

    // Layer 1
    const l1Height = 8 + rand * 4;
    // Extend downward by 15.0 meters to fill any cutoff/gap issues on slopes
    const l1Geo = new THREE.BoxGeometry(wX, l1Height + 15.0, wZ, Math.max(1, Math.round(wX / 2)), 1, Math.max(1, Math.round(wZ / 2)));
    l1Geo.translate(centerX, (l1Height - 15.0) / 2, centerZ);
    facadeGeoms.push(l1Geo);

    // Layer 1 Corner Columns (Voxel detailing) - also extended down by 15m
    if (xMin > -20 && zMin > -20) {
      const c = new THREE.BoxGeometry(colW, l1Height + 15.0, colW);
      c.translate(xMin + colOffset, (l1Height - 15.0) / 2, zMin + colOffset);
      facadeGeoms.push(c);
    }
    if (xMax < 20 && zMin > -20) {
      const c = new THREE.BoxGeometry(colW, l1Height + 15.0, colW);
      c.translate(xMax - colOffset, (l1Height - 15.0) / 2, zMin + colOffset);
      facadeGeoms.push(c);
    }
    if (xMin > -20 && zMax < 20) {
      const c = new THREE.BoxGeometry(colW, l1Height + 15.0, colW);
      c.translate(xMin + colOffset, (l1Height - 15.0) / 2, zMax - colOffset);
      facadeGeoms.push(c);
    }
    if (xMax < 20 && zMax < 20) {
      const c = new THREE.BoxGeometry(colW, l1Height + 15.0, colW);
      c.translate(xMax - colOffset, (l1Height - 15.0) / 2, zMax - colOffset);
      facadeGeoms.push(c);
    }

    // Layer 1 Molding Ledge Belt (Voxel detailing)
    const ledge1 = new THREE.BoxGeometry(wX + 0.5, ledgeHeight, wZ + 0.5, Math.max(1, Math.round(wX / 2)), 1, Math.max(1, Math.round(wZ / 2)));
    ledge1.translate(centerX, l1Height - ledgeHeight / 2, centerZ);
    facadeGeoms.push(ledge1);

    // Only generate ground features (doors, signs, shop windows) on street-facing sides (no building neighbor)
    if (zMax < 20) {
      // Front Facade features
      if (hasDoor) {
        const frontDoor = new THREE.BoxGeometry(2.2, 4.2, 0.2, 2, 1, 1);
        frontDoor.translate(centerX, 2.1, zMax + 0.05);
        doorGeoms.push(frontDoor);
      }

      const shopWinW = 6.0;
      const shopWinH = 4.5;
      const shopWinLeft = createDetailedWindowGeometry(shopWinW, shopWinH, 0.1);
      shopWinLeft.translate(centerX - wX / 4, 2.5, zMax + 0.05);
      windowGeoms.push(shopWinLeft);

      const shopWinRight = createDetailedWindowGeometry(shopWinW, shopWinH, 0.1);
      shopWinRight.translate(centerX + wX / 4, 2.5, zMax + 0.05);
      windowGeoms.push(shopWinRight);

      const shopSignW = 5.8;
      const shopSignH = 1.0;
      const signLeft = new THREE.BoxGeometry(shopSignW, shopSignH, 0.2, Math.max(1, Math.round(shopSignW / 2)), 1, 1);
      signLeft.translate(centerX - wX / 4, 5.4, zMax + 0.1);
      billboardGeoms.push(signLeft);

      const signRight = new THREE.BoxGeometry(shopSignW, shopSignH, 0.2, Math.max(1, Math.round(shopSignW / 2)), 1, 1);
      signRight.translate(centerX + wX / 4, 5.4, zMax + 0.1);
      billboardGeoms.push(signRight);

      const awning = new THREE.BoxGeometry(wX - 2, 0.35, 2.0, Math.max(1, Math.round((wX - 2) / 2)), 1, 1);
      awning.translate(centerX, 6.0, zMax + 1.0);
      accessoryGeoms.push(awning);

      if (wX >= 28 && hasDoor) {
        const trashCan = new THREE.BoxGeometry(1.0, 1.6, 1.0);
        trashCan.translate(centerX - wX / 2 + 2.5, 0.8, zMax + 2.0);
        accessoryGeoms.push(trashCan);

        // Sidewalk Bench
        const benchSeat = new THREE.BoxGeometry(3.5, 0.2, 1.0, 3, 1, 1);
        benchSeat.translate(centerX + wX / 2 - 4.0, 0.8, zMax + 2.0);
        accessoryGeoms.push(benchSeat);

        const benchLegL = new THREE.BoxGeometry(0.25, 0.8, 1.0);
        benchLegL.translate(centerX + wX / 2 - 5.5, 0.4, zMax + 2.0);
        accessoryGeoms.push(benchLegL);

        const benchLegR = new THREE.BoxGeometry(0.25, 0.8, 1.0);
        benchLegR.translate(centerX + wX / 2 - 2.5, 0.4, zMax + 2.0);
        accessoryGeoms.push(benchLegR);
      }

      // Storefronts are highly emissive and glow in the dark naturally. We add storefront ground pools
      // and register their light sources to smoothly transition from baked to real-time light near the player.
      const poolMeshL = new THREE.Mesh(
        this.storefrontLightPoolGeo,
        this.storefrontGroundLightPoolMat.clone()
      );
      const hPoolL = this.getBaseHeight(posX + centerX - wX / 4, posZ + zMax + 3.0);
      poolMeshL.position.set(posX + centerX - wX / 4, 0.36 + hPoolL, posZ + zMax + 3.0);
      group.add(poolMeshL);

      const poolMeshR = new THREE.Mesh(
        this.storefrontLightPoolGeo,
        this.storefrontGroundLightPoolMat.clone()
      );
      const hPoolR = this.getBaseHeight(posX + centerX + wX / 4, posZ + zMax + 3.0);
      poolMeshR.position.set(posX + centerX + wX / 4, 0.36 + hPoolR, posZ + zMax + 3.0);
      group.add(poolMeshR);

      const storefrontLightL = {
        x: posX + centerX - wX / 4,
        y: 1.8 + hPoolL,
        z: posZ + zMax + 1.2,
        intensity: 15.0,
        color: 0xffecc4,
        poolMesh: poolMeshL,
        defaultOpacity: 0.30
      };
      lights.push(storefrontLightL);

      const storefrontLightR = {
        x: posX + centerX + wX / 4,
        y: 1.8 + hPoolR,
        z: posZ + zMax + 1.2,
        intensity: 15.0,
        color: 0xffecc4,
        poolMesh: poolMeshR,
        defaultOpacity: 0.30
      };
      lights.push(storefrontLightR);
    }

    if (zMin > -20 && hasDoor) {
      // Back Facade features
      const backDoor = new THREE.BoxGeometry(2.2, 4.2, 0.2, 2, 1, 1);
      backDoor.translate(centerX, 2.1, zMin - 0.05);
      doorGeoms.push(backDoor);
    }

    currentHeight += l1Height;

    // Layer 2 Bounds (only inset if facing a road, keep party walls flat)
    const l2_xMin = xMin === -20 ? -20 : xMin + 1.0;
    const l2_xMax = xMax === 20 ? 20 : xMax - 1.0;
    const l2_zMin = zMin === -20 ? -20 : zMin + 1.0;
    const l2_zMax = zMax === 20 ? 20 : zMax - 1.0;

    const wX2 = l2_xMax - l2_xMin;
    const wZ2 = l2_zMax - l2_zMin;
    const centerX2 = (l2_xMin + l2_xMax) / 2;
    const centerZ2 = (l2_zMin + l2_zMax) / 2;

    const l2Height = 15 + rand * 30;
    const l2Geo = new THREE.BoxGeometry(wX2, l2Height, wZ2, Math.max(1, Math.round(wX2 / 2)), 1, Math.max(1, Math.round(wZ2 / 2)));
    l2Geo.translate(centerX2, currentHeight + l2Height / 2, centerZ2);
    facadeGeoms.push(l2Geo);

    // Layer 2 Corner Columns (Voxel detailing)
    if (l2_xMin > -20 && l2_zMin > -20) {
      const c = new THREE.BoxGeometry(colW, l2Height, colW);
      c.translate(l2_xMin + colOffset, currentHeight + l2Height / 2, l2_zMin + colOffset);
      facadeGeoms.push(c);
    }
    if (l2_xMax < 20 && l2_zMin > -20) {
      const c = new THREE.BoxGeometry(colW, l2Height, colW);
      c.translate(l2_xMax - colOffset, currentHeight + l2Height / 2, l2_zMin + colOffset);
      facadeGeoms.push(c);
    }
    if (l2_xMin > -20 && l2_zMax < 20) {
      const c = new THREE.BoxGeometry(colW, l2Height, colW);
      c.translate(l2_xMin + colOffset, currentHeight + l2Height / 2, l2_zMax - colOffset);
      facadeGeoms.push(c);
    }
    if (l2_xMax < 20 && l2_zMax < 20) {
      const c = new THREE.BoxGeometry(colW, l2Height, colW);
      c.translate(l2_xMax - colOffset, currentHeight + l2Height / 2, l2_zMax - colOffset);
      facadeGeoms.push(c);
    }

    // Layer 2 Molding Ledge Belt (Voxel detailing)
    const ledge2 = new THREE.BoxGeometry(wX2 + 0.5, ledgeHeight, wZ2 + 0.5, Math.max(1, Math.round(wX2 / 2)), 1, Math.max(1, Math.round(wZ2 / 2)));
    ledge2.translate(centerX2, currentHeight + l2Height - ledgeHeight / 2, centerZ2);
    facadeGeoms.push(ledge2);

    // Windows (Only place on non-connected street-facing sides)
    const winW = 1.5;
    const winH = 2.0;
    
    for (let wy = currentHeight + 3; wy < currentHeight + l2Height - 3; wy += 4.5) {
      for (let wx = l2_xMin + 3; wx < l2_xMax - 3; wx += 4) {
        if (l2_zMax < 20) {
          const winF = createDetailedWindowGeometry(winW, winH, 0.1);
          winF.translate(wx, wy, l2_zMax + 0.05);
          windowGeoms.push(winF);

          // Voxel style window sill
          const sill = new THREE.BoxGeometry(winW + 0.6, 0.28, 0.4);
          sill.translate(wx, wy - winH / 2 - 0.14, l2_zMax + 0.2);
          facadeGeoms.push(sill);
        }

        if (l2_zMin > -20) {
          const winB = createDetailedWindowGeometry(winW, winH, 0.1);
          winB.translate(wx, wy, l2_zMin - 0.05);
          windowGeoms.push(winB);

          // Voxel style window sill
          const sill = new THREE.BoxGeometry(winW + 0.6, 0.28, 0.4);
          sill.translate(wx, wy - winH / 2 - 0.14, l2_zMin - 0.2);
          facadeGeoms.push(sill);
        }
      }
    }

    currentHeight += l2Height;

    // Layer 3 Bounds
    if (levelsCount >= 3) {
      const l3_xMin = xMin === -20 ? -20 : xMin + 2.5;
      const l3_xMax = xMax === 20 ? 20 : xMax - 2.5;
      const l3_zMin = zMin === -20 ? -20 : zMin + 2.5;
      const l3_zMax = zMax === 20 ? 20 : zMax - 2.5;

      const wX3 = l3_xMax - l3_xMin;
      const wZ3 = l3_zMax - l3_zMin;
      const centerX3 = (l3_xMin + l3_xMax) / 2;
      const centerZ3 = (l3_zMin + l3_zMax) / 2;

      const l3Height = 8 + rand * 10;
      const l3Geo = new THREE.BoxGeometry(wX3, l3Height, wZ3, Math.max(1, Math.round(wX3 / 2)), 1, Math.max(1, Math.round(wZ3 / 2)));
      l3Geo.translate(centerX3, currentHeight + l3Height / 2, centerZ3);
      facadeGeoms.push(l3Geo);

      // Layer 3 Corner Columns (Voxel detailing)
      if (l3_xMin > -20 && l3_zMin > -20) {
        const c = new THREE.BoxGeometry(colW, l3Height, colW);
        c.translate(l3_xMin + colOffset, currentHeight + l3Height / 2, l3_zMin + colOffset);
        facadeGeoms.push(c);
      }
      if (l3_xMax < 20 && l3_zMin > -20) {
        const c = new THREE.BoxGeometry(colW, l3Height, colW);
        c.translate(l3_xMax - colOffset, currentHeight + l3Height / 2, l3_zMin + colOffset);
        facadeGeoms.push(c);
      }
      if (l3_xMin > -20 && l3_zMax < 20) {
        const c = new THREE.BoxGeometry(colW, l3Height, colW);
        c.translate(l3_xMin + colOffset, currentHeight + l3Height / 2, l3_zMax - colOffset);
        facadeGeoms.push(c);
      }
      if (l3_xMax < 20 && l3_zMax < 20) {
        const c = new THREE.BoxGeometry(colW, l3Height, colW);
        c.translate(l3_xMax - colOffset, currentHeight + l3Height / 2, l3_zMax - colOffset);
        facadeGeoms.push(c);
      }

      // Layer 3 Molding Ledge Belt (Voxel detailing)
      const ledge3 = new THREE.BoxGeometry(wX3 + 0.5, ledgeHeight, wZ3 + 0.5, Math.max(1, Math.round(wX3 / 2)), 1, Math.max(1, Math.round(wZ3 / 2)));
      ledge3.translate(centerX3, currentHeight + l3Height - ledgeHeight / 2, centerZ3);
      facadeGeoms.push(ledge3);

      // Layer 3 Windows
      for (let wy = currentHeight + 2; wy < currentHeight + l3Height - 2; wy += 4.0) {
        for (let wx = l3_xMin + 3; wx < l3_xMax - 3; wx += 4.0) {
          if (l3_zMax < 20) {
            const winF = createDetailedWindowGeometry(winW, winH, 0.1);
            winF.translate(wx, wy, l3_zMax + 0.05);
            windowGeoms.push(winF);

            // Voxel style window sill
            const sill = new THREE.BoxGeometry(winW + 0.6, 0.28, 0.4);
            sill.translate(wx, wy - winH / 2 - 0.14, l3_zMax + 0.2);
            facadeGeoms.push(sill);
          }
          if (l3_zMin > -20) {
            const winB = createDetailedWindowGeometry(winW, winH, 0.1);
            winB.translate(wx, wy, l3_zMin - 0.05);
            windowGeoms.push(winB);

            // Voxel style window sill
            const sill = new THREE.BoxGeometry(winW + 0.6, 0.28, 0.4);
            sill.translate(wx, wy - winH / 2 - 0.14, l3_zMin - 0.2);
            facadeGeoms.push(sill);
          }
        }
      }

      currentHeight += l3Height;
    }

    // Layer 4 Bounds
    if (levelsCount === 4) {
      const l4_xMin = xMin === -20 ? -20 : xMin + 4.0;
      const l4_xMax = xMax === 20 ? 20 : xMax - 4.0;
      const l4_zMin = zMin === -20 ? -20 : zMin + 4.0;
      const l4_zMax = zMax === 20 ? 20 : zMax - 4.0;

      const wX4 = l4_xMax - l4_xMin;
      const wZ4 = l4_zMax - l4_zMin;
      const centerX4 = (l4_xMin + l4_xMax) / 2;
      const centerZ4 = (l4_zMin + l4_zMax) / 2;

      const l4Height = 7 + rand * 8;
      const l4Geo = new THREE.BoxGeometry(wX4, l4Height, wZ4, Math.max(1, Math.round(wX4 / 2)), 1, Math.max(1, Math.round(wZ4 / 2)));
      l4Geo.translate(centerX4, currentHeight + l4Height / 2, centerZ4);
      facadeGeoms.push(l4Geo);

      // Layer 4 Molding Ledge Belt
      const ledge4 = new THREE.BoxGeometry(wX4 + 0.5, ledgeHeight, wZ4 + 0.5, Math.max(1, Math.round(wX4 / 2)), 1, Math.max(1, Math.round(wZ4 / 2)));
      ledge4.translate(centerX4, currentHeight + l4Height - ledgeHeight / 2, centerZ4);
      facadeGeoms.push(ledge4);

      // Layer 4 Windows
      for (let wy = currentHeight + 2; wy < currentHeight + l4Height - 2; wy += 3.8) {
        for (let wx = l4_xMin + 3; wx < l4_xMax - 3; wx += 4.0) {
          if (l4_zMax < 20) {
            const winF = createDetailedWindowGeometry(winW, winH, 0.1);
            winF.translate(wx, wy, l4_zMax + 0.05);
            windowGeoms.push(winF);

            // Voxel style window sill
            const sill = new THREE.BoxGeometry(winW + 0.6, 0.28, 0.4);
            sill.translate(wx, wy - winH / 2 - 0.14, l4_zMax + 0.2);
            facadeGeoms.push(sill);
          }
        }
      }

      currentHeight += l4Height;
    }

    // Rooftop Accessories
    const ac = new THREE.BoxGeometry(3.0, 2.0, 3.0);
    ac.translate(centerX, currentHeight + 1.0, centerZ);
    accessoryGeoms.push(ac);

    // Random Solar Panels
    if (rand > 0.45) {
      const panel = new THREE.BoxGeometry(3.2, 0.18, 1.8);
      panel.rotateX(Math.PI / 8);
      panel.translate(centerX - 3.5, currentHeight + 0.5, centerZ);
      accessoryGeoms.push(panel);
    }

    // Voxel-style Water Tower (AC or Water Tank)
    if (rand > 0.6) {
      const leg1 = new THREE.BoxGeometry(0.3, 3.0, 0.3);
      leg1.translate(centerX - 1.2, currentHeight + 1.5, centerZ - 1.2);
      accessoryGeoms.push(leg1);
      const leg2 = new THREE.BoxGeometry(0.3, 3.0, 0.3);
      leg2.translate(centerX + 1.2, currentHeight + 1.5, centerZ + 1.2);
      accessoryGeoms.push(leg2);
      
      const tank = new THREE.BoxGeometry(2.4, 2.4, 2.4);
      tank.translate(centerX, currentHeight + 3.8, centerZ);
      accessoryGeoms.push(tank);
    }

    if (rand > 0.3) {
      const antBox = new THREE.BoxGeometry(0.2, 8.0, 0.2);
      antBox.translate(centerX, currentHeight + 4.0, centerZ);
      accessoryGeoms.push(antBox);

      const beaconG = new THREE.BoxGeometry(0.6, 0.6, 0.6);
      beaconG.translate(centerX, currentHeight + 8.0, centerZ);
      beaconGeoms.push(beaconG);
    }

    const billboardColor = this.billboardColors[Math.floor(rand * this.billboardColors.length)];

    if (rand > 0.3 && currentHeight > 25 && zMax < 20) {
      const signH = 6.0;
      const signW = 10.0;
      const billboard = new THREE.BoxGeometry(signW, signH, 0.5, Math.max(1, Math.round(signW / 2)), 1, 1);
      billboard.translate(centerX, currentHeight - 10, zMax + 0.3);
      billboardGeoms.push(billboard);

      // Neon billboards are highly emissive and glow naturally, so we omit point lights here
      // to keep PointLight pool slots open for distant streetlights.
    }

    // Build meshes inside building group using THREE.LOD for optimization
    const lod = new THREE.LOD();
    lod.position.set(posX, 0.35, posZ);

    const groundGeo = new THREE.BoxGeometry(this.tileSize, 0.35, this.tileSize, 8, 1, 8);
    applySidewalkUVs(groundGeo);
    groundGeo.translate(0, -0.175, 0);
    this.deformGeometryToHills(groundGeo, posX, posZ);

    const mergedFacade = BufferGeometryUtils.mergeGeometries(facadeGeoms);
    mergedFacade.translate(0, buildingBaseHeight, 0);
    
    // --- LOD Level 0: Full Detail (0m to 140m) ---
    const highGroup = new THREE.Group();
    const highGround = new THREE.Mesh(groundGeo, this.concreteMat);
    highGround.receiveShadow = true;
    highGroup.add(highGround);
    const facadeMesh = new THREE.Mesh(mergedFacade, bMat);
    facadeMesh.castShadow = true;
    facadeMesh.receiveShadow = true;
    highGroup.add(facadeMesh);

    let windowMeshShared = null;
    if (windowGeoms.length > 0) {
      const merged = BufferGeometryUtils.mergeGeometries(windowGeoms);
      merged.translate(0, buildingBaseHeight, 0);
      windowMeshShared = new THREE.Mesh(merged, this.windowDetailedMat);
      highGroup.add(windowMeshShared);
    }
    if (doorGeoms.length > 0) {
      const merged = BufferGeometryUtils.mergeGeometries(doorGeoms);
      merged.translate(0, buildingBaseHeight, 0);
      highGroup.add(new THREE.Mesh(merged, this.doorMat));
    }
    if (accessoryGeoms.length > 0) {
      const merged = BufferGeometryUtils.mergeGeometries(accessoryGeoms);
      merged.translate(0, buildingBaseHeight, 0);
      highGroup.add(new THREE.Mesh(merged, this.accessoryMat));
    }
    
    let billboardMesh = null;
    if (billboardGeoms.length > 0) {
      const mergedBill = BufferGeometryUtils.mergeGeometries(billboardGeoms);
      mergedBill.translate(0, buildingBaseHeight, 0);
      const neonMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        emissive: billboardColor,
        emissiveIntensity: 4.0
      });
      billboardMesh = new THREE.Mesh(mergedBill, neonMat);
      highGroup.add(billboardMesh);
    }
    
    let beaconMesh = null;
    if (beaconGeoms.length > 0) {
      const merged = BufferGeometryUtils.mergeGeometries(beaconGeoms);
      merged.translate(0, buildingBaseHeight, 0);
      const beaconMat = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 6.0
      });
      beaconMesh = new THREE.Mesh(merged, beaconMat);
      highGroup.add(beaconMesh);
    }
    lod.addLevel(highGroup, 0);

    // --- LOD Level 1: Medium Detail (280m to 400m) ---
    const medGroup = new THREE.Group();
    const medGround = new THREE.Mesh(groundGeo, this.concreteMat);
    medGround.receiveShadow = true;
    medGroup.add(medGround);
    const medFacade = new THREE.Mesh(mergedFacade, bMat);
    medFacade.castShadow = true;
    medFacade.receiveShadow = true;
    medGroup.add(medFacade);
    if (windowMeshShared) {
      medGroup.add(new THREE.Mesh(windowMeshShared.geometry, windowMeshShared.material));
    }
    if (billboardMesh) {
      medGroup.add(new THREE.Mesh(billboardMesh.geometry, billboardMesh.material));
    }
    if (beaconMesh) {
      medGroup.add(new THREE.Mesh(beaconMesh.geometry, beaconMesh.material));
    }
    lod.addLevel(medGroup, 280);

    // --- LOD Level 2: Low Detail (400m+) ---
    const lowGroup = new THREE.Group();
    const lowGround = new THREE.Mesh(groundGeo, this.concreteMat);
    lowGround.receiveShadow = true;
    lowGroup.add(lowGround);
    const lowFacade = new THREE.Mesh(mergedFacade, bMat);
    lowGroup.add(lowFacade);
    if (windowMeshShared) {
      lowGroup.add(new THREE.Mesh(windowMeshShared.geometry, windowMeshShared.material));
    }
    lod.addLevel(lowGroup, 400);

    group.add(lod);

    obstacles.push({
      xMin: posX + xMin,
      xMax: posX + xMax,
      zMin: posZ + zMin,
      zMax: posZ + zMax,
      height: currentHeight
    });
  }

