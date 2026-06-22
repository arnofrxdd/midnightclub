import * as THREE from 'three';
import { CopCar } from './copCar.js';
import { Roadblock } from './roadblock.js';

export class PursuitManager {
  constructor(app) {
    this.app = app;
    this.active = false;
    this.heatLevel = 0; // 0 = no pursuit, 1-5 active chase
    this.cops = [];
    this.parkedCops = [];
    this.bustProgress = 0.0;
    this.busted = false;
    this.cooldownTimer = 0.0;
    this.violationAlertTimer = 0.0;
    this.canSeePlayer = false;
    this.heatProgress = 0.0;

    // Spawning controls
    this.spawnTimer = 0.0;
    this.maxSpawnCops = 0;

    // Roadblock controls
    this.roadblocks = [];
    this.roadblockTimer = 15.0; // Seconds until next roadblock attempt
  }

  triggerPursuit(initialHeat = 1) {
    if (this.busted) return;
    const prevHeat = this.heatLevel;
    if (!this.active) {
      this.active = true;
      this.app.showBanner("POLICE PURSUIT", "Lose the cops!");
      this.heatLevel = initialHeat;
      this.pursuitDuration = 0.0;
    }
    this.cooldownTimer = 0.0;
    this.maxSpawnCops = Math.min(5, Math.max(1, this.heatLevel)); // Toned down: Heat 1 = 1 cop, Heat 5 = 5 cops max
    // Roadblocks disabled
    // if (this.heatLevel >= 3 && prevHeat < 3) {
    //   this.roadblockTimer = 10.0; // Quick initial roadblock when hitting Heat 3
    // }
  }

  cancelPursuit() {
    this.active = false;
    this.heatLevel = 0;
    this.bustProgress = 0.0;
    this.clearSpawnedCops();
    this.app.showBanner("ESCUPED", "Police search cancelled");
  }

  clearSpawnedCops() {
    this.cops.forEach(cop => {
      if (cop.meshGroup) {
        cop.meshGroup.traverse(child => {
          if (child.geometry) child.geometry.dispose();
        });
        this.app.scene.remove(cop.meshGroup);
      }
    });
    this.cops = [];
    this.clearRoadblocks();
  }

  clearRoadblocks() {
    this.roadblocks.forEach(rb => rb.cleanup());
    this.roadblocks = [];
  }

  spawnCop(world, playerPos, isParked = false) {
    // Choose spawn coordinates in front of / around player, snapped to road intersections
    // For spawning, find an intersection that is 2-4 blocks away (out of direct viewport)
    const sortedCols = Array.from(world.roadColumns).sort((a, b) => a - b);
    const sortedRows = Array.from(world.roadRows).sort((a, b) => a - b);

    const playerGridX = Math.round(playerPos.x / world.tileSize);
    const playerGridZ = Math.round(playerPos.z / world.tileSize);

    // Pick offset block coordinates
    let spawnGx = playerGridX;
    let spawnGz = playerGridZ;

    const findClosestIndex = (arr, val) => {
      let closestIdx = 0;
      let minDiff = Infinity;
      for (let i = 0; i < arr.length; i++) {
        const diff = Math.abs(arr[i] - val);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = i;
        }
      }
      return closestIdx;
    };

    if (isParked) {
      // Parked cops spawn slightly out of viewport, but on side streets (approx 3-4 tiles away)
      const rx = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.floor(Math.random() * 2));
      const rz = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.floor(Math.random() * 2));
      
      const colIdx = findClosestIndex(sortedCols, playerGridX + rx);
      const rowIdx = findClosestIndex(sortedRows, playerGridZ + rz);

      spawnGx = sortedCols[colIdx];
      spawnGz = sortedRows[rowIdx];
    } else {
      // Chasing cops: 70% chance of spawning ahead of the player (in front or side roads), 30% chance randomly
      let rx = 0;
      let rz = 0;

      if (Math.random() < 0.80) {
        // 80% chance: spawn well ahead of the player so they appear to be driving toward you
        const playerHeading = this.app.physics.heading;
        const fwdX = Math.sin(playerHeading);
        const fwdZ = Math.cos(playerHeading);

        if (Math.abs(fwdX) > Math.abs(fwdZ)) {
          // Driving mostly East/West. Spawn far ahead in X (8-12 tiles), minor Z offset
          const dirX = Math.sign(fwdX) !== 0 ? Math.sign(fwdX) : (Math.random() > 0.5 ? 1 : -1);
          rx = dirX * (8 + Math.floor(Math.random() * 5));
          rz = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2);
        } else {
          // Driving mostly North/South. Spawn far ahead in Z (8-12 tiles), minor X offset
          const dirZ = Math.sign(fwdZ) !== 0 ? Math.sign(fwdZ) : (Math.random() > 0.5 ? 1 : -1);
          rz = dirZ * (8 + Math.floor(Math.random() * 5));
          rx = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2);
        }
      } else {
        // 20% chance: spawn from the sides at a safe distance
        rx = (Math.random() > 0.5 ? 1 : -1) * (6 + Math.floor(Math.random() * 4));
        rz = (Math.random() > 0.5 ? 1 : -1) * (6 + Math.floor(Math.random() * 4));
      }

      const colIdx = findClosestIndex(sortedCols, playerGridX + rx);
      const rowIdx = findClosestIndex(sortedRows, playerGridZ + rz);

      spawnGx = sortedCols[colIdx];
      spawnGz = sortedRows[rowIdx];
    }

    let worldX = spawnGx * world.tileSize;
    let worldZ = spawnGz * world.tileSize;

    const onCol = world.roadColumns.has(spawnGx);
    const onRow = world.roadRows.has(spawnGz);
    
    let laneOffset = 5.0; // default for wide road
    if (onCol || onRow) {
      const streetIdx = onCol ? Math.floor(spawnGx / 4) : Math.floor(spawnGz / 4);
      const seed = Math.sin(streetIdx * 12.9898) * 43758.5453;
      const rand = seed - Math.floor(seed);
      const rw = rand > 0.6 ? 14 : 26;
      laneOffset = rw === 14 ? 2.5 : 5.0;
    }

    if (isParked) {
      // Parked cops can be offset to the side of the road
      const side = Math.random() > 0.5 ? 1 : -1;
      if (onCol) worldX += side * laneOffset;
      else if (onRow) worldZ += side * laneOffset;
    } else {
      const playerHeading = this.app.physics.heading;
      const fwdX = Math.sin(playerHeading);
      const fwdZ = Math.cos(playerHeading);

      if (spawnGz === playerGridZ) {
        // On player's E/W road: place in oncoming lane relative to player's movement
        const playerDirSign = fwdX > 0 ? 1 : -1;
        worldZ += playerDirSign * laneOffset;
      } else if (spawnGx === playerGridX) {
        // On player's N/S road: place in oncoming lane relative to player's movement
        const playerDirSign = fwdZ > 0 ? 1 : -1;
        worldX -= playerDirSign * laneOffset;
      } else {
        // Parallel or side street: place in the correct lane axis of that street
        let copDriveAxis = 'z'; // road runs along Z
        if (onRow && !onCol) {
          copDriveAxis = 'x'; // road runs along X
        } else if (onCol && onRow) {
          copDriveAxis = Math.random() > 0.5 ? 'x' : 'z';
        }
        
        const dir = Math.random() > 0.5 ? 1 : -1;
        if (copDriveAxis === 'x') {
          worldZ += dir * laneOffset;
        } else {
          worldX += dir * laneOffset;
        }
      }
    }

    // Safety: ensure it does not spawn inside or very close to roadblocks
    let nearRoadblock = false;
    for (const rb of this.roadblocks) {
      const rbDist = Math.sqrt((worldX - rb.position.x)**2 + (worldZ - rb.position.z)**2);
      if (rbDist < 60.0) {
        nearRoadblock = true;
        break;
      }
    }
    if (nearRoadblock) return null;

    // Safety: ensure it does not collide with buildings
    if (world.checkCollision(worldX, worldZ, 2.5).collision) return null;

    // Safety: ensure it does not overlap with street props (breakables)
    if (world.breakables) {
      for (const b of world.breakables) {
        if (b.broken) continue;
        const dx = worldX - b.position.x;
        const dz = worldZ - b.position.z;
        if (dx * dx + dz * dz < 25.0) { // 5.0m radius threshold
          return null;
        }
      }
    }

    // Safety: ensure it does not overlap with other vehicles (cops, traffic, parked, player)
    const otherVehicles = [];
    if (this.app) {
      if (this.app.traffic) {
        if (this.app.traffic.vehicles) otherVehicles.push(...this.app.traffic.vehicles);
        if (this.app.traffic.parkedVehicles) otherVehicles.push(...this.app.traffic.parkedVehicles);
      }
      if (this.app.physics && this.app.physics.position) {
        otherVehicles.push({ position: this.app.physics.position });
      }
    }
    if (this.cops) otherVehicles.push(...this.cops);
    if (this.parkedCops) otherVehicles.push(...this.parkedCops);

    for (const v of otherVehicles) {
      if (v.position) {
        const dx = worldX - v.position.x;
        const dz = worldZ - v.position.z;
        if (dx * dx + dz * dz < 49.0) { // 7.0m radius threshold
          return null;
        }
      }
    }

    const startPos = new THREE.Vector3(worldX, 0.5 + world.getBaseHeight(worldX, worldZ), worldZ);
    
    // Instantiate CopCar
    const copId = Date.now() + Math.floor(Math.random() * 1000);
    const cop = new CopCar(copId, startPos, isParked);
    cop.app = this.app; // Assign main app reference
    cop.maxSpeed = 29 + this.heatLevel * 3; // Heat 1 = 32m/s (~71mph), Heat 5 = 44m/s (~98mph) (Toned down)
    cop.accel = 8 + this.heatLevel * 1.2;  // Heat 1 = 9.2m/s², Heat 5 = 14m/s² (Toned down)
    
    // Model CopCar Group
    const { carGroup, wheels } = this.app.createVoxelCarMesh(0x000000, 'cop');
    this.app.scene.add(carGroup);
    cop.meshGroup = carGroup;
    cop.wheels = wheels;

    if (isParked) {
      this.parkedCops.push(cop);
      // Parked facing parallel to road direction
      cop.heading = onRow ? Math.PI / 2 : 0;
      cop._updateMesh();
    } else {
      // Chasing cops spawn pointing towards the player and charging at high speed
      const dx = playerPos.x - worldX;
      const dz = playerPos.z - worldZ;
      
      // Align heading perfectly with the road direction towards the player
      if (Math.abs(dx) > Math.abs(dz)) {
        cop.heading = dx > 0 ? Math.PI / 2 : -Math.PI / 2;
      } else {
        cop.heading = dz > 0 ? 0 : Math.PI;
      }
      
      // Start at a moderate speed so they visibly drive toward the player from a distance
      // rather than materialising right in their face at full speed
      cop.speed = cop.maxSpeed * 0.35;
      cop.velocity.set(
        Math.sin(cop.heading) * cop.speed,
        0,
        Math.cos(cop.heading) * cop.speed
      );
      cop._updateMesh();
      this.cops.push(cop);
    }
    
    return cop;
  }

  spawnCopAtTile(world, tx, tz) {
    const onCol = world.roadColumns.has(tx);
    const onRow = world.roadRows.has(tz);
    const isAlley = world.isAlley ? world.isAlley(tx, tz) : false;
    const isIntersection = onCol && onRow;

    if (isAlley || isIntersection || (!onCol && !onRow)) {
      return null;
    }

    let worldX = tx * world.tileSize;
    let worldZ = tz * world.tileSize;
    let heading = 0;

    const offsetDist = 9.5;
    const sideOffset = Math.random() > 0.5 ? offsetDist : -offsetDist;
    const lengthOffset = (Math.random() - 0.5) * 15; // Jitter along the road length

    if (onCol) {
      // Column road runs N-S (along Z). Offset X.
      worldX += sideOffset;
      worldZ += lengthOffset;
      heading = Math.random() > 0.5 ? 0 : Math.PI;
    } else {
      // Row road runs E-W (along X). Offset Z.
      worldZ += sideOffset;
      worldX += lengthOffset;
      heading = Math.random() > 0.5 ? Math.PI / 2 : -Math.PI / 2;
    }

    // Safety: ensure it does not collide with buildings
    if (world.checkCollision(worldX, worldZ, 2.8).collision) {
      return null;
    }

    const startPos = new THREE.Vector3(worldX, 0.5 + world.getBaseHeight(worldX, worldZ), worldZ);
    
    // Instantiate CopCar
    const copId = Date.now() + Math.floor(Math.random() * 1000);
    const cop = new CopCar(copId, startPos, true); // true = isParked
    cop.app = this.app;
    cop.maxSpeed = 29 + this.heatLevel * 3;
    cop.accel = 8 + this.heatLevel * 1.2;
    cop.heading = heading;

    // Model CopCar Group
    const { carGroup, wheels } = this.app.createVoxelCarMesh(0x000000, 'cop');
    this.app.scene.add(carGroup);
    cop.meshGroup = carGroup;
    cop.wheels = wheels;
    cop._updateMesh();

    this.parkedCops.push(cop);
    return cop;
  }

  update(dt, playerPos, playerSpeed, world, traffic, navGraph, aiRacers, isPlayerTryingToMove = true) {
    if (this.busted) return;

    // Build active cop lists into reusable work buffers — avoids 2 new array allocs per frame
    if (!this._activeChasingBuf) this._activeChasingBuf = [];
    if (!this._activeParkedBuf)  this._activeParkedBuf  = [];
    let nChasing = 0, nParked = 0;
    for (let i = 0; i < this.cops.length; i++) {
      if (this.cops[i].active) this._activeChasingBuf[nChasing++] = this.cops[i];
    }
    this._activeChasingBuf.length = nChasing;
    const activeChasingCops = this._activeChasingBuf;

    // 1. Spawning dynamic chase cop cars
    if (this.active) {
      this.spawnTimer -= dt;
      if (this.spawnTimer <= 0 && activeChasingCops.length < this.maxSpawnCops) {
        // Spawning frequency scales up with Heat Level (Toned down slightly)
        const baseMin = Math.max(3.5, 9.0 / this.heatLevel); // Toned down spawning (much larger delay before new spawn)
        const baseRand = Math.max(4.0, 10.0 / this.heatLevel);
        this.spawnTimer = baseMin + Math.random() * baseRand;
        this.spawnCop(world, playerPos, false);
      }
    }

    // 2. Spawning parked speed traps (maintain up to 4 parked cops in the world area)
    for (let i = 0; i < this.parkedCops.length; i++) {
      if (this.parkedCops[i].active && !this.parkedCops[i].alerted) this._activeParkedBuf[nParked++] = this.parkedCops[i];
    }
    this._activeParkedBuf.length = nParked;
    const activeParkedCops = this._activeParkedBuf;
    if (activeParkedCops.length < 4 && Math.random() < 0.1) {
      // Find candidate tiles from world.loadedTiles
      const candidates = [];
      for (const [key, tile] of world.loadedTiles.entries()) {
        // Use stored numeric gridX/gridZ instead of splitting the string key
        const tx = tile.gridX;
        const tz = tile.gridZ;
        // Fast distance squared check before expensive sqrt
        const toDx = tile.posX - playerPos.x;
        const toDz = tile.posZ - playerPos.z;
        const dist = Math.sqrt(toDx * toDx + toDz * toDz);
        
        // Between 100m and 280m
        if (dist >= 100.0 && dist <= 280.0) {
          // Verify it's a road and not an alley / intersection
          const onCol = world.roadColumns.has(tx);
          const onRow = world.roadRows.has(tz);
          const isAlley = world.isAlley ? world.isAlley(tx, tz) : false;
          const isIntersection = onCol && onRow;
          
          if (!isAlley && !isIntersection && (onCol || onRow)) {
            // Check distance to other cops
            let tooCloseToOtherCop = false;
            const tileCenter = tile; // use tile.posX/posZ directly
            for (const other of this.cops) {
              const odx = other.position.x - tile.posX;
              const odz = other.position.z - tile.posZ;
              if (odx * odx + odz * odz < 40.0 * 40.0) {
                tooCloseToOtherCop = true;
                break;
              }
            }
            if (!tooCloseToOtherCop) {
              for (const other of this.parkedCops) {
                const odx = other.position.x - tile.posX;
                const odz = other.position.z - tile.posZ;
                if (odx * odx + odz * odz < 40.0 * 40.0) {
                  tooCloseToOtherCop = true;
                  break;
                }
              }
            }
            
            if (!tooCloseToOtherCop) {
              candidates.push({ tx, tz });
            }
          }
        }
      }
      
      if (candidates.length > 0) {
        // Pick a random candidate tile
        const choice = candidates[Math.floor(Math.random() * candidates.length)];
        this.spawnCopAtTile(world, choice.tx, choice.tz);
      }
    }

    // Build obstacle list into a reusable buffer — no spread/map alloc per frame
    if (!this._allVehiclesBuf) this._allVehiclesBuf = [];
    let nVeh = 0;
    this._allVehiclesBuf[nVeh++] = { position: playerPos };
    for (let i = 0; i < aiRacers.length; i++)       this._allVehiclesBuf[nVeh++] = aiRacers[i];
    for (let i = 0; i < traffic.vehicles.length; i++) this._allVehiclesBuf[nVeh++] = traffic.vehicles[i];
    for (let i = 0; i < activeChasingCops.length; i++) this._allVehiclesBuf[nVeh++] = activeChasingCops[i];
    this._allVehiclesBuf.length = nVeh;
    const allVehicles = this._allVehiclesBuf;

    // 3. Update cops AI
    activeChasingCops.forEach(cop => {
      // Find chase target (player or closest rival racer)
      let target = playerPos;
      let targetVelSpeed = playerSpeed;
      let targetHeading = this.app.physics.heading;
      let targetTryingToMove = isPlayerTryingToMove;
      
      let minTargetDist = cop.position.distanceTo(playerPos);
      
      aiRacers.forEach(ai => {
        const d = cop.position.distanceTo(ai.position);
        if (d < minTargetDist) {
          minTargetDist = d;
          target = ai.position;
          targetVelSpeed = ai.speed;
          targetHeading = ai.heading;
          targetTryingToMove = true; // AI racers are always trying to move
        }
      });

      cop.update(dt, world, target, targetVelSpeed, targetHeading, navGraph, allVehicles, targetTryingToMove);

      // Animate cop wheels rolling (if not low LOD)
      if (cop.wheels && !cop._lastLOD) {
        const cRot = (cop.speed / 0.42) * dt;
        cop.wheels.forEach(w => {
          w.children[0].rotation.x += cRot;
          w.children[1].rotation.x += cRot;
        });
      }

      // Flash Siren lights (red / blue flasher) (if not low LOD)
      if (cop.meshGroup && !cop._lastLOD) {
        const sirenBlue = cop.meshGroup.getObjectByName("sirenBlue");
        const sirenRed = cop.meshGroup.getObjectByName("sirenRed");
        if (sirenBlue && sirenRed) {
          sirenBlue.material.emissiveIntensity = cop.sirenState ? 0.05 : 6.0;
          sirenRed.material.emissiveIntensity = cop.sirenState ? 6.0 : 0.05;
        }
      }
    });

    // Update alerted parked cops (moves them to chasing array)
    this.parkedCops.forEach((cop, idx) => {
      if (!cop.isParked && cop.alerted) {
        this.cops.push(cop);
        this.parkedCops.splice(idx, 1);
        this.triggerPursuit(1);
      } else {
        // Find closest target for parked cop too (player or AI racer)
        let target = playerPos;
        let targetVelSpeed = playerSpeed;
        let targetHeading = this.app.physics.heading;
        let targetTryingToMove = isPlayerTryingToMove;
        
        let minTargetDist = cop.position.distanceTo(playerPos);
        
        aiRacers.forEach(ai => {
          const d = cop.position.distanceTo(ai.position);
          if (d < minTargetDist) {
            minTargetDist = d;
            target = ai.position;
            targetVelSpeed = ai.speed;
            targetHeading = ai.heading;
            targetTryingToMove = true; // AI racers are always trying to move
          }
        });

        cop.update(dt, world, target, targetVelSpeed, targetHeading, navGraph, allVehicles, targetTryingToMove);
      }
    });

    // 4. Evade / Cooldown Logic
    if (this.active) {
      // Check if any cop is close and can see player
      this.canSeePlayer = false;
      activeChasingCops.forEach(cop => {
        const d = cop.position.distanceTo(playerPos);
        if (d < 120.0) {
          // If close enough and not obstructed by building, cop can see player (scalar lerp, no alloc)
          const steps = 6;
          let hitBuilding = false;
          for (let i = 1; i <= steps; i++) {
            const t = i / steps;
            const cx = playerPos.x + (cop.position.x - playerPos.x) * t;
            const cz = playerPos.z + (cop.position.z - playerPos.z) * t;
            if (world.checkCollision(cx, cz, 1.0).collision) {
              hitBuilding = true;
              break;
            }
          }
          if (!hitBuilding) {
            this.canSeePlayer = true;
          }
        }
      });

      if (!this.canSeePlayer) {
        // Decay heat progress slowly when out of sight (takes 40 seconds of hiding to drop completely)
        this.heatProgress = Math.max(0.0, this.heatProgress - dt * 0.025);

        this.cooldownTimer += dt;
        if (this.cooldownTimer >= 6.0) {
          this.cooldownTimer = 0.0;
          this.heatLevel--;
          this.maxSpawnCops = Math.min(5, Math.max(1, this.heatLevel));
          if (this.heatLevel <= 0) {
            this.cancelPursuit();
          } else {
            this.app.showBanner("LOST COPS", `Heat Level: ${this.heatLevel}`);
          }
        }
      } else {
        this.cooldownTimer = 0.0;

        // Heat level only increases gradually when player is in cop's line of sight!
        // Takes 22 seconds of continuous line-of-sight to escalate 1 heat level
        this.heatProgress = Math.min(1.0, this.heatProgress + dt * 0.045);
        if (this.heatProgress >= 1.0) {
          this.heatProgress = 0.0;
          if (this.heatLevel < 5) {
            const prevHeat = this.heatLevel;
            this.heatLevel++;
            this.maxSpawnCops = Math.min(5, Math.max(1, this.heatLevel));
            this.app.showBanner("PURSUIT ESCALATED", `Heat Level: ${this.heatLevel}`);
            // Roadblocks disabled
            // if (this.heatLevel >= 3 && prevHeat < 3) {
            //   this.roadblockTimer = 10.0;
            // }
          }
        }
      }
    }

    // 5. Busting Progress Timer
    let copNear = false;
    activeChasingCops.forEach(cop => {
      if (cop.position.distanceTo(playerPos) < 8.5) {
        copNear = true;
      }
    });

    const isPlayerStopped = playerSpeed < 2.8 || !isPlayerTryingToMove;

    if (this.active && copNear && isPlayerStopped) {
      this.bustProgress = Math.min(1.0, this.bustProgress + dt * 0.35); // Busted in ~3 seconds
      if (this.bustProgress >= 1.0) {
        this.triggerBusted();
      }
    } else {
      this.bustProgress = Math.max(0.0, this.bustProgress - dt * 0.4); // Cools down quickly
    }

    // 6. Automatically clean up extremely distant cops — in-place reverse splice, no new array
    const pHdgSin = Math.sin(this.app.physics.heading);
    const pHdgCos = Math.cos(this.app.physics.heading);
    for (let ci = this.cops.length - 1; ci >= 0; ci--) {
      const cop = this.cops[ci];
      const dx = cop.position.x - playerPos.x;
      const dz = cop.position.z - playerPos.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      // Determine if behind player via dot product — pure scalar, no Vector3 alloc
      const dot = (dx / (dist || 1)) * pHdgSin + (dz / (dist || 1)) * pHdgCos;
      const isBehind = dot < -0.15;
      const cleanupDist = isBehind ? 160.0 : 350.0;
      if (dist > cleanupDist) {
        if (cop.meshGroup) {
          cop.meshGroup.traverse(child => { if (child.geometry) child.geometry.dispose(); });
          this.app.scene.remove(cop.meshGroup);
        }
        this.cops.splice(ci, 1);
      }
    }

    // Parked cop cleanup — in-place reverse splice, no new array
    for (let pi = this.parkedCops.length - 1; pi >= 0; pi--) {
      const cop = this.parkedCops[pi];
      if (cop.position.distanceTo(playerPos) > 350.0) {
        if (cop.meshGroup) {
          cop.meshGroup.traverse(child => { if (child.geometry) child.geometry.dispose(); });
          this.app.scene.remove(cop.meshGroup);
        }
        this.parkedCops.splice(pi, 1);
      }
    }

    // 7. Update active roadblocks
    this.roadblocks.forEach(rb => {
      rb.update(dt, playerPos);
    });

    // Roadblock cleanup — in-place reverse splice, no new array
    for (let ri = this.roadblocks.length - 1; ri >= 0; ri--) {
      const rb = this.roadblocks[ri];
      if (rb.position.distanceTo(playerPos) > 280.0) {
        rb.cleanup();
        this.roadblocks.splice(ri, 1);
      }
    }

    // 8. Roadblock spawning (DISABLED)
    // if (this.active && this.heatLevel >= 3) {
    //   this.roadblockTimer -= dt;
    //   if (this.roadblockTimer <= 0) {
    //     this.roadblockTimer = 25.0 + Math.random() * 15.0;
    //     const playerHeading = this.app.physics.heading;
    //     this.spawnRoadblockAttempt(world, playerPos, playerHeading);
    //   }
    // }
  }

  spawnRoadblockAttempt(world, playerPos, playerHeading) {
    if (this.roadblocks.length >= 4) return; // Keep max 4 active roadblocks at once (2 junctions blocked)

    const pfSin = Math.sin(playerHeading);
    const pfCos = Math.cos(playerHeading);
    const intersections = [];

    // 1. Find candidate 4-way intersections in front of the player
    for (const [key, tile] of world.loadedTiles.entries()) {
      const tx = tile.gridX;
      const tz = tile.gridZ;
      
      const onCol = world.roadColumns.has(tx);
      const onRow = world.roadRows.has(tz);
      const isAlley = world.isAlley ? world.isAlley(tx, tz) : false;
      const isIntersection = onCol && onRow;

      if (!isIntersection || isAlley) continue;

      // Distance check (spawn roadblocks a bit ahead: 100m to 190m)
      const tdx = tile.posX - playerPos.x;
      const tdz = tile.posZ - playerPos.z;
      const dist = Math.sqrt(tdx * tdx + tdz * tdz);

      if (dist < 100.0 || dist > 190.0) continue;

      // In front check
      const dot = (tdx / dist) * pfSin + (tdz / dist) * pfCos;
      if (dot < 0.5) continue;

      intersections.push({ tx, tz, posX: tile.posX, posZ: tile.posZ });
    }

    if (intersections.length === 0) return;

    // Pick the closest intersection to the player's path
    intersections.sort((a, b) => {
      const distA = Math.sqrt((a.posX - playerPos.x)**2 + (a.posZ - playerPos.z)**2);
      const distB = Math.sqrt((b.posX - playerPos.x)**2 + (b.posZ - playerPos.z)**2);
      return distA - distB;
    });

    const targetIntersection = intersections[0];
    const tx = targetIntersection.tx;
    const tz = targetIntersection.tz;

    // 2. Determine which direction the player is entering from
    const dx = targetIntersection.posX - playerPos.x;
    const dz = targetIntersection.posZ - playerPos.z;

    let entryDir = 'S'; // Default
    if (Math.abs(dx) > Math.abs(dz)) {
      entryDir = dx > 0 ? 'W' : 'E';
    } else {
      entryDir = dz > 0 ? 'S' : 'N';
    }

    // 3. The 3 potential exits:
    let exits = [];
    if (entryDir === 'S') {
      exits = [
        { dir: 'N', tx: tx, tz: tz + 1, isVertical: true, heading: 0 },
        { dir: 'E', tx: tx + 1, tz: tz, isVertical: false, heading: Math.PI / 2 },
        { dir: 'W', tx: tx - 1, tz: tz, isVertical: false, heading: Math.PI / 2 }
      ];
    } else if (entryDir === 'N') {
      exits = [
        { dir: 'S', tx: tx, tz: tz - 1, isVertical: true, heading: 0 },
        { dir: 'E', tx: tx + 1, tz: tz, isVertical: false, heading: Math.PI / 2 },
        { dir: 'W', tx: tx - 1, tz: tz, isVertical: false, heading: Math.PI / 2 }
      ];
    } else if (entryDir === 'W') {
      exits = [
        { dir: 'E', tx: tx + 1, tz: tz, isVertical: false, heading: Math.PI / 2 },
        { dir: 'N', tx: tx, tz: tz + 1, isVertical: true, heading: 0 },
        { dir: 'S', tx: tx, tz: tz - 1, isVertical: true, heading: 0 }
      ];
    } else if (entryDir === 'E') {
      exits = [
        { dir: 'W', tx: tx - 1, tz: tz, isVertical: false, heading: Math.PI / 2 },
        { dir: 'N', tx: tx, tz: tz + 1, isVertical: true, heading: 0 },
        { dir: 'S', tx: tx, tz: tz - 1, isVertical: true, heading: 0 }
      ];
    }

    // Shuffle exits and pick the first 2
    exits.sort(() => Math.random() - 0.5);
    const blockedExits = [exits[0], exits[1]];

    // 4. Spawn roadblocks on the selected two exits
    blockedExits.forEach((exit, index) => {
      const rbId = Date.now() + Math.floor(Math.random() * 1000) + index;
      const rbX = exit.tx * world.tileSize;
      const rbZ = exit.tz * world.tileSize;
      const rbPos = new THREE.Vector3(rbX, 0.35 + world.getBaseHeight(rbX, rbZ), rbZ);
      
      const roadblock = new Roadblock(rbId, exit.tx, exit.tz, rbPos, exit.heading, exit.isVertical, this.app);
      this.roadblocks.push(roadblock);
    });

    this.app.showBanner("ROADBLOCK AHEAD", "Police blockade set up at the next junction!");
  }

  triggerBusted() {
    this.busted = true;
    this.active = false;
    this.app.showBanner("BUSTED", "Fined $500!");
    
    // Lock physics & controls, freeze player, deduct cash
    this.app.keys = {}; // Stop input
    this.app.physics.speed = 0;
    this.app.physics.velocity.set(0, 0, 0);

    // Call game state reset after 3.5s
    setTimeout(() => {
      // Teleport player back to origin, reset heat
      this.app.physics.position.set(0, 0.5, 0);
      this.app.physics.heading = 0;
      this.app.physics.velocity.set(0, 0, 0);
      this.app.physics.speed = 0;
      
      this.busted = false;
      this.heatLevel = 0;
      this.bustProgress = 0.0;
      this.clearSpawnedCops();
      this.app.hudStatsEl.style.display = 'none';
      this.app.cancelBtnEl.style.display = 'none';
      this.app.navArrow.visible = false;
      this.app.clearCheckpointBeacons();
      this.app.clearAIMeshes();
    }, 3500);
  }
}
