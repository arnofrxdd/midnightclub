import * as THREE from 'three';

export class CopCar {
  constructor(id, startPos, isParked = false) {
    this.id = id;
    this.position = startPos.clone();
    this.velocity = new THREE.Vector3();
    this.heading = 0;
    this.angularVelocity = 0;
    this.speed = 0;
    this.active = true;
    this.isParked = isParked;
    this.alerted = !isParked; // Parked cops start unalerted until player speeds past
    this.opacity = 0.0; // Start transparent to fade in seamlessly

    // Cop specs
    this.maxSpeed = 48; // scales with heat
    this.accel = 24;
    this.braking = 50;
    this.drag = 0.015;

    // Visual states for main.js
    this.meshGroup = null;
    this.sirenTimer = 0;
    this.sirenState = false; // true = red, false = blue
    this.sirenLight = null;

    // Pathfinding
    this._currentPath = null;
    this._pathWptIdx = 0;
    this._pathTimer = 0;
    this._stuckTimer = 0;
    this._escapeTimer = 0;
    this._escapeTargetHdg = 0;
  }

  update(dt, world, targetPos, targetSpeed, targetHeading, navGraph, otherObstacles, isTargetTryingToMove = true) {
    if (!this.active) return;
    dt = Math.min(dt, 0.05);

    // Fade in seamlessly
    this.opacity = Math.min(1.0, this.opacity + dt * 1.5);

    // Initialize baseAccel
    if (this.baseAccel === undefined) {
      this.baseAccel = this.accel;
    }

    // 1. Siren flash animation
    this.sirenTimer += dt * 8.0; // Flash frequency
    this.sirenState = (Math.floor(this.sirenTimer) % 2 === 0);

    // Parked state check
    if (this.isParked && !this.alerted) {
      this.speed = 0;
      this.velocity.set(0, 0, 0);
      
      // Check if player/target is speeding past within detection range
      const distToTarget = this.position.distanceTo(targetPos);
      if (distToTarget < 45.0 && targetSpeed > 14.0) {
        this.alerted = true;
        this.isParked = false; // Wake up and join chase!
      }
      this._updateMesh();
      return;
    }

    // 2. Resolve navigation target
    const distToTarget = this.position.distanceTo(targetPos);
    
    // Determine unique circling offset target if player is stopped
    let circleTargetPos = targetPos;
    let distToCircleTarget = distToTarget;
    let isCircling = false;

    const isTargetStopped = targetSpeed < 3.0 || !isTargetTryingToMove;

    if (isTargetStopped) {
      const offsetAngle = (this.id % 4) * (Math.PI / 2) + (this.id % 3) * 0.2;
      const radius = 7.2;
      // Reuse cached circleTarget to avoid allocating a new Vector3 every update
      if (!this._circleTarget) this._circleTarget = targetPos.clone();
      this._circleTarget.set(
        targetPos.x + Math.sin(offsetAngle) * radius,
        targetPos.y,
        targetPos.z + Math.cos(offsetAngle) * radius
      );
      circleTargetPos = this._circleTarget;
      distToCircleTarget = this.position.distanceTo(circleTargetPos);
      isCircling = true;
    }

    // If target (player) is stopped/stopping and cop has reached its parking spot
    if (isTargetStopped && (distToCircleTarget < 2.2 || distToTarget < 6.5)) {
      if (this.speed > 0) {
        // Brake smoothly to a stop over a short distance
        this.speed = Math.max(0, this.speed - this.braking * 1.5 * dt);
        this.angularVelocity *= Math.exp(-6.0 * dt);
        this.velocity.set(
          Math.sin(this.heading) * this.speed,
          0,
          Math.cos(this.heading) * this.speed
        );
        this.position.addScaledVector(this.velocity, dt);
        this._applyWallPushback(world);
        this._updateMesh();
        return;
      } else {
        this.speed = 0;
        this.velocity.set(0, 0, 0);
        this.angularVelocity = 0;
        this._updateMesh();
        return;
      }
    }

    let targetWaypoint = isCircling ? circleTargetPos.clone() : targetPos.clone();

    // Stuck escape handler
    if (this._escapeTimer > 0) {
      this._escapeTimer -= dt;
      this._tickEscape(dt, world);
      this._applyWallPushback(world);
      this._updateMesh();
      return;
    }

    // Update strategy AI
    if (this.strategyTimer === undefined) this.strategyTimer = 0.0;
    if (this.strategy === undefined) this.strategy = 'charge';
    if (this.slamTimer === undefined) this.slamTimer = 0.0;

    if (distToTarget <= 35.0) {
      this.strategyTimer -= dt;
      if (this.strategyTimer <= 0 && this.slamTimer <= 0) {
        this.strategyTimer = 5.0 + Math.random() * 4.0; // Less frequent adjustments (toned down from 2.5-4.5s)
        const r = Math.random();
        // Lower PIT maneuver probability from 80% to 30%
        this.strategy = r < 0.15 ? 'leftPIT' : (r < 0.3 ? 'rightPIT' : 'charge');
      }
    }

    // A* Pathfinding to target when far, direct interception/strategy when close
    let isSlamming = false;
    if (distToTarget > 35.0) {
      this._pathTimer -= dt;
      if (this._pathTimer <= 0 || !this._currentPath) {
        this._pathTimer = 0.8 + Math.random() * 0.4;
        if (navGraph) {
          this._currentPath = navGraph.findPath(
            this.position.x, this.position.z,
            targetPos.x, targetPos.z
          );
          this._pathWptIdx = 0;
        }
      }

      if (this._currentPath && this._currentPath.length > 0) {
        // Advance waypoint if close
        while (
          this._pathWptIdx < this._currentPath.length - 1 &&
          this.position.distanceTo(this._currentPath[this._pathWptIdx]) < 12
        ) {
          this._pathWptIdx++;
        }
        targetWaypoint.copy(this._currentPath[this._pathWptIdx]);
      }
    } else {
      // Close range: execute strategy
      if (this.slamTimer > 0) {
        this.slamTimer -= dt;
        isSlamming = true;
        targetWaypoint.copy(targetPos);
      } else {
        const tfX = Math.sin(targetHeading);
        const tfZ = Math.cos(targetHeading);

        if (this.strategy === 'leftPIT' || this.strategy === 'rightPIT') {
          const sideSign = this.strategy === 'leftPIT' ? -1 : 1;
          // PIT maneuver offset — pure scalar, no Vector3 alloc
          // right vector = (cos(h), 0, -sin(h)), forward = (sin(h), 0, cos(h))
          const sideX = Math.cos(targetHeading) * sideSign * 4.5;
          const sideZ = -Math.sin(targetHeading) * sideSign * 4.5;
          const aheadX = tfX * 3.0;
          const aheadZ = tfZ * 3.0;
          targetWaypoint.set(
            targetPos.x + sideX + aheadX,
            targetPos.y,
            targetPos.z + sideZ + aheadZ
          );

          // Check if alongside player to trigger sideways swipe/slam boost (pure scalar)
          const relX = this.position.x - targetPos.x;
          const relZ = this.position.z - targetPos.z;
          const distForward = relX * tfX + relZ * tfZ;
          // right component: relX * cos(h) + relZ * (-sin(h))
          const distLateral = Math.abs(relX * Math.cos(targetHeading) + relZ * (-Math.sin(targetHeading)));

          if (distForward > -6.0 && distForward < 6.0 && distLateral < 8.0) {
            this.slamTimer = 0.8;
            isSlamming = true;
            this.strategyTimer = 0.5;
            targetWaypoint.copy(targetPos);
          }
        } else {
          // Charge directly
          targetWaypoint.copy(targetPos);
        }
      }
    }

    // Steering towards target
    const dx = targetWaypoint.x - this.position.x;
    const dz = targetWaypoint.z - this.position.z;
    let desiredHdg = Math.atan2(dx, dz);

    if (isSlamming) {
      // Force steer hard into the player's side
      const sideSign = this.position.x < targetPos.x ? 0.35 : -0.35;
      desiredHdg += sideSign;
    }

    // Simple obstacle avoidance: nudge away from other vehicles (pure scalar, no alloc)
    const rgtCosH = Math.cos(this.heading);
    const rgtSinH = -Math.sin(this.heading);
    for (let oi = 0; oi < otherObstacles.length; oi++) {
      const ob = otherObstacles[oi];
      if (ob !== this && ob.position) {
        const d = this.position.distanceTo(ob.position);
        if (d < 8.0) {
          const obx = ob.position.x - this.position.x;
          const obz = ob.position.z - this.position.z;
          const dotRight = obx * rgtCosH + obz * rgtSinH;
          desiredHdg += (dotRight > 0 ? -0.35 : 0.35) * (1.0 - d / 8.0);
        }
      }
    }

    let hdgErr = desiredHdg - this.heading;
    while (hdgErr > Math.PI) hdgErr -= Math.PI * 2;
    while (hdgErr < -Math.PI) hdgErr += Math.PI * 2;

    const maxYaw = 2.4;
    const yawTarget = Math.max(-maxYaw, Math.min(maxYaw, hdgErr * 3.8));
    this.angularVelocity += (yawTarget - this.angularVelocity) * 16 * dt;
    this.heading += this.angularVelocity * dt;

    // Speed control (ramming vs boxing-in strategy)
    let targetSpeedCap = this.maxSpeed;
    if (isSlamming) {
      this.accel = this.baseAccel * 1.15; // Toned down from 1.35
      targetSpeedCap = Math.max(this.maxSpeed, targetSpeed + 3.0); // Toned down from +6.0
    } else {
      this.accel = this.baseAccel;
      if (targetSpeed < 3.0) {
        // If player is stopped or stopping, slow down as we close in to box them in smoothly
        if (distToTarget < 25.0) {
          targetSpeedCap = Math.max(1.5, (distToTarget - 5.0) * 1.8);
        } else {
          targetSpeedCap = this.maxSpeed * 0.6; // Slow down on approach
        }
      } else {
        if (distToTarget < 20.0) {
          // Close range: match/surpass target speed to ram hard
          targetSpeedCap = Math.max(this.maxSpeed, targetSpeed + 5.0);
        }
      }
    }

    // Slow down on tight turns
    const absErr = Math.abs(hdgErr);
    if (absErr > 0.6) {
      targetSpeedCap *= Math.max(0.4, 1.0 - (absErr - 0.6) * 1.2);
    }

    // Accelerate / Brake
    if (this.speed < targetSpeedCap) {
      this.speed += this.accel * dt;
    } else {
      // Brake harder when trying to slow down quickly for boxing-in or cornering
      const brakeMult = (targetSpeedCap < 12.0) ? 1.6 : 0.8;
      this.speed -= this.braking * brakeMult * dt;
    }

    this.speed -= this.drag * this.speed * Math.abs(this.speed) * dt;
    this.speed = Math.max(-10, Math.min(targetSpeedCap, this.speed));

    this.velocity.set(
      Math.sin(this.heading) * this.speed,
      0,
      Math.cos(this.heading) * this.speed
    );

    // Stuck check
    if (this.speed < 1.5) {
      this._stuckTimer += dt;
    } else {
      this._stuckTimer = 0;
    }

    if (this._stuckTimer > 1.2) {
      this._beginEscape(world, rgtCosH, rgtSinH);
      return;
    }

    // Apply movement
    this.position.addScaledVector(this.velocity, dt);
    const targetY = (world && typeof world.getGroundHeight === 'function')
      ? world.getGroundHeight(this.position.x, this.position.z)
      : 0.5;
    this.position.y += (targetY - this.position.y) * 12.0 * dt;

    this._applyWallPushback(world);
    this._updateMesh();
  }

  _beginEscape(world, rgtCosH, rgtSinH) {
    const hit = world.checkCollision(this.position.x, this.position.z, 3.0);
    if (hit.collision) {
      // Dot wall normal against right vector — pure scalar, no Vector3 alloc
      const wallDotRight = hit.normalX * rgtCosH + hit.normalZ * rgtSinH;
      this._escapeTargetHdg = this.heading + (wallDotRight >= 0 ? -Math.PI / 2 : Math.PI / 2);
    } else {
      this._escapeTargetHdg = this.heading + Math.PI;
    }

    while (this._escapeTargetHdg > Math.PI) this._escapeTargetHdg -= Math.PI * 2;
    while (this._escapeTargetHdg < -Math.PI) this._escapeTargetHdg += Math.PI * 2;

    this.speed = 0;
    this.velocity.set(0, 0, 0);
    this.angularVelocity = 0;
    this._stuckTimer = 0;
    this._escapeTimer = 1.0;
  }

  _tickEscape(dt, world) {
    let err = this._escapeTargetHdg - this.heading;
    while (err > Math.PI) err -= Math.PI * 2;
    while (err < -Math.PI) err += Math.PI * 2;

    this.heading += Math.sign(err) * Math.min(Math.abs(err), 3.0 * dt);
    this.speed = -12;
    this.velocity.set(Math.sin(this.heading) * this.speed, 0, Math.cos(this.heading) * this.speed);
    this.position.addScaledVector(this.velocity, dt);
    const targetY = (world && typeof world.getGroundHeight === 'function')
      ? world.getGroundHeight(this.position.x, this.position.z)
      : 0.5;
    this.position.y += (targetY - this.position.y) * 12.0 * dt;
  }

  _applyWallPushback(world) {
    const hit = world.checkCollision(this.position.x, this.position.z, 2.0);
    if (!hit.collision) return;

    this.position.x += hit.normalX * (hit.overlap + 0.1);
    this.position.z += hit.normalZ * (hit.overlap + 0.1);

    // Reflect velocity along wall normal — pure scalar, no Vector3 alloc
    const dv = this.velocity.x * hit.normalX + this.velocity.z * hit.normalZ;
    if (dv < 0) {
      this.velocity.x -= dv * hit.normalX;
      this.velocity.z -= dv * hit.normalZ;
    }
    
    if (this.speed > 0 && (this.velocity.x * hit.normalX + this.velocity.z * hit.normalZ) < -0.4) {
      this.speed *= 0.2;
    }
  }

  _updateMesh() {
    if (!this.meshGroup) return;
    this.meshGroup.position.copy(this.position);
    if (this.app && this.app.world && typeof this.app.world.alignMeshToTerrain === 'function') {
      this.app.world.alignMeshToTerrain(this.meshGroup, this.position, this.heading);
    } else {
      this.meshGroup.rotation.y = this.heading;
    }
  }
}

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
    if (this.heatLevel >= 3 && prevHeat < 3) {
      this.roadblockTimer = 10.0; // Quick initial roadblock when hitting Heat 3
    }
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

      if (Math.random() < 0.70) {
        const playerHeading = this.app.physics.heading;
        const fwdX = Math.sin(playerHeading);
        const fwdZ = Math.cos(playerHeading);

        if (Math.abs(fwdX) > Math.abs(fwdZ)) {
          // Driving mostly East/West (along X). Spawn ahead in X (approx 3-4 tiles), with minor Z offset (side road/parallel)
          const dirX = Math.sign(fwdX) !== 0 ? Math.sign(fwdX) : (Math.random() > 0.5 ? 1 : -1);
          rx = dirX * (3 + Math.floor(Math.random() * 2));
          rz = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2);
        } else {
          // Driving mostly North/South (along Z). Spawn ahead in Z (approx 3-4 tiles), with minor X offset (side road/parallel)
          const dirZ = Math.sign(fwdZ) !== 0 ? Math.sign(fwdZ) : (Math.random() > 0.5 ? 1 : -1);
          rz = dirZ * (3 + Math.floor(Math.random() * 2));
          rx = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2);
        }
      } else {
        // 30% random offset around the player (approx 3-4 tiles away)
        rx = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.floor(Math.random() * 2));
        rz = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.floor(Math.random() * 2));
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
      
      // Start at 90% of max speed to instantly charge the player
      cop.speed = cop.maxSpeed * 0.9;
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

      // Animate cop wheels rolling
      const cRot = (cop.speed / 0.42) * dt;
      if (cop.wheels) {
        cop.wheels.forEach(w => {
          w.children[0].rotation.x += cRot;
          w.children[1].rotation.x += cRot;
        });
      }

      // Flash Siren lights (red / blue flasher)
      if (cop.meshGroup) {
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
        cop.update(dt, world, playerPos, playerSpeed, this.app.physics.heading, navGraph, allVehicles);
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
            if (this.heatLevel >= 3 && prevHeat < 3) {
              this.roadblockTimer = 10.0; // Trigger roadblock quick initial check when hitting Heat 3
            }
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

    // 8. Spawn roadblocks periodically if active and heat >= 3
    if (this.active && this.heatLevel >= 3) {
      this.roadblockTimer -= dt;
      if (this.roadblockTimer <= 0) {
        this.roadblockTimer = 25.0 + Math.random() * 15.0; // check spawn every 25-40s
        const playerHeading = this.app.physics.heading;
        this.spawnRoadblockAttempt(world, playerPos, playerHeading);
      }
    }
  }

  spawnRoadblockAttempt(world, playerPos, playerHeading) {
    if (this.roadblocks.length >= 2) return; // Keep max 2 active roadblocks at once

    const pfSin = Math.sin(playerHeading);
    const pfCos = Math.cos(playerHeading);
    const candidates = [];

    for (const [key, tile] of world.loadedTiles.entries()) {
      // Use stored numeric tile coords — avoids key.split() string parse per tile
      const tx = tile.gridX;
      const tz = tile.gridZ;
      
      const onCol = world.roadColumns.has(tx);
      const onRow = world.roadRows.has(tz);
      const isAlley = world.isAlley ? world.isAlley(tx, tz) : false;
      const isIntersection = onCol && onRow;

      if (isAlley || isIntersection || (!onCol && !onRow)) continue;

      // Scalar distance and dot product — no Vector3 alloc
      const tdx = tile.posX - playerPos.x;
      const tdz = tile.posZ - playerPos.z;
      const dist = Math.sqrt(tdx * tdx + tdz * tdz);

      if (dist < 120.0 || dist > 180.0) continue;

      const dot = (tdx / dist) * pfSin + (tdz / dist) * pfCos;
      if (dot < 0.6) continue;

      let tooCloseToOther = false;
      for (const rb of this.roadblocks) {
        const rdx = rb.position.x - tile.posX;
        const rdz = rb.position.z - tile.posZ;
        if (rdx * rdx + rdz * rdz < 100.0 * 100.0) {
          tooCloseToOther = true;
          break;
        }
      }
      if (tooCloseToOther) continue;

      candidates.push({ tx, tz, posX: tile.posX, posZ: tile.posZ, isVertical: onCol });
    }

    if (candidates.length > 0) {
      const choice = candidates[Math.floor(Math.random() * candidates.length)];
      const heading = choice.isVertical ? 0 : Math.PI / 2;
      const rbId = Date.now() + Math.floor(Math.random() * 1000);
      const rbPos = new THREE.Vector3(choice.posX, 0.35 + world.getBaseHeight(choice.posX, choice.posZ), choice.posZ);
      const roadblock = new Roadblock(rbId, choice.tx, choice.tz, rbPos, heading, choice.isVertical, this.app);
      this.roadblocks.push(roadblock);
      this.app.showBanner("ROADBLOCK AHEAD", "Police blockade set up!");
    }
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

export class Roadblock {
  constructor(id, tileX, tileZ, position, heading, isVertical, app) {
    this.id = id;
    this.tileX = tileX;
    this.tileZ = tileZ;
    this.position = position.clone();
    this.heading = heading;
    this.isVertical = isVertical;
    this.app = app;
    this.active = true;

    this.meshGroup = new THREE.Group();
    this.meshGroup.position.copy(this.position);
    this.meshGroup.rotation.y = this.heading;
    this.app.scene.add(this.meshGroup);

    this.fences = []; // { mesh, localX, localZ, broken: false }
    this.obstacles = []; // Registered AABBs

    this.buildRoadblock();
  }

  buildRoadblock() {
    // 1. Spawning 2 parked cop cars blocking the lanes
    // In local coordinates:
    // Left lane: X = -5.5
    // Right lane: X = 5.5
    // Concrete barrier in center: X = 0
    // Sidewalk fences at X = -16.0 and X = 16.0
    
    // Cop car 1 (left lane)
    const { carGroup: cop1Group } = this.app.createVoxelCarMesh(0x000000, 'cop');
    cop1Group.position.set(-5.5, 0.15, 0);
    cop1Group.rotation.y = 0.2; // angled slightly
    this.meshGroup.add(cop1Group);

    // Cop car 2 (right lane)
    const { carGroup: cop2Group } = this.app.createVoxelCarMesh(0x000000, 'cop');
    cop2Group.position.set(5.5, 0.15, 0);
    cop2Group.rotation.y = -0.2; // angled slightly
    this.meshGroup.add(cop2Group);

    // Concrete barrier in the center
    const barrierMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.8 });
    const barrierGeo = new THREE.BoxGeometry(4.0, 1.4, 1.5);
    const barrierMesh = new THREE.Mesh(barrierGeo, barrierMat);
    barrierMesh.position.set(0, 0.7, 0);
    barrierMesh.castShadow = true;
    barrierMesh.receiveShadow = true;
    this.meshGroup.add(barrierMesh);

    // 2. Spawn wooden fences on the sidewalks
    // Fence left
    const fenceL = this.createFenceMesh();
    fenceL.position.set(-16.0, 0.0, 0);
    this.meshGroup.add(fenceL);
    this.fences.push({ mesh: fenceL, localX: -16.0, localZ: 0, broken: false });

    // Fence right
    const fenceR = this.createFenceMesh();
    fenceR.position.set(16.0, 0.0, 0);
    this.meshGroup.add(fenceR);
    this.fences.push({ mesh: fenceR, localX: 16.0, localZ: 0, broken: false });

    // 3. Register solid obstacles in world.obstacles for the cop cars & concrete barrier
    // The lanes are blocked from X = -12.0 to X = 12.0.
    // Size of lane block: sx = 24.0, sz = 4.0, height = 2.5
    this.addWorldObstacle(0, 0, 24.0, 4.0, 2.5);
  }

  createFenceMesh() {
    const group = new THREE.Group();
    
    // Horizontal bar (striped red/white)
    const barGeo = new THREE.BoxGeometry(4.5, 0.5, 0.2);
    
    // Create canvas texture for stripes
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 64, 16);
    ctx.fillStyle = '#ff3333';
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 16, 16);
      ctx.lineTo(i * 16 + 8, 16);
      ctx.lineTo(i * 16 + 16, 0);
      ctx.lineTo(i * 16 + 8, 0);
      ctx.closePath();
      ctx.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    
    const barMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8 });
    const barMesh = new THREE.Mesh(barGeo, barMat);
    barMesh.position.y = 1.0;
    barMesh.castShadow = true;
    group.add(barMesh);

    // Legs
    const legMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.5 });
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, 0.8), legMat);
    legL.position.set(-2.0, 0.6, 0);
    legL.castShadow = true;
    group.add(legL);

    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, 0.8), legMat);
    legR.position.set(2.0, 0.6, 0);
    legR.castShadow = true;
    group.add(legR);

    return group;
  }

  addWorldObstacle(lx, lz, sx, sz, height) {
    let worldX = this.position.x;
    let worldZ = this.position.z;
    let finalSx = sx;
    let finalSz = sz;

    if (this.isVertical) {
      // Runs along Z, so local X runs across Z (world X).
      worldX += lx;
      worldZ += lz;
    } else {
      // Runs along X, so local X runs across X (world Z).
      worldX += lz;
      worldZ += lx;
      finalSx = sz;
      finalSz = sx;
    }

    const obs = {
      xMin: worldX - finalSx/2,
      xMax: worldX + finalSx/2,
      zMin: worldZ - finalSz/2,
      zMax: worldZ + finalSz/2,
      height: height
    };

    this.obstacles.push(obs);
    this.app.world.obstacles.push(obs);

    // Insert into spatial hash grid
    const cs = this.app.world.spatialCellSize;
    const x0 = Math.floor(obs.xMin / cs);
    const x1 = Math.floor(obs.xMax / cs);
    const z0 = Math.floor(obs.zMin / cs);
    const z1 = Math.floor(obs.zMax / cs);
    for (let cx = x0; cx <= x1; cx++) {
      for (let cz = z0; cz <= z1; cz++) {
        const k = `${cx},${cz}`;
        if (!this.app.world.obstacleGrid.has(k)) {
          this.app.world.obstacleGrid.set(k, []);
        }
        this.app.world.obstacleGrid.get(k).push(obs);
      }
    }
  }

  update(dt, playerPos) {
    // 1. Flash siren bar lights on cop cars inside roadblock meshGroup
    const flashState = (Math.floor(Date.now() / 250) % 2 === 0);
    this.meshGroup.traverse(child => {
      if (child.isMesh) {
        if (child.name === "sirenBlue") {
          child.material.emissiveIntensity = flashState ? 0.05 : 6.0;
        } else if (child.name === "sirenRed") {
          child.material.emissiveIntensity = flashState ? 6.0 : 0.05;
        }
      }
    });

    // 2. Check collision with breakable fences
    this.fences.forEach(fence => {
      if (fence.broken) return;

      // Compute world position of this fence
      let fWorldX = this.position.x;
      let fWorldZ = this.position.z;
      if (this.isVertical) {
        fWorldX += fence.localX;
        fWorldZ += fence.localZ;
      } else {
        fWorldX += fence.localZ;
        fWorldZ += fence.localX;
      }

      const fencePos = new THREE.Vector3(fWorldX, 0.5 + this.app.world.getBaseHeight(fWorldX, fWorldZ), fWorldZ);
      const dist = playerPos.distanceTo(fencePos);

      // If player crashes through the fence (within 3.5m)
      if (dist < 3.5) {
        fence.broken = true;
        
        // Remove fence mesh visually
        this.meshGroup.remove(fence.mesh);

        // Spawn wood splinter particles!
        if (typeof this.app.spawnParticles === 'function') {
          const dir = playerPos.clone().sub(fencePos).normalize();
          this.app.spawnParticles(fencePos, dir, 0xd2a679, 12);
        }
      }
    });
  }

  cleanup() {
    if (this.meshGroup) {
      this.meshGroup.traverse(child => {
        if (child.isMesh && child.geometry) child.geometry.dispose();
      });
      this.app.scene.remove(this.meshGroup);
    }

    // Remove solid obstacles
    const obsSet = new Set(this.obstacles);
    this.app.world.obstacles = this.app.world.obstacles.filter(obs => !obsSet.has(obs));

    // Remove from spatial hash grid
    const cs = this.app.world.spatialCellSize;
    for (const obs of this.obstacles) {
      const x0 = Math.floor(obs.xMin / cs);
      const x1 = Math.floor(obs.xMax / cs);
      const z0 = Math.floor(obs.zMin / cs);
      const z1 = Math.floor(obs.zMax / cs);
      for (let cx = x0; cx <= x1; cx++) {
        for (let cz = z0; cz <= z1; cz++) {
          const k = `${cx},${cz}`;
          const cell = this.app.world.obstacleGrid.get(k);
          if (cell) {
            const idx = cell.indexOf(obs);
            if (idx !== -1) cell.splice(idx, 1);
            if (cell.length === 0) this.app.world.obstacleGrid.delete(k);
          }
        }
      }
    }
  }
}
