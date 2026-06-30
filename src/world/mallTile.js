import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { applySidewalkUVs } from './geometry.js';

export function getBlockInfo(gridX, gridZ, roadCols, roadRows) {
  const cols = Array.from(roadCols).sort((a, b) => a - b);
  const rows = Array.from(roadRows).sort((a, b) => a - b);

  let colMin = 0, colMax = 0;
  for (let i = 0; i < cols.length - 1; i++) {
    if (gridX > cols[i] && gridX < cols[i+1]) {
      colMin = cols[i] + 1;
      colMax = cols[i+1] - 1;
      break;
    }
  }

  let rowMin = 0, rowMax = 0;
  for (let i = 0; i < rows.length - 1; i++) {
    if (gridZ > rows[i] && gridZ < rows[i+1]) {
      rowMin = rows[i] + 1;
      rowMax = rows[i+1] - 1;
      break;
    }
  }

  return { colMin, colMax, rowMin, rowMax };
}

export function isMallBlock(gridX, gridZ, roadCols, roadRows, isAlleyFn, getBaseHeightFn) {
  // Spawn one large mall block in a flat/central area
  const block = getBlockInfo(gridX, gridZ, roadCols, roadRows);
  if (block.colMin === 0 || block.rowMin === 0) return false;
  
  // Systematically find the flattest block near the city center
  let selectedColMin = -999;
  let selectedRowMin = -999;
  
  if (getBaseHeightFn) {
    let minHeight = 99999;
    // Scan a grid of tiles (from grid 2 to 15) to find the block with the absolute lowest terrain
    for (let x = 2; x <= 15; x += 2) {
      for (let z = 2; z <= 15; z += 2) {
        const b = getBlockInfo(x, z, roadCols, roadRows);
        if (b.colMin !== 0 && b.rowMin !== 0) {
          // Calculate center of this block in world coordinates
          const cx = ((b.colMin + b.colMax) / 2) * 40.0;
          const cz = ((b.rowMin + b.rowMax) / 2) * 40.0;
          
          // Sample the 4 corners of the block to ensure the whole block is flat
          const xSpan = (b.colMax - b.colMin) * 20.0;
          const zSpan = (b.rowMax - b.rowMin) * 20.0;
          
          const hCenter = Math.abs(getBaseHeightFn(cx, cz));
          const hTL = Math.abs(getBaseHeightFn(cx - xSpan, cz - zSpan));
          const hBR = Math.abs(getBaseHeightFn(cx + xSpan, cz + zSpan));
          
          // The block with the lowest average height variation wins
          const avgHeight = (hCenter + hTL + hBR) / 3;
          
          if (avgHeight < minHeight) {
            minHeight = avgHeight;
            selectedColMin = b.colMin;
            selectedRowMin = b.rowMin;
          }
        }
      }
    }
  }

  if (selectedColMin !== -999) {
    return (block.colMin === selectedColMin && block.rowMin === selectedRowMin);
  }

  // Fallback to coordinates 3,3 if flat scan is not available
  const targetGridX = 3;
  const targetGridZ = 3;
  return (targetGridX >= block.colMin && targetGridX <= block.colMax &&
          targetGridZ >= block.rowMin && targetGridZ <= block.rowMax);
}

export function buildMallTile(gridX, gridZ, posX, posZ, group, obstacles, lights) {
    const key = `${gridX},${gridZ}`;
    const block = getBlockInfo(gridX, gridZ, this.roadColumns, this.roadRows);
    const buildingBaseHeight = this.getBaseHeight(posX, posZ);

    const l1Height = 9.0;
    const l2Height = 8.0;
    const totalHeight = l1Height + l2Height;

    // Check Cache
    if (this.buildingGeoCache && this.buildingGeoCache.has(key)) {
      const cached = this.buildingGeoCache.get(key);
      const lod = new THREE.LOD();
      lod.position.set(posX, 0.35, posZ);
      
      const highGroup = new THREE.Group();
      const highGround = new THREE.Mesh(cached.groundGeo, this.concreteMat);
      highGround.isGround = true;
      highGround.receiveShadow = true;
      highGroup.add(highGround);
      
      if (cached.facadeGeo) {
        const facadeMesh = new THREE.Mesh(cached.facadeGeo, this.whiteLineMat);
        facadeMesh.castShadow = true;
        facadeMesh.receiveShadow = true;
        highGroup.add(facadeMesh);
      }
      if (cached.accessoryGeo) {
        highGroup.add(new THREE.Mesh(cached.accessoryGeo, this.accessoryMat));
      }
      if (cached.glassGeo) {
        highGroup.add(new THREE.Mesh(cached.glassGeo, this.phoneBoothGlassMat));
      }
      
      // Restore breakable corner glass if it exists
      if (cached.cornerGlassGeo) {
        const glassMesh = new THREE.Mesh(cached.cornerGlassGeo, this.phoneBoothGlassMat);
        glassMesh.name = cached.cornerGlassName;
        highGroup.add(glassMesh);
      }

      lod.addLevel(highGroup, 0);

      const medGroup = new THREE.Group();
      medGroup.add(new THREE.Mesh(cached.groundGeo, this.concreteMat));
      if (cached.facadeGeo) medGroup.add(new THREE.Mesh(cached.facadeGeo, this.whiteLineMat));
      lod.addLevel(medGroup, 280);

      const lowGroup = new THREE.Group();
      lowGroup.add(new THREE.Mesh(cached.groundGeo, this.concreteMat));
      if (cached.facadeGeo) lowGroup.add(new THREE.Mesh(cached.facadeGeo, this.whiteLineMat));
      lod.addLevel(lowGroup, 400);

      group.add(lod);

      if (cached.breakables) {
        cached.breakables.forEach(b => {
          let glassMesh = null;
          highGroup.traverse(child => {
            if (child.name === b.name) glassMesh = child;
          });
          if (glassMesh) {
            this.breakables.push({
              type: 'glass',
              position: b.position.clone(),
              radius: b.radius,
              broken: false,
              group: glassMesh,
              groupName: glassMesh.name,
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

    const facadeGeoms = [];
    const accessoryGeoms = [];
    const glassGeoms = [];
    const tileObstacles = [];
    const tileLights = [];
    const registeredBreakables = [];

    const isLeftBorder = gridX === block.colMin;
    const isRightBorder = gridX === block.colMax;
    const isTopBorder = gridZ === block.rowMin;
    const isBottomBorder = gridZ === block.rowMax;

    // Helper to add clean straight wall segment
    const addWallSegment = (xCenter, zCenter, wWidth, wDepth, wHeight) => {
      const box = new THREE.BoxGeometry(wWidth, wHeight, wDepth);
      box.translate(xCenter, wHeight / 2, zCenter);
      facadeGeoms.push(box);

      // Deep foundation to avoid gaps on hills
      const foundation = new THREE.BoxGeometry(wWidth, 15.0, wDepth);
      foundation.translate(xCenter, -7.5, zCenter);
      facadeGeoms.push(foundation);

      tileObstacles.push({
        xMin: posX + xCenter - wWidth/2,
        xMax: posX + xCenter + wWidth/2,
        zMin: posZ + zCenter - wDepth/2,
        zMax: posZ + zCenter + wDepth/2,
        height: wHeight,
        isBuilding: true
      });
    };

    // 1. BOUNDARY WALLS & CHAMFERED DIAGONAL CORNERS
    const wallThick = 2.0;
    const halfThick = wallThick / 2;

    const isTL = (isLeftBorder && isTopBorder);
    const isTR = (isRightBorder && isTopBorder);
    const isBL = (isLeftBorder && isBottomBorder);
    const isBR = (isRightBorder && isBottomBorder);

    // Left Wall
    if (isLeftBorder) {
      if (isTL) {
        // Chamfered corner stops at z = -10
        addWallSegment(-20 + halfThick, 5.0, wallThick, 30.0, totalHeight);
      } else if (isBL) {
        // Chamfered corner stops at z = 10
        addWallSegment(-20 + halfThick, -5.0, wallThick, 30.0, totalHeight);
      } else {
        // Full straight wall
        addWallSegment(-20 + halfThick, 0, wallThick, 40.0, totalHeight);
      }
    }

    // Right Wall
    if (isRightBorder) {
      if (isTR) {
        addWallSegment(20 - halfThick, 5.0, wallThick, 30.0, totalHeight);
      } else if (isBR) {
        addWallSegment(20 - halfThick, -5.0, wallThick, 30.0, totalHeight);
      } else {
        addWallSegment(20 - halfThick, 0, wallThick, 40.0, totalHeight);
      }
    }

    // Top Wall
    if (isTopBorder) {
      if (isTL) {
        addWallSegment(5.0, -20 + halfThick, 30.0, wallThick, totalHeight);
      } else if (isTR) {
        addWallSegment(-5.0, -20 + halfThick, 30.0, wallThick, totalHeight);
      } else {
        addWallSegment(0, -20 + halfThick, 40.0, wallThick, totalHeight);
      }
    }

    // Bottom Wall
    if (isBottomBorder) {
      if (isBL) {
        addWallSegment(5.0, 20 - halfThick, 30.0, wallThick, totalHeight);
      } else if (isBR) {
        addWallSegment(-5.0, 20 - halfThick, 30.0, wallThick, totalHeight);
      } else {
        addWallSegment(0, 20 - halfThick, 40.0, wallThick, totalHeight);
      }
    }

    // 2. DIAGONAL CORNER GLASS PLACEMENT (Breakable Showroom Entrance Gates)
    let glassMeshName = '';
    let glassPaneGeo = null;
    let gx = 0, gz = 0, gRot = 0;

    if (isTL) {
      gx = -14.5; gz = -14.5; gRot = Math.PI / 4;
      glassMeshName = 'glass_tl';
    } else if (isTR) {
      gx = 14.5; gz = -14.5; gRot = -Math.PI / 4;
      glassMeshName = 'glass_tr';
    } else if (isBL) {
      gx = -14.5; gz = 14.5; gRot = -Math.PI / 4;
      glassMeshName = 'glass_bl';
    } else if (isBR) {
      gx = 14.5; gz = 14.5; gRot = Math.PI / 4;
      glassMeshName = 'glass_br';
    }

    // Fill the empty gap above the 9m tall glass pane up to the full building height
    if (glassMeshName !== '') {
      const topWallHeight = totalHeight - l1Height;
      if (topWallHeight > 0) {
        const topWallGeo = new THREE.BoxGeometry(14.2, topWallHeight, wallThick);
        topWallGeo.rotateY(gRot);
        topWallGeo.translate(gx, l1Height + topWallHeight / 2, gz);
        facadeGeoms.push(topWallGeo);
      }
    }

    const lod = new THREE.LOD();
    lod.position.set(posX, 0.35, posZ);

    const groundGeo = new THREE.BoxGeometry(this.tileSize, 0.35, this.tileSize, 8, 1, 8);
    applySidewalkUVs(groundGeo);
    groundGeo.translate(0, -0.175, 0);
    this.deformGeometryToHills(groundGeo, posX, posZ);

    const highGroup = new THREE.Group();
    highGroup.add(new THREE.Mesh(groundGeo, this.concreteMat));

    let mergedFacade = null;
    if (facadeGeoms.length > 0) {
      mergedFacade = BufferGeometryUtils.mergeGeometries(facadeGeoms);
      mergedFacade.translate(0, buildingBaseHeight, 0);
      const facadeMesh = new THREE.Mesh(mergedFacade, this.whiteLineMat);
      facadeMesh.castShadow = true;
      facadeMesh.receiveShadow = true;
      highGroup.add(facadeMesh);
    }

    // Spawn the corner glass as individual breakable meshes so the physics engine registers them
    if (glassMeshName !== '') {
      glassPaneGeo = new THREE.BoxGeometry(13.5, l1Height, 0.25);
      glassPaneGeo.rotateY(gRot);
      glassPaneGeo.translate(gx, l1Height / 2 + buildingBaseHeight, gz);

      const glassMesh = new THREE.Mesh(glassPaneGeo, this.phoneBoothGlassMat);
      glassMesh.name = glassMeshName;
      highGroup.add(glassMesh);

      // Clean top/bottom frames
      const frameBot = new THREE.BoxGeometry(13.6, 0.3, 0.4);
      frameBot.rotateY(gRot);
      frameBot.translate(gx, 0.15 + buildingBaseHeight, gz);
      accessoryGeoms.push(frameBot);

      const frameTop = new THREE.BoxGeometry(13.6, 0.3, 0.4);
      frameTop.rotateY(gRot);
      frameTop.translate(gx, l1Height - 0.15 + buildingBaseHeight, gz);
      accessoryGeoms.push(frameTop);

      const bObject = {
        type: 'glass',
        position: new THREE.Vector3(posX + gx, l1Height / 2 + buildingBaseHeight, posZ + gz),
        radius: 6.5,
        broken: false,
        group: glassMesh,
        groupName: glassMesh.name,
        tileX: posX,
        tileZ: posZ,
        velocity: new THREE.Vector3(),
        angularVelocity: new THREE.Vector3()
      };
      this.breakables.push(bObject);

      registeredBreakables.push({
        name: glassMeshName,
        position: bObject.position,
        radius: bObject.radius
      });
    }

    // 3. MALL INTERIOR SHOWCASE (Anchored to Center Tile to prevent unloading, offset to exact mathematical center)
    const centerGridX = Math.floor((block.colMin + block.colMax) / 2);
    const centerGridZ = Math.floor((block.rowMin + block.rowMax) / 2);
    const isCenterTile = (gridX === centerGridX && gridZ === centerGridZ);

    if (isCenterTile) {
      // Calculate absolute center of the mall block in world coordinates
      const absCenterX = (block.colMin + block.colMax) / 2 * 40.0;
      const absCenterZ = (block.rowMin + block.rowMax) / 2 * 40.0;
      
      // Offset from this center tile to the exact mathematical center of the block (handles even-sized 2x2/4x4 blocks perfectly)
      const bCx = absCenterX - posX;
      const bCz = absCenterZ - posZ;

      // Main Center Exhibit Pedestal (Huge)
      const pedestalGeo = new THREE.CylinderGeometry(14.0, 14.5, 0.8, 32);
      pedestalGeo.translate(bCx, 0.4 + buildingBaseHeight, bCz);
      const pedestalMesh = new THREE.Mesh(pedestalGeo, this.concreteMat);
      highGroup.add(pedestalMesh);
      
      // Solid collision boundary for the pedestal so players can crash into the showcase
      tileObstacles.push({
        xMin: posX + bCx - 14.5, xMax: posX + bCx + 14.5, // Outer bounds for spatial grid
        zMin: posZ + bCz - 14.5, zMax: posZ + bCz + 14.5,
        isCircle: true,
        cx: posX + bCx,
        cz: posZ + bCz,
        radius: 14.0,
        height: 1.0, isBuilding: true 
      });

      // Neon Rim on Pedestal
      const neonRimGeo = new THREE.TorusGeometry(14.2, 0.15, 8, 64);
      neonRimGeo.rotateX(Math.PI / 2);
      neonRimGeo.translate(bCx, 0.8 + buildingBaseHeight, bCz); 
      const rimMat = new THREE.MeshStandardMaterial({ name: 'showroomNeonMat_1' });
      highGroup.add(new THREE.Mesh(neonRimGeo, rimMat)); 

      // Showcase Cars (4 exotic tuner cars facing outwards)
      const angles = [0, Math.PI / 2, Math.PI, -Math.PI / 2];
      
      for(let i=0; i<4; i++) {
        const angle = angles[i];
        const cx = bCx + Math.cos(angle) * 8.0; 
        const cz = bCz + Math.sin(angle) * 8.0;
        
        // 1. NEON CAR FOUNDATION PAD
        const padGeo = new THREE.BoxGeometry(5.8, 0.1, 3.0);
        padGeo.rotateY(-angle);
        padGeo.translate(cx, 0.85 + buildingBaseHeight, cz);
        const padMat = new THREE.MeshStandardMaterial({ name: 'showroomPadMat' });
        highGroup.add(new THREE.Mesh(padGeo, padMat));

        const neonPadGeo = new THREE.BoxGeometry(6.0, 0.05, 3.2);
        neonPadGeo.rotateY(-angle);
        neonPadGeo.translate(cx, 0.82 + buildingBaseHeight, cz);
        const neonPadMat = new THREE.MeshStandardMaterial({ name: `showroomNeonMat_${i}` });
        highGroup.add(new THREE.Mesh(neonPadGeo, neonPadMat)); 

        // 2. AAA REIMAGINED TUNER CAR GEOMETRY
        const carParts = [];
        
        // Lowered Chassis
        const chassis = new THREE.BoxGeometry(4.8, 0.25, 2.1);
        chassis.translate(0, 1.30 + buildingBaseHeight, 0); // Raised +0.3
        carParts.push(chassis);

        // Angled Sport Hood
        const hood = new THREE.BoxGeometry(1.6, 0.25, 1.9);
        hood.rotateZ(0.15);
        hood.translate(1.6, 1.45 + buildingBaseHeight, 0); // Raised +0.3
        carParts.push(hood);

        // Teardrop Cabin
        const cabin = new THREE.BoxGeometry(2.0, 0.45, 1.6);
        cabin.translate(-0.3, 1.75 + buildingBaseHeight, 0); // Raised +0.3
        carParts.push(cabin);

        // GT Spoiler Blade & Struts
        const spoiler = new THREE.BoxGeometry(0.5, 0.05, 2.1);
        spoiler.translate(-2.2, 1.85 + buildingBaseHeight, 0); // Raised +0.3
        carParts.push(spoiler);
        const strut1 = new THREE.BoxGeometry(0.1, 0.25, 0.1);
        strut1.translate(-2.2, 1.70 + buildingBaseHeight, 0.6); // Raised +0.3
        carParts.push(strut1);
        const strut2 = new THREE.BoxGeometry(0.1, 0.25, 0.1);
        strut2.translate(-2.2, 1.70 + buildingBaseHeight, -0.6); // Raised +0.3
        carParts.push(strut2);

        const mergedCar = BufferGeometryUtils.mergeGeometries(carParts);
        mergedCar.rotateY(-angle); 
        mergedCar.translate(cx - bCx, 0, cz - bCz);
        mergedCar.translate(bCx, 0, bCz); 
        
        const carMat = new THREE.MeshStandardMaterial({ name: `showroomCarMat_${i}` });
        highGroup.add(new THREE.Mesh(mergedCar, carMat)); 

        // 3. WHEELS (Black Rubber)
        const wheelParts = [];
        const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16); // Slightly bigger wheels
        wheelGeo.rotateX(Math.PI / 2);
        const wheelPositions = [
          [1.5, 1.30, 1.05], [1.5, 1.30, -1.05], // Front (Raised +0.45 to rest on 0.9 pad)
          [-1.5, 1.30, 1.05], [-1.5, 1.30, -1.05] // Rear
        ];
        for (const wp of wheelPositions) {
           const w = wheelGeo.clone();
           w.translate(wp[0], wp[1] + buildingBaseHeight, wp[2]);
           wheelParts.push(w);
        }
        const mergedWheels = BufferGeometryUtils.mergeGeometries(wheelParts);
        mergedWheels.rotateY(-angle);
        mergedWheels.translate(cx - bCx, 0, cz - bCz);
        mergedWheels.translate(bCx, 0, bCz);
        const tireMat = new THREE.MeshStandardMaterial({ name: 'showroomPadMat' }); // Re-use dark grey
        highGroup.add(new THREE.Mesh(mergedWheels, tireMat));

        // 4. GLOWING HEADLIGHTS
        const hL = new THREE.BoxGeometry(0.1, 0.1, 0.4);
        hL.rotateZ(0.15);
        hL.translate(2.35, 1.35 + buildingBaseHeight, 0.75); // Raised +0.3
        const hR = hL.clone();
        hR.translate(0, 0, -1.5);
        const mergedHL = BufferGeometryUtils.mergeGeometries([hL, hR]);
        mergedHL.rotateY(-angle);
        mergedHL.translate(cx - bCx, 0, cz - bCz);
        mergedHL.translate(bCx, 0, bCz);
        const hlMat = new THREE.MeshStandardMaterial({ name: 'showroomNeonMat_1' }); // White Glow
        highGroup.add(new THREE.Mesh(mergedHL, hlMat));

        // 5. GLOWING TAILLIGHTS
        const tL = new THREE.BoxGeometry(0.1, 0.1, 0.5);
        tL.translate(-2.45, 1.35 + buildingBaseHeight, 0.75); // Raised +0.3
        const tR = tL.clone();
        tR.translate(0, 0, -1.5);
        const mergedTL = BufferGeometryUtils.mergeGeometries([tL, tR]);
        mergedTL.rotateY(-angle);
        mergedTL.translate(cx - bCx, 0, cz - bCz);
        mergedTL.translate(bCx, 0, bCz);
        const tlMat = new THREE.MeshStandardMaterial({ name: 'showroomNeonMat_0' }); // Red Glow
        highGroup.add(new THREE.Mesh(mergedTL, tlMat));

        // 6. REALTIME DYNAMIC LIGHTING (Casts actual light onto the floor and cars)
        const carColors = [0xff002b, 0xffffff, 0xffcc00, 0xffffff];
        lights.push({
          x: posX + cx, // FIXED: Using absolute world coordinates!
          y: 3.5 + buildingBaseHeight, // Raised high above car
          z: posZ + cz, // FIXED: Using absolute world coordinates!
          intensity: 4.5, // Cranked up intensity for dark showroom
          color: carColors[i]
        });
      }
    }

    // Glass Ceiling / Roof over the entire mall block
    const skyGlassGeo = new THREE.BoxGeometry(this.tileSize, 0.25, this.tileSize);
    skyGlassGeo.translate(0, totalHeight - 0.125 + buildingBaseHeight, 0);
    glassGeoms.push(skyGlassGeo);

    if (glassGeoms.length > 0) {
      const mergedGlass = BufferGeometryUtils.mergeGeometries(glassGeoms);
      const glassMeshShared = new THREE.Mesh(mergedGlass, this.phoneBoothGlassMat);
      highGroup.add(glassMeshShared);
    }

    if (accessoryGeoms.length > 0) {
      const mergedAcc = BufferGeometryUtils.mergeGeometries(accessoryGeoms);
      highGroup.add(new THREE.Mesh(mergedAcc, this.accessoryMat));
    }

    lod.addLevel(highGroup, 0);

    const medGroup = new THREE.Group();
    medGroup.add(new THREE.Mesh(groundGeo, this.concreteMat));
    if (mergedFacade) medGroup.add(new THREE.Mesh(mergedFacade, this.whiteLineMat));
    lod.addLevel(medGroup, 280);

    const lowGroup = new THREE.Group();
    lowGroup.add(new THREE.Mesh(groundGeo, this.concreteMat));
    if (mergedFacade) lowGroup.add(new THREE.Mesh(mergedFacade, this.whiteLineMat));
    lod.addLevel(lowGroup, 400);

    group.add(lod);

    if (this.buildingGeoCache) {
      this.buildingGeoCache.set(key, {
        groundGeo,
        facadeGeo: mergedFacade,
        glassGeo: glassGeoms.length > 0 ? BufferGeometryUtils.mergeGeometries(glassGeoms) : null,
        accessoryGeo: accessoryGeoms.length > 0 ? BufferGeometryUtils.mergeGeometries(accessoryGeoms) : null,
        cornerGlassGeo: glassPaneGeo,
        cornerGlassName: glassMeshName,
        obstacle: tileObstacles,
        breakables: registeredBreakables,
        lights: []
      });
    }

    obstacles.push(...tileObstacles);
    lights.push(...tileLights);
}
