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
      const dist = toVeh.length();
      if (dist > 4.5 && dist < 28.0) {
        toVeh.normalize();
        const dot = toVeh.dot(playerForward);
        if (dot > 0.96) {
          const vForward = new THREE.Vector3(Math.sin(v.heading), 0, Math.cos(v.heading));
          if (vForward.dot(playerForward) > 0.8) {
            inDraft = true;
            targetVeh = v;
            break;
          }
        }
      }
    }
    
    this.physics.inSlipstream = inDraft;
    
    if (inDraft) {
      this.physics.nitroLevel = Math.min(this.physics.maxNitro, this.physics.nitroLevel + 0.08 * dt); // NFS slipstream charge
      if (this.driftStatusEl) {
        this.driftStatusEl.innerText = "DRAFTING";
        this.driftStatusEl.classList.add('active');
      }
      if (Math.random() < 0.35) {
        const startOffset = new THREE.Vector3((Math.random() - 0.5) * 1.5, 0.4 + Math.random() * 0.4, 1.8).applyMatrix4(this.carVisualContainer.matrixWorld);
        const windDir = playerForward.clone().negate();
        this.spawnParticles(startOffset, windDir, 0xffffff, 1);
      }
    } else {
      if (!this.physics.isDrifting && this.driftStatusEl) {
        this.driftStatusEl.classList.remove('active');
        this.driftStatusEl.innerText = "DRIFT";
      }
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
          this.showNitroNotification("NEAR MISS! +15%");
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
    } else {
      // Drift just ended!
      if (this.prevIsDrifting && this.driftNitroGained > 0.03) {
        const pctGained = Math.round(this.driftNitroGained * 100);
        this.showNitroNotification(`DRIFT! +${pctGained}%`);
      }
      this.driftNitroGained = 0;
    }

    this.prevIsDrifting = isCurrentlyDrifting;
  }
