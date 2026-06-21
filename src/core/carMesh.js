import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export function createVoxelCarMesh(bodyColorHex, type = 'sports', lensflareTex = null) {
    const carGroup = new THREE.Group();
    
    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: bodyColorHex,
      roughness: 0.15,
      metalness: 0.8
    });
    
    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x1e1e1e, // Dark grey trim / spoilers
      roughness: 0.6,
      metalness: 0.3
    });

    const wheelMat = new THREE.MeshStandardMaterial({
      color: 0x151515,
      roughness: 0.85
    });

    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Gold Alloy Rims
      roughness: 0.2,
      metalness: 0.9
    });

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x111622,
      roughness: 0.1,
      metalness: 0.9
    });

    const headlampMat = new THREE.MeshBasicMaterial({ color: 0xfffcd4 }); // Warm halogen headlamps
    const taillightMat = new THREE.MeshBasicMaterial({ color: 0xcc1111 });

    // 1. Merge Body Geometries (Chassis + Cabin)
    const bodyGeoms = [];
    let mainBodyGeo, cabinGeo;
    let frontZ = 2.11;
    let backZ = -2.11;
    let wheelZFront = 1.3;
    let wheelZRear = -1.3;

    if (type === 'sports') {
      // High-detail Voxel Sports Car parts
      
      // Bottom side skirts
      const leftSkirt = new THREE.BoxGeometry(0.14, 0.2, 2.6);
      leftSkirt.translate(-0.84, 0.22, 0);
      bodyGeoms.push(leftSkirt);
      
      const rightSkirt = new THREE.BoxGeometry(0.14, 0.2, 2.6);
      rightSkirt.translate(0.84, 0.22, 0);
      bodyGeoms.push(rightSkirt);
      
      // Front Hood/Nose section (sloped steps)
      const hoodBase = new THREE.BoxGeometry(1.6, 0.2, 1.4);
      hoodBase.translate(0, 0.425, 1.3);
      bodyGeoms.push(hoodBase);
      
      const noseTip = new THREE.BoxGeometry(1.7, 0.3, 0.4);
      noseTip.translate(0, 0.375, 2.0);
      bodyGeoms.push(noseTip);

      // Front fenders
      const fenderFL = new THREE.BoxGeometry(0.12, 0.36, 1.0);
      fenderFL.translate(-0.84, 0.455, 1.3);
      bodyGeoms.push(fenderFL);
      
      const fenderFR = new THREE.BoxGeometry(0.12, 0.36, 1.0);
      fenderFR.translate(0.84, 0.455, 1.3);
      bodyGeoms.push(fenderFR);

      // Rear fenders
      const fenderRL = new THREE.BoxGeometry(0.12, 0.36, 1.0);
      fenderRL.translate(-0.84, 0.455, -1.3);
      bodyGeoms.push(fenderRL);
      
      const fenderRR = new THREE.BoxGeometry(0.12, 0.36, 1.0);
      fenderRR.translate(0.84, 0.455, -1.3);
      bodyGeoms.push(fenderRR);

      // Main central body block
      const mainBlock = new THREE.BoxGeometry(1.58, 0.4, 2.6);
      mainBlock.translate(0, 0.325, 0);
      bodyGeoms.push(mainBlock);

      // Rear deck / Trunk
      const trunkGeo = new THREE.BoxGeometry(1.6, 0.28, 1.1);
      trunkGeo.translate(0, 0.465, -1.55);
      bodyGeoms.push(trunkGeo);
      
      const rearBumper = new THREE.BoxGeometry(1.72, 0.28, 0.3);
      rearBumper.translate(0, 0.375, -2.15);
      bodyGeoms.push(rearBumper);

      // Cabin / Roof frame
      const roofPlate = new THREE.BoxGeometry(1.48, 0.08, 1.9);
      roofPlate.translate(0, 0.945, -0.2);
      bodyGeoms.push(roofPlate);

      // A-pillars
      const pillarAL = new THREE.BoxGeometry(0.08, 0.42, 0.08);
      pillarAL.translate(-0.7, 0.735, 0.7);
      bodyGeoms.push(pillarAL);
      
      const pillarAR = new THREE.BoxGeometry(0.08, 0.42, 0.08);
      pillarAR.translate(0.7, 0.735, 0.7);
      bodyGeoms.push(pillarAR);

      // C-pillars
      const pillarCL = new THREE.BoxGeometry(0.08, 0.42, 0.08);
      pillarCL.translate(-0.7, 0.735, -1.1);
      bodyGeoms.push(pillarCL);
      
      const pillarCR = new THREE.BoxGeometry(0.08, 0.42, 0.08);
      pillarCR.translate(0.7, 0.735, -1.1);
      bodyGeoms.push(pillarCR);

      // Side Mirrors (in body color)
      const mirrorL = new THREE.BoxGeometry(0.22, 0.14, 0.14);
      mirrorL.translate(-0.89, 0.72, 0.58);
      bodyGeoms.push(mirrorL);
      
      const mirrorR = new THREE.BoxGeometry(0.22, 0.14, 0.14);
      mirrorR.translate(0.89, 0.72, 0.58);
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

      // White cabin mesh
      const whiteCabinMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.15, metalness: 0.7 });
      const whiteCabinGeo = new THREE.BoxGeometry(1.6, 0.65, 2.4);
      whiteCabinGeo.translate(0, 0.925, -0.3);
      const whiteCabinMesh = new THREE.Mesh(whiteCabinGeo, whiteCabinMat);
      whiteCabinMesh.castShadow = true;
      whiteCabinMesh.receiveShadow = true;
      carGroup.add(whiteCabinMesh);

      // White side doors
      const leftDoorGeo = new THREE.BoxGeometry(0.02, 0.5, 1.8);
      leftDoorGeo.translate(0.93, 0.55, -0.3);
      const leftDoorMesh = new THREE.Mesh(leftDoorGeo, whiteCabinMat);
      leftDoorMesh.castShadow = true;
      carGroup.add(leftDoorMesh);

      const rightDoorGeo = new THREE.BoxGeometry(0.02, 0.5, 1.8);
      rightDoorGeo.translate(-0.93, 0.55, -0.3);
      const rightDoorMesh = new THREE.Mesh(rightDoorGeo, whiteCabinMat);
      rightDoorMesh.castShadow = true;
      carGroup.add(rightDoorMesh);

      // Flasher siren bar on the roof
      const sirenBarGeo = new THREE.BoxGeometry(1.2, 0.12, 0.3);
      sirenBarGeo.translate(0, 1.25, -0.3);
      const sirenBarMesh = new THREE.Mesh(sirenBarGeo, carbonMat);
      sirenBarMesh.castShadow = true;
      carGroup.add(sirenBarMesh);

      // Blue flasher light (Left side of bar)
      const sirenBlueGeo = new THREE.BoxGeometry(0.4, 0.15, 0.28);
      sirenBlueGeo.translate(-0.35, 1.35, -0.3);
      const sirenBlueMat = new THREE.MeshStandardMaterial({
        color: 0x0022ff,
        emissive: 0x0022ff,
        emissiveIntensity: 0.1,
        roughness: 0.1
      });
      const sirenBlueMesh = new THREE.Mesh(sirenBlueGeo, sirenBlueMat);
      sirenBlueMesh.name = "sirenBlue";
      carGroup.add(sirenBlueMesh);

      // Red flasher light (Right side of bar)
      const sirenRedGeo = new THREE.BoxGeometry(0.4, 0.15, 0.28);
      sirenRedGeo.translate(0.35, 1.35, -0.3);
      const sirenRedMat = new THREE.MeshStandardMaterial({
        color: 0xff0022,
        emissive: 0xff0022,
        emissiveIntensity: 0.1,
        roughness: 0.1
      });
      const sirenRedMesh = new THREE.Mesh(sirenRedGeo, sirenRedMat);
      sirenRedMesh.name = "sirenRed";
      carGroup.add(sirenRedMesh);
    } else { // 'sedan', 'cab', 'suv'
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
    const bodyMesh = new THREE.Mesh(mergedBodyGeo, bodyMat);
    bodyMesh.name = "carBody";
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    carGroup.add(bodyMesh);

    // 2. Merge Glass Geometries (Windows + Windshield)
    const glassGeoms = [];

    if (type === 'sports') {
      const windshieldGeo = new THREE.BoxGeometry(1.4, 0.4, 0.05);
      windshieldGeo.rotateX(Math.PI / 5);
      windshieldGeo.translate(0, 0.735, 0.7);
      glassGeoms.push(windshieldGeo);

      const rearWinGeo = new THREE.BoxGeometry(1.4, 0.38, 0.05);
      rearWinGeo.rotateX(-Math.PI / 6);
      rearWinGeo.translate(0, 0.735, -1.1);
      glassGeoms.push(rearWinGeo);

      const leftWinGeo = new THREE.BoxGeometry(0.02, 0.32, 1.6);
      leftWinGeo.translate(0.76, 0.735, -0.2);
      glassGeoms.push(leftWinGeo);

      const rightWinGeo = new THREE.BoxGeometry(0.02, 0.32, 1.6);
      rightWinGeo.translate(-0.76, 0.735, -0.2);
      glassGeoms.push(rightWinGeo);
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
    const glassMesh = new THREE.Mesh(mergedGlassGeo, glassMat);
    carGroup.add(glassMesh);

    // 3. Merge Carbon Geometries (Scoops + Spoiler)
    const carbonGeoms = [];

    if (type === 'sports') {
      // Roof scoop
      const scoopGeo = new THREE.BoxGeometry(0.5, 0.1, 0.6);
      scoopGeo.translate(0, 0.96, -0.2);
      carbonGeoms.push(scoopGeo);

      // Large rear spoiler wing
      const spLGeo = new THREE.BoxGeometry(0.08, 0.45, 0.15);
      spLGeo.translate(-0.65, 0.725, -1.8);
      carbonGeoms.push(spLGeo);

      const spRGeo = new THREE.BoxGeometry(0.08, 0.45, 0.15);
      spRGeo.translate(0.65, 0.725, -1.8);
      carbonGeoms.push(spRGeo);

      const wingGeo = new THREE.BoxGeometry(1.85, 0.06, 0.5);
      wingGeo.translate(0, 0.95, -1.8);
      carbonGeoms.push(wingGeo);
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
    const carbonMesh = new THREE.Mesh(mergedCarbonGeo, carbonMat);
    carbonMesh.castShadow = true;
    carGroup.add(carbonMesh);

    // 4. Merge Headlamps
    const headlampGeoms = [];
    const lampGeoL = new THREE.BoxGeometry(0.25, 0.12, 0.1);
    lampGeoL.translate(-0.65, type === 'sports' ? 0.35 : (type === 'van' || type === 'pickup' ? 0.45 : 0.4), frontZ + 0.01);
    headlampGeoms.push(lampGeoL);

    const lampGeoR = new THREE.BoxGeometry(0.25, 0.12, 0.1);
    lampGeoR.translate(0.65, type === 'sports' ? 0.35 : (type === 'van' || type === 'pickup' ? 0.45 : 0.4), frontZ + 0.01);
    headlampGeoms.push(lampGeoR);

    const mergedHeadlampsGeo = BufferGeometryUtils.mergeGeometries(headlampGeoms);
    const headlampsMesh = new THREE.Mesh(mergedHeadlampsGeo, headlampMat);
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
      leftSprite.position.set(-0.65, type === 'sports' ? 0.35 : (type === 'van' || type === 'pickup' ? 0.45 : 0.4), frontZ + 0.05);
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
      rightSprite.position.set(0.65, type === 'sports' ? 0.35 : (type === 'van' || type === 'pickup' ? 0.45 : 0.4), frontZ + 0.05);
      rightSprite.scale.set(3.4, 0.7, 1.0);
      rightSprite.name = "rightHeadlightSprite";
      carGroup.add(rightSprite);
    }

    // 5. Merge Taillights (named for dynamic player brake glow targeting)
    const taillightGeoms = [];
    const tailGeoL = new THREE.BoxGeometry(0.25, 0.12, 0.1);
    tailGeoL.translate(-0.65, type === 'sports' ? 0.36 : (type === 'van' || type === 'pickup' ? 0.47 : 0.42), backZ - 0.01);
    taillightGeoms.push(tailGeoL);

    const tailGeoR = new THREE.BoxGeometry(0.25, 0.12, 0.1);
    tailGeoR.translate(0.65, type === 'sports' ? 0.36 : (type === 'van' || type === 'pickup' ? 0.47 : 0.42), backZ - 0.01);
    taillightGeoms.push(tailGeoR);

    const mergedTaillightsGeo = BufferGeometryUtils.mergeGeometries(taillightGeoms);
    const taillightsMesh = new THREE.Mesh(mergedTaillightsGeo, taillightMat);
    taillightsMesh.name = "taillights";
    // 5b. Grille, Exhausts, and Bull-Bars
    if (type === 'sports' || type === 'cop') {
      const grilleGeo = new THREE.BoxGeometry(1.2, 0.16, 0.05);
      grilleGeo.translate(0, 0.28, frontZ + 0.05);
      const grilleMesh = new THREE.Mesh(grilleGeo, carbonMat);
      carGroup.add(grilleMesh);
      
      if (type === 'sports') {
        const exhaustL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.4, 8), rimMat);
        exhaustL.rotation.x = Math.PI / 2;
        exhaustL.position.set(-0.48, 0.18, backZ - 0.15);
        exhaustL.castShadow = true;
        carGroup.add(exhaustL);

        const exhaustR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.4, 8), rimMat);
        exhaustR.rotation.x = Math.PI / 2;
        exhaustR.position.set(0.48, 0.18, backZ - 0.15);
        exhaustR.castShadow = true;
        carGroup.add(exhaustR);
      } else if (type === 'cop') {
        const bullBarGeo = new THREE.BoxGeometry(1.2, 0.38, 0.12);
        bullBarGeo.translate(0, 0.34, frontZ + 0.12);
        const bullBarMesh = new THREE.Mesh(bullBarGeo, carbonMat);
        bullBarMesh.castShadow = true;
        carGroup.add(bullBarMesh);
      }
    }

    carGroup.add(taillightsMesh);

    // 6. Wheels & Gold Rims (kept separate for rolling rotation)
    const tireGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.45, 12);
    tireGeo.rotateZ(Math.PI / 2);
    const rimGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.48, 8);
    rimGeo.rotateZ(Math.PI / 2);

    const wheels = [];
    const wheelPositions = [
      [-0.95, 0.25, wheelZFront],  // Front Left
      [0.95, 0.25, wheelZFront],   // Front Right
      [-0.95, 0.25, wheelZRear],  // Rear Left
      [0.95, 0.25, wheelZRear]    // Rear Right
    ];

    wheelPositions.forEach(([x, y, z]) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(x, y, z);

      const tire = new THREE.Mesh(tireGeo, wheelMat);
      tire.castShadow = true;
      wheelGroup.add(tire);

      const rim = new THREE.Mesh(rimGeo, rimMat);
      wheelGroup.add(rim);

      carGroup.add(wheelGroup);
      wheels.push(wheelGroup);
    });

    return { carGroup, wheels };
  }
