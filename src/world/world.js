import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import {
  createStreetlightFlareTexture,
  createGroundLightPoolTexture,
  createConcreteTextures,
  createAsphaltTextures,
  createWindowTextures,
  createCityEnvMap
} from './textures.js';
import {
  getTrafficLightState,
  applySidewalkUVs,
  createDetailedWindowGeometry
} from './geometry.js';
import { createFireHydrantMesh, createNewspaperBoxMesh, spawnTemplateTree, createBenchMesh, createPhoneBoothMesh, createTrashCanMesh } from './props.js';
import { buildRoadTile } from './roadTile.js';
import { buildAlleyTile } from './alleyTile.js';
import { buildBuildingTile } from './buildingTile.js';














export class World {
  constructor(scene) {
    this.scene = scene;
    this.tileSize = 40;

    // Generate variable road columns and rows (spacings of 3 to 7 tiles)
    // Use a random session seed to ensure the grid is unique on every game launch
    const seedOffset = Math.random() * 10000;
    this.mainRoadColumns = new Set();
    this.mainRoadRows = new Set();
    this.mainRoadColumns.add(0);
    this.mainRoadRows.add(0);

    let curr = 0;
    while (curr < 1000) {
      const seed = Math.sin((curr + seedOffset) * 1.5) * 43758.5453;
      const rand = seed - Math.floor(seed);
      curr += 2 + Math.floor(rand * 3); // Spacing of 2 to 4 tiles
      this.mainRoadColumns.add(curr);
    }
    curr = 0;
    while (curr > -1000) {
      const seed = Math.sin((curr - seedOffset) * 1.5) * 43758.5453;
      const rand = seed - Math.floor(seed);
      curr -= (2 + Math.floor(rand * 3));
      this.mainRoadColumns.add(curr);
    }

    curr = 0;
    while (curr < 1000) {
      const seed = Math.sin((curr + seedOffset) * 2.7) * 43758.5453;
      const rand = seed - Math.floor(seed);
      curr += 2 + Math.floor(rand * 3);
      this.mainRoadRows.add(curr);
    }
    curr = 0;
    while (curr > -1000) {
      const seed = Math.sin((curr - seedOffset) * 2.7) * 43758.5453;
      const rand = seed - Math.floor(seed);
      curr -= (2 + Math.floor(rand * 3));
      this.mainRoadRows.add(curr);
    }

    // Now generate shortcut columns (alleys) between main road columns
    this.shortcutColumns = new Set();
    this.shortcutRows = new Set();

    const sortedCols = Array.from(this.mainRoadColumns).sort((a, b) => a - b);
    for (let i = 0; i < sortedCols.length - 1; i++) {
      const c1 = sortedCols[i];
      const c2 = sortedCols[i+1];
      const diff = c2 - c1;
      if (diff >= 3) {
        const seed = Math.sin(c1 * 12.9898 + c2 * 78.233) * 43758.5453;
        const rand = seed - Math.floor(seed);
        if (rand < 0.2) { // 20% chance of a shortcut alley (more buildings, less alleys)
          const mid = c1 + Math.floor(diff / 2);
          this.shortcutColumns.add(mid);
        }
      }
    }

    const sortedRows = Array.from(this.mainRoadRows).sort((a, b) => a - b);
    for (let i = 0; i < sortedRows.length - 1; i++) {
      const r1 = sortedRows[i];
      const r2 = sortedRows[i+1];
      const diff = r2 - r1;
      if (diff >= 3) {
        const seed = Math.sin(r1 * 53.1374 + r2 * 21.9427) * 43758.5453;
        const rand = seed - Math.floor(seed);
        if (rand < 0.2) { // 20% chance of a shortcut alley (more buildings, less alleys)
          const mid = r1 + Math.floor(diff / 2);
          this.shortcutRows.add(mid);
        }
      }
    }

    // roadColumns and roadRows contains all drivable roads (main + shortcuts)
    this.roadColumns = new Set([...this.mainRoadColumns, ...this.shortcutColumns]);
    this.roadRows = new Set([...this.mainRoadRows, ...this.shortcutRows]);
    this.sortedColumnsArray = Array.from(this.roadColumns).sort((a, b) => a - b);
    this.sortedRowsArray = Array.from(this.roadRows).sort((a, b) => a - b);
    
    // Generate baked city environment reflections
    const envMap = createCityEnvMap();
    this.scene.environment = envMap;
    
    // Loaded chunks map: key "gridX,gridZ" -> THREE.Group
    this.loadedTiles = new Map();
    this.buildingGeoCache = new Map(); // gridKey -> geometries to avoid building generation stutter
    this.obstacles = []; // Collision bounding boxes (kept for compatibility)
    // Spatial hash grid for fast collision queries (cell size = 40 units = 1 tile)
    this.spatialCellSize = 40;
    this.obstacleGrid = new Map(); // "cx,cz" -> [obstacle, ...]
    this.renderRadius = 6; // 240m view distance — fog hides beyond this, no quality loss

    // Generate diverse road materials (4 with puddles, 4 completely dry)
    this.asphaltMaterials = [];
    this.asphaltLocalCircles = [];
    this.tilePuddles = new Map();

    for (let i = 0; i < 8; i++) {
      const hasPuddles = (i < 4);
      const textures = createAsphaltTextures(hasPuddles);
      this.asphaltMaterials.push(new THREE.MeshStandardMaterial({
        map: textures.map,
        roughness: 1.0,
        metalness: 1.0,
        roughnessMap: textures.roughnessMap,
        metalnessMap: textures.roughnessMap,
        bumpMap: textures.roughnessMap,
        bumpScale: 0.18,
        envMapIntensity: 0.55
      }));
      this.asphaltLocalCircles.push(textures.localCircles || []);
    }
    // Fallback/Template base asphalt material
    this.asphaltMat = this.asphaltMaterials[0];
    const concreteTextures = createConcreteTextures();
    this.concreteMat = new THREE.MeshStandardMaterial({
      map: concreteTextures.map,
      roughness: 0.75,
      metalness: 0.05,
      bumpMap: concreteTextures.roughnessMap,
      bumpScale: 0.08,
      envMapIntensity: 0.15
    });
    this.yellowLineMat = new THREE.MeshStandardMaterial({ color: 0xe5a93b, roughness: 0.6 });
    this.whiteLineMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.6 });
    this.streetlightPoleMat = new THREE.MeshStandardMaterial({ color: 0x22252c, metalness: 0.8, roughness: 0.5 });
    this.streetlightBulbMat = new THREE.MeshStandardMaterial({ color: 0xfff6dd, emissive: 0xffcc88, emissiveIntensity: 3.5 });
    
    // Baked ground light pool geometry and materials for far-distance visibility without active lights
    this.lightPoolGeo = new THREE.PlaneGeometry(64, 64); // Wider radius for better blending
    this.lightPoolGeo.rotateX(-Math.PI / 2);
    this.groundLightPoolTex = createGroundLightPoolTexture();
    this.ledGroundLightPoolMat = new THREE.MeshBasicMaterial({
      map: this.groundLightPoolTex,
      color: 0xaad4ff, // Cleaner, richer cool blue-white illumination tint
      transparent: true,
      opacity: 0.26, // Adjusted for new texture fade
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.sodiumGroundLightPoolMat = new THREE.MeshBasicMaterial({
      map: this.groundLightPoolTex,
      color: 0xffb85c, // Warm sodium golden amber illumination tint (more natural)
      transparent: true,
      opacity: 0.35, // Adjusted for new texture fade
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    // Storefront ground light pool geometry and material
    this.storefrontLightPoolGeo = new THREE.PlaneGeometry(24, 24);
    this.storefrontLightPoolGeo.rotateX(-Math.PI / 2);
    this.storefrontGroundLightPoolMat = new THREE.MeshBasicMaterial({
      map: this.groundLightPoolTex,
      color: 0xffecc4, // Warm glowing shop window light spill
      transparent: true,
      opacity: 0.30,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    // Volumetric streetlight light cone setup (procedural soft 2D cone texture)
    const coneCanvas = document.createElement('canvas');
    coneCanvas.width = 64;
    coneCanvas.height = 128;
    const coneCtx = coneCanvas.getContext('2d');
    const imgData = coneCtx.createImageData(64, 128);
    for (let y = 0; y < 128; y++) {
      const py = y / 127; // 0 to 1 (top to bottom)
      for (let x = 0; x < 64; x++) {
        const px = x / 63; // 0 to 1 (left to right)
        const dx = Math.abs(px - 0.5);
        const coneWidth = 0.15 + py * 0.75; // Widened significantly to cover the road lanes
        const horizontalFade = Math.max(0, 1.0 - (dx / coneWidth));
        const verticalFade = Math.max(0, 1.0 - py);
        
        // Strong vertical fade power (3.2) to make the bottom fade out completely before intersecting the ground
        const intensity = Math.pow(horizontalFade, 1.5) * Math.pow(verticalFade, 3.2);
        
        const idx = (y * 64 + x) * 4;
        imgData.data[idx] = 255;
        imgData.data[idx + 1] = 255;
        imgData.data[idx + 2] = 255;
        imgData.data[idx + 3] = Math.round(intensity * 255);
      }
    }
    coneCtx.putImageData(imgData, 0, 0);
    this.lightConeTex = new THREE.CanvasTexture(coneCanvas);

    // Volumetric cross-planes (two intersecting 2D planes to form soft 3D visual from all angles, widened to 13.5m)
    const planeGeo1 = new THREE.PlaneGeometry(13.5, 7.8, 1, 1);
    const planeGeo2 = planeGeo1.clone();
    planeGeo2.rotateY(Math.PI / 2);
    this.lightConeGeo = BufferGeometryUtils.mergeGeometries([planeGeo1, planeGeo2]);

    this.lightConeMatLED = new THREE.MeshBasicMaterial({
      map: this.lightConeTex,
      color: 0xaad4ff,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    this.lightConeMatSodium = new THREE.MeshBasicMaterial({
      map: this.lightConeTex,
      color: 0xffb85c,
      transparent: true,
      opacity: 0.26,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    // Alley ground light pool geometry
    this.alleyLightPoolGeo = new THREE.PlaneGeometry(32, 32);
    this.alleyLightPoolGeo.rotateX(-Math.PI / 2);

    this.brickMat = new THREE.MeshStandardMaterial({ color: 0x5a2f28, roughness: 0.8 }); // Gritty dark brick red
    this.buildingConcreteMat = new THREE.MeshStandardMaterial({ color: 0x70737a, roughness: 0.65 }); // Mid-gray concrete
    this.slateMat = new THREE.MeshStandardMaterial({ color: 0x31353f, roughness: 0.7 }); // Dark slate gray
    this.sandstoneMat = new THREE.MeshStandardMaterial({ color: 0xaa9882, roughness: 0.85 }); // Muted dusty sandstone beige
    this.glassySlateMat = new THREE.MeshStandardMaterial({ color: 0x1d2229, metalness: 0.75, roughness: 0.25 }); // Dark tinted glass
    this.darkConcreteMat = new THREE.MeshStandardMaterial({ color: 0x47494f, roughness: 0.7 }); // Dark charcoal concrete
    this.brickDarkMat = new THREE.MeshStandardMaterial({ color: 0x3d2b27, roughness: 0.85 }); // Soot-stained dark industrial brick
    this.materials = [this.brickMat, this.buildingConcreteMat, this.slateMat, this.sandstoneMat, this.glassySlateMat, this.darkConcreteMat, this.brickDarkMat];

    this.windowYellowMat = new THREE.MeshStandardMaterial({ color: 0xfffae6, emissive: 0xffcb66, emissiveIntensity: 4.2, roughness: 0.2 });
    this.windowBlueMat = new THREE.MeshStandardMaterial({ color: 0xe6f7ff, emissive: 0x3ac3ff, emissiveIntensity: 3.8, roughness: 0.2 });
    this.windowDarkMat = new THREE.MeshStandardMaterial({ color: 0x11131a, roughness: 0.1, metalness: 0.9 });
    
    const windowTextures = createWindowTextures();
    this.windowDetailedMat = new THREE.MeshStandardMaterial({
      map: windowTextures.map,
      roughness: 0.15,
      metalness: 0.2,
      emissive: 0xffffff,
      emissiveMap: windowTextures.emissiveMap,
      emissiveIntensity: 5.5
    });

    this.doorMat = new THREE.MeshStandardMaterial({ color: 0x3d281a, roughness: 0.6 });
    this.accessoryMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.5 });
    this.dumpsterMat = new THREE.MeshStandardMaterial({ color: 0x1f3c6d, roughness: 0.8, metalness: 0.2 });
    this.cardboardMat = new THREE.MeshStandardMaterial({ color: 0x9b7a5a, roughness: 0.9 });
    this.trashBagMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8 });
    this.woodPoleMat = new THREE.MeshStandardMaterial({ color: 0x4d3319, roughness: 0.9 });
    this.trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a3d28, roughness: 0.9 });
    this.leafMat = new THREE.MeshStandardMaterial({ color: 0x2e5c1e, roughness: 0.8 });
    this.leafCherryMat = new THREE.MeshStandardMaterial({ color: 0xe07297, roughness: 0.8 }); // Pink cherry blossom
    this.leafAutumnMat = new THREE.MeshStandardMaterial({ color: 0xd47525, roughness: 0.8 }); // Orange autumn maple
    
    this.billboardColors = [0xff0055, 0x00ff66, 0x00f0ff, 0xffaa00];

    // New breakable assets materials
    this.benchWoodMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.7 });
    this.benchIronMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8, roughness: 0.4 });
    this.phoneBoothFrameMat = new THREE.MeshStandardMaterial({ color: 0xcc2222, metalness: 0.6, roughness: 0.3 });
    this.phoneBoothGlassMat = new THREE.MeshStandardMaterial({ color: 0x99ddff, transparent: true, opacity: 0.4, metalness: 0.9, roughness: 0.1 });
    this.phoneBoothScreenMat = new THREE.MeshStandardMaterial({ color: 0x3ac3ff, emissive: 0x3ac3ff, emissiveIntensity: 3.0 });
    this.trashCanMat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.7, roughness: 0.4 });
    this.trashCanLidMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.6 });

    // Shared materials for fire hydrants and newspaper boxes to support geometry merging
    this.hydrantRedMat = new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.4, metalness: 0.6 });
    this.hydrantCapMat = new THREE.MeshStandardMaterial({ color: 0xddaa00, roughness: 0.5, metalness: 0.7 });
    this.newspaperBodyMat = new THREE.MeshStandardMaterial({ color: 0x1f4e79, roughness: 0.5 });
    this.newspaperGlassMat = new THREE.MeshStandardMaterial({ color: 0xeef7ff, transparent: true, opacity: 0.4, metalness: 0.9, roughness: 0.1 });
    this.newspaperPaperMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.9 });

    // Traffic light materials
    this.tlRedOnMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.tlRedOffMat = new THREE.MeshStandardMaterial({ color: 0x3a0000, roughness: 0.8 });
    
    this.tlYellowOnMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    this.tlYellowOffMat = new THREE.MeshStandardMaterial({ color: 0x3a2500, roughness: 0.8 });
    
    this.tlGreenOnMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.tlGreenOffMat = new THREE.MeshStandardMaterial({ color: 0x003a00, roughness: 0.8 });
    
    this.tlHousingMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });
    
    this.namedMaterials = new Map();
    this.namedMaterials.set('concreteMat', this.concreteMat);
    this.namedMaterials.set('yellowLineMat', this.yellowLineMat);
    this.namedMaterials.set('whiteLineMat', this.whiteLineMat);
    this.namedMaterials.set('streetlightPoleMat', this.streetlightPoleMat);
    this.namedMaterials.set('streetlightBulbMat', this.streetlightBulbMat);
    this.namedMaterials.set('ledGroundLightPoolMat', this.ledGroundLightPoolMat);
    this.namedMaterials.set('sodiumGroundLightPoolMat', this.sodiumGroundLightPoolMat);
    this.namedMaterials.set('storefrontGroundLightPoolMat', this.storefrontGroundLightPoolMat);
    this.namedMaterials.set('lightConeMatLED', this.lightConeMatLED);
    this.namedMaterials.set('lightConeMatSodium', this.lightConeMatSodium);
    this.namedMaterials.set('brickMat', this.brickMat);
    this.namedMaterials.set('buildingConcreteMat', this.buildingConcreteMat);
    this.namedMaterials.set('slateMat', this.slateMat);
    this.namedMaterials.set('sandstoneMat', this.sandstoneMat);
    this.namedMaterials.set('glassySlateMat', this.glassySlateMat);
    this.namedMaterials.set('darkConcreteMat', this.darkConcreteMat);
    this.namedMaterials.set('brickDarkMat', this.brickDarkMat);
    this.namedMaterials.set('windowDetailedMat', this.windowDetailedMat);
    this.namedMaterials.set('doorMat', this.doorMat);
    this.namedMaterials.set('accessoryMat', this.accessoryMat);
    this.namedMaterials.set('dumpsterMat', this.dumpsterMat);
    this.namedMaterials.set('cardboardMat', this.cardboardMat);
    this.namedMaterials.set('trashBagMat', this.trashBagMat);
    this.namedMaterials.set('woodPoleMat', this.woodPoleMat);
    this.namedMaterials.set('trunkMat', this.trunkMat);
    this.namedMaterials.set('leafMat', this.leafMat);
    this.namedMaterials.set('leafCherryMat', this.leafCherryMat);
    this.namedMaterials.set('leafAutumnMat', this.leafAutumnMat);
    this.namedMaterials.set('benchWoodMat', this.benchWoodMat);
    this.namedMaterials.set('benchIronMat', this.benchIronMat);
    this.namedMaterials.set('phoneBoothFrameMat', this.phoneBoothFrameMat);
    this.namedMaterials.set('phoneBoothGlassMat', this.phoneBoothGlassMat);
    this.namedMaterials.set('phoneBoothScreenMat', this.phoneBoothScreenMat);
    this.namedMaterials.set('trashCanMat', this.trashCanMat);
    this.namedMaterials.set('trashCanLidMat', this.trashCanLidMat);
    this.namedMaterials.set('hydrantRedMat', this.hydrantRedMat);
    this.namedMaterials.set('hydrantCapMat', this.hydrantCapMat);
    this.namedMaterials.set('newspaperBodyMat', this.newspaperBodyMat);
    this.namedMaterials.set('newspaperGlassMat', this.newspaperGlassMat);
    this.namedMaterials.set('newspaperPaperMat', this.newspaperPaperMat);
    this.namedMaterials.set('tlHousingMat', this.tlHousingMat);
    this.namedMaterials.set('tlRedOffMat', this.tlRedOffMat);
    this.namedMaterials.set('tlYellowOffMat', this.tlYellowOffMat);
    this.namedMaterials.set('tlGreenOffMat', this.tlGreenOffMat);
    
    this.trafficLights = [];
    this.breakables = [];

    // Light source locations list
    this.lightSources = [];
    this.activeLights = [];
    this.maxLights = 36; // Restored to 36 for high GPU performance while keeping storefronts/streetlights active
    this.initLightPool();
    this.slFlareTex = createStreetlightFlareTexture();

    // Generate static templates at startup to avoid CPU mid-frame BufferGeometry merging!
    this.templates = {};
    this.generateTemplates();

    // Initialize Web Worker for background world generation
    this.worker = new Worker(new URL('./world.worker.js', import.meta.url), { type: 'module' });
    this.loadingTiles = new Set();
    
    this.worker.onmessage = (e) => {
      const { type, data } = e.data;
      if (type === 'tileGenerated') {
        this.onTileGenerated(data);
      }
    };

    this.worker.postMessage({
      type: 'init',
      data: {
        tileSize: this.tileSize,
        mainRoadColumns: Array.from(this.mainRoadColumns),
        mainRoadRows: Array.from(this.mainRoadRows),
        shortcutColumns: Array.from(this.shortcutColumns),
        shortcutRows: Array.from(this.shortcutRows),
        roadColumns: Array.from(this.roadColumns),
        roadRows: Array.from(this.roadRows),
        sortedColumnsArray: this.sortedColumnsArray,
        sortedRowsArray: this.sortedRowsArray,
        asphaltLocalCircles: this.asphaltLocalCircles
      }
    });
  }

  initLightPool() {
    this.lightPool = [];
    // 36 lights is highly optimized for performance while ensuring all nearby storefronts,
    // streetlights, and traffic headlights can shine simultaneously.
    this.maxLights = 36;
    for (let i = 0; i < this.maxLights; i++) {
      const light = new THREE.PointLight(0xffd5a1, 0.0, 110, 1.15);
      light.castShadow = false; // Never cast shadows from pooled lights (very expensive)
      this.scene.add(light);
      this.lightPool.push(light);
    }
  }

  generateTemplates() {
    // 1. TREE MODEL TEMPLATE
    const treeGroup = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.8, 4.0, 0.8), this.trunkMat);
    trunk.position.y = 2.0;
    trunk.castShadow = true;
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
    leavesMesh.castShadow = true;
    treeGroup.add(leavesMesh);
    this.templates.tree = treeGroup;

    // 1b. ROUND TREE TEMPLATE (Green)
    const treeRoundGroup = new THREE.Group();
    const trunkRound = new THREE.Mesh(new THREE.BoxGeometry(0.8, 3.2, 0.8), this.trunkMat);
    trunkRound.position.y = 1.6;
    trunkRound.castShadow = true;
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
    leavesRoundMesh.castShadow = true;
    leavesRoundMesh.receiveShadow = true;
    treeRoundGroup.add(leavesRoundMesh);
    this.templates.treeRoundGreen = treeRoundGroup;

    // 1c. PRE-BUILD LEAF COLOR VARIATIONS FOR PINE AND ROUND TREES (Zero runtime traversal!)
    const treeGroupCherry = new THREE.Group();
    treeGroupCherry.add(trunk.clone());
    const leavesCherry = new THREE.Mesh(mergedLeaves, this.leafCherryMat);
    leavesCherry.castShadow = true;
    treeGroupCherry.add(leavesCherry);
    this.templates.treeCherry = treeGroupCherry;

    const treeGroupAutumn = new THREE.Group();
    treeGroupAutumn.add(trunk.clone());
    const leavesAutumn = new THREE.Mesh(mergedLeaves, this.leafAutumnMat);
    leavesAutumn.castShadow = true;
    treeGroupAutumn.add(leavesAutumn);
    this.templates.treeAutumn = treeGroupAutumn;

    const treeRoundCherry = new THREE.Group();
    treeRoundCherry.add(trunkRound.clone());
    const leavesRoundCherry = new THREE.Mesh(mergedRoundLeaves, this.leafCherryMat);
    leavesRoundCherry.castShadow = true;
    leavesRoundCherry.receiveShadow = true;
    treeRoundCherry.add(leavesRoundCherry);
    this.templates.treeRoundCherry = treeRoundCherry;

    const treeRoundAutumn = new THREE.Group();
    treeRoundAutumn.add(trunkRound.clone());
    const leavesRoundAutumn = new THREE.Mesh(mergedRoundLeaves, this.leafAutumnMat);
    leavesRoundAutumn.castShadow = true;
    leavesRoundAutumn.receiveShadow = true;
    treeRoundAutumn.add(leavesRoundAutumn);
    this.templates.treeRoundAutumn = treeRoundAutumn;

    // 1d. FIRE HYDRANT TEMPLATE
    this.templates.fireHydrant = this.createFireHydrantMesh();

    // 1e. NEWSPAPER BOX TEMPLATE
    this.templates.newspaperBox = this.createNewspaperBoxMesh();

    // 1f. BENCH TEMPLATE
    this.templates.bench = this.createBenchMesh();

    // 1g. PHONE BOOTH TEMPLATE
    this.templates.phoneBooth = this.createPhoneBoothMesh();

    // 1h. TRASH CAN TEMPLATE
    this.templates.trashCan = this.createTrashCanMesh();

    // 2. STREETLIGHT MODEL TEMPLATE
    const slGroup = new THREE.Group();
    const slPole = new THREE.Mesh(new THREE.BoxGeometry(0.3, 8.5, 0.3), this.streetlightPoleMat);
    slPole.position.y = 4.25;
    slPole.castShadow = true;
    slGroup.add(slPole);
    this.templates.streetlight = slGroup;
  }

  createFireHydrantMesh() {
    return createFireHydrantMesh.call(this);
  }

  createNewspaperBoxMesh() {
    return createNewspaperBoxMesh.call(this);
  }

  getFadedMaterial(origMat, opacity) {
    if (!this.materialOpacityPool) this.materialOpacityPool = new Map();
    
    if (!this.materialOpacityPool.has(origMat)) {
      const steps = [];
      for (let i = 0; i <= 10; i++) {
        const cloned = origMat.clone();
        cloned.transparent = true;
        cloned.opacity = i / 10;
        steps.push(cloned);
      }
      this.materialOpacityPool.set(origMat, steps);
    }
    
    const index = Math.max(0, Math.min(10, Math.round(opacity * 10)));
    return this.materialOpacityPool.get(origMat)[index];
  }

  segmentIntersectsAABB(p1x, p1z, p2x, p2z, xMin, xMax, zMin, zMax) {
    const minX = Math.min(p1x, p2x);
    const maxX = Math.max(p1x, p2x);
    const minZ = Math.min(p1z, p2z);
    const maxZ = Math.max(p1z, p2z);

    // Quick bounding box check
    if (maxX < xMin || minX > xMax || maxZ < zMin || minZ > zMax) return false;

    // Line equation: A*x + B*z + C = 0
    const A = p1z - p2z;
    const B = p2x - p1x;
    const C = p1x * p2z - p2x * p1z;

    const v1 = A * xMin + B * zMin + C;
    const v2 = A * xMin + B * zMax + C;
    const v3 = A * xMax + B * zMin + C;
    const v4 = A * xMax + B * zMax + C;

    if ((v1 > 0 && v2 > 0 && v3 > 0 && v4 > 0) || (v1 < 0 && v2 < 0 && v3 < 0 && v4 < 0)) return false;
    return true;
  }

  update(playerX, playerZ, heading = 0, dynamicLightsList = [], dt = 0.016, cameraPos = null) {
    const pTileX = Math.round(playerX / this.tileSize);
    const pTileZ = Math.round(playerZ / this.tileSize);
    this._lastPlayerTileX = pTileX;
    this._lastPlayerTileZ = pTileZ;

    // 1. Generate/Load new tiles (Time-sliced/Queued loading: max 1 per frame, closest first)
    let closestTileX = null;
    let closestTileZ = null;
    let minDistanceSq = Infinity;

    for (let x = pTileX - this.renderRadius; x <= pTileX + this.renderRadius; x++) {
      for (let z = pTileZ - this.renderRadius; z <= pTileZ + this.renderRadius; z++) {
        const key = `${x},${z}`;
        if (!this.loadedTiles.has(key) && !this.loadingTiles.has(key)) {
          const dx = x - pTileX;
          const dz = z - pTileZ;
          const distSq = dx * dx + dz * dz;
          if (distSq < minDistanceSq) {
            minDistanceSq = distSq;
            closestTileX = x;
            closestTileZ = z;
          }
        }
      }
    }

    if (closestTileX !== null && closestTileZ !== null) {
      this.generateTile(closestTileX, closestTileZ);
    }

    // 2. Unload far tiles — use stored numeric coords to avoid string split/map per tile
    for (const [key, tile] of this.loadedTiles.entries()) {
      if (Math.abs(tile.gridX - pTileX) > this.renderRadius || Math.abs(tile.gridZ - pTileZ) > this.renderRadius) {
        this.unloadTile(key, tile);
      }
    }

    // 2b. CPU-Side Heading-based Visual Chunk Culling
    const dirX = Math.sin(heading);
    const dirZ = Math.cos(heading);
    const renderLimitAngle = -0.42; // ~115 degree FOV coverage

    for (const tile of this.loadedTiles.values()) {
      const dx = tile.posX - playerX;
      const dz = tile.posZ - playerZ;
      const distSq = dx * dx + dz * dz;

      if (distSq < 65 * 65) {
        if (!tile.visible) { this.scene.add(tile.group); tile.visible = true; }
      } else {
        const dot = dx * dirX + dz * dirZ;
        const show = dot > 0 || (dot * dot < 0.1764 * distSq); // Avoids Math.sqrt (0.42 * 0.42 = 0.1764)
        if (show && !tile.visible)       { this.scene.add(tile.group);    tile.visible = true; }
        else if (!show && tile.visible)  { this.scene.remove(tile.group); tile.visible = false; }
      }
    }

    // 2c. Camera Building Occlusion Dithering
    if (cameraPos) {
      for (const tile of this.loadedTiles.values()) {
        tile.isOccluding = false;
        if (!tile.visible) continue;
        
        const dx = tile.posX - playerX;
        const dz = tile.posZ - playerZ;
        if (dx * dx + dz * dz < 14400) { // Only check if within 120m
          if (tile.obstacles) {
            for (let i = 0; i < tile.obstacles.length; i++) {
              const obs = tile.obstacles[i];
              if (!obs.isBuilding) continue;

              // Expand the bounding box by 1.5m so it triggers just before the camera clips,
              // preventing the glitchy edge-clipping effect.
              if (this.segmentIntersectsAABB(cameraPos.x, cameraPos.z, playerX, playerZ, obs.xMin - 1.5, obs.xMax + 1.5, obs.zMin - 1.5, obs.zMax + 1.5)) {
                tile.isOccluding = true;
                break;
              }
            }
          }
        }
      }
    }

    // 3. Update active lights from light pool
    // Pre-filter lightSources by distance^2 — reuse a cached array to avoid per-frame allocation
    if (!this._lightWorkBuf) this._lightWorkBuf = [];
    const lightCullDistSq = 560 * 560;
    let wli = 0;
    for (let si = 0; si < this.lightSources.length; si++) {
      const src = this.lightSources[si];
      const dx = src.x - playerX;
      const dz = src.z - playerZ;
      const distSq = dx * dx + dz * dz;

      // Update baked ground light pool opacity smoothly based ONLY on distance to player
      if (src.poolMesh) {
        if (distSq >= 12100) { // 110m * 110m
          src.poolMesh.material.opacity = src.defaultOpacity;
        } else if (distSq <= 2025) { // 45m * 45m
          src.poolMesh.material.opacity = 0.0;
        } else {
          const dist = Math.sqrt(distSq);
          const t = (dist - 45.0) / 65.0; // 0.0 at 45m, 1.0 at 110m
          const smoothT = t * t * (3.0 - 2.0 * t); // Smoothstep curve
          src.poolMesh.material.opacity = src.defaultOpacity * smoothT;
        }
      }

      if (distSq < lightCullDistSq) {
        src._distSq = distSq; // Pre-cache squared distance
        this._lightWorkBuf[wli++] = src;
      }
    }
    // Append dynamic lights (headlamps, sirens, sparks)
    for (let di = 0; di < dynamicLightsList.length; di++) {
      const src = dynamicLightsList[di];
      const dx = src.x - playerX;
      const dz = src.z - playerZ;
      src._distSq = dx * dx + dz * dz; // Pre-cache squared distance
      this._lightWorkBuf[wli++] = src;
    }

    // Heading-based cull: remove lights behind camera (in-place compact)
    let wi = 0;
    for (let ri = 0; ri < wli; ri++) {
      const src = this._lightWorkBuf[ri];
      const dx = src.x - playerX;
      const dz = src.z - playerZ;
      const distSq = src._distSq;
      const dot = dx * dirX + dz * dirZ;
      if (distSq < 65 * 65 || dot > 0 || dot * dot < 0.1764 * distSq) { // Avoids Math.sqrt (0.42 * 0.42 = 0.1764)
        this._lightWorkBuf[wi++] = src;
      }
    }
    const visibleCount = wi;

    // Sort by distance every frame — using partial selection sort to find the closest lights.
    // This runs in-place on the pre-allocated _lightWorkBuf with zero garbage collection/allocation overhead,
    // sorting only up to maxLights (24) slots which avoids expensive full sorts.
    const sortLimit = Math.min(this.maxLights, visibleCount);
    for (let i = 0; i < sortLimit; i++) {
      let minIdx = i;
      let minDistSq = this._lightWorkBuf[i]._distSq;
      for (let j = i + 1; j < visibleCount; j++) {
        const distSq = this._lightWorkBuf[j]._distSq;
        if (distSq < minDistSq) {
          minDistSq = distSq;
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        const temp = this._lightWorkBuf[i];
        this._lightWorkBuf[i] = this._lightWorkBuf[minIdx];
        this._lightWorkBuf[minIdx] = temp;
      }
    }

    // Assign pool lights to closest sources
    const maxVisibleDist = 560.0;
    const fadeStartDist  = 380.0;
    for (let i = 0; i < this.maxLights; i++) {
      const light = this.lightPool[i];
      if (i < visibleCount) {
        const source = this._lightWorkBuf[i];
        light.position.set(source.x, source.y, source.z);
        const dx = source.x - playerX;
        const dz = source.z - playerZ;
        const dist = Math.sqrt(dx * dx + dz * dz);
        let intensity = source.intensity || 0.0;
        
        if (dist > fadeStartDist) {
          intensity *= Math.max(0.0, 1.0 - (dist - fadeStartDist) / (maxVisibleDist - fadeStartDist));
        }

        // Smooth cross-fade for real-time light intensity:
        if (source.poolMesh) {
          // Streetlights: Transition range: 45m (100%) to 110m (0%)
          if (dist < 45.0) {
            // Very close: 100% real-time light intensity
          } else if (dist > 110.0) {
            // Far away: 0% real-time light intensity
            intensity = 0.0;
          } else {
            // Transition zone: smoothly interpolate real-time light fade out
            const t = (dist - 45.0) / 65.0;
            const smoothT = t * t * (3.0 - 2.0 * t); // Smoothstep curve
            intensity *= (1.0 - smoothT);
          }
        } else {
          // Other dynamic lights (traffic/cop headlights, sirens, sparks, drift glow):
          // Transition range: 80m (100%) to 120m (0%) to prevent pop-in
          if (dist < 80.0) {
            // Close: 100% intensity
          } else if (dist > 120.0) {
            // Far: 0% intensity
            intensity = 0.0;
          } else {
            // Transition zone: smoothly fade out
            const t = (dist - 80.0) / 40.0; // 0.0 at 80m, 1.0 at 120m
            const smoothT = t * t * (3.0 - 2.0 * t); // Smoothstep curve
            intensity *= (1.0 - smoothT);
          }
        }

        light.intensity = intensity;
        light.color.setHex(source.color || 0xffaa3a);
      } else {
        light.intensity = 0.0;
      }
    }

    // 4. Update traffic light visual states
    // Guard material swaps: only re-assign material when the color has actually changed
    // (avoids triggering a GPU re-bind on every frame for every traffic light)
    const gameTime = window.gameTime || 0;
    this.trafficLights.forEach(tl => {
      const state = getTrafficLightState(tl.intersectionX, tl.intersectionZ, gameTime);
      const activeColor = tl.axis === 'x' ? state.xLight : state.zLight;
      if (tl._lastColor !== activeColor) {
        tl._lastColor = activeColor;
        tl.redMesh.material    = activeColor === 'red'    ? this.tlRedOnMat    : this.tlRedOffMat;
        tl.yellowMesh.material = activeColor === 'yellow' ? this.tlYellowOnMat : this.tlYellowOffMat;
        tl.greenMesh.material  = activeColor === 'green'  ? this.tlGreenOnMat  : this.tlGreenOffMat;
      }
    });

    // 4b. Update tile fade-in transitions using the material pool
    const fadeSpeed = 3.0; // Fast fading
    for (const tile of this.loadedTiles.values()) {
      const targetOpacity = tile.isOccluding ? 0.2 : 1.0;
      if (tile.fadeProgress === undefined) tile.fadeProgress = 1.0;
      const isOpacityCorrect = tile.fadeProgress === targetOpacity;

      if (tile.isFading || !isOpacityCorrect) {
        // Move towards target
        if (tile.fadeProgress < targetOpacity) {
          tile.fadeProgress = Math.min(targetOpacity, tile.fadeProgress + dt * fadeSpeed);
        } else if (tile.fadeProgress > targetOpacity) {
          tile.fadeProgress = Math.max(targetOpacity, tile.fadeProgress - dt * fadeSpeed * 1.5);
        }

        if (tile.fadeProgress === 1.0) {
          tile.isFading = false;
          tile.group.traverse(child => {
            if (child.isMesh && child._origMaterial) {
              child.material = child._origMaterial;
              child._origMaterial = undefined;
            }
          });
        } else {
          tile.isFading = true; // Still processing fade
          tile.group.traverse(child => {
            if (child.isMesh) {
              // Ensure we cache original material before modifying
              if (!child._origMaterial) {
                child._origMaterial = child.material;
              }
              
              // If it's a ground mesh and the tile is currently occluding,
              // don't drop the ground opacity below 1.0 (unless it's still fading in from initial load).
              // Since occluding pulls fadeProgress to 0.2, we override it to 1.0 for the ground.
              const finalProgress = (child.isGround && tile.isOccluding) ? 1.0 : tile.fadeProgress;

              if (Array.isArray(child._origMaterial)) {
                child.material = child._origMaterial.map((m, idx) => {
                  const origOpacity = m.opacity !== undefined ? m.opacity : 1.0;
                  return this.getFadedMaterial(m, origOpacity * finalProgress);
                });
              } else {
                const origOpacity = child._origMaterial.opacity !== undefined ? child._origMaterial.opacity : 1.0;
                child.material = this.getFadedMaterial(child._origMaterial, origOpacity * finalProgress);
              }
            }
          });
        }
      }
    }
  }

  getRoadWidthForGrid(gridX, gridZ) {
    let rwX = 26;
    let rwZ = 26;
    
    // Check horizontal street (running along X, constant gridZ)
    const seedZ = Math.sin(gridZ * 78.233) * 43758.5453;
    const randZ = seedZ - Math.floor(seedZ);
    if (randZ > 0.6) { // 40% chance of narrow road
      rwZ = 14; 
    }
    
    // Check vertical street (running along Z, constant gridX)
    const seedX = Math.sin(gridX * 12.9898) * 43758.5453;
    const randX = seedX - Math.floor(seedX);
    if (randX > 0.6) { // 40% chance of narrow road
      rwX = 14;
    }
    
    return { rwX, rwZ };
  }

  getBlockInfo(gridX, gridZ) {
    let colLeft = 0;
    let colRight = 0;
    for (let x = gridX; x >= -1000; x--) {
      if (this.roadColumns.has(x)) {
        colLeft = x;
        break;
      }
    }
    for (let x = gridX + 1; x <= 1000; x++) {
      if (this.roadColumns.has(x)) {
        colRight = x;
        break;
      }
    }
    
    let rowTop = 0;
    let rowBottom = 0;
    for (let z = gridZ; z >= -1000; z--) {
      if (this.roadRows.has(z)) {
        rowTop = z;
        break;
      }
    }
    for (let z = gridZ + 1; z <= 1000; z++) {
      if (this.roadRows.has(z)) {
        rowBottom = z;
        break;
      }
    }
    
    return {
      colLeft,
      colRight,
      rowTop,
      rowBottom,
      blockWidth: colRight - colLeft,
      blockHeight: rowBottom - rowTop,
      dx: gridX - colLeft,
      dz: gridZ - rowTop
    };
  }

  isAlley(gridX, gridZ) {
    if (this.mainRoadColumns.has(gridX) || this.mainRoadRows.has(gridZ)) return false;
    return this.shortcutColumns.has(gridX) || this.shortcutRows.has(gridZ);
  }

  snapToNearestIntersection(x, z) {
    const gridX = Math.round(x / this.tileSize);
    const gridZ = Math.round(z / this.tileSize);
    
    let nearestCol = 0;
    let minColDist = Infinity;
    for (let cx = gridX - 8; cx <= gridX + 8; cx++) {
      if (this.roadColumns.has(cx)) {
        const dist = Math.abs(cx - gridX);
        if (dist < minColDist) {
          minColDist = dist;
          nearestCol = cx;
        }
      }
    }
    
    let nearestRow = 0;
    let minRowDist = Infinity;
    for (let cz = gridZ - 8; cz <= gridZ + 8; cz++) {
      if (this.roadRows.has(cz)) {
        const dist = Math.abs(cz - gridZ);
        if (dist < minRowDist) {
          minRowDist = dist;
          nearestRow = cz;
        }
      }
    }
    
    return {
      x: nearestCol * this.tileSize,
      z: nearestRow * this.tileSize
    };
  }

  generateTile(gridX, gridZ) {
    const key = `${gridX},${gridZ}`;

    // Optimization: if it's a building tile and cached, construct it synchronously immediately!
    const isAlley = this.isAlley(gridX, gridZ);
    const isRoad = this.roadColumns.has(gridX) || this.roadRows.has(gridZ);
    if (!isAlley && !isRoad && this.buildingGeoCache && this.buildingGeoCache.has(key)) {
      const tileGroup = new THREE.Group();
      const tileObstacles = [];
      const tileLights = [];
      const posX = gridX * this.tileSize;
      const posZ = gridZ * this.tileSize;
      this.buildBuildingTile(gridX, gridZ, posX, posZ, tileGroup, tileObstacles, tileLights);
      
      // Initialize tile meshes to 0.0 opacity using the pool
      tileGroup.traverse(child => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child._origMaterial = child.material;
            child.material = child.material.map(m => this.getFadedMaterial(m, 0.0));
          } else {
            child._origMaterial = child.material;
            child.material = this.getFadedMaterial(child.material, 0.0);
          }
        }
      });

      this.scene.add(tileGroup);
      
      this.loadedTiles.set(key, {
        group: tileGroup,
        obstacles: tileObstacles,
        lights: tileLights,
        posX: posX,
        posZ: posZ,
        gridX: gridX,
        gridZ: gridZ,
        visible: true,
        fadeProgress: 0.0,
        isFading: true
      });

      this.obstacles.push(...tileObstacles);
      // Insert into spatial hash
      for (const obs of tileObstacles) {
        const x0 = Math.floor(obs.xMin / this.spatialCellSize);
        const x1 = Math.floor(obs.xMax / this.spatialCellSize);
        const z0 = Math.floor(obs.zMin / this.spatialCellSize);
        const z1 = Math.floor(obs.zMax / this.spatialCellSize);
        for (let cx = x0; cx <= x1; cx++) {
          for (let cz = z0; cz <= z1; cz++) {
            const k = `${cx},${cz}`;
            if (!this.obstacleGrid.has(k)) this.obstacleGrid.set(k, []);
            this.obstacleGrid.get(k).push(obs);
          }
        }
      }
      this.lightSources.push(...tileLights);
      return;
    }

    if (this.loadingTiles.has(key)) return;
    this.loadingTiles.add(key);

    this.worker.postMessage({
      type: 'generateTile',
      data: {
        gridX,
        gridZ,
        posX: gridX * this.tileSize,
        posZ: gridZ * this.tileSize,
        key
      }
    });
  }

  reconstructGeometry(geomData, cache) {
    if (geomData.cached) {
      return cache.get(geomData.uuid);
    }

    const geom = new THREE.BufferGeometry();
    geom.uuid = geomData.uuid;

    for (const name in geomData.attributes) {
      const attrData = geomData.attributes[name];
      const attr = new THREE.BufferAttribute(attrData.array, attrData.itemSize, attrData.normalized);
      geom.setAttribute(name, attr);
    }

    if (geomData.index) {
      const indexAttr = new THREE.BufferAttribute(geomData.index.array, geomData.index.itemSize);
      geom.setIndex(indexAttr);
    }

    if (geomData.groups && geomData.groups.length > 0) {
      for (const g of geomData.groups) {
        geom.addGroup(g.start, g.count, g.materialIndex);
      }
    }

    geom.isCached = geomData.isCached;
    if (geom.isCached) {
      cache.set(geom.uuid, geom);
    }

    return geom;
  }

  reconstructMaterial(matData) {
    if (Array.isArray(matData)) {
      return matData.map(m => this.reconstructMaterial(m));
    }
    if (!matData) return null;

    if (matData.type === 'sprite') {
      return new THREE.SpriteMaterial({
        map: this.slFlareTex,
        color: matData.color,
        transparent: true,
        opacity: matData.opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
    }

    if (matData.type === 'custom_emissive') {
      return new THREE.MeshStandardMaterial({
        color: 0x111111,
        emissive: matData.color,
        emissiveIntensity: 4.0
      });
    }

    const name = matData.name || "";
    if (name.startsWith('asphaltMaterials_')) {
      const idx = parseInt(name.split('_')[1], 10);
      return this.asphaltMaterials[idx];
    }
    if (name.startsWith('materials_')) {
      const idx = parseInt(name.split('_')[1], 10);
      return this.materials[idx];
    }

    const namedMat = this.namedMaterials.get(name);
    if (namedMat) {
      if (name.includes('LightPoolMat')) {
        return namedMat.clone();
      }
      return namedMat;
    }

    console.warn("Could not find material named: ", name);
    return this.concreteMat;
  }

  reconstructObject(data, cache) {
    if (data.type === 'Group') {
      const group = new THREE.Group();
      group.name = data.name;
      group.position.fromArray(data.position);
      group.quaternion.fromArray(data.quaternion);
      group.scale.fromArray(data.scale);
      if (data.children) {
        for (const childData of data.children) {
          group.add(this.reconstructObject(childData, cache));
        }
      }
      return group;
    }

    if (data.type === 'LOD') {
      const lod = new THREE.LOD();
      lod.name = data.name;
      lod.position.fromArray(data.position);
      lod.quaternion.fromArray(data.quaternion);
      lod.scale.fromArray(data.scale);
      for (const level of data.levels) {
        lod.addLevel(this.reconstructObject(level.object, cache), level.distance);
      }
      return lod;
    }

    let geom;
    if (data.geometry) {
      geom = this.reconstructGeometry(data.geometry, cache);
    }

    let mat;
    if (data.material) {
      if (!data.material.name && data.material.type !== 'custom_emissive' && data.material.type !== 'sprite') {
        console.warn("Object missing material name:", data.name, data.type, data.material);
      }
      mat = this.reconstructMaterial(data.material);
    }

    let obj;
    if (data.type === 'Mesh') {
      obj = new THREE.Mesh(geom, mat);
      obj.castShadow = data.castShadow;
      obj.receiveShadow = data.receiveShadow;
      if (data.isGround) obj.isGround = true;
    } else if (data.type === 'Sprite') {
      obj = new THREE.Sprite(mat);
    } else if (data.type === 'InstancedMesh') {
      obj = new THREE.InstancedMesh(geom, mat, data.count);
      obj.castShadow = data.castShadow;
      obj.receiveShadow = data.receiveShadow;
      obj.instanceMatrix.array.set(data.instanceMatrix);
      obj.instanceMatrix.needsUpdate = true;
    } else {
      obj = new THREE.Group();
    }

    obj.name = data.name;
    obj.position.fromArray(data.position);
    obj.quaternion.fromArray(data.quaternion);
    obj.scale.fromArray(data.scale);

    if (data.children) {
      for (const childData of data.children) {
        obj.add(this.reconstructObject(childData, cache));
      }
    }

    return obj;
  }

  onTileGenerated(data) {
    const { gridX, gridZ, posX, posZ, key, serializedGroup, obstacles, lights, trafficLights, breakables, puddles } = data;

    if (!this.loadingTiles.has(key)) {
      return;
    }

    // Check if player moved too far since request
    if (this._lastPlayerTileX !== undefined && this._lastPlayerTileZ !== undefined) {
      if (Math.abs(gridX - this._lastPlayerTileX) > this.renderRadius || Math.abs(gridZ - this._lastPlayerTileZ) > this.renderRadius) {
        this.loadingTiles.delete(key);
        return;
      }
    }

    const tileGroup = this.reconstructObject(serializedGroup, this.buildingGeoCache);
    
    tileGroup.traverse(child => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child._origMaterial = child.material;
          child.material = child.material.map(m => this.getFadedMaterial(m, 0.0));
        } else {
          child._origMaterial = child.material;
          child.material = this.getFadedMaterial(child.material, 0.0);
        }
      }
    });

    this.scene.add(tileGroup);

    const tileRecord = {
      group: tileGroup,
      obstacles: obstacles,
      lights: [],
      posX: posX,
      posZ: posZ,
      gridX: gridX,
      gridZ: gridZ,
      visible: true,
      fadeProgress: 0.0,
      isFading: true
    };
    this.loadedTiles.set(key, tileRecord);
    this.loadingTiles.delete(key);

    this.obstacles.push(...obstacles);
    for (const obs of obstacles) {
      const x0 = Math.floor(obs.xMin / this.spatialCellSize);
      const x1 = Math.floor(obs.xMax / this.spatialCellSize);
      const z0 = Math.floor(obs.zMin / this.spatialCellSize);
      const z1 = Math.floor(obs.zMax / this.spatialCellSize);
      for (let cx = x0; cx <= x1; cx++) {
        for (let cz = z0; cz <= z1; cz++) {
          const k = `${cx},${cz}`;
          if (!this.obstacleGrid.has(k)) this.obstacleGrid.set(k, []);
          this.obstacleGrid.get(k).push(obs);
        }
      }
    }

    if (lights) {
      for (const src of lights) {
        let poolMesh = null;
        if (src.poolMeshName) {
          poolMesh = tileGroup.getObjectByName(src.poolMeshName);
        }
        const lightRecord = {
          x: src.x,
          y: src.y,
          z: src.z,
          intensity: src.intensity,
          color: src.color,
          poolMesh: poolMesh,
          defaultOpacity: src.defaultOpacity
        };
        this.lightSources.push(lightRecord);
        tileRecord.lights.push(lightRecord);
      }
    }

    if (trafficLights) {
      for (const tl of trafficLights) {
        const redMesh = tileGroup.getObjectByName(tl.redName);
        const yellowMesh = tileGroup.getObjectByName(tl.yellowName);
        const greenMesh = tileGroup.getObjectByName(tl.greenName);
        this.trafficLights.push({
          redMesh,
          yellowMesh,
          greenMesh,
          axis: tl.axis,
          intersectionX: tl.intersectionX,
          intersectionZ: tl.intersectionZ,
          tileX: tl.tileX,
          tileZ: tl.tileZ
        });
      }
    }

    if (breakables) {
      for (const b of breakables) {
        const groupObj = tileGroup.getObjectByName(b.groupName);
        const flaresObj = b.flareNames ? b.flareNames.map(name => groupObj ? groupObj.getObjectByName(name) : null).filter(x => x) : [];
        const lightsObj = b.lightIndices ? b.lightIndices.map(idx => tileRecord.lights[idx]).filter(x => x) : [];
        const poolMeshesObj = b.poolMeshNames ? b.poolMeshNames.map(name => tileGroup.getObjectByName(name) || (groupObj ? groupObj.getObjectByName(name) : null)).filter(x => x) : [];
        
        let instancedMeshesObj = null;
        if (b.isInstanced && b.instancedMeshNames) {
          instancedMeshesObj = b.instancedMeshNames.map(name => tileGroup.getObjectByName(name)).filter(x => x);
        }

        this.breakables.push({
          type: b.type,
          comHeight: b.comHeight,
          radius: b.radius,
          position: new THREE.Vector3().fromArray(b.position),
          broken: b.broken,
          tileX: b.tileX,
          tileZ: b.tileZ,
          velocity: new THREE.Vector3().fromArray(b.velocity),
          angularVelocity: new THREE.Vector3().fromArray(b.angularVelocity),
          isInstanced: b.isInstanced,
          templateName: b.templateName,
          instanceId: b.instanceId,
          group: groupObj || tileGroup.getObjectByName(b.templateName),
          flares: flaresObj,
          lights: lightsObj,
          poolMeshes: poolMeshesObj,
          instancedMeshes: instancedMeshesObj
        });
      }
    }

    if (puddles) {
      this.tilePuddles.set(key, puddles);
    }
  }

  unloadTile(key, tile) {
    if (tile.visible) {
      this.scene.remove(tile.group);
    }
    
    // Dispose resources
    tile.group.traverse(child => {
      if (child.isMesh) {
        if (child.geometry && child.geometry !== this.lightPoolGeo && child.geometry !== this.storefrontLightPoolGeo && child.geometry !== this.alleyLightPoolGeo && child.geometry !== this.lightConeGeo && !child.geometry.isCached) {
          child.geometry.dispose();
        }
        // Restore original material if still fading to prevent memory leaks
        if (child._origMaterial) {
          child.material = child._origMaterial;
          child._origMaterial = undefined;
        }
      }
    });

    // Remove from flat array
    const obsSet = new Set(tile.obstacles);
    this.obstacles = this.obstacles.filter(obs => !obsSet.has(obs));
    // Remove from spatial hash
    for (const obs of tile.obstacles) {
      const x0 = Math.floor(obs.xMin / this.spatialCellSize);
      const x1 = Math.floor(obs.xMax / this.spatialCellSize);
      const z0 = Math.floor(obs.zMin / this.spatialCellSize);
      const z1 = Math.floor(obs.zMax / this.spatialCellSize);
      for (let cx = x0; cx <= x1; cx++) {
        for (let cz = z0; cz <= z1; cz++) {
          const k = `${cx},${cz}`;
          const cell = this.obstacleGrid.get(k);
          if (cell) {
            const idx = cell.indexOf(obs);
            if (idx !== -1) cell.splice(idx, 1);
            if (cell.length === 0) this.obstacleGrid.delete(k);
          }
        }
      }
    }
    this.lightSources = this.lightSources.filter(src => !tile.lights.includes(src));

    // Clear unloaded traffic lights from tracking — use stored posX/posZ instead of parsing key string
    const tilePosX = tile.posX;
    const tilePosZ = tile.posZ;
    this.trafficLights = this.trafficLights.filter(tl => tl.tileX !== tilePosX || tl.tileZ !== tilePosZ);
    this.breakables = this.breakables.filter(b => b.tileX !== tilePosX || b.tileZ !== tilePosZ);

    this.tilePuddles.delete(key);
    this.loadedTiles.delete(key);
  }

  buildRoadTile(gridX, gridZ, posX, posZ, group, obstacles, lights) {
    return buildRoadTile.call(this, gridX, gridZ, posX, posZ, group, obstacles, lights);
  }

  buildAlleyTile(gridX, gridZ, posX, posZ, group, obstacles, lights) {
    return buildAlleyTile.call(this, gridX, gridZ, posX, posZ, group, obstacles, lights);
  }

  spawnTemplateTree(x, z, group, obstacles) {
    return spawnTemplateTree.call(this, x, z, group, obstacles);
  }

  createBenchMesh() {
    return createBenchMesh.call(this);
  }

  createPhoneBoothMesh() {
    return createPhoneBoothMesh.call(this);
  }

  createTrashCanMesh() {
    return createTrashCanMesh.call(this);
  }

  buildBuildingTile(gridX, gridZ, posX, posZ, group, obstacles, lights) {
    return buildBuildingTile.call(this, gridX, gridZ, posX, posZ, group, obstacles, lights);
  }

  checkCollision(posX, posZ, radius = 2.2) {
    // Spatial hash lookup: only check obstacles in nearby grid cells
    const cs = this.spatialCellSize;
    const cx0 = Math.floor((posX - radius) / cs);
    const cx1 = Math.floor((posX + radius) / cs);
    const cz0 = Math.floor((posZ - radius) / cs);
    const cz1 = Math.floor((posZ + radius) / cs);

    // Use a rolling check ID stamp on obstacles to avoid checking duplicate references without allocation
    this.checkId = (this.checkId || 0) + 1;
    const currentCheckId = this.checkId;
    const radSq = radius * radius;

    for (let cx = cx0; cx <= cx1; cx++) {
      for (let cz = cz0; cz <= cz1; cz++) {
        const cell = this.obstacleGrid.get(`${cx},${cz}`);
        if (!cell) continue;
        for (let i = 0; i < cell.length; i++) {
          const obs = cell[i];
          if (obs._lastCheckId === currentCheckId) continue;
          obs._lastCheckId = currentCheckId;

          if (obs.isRamp) continue; // Skip ramps for horizontal collision resolution

          const closestX = Math.max(obs.xMin, Math.min(posX, obs.xMax));
          const closestZ = Math.max(obs.zMin, Math.min(posZ, obs.zMax));
          const distanceX = posX - closestX;
          const distanceZ = posZ - closestZ;
          const distanceSquared = distanceX * distanceX + distanceZ * distanceZ;

          if (distanceSquared < radSq) {
            const dist = Math.sqrt(distanceSquared);
            return {
              collision: true,
              normalX: dist > 0.001 ? distanceX / dist : 1,
              normalZ: dist > 0.001 ? distanceZ / dist : 0,
              overlap: radius - dist
            };
          }
        }
      }
    }
    return { collision: false };
  }

  isWetAt(x, z) {
    // Helper: check puddle circles for a specific grid tile
    const checkTile = (gX, gZ) => {
      const key = `${gX},${gZ}`;
      const circles = this.tilePuddles.get(key);
      if (!circles || circles.length === 0) return false;

      for (let i = 0; i < circles.length; i++) {
        const c = circles[i];
        const dx = x - c.x;
        const dz = z - c.z;
        // 40% radius tolerance to account for domain-warped texture shape vs math circles
        const rx = c.rx * 1.4;
        const rz = c.rz * 1.4;
        if ((dx / rx) * (dx / rx) + (dz / rz) * (dz / rz) < 1.0) {
          return true;
        }
      }
      return false;
    };

    // Use round-with-half-tile bias for tile lookup (same as generation)
    const gridX = Math.floor(x / this.tileSize + 0.5);
    const gridZ = Math.floor(z / this.tileSize + 0.5);

    // Check if primary tile is a road tile
    const isRoad = this.roadColumns.has(gridX) || this.roadRows.has(gridZ);
    if (!isRoad) return false;

    // Check point is within road lane boundary (road width = 26m, sidewalks outside)
    const { rwX, rwZ } = this.getRoadWidthForGrid(gridX, gridZ);
    const localX = x - gridX * this.tileSize;
    const localZ = z - gridZ * this.tileSize;
    const isIntersection = this.roadColumns.has(gridX) && this.roadRows.has(gridZ);

    if (!isIntersection) {
      if (this.roadRows.has(gridZ)) {
        if (Math.abs(localZ) > rwZ / 2) return false;
      } else {
        if (Math.abs(localX) > rwX / 2) return false;
      }
    }

    // Primary tile check
    if (checkTile(gridX, gridZ)) return true;

    // Near a tile boundary? Check neighbouring road tiles too (prevents misses at seams)
    const boundaryThresh = 3.0; // within 3m of tile edge
    const tileCenterX = gridX * this.tileSize;
    const tileCenterZ = gridZ * this.tileSize;
    const distToEdgeX = this.tileSize / 2 - Math.abs(localX);
    const distToEdgeZ = this.tileSize / 2 - Math.abs(localZ);

    if (distToEdgeX < boundaryThresh) {
      const nx = gridX + (localX > 0 ? 1 : -1);
      if (checkTile(nx, gridZ)) return true;
    }
    if (distToEdgeZ < boundaryThresh) {
      const nz = gridZ + (localZ > 0 ? 1 : -1);
      if (checkTile(gridX, nz)) return true;
    }

    return false;
  }

  getBaseHeight(x, z) {
    if (!this.sortedColumnsArray || !this.sortedRowsArray || this.sortedColumnsArray.length < 2 || this.sortedRowsArray.length < 2) {
      return 0;
    }

    const tileSize = this.tileSize || 40;
    const tileX = x / tileSize;
    const tileZ = z / tileSize;

    // Helper binary search
    const findIntervalIndex = (arr, val) => {
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
    };

    const idxX = findIntervalIndex(this.sortedColumnsArray, tileX);
    const idxZ = findIntervalIndex(this.sortedRowsArray, tileZ);

    const lenX = this.sortedColumnsArray.length;
    const lenZ = this.sortedRowsArray.length;

    const colIdx1 = Math.max(0, Math.min(lenX - 2, idxX));
    const colIdx2 = colIdx1 + 1;
    const col1 = this.sortedColumnsArray[colIdx1];
    const col2 = this.sortedColumnsArray[colIdx2];

    const rowIdx1 = Math.max(0, Math.min(lenZ - 2, idxZ));
    const rowIdx2 = rowIdx1 + 1;
    const row1 = this.sortedRowsArray[rowIdx1];
    const row2 = this.sortedRowsArray[rowIdx2];

    const hashInt = (x, y, seed) => {
      let h = Math.imul(x ^ (y << 16) ^ seed, 0x85ebca6b);
      h ^= h >>> 13;
      h = Math.imul(h, 0xc2b2ae35);
      h ^= h >>> 16;
      return (h >>> 0) / 4294967296.0;
    };

    const getIntersectionHeight = (c, r) => {
      if ((c + r) % 2 !== 0) return 0.0;
      const hash = hashInt(c, r, 0);
      if (hash < 0.30) { // natural probability
        const sign = ((c + r) % 4 === 0) ? 1 : -1;
        const isSharp = hashInt(c, r, 1) < 0.45;
        // Natural amplitude for normal jumps
        const amp = isSharp ? (18.0 + hashInt(c, r, 2) * 8.0) : (12.0 + hashInt(c, r, 3) * 5.0);
        return sign * amp;
      }
      return 0.0;
    };

    const h00 = getIntersectionHeight(colIdx1, rowIdx1);
    const h10 = getIntersectionHeight(colIdx2, rowIdx1);
    const h01 = getIntersectionHeight(colIdx1, rowIdx2);
    const h11 = getIntersectionHeight(colIdx2, rowIdx2);

    let u = (tileX - col1) / (col2 - col1);
    let v = (tileZ - row1) / (row2 - row1);

    // Use a piecewise linear function for straight, angular ramps instead of curves
    const linearRamp = (t) => {
      const margin = 0.25; // 25% flat at intersections, 50% straight ramp in the middle
      if (t < margin) return 0.0;
      if (t > 1.0 - margin) return 1.0;
      return (t - margin) / (1.0 - 2.0 * margin);
    };
    
    u = linearRamp(u);
    v = linearRamp(v);

    const val = (1 - u) * (1 - v) * h00 + u * (1 - v) * h10 + (1 - u) * v * h01 + u * v * h11;
    return val;
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

  getGroundHeight(x, z) {
    const baseH = this.getBaseHeight(x, z);
    let groundHeight = 0.5 + baseH;
    const cs = this.spatialCellSize || 40;
    const cx = Math.floor(x / cs);
    const cz = Math.floor(z / cs);
    
    const cell = this.obstacleGrid.get(`${cx},${cz}`);
    if (cell) {
      for (const obs of cell) {
        if (obs.isRamp) {
          const margin = 0.3; // safe margin
          if (x >= obs.xMin - margin && x <= obs.xMax + margin &&
              z >= obs.zMin - margin && z <= obs.zMax + margin) {
            
            let pct = 0.0;
            if (obs.slopeType === 'Z') {
              if (obs.slopeDir === 1) { // Slopes up along +Z
                pct = (z - obs.zMin) / (obs.zMax - obs.zMin);
              } else { // Slopes up along -Z
                pct = (obs.zMax - z) / (obs.zMax - obs.zMin);
              }
            } else if (obs.slopeType === 'X') {
              if (obs.slopeDir === 1) { // Slopes up along +X
                pct = (x - obs.xMin) / (obs.xMax - obs.xMin);
              } else { // Slopes up along -X
                pct = (obs.xMax - x) / (obs.xMax - obs.xMin);
              }
            }
            
            const localH = 0.5 + baseH + Math.max(0.0, Math.min(1.0, pct)) * (obs.height - 0.5);
            if (localH > groundHeight) {
              groundHeight = localH;
            }
          }
        }
      }
    }
    return groundHeight;
  }

  alignMeshToTerrain(mesh, position, heading, isAirborne = null, dt = 0.016) {
    if (isAirborne === true) {
      // Airborne: Preserve the exact launch tilt (pitch/roll), but update yaw (heading).
      // This prevents the car from violently snapping flat the moment it leaves a ramp.
      const currentEuler = new THREE.Euler().setFromQuaternion(mesh.quaternion, 'YXZ');
      currentEuler.y = heading;
      mesh.quaternion.setFromEuler(currentEuler);
      return;
    }

    const cosH = Math.cos(heading);
    const sinH = Math.sin(heading);
    
    const dx = 0.95;
    const dz = 1.3;
    
    const flX = position.x - dx * cosH + dz * sinH;
    const flZ = position.z - dx * -sinH + dz * cosH;
    const flH = this.getGroundHeight(flX, flZ);
    
    const frX = position.x + dx * cosH + dz * sinH;
    const frZ = position.z + dx * -sinH + dz * cosH;
    const frH = this.getGroundHeight(frX, frZ);
    
    const rlX = position.x - dx * cosH - dz * sinH;
    const rlZ = position.z - dx * -sinH - dz * cosH;
    const rlH = this.getGroundHeight(rlX, rlZ);
    
    const rrX = position.x + dx * cosH - dz * sinH;
    const rrZ = position.z + dx * -sinH - dz * cosH;
    const rrH = this.getGroundHeight(rrX, rrZ);
    
    _pFL.set(flX, flH, flZ);
    _pFR.set(frX, frH, frZ);
    _pRL.set(rlX, rlH, rlZ);
    _pRR.set(rrX, rrH, rrZ);
    
    _pFront.addVectors(_pFL, _pFR).multiplyScalar(0.5);
    _pRear.addVectors(_pRL, _pRR).multiplyScalar(0.5);
    
    _fwd.subVectors(_pFront, _pRear).normalize();
    
    _pLeft.addVectors(_pFL, _pRL).multiplyScalar(0.5);
    _pRight.addVectors(_pFR, _pRR).multiplyScalar(0.5);
    _side.subVectors(_pRight, _pLeft);
    
    _up.crossVectors(_fwd, _side).normalize();
    _right.crossVectors(_up, _fwd).normalize();
    
    _matrix.makeBasis(_right, _up, _fwd);
    _qTarget.setFromRotationMatrix(_matrix);

    // Smoothly slerp to terrain slope
    const t = 1.0 - Math.exp(-18.0 * dt);
    mesh.quaternion.slerp(_qTarget, t);
  }
}

const _pFL = new THREE.Vector3();
const _pFR = new THREE.Vector3();
const _pRL = new THREE.Vector3();
const _pRR = new THREE.Vector3();
const _pFront = new THREE.Vector3();
const _pRear = new THREE.Vector3();
const _fwd = new THREE.Vector3();
const _pLeft = new THREE.Vector3();
const _pRight = new THREE.Vector3();
const _side = new THREE.Vector3();
const _up = new THREE.Vector3();
const _right = new THREE.Vector3();
const _matrix = new THREE.Matrix4();
const _qFlat = new THREE.Quaternion();
const _qTarget = new THREE.Quaternion();
const _yAxis = new THREE.Vector3(0, 1, 0);

