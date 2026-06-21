import * as THREE from 'three';

export function createStreetlightFlareTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128; // Higher resolution for smooth gradient and streak definition
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  
  // Radial corona glow (pure white, so material color tinting works perfectly)
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');      // Hot core
  grad.addColorStop(0.08, 'rgba(255, 255, 255, 0.85)');   // Hot core boundary
  grad.addColorStop(0.22, 'rgba(255, 255, 255, 0.35)');   // Soft spreading glow
  grad.addColorStop(0.55, 'rgba(255, 255, 255, 0.08)');   // Very soft outer halo
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  
  // Add a cinematic horizontal lens streak (anamorphic glare look)
  const streakGrad = ctx.createLinearGradient(0, 64, 128, 64);
  streakGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  streakGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)'); // Bright center
  streakGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = streakGrad;
  ctx.fillRect(0, 62, 128, 4); // Thin horizontal line crossing the light center
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createGroundLightPoolTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 120);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');      // Soft center core
  grad.addColorStop(0.15, 'rgba(255, 255, 255, 0.45)');  // Soft inner glow
  grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.15)');   // Soft spreading light
  grad.addColorStop(0.8, 'rgba(255, 255, 255, 0.02)');   // Fading ambient glow
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');               // Fade out
  
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createConcreteTextures() {
  const canvasColor = document.createElement('canvas');
  canvasColor.width = 512;
  canvasColor.height = 512;
  const ctxColor = canvasColor.getContext('2d');
  
  const canvasRough = document.createElement('canvas');
  canvasRough.width = 512;
  canvasRough.height = 512;
  const ctxRough = canvasRough.getContext('2d');

  // Fill base concrete color
  ctxColor.fillStyle = '#838087';
  ctxColor.fillRect(0, 0, 512, 512);

  // Fill base roughness
  ctxRough.fillStyle = '#b0b0b0'; // Roughness ~ 0.7
  ctxRough.fillRect(0, 0, 512, 512);

  const imgColor = ctxColor.getImageData(0, 0, 512, 512);
  const dataColor = imgColor.data;
  const imgRough = ctxRough.getImageData(0, 0, 512, 512);
  const dataRough = imgRough.data;

  // Add noise, concrete grain (continuous texture with no grid lines)
  for (let y = 0; y < 512; y++) {
    for (let x = 0; x < 512; x++) {
      const i = (y * 512 + x) * 4;
      const noise = (Math.random() - 0.5) * 12; // Muted noise for a cleaner look
      
      dataColor[i] = Math.max(0, Math.min(255, dataColor[i] + noise));
      dataColor[i+1] = Math.max(0, Math.min(255, dataColor[i+1] + noise));
      dataColor[i+2] = Math.max(0, Math.min(255, dataColor[i+2] + noise));
      
      const bump = 128 + (Math.random() - 0.5) * 22; // Subtle bump mapping for grain structure
      dataRough[i] = Math.max(0, Math.min(255, bump));
    }
  }

  ctxColor.putImageData(imgColor, 0, 0);
  ctxRough.putImageData(imgRough, 0, 0);

  const texColor = new THREE.CanvasTexture(canvasColor);
  texColor.wrapS = THREE.RepeatWrapping;
  texColor.wrapT = THREE.RepeatWrapping;

  const texRough = new THREE.CanvasTexture(canvasRough);
  texRough.wrapS = THREE.RepeatWrapping;
  texRough.wrapT = THREE.RepeatWrapping;

  return { map: texColor, roughnessMap: texRough };
}

export function createAsphaltTextures(hasPuddles = true) {
  // Canvas 1: Albedo Color Map
  const canvasColor = document.createElement('canvas');
  canvasColor.width = 1024;
  canvasColor.height = 1024;
  const ctxColor = canvasColor.getContext('2d');
  
  // Canvas 2: Roughness (Green channel) and Bump (Red/Blue channels) Map
  const canvasRough = document.createElement('canvas');
  canvasRough.width = 1024;
  canvasRough.height = 1024;
  const ctxRough = canvasRough.getContext('2d');

  // Fill base dry asphalt color and roughness
  ctxColor.fillStyle = '#222226';
  ctxColor.fillRect(0, 0, 1024, 1024);

  ctxRough.fillStyle = '#ebebeb'; // High roughness value (235/255 = 0.92)
  ctxRough.fillRect(0, 0, 1024, 1024);

  // Scratch canvas for Metaball calculation (rounded organic liquid pools)
  const scratchCanvas = document.createElement('canvas');
  scratchCanvas.width = 1024;
  scratchCanvas.height = 1024;
  const scratchCtx = scratchCanvas.getContext('2d');

  const localCircles = [];

  if (hasPuddles) {
    // Generate only 1 to 2 very large, highly organic, irregular puddles
    const numPuddles = 1 + Math.floor(Math.random() * 2);
    for (let p = 0; p < numPuddles; p++) {
      // Pick a starting point away from the edges
      const cx = 200 + Math.random() * 624;
      const cy = 200 + Math.random() * 624;
      
      // Let's do a random walk of overlapping circles to create an elongated, natural pool
      const numCircles = 6 + Math.floor(Math.random() * 8);
      let curX = cx;
      let curY = cy;
      let radius = 60 + Math.random() * 70; // Big radius (60 to 130px)
      
      for (let i = 0; i < numCircles; i++) {
        localCircles.push({ x: curX, y: curY, r: radius });

        // Draw soft radial gradient for metaball summation
        const grad = scratchCtx.createRadialGradient(curX, curY, 0, curX, curY, radius);
        grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        scratchCtx.fillStyle = grad;
        scratchCtx.beginPath();
        scratchCtx.arc(curX, curY, radius, 0, Math.PI * 2);
        scratchCtx.fill();
        
        // Move to next point along a semi-random walk direction to create elongated paths
        const angle = Math.random() * Math.PI * 2;
        const dist = radius * (0.35 + Math.random() * 0.45);
        curX += Math.cos(angle) * dist;
        curY += Math.sin(angle) * dist;
        
        // Clamp walk to stay on canvas
        curX = Math.max(100, Math.min(924, curX));
        curY = Math.max(100, Math.min(924, curY));
        
        // Slightly evolve the radius
        radius *= (0.75 + Math.random() * 0.4);
        radius = Math.max(35, Math.min(150, radius));
      }

      // 1-3 tiny satellite droplets around the main pool
      const numSats = 1 + Math.floor(Math.random() * 3);
      for (let s = 0; s < numSats; s++) {
        const satX = cx + (Math.random() - 0.5) * 350;
        const satY = cy + (Math.random() - 0.5) * 350;
        const satRadius = 15 + Math.random() * 25;
        if (satX > 50 && satX < 974 && satY > 50 && satY < 974) {
          localCircles.push({ x: satX, y: satY, r: satRadius });

          const grad = scratchCtx.createRadialGradient(satX, satY, 0, satX, satY, satRadius);
          grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          scratchCtx.fillStyle = grad;
          scratchCtx.beginPath();
          scratchCtx.arc(satX, satY, satRadius, 0, Math.PI * 2);
          scratchCtx.fill();
        }
      }
    }
  }

  // Read back the soft metaballs and threshold them with high-frequency domain warping
  const scratchImg = scratchCtx.getImageData(0, 0, 1024, 1024);
  const scratchData = scratchImg.data;

  const imgColor = ctxColor.getImageData(0, 0, 1024, 1024);
  const dataColor = imgColor.data;

  const imgRough = ctxRough.getImageData(0, 0, 1024, 1024);
  const dataRough = imgRough.data;

  for (let y = 0; y < 1024; y++) {
    for (let x = 0; x < 1024; x++) {
      const i = (y * 1024 + x) * 4;
      
      // Domain warping: perturb the lookup coordinates using multiple sine waves
      // This distorts the perfect circle/ellipse boundaries into highly natural eroded edges
      const warpX = x + Math.sin(y * 0.04) * 25 + Math.cos(x * 0.09) * 10 + Math.sin((x + y) * 0.015) * 12;
      const warpY = y + Math.cos(x * 0.04) * 25 + Math.sin(y * 0.09) * 10 + Math.cos((x - y) * 0.015) * 12;
      
      const px = Math.max(0, Math.min(1023, Math.round(warpX)));
      const py = Math.max(0, Math.min(1023, Math.round(warpY)));
      const srcIdx = (py * 1024 + px) * 4;
      
      const alpha = scratchData[srcIdx + 3];
      // Threshold: > 120 means inside the organic wet puddle
      if (hasPuddles && alpha > 120) {
        // Wet puddle dark color (#101012)
        dataColor[i] = 16;
        dataColor[i+1] = 16;
        dataColor[i+2] = 18;

        // Wet roughness (very glossy mirror reflection: 10/255 = 0.04) (Green channel)
        dataRough[i+1] = 10;

        // Specular/Reflection Boosting (metalness = 45/255 = 0.18) (Blue channel)
        dataRough[i+2] = 45;

        // Procedural wind ripples for bump mapping (Red channel)
        const ripple = Math.sin(x * 0.3) * 15 + Math.cos(y * 0.35) * 15 + Math.sin((x + y) * 0.15) * 12 + Math.cos((x - y) * 0.5) * 6;
        dataRough[i] = Math.max(0, Math.min(255, Math.round(128 + ripple)));
      } else {
        // Dry asphalt: add coarse grain noise and bump details
        const colorGrain = (Math.random() - 0.5) * 10;
        dataColor[i] = Math.max(0, Math.min(255, dataColor[i] + colorGrain));
        dataColor[i+1] = Math.max(0, Math.min(255, dataColor[i+1] + colorGrain));
        dataColor[i+2] = Math.max(0, Math.min(255, dataColor[i+2] + colorGrain));

        // Dry roughness: 235/255 = 0.92 (Green channel)
        dataRough[i+1] = 235;

        // Dry metalness: 0 (Blue channel)
        dataRough[i+2] = 0;

        // Dry bump height (Red channel)
        const bumpGrain = (Math.random() - 0.5) * 60;
        dataRough[i] = Math.max(0, Math.min(255, 128 + bumpGrain));
      }
    }
  }

  ctxColor.putImageData(imgColor, 0, 0);
  ctxRough.putImageData(imgRough, 0, 0);

  const texColor = new THREE.CanvasTexture(canvasColor);
  texColor.wrapS = THREE.RepeatWrapping;
  texColor.wrapT = THREE.RepeatWrapping;
  texColor.repeat.set(1, 1); // No tiling repetition within the road segment

  const texRough = new THREE.CanvasTexture(canvasRough);
  texRough.wrapS = THREE.RepeatWrapping;
  texRough.wrapT = THREE.RepeatWrapping;
  texRough.repeat.set(1, 1);

  return { map: texColor, roughnessMap: texRough, localCircles: hasPuddles ? localCircles : null };
}

export function createWindowTextures() {
  const canvasColor = document.createElement('canvas');
  canvasColor.width = 512;
  canvasColor.height = 512;
  const ctxColor = canvasColor.getContext('2d');

  const canvasEmissive = document.createElement('canvas');
  canvasEmissive.width = 512;
  canvasEmissive.height = 512;
  const ctxEmissive = canvasEmissive.getContext('2d');

  const cellSize = 64;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const x = c * cellSize;
      const y = r * cellSize;

      // Dark chunky frame (voxel style)
      ctxColor.fillStyle = '#181822';
      ctxColor.fillRect(x, y, cellSize, cellSize);
      ctxEmissive.fillStyle = '#000000';
      ctxEmissive.fillRect(x, y, cellSize, cellSize);

      // Glass area inset by 6px
      const border = 6;
      const gx = x + border;
      const gy = y + border;
      const gw = cellSize - border * 2;
      const gh = cellSize - border * 2;

      const rand = Math.random();
      let glassColor = '#0b0c10';
      let emColor = '#000000';
      let isLit = false;

      if (rand < 0.35) {
        // Dark window
        glassColor = '#0a0b0e';
        emColor = '#000000';
      } else if (rand < 0.80) {
        // Warm golden voxel lights (amber/yellow)
        const hue = 34 + Math.floor(Math.random() * 8);
        glassColor = `hsl(${hue}, 85%, 55%)`;
        emColor = `hsl(${hue}, 85%, 50%)`;
        isLit = true;
      } else {
        // Cool white/cyan office voxel lights
        const hue = 195 + Math.floor(Math.random() * 10);
        glassColor = `hsl(${hue}, 40%, 65%)`;
        emColor = `hsl(${hue}, 40%, 60%)`;
        isLit = true;
      }

      ctxColor.fillStyle = glassColor;
      ctxColor.fillRect(gx, gy, gw, gh);

      if (isLit) {
        ctxEmissive.fillStyle = emColor;
        ctxEmissive.fillRect(gx, gy, gw, gh);
      }

      // Voxel cross dividers (chunky dark separators, e.g. 6px wide)
      const dividerW = 6;
      ctxColor.fillStyle = '#181822';
      ctxEmissive.fillStyle = '#000000';

      // Horizontal separator
      ctxColor.fillRect(gx, gy + gh / 2 - dividerW / 2, gw, dividerW);
      ctxEmissive.fillRect(gx, gy + gh / 2 - dividerW / 2, gw, dividerW);

      // Vertical separator
      ctxColor.fillRect(gx + gw / 2 - dividerW / 2, gy, dividerW, gh);
      ctxEmissive.fillRect(gx + gw / 2 - dividerW / 2, gy, dividerW, gh);
    }
  }

  const texColor = new THREE.CanvasTexture(canvasColor);
  texColor.minFilter = THREE.NearestFilter;
  texColor.magFilter = THREE.NearestFilter; // Sharp pixelated edges for voxel art style!

  const texEmissive = new THREE.CanvasTexture(canvasEmissive);
  texEmissive.minFilter = THREE.NearestFilter;
  texEmissive.magFilter = THREE.NearestFilter;

  return { map: texColor, emissiveMap: texEmissive };
}

export function createCityEnvMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Fill sky (top half) with a dark night gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 256);
  skyGrad.addColorStop(0, '#0a0a14');
  skyGrad.addColorStop(0.5, '#0f0f22');
  skyGrad.addColorStop(1, '#1a1a2e');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 1024, 256);

  // Fill ground (bottom half)
  ctx.fillStyle = '#0d0d12';
  ctx.fillRect(0, 256, 1024, 256);

  // Draw procedural building silhouettes along the horizon (around y=256)
  const numBuildings = 30;
  const w = 1024 / numBuildings;
  for (let i = 0; i < numBuildings; i++) {
    // Height of building: 60 to 200 pixels
    const bh = 60 + Math.random() * 140;
    const bx = i * w;
    const bw = w * (0.75 + Math.random() * 0.4);
    const by = 256 - bh;

    // Draw building silhouette (dark charcoal/slate)
    ctx.fillStyle = '#14141e';
    ctx.fillRect(bx, by, bw, bh);

    // Draw outline or roof accent line
    ctx.strokeStyle = '#222230';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(bx, by, bw, bh);

    // Draw random antennas
    if (Math.random() > 0.5) {
      ctx.beginPath();
      ctx.moveTo(bx + bw / 2, by);
      ctx.lineTo(bx + bw / 2, by - 15 - Math.random() * 20);
      ctx.stroke();
      
      // Red blinking light at the top of the antenna
      ctx.fillStyle = '#ff3333';
      ctx.beginPath();
      ctx.arc(bx + bw / 2, by - 15, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Windows grids
    const cols = 2 + Math.floor(Math.random() * 3);
    const rows = 5 + Math.floor(Math.random() * 6);
    const winW = bw / (cols * 2.5);
    const winH = bh / (rows * 2.5);
    const startX = bx + (bw - (cols * 2 - 1) * winW) / 2;
    const startY = by + (bh - (rows * 2 - 1) * winH) / 2;

    // Window colors: mix of warm gold and cool cyan neon windows
    const colVal = Math.random();
    const winColor = colVal < 0.5 ? '#ffb300' : (colVal < 0.95 ? '#00e5ff' : '#ffffff');

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Randomly turn on/off windows (60% active)
        if (Math.random() > 0.4) {
          ctx.fillStyle = winColor;
          const wx = startX + c * 2 * winW;
          const wy = startY + r * 2 * winH;
          ctx.fillRect(wx, wy, winW, winH);
        }
      }
    }

    // Neon billboards
    if (Math.random() > 0.7) {
      const neonColor = ['#ff0077', '#39ff14', '#00e5ff', '#ffb300'][Math.floor(Math.random() * 4)];
      const nbw = bw * 0.65;
      const nbh = bh * 0.18;
      const nbx = bx + (bw - nbw) / 2;
      const nby = by + bh * 0.15;
      
      // Outer glow
      ctx.shadowColor = neonColor;
      ctx.shadowBlur = 10;
      ctx.fillStyle = neonColor;
      ctx.fillRect(nbx, nby, nbw, nbh);
      ctx.shadowBlur = 0; // reset
      
      // Inside text or pattern
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(nbx + 3, nby + 3, nbw - 6, nbh - 6);
      ctx.fillStyle = '#111116';
      ctx.fillRect(nbx + 4, nby + 4, nbw - 8, nbh - 8);
    }
  }

  // Draw stars/sky highlights
  for (let s = 0; s < 60; s++) {
    const sx = Math.random() * 1024;
    const sy = Math.random() * 220;
    const r = Math.random();
    ctx.fillStyle = r > 0.7 ? '#ffd4b2' : (r > 0.4 ? '#c8e3ff' : '#ffffff');
    ctx.beginPath();
    ctx.arc(sx, sy, 0.5 + Math.random() * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
