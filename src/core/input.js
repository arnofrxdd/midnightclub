import * as THREE from 'three';

export function initInput() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
      if (e.key === 'p' || e.key === 'P') {
        this.cycleCameraFocus();
      }
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
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

