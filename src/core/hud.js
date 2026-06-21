import * as THREE from 'three';

export function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  }

export function showBanner(title, subtitle, duration = 2000) {
    const banner = document.getElementById('race-banner');
    const titleEl = document.getElementById('banner-title');
    const subEl = document.getElementById('banner-subtitle');

    titleEl.textContent = title;
    subEl.textContent = subtitle;

    banner.classList.add('show');
    
    // Autoclose banner
    if (this.bannerTimeout) clearTimeout(this.bannerTimeout);
    this.bannerTimeout = setTimeout(() => {
      banner.classList.remove('show');
    }, duration);
  }

export function showNitroNotification(text) {
    if (!this.nitroNotifEl) return;
    this.nitroNotifEl.textContent = text;
    this.nitroNotifEl.style.opacity = '1';
    this.nitroNotifEl.style.transform = 'translateX(-50%) translateY(0)';
    
    if (this.nitroNotifTimeout) clearTimeout(this.nitroNotifTimeout);
    this.nitroNotifTimeout = setTimeout(() => {
      this.nitroNotifEl.style.opacity = '0';
      this.nitroNotifEl.style.transform = 'translateX(-50%) translateY(-15px)';
    }, 1200);
  }

export function showStuntNotification(title, scoreText) {
    if (!this.stuntNotifEl) return;
    this.stuntTitleEl.textContent = title;
    this.stuntScoreEl.textContent = scoreText;
    
    // Animate display container with a scale-up pop
    this.stuntNotifEl.style.opacity = '1';
    this.stuntNotifEl.style.transform = 'translate(-50%, -50%) scale(1.1)';
    
    if (this.stuntNotifTimeout) clearTimeout(this.stuntNotifTimeout);
    this.stuntNotifTimeout = setTimeout(() => {
      this.stuntNotifEl.style.opacity = '0';
      this.stuntNotifEl.style.transform = 'translate(-50%, -50%) scale(0.8)';
    }, 2000);
  }

export function updateMinimap() {
    const ctx = this.minimapCtx;
    const w = this.minimapCanvas.width;
    const h = this.minimapCanvas.height;
    
    ctx.clearRect(0, 0, w, h);
    
    // Draw solid dark radar background
    ctx.fillStyle = '#0a0b0e';
    ctx.fillRect(0, 0, w, h);
    
    // Draw thin grid border
    ctx.strokeStyle = '#1f222b';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(1, 1, w - 2, h - 2);
    
    // Draw modern sport corner brackets
    ctx.strokeStyle = '#ffc600';
    ctx.lineWidth = 2.5;
    const bLen = 10;
    
    // Top-Left
    ctx.beginPath(); ctx.moveTo(1, bLen); ctx.lineTo(1, 1); ctx.lineTo(bLen, 1); ctx.stroke();
    // Top-Right
    ctx.beginPath(); ctx.moveTo(w - 1, bLen); ctx.lineTo(w - 1, 1); ctx.lineTo(w - 1 - bLen, 1); ctx.stroke();
    // Bottom-Left
    ctx.beginPath(); ctx.moveTo(1, h - 1 - bLen); ctx.lineTo(1, h - 1); ctx.lineTo(bLen, h - 1); ctx.stroke();
    // Bottom-Right
    ctx.beginPath(); ctx.moveTo(w - 1, h - 1 - bLen); ctx.lineTo(w - 1, h - 1); ctx.lineTo(w - 1 - bLen, h - 1); ctx.stroke();
    
    const scale = 0.35;
    
    let targetObj = this.physics;
    if (this.debugFocusAI && this.race && this.race.aiRacers) {
      const activeAI = this.race.aiRacers.find(ai => ai.id === this.debugFocusAI);
      if (activeAI) targetObj = activeAI;
    }
    const px = targetObj.position.x;
    const pz = targetObj.position.z;
    const heading = targetObj.heading;
    
    ctx.save();
    ctx.translate(w/2, h/2);
    ctx.rotate(heading + Math.PI);
    
    // Draw roads on map
    ctx.fillStyle = '#222530';
    const ts = this.world.tileSize;
    const pTileX = Math.round(px / ts);
    const pTileZ = Math.round(pz / ts);
    const mapRadius = 7;
    
    for (let x = pTileX - mapRadius; x <= pTileX + mapRadius; x++) {
      for (let z = pTileZ - mapRadius; z <= pTileZ + mapRadius; z++) {
        const isRoad = this.world.roadColumns.has(x) || this.world.roadRows.has(z);
        if (isRoad) {
          const rx = (x * ts) - px;
          const rz = (z * ts) - pz;
          ctx.fillRect(rx * scale - (ts * scale)/2, rz * scale - (ts * scale)/2, ts * scale, ts * scale);
        }
      }
    }

    // Draw active checkpoints on minimap
    if (this.race.active) {
      this.race.checkpoints.forEach((cp, index) => {
        let isVisible = false;
        let isCurrent = false;
        if (this.race.mode === 'unordered') {
          isVisible = !this.race.unorderedCleared.has(index);
          isCurrent = isVisible;
        } else {
          isVisible = (index >= this.race.currentIndex);
          isCurrent = (index === this.race.currentIndex);
        }

        if (isVisible) {
          const rx = cp.x - px;
          const rz = cp.z - pz;
          const isFinish = (index === this.race.checkpoints.length - 1);
          
          ctx.save();
          if (isCurrent) {
            // Pulsing Neon Green for active target
            const pulse = 1.0 + Math.sin(Date.now() / 150) * 0.15;
            ctx.fillStyle = '#39ff14';
            ctx.beginPath();
            ctx.arc(rx * scale, rz * scale, 5.5 * pulse, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(rx * scale, rz * scale, 9 * pulse, 0, Math.PI * 2);
            ctx.stroke();
          } else if (isFinish) {
            // Checkered/Double Red for finish line
            ctx.fillStyle = '#ff3b30';
            ctx.beginPath();
            ctx.arc(rx * scale, rz * scale, 6, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(rx * scale, rz * scale, 9, 0, Math.PI * 2);
            ctx.stroke();
          } else {
            // Next up: Soft Orange
            ctx.fillStyle = '#ff9900';
            ctx.beginPath();
            ctx.arc(rx * scale, rz * scale, 4, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      });
    }
    
    // Draw AI cars on minimap
    if (this.race.active) {
      this.race.aiRacers.forEach(ai => {
        const rx = ai.position.x - px;
        const rz = ai.position.z - pz;
        ctx.fillStyle = '#' + ai.colorHex.toString(16).padStart(6, '0');
        ctx.beginPath();
        ctx.arc(rx * scale, rz * scale, 5.0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    }

    // Draw Cops on minimap (Dynamic flashing red/blue blips)
    if (this.pursuit && this.pursuit.active && this.pursuit.cops) {
      this.pursuit.cops.forEach(cop => {
        const rx = cop.position.x - px;
        const rz = cop.position.z - pz;
        
        const isRed = (Math.floor(Date.now() / 150) % 2 === 0);
        ctx.fillStyle = isRed ? '#ff3b30' : '#0066ff';
        ctx.beginPath();
        ctx.arc(rx * scale, rz * scale, 5.0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    }

    // Draw traffic cars on minimap ONLY if debug traffic flag is active
    if (this.debugShowTrafficOnMinimap && this.traffic && this.traffic.vehicles) {
      this.traffic.vehicles.forEach(v => {
        const rx = v.position.x - px;
        const rz = v.position.z - pz;
        ctx.fillStyle = '#6c7182';
        ctx.beginPath();
        ctx.arc(rx * scale, rz * scale, 3.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw parked vehicles on minimap (smaller and darker grey)
      if (this.traffic.parkedVehicles) {
        this.traffic.parkedVehicles.forEach(v => {
          const rx = v.position.x - px;
          const rz = v.position.z - pz;
          ctx.fillStyle = '#444855';
          ctx.beginPath();
          ctx.arc(rx * scale, rz * scale, 2.4, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    }

    // Draw focused AI path on minimap
    if (this.debugFocusAI && this.race && this.race.aiRacers) {
      const activeAI = this.race.aiRacers.find(ai => ai.id === this.debugFocusAI);
      if (activeAI && activeAI._currentPath && activeAI._currentPath.length > 0) {
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        
        const startRx = activeAI.position.x - px;
        const startRz = activeAI.position.z - pz;
        ctx.moveTo(startRx * scale, startRz * scale);
        
        for (let i = activeAI._pathWptIdx; i < activeAI._currentPath.length; i++) {
          const wpt = activeAI._currentPath[i];
          const rx = wpt.x - px;
          const rz = wpt.z - pz;
          ctx.lineTo(rx * scale, rz * scale);
        }
        ctx.stroke();

        // Draw lookahead point on minimap as a small yellow dot
        if (activeAI.debugLookahead) {
          const lx = activeAI.debugLookahead.x - px;
          const lz = activeAI.debugLookahead.z - pz;
          ctx.fillStyle = '#ffff00';
          ctx.beginPath();
          ctx.arc(lx * scale, lz * scale, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    
    ctx.restore();
    
    // Draw target arrow
    ctx.fillStyle = targetObj === this.physics ? '#ffc600' : '#' + (targetObj.colorHex ? targetObj.colorHex.toString(16).padStart(6, '0') : '00f0ff');
    ctx.beginPath();
    ctx.moveTo(w/2, h/2 - 9);
    ctx.lineTo(w/2 - 6, h/2 + 7);
    ctx.lineTo(w/2 + 6, h/2 + 7);
    ctx.closePath();
    ctx.fill();
  }

export function initRaceHUD() {
    this.hudStatsEl = document.getElementById('stats-hud');
    this.statsModeEl = document.getElementById('stats-mode');
    this.statsProgressEl = document.getElementById('stats-progress');
    this.statsProgressLabelEl = document.getElementById('stats-progress-label');
    this.statsTimerEl = document.getElementById('stats-timer');
    this.cancelBtnEl = document.getElementById('btn-cancel');
    
    this.racePanelEl = document.querySelector('.race-panel');
    
    // Register buttons
    document.getElementById('btn-sprint').onclick = () => this.startRace('sprint');
    document.getElementById('btn-circuit').onclick = () => this.startRace('circuit');
    document.getElementById('btn-unordered').onclick = () => this.startRace('unordered');
    document.getElementById('btn-autocross').onclick = () => this.startRace('autocross');
    
    this.cancelBtnEl.onclick = () => this.cancelRace();

    // Visual checkpoint container
    this.checkpointVisualsGroup = new THREE.Group();
    this.scene.add(this.checkpointVisualsGroup);
  }

