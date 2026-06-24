import * as THREE from 'three';
import { createSkidmarkTexture } from './textures.js';

// Preallocated scratch vectors for skidmark calculations to avoid per-frame allocations
const _skidMidpoint = new THREE.Vector3();
const _skidDir = new THREE.Vector3();
const _skidTarget = new THREE.Vector3();
const _particleViewProjection = new THREE.Matrix4();
const _particleFrustum = new THREE.Frustum();
const _particleWorldPos = new THREE.Vector3();
const _particleCullDistanceSq = 120 * 120;

function shouldUpdateParticle(app, mesh) {
  if (!app || !app.camera) return true;
  _particleWorldPos.setFromMatrixPosition(mesh.matrixWorld);

  const cameraPos = app.camera.position;
  if (cameraPos.distanceToSquared(_particleWorldPos) > _particleCullDistanceSq) {
    return false;
  }

  // Frustum is now updated ONCE per frame inside updateParticles()
  return _particleFrustum.containsPoint(_particleWorldPos);
}

export function getParticleMaterial(color, opacity) {
  const roundedOpacity = Math.round(opacity * 20) / 20; // 20 discrete steps
  const key = `${color}_${roundedOpacity}`;
  if (!this.particleMaterialCache) this.particleMaterialCache = {};
  if (!this.particleMaterialCache[key]) {
    this.particleMaterialCache[key] = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.9,
      transparent: true,
      opacity: roundedOpacity,
      depthWrite: false
    });
  }
  return this.particleMaterialCache[key];
}

export function getSmokeMaterial(color, opacity) {
  const roundedOpacity = Math.round(opacity * 20) / 20;
  const key = `${color}_${roundedOpacity}`;
  if (!this.smokeMaterialCache) this.smokeMaterialCache = {};
  if (!this.smokeMaterialCache[key]) {
    this.smokeMaterialCache[key] = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: roundedOpacity,
      depthWrite: false
    });
  }
  return this.smokeMaterialCache[key];
}

export function initParticles() {
  // Particle pool: 140 for smoke, 80 for water, 60 for sparks
  this.particlePool = [];
  this.maxParticles = 280;

  const pGeo = new THREE.BoxGeometry(0.25, 0.25, 0.25);

  for (let i = 0; i < this.maxParticles; i++) {
    const isWater = (i >= 140 && i < 220);
    const isSpark = (i >= 220);

    let pMat;
    if (isWater) {
      pMat = new THREE.MeshStandardMaterial({
        color: 0xaaddff,
        transparent: true,
        opacity: 0.4,
        roughness: 0.1,
        metalness: 0.8,
        depthWrite: false
      });
    } else if (isSpark) {
      pMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
    } else {
      pMat = new THREE.MeshBasicMaterial({
        color: 0xcccccc,
        transparent: true,
        opacity: 0.5,
        depthWrite: false
      });
    }

    const mesh = new THREE.Mesh(pGeo, pMat);
    mesh.visible = false;
    this.scene.add(mesh);

    this.particlePool.push({
      mesh: mesh,
      mat: pMat,   // direct reference — no lookup needed per frame
      life: 0,
      maxLife: 1.0,
      velocity: new THREE.Vector3(),
      isWater: isWater,
      isSpark: isSpark,
      color: isWater ? 0xaaddff : (isSpark ? 0xffffff : 0xcccccc)
    });
  }
}

export function initCheckpointSmoke() {
  // Separate particle pool for the towering checkpoint smoke columns
  this.smokePool = [];
  this.maxSmoke = 120;

  const sGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);

  for (let i = 0; i < this.maxSmoke; i++) {
    // Each smoke particle owns its material so opacity is mutated in-place
    const sMat = new THREE.MeshBasicMaterial({
      color: 0xffaa3a,
      transparent: true,
      opacity: 0.35,
      depthWrite: false
    });
    const mesh = new THREE.Mesh(sGeo, sMat);
    mesh.visible = false;
    this.scene.add(mesh);
    this.smokePool.push({
      mesh: mesh,
      mat: sMat,
      life: 0.0,
      maxLife: 2.0,
      velocity: new THREE.Vector3(),
      color: 0xffaa3a
    });
  }
}

export function initSkidmarks() {
  this.maxSkidmarks = 2000; // HUGE pool for persistent skidmarks
  this.skidIndex = 0;

  const skidGeo = new THREE.BoxGeometry(0.35, 0.01, 1.0);

  const treadTex = createSkidmarkTexture();
  treadTex.repeat.set(1, 4.0); // 4 repeats per meter

  const mat = new THREE.MeshStandardMaterial({
    map: treadTex,
    transparent: true,
    opacity: 0.85,
    roughness: 0.9,
    metalness: 0.1,
    depthWrite: false
  });

  this.skidmarkMesh = new THREE.InstancedMesh(skidGeo, mat, this.maxSkidmarks);
  this.skidmarkMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  this.skidmarkMesh.frustumCulled = false; // MUST be false, otherwise driving away from origin (0,0,0) makes all skidmarks disappear!
  this.scene.add(this.skidmarkMesh);

  // Hide all instances initially
  const dummy = new THREE.Object3D();
  dummy.scale.set(0, 0, 0);
  dummy.updateMatrix();
  for (let i = 0; i < this.maxSkidmarks; i++) {
    this.skidmarkMesh.setMatrixAt(i, dummy.matrix);
  }
  this.skidmarkMesh.instanceMatrix.needsUpdate = true;

  // Keep track of previous wheel positions for drawing lines
  this.prevLeftWheel = null;
  this.prevRightWheel = null;
  this._skidDummy = new THREE.Object3D();
}

export function spawnSkidmarkSegment(p1, p2) {
  const midpoint = _skidMidpoint.addVectors(p1, p2).multiplyScalar(0.5);

  // Determine height
  const ts = 40;
  const gridX = Math.round(p1.x / ts);
  const gridZ = Math.round(p1.z / ts);
  const isRoad = this.world.roadColumns.has(gridX) || this.world.roadRows.has(gridZ);
  const isIntersection = this.world.roadColumns.has(gridX) && this.world.roadRows.has(gridZ);

  let height = 0.24;
  if (isRoad && !isIntersection) {
    const localX = p1.x - gridX * ts;
    const localZ = p1.z - gridZ * ts;
    const { rwX, rwZ } = this.world.getRoadWidthForGrid(gridX, gridZ);
    if (this.world.roadRows.has(gridZ)) {
      if (Math.abs(localZ) > rwZ / 2) height = 0.39;
    } else {
      if (Math.abs(localX) > rwX / 2) height = 0.39;
    }
  } else if (!isRoad) {
    height = 0.39;
  }

  const baseHeight = this.world.getBaseHeight(midpoint.x, midpoint.z);
  midpoint.y = height + baseHeight;

  const dir = _skidDir.subVectors(p2, p1);
  const len = dir.length();
  if (len < 0.05) return;

  this._skidDummy.position.copy(midpoint);
  this._skidDummy.scale.set(1.0, 1.0, len);

  // Rotate to point along direction vector
  const target = _skidTarget.copy(p2);
  target.y = height + this.world.getBaseHeight(target.x, target.z);
  this._skidDummy.lookAt(target);
  this._skidDummy.updateMatrix();

  this.skidmarkMesh.setMatrixAt(this.skidIndex, this._skidDummy.matrix);
  this.skidmarkMesh.instanceMatrix.needsUpdate = true;

  this.skidIndex = (this.skidIndex + 1) % this.maxSkidmarks;
}

export function spawnParticles(pos, dir, color = 0x888888, count = 1, isWater = false, isSpark = false) {
  let spawned = 0;
  for (const p of this.particlePool) {
    if (p.life <= 0 && p.isWater === isWater && p.isSpark === isSpark) {
      p.mesh.position.copy(pos);
      p.mesh.visible = true;
      // Mutate the per-particle material color in-place (no material swap)
      if (p.color !== color) {
        p.color = color;
        p.mat.color.setHex(color);
      }
      p.mat.opacity = isWater ? 0.45 : (isSpark ? 1.0 : 0.4);
      p.life = isWater ? (0.35 + Math.random() * 0.35) : (isSpark ? (0.15 + Math.random() * 0.15) : (0.5 + Math.random() * 0.5));
      p.maxLife = p.life;
      p.isWater = isWater;
      p.isSpark = isSpark;

      if (isWater) {
        p.velocity.set(
          (Math.random() - 0.5) * 5.2 + dir.x * 4.2,
          Math.random() * 4.8 + 4.0,
          (Math.random() - 0.5) * 5.2 + dir.z * 4.2
        );
        p.mesh.scale.setScalar(0.6 + Math.random() * 0.6);
      } else if (isSpark) {
        // Sparks are high speed streaks of light bursting outward
        p.velocity.set(
          (Math.random() - 0.5) * 10.0 + dir.x * 10.0,
          Math.random() * 6.0 + 3.0 + (dir.y || 0) * 5.0,
          (Math.random() - 0.5) * 10.0 + dir.z * 10.0
        );
        p.mesh.scale.set(0.04, 0.04, 0.35);

        _skidTarget.copy(pos).add(p.velocity);
        p.mesh.lookAt(_skidTarget);
      } else {
        p.velocity.set(
          (Math.random() - 0.5) * 3 + dir.x * 1.5,
          Math.random() * 2 + 0.5,
          (Math.random() - 0.5) * 3 + dir.z * 1.5
        );
        p.mesh.scale.setScalar(1.0);
      }

      spawned++;
      if (spawned >= count) break;
    }
  }
}

export function spawnCheckpointSmoke(pos, color = 0xffaa3a, opacityScale = 1.0, sizeScale = 1.0) {
  for (const p of this.smokePool) {
    if (p.life <= 0) {
      const h = (this.world && typeof this.world.getGroundHeight === 'function')
        ? this.world.getGroundHeight(pos.x, pos.z)
        : 0.5;
      p.mesh.position.set(
        pos.x + (Math.random() - 0.5) * 6,
        h - 0.3,
        pos.z + (Math.random() - 0.5) * 6
      );
      p.mesh.visible = true;
      // Mutate color in-place on the per-particle material
      if (p.color !== color) {
        p.color = color;
        p.mat.color.setHex(color);
      }
      p.mat.opacity = 0.28 * opacityScale;
      p.life = (1.2 + Math.random() * 0.8) * sizeScale;
      p.maxLife = p.life;
      p.opacityScale = opacityScale;
      p.sizeScale = sizeScale;

      p.velocity.set(
        (Math.random() - 0.5) * 1.2,
        (10.0 + Math.random() * 6.0) * sizeScale,
        (Math.random() - 0.5) * 1.2
      );
      break;
    }
  }
}

export function updateParticles(dt) {
  // Update camera frustum exactly ONCE per frame here
  if (this.camera) {
    _particleViewProjection.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    _particleFrustum.setFromProjectionMatrix(_particleViewProjection);
  }

  for (const p of this.particlePool) {
    if (p.life > 0) {
      p.life -= dt;
      if (!shouldUpdateParticle(this, p.mesh)) {
        if (p.life <= 0) p.mesh.visible = false;
        continue;
      }
      p.mesh.position.addScaledVector(p.velocity, dt);

      if (p.isWater) {
        p.velocity.y -= 14.5 * dt;
        const factor = p.life / p.maxLife; // 1.0 at birth, 0.0 at death

        // Realistic splash animation: scale up to peak, then shrink/fade out
        const currentScale = p.maxLife * (0.6 + Math.sin(factor * Math.PI) * 1.1);
        p.mesh.scale.setScalar(currentScale);

        // Smooth fade in and out:
        p.mat.opacity = Math.sin(factor * Math.PI) * 0.45;

        // Floor check to prevent clipping through terrain
        const baseHeight = this.world.getBaseHeight(p.mesh.position.x, p.mesh.position.z);
        const floorY = 0.24 + baseHeight;
        if (p.mesh.position.y < floorY) {
          p.mesh.position.y = floorY;
          p.velocity.y = 0;
          p.velocity.x *= 0.85;
          p.velocity.z *= 0.85;
        }
      } else if (p.isSpark) {
        p.velocity.y -= 25.0 * dt; // Gravity

        const baseHeight = this.world.getBaseHeight(p.mesh.position.x, p.mesh.position.z);
        const floorY = 0.24 + baseHeight;
        if (p.mesh.position.y < floorY) {
          p.mesh.position.y = floorY + 0.05;
          p.velocity.y = -p.velocity.y * (0.3 + Math.random() * 0.3); // Bounce
          p.velocity.x *= 0.6;
          p.velocity.z *= 0.6;
        }

        // Face the velocity vector to look like a streak
        _skidTarget.copy(p.mesh.position).add(p.velocity);
        p.mesh.lookAt(_skidTarget);

        const factor = p.life / p.maxLife;
        const speed = p.velocity.length();
        p.mesh.scale.set(0.04, 0.04, Math.max(0.1, speed * 0.06)); // Stretch based on speed
        p.mat.opacity = factor * factor; // Fade out quickly
      } else {
        // Smoke logic
        p.velocity.y += 0.2 * dt;
        const factor = p.life / p.maxLife;
        p.mesh.scale.setScalar(1.0 + (1.0 - factor) * 2.0);
        p.mat.opacity = factor * 0.4;
      }

      if (p.life <= 0) p.mesh.visible = false;
    }
  }
}

export function updateCheckpointSmoke(dt) {
  for (const p of this.smokePool) {
    if (p.life > 0) {
      p.life -= dt;
      p.mesh.position.addScaledVector(p.velocity, dt);

      p.velocity.x += Math.sin(p.mesh.position.y * 0.2) * 0.2;
      p.velocity.z += Math.cos(p.mesh.position.y * 0.2) * 0.2;

      const factor = p.life / p.maxLife;
      const sizeS = p.sizeScale || 1.0;
      const opacS = p.opacityScale || 1.0;

      p.mesh.scale.setScalar((1.0 + (1.0 - factor) * 3.5) * sizeS);
      // Mutate opacity on the owned material — no material swap, no GC
      p.mat.opacity = factor * 0.28 * opacS;

      if (p.life <= 0) p.mesh.visible = false;
    }
  }
}

export function initDebris() {
  this.debrisPool = [];
  this.maxDebris = 120;
  const dGeo = new THREE.BoxGeometry(1, 1, 1);
  for (let i = 0; i < this.maxDebris; i++) {
    const dMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.5,
      metalness: 0.5,
      transparent: true,
      opacity: 1.0,
      depthWrite: true
    });
    const mesh = new THREE.Mesh(dGeo, dMat);
    mesh.visible = false;
    this.scene.add(mesh);
    this.debrisPool.push({
      mesh: mesh,
      material: dMat,
      life: 0,
      maxLife: 1.0,
      scale: 0.2,
      velocity: new THREE.Vector3(),
      rotVelocity: new THREE.Vector3()
    });
  }
}

export function spawnDebris(pos, dir, color, count = 5) {
  let spawned = 0;
  for (const d of this.debrisPool) {
    if (d.life <= 0) {
      d.mesh.position.copy(pos);
      d.mesh.position.x += (Math.random() - 0.5) * 0.8;
      d.mesh.position.y += (Math.random() - 0.5) * 0.4;
      d.mesh.position.z += (Math.random() - 0.5) * 0.8;
      d.mesh.visible = true;
      d.material.color.setHex(color);
      d.material.opacity = 1.0;
      d.material.transparent = false;

      d.life = 1.2 + Math.random() * 1.5;
      d.maxLife = d.life;
      // Make debris irregularly shaped to simulate bent metal/plastic
      d.scaleX = 0.08 + Math.random() * 0.25;
      d.scaleY = 0.04 + Math.random() * 0.1;
      d.scaleZ = 0.15 + Math.random() * 0.35;
      d.scale = Math.max(d.scaleX, d.scaleY, d.scaleZ); // For collision radius
      d.mesh.scale.set(d.scaleX, d.scaleY, d.scaleZ);

      d.velocity.set(
        dir.x * (6.0 + Math.random() * 4.0) + (Math.random() - 0.5) * 8.0,
        Math.random() * 8.0 + 4.0,
        dir.z * (6.0 + Math.random() * 4.0) + (Math.random() - 0.5) * 8.0
      );

      d.rotVelocity.set(
        (Math.random() - 0.5) * 16.0,
        (Math.random() - 0.5) * 16.0,
        (Math.random() - 0.5) * 16.0
      );

      spawned++;
      if (spawned >= count) break;
    }
  }
}

export function updateDebris(dt) {
  if (dt <= 0) return;
  this.debrisPool.forEach(d => {
    if (d.life > 0) {
      d.life -= dt;
      d.velocity.y -= 22.0 * dt;
      d.mesh.position.addScaledVector(d.velocity, dt);

      d.mesh.rotation.x += d.rotVelocity.x * dt;
      d.mesh.rotation.y += d.rotVelocity.y * dt;
      d.mesh.rotation.z += d.rotVelocity.z * dt;

      const baseHeight = this.world.getBaseHeight(d.mesh.position.x, d.mesh.position.z);
      // Quick estimate: if outside sidewalk bounds, use 0.37, else 0.22
      const ts = 40;
      const gridX = Math.round(d.mesh.position.x / ts);
      const gridZ = Math.round(d.mesh.position.z / ts);
      const isRoad = this.world.roadColumns.has(gridX) || this.world.roadRows.has(gridZ);
      const isIntersection = this.world.roadColumns.has(gridX) && this.world.roadRows.has(gridZ);

      let height = 0.24;
      if (isRoad && !isIntersection) {
        const localX = d.mesh.position.x - gridX * ts;
        const localZ = d.mesh.position.z - gridZ * ts;
        const { rwX, rwZ } = this.world.getRoadWidthForGrid(gridX, gridZ);
        if (this.world.roadRows.has(gridZ)) {
          if (Math.abs(localZ) > rwZ / 2) height = 0.39;
        } else {
          if (Math.abs(localX) > rwX / 2) height = 0.39;
        }
      } else if (!isRoad) {
        height = 0.39;
      }
      const floorY = height + baseHeight;

      if (d.mesh.position.y < floorY + d.scale / 2) {
        d.mesh.position.y = floorY + d.scale / 2;
        if (d.velocity.y < -1.5) {
          d.velocity.y = -d.velocity.y * 0.45;
          d.velocity.x *= 0.65;
          d.velocity.z *= 0.65;
          d.rotVelocity.multiplyScalar(0.6);
        } else {
          d.velocity.y = 0.0;
          d.velocity.x *= 0.92 * Math.exp(-dt);
          d.velocity.z *= 0.92 * Math.exp(-dt);
          d.rotVelocity.multiplyScalar(0.9 * Math.exp(-dt));
        }
      }

      if (d.life < 0.5) {
        d.material.transparent = true;
        d.material.opacity = Math.max(0.0, d.life / 0.5);
      }

      if (d.life <= 0) {
        d.mesh.visible = false;
      }
    }
  });
}

