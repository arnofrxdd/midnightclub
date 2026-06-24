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
        // Stagger pathfinding aggressively for distant cops to save CPU
        this._pathTimer = distToTarget > 150 ? (2.0 + Math.random() * 1.0) : (0.8 + Math.random() * 0.4);
        if (navGraph) {
          this._currentPath = navGraph.findPath(
            this.position.x, this.position.z,
            targetPos.x, targetPos.z
          );
          this._pathWptIdx = 0;
        }
      }

      if (this._currentPath && this._currentPath.length > 0) {
        // Advance waypoint if close (measured in 2D to avoid sloped intersection loops)
        while (this._pathWptIdx < this._currentPath.length - 1) {
          const wp = this._currentPath[this._pathWptIdx];
          const dx = this.position.x - wp.x;
          const dz = this.position.z - wp.z;
          const d2Sq = dx * dx + dz * dz;
          if (d2Sq < 144) { // 12 * 12 = 144
            this._pathWptIdx++;
          } else {
            break;
          }
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

    if (this.velocityY === undefined) this.velocityY = 0;
    this.velocityY -= 14.0 * dt; // Match player gravity
    const nextY = this.position.y + this.velocityY * dt;

    if (nextY < targetY) {
      this.position.y += (targetY - this.position.y) * 12.0 * dt;
      if (this.position.y < targetY) this.position.y = targetY;

      // Removed expensive redundant ground slope checks. Visual pitch is 
      // already handled automatically by world.alignMeshToTerrain
      this.velocityY = 0;
      this.isAirborne = false;
    } else {
      this.position.y = nextY;
      this.isAirborne = true;
    }

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

    if (this.velocityY === undefined) this.velocityY = 0;
    this.velocityY -= 14.0 * dt; // Match player gravity
    const nextY = this.position.y + this.velocityY * dt;

    if (nextY < targetY) {
      this.position.y += (targetY - this.position.y) * 12.0 * dt;
      if (this.position.y < targetY) this.position.y = targetY;

      const fwd = new THREE.Vector3(Math.sin(this.heading), 0, Math.cos(this.heading));
      const rearWheelX = this.position.x - fwd.x * 1.3;
      const rearWheelZ = this.position.z - fwd.z * 1.3;
      const hRearFwd = world ? world.getGroundHeight(rearWheelX + fwd.x * 0.5, rearWheelZ + fwd.z * 0.5) : targetY;
      const hRearBack = world ? world.getGroundHeight(rearWheelX - fwd.x * 0.5, rearWheelZ - fwd.z * 0.5) : targetY;
      const rearFwdSlope = (hRearFwd - hRearBack) / 1.0;

      const fwdSpeed = this.velocity.dot(fwd);
      this.velocityY = fwdSpeed * rearFwdSlope;
      this.isAirborne = false;
    } else {
      this.position.y = nextY;
      this.isAirborne = true;
    }
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
      if (dv < -3.0) {
        this.justCrashed = true;
        this.lastWallImpactSpeed = Math.abs(dv);
        this.lastWallImpactNormal = new THREE.Vector3(hit.normalX, 0, hit.normalZ);
      }
    }

    if (this.speed > 0 && (this.velocity.x * hit.normalX + this.velocity.z * hit.normalZ) < -0.4) {
      this.speed *= 0.2;
    }
  }

  _updateMesh() {
    if (!this.meshGroup) return;
    this.meshGroup.position.copy(this.position);
    if (this.app && this.app.world && typeof this.app.world.alignMeshToTerrain === 'function') {
      this.app.world.alignMeshToTerrain(this.meshGroup, this.position, this.heading, this.isAirborne);
    } else {
      this.meshGroup.rotation.y = this.heading;
    }
  }
}
