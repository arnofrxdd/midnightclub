import * as THREE from 'three';

export function getTrafficLightState(posX, posZ, time) {
  // Cycle period = 12 seconds
  const cycle = (time + (Math.abs(posX) + Math.abs(posZ)) * 0.05) % 12;
  if (cycle < 5.0) {
    return { xLight: 'green', zLight: 'red' };
  } else if (cycle < 6.0) {
    return { xLight: 'yellow', zLight: 'red' };
  } else if (cycle < 11.0) {
    return { xLight: 'red', zLight: 'green' };
  } else {
    return { xLight: 'red', zLight: 'yellow' };
  }
}

export function applySidewalkUVs(geometry) {
  const uvs = geometry.attributes.uv;
  const pos = geometry.attributes.position;
  for (let i = 0; i < uvs.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    uvs.setXY(i, x * 0.25, z * 0.25);
  }
  uvs.needsUpdate = true;
}

export function createDetailedWindowGeometry(w, h, d) {
  const geo = new THREE.BoxGeometry(w, h, d, Math.max(1, Math.round(w / 2)), 1, 1);
  // Pick a random cell in the 8x8 grid
  const cellX = Math.floor(Math.random() * 8);
  const cellY = Math.floor(Math.random() * 8);
  
  const uvs = geo.attributes.uv;
  for (let i = 0; i < uvs.count; i++) {
    const u = uvs.getX(i);
    const v = uvs.getY(i);
    
    // Map u and v to the sub-rectangle cell in 8x8 grid
    const newU = (cellX + u) / 8;
    const newV = (cellY + v) / 8;
    
    uvs.setXY(i, newU, newV);
  }
  uvs.needsUpdate = true;
  return geo;
}
