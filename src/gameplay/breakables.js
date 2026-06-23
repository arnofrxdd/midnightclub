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

            // Handle Instanced Mesh breakables dynamically by spawning a real mesh to fly away
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
            }

            // Impulse calculation
            const impactForceDir = ent.velocity.clone().normalize();
            if (speed > 2.0) {
              // Pole flies off in the direction of the impact velocity (heavier, less explosive flight)
              const launchSpeed = Math.max(speed * 0.82 + 3.5, 6.0);
              b.velocity.copy(impactForceDir).multiplyScalar(launchSpeed);
              b.velocity.y = Math.max(speed * 0.32 + 3.8, 4.5); // upward launch speed
              
              // Add heavy, minimal spin
              b.angularVelocity.set(
                (Math.random() - 0.5) * 4.5,
                (Math.random() - 0.5) * 1.5,
                (Math.random() - 0.5) * 4.5
              );
            } else {
              b.velocity.copy(impactForceDir).multiplyScalar(4.0);
              b.velocity.y = 4.5;
              b.angularVelocity.set(
                (Math.random() - 0.5) * 3.5,
                (Math.random() - 0.5) * 1.0,
                (Math.random() - 0.5) * 3.5
              );
            }

            // Give broken props a stronger topple bias so they don't hang in the air.
            b.velocity.y += 0.8;
            b.angularVelocity.x += (Math.random() - 0.5) * 1.0;
            b.angularVelocity.z += (Math.random() - 0.5) * 1.0;

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
              if (this.hypeManager) this.hypeManager.addStunt('smash');
            }

            // Spawn sparks and wood/metal debris or water splashes
            const sparkPos = b.position.clone();
            sparkPos.y = 0.8;
            if (b.type === 'hydrant') {
              this.spawnParticles(sparkPos, impactForceDir, 0xaaddff, 18, true);
              this.spawnDebris(sparkPos, impactForceDir, 0xdd2222, 5); // red metal shards
            } else {
              this.spawnParticles(sparkPos, impactForceDir, 0xffaa00, 10, false, true);
              this.spawnDebris(sparkPos, impactForceDir, 0x333333, 5); // metal shards
            }

            break; // Stop checking other entities for this breakable
          }
        }
      } else {
        // Update physics of falling breakable prop (increased gravity to make it feel heavier)
        b.velocity.y += -46.0 * dt; // stronger gravity so the fall commits immediately
        b.group.position.addScaledVector(b.velocity, dt);

        b.group.rotation.x += b.angularVelocity.x * dt;
        b.group.rotation.y += b.angularVelocity.y * dt;
        b.group.rotation.z += b.angularVelocity.z * dt;

        // Continuous water spray fountain from broken fire hydrant base
        if (b.type === 'hydrant') {
          if (b.sprayTimer === undefined) b.sprayTimer = 18.0; // Spray for 18 seconds
          if (b.sprayTimer > 0) {
            b.sprayTimer -= dt;
            
            // Check if any vehicle is sitting over the hydrant's base position
            let isCovered = false;
            
            // Check player
            const pDistSq = (this.physics.position.x - b.position.x) ** 2 + (this.physics.position.z - b.position.z) ** 2;
            if (pDistSq < 5.0) {
              isCovered = true;
            }
            
            // Check AI
            if (!isCovered && this.race && this.race.active) {
              for (let i = 0; i < this.race.aiRacers.length; i++) {
                const ai = this.race.aiRacers[i];
                const distSq = (ai.position.x - b.position.x) ** 2 + (ai.position.z - b.position.z) ** 2;
                if (distSq < 5.0) {
                  isCovered = true;
                  break;
                }
              }
            }
            
            // Check cops
            if (!isCovered && this.pursuit && this.pursuit.active) {
              for (let i = 0; i < this.pursuit.cops.length; i++) {
                const cop = this.pursuit.cops[i];
                if (cop.active) {
                  const distSq = (cop.position.x - b.position.x) ** 2 + (cop.position.z - b.position.z) ** 2;
                  if (distSq < 5.0) {
                    isCovered = true;
                    break;
                  }
                }
              }
            }
            
            // Check traffic
            if (!isCovered && this.traffic && this.traffic.vehicles) {
              for (let i = 0; i < this.traffic.vehicles.length; i++) {
                const v = this.traffic.vehicles[i];
                const distSq = (v.position.x - b.position.x) ** 2 + (v.position.z - b.position.z) ** 2;
                if (distSq < 5.0) {
                  isCovered = true;
                  break;
                }
              }
            }
            
            // Check parked vehicles
            if (!isCovered && this.traffic && this.traffic.parkedVehicles) {
              for (let i = 0; i < this.traffic.parkedVehicles.length; i++) {
                const v = this.traffic.parkedVehicles[i];
                const distSq = (v.position.x - b.position.x) ** 2 + (v.position.z - b.position.z) ** 2;
                if (distSq < 5.0) {
                  isCovered = true;
                  break;
                }
              }
            }
            
            if (!isCovered) {
              const sprayPos = b.position.clone();
              // Start spray slightly above ground level
              sprayPos.y = this.world.getGroundHeight(sprayPos.x, sprayPos.z) + 0.25;
              
              const sprayDir = new THREE.Vector3(
                (Math.random() - 0.5) * 0.12,
                1.0,
                (Math.random() - 0.5) * 0.12
              ).normalize();
              
              // Spawn 3 water particles every frame
              this.spawnParticles(sprayPos, sprayDir, 0xaaddff, 3, true);
            }
          }
        }

        // Bounce on ground level
        const groundHeight = this.world.getGroundHeight(b.group.position.x, b.group.position.z);
        const upVec = new THREE.Vector3(0, 1, 0).applyQuaternion(b.group.quaternion);
        const tiltCos = Math.abs(upVec.dot(new THREE.Vector3(0, 1, 0))); // 1 = standing, 0 = flat
        const comHeight = b.comHeight !== undefined ? b.comHeight : 4.25;
        const radius = b.radius !== undefined ? b.radius : 0.22;
        const minHeight = groundHeight + THREE.MathUtils.lerp(radius, comHeight, tiltCos);

        if (b.group.position.y < minHeight) {
          b.group.position.y = minHeight;
          
          const isFlat = tiltCos < 0.15;
          if (isFlat) {
            // Once flat, damp and stop
            if (b.velocity.y < -1.5) {
              b.velocity.y = -b.velocity.y * 0.22; // bounce damping
            } else {
              b.velocity.y = 0.0;
            }
            b.velocity.x *= 0.48 * Math.exp(-dt * 6.5); // slide friction
            b.velocity.z *= 0.48 * Math.exp(-dt * 6.5);
            b.angularVelocity.multiplyScalar(0.35 * Math.exp(-dt * 5.0));
          } else {
            // While toppling, satisfy the ground tip contact constraint kinematics.
            // Do NOT bounce the center of mass vertically.
            // Instead, apply constant gravity torque to slide the center of mass down.
            const sinTheta = Math.sqrt(1.0 - tiltCos * tiltCos);
            const toppleTorque = 16.0 * sinTheta; // Accelerates as it leans further
            const leanX = upVec.z;
            const leanZ = -upVec.x;
            b.angularVelocity.x += leanX * toppleTorque * dt;
            b.angularVelocity.z += leanZ * toppleTorque * dt;
            
            // Allow natural sliding velocity on the tip contact
            b.velocity.x *= 0.98;
            b.velocity.z *= 0.98;
          }
          
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
          const alignStrength = isFlat ? 7.0 : 2.5;
          b.group.rotation.x += (targetX - b.group.rotation.x) * alignStrength * dt;
          b.group.rotation.z += (targetZ - b.group.rotation.z) * alignStrength * dt;
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
