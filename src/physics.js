import * as THREE from 'three';

export class CarPhysics {
  constructor() {
    // Spatial vectors
    this.position = new THREE.Vector3(0, 0.5, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.heading = 0; // Direction the car is facing (radians)
    this.angularVelocity = 0;
    this.externalSpin = 0.0; // External angular impulse (e.g. from cop side-swipes)
    
    // Physical stats
    this.mass = 1350; // kg
    this.maxSpeed = 110; // m/s (~246 mph)
    this.engineForce = 75; // Increased base acceleration power
    this.brakingForce = 115; // Snappier, firmer brakes
    this.drag = 0.052; // Air resistance
    this.rollingResistance = 0.025; // Road friction
    
    // Steering and drifting
    this.steeringAngle = 0;
    this.maxSteerAngle = 0.58; // Radians (~33 deg, slightly sharper steer)
    this.steeringSpeed = 5.2; // Responsive steering response
    
    // Advanced Traction / Slip Model
    this.gripNormal = 18.5; // High base grip for snappy response
    this.gripDrift = 3.6;   // Floor grip during slide
    this.isDrifting = false;
    this.driftTraction = 1.0; // Dynamic grip coefficient (1.0 = full grip, 0.0 = sliding)
    this.wheelSpin = 0.0;     // Launch/boost wheelspin factor
    
    // Dimensions
    this.length = 4.4;
    this.width = 2.0;
    
    // Advanced Suspension & 3D Dynamics
    this.suspensionRestLength = 0.82;
    this.suspensionStiffness = 32000;
    this.suspensionDamping = 1800;
    this.inertiaPitch = 2400;
    this.inertiaRoll = 1000;
    this.cgHeight = 0.45;
    
    this.pitchVelocity = 0.0;
    this.rollVelocity = 0.0;
    this.bodyRoll = 0.0;
    this.bodyPitch = 0.0;
    
    // Dynamic features
    this.inSlipstream = false;
    this.justCrashed = false;
    this.lastWallImpactSpeed = 0.0;
    this.lastWallImpactNormal = new THREE.Vector3();

    // Gear System properties
    this.gear = 1;         // 1 to 6, 'R' for reverse, 'N' for neutral
    this.prevGear = 1;     // Tracks shifts to trigger camera punches
    this.rpm = 1000;       // RPM (idle 1000, redline 8000)
    this.shiftTimer = 0.0; // Remaining clutch delay time in seconds
    this.gearRatios = [0, 3.9, 2.5, 1.8, 1.35, 1.0, 0.8]; // Ratios for torque calculations
    this.gearMaxSpeeds = [0, 18, 33, 52, 72, 94, 115];   // Speed ranges (m/s)
    this.justUpshifted = false; // Track if last gear change was up
    this.isScraping = false;
    this.scrapeNormal = new THREE.Vector3();

    // 3D Jump & Rollover Physics variables
    this.velocityY = 0.0;
    this.isAirborne = false;
    this.rolloverTimer = 0.0;
    this.rolloverSpin = 0.0;
    this.airTime = 0.0;

    // Stunt System tracking variables
    this.stuntPitchRotated = 0.0;
    this.stuntRollRotated = 0.0;
    this.stuntYawRotated = 0.0;
    this.prevAirPitch = 0.0;
    this.prevAirRoll = 0.0;
    this.prevAirHeading = 0.0;
    this.trickNotification = "";

    // Nitro System
    this.nitroLevel = 0.5; // Starts at 50%
    this.maxNitro = 1.0;

    // Preallocated scratch vectors (avoid per-frame heap allocation in update)
    this._fwdVec = new THREE.Vector3();
    this._rightVec = new THREE.Vector3();
    this.isBoosting = false;
    this.driftDuration = 0.0;
  }

  update(dt, keys, world) {
    if (dt <= 0) return;
    
    // 1. Process steering input
    let targetSteer = 0;
    if (keys['a'] || keys['arrowleft']) targetSteer = this.maxSteerAngle;
    if (keys['d'] || keys['arrowright']) targetSteer = -this.maxSteerAngle;
    
    // Smooth steering transition
    this.steeringAngle += (targetSteer - this.steeringAngle) * this.steeringSpeed * dt;
    
    // 2. Local forward and right vectors (reuse preallocated scratch vectors)
    const forwardVec = this._fwdVec.set(Math.sin(this.heading), 0, Math.cos(this.heading));
    const rightVec   = this._rightVec.set(Math.cos(this.heading), 0, -Math.sin(this.heading));
    
    // Project velocity to find forward and lateral speeds
    const forwardSpeed = this.velocity.dot(forwardVec);
    const lateralSpeed = this.velocity.dot(rightVec);
    const speedMagnitude = Math.abs(forwardSpeed);
    
    // 3. Drift & Traction Model (Handbrake & Slide Dynamics)
    const wantsHandbrake = keys[' '] || keys['spacebar'];
    const wantsAccel = keys['w'] || keys['arrowup'];
    const wantsBrake = keys['s'] || keys['arrowdown'];
    
    // Wheelspin simulation on hard launch or Nitro usage
    if (wantsAccel && speedMagnitude < 12.0 && this.gear === 1) {
      const targetSpin = (keys['shift'] || this.isBoosting) ? 1.0 : 0.65;
      this.wheelSpin += (targetSpin - this.wheelSpin) * 5.0 * dt;
    } else {
      this.wheelSpin += (0.0 - this.wheelSpin) * 4.0 * dt;
    }

    // Drift initiation logic
    if (wantsHandbrake && speedMagnitude > 7.0) {
      this.isDrifting = true;
      // Handbrake locks rear wheels and drops traction coefficient rapidly
      this.driftTraction = Math.max(0.1, this.driftTraction - 4.5 * dt);
    } else if (this.isDrifting) {
      // Counter-steering allows recovery of grip
      const steeringDirection = Math.sign(this.steeringAngle);
      const slidingDirection = Math.sign(lateralSpeed);
      
      if (steeringDirection === slidingDirection && steeringDirection !== 0) {
        // Counter-steering: recover traction faster
        this.driftTraction = Math.min(1.0, this.driftTraction + 1.6 * dt);
      } else {
        // Holding drift: slide continues
        this.driftTraction = Math.min(1.0, this.driftTraction + 0.5 * dt);
      }
      
      // End drift once speed drops too low or traction recovers fully
      if (speedMagnitude < 4.0 || (this.driftTraction > 0.85 && Math.abs(lateralSpeed) < 2.0)) {
        this.isDrifting = false;
      }
    } else {
      // Return grip to normal
      this.driftTraction = Math.min(1.0, this.driftTraction + 2.5 * dt);
    }

    // Nitro activation (Shift key or 'n' or 'f' keys)
    const wantsBoost = (keys['shift'] || keys['n'] || keys['f']) && this.nitroLevel > 0.01 && forwardSpeed > 3.0 && this.gear !== 'R';
    this.isBoosting = wantsBoost;
    if (this.isBoosting) {
      this.nitroLevel = Math.max(0.0, this.nitroLevel - 0.28 * dt); // depletes in ~3.5 seconds
    }

    // Drift-based nitro charging
    if (this.isDrifting && speedMagnitude > 9.0 && Math.abs(lateralSpeed) > 2.5) {
      this.driftDuration += dt;
      // Accumulate nitro based on drift intensity and speed
      const driftIntensity = Math.min(2.0, Math.abs(lateralSpeed) / 8.0);
      const gain = 0.075 * dt * driftIntensity;
      this.nitroLevel = Math.min(this.maxNitro, this.nitroLevel + gain);
    } else {
      this.driftDuration = 0.0;
    }
    
    // 4. Gear System automatic shifting and RPM simulation
    // Determine gear states
    if (wantsBrake) {
      // Reverse detection
      if (forwardSpeed < 1.5 && this.gear !== 'R') {
        this.prevGear = this.gear;
        this.gear = 'R';
        this.shiftTimer = 0.15;
        this.justUpshifted = false;
      }
    } else if (wantsAccel) {
      if (this.gear === 'R') {
        this.prevGear = this.gear;
        this.gear = 1;
        this.shiftTimer = 0.15;
        this.justUpshifted = true;
      }
    }

    if (this.shiftTimer > 0) {
      this.shiftTimer -= dt;
    }

    // Automatic Shifting Logic for Forward Gears
    if (this.gear !== 'R' && this.gear !== 'N' && this.shiftTimer <= 0) {
      let currentG = this.gear;
      if (currentG < 6 && speedMagnitude > this.gearMaxSpeeds[currentG] * 0.92) {
        // Shift Up
        this.prevGear = currentG;
        this.gear = currentG + 1;
        this.shiftTimer = 0.18; // 0.18s clutch duration
        this.justUpshifted = true;
      } else if (currentG > 1 && speedMagnitude < this.gearMaxSpeeds[currentG - 1] * 0.78) {
        // Shift Down
        this.prevGear = currentG;
        this.gear = currentG - 1;
        this.shiftTimer = 0.15;
        this.justUpshifted = false;
      }
    }

    // Calculate Engine RPM
    if (this.shiftTimer > 0) {
      // Drop RPM during gear shifts (simulating clutch disengaged)
      this.rpm += (1500 - this.rpm) * 12.0 * dt;
    } else if (this.gear === 'R') {
      const revPct = speedMagnitude / 15.0;
      const targetRPM = 1000 + Math.min(1.0, revPct) * 6000;
      this.rpm += (targetRPM - this.rpm) * 10.0 * dt;
    } else {
      const currentG = this.gear;
      const minS = currentG > 1 ? this.gearMaxSpeeds[currentG - 1] * 0.8 : 0;
      const maxS = this.gearMaxSpeeds[currentG];
      const speedRatio = (speedMagnitude - minS) / (maxS - minS);
      
      let targetRPM = 1200 + Math.max(0.0, Math.min(1.0, speedRatio)) * 6300;
      
      // Rev limiter bounce simulation
      if (speedMagnitude >= maxS * 0.98 || this.wheelSpin > 0.4) {
        if (this.rpm >= 7700) {
          targetRPM = 7100; // Bounce down
        } else {
          targetRPM = 7950; // Bounce up
        }
      }
      this.rpm += (targetRPM - this.rpm) * 14.0 * dt;
    }
    this.rpm = Math.max(1000, Math.min(8000, this.rpm));

    // 5. Forces: Engine & Braking with gear ratio torque multipliers
    let force = 0;
    if (this.shiftTimer <= 0) {
      if (wantsAccel) {
        // Apply gear torque multiplier (lower gears accelerate faster)
        let torqueMultiplier = 1.0;
        if (this.gear === 'R') {
          torqueMultiplier = 1.4;
        } else {
          torqueMultiplier = this.gearRatios[this.gear] || 1.0;
        }

        // Wheelspin reduces initial forward bite but increases RPM sound effects
        const spinBite = 1.0 - (this.wheelSpin * 0.35);
        
        // SLIPSTREAM / DRAFTING BOOST
        const slipstreamMult = this.inSlipstream ? 1.16 : 1.0;
        force += this.engineForce * torqueMultiplier * spinBite * slipstreamMult;
        
        if (this.isBoosting) force *= 1.85; // Nitro boost!
        
        // Rev limiter throttle cut
        if (this.rpm > 7800) {
          force *= 0.05;
        }
      }
    }

    if (wantsBrake) {
      // Brake or Reverse
      if (forwardSpeed > 1.0) {
        force -= this.brakingForce;
        // Heavy braking while turning can lock up tires and trigger a slide
        if (Math.abs(this.steeringAngle) > 0.25) {
          this.isDrifting = true;
          this.driftTraction = Math.max(0.3, this.driftTraction - 2.0 * dt);
        }
      } else if (this.gear === 'R') {
        force -= this.engineForce * 0.8;
      }
    }
    
    // Drag & Resistance
    // Slipstream reduces drag coefficient by 40%
    const currentDragCoeff = this.inSlipstream ? this.drag * 0.6 : this.drag;
    const dragForce = -currentDragCoeff * forwardSpeed * Math.abs(forwardSpeed);
    const rollForce = -this.rollingResistance * forwardSpeed;
    const totalForwardForce = force + dragForce + rollForce;
    
    // Apply forward force to velocity
    this.velocity.addScaledVector(forwardVec, (totalForwardForce / this.mass) * 100 * dt);

    // Apply slope-based gravity acceleration to forward and lateral velocity
    let forwardSlope = 0;
    let lateralSlope = 0;
    if (world && typeof world.getGroundHeight === 'function' && !this.isAirborne) {
      const sampleDist = 1.0;
      const hFront = world.getGroundHeight(this.position.x + forwardVec.x * sampleDist, this.position.z + forwardVec.z * sampleDist);
      const hBack = world.getGroundHeight(this.position.x - forwardVec.x * sampleDist, this.position.z - forwardVec.z * sampleDist);
      forwardSlope = (hFront - hBack) / (sampleDist * 2.0);

      const hRight = world.getGroundHeight(this.position.x + rightVec.x * sampleDist, this.position.z + rightVec.z * sampleDist);
      const hLeft = world.getGroundHeight(this.position.x - rightVec.x * sampleDist, this.position.z - rightVec.z * sampleDist);
      lateralSlope = (hRight - hLeft) / (sampleDist * 2.0);

      const gravityAcc = 18.0;
      
      // If braking/holding handbrake and speed is very low, resist slope sliding
      const isBraking = wantsBrake || wantsHandbrake;
      const currentFwdSpeed = this.velocity.dot(forwardVec);
      
      if (isBraking && Math.abs(currentFwdSpeed) < 0.5) {
        // Lock car on the slope
        this.velocity.addScaledVector(forwardVec, -currentFwdSpeed);
      } else {
        this.velocity.addScaledVector(forwardVec, -gravityAcc * forwardSlope * dt);
      }
      
      if (isBraking && Math.abs(lateralSpeed) < 0.5) {
        this.velocity.addScaledVector(rightVec, -lateralSpeed);
      } else {
        this.velocity.addScaledVector(rightVec, -gravityAcc * lateralSlope * dt);
      }
    }
    
    // 6. Lateral Friction (Grip) with slide/wheel-slip response
    // Resists sliding sideways. Grip drops based on driftTraction coefficient.
    const currentGrip = THREE.MathUtils.lerp(this.gripDrift, this.gripNormal, this.driftTraction);
    const latFrictionForce = -lateralSpeed * currentGrip;
    this.velocity.addScaledVector(rightVec, latFrictionForce * dt);
    
    // Limit maximum speed based on current gear and nitro
    const maxSpeedLimit = this.isBoosting ? this.maxSpeed * 1.35 : this.maxSpeed;
    const currentSpeed = this.velocity.length();
    if (currentSpeed > maxSpeedLimit) {
      this.velocity.setLength(maxSpeedLimit);
    }

    // Apply mid-air aerodynamic drag to horizontal speed and clamp vertical speed
    if (this.isAirborne) {
      // 15% velocity decay per second horizontally in mid-air
      this.velocity.x *= Math.exp(-0.15 * dt);
      this.velocity.z *= Math.exp(-0.15 * dt);
      
      // Clamp vertical falling speed to terminal velocity (-38 m/s)
      if (this.velocityY < -38.0) {
        this.velocityY = -38.0;
      }
    }
    
    // 7. Yaw Rotation (Steering turns the car based on forward speed)
    if (speedMagnitude > 0.5) {
      // Handbrake or brake slide increases rotational rotation
      const slideFactor = this.isDrifting ? 1.95 : 1.0;
      const turnFactor = Math.min(1.0, forwardSpeed / 8.0);
      const yawSpeed = this.steeringAngle * turnFactor * slideFactor;
      
      // Handbrake slide spins out the rear end faster
      if (wantsHandbrake && Math.abs(this.steeringAngle) > 0.1) {
        this.angularVelocity += this.steeringAngle * 3.5 * dt;
      } else {
        this.angularVelocity = yawSpeed;
      }
    } else {
      this.angularVelocity = 0;
    }
    this.heading += (this.angularVelocity + this.externalSpin) * dt;
    this.externalSpin *= Math.exp(-4.5 * dt); // decay spin-out force quickly
    
    // Apply velocity to position
    this.position.addScaledVector(this.velocity, dt);
    
    // 8. 4-WHEEL SUSPENSION SPRING-DAMPER SIMULATION
    const wheelOffsets = [
      { x: -0.95, z: 1.3 },  // FL
      { x: 0.95, z: 1.3 },   // FR
      { x: -0.95, z: -1.3 }, // RL
      { x: 0.95, z: -1.3 }   // RR
    ];

    const hGround = [0.5, 0.5, 0.5, 0.5];
    const compressions = [0, 0, 0, 0];
    
    const cosH = Math.cos(this.heading);
    const sinH = Math.sin(this.heading);
    
    let totalFSpring = 0.0;
    let totalTPitch = 0.0;
    let totalTRoll = 0.0;
    
    for (let i = 0; i < 4; i++) {
      const w = wheelOffsets[i];
      // World coordinates of wheel contact points
      const wx = this.position.x + w.x * cosH + w.z * sinH;
      const wz = this.position.z - w.x * sinH + w.z * cosH;
      
      // Ground height check
      const gh = (world && typeof world.getGroundHeight === 'function') 
        ? world.getGroundHeight(wx, wz) 
        : 0.5;
      hGround[i] = gh;
      
      // Subtract slope height offset to calculate compression relative to slope plane.
      // This prevents the slope from double-tilting the car's body roll/pitch.
      const slopeH = w.z * forwardSlope + w.x * lateralSlope;
      const ghRel = gh - slopeH;
      
      // Attachment point height: pitch down decreases front height, roll left increases left height
      const yAtt = this.position.y - w.z * this.bodyPitch - w.x * this.bodyRoll;
      
      // Compression relative to slope plane
      const comp = Math.max(0.0, (ghRel + this.suspensionRestLength) - yAtt);
      compressions[i] = comp;
      
      // Compression velocity
      const vAtt = this.velocityY - w.z * this.pitchVelocity - w.x * this.rollVelocity;
      
      if (comp > 0.0) {
        let force = this.suspensionStiffness * comp - this.suspensionDamping * vAtt;
        force = Math.max(0.0, force);
        
        totalFSpring += force;
        totalTPitch += force * -w.z;
        totalTRoll += force * -w.x;
      }
    }
    
    // Inertial torques (visual body movement from accel and cornering)
    const forwardAccel = totalForwardForce / this.mass;
    const tPitchInertia = -this.mass * forwardAccel * this.cgHeight * 3.5;
    const tRollInertia = -latFrictionForce * this.cgHeight * 3.5;
    
    // Check if airborne
    const wasAirborne = this.isAirborne;
    const totalComp = compressions[0] + compressions[1] + compressions[2] + compressions[3];
    const avgGroundHeight = (hGround[0] + hGround[1] + hGround[2] + hGround[3]) / 4;
    
    if (totalComp <= 0.001) {
      this.isAirborne = true;
      this.airTime += dt;
    } else {
      this.isAirborne = false;
      this.airTime = 0.0;
    }

    // Mid-air rotation tracking
    if (this.isAirborne) {
      if (this.airTime <= dt) {
        // Just launched! Initialize trick tracking
        this.stuntPitchRotated = 0.0;
        this.stuntRollRotated = 0.0;
        this.stuntYawRotated = 0.0;
        this.prevAirPitch = this.bodyPitch;
        this.prevAirRoll = this.bodyRoll;
        this.prevAirHeading = this.heading;
      }

      // Track relative rotation deltas (handling heading wrapping)
      let dHeading = this.heading - this.prevAirHeading;
      while (dHeading < -Math.PI) dHeading += Math.PI * 2;
      while (dHeading > Math.PI) dHeading -= Math.PI * 2;

      this.stuntPitchRotated += Math.abs(this.bodyPitch - this.prevAirPitch);
      this.stuntRollRotated += Math.abs(this.bodyRoll - this.prevAirRoll);
      this.stuntYawRotated += Math.abs(dHeading);

      this.prevAirPitch = this.bodyPitch;
      this.prevAirRoll = this.bodyRoll;
      this.prevAirHeading = this.heading;
    }

    if (this.rolloverTimer <= 0) {
      // Apply forces and torques to the rigid body
      const gravityAcc = -22.0;
      const verticalAcc = (totalFSpring / this.mass) + gravityAcc;
      this.velocityY += verticalAcc * dt;
      this.position.y += this.velocityY * dt;
      
      // Only apply suspension and G-force torques when on the ground to prevent automatic nose dipping in mid-air
      let pitchAcc = 0;
      let rollAcc = 0;
      if (!this.isAirborne) {
        pitchAcc = (totalTPitch + tPitchInertia) / this.inertiaPitch;
        rollAcc = (totalTRoll + tRollInertia) / this.inertiaRoll;
      }
      
      this.pitchVelocity += pitchAcc * dt;
      this.bodyPitch += this.pitchVelocity * dt;
      this.pitchVelocity *= Math.exp(-3.0 * dt);
      
      this.rollVelocity += rollAcc * dt;
      this.bodyRoll += this.rollVelocity * dt;
      this.rollVelocity *= Math.exp(-3.0 * dt);
    } else {
      // Rollover tumble physics
      this.velocityY += -22.0 * dt;
      this.position.y += this.velocityY * dt;
      this.pitchVelocity = 0;
      this.rollVelocity = 0;
    }

    // Mid-air correction keys
    if (this.isAirborne && this.rolloverTimer <= 0) {
      let pitchControl = 0;
      let rollControl = 0;
      let yawControl = 0;
      
      const wantsHandbrake = keys[' '] || keys['spacebar'];
      
      // Pitch control: W/S or Arrow Up/Down
      if (keys['w'] || keys['arrowup']) pitchControl = 3.2; // faster flips
      if (keys['s'] || keys['arrowdown']) pitchControl = -3.2;
      
      if (wantsHandbrake) {
        // If holding Space, steer keys A/D control horizontal spinning (Yaw)
        if (keys['a'] || keys['arrowleft']) yawControl = 3.6;
        if (keys['d'] || keys['arrowright']) yawControl = -3.6;
      } else {
        // Otherwise, steer keys A/D control Barrel Roll
        if (keys['a'] || keys['arrowleft']) rollControl = -3.2;
        if (keys['d'] || keys['arrowright']) rollControl = 3.2;
      }
      
      this.pitchVelocity += pitchControl * dt;
      this.rollVelocity += rollControl * dt;
      this.heading += yawControl * dt;
      
      // Damp rotation velocities in the air
      this.pitchVelocity *= Math.exp(-2.2 * dt);
      this.rollVelocity *= Math.exp(-2.2 * dt);

      // Gyro stabilization helper (levels out the pitch/roll to match local terrain slope underneath)
      const hasPitchInput = keys['w'] || keys['s'] || keys['arrowup'] || keys['arrowdown'];
      const hasRollInput = !wantsHandbrake && (keys['a'] || keys['d'] || keys['arrowleft'] || keys['arrowright']);
      
      let targetPitch = 0;
      let targetRoll = 0;
      if (world && typeof world.getGroundHeight === 'function') {
        const sampleDist = 1.0;
        const hFront = world.getGroundHeight(this.position.x + forwardVec.x * sampleDist, this.position.z + forwardVec.z * sampleDist);
        const hBack = world.getGroundHeight(this.position.x - forwardVec.x * sampleDist, this.position.z - forwardVec.z * sampleDist);
        const airFwdSlope = (hFront - hBack) / (sampleDist * 2.0);

        const hRight = world.getGroundHeight(this.position.x + rightVec.x * sampleDist, this.position.z + rightVec.z * sampleDist);
        const hLeft = world.getGroundHeight(this.position.x - rightVec.x * sampleDist, this.position.z - rightVec.z * sampleDist);
        const airLatSlope = (hRight - hLeft) / (sampleDist * 2.0);
        
        targetPitch = Math.max(-0.5, Math.min(0.5, -airFwdSlope));
        targetRoll = Math.max(-0.5, Math.min(0.5, -airLatSlope));
      }
      
      if (!hasPitchInput) {
        this.pitchVelocity += (targetPitch - this.bodyPitch) * 2.5 * dt;
      }
      if (!hasRollInput) {
        this.rollVelocity += (targetRoll - this.bodyRoll) * 2.5 * dt;
      }
    }
    
    // Clamp pitch/roll to safe visual limits under normal conditions when on the ground
    if (this.rolloverTimer <= 0 && !this.isAirborne) {
      this.bodyPitch = Math.max(-0.4, Math.min(0.4, this.bodyPitch));
      this.bodyRoll = Math.max(-0.5, Math.min(0.5, this.bodyRoll));
    }

    // Detect landing and calculate tricks
    if (wasAirborne && !this.isAirborne) {
      // Landed! Wrap visual pitch/roll to [-PI, PI] to prevent sudden angle snaps
      while (this.bodyPitch < -Math.PI) this.bodyPitch += Math.PI * 2;
      while (this.bodyPitch > Math.PI) this.bodyPitch -= Math.PI * 2;
      while (this.bodyRoll < -Math.PI) this.bodyRoll += Math.PI * 2;
      while (this.bodyRoll > Math.PI) this.bodyRoll -= Math.PI * 2;

      // Stunt/Trick detection
      let trickName = "";
      let trickScore = 0;
      let nitroGained = 0.0;
      
      // 1. Pitch flips (360 flips)
      if (this.stuntPitchRotated >= 5.5) {
        const numFlips = Math.round(this.stuntPitchRotated / 6.28);
        const isBack = this.pitchVelocity > 0;
        const flipType = isBack ? "BACKFLIP" : "FRONTFLIP";
        if (numFlips > 1) {
          trickName = `DOUBLE ${flipType}!`;
          trickScore = 1500;
          nitroGained = 1.0;
        } else {
          trickName = `${flipType}!`;
          trickScore = 500;
          nitroGained = 0.5;
        }
      }
      
      // 2. Barrel Rolls
      if (this.stuntRollRotated >= 5.5) {
        const numRolls = Math.round(this.stuntRollRotated / 6.28);
        if (numRolls > 1) {
          trickName = "DOUBLE BARREL ROLL!";
          trickScore = 2000;
          nitroGained = 1.0;
        } else {
          trickName = "BARREL ROLL!";
          trickScore = 750;
          nitroGained = 0.5;
        }
      }
      
      // 3. Spins (Yaw)
      if (this.stuntYawRotated >= 5.5) {
        const numSpins = Math.round(this.stuntYawRotated / 6.28);
        if (numSpins > 1) {
          trickName = "720 MEGA SPIN!";
          trickScore = 2500;
          nitroGained = 1.0;
        } else {
          trickName = "360 SPIN!";
          trickScore = 1000;
          nitroGained = 0.6;
        }
      }
      
      // Combined Rodeo Flip
      if (this.stuntPitchRotated >= 5.5 && this.stuntYawRotated >= 5.5) {
        trickName = "RODEO FLIP!";
        trickScore = 3000;
        nitroGained = 1.0;
      }
      
      // Landing alignment validation (relative to slope plane)
      const landingRollError = Math.abs(this.bodyRoll);
      const landingPitchError = Math.abs(this.bodyPitch);
      const isCleanLanding = landingRollError < 0.22 && landingPitchError < 0.22;
      const isWipeout = landingRollError > 0.48 || landingPitchError > 0.48;
      
      if (trickName !== "") {
        if (isWipeout) {
          this.trickNotification = `WIPEOUT: CRASHED ON ${trickName}`;
          
          this.rolloverTimer = 1.5;
          this.rolloverSpin = (Math.random() > 0.5 ? 1.0 : -1.0) * (8.0 + Math.random() * 4.0);
          this.velocity.multiplyScalar(0.2); // Lose speed
          this.isDrifting = true;
        } else if (isCleanLanding) {
          this.trickNotification = `CLEAN LANDING: ${trickName} (+${trickScore} PTS)`;
          this.nitroLevel = Math.min(this.maxNitro, this.nitroLevel + nitroGained);
          
          // Speed boost!
          const currentSpeed = this.velocity.length();
          this.velocity.setLength(Math.max(currentSpeed, 45.0));
        } else {
          this.trickNotification = `LANDED: ${trickName} (+${trickScore} PTS)`;
          this.nitroLevel = Math.min(this.maxNitro, this.nitroLevel + nitroGained * 0.5);
        }
      } else {
        // No trick, check if landing normal wipeout or clean land
        if (isWipeout) {
          this.trickNotification = "WIPEOUT!";
          this.rolloverTimer = 1.25;
          this.rolloverSpin = (Math.random() > 0.5 ? 1.0 : -1.0) * (6.5 + Math.random() * 4.5);
          this.velocity.multiplyScalar(0.3);
          this.isDrifting = true;
        } else if (isCleanLanding && this.airTime > 0.8) {
          this.trickNotification = "CLEAN LANDING!";
          const currentSpeed = this.velocity.length();
          this.velocity.setLength(Math.max(currentSpeed, 38.0));
        }
      }
    }

    // Hard floor ceiling clamp to avoid clipping through ground on heavy drop impact
    if (this.position.y < avgGroundHeight) {
      this.position.y = avgGroundHeight;
      if (this.velocityY < -2.0) {
        this.velocityY = -this.velocityY * 0.15; // spring rebound bounce
      } else {
        this.velocityY = 0.0;
      }
    }

    // Rollover Tumbling updates
    if (this.rolloverTimer > 0) {
      this.rolloverTimer -= dt;
      this.bodyRoll += this.rolloverSpin * dt;
      this.bodyPitch += this.rolloverSpin * 0.3 * dt;
      this.rolloverSpin *= Math.exp(-2.2 * dt); // Decay roll velocity
      this.velocity.multiplyScalar(Math.exp(-2.0 * dt)); // Hard drag deceleration during rolls
    }

    // 9. World collision detection & reaction (Horizontal plane)
    const collResult = world.checkCollision(this.position.x, this.position.z, 2.0);
    if (collResult.collision) {
      // Reposition out of collision
      this.position.x += collResult.normalX * collResult.overlap;
      this.position.z += collResult.normalZ * collResult.overlap;
      
      const normal = new THREE.Vector3(collResult.normalX, 0, collResult.normalZ);
      const dotProd = this.velocity.dot(normal);
      
      const speed = this.velocity.length();
      if (speed > 4.0) {
        this.isScraping = true;
        this.scrapeNormal = normal.clone();
      } else {
        this.isScraping = false;
      }
      
      if (dotProd < 0) {
        // Bounce response
        this.velocity.addScaledVector(normal, -1.4 * dotProd);
        this.angularVelocity *= -0.5;
        this.isDrifting = false;
        
        // Wall crash tracking
        const impactSpeed = -dotProd;
        if (impactSpeed > 5.0) {
          this.lastWallImpactSpeed = impactSpeed;
          this.justCrashed = true;
          this.lastWallImpactNormal.copy(normal);
        }
      }
    } else {
      this.isScraping = false;
    }
  }

  reset() {
    this.position.set(0, 0.5, 0);
    this.velocity.set(0, 0, 0);
    this.heading = 0;
    this.angularVelocity = 0;
    this.isDrifting = false;
    this.driftTraction = 1.0;
    this.wheelSpin = 0.0;
    this.gear = 1;
    this.prevGear = 1;
    this.rpm = 1000;
    this.shiftTimer = 0.0;
    this.justUpshifted = false;
    this.isScraping = false;
    this.scrapeNormal.set(0, 0, 0);
    this.externalSpin = 0.0;
    
    // 3D physics reset
    this.velocityY = 0.0;
    this.isAirborne = false;
    this.rolloverTimer = 0.0;
    this.rolloverSpin = 0.0;
    this.airTime = 0.0;
    this.pitchVelocity = 0.0;
    this.rollVelocity = 0.0;
    this.bodyRoll = 0.0;
    this.bodyPitch = 0.0;
    this.inSlipstream = false;
    this.justCrashed = false;
  }
}
