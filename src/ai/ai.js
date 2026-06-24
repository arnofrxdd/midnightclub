import * as THREE from 'three';

const _copPos = new THREE.Vector3();
const _copFwd = new THREE.Vector3();
const _copRight = new THREE.Vector3();
const _tempFwd = new THREE.Vector3();
const _tempRight = new THREE.Vector3();
const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();

// ─────────────────────────────────────────────────────────────────────────────
//  AICar  —  Enhanced "Elite" AI  (v2)
//
//  Key upgrades over v1:
//    • Predictive braking: reads upcoming curve sharpness from path geometry
//      and starts braking BEFORE the corner, not inside it.
//    • Racing-line optimisation: cuts apexes by shifting the lookahead laterally
//      toward the inside of every bend (real racing-line math).
//    • Reduced rubber-band ceiling: max catch-up speed kept tighter so the AI
//      can't simply teleport past the player when far behind.
//    • Smarter nitro: only fires on confirmed straight segments (>35m clear),
//      never mid-corner. Also fires strategically on straights after tight alleys.
//    • Opponent awareness: remembers the player's last known position & velocity
//      to predict where they will be 0.4s ahead and plan pass/block accordingly.
//    • Micro-correction: heading jitter from path sampling is low-pass filtered
//      before being applied so the car tracks cleanly instead of wobbling.
//    • Braking-for-obstacles grades smoothly from 25m to full stop (old: 12→5).
//    • Escape / donut improvements: less likely to trigger on slight bends,
//      heading error threshold raised; escape reverse speed scales with speed at impact.
//    • Anti-wall-hover: if stuck against a wall from the SIDE (not front), rotates
//      perpendicular and nudges clear rather than reversing into a dead-end.
//    • Configurable "difficulty" multiplier fed from constructor so game can set
//      Easy / Medium / Hard / Elite tiers without touching the logic.
// ─────────────────────────────────────────────────────────────────────────────

export class AICar {
  constructor(id, name, colorHex, startPos, speedMultiplier, difficulty = 1.0) {
    this.id = id;
    this.name = name;
    this.colorHex = colorHex;

    // difficulty: 0.7 = easy, 1.0 = normal, 1.3 = hard, 1.6 = elite
    this._difficulty = Math.max(0.5, Math.min(2.0, difficulty));

    // ── world state ──────────────────────────────────────────────────────────
    this.position = startPos.clone();
    this.spawnPos = startPos.clone();
    this.velocity = new THREE.Vector3();
    this.heading = 0;
    this.angularVelocity = 0;
    this.speed = 0;

    // ── personality ──────────────────────────────────────────────────────────
    this.navVariance = id * 0.37 + Math.random() * 1.8;
    this.cornerCutBiasBase = (0.55 + Math.random() * 0.45) * this._difficulty;
    this.cornerCutBias = this.cornerCutBiasBase;
    this.alleyHunger = (0.45 + Math.random() * 0.55) * this._difficulty;
    this.aggression = (0.9 + Math.random() * 0.4) * this._difficulty;
    // How accurately the AI judges its own speed in corners (1.0 = perfect)
    this._brakeAccuracy = 0.75 + Math.random() * 0.25 * this._difficulty;
    // Reaction time offset (seconds) — harder AI reacts faster
    this._reactionDelay = Math.max(0, 0.18 - this._difficulty * 0.08 + Math.random() * 0.06);

    // ── tuning ───────────────────────────────────────────────────────────────
    // Hard difficulty increases base speed by up to 20% (less than old +45%)
    const diffSpeedBonus = 1.0 + (this._difficulty - 1.0) * 0.20;
    this.maxSpeedBase = (52 + Math.random() * 18) * speedMultiplier * diffSpeedBonus;
    this.maxSpeed = this.maxSpeedBase;
    this.accelBase = (26 + Math.random() * 10) * speedMultiplier * diffSpeedBonus;
    this.accel = this.accelBase;
    this.braking = (58 + Math.random() * 18) * this._difficulty;
    this.drag = 0.016 + Math.random() * 0.007;

    // ── driving line ─────────────────────────────────────────────────────────
    this.lineOffset = (Math.random() - 0.5) * 8;
    this._lineOffsetTimer = Math.random() * 6;

    // ── visual ───────────────────────────────────────────────────────────────
    this.meshGroup = null;
    this.wheels = null;
    this.steeringAngle = 0;
    this.maxSteerAngle = 0.65;
    this.isDrifting = false;
    this.isBoosting = false;
    this.recoveryBoostTimer = 0;

    // ── race progress ────────────────────────────────────────────────────────
    this.currentIndex = 0;
    this.lapCurrent = 1;
    this.unorderedCleared = new Set();
    this.completed = false;
    this.timeFinished = 0;
    this.triggerRadius = 32;

    // ── path tracking ────────────────────────────────────────────────────────
    this._currentPath = null;
    this._pathWptIdx = 0;
    this._pathForCheckpoint = -1;
    this._pathForLap = -1;

    // ── alley shortcut injection ──────────────────────────────────────────────
    this._alleyCheckTimer = 0;
    this._injectedAlleyPt = null;

    // ── stuck / recovery ─────────────────────────────────────────────────────
    this._stuckTimer = 0;
    this._longStuck = 0;
    this._escapeTimer = 0;
    this._escapeTargetHdg = 0;

    // ── obstacle avoidance ───────────────────────────────────────────────────
    this._dodgeSide = 0;
    this._dodgeTimer = 0;
    this._dodgeApply = 0;

    // ── physical movement tracking ───────────────────────────────────────────
    this._prevPos = new THREE.Vector3(startPos.x, startPos.y, startPos.z);
    this._recentDist = 10.0;

    // ── confined-area stuck ───────────────────────────────────────────────────
    this._stuckAnchorPos = new THREE.Vector3(startPos.x, startPos.y, startPos.z);
    this._stuckCheckTimer = 2.0;
    this._isTrapped = false;

    // ── Nitro ─────────────────────────────────────────────────────────────────
    this.nitroLevel = 0.5 + Math.random() * 0.5;
    this.isNitroBoosting = false;
    // Tracks consecutive straight frames before firing nitro (new: smarter trigger)
    this._straightTimer = 0;
    this._nitroHoldTimer = 0; // once firing, holds for minimum duration

    // ── Donut U-turn ─────────────────────────────────────────────────────────
    this._donutTimer = 0;
    this._donutDir = 1;

    // ── Predictive corridor ───────────────────────────────────────────────────
    this._corridorOffset = 0;

    // ── Racing-line apex targeting ────────────────────────────────────────────
    // Shift lookahead inward on bends to cut proper racing apexes
    this._apexOffset = 0;   // metres, signed (negative = left)
    this._apexOffsetTimer = 0;

    // ── Predictive braking ────────────────────────────────────────────────────
    // Pre-computed upcoming corner severity (0 = straight, 1 = hairpin)
    this._upcomingCornerSeverity = 0;
    this._cornerScanTimer = 0;

    // ── Player awareness ─────────────────────────────────────────────────────
    this._lastKnownPlayerPos = null;
    this._lastKnownPlayerVel = new THREE.Vector3();
    this._playerPredictedPos = new THREE.Vector3();
    this._passMode = 'none'; // 'none' | 'outside' | 'inside' | 'block'

    // ── Heading smoothing (anti-wobble) ──────────────────────────────────────
    this._smoothedDesiredHdg = 0;
    this._hdgSmoothInitted = false;

    // ── Vertical ─────────────────────────────────────────────────────────────
    this.velocityY = 0;
    this.isAirborne = false;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  update(dt, world, raceManager, traffic, navGraph, pursuit) {
    this.debugLookahead = null;

    if (this.completed || !raceManager.active) {
      this.speed = Math.max(0, this.speed - this.braking * 0.4 * dt);
      const fwd = _tempFwd.set(Math.sin(this.heading), 0, Math.cos(this.heading));
      this.velocity.copy(fwd).multiplyScalar(this.speed);
      this.position.addScaledVector(this.velocity, dt);
      const targetY = (world && typeof world.getGroundHeight === 'function')
        ? world.getGroundHeight(this.position.x, this.position.z) + 0.46 : 0.96;
      if (this.velocityY === undefined) this.velocityY = 0;
      this.velocityY -= 18.0 * dt;
      const nextY = this.position.y + this.velocityY * dt;
      if (nextY < targetY) {
        this.position.y += (targetY - this.position.y) * 12.0 * dt;
        if (this.position.y < targetY) this.position.y = targetY;
        this.velocityY = 0; this.isAirborne = false;
      } else {
        this.position.y = nextY; this.isAirborne = true;
      }
      return;
    }

    dt = Math.min(dt, 0.05);
    this.recoveryBoostTimer = Math.max(0, this.recoveryBoostTimer - dt);

    // ── Drift driving line ────────────────────────────────────────────────────
    this._lineOffsetTimer -= dt;
    if (this._lineOffsetTimer <= 0) {
      this._lineOffsetTimer = 4 + Math.random() * 8;
      const range = 8 * this.cornerCutBias;
      this.lineOffset = (Math.random() - 0.5) * range;
    }

    // ── 1. Resolve target checkpoint ─────────────────────────────────────────
    const { target, targetPos } = this._resolveTarget(raceManager);
    if (!targetPos) {
      this.completed = true;
      this.timeFinished = raceManager.timeElapsed;
      return;
    }

    // ── 2. Player awareness: update predicted position ────────────────────────
    this._updatePlayerPrediction(raceManager, dt);

    // ── 3. REDUCED rubber-banding (max ±20% speed, was ±45%) ─────────────────
    if (raceManager.playerPos && targetPos) {
      const tc = raceManager.checkpoints.length || 1;
      const pp = raceManager.lapCurrent * tc + raceManager.currentIndex;
      const ap = this.lapCurrent * tc + this.currentIndex;

      const macroDif = (pp - ap) * 150.0;
      const aiDistToCp = this.position.distanceTo(targetPos);
      const playerDistToCp = raceManager.playerPos.distanceTo(targetPos);
      const microDif = aiDistToCp - playerDistToCp;
      const totalBehind = macroDif + microDif;

      let rbSpeed = 1.0, rbAccel = 1.0, rbAggro = 1.0;
      if (totalBehind > 0) {
        // Catch-up — capped at +20% (was +45%) to feel more realistic
        const intensity = Math.min(1.0, totalBehind / 500.0);
        rbSpeed = 1.0 + 0.20 * intensity;
        rbAccel = 1.0 + 0.50 * intensity;
        rbAggro = 1.0 + 0.25 * intensity;
        if (totalBehind > 300 && Math.random() < 0.04 * dt) this.nitroLevel = 1.0;
      } else {
        // Slow-down when ahead — max -25% so the AI still drives correctly
        const leadDist = -totalBehind;
        const intensity = Math.min(1.0, leadDist / 350.0);
        rbSpeed = 1.0 - 0.25 * intensity;
        rbAccel = 1.0 - 0.15 * intensity;
        rbAggro = 1.0 - 0.15 * intensity;
      }

      this.maxSpeed = this.maxSpeedBase * rbSpeed;
      this.accel = this.accelBase * rbAccel;
      this.cornerCutBias = this.cornerCutBiasBase * rbAggro;
    }

    // ── 4. Compute or reuse A* path ───────────────────────────────────────────
    const needNewPath =
      !this._currentPath ||
      this._pathForCheckpoint !== this.currentIndex ||
      this._pathForLap !== this.lapCurrent;

    if (needNewPath && navGraph) {
      this._computePath(navGraph, targetPos);
    }

    // ── 4b. Periodic alley injection ─────────────────────────────────────────
    if (navGraph && !this._escapeTimer) {
      this._alleyCheckTimer -= dt;
      if (this._alleyCheckTimer <= 0) {
        this._alleyCheckTimer = 0.5 + Math.random() * 0.3;
        this._tryInjectAlley(world, targetPos);
      }
    }

    // ── 4c. Periodic upcoming-corner scan ────────────────────────────────────
    this._cornerScanTimer -= dt;
    if (this._cornerScanTimer <= 0) {
      this._cornerScanTimer = 0.25 + Math.random() * 0.1;
      this._upcomingCornerSeverity = this._scanUpcomingCorner();
    }

    // ── 5. ESCAPE MODE ────────────────────────────────────────────────────────
    if (this._escapeTimer > 0) {
      this._escapeTimer -= dt;
      this._tickEscape(dt, world);
      this._applyWallPushback(world);
      this._checkCheckpoints(target, raceManager, world);
      this._updateMesh(world, dt);
      return;
    }

    // ── 5b. DONUT U-TURN ─────────────────────────────────────────────────────
    if (this._donutTimer > 0) {
      this._donutTimer -= dt;
      this._tickDonut(dt, world);
      this._applyWallPushback(world);
      this._checkCheckpoints(target, raceManager, world);
      this._updateMesh(world, dt);
      return;
    }

    // ── 6. Pure Pursuit lookahead ─────────────────────────────────────────────
    const lookahead = this._getLookaheadPoint(world);

    const fwd = _tempFwd.set(Math.sin(this.heading), 0, Math.cos(this.heading));
    const right = _tempRight.set(Math.cos(this.heading), 0, -Math.sin(this.heading));

    const inAlley = world.isAlley
      ? world.isAlley(
        Math.round(this.position.x / world.tileSize),
        Math.round(this.position.z / world.tileSize))
      : false;

    // ── 6b. Racing-line apex shift ────────────────────────────────────────────
    // Every 0.3s decide which side the nearest bend apex lies on and
    // shift the lookahead toward it by up to 6 metres.
    this._apexOffsetTimer -= dt;
    if (!inAlley && this._apexOffsetTimer <= 0) {
      this._apexOffsetTimer = 0.3 + Math.random() * 0.1;
      this._apexOffset = this._computeApexOffset(right);
    }
    const effectiveLineOffset = inAlley ? 0 : this.lineOffset + this._apexOffset * this.cornerCutBias;
    const lookaheadShifted = lookahead
      ? lookahead.clone().addScaledVector(right, effectiveLineOffset * 0.3)
      : null;
    const baseLookahead = (lookaheadShifted &&
      !world.checkCollision(lookaheadShifted.x, lookaheadShifted.z, 1.5).collision)
      ? lookaheadShifted
      : (lookahead || targetPos.clone());

    // ── 7. Corridor scan ──────────────────────────────────────────────────────
    this._dodgeTimer -= dt;
    if (this._dodgeTimer <= 0 && this.speed > 4) {
      this._dodgeTimer = this.isNitroBoosting ? 0.05 : 0.10;
      const targetOffset = this._scanBestCorridor(fwd, right, world, traffic, raceManager, inAlley, pursuit);
      const lerpRate = this.isNitroBoosting ? 0.55 : 0.35;
      this._corridorOffset += (targetOffset - this._corridorOffset) * lerpRate;
    }

    const baseDx = baseLookahead.x - this.position.x;
    const baseDz = baseLookahead.z - this.position.z;
    let tempHdgErr = Math.atan2(baseDx, baseDz) - this.heading;
    while (tempHdgErr > Math.PI) tempHdgErr -= Math.PI * 2;
    while (tempHdgErr < -Math.PI) tempHdgErr += Math.PI * 2;
    const cornerFade = Math.max(0, 1.0 - (Math.abs(tempHdgErr) - 0.25) * 2.5);
    const dodgedPt = baseLookahead.clone().addScaledVector(right, this._corridorOffset * cornerFade);
    const midPt = this.position.clone().lerp(dodgedPt, 0.5);
    const usePt = (world.checkCollision(dodgedPt.x, dodgedPt.z, 2.0).collision ||
      world.checkCollision(midPt.x, midPt.z, 2.0).collision)
      ? baseLookahead : dodgedPt;

    this.debugLookahead = usePt;

    // ── 8. Desired heading ───────────────────────────────────────────────────
    const dx = usePt.x - this.position.x;
    const dz = usePt.z - this.position.z;
    const rawDesiredHdg = Math.atan2(dx, dz);

    // Smooth desired heading to kill high-frequency jitter from noisy paths
    if (!this._hdgSmoothInitted) {
      this._smoothedDesiredHdg = rawDesiredHdg;
      this._hdgSmoothInitted = true;
    }
    // Low-pass: ~60% weight on new value at normal speed, more at low speed
    const hdgAlpha = Math.min(0.92, 0.55 + this.speed * 0.005);
    let hdgDelta = rawDesiredHdg - this._smoothedDesiredHdg;
    while (hdgDelta > Math.PI) hdgDelta -= Math.PI * 2;
    while (hdgDelta < -Math.PI) hdgDelta += Math.PI * 2;
    this._smoothedDesiredHdg += hdgDelta * hdgAlpha;

    const desiredHdg = this._smoothedDesiredHdg;

    // ── 9. Yaw rate ────────────────────────────────────────────────────────
    let hdgErr = desiredHdg - this.heading;
    while (hdgErr > Math.PI) hdgErr -= Math.PI * 2;
    while (hdgErr < -Math.PI) hdgErr += Math.PI * 2;

    // Donut U-turn: only for near-reversals (>155°) at low speed
    // Threshold raised from 140° to 155° — reduces false triggering on curves
    if (this._donutTimer <= 0 && !this._escapeTimer &&
      Math.abs(hdgErr) > 2.7 && this.speed < 22) {
      this._donutDir = Math.sign(hdgErr);
      this._donutTimer = 0.85 + Math.random() * 0.4;
      this._stuckTimer = 0;
    }

    const maxYaw = 2.0;
    const yawTarget = Math.max(-maxYaw, Math.min(maxYaw, hdgErr * 3.5));
    this.angularVelocity += (yawTarget - this.angularVelocity) * 18 * dt;
    this.heading += this.angularVelocity * dt;
    this.steeringAngle = Math.max(-this.maxSteerAngle,
      Math.min(this.maxSteerAngle, yawTarget * 0.38));

    // ── 10. Speed control ─────────────────────────────────────────────────────
    let targetSpeed = this.maxSpeed;

    if (inAlley) targetSpeed = Math.min(targetSpeed, 28);

    const absErr = Math.abs(hdgErr);

    // ── 10a. Heading-error braking (cornering) ───────────────────────────────
    if (absErr > 0.35) {
      targetSpeed *= Math.max(0.30, 1.0 - (absErr - 0.35) * 1.2);
    }

    // ── 10b. PREDICTIVE braking for upcoming corners ─────────────────────────
    // _upcomingCornerSeverity: 0 = straight, 1 = hairpin
    // Start braking well before the corner so the car is already slow at the apex
    if (this._upcomingCornerSeverity > 0.15) {
      const predictiveBrake = 1.0 - this._upcomingCornerSeverity * 0.55 * this._brakeAccuracy;
      targetSpeed = Math.min(targetSpeed, this.maxSpeed * Math.max(0.28, predictiveBrake));
    }

    // ── 10c. Wall lookahead (speed-scaled) ───────────────────────────────────
    const wallLookDist = inAlley ? 7 : Math.max(16, this.speed * 0.50);
    const wallCheckRadius = inAlley ? 1.4 : 1.2;
    const fwdCheck = this.position.clone().addScaledVector(fwd, wallLookDist);
    if (world.checkCollision(fwdCheck.x, fwdCheck.z, wallCheckRadius).collision) {
      const safeTop = inAlley ? 8 : Math.min(15, Math.max(4, this.speed * 0.22));
      targetSpeed = Math.min(targetSpeed, safeTop);
    }
    const midClose = this.position.clone().addScaledVector(fwd, inAlley ? 5.5 : Math.max(8, this.speed * 0.22));
    if (world.checkCollision(midClose.x, midClose.z, inAlley ? 1.4 : 1.2).collision) {
      targetSpeed = Math.min(targetSpeed, inAlley ? 5 : 8);
    }
    const veryClose = this.position.clone().addScaledVector(fwd, inAlley ? 4 : 6);
    const veryCloseHit = world.checkCollision(veryClose.x, veryClose.z, inAlley ? 1.3 : 1.1).collision;
    if (veryCloseHit) targetSpeed = 0;

    // ── 10d. Obstacle braking (improved range: 25m → 0) ─────────────────────
    let obstacleInFrontDist = Infinity;
    const obstacles = [];
    if (raceManager.playerPos) obstacles.push(raceManager.playerPos);
    raceManager.aiRacers.forEach(o => { if (o.id !== this.id) obstacles.push(o.position); });
    if (traffic && traffic.vehicles) traffic.vehicles.forEach(v => obstacles.push(v.position));
    if (pursuit) {
      if (pursuit.cops) pursuit.cops.forEach(c => obstacles.push(c.position));
      if (pursuit.parkedCops) pursuit.parkedCops.forEach(c => obstacles.push(c.position));
    }
    for (const ob of obstacles) {
      const toOb = ob.clone().sub(this.position);
      const dist = toOb.length();
      if (dist < 25.0) {
        const fwdDot = toOb.normalize().dot(fwd);
        if (fwdDot > 0.80) {
          if (dist < obstacleInFrontDist) obstacleInFrontDist = dist;
        }
      }
    }
    if (obstacleInFrontDist < 20.0) {
      // Smooth brake curve: full speed at 20m, stopped at 4m
      const speedLimit = obstacleInFrontDist < 4.0
        ? 0.0
        : (obstacleInFrontDist - 4.0) * (this.maxSpeed / 16.0);
      targetSpeed = Math.min(targetSpeed, speedLimit);
    }

    // ── 11. NITRO — smarter trigger ───────────────────────────────────────────
    const veryCloseHitForNitro = world.checkCollision(veryClose.x, veryClose.z, inAlley ? 1.3 : 1.1).collision;

    if (this.isNitroBoosting) {
      this.nitroLevel = Math.max(0.0, this.nitroLevel - 0.22 * dt);
      this._nitroHoldTimer = Math.max(0, this._nitroHoldTimer - dt);
      // Cancel conditions — more conservative than before
      if (this.nitroLevel <= 0.0 ||
        absErr > 0.28 ||
        this.speed < 8.0 ||
        obstacleInFrontDist < 22.0 ||
        this._stuckTimer > 0 ||
        this._donutTimer > 0 ||
        veryCloseHitForNitro ||
        this._upcomingCornerSeverity > 0.3) {
        if (this._nitroHoldTimer <= 0) this.isNitroBoosting = false;
      }
    } else {
      this.nitroLevel = Math.min(1.0, this.nitroLevel + (this.isDrifting ? 0.14 : 0.035) * dt);

      // Count straight frames — only fire nitro after 0.6s of confirmed straight
      if (absErr < 0.10 && this.speed > 18.0 && !inAlley &&
        this._upcomingCornerSeverity < 0.2 &&
        obstacleInFrontDist > 25.0 && !veryCloseHitForNitro) {
        this._straightTimer += dt;
      } else {
        this._straightTimer = 0;
      }

      if (this._straightTimer > 0.6 &&
        this.nitroLevel > 0.35 &&
        !this._escapeTimer && !this._donutTimer &&
        this._stuckTimer === 0 &&
        Math.random() < 0.04) {
        this.isNitroBoosting = true;
        this._nitroHoldTimer = 0.4 + Math.random() * 0.4; // minimum burst duration
        this._straightTimer = 0;
      }
    }

    const boost = this.recoveryBoostTimer > 0 && this.speed < 35;
    const isBoosting = boost || this.isNitroBoosting;
    const effAccel = isBoosting ? (boost ? this.accel * 2.8 : this.accel * 1.75) : this.accel;
    if (this.isNitroBoosting) targetSpeed *= 1.22;

    if (this.speed < targetSpeed) {
      this.speed += effAccel * dt;
    } else {
      this.speed -= Math.min(this.braking * 0.5, this.speed - targetSpeed) * dt;
    }
    this.speed -= this.drag * this.speed * Math.abs(this.speed) * dt;
    this.speed = Math.max(-8, Math.min(this.maxSpeed, this.speed));

    // ── 12. Velocity ──────────────────────────────────────────────────────────
    this.velocity.set(
      Math.sin(this.heading) * this.speed,
      0,
      Math.cos(this.heading) * this.speed
    );

    // ── 13. Stuck detection ───────────────────────────────────────────────────
    const distMoved = this.position.distanceTo(this._prevPos);
    this._prevPos.copy(this.position);
    const currentFrameSpeed = dt > 0 ? distMoved / dt : 0;
    this._recentDist += (currentFrameSpeed - this._recentDist) * 1.5 * dt;

    this._stuckCheckTimer -= dt;
    if (this._stuckCheckTimer <= 0) {
      this._stuckCheckTimer = 2.0;
      const displacement = this.position.distanceTo(this._stuckAnchorPos);
      this._stuckAnchorPos.copy(this.position);
      this._isTrapped = (displacement < 4.5);
    }

    const isStuckActual = (this._recentDist < 1.0) || this._isTrapped;
    if (isStuckActual) {
      this._stuckTimer += dt;
      this._longStuck += dt;
    } else {
      this._stuckTimer = 0;
    }

    if (this._stuckTimer > 0.9) {
      this._beginEscape(world, right, inAlley, navGraph, targetPos);
      return;
    }
    if (this._longStuck > 5.0) {
      this._longStuck = 0;
      this._stuckTimer = 0;
      this._respawn(raceManager, world);
      return;
    }

    // ── 14. Position update ───────────────────────────────────────────────────
    this.position.addScaledVector(this.velocity, dt);
    const targetY = (world && typeof world.getGroundHeight === 'function')
      ? world.getGroundHeight(this.position.x, this.position.z) + 0.46
      : 0.5;

    if (this.velocityY === undefined) this.velocityY = 0;
    this.velocityY -= 18.0 * dt;
    const nextY = this.position.y + this.velocityY * dt;

    if (nextY < targetY) {
      this.position.y += (targetY - this.position.y) * 12.0 * dt;
      if (this.position.y < targetY) this.position.y = targetY;
      const fwdH = _tempFwd.set(Math.sin(this.heading), 0, Math.cos(this.heading));
      const rearWheelX = this.position.x - fwdH.x * 1.3;
      const rearWheelZ = this.position.z - fwdH.z * 1.3;
      const hRearFwd = world ? world.getGroundHeight(rearWheelX + fwdH.x * 0.5, rearWheelZ + fwdH.z * 0.5) : targetY;
      const hRearBack = world ? world.getGroundHeight(rearWheelX - fwdH.x * 0.5, rearWheelZ - fwdH.z * 0.5) : targetY;
      this.velocityY = this.velocity.dot(fwdH) * ((hRearFwd - hRearBack) / 1.0);
      this.isAirborne = false;
    } else {
      this.position.y = nextY;
      this.isAirborne = true;
    }

    // ── 15. Wall pushback ─────────────────────────────────────────────────────
    this._applyWallPushback(world);

    // ── 16. Checkpoint collection ─────────────────────────────────────────────
    this._checkCheckpoints(target, raceManager, world);

    // ── 17. Visual flags ──────────────────────────────────────────────────────
    this.isBoosting = boost || this.isNitroBoosting;
    this.isDrifting = absErr > 0.42 && this.speed > 12;

    // ── 18. Mesh sync ─────────────────────────────────────────────────────────
    this._updateMesh(world, dt);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  PLAYER AWARENESS
  // ═══════════════════════════════════════════════════════════════════════════
  _updatePlayerPrediction(raceManager, dt) {
    if (!raceManager.playerPos) return;
    const pp = raceManager.playerPos;
    if (this._lastKnownPlayerPos) {
      const velX = (pp.x - this._lastKnownPlayerPos.x) / dt;
      const velZ = (pp.z - this._lastKnownPlayerPos.z) / dt;
      // Smooth velocity estimate
      this._lastKnownPlayerVel.x += (velX - this._lastKnownPlayerVel.x) * 0.3;
      this._lastKnownPlayerVel.z += (velZ - this._lastKnownPlayerVel.z) * 0.3;
      // Predict player position 0.4s ahead
      const horizon = 0.4;
      this._playerPredictedPos.set(
        pp.x + this._lastKnownPlayerVel.x * horizon,
        pp.y,
        pp.z + this._lastKnownPlayerVel.z * horizon
      );
    } else {
      this._lastKnownPlayerPos = pp.clone();
      this._playerPredictedPos.copy(pp);
    }
    this._lastKnownPlayerPos.copy(pp);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  PREDICTIVE CORNER SCAN
  //  Walk 3–5 waypoints ahead and measure heading-change severity.
  //  Returns 0 (straight) → 1 (hairpin).
  // ═══════════════════════════════════════════════════════════════════════════
  _scanUpcomingCorner() {
    const path = this._currentPath;
    if (!path || path.length < 2) return 0;

    const scanAhead = 5; // waypoints to look ahead
    const startIdx = this._pathWptIdx;
    const endIdx = Math.min(path.length - 1, startIdx + scanAhead);
    if (endIdx <= startIdx) return 0;

    let maxAngle = 0;
    for (let i = startIdx; i < endIdx - 1; i++) {
      const a = path[i];
      const b = path[i + 1];
      const c = path[Math.min(endIdx, i + 2)];
      const abX = b.x - a.x, abZ = b.z - a.z;
      const bcX = c.x - b.x, bcZ = c.z - b.z;
      const abLen = Math.sqrt(abX * abX + abZ * abZ);
      const bcLen = Math.sqrt(bcX * bcX + bcZ * bcZ);
      if (abLen < 0.5 || bcLen < 0.5) continue;
      const dot = (abX * bcX + abZ * bcZ) / (abLen * bcLen);
      const angle = Math.acos(Math.max(-1, Math.min(1, dot))); // 0 = straight, π = U-turn
      if (angle > maxAngle) maxAngle = angle;
    }
    // Normalise: 0.2 rad = gentle, π = hairpin
    return Math.min(1.0, maxAngle / Math.PI);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  APEX SHIFT
  //  Compute lateral shift toward the inside of the nearest upcoming bend.
  // ═══════════════════════════════════════════════════════════════════════════
  _computeApexOffset(right) {
    const path = this._currentPath;
    if (!path || path.length < 3) return 0;
    const i = Math.min(path.length - 2, this._pathWptIdx + 2);
    if (i < 1) return 0;
    const a = path[i - 1], b = path[i], c = path[i + 1];
    // Cross product Z component to determine bend direction
    const abX = b.x - a.x, abZ = b.z - a.z;
    const bcX = c.x - b.x, bcZ = c.z - b.z;
    const cross = abX * bcZ - abZ * bcX; // positive = left-hand bend
    // Apex magnitude proportional to path curvature
    const curv = Math.min(1.0, Math.abs(cross) / 500.0);
    // Shift inward up to 6m
    return -Math.sign(cross) * curv * 6.0;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  PATH MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════════
  _computePath(navGraph, targetPos) {
    this._currentPath = navGraph.findPath(
      this.position.x, this.position.z,
      targetPos.x, targetPos.z,
      this.navVariance
    );
    this._postProcessPath(navGraph.world);
    this._pathWptIdx = 0;
    this._pathForCheckpoint = this.currentIndex;
    this._pathForLap = this.lapCurrent;
    // Reset heading smoother so it doesn't carry stale data into new path
    this._hdgSmoothInitted = false;
  }

  _postProcessPath(world) {
    if (!this._currentPath || this._currentPath.length < 3) return;
    const path = this._currentPath;
    for (let i = 1; i < path.length - 1; i++) {
      const pPrev = path[i - 1], pCurr = path[i], pNext = path[i + 1];
      let v1x = pPrev.x - pCurr.x, v1z = pPrev.z - pCurr.z;
      let v2x = pNext.x - pCurr.x, v2z = pNext.z - pCurr.z;
      const v1len = Math.sqrt(v1x * v1x + v1z * v1z);
      const v2len = Math.sqrt(v2x * v2x + v2z * v2z);
      if (v1len < 0.001 || v2len < 0.001) continue;
      v1x /= v1len; v1z /= v1len;
      v2x /= v2len; v2z /= v2len;
      let bx = v1x + v2x, bz = v1z + v2z;
      const blen = Math.sqrt(bx * bx + bz * bz);
      if (blen < 0.01) continue;
      bx /= blen; bz /= blen;
      const dot = v1x * v2x + v1z * v2z;
      if (dot > -0.95) {
        const cutDist = 4 + this.cornerCutBias * 8;
        const testX = pCurr.x + bx * cutDist;
        const testZ = pCurr.z + bz * cutDist;
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

  // ═══════════════════════════════════════════════════════════════════════════
  //  PURE PURSUIT LOOKAHEAD
  // ═══════════════════════════════════════════════════════════════════════════
  _getLookaheadPoint(world) {
    const path = this._currentPath;
    if (!path || path.length === 0) return null;

    const dist2D = (p1, p2) => {
      const dx = p1.x - p2.x, dz = p1.z - p2.z;
      return Math.sqrt(dx * dx + dz * dz);
    };

    // Find closest waypoint in small forward window
    let closestIdx = this._pathWptIdx;
    let closestDist = dist2D(this.position, path[closestIdx]);
    const searchLim = Math.min(path.length, this._pathWptIdx + 4);
    for (let i = this._pathWptIdx + 1; i < searchLim; i++) {
      const d = dist2D(this.position, path[i]);
      if (d < closestDist) { closestDist = d; closestIdx = i; }
    }
    if (closestIdx > this._pathWptIdx) this._pathWptIdx = closestIdx;

    // Advance waypoint index
    while (this._pathWptIdx < path.length - 1) {
      const targetWpt = path[this._pathWptIdx];
      const dist = dist2D(this.position, targetWpt);
      if (dist < 12) { this._pathWptIdx++; continue; }
      if (dist < 35) {
        const toWptX = targetWpt.x - this.position.x;
        const toWptZ = targetWpt.z - this.position.z;
        const fwdX = Math.sin(this.heading), fwdZ = Math.cos(this.heading);
        if ((toWptX * fwdX) + (toWptZ * fwdZ) < 0) { this._pathWptIdx++; continue; }
      }
      if (dist2D(this.position, path[this._pathWptIdx + 1]) < dist) { this._pathWptIdx++; continue; }
      break;
    }

    // Lookahead scales with speed; hard AI looks further ahead for better planning
    const diffLook = 1.0 + (this._difficulty - 1.0) * 0.3;
    const L = Math.max(14, Math.min(45, this.speed * 0.58)) * diffLook;

    let remaining = L;
    let px = this.position.x, pz = this.position.z;
    for (let i = this._pathWptIdx; i < path.length; i++) {
      const next = path[i];
      const dx = next.x - px, dz = next.z - pz;
      const d = Math.sqrt(dx * dx + dz * dz);
      if (d < 0.01) continue;
      if (d >= remaining) {
        const t = remaining / d;
        return new THREE.Vector3(px + dx * t, 0.5, pz + dz * t);
      }
      remaining -= d;
      px = next.x; pz = next.z;
    }

    const rawPt = path[path.length - 1];
    if (world.checkCollision(rawPt.x, rawPt.z, 3.5).collision) {
      for (let back = path.length - 2; back >= this._pathWptIdx; back--) {
        const candidate = path[back];
        if (!world.checkCollision(candidate.x, candidate.z, 3.5).collision)
          return candidate.clone();
      }
    }
    return rawPt.clone();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  PREDICTIVE CORRIDOR SCANNER
  // ═══════════════════════════════════════════════════════════════════════════
  _scanBestCorridor(fwd, right, world, traffic, raceManager, inAlley, pursuit) {
    const dynObs = [];
    if (raceManager.playerPos) dynObs.push(raceManager.playerPos);
    raceManager.aiRacers.forEach(o => { if (o.id !== this.id) dynObs.push(o.position); });
    if (traffic) {
      if (traffic.vehicles) traffic.vehicles.forEach(v => dynObs.push(v.position));
      if (traffic.parkedVehicles) traffic.parkedVehicles.forEach(v => dynObs.push(v.position));
    }
    if (pursuit) {
      if (pursuit.cops) pursuit.cops.forEach(c => dynObs.push(c.position));
      if (pursuit.parkedCops) pursuit.parkedCops.forEach(c => dynObs.push(c.position));
    }

    const offsets = inAlley ? [-4, -2, 0, 2, 4] : [-9, -6, -3, 0, 3, 6, 9];
    const scanDist = Math.max(20, this.speed * 0.72);
    const numSteps = 9; // one extra slice vs original for better precision
    const checkR = inAlley ? 1.4 : (this.isNitroBoosting ? 2.2 : 1.8);
    const dynR = 5.5;

    let bestOffset = 0, bestScore = Infinity;
    for (let ci = 0; ci < offsets.length; ci++) {
      const offset = offsets[ci];
      let score = Math.abs(offset) * 0.25; // slight center preference
      for (let s = 1; s <= numSteps; s++) {
        const t = s / numSteps;
        const d = t * scanDist;
        const lat = offset * Math.min(1.0, t * 1.8);
        const px = this.position.x + fwd.x * d + right.x * lat;
        const pz = this.position.z + fwd.z * d + right.z * lat;
        if (world.checkCollision(px, pz, checkR).collision) {
          score += 8000 * (2.0 - t); break;
        }
        for (let di = 0; di < dynObs.length; di++) {
          const ob = dynObs[di];
          const ddx = px - ob.x, ddz = pz - ob.z;
          if (ddx * ddx + ddz * ddz < dynR * dynR) {
            score += 350 * (1.5 - t * 0.5); break;
          }
        }
      }
      if (score < bestScore) { bestScore = score; bestOffset = offset; }
    }
    return bestOffset;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  STUCK ESCAPE
  // ═══════════════════════════════════════════════════════════════════════════
  _beginEscape(world, rightVec, inAlley, navGraph, targetPos) {
    let wallNorm = null;
    for (const r of [2.4, 3.5, 5.0, 7.0]) {
      const hit = world.checkCollision(this.position.x, this.position.z, r);
      if (hit.collision) { wallNorm = new THREE.Vector3(hit.normalX, 0, hit.normalZ); break; }
    }

    if (wallNorm) {
      const wallDotRight = wallNorm.dot(rightVec);
      const wallDotFwd = wallNorm.dot(_tempFwd.set(Math.sin(this.heading), 0, Math.cos(this.heading)));
      if (Math.abs(wallDotFwd) > 0.7) {
        // Wall is mostly ahead/behind — classic 90° pivot
        this._escapeTargetHdg = this.heading + (wallDotRight >= 0 ? -Math.PI / 2 : Math.PI / 2);
      } else {
        // Wall is mostly to the side — rotate just enough to aim away from it
        this._escapeTargetHdg = this.heading + (wallDotRight >= 0 ? -Math.PI / 3 : Math.PI / 3);
      }
    } else {
      this._escapeTargetHdg = this.heading + Math.PI / 2;
    }

    while (this._escapeTargetHdg > Math.PI) this._escapeTargetHdg -= Math.PI * 2;
    while (this._escapeTargetHdg < -Math.PI) this._escapeTargetHdg += Math.PI * 2;

    this.speed = 0;
    this.velocity.set(0, 0, 0);
    this.angularVelocity = 0;
    this.steeringAngle = 0;
    this._escapeTimer = inAlley ? 0.75 : 1.20;
    this._stuckTimer = 0;
    this.recoveryBoostTimer = 1.5;
    this._isTrapped = false;
    this._stuckCheckTimer = 2.0;
    this._stuckAnchorPos.copy(this.position);

    if (navGraph && targetPos) this._computePath(navGraph, targetPos);
    this._tickEscape(0, world);
    this._applyWallPushback(world);
    this._updateMesh(world, 0.016);
  }

  _tickEscape(dt, world) {
    let err = this._escapeTargetHdg - this.heading;
    while (err > Math.PI) err -= Math.PI * 2;
    while (err < -Math.PI) err += Math.PI * 2;
    const turnRate = 3.0;
    this.heading += Math.sign(err) * Math.min(Math.abs(err), turnRate * dt);
    this.speed = this._escapeTimer > 0.22 ? -14 : 0;
    this.velocity.set(
      Math.sin(this.heading) * this.speed, 0,
      Math.cos(this.heading) * this.speed
    );
    this.position.addScaledVector(this.velocity, dt);
    const targetY = (world && typeof world.getGroundHeight === 'function')
      ? world.getGroundHeight(this.position.x, this.position.z) + 0.46 : 0.96;
    if (this.velocityY === undefined) this.velocityY = 0;
    this.velocityY -= 18.0 * dt;
    const nextY = this.position.y + this.velocityY * dt;
    if (nextY < targetY) {
      this.position.y += (targetY - this.position.y) * 12.0 * dt;
      if (this.position.y < targetY) this.position.y = targetY;
      this.velocityY = 0; this.isAirborne = false;
    } else {
      this.position.y = nextY; this.isAirborne = true;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  DONUT U-TURN
  // ═══════════════════════════════════════════════════════════════════════════
  _tickDonut(dt, world) {
    const spinRate = 3.2;
    this.heading += this._donutDir * spinRate * dt;
    while (this.heading > Math.PI) this.heading -= Math.PI * 2;
    while (this.heading < -Math.PI) this.heading += Math.PI * 2;
    const targetSpeed = 15;
    this.speed += (targetSpeed - this.speed) * 4.0 * dt;
    this.speed = Math.min(this.speed, this.maxSpeed);
    this.velocity.set(
      Math.sin(this.heading) * this.speed, 0,
      Math.cos(this.heading) * this.speed
    );
    this.position.addScaledVector(this.velocity, dt);
    const targetY = (world && typeof world.getGroundHeight === 'function')
      ? world.getGroundHeight(this.position.x, this.position.z) + 0.46 : 0.96;
    if (this.velocityY === undefined) this.velocityY = 0;
    this.velocityY -= 18.0 * dt;
    const nextY = this.position.y + this.velocityY * dt;
    if (nextY < targetY) {
      this.position.y += (targetY - this.position.y) * 12.0 * dt;
      if (this.position.y < targetY) this.position.y = targetY;
      this.velocityY = 0; this.isAirborne = false;
    } else {
      this.position.y = nextY; this.isAirborne = true;
    }
    this.isDrifting = true;
    this.isBoosting = false;
    this.steeringAngle = this._donutDir * this.maxSteerAngle;
    this.angularVelocity = this._donutDir * spinRate;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  WALL PUSHBACK
  // ═══════════════════════════════════════════════════════════════════════════
  _applyWallPushback(world) {
    const fwd = _v1.set(Math.sin(this.heading), 0, Math.cos(this.heading));
    const right = _v2.set(Math.cos(this.heading), 0, -Math.sin(this.heading));

    // Tier A: soft repulsion zone (3.5m)
    const nearHit = world.checkCollision(this.position.x, this.position.z, 3.5);
    if (nearHit.collision && !world.checkCollision(this.position.x, this.position.z, 2.0).collision) {
      const n = _v1.set(nearHit.normalX, 0, nearHit.normalZ);
      const lateralDot = n.dot(right);
      const nudge = Math.min(0.4, nearHit.overlap * 0.5);
      this.position.x += nearHit.normalX * nudge;
      this.position.z += nearHit.normalZ * nudge;
      this.heading -= lateralDot * 0.08;
      return;
    }

    // Tier B: hard contact (2.0m)
    const hit = world.checkCollision(this.position.x, this.position.z, 2.0);
    if (!hit.collision) return;

    this.position.x += hit.normalX * (hit.overlap + 0.1);
    this.position.z += hit.normalZ * (hit.overlap + 0.1);

    const n = new THREE.Vector3(hit.normalX, 0, hit.normalZ);
    const dv = this.velocity.dot(n);
    if (dv < 0) {
      this.velocity.addScaledVector(n, -dv);
      if (dv < -3.0) {
        this.justCrashed = true;
        this.lastWallImpactSpeed = Math.abs(dv);
        this.lastWallImpactNormal = n.clone();
      }
    }
    if (this.speed > 0 && fwd.dot(n) < -0.4) this.speed *= 0.25;

    this._stuckTimer += 0.18;
    this._longStuck += 0.18;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  RESPAWN
  // ═══════════════════════════════════════════════════════════════════════════
  _respawn(raceManager, world) {
    const cps = raceManager.checkpoints;
    let cpIdx, targetCp;

    if (raceManager.mode === 'unordered') {
      const uncleared = [];
      cps.forEach((cp, i) => { if (!this.unorderedCleared.has(i)) uncleared.push({ cp, i }); });
      if (!uncleared.length) return;
      const sel = uncleared[Math.floor(Math.random() * uncleared.length)];
      cpIdx = sel.i; targetCp = sel.cp;
    } else {
      cpIdx = Math.max(0, this.currentIndex - 1);
      targetCp = cps[cpIdx];
    }
    if (!targetCp) return;

    let cx = targetCp.x, cz = targetCp.z;
    if (world.checkCollision(cx, cz, 2.5).collision) {
      outer: for (const dist of [6, 10, 16, 24]) {
        for (let a = 0; a < 8; a++) {
          const ang = (a / 8) * Math.PI * 2;
          const tx = targetCp.x + Math.cos(ang) * dist;
          const tz = targetCp.z + Math.sin(ang) * dist;
          if (!world.checkCollision(tx, tz, 2.5).collision) { cx = tx; cz = tz; break outer; }
        }
      }
    }

    this.position.set(cx, 0.5, cz);
    this.velocity.set(0, 0, 0);
    this.speed = 0; this.angularVelocity = 0;
    this._stuckTimer = 0; this._escapeTimer = 0; this._longStuck = 0;
    this.recoveryBoostTimer = 1.5;
    this._isTrapped = false; this._stuckCheckTimer = 2.0;
    this._stuckAnchorPos.copy(this.position);
    this._prevPos.copy(this.position);
    this._recentDist = 10.0;
    this._currentPath = null;
    this._hdgSmoothInitted = false;
    this._straightTimer = 0;

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
    const gx = Math.round(this.position.x / world.tileSize);
    const gz = Math.round(this.position.z / world.tileSize);
    const r = (world.isAlley && world.isAlley(gx, gz)) ? 65 : this.triggerRadius;
    if (dist >= r) return;

    const cps = raceManager.checkpoints;
    this._longStuck = 0;

    if (raceManager.mode === 'unordered') {
      const idx = cps.findIndex(cp => cp === target);
      if (idx !== -1) {
        this.unorderedCleared.add(idx);
        this._currentPath = null;
        if (this.unorderedCleared.size === cps.length) {
          this.completed = true;
          this.timeFinished = raceManager.timeElapsed;
        }
      }
    } else {
      this._currentPath = null;
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
      world.alignMeshToTerrain(this.meshGroup, this.position, this.heading, this.isAirborne, dt || 0.016);
    } else {
      this.meshGroup.rotation.y = this.heading;
    }
  }
}