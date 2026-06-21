import * as THREE from 'three';

export function checkBreakablesCollision(dt) {
    if (!this.world || !this.world.breakables) return;

    // Cache Frustum and Matrix4 as instance fields — avoid allocating every frame
    if (!this._breakFrustum) {
      this._breakFrustum = new THREE.Frustum();
      this._breakProjMat  = new THREE.Matrix4();
    }
    this._breakProjMat.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    this._breakFrustum.setFromProjectionMatrix(this._breakProjMat);
    const frustum = this._breakFrustum;

    // List of active physical entities that can break streetlights/traffic lights
    const entities = [
      {
        position: this.physics.position,
        velocity: this.physics.velocity,
        radius: 2.2,
        isPlayer: true
      }
    ];

    // Add AI Racers to collision check
    if (this.race.active) {
      this.race.aiRacers.forEach(ai => {
        entities.push({
          position: ai.position,
          velocity: ai.velocity || new THREE.Vector3(),
          radius: 2.0,
          isPlayer: false
        });
      });
    }

    // Add Cops
    if (this.pursuit && this.pursuit.active) {
      this.pursuit.cops.forEach(cop => {
        if (cop.active) {
          const copForward = new THREE.Vector3(Math.sin(cop.heading), 0, Math.cos(cop.heading));
          const copVel = copForward.clone().multiplyScalar(cop.speed);
          entities.push({
            position: cop.position,
            velocity: copVel,
            radius: 2.0,
            isPlayer: false
          });
        }
      });
    }

    // Add Traffic
    if (this.traffic && this.traffic.vehicles) {
      // Preallocate scratch forward vector for traffic to avoid per-vehicle alloc
      if (!this._trafficFwdScratch) this._trafficFwdScratch = new THREE.Vector3();
      this.traffic.vehicles.forEach(v => {
        this._trafficFwdScratch.set(Math.sin(v.heading), 0, Math.cos(v.heading));
        entities.push({
          position: v.position,
          // Clone only when velocity is needed for breakable impulse calc
          velocity: this._trafficFwdScratch.clone().multiplyScalar(v.speed).add(v.impactVelocity),
          radius: 2.0,
          isPlayer: false
        });
      });
    }

    // Add Parked Vehicles
    if (this.traffic && this.traffic.parkedVehicles) {
      this.traffic.parkedVehicles.forEach(v => {
        entities.push({
          position: v.position,
          velocity: v.impactVelocity.clone(),
          radius: 2.0,
          isPlayer: false
        });
      });
    }

    // Loop through breakables and update them
    this.world.breakables.forEach(b => {
      if (!b.broken) {
        // Check collision against all entities
        for (let ent of entities) {
          const dist = ent.position.distanceTo(b.position);
          const collisionDist = ent.radius + (b.radius !== undefined ? b.radius : 0.6);
          if (dist < collisionDist) {
            const speed = ent.velocity.length();
            if (speed < 4.0) {
              // Solid collision: push out and bounce velocity
              const normal = ent.position.clone().sub(b.position);
              normal.y = 0;
              normal.normalize();
              const overlap = collisionDist - dist;
              ent.position.addScaledVector(normal, overlap);
              
              const dot = ent.velocity.dot(normal);
              if (dot < 0) {
                ent.velocity.addScaledVector(normal, -1.2 * dot);
              }
              continue;
            }

            // CRASH! Break the streetlight
            b.broken = true;
            b.fadeTimer = 10.0; // minimum stay time before eligible for off-camera cleanup (increased from 3.5s)

            // Impulse calculation
            const impactForceDir = ent.velocity.clone().normalize();
            if (speed > 2.0) {
              // Pole flies off in the direction of the impact velocity
              b.velocity.copy(impactForceDir).multiplyScalar(speed * 0.9 + 5.0);
              b.velocity.y = speed * 0.4 + 4.0; // upward launch speed
              
              // Add crazy spin
              b.angularVelocity.set(
                (Math.random() - 0.5) * 12.0,
                (Math.random() - 0.5) * 6.0,
                (Math.random() - 0.5) * 12.0
              );
            } else {
              b.velocity.set((Math.random() - 0.5) * 3, 2.0, (Math.random() - 0.5) * 3);
              b.angularVelocity.set(Math.random() * 4, Math.random() * 4, Math.random() * 4);
            }

            // Turn off light source
            b.lights.forEach(src => {
              src.intensity = 0.0;
            });

            // Turn off flares
            b.flares.forEach(fl => {
              fl.visible = false;
            });

            // Turn off baked ground light pools
            if (b.poolMeshes) {
              b.poolMeshes.forEach(pm => {
                pm.visible = false;
              });
            }

            // Turn off light cones visually on crash
            b.group.traverse(child => {
              if (child.name === "lightCone") {
                child.visible = false;
              }
            });

            // If it is a traffic light, also turn off the colored light bulbs visually
            if (b.type === 'trafficlight') {
              b.group.traverse(child => {
                if (child.isMesh && child.material && child !== b.group.children[0] && child.name !== "lightCone") {
                  // Turn bulb material to off (dark black/gray housing or dark standard mat)
                  child.material = this.world.tlHousingMat;
                }
              });
            }

            // Screen shake / crash feedback if player rammed it
            if (ent.isPlayer && speed > 8.0) {
              this.crashShake = Math.min(0.5, speed * 0.025);
              // Deduct a little forward speed from player on impact (heavy pole resistance)
              this.physics.velocity.multiplyScalar(0.92);
            }

            // Spawn sparks and wood/metal debris
            const sparkPos = b.position.clone();
            sparkPos.y = 0.8;
            this.spawnParticles(sparkPos, impactForceDir, 0xffaa00, 10);
            this.spawnDebris(sparkPos, impactForceDir, 0x333333, 5); // metal shards

            break; // Stop checking other entities for this breakable
          }
        }
      } else {
        // Update physics of falling breakable prop
        b.velocity.y += -22.0 * dt; // strong gravity
        b.group.position.addScaledVector(b.velocity, dt);

        b.group.rotation.x += b.angularVelocity.x * dt;
        b.group.rotation.y += b.angularVelocity.y * dt;
        b.group.rotation.z += b.angularVelocity.z * dt;

        // Bounce on ground level
        const groundHeight = this.world.getGroundHeight(b.group.position.x, b.group.position.z);
        const upVec = new THREE.Vector3(0, 1, 0).applyQuaternion(b.group.quaternion);
        const tiltCos = Math.abs(upVec.dot(new THREE.Vector3(0, 1, 0))); // 1 = standing, 0 = flat
        const comHeight = b.comHeight !== undefined ? b.comHeight : 4.25;
        const radius = b.radius !== undefined ? b.radius : 0.22;
        const minHeight = groundHeight + THREE.MathUtils.lerp(radius, comHeight, tiltCos);

        if (b.group.position.y < minHeight) {
          b.group.position.y = minHeight;
          if (b.velocity.y < -1.5) {
            b.velocity.y = -b.velocity.y * 0.22; // bounce damping
          } else {
            b.velocity.y = 0.0;
          }
          b.velocity.x *= 0.65 * Math.exp(-dt * 4.0); // slide friction
          b.velocity.z *= 0.65 * Math.exp(-dt * 4.0);
          b.angularVelocity.multiplyScalar(0.5 * Math.exp(-dt * 3.0));
          
          // Slowly align rotation to lie flat on the ground (prevent goofy standing tilts)
          let targetX = Math.round(b.group.rotation.x / (Math.PI / 2)) * (Math.PI / 2);
          let targetZ = Math.round(b.group.rotation.z / (Math.PI / 2)) * (Math.PI / 2);
          if (Math.abs(targetX) < 0.1 && Math.abs(targetZ) < 0.1) {
            if (Math.abs(b.velocity.x) > Math.abs(b.velocity.z)) {
              targetZ = b.velocity.x > 0 ? -Math.PI / 2 : Math.PI / 2;
            } else {
              targetX = b.velocity.z > 0 ? Math.PI / 2 : -Math.PI / 2;
            }
          }
          b.group.rotation.x += (targetX - b.group.rotation.x) * 4.0 * dt;
          b.group.rotation.z += (targetZ - b.group.rotation.z) * 4.0 * dt;
        }

        // Fade out/scale down only when off-camera
        const inView = frustum.containsPoint(b.group.position);
        
        b.fadeTimer -= dt;
        if (!inView && b.fadeTimer <= 0) {
          b.group.scale.multiplyScalar(Math.max(0, 1.0 - dt * 2.5));
          if (b.group.scale.x < 0.05) {
            b.group.visible = false;
            this.scene.remove(b.group);
            b.shouldRemove = true;
          }
        }
      }
    });

    // Clean up breakables that have been removed from the scene
    this.world.breakables = this.world.breakables.filter(b => !b.shouldRemove);
  }