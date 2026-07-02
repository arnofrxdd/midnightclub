import * as THREE from 'three';

export function updateCamera(dt = 0.016) {
    if (this.cameraOverride) {
      this.camera.position.copy(this.cameraOverride.pos);
      this.camera.lookAt(this.cameraOverride.lookAt);
      if (this.cameraOverride.roll !== undefined) {
        this.camera.rotateZ(this.cameraOverride.roll);
      }
      if (this.cameraOverride.fov !== undefined) {
        this.camera.fov = this.cameraOverride.fov;
        this.camera.updateProjectionMatrix();
      }
      this.dirLight.position.set(this.cameraOverride.pos.x + 30, 60, this.cameraOverride.pos.z + 30);
      if (!this.dirLightTargetOverride) {
         this.dirLightTargetOverride = new THREE.Object3D();
         this.scene.add(this.dirLightTargetOverride);
      }
      this.dirLightTargetOverride.position.copy(this.cameraOverride.lookAt);
      this.dirLight.target = this.dirLightTargetOverride;
      return;
    }

    let targetObj = this.physics;
    let targetVisual = this.carVisualContainer;
    let isBoosting = this.physics.isBoosting;
    let isAirborne = this.physics.isAirborne;
    let airTime = this.physics.airTime;
    let isDrifting = this.physics.isDrifting;
    let speed = this.physics.velocity.length();
    
    // For smooth camera updates on high refresh rate monitors (144Hz+)
    let targetPos = this.renderPhysicsPosition || targetObj.position;
    let targetHeading = this.renderPhysicsHeading !== undefined ? this.renderPhysicsHeading : targetObj.heading;

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
        targetPos = activeAI.position;
        targetHeading = activeAI.heading;
      }
    }

    const heading = targetHeading;

    // Decay gearShiftPunch over time
    if (this.gearShiftPunch > 0.0) {
      this.gearShiftPunch = Math.max(0.0, this.gearShiftPunch - 4.5 * dt);
    }

    // Initialize custom camera effects if undefined
    if (this.camRoll === undefined) this.camRoll = 0.0;
    if (this.camPitchOffset === undefined) this.camPitchOffset = 0.0;
    if (this.camBungeeOffset === undefined) this.camBungeeOffset = 0.0;
    if (this.lastCamSpeed === undefined) this.lastCamSpeed = 0.0;
    if (this.camAirTransition === undefined) this.camAirTransition = 0.0;
    if (this.landingPunch === undefined) this.landingPunch = 0.0;

    // Disabled Midnight Club airborne camera effect for now
    /*
    // Smoothly transition airborne camera factor immediately upon leaving ground
    // Use asymmetric rates: moderate sweep up, fast snappy return upon landing
    const targetAirTransition = isAirborne ? 1.0 : 0.0;
    const airRate = isAirborne ? 3.5 : 7.0;
    this.camAirTransition += (targetAirTransition - this.camAirTransition) * (1 - Math.exp(-airRate * dt));
    */
    this.camAirTransition = 0.0;

    // Decay landingPunch over time
    if (this.landingPunch > 0.0) {
      this.landingPunch = Math.max(0.0, this.landingPunch - 4.5 * dt);
    }

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
    const rollMult = isDrifting ? 1.65 : 1.0;
    const targetRoll = -lateralVel * 0.006 * rollMult; // Rolls slightly into the turn/slide
    this.camRoll += (targetRoll - this.camRoll) * (1 - Math.exp(-5 * dt));

    // 1. Dynamic FOV: Opens up at high speed, nitro, gear shifts, landing punches, and drifts
    const boostFOVOffset = this.physics.isBoosting ? 8.0 : 0.0; // Reduced from 16.0 to avoid warping perspective too much
    const airFOVOffset = this.physics.isAirborne ? Math.min(12.0, this.physics.airTime * 15.0) : 0.0;
    const driftFOVOffset = isDrifting ? Math.min(12.0, Math.abs(lateralVel) * 1.4) : 0.0;
    const targetFOV = 55 + Math.min(20, speed * 0.35) + (this.gearShiftPunch * 3.5) + (this.landingPunch * 14.0) + boostFOVOffset + airFOVOffset + driftFOVOffset;
    this.camera.fov += (targetFOV - this.camera.fov) * (1 - Math.exp(-6 * dt));
    this.camera.updateProjectionMatrix();

    // 2. Heading Interpolation & Parameters based on Camera Mode (Tuned closer and lower for AAA feel)
    let baseDist = 11.0;
    let baseHeight = 3.1;
    let useLag = true;
    let targetLookY = 0.9;

    const mode = this.cameraMode || 'medium';
    if (mode === 'really_close') {
      baseDist = 6.2;
      baseHeight = 1.8;
      targetLookY = 0.8;
    } else if (mode === 'close') {
      baseDist = 8.5;
      baseHeight = 2.4;
      targetLookY = 0.85;
    } else if (mode === 'medium') {
      baseDist = 11.0;
      baseHeight = 3.1;
      targetLookY = 0.9;
    } else if (mode === 'far') {
      baseDist = 16.0;
      baseHeight = 4.4;
      targetLookY = 1.0;
    } else if (mode === 'bonnet') {
      baseDist = -2.2; // front of car looking forward
      baseHeight = 1.0;
      useLag = false; // direct camera lock
      targetLookY = 1.0;
    }

    let slipAngle = 0.0;
    if (speed > 4.0) {
      slipAngle = Math.atan2(-lateralVel, Math.max(0.5, speed));
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
      const boostDistOffset = this.physics.isBoosting ? -2.0 : 0.0; // Pulls camera closer during nitro
      distance = baseDist + speed * 0.05 + this.camBungeeOffset + (this.gearShiftPunch * 1.8) + (this.landingPunch * 2.5) + boostDistOffset;
      // Pull camera slightly lower during a drift to make the car look more grounded and wide
      const driftHeightOffset = isDrifting ? -0.45 : 0.0;
      height = baseHeight + Math.max(0.0, 1.5 - speed * 0.01) + this.camPitchOffset - (this.landingPunch * 0.8) + driftHeightOffset;
    } else {
      distance = baseDist;
      height = baseHeight;
    }

    const isLookingBack = this.keys && this.keys['b'];
    let camDir = this.camHeading;
    let lookDir = heading;
    if (isLookingBack) {
      camDir += Math.PI;
      lookDir += Math.PI;
    } else if (isDrifting && useLag) {
      // Slip-angle camera swing: Swing the camera outwards to view the slide from the side
      camDir += slipAngle * 0.65;
    }

    // Compute camera offset with airborne blending
    let offset;
    if (useLag && this.camAirTransition > 0.001) {
      const stdOffset = new THREE.Vector3(
        -Math.sin(camDir) * distance,
        height,
        -Math.cos(camDir) * distance
      );

      // Midnight Club style top-diagonal offset (higher angle, slightly shifted laterally, pulled in)
      const airAngle = camDir + 0.4;
      const airDist = distance * 0.85;
      const airHeight = height + 8.5;

      const airOffset = new THREE.Vector3(
        -Math.sin(airAngle) * airDist,
        airHeight,
        -Math.cos(airAngle) * airDist
      );

      offset = new THREE.Vector3().lerpVectors(stdOffset, airOffset, this.camAirTransition);
    } else {
      offset = new THREE.Vector3(
        -Math.sin(camDir) * distance,
        height,
        -Math.cos(camDir) * distance
      );
    }

    // 4. Lerp camera position smoothly
    const targetCamPos = targetPos.clone().add(offset);
    
    // Snap instantly when toggling the view, otherwise lerp
    if (this.wasLookingBack !== isLookingBack) {
      this.camera.position.copy(targetCamPos);
      this.wasLookingBack = isLookingBack;
      // Also snap the lookAt target to avoid slow rotation transition when switching views
      const instantLook = targetPos.clone().add(
        new THREE.Vector3(
          Math.sin(lookDir) * lookAheadDistance,
          targetLookY,
          Math.cos(lookDir) * lookAheadDistance
        )
      );
      this.camCurrentLookAt = instantLook;
    } else if (useLag) {
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
    if (this.physics.isBurnout && useLag) {
      shakeIntensity += 0.12; // aggressive engine vibration
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
    let lookAheadDistance = (mode === 'bonnet') ? (15.0 + speed * 0.1) : (4.0 + speed * 0.08);
    if (isLookingBack) lookAheadDistance = 0.0; // Keep car exactly centered when looking back

    // Pull look-ahead point closer to the car when airborne to center the vehicle
    if (useLag && this.camAirTransition > 0.001) {
      lookAheadDistance = THREE.MathUtils.lerp(lookAheadDistance, 0.5, this.camAirTransition);
    }

    // Compute blended look direction: blend heading direction and velocity direction (look ahead into velocity/slide direction)
    let lookX = Math.sin(lookDir);
    let lookZ = Math.cos(lookDir);
    if (speed > 4.0 && !isLookingBack) {
      const velX = this.physics.velocity.x;
      const velZ = this.physics.velocity.z;
      const velLengthXZ = Math.sqrt(velX * velX + velZ * velZ);
      if (velLengthXZ > 0.1) {
        const velNormalizedX = velX / velLengthXZ;
        const velNormalizedZ = velZ / velLengthXZ;
        const blend = isDrifting ? 0.55 : 0.22;
        lookX = THREE.MathUtils.lerp(lookX, velNormalizedX, blend);
        lookZ = THREE.MathUtils.lerp(lookZ, velNormalizedZ, blend);
        const len = Math.sqrt(lookX * lookX + lookZ * lookZ);
        if (len > 0.01) {
          lookX /= len;
          lookZ /= len;
        }
      }
    }

    const targetLook = targetPos.clone().add(
      new THREE.Vector3(
        lookX * lookAheadDistance,
        targetLookY,
        lookZ * lookAheadDistance
      )
    );

    if (!this.camCurrentLookAt) {
      this.camCurrentLookAt = targetLook.clone();
    } else {
      this.camCurrentLookAt.lerp(targetLook, 1 - Math.exp(-12 * dt));
    }
    this.camera.lookAt(this.camCurrentLookAt);

    // Apply Camera Roll (Lean) after lookAt
    if (useLag) {
      this.camera.rotateZ(this.camRoll);
    }

    // Update shadow/directional light to follow player
    this.dirLight.position.set(targetPos.x + 30, 60, targetPos.z + 30);
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

export function getTargetGameplayCamera() {
  const targetObj = this.physics;
  const speed = this.physics.velocity.length();
  const targetPos = this.renderPhysicsPosition || targetObj.position;
  const heading = this.renderPhysicsHeading !== undefined ? this.renderPhysicsHeading : targetObj.heading;

  let baseDist = 15.0;
  let baseHeight = 5.2;
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
    baseDist = -2.2;
    baseHeight = 1.0;
    targetLookY = 1.0;
  }

  const distance = baseDist + speed * 0.1;
  const height = baseHeight + Math.max(0.0, 1.5 - speed * 0.01);

  // Use current player heading directly since it aligns with the start grid heading
  const offset = new THREE.Vector3(
    -Math.sin(heading) * distance,
    height,
    -Math.cos(heading) * distance
  );

  const pos = targetPos.clone().add(offset);

  const lookAheadDistance = (mode === 'bonnet') ? (15.0 + speed * 0.1) : (4.0 + speed * 0.08);
  const lookAt = targetPos.clone().add(
    new THREE.Vector3(
      Math.sin(heading) * lookAheadDistance,
      targetLookY,
      Math.cos(heading) * lookAheadDistance
    )
  );

  const targetFOV = 55 + Math.min(20, speed * 0.35);

  return { pos, lookAt, fov: targetFOV };
}


