import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { buildRoadTile } from './roadTile.js';
import { buildAlleyTile } from './alleyTile.js';
import { buildBuildingTile, buildScatterBuilding, buildPolygonalBlock } from './buildingTile.js';
import { createFireHydrantMesh, createNewspaperBoxMesh, createBenchMesh, createPhoneBoothMesh, createTrashCanMesh } from './props.js';
import polygonClipping from 'polygon-clipping';

import { MapGraph } from './mapGraph.js';
import { generateRoadGeometryForChunk, generateSidewalkGeometryForChunk } from './roadGeometry.js';
import { decorateChunk } from './roadDecorator.js';

class MockWorld {
  constructor(initData) {
    this.tileSize = initData.tileSize;
    
    this.mapGraph = new MapGraph();
    if (initData.mapGraphData) {
      this.mapGraph.deserialize(initData.mapGraphData);
    }
    
    this.asphaltLocalCircles = initData.asphaltLocalCircles;

    // Provide backwards compatibility facades for legacy building generation scripts
    this.roadColumns = { has: (gx) => false, values: () => [] };
    this.roadRows = { has: (gz) => false, values: () => [] };
    this.shortcutColumns = { has: (gx) => false, values: () => [] };
    this.shortcutRows = { has: (gz) => false, values: () => [] };
    this.mainRoadColumns = { has: (gx) => false, values: () => [] };
    this.mainRoadRows = { has: (gz) => false, values: () => [] };

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
    this.streetlightPoleMat = new THREE.MeshStandardMaterial({ name: 'streetlightPoleMat' });
    this.streetlightBulbMat = new THREE.MeshStandardMaterial({ name: 'streetlightBulbMat' });

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
    return false;
  }

  getBaseHeight(x, z) {
    return 0; // Legacy height deformation removed, roads are flat for now
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
    const amp = isSharp ? (22.0 + hashInt(c, r, 2) * 10.0) : (15.0 + hashInt(c, r, 3) * 6.0);
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

    const tileGroup = new THREE.Group();
    const obstacles = [];
    const lights = [];

    // Generate dynamic polygon roads based on MapGraph
    const roadGeo = generateRoadGeometryForChunk(posX, posZ, mockWorld.tileSize, mockWorld.mapGraph);
    if (roadGeo) {
      // 0. Concrete Foundation
      const foundationGeo = new THREE.PlaneGeometry(mockWorld.tileSize, mockWorld.tileSize);
      foundationGeo.rotateX(-Math.PI / 2);
      foundationGeo.translate(posX, -0.1, posZ);
      const foundationMesh = new THREE.Mesh(foundationGeo, mockWorld.concreteMat);
      foundationMesh.receiveShadow = true;
      tileGroup.add(foundationMesh);

      // 1. Sidewalks
      const sidewalkGeo = generateSidewalkGeometryForChunk(posX, posZ, mockWorld.tileSize, mockWorld.mapGraph);
      if (sidewalkGeo) {
        const sidewalkMesh = new THREE.Mesh(sidewalkGeo, mockWorld.concreteMat);
        sidewalkMesh.receiveShadow = true;
        tileGroup.add(sidewalkMesh);
      }

      // 2. Asphalt Roads
      const roadMesh = new THREE.Mesh(roadGeo, mockWorld.asphaltMat);
      roadMesh.receiveShadow = true;
      tileGroup.add(roadMesh);

      // 3. Decorations (Props, Lights, Trees)
      const decor = decorateChunk(posX, posZ, mockWorld.tileSize, mockWorld.mapGraph, mockWorld);

      // Add streetlights individually to handle light flares and cones
      decor.streetlightTransforms.forEach((stf) => {
        const sx = stf.x;
        const sz = stf.z;
        const angle = stf.angle;
        const isLED = stf.seed > 0.6;
        const lightColor = isLED ? 0xe0f7fa : 0xffd5a1;

        const slObject = mockWorld.templates.streetlight.clone();
        slObject.position.set(sx, 0, sz);
        slObject.rotation.y = angle;
        slObject.updateMatrixWorld(true);

        const coneMesh = new THREE.Mesh(mockWorld.lightConeGeo, isLED ? mockWorld.lightConeMatLED : mockWorld.lightConeMatSodium);
        coneMesh.position.set(1.3, 0.25, 0);
        coneMesh.name = "lightCone";
        slObject.add(coneMesh);

        const poolMeshName = `poolMesh_${lights.length}`;
        const poolMesh = new THREE.Mesh(
          mockWorld.lightPoolGeo,
          (isLED ? mockWorld.ledGroundLightPoolMat : mockWorld.sodiumGroundLightPoolMat).clone()
        );
        poolMesh.name = poolMeshName;
        poolMesh.position.set(1.3, -3.89, 0);
        slObject.add(poolMesh);

        const flareName = `flare_0`;
        const flare = new THREE.Sprite(new THREE.SpriteMaterial({
          color: lightColor,
          transparent: true,
          opacity: 0.70,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        }));
        flare.name = flareName;
        flare.position.set(1.3, 4.15, 0);
        flare.scale.set(3.8, 3.8, 1.0);
        slObject.add(flare);

        const lightSrc = {
          x: sx - stf.nx * 1.3,
          y: 7.5,
          z: sz - stf.nz * 1.3,
          intensity: 26.0,
          color: lightColor,
          poolMeshName: poolMeshName,
          poolMesh: poolMesh,
          defaultOpacity: isLED ? 0.16 : 0.22
        };
        lights.push(lightSrc);

        const slGroupName = `slObject_${mockWorld.breakables.length}`;
        slObject.name = slGroupName;

        mockWorld.breakables.push({
          type: 'streetlight',
          position: new THREE.Vector3(sx, 0, sz),
          groupName: slGroupName,
          group: slObject,
          flareNames: [flareName],
          flares: [flare],
          lightIndices: [lights.indexOf(lightSrc)],
          lights: [lightSrc],
          poolMeshNames: [poolMeshName],
          poolMeshes: [poolMesh],
          broken: false,
          tileX: posX,
          tileZ: posZ,
          velocity: new THREE.Vector3(),
          angularVelocity: new THREE.Vector3()
        });

        tileGroup.add(slObject);
      });

      if (decor.localTrunks.length > 0) {
        const mergedTrunks = BufferGeometryUtils.mergeGeometries(decor.localTrunks);
        const trunkMesh = new THREE.Mesh(mergedTrunks, new THREE.MeshStandardMaterial({ name: 'materials_3' }));
        trunkMesh.castShadow = true;
        tileGroup.add(trunkMesh);
      }

      const leafTypes = [
        { arr: decor.localLeaves, matName: 'materials_1' },
        { arr: decor.localLeavesCherry, matName: 'materials_2' },
        { arr: decor.localLeavesAutumn, matName: 'materials_4' }
      ];
      leafTypes.forEach(lt => {
        if (lt.arr.length > 0) {
          const mergedLeaves = BufferGeometryUtils.mergeGeometries(lt.arr);
          const leafMesh = new THREE.Mesh(mergedLeaves, new THREE.MeshStandardMaterial({ name: lt.matName }));
          leafMesh.castShadow = true;
          tileGroup.add(leafMesh);
        }
      });

      // Breakable Props
      const instantiateProps = (transforms, templateName, type, comHeight, radius) => {
        if (transforms.length === 0) return;
        const template = mockWorld.templates[templateName];
        const instancedMeshes = [];
        template.children.forEach((child, childIdx) => {
          const im = new THREE.InstancedMesh(child.geometry, child.material, transforms.length);
          im.name = `instanced_${templateName}_${childIdx}`;
          im.castShadow = true;
          im.receiveShadow = child.receiveShadow || false;
          for (let i = 0; i < transforms.length; i++) {
            const childMatrix = new THREE.Matrix4();
            childMatrix.compose(child.position, child.quaternion, child.scale);
            const finalMatrix = transforms[i].clone().multiply(childMatrix);
            im.setMatrixAt(i, finalMatrix);
          }
          tileGroup.add(im);
          instancedMeshes.push(im);
        });

        transforms.forEach((tf, i) => {
          const pos = new THREE.Vector3();
          pos.setFromMatrixPosition(tf);
          const breakable = {
            type: type,
            comHeight: comHeight,
            radius: radius,
            position: pos,
            group: null,
            flares: [],
            lights: [],
            broken: false,
            tileX: posX,
            tileZ: posZ,
            velocity: new THREE.Vector3(),
            angularVelocity: new THREE.Vector3(),
            isInstanced: true,
            templateName: templateName,
            instanceId: i,
            instancedMeshNames: template.children.map((_, childIdx) => `instanced_${templateName}_${childIdx}`),
            instancedMeshes: instancedMeshes
          };
          mockWorld.breakables.push(breakable);
        });
      };

      instantiateProps(decor.benchTransforms, 'bench', 'bench', 0.6, 0.4);
      instantiateProps(decor.trashCanTransforms, 'trashCan', 'trashcan', 0.5, 0.4);
      instantiateProps(decor.hydrantTransforms, 'fireHydrant', 'hydrant', 0.45, 0.3);
      instantiateProps(decor.phoneBoothTransforms, 'phoneBooth', 'phonebooth', 1.4, 0.6);

      decor.trafficLights.forEach((tl) => {
        const tlGroup = new THREE.Group();
        tlGroup.position.set(tl.x, 0, tl.z);
        
        const poleGeo = new THREE.BoxGeometry(0.4, 8.5, 0.4);
        const poleMesh = new THREE.Mesh(poleGeo, mockWorld.streetlightPoleMat);
        poleMesh.position.y = 4.25;
        poleMesh.castShadow = true;
        tlGroup.add(poleMesh);

        // Add arm and housing
        const isX = tl.axis === 'x';
        const sign = isX ? -Math.sign(tl.cx) : -Math.sign(tl.cz);
        
        const armGeo = isX ? new THREE.BoxGeometry(0.15, 0.15, 3.5) : new THREE.BoxGeometry(3.5, 0.15, 0.15);
        const armMesh = new THREE.Mesh(armGeo, mockWorld.streetlightPoleMat);
        if (isX) armMesh.position.set(0, 7.5, sign * 1.75);
        else armMesh.position.set(sign * 1.75, 7.5, 0);
        tlGroup.add(armMesh);

        const housingGeo = new THREE.BoxGeometry(0.4, 1.2, 0.4);
        const housingMesh = new THREE.Mesh(housingGeo, mockWorld.tlHousingMat);
        if (isX) {
          housingMesh.position.set(0, 7.1, sign * 3.5);
          housingMesh.rotation.y = tl.cx > 0 ? -Math.PI / 2 : Math.PI / 2;
        } else {
          housingMesh.position.set(sign * 3.5, 7.1, 0);
          housingMesh.rotation.y = tl.cz > 0 ? Math.PI : 0;
        }
        tlGroup.add(housingMesh);

        const bulbGeo = new THREE.BoxGeometry(0.24, 0.24, 0.1);
        
        const redGroup = new THREE.Group();
        redGroup.position.copy(housingMesh.position);
        redGroup.rotation.copy(housingMesh.rotation);
        const redMesh = new THREE.Mesh(bulbGeo, mockWorld.tlRedOffMat);
        redMesh.position.set(0, 0.35, 0.21);
        redMesh.name = tl.redName;
        redGroup.add(redMesh);
        tlGroup.add(redGroup);

        const yellowGroup = new THREE.Group();
        yellowGroup.position.copy(housingMesh.position);
        yellowGroup.rotation.copy(housingMesh.rotation);
        const yellowMesh = new THREE.Mesh(bulbGeo, mockWorld.tlYellowOffMat);
        yellowMesh.position.set(0, 0, 0.21);
        yellowMesh.name = tl.yellowName;
        yellowGroup.add(yellowMesh);
        tlGroup.add(yellowGroup);

        const greenGroup = new THREE.Group();
        greenGroup.position.copy(housingMesh.position);
        greenGroup.rotation.copy(housingMesh.rotation);
        const greenMesh = new THREE.Mesh(bulbGeo, mockWorld.tlGreenOffMat);
        greenMesh.position.set(0, -0.35, 0.21);
        greenMesh.name = tl.greenName;
        greenGroup.add(greenMesh);
        tlGroup.add(greenGroup);

        tileGroup.add(tlGroup);
        mockWorld.trafficLights.push(tl);
      });

      // 4. Polygonal Building Generation
      const ts = mockWorld.tileSize;

      const roadClipPolys = [];
      const SIDEWALK_OFFSET = 12;
      const BUILDING_BUFFER = 4;

      const clipMargin = 40;
      const minX = posX - ts/2 - clipMargin;
      const maxX = posX + ts/2 + clipMargin;
      const minZ = posZ - ts/2 - clipMargin;
      const maxZ = posZ + ts/2 + clipMargin;

      for (const edge of mockWorld.mapGraph.edges.values()) {
        const nA = edge.nodeA;
        const nB = edge.nodeB;
        
        if (Math.min(nA.x, nB.x) > maxX || Math.max(nA.x, nB.x) < minX ||
            Math.min(nA.z, nB.z) > maxZ || Math.max(nA.z, nB.z) < minZ) {
          continue;
        }

        const dx = nB.x - nA.x;
        const dz = nB.z - nA.z;
        const len = Math.sqrt(dx*dx + dz*dz);
        if (len === 0) continue;

        const nx = -dz / len;
        const nz = dx / len;
        
        const hw = edge.width / 2 + SIDEWALK_OFFSET + BUILDING_BUFFER;
        const ext = 2; // extension

        roadClipPolys.push([[
          [nA.x + nx * hw - (dx/len)*ext, nA.z + nz * hw - (dz/len)*ext],
          [nB.x + nx * hw + (dx/len)*ext, nB.z + nz * hw + (dz/len)*ext],
          [nB.x - nx * hw + (dx/len)*ext, nB.z - nz * hw + (dz/len)*ext],
          [nA.x - nx * hw - (dx/len)*ext, nA.z - nz * hw - (dz/len)*ext],
          [nA.x + nx * hw - (dx/len)*ext, nA.z + nz * hw - (dz/len)*ext]
        ]]);
      }

      for (const node of mockWorld.mapGraph.nodes.values()) {
        let maxWidth = 0;
        for (const e of node.edges) {
          if (e.width > maxWidth) maxWidth = e.width;
        }
        const r = maxWidth / 2 + SIDEWALK_OFFSET + BUILDING_BUFFER;
        
        if (node.x + r < minX || node.x - r > maxX || node.z + r < minZ || node.z - r > maxZ) {
          continue;
        }

        const circle = [];
        const segments = 12;
        for (let i = 0; i < segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          circle.push([node.x + Math.cos(angle) * r, node.z + Math.sin(angle) * r]);
        }
        circle.push([circle[0][0], circle[0][1]]);
        roadClipPolys.push([circle]);
      }

      // Subdivide the chunk into a 2x2 grid of sub-cells.
      // Each sub-cell is clipped against roads individually, producing varied building footprints.
      const SUBDIVISIONS = 2;
      const cellW = ts / SUBDIVISIONS;

      for (let ci = 0; ci < SUBDIVISIONS; ci++) {
        for (let cj = 0; cj < SUBDIVISIONS; cj++) {
          const cxMin = posX - ts/2 + ci * cellW;
          const cxMax = cxMin + cellW;
          const czMin = posZ - ts/2 + cj * cellW;
          const czMax = czMin + cellW;

          const cellPoly = [[[cxMin, czMin],[cxMax, czMin],[cxMax, czMax],[cxMin, czMax],[cxMin, czMin]]];

          let resultPolys = [cellPoly];
          if (roadClipPolys.length > 0) {
            try {
              resultPolys = polygonClipping.difference(resultPolys, ...roadClipPolys);
            } catch (e) {
              resultPolys = [];
            }
          }

          resultPolys.forEach((poly, idx) => {
            // Compute polygon area to skip slivers
            let area = 0;
            const ring = poly[0];
            for (let k = 0; k < ring.length - 1; k++) {
              area += ring[k][0] * ring[k+1][1] - ring[k+1][0] * ring[k][1];
            }
            area = Math.abs(area) / 2;
            if (area < 4) return; // Skip slivers smaller than 2x2m

            const seed = Math.sin((cxMin + cxMax)/2 * 12.9898 + (czMin + czMax)/2 * 78.233 + idx * 13.5 + ci * 7.1 + cj * 3.3) * 43758.5453;
            const rand = seed - Math.floor(seed);
            const bMat = mockWorld.materials[Math.floor(rand * mockWorld.materials.length)];
            const height = 12 + rand * 35; // 12m to 47m — strong variety
            
            buildPolygonalBlock(poly, bMat, height, tileGroup, obstacles, mockWorld);
          });
        }
      }

    } else {
      // If no roads, spawn a building tile
      mockWorld.buildBuildingTile(gridX, gridZ, posX, posZ, tileGroup, obstacles, lights);
    }

    const localGeoMap = new Map();
    const serializedGroup = serializeObject(tileGroup, localGeoMap);

    const responseBreakables = mockWorld.breakables.map(b => {
      return {
        type: b.type,
        comHeight: b.comHeight,
        radius: b.radius,
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
