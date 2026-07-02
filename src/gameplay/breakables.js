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
          const dx = ent.position.x - b.position.x;
          const dz = ent.position.z - b.position.z;
          const dist2D = Math.sqrt(dx * dx + dz * dz);
          
          const dy = ent.position.y - b.position.y;
          
          let minDy = -2.0;
          let propHeight = 8.0;
          if (b.type === 'hydrant' || b.type === 'bench' || b.type === 'trashcan' || b.type === 'parkingmeter' || b.type === 'cone') {
            propHeight = 1.5;
          } else if (b.type === 'glass') {
            minDy = -10.0; // Glass center is 4.5m up; we need to reach down to the ground!
            propHeight = 10.0;
          }
          
          let isCollision = false;
          let overlap = 0;
          let normal = new THREE.Vector3();

          if (b.type === 'glass' && b.width !== undefined) {
             const localPos = new THREE.Vector3();
             localPos.subVectors(ent.position, b.position);
             
             // Transform entity into glass local space by applying INVERSE rotation
             localPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), -b.rotationY);

             const halfW = b.width / 2;
             const halfD = b.depth / 2;
             
             if (Math.abs(localPos.x) < halfW + ent.radius && Math.abs(localPos.z) < halfD + ent.radius) {
                isCollision = true;
                const overlapX = (halfW + ent.radius) - Math.abs(localPos.x);
                const overlapZ = (halfD + ent.radius) - Math.abs(localPos.z);
                
                const signX = localPos.x >= 0 ? 1 : -1;
                const signZ = localPos.z >= 0 ? 1 : -1;

                if (overlapX < overlapZ) {
                   overlap = overlapX;
                   normal.set(signX, 0, 0);
                } else {
                   overlap = overlapZ;
                   normal.set(0, 0, signZ);
                }
                
                // Rotate normal back to world space
                normal.applyAxisAngle(new THREE.Vector3(0, 1, 0), b.rotationY);
             }
          } else {
             const collisionDist = ent.radius + (b.radius !== undefined ? b.radius : 0.6);
             if (dist2D < collisionDist) {
                isCollision = true;
                overlap = collisionDist - dist2D;
                normal.copy(ent.position).sub(b.position);
                normal.y = 0;
                normal.normalize();
             }
          }

          if (isCollision && dy > minDy && dy < propHeight + ent.radius) {
            const speed = ent.velocity.length();
            const breakSpeed = (b.type === 'glass') ? 14.0 : 4.0;
            
            if (speed < breakSpeed) {
              // Solid collision: push out and bounce velocity
              ent.position.addScaledVector(normal, overlap);
              
              const dot = ent.velocity.dot(normal);
              if (dot < 0) {
                ent.velocity.addScaledVector(normal, -1.2 * dot);
              }
              continue;
            }

            // CRASH! Break the streetlight
            b.broken = true;
            b.fadeTimer = 180.0; // Keep broken props for 3 minutes!

            // Instantly hide the massive glass wall
            if (b.type === 'glass') {
              if (b.group) {
                b.group.traverse(child => {
                  if (child.isMesh) child.visible = false;
                });
              }
            }

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
              b.isInstanced = false; // it is now a real mesh
            }

            // Impulse calculation
            const impactForceDir = ent.velocity.clone().normalize();
            if (speed > 2.0) {
              if (b.type === 'cone') {
                // Cones are extremely light and pop high into the air with fast rotation
                b.velocity.copy(impactForceDir).multiplyScalar(speed * 1.5);
                b.velocity.y = Math.max(speed * 0.4 + 4.0, 5.5);
                b.angularVelocity.set(
                  (Math.random() - 0.5) * 45.0,
                  (Math.random() - 0.5) * 45.0,
                  (Math.random() - 0.5) * 45.0
                );
              } else if (b.type === 'lamp' || b.type === 'trafficlight' || b.type === 'hydrant') {
                b.velocity.copy(impactForceDir).multiplyScalar(speed * 0.35); // Heavier object = less launch speed
                b.velocity.y = Math.max(speed * 0.25 + 2.5, 3.5); // Less upward launch for heavy metal poles
                
                // Add heavy, minimal spin
                b.angularVelocity.set(
                  (Math.random() - 0.5) * 2.5,
                  (Math.random() - 0.5) * 1.0,
                  (Math.random() - 0.5) * 2.5
                );
              } else {
                b.velocity.copy(impactForceDir).multiplyScalar(speed * 0.45); // Lighter objects like signs
                b.velocity.y = 3.5;
                b.angularVelocity.set(
                  (Math.random() - 0.5) * 3.5,
                  (Math.random() - 0.5) * 1.0,
                  (Math.random() - 0.5) * 3.5
                );
              }
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

            // Turn off light cones and flares visually on the newly spawned physics crash object
            b.group.traverse(child => {
              if (child.name === "lightCone" || child.name.toLowerCase().includes("flare")) {
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
              if (b.type === 'glass') {
                this.physics.velocity.multiplyScalar(0.95); // glass is fragile, minimal slowdown!
              } else {
                // Deduct significant forward speed from player on impact (heavy pole resistance)
                this.physics.velocity.multiplyScalar(0.78);
              }
              // if (this.hypeManager) this.hypeManager.addStunt('smash'); // Disabled per user request
            }

            // Spawn sparks and wood/metal debris or water splashes
            const sparkPos = b.position.clone();
            sparkPos.y = 0.8;
            if (b.type === 'hydrant') {
              this.spawnParticles(sparkPos, impactForceDir, 0xaaddff, 18, true);
              this.spawnDebris(sparkPos, impactForceDir, 0xdd2222, 5); // red metal shards
            } else if (b.type === 'gas_pump') {
              // 1. MASSIVE FIREBALL EXPLOSION
              this.spawnParticles(sparkPos, new THREE.Vector3(0, 1, 0), 0xff4400, 200, false, true); // Fireball!
              this.spawnDebris(sparkPos, new THREE.Vector3(0, 1, 0), 0x222222, 15); // Charred metal
              
              // 2. EXPLOSIVE SHOCKWAVE (Launch the car into the air)
              const explodeDir = ent.position.clone().sub(b.position).normalize();
              explodeDir.y = 0.6; // Moderate upward bias to flip the car
              explodeDir.normalize();
              
              if (ent.isPlayer) {
                this.physics.velocity.add(explodeDir.multiplyScalar(16.0)); // Launch player!
                this.crashShake = 1.0; // Max screen shake
              } else {
                ent.velocity.add(explodeDir.multiplyScalar(16.0)); // Launch AI/Cops/Traffic!
              }
              
              // 3. VAPORIZE THE PUMP (Stop it from tumbling, it just disappears in the blast)
              if (b.group) {
                b.group.visible = false;
              }
            } else if (b.type === 'glass') {
              this.spawnParticles(sparkPos, impactForceDir, 0xddeeef, 65, false, true); // white glass sparkles
              
              // AAA Shatter Effect: Spawn massive physical glass shards
              let glassMat = null;
              if (b.group) {
                b.group.traverse(c => {
                  if (c.isMesh && !glassMat) glassMat = c.material;
                });
              }
              if (glassMat) {
                const shardGeoms = [
                  new THREE.BoxGeometry(3.5, 2.5, 0.15),
                  new THREE.BoxGeometry(1.5, 4.5, 0.2),
                  new THREE.BoxGeometry(2.2, 3.0, 0.15),
                  new THREE.BoxGeometry(4.0, 1.5, 0.25)
                ];
                for(let i=0; i<25; i++) {
                  const geo = shardGeoms[Math.floor(Math.random() * shardGeoms.length)];
                  const shardMesh = new THREE.Mesh(geo, glassMat);
                  
                  // Distribute shards across the entire pane area
                  const rx = b.position.x + (Math.random() - 0.5) * 12.0;
                  const ry = b.position.y + (Math.random() - 0.5) * 8.0;
                  const rz = b.position.z + (Math.random() - 0.5) * 12.0;
                  shardMesh.position.set(rx, ry, rz);
                  
                  // Explode outwards from the car's impact point, but heavier and less explosive
                  const explodeVec = new THREE.Vector3(rx - ent.position.x, ry - ent.position.y, rz - ent.position.z).normalize();
                  const launchVel = explodeVec.multiplyScalar(6 + Math.random() * 8).add(impactForceDir.clone().multiplyScalar(speed * 0.5));
                  
                  const shardB = {
                    type: 'glass_shard',
                    broken: true, // It is already broken, physics engine will apply gravity/bounces
                    fadeTimer: 240.0, // Lasts 4 minutes
                    radius: 0.1,      // Thin collision radius so they lie flat
                    comHeight: 0.15,  // Very low center of mass so they cannot stand on edge
                    group: shardMesh,
                    position: shardMesh.position.clone(),
                    velocity: launchVel,
                    angularVelocity: new THREE.Vector3((Math.random()-0.5)*15, (Math.random()-0.5)*15, (Math.random()-0.5)*15),
                    lights: [], flares: [], poolMeshes: []
                  };
                  this.scene.add(shardMesh);
                  this.world.breakables.push(shardB);
                }
              }
            } else {
              this.spawnParticles(sparkPos, impactForceDir, 0xffaa00, 10, false, true);
              this.spawnDebris(sparkPos, impactForceDir, 0x333333, 5); // metal shards
            }

            // Now that shards are spawned, sever the massive pane from the physics loop so it doesn't tumble!
            if ((b.type === 'glass' || b.type === 'gas_pump') && b.group) {
              b.group = null;
            }

            break; // Stop checking other entities for this breakable
          }
        }
      } else {
        // Allow physical interaction with already broken props!
        for (let ent of entities) {
          if (!b.group) break;
          const dx = ent.position.x - b.group.position.x;
          const dz = ent.position.z - b.group.position.z;
          const dist2D = Math.sqrt(dx * dx + dz * dz);
          const collisionDist = ent.radius + (b.radius !== undefined ? b.radius : 0.6) + 1.2;
          
          const dy = ent.position.y - b.group.position.y;
          if (dist2D < collisionDist && Math.abs(dy) < 6.0) {
            const speed = ent.velocity.length();
            if (speed > 2.0) {
              const impactForceDir = ent.velocity.clone().normalize();
              // Much higher multiplier so players can easily push/carry broken props with their car
              b.velocity.add(impactForceDir.multiplyScalar(speed * 0.55));
              b.velocity.y = Math.max(b.velocity.y, speed * 0.15 + 1.5); // Kick up into the air a bit more so it rides on the hood
              b.angularVelocity.x += (Math.random() - 0.5) * speed * 0.2;
              b.angularVelocity.z += (Math.random() - 0.5) * speed * 0.2;
              b.fadeTimer = 180.0; // Refresh despawn timer
            }
          }
        }

        // Update physics of falling breakable prop (increased gravity to make it feel heavier)
        b.velocity.y += -46.0 * dt; // stronger gravity so the fall commits immediately
        
        // Static world collision for the sliding broken prop
        if (b.group) {
          const nextPos = b.group.position.clone().addScaledVector(b.velocity, dt);
          const coll = this.world.checkCollision(nextPos.x, nextPos.z, 0.8, nextPos.y);
          if (coll.collision) {
            // Bounce off buildings/obstacles
            const normal = new THREE.Vector3(coll.normalX, 0, coll.normalZ);
            const dot = b.velocity.dot(normal);
            if (dot < 0) {
              b.velocity.addScaledVector(normal, -1.5 * dot); // Restitution
              b.angularVelocity.x += (Math.random() - 0.5) * 4.0;
              b.angularVelocity.z += (Math.random() - 0.5) * 4.0;
            }
          }
        }
        
        if (b.group) {
          b.group.position.addScaledVector(b.velocity, dt);

          b.group.rotation.x += b.angularVelocity.x * dt;
          b.group.rotation.y += b.angularVelocity.y * dt;
          b.group.rotation.z += b.angularVelocity.z * dt;
        }

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
        if (b.group) {
          const groundHeight = this.world.getGroundHeight(b.group.position.x, b.group.position.z);
          
          if (b.type === 'glass_shard') {
            // Glass shards are generated upright (tall Y, thin Z). 
            // They are flat when their local Z-axis points straight UP or DOWN.
            const localZ = new THREE.Vector3(0, 0, 1).applyQuaternion(b.group.quaternion);
            const isFlatFactor = Math.abs(localZ.y); // 1 = perfectly flat on ground, 0 = standing vertically
            
            // Calculate dynamic clearance so it doesn't clip when tumbling
            // Max radius is ~2.2 when standing, 0.1 when flat
            const minHeight = groundHeight + THREE.MathUtils.lerp(2.2, 0.1, isFlatFactor);
            
            if (b.group.position.y < minHeight) {
              b.group.position.y = minHeight;
              
              if (b.velocity.y < -1.5) {
                b.velocity.y = -b.velocity.y * 0.35; // Glass bounce
              } else {
                b.velocity.y = 0.0;
              }
              // Glass slides smoothly on asphalt
              b.velocity.x *= 0.95 * Math.exp(-dt * 3.0);
              b.velocity.z *= 0.95 * Math.exp(-dt * 3.0);
              
              b.angularVelocity.multiplyScalar(0.6 * Math.exp(-dt * 5.0));
              
              // Force the shard to lay flat on its wide face
              // X rotation targets ±90 degrees (Math.PI/2)
              // Z rotation targets 0 or 180 degrees (Math.PI)
              const targetX = Math.round((b.group.rotation.x - Math.PI/2) / Math.PI) * Math.PI + Math.PI/2;
              const targetZ = Math.round(b.group.rotation.z / Math.PI) * Math.PI;
              
              b.group.rotation.x += (targetX - b.group.rotation.x) * 12.0 * dt;
              b.group.rotation.z += (targetZ - b.group.rotation.z) * 12.0 * dt;
            }
          } else {
            // Generic Pole/Hydrant Physics
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
              
              // Scratching spark physics when rubbing ground
              if (b.velocity.lengthSq() > 15.0) {
                 const sparkPos = b.group.position.clone();
                 sparkPos.y = groundHeight + 0.1;
                 const slideDir = b.velocity.clone().normalize().negate(); // Sparks shoot backwards
                 slideDir.y = 0.1; // Very slight upward spray, mostly backwards along the floor
                 this.spawnParticles(sparkPos, slideDir, 0xffdd55, 10, false, true);
              }
            }
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
        } else {
          // Object is null, just wait out the fade timer and delete it from memory
          b.fadeTimer -= dt;
          if (b.fadeTimer <= 0) b.shouldRemove = true;
        }
      }
    });

    // Clean up breakables that have been removed from the scene
    this.world.breakables = this.world.breakables.filter(b => !b.shouldRemove);
}
