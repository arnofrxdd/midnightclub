import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// Geometry cache by type to prevent rebuilding geometries on every spawn
const geomCache = {};

// Local scratch variables for zero-alloc math in handleCrashDamage
const _localContact = new THREE.Vector3();
const _invMatrix = new THREE.Matrix4();
const _localForceDir = new THREE.Vector3();
const _invQuat = new THREE.Quaternion();

function getCachedGeometries(type) {
  if (geomCache[type]) return geomCache[type];

  // 1. Merge Body Geometries (Chassis + Cabin)
  const bodyGeoms = [];
  let mainBodyGeo, cabinGeo;
  let frontZ = 2.11;
  let backZ = -2.11;
  let wheelZFront = 1.3;
  let wheelZRear = -1.3;

  if (type === 'sports') {
    // Aggressive Cyberpunk Hypercar Design
    frontZ = 2.4; 
    backZ = -2.3;
    wheelZFront = 1.4;
    wheelZRear = -1.35;

    // Widebody main chassis
    const mainBlock = new THREE.BoxGeometry(1.9, 0.28, 3.2);
    mainBlock.translate(0, 0.28, 0.2);
    bodyGeoms.push(mainBlock);

    // Front Nose / Splitter mount
    const nose = new THREE.BoxGeometry(1.7, 0.15, 0.8);
    nose.translate(0, 0.22, 2.0);
    bodyGeoms.push(nose);
    
    // Sloped Hood
    const hood = new THREE.BoxGeometry(1.6, 0.12, 1.4);
    hood.rotateX(Math.PI / 20);
    hood.translate(0, 0.38, 1.3);
    bodyGeoms.push(hood);

    // Massive Boxy Fenders
    const fenderFL = new THREE.BoxGeometry(0.25, 0.36, 1.2);
    fenderFL.translate(-0.95, 0.36, 1.4);
    bodyGeoms.push(fenderFL);
    
    const fenderFR = new THREE.BoxGeometry(0.25, 0.36, 1.2);
    fenderFR.translate(0.95, 0.36, 1.4);
    bodyGeoms.push(fenderFR);

    const fenderRL = new THREE.BoxGeometry(0.3, 0.42, 1.3);
    fenderRL.translate(-1.0, 0.4, -1.3);
    bodyGeoms.push(fenderRL);
    
    const fenderRR = new THREE.BoxGeometry(0.3, 0.42, 1.3);
    fenderRR.translate(1.0, 0.4, -1.3);
    bodyGeoms.push(fenderRR);

    // Stealth Fighter Roof
    const roof = new THREE.BoxGeometry(1.2, 0.05, 1.4);
    roof.translate(0, 0.78, -0.2);
    bodyGeoms.push(roof);
    
    // Side Pillars
    const pillarL = new THREE.BoxGeometry(0.12, 0.35, 1.6);
    pillarL.rotateX(Math.PI / 40);
    pillarL.translate(-0.62, 0.6, -0.2);
    bodyGeoms.push(pillarL);
    
    const pillarR = new THREE.BoxGeometry(0.12, 0.35, 1.6);
    pillarR.rotateX(Math.PI / 40);
    pillarR.translate(0.62, 0.6, -0.2);
    bodyGeoms.push(pillarR);

    // Flat Trunk Deck
    const trunk = new THREE.BoxGeometry(1.6, 0.18, 0.9);
    trunk.translate(0, 0.42, -1.8);
    bodyGeoms.push(trunk);
    
    // Side Mirrors (Cyberpunk cameras)
    const mirrorL = new THREE.BoxGeometry(0.18, 0.08, 0.1);
    mirrorL.translate(-0.95, 0.65, 0.5);
    bodyGeoms.push(mirrorL);
    
    const mirrorR = new THREE.BoxGeometry(0.18, 0.08, 0.1);
    mirrorR.translate(0.95, 0.65, 0.5);
    bodyGeoms.push(mirrorR);
  } else if (type === 'pickup') {
    frontZ = 2.21;
    backZ = -2.21;
    wheelZFront = 1.4;
    wheelZRear = -1.4;
    
    mainBodyGeo = new THREE.BoxGeometry(1.8, 0.5, 4.4);
    mainBodyGeo.translate(0, 0.4, 0);
    bodyGeoms.push(mainBodyGeo);

    cabinGeo = new THREE.BoxGeometry(1.5, 0.55, 1.6);
    cabinGeo.translate(0, 0.925, 0.4);
    bodyGeoms.push(cabinGeo);

    // Bed walls
    const leftWall = new THREE.BoxGeometry(0.12, 0.45, 2.0);
    leftWall.translate(0.84, 0.875, -1.1);
    bodyGeoms.push(leftWall);

    const rightWall = new THREE.BoxGeometry(0.12, 0.45, 2.0);
    rightWall.translate(-0.84, 0.875, -1.1);
    bodyGeoms.push(rightWall);

    const tailgate = new THREE.BoxGeometry(1.56, 0.45, 0.12);
    tailgate.translate(0, 0.875, -2.14);
    bodyGeoms.push(tailgate);
  } else if (type === 'van') {
    frontZ = 2.21;
    backZ = -2.21;
    wheelZFront = 1.4;
    wheelZRear = -1.4;

    mainBodyGeo = new THREE.BoxGeometry(1.85, 0.5, 4.4);
    mainBodyGeo.translate(0, 0.4, 0);
    bodyGeoms.push(mainBodyGeo);

    cabinGeo = new THREE.BoxGeometry(1.6, 0.9, 3.4);
    cabinGeo.translate(0, 1.1, -0.3);
    bodyGeoms.push(cabinGeo);
  } else if (type === 'cop') {
    frontZ = 2.21;
    backZ = -2.21;
    wheelZFront = 1.4;
    wheelZRear = -1.4;

    // Black body base
    mainBodyGeo = new THREE.BoxGeometry(1.85, 0.48, 4.4);
    mainBodyGeo.translate(0, 0.39, 0);
    bodyGeoms.push(mainBodyGeo);
  } else { // 'sedan', 'cab', 'suv'
    frontZ = 2.21;
    backZ = -2.21;
    wheelZFront = 1.4;
    wheelZRear = -1.4;

    mainBodyGeo = new THREE.BoxGeometry(1.8, 0.45, 4.2);
    mainBodyGeo.translate(0, 0.35, 0);
    bodyGeoms.push(mainBodyGeo);

    if (type === 'suv') {
      cabinGeo = new THREE.BoxGeometry(1.6, 0.7, 2.6);
      cabinGeo.translate(0, 0.925, -0.4);
    } else {
      cabinGeo = new THREE.BoxGeometry(1.5, 0.5, 2.2);
      cabinGeo.translate(0, 0.8, -0.3);
    }
    bodyGeoms.push(cabinGeo);
  }

  const mergedBodyGeo = BufferGeometryUtils.mergeGeometries(bodyGeoms);

  // 2. Merge Glass Geometries (Windows + Windshield)
  const glassGeoms = [];

  if (type === 'sports') {
    // Hyper-slanted stealth windshield
    const windshieldGeo = new THREE.BoxGeometry(1.2, 0.45, 0.05);
    windshieldGeo.rotateX(Math.PI / 3); 
    windshieldGeo.translate(0, 0.6, 0.7);
    glassGeoms.push(windshieldGeo);

    // Slotted Rear Louvers / Window
    const rearWinGeo = new THREE.BoxGeometry(1.15, 0.35, 0.05);
    rearWinGeo.rotateX(-Math.PI / 4.5);
    rearWinGeo.translate(0, 0.6, -1.05);
    glassGeoms.push(rearWinGeo);

    // Blade-style side windows
    const sideWinL = new THREE.BoxGeometry(0.02, 0.28, 1.4);
    sideWinL.translate(0.65, 0.58, -0.2);
    glassGeoms.push(sideWinL);
    
    const sideWinR = new THREE.BoxGeometry(0.02, 0.28, 1.4);
    sideWinR.translate(-0.65, 0.58, -0.2);
    glassGeoms.push(sideWinR);
  } else if (type === 'pickup') {
    const windshieldGeo = new THREE.BoxGeometry(1.4, 0.5, 0.05);
    windshieldGeo.rotateX(Math.PI / 6);
    windshieldGeo.translate(0, 0.925, 1.15);
    glassGeoms.push(windshieldGeo);

    const rearWinGeo = new THREE.BoxGeometry(1.4, 0.45, 0.05);
    rearWinGeo.translate(0, 0.925, -0.38);
    glassGeoms.push(rearWinGeo);

    const leftWinGeo = new THREE.BoxGeometry(0.02, 0.45, 1.2);
    leftWinGeo.translate(0.76, 0.925, 0.4);
    glassGeoms.push(leftWinGeo);

    const rightWinGeo = new THREE.BoxGeometry(0.02, 0.45, 1.2);
    rightWinGeo.translate(-0.76, 0.925, 0.4);
    glassGeoms.push(rightWinGeo);
  } else if (type === 'van') {
    const windshieldGeo = new THREE.BoxGeometry(1.5, 0.7, 0.05);
    windshieldGeo.rotateX(Math.PI / 5);
    windshieldGeo.translate(0, 1.1, 1.35);
    glassGeoms.push(windshieldGeo);

    const rearWinGeo = new THREE.BoxGeometry(1.5, 0.6, 0.05);
    rearWinGeo.translate(0, 1.25, -1.95);
    glassGeoms.push(rearWinGeo);

    const leftWinGeo = new THREE.BoxGeometry(0.02, 0.5, 1.0);
    leftWinGeo.translate(0.81, 1.15, 0.7);
    glassGeoms.push(leftWinGeo);

    const rightWinGeo = new THREE.BoxGeometry(0.02, 0.5, 1.0);
    rightWinGeo.translate(-0.81, 1.15, 0.7);
    glassGeoms.push(rightWinGeo);

    const leftRearWinGeo = new THREE.BoxGeometry(0.02, 0.4, 1.4);
    leftRearWinGeo.translate(0.81, 1.2, -0.9);
    glassGeoms.push(leftRearWinGeo);

    const rightRearWinGeo = new THREE.BoxGeometry(0.02, 0.4, 1.4);
    rightRearWinGeo.translate(-0.81, 1.2, -0.9);
    glassGeoms.push(rightRearWinGeo);
  } else { // 'sedan', 'cab', 'suv', 'cop'
    const isSuvCop = (type === 'suv' || type === 'cop');
    const h = isSuvCop ? 0.925 : 0.8;
    const w = isSuvCop ? 1.5 : 1.4;
    const len = isSuvCop ? (type === 'cop' ? 2.3 : 2.2) : 1.8;
    const offset = isSuvCop ? -0.4 : -0.3;

    const windshieldGeo = new THREE.BoxGeometry(w, isSuvCop ? 0.6 : 0.45, 0.05);
    windshieldGeo.rotateX(Math.PI / 6);
    windshieldGeo.translate(0, h, offset + (isSuvCop ? 1.2 : 1.1));
    glassGeoms.push(windshieldGeo);

    const rearWinGeo = new THREE.BoxGeometry(w, isSuvCop ? 0.55 : 0.42, 0.05);
    rearWinGeo.rotateX(-Math.PI / 8);
    rearWinGeo.translate(0, h, offset - (isSuvCop ? 1.2 : 1.1));
    glassGeoms.push(rearWinGeo);

    const leftWinGeo = new THREE.BoxGeometry(0.02, isSuvCop ? 0.55 : 0.38, len);
    leftWinGeo.translate(isSuvCop ? 0.81 : 0.76, h, offset);
    glassGeoms.push(leftWinGeo);

    const rightWinGeo = new THREE.BoxGeometry(0.02, isSuvCop ? 0.55 : 0.38, len);
    rightWinGeo.translate(isSuvCop ? -0.81 : -0.76, h, offset);
    glassGeoms.push(rightWinGeo);
  }

  const mergedGlassGeo = BufferGeometryUtils.mergeGeometries(glassGeoms);

  // 3. Merge Carbon Geometries (Scoops + Spoiler)
  const carbonGeoms = [];

  if (type === 'sports') {
    // Massive Front Splitter Blade
    const splitter = new THREE.BoxGeometry(1.95, 0.04, 0.6);
    splitter.translate(0, 0.12, 2.2);
    carbonGeoms.push(splitter);
    
    // Aggressive side skirts
    const skirtL = new THREE.BoxGeometry(0.15, 0.05, 2.4);
    skirtL.translate(-1.05, 0.12, 0.2);
    carbonGeoms.push(skirtL);
    
    const skirtR = new THREE.BoxGeometry(0.15, 0.05, 2.4);
    skirtR.translate(1.05, 0.12, 0.2);
    carbonGeoms.push(skirtR);

    // Rear Track Diffuser
    const diffuser = new THREE.BoxGeometry(1.8, 0.15, 0.4);
    diffuser.translate(0, 0.18, -2.4);
    carbonGeoms.push(diffuser);

    // GT Wing Mounts (Swan Neck)
    const spLGeo = new THREE.BoxGeometry(0.04, 0.4, 0.2);
    spLGeo.rotateX(Math.PI / 8);
    spLGeo.translate(-0.6, 0.6, -2.0);
    carbonGeoms.push(spLGeo);
    
    const spRGeo = new THREE.BoxGeometry(0.04, 0.4, 0.2);
    spRGeo.rotateX(Math.PI / 8);
    spRGeo.translate(0.6, 0.6, -2.0);
    carbonGeoms.push(spRGeo);

    // Giant GT Carbon Wing
    const wingGeo = new THREE.BoxGeometry(2.1, 0.05, 0.5);
    wingGeo.translate(0, 0.8, -2.15);
    carbonGeoms.push(wingGeo);
    
    // Wing endplates
    const wingEndL = new THREE.BoxGeometry(0.05, 0.2, 0.5);
    wingEndL.translate(-1.05, 0.75, -2.15);
    carbonGeoms.push(wingEndL);
    const wingEndR = new THREE.BoxGeometry(0.05, 0.2, 0.5);
    wingEndR.translate(1.05, 0.75, -2.15);
    carbonGeoms.push(wingEndR);
  } else if (type === 'pickup') {
    // Roll bars in the bed
    const rollBarL = new THREE.BoxGeometry(0.08, 0.55, 0.08);
    rollBarL.translate(-0.7, 0.95, -0.3);
    carbonGeoms.push(rollBarL);

    const rollBarR = new THREE.BoxGeometry(0.08, 0.55, 0.08);
    rollBarR.translate(0.7, 0.95, -0.3);
    carbonGeoms.push(rollBarR);

    const rollBarCross = new THREE.BoxGeometry(1.48, 0.08, 0.08);
    rollBarCross.translate(0, 1.2, -0.3);
    carbonGeoms.push(rollBarCross);
  } else if (type === 'van') {
    // Roof rack
    const railL = new THREE.BoxGeometry(0.05, 0.05, 2.8);
    railL.translate(-0.6, 1.58, -0.3);
    carbonGeoms.push(railL);

    const railR = new THREE.BoxGeometry(0.05, 0.05, 2.8);
    railR.translate(0.6, 1.58, -0.3);
    carbonGeoms.push(railR);

    for (let offsetZ = -1.2; offsetZ <= 0.8; offsetZ += 0.8) {
      const cross = new THREE.BoxGeometry(1.25, 0.03, 0.05);
      cross.translate(0, 1.58, offsetZ);
      carbonGeoms.push(cross);
    }
  } else if (type === 'cop') {
    // No spoiler on police cruisers, add a dummy geometry to avoid empty merge crash
    const dummy = new THREE.BoxGeometry(0.01, 0.01, 0.01);
    dummy.translate(0, -10, 0);
    carbonGeoms.push(dummy);
  } else { // sedan, cab, suv
    // Small lip spoiler
    const wingGeo = new THREE.BoxGeometry(1.6, 0.05, 0.15);
    wingGeo.translate(0, 0.6, -1.95);
    carbonGeoms.push(wingGeo);
  }

  const mergedCarbonGeo = BufferGeometryUtils.mergeGeometries(carbonGeoms);

  // 4. Merge Headlamps
  const headlampGeoms = [];
  if (type === 'sports') {
    // Cyberpunk thin LED light strips
    const headBarL = new THREE.BoxGeometry(0.5, 0.04, 0.05);
    headBarL.translate(-0.55, 0.32, frontZ + 0.01);
    headlampGeoms.push(headBarL);
    const headBarR = new THREE.BoxGeometry(0.5, 0.04, 0.05);
    headBarR.translate(0.55, 0.32, frontZ + 0.01);
    headlampGeoms.push(headBarR);
  } else {
    const lampGeoL = new THREE.BoxGeometry(0.25, 0.12, 0.1);
    lampGeoL.translate(-0.65, (type === 'van' || type === 'pickup' ? 0.45 : 0.4), frontZ + 0.01);
    headlampGeoms.push(lampGeoL);

    const lampGeoR = new THREE.BoxGeometry(0.25, 0.12, 0.1);
    lampGeoR.translate(0.65, (type === 'van' || type === 'pickup' ? 0.45 : 0.4), frontZ + 0.01);
    headlampGeoms.push(lampGeoR);
  }
  const mergedHeadlampsGeo = BufferGeometryUtils.mergeGeometries(headlampGeoms);

  // 5. Merge Taillights (named for dynamic player brake glow targeting)
  const taillightGeoms = [];
  if (type === 'sports') {
    // Cyberpunk solid lightbar across the entire rear! (Single source of light)
    const tailBar = new THREE.BoxGeometry(1.6, 0.08, 0.05);
    // Position it strictly outside the rear chassis (-2.3) so it never Z-fights
    tailBar.translate(0, 0.4, backZ - 0.02);
    taillightGeoms.push(tailBar);
  } else {
    const tailGeoL = new THREE.BoxGeometry(0.25, 0.12, 0.1);
    tailGeoL.translate(-0.65, (type === 'van' || type === 'pickup' ? 0.47 : 0.42), backZ - 0.01);
    taillightGeoms.push(tailGeoL);

    const tailGeoR = new THREE.BoxGeometry(0.25, 0.12, 0.1);
    tailGeoR.translate(0.65, (type === 'van' || type === 'pickup' ? 0.47 : 0.42), backZ - 0.01);
    taillightGeoms.push(tailGeoR);
  }
  const mergedTaillightsGeo = BufferGeometryUtils.mergeGeometries(taillightGeoms);

  // Grille, Exhausts, and Bull-Bars
  let grilleGeo = null;
  let exhaustGeo = null;
  let bullBarGeo = null;

  if (type === 'sports' || type === 'cop') {
    grilleGeo = new THREE.BoxGeometry(1.2, 0.16, 0.05);
    grilleGeo.translate(0, 0.28, frontZ + 0.05);
    
    if (type === 'sports') {
      const eL = new THREE.CylinderGeometry(0.12, 0.12, 0.4, 8);
      eL.rotateX(Math.PI / 2);
      eL.translate(-0.55, 0.18, backZ - 0.2);

      const eR = new THREE.CylinderGeometry(0.12, 0.12, 0.4, 8);
      eR.rotateX(Math.PI / 2);
      eR.translate(0.55, 0.18, backZ - 0.2);

      exhaustGeo = BufferGeometryUtils.mergeGeometries([eL, eR]);
    } else if (type === 'cop') {
      bullBarGeo = new THREE.BoxGeometry(1.2, 0.38, 0.12);
      bullBarGeo.translate(0, 0.34, frontZ + 0.12);
    }
  }

  // Cop specific geometries
  let copCabinGeo = null;
  let copLeftDoorGeo = null;
  let copRightDoorGeo = null;
  let copSirenBarGeo = null;
  let copSirenBlueGeo = null;
  let copSirenRedGeo = null;

  if (type === 'cop') {
    copCabinGeo = new THREE.BoxGeometry(1.6, 0.65, 2.4);
    copCabinGeo.translate(0, 0.925, -0.3);

    copLeftDoorGeo = new THREE.BoxGeometry(0.02, 0.5, 1.8);
    copLeftDoorGeo.translate(0.93, 0.55, -0.3);

    copRightDoorGeo = new THREE.BoxGeometry(0.02, 0.5, 1.8);
    copRightDoorGeo.translate(-0.93, 0.55, -0.3);

    copSirenBarGeo = new THREE.BoxGeometry(1.2, 0.12, 0.3);
    copSirenBarGeo.translate(0, 1.25, -0.3);

    copSirenBlueGeo = new THREE.BoxGeometry(0.4, 0.15, 0.28);
    copSirenBlueGeo.translate(-0.35, 1.35, -0.3);

    copSirenRedGeo = new THREE.BoxGeometry(0.4, 0.15, 0.28);
    copSirenRedGeo.translate(0.35, 1.35, -0.3);
  }

  geomCache[type] = {
    bodyGeo: mergedBodyGeo,
    glassGeo: mergedGlassGeo,
    carbonGeo: mergedCarbonGeo,
    headlampsGeo: mergedHeadlampsGeo,
    taillightsGeo: mergedTaillightsGeo,
    grilleGeo,
    exhaustGeo,
    bullBarGeo,
    copCabinGeo,
    copLeftDoorGeo,
    copRightDoorGeo,
    copSirenBarGeo,
    copSirenBlueGeo,
    copSirenRedGeo,
    frontZ,
    backZ,
    wheelZFront,
    wheelZRear
  };

  return geomCache[type];
}

// Material Cache
const materialCache = {};

function getCachedMaterials(bodyColorHex) {
  if (materialCache[bodyColorHex]) return materialCache[bodyColorHex];

  const bodyMat = new THREE.MeshStandardMaterial({
    color: bodyColorHex,
    roughness: 0.15,
    metalness: 0.8,
    transparent: true,
    depthWrite: true
  });
  
  const carbonMat = new THREE.MeshStandardMaterial({
    color: 0x1e1e1e, // Dark grey trim / spoilers
    roughness: 0.6,
    metalness: 0.3,
    transparent: true,
    depthWrite: true
  });

  const wheelMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    roughness: 0.85,
    transparent: true,
    depthWrite: true
  });

  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37, // Gold Alloy Rims
    roughness: 0.2,
    metalness: 0.9,
    transparent: true,
    depthWrite: true
  });

  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x111622,
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    depthWrite: true
  });

  const headlampMat = new THREE.MeshBasicMaterial({ color: 0xfffcd4, transparent: true, depthWrite: true }); // Warm halogen headlamps
  const taillightMat = new THREE.MeshBasicMaterial({ color: 0xcc1111, transparent: true, depthWrite: true });

  const whiteCabinMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.15, metalness: 0.7, transparent: true, depthWrite: true });
  const sirenBlueMat = new THREE.MeshStandardMaterial({
    color: 0x0022ff,
    emissive: 0x0022ff,
    emissiveIntensity: 0.1,
    roughness: 0.1,
    transparent: true,
    depthWrite: true
  });
  const sirenRedMat = new THREE.MeshStandardMaterial({
    color: 0xff0022,
    emissive: 0xff0022,
    emissiveIntensity: 0.1,
    roughness: 0.1,
    transparent: true,
    depthWrite: true
  });

  materialCache[bodyColorHex] = {
    bodyMat,
    carbonMat,
    wheelMat,
    rimMat,
    glassMat,
    headlampMat,
    taillightMat,
    whiteCabinMat,
    sirenBlueMat,
    sirenRedMat
  };

  return materialCache[bodyColorHex];
}

export function createVoxelCarMesh(bodyColorHex, type = 'sports', lensflareTex = null) {
    const carGroup = new THREE.Group();
    const mats = getCachedMaterials(bodyColorHex);

    const cached = getCachedGeometries(type);

    const bodyMesh = new THREE.Mesh(cached.bodyGeo.clone(), mats.bodyMat.clone());
    bodyMesh.name = "carBody";
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    carGroup.add(bodyMesh);

    const glassMesh = new THREE.Mesh(cached.glassGeo.clone(), mats.glassMat.clone());
    glassMesh.name = "glass";
    carGroup.add(glassMesh);

    const carbonMesh = new THREE.Mesh(cached.carbonGeo.clone(), mats.carbonMat.clone());
    carbonMesh.castShadow = true;
    carbonMesh.name = "carbon";
    carGroup.add(carbonMesh);

    const headlampsMesh = new THREE.Mesh(cached.headlampsGeo.clone(), mats.headlampMat.clone());
    headlampsMesh.name = "headlamps";
    carGroup.add(headlampsMesh);

    // 4b. Anamorphic Lens Flare Sprites (reusable texture, additive blending)
    if (lensflareTex) {
      const spriteMatL = new THREE.SpriteMaterial({
        map: lensflareTex,
        color: 0xfff3d6,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const leftSprite = new THREE.Sprite(spriteMatL);
      leftSprite.position.set(-0.65, type === 'sports' ? 0.35 : (type === 'van' || type === 'pickup' ? 0.45 : 0.4), cached.frontZ + 0.05);
      leftSprite.scale.set(3.4, 0.7, 1.0);
      leftSprite.name = "leftHeadlightSprite";
      carGroup.add(leftSprite);

      const spriteMatR = new THREE.SpriteMaterial({
        map: lensflareTex,
        color: 0xfff3d6,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const rightSprite = new THREE.Sprite(spriteMatR);
      rightSprite.position.set(0.65, type === 'sports' ? 0.35 : (type === 'van' || type === 'pickup' ? 0.45 : 0.4), cached.frontZ + 0.05);
      rightSprite.scale.set(3.4, 0.7, 1.0);
      rightSprite.name = "rightHeadlightSprite";
      carGroup.add(rightSprite);
    }

    const taillightsMesh = new THREE.Mesh(cached.taillightsGeo.clone(), mats.taillightMat.clone());
    taillightsMesh.name = "taillights";
    carGroup.add(taillightsMesh);

    // 5b. Grille, Exhausts, and Bull-Bars
    if (cached.grilleGeo) {
      const grilleMesh = new THREE.Mesh(cached.grilleGeo.clone(), mats.carbonMat.clone());
      grilleMesh.name = "grille";
      carGroup.add(grilleMesh);
    }
    if (cached.exhaustGeo) {
      const exhaustMesh = new THREE.Mesh(cached.exhaustGeo.clone(), mats.rimMat.clone());
      exhaustMesh.castShadow = true;
      exhaustMesh.name = "exhaust";
      carGroup.add(exhaustMesh);
    }
    if (cached.bullBarGeo) {
      const bullBarMesh = new THREE.Mesh(cached.bullBarGeo.clone(), mats.carbonMat.clone());
      bullBarMesh.castShadow = true;
      bullBarMesh.name = "bullBar";
      carGroup.add(bullBarMesh);
    }

    // Cop specific meshes
    if (type === 'cop') {
      const whiteCabinMesh = new THREE.Mesh(cached.copCabinGeo.clone(), mats.whiteCabinMat.clone());
      whiteCabinMesh.castShadow = true;
      whiteCabinMesh.receiveShadow = true;
      whiteCabinMesh.name = "copCabin";
      carGroup.add(whiteCabinMesh);

      const leftDoorMesh = new THREE.Mesh(cached.copLeftDoorGeo.clone(), mats.whiteCabinMat.clone());
      leftDoorMesh.castShadow = true;
      leftDoorMesh.name = "copLeftDoor";
      carGroup.add(leftDoorMesh);

      const rightDoorMesh = new THREE.Mesh(cached.copRightDoorGeo.clone(), mats.whiteCabinMat.clone());
      rightDoorMesh.castShadow = true;
      rightDoorMesh.name = "copRightDoor";
      carGroup.add(rightDoorMesh);

      const sirenBarMesh = new THREE.Mesh(cached.copSirenBarGeo.clone(), mats.carbonMat.clone());
      sirenBarMesh.castShadow = true;
      sirenBarMesh.name = "copSirenBar";
      carGroup.add(sirenBarMesh);

      // Clone siren materials so they can flash independently without causing shader recompilation stutter for ALL cops
      const sirenBlueMatClone = mats.sirenBlueMat.clone();
      const sirenBlueMesh = new THREE.Mesh(cached.copSirenBlueGeo.clone(), sirenBlueMatClone);
      sirenBlueMesh.name = "sirenBlue";
      carGroup.add(sirenBlueMesh);

      const sirenRedMatClone = mats.sirenRedMat.clone();
      const sirenRedMesh = new THREE.Mesh(cached.copSirenRedGeo.clone(), sirenRedMatClone);
      sirenRedMesh.name = "sirenRed";
      carGroup.add(sirenRedMesh);
    }

    // 6. Wheels & Gold Rims (kept separate for rolling rotation)
    const tireGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.45, 12);
    tireGeo.rotateZ(Math.PI / 2);
    const rimGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.48, 8);
    rimGeo.rotateZ(Math.PI / 2);

    const wheels = [];
    const wheelPositions = [
      [-0.95, 0.25, cached.wheelZFront],  // Front Left
      [0.95, 0.25, cached.wheelZFront],   // Front Right
      [-0.95, 0.25, cached.wheelZRear],  // Rear Left
      [0.95, 0.25, cached.wheelZRear]    // Rear Right
    ];

    wheelPositions.forEach(([x, y, z]) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(x, y, z);

      const tire = new THREE.Mesh(tireGeo, mats.wheelMat.clone());
      tire.castShadow = true;
      wheelGroup.add(tire);

      const rim = new THREE.Mesh(rimGeo, mats.rimMat.clone());
      wheelGroup.add(rim);

      carGroup.add(wheelGroup);
      wheels.push(wheelGroup);
    });

    // 6b. Add baked ground headlight pool (cross-faded based on distance)
    const headlightPoolMat = new THREE.MeshBasicMaterial({
      map: getHeadlightPoolTex(),
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const headlightPoolMesh = new THREE.Mesh(getHeadlightPoolGeo().clone(), headlightPoolMat);
    headlightPoolMesh.name = "headlightPool";
    carGroup.add(headlightPoolMesh);

    return { carGroup, wheels };
  }

let sharedHeadlightPoolTex = null;
let sharedHeadlightPoolGeo = null;

function getHeadlightPoolTex() {
  if (!sharedHeadlightPoolTex) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(128, 256);
    for (let y = 0; y < 256; y++) {
      const py = y / 255; // 0 to 1 (near bumper to far)
      const beamCenterWidth = 0.15 + py * 0.75; // Widens dramatically as it goes forward
      for (let x = 0; x < 128; x++) {
        const px = x / 127; // 0 to 1
        const dx = Math.abs(px - 0.5);
        const horizontalFade = Math.max(0, 1.0 - (dx / beamCenterWidth));
        
        let verticalFade = 0;
        if (py < 0.1) {
          verticalFade = py / 0.1; // Fade in near bumper
        } else {
          verticalFade = Math.max(0, 1.0 - (py - 0.1) / 0.9); // Fade out forward
        }
        
        // Soft gaussian-like falloff for super smooth edges
        const intensity = Math.pow(horizontalFade, 1.6) * Math.pow(verticalFade, 1.3);
        
        const idx = (y * 128 + x) * 4;
        imgData.data[idx] = 255;
        imgData.data[idx + 1] = 250;
        imgData.data[idx + 2] = 230; // Warm golden headlight beam color
        imgData.data[idx + 3] = Math.round(intensity * 255);
      }
    }
    ctx.putImageData(imgData, 0, 0);
    sharedHeadlightPoolTex = new THREE.CanvasTexture(canvas);
  }
  return sharedHeadlightPoolTex;
}

function getHeadlightPoolGeo() {
  if (!sharedHeadlightPoolGeo) {
    sharedHeadlightPoolGeo = new THREE.PlaneGeometry(12.0, 24.0, 2, 8);
    sharedHeadlightPoolGeo.rotateX(-Math.PI / 2);
    // Center it 12m in front of the car
    sharedHeadlightPoolGeo.translate(0, 0.02, 12.0);
  }
  return sharedHeadlightPoolGeo;
}

export function handleCrashDamage(carGroup, contactPosWorld, impactSpeed, relativeVelocityVec) {
    const bodyMesh = carGroup.getObjectByName("carBody");
    if (bodyMesh && bodyMesh.geometry) {
      const geo = bodyMesh.geometry;
      const posAttr = geo.attributes.position;
      if (!posAttr) return;
      
      // Zero-allocation calculations using module-scoped scratch variables
      _localContact.copy(contactPosWorld);
      _invMatrix.copy(bodyMesh.matrixWorld).invert();
      _localContact.applyMatrix4(_invMatrix);
      
      _localForceDir.copy(relativeVelocityVec).normalize();
      _invQuat.copy(bodyMesh.quaternion).invert();
      _localForceDir.applyQuaternion(_invQuat);
      
      const intensity = Math.min(0.48, impactSpeed * 0.0125);
      const radius = 1.5 + Math.random() * 0.6;
      const radiusSq = radius * radius;
      
      let deformedAny = false;
      for (let i = 0; i < posAttr.count; i++) {
        const vx = posAttr.getX(i);
        const vy = posAttr.getY(i);
        const vz = posAttr.getZ(i);
        
        // Fast coordinate-boundary check (filters out ~95% of vertices instantly)
        const dx = vx - _localContact.x;
        if (Math.abs(dx) >= radius) continue;
        const dy = vy - _localContact.y;
        if (Math.abs(dy) >= radius) continue;
        const dz = vz - _localContact.z;
        if (Math.abs(dz) >= radius) continue;
        
        // Calculate squared distance (no square root)
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          const falloff = 1.0 - dist / radius;
          const deform = falloff * falloff * intensity;
          
          posAttr.setXYZ(
            i,
            vx + _localForceDir.x * deform,
            vy + _localForceDir.y * deform,
            vz + _localForceDir.z * deform
          );
          deformedAny = true;
        }
      }
      
      if (deformedAny) {
        posAttr.needsUpdate = true;
        geo.computeVertexNormals();
      }
    }
  }
