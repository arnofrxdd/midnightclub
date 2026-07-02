import * as THREE from 'three';

export function createConeMesh() {
  const coneGroup = new THREE.Group();

  const baseGeo = new THREE.BoxGeometry(0.8, 0.08, 0.8);
  baseGeo.translate(0, -0.56, 0);
  const baseMesh = new THREE.Mesh(baseGeo, this.asphaltMat);
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  coneGroup.add(baseMesh);

  const bodyGeo = new THREE.CylinderGeometry(0.06, 0.26, 1.2, 12);
  bodyGeo.translate(0, 0.04, 0);
  const bodyMesh = new THREE.Mesh(bodyGeo, this.yellowLineMat);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  coneGroup.add(bodyMesh);

  const stripe1Geo = new THREE.CylinderGeometry(0.12, 0.16, 0.25, 12);
  stripe1Geo.translate(0, 0.25, 0);
  coneGroup.add(new THREE.Mesh(stripe1Geo, this.whiteLineMat));

  const stripe2Geo = new THREE.CylinderGeometry(0.18, 0.22, 0.20, 12);
  stripe2Geo.translate(0, -0.15, 0);
  coneGroup.add(new THREE.Mesh(stripe2Geo, this.whiteLineMat));

  return coneGroup;
}

export function createFireHydrantMesh() {
    const fh = new THREE.Group();
    const redMat = this.hydrantRedMat;
    const capMat = this.hydrantCapMat;
    
    const barrel = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.7, 0.35), redMat);
    barrel.position.y = 0.35;
    barrel.castShadow = true;
    fh.add(barrel);
    
    const topCap = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.1, 0.42), capMat);
    topCap.position.y = 0.75;
    fh.add(topCap);
    
    const nozzleL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.15, 0.12), capMat);
    nozzleL.position.set(-0.2, 0.45, 0);
    fh.add(nozzleL);
    
    const nozzleR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.15, 0.12), capMat);
    nozzleR.position.set(0.2, 0.45, 0);
    fh.add(nozzleR);

    return fh;
  }

export function createNewspaperBoxMesh() {
    const box = new THREE.Group();
    const bodyMat = this.newspaperBodyMat;
    const glassMat = this.newspaperGlassMat;
    const paperMat = this.newspaperPaperMat;
    
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.1, 0.8), bodyMat);
    body.position.y = 0.55;
    body.castShadow = true;
    body.receiveShadow = true;
    box.add(body);
    
    const glass = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 0.05), glassMat);
    glass.position.set(0, 0.75, 0.41);
    box.add(glass);
    
    const paper = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.5), paperMat);
    paper.position.set(0, 0.35, 0.1);
    box.add(paper);
    
    return box;
  }

export function spawnTemplateTree(x, z, group, obstacles) {
    const seed = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453;
    const rand = seed - Math.floor(seed);
    
    // Choose template based on shape and color
    let template;
    if (rand < 0.5) {
      // Pine shape
      if (rand < 0.1) {
        template = this.templates.treeAutumn;
      } else if (rand < 0.25) {
        template = this.templates.treeCherry;
      } else {
        template = this.templates.treeGreen;
      }
    } else {
      // Round shape
      if (rand > 0.9) {
        template = this.templates.treeRoundAutumn;
      } else if (rand > 0.75) {
        template = this.templates.treeRoundCherry;
      } else {
        template = this.templates.treeRoundGreen;
      }
    }
    
    const tree = template.clone();
    
    // Random scale for size variety (between 0.7 and 1.35)
    const scale = 0.7 + rand * 0.65;
    tree.scale.set(scale, scale, scale);
    
    const h = this.getBaseHeight(x, z);
    tree.position.set(x, 0.35 + h, z);
    group.add(tree);

    obstacles.push({
      xMin: x - 0.4 * scale,
      xMax: x + 0.4 * scale,
      zMin: z - 0.4 * scale,
      zMax: z + 0.4 * scale,
      height: 6 * scale
    });
  }

export function createBenchMesh() {
    const benchGroup = new THREE.Group();
    // Seat (y centered at 0.6, seat is at y=0.5, so local y = -0.1)
    const seat = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.1, 0.8), this.benchWoodMat);
    seat.position.set(0, -0.1, 0);
    seat.castShadow = true;
    seat.receiveShadow = true;
    benchGroup.add(seat);

    // Backrest (local y = 0.25, z = -0.35)
    const backrest = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.6, 0.1), this.benchWoodMat);
    backrest.position.set(0, 0.25, -0.35);
    backrest.castShadow = true;
    benchGroup.add(backrest);

    // Legs (local y = -0.35)
    const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.8), this.benchIronMat);
    leg1.position.set(-0.9, -0.35, 0);
    leg1.castShadow = true;
    benchGroup.add(leg1);

    const leg2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.8), this.benchIronMat);
    leg2.position.set(0.9, -0.35, 0);
    leg2.castShadow = true;
    benchGroup.add(leg2);

    return benchGroup;
  }

export function createPhoneBoothMesh() {
    const pbGroup = new THREE.Group();
    // Base (y centered at 1.4, base is at y=0.075, so local y = -1.325)
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.15, 1.2), this.phoneBoothFrameMat);
    base.position.set(0, -1.325, 0);
    base.castShadow = true;
    base.receiveShadow = true;
    pbGroup.add(base);

    // Roof (local y = 1.325)
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.15, 1.2), this.phoneBoothFrameMat);
    roof.position.set(0, 1.325, 0);
    roof.castShadow = true;
    pbGroup.add(roof);

    // Pillars (4 corners)
    const pillarGeo = new THREE.BoxGeometry(0.1, 2.5, 0.1);
    const p1 = new THREE.Mesh(pillarGeo, this.phoneBoothFrameMat);
    p1.position.set(-0.55, 0, -0.55);
    p1.castShadow = true;
    pbGroup.add(p1);

    const p2 = new THREE.Mesh(pillarGeo, this.phoneBoothFrameMat);
    p2.position.set(0.55, 0, -0.55);
    p2.castShadow = true;
    pbGroup.add(p2);

    const p3 = new THREE.Mesh(pillarGeo, this.phoneBoothFrameMat);
    p3.position.set(-0.55, 0, 0.55);
    p3.castShadow = true;
    pbGroup.add(p3);

    const p4 = new THREE.Mesh(pillarGeo, this.phoneBoothFrameMat);
    p4.position.set(0.55, 0, 0.55);
    p4.castShadow = true;
    pbGroup.add(p4);

    // Glass Panes (Left, Right, Back)
    const glassSide = new THREE.Mesh(new THREE.BoxGeometry(0.04, 2.3, 1.0), this.phoneBoothGlassMat);
    glassSide.position.set(-0.54, 0, 0);
    pbGroup.add(glassSide);

    const glassSide2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 2.3, 1.0), this.phoneBoothGlassMat);
    glassSide2.position.set(0.54, 0, 0);
    pbGroup.add(glassSide2);

    const glassBack = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.3, 0.04), this.phoneBoothGlassMat);
    glassBack.position.set(0, 0, -0.54);
    pbGroup.add(glassBack);

    // Phone box unit inside
    const phoneBox = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, 0.2), this.benchIronMat);
    phoneBox.position.set(0, 0.1, -0.4);
    pbGroup.add(phoneBox);

    // Glowing screen
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.02), this.phoneBoothScreenMat);
    screen.position.set(0, 0.2, -0.29);
    pbGroup.add(screen);

    return pbGroup;
  }

export function createTrashCanMesh() {
    const tcGroup = new THREE.Group();
    // Main body (y centered at 0.5, local y = 0)
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.9, 0.6), this.trashCanMat);
    body.position.set(0, -0.05, 0);
    body.castShadow = true;
    body.receiveShadow = true;
    tcGroup.add(body);

    // Lid
    const lid = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.1, 0.64), this.trashCanLidMat);
    lid.position.set(0, 0.45, 0);
    lid.castShadow = true;
    tcGroup.add(lid);

    return tcGroup;
  }

