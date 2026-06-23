import * as THREE from 'three';

export function checkSlipstream(dt = 0.016) {
    const playerPos = this.physics.position;
    const playerHeading = this.physics.heading;
    const playerForward = new THREE.Vector3(Math.sin(playerHeading), 0, Math.cos(playerHeading));
    
    let inDraft = false;
    let targetVeh = null;
    
    const allVehs = [];
    if (this.traffic && this.traffic.vehicles) allVehs.push(...this.traffic.vehicles);
    if (this.race.active && this.race.aiRacers) allVehs.push(...this.race.aiRacers);
    if (this.pursuit && this.pursuit.active && this.pursuit.cops) allVehs.push(...this.pursuit.cops);
    
    for (const v of allVehs) {
      if (v.opacity !== undefined && v.opacity < 0.5) continue;
      
      const toVeh = v.position.clone().sub(playerPos);
      toVeh.y = 0; // Ignore height differences for slipstream detection
      const dist = toVeh.length();
      
      if (dist > 4.5 && dist < 40.0) { 
        // Strict lateral distance check (must be right behind them, within 2.5 meters sideways)
        const playerRight = new THREE.Vector3(Math.cos(playerHeading), 0, -Math.sin(playerHeading));
        const lateralDist = Math.abs(toVeh.dot(playerRight));
        
        if (lateralDist < 2.5) {
          toVeh.normalize();
          const dot = toVeh.dot(playerForward);
          if (dot > 0.7) { // Target is in front of us
            const vForward = new THREE.Vector3(Math.sin(v.heading), 0, Math.cos(v.heading));
            if (vForward.dot(playerForward) > 0.5) { // Same general direction
              inDraft = true;
              targetVeh = v;
              break;
            }
          }
        }
      }
    }
    
    this.physics.inSlipstream = inDraft;
    
    if (inDraft) {
      if (this.draftNitroGained === undefined) this.draftNitroGained = 0;
      this.draftNitroGained += 0.08 * dt;
      this.physics.nitroLevel = Math.min(this.physics.maxNitro, this.physics.nitroLevel + 0.08 * dt); // NFS slipstream charge
      
      const pctGained = Math.round(this.draftNitroGained * 100);
      this.showNotification('draft_active', `DRAFTING +${pctGained}%`, 0);

      if (Math.random() < 0.35) {
        const startOffset = new THREE.Vector3((Math.random() - 0.5) * 1.5, 0.4 + Math.random() * 0.4, 1.8).applyMatrix4(this.carVisualContainer.matrixWorld);
        const windDir = playerForward.clone().negate();
        this.spawnParticles(startOffset, windDir, 0xffffff, 1);
      }
    } else {
      if (this.draftNitroGained !== undefined && this.draftNitroGained > 0.03) {
        const pctGained = Math.round(this.draftNitroGained * 100);
        this.removeNotification('draft_active');
        this.showNotification('draft_done', `DRAFT! +${pctGained}%`, 1500, true);
      } else {
        this.removeNotification('draft_active');
      }
      this.draftNitroGained = 0;
    }
  }

export function checkNearMisses(dt) {
    if (!this.nearMissCooldowns) this.nearMissCooldowns = new Map();

    // Decrement cooldowns
    for (const [id, time] of this.nearMissCooldowns.entries()) {
      if (time <= dt) {
        this.nearMissCooldowns.delete(id);
      } else {
        this.nearMissCooldowns.set(id, time - dt);
      }
    }

    const playerSpeed = this.physics.velocity.length();
    if (playerSpeed < 15.0) return; // Only at high speeds (33+ mph)

    const playerPos = this.physics.position;

    // Collect all other vehicles
    const targets = [];
    if (this.traffic && this.traffic.vehicles) {
      this.traffic.vehicles.forEach(v => {
        targets.push({ id: `traffic_${v.id}`, position: v.position, opacity: v.opacity });
      });
    }
    if (this.race.active && this.race.aiRacers) {
      this.race.aiRacers.forEach(ai => {
        targets.push({ id: `ai_${ai.id}`, position: ai.position, opacity: 1.0 });
      });
    }
    if (this.pursuit && this.pursuit.active && this.pursuit.cops) {
      this.pursuit.cops.forEach(cop => {
        if (cop.active) {
          targets.push({ id: `cop_${cop.id}`, position: cop.position, opacity: 1.0 });
        }
      });
    }

    for (const target of targets) {
      if (target.opacity !== undefined && target.opacity < 0.5) continue;
      
      const dist = playerPos.distanceTo(target.position);
      // Near miss radius: between 2.2m (car radius sum) and 5.0m
      if (dist > 2.2 && dist < 5.0) {
        if (!this.nearMissCooldowns.has(target.id)) {
          // Award Nitro!
          this.physics.nitroLevel = Math.min(this.physics.maxNitro, this.physics.nitroLevel + 0.15); // +15%
          this.nearMissCooldowns.set(target.id, 3.0); // 3 seconds cooldown for this vehicle

          // Show floating notification
          this.showNotification('nearmiss_done', "NEAR MISS! +15%", 1500, true);
        }
      }
    }
  }

export function updateDriftNitro(dt) {
    if (this.prevIsDrifting === undefined) this.prevIsDrifting = false;
    if (this.driftNitroGained === undefined) this.driftNitroGained = 0;

    const isCurrentlyDrifting = this.physics.isDrifting;

    if (isCurrentlyDrifting) {
      // Accumulate nitro gained during drift
      const lateralSpeed = this.physics.velocity.dot(new THREE.Vector3(Math.cos(this.physics.heading), 0, -Math.sin(this.physics.heading)));
      const driftIntensity = Math.min(2.0, Math.abs(lateralSpeed) / 8.0);
      const gain = 0.075 * dt * driftIntensity;
      this.driftNitroGained += gain;
      
      const pctGained = Math.round(this.driftNitroGained * 100);
      this.showNotification('drift_active', `DRIFTING +${pctGained}%`, 0);
    } else {
      // Drift just ended!
      if (this.prevIsDrifting && this.driftNitroGained > 0.03) {
        const pctGained = Math.round(this.driftNitroGained * 100);
        this.removeNotification('drift_active');
        this.showNotification('drift_done', `DRIFT! +${pctGained}%`, 1500, true);
      } else {
        this.removeNotification('drift_active');
      }
      this.driftNitroGained = 0;
    }

    this.prevIsDrifting = isCurrentlyDrifting;
  }

export function updateAirNitro(dt) {
    if (this.prevIsAirborne === undefined) this.prevIsAirborne = false;
    if (this.airNitroGained === undefined) this.airNitroGained = 0;

    const isCurrentlyAirborne = this.physics.isAirborne && this.physics.airTime > 0.2;

    if (isCurrentlyAirborne) {
      // Accumulate nitro gained during airtime
      const gain = 0.12 * dt;
      this.airNitroGained += gain;
      this.physics.nitroLevel = Math.min(this.physics.maxNitro, this.physics.nitroLevel + gain);
      
      const pctGained = Math.round(this.airNitroGained * 100);
      this.showNotification('air_active', `AIRBORNE +${pctGained}%`, 0);
    } else {
      if (this.prevIsAirborne && this.airNitroGained > 0.03) {
        // Notification removal is handled here. Physics.js handles the "LANDED" popup!
        this.removeNotification('air_active');
      } else {
        this.removeNotification('air_active');
      }
      this.airNitroGained = 0;
    }

    this.prevIsAirborne = isCurrentlyAirborne;
}
