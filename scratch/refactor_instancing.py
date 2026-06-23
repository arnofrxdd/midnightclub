import os

road_tile_path = r"d:\INTERNSHIP\midnight club\src\world\roadTile.js"
with open(road_tile_path, "r", encoding="utf-8") as f:
    road_content = f.read()

# Add transforms arrays
transforms_decl = """
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
    const localBenchBreakables = [];
    const localHydrantBreakables = [];
    const localPhoneBoothBreakables = [];
    const localTrashCanBreakables = [];
"""
road_content = road_content.replace(
    "    const localPaperNewspaperGeoms = [];",
    "    const localPaperNewspaperGeoms = [];\n\n    const benchTransforms = [];\n    const hydrantTransforms = [];\n    const phoneBoothTransforms = [];\n    const trashCanTransforms = [];\n    const localBenchBreakables = [];\n    const localHydrantBreakables = [];\n    const localPhoneBoothBreakables = [];\n    const localTrashCanBreakables = [];"
)

# Refactor addBench
old_bench = """    const addBench = (bx, bz, rotY) => {
      const h = this.getBaseHeight(bx, bz);
      if (Math.abs(h) > 0.1) return;
      const bench = this.templates.bench.clone();
      bench.position.set(bx, 0.6 + h, bz);
      bench.rotation.y = rotY;
      group.add(bench);
      
      this.breakables.push({
        type: 'bench',
        comHeight: 0.6,
        radius: 0.4,
        position: new THREE.Vector3(bx, 0.6 + h, bz),
        group: bench,
        flares: [],
        lights: [],
        broken: false,
        tileX: posX,
        tileZ: posZ,
        velocity: new THREE.Vector3(),
        angularVelocity: new THREE.Vector3()
      });
    };"""

new_bench = """    const addBench = (bx, bz, rotY) => {
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
    };"""
road_content = road_content.replace(old_bench, new_bench)

# Refactor addFireHydrant
old_hydrant = """    const addFireHydrant = (fhx, fhz) => {
      const h = this.getBaseHeight(fhx, fhz);
      if (Math.abs(h) > 0.1) return;

      const hydrant = this.templates.fireHydrant.clone();
      // Position hydrant base on curb (offset slightly up by 0.35m to match template alignment)
      hydrant.position.set(fhx, 0.35 + h, fhz);
      group.add(hydrant);
      
      this.breakables.push({
        type: 'hydrant',
        comHeight: 0.35,
        radius: 0.25,
        position: new THREE.Vector3(fhx, 0.35 + h, fhz),
        group: hydrant,
        flares: [],
        lights: [],
        broken: false,
        tileX: posX,
        tileZ: posZ,
        velocity: new THREE.Vector3(),
        angularVelocity: new THREE.Vector3()
      });
    };"""

new_hydrant = """    const addFireHydrant = (fhx, fhz) => {
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
    };"""
road_content = road_content.replace(old_hydrant, new_hydrant)

# Refactor addPhoneBooth
old_phone = """    const addPhoneBooth = (pbx, pbz, rotY) => {
      const h = this.getBaseHeight(pbx, pbz);
      if (Math.abs(h) > 0.1) return;
      const pb = this.templates.phoneBooth.clone();
      pb.position.set(pbx, 1.4 + h, pbz);
      pb.rotation.y = rotY;
      group.add(pb);
      
      this.breakables.push({
        type: 'phonebooth',
        comHeight: 1.4,
        radius: 0.6,
        position: new THREE.Vector3(pbx, 1.4 + h, pbz),
        group: pb,
        flares: [],
        lights: [],
        broken: false,
        tileX: posX,
        tileZ: posZ,
        velocity: new THREE.Vector3(),
        angularVelocity: new THREE.Vector3()
      });
    };"""

new_phone = """    const addPhoneBooth = (pbx, pbz, rotY) => {
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
    };"""
road_content = road_content.replace(old_phone, new_phone)

# Refactor addTrashCan
old_trash = """    const addTrashCan = (tcx, tcz) => {
      const h = this.getBaseHeight(tcx, tcz);
      if (Math.abs(h) > 0.1) return;
      const tc = this.templates.trashCan.clone();
      tc.position.set(tcx, 0.5 + h, tcz);
      tc.rotation.y = Math.random() * Math.PI * 2;
      group.add(tc);
      
      this.breakables.push({
        type: 'trashcan',
        comHeight: 0.5,
        radius: 0.3,
        position: new THREE.Vector3(tcx, 0.5 + h, tcz),
        group: tc,
        flares: [],
        lights: [],
        broken: false,
        tileX: posX,
        tileZ: posZ,
        velocity: new THREE.Vector3(),
        angularVelocity: new THREE.Vector3()
      });
    };"""

new_trash = """    const addTrashCan = (tcx, tcz) => {
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
    };"""
road_content = road_content.replace(old_trash, new_trash)


# At the end of buildRoadTile
instantiate_logic = """
    const instantiateProps = (transforms, templateName, breakableList) => {
      if (transforms.length === 0) return;
      const template = this.templates[templateName];
      const instancedMeshes = [];
      template.children.forEach((child) => {
        const im = new THREE.InstancedMesh(child.geometry, child.material, transforms.length);
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
      breakableList.forEach(b => b.instancedMeshes = instancedMeshes);
    };

    instantiateProps(benchTransforms, 'bench', localBenchBreakables);
    instantiateProps(hydrantTransforms, 'fireHydrant', localHydrantBreakables);
    instantiateProps(phoneBoothTransforms, 'phoneBooth', localPhoneBoothBreakables);
    instantiateProps(trashCanTransforms, 'trashCan', localTrashCanBreakables);

"""

road_content = road_content.replace(
    "    // Merge & instantiate collected geometries to minimize draw calls",
    instantiate_logic + "    // Merge & instantiate collected geometries to minimize draw calls"
)

with open(road_tile_path, "w", encoding="utf-8") as f:
    f.write(road_content)


# --- Breakables.js modifications ---
break_path = r"d:\INTERNSHIP\midnight club\src\gameplay\breakables.js"
with open(break_path, "r", encoding="utf-8") as f:
    break_content = f.read()

break_logic_old = """            // Detach b.group from its parent (the tile group) and add it to the global scene
            if (b.group && b.group.parent) {
              const worldPos = new THREE.Vector3();
              const worldQuat = new THREE.Quaternion();
              b.group.getWorldPosition(worldPos);
              b.group.getWorldQuaternion(worldQuat);
              
              b.group.parent.remove(b.group);
              
              b.group.position.copy(worldPos);
              b.group.quaternion.copy(worldQuat);
              
              this.scene.add(b.group);
            }"""

break_logic_new = """            // Handle Instanced Mesh breakables dynamically by spawning a real mesh to fly away
            if (b.isInstanced && b.instancedMeshes) {
              // Hide the specific instance from all instanced meshes representing this prop
              const zeroMatrix = new THREE.Matrix4().makeScale(0, 0, 0);
              b.instancedMeshes.forEach(im => {
                im.setMatrixAt(b.instanceId, zeroMatrix);
                im.instanceMatrix.needsUpdate = true;
              });
              
              // Spawn a real cloned mesh for the physics simulation
              b.group = this.world.templates[b.templateName].clone();
              b.group.position.copy(b.position);
              
              // Since it's a clone of the template, it starts with local rotation 0.
              // For benches and phone booths, we must restore original rotation from orientation.
              // Wait, the collision logic sets angular velocity, so physics will take over perfectly.
              // But if it had an initial Y rotation, we can infer it or let it fly.
              // Actually, we can just use the standard spawn.
              this.scene.add(b.group);
              b.isInstanced = false; // it is now a real mesh
            } else if (b.group && b.group.parent) {
              // Normal detached group logic
              const worldPos = new THREE.Vector3();
              const worldQuat = new THREE.Quaternion();
              b.group.getWorldPosition(worldPos);
              b.group.getWorldQuaternion(worldQuat);
              
              b.group.parent.remove(b.group);
              
              b.group.position.copy(worldPos);
              b.group.quaternion.copy(worldQuat);
              
              this.scene.add(b.group);
            }"""

break_content = break_content.replace(break_logic_old, break_logic_new)

with open(break_path, "w", encoding="utf-8") as f:
    f.write(break_content)

print("Done refactoring roadTile.js and breakables.js")
