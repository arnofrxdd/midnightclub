import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { applySidewalkUVs } from './geometry.js';
import { getBlockInfo } from './mallTile.js';

export function isGasStationBlock(gridX, gridZ, roadCols, roadRows, isAlleyFn, getBaseHeightFn) {
  const block = getBlockInfo(gridX, gridZ, roadCols, roadRows);
  if (block.colMin === 0 || block.rowMin === 0) return false;
  
  // Only spawn on fixed 1x1 city blocks (40x40m) to avoid massive empty asphalt lots
  const blockW = block.colMax - block.colMin;
  const blockH = block.rowMax - block.rowMin;
  if (blockW !== 0 || blockH !== 0) return false;

  // Exclude the center area (reserved for the mall and heavy traffic)
  const distToCenter = Math.abs(block.colMin - 8) + Math.abs(block.rowMin - 8);
  if (distToCenter < 6) return false;
  
  // Use a pseudo-random hash based on the block's unique coordinates
  // Spawn rate: roughly 85% for debug testing
  const blockHash = ((block.colMin * 37) + (block.rowMin * 17)) % 100;
  
  if (blockHash < 85) { 
    if (getBaseHeightFn) {
      const cx = ((block.colMin + block.colMax) / 2) * 40.0;
      const cz = ((block.rowMin + block.rowMax) / 2) * 40.0;
      
      const xSpan = ((block.colMax - block.colMin) + 1) * 20.0;
      const zSpan = ((block.rowMax - block.rowMin) + 1) * 20.0;
      
      const hCenter = Math.abs(getBaseHeightFn(cx, cz));
      const hTL = Math.abs(getBaseHeightFn(cx - xSpan, cz - zSpan));
      const hBR = Math.abs(getBaseHeightFn(cx + xSpan, cz + zSpan));
      
      // Calculate how steep the hill is across this block
      const heightVariance = Math.abs(hTL - hCenter) + Math.abs(hBR - hCenter);
      
      // If it's on a hill, reject it so the canopy doesn't clip badly. Strictly enforce flat terrain.
      if (heightVariance > 2.0) return false;
    }
    
    return true;
  }
  
  return false;
}

export function buildGasStationTile(gridX, gridZ, posX, posZ, group, obstacles, lights) {
    const key = `gas_${gridX},${gridZ}`;
    const block = getBlockInfo(gridX, gridZ, this.roadColumns, this.roadRows);
    const buildingBaseHeight = this.getBaseHeight(posX, posZ);

    if (this.buildingGeoCache && this.buildingGeoCache.has(key)) {
      const cached = this.buildingGeoCache.get(key);
      const lod = new THREE.LOD();
      lod.position.set(posX, 0.35, posZ);
      
      const highGroup = new THREE.Group();
      const highGround = new THREE.Mesh(cached.groundGeo, this.concreteMat);
      highGround.receiveShadow = true;
      highGroup.add(highGround);
      
      if (cached.canopyGeo) {
         const cm = new THREE.Mesh(cached.canopyGeo, this.whiteLineMat);
         cm.castShadow = true; cm.receiveShadow = true;
         highGroup.add(cm);
      }
      if (cached.pillarsGeo) {
         const pm = new THREE.Mesh(cached.pillarsGeo, this.streetlightPoleMat);
         pm.castShadow = true; pm.receiveShadow = true;
         highGroup.add(pm);
      }
      if (cached.neonGeo) highGroup.add(new THREE.Mesh(cached.neonGeo, new THREE.MeshStandardMaterial({ name: 'showroomNeonMat_0', color: 0xff4400, emissive: 0xff4400, emissiveIntensity: 2.0 })));
      
      lod.addLevel(highGroup, 0);

      const lowGroup = new THREE.Group();
      lowGroup.add(new THREE.Mesh(cached.groundGeo, this.concreteMat));
      if (cached.canopyGeo) lowGroup.add(new THREE.Mesh(cached.canopyGeo, this.whiteLineMat));
      lod.addLevel(lowGroup, 300);

      group.add(lod);

      if (cached.breakables) {
        cached.breakables.forEach(b => {
          let mesh = null;
          if (b.type === 'gas_pump') {
            const geo = new THREE.BoxGeometry(1.2, 2.5, 0.8);
            geo.translate(0, 1.25, 0);
            mesh = new THREE.Mesh(geo, this.redMat || this.whiteLineMat);
            mesh.name = b.name;
          } else if (b.type === 'glass') {
            const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
            geo.rotateY(b.rot);
            geo.translate(0, b.h/2, 0);
            mesh = new THREE.Mesh(geo, this.phoneBoothGlassMat);
            mesh.name = b.name;
          }
          
          if (mesh) {
            mesh.position.copy(b.position);
            mesh.position.y -= buildingBaseHeight; 
            highGroup.add(mesh);
            
            this.breakables.push({
              type: b.type,
              position: b.position.clone(),
              radius: b.radius,
              broken: false,
              group: mesh,
              groupName: mesh.name,
              tileX: posX,
              tileZ: posZ,
              velocity: new THREE.Vector3(),
              angularVelocity: new THREE.Vector3()
            });
          }
        });
      }

      obstacles.push(...cached.obstacle);
      return;
    }

    const canopyGeoms = [];
    const pillarGeoms = [];
    const neonGeoms = [];
    const tileObstacles = [];
    const registeredBreakables = [];

    const isCenterTile = gridX === Math.floor((block.colMin + block.colMax) / 2) && 
                         gridZ === Math.floor((block.rowMin + block.rowMax) / 2);

    const groundGeo = new THREE.BoxGeometry(this.tileSize, 0.35, this.tileSize, 8, 1, 8);
    applySidewalkUVs(groundGeo);
    groundGeo.translate(0, -0.175, 0);
    this.deformGeometryToHills(groundGeo, posX, posZ);

    const lod = new THREE.LOD();
    lod.position.set(posX, 0.35, posZ);
    const highGroup = new THREE.Group();
    highGroup.add(new THREE.Mesh(groundGeo, this.concreteMat));

    const absCenterX = (block.colMin + block.colMax) / 2 * 40.0;
    const absCenterZ = (block.rowMin + block.rowMax) / 2 * 40.0;
    const bCx = absCenterX - posX;
    const bCz = absCenterZ - posZ;

    if (isCenterTile) {
      // Station Offset - placed slightly forward to leave room for the store in the back
      const stationX = bCx;
      const stationZ = bCz - 5.0;
      
      const canopyW = 28.0; // Wide enough to cover 3 islands and 4 lanes
      const canopyD = 18.0;
      const canopyHeight = 8.0;

      // 1. MEGA CANOPY (Multi-layered roof)
      // Main thick roof
      const roof = new THREE.BoxGeometry(canopyW, 1.2, canopyD);
      roof.translate(stationX, canopyHeight + 0.6 + buildingBaseHeight, stationZ);
      canopyGeoms.push(roof);
      
      // Bottom flat ceiling (illuminated)
      const ceiling = new THREE.BoxGeometry(canopyW - 0.5, 0.2, canopyD - 0.5);
      ceiling.translate(stationX, canopyHeight + buildingBaseHeight, stationZ);
      canopyGeoms.push(ceiling);
      
      // Bright Neon Rim (wraps the entire canopy)
      const neonRim = new THREE.BoxGeometry(canopyW + 0.4, 0.6, canopyD + 0.4);
      neonRim.translate(stationX, canopyHeight + 0.6 + buildingBaseHeight, stationZ);
      neonGeoms.push(neonRim);
      
      // Giant area light illuminating the pumps
      lights.push({
        x: posX + stationX, y: canopyHeight - 0.5 + buildingBaseHeight, z: posZ + stationZ,
        intensity: 6.0, color: 0xffffee
      });

      // 2. CONCRETE PUMP ISLANDS & GAS PUMPS
      // 3 parallel islands creating 4 driving lanes
      const numIslands = 3;
      const laneSpacing = 9.0;
      const islandW = 2.0;
      const islandD = 12.0;
      const islandH = 0.35;
      
      for (let i = 0; i < numIslands; i++) {
        // -9.0, 0, +9.0
        const ix = stationX + (i - 1) * laneSpacing;
        const iz = stationZ;
        
        // Raised Concrete Pad
        const padGeo = new THREE.BoxGeometry(islandW, islandH, islandD);
        padGeo.translate(ix, islandH/2 + buildingBaseHeight, iz);
        // Use concrete material (we merge it into pillarGeoms for simplicity as it uses the same grey)
        pillarGeoms.push(padGeo);
        
        // Solid physical collision for the island
        tileObstacles.push({
          xMin: posX + ix - islandW/2, xMax: posX + ix + islandW/2,
          zMin: posZ + iz - islandD/2, zMax: posZ + iz + islandD/2,
          height: islandH, isBuilding: true
        });

        // Massive Heavy Pillar supporting the canopy (1 thick pillar per island)
        const pillarGeo = new THREE.BoxGeometry(1.2, canopyHeight, 1.2);
        pillarGeo.translate(ix, canopyHeight/2 + buildingBaseHeight, iz);
        pillarGeoms.push(pillarGeo);
        
        // Pillar Collision
        tileObstacles.push({
          xMin: posX + ix - 0.6, xMax: posX + ix + 0.6,
          zMin: posZ + iz - 0.6, zMax: posZ + iz + 0.6,
          height: canopyHeight, isBuilding: true
        });

        // Place 2 Breakable Gas Pumps per island (front and back of the pillar)
        const pumpOffsets = [ -3.5, 3.5 ]; // Z offsets
        
        pumpOffsets.forEach((pzOffset, pIdx) => {
          const pumpX = ix;
          const pumpZ = iz + pzOffset;
          const pumpName = `pump_${gridX}_${gridZ}_${i}_${pIdx}`;
          
          const pumpGeo = new THREE.BoxGeometry(1.2, 2.5, 0.8);
          pumpGeo.translate(0, 1.25, 0); 
          const pumpMesh = new THREE.Mesh(pumpGeo, this.redMat || this.whiteLineMat);
          pumpMesh.name = pumpName;
          
          // Place ON TOP of the island
          const pumpBaseY = islandH + buildingBaseHeight; 
          const pumpWorldPos = new THREE.Vector3(posX + pumpX, pumpBaseY, posZ + pumpZ);
          pumpMesh.position.set(pumpX, pumpBaseY, pumpZ);
          highGroup.add(pumpMesh);
          
          const pumpObj = {
            type: 'gas_pump', name: pumpName, position: pumpWorldPos, radius: 1.5,
            broken: false, group: pumpMesh, groupName: pumpName,
            tileX: posX, tileZ: posZ,
            velocity: new THREE.Vector3(), angularVelocity: new THREE.Vector3()
          };
          this.breakables.push(pumpObj);
          registeredBreakables.push({
            type: 'gas_pump', name: pumpName, position: pumpWorldPos, radius: 1.5
          });
          
          // Pump light
          lights.push({
            x: posX + pumpX, y: 3.5 + buildingBaseHeight, z: posZ + pumpZ,
            intensity: 1.5, color: 0xffaa77 // Warm orange glow
          });
        });
      }

      // 3. DETAILED CONVENIENCE STORE (Located behind the canopy)
      const storeW = 20.0;
      const storeH = 4.8;
      const storeD = 12.0;
      const storeX = bCx;
      const storeZ = bCz + 12.0; 
      
      // Solid Walls (Back and Sides)
      const wallThickness = 0.5;
      const bWall = new THREE.BoxGeometry(storeW, storeH, wallThickness);
      bWall.translate(storeX, storeH/2 + buildingBaseHeight, storeZ + storeD/2);
      canopyGeoms.push(bWall); // Add to white line mat (clean white building)
      
      const lWall = new THREE.BoxGeometry(wallThickness, storeH, storeD);
      lWall.translate(storeX - storeW/2, storeH/2 + buildingBaseHeight, storeZ);
      canopyGeoms.push(lWall);
      
      const rWall = new THREE.BoxGeometry(wallThickness, storeH, storeD);
      rWall.translate(storeX + storeW/2, storeH/2 + buildingBaseHeight, storeZ);
      canopyGeoms.push(rWall);
      
      // Building Collision
      tileObstacles.push({
        xMin: posX + storeX - storeW/2, xMax: posX + storeX + storeW/2,
        zMin: posZ + storeZ - storeD/2, zMax: posZ + storeZ + storeD/2,
        height: storeH, isBuilding: true
      });

      // Glass Storefront (Breakable)
      // Using two large glass panes for the front
      const glassPanes = [
        { w: storeW/2 - 0.2, h: storeH, d: 0.2, x: storeX - storeW/4, z: storeZ - storeD/2 },
        { w: storeW/2 - 0.2, h: storeH, d: 0.2, x: storeX + storeW/4, z: storeZ - storeD/2 }
      ];

      glassPanes.forEach((w, idx) => {
        const wallName = `storeglass_${gridX}_${gridZ}_${idx}`;
        const gGeo = new THREE.BoxGeometry(w.w, w.h, w.d);
        gGeo.translate(0, w.h/2, 0); 
        const gMesh = new THREE.Mesh(gGeo, this.phoneBoothGlassMat);
        gMesh.name = wallName;
        
        const gWorldPos = new THREE.Vector3(posX + w.x, buildingBaseHeight, posZ + w.z);
        gMesh.position.set(w.x, buildingBaseHeight, w.z);
        highGroup.add(gMesh);
        
        const bObj = {
          type: 'glass', name: wallName, position: gWorldPos, radius: w.w / 2 + 1.0,
          broken: false, group: gMesh, groupName: wallName,
          tileX: posX, tileZ: posZ,
          velocity: new THREE.Vector3(), angularVelocity: new THREE.Vector3()
        };
        this.breakables.push(bObj);
        registeredBreakables.push({
          type: 'glass', name: wallName, position: gWorldPos, radius: bObj.radius,
          w: w.w, h: w.h, d: w.d, rot: 0
        });
      });
      
      // Massive Overhanging Store Roof
      const sRoofW = storeW + 2.0;
      const sRoofD = storeD + 4.0; // Overhangs 4 meters in the front!
      const sRoof = new THREE.BoxGeometry(sRoofW, 0.8, sRoofD);
      sRoof.translate(storeX, storeH + 0.4 + buildingBaseHeight, storeZ - 2.0); // Shifted forward to overhang
      canopyGeoms.push(sRoof);
      
      // Store lighting
      lights.push({
        x: posX + storeX, y: storeH - 0.5 + buildingBaseHeight, z: posZ + storeZ - 2.0,
        intensity: 2.5, color: 0xffffff
      });

      // 4. MEGA MONOLITH PRICE SIGN (Corner of the lot)
      const signX = bCx - 14.0;
      const signZ = bCz - 14.0;
      
      // Tall Concrete Pole
      const signPoleGeo = new THREE.BoxGeometry(1.5, 14.0, 1.5);
      signPoleGeo.translate(signX, 7.0 + buildingBaseHeight, signZ);
      pillarGeoms.push(signPoleGeo);
      
      tileObstacles.push({
        xMin: posX + signX - 0.75, xMax: posX + signX + 0.75,
        zMin: posZ + signZ - 0.75, zMax: posZ + signZ + 0.75,
        height: 14.0, isBuilding: true
      });
      
      // Massive Glowing Sign Box at the top
      const signBoxGeo = new THREE.BoxGeometry(5.0, 4.0, 1.0);
      signBoxGeo.rotateY(Math.PI / 4); // Angle it towards the intersection
      signBoxGeo.translate(signX, 13.0 + buildingBaseHeight, signZ);
      neonGeoms.push(signBoxGeo);
      
      // Sign Light
      lights.push({
        x: posX + signX, y: 15.0 + buildingBaseHeight, z: posZ + signZ,
        intensity: 4.0, color: 0xff002b
      });
    }

    let mergedCanopy = null;
    if (canopyGeoms.length > 0) {
      mergedCanopy = BufferGeometryUtils.mergeGeometries(canopyGeoms);
      const m = new THREE.Mesh(mergedCanopy, this.whiteLineMat);
      m.castShadow = true; m.receiveShadow = true;
      highGroup.add(m);
    }
    
    let mergedPillars = null;
    if (pillarGeoms.length > 0) {
      mergedPillars = BufferGeometryUtils.mergeGeometries(pillarGeoms);
      const m = new THREE.Mesh(mergedPillars, this.streetlightPoleMat);
      m.castShadow = true; m.receiveShadow = true;
      highGroup.add(m);
    }

    let mergedNeon = null;
    if (neonGeoms.length > 0) {
      mergedNeon = BufferGeometryUtils.mergeGeometries(neonGeoms);
      const m = new THREE.Mesh(mergedNeon, new THREE.MeshStandardMaterial({ name: 'showroomNeonMat_0', color: 0xff4400, emissive: 0xff4400, emissiveIntensity: 2.0 }));
      highGroup.add(m);
    }

    lod.addLevel(highGroup, 0);

    const lowGroup = new THREE.Group();
    lowGroup.add(new THREE.Mesh(groundGeo, this.concreteMat));
    if (mergedCanopy) lowGroup.add(new THREE.Mesh(mergedCanopy, this.whiteLineMat));
    lod.addLevel(lowGroup, 300);

    group.add(lod);

    if (this.buildingGeoCache) {
      this.buildingGeoCache.set(key, {
        groundGeo,
        canopyGeo: mergedCanopy,
        pillarsGeo: mergedPillars,
        neonGeo: mergedNeon,
        obstacle: tileObstacles,
        breakables: registeredBreakables
      });
    }

    obstacles.push(...tileObstacles);
}
