import * as THREE from 'three';

export function createLensflareTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
  grad.addColorStop(0, 'rgba(255, 250, 220, 1)');      // Center hot spot
  grad.addColorStop(0.15, 'rgba(255, 180, 50, 0.8)');  // Inner warm glow
  grad.addColorStop(0.4, 'rgba(255, 100, 20, 0.2)');   // Outer flare ring
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  
  // Add horizontal flare streaks (anamorphic look)
  ctx.strokeStyle = 'rgba(255, 200, 150, 0.45)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, 32);
  ctx.lineTo(64, 32);
  ctx.stroke();
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createSkidmarkTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  
  // Base transparent
  ctx.clearRect(0, 0, 32, 32);
  
  // Draw a blocky voxel tire tread print
  ctx.fillStyle = '#0a0a0f';
  
  // Alternate blocky treads for a distinct pixelated/voxel style print
  for (let y = 0; y < 32; y += 4) {
    // Left tread
    ctx.fillRect(2, y, 8, 2);
    // Right tread
    ctx.fillRect(22, y, 8, 2);
    // Center double rib
    ctx.fillRect(13, y + 2, 6, 2);
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 4); // Repeat texture along the segment
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter; // Sharp pixelated edges
  return texture;
}
