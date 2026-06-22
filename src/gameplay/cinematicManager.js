import * as THREE from 'three';

export class CinematicManager {
  constructor(app) {
    this.app = app;
    this.state = 'none'; // 'none', 'cinematic', 'countdown'
    this.timer = 0.0;
    this.duration = 0.0;
    this._aiSpawnedMidRoute = false; // tracks whether we've built AI meshes mid-pan

    this.cameraStartPos = new THREE.Vector3();
    this.cameraEndPos = new THREE.Vector3();
    this.cameraStartLookAt = new THREE.Vector3();
    this.cameraEndLookAt = new THREE.Vector3();
    this.currentLookAt = new THREE.Vector3();

    // Create countdown HUD overlay dynamically
    this.hudElement = document.createElement('div');
    this.hudElement.id = 'cinematic-countdown';
    this.hudElement.style.position = 'absolute';
    this.hudElement.style.top = '50%';
    this.hudElement.style.left = '50%';
    this.hudElement.style.transform = 'translate(-50%, -50%)';
    this.hudElement.style.color = '#ffffff';
    this.hudElement.style.fontFamily = "'Outfit', 'Impact', sans-serif";
    this.hudElement.style.fontSize = '120px';
    this.hudElement.style.fontWeight = '900';
    this.hudElement.style.textShadow = '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.9)';
    this.hudElement.style.display = 'none';
    this.hudElement.style.pointerEvents = 'none';
    this.hudElement.style.zIndex = '9999';
    document.body.appendChild(this.hudElement);
  }

  start(raceMode) {
    if (this.state !== 'none') return;

    // Stop player
    this.app.physics.speed = 0;
    this.app.physics.velocity.set(0, 0, 0);
    this.app.physics.angularVelocity = 0;

    this._aiSpawnedMidRoute = false;

    this.transitionTo('cinematic');
  }

  // Helper: snap a world-space X,Z to ground height
  _snapY(x, z) {
    const world = this.app.world;
    return (world && typeof world.getGroundHeight === 'function')
      ? world.getGroundHeight(x, z)
      : 0.5;
  }

  // Helper: return the race start world position
  _getRaceStartPos() {
    if (this.app._raceStartX !== undefined && this.app._raceStartZ !== undefined) {
      return new THREE.Vector3(this.app._raceStartX, 0, this.app._raceStartZ);
    }
    return this.app.physics.position.clone();
  }

  // Helper: compute heading from race start toward first checkpoint
  _getStartHeading(tx, tz) {
    const checkpoints = this.app.race.checkpoints;
    if (checkpoints && checkpoints.length > 0) {
      return Math.atan2(checkpoints[0].x - tx, checkpoints[0].z - tz);
    }
    return 0;
  }

  // Place and snap AI cars at the destination start line
  _placeAndSnapAI() {
    const raceStartPos = this._getRaceStartPos();
    const tx = raceStartPos.x;
    const tz = raceStartPos.z;
    const startHeading = this._getStartHeading(tx, tz);

    const sin = Math.sin(startHeading);
    const cos = Math.cos(startHeading);
    const rSin = Math.cos(startHeading);
    const rCos = -Math.sin(startHeading);

    const aiOffsets = [
      { fwd: -8, right: -6 },  // left behind
      { fwd: -8, right:  6 },  // right behind
      { fwd: -16, right: 0 },  // far behind center
    ];

    if (this.app.race.aiRacers) {
      this.app.race.aiRacers.forEach((ai, idx) => {
        const off = aiOffsets[idx] || { fwd: -8, right: 0 };
        const ax = tx + sin * off.fwd + rSin * off.right;
        const az = tz + cos * off.fwd + rCos * off.right;
        const ay = this._snapY(ax, az);
        ai.position.set(ax, ay, az);
        ai.spawnPos.set(ax, ay, az);
        ai.heading = startHeading;
        if (ai.meshGroup) {
          ai.meshGroup.position.set(ax, ay, az);
          ai.meshGroup.rotation.y = startHeading;
        }
      });
    }
  }

  // Calculate destination gameplay camera parameters before teleport
  _getDestinationGameplayCamera() {
    const raceStartPos = this._getRaceStartPos();
    const tx = raceStartPos.x;
    const tz = raceStartPos.z;
    const startHeading = this._getStartHeading(tx, tz);
    const playerY = this._snapY(tx, tz);

    let baseDist = 15.0;
    let baseHeight = 5.2;
    let targetLookY = 1.1;

    const mode = this.app.cameraMode || 'medium';
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

    const offset = new THREE.Vector3(
      -Math.sin(startHeading) * baseDist,
      baseHeight,
      -Math.cos(startHeading) * baseDist
    );

    const pos = new THREE.Vector3(tx, playerY, tz).add(offset);

    const lookAheadDistance = (mode === 'bonnet') ? 15.0 : 4.0;
    const lookAt = new THREE.Vector3(tx, playerY, tz).add(
      new THREE.Vector3(
        Math.sin(startHeading) * lookAheadDistance,
        targetLookY,
        Math.cos(startHeading) * lookAheadDistance
      )
    );

    const targetFOV = 55;

    return { pos, lookAt, fov: targetFOV };
  }

  transitionTo(nextState) {
    this.state = nextState;
    this.timer = 0.0;

    const playerPos = this.app.physics.position;
    const playerHeading = this.app.physics.heading;
    const playerFwd = new THREE.Vector3(Math.sin(playerHeading), 0, Math.cos(playerHeading));
    const raceStartPos = this._getRaceStartPos();
    const tx = raceStartPos.x;
    const tz = raceStartPos.z;
    const startHeading = this._getStartHeading(tx, tz);
    const playerY = this._snapY(tx, tz);

    if (nextState === 'cinematic') {
      // 1. Calculate road path nodes
      let roadPath = [];
      if (this.app.race.navGraph) {
        roadPath = this.app.race.navGraph.findPath(
          playerPos.x, playerPos.z,
          raceStartPos.x, raceStartPos.z
        );
      }
      if (!roadPath || roadPath.length < 2) {
        roadPath = [playerPos.clone(), raceStartPos.clone()];
      }

      // Lift road path nodes to Y=52m
      const elevatedRoadPath = roadPath.map(p => new THREE.Vector3(p.x, 52, p.z));

      // 2. Query starting and ending camera configurations
      const startCamPos = this.app.camera.position.clone();
      const currentDir = new THREE.Vector3(0, 0, -1).applyQuaternion(this.app.camera.quaternion);
      this.cameraStartLookAt = startCamPos.clone().addScaledVector(currentDir, 15.0);
      this.currentLookAt.copy(this.cameraStartLookAt);

      const destCam = this._getDestinationGameplayCamera();

      // 3. Assemble unified spline control points:
      // - Start: current camera position
      // - Fly up: player position + 52m height
      // - Pan route: elevated road path nodes
      // - Swoop back: race start position + 52m height
      // - End: target gameplay camera position behind car at starting grid
      const controlPoints = [];
      controlPoints.push(startCamPos);
      elevatedRoadPath.forEach(p => controlPoints.push(p));
      controlPoints.push(destCam.pos);

      // Create a single unified Catmull-Rom spline curve!
      this.fullPathCurve = new THREE.CatmullRomCurve3(controlPoints);

      // Calculate total duration (1.3s fly_up + pan duration + 1.6s swoop_back)
      const panDuration = Math.min(8.0, Math.max(3.5, elevatedRoadPath.length * 0.45));
      this.duration = 1.3 + panDuration + 1.6;

      this.cameraStartFov = this.app.camera.fov;
      this.cameraEndFov = destCam.fov;

      this.cameraStartLookAt = this.cameraStartLookAt.clone();
      this.cameraEndLookAt = destCam.lookAt.clone();

      this._aiSpawnedMidRoute = false;
    }
    else if (nextState === 'countdown') {
      this.duration = 3.0;
      this.hudElement.style.display = 'block';
      this.updateCountdownText();
      
      // Sync heading to be fully bulletproof
      this.app.camHeading = startHeading;

      // Release camera override — normal camera takes over
      this.app.cameraOverride = null;
    }
    else if (nextState === 'none') {
      this.hudElement.style.display = 'none';
      this.app.clock.getDelta(); // flush accumulated time

      // Always start race with full nitro when countdown finishes
      if (this.app.physics) {
        this.app.physics.nitroLevel = this.app.physics.maxNitro;
      }
      if (this.app.race && this.app.race.aiRacers) {
        this.app.race.aiRacers.forEach(ai => {
          ai.nitroLevel = 1.0;
        });
      }
    }
  }

  update(dt) {
    if (this.state === 'none') return;

    this.timer += dt;
    const progress = Math.min(1.0, this.timer / this.duration);

    // Lock player physics during cinematic
    this.app.physics.speed = 0;
    this.app.physics.velocity.set(0, 0, 0);
    this.app.physics.angularVelocity = 0;

    // Lock AI at their spawn positions during cinematic
    const _yAxis = new THREE.Vector3(0, 1, 0);
    const _lockQ  = new THREE.Quaternion();
    if (this.app.race.aiRacers) {
      this.app.race.aiRacers.forEach(ai => {
        ai.speed = 0;
        ai.velocity.set(0, 0, 0);
        ai.position.copy(ai.spawnPos);
        if (ai.meshGroup) {
          ai.meshGroup.position.copy(ai.spawnPos);
          _lockQ.setFromAxisAngle(_yAxis, ai.heading);
          ai.meshGroup.quaternion.copy(_lockQ);
        }
      });
    }

    if (this.state === 'cinematic') {
      // Smooth ease-in-out curve for travel along the spline
      const t = progress * progress * (3.0 - 2.0 * progress);

      // Get camera position along the single unified spline
      const pos = this.fullPathCurve.getPointAt(t);

      // --- Seamless pre-spawn at 50% progress ---
      const raceStartPos = this._getRaceStartPos();
      if (!this._aiSpawnedMidRoute && progress >= 0.5) {
        this._aiSpawnedMidRoute = true;
        const tx = raceStartPos.x;
        const tz = raceStartPos.z;
        const startHeading = this._getStartHeading(tx, tz);
        const playerY = this._snapY(tx, tz);

        // Teleport player car to the race grid
        this.app.physics.position.set(tx, playerY, tz);
        this.app.physics.heading = startHeading;
        this.app.camHeading = startHeading;

        this.app.buildAIMeshes();
        this._placeAndSnapAI();
      }

      // Dynamic Look-Ahead Focus Target
      const lookAheadT = Math.min(1.0, t + 0.08);
      const lookAheadPos = this.fullPathCurve.getPointAt(lookAheadT);
      const roadLookAt = lookAheadPos.clone();
      roadLookAt.y = this._snapY(roadLookAt.x, roadLookAt.z) + 1.0;

      // Blend look-at smoothly across progress
      let targetLook;
      if (t < 0.25) {
        // Smoothly pan from starting player camera view to road look-ahead
        const blend = t / 0.25;
        const smoothBlend = blend * blend * (3.0 - 2.0 * blend);
        targetLook = this.cameraStartLookAt.clone().lerp(roadLookAt, smoothBlend);
      } else if (t > 0.75) {
        // Smoothly pan from road look-ahead to gameplay target lookAt
        const blend = (t - 0.75) / 0.25;
        const smoothBlend = blend * blend * (3.0 - 2.0 * blend);
        targetLook = roadLookAt.clone().lerp(this.cameraEndLookAt, smoothBlend);
      } else {
        targetLook = roadLookAt;
      }

      // Drone Banking (Roll) based on curve direction change
      let roll = 0;
      const sampleT1 = Math.max(0.0, t - 0.015);
      const sampleT2 = Math.min(1.0, t + 0.015);
      const tan1 = this.fullPathCurve.getTangentAt(sampleT1);
      const tan2 = this.fullPathCurve.getTangentAt(sampleT2);
      const angle1 = Math.atan2(tan1.x, tan1.z);
      const angle2 = Math.atan2(tan2.x, tan2.z);
      let angleDiff = angle2 - angle1;
      angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
      roll = THREE.MathUtils.clamp(-angleDiff * 5.5, -0.09, 0.09);

      // FOV transitions smoothly from start FOV to destination gameplay FOV
      const fov = this.cameraStartFov + (this.cameraEndFov - this.cameraStartFov) * t;

      // Procedural wind/vibration camera noise
      const time = Date.now() * 0.0035;
      pos.x += Math.sin(time * 1.6) * 0.12;
      pos.y += Math.cos(time * 1.2) * 0.08;
      pos.z += Math.cos(time * 1.8) * 0.12;

      targetLook.x += Math.sin(time * 2.5) * 0.22;
      targetLook.y += Math.cos(time * 2.0) * 0.16;
      targetLook.z += Math.cos(time * 2.9) * 0.22;

      // Apply fluid head damping for massive AAA weight (low factor for slow, heavy panning)
      this.currentLookAt.lerp(targetLook, 1 - Math.exp(-2.5 * dt));

      this.app.cameraOverride = { pos, lookAt: this.currentLookAt.clone(), fov, roll };

      if (progress >= 1.0) {
        this.transitionTo('countdown');
      }
    }
    else if (this.state === 'countdown') {
      this.updateCountdownText();
      if (progress >= 1.0) {
        this.transitionTo('none');
      }
    }
  }

  updateCountdownText() {
    const remaining = this.duration - this.timer;
    let label = '';
    let color = '#ff3b30';

    if (remaining > 2.0) {
      label = '3'; color = '#ff3b30';
    } else if (remaining > 1.0) {
      label = '2'; color = '#ff9500';
    } else if (remaining > 0.0) {
      label = '1'; color = '#ffcc00';
    } else {
      label = 'GO!'; color = '#4cd964';
    }

    this.hudElement.innerText = label;
    this.hudElement.style.color = color;

    const pulseProgress = (this.timer % 1.0);
    const scale = 1.0 + Math.sin(pulseProgress * Math.PI) * 0.15;
    this.hudElement.style.transform = `translate(-50%, -50%) scale(${scale})`;
    this.hudElement.style.textShadow = `0 0 20px ${color}, 0 0 45px rgba(0, 0, 0, 0.95)`;
  }
}
