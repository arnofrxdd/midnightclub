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

    // 3. MALL INTERIOR SHOWCASE (Only in Center Tile)
    const centerGridX = Math.floor((block.colMin + block.colMax) / 2);
    const centerGridZ = Math.floor((block.rowMin + block.rowMax) / 2);
    const isCenterTile = (gridX === centerGridX && gridZ === centerGridZ);

    if (isCenterTile) {
      // Main Center Exhibit Pedestal
      const pedestalGeo = new THREE.CylinderGeometry(5.0, 5.3, 0.8, 16);
      pedestalGeo.translate(0, 0.4 + buildingBaseHeight, 0);
      const pedestalMesh = new THREE.Mesh(pedestalGeo, this.concreteMat);
      highGroup.add(pedestalMesh);

      // Showcase Car
      const carParts = [];
      const carBodyGeo = new THREE.BoxGeometry(4.4, 0.7, 1.9);
      carBodyGeo.translate(0, 1.15 + buildingBaseHeight, 0);
      carParts.push(carBodyGeo);

      const carCabinGeo = new THREE.BoxGeometry(2.4, 0.55, 1.7);
      carCabinGeo.translate(-0.2, 1.775 + buildingBaseHeight, 0);
      carParts.push(carCabinGeo);

      const mergedCar = BufferGeometryUtils.mergeGeometries(carParts);
      const carPaintMat = new THREE.MeshBasicMaterial({ color: 0xff002b }); // Bright red basic paint
      highGroup.add(new THREE.Mesh(mergedCar, carPaintMat));

      // Neon Rim on Pedestal
      const neonRimGeo = new THREE.TorusGeometry(5.1, 0.12, 8, 32);
      neonRimGeo.rotateX(Math.PI / 2);
      neonRimGeo.translate(0, 0.8 + buildingBaseHeight, 0);
      const neonRimMat = new THREE.MeshStandardMaterial({
        color: 0x00ffcc,
        emissive: 0x00ffcc,
        emissiveIntensity: 4.0
      });
      highGroup.add(new THREE.Mesh(neonRimGeo, neonRimMat));
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
}
