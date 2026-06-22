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
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  // Base transparent
  ctx.clearRect(0, 0, 64, 64);
  
  // Draw realistic soft tire tracks with double-shoulder profile
  const grad = ctx.createLinearGradient(0, 0, 64, 0);
  grad.addColorStop(0, 'rgba(10, 10, 12, 0.0)');
  grad.addColorStop(0.18, 'rgba(10, 10, 12, 0.85)'); // Left shoulder
  grad.addColorStop(0.35, 'rgba(10, 10, 12, 0.50)'); // Center groove
  grad.addColorStop(0.52, 'rgba(10, 10, 12, 0.85)'); // Right shoulder
  grad.addColorStop(0.82, 'rgba(10, 10, 12, 0.0)');
  
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  
  // Add some realistic noise texture (rubber residue on asphalt)
  const imgData = ctx.getImageData(0, 0, 64, 64);
  for (let i = 0; i < imgData.data.length; i += 4) {
    if (imgData.data[i + 3] > 0) {
      // Add fine grain noise to the opacity channel
      const noise = (Math.random() - 0.5) * 55;
      imgData.data[i + 3] = Math.max(0, Math.min(255, imgData.data[i + 3] + noise));
    }
  }
  ctx.putImageData(imgData, 0, 0);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  return texture;
}
