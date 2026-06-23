import * as THREE from 'three';

export function initInput() {
    // Map e.code → canonical name so we never get collisions like "KeyS" → "keys"
    const CODE_MAP = {
      'KeyW': 'w', 'KeyA': 'a', 'KeyS': 's', 'KeyD': 'd',
      'ArrowUp': 'arrowup', 'ArrowDown': 'arrowdown',
      'ArrowLeft': 'arrowleft', 'ArrowRight': 'arrowright',
      'Space': ' ',
      'ShiftLeft': 'shift', 'ShiftRight': 'shift',
      'KeyN': 'n', 'KeyF': 'f',
      'KeyC': 'c', 'KeyV': 'v', 'KeyM': 'm', 'KeyB': 'b', 'KeyP': 'p',
    };

    window.addEventListener('keydown', (e) => {
      // Always store the character key (e.g. 'w', 'a', ' ')
      if (e.key) this.keys[e.key.toLowerCase()] = true;
      // Also store via safe code map (never ambiguous)
      const mapped = CODE_MAP[e.code];
      if (mapped) this.keys[mapped] = true;

      if (this.inMainMenu) return;

      const key = e.key ? e.key.toLowerCase() : '';
      if (key === 'c') this.cycleCameraMode();
      if (key === 'v' || key === 'p') this.cycleCameraFocus();
      if (key === 'm') {
        if (this.debugMenuEnabled && this.racePanelEl) {
          const isHidden = this.racePanelEl.style.display === 'none';
          this.racePanelEl.style.display = isHidden ? 'flex' : 'none';
        }
      }
    });
    
    window.addEventListener('keyup', (e) => {
      if (e.key) this.keys[e.key.toLowerCase()] = false;
      const mapped = CODE_MAP[e.code];
      if (mapped) this.keys[mapped] = false;
    });

    // Clear all keys when window loses focus to prevent them getting stuck forever
    window.addEventListener('blur', () => {
      for (let k in this.keys) {
        this.keys[k] = false;
      }
    });
  }

export function initDebugVisuals() {
    this.debugFocusAI = null;
    
    // Cyan line for the path
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      linewidth: 3,
      depthWrite: false,
      depthTest: false
    });
    const lineGeo = new THREE.BufferGeometry();
    this.debugPathLine = new THREE.Line(lineGeo, lineMat);
    this.debugPathLine.visible = false;
    this.debugPathLine.frustumCulled = false; // Prevents disappearing due to outdated bounding volumes
    this.scene.add(this.debugPathLine);
    
    // Yellow box marker for lookahead point
    const markerGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const markerMat = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      depthWrite: false
    });
    this.debugLookaheadMarker = new THREE.Mesh(markerGeo, markerMat);
    this.debugLookaheadMarker.visible = false;
    this.debugLookaheadMarker.frustumCulled = false;
    this.scene.add(this.debugLookaheadMarker);
  }

