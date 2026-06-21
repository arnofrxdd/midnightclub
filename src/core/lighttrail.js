import * as THREE from 'three';

export class LightTrail {
  constructor(scene, color = 0xff0000, width = 0.22, maxPoints = 20) {
    this.scene = scene;
    this.color = color;
    this.width = width;
    this.maxPoints = maxPoints;
    this.history = [];
    
    this.geometry = new THREE.BufferGeometry();
    
    const numVertices = maxPoints * 2;
    const positions = new Float32Array(numVertices * 3);
    const uvs = new Float32Array(numVertices * 2);
    
    for (let i = 0; i < maxPoints; i++) {
      const u = i / (maxPoints - 1);
      uvs[i * 4] = u;
      uvs[i * 4 + 1] = 0;
      uvs[i * 4 + 2] = u;
      uvs[i * 4 + 3] = 1;
    }
    
    const indices = [];
    for (let i = 0; i < maxPoints - 1; i++) {
      const v0 = i * 2;
      const v1 = i * 2 + 1;
      const v2 = (i + 1) * 2;
      const v3 = (i + 1) * 2 + 1;
      indices.push(v0, v1, v2);
      indices.push(v1, v3, v2);
    }
    
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    this.geometry.setIndex(indices);
    
    this.material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.frustumCulled = false;
    this.scene.add(this.mesh);

    // Preallocate scratch vectors used every frame
    this._upVec = new THREE.Vector3();
    this._vA   = new THREE.Vector3();
    this._vB   = new THREE.Vector3();
  }

  update(currentPos, dt, active = true) {
    if (active) {
      // Reuse scratch vectors — no heap allocation
      this._upVec.set(0, this.width / 2, 0);
      this._vA.copy(currentPos).add(this._upVec);
      this._vB.copy(currentPos).sub(this._upVec);
      // Push object (cheap push, not unshift)
      this.history.push({ vA: this._vA.clone(), vB: this._vB.clone(), age: 0 });
    }
    
    const maxAge = 0.45;
    // Iterate forward and count expired entries to splice in bulk
    let expiredCount = 0;
    for (let i = 0; i < this.history.length; i++) {
      this.history[i].age += dt;
      if (this.history[i].age >= maxAge) expiredCount++;
    }
    if (expiredCount > 0) this.history.splice(0, expiredCount);
    
    if (this.history.length < 2) {
      this.mesh.visible = false;
      return;
    }
    this.mesh.visible = true;
    
    const positions = this.geometry.attributes.position.array;
    for (let i = 0; i < this.maxPoints; i++) {
      const hIndex = Math.min(i, this.history.length - 1);
      const h = this.history[hIndex];
      
      const fade = 1.0 - (h.age / maxAge);
      const widthFactor = fade;
      
      // Pure scalar math — zero heap allocation (was 4x new THREE.Vector3 per point)
      const midX = (h.vA.x + h.vB.x) * 0.5;
      const midY = (h.vA.y + h.vB.y) * 0.5;
      const midZ = (h.vA.z + h.vB.z) * 0.5;
      const hwX  = (h.vA.x - midX) * widthFactor;
      const hwY  = (h.vA.y - midY) * widthFactor;
      const hwZ  = (h.vA.z - midZ) * widthFactor;
      
      positions[i * 6]     = midX + hwX;
      positions[i * 6 + 1] = midY + hwY;
      positions[i * 6 + 2] = midZ + hwZ;
      positions[i * 6 + 3] = midX - hwX;
      positions[i * 6 + 4] = midY - hwY;
      positions[i * 6 + 5] = midZ - hwZ;
    }
    
    this.geometry.attributes.position.needsUpdate = true;
    // frustumCulled = false so no bounding sphere is needed — skip the expensive recompute every frame
  }

  destroy() {
    this.scene.remove(this.mesh);
    this.geometry.dispose();
    this.material.dispose();
  }
}
