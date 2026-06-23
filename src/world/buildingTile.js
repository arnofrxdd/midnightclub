import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createDetailedWindowGeometry, applySidewalkUVs } from './geometry.js';

export function buildBuildingTile(gridX, gridZ, posX, posZ, group, obstacles, lights) {
    const key = `${gridX},${gridZ}`;
    if (this.buildingGeoCache && this.buildingGeoCache.has(key)) {
      const cached = this.buildingGeoCache.get(key);
      const lod = new THREE.LOD();
      lod.position.set(posX, 0.35, posZ);
      
      const highGroup = new THREE.Group();
      const highGround = new THREE.Mesh(cached.groundGeo, this.concreteMat);
      highGround.isGround = true;
      highGround.receiveShadow = true;
      highGroup.add(highGround);
      const facadeMesh = new THREE.Mesh(cached.facadeGeo, cached.bMat);
      facadeMesh.castShadow = true;
      facadeMesh.receiveShadow = true;
      highGroup.add(facadeMesh);
      
      if (cached.windowGeo) {
        highGroup.add(new THREE.Mesh(cached.windowGeo, this.windowDetailedMat));
      }
      if (cached.doorGeo) {
        highGroup.add(new THREE.Mesh(cached.doorGeo, this.doorMat));
      }
      if (cached.accessoryGeo) {
        highGroup.add(new THREE.Mesh(cached.accessoryGeo, this.accessoryMat));
      }
      if (cached.billboardGeo) {
        const neonMat = new THREE.MeshStandardMaterial({
          color: 0x111111,
          emissive: cached.billboardColor,
          emissiveIntensity: 4.0
        });
        highGroup.add(new THREE.Mesh(cached.billboardGeo, neonMat));
      }
      if (cached.beaconGeo) {
        const beaconMat = new THREE.MeshStandardMaterial({
          color: 0xff0000,
          emissive: 0xff0000,
          emissiveIntensity: 6.0
        });
        highGroup.add(new THREE.Mesh(cached.beaconGeo, beaconMat));
      }
      lod.addLevel(highGroup, 0);

      const medGroup = new THREE.Group();
      const medGround = new THREE.Mesh(cached.groundGeo, this.concreteMat);
      medGround.isGround = true;
      medGround.receiveShadow = true;
      medGroup.add(medGround);
      const medFacade = new THREE.Mesh(cached.facadeGeo, cached.bMat);
      medFacade.castShadow = true;
      medFacade.receiveShadow = true;
      medGroup.add(medFacade);
      if (cached.windowGeo) {
        medGroup.add(new THREE.Mesh(cached.windowGeo, this.windowDetailedMat));
      }
      if (cached.billboardGeo) {
        const neonMat = new THREE.MeshStandardMaterial({
          color: 0x111111,
          emissive: cached.billboardColor,
          emissiveIntensity: 4.0
        });
        medGroup.add(new THREE.Mesh(cached.billboardGeo, neonMat));
      }
      if (cached.beaconGeo) {
        const beaconMat = new THREE.MeshStandardMaterial({
          color: 0xff0000,
          emissive: 0xff0000,
          emissiveIntensity: 6.0
        });
        medGroup.add(new THREE.Mesh(cached.beaconGeo, beaconMat));
      }
      lod.addLevel(medGroup, 280);

      const lowGroup = new THREE.Group();
      const lowGround = new THREE.Mesh(cached.groundGeo, this.concreteMat);
      lowGround.isGround = true;
      lowGround.receiveShadow = true;
      lowGroup.add(lowGround);
      const lowFacade = new THREE.Mesh(cached.facadeGeo, cached.bMat);
      lowGroup.add(lowFacade);
      if (cached.windowGeo) {
        lowGroup.add(new THREE.Mesh(cached.windowGeo, this.windowDetailedMat));
      }
      lod.addLevel(lowGroup, 400);

      group.add(lod);

      if (cached.lights) {
        cached.lights.forEach(light => {
          const newPoolMesh = light.poolMesh.clone();
          group.add(newPoolMesh);
          lights.push({
            x: light.x,
            y: light.y,
            z: light.z,
            intensity: light.intensity,
            color: light.color,
            poolMesh: newPoolMesh,
            defaultOpacity: light.defaultOpacity
          });
        });
      }
      obstacles.push(cached.obstacle);
      return;
    }

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
    highGround.isGround = true;
    highGround.receiveShadow = true;
    highGroup.add(highGround);
    const facadeMesh = new THREE.Mesh(mergedFacade, bMat);
    facadeMesh.castShadow = true;
    facadeMesh.receiveShadow = true;
    highGroup.add(facadeMesh);

    groundGeo.isCached = true;
    mergedFacade.isCached = true;

    let windowGeo = null;
    let windowMeshShared = null;
    if (windowGeoms.length > 0) {
      const merged = BufferGeometryUtils.mergeGeometries(windowGeoms);
      merged.translate(0, buildingBaseHeight, 0);
      windowGeo = merged;
      windowGeo.isCached = true;
      windowMeshShared = new THREE.Mesh(merged, this.windowDetailedMat);
      highGroup.add(windowMeshShared);
    }
    
    let doorGeo = null;
    if (doorGeoms.length > 0) {
      const merged = BufferGeometryUtils.mergeGeometries(doorGeoms);
      merged.translate(0, buildingBaseHeight, 0);
      doorGeo = merged;
      doorGeo.isCached = true;
      highGroup.add(new THREE.Mesh(merged, this.doorMat));
    }
    
    let accessoryGeo = null;
    if (accessoryGeoms.length > 0) {
      const merged = BufferGeometryUtils.mergeGeometries(accessoryGeoms);
      merged.translate(0, buildingBaseHeight, 0);
      accessoryGeo = merged;
      accessoryGeo.isCached = true;
      highGroup.add(new THREE.Mesh(merged, this.accessoryMat));
    }
    
    let billboardMesh = null;
    let billboardGeo = null;
    if (billboardGeoms.length > 0) {
      const mergedBill = BufferGeometryUtils.mergeGeometries(billboardGeoms);
      mergedBill.translate(0, buildingBaseHeight, 0);
      billboardGeo = mergedBill;
      billboardGeo.isCached = true;
      const neonMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        emissive: billboardColor,
        emissiveIntensity: 4.0
      });
      billboardMesh = new THREE.Mesh(mergedBill, neonMat);
      highGroup.add(billboardMesh);
    }
    
    let beaconMesh = null;
    let beaconGeo = null;
    if (beaconGeoms.length > 0) {
      const merged = BufferGeometryUtils.mergeGeometries(beaconGeoms);
      merged.translate(0, buildingBaseHeight, 0);
      beaconGeo = merged;
      beaconGeo.isCached = true;
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
    medGround.isGround = true;
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
    lowGround.isGround = true;
    lowGround.receiveShadow = true;
    lowGroup.add(lowGround);
    const lowFacade = new THREE.Mesh(mergedFacade, bMat);
    lowGroup.add(lowFacade);
    if (windowMeshShared) {
      lowGroup.add(new THREE.Mesh(windowMeshShared.geometry, windowMeshShared.material));
    }
    lod.addLevel(lowGroup, 400);

    group.add(lod);

    const obstacle = {
      xMin: posX + xMin,
      xMax: posX + xMax,
      zMin: posZ + zMin,
      zMax: posZ + zMax,
      height: currentHeight
    };
    obstacles.push(obstacle);

    if (this.buildingGeoCache) {
      this.buildingGeoCache.set(key, {
        groundGeo,
        facadeGeo: mergedFacade,
        windowGeo,
        doorGeo,
        accessoryGeo,
        billboardGeo,
        billboardColor,
        beaconGeo,
        bMat,
        obstacle,
        lights: []
      });

      if (this.buildingGeoCache.size > 500) {
        for (const [cacheKey, toEvict] of this.buildingGeoCache.entries()) {
          if (!this.loadedTiles.has(cacheKey)) {
            this.buildingGeoCache.delete(cacheKey);
            if (toEvict.groundGeo) toEvict.groundGeo.dispose();
            if (toEvict.facadeGeo) toEvict.facadeGeo.dispose();
            if (toEvict.windowGeo) toEvict.windowGeo.dispose();
            if (toEvict.doorGeo) toEvict.doorGeo.dispose();
            if (toEvict.accessoryGeo) toEvict.accessoryGeo.dispose();
            if (toEvict.billboardGeo) toEvict.billboardGeo.dispose();
            if (toEvict.beaconGeo) toEvict.beaconGeo.dispose();
            break;
          }
        }
      }
    }
  }
