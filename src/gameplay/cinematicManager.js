import * as THREE from 'three';

export class CinematicManager {
  constructor(app) {
    this.app = app;
    this.state = 'none'; // 'none', 'fly_up', 'pan_route', 'swoop_back', 'countdown'
    this.timer = 0.0;
    this.duration = 0.0;
    
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
    
    // Clear traffic, trigger race start state internally
    if (this.app.traffic) {
      this.app.traffic.clear();
      this.app.traffic.maxVehicles = 0; // Disable traffic during setup
    }

    // Force player velocity to zero
    this.app.physics.speed = 0;
    this.app.physics.velocity.set(0, 0, 0);
    this.app.physics.angularVelocity = 0;

    // Transition to Fly Up state
    this.transitionTo('fly_up');
  }

  transitionTo(nextState) {
    this.state = nextState;
    this.timer = 0.0;

    const playerPos = this.app.physics.position;
    const playerHeading = this.app.physics.heading;
    const playerFwd = new THREE.Vector3(Math.sin(playerHeading), 0, Math.cos(playerHeading));
    const checkpoints = this.app.race.checkpoints;
    const raceStartPos = checkpoints && checkpoints.length > 0
      ? new THREE.Vector3(checkpoints[0].x, 0, checkpoints[0].z)
      : playerPos.clone().addScaledVector(playerFwd, 150);

    if (nextState === 'fly_up') {
      this.duration = 1.3;
      
      // Start from normal camera position
      this.cameraStartPos.copy(this.app.camera.position);
      
      // Look target starts where camera currently looks
      const currentDir = new THREE.Vector3(0, 0, -1).applyQuaternion(this.app.camera.quaternion);
      this.cameraStartLookAt.copy(this.app.camera.position).addScaledVector(currentDir, 15.0);

      // Target position: bird's eye view above player
      this.cameraEndPos.copy(playerPos).add(new THREE.Vector3(0, 52, 0));
      this.cameraEndLookAt.copy(playerPos).addScaledVector(playerFwd, 15.0);
    } 
    else if (nextState === 'pan_route') {
      
      // Calculate a path along the roads so we don't fly through buildings
      if (this.app.race.navGraph) {
        this.cameraPath = this.app.race.navGraph.findPath(playerPos.x, playerPos.z, raceStartPos.x, raceStartPos.z);
      }
      
      if (!this.cameraPath || this.cameraPath.length < 2) {
         // Fallback
         this.cameraPath = [playerPos.clone(), raceStartPos.clone()];
      }
      
      // Calculate duration based on path length for a consistent fly speed (min 3.0s, max 8.0s)
      this.duration = Math.min(8.0, Math.max(3.0, this.cameraPath.length * 0.45));
      
      // Add height to all path nodes
      this.cameraPath = this.cameraPath.map(p => new THREE.Vector3(p.x, 52, p.z));
      
      // End position is the last node
      this.cameraStartPos.copy(this.cameraPath[0]);
      this.cameraEndPos.copy(this.cameraPath[this.cameraPath.length - 1]);
      
      this.cameraStartLookAt.copy(playerPos).add(playerFwd.clone().multiplyScalar(15.0));
      this.cameraEndLookAt.copy(raceStartPos);
    } 
    else if (nextState === 'swoop_back') {
      this.duration = 1.4;
      
      // TELEPORT: Before the swoop starts, instantly teleport the physical car 
      // to the race start position so it's waiting when we swoop down!
      this.app.physics.position.copy(raceStartPos);
      this.app.physics.heading = 0; // Look forward

      // Start from above the race start
      this.cameraStartPos.copy(raceStartPos).add(new THREE.Vector3(0, 52, 0));
      this.cameraStartLookAt.copy(raceStartPos);

      // Target position: behind player's newly teleported car
      // (Using fixed heading 0)
      const newFwd = new THREE.Vector3(0, 0, 1);
      const behindOffset = newFwd.clone().negate().multiplyScalar(5.5).add(new THREE.Vector3(0, 2.2, 0));
      this.cameraEndPos.copy(raceStartPos).add(behindOffset);
      this.cameraEndLookAt.copy(raceStartPos).addScaledVector(newFwd, 10.0);
    } 
    else if (nextState === 'countdown') {
      this.duration = 3.0; // 3 seconds countdown
      this.hudElement.style.display = 'block';
      this.updateCountdownText();
      
      // Release camera override to let updateCamera take back control smoothly
      this.app.cameraOverride = null;
    } 
    else if (nextState === 'none') {
      this.hudElement.style.display = 'none';
      
      // Officially start race actions (spawn AI meshes, restore traffic)
      this.app.buildAIMeshes();
      if (this.app.traffic) {
        this.app.traffic.maxVehicles = 16;
        this.app.traffic.init(this.app.physics.position, this.app.world);
      }
      this.app.clock.getDelta(); // flush time
    }
  }

  update(dt) {
    if (this.state === 'none') return;

    this.timer += dt;
    const progress = Math.min(1.0, this.timer / this.duration);
    
    // Ease-in-out curve for smooth camera movement
    const t = progress * progress * (3.0 - 2.0 * progress);

    // Keep player and AI cars completely locked during sequence
    this.app.physics.speed = 0;
    this.app.physics.velocity.set(0, 0, 0);
    this.app.physics.angularVelocity = 0;
    
    if (this.app.race.aiRacers) {
      this.app.race.aiRacers.forEach(ai => {
        ai.speed = 0;
        ai.velocity.set(0, 0, 0);
        ai.position.copy(ai.spawnPos); // lock at spawn
        if (ai.meshGroup) ai.meshGroup.position.copy(ai.spawnPos);
      });
    }

    if (this.state === 'fly_up' || this.state === 'pan_route' || this.state === 'swoop_back') {
      // Calculate interpolated position & target
      let pos;
      if (this.state === 'pan_route' && this.cameraPath && this.cameraPath.length >= 2) {
        // Interpolate along the road path
        const numSegments = this.cameraPath.length - 1;
        const totalT = t * numSegments;
        const segIndex = Math.min(Math.floor(totalT), numSegments - 1);
        const segT = totalT - segIndex;
        pos = this.cameraPath[segIndex].clone().lerp(this.cameraPath[segIndex + 1], segT);
      } else {
        pos = this.cameraStartPos.clone().lerp(this.cameraEndPos, t);
      }
      
      const lookAt = this.cameraStartLookAt.clone().lerp(this.cameraEndLookAt, t);
      
      // Override camera positioning
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
    let color = '#ff3b30'; // Red

    if (remaining > 2.0) {
      label = '3';
      color = '#ff3b30'; // Red
    } else if (remaining > 1.0) {
      label = '2';
      color = '#ff9500'; // Orange
    } else if (remaining > 0.0) {
      label = '1';
      color = '#ffcc00'; // Yellow
    } else {
      label = 'GO!';
      color = '#4cd964'; // Green
    }

    this.hudElement.innerText = label;
    this.hudElement.style.color = color;
    
    // Scale pulsation effect
    const pulseProgress = (this.timer % 1.0); // 0 to 1 every second
    const scale = 1.0 + Math.sin(pulseProgress * Math.PI) * 0.15;
    this.hudElement.style.transform = `translate(-50%, -50%) scale(${scale})`;
    this.hudElement.style.textShadow = `0 0 20px ${color}, 0 0 45px rgba(0, 0, 0, 0.95)`;
  }
}
