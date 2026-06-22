import * as THREE from 'three';

export function updateCamera(dt = 0.016) {
    let targetObj = this.physics;
    let targetVisual = this.carVisualContainer;
    let isBoosting = this.physics.isBoosting;
    let isAirborne = this.physics.isAirborne;
    let airTime = this.physics.airTime;
    let isDrifting = this.physics.isDrifting;
    let speed = this.physics.velocity.length();

    if (this.debugFocusAI && this.race && this.race.aiRacers) {
      const activeAI = this.race.aiRacers.find(ai => ai.id === this.debugFocusAI);
      if (activeAI) {
        targetObj = activeAI;
        targetVisual = activeAI.meshGroup || targetVisual;
        isBoosting = activeAI.isBoosting || false;
        isAirborne = false;
        airTime = 0;
        isDrifting = activeAI.isDrifting || false;
        speed = activeAI.velocity ? activeAI.velocity.length() : activeAI.speed;
      }
    }

    const heading = targetObj.heading;

    // Decay gearShiftPunch over time
    if (this.gearShiftPunch > 0.0) {
      this.gearShiftPunch = Math.max(0.0, this.gearShiftPunch - 4.5 * dt);
    }

    // Initialize custom camera effects if undefined
    if (this.camRoll === undefined) this.camRoll = 0.0;
    if (this.camPitchOffset === undefined) this.camPitchOffset = 0.0;
    if (this.camBungeeOffset === undefined) this.camBungeeOffset = 0.0;
    if (this.lastCamSpeed === undefined) this.lastCamSpeed = 0.0;

    // Calculate longitudinal acceleration (G-Force pitching & bungee distance lag)
    const accelLong = dt > 0 ? (speed - this.lastCamSpeed) / dt : 0;
    this.lastCamSpeed = speed;
    const clampedAccel = Math.max(-20.0, Math.min(20.0, accelLong));
    
    // G-Force Pitching
    const targetPitch = -clampedAccel * 0.035; // Accel drops camera (squat), Brake lifts camera (dive)
    this.camPitchOffset += (targetPitch - this.camPitchOffset) * (1 - Math.exp(-6 * dt));

    // Bungee Distance Lag (pulls back on acceleration, pushes forward on braking)
    const targetBungee = clampedAccel * 0.18;
    this.camBungeeOffset += (targetBungee - this.camBungeeOffset) * (1 - Math.exp(-4 * dt));

    // GoPro Hand-held Micro-Wobble (organic noise)
    const noiseTime = Date.now() * 0.0015;
    const wobbleX = Math.sin(noiseTime * 1.7) * 0.04 + Math.cos(noiseTime * 3.1) * 0.02;
    const wobbleY = Math.cos(noiseTime * 2.1) * 0.04 + Math.sin(noiseTime * 4.3) * 0.02;

    // Calculate lateral velocity (Steering Roll / Lean)
    const playerRight = new THREE.Vector3(Math.cos(heading), 0, -Math.sin(heading));
    const lateralVel = this.physics.velocity.dot(playerRight);
    const targetRoll = -lateralVel * 0.005; // Rolls slightly into the turn/slide
    this.camRoll += (targetRoll - this.camRoll) * (1 - Math.exp(-5 * dt));

    // 1. Dynamic FOV: Opens up at high speed to emphasize velocity + NFS shift punch, Nitro warp, and mid-air flight
    const boostFOVOffset = this.physics.isBoosting ? 16.0 : 0.0;
    const airFOVOffset = this.physics.isAirborne ? Math.min(12.0, this.physics.airTime * 15.0) : 0.0;
    const targetFOV = 55 + Math.min(20, speed * 0.35) + (this.gearShiftPunch * 3.5) + boostFOVOffset + airFOVOffset;
    this.camera.fov += (targetFOV - this.camera.fov) * (1 - Math.exp(-6 * dt));
    this.camera.updateProjectionMatrix();

    // 2. Heading Interpolation & Parameters based on Camera Mode
    let baseDist = 15.0;
    let baseHeight = 5.2;
    let useLag = true;
    let targetLookY = 1.1;

    const mode = this.cameraMode || 'medium';
    if (mode === 'really_close') {
      baseDist = 7.0;
      baseHeight = 2.4;
      targetLookY = 0.95;
    } else if (mode === 'close') {
      baseDist = 10.5;
      baseHeight = 3.5;
      targetLookY = 1.0;
    } else if (mode === 'medium') {
      baseDist = 15.0;
      baseHeight = 5.2;
      targetLookY = 1.1;
    } else if (mode === 'far') {
      baseDist = 22.0;
      baseHeight = 7.5;
      targetLookY = 1.3;
    } else if (mode === 'bonnet') {
      baseDist = -2.2; // front of car looking forward
      baseHeight = 1.0;
      useLag = false; // direct camera lock
      targetLookY = 1.0;
    }

    if (useLag) {
      let diff = heading - this.camHeading;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      const rotSpeed = isDrifting ? 2.5 : 5.0; // Balanced rotation lag
      this.camHeading += diff * (1 - Math.exp(-rotSpeed * dt));
    } else {
      this.camHeading = heading;
    }

    // 3. Dynamic Distance & Height: Chase cam parameters with G-Force Pitching & Bungee Lag
    let distance, height;
    if (useLag) {
      distance = baseDist + speed * 0.1 + this.camBungeeOffset + (this.gearShiftPunch * 1.8);
      height = baseHeight + Math.max(0.0, 1.5 - speed * 0.01) + this.camPitchOffset;
    } else {
      distance = baseDist;
      height = baseHeight;
    }

    const offset = new THREE.Vector3(
      -Math.sin(this.camHeading) * distance,
      height,
      -Math.cos(this.camHeading) * distance
    );

    // 4. Lerp camera position smoothly
    const targetCamPos = targetObj.position.clone().add(offset);
    if (useLag) {
      this.camera.position.lerp(targetCamPos, 1 - Math.exp(-9 * dt));
    } else {
      this.camera.position.copy(targetCamPos);
    }

    // Add Hand-held Micro-Wobble to position (if not in direct bonnet mode for stability)
    if (useLag) {
      this.camera.position.x += wobbleX;
      this.camera.position.y += wobbleY;
    }

    // 5. Visceral Shake: Add high-frequency camera vibration at high speed or during drift
    let shakeIntensity = 0;
    if (speed > 25) {
      shakeIntensity += (speed - 25) * 0.005;
    }
    if (isDrifting && useLag) {
      shakeIntensity += 0.08;
    }
    if (this.gearShiftPunch > 0.0 && targetObj === this.physics && useLag) {
      shakeIntensity += this.gearShiftPunch * 0.12;
    }
    if (this.crashShake > 0.0 && targetObj === this.physics) {
      shakeIntensity += this.crashShake;
    }
    if (shakeIntensity > 0) {
      this.camera.position.x += (Math.random() - 0.5) * shakeIntensity;
      this.camera.position.y += (Math.random() - 0.5) * shakeIntensity;
      this.camera.position.z += (Math.random() - 0.5) * shakeIntensity;
    }

    // Prevent camera from colliding/clipping with the ground/roads (not needed or bypassed for bonnet cam)
    if (useLag) {
      const minCamClearance = 2.0;
      const camGroundH = this.world ? this.world.getGroundHeight(this.camera.position.x, this.camera.position.z) : 0.0;
      if (this.camera.position.y < camGroundH + minCamClearance) {
        this.camera.position.y = camGroundH + minCamClearance;
      }
    }

    // 6. LookAt: Look slightly ahead of the car's body center to keep target focused
    const lookAheadDistance = (mode === 'bonnet') ? (15.0 + speed * 0.1) : (4.0 + speed * 0.08);
    const targetLook = targetObj.position.clone().add(
      new THREE.Vector3(
        Math.sin(heading) * lookAheadDistance,
        targetLookY,
        Math.cos(heading) * lookAheadDistance
      )
    );
    this.camera.lookAt(targetLook);

    // Apply Camera Roll (Lean) after lookAt
    if (useLag) {
      this.camera.rotateZ(this.camRoll);
    }

    // Update shadow/directional light to follow player
    this.dirLight.position.set(targetObj.position.x + 30, 60, targetObj.position.z + 30);
    this.dirLight.target = targetVisual;
  }

export function cycleCameraFocus() {
    if (!this.race || !this.race.aiRacers || this.race.aiRacers.length === 0) {
      this.debugFocusAI = null;
      return;
    }
    
    if (this.debugFocusAI === null) {
      this.debugFocusAI = this.race.aiRacers[0].id;
    } else {
      const idx = this.race.aiRacers.findIndex(ai => ai.id === this.debugFocusAI);
      if (idx === -1 || idx === this.race.aiRacers.length - 1) {
        this.debugFocusAI = null; // back to player
      } else {
        this.debugFocusAI = this.race.aiRacers[idx + 1].id;
      }
    }
    
    // Show banner indicating who we are focusing on
    if (this.debugFocusAI === null) {
      this.showBanner("CAMERA: PLAYER", "Focused on Player Car", 1500);
    } else {
      const activeAI = this.race.aiRacers.find(ai => ai.id === this.debugFocusAI);
      this.showBanner(`CAMERA: ${activeAI.name}`, `Focusing on AI racer`, 1500);
    }
  }

export function cycleCameraMode() {
  const modes = ['really_close', 'close', 'medium', 'far', 'bonnet'];
  const currentIdx = modes.indexOf(this.cameraMode || 'medium');
  const nextIdx = (currentIdx + 1) % modes.length;
  this.cameraMode = modes[nextIdx];
  this.showBanner(`CAMERA: ${this.cameraMode.toUpperCase().replace('_', ' ')}`, `Switched camera view`, 1200);
}

