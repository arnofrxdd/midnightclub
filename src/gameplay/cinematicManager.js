import * as THREE from 'three';

export class CinematicManager {
  constructor(app) {
    this.app = app;
    this.state = 'none'; // 'none', 'fly_up', 'pan_route', 'swoop_back', 'countdown'
    this.timer = 0.0;
    this.duration = 0.0;
    this._aiSpawnedMidRoute = false; // tracks whether we've built AI meshes mid-pan

    this.cameraStartPos = new THREE.Vector3();
    this.cameraEndPos = new THREE.Vector3();
    this.cameraStartLookAt = new THREE.Vector3();
    this.cameraEndLookAt = new THREE.Vector3();

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

    this.transitionTo('fly_up');
  }

  // Helper: snap a world-space X,Z to ground height
  _snapY(x, z) {
    const world = this.app.world;
    return (world && typeof world.getGroundHeight === 'function')
      ? world.getGroundHeight(x, z)
      : 0.5;
  }

  // Helper: return the race start world position (the event intersection, not checkpoint[0])
  _getRaceStartPos() {
    // Use the stored event intersection coordinates — the player pressed F here.
    // checkpoints[0] is the FIRST waypoint ahead, NOT where the player stands.
    if (this.app._raceStartX !== undefined && this.app._raceStartZ !== undefined) {
      return new THREE.Vector3(this.app._raceStartX, 0, this.app._raceStartZ);
    }
    // Fallback: current physics position
    return this.app.physics.position.clone();
  }

  // Helper: compute heading from race start toward first checkpoint
  _getStartHeading(tx, tz) {
    const checkpoints = this.app.race.checkpoints;
    if (checkpoints && checkpoints.length > 0) {
      // Point from spawn position (tx, tz) toward the FIRST checkpoint ahead
      return Math.atan2(checkpoints[0].x - tx, checkpoints[0].z - tz);
    }
    return 0;
  }

  // Place and snap AI cars at the destination. Called mid-route while camera is still flying.
  _placeAndSnapAI() {
    const raceStartPos = this._getRaceStartPos();
    const tx = raceStartPos.x;
    const tz = raceStartPos.z;
    const startHeading = this._getStartHeading(tx, tz);

    const sin = Math.sin(startHeading);
    const cos = Math.cos(startHeading);
    // Right vector perpendicular to heading
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
        // Update mesh immediately if it already exists
        if (ai.meshGroup) {
          ai.meshGroup.position.set(ax, ay, az);
          ai.meshGroup.rotation.y = startHeading;
        }
      });
    }
  }

  transitionTo(nextState) {
    this.state = nextState;
    this.timer = 0.0;

    const playerPos = this.app.physics.position;
    const playerHeading = this.app.physics.heading;
    const playerFwd = new THREE.Vector3(Math.sin(playerHeading), 0, Math.cos(playerHeading));
    const raceStartPos = this._getRaceStartPos();

    if (nextState === 'fly_up') {
      this.duration = 1.3;

      // Start from normal camera position
      this.cameraStartPos.copy(this.app.camera.position);

      // Look target starts where camera currently looks
      const currentDir = new THREE.Vector3(0, 0, -1).applyQuaternion(this.app.camera.quaternion);
      this.cameraStartLookAt.copy(this.app.camera.position).addScaledVector(currentDir, 15.0);

      // Target: bird's eye above player
      this.cameraEndPos.copy(playerPos).add(new THREE.Vector3(0, 52, 0));
      this.cameraEndLookAt.copy(playerPos).addScaledVector(playerFwd, 15.0);
    }
    else if (nextState === 'pan_route') {
      // Calculate a path along roads so we don't fly through buildings
      if (this.app.race.navGraph) {
        this.cameraPath = this.app.race.navGraph.findPath(
          playerPos.x, playerPos.z,
          raceStartPos.x, raceStartPos.z
        );
      }

      if (!this.cameraPath || this.cameraPath.length < 2) {
        this.cameraPath = [playerPos.clone(), raceStartPos.clone()];
      }

      // Duration based on path length (min 3.5s, max 8.0s)
      this.duration = Math.min(8.0, Math.max(3.5, this.cameraPath.length * 0.45));

      // Lift path nodes to 52m altitude
      this.cameraPath = this.cameraPath.map(p => new THREE.Vector3(p.x, 52, p.z));

      this.cameraStartPos.copy(this.cameraPath[0]);
      this.cameraEndPos.copy(this.cameraPath[this.cameraPath.length - 1]);

      this.cameraStartLookAt.copy(playerPos).add(playerFwd.clone().multiplyScalar(15.0));
      this.cameraEndLookAt.copy(raceStartPos);

      // Build AI meshes NOW (hidden at their final destination),
      // so they exist and are rendered in place when the camera arrives.
      // We call buildAIMeshes but will position them via _placeAndSnapAI at 50% progress.
      this._aiSpawnedMidRoute = false;
    }
    else if (nextState === 'swoop_back') {
      this.duration = 1.5;

      const tx = raceStartPos.x;
      const tz = raceStartPos.z;
      const playerY = this._snapY(tx, tz);

      // Compute heading toward first checkpoint
      const startHeading = this._getStartHeading(tx, tz);

      // Teleport player car to the race grid
      this.app.physics.position.set(tx, playerY, tz);
      this.app.physics.heading = startHeading;

      // Force the visual car mesh to face the checkpoint immediately
      if (this.app.carVisualContainer) {
        this.app.carVisualContainer.position.set(tx, playerY, tz);
        this.app.carVisualContainer.rotation.y = startHeading;
      }

      // Final snap of AI (in case mid-route spawn didn't hit yet)
      this._placeAndSnapAI();

      // Camera: start from above race start, swoop behind car
      this.cameraStartPos.set(tx, playerY + 52, tz);
      this.cameraStartLookAt.set(tx, playerY, tz);

      const newFwd = new THREE.Vector3(Math.sin(startHeading), 0, Math.cos(startHeading));
      const behindOffset = newFwd.clone().negate().multiplyScalar(6.5);
      this.cameraEndPos.set(
        tx + behindOffset.x,
        playerY + 2.5,
        tz + behindOffset.z
      );
      this.cameraEndLookAt.set(tx, playerY + 0.5, tz).addScaledVector(newFwd, 10.0);
    }
    else if (nextState === 'countdown') {
      this.duration = 3.0;
      this.hudElement.style.display = 'block';
      this.updateCountdownText();
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

    // Smooth ease-in-out
    const t = progress * progress * (3.0 - 2.0 * progress);

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
          // Use quaternion directly — rotation.y is ignored when quaternion is dirty
          _lockQ.setFromAxisAngle(_yAxis, ai.heading);
          ai.meshGroup.quaternion.copy(_lockQ);
        }
      });
    }

    if (this.state === 'fly_up' || this.state === 'pan_route' || this.state === 'swoop_back') {
      let pos;

      if (this.state === 'pan_route' && this.cameraPath && this.cameraPath.length >= 2) {
        // Interpolate along road path
        const numSegments = this.cameraPath.length - 1;
        const totalT = t * numSegments;
        const segIndex = Math.min(Math.floor(totalT), numSegments - 1);
        const segT = totalT - segIndex;
        pos = this.cameraPath[segIndex].clone().lerp(this.cameraPath[segIndex + 1], segT);

        // --- Seamless pre-spawn at 50% progress ---
        // Camera is halfway across the city — silently teleport player and AI to the destination.
        // No pop-in is visible because the camera is still far away flying overhead.
        if (!this._aiSpawnedMidRoute && progress >= 0.5) {
          this._aiSpawnedMidRoute = true;

          const raceStartPos = this._getRaceStartPos();
          const tx = raceStartPos.x;
          const tz = raceStartPos.z;
          const startHeading = this._getStartHeading(tx, tz);
          const playerY = this._snapY(tx, tz);

          // Teleport player car to the race grid
          this.app.physics.position.set(tx, playerY, tz);
          this.app.physics.heading = startHeading;

          this.app.buildAIMeshes(); // creates the 3D meshes
          this._placeAndSnapAI();   // positions them at destination + correct Y & heading
        }
      } else {
        pos = this.cameraStartPos.clone().lerp(this.cameraEndPos, t);
      }

      const lookAt = this.cameraStartLookAt.clone().lerp(this.cameraEndLookAt, t);
      this.app.cameraOverride = { pos, lookAt };

      if (progress >= 1.0) {
        if (this.state === 'fly_up') this.transitionTo('pan_route');
        else if (this.state === 'pan_route') this.transitionTo('swoop_back');
        else if (this.state === 'swoop_back') this.transitionTo('countdown');
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
