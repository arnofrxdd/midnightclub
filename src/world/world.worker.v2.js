import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { buildRoadTile } from './roadTile.js';
import { buildAlleyTile } from './alleyTile.js';
import { buildBuildingTile } from './buildingTile.js';
import { buildMallTile, isMallBlock } from './mallTile.js';
import { isGasStationBlock, buildGasStationTile } from './gasStationTile.js';
import { createFireHydrantMesh, createNewspaperBoxMesh, createBenchMesh, createPhoneBoothMesh, createTrashCanMesh } from './props.js';

class MockWorld {
  constructor(initData) {
    this.tileSize = initData.tileSize;
    this.mainRoadColumns = new Set(initData.mainRoadColumns);
    this.mainRoadRows = new Set(initData.mainRoadRows);
    this.shortcutColumns = new Set(initData.shortcutColumns);
    this.shortcutRows = new Set(initData.shortcutRows);
    this.roadColumns = new Set(initData.roadColumns);
    this.roadRows = new Set(initData.roadRows);
    this.sortedColumnsArray = initData.sortedColumnsArray;
    this.sortedRowsArray = initData.sortedRowsArray;
    this.asphaltLocalCircles = initData.asphaltLocalCircles;

    // Arrays for tracking inside the tile build context
    this.breakables = [];
    this.trafficLights = [];
    this.tilePuddles = new Map();

    // Set up mock materials for mapping. We set the name attribute so they serialize nicely
    this.slFlareTex = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
    this.slFlareTex.needsUpdate = true;

    this.concreteMat = new THREE.MeshStandardMaterial({ name: 'concreteMat' });
    this.yellowLineMat = new THREE.MeshStandardMaterial({ name: 'yellowLineMat' });
    this.whiteLineMat = new THREE.MeshStandardMaterial({ name: 'whiteLineMat' });
    this.mallFacadeMat = new THREE.MeshStandardMaterial({ name: 'mallFacadeMat' });
    this.mallFloorMat = new THREE.MeshStandardMaterial({ name: 'mallFloorMat' });
    this.mallGlassMat = new THREE.MeshStandardMaterial({ name: 'mallGlassMat' });
    this.mallFrameMat = new THREE.MeshStandardMaterial({ name: 'mallFrameMat' });
    this.streetlightPoleMat = new THREE.MeshStandardMaterial({ name: 'streetlightPoleMat' });
    this.streetlightBulbMat = new THREE.MeshStandardMaterial({ name: 'streetlightBulbMat' });

    // Showroom Materials
    this.showroomPadMat = new THREE.MeshStandardMaterial({ name: 'showroomPadMat' });
    this.showroomCarMat_0 = new THREE.MeshStandardMaterial({ name: 'showroomCarMat_0' });
    this.showroomCarMat_1 = new THREE.MeshStandardMaterial({ name: 'showroomCarMat_1' });
    this.showroomCarMat_2 = new THREE.MeshStandardMaterial({ name: 'showroomCarMat_2' });
    this.showroomCarMat_3 = new THREE.MeshStandardMaterial({ name: 'showroomCarMat_3' });
    this.showroomNeonMat_0 = new THREE.MeshStandardMaterial({ name: 'showroomNeonMat_0' });
    this.showroomNeonMat_1 = new THREE.MeshStandardMaterial({ name: 'showroomNeonMat_1' });
    this.showroomNeonMat_2 = new THREE.MeshStandardMaterial({ name: 'showroomNeonMat_2' });
    this.showroomNeonMat_3 = new THREE.MeshStandardMaterial({ name: 'showroomNeonMat_3' });


    this.ledGroundLightPoolMat = new THREE.MeshBasicMaterial({ name: 'ledGroundLightPoolMat' });
    this.sodiumGroundLightPoolMat = new THREE.MeshBasicMaterial({ name: 'sodiumGroundLightPoolMat' });
    this.storefrontGroundLightPoolMat = new THREE.MeshBasicMaterial({ name: 'storefrontGroundLightPoolMat' });
    this.lightConeMatLED = new THREE.MeshBasicMaterial({ name: 'lightConeMatLED' });
    this.lightConeMatSodium = new THREE.MeshBasicMaterial({ name: 'lightConeMatSodium' });

    this.brickMat = new THREE.MeshStandardMaterial({ name: 'brickMat' });
    this.buildingConcreteMat = new THREE.MeshStandardMaterial({ name: 'buildingConcreteMat' });
    this.slateMat = new THREE.MeshStandardMaterial({ name: 'slateMat' });
    this.sandstoneMat = new THREE.MeshStandardMaterial({ name: 'sandstoneMat' });
    this.glassySlateMat = new THREE.MeshStandardMaterial({ name: 'glassySlateMat' });
    this.darkConcreteMat = new THREE.MeshStandardMaterial({ name: 'darkConcreteMat' });
    this.brickDarkMat = new THREE.MeshStandardMaterial({ name: 'brickDarkMat' });

    this.materials = [
      this.brickMat, this.buildingConcreteMat, this.slateMat, this.sandstoneMat,
      this.glassySlateMat, this.darkConcreteMat, this.brickDarkMat
    ].map((m, idx) => {
      m.name = `materials_${idx}`;
      return m;
    });

    this.windowDetailedMat = new THREE.MeshStandardMaterial({ name: 'windowDetailedMat' });
    this.doorMat = new THREE.MeshStandardMaterial({ name: 'doorMat' });
    this.accessoryMat = new THREE.MeshStandardMaterial({ name: 'accessoryMat' });
    this.dumpsterMat = new THREE.MeshStandardMaterial({ name: 'dumpsterMat' });
    this.cardboardMat = new THREE.MeshStandardMaterial({ name: 'cardboardMat' });
    this.trashBagMat = new THREE.MeshStandardMaterial({ name: 'trashBagMat' });
    this.woodPoleMat = new THREE.MeshStandardMaterial({ name: 'woodPoleMat' });
    this.trunkMat = new THREE.MeshStandardMaterial({ name: 'trunkMat' });

    this.leafMat = new THREE.MeshStandardMaterial({ name: 'leafMat' });
    this.leafCherryMat = new THREE.MeshStandardMaterial({ name: 'leafCherryMat' });
    this.leafAutumnMat = new THREE.MeshStandardMaterial({ name: 'leafAutumnMat' });

    this.benchWoodMat = new THREE.MeshStandardMaterial({ name: 'benchWoodMat' });
    this.benchIronMat = new THREE.MeshStandardMaterial({ name: 'benchIronMat' });
    this.phoneBoothFrameMat = new THREE.MeshStandardMaterial({ name: 'phoneBoothFrameMat' });
    this.phoneBoothGlassMat = new THREE.MeshStandardMaterial({ name: 'phoneBoothGlassMat' });
    this.phoneBoothScreenMat = new THREE.MeshStandardMaterial({ name: 'phoneBoothScreenMat' });
    this.trashCanMat = new THREE.MeshStandardMaterial({ name: 'trashCanMat' });
    this.trashCanLidMat = new THREE.MeshStandardMaterial({ name: 'trashCanLidMat' });
    this.hydrantRedMat = new THREE.MeshStandardMaterial({ name: 'hydrantRedMat' });
    this.hydrantCapMat = new THREE.MeshStandardMaterial({ name: 'hydrantCapMat' });
    this.newspaperBodyMat = new THREE.MeshStandardMaterial({ name: 'newspaperBodyMat' });
    this.newspaperGlassMat = new THREE.MeshStandardMaterial({ name: 'newspaperGlassMat' });
    this.newspaperPaperMat = new THREE.MeshStandardMaterial({ name: 'newspaperPaperMat' });
    this.tlHousingMat = new THREE.MeshStandardMaterial({ name: 'tlHousingMat' });
    this.tlRedOffMat = new THREE.MeshStandardMaterial({ name: 'tlRedOffMat' });
    this.tlYellowOffMat = new THREE.MeshStandardMaterial({ name: 'tlYellowOffMat' });
    this.tlGreenOffMat = new THREE.MeshStandardMaterial({ name: 'tlGreenOffMat' });

    // Mock materials list for tile choice
    this.asphaltMaterials = [];
    for (let i = 0; i < 8; i++) {
      this.asphaltMaterials.push(new THREE.MeshStandardMaterial({ name: `asphaltMaterials_${i}` }));
    }
    this.asphaltMat = this.asphaltMaterials[0];

    this.billboardColors = [0xff0055, 0x00ff66, 0x00f0ff, 0xffaa00];

    // Mock light cone geometry/texture and light flares
    this.lightConeGeo = new THREE.PlaneGeometry(13.5, 7.8, 1, 1); // simplified
    const pGeo2 = this.lightConeGeo.clone().rotateY(Math.PI / 2);
    this.lightConeGeo = BufferGeometryUtils.mergeGeometries([this.lightConeGeo, pGeo2]);
    this.lightConeGeo.isCached = true;

    this.lightPoolGeo = new THREE.PlaneGeometry(64, 64);
    this.lightPoolGeo.rotateX(-Math.PI / 2);
    this.lightPoolGeo.isCached = true;

    this.storefrontLightPoolGeo = new THREE.PlaneGeometry(24, 24);
    this.storefrontLightPoolGeo.rotateX(-Math.PI / 2);
    this.storefrontLightPoolGeo.isCached = true;

    this.alleyLightPoolGeo = new THREE.PlaneGeometry(32, 32);
    this.alleyLightPoolGeo.rotateX(-Math.PI / 2);
    this.alleyLightPoolGeo.isCached = true;

    // Static geometry templates
    this.createFireHydrantMesh = createFireHydrantMesh;
    this.createNewspaperBoxMesh = createNewspaperBoxMesh;
    this.createBenchMesh = createBenchMesh;
    this.createPhoneBoothMesh = createPhoneBoothMesh;
    this.createTrashCanMesh = createTrashCanMesh;

    this.templates = {};
    this.generateTemplates();
  }

  generateTemplates() {
    // Generate tree templates
    const treeGroup = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.8, 4.0, 0.8), this.trunkMat);
    trunk.position.y = 2.0;
    treeGroup.add(trunk);

    const leafGeoms = [];
    const clusters = [
      { size: 3.5, y: 3.8 },
      { size: 2.8, y: 4.8 },
      { size: 1.8, y: 5.6 }
    ];
    clusters.forEach(c => {
      const lg = new THREE.BoxGeometry(c.size, c.size * 0.8, c.size);
      lg.translate(0, c.y, 0);
      leafGeoms.push(lg);
    });
    const mergedLeaves = BufferGeometryUtils.mergeGeometries(leafGeoms);
    const leavesMesh = new THREE.Mesh(mergedLeaves, this.leafMat);
    treeGroup.add(leavesMesh);
    this.templates.tree = treeGroup;

    // treeRoundGreen
    const treeRoundGroup = new THREE.Group();
    const trunkRound = new THREE.Mesh(new THREE.BoxGeometry(0.8, 3.2, 0.8), this.trunkMat);
    trunkRound.position.y = 1.6;
    treeRoundGroup.add(trunkRound);

    const leafRoundGeoms = [];
    const roundClusters = [
      { sx: 3.8, sy: 3.2, sz: 3.8, y: 3.6 },
      { sx: 2.8, sy: 2.4, sz: 2.8, y: 5.0 }
    ];
    roundClusters.forEach(c => {
      const lg = new THREE.BoxGeometry(c.sx, c.sy, c.sz);
      lg.translate(0, c.y, 0);
      leafRoundGeoms.push(lg);
    });
    const mergedRoundLeaves = BufferGeometryUtils.mergeGeometries(leafRoundGeoms);
    const leavesRoundMesh = new THREE.Mesh(mergedRoundLeaves, this.leafMat);
    treeRoundGroup.add(leavesRoundMesh);
    this.templates.treeRoundGreen = treeRoundGroup;

    // Cherry and Autumn templates
    const treeGroupCherry = new THREE.Group();
    treeGroupCherry.add(trunk.clone());
    treeGroupCherry.add(new THREE.Mesh(mergedLeaves, this.leafCherryMat));
    this.templates.treeCherry = treeGroupCherry;

    const treeGroupAutumn = new THREE.Group();
    treeGroupAutumn.add(trunk.clone());
    treeGroupAutumn.add(new THREE.Mesh(mergedLeaves, this.leafAutumnMat));
    this.templates.treeAutumn = treeGroupAutumn;

    const treeRoundCherry = new THREE.Group();
    treeRoundCherry.add(trunkRound.clone());
    treeRoundCherry.add(new THREE.Mesh(mergedRoundLeaves, this.leafCherryMat));
    this.templates.treeRoundCherry = treeRoundCherry;

    const treeRoundAutumn = new THREE.Group();
    treeRoundAutumn.add(trunkRound.clone());
    treeRoundAutumn.add(new THREE.Mesh(mergedRoundLeaves, this.leafAutumnMat));
    this.templates.treeRoundAutumn = treeRoundAutumn;

    this.templates.fireHydrant = this.createFireHydrantMesh();
    this.templates.newspaperBox = this.createNewspaperBoxMesh();
    this.templates.bench = this.createBenchMesh();
    this.templates.phoneBooth = this.createPhoneBoothMesh();
    this.templates.trashCan = this.createTrashCanMesh();

    const slGroup = new THREE.Group();
    const slPole = new THREE.Mesh(new THREE.BoxGeometry(0.3, 8.5, 0.3), this.streetlightPoleMat);
    slPole.position.y = 4.25;
    slPole.castShadow = true;
    slGroup.add(slPole);
    this.templates.streetlight = slGroup;

    // Mark all template geometries as cached so they are only sent to the main thread ONCE
    // and their ArrayBuffers are cloned, avoiding detachment issues.
    for (const key in this.templates) {
      this.templates[key].traverse(child => {
        if (child.isMesh && child.geometry) {
          child.geometry.isCached = true;
        }
      });
    }
  }

  // World math helpers
  getRoadWidthForGrid(gridX, gridZ) {
    let rwX = 26;
    let rwZ = 26;
    const seedZ = Math.sin(gridZ * 78.233) * 43758.5453;
    const randZ = seedZ - Math.floor(seedZ);
    if (randZ > 0.6) rwZ = 14;
    const seedX = Math.sin(gridX * 12.9898) * 43758.5453;
    const randX = seedX - Math.floor(seedX);
    if (randX > 0.6) rwX = 14;
    return { rwX, rwZ };
  }

  isAlley(gridX, gridZ) {
    if (this.mainRoadColumns.has(gridX) || this.mainRoadRows.has(gridZ)) return false;
    return this.shortcutColumns.has(gridX) || this.shortcutRows.has(gridZ);
  }

  getBaseHeight(x, z) {
    if (!this.sortedColumnsArray || !this.sortedRowsArray || this.sortedColumnsArray.length < 2 || this.sortedRowsArray.length < 2) {
      return 0;
    }
    const tileX = x / this.tileSize;
    const tileZ = z / this.tileSize;

    const idxX = findIntervalIndex(this.sortedColumnsArray, tileX);
    const idxZ = findIntervalIndex(this.sortedRowsArray, tileZ);

    const colIdx1 = Math.max(0, Math.min(this.sortedColumnsArray.length - 2, idxX));
    const colIdx2 = colIdx1 + 1;
    const col1 = this.sortedColumnsArray[colIdx1];
    const col2 = this.sortedColumnsArray[colIdx2];

    const rowIdx1 = Math.max(0, Math.min(this.sortedRowsArray.length - 2, idxZ));
    const rowIdx2 = rowIdx1 + 1;
    const row1 = this.sortedRowsArray[rowIdx1];
    const row2 = this.sortedRowsArray[rowIdx2];

    const h00 = getIntersectionHeight(colIdx1, rowIdx1);
    const h10 = getIntersectionHeight(colIdx2, rowIdx1);
    const h01 = getIntersectionHeight(colIdx1, rowIdx2);
    const h11 = getIntersectionHeight(colIdx2, rowIdx2);

    let u = (tileX - col1) / (col2 - col1);
    let v = (tileZ - row1) / (row2 - row1);

    u = linearRamp(u);
    v = linearRamp(v);

    return (1 - u) * (1 - v) * h00 + u * (1 - v) * h10 + (1 - u) * v * h01 + u * v * h11;
  }

  deformGeometryToHills(geometry, tileX, tileZ) {
    const posAttr = geometry.attributes.position;
    if (!posAttr) return;
    for (let i = 0; i < posAttr.count; i++) {
      const localX = posAttr.getX(i);
      const localY = posAttr.getY(i);
      const localZ = posAttr.getZ(i);
      const worldX = tileX + localX;
      const worldZ = tileZ + localZ;
      const baseHeight = this.getBaseHeight(worldX, worldZ);
      posAttr.setY(i, localY + baseHeight);
    }
    posAttr.needsUpdate = true;
    geometry.computeVertexNormals();
  }

  buildAlleyTile = buildAlleyTile;
  buildRoadTile = buildRoadTile;
  buildBuildingTile = buildBuildingTile;
  buildMallTile = buildMallTile;
}

let mockWorld = null;
const geometryCache = new Map();

function serializeGeometry(geo, localGeoMap) {
  if (geo.isCached && geo.uuid) {
    if (geometryCache.has(geo.uuid)) {
      return { uuid: geo.uuid, cached: true };
    }
  }
  if (localGeoMap && geo.uuid && localGeoMap.has(geo.uuid)) {
    return { uuid: geo.uuid, localCached: true };
  }

  const attributes = {};
  for (const name in geo.attributes) {
    const attr = geo.attributes[name];
    attributes[name] = {
      array: attr.array,
      itemSize: attr.itemSize,
      normalized: attr.normalized
    };
  }

  const index = geo.index ? {
    array: geo.index.array,
    itemSize: geo.index.itemSize
  } : null;

  const data = {
    uuid: geo.uuid,
    attributes,
    index,
    groups: geo.groups,
    isCached: geo.isCached
  };

  if (geo.isCached) {
    geometryCache.set(geo.uuid, data);
  } else if (localGeoMap && geo.uuid) {
    localGeoMap.set(geo.uuid, data);
  }

  return data;
}

function findIntervalIndex(arr, val) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (arr[mid] < val) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return low - 1;
}

function hashInt(x, y, seed) {
  let h = Math.imul(x ^ (y << 16) ^ seed, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296.0;
}

function getIntersectionHeight(c, r) {
  if ((c + r) % 2 !== 0) return 0.0;
  const hash = hashInt(c, r, 0);
  if (hash < 0.30) {
    const sign = ((c + r) % 4 === 0) ? 1 : -1;
    const isSharp = hashInt(c, r, 1) < 0.45;
    const amp = isSharp ? (10.0 + hashInt(c, r, 2) * 5.0) : (8.0 + hashInt(c, r, 3) * 4.0);
    return sign * amp;
  }
  return 0.0;
}

function linearRamp(t) {
  const margin = 0.25;
  if (t < margin) return 0.0;
  if (t > 1.0 - margin) return 1.0;
  return (t - margin) / (1.0 - 2.0 * margin);
}

function serializeMaterial(mat) {
  if (Array.isArray(mat)) {
    return mat.map(m => serializeMaterial(m));
  }
  if (!mat) return null;
  if (mat.isSpriteMaterial) {
    return {
      type: 'sprite',
      color: mat.color.getHex(),
      opacity: mat.opacity
    };
  }
  if (mat.emissive && !mat.name) {
    return {
      type: 'custom_emissive',
      color: mat.emissive.getHex()
    };
  }
  return {
    type: 'static',
    name: mat.name
  };
}

function serializeObject(obj, localGeoMap) {
  let type = 'Group';
  if (obj.isInstancedMesh) {
    type = 'InstancedMesh';
  } else if (obj.isMesh) {
    type = 'Mesh';
  } else if (obj.isSprite) {
    type = 'Sprite';
  } else if (obj.isLOD) {
    type = 'LOD';
  }

  const data = {
    name: obj.name,
    type: type,
    position: obj.position.toArray(),
    quaternion: obj.quaternion.toArray(),
    scale: obj.scale.toArray(),
    castShadow: obj.castShadow,
    receiveShadow: obj.receiveShadow,
    isGround: obj.isGround
  };

  if (obj.isMesh || obj.isInstancedMesh) {
    data.material = serializeMaterial(obj.material);
    data.geometry = serializeGeometry(obj.geometry, localGeoMap);
  } else if (obj.isSprite) {
    data.material = serializeMaterial(obj.material);
  }

  if (obj.isInstancedMesh) {
    data.count = obj.count;
    data.instanceMatrix = obj.instanceMatrix.array;
  }

  if (obj.isLOD) {
    data.levels = obj.levels.map(level => ({
      distance: level.distance,
      object: serializeObject(level.object, localGeoMap)
    }));
  }

  if (obj.children && obj.children.length > 0 && !obj.isLOD) {
    data.children = obj.children.map(child => serializeObject(child, localGeoMap));
  }

  return data;
}

function collectTransferables(data, set = new Set()) {
  if (!data) return set;
  if (data instanceof ArrayBuffer) {
    set.add(data);
  } else if (data.buffer && data.buffer instanceof ArrayBuffer) {
    set.add(data.buffer);
  } else if (Array.isArray(data)) {
    for (const item of data) {
      collectTransferables(item, set);
    }
  } else if (typeof data === 'object') {
    for (const key in data) {
      collectTransferables(data[key], set);
    }
  }
  return set;
}

self.onmessage = function (e) {
  const { type, data } = e.data;
  if (type === 'init') {
    mockWorld = new MockWorld(data);
  } else if (type === 'generateTile') {
    if (!mockWorld) {
      console.error("Worker not initialized!");
      return;
    }
    const { gridX, gridZ, posX, posZ, key } = data;

    const isAlley = mockWorld.isAlley(gridX, gridZ);
    const isRoad = mockWorld.roadColumns.has(gridX) || mockWorld.roadRows.has(gridZ);

    const tileGroup = new THREE.Group();
    const obstacles = [];
    const lights = [];

    if (isAlley) {
      mockWorld.buildAlleyTile(gridX, gridZ, posX, posZ, tileGroup, obstacles, lights);
    } else if (isRoad) {
      mockWorld.buildRoadTile(gridX, gridZ, posX, posZ, tileGroup, obstacles, lights);

      // Compute world-space puddle circles
      const tileCircles = [];
      const matIndex = Math.abs(gridX * 17 + gridZ * 23) % mockWorld.asphaltMaterials.length;
      const localCircles = mockWorld.asphaltLocalCircles[matIndex];

      if (localCircles && localCircles.length > 0) {
        const ox = Math.abs((gridX * 0.317 + gridZ * 0.713) % 1.0);
        const oy = Math.abs((gridX * 0.893 + gridZ * 0.149) % 1.0);

        let sizeX = mockWorld.tileSize;
        let sizeZ = mockWorld.tileSize;
        const isIntersection = mockWorld.roadColumns.has(gridX) && mockWorld.roadRows.has(gridZ);
        if (!isIntersection) {
          const { rwX, rwZ } = mockWorld.getRoadWidthForGrid(gridX, gridZ);
          if (mockWorld.roadRows.has(gridZ)) {
            sizeZ = rwZ;
          } else {
            sizeX = rwX;
          }
        }

        localCircles.forEach(c => {
          const u = c.x / 1024;
          const v = c.y / 1024;
          const shiftedU = (u - ox + 2.0) % 1.0;
          const shiftedV = (v + oy) % 1.0;
          const localX = shiftedU * sizeX - sizeX / 2;
          const localZ = shiftedV * sizeZ - sizeZ / 2;

          tileCircles.push({
            x: posX + localX,
            z: posZ + localZ,
            rx: (c.r / 1024) * sizeX,
            rz: (c.r / 1024) * sizeZ
          });
        });
      }
      mockWorld.tilePuddles.set(key, tileCircles);
    } else {
      const isMall = isMallBlock(gridX, gridZ, mockWorld.roadColumns, mockWorld.roadRows, mockWorld.isAlley.bind(mockWorld), mockWorld.getBaseHeight.bind(mockWorld));
      const isGasStation = isGasStationBlock(gridX, gridZ, mockWorld.roadColumns, mockWorld.roadRows, mockWorld.isAlley.bind(mockWorld), mockWorld.getBaseHeight.bind(mockWorld));
      if (isMall) {
        mockWorld.buildMallTile(gridX, gridZ, posX, posZ, tileGroup, obstacles, lights);
      } else if (isGasStation) {
        buildGasStationTile.call(mockWorld, gridX, gridZ, posX, posZ, tileGroup, obstacles, lights);
      } else {
        mockWorld.buildBuildingTile(gridX, gridZ, posX, posZ, tileGroup, obstacles, lights);
      }
    }

    const localGeoMap = new Map();
    const serializedGroup = serializeObject(tileGroup, localGeoMap);

    const responseBreakables = mockWorld.breakables.map(b => {
      return {
        type: b.type,
        comHeight: b.comHeight,
        radius: b.radius,
        width: b.width,
        depth: b.depth,
        rotationY: b.rotationY,
        position: b.position.toArray(),
        broken: b.broken,
        tileX: b.tileX,
        tileZ: b.tileZ,
        velocity: b.velocity.toArray(),
        angularVelocity: b.angularVelocity.toArray(),
        isInstanced: b.isInstanced,
        templateName: b.templateName,
        instanceId: b.instanceId,
        instancedMeshNames: b.instancedMeshNames,
        groupName: b.groupName,
        flareNames: b.flareNames,
        lightIndices: b.lightIndices,
        poolMeshNames: b.poolMeshNames
      };
    });

    const responseTrafficLights = mockWorld.trafficLights.map(tl => {
      return {
        tileX: tl.tileX,
        tileZ: tl.tileZ,
        intersectionX: tl.intersectionX,
        intersectionZ: tl.intersectionZ,
        axis: tl.axis,
        redName: tl.redName,
        yellowName: tl.yellowName,
        greenName: tl.greenName
      };
    });

    const responseLights = lights.map(src => {
      return {
        x: src.x,
        y: src.y,
        z: src.z,
        intensity: src.intensity,
        color: src.color,
        poolMeshName: src.poolMeshName,
        defaultOpacity: src.defaultOpacity
      };
    });

    const puddles = mockWorld.tilePuddles.get(key) || [];
    mockWorld.tilePuddles.delete(key);
    // Clean up lists on mockWorld for next invocation
    mockWorld.breakables = [];
    mockWorld.trafficLights = [];

    const transferablesSet = collectTransferables(serializedGroup);
    const transferables = Array.from(transferablesSet);

    self.postMessage({
      type: 'tileGenerated',
      data: {
        gridX,
        gridZ,
        posX,
        posZ,
        key,
        serializedGroup,
        obstacles,
        lights: responseLights,
        trafficLights: responseTrafficLights,
        breakables: responseBreakables,
        puddles
      }
    }, transferables);
  }
};
