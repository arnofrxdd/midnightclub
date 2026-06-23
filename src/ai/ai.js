import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
//  AICar  —  Pure Pursuit navigation on the NavGraph road network
//
//  How it works:
//    1. NavGraph.findPath() gives a list of road-intersection waypoints.
//       Every waypoint sits on a road — the path NEVER crosses a building.
//    2. Pure Pursuit picks a lookahead point L metres ahead on that path
//       and steers directly toward it.  No whisker confusion, no wrong-sign bugs.
//    3. Dynamic obstacles (other cars, traffic) are avoided by a simple lateral
//       dodge: check left/right 20m ahead, pick the clearer side.
//    4. Stuck recovery: hard-stop → rotate heading 90° away from wall → reverse
//       → recompute path.  Velocity is zeroed FIRST so there is no inertia fight.
//    5. Long-stuck (>5s): respawn to last checkpoint node + fresh path.
// ─────────────────────────────────────────────────────────────────────────────
export class AICar {
  constructor(id, name, colorHex, startPos, speedMultiplier) {
    this.id       = id;
    this.name     = name;
    this.colorHex = colorHex;

    // ── world state ──────────────────────────────────────────────────────────
    this.position        = startPos.clone();
    this.spawnPos        = startPos.clone();
    this.velocity        = new THREE.Vector3(); // used by main.js for impulse physics
    this.heading         = 0;                   // radians, 0 = +Z forward
    this.angularVelocity = 0;
    this.speed           = 0;                   // signed scalar m/s along heading

    // ── personality (unique per car, drives behaviour differences) ──────────
    // Each AI gets randomly seeded traits so they drive differently
    this.navVariance     = id * 0.37 + Math.random() * 1.8; // biases A* route choices
    this.cornerCutBias   = 0.4 + Math.random() * 0.6;       // 0=no cuts, 1=aggressive cuts
    this.alleyHunger     = 0.3 + Math.random() * 0.7;       // how eagerly it hunts alleys
    this.aggression      = 0.8 + Math.random() * 0.5;       // speed/braking aggression

    // ── tuning (scaled by personality) ───────────────────────────────────────
    this.maxSpeedBase = (55 + Math.random() * 22) * speedMultiplier; // 55–77 m/s
    this.maxSpeed     = this.maxSpeedBase;
    this.accel        = (28 + Math.random() * 10) * speedMultiplier;
    this.braking      = 55 + Math.random() * 20;
    this.drag         = 0.018 + Math.random() * 0.008;

    // Random lane offset, drifts over time for different driving lines
    this.lineOffset       = (Math.random() - 0.5) * 10;
    this._lineOffsetTimer = Math.random() * 6; // stagger drift resets

    // ── visual (read by main.js) ─────────────────────────────────────────────
    this.meshGroup    = null;
    this.wheels       = null;
    this.steeringAngle = 0;    // front-wheel visual angle
    this.maxSteerAngle = 0.65;
    this.isDrifting   = false;
    this.isBoosting   = false;
    this.recoveryBoostTimer = 0;

    // ── race progress ────────────────────────────────────────────────────────
    this.currentIndex     = 0;
    this.lapCurrent       = 1;
    this.unorderedCleared = new Set();
    this.completed        = false;
    this.timeFinished     = 0;
    this.triggerRadius    = 32;

    // ── path tracking ────────────────────────────────────────────────────────
    this._currentPath      = null;   // Vector3[] from navGraph.findPath()
    this._pathWptIdx       = 0;      // which waypoint we are currently targeting
    this._pathForCheckpoint = -1;    // which checkpoint idx this path was computed for
    this._pathForLap        = -1;

    // ── alley shortcut injection ──────────────────────────────────────────────
    this._alleyCheckTimer   = 0;
    this._injectedAlleyPt   = null; // active alley waypoint if any

    // ── stuck / recovery ─────────────────────────────────────────────────────
    this._stuckTimer      = 0;   // accumulates when making no progress (s)
    this._longStuck       = 0;   // total time stuck since last cp clear
    this._escapeTimer     = 0;   // how long to stay in reverse-escape mode
    this._escapeTargetHdg = 0;   // desired heading during escape

    // ── dynamic obstacle dodge ───────────────────────────────────────────────
    this._dodgeSide  = 0;    // -1 left, 0 centre, +1 right
    this._dodgeTimer = 0;
    this._dodgeApply = 0;    // actual lateral offset applied this frame (m)

    // ── stuck physical speed tracking ────────────────────────────────────────
    this._prevPos    = new THREE.Vector3(startPos.x, startPos.y, startPos.z);
    this._recentDist = 10.0;

    // ── confined area stuck tracking ─────────────────────────────────────────
    this._stuckAnchorPos  = new THREE.Vector3(startPos.x, startPos.y, startPos.z);
    this._stuckCheckTimer = 2.0;
    this._isTrapped       = false;

    // ── Nitro System ─────────────────────────────────────────────────────────
    this.nitroLevel = 0.5 + Math.random() * 0.5;
    this.isNitroBoosting = false;

    // ── Donut U-turn system ───────────────────────────────────────────────────
    this._donutTimer = 0;   // > 0 while spinning a U-turn donut
    this._donutDir   = 1;   // +1 = clockwise spin, -1 = counter-clockwise

    // ── Predictive corridor state ─────────────────────────────────────────────
    this._corridorOffset = 0; // current smoothed lateral offset in metres
  }

  // ═══════════════════════════════════════════════════════════════════════════
  update(dt, world, raceManager, traffic, navGraph) {
    this.debugLookahead = null;
    if (this.completed || !raceManager.active) {
      // Smoothly coast and brake to a stop instead of freezing instantly
      this.speed = Math.max(0, this.speed - this.braking * 0.4 * dt);
      
      const fwd = new THREE.Vector3(Math.sin(this.heading), 0, Math.cos(this.heading));
      this.velocity.copy(fwd).multiplyScalar(this.speed);
      
      this.position.addScaledVector(this.velocity, dt);
      
      const targetY = (world && typeof world.getGroundHeight === 'function') 
          ? world.getGroundHeight(this.position.x, this.position.z) : 0.5;
      this.position.y += (targetY - this.position.y) * 12.0 * dt;
      return;
    }

    dt = Math.min(dt, 0.05);
    this.recoveryBoostTimer = Math.max(0, this.recoveryBoostTimer - dt);

    // ── Drift lineOffset: each car gradually shifts its driving line ──────────
    this._lineOffsetTimer -= dt;
    if (this._lineOffsetTimer <= 0) {
      this._lineOffsetTimer = 4 + Math.random() * 8; // change every 4–12s
      // Drift toward a new random offset (more range = more reckless lines)
      const range = 10 * this.cornerCutBias;
      this.lineOffset = (Math.random() - 0.5) * range;
    }

    // ── 1. Resolve target checkpoint ────────────────────────────────────────
    const { target, targetPos } = this._resolveTarget(raceManager);
    if (!targetPos) {
      this.completed    = true;
      this.timeFinished = raceManager.timeElapsed;
      return;
    }

    // ── 2. Rubber-band speed scaling ─────────────────────────────────────────
    if (raceManager.playerPos) {
      const tc  = raceManager.checkpoints.length || 1;
      const pp  = raceManager.lapCurrent * tc + raceManager.currentIndex;
      const ap  = this.lapCurrent       * tc + this.currentIndex;
      const dif = pp - ap;
      const rb  = dif > 0
        ? 1.0 + Math.min(0.30, dif * 0.08)
        : Math.max(0.78, 1.0 + dif * 0.06);
      this.maxSpeed = this.maxSpeedBase * rb;
    }

    // ── 3. Compute (or reuse) A* path to current checkpoint ─────────────────
    const needNewPath =
      !this._currentPath ||
      this._pathForCheckpoint !== this.currentIndex ||
      this._pathForLap        !== this.lapCurrent;

    if (needNewPath && navGraph) {
      this._computePath(navGraph, targetPos);
    }

    // ── 3b. Periodic alley shortcut injection ────────────────────────────────
    // Each AI independently hunts for alley tiles between itself and the next
    // waypoint. If found, injects the alley as an immediate sub-target.
    if (navGraph && !this._escapeTimer) {
      this._alleyCheckTimer -= dt;
      if (this._alleyCheckTimer <= 0) {
        this._alleyCheckTimer = 0.6 + Math.random() * 0.3;
        this._tryInjectAlley(world, targetPos);
      }
    }

    // ── 4. ESCAPE MODE (reversing after stuck) ───────────────────────────────
    if (this._escapeTimer > 0) {
      this._escapeTimer -= dt;
      this._tickEscape(dt, world);
      this._applyWallPushback(world);
      this._checkCheckpoints(target, raceManager, world);
      this._updateMesh(world, dt);
      return;
    }

    // ── 4b. DONUT U-TURN MODE ────────────────────────────────────────────────
    if (this._donutTimer > 0) {
      this._donutTimer -= dt;
      this._tickDonut(dt, world);
      this._applyWallPushback(world);
      this._checkCheckpoints(target, raceManager, world);
      this._updateMesh(world, dt);
      return;
    }

    // ── 5. Pure Pursuit — lookahead point on path ────────────────────────────
    const lookahead = this._getLookaheadPoint(world);
    if (!lookahead) {
      // No path available — drive straight to target as fallback
      lookahead?.copy(targetPos) ?? targetPos.clone();
    }

    // ── 6. Dynamic obstacle dodge (lateral only, cars/traffic) ────────────────
    const fwd   = new THREE.Vector3(Math.sin(this.heading), 0, Math.cos(this.heading));
    const right  = new THREE.Vector3(Math.cos(this.heading), 0, -Math.sin(this.heading));

    // Apply lane offset (different driving line per car, drifts over time)
    // In alleys there is no room for a lane drift — zero it out to keep to the center.
    const inAlley = world.isAlley
      ? world.isAlley(Math.round(this.position.x / world.tileSize),
                      Math.round(this.position.z / world.tileSize))
      : false;
    const effectiveLineOffset = inAlley ? 0 : this.lineOffset;
    const lookaheadShifted = lookahead
      ? lookahead.clone().addScaledVector(right, effectiveLineOffset * 0.3)
      : null;
    const baseLookahead = (lookaheadShifted &&
      !world.checkCollision(lookaheadShifted.x, lookaheadShifted.z, 1.5).collision)
      ? lookaheadShifted
      : (lookahead || targetPos.clone());

    this._dodgeTimer -= dt;

    if (this._dodgeTimer <= 0 && this.speed > 4) {
      this._dodgeTimer = this.isNitroBoosting ? 0.05 : 0.10;
      // Scan 7 future corridors and smoothly interpolate toward the best one
      const targetOffset = this._scanBestCorridor(fwd, right, world, traffic, raceManager, inAlley);
      // Smooth transition — avoids sudden swerving; faster update at high speed
      const lerpRate = this.isNitroBoosting ? 0.55 : 0.35;
      this._corridorOffset += (targetOffset - this._corridorOffset) * lerpRate;
    }

    // Corridor offset applied to the lookahead; fade it out mid-corner
    const baseDx = baseLookahead.x - this.position.x;
    const baseDz = baseLookahead.z - this.position.z;
    let tempHdgErr = Math.atan2(baseDx, baseDz) - this.heading;
    while (tempHdgErr >  Math.PI) tempHdgErr -= Math.PI * 2;
    while (tempHdgErr < -Math.PI) tempHdgErr += Math.PI * 2;

    const cornerFade = Math.max(0, 1.0 - (Math.abs(tempHdgErr) - 0.25) * 2.5);
    const dodgedPt   = baseLookahead.clone().addScaledVector(right, this._corridorOffset * cornerFade);

    // Safety: if dodge pushes point into a building or its path is blocked, cancel it
    const midPt = this.position.clone().lerp(dodgedPt, 0.5);
    const usePt = (world.checkCollision(dodgedPt.x, dodgedPt.z, 2.0).collision ||
                   world.checkCollision(midPt.x, midPt.z, 2.0).collision)
      ? baseLookahead
      : dodgedPt;

    this.debugLookahead = usePt;

    // ── 7. Desired heading toward lookahead point ────────────────────────────
    const dx  = usePt.x - this.position.x;
    const dz  = usePt.z - this.position.z;
    let desiredHdg = Math.atan2(dx, dz);

    // ── 8. Alley centering — wider lateral whiskers to catch edge obstacles ────

    if (inAlley) {
      // Sample at 2m, 5m, and 8m to the left and right
      // This catches dumpsters/bins/poles at the alley edges well before contact
      const lh1 = world.checkCollision(this.position.x - right.x * 2.0, this.position.z - right.z * 2.0, 1.2);
      const lh2 = world.checkCollision(this.position.x - right.x * 5.0, this.position.z - right.z * 5.0, 1.2);
      const lh3 = world.checkCollision(this.position.x - right.x * 8.0, this.position.z - right.z * 8.0, 1.4);
      const rh1 = world.checkCollision(this.position.x + right.x * 2.0, this.position.z + right.z * 2.0, 1.2);
      const rh2 = world.checkCollision(this.position.x + right.x * 5.0, this.position.z + right.z * 5.0, 1.2);
      const rh3 = world.checkCollision(this.position.x + right.x * 8.0, this.position.z + right.z * 8.0, 1.4);
      // Nearest detected obstacle distance on each side
      const ld  = lh1.collision ? 2.0 : (lh2.collision ? 5.0 : (lh3.collision ? 8.0 : 14.0));
      const rd  = rh1.collision ? 2.0 : (rh2.collision ? 5.0 : (rh3.collision ? 8.0 : 14.0));
      // Push heading away from the closer side — stronger correction the closer it is
      const pushStrength = 0.07;
      desiredHdg += (rd - ld) * pushStrength;
    }

    // ── 9. Yaw rate (Pure Pursuit steer) ────────────────────────────────────
    let hdgErr = desiredHdg - this.heading;
    while (hdgErr >  Math.PI) hdgErr -= Math.PI * 2;
    while (hdgErr < -Math.PI) hdgErr += Math.PI * 2;

    // ── Donut U-turn trigger ─────────────────────────────────────────────────
    // When the path requires a near-reversal (>140°) and the car is slow enough,
    // enter a spinning donut burnout instead of trying to steer the long way round.
    if (this._donutTimer <= 0 && !this._escapeTimer &&
        Math.abs(hdgErr) > 2.4 && this.speed < 28) {
      this._donutDir   = Math.sign(hdgErr);
      // Duration scales slightly with how far off we are — bigger flip = longer spin
      this._donutTimer = 0.9 + Math.random() * 0.5;
      this._stuckTimer = 0;  // don't let stuck-timer fire mid-donut
    }

    const maxYaw    = 1.9;
    const yawTarget = Math.max(-maxYaw, Math.min(maxYaw, hdgErr * 3.2));
    this.angularVelocity += (yawTarget - this.angularVelocity) * 16 * dt;
    this.heading += this.angularVelocity * dt;

    // Visual steeringAngle for front wheel rendering in main.js
    this.steeringAngle = Math.max(-this.maxSteerAngle,
      Math.min(this.maxSteerAngle, yawTarget * 0.38));

    // ── 10. Speed control ────────────────────────────────────────────────────
    let targetSpeed = this.maxSpeed;

    // Hard alley speed cap — alleys are ~27m wide with obstacles at the edges.
    // Even a moderate personality car at 55 m/s cannot safely navigate them.
    if (inAlley) {
      targetSpeed = Math.min(targetSpeed, 22);
    }

    // Slow for sharp heading error (cornering)
    const absErr = Math.abs(hdgErr);
    if (absErr > 0.4) {
      targetSpeed *= Math.max(0.35, 1.0 - (absErr - 0.4) * 1.1);
    }

    // ── Fix #1: Speed-proportional wall lookahead ────────────────────────────
    // At 70 m/s a fixed 12m gives only 0.17s reaction — not enough to stop.
    // Scale lookahead with speed so the car always has time to react.
    const wallLookDist   = inAlley ? 7  : Math.max(14, this.speed * 0.45);
    const wallCheckRadius = inAlley ? 1.8 : 2.6;
    const fwdCheck = this.position.clone().addScaledVector(fwd, wallLookDist);
    const fwdHit   = world.checkCollision(fwdCheck.x, fwdCheck.z, wallCheckRadius);
    if (fwdHit.collision) {
      // Slow proportionally — closer to wall = lower speed cap
      const safeTop = inAlley ? 9 : Math.min(16, Math.max(5, this.speed * 0.25));
      targetSpeed   = Math.min(targetSpeed, safeTop);
    }

    // Medium-range check: extra caution at moderate distance
    const midClose = this.position.clone().addScaledVector(fwd, inAlley ? 5.5 : Math.max(8, this.speed * 0.22));
    if (world.checkCollision(midClose.x, midClose.z, inAlley ? 1.7 : 2.4).collision) {
      targetSpeed = Math.min(targetSpeed, inAlley ? 5 : 8);
    }

    // Extra close: hard brake for walls
    const veryClose = this.position.clone().addScaledVector(fwd, inAlley ? 4 : 6);
    if (world.checkCollision(veryClose.x, veryClose.z, inAlley ? 1.6 : 2.2).collision) {
      targetSpeed = 0;
    }

    // Slow down / brake for dynamic obstacles (player, other AI, traffic) in front of us
    let obstacleInFrontDist = Infinity;
    const obstacles = [];
    if (raceManager.playerPos) obstacles.push(raceManager.playerPos);
    raceManager.aiRacers.forEach(o => {
      if (o.id !== this.id) obstacles.push(o.position);
    });
    if (traffic && traffic.vehicles) {
      traffic.vehicles.forEach(v => obstacles.push(v.position));
    }

    for (const ob of obstacles) {
      const toOb = ob.clone().sub(this.position);
      const dist = toOb.length();
      if (dist < 20.0) {
        const fwdDot = toOb.normalize().dot(fwd);
        if (fwdDot > 0.82) { // Within ~35 degrees in front
          if (dist < obstacleInFrontDist) {
            obstacleInFrontDist = dist;
          }
        }
      }
    }

    if (obstacleInFrontDist < 12.0) {
      // Linearly brake to a halt
      const speedLimit = obstacleInFrontDist < 5.0 ? 0.0 : (obstacleInFrontDist - 5.0) * 3.5;
      targetSpeed = Math.min(targetSpeed, speedLimit);
    }

    // Nitro system update & activation
    if (this.isNitroBoosting) {
      this.nitroLevel = Math.max(0.0, this.nitroLevel - 0.25 * dt);
      // Immediately cancel nitro if there is an obstacle directly in front of us
      if (this.nitroLevel <= 0.0 || absErr > 0.35 || this.speed < 5.0 || obstacleInFrontDist < 18.0) {
        this.isNitroBoosting = false;
      }
    } else {
      this.nitroLevel = Math.min(1.0, this.nitroLevel + (this.isDrifting ? 0.15 : 0.04) * dt);
      if (absErr < 0.12 && this.speed > 15.0 && this.nitroLevel > 0.25 && !this._escapeTimer && Math.random() < 0.03) {
        this.isNitroBoosting = true;
      }
    }

    // Recovery boost or Nitro boost
    const boost = this.recoveryBoostTimer > 0 && this.speed < 35;
    const isBoosting = boost || this.isNitroBoosting;
    const effAccel = isBoosting ? (boost ? this.accel * 2.8 : this.accel * 1.85) : this.accel;
    if (this.isNitroBoosting) {
      targetSpeed *= 1.25;
    }

    if (this.speed < targetSpeed) {
      this.speed += effAccel * dt;
    } else {
      this.speed -= Math.min(this.braking * 0.5, this.speed - targetSpeed) * dt;
    }

    this.speed -= this.drag * this.speed * Math.abs(this.speed) * dt;
    this.speed  = Math.max(-8, Math.min(this.maxSpeed, this.speed));

    // ── 11. Update velocity from heading + speed ─────────────────────────────
    this.velocity.set(
      Math.sin(this.heading) * this.speed,
      0,
      Math.cos(this.heading) * this.speed
    );

    // ── 12. Stuck detection ──────────────────────────────────────────────────
    // Track actual physical distance moved to detect real blockages
    const distMoved = this.position.distanceTo(this._prevPos);
    this._prevPos.copy(this.position);

    const currentFrameSpeed = dt > 0 ? distMoved / dt : 0;
    this._recentDist += (currentFrameSpeed - this._recentDist) * 1.5 * dt;

    // Confined area check: evaluate displacement every 2.0s
    this._stuckCheckTimer -= dt;
    if (this._stuckCheckTimer <= 0) {
      this._stuckCheckTimer = 2.0;
      const displacement = this.position.distanceTo(this._stuckAnchorPos);
      this._stuckAnchorPos.copy(this.position);
      
      // If we moved less than 4.5 meters in 2.0 seconds, we are trapped in a loop or obstacle
      this._isTrapped = (displacement < 4.5);
    }

    // Stuck if the car is barely moving physically (under 1.0 m/s) or trapped in a loop
    const isStuckActual = (this._recentDist < 1.0) || this._isTrapped;

    if (isStuckActual) {
      this._stuckTimer += dt;
      this._longStuck  += dt;
    } else {
      this._stuckTimer = 0;
      // Do NOT reset this._longStuck to 0 here! It should only reset on checkpoint clear or respawn.
    }

    if (this._stuckTimer > 1.0) {
      this._beginEscape(world, right, inAlley, navGraph, targetPos);
      return; // escape handles position update this frame
    }

    if (this._longStuck > 5.5) {
      this._longStuck = 0;
      this._stuckTimer = 0;
      this._respawn(raceManager, world);
      return;
    }

    // ── 13. Position update ──────────────────────────────────────────────────
    this.position.addScaledVector(this.velocity, dt);
    const targetY = (world && typeof world.getGroundHeight === 'function')
      ? world.getGroundHeight(this.position.x, this.position.z)
      : 0.5;
    this.position.y += (targetY - this.position.y) * 12.0 * dt;

    // ── 14. Wall pushback ────────────────────────────────────────────────────
    this._applyWallPushback(world);

    // ── 15. Checkpoint collection ────────────────────────────────────────────
    this._checkCheckpoints(target, raceManager, world);

    // ── 16. Visual flags ─────────────────────────────────────────────────────
    this.isBoosting = boost || this.isNitroBoosting;
    this.isDrifting = absErr > 0.45 && this.speed > 12;

    // ── 17. Mesh sync ────────────────────────────────────────────────────────
    this._updateMesh(world, dt);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  PATH MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════════
  _computePath(navGraph, targetPos) {
    this._currentPath      = navGraph.findPath(
      this.position.x, this.position.z,
      targetPos.x,     targetPos.z,
      this.navVariance
    );
    this._postProcessPath(navGraph.world);
    this._pathWptIdx       = 0;
    this._pathForCheckpoint = this.currentIndex;
    this._pathForLap        = this.lapCurrent;
  }

  _postProcessPath(world) {
    if (!this._currentPath || this._currentPath.length < 3) return;
    const path = this._currentPath;
    for (let i = 1; i < path.length - 1; i++) {
      const pPrev = path[i - 1];
      const pCurr = path[i];
      const pNext = path[i + 1];
      // Vectors from current to previous and next — scalar, no heap alloc
      let v1x = pPrev.x - pCurr.x, v1z = pPrev.z - pCurr.z;
      let v2x = pNext.x - pCurr.x, v2z = pNext.z - pCurr.z;
      const v1len = Math.sqrt(v1x*v1x + v1z*v1z);
      const v2len = Math.sqrt(v2x*v2x + v2z*v2z);
      if (v1len < 0.001 || v2len < 0.001) continue;
      v1x /= v1len; v1z /= v1len;
      v2x /= v2len; v2z /= v2len;
      // Bisector
      let bx = v1x + v2x, bz = v1z + v2z;
      const blen = Math.sqrt(bx*bx + bz*bz);
      if (blen < 0.01) continue;
      bx /= blen; bz /= blen;
      const dot = v1x*v2x + v1z*v2z;
      if (dot > -0.95) {
        const cutDist = 4 + this.cornerCutBias * 8;
        const testX = pCurr.x + bx * cutDist;
        const testZ = pCurr.z + bz * cutDist;
        // ── Fix #3: Larger clearance radius (4.0m vs old 2.0m) ───────────────
        // A 2m check can leave waypoints dangerously close to building corners.
        // 4m ensures the car body (plus turning arc) clears the wall cleanly.
        if (!world.checkCollision(testX, testZ, 4.0).collision) {
          pCurr.x = testX;
          pCurr.z = testZ;
        }
      }
    }
  }

  _tryInjectAlley(world, targetPos) {
    if (!this._currentPath || this._pathWptIdx >= this._currentPath.length) return;
    const nextWpt = this._currentPath[this._pathWptIdx];
    const toWpt = new THREE.Vector3().subVectors(nextWpt, this.position);
    const dist = toWpt.length();
    if (dist < 15 || dist > 120) return;
    const steps = 6;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const testPt = this.position.clone().lerp(nextWpt, t);
      const gx = Math.round(testPt.x / world.tileSize);
      const gz = Math.round(testPt.z / world.tileSize);
      if (world.isAlley && world.isAlley(gx, gz)) {
        const alleyPt = new THREE.Vector3(gx * world.tileSize, 0.5, gz * world.tileSize);
        if (!world.checkCollision(alleyPt.x, alleyPt.z, 2.2).collision) {
          this._currentPath.splice(this._pathWptIdx, 0, alleyPt);
          break;
        }
      }
    }
  }

  // Pure Pursuit: find the point L metres ahead on the current path
  _getLookaheadPoint(world) {
    const path = this._currentPath;
    if (!path || path.length === 0) return null;

    // Helper for 2D distance (ignoring Y height changes on hills)
    const dist2D = (p1, p2) => {
      const dx = p1.x - p2.x;
      const dz = p1.z - p2.z;
      return Math.sqrt(dx * dx + dz * dz);
    };

    // Find the waypoint in a small forward window that is physically closest to the car (in 2D)
    let closestIdx = this._pathWptIdx;
    let closestDist = dist2D(this.position, path[closestIdx]);
    
    // Check up to 3 waypoints ahead (window of 4 total)
    const searchLimit = Math.min(path.length, this._pathWptIdx + 4);
    for (let i = this._pathWptIdx + 1; i < searchLimit; i++) {
      const d = dist2D(this.position, path[i]);
      if (d < closestDist) {
        closestDist = d;
        closestIdx = i;
      }
    }
    
    // Advance to the closest waypoint if we found a closer one ahead
    if (closestIdx > this._pathWptIdx) {
      this._pathWptIdx = closestIdx;
    }

    // ── Bulletproof Waypoint Clearing ────────────────────────────────────────
    // Advance to the next waypoint if:
    // 1. We physically hit it (within 12m)
    // 2. We drove past its perpendicular plane (it's now behind us) while within 35m
    // 3. We cut the corner and are now physically closer to the NEXT waypoint
    while (this._pathWptIdx < path.length - 1) {
      const targetWpt = path[this._pathWptIdx];
      const dist = dist2D(this.position, targetWpt);

      if (dist < 12) {
        this._pathWptIdx++;
        continue;
      }

      // If we are somewhat close, check if the waypoint is behind us
      if (dist < 35) {
        const toWptX = targetWpt.x - this.position.x;
        const toWptZ = targetWpt.z - this.position.z;
        const fwdX = Math.sin(this.heading);
        const fwdZ = Math.cos(this.heading);
        
        // Dot product < 0 means the point is behind the car's forward direction
        if ((toWptX * fwdX) + (toWptZ * fwdZ) < 0) {
          this._pathWptIdx++;
          continue;
        }
      }

      // Check if we are physically closer to the NEXT waypoint
      const nextWpt = path[this._pathWptIdx + 1];
      if (dist2D(this.position, nextWpt) < dist) {
        this._pathWptIdx++;
        continue;
      }

      break;
    }

    // Lookahead distance scales with speed (faster = look further ahead)
    const L = Math.max(14, Math.min(40, this.speed * 0.55));

    // Walk along path segments from current waypoint until L metres consumed — pure scalar, zero alloc
    let remaining = L;
    let px = this.position.x, pz = this.position.z;

    for (let i = this._pathWptIdx; i < path.length; i++) {
      const next = path[i];
      const dx = next.x - px;
      const dz = next.z - pz;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < 0.01) continue;
      if (dist >= remaining) {
        const t = remaining / dist;
        return new THREE.Vector3(px + dx * t, 0.5, pz + dz * t);
      }
      remaining -= dist;
      px = next.x;
      pz = next.z;
    }

    // ── Fix #2: Clamp lookahead point away from walls ────────────────────────
    // If the last waypoint itself is too close to a building, walk backwards
    // along the path to find a safer point at least 3.5m clear of any wall.
    const rawPt = path[path.length - 1];
    if (world.checkCollision(rawPt.x, rawPt.z, 3.5).collision) {
      // Try walking backwards a few steps to find clearance
      for (let back = path.length - 2; back >= this._pathWptIdx; back--) {
        const candidate = path[back];
        if (!world.checkCollision(candidate.x, candidate.z, 3.5).collision) {
          return candidate.clone();
        }
      }
    }
    return rawPt.clone();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  PREDICTIVE CORRIDOR SCANNER
  //  Evaluates N parallel future paths and returns the best lateral offset (m).
  //  Unlike the old binary dodge (left/center/right), this scans continuous
  //  offsets and scores them across the FULL look-ahead depth so the AI
  //  picks a line that is clear the whole way, not just at one point.
  // ═══════════════════════════════════════════════════════════════════════════
  _scanBestCorridor(fwd, right, world, traffic, raceManager, inAlley) {
    // ─ Build dynamic obstacle list once ───────────────────────────────────
    const dynObs = [];
    if (raceManager.playerPos) dynObs.push(raceManager.playerPos);
    raceManager.aiRacers.forEach(o => { if (o.id !== this.id) dynObs.push(o.position); });
    if (traffic) {
      if (traffic.vehicles)       traffic.vehicles.forEach(v => dynObs.push(v.position));
      if (traffic.parkedVehicles) traffic.parkedVehicles.forEach(v => dynObs.push(v.position));
    }

    // ─ Corridor candidates (metres to the right of current heading) ────────
    // Narrower spread in alleys where there is less lateral room.
    const offsets = inAlley
      ? [-4, -2, 0, 2, 4]
      : [-9, -6, -3, 0, 3, 6, 9];

    // How far ahead to scan, and how many depth slices to sample per corridor.
    // More slices = better prediction but more collision queries per frame.
    const scanDist  = Math.max(20, this.speed * 0.70);
    const numSteps  = 8;
    // Wider check radius at high speed (car footprint effective area grows)
    const checkR    = inAlley ? 1.6 : (this.isNitroBoosting ? 3.0 : 2.4);
    const dynR      = 5.5; // radius for dynamic obstacle detection

    let bestOffset = 0;
    let bestScore  = Infinity;

    for (let ci = 0; ci < offsets.length; ci++) {
      const offset = offsets[ci];
      // Small centre bias so the car hugs the middle when all paths are equally clear
      let score = Math.abs(offset) * 0.3;

      for (let s = 1; s <= numSteps; s++) {
        const t  = s / numSteps;           // 0..1 depth fraction
        const d  = t * scanDist;           // world-space distance ahead
        // Fan the corridor out gradually: at half-depth we are at half-offset.
        // This mimics how a real vehicle's path curves, not a straight strafe.
        const lat = offset * Math.min(1.0, t * 1.8);

        const px = this.position.x + fwd.x * d + right.x * lat;
        const pz = this.position.z + fwd.z * d + right.z * lat;

        // ■ Static obstacle (wall / building / alley prop)
        if (world.checkCollision(px, pz, checkR).collision) {
          // Earlier blocks in the corridor are much worse than far ones
          // so the AI prefers paths blocked only at the very end.
          score += 8000 * (2.0 - t);
          break; // Rest of this corridor doesn't matter
        }

        // ■ Dynamic obstacles (player, other AI, traffic)
        for (let di = 0; di < dynObs.length; di++) {
          const ob = dynObs[di];
          const dx = px - ob.x;
          const dz = pz - ob.z;
          if (dx * dx + dz * dz < dynR * dynR) {
            // Penalty scales with how close (time-wise) the obstacle is
            score += 350 * (1.5 - t * 0.5);
            break;
          }
        }
      }

      if (score < bestScore) {
        bestScore  = score;
        bestOffset = offset;
      }
    }

    return bestOffset;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  STUCK ESCAPE MODE
  // ═══════════════════════════════════════════════════════════════════════════
  _beginEscape(world, rightVec, inAlley, navGraph, targetPos) {
    // Find wall normal with expanding probe radius
    let wallNorm = null;
    for (const r of [2.4, 3.5, 5.0, 7.0]) {
      const hit = world.checkCollision(this.position.x, this.position.z, r);
      if (hit.collision) {
        wallNorm = new THREE.Vector3(hit.normalX, 0, hit.normalZ);
        break;
      }
    }

    // Escape heading: rotate 90° away from wall so reversing clears us
    if (wallNorm) {
      const wallDotRight = wallNorm.dot(rightVec);
      // If wall is to the right (wallDotRight > 0), turn the front left → escape heading = heading - 90°
      this._escapeTargetHdg = this.heading + (wallDotRight >= 0 ? -Math.PI / 2 : Math.PI / 2);
    } else {
      // No wall found: just do a 90° spin
      this._escapeTargetHdg = this.heading + Math.PI / 2;
    }

    // Normalise to ±π
    while (this._escapeTargetHdg >  Math.PI) this._escapeTargetHdg -= Math.PI * 2;
    while (this._escapeTargetHdg < -Math.PI) this._escapeTargetHdg += Math.PI * 2;

    // Kill all momentum FIRST — prevents inertia fighting the reverse
    this.speed = 0;
    this.velocity.set(0, 0, 0);
    this.angularVelocity = 0;
    this.steeringAngle = 0;

    this._escapeTimer = inAlley ? 0.85 : 1.35;
    this._stuckTimer  = 0;
    this.recoveryBoostTimer = 1.5;

    this._isTrapped = false;
    this._stuckCheckTimer = 2.0;
    this._stuckAnchorPos.copy(this.position);

    // Recompute path after escape so we don't follow the old stuck path
    if (navGraph && targetPos) {
      this._computePath(navGraph, targetPos);
    }

    // First frame of escape: update position
    this._tickEscape(0, world);
    this._applyWallPushback(world);
    this._updateMesh(world, 0.016);
  }

  _tickEscape(dt, world) {
    // Rotate heading DIRECTLY toward escape target (no velocity dependency)
    let err = this._escapeTargetHdg - this.heading;
    while (err >  Math.PI) err -= Math.PI * 2;
    while (err < -Math.PI) err += Math.PI * 2;

    const turnRate = 2.8; // rad/s — fast enough to pivot clear in ~0.5s
    this.heading += Math.sign(err) * Math.min(Math.abs(err), turnRate * dt);

    // Reverse at fixed speed — no accel curve confusion
    if (this._escapeTimer > 0.25) {
      this.speed   = -16;
    } else {
      // Last 0.25s: coast to a stop so we launch forward cleanly
      this.speed   = 0;
    }

    this.velocity.set(
      Math.sin(this.heading) * this.speed,
      0,
      Math.cos(this.heading) * this.speed
    );

    this.position.addScaledVector(this.velocity, dt);
    const targetY = (world && typeof world.getGroundHeight === 'function')
      ? world.getGroundHeight(this.position.x, this.position.z)
      : 0.5;
    this.position.y += (targetY - this.position.y) * 12.0 * dt;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  DONUT U-TURN
  // ═══════════════════════════════════════════════════════════════════════════
  _tickDonut(dt, world) {
    // Spin rate: ~3.2 rad/s completes ~180° in about 1 second
    const spinRate = 3.2;
    this.heading += this._donutDir * spinRate * dt;
    while (this.heading >  Math.PI) this.heading -= Math.PI * 2;
    while (this.heading < -Math.PI) this.heading += Math.PI * 2;

    // Drive forward at moderate speed to trace the circular arc (real donut shape)
    const targetSpeed = 16;
    this.speed += (targetSpeed - this.speed) * 4.0 * dt;
    this.speed  = Math.min(this.speed, this.maxSpeed);

    this.velocity.set(
      Math.sin(this.heading) * this.speed,
      0,
      Math.cos(this.heading) * this.speed
    );

    this.position.addScaledVector(this.velocity, dt);

    const targetY = (world && typeof world.getGroundHeight === 'function')
      ? world.getGroundHeight(this.position.x, this.position.z)
      : 0.5;
    this.position.y += (targetY - this.position.y) * 12.0 * dt;

    // Visual cues — full lock steer, drifting flag set for tire smoke
    this.isDrifting    = true;
    this.isBoosting    = false;
    this.steeringAngle = this._donutDir * this.maxSteerAngle;
    this.angularVelocity = this._donutDir * spinRate;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  WALL PUSHBACK  (runs every frame as safety net)
  // ═══════════════════════════════════════════════════════════════════════════
  _applyWallPushback(world) {
    // ── Fix #4: Two-tier wall response ───────────────────────────────────────
    // Tier A — Early warning (3.5m): gentle steering repulsion BEFORE impact.
    //           This steers the car away while it still has room to correct.
    // Tier B — Hard contact (2.0m): eject + kill momentum (original behaviour).

    const fwd = new THREE.Vector3(Math.sin(this.heading), 0, Math.cos(this.heading));
    const right = new THREE.Vector3(Math.cos(this.heading), 0, -Math.sin(this.heading));

    // Tier A: soft repulsion zone — don't need actual contact for this
    const nearHit = world.checkCollision(this.position.x, this.position.z, 3.5);
    if (nearHit.collision && !world.checkCollision(this.position.x, this.position.z, 2.0).collision) {
      // Apply a gentle lateral nudge away from the wall
      const n = new THREE.Vector3(nearHit.normalX, 0, nearHit.normalZ);
      const lateralDot = n.dot(right);
      // Nudge position slightly away — 0.4m per frame at most
      const nudge = Math.min(0.4, nearHit.overlap * 0.5);
      this.position.x += nearHit.normalX * nudge;
      this.position.z += nearHit.normalZ * nudge;
      // Also bias heading away — tiny angular push so the car steers clear
      // Positive lateralDot means wall is to the right → steer left (negative heading delta)
      this.heading -= lateralDot * 0.08;
      return; // Don't run Tier B this frame if only in soft zone
    }

    // Tier B: hard contact — eject and kill momentum
    const hit = world.checkCollision(this.position.x, this.position.z, 2.0);
    if (!hit.collision) return;

    // Eject the car out of the building
    this.position.x += hit.normalX * (hit.overlap + 0.1);
    this.position.z += hit.normalZ * (hit.overlap + 0.1);

    // Cancel velocity going INTO the wall
    const n  = new THREE.Vector3(hit.normalX, 0, hit.normalZ);
    const dv = this.velocity.dot(n);
    if (dv < 0) this.velocity.addScaledVector(n, -dv);

    // Cancel forward speed component into wall
    if (this.speed > 0 && fwd.dot(n) < -0.4) {
      this.speed *= 0.25;
    }

    // Accumulate stuck timer faster when physically inside a wall
    this._stuckTimer  += 0.18;
    this._longStuck   += 0.18;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  RESPAWN (long-stuck fallback)
  // ═══════════════════════════════════════════════════════════════════════════
  _respawn(raceManager, world) {
    const cps = raceManager.checkpoints;
    let cpIdx, targetCp;

    if (raceManager.mode === 'unordered') {
      const uncleared = [];
      cps.forEach((cp, i) => { if (!this.unorderedCleared.has(i)) uncleared.push({ cp, i }); });
      if (!uncleared.length) return;
      const sel = uncleared[Math.floor(Math.random() * uncleared.length)];
      cpIdx    = sel.i;
      targetCp = sel.cp;
    } else {
      cpIdx    = Math.max(0, this.currentIndex - 1);
      targetCp = cps[cpIdx];
    }
    if (!targetCp) return;

    // Find a clear spot near the checkpoint
    let cx = targetCp.x, cz = targetCp.z;
    if (world.checkCollision(cx, cz, 2.5).collision) {
      outer: for (const dist of [6, 10, 16, 24]) {
        for (let a = 0; a < 8; a++) {
          const ang = (a / 8) * Math.PI * 2;
          const tx  = targetCp.x + Math.cos(ang) * dist;
          const tz  = targetCp.z + Math.sin(ang) * dist;
          if (!world.checkCollision(tx, tz, 2.5).collision) { cx = tx; cz = tz; break outer; }
        }
      }
    }

    this.position.set(cx, 0.5, cz);
    this.velocity.set(0, 0, 0);
    this.speed = 0;
    this.angularVelocity = 0;
    this._stuckTimer = 0;
    this._escapeTimer = 0;
    this._longStuck   = 0;
    this.recoveryBoostTimer = 1.5;

    this._isTrapped = false;
    this._stuckCheckTimer = 2.0;
    this._stuckAnchorPos.copy(this.position);
    this._prevPos.copy(this.position);
    this._recentDist = 10.0;
    this._currentPath = null; // force path recompute next frame

    // Point toward next checkpoint
    if (raceManager.mode !== 'unordered') {
      this.currentIndex = cpIdx;
      const ni = (cpIdx + 1) % cps.length;
      const nc = cps[ni];
      if (nc) this.heading = Math.atan2(nc.x - cx, nc.z - cz);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  HELPERS
  // ═══════════════════════════════════════════════════════════════════════════
  _resolveTarget(raceManager) {
    const cps = raceManager.checkpoints;
    let target = null, targetPos = null;

    if (raceManager.mode === 'unordered') {
      let minD2 = Infinity;
      cps.forEach((cp, idx) => {
        if (!this.unorderedCleared.has(idx)) {
          const d2 = (cp.x - this.position.x) ** 2 + (cp.z - this.position.z) ** 2;
          if (d2 < minD2) { minD2 = d2; target = cp; }
        }
      });
    } else {
      if (this.currentIndex < cps.length) target = cps[this.currentIndex];
    }

    if (target) targetPos = new THREE.Vector3(target.x, 0.5, target.z);
    return { target, targetPos };
  }

  _checkCheckpoints(target, raceManager, world) {
    if (!target) return;
    const dx = this.position.x - target.x;
    const dz = this.position.z - target.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    const gx   = Math.round(this.position.x / world.tileSize);
    const gz   = Math.round(this.position.z / world.tileSize);
    const r    = (world.isAlley && world.isAlley(gx, gz)) ? 65 : this.triggerRadius;
    if (dist >= r) return;

    const cps  = raceManager.checkpoints;
    this._longStuck = 0;

    if (raceManager.mode === 'unordered') {
      const idx = cps.findIndex(cp => cp === target);
      if (idx !== -1) {
        this.unorderedCleared.add(idx);
        this._currentPath = null; // recompute to next target
        if (this.unorderedCleared.size === cps.length) {
          this.completed    = true;
          this.timeFinished = raceManager.timeElapsed;
        }
      }
    } else {
      this._currentPath = null; // always recompute for new checkpoint
      if (raceManager.mode === 'circuit') {
        if (this.currentIndex === cps.length - 1) {
          if (this.lapCurrent < raceManager.lapsTotal) { this.lapCurrent++; this.currentIndex = 0; }
          else { this.completed = true; this.timeFinished = raceManager.timeElapsed; }
        } else { this.currentIndex++; }
      } else {
        if (this.currentIndex === cps.length - 1) { this.completed = true; this.timeFinished = raceManager.timeElapsed; }
        else { this.currentIndex++; }
      }
    }
  }

  _updateMesh(world, dt) {
    if (!this.meshGroup) return;
    this.meshGroup.position.copy(this.position);
    if (world && typeof world.alignMeshToTerrain === 'function') {
      world.alignMeshToTerrain(this.meshGroup, this.position, this.heading, false, dt || 0.016);
    } else {
      this.meshGroup.rotation.y = this.heading;
    }
  }
}
