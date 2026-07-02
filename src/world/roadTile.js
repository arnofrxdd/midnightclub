import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { applySidewalkUVs } from './geometry.js';

function buildWedge(length, height, width, slopeType, slopeDir) {
  const geo = slopeType === 'X'
    ? new THREE.BoxGeometry(length, height, width)
    : new THREE.BoxGeometry(width, height, length);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    if (slopeType === 'X') {
      if (slopeDir === 1) {
        if (x < 0) {
          if (y > 0) pos.setY(i, -height / 2);
        }
      } else {
        if (x > 0) {
          if (y > 0) pos.setY(i, -height / 2);
        }
      }
    } else {
      if (slopeDir === 1) {
        if (z < 0) {
          if (y > 0) pos.setY(i, -height / 2);
        }
      } else {
        if (z > 0) {
          if (y > 0) pos.setY(i, -height / 2);
        }
      }
    }
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

function buildMaintenanceZone(gridX, gridZ, posX, posZ, roadWidth, sidewalkWidth, isVertical, side, group, obstacles, lights, coneTransforms, localConeBreakables) {
  const h = this.getBaseHeight(posX, posZ);
  const rampHeight = 2.2;
  const rampLength = 8.0;
  const rampWidth = 4.2;

  const maintGroup = new THREE.Group();

  let zRoadCenter, zSidewalkCenter;
  let xRoadCenter, xSidewalkCenter;
  let rampX, rampZ;
  let slopeType, slopeDir;

  const dir = isVertical ? side : -side; // Determine traffic flow direction

  if (isVertical) {
    zRoadCenter = posZ + side * roadWidth * 0.35;
    zSidewalkCenter = posZ + side * (roadWidth * 0.5 + sidewalkWidth * 0.5);
    xRoadCenter = posX;
    xSidewalkCenter = posX;

    rampX = posX - dir * 15.0;
    rampZ = zRoadCenter;
    slopeType = 'X';
    slopeDir = dir;
  } else {
    xRoadCenter = posX + side * roadWidth * 0.35;
    xSidewalkCenter = posX + side * (roadWidth * 0.5 + sidewalkWidth * 0.5);
    zRoadCenter = posZ;
    zSidewalkCenter = posZ;

    rampX = xRoadCenter;
    rampZ = posZ - dir * 15.0;
    slopeType = 'Z';
    slopeDir = dir;
  }

  // Create the heavy steel ramp wedge
  const rampGeo = buildWedge(rampLength, rampHeight, rampWidth, slopeType, slopeDir);
  rampGeo.translate(0, rampHeight / 2, 0);
  rampGeo.translate(rampX, 0.05, rampZ);
  this.deformGeometryToHills(rampGeo, 0, 0);
  const rampMesh = new THREE.Mesh(rampGeo, this.streetlightPoleMat); // Dark steel material
  rampMesh.castShadow = true;
  rampMesh.receiveShadow = true;
  maintGroup.add(rampMesh);

  // Yellow caution stripes on the left and right edges of the ramp (slightly larger to prevent Z-fighting)
  const stripeW = 0.4;
  const sLen = rampLength + 0.04;
  const sHeight = rampHeight + 0.04;

  const s1Geo = buildWedge(sLen, sHeight, stripeW, slopeType, slopeDir);
  s1Geo.translate(0, sHeight / 2, 0);
  if (slopeType === 'X') {
    s1Geo.translate(rampX, 0.05, rampZ - rampWidth / 2 + stripeW / 2 - 0.02);
  } else {
    s1Geo.translate(rampX - rampWidth / 2 + stripeW / 2 - 0.02, 0.05, rampZ);
  }
  this.deformGeometryToHills(s1Geo, 0, 0);
  maintGroup.add(new THREE.Mesh(s1Geo, this.yellowLineMat));

  const s2Geo = buildWedge(sLen, sHeight, stripeW, slopeType, slopeDir);
  s2Geo.translate(0, sHeight / 2, 0);
  if (slopeType === 'X') {
    s2Geo.translate(rampX, 0.05, rampZ + rampWidth / 2 - stripeW / 2 + 0.02);
  } else {
    s2Geo.translate(rampX + rampWidth / 2 - stripeW / 2 + 0.02, 0.05, rampZ);
  }
  this.deformGeometryToHills(s2Geo, 0, 0);
  maintGroup.add(new THREE.Mesh(s2Geo, this.yellowLineMat));

  // Helper to add excavated hole and rubble (to make it look like a real site)
  const addExcavation = (hx, hz) => {
    // Dark jagged patch representing the deep hole
    const holeGeo = new THREE.BoxGeometry(4.5, 0.1, 4.5);
    const pos = holeGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setX(i, pos.getX(i) + (Math.random() - 0.5) * 0.8); // randomize shape
      pos.setZ(i, pos.getZ(i) + (Math.random() - 0.5) * 0.8);
    }
    holeGeo.translate(hx, 0.02, hz);
    this.deformGeometryToHills(holeGeo, 0, 0);
    maintGroup.add(new THREE.Mesh(holeGeo, this.streetlightPoleMat));

    const rubbleAsphaltGeoms = [];
    const rubbleConcreteGeoms = [];

    // Scatter concrete and asphalt rubble chunks around the edges
    for (let i = 0; i < 18; i++) {
      const rs = 0.3 + Math.random() * 0.5; // Random rubble size
      const rGeo = new THREE.BoxGeometry(rs, rs, rs);
      const angle = Math.random() * Math.PI * 2;
      const dist = 2.0 + Math.random() * 1.5; // Push to edges of hole
      const rx = hx + Math.cos(angle) * dist;
      const rz = hz + Math.sin(angle) * dist;

      rGeo.rotateX(Math.random() * Math.PI);
      rGeo.rotateY(Math.random() * Math.PI);
      rGeo.translate(rx, rs * 0.4, rz);
      this.deformGeometryToHills(rGeo, 0, 0);

      // 50/50 mix of broken black asphalt and gray concrete
      if (Math.random() > 0.5) {
        rubbleAsphaltGeoms.push(rGeo);
      } else {
        rubbleConcreteGeoms.push(rGeo);
      }
    }

    if (rubbleAsphaltGeoms.length > 0) {
      const mergedA = BufferGeometryUtils.mergeGeometries(rubbleAsphaltGeoms);
      const meshA = new THREE.Mesh(mergedA, this.asphaltMat);
      meshA.castShadow = true;
      maintGroup.add(meshA);
    }

    if (rubbleConcreteGeoms.length > 0) {
      const mergedC = BufferGeometryUtils.mergeGeometries(rubbleConcreteGeoms);
      const meshC = new THREE.Mesh(mergedC, this.concreteMat);
      meshC.castShadow = true;
      maintGroup.add(meshC);
    }
  };

  // Place the hole in the landing zone between the ramp and the trailer
  const holeX = isVertical ? posX - dir * 8.0 : xRoadCenter;
  const holeZ = isVertical ? zRoadCenter : posZ - dir * 8.0;
  addExcavation(holeX, holeZ);

  // Add the ramp obstacle
  const isZ = slopeType === 'Z';
  const physXLen = isZ ? rampWidth : rampLength;
  const physZLen = isZ ? rampLength : rampWidth;

  obstacles.push({
    xMin: rampX - physXLen / 2,
    xMax: rampX + physXLen / 2,
    zMin: rampZ - physZLen / 2,
    zMax: rampZ + physZLen / 2,
    isRamp: true,
    isConstruction: true,
    slopeDir: slopeDir,
    slopeType: slopeType,
    rampHeight: rampHeight,
    rampLength: rampLength,
    height: rampHeight + this.getBaseHeight(rampX, rampZ) + 0.5
  });

  // MASSIVE TRAFFIC-ONLY BLOCKER: 
  // Prevents cars from spawning anywhere inside the 40m tile lane, but ignored by the player's physics
  const laneW = 4.0;
  const laneL = 20.0;
  obstacles.push({
    xMin: isZ ? rampX - laneW : posX - laneL,
    xMax: isZ ? rampX + laneW : posX + laneL,
    zMin: isZ ? posZ - laneL : rampZ - laneW,
    zMax: isZ ? posZ + laneL : rampZ + laneW,
    isConstruction: true,
    isTrafficBlockerOnly: true,
    height: 1000 // Block entirely vertically
  });

  // Helper to spawn a physical breakable cone
  const addBreakableCone = (cx, cz) => {
    const ch = this.getBaseHeight(cx, cz);
    
    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(cx, ch + 0.6, cz); // Center of mass is 0.6
    const instanceId = coneTransforms.length;
    coneTransforms.push(matrix);

    const breakable = {
      type: 'cone',
      comHeight: 0.6,
      radius: 0.45,
      position: new THREE.Vector3(cx, ch + 0.6, cz),
      group: null,
      flares: [],
      lights: [],
      broken: false,
      tileX: posX,
      tileZ: posZ,
      velocity: new THREE.Vector3(),
      angularVelocity: new THREE.Vector3(),
      isInstanced: true,
      templateName: 'cone',
      instanceId: instanceId,
      instancedMeshes: null
    };
    this.breakables.push(breakable);
    localConeBreakables.push(breakable);
  };

  // Helper to make concrete Jersey Barriers (deformed relative to absolute coordinates, starting at Y=0)
  const addJerseyBarrier = (bx, bz, angle) => {
    const parts = [];
    const base = new THREE.BoxGeometry(1.4, 0.4, 3.0);
    base.translate(0, 0.2, 0);
    parts.push(base);

    const mid = new THREE.BoxGeometry(0.8, 0.6, 3.0);
    mid.translate(0, 0.7, 0);
    parts.push(mid);

    const top = new THREE.BoxGeometry(0.5, 0.3, 3.0);
    top.translate(0, 1.15, 0);
    parts.push(top);

    const merged = BufferGeometryUtils.mergeGeometries(parts);
    merged.rotateY(angle);
    merged.translate(bx, 0.02, bz);
    this.deformGeometryToHills(merged, 0, 0);

    const barrierMesh = new THREE.Mesh(merged, this.concreteMat);
    barrierMesh.castShadow = true;
    barrierMesh.receiveShadow = true;
    maintGroup.add(barrierMesh);

    // Add solid collision AABB
    const halfW = 0.7;
    const halfL = 1.5;
    const isRot = Math.abs(angle - Math.PI / 2) < 0.2 || Math.abs(angle + Math.PI / 2) < 0.2;
    obstacles.push({
      xMin: bx - (isRot ? halfL : halfW),
      xMax: bx + (isRot ? halfL : halfW),
      zMin: bz - (isRot ? halfW : halfL),
      zMax: bz + (isRot ? halfW : halfL),
      height: 1.3 + this.getBaseHeight(bx, bz),
      isConstruction: true
    });
  };

  // Helper to make a construction warning diamond sign (deformed relative to absolute coordinates)
  const addRoadSign = (sx, sz, angle) => {
    const parts = [];

    // Base stand
    const standBase = new THREE.BoxGeometry(0.8, 0.05, 0.8);
    standBase.translate(0, 0.025, 0);
    parts.push(standBase);

    // Pole
    const pole = new THREE.BoxGeometry(0.1, 1.6, 0.1);
    pole.translate(0, 0.8, 0);
    parts.push(pole);

    const mergedStand = BufferGeometryUtils.mergeGeometries(parts);
    mergedStand.rotateY(angle);
    mergedStand.translate(sx, 0.02, sz);
    this.deformGeometryToHills(mergedStand, 0, 0);
    maintGroup.add(new THREE.Mesh(mergedStand, this.streetlightPoleMat));

    // Diamond board
    const board = new THREE.BoxGeometry(1.0, 1.0, 0.06);
    board.rotateZ(Math.PI / 4);
    board.translate(0, 1.5, 0.08);
    board.rotateY(angle);
    board.translate(sx, 0.02, sz);
    this.deformGeometryToHills(board, 0, 0);
    maintGroup.add(new THREE.Mesh(board, this.yellowLineMat));
  };

  if (isVertical) {
    const laneZ = posZ + side * 0.5;

    // Cones along lane divider
    for (let xOffset = -20.0; xOffset <= 20.0; xOffset += 4.5) {
      if (Math.abs(xOffset - (-dir * 15.0)) < 5.0) continue; // Leave gap for ramp
      addBreakableCone(posX + xOffset, laneZ);
    }

    // Jersey barriers forming a solid wall at the END of the zone
    const wallX = posX + dir * 12.0;
    for (let offset = 2.0; offset <= 18.0; offset += 3.1) {
      addJerseyBarrier(wallX, posZ + side * offset, 0); // Barrier runs along Z
    }

    // Sign at entry (early)
    const signX = posX - dir * 18.0;
    addRoadSign(signX, zSidewalkCenter, -dir * Math.PI / 2);

    // Upgraded Generator trailer with wheels (placed in the middle of the zone)
    const trailer = new THREE.Group();
    const frameGeo = new THREE.BoxGeometry(3.2, 0.15, 2.2);
    frameGeo.translate(0, 0.3, 0);
    trailer.add(new THREE.Mesh(frameGeo, this.streetlightPoleMat));

    const genGeo = new THREE.BoxGeometry(2.8, 1.4, 1.8);
    genGeo.translate(0, 1.0, 0);
    const genMesh = new THREE.Mesh(genGeo, this.yellowLineMat);
    genMesh.castShadow = true;
    trailer.add(genMesh);

    const pipeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 8);
    pipeGeo.translate(0.8, 1.9, 0.4);
    trailer.add(new THREE.Mesh(pipeGeo, this.streetlightPoleMat));

    const wheel1 = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.25, 12), this.asphaltMat);
    wheel1.rotateX(Math.PI / 2);
    wheel1.position.set(0.0, 0.45, 1.0);
    trailer.add(wheel1);

    const wheel2 = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.25, 12), this.asphaltMat);
    wheel2.rotateX(Math.PI / 2);
    wheel2.position.set(0.0, 0.45, -1.0);
    trailer.add(wheel2);

    const trailerX = posX - dir * 2.0;
    trailer.position.set(trailerX, h, zRoadCenter);
    maintGroup.add(trailer);

    // Dynamic warning lights on trailer
    const beaconGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    beaconGeo.translate(trailerX, 0.0, zRoadCenter);
    beaconGeo.translate(0, 1.85 + h, 0);
    this.deformGeometryToHills(beaconGeo, 0, 0);
    maintGroup.add(new THREE.Mesh(beaconGeo, this.whiteLineMat));

    lights.push({
      x: trailerX,
      y: h + 2.4,
      z: zRoadCenter,
      intensity: 3.5,
      color: 0xffaa00
    });

    obstacles.push({
      xMin: trailerX - 1.7,
      xMax: trailerX + 1.7,
      zMin: zRoadCenter - 1.2,
      zMax: zRoadCenter + 1.2,
      height: 1.8 + h,
      isConstruction: true
    });

  } else {
    const laneX = posX + side * 0.5;

    // Cones along lane divider
    for (let zOffset = -20.0; zOffset <= 20.0; zOffset += 4.5) {
      if (Math.abs(zOffset - (-dir * 15.0)) < 5.0) continue; // Leave gap for ramp
      addBreakableCone(laneX, posZ + zOffset);
    }

    // Jersey barriers forming a solid wall at the END of the zone
    const wallZ = posZ + dir * 12.0;
    for (let offset = 2.0; offset <= 18.0; offset += 3.1) {
      addJerseyBarrier(posX + side * offset, wallZ, Math.PI / 2); // Barrier runs along X
    }

    // Sign at entry (early)
    const signZ = posZ - dir * 18.0;
    addRoadSign(xSidewalkCenter, signZ, dir === -1 ? 0 : Math.PI);

    // Upgraded Generator trailer with wheels (placed in the middle of the zone)
    const trailer = new THREE.Group();
    const frameGeo = new THREE.BoxGeometry(2.2, 0.15, 3.2);
    frameGeo.translate(0, 0.3, 0);
    trailer.add(new THREE.Mesh(frameGeo, this.streetlightPoleMat));

    const genGeo = new THREE.BoxGeometry(1.8, 1.4, 2.8);
    genGeo.translate(0, 1.0, 0);
    const genMesh = new THREE.Mesh(genGeo, this.yellowLineMat);
    genMesh.castShadow = true;
    trailer.add(genMesh);

    const pipeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 8);
    pipeGeo.translate(0.4, 1.9, 0.8);
    trailer.add(new THREE.Mesh(pipeGeo, this.streetlightPoleMat));

    const wheel1 = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.25, 12), this.asphaltMat);
    wheel1.position.set(1.0, 0.45, 0.0);
    trailer.add(wheel1);

    const wheel2 = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.25, 12), this.asphaltMat);
    wheel2.position.set(-1.0, 0.45, 0.0);
    trailer.add(wheel2);

    const trailerZ = posZ - dir * 2.0;
    trailer.position.set(xRoadCenter, h, trailerZ);
    maintGroup.add(trailer);

    // Dynamic warning lights on trailer
    const beaconGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    beaconGeo.translate(xRoadCenter, 0.0, trailerZ);
    beaconGeo.translate(0, 1.85 + h, 0);
    this.deformGeometryToHills(beaconGeo, 0, 0);
    maintGroup.add(new THREE.Mesh(beaconGeo, this.whiteLineMat));

    lights.push({
      x: xRoadCenter,
      y: h + 2.4,
      z: trailerZ,
      intensity: 3.5,
      color: 0xffaa00
    });

    obstacles.push({
      xMin: xRoadCenter - 1.2,
      xMax: xRoadCenter + 1.2,
      zMin: trailerZ - 1.7,
      zMax: trailerZ + 1.7,
      height: 1.8 + h,
      isConstruction: true
    });
  }

  group.add(maintGroup);
}

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
  const localRedHydrantGeoms = [];
  const localCapHydrantGeoms = [];
  const localBodyNewspaperGeoms = [];
  const localGlassNewspaperGeoms = [];
  const localPaperNewspaperGeoms = [];

  const benchTransforms = [];
  const hydrantTransforms = [];
  const phoneBoothTransforms = [];
  const trashCanTransforms = [];
  const coneTransforms = [];
  const localBenchBreakables = [];
  const localHydrantBreakables = [];
  const localPhoneBoothBreakables = [];
  const localTrashCanBreakables = [];
  const localConeBreakables = [];

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
    const h = this.getBaseHeight(fhx, fhz);
    if (Math.abs(h) > 0.1) return;

    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(fhx, 0.35 + h, fhz);
    const instanceId = hydrantTransforms.length;
    hydrantTransforms.push(matrix);

    const breakable = {
      type: 'hydrant',
      comHeight: 0.35,
      radius: 0.25,
      position: new THREE.Vector3(fhx, 0.35 + h, fhz),
      group: null,
      flares: [],
      lights: [],
      broken: false,
      tileX: posX,
      tileZ: posZ,
      velocity: new THREE.Vector3(),
      angularVelocity: new THREE.Vector3(),
      isInstanced: true,
      templateName: 'fireHydrant',
      instanceId: instanceId,
      instancedMeshes: null
    };
    this.breakables.push(breakable);
    localHydrantBreakables.push(breakable);
  };

  const addNewspaperBox = (nbx, nbz, rotY) => {
    const h = this.getBaseHeight(nbx, nbz);

    const bodyGeo = new THREE.BoxGeometry(0.8, 1.1, 0.8);
    bodyGeo.translate(0, 0.55, 0);
    bodyGeo.rotateY(rotY);
    bodyGeo.translate(nbx, 0.35 + h, nbz);
    localBodyNewspaperGeoms.push(bodyGeo);

    const glassGeo = new THREE.BoxGeometry(0.6, 0.4, 0.05);
    glassGeo.translate(0, 0.75, 0.41);
    glassGeo.rotateY(rotY);
    glassGeo.translate(nbx, 0.35 + h, nbz);
    localGlassNewspaperGeoms.push(glassGeo);

    const paperGeo = new THREE.BoxGeometry(0.5, 0.3, 0.5);
    paperGeo.translate(0, 0.35, 0.1);
    paperGeo.rotateY(rotY);
    paperGeo.translate(nbx, 0.35 + h, nbz);
    localPaperNewspaperGeoms.push(paperGeo);

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

    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(bx, 0.6 + h, bz);
    matrix.multiply(new THREE.Matrix4().makeRotationY(rotY));
    const instanceId = benchTransforms.length;
    benchTransforms.push(matrix);

    const breakable = {
      type: 'bench',
      comHeight: 0.6,
      radius: 0.4,
      position: new THREE.Vector3(bx, 0.6 + h, bz),
      group: null,
      flares: [],
      lights: [],
      broken: false,
      tileX: posX,
      tileZ: posZ,
      velocity: new THREE.Vector3(),
      angularVelocity: new THREE.Vector3(),
      isInstanced: true,
      templateName: 'bench',
      instanceId: instanceId,
      instancedMeshes: null
    };
    this.breakables.push(breakable);
    localBenchBreakables.push(breakable);
  };

  const addPhoneBooth = (pbx, pbz, rotY) => {
    const h = this.getBaseHeight(pbx, pbz);
    if (Math.abs(h) > 0.1) return;

    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(pbx, 1.4 + h, pbz);
    matrix.multiply(new THREE.Matrix4().makeRotationY(rotY));
    const instanceId = phoneBoothTransforms.length;
    phoneBoothTransforms.push(matrix);

    const breakable = {
      type: 'phonebooth',
      comHeight: 1.4,
      radius: 0.6,
      position: new THREE.Vector3(pbx, 1.4 + h, pbz),
      group: null,
      flares: [],
      lights: [],
      broken: false,
      tileX: posX,
      tileZ: posZ,
      velocity: new THREE.Vector3(),
      angularVelocity: new THREE.Vector3(),
      isInstanced: true,
      templateName: 'phoneBooth',
      instanceId: instanceId,
      instancedMeshes: null
    };
    this.breakables.push(breakable);
    localPhoneBoothBreakables.push(breakable);
  };

  const addTrashCan = (tcx, tcz) => {
    const h = this.getBaseHeight(tcx, tcz);
    if (Math.abs(h) > 0.1) return;

    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(tcx, 0.5 + h, tcz);
    matrix.multiply(new THREE.Matrix4().makeRotationY(Math.random() * Math.PI * 2));
    const instanceId = trashCanTransforms.length;
    trashCanTransforms.push(matrix);

    const breakable = {
      type: 'trashcan',
      comHeight: 0.5,
      radius: 0.3,
      position: new THREE.Vector3(tcx, 0.5 + h, tcz),
      group: null,
      flares: [],
      lights: [],
      broken: false,
      tileX: posX,
      tileZ: posZ,
      velocity: new THREE.Vector3(),
      angularVelocity: new THREE.Vector3(),
      isInstanced: true,
      templateName: 'trashCan',
      instanceId: instanceId,
      instancedMeshes: null
    };
    this.breakables.push(breakable);
    localTrashCanBreakables.push(breakable);
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
    for (let offset = -rwX / 2 + 2; offset <= rwX / 2 - 2; offset += 3) {
      const gN = new THREE.BoxGeometry(lineL, 0.21, lineW, 4, 1, 1);
      gN.translate(offset, 0.11, -rwZ / 2 - 1);
      crosswalkWhiteGeoms.push(gN);

      const gS = new THREE.BoxGeometry(lineL, 0.21, lineW, 4, 1, 1);
      gS.translate(offset, 0.11, rwZ / 2 + 1);
      crosswalkWhiteGeoms.push(gS);
    }

    // West & East crosswalks (along the vertical road of width rwX)
    for (let offset = -rwZ / 2 + 2; offset <= rwZ / 2 - 2; offset += 3) {
      const gW = new THREE.BoxGeometry(lineW, 0.21, lineL, 1, 1, 4);
      gW.translate(-rwX / 2 - 1, 0.11, offset);
      crosswalkWhiteGeoms.push(gW);

      const gE = new THREE.BoxGeometry(lineW, 0.21, lineL, 1, 1, 4);
      gE.translate(rwX / 2 + 1, 0.11, offset);
      crosswalkWhiteGeoms.push(gE);
    }

    if (crosswalkWhiteGeoms.length > 0) {
      const mergedWhite = BufferGeometryUtils.mergeGeometries(crosswalkWhiteGeoms);
      this.deformGeometryToHills(mergedWhite, posX, posZ);
      road.add(new THREE.Mesh(mergedWhite, this.whiteLineMat));
    }

    // 4 Corner sidewalk slabs
    const swWidthX = 20 - rwX / 2;
    const swWidthZ = 20 - rwZ / 2;
    const concreteGeoms = [];
    if (swWidthX > 0 && swWidthZ > 0) {
      // NW Corner
      const slabNW = new THREE.BoxGeometry(swWidthX, 0.35, swWidthZ, 4, 1, 4);
      applySidewalkUVs(slabNW);
      slabNW.translate(-20 + swWidthX / 2, 0.175, -20 + swWidthZ / 2);
      concreteGeoms.push(slabNW);

      // NE Corner
      const slabNE = new THREE.BoxGeometry(swWidthX, 0.35, swWidthZ, 4, 1, 4);
      applySidewalkUVs(slabNE);
      slabNE.translate(20 - swWidthX / 2, 0.175, -20 + swWidthZ / 2);
      concreteGeoms.push(slabNE);

      // SW Corner
      const slabSW = new THREE.BoxGeometry(swWidthX, 0.35, swWidthZ, 4, 1, 4);
      applySidewalkUVs(slabSW);
      slabSW.translate(-20 + swWidthX / 2, 0.175, 20 - swWidthZ / 2);
      concreteGeoms.push(slabSW);

      // SE Corner
      const slabSE = new THREE.BoxGeometry(swWidthX, 0.35, swWidthZ, 4, 1, 4);
      applySidewalkUVs(slabSE);
      slabSE.translate(20 - swWidthX / 2, 0.175, 20 - swWidthZ / 2);
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
      [-rwX / 2 - 1, -rwZ / 2 - 1],
      [rwX / 2 + 1, -rwZ / 2 - 1],
      [-rwX / 2 - 1, rwZ / 2 + 1],
      [rwX / 2 + 1, rwZ / 2 + 1]
    ];
    corners.forEach(([ox, oz]) => {
      const slX = posX + ox;
      const slZ = posZ + oz;

      const slObject = new THREE.Group();
      const h = this.getBaseHeight(slX, slZ);
      slObject.position.set(slX, 4.25 + h, slZ); // Centered at Center of Mass (y=4.25)
      group.add(slObject);

      const armDirX = ox > 0 ? -1 : 1;
      const isLED = Math.sin(slX * 5.0 + slZ * 3.0) > 0.0;
      const lightColor = isLED ? 0xd2e5ff : 0xffd5a1;

      const isDoubleArm = (Math.sin(slX * 1.2 + slZ * 2.8) - Math.floor(Math.sin(slX * 1.2 + slZ * 2.8))) > 0.65;
      const localFlares = [];
      const localLights = [];
      let poolMesh2 = null;

      // Streetlight pole & arm merged geometry
      const poleGeoms = [];
      const poleGeo = new THREE.BoxGeometry(0.3, 8.5, 0.3);
      poleGeoms.push(poleGeo);

      const armGeo = new THREE.BoxGeometry(1.3, 0.15, 0.15);
      armGeo.translate(armDirX * 0.65, 4.15, 0);
      poleGeoms.push(armGeo);

      if (isDoubleArm) {
        const arm2Geo = new THREE.BoxGeometry(1.3, 0.15, 0.15);
        arm2Geo.translate(-armDirX * 0.65, 4.15, 0);
        poleGeoms.push(arm2Geo);
      }

      const mergedPoles = BufferGeometryUtils.mergeGeometries(poleGeoms);
      const poleMesh = new THREE.Mesh(mergedPoles, this.streetlightPoleMat);
      poleMesh.castShadow = true;
      slObject.add(poleMesh);

      // Streetlight bulb merged geometry
      const bulbGeoms = [];
      const bulbGeo = new THREE.BoxGeometry(0.6, 0.2, 0.6);
      bulbGeo.translate(armDirX * 1.3, 4.15, 0);
      bulbGeoms.push(bulbGeo);

      if (isDoubleArm) {
        const bulb2Geo = new THREE.BoxGeometry(0.6, 0.2, 0.6);
        bulb2Geo.translate(-armDirX * 1.3, 4.15, 0);
        bulbGeoms.push(bulb2Geo);
      }

      const mergedBulbs = BufferGeometryUtils.mergeGeometries(bulbGeoms);
      const bulbMesh = new THREE.Mesh(mergedBulbs, this.streetlightBulbMat);
      slObject.add(bulbMesh);

      // Volumetric light cone
      const coneMesh = new THREE.Mesh(this.lightConeGeo, isLED ? this.lightConeMatLED : this.lightConeMatSodium);
      coneMesh.position.set(armDirX * 1.3, 0.25, 0);
      coneMesh.name = "lightCone";
      slObject.add(coneMesh);

      // Baked ground light pool under streetlight 1
      const poolMesh1Name = `poolMesh_${lights.length}`;
      const poolMesh1 = new THREE.Mesh(
        this.lightPoolGeo,
        (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
      );
      poolMesh1.name = poolMesh1Name;
      poolMesh1.position.set(armDirX * 1.3, -3.89, 0);
      slObject.add(poolMesh1);

      const poolMesh2Name = `poolMesh_${lights.length + 1}`;
      if (isDoubleArm) {
        // Volumetric light cone 2
        const coneMesh2 = new THREE.Mesh(this.lightConeGeo, isLED ? this.lightConeMatLED : this.lightConeMatSodium);
        coneMesh2.position.set(-armDirX * 1.3, 0.25, 0);
        coneMesh2.name = "lightCone";
        slObject.add(coneMesh2);

        // Baked ground light pool under streetlight 2
        poolMesh2 = new THREE.Mesh(
          this.lightPoolGeo,
          (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
        );
        poolMesh2.name = poolMesh2Name;
        poolMesh2.position.set(-armDirX * 1.3, -3.89, 0);
        slObject.add(poolMesh2);

        const flare2Params = {
          color: lightColor,
          transparent: true,
          opacity: 0.70,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        };
        if (this.slFlareTex) flare2Params.map = this.slFlareTex;
        const flare2 = new THREE.Sprite(new THREE.SpriteMaterial(flare2Params));
        flare2.name = `flare_${localFlares.length}`;
        flare2.position.set(-armDirX * 1.3, 4.15, 0);
        flare2.scale.set(3.8, 3.8, 1.0);
        slObject.add(flare2);
        localFlares.push(flare2);
      }

      // Add glowing lens flare sprite
      const flareParams = {
        color: lightColor,
        transparent: true,
        opacity: 0.70,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      };
      if (this.slFlareTex) flareParams.map = this.slFlareTex;
      const flareSpriteMat = new THREE.SpriteMaterial(flareParams);
      const flare = new THREE.Sprite(flareSpriteMat);
      flare.name = `flare_${localFlares.length}`;
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
        poolMeshName: poolMesh1Name,
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
          poolMeshName: poolMesh2Name,
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
      const tlIndex = this.trafficLights.length;
      const xRedName = `tl_red_${tlIndex}_x`;
      xRed.name = xRedName;
      const xYellowName = `tl_yellow_${tlIndex}_x`;
      xYellow.name = xYellowName;
      const xGreenName = `tl_green_${tlIndex}_x`;
      xGreen.name = xGreenName;

      this.trafficLights.push({
        tileX: posX,
        tileZ: posZ,
        intersectionX: posX,
        intersectionZ: posZ,
        axis: 'x',
        redName: xRedName,
        yellowName: xYellowName,
        greenName: xGreenName,
        redMesh: xRed,
        yellowMesh: xYellow,
        greenMesh: xGreen
      });

      const zRedName = `tl_red_${tlIndex + 1}_z`;
      zRed.name = zRedName;
      const zYellowName = `tl_yellow_${tlIndex + 1}_z`;
      zYellow.name = zYellowName;
      const zGreenName = `tl_green_${tlIndex + 1}_z`;
      zGreen.name = zGreenName;

      this.trafficLights.push({
        tileX: posX,
        tileZ: posZ,
        intersectionX: posX,
        intersectionZ: posZ,
        axis: 'z',
        redName: zRedName,
        yellowName: zYellowName,
        greenName: zGreenName,
        redMesh: zRed,
        yellowMesh: zYellow,
        greenMesh: zGreen
      });

      const slGroupName = `slObject_${this.breakables.length}`;
      slObject.name = slGroupName;

      this.breakables.push({
        type: 'trafficlight',
        position: new THREE.Vector3(slX, h, slZ),
        groupName: slGroupName,
        group: slObject,
        flareNames: localFlares.map(f => f.name),
        flares: localFlares,
        lightIndices: localLights.map(l => lights.indexOf(l)),
        lights: localLights,
        poolMeshNames: isDoubleArm ? [poolMesh1Name, poolMesh2Name] : [poolMesh1Name],
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
      sw1.translate(0, 0.175, roadWidth / 2 + sidewalkWidth / 2);
      const sw2 = new THREE.BoxGeometry(this.tileSize, 0.35, sidewalkWidth, 8, 1, 2);
      applySidewalkUVs(sw2);
      sw2.translate(0, 0.175, -roadWidth / 2 - sidewalkWidth / 2);
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

      const zPositiveSide = posZ + roadWidth / 2 + sidewalkWidth / 2;
      const zNegativeSide = posZ - roadWidth / 2 - sidewalkWidth / 2;

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
        const sy = posZ + roadWidth / 2 + sidewalkWidth / 2;
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

        // Volumetric light cone
        const coneMesh = new THREE.Mesh(this.lightConeGeo, isLED ? this.lightConeMatLED : this.lightConeMatSodium);
        coneMesh.position.set(0, 0.25, -1.3);
        coneMesh.name = "lightCone";
        slObject.add(coneMesh);

        // Baked ground light pool under streetlight 1
        const poolMesh1Name = `poolMesh_${lights.length}`;
        const poolMesh1 = new THREE.Mesh(
          this.lightPoolGeo,
          (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
        );
        poolMesh1.name = poolMesh1Name;
        poolMesh1.position.set(0, -3.89, -1.3);
        slObject.add(poolMesh1);

        // Add glowing lens flare sprite
        const flareName = `flare_0`;
        const flare = new THREE.Sprite(new THREE.SpriteMaterial({
          map: this.slFlareTex,
          color: lightColor,
          transparent: true,
          opacity: 0.70,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        }));
        flare.name = flareName;
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
          poolMeshName: poolMesh1Name,
          poolMesh: poolMesh1,
          defaultOpacity: isLED ? 0.16 : 0.22
        };
        lights.push(lightSrc1);

        const slGroupName = `slObject_${this.breakables.length}`;
        slObject.name = slGroupName;

        // Register in the breakables array
        this.breakables.push({
          type: 'streetlight',
          position: new THREE.Vector3(posX, h, sy),
          groupName: slGroupName,
          group: slObject,
          flareNames: [flareName],
          flares: [flare],
          lightIndices: [lights.indexOf(lightSrc1)],
          lights: [lightSrc1],
          poolMeshNames: [poolMesh1Name],
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
          const sy2 = posZ - roadWidth / 2 - sidewalkWidth / 2;
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

          // Volumetric light cone 2
          const coneMesh2 = new THREE.Mesh(this.lightConeGeo, isLED ? this.lightConeMatLED : this.lightConeMatSodium);
          coneMesh2.position.set(0, 0.25, 1.3);
          coneMesh2.name = "lightCone";
          slObject2.add(coneMesh2);

          const poolMesh2Name = `poolMesh_${lights.length}`;
          const poolMesh2 = new THREE.Mesh(
            this.lightPoolGeo,
            (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
          );
          poolMesh2.name = poolMesh2Name;
          poolMesh2.position.set(0, -3.89, 1.3);
          slObject2.add(poolMesh2);

          const flare2Name = `flare_0`;
          const flare2 = new THREE.Sprite(new THREE.SpriteMaterial({
            map: this.slFlareTex,
            color: lightColor,
            transparent: true,
            opacity: 0.70,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          }));
          flare2.name = flare2Name;
          flare2.position.set(0, 4.15, 1.3);
          flare2.scale.set(3.8, 3.8, 1.0);
          slObject2.add(flare2);

          const lightSrc2 = {
            x: posX,
            y: 7.5 + h2,
            z: sy2 + 1.3,
            intensity: 26.0,
            color: lightColor,
            poolMeshName: poolMesh2Name,
            poolMesh: poolMesh2,
            defaultOpacity: isLED ? 0.16 : 0.22
          };
          lights.push(lightSrc2);

          const slGroupName2 = `slObject_${this.breakables.length}`;
          slObject2.name = slGroupName2;

          this.breakables.push({
            type: 'streetlight',
            position: new THREE.Vector3(posX, h2, sy2),
            groupName: slGroupName2,
            group: slObject2,
            flareNames: [flare2Name],
            flares: [flare2],
            lightIndices: [lights.indexOf(lightSrc2)],
            lights: [lightSrc2],
            poolMeshNames: [poolMesh2Name],
            poolMeshes: [poolMesh2],
            broken: false,
            tileX: posX,
            tileZ: posZ,
            velocity: new THREE.Vector3(),
            angularVelocity: new THREE.Vector3()
          });
        }
      }
      // Strictly ONE maintenance zone per 12-tile stretch (480 meters)
      if (!isIntersection) {
        // Prevent spawning on extremely short roads
        let blockLen = 1;
        for (let z = gridZ - 1; !this.roadRows.has(z) && z > gridZ - 20; z--) blockLen++;
        for (let z = gridZ + 1; !this.roadRows.has(z) && z < gridZ + 20; z++) blockLen++;

        if (blockLen >= 5) {
          const chunkZ = Math.floor(gridZ / 12);
          const seed = Math.sin(gridX * 12.9898 + chunkZ * 78.233) * 43758.5453;
          const targetZOffset = Math.floor((seed - Math.floor(seed)) * 12);
          const currentOffset = ((gridZ % 12) + 12) % 12;

          if (currentOffset === targetZOffset) {
            const sideSeed = Math.sin(gridX * 7.123 + chunkZ * 19.456) * 43758.5453;
            const side = (sideSeed - Math.floor(sideSeed)) > 0.5 ? 1 : -1;
            buildMaintenanceZone.call(this, gridX, gridZ, posX, posZ, roadWidth, sidewalkWidth, true, side, group, obstacles, lights, coneTransforms, localConeBreakables);
          }
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
      sw1.translate(roadWidth / 2 + sidewalkWidth / 2, 0.175, 0);
      const sw2 = new THREE.BoxGeometry(sidewalkWidth, 0.35, this.tileSize, 2, 1, 8);
      applySidewalkUVs(sw2);
      sw2.translate(-roadWidth / 2 - sidewalkWidth / 2, 0.175, 0);
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

      const xPositiveSide = posX + roadWidth / 2 + sidewalkWidth / 2;
      const xNegativeSide = posX - roadWidth / 2 - sidewalkWidth / 2;

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
      }

      // Spawn streetlight (excluding intersections)
      if (gridZ % 2 === 0 && !isIntersection) {
        const sx = posX + roadWidth / 2 + sidewalkWidth / 2;
        const isLED = Math.sin(sx * 5.0 + posZ * 3.0) > 0.0;
        const lightColor = isLED ? 0xd2e5ff : 0xffd5a1;

        // Main streetlight (Positive side)
        const slObject = new THREE.Group();
        const h = this.getBaseHeight(sx, posZ);
        slObject.position.set(sx, 4.25 + h, posZ); // Centered at Center of Mass (y=4.25)
        group.add(slObject);

        // Pole and arm merged geometry
        const poleGeoms = [];
        const poleGeo = new THREE.BoxGeometry(0.3, 8.5, 0.3);
        poleGeoms.push(poleGeo);

        const armGeo = new THREE.BoxGeometry(1.3, 0.15, 0.15);
        armGeo.translate(-0.65, 4.15, 0);
        poleGeoms.push(armGeo);

        const mergedPoles = BufferGeometryUtils.mergeGeometries(poleGeoms);
        const poleMesh = new THREE.Mesh(mergedPoles, this.streetlightPoleMat);
        poleMesh.castShadow = true;
        slObject.add(poleMesh);

        // Bulb geometry local (local y offset is 8.4 - 4.25 = 4.15)
        const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.6), this.streetlightBulbMat);
        bulb.position.set(-1.3, 4.15, 0);
        slObject.add(bulb);

        // Volumetric light cone
        const coneMesh = new THREE.Mesh(this.lightConeGeo, isLED ? this.lightConeMatLED : this.lightConeMatSodium);
        coneMesh.position.set(-1.3, 0.25, 0);
        coneMesh.name = "lightCone";
        slObject.add(coneMesh);

        // Baked ground light pool under streetlight 1
        const poolMesh1Name = `poolMesh_${lights.length}`;
        const poolMesh1 = new THREE.Mesh(
          this.lightPoolGeo,
          (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
        );
        poolMesh1.name = poolMesh1Name;
        poolMesh1.position.set(-1.3, -3.89, 0);
        slObject.add(poolMesh1);

        // Add glowing lens flare sprite
        const flareName = `flare_0`;
        const flare = new THREE.Sprite(new THREE.SpriteMaterial({
          map: this.slFlareTex,
          color: lightColor,
          transparent: true,
          opacity: 0.70,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        }));
        flare.name = flareName;
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
          poolMeshName: poolMesh1Name,
          poolMesh: poolMesh1,
          defaultOpacity: isLED ? 0.16 : 0.22
        };
        lights.push(lightSrc1);

        const slGroupName = `slObject_${this.breakables.length}`;
        slObject.name = slGroupName;

        // Register in the breakables array
        this.breakables.push({
          type: 'streetlight',
          position: new THREE.Vector3(sx, h, posZ),
          groupName: slGroupName,
          group: slObject,
          flareNames: [flareName],
          flares: [flare],
          lightIndices: [lights.indexOf(lightSrc1)],
          lights: [lightSrc1],
          poolMeshNames: [poolMesh1Name],
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
          const sx2 = posX - roadWidth / 2 - sidewalkWidth / 2;
          const slObject2 = new THREE.Group();
          const h2 = this.getBaseHeight(sx2, posZ);
          slObject2.position.set(sx2, 4.25 + h2, posZ);
          group.add(slObject2);

          const poleGeoms = [];
          const poleGeo = new THREE.BoxGeometry(0.3, 8.5, 0.3);
          poleGeoms.push(poleGeo);

          const armGeo = new THREE.BoxGeometry(1.3, 0.15, 0.15);
          armGeo.translate(0.65, 4.15, 0);
          poleGeoms.push(armGeo);

          const mergedPoles = BufferGeometryUtils.mergeGeometries(poleGeoms);
          const pole2 = new THREE.Mesh(mergedPoles, this.streetlightPoleMat);
          pole2.castShadow = true;
          slObject2.add(pole2);

          const bulb2 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.6), this.streetlightBulbMat);
          bulb2.position.set(1.3, 4.15, 0); // Offset towards the road (+X)
          slObject2.add(bulb2);

          // Volumetric light cone 2
          const coneMesh2 = new THREE.Mesh(this.lightConeGeo, isLED ? this.lightConeMatLED : this.lightConeMatSodium);
          coneMesh2.position.set(1.3, 0.25, 0);
          coneMesh2.name = "lightCone";
          slObject2.add(coneMesh2);

          const poolMesh2Name = `poolMesh_${lights.length}`;
          const poolMesh2 = new THREE.Mesh(
            this.lightPoolGeo,
            (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
          );
          poolMesh2.name = poolMesh2Name;
          poolMesh2.position.set(1.3, -3.89, 0);
          slObject2.add(poolMesh2);

          const flare2Name = `flare_0`;
          const flare2 = new THREE.Sprite(new THREE.SpriteMaterial({
            map: this.slFlareTex,
            color: lightColor,
            transparent: true,
            opacity: 0.70,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          }));
          flare2.name = flare2Name;
          flare2.position.set(1.3, 4.15, 0);
          flare2.scale.set(3.8, 3.8, 1.0);
          slObject2.add(flare2);

          const lightSrc2 = {
            x: sx2 + 1.3,
            y: 7.5 + h2,
            z: posZ,
            intensity: 26.0,
            color: lightColor,
            poolMeshName: poolMesh2Name,
            poolMesh: poolMesh2,
            defaultOpacity: isLED ? 0.16 : 0.22
          };
          lights.push(lightSrc2);

          const slGroupName2 = `slObject_${this.breakables.length}`;
          slObject2.name = slGroupName2;

          this.breakables.push({
            type: 'streetlight',
            position: new THREE.Vector3(sx2, h2, posZ),
            groupName: slGroupName2,
            group: slObject2,
            flareNames: [flare2Name],
            flares: [flare2],
            lightIndices: [lights.indexOf(lightSrc2)],
            lights: [lightSrc2],
            poolMeshNames: [poolMesh2Name],
            poolMeshes: [poolMesh2],
            broken: false,
            tileX: posX,
            tileZ: posZ,
            velocity: new THREE.Vector3(),
            angularVelocity: new THREE.Vector3()
          });
        }
      }
      // Strictly ONE maintenance zone per 12-tile stretch (480 meters)
      if (!isIntersection) {
        // Prevent spawning on extremely short roads
        let blockLen = 1;
        for (let x = gridX - 1; !this.roadColumns.has(x) && x > gridX - 20; x--) blockLen++;
        for (let x = gridX + 1; !this.roadColumns.has(x) && x < gridX + 20; x++) blockLen++;

        if (blockLen >= 5) {
          const chunkX = Math.floor(gridX / 12);
          const seed = Math.sin(chunkX * 12.9898 + gridZ * 78.233) * 43758.5453;
          const targetXOffset = Math.floor((seed - Math.floor(seed)) * 12);
          const currentOffset = ((gridX % 12) + 12) % 12;

          if (currentOffset === targetXOffset) {
            const sideSeed = Math.sin(chunkX * 7.123 + gridZ * 19.456) * 43758.5453;
            const side = (sideSeed - Math.floor(sideSeed)) > 0.5 ? 1 : -1;
            buildMaintenanceZone.call(this, gridX, gridZ, posX, posZ, roadWidth, sidewalkWidth, false, side, group, obstacles, lights, coneTransforms, localConeBreakables);
          }
        }
      }
    }
  }


  const instantiateProps = (transforms, templateName, breakableList) => {
    if (transforms.length === 0) return;
    const template = this.templates[templateName];
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
      group.add(im);
      instancedMeshes.push(im);
    });
    breakableList.forEach(b => {
      b.instancedMeshNames = template.children.map((_, childIdx) => `instanced_${templateName}_${childIdx}`);
      b.instancedMeshes = instancedMeshes;
    });
  };

  instantiateProps(benchTransforms, 'bench', localBenchBreakables);
  instantiateProps(hydrantTransforms, 'fireHydrant', localHydrantBreakables);
  instantiateProps(phoneBoothTransforms, 'phoneBooth', localPhoneBoothBreakables);
  instantiateProps(trashCanTransforms, 'trashCan', localTrashCanBreakables);
  instantiateProps(coneTransforms, 'cone', localConeBreakables);

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



  // Merge and instantiate Newspaper Boxes
  if (localBodyNewspaperGeoms.length > 0) {
    const mergedBody = BufferGeometryUtils.mergeGeometries(localBodyNewspaperGeoms);
    const newspaperBodyMesh = new THREE.Mesh(mergedBody, this.newspaperBodyMat);
    newspaperBodyMesh.castShadow = true;
    newspaperBodyMesh.receiveShadow = true;
    group.add(newspaperBodyMesh);
  }
  if (localGlassNewspaperGeoms.length > 0) {
    const mergedGlass = BufferGeometryUtils.mergeGeometries(localGlassNewspaperGeoms);
    const newspaperGlassMesh = new THREE.Mesh(mergedGlass, this.newspaperGlassMat);
    group.add(newspaperGlassMesh);
  }
  if (localPaperNewspaperGeoms.length > 0) {
    const mergedPaper = BufferGeometryUtils.mergeGeometries(localPaperNewspaperGeoms);
    const newspaperPaperMesh = new THREE.Mesh(mergedPaper, this.newspaperPaperMat);
    group.add(newspaperPaperMesh);
  }
}
