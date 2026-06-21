import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

function getTrafficLightState(posX, posZ, time) {
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
function createStreetlightFlareTexture() {
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
function createGroundLightPoolTexture() {
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
function createConcreteTextures() {
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
function applySidewalkUVs(geometry) {
  const uvs = geometry.attributes.uv;
  const pos = geometry.attributes.position;
  for (let i = 0; i < uvs.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    uvs.setXY(i, x * 0.25, z * 0.25);
  }
  uvs.needsUpdate = true;
}
function createAsphaltTextures(hasPuddles = true) {
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

function createDetailedWindowGeometry(w, h, d) {
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

function createWindowTextures() {
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

function createCityEnvMap() {
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

export class World {
  constructor(scene) {
    this.scene = scene;
    this.tileSize = 40;

    // Generate variable road columns and rows (spacings of 3 to 7 tiles)
    // Use a random session seed to ensure the grid is unique on every game launch
    const seedOffset = Math.random() * 10000;
    this.mainRoadColumns = new Set();
    this.mainRoadRows = new Set();
    this.mainRoadColumns.add(0);
    this.mainRoadRows.add(0);

    let curr = 0;
    while (curr < 1000) {
      const seed = Math.sin((curr + seedOffset) * 1.5) * 43758.5453;
      const rand = seed - Math.floor(seed);
      curr += 3 + Math.floor(rand * 5); // Spacing of 3 to 7 tiles
      this.mainRoadColumns.add(curr);
    }
    curr = 0;
    while (curr > -1000) {
      const seed = Math.sin((curr - seedOffset) * 1.5) * 43758.5453;
      const rand = seed - Math.floor(seed);
      curr -= (3 + Math.floor(rand * 5));
      this.mainRoadColumns.add(curr);
    }

    curr = 0;
    while (curr < 1000) {
      const seed = Math.sin((curr + seedOffset) * 2.7) * 43758.5453;
      const rand = seed - Math.floor(seed);
      curr += 3 + Math.floor(rand * 5);
      this.mainRoadRows.add(curr);
    }
    curr = 0;
    while (curr > -1000) {
      const seed = Math.sin((curr - seedOffset) * 2.7) * 43758.5453;
      const rand = seed - Math.floor(seed);
      curr -= (3 + Math.floor(rand * 5));
      this.mainRoadRows.add(curr);
    }

    // Now generate shortcut columns (alleys) between main road columns
    this.shortcutColumns = new Set();
    this.shortcutRows = new Set();

    const sortedCols = Array.from(this.mainRoadColumns).sort((a, b) => a - b);
    for (let i = 0; i < sortedCols.length - 1; i++) {
      const c1 = sortedCols[i];
      const c2 = sortedCols[i+1];
      const diff = c2 - c1;
      if (diff >= 3) {
        const seed = Math.sin(c1 * 12.9898 + c2 * 78.233) * 43758.5453;
        const rand = seed - Math.floor(seed);
        if (rand < 0.2) { // 20% chance of a shortcut alley (more buildings, less alleys)
          const mid = c1 + Math.floor(diff / 2);
          this.shortcutColumns.add(mid);
        }
      }
    }

    const sortedRows = Array.from(this.mainRoadRows).sort((a, b) => a - b);
    for (let i = 0; i < sortedRows.length - 1; i++) {
      const r1 = sortedRows[i];
      const r2 = sortedRows[i+1];
      const diff = r2 - r1;
      if (diff >= 3) {
        const seed = Math.sin(r1 * 53.1374 + r2 * 21.9427) * 43758.5453;
        const rand = seed - Math.floor(seed);
        if (rand < 0.2) { // 20% chance of a shortcut alley (more buildings, less alleys)
          const mid = r1 + Math.floor(diff / 2);
          this.shortcutRows.add(mid);
        }
      }
    }

    // roadColumns and roadRows contains all drivable roads (main + shortcuts)
    this.roadColumns = new Set([...this.mainRoadColumns, ...this.shortcutColumns]);
    this.roadRows = new Set([...this.mainRoadRows, ...this.shortcutRows]);
    
    // Generate baked city environment reflections
    const envMap = createCityEnvMap();
    this.scene.environment = envMap;
    
    // Loaded chunks map: key "gridX,gridZ" -> THREE.Group
    this.loadedTiles = new Map();
    this.obstacles = []; // Collision bounding boxes (kept for compatibility)
    // Spatial hash grid for fast collision queries (cell size = 40 units = 1 tile)
    this.spatialCellSize = 40;
    this.obstacleGrid = new Map(); // "cx,cz" -> [obstacle, ...]
    this.renderRadius = 11; // 440m view distance — fog hides beyond this, no quality loss

    // Generate diverse road materials (4 with puddles, 4 completely dry)
    this.asphaltMaterials = [];
    this.asphaltLocalCircles = [];
    this.tilePuddles = new Map();

    for (let i = 0; i < 8; i++) {
      const hasPuddles = (i < 4);
      const textures = createAsphaltTextures(hasPuddles);
      this.asphaltMaterials.push(new THREE.MeshStandardMaterial({
        map: textures.map,
        roughness: 1.0,
        metalness: 1.0,
        roughnessMap: textures.roughnessMap,
        metalnessMap: textures.roughnessMap,
        bumpMap: textures.roughnessMap,
        bumpScale: 0.18,
        envMapIntensity: 0.55
      }));
      this.asphaltLocalCircles.push(textures.localCircles || []);
    }
    // Fallback/Template base asphalt material
    this.asphaltMat = this.asphaltMaterials[0];
    const concreteTextures = createConcreteTextures();
    this.concreteMat = new THREE.MeshStandardMaterial({
      map: concreteTextures.map,
      roughness: 0.75,
      metalness: 0.05,
      bumpMap: concreteTextures.roughnessMap,
      bumpScale: 0.08,
      envMapIntensity: 0.15
    });
    this.yellowLineMat = new THREE.MeshStandardMaterial({ color: 0xe5a93b, roughness: 0.6 });
    this.whiteLineMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.6 });
    this.streetlightPoleMat = new THREE.MeshStandardMaterial({ color: 0x22252c, metalness: 0.8, roughness: 0.5 });
    this.streetlightBulbMat = new THREE.MeshStandardMaterial({ color: 0xfff6dd, emissive: 0xffcc88, emissiveIntensity: 3.5 });
    
    // Baked ground light pool geometry and materials for far-distance visibility without active lights
    this.lightPoolGeo = new THREE.PlaneGeometry(64, 64); // Wider radius for better blending
    this.lightPoolGeo.rotateX(-Math.PI / 2);
    this.groundLightPoolTex = createGroundLightPoolTexture();
    this.ledGroundLightPoolMat = new THREE.MeshBasicMaterial({
      map: this.groundLightPoolTex,
      color: 0xaad4ff, // Cleaner, richer cool blue-white illumination tint
      transparent: true,
      opacity: 0.26, // Adjusted for new texture fade
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.sodiumGroundLightPoolMat = new THREE.MeshBasicMaterial({
      map: this.groundLightPoolTex,
      color: 0xffb85c, // Warm sodium golden amber illumination tint (more natural)
      transparent: true,
      opacity: 0.35, // Adjusted for new texture fade
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    // Storefront ground light pool geometry and material
    this.storefrontLightPoolGeo = new THREE.PlaneGeometry(24, 24);
    this.storefrontLightPoolGeo.rotateX(-Math.PI / 2);
    this.storefrontGroundLightPoolMat = new THREE.MeshBasicMaterial({
      map: this.groundLightPoolTex,
      color: 0xffecc4, // Warm glowing shop window light spill
      transparent: true,
      opacity: 0.30,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    // Alley ground light pool geometry
    this.alleyLightPoolGeo = new THREE.PlaneGeometry(32, 32);
    this.alleyLightPoolGeo.rotateX(-Math.PI / 2);

    this.brickMat = new THREE.MeshStandardMaterial({ color: 0x5a2f28, roughness: 0.8 }); // Gritty dark brick red
    this.buildingConcreteMat = new THREE.MeshStandardMaterial({ color: 0x70737a, roughness: 0.65 }); // Mid-gray concrete
    this.slateMat = new THREE.MeshStandardMaterial({ color: 0x31353f, roughness: 0.7 }); // Dark slate gray
    this.sandstoneMat = new THREE.MeshStandardMaterial({ color: 0xaa9882, roughness: 0.85 }); // Muted dusty sandstone beige
    this.glassySlateMat = new THREE.MeshStandardMaterial({ color: 0x1d2229, metalness: 0.75, roughness: 0.25 }); // Dark tinted glass
    this.darkConcreteMat = new THREE.MeshStandardMaterial({ color: 0x47494f, roughness: 0.7 }); // Dark charcoal concrete
    this.brickDarkMat = new THREE.MeshStandardMaterial({ color: 0x3d2b27, roughness: 0.85 }); // Soot-stained dark industrial brick
    this.materials = [this.brickMat, this.buildingConcreteMat, this.slateMat, this.sandstoneMat, this.glassySlateMat, this.darkConcreteMat, this.brickDarkMat];

    this.windowYellowMat = new THREE.MeshStandardMaterial({ color: 0xfffae6, emissive: 0xffcb66, emissiveIntensity: 4.2, roughness: 0.2 });
    this.windowBlueMat = new THREE.MeshStandardMaterial({ color: 0xe6f7ff, emissive: 0x3ac3ff, emissiveIntensity: 3.8, roughness: 0.2 });
    this.windowDarkMat = new THREE.MeshStandardMaterial({ color: 0x11131a, roughness: 0.1, metalness: 0.9 });
    
    const windowTextures = createWindowTextures();
    this.windowDetailedMat = new THREE.MeshStandardMaterial({
      map: windowTextures.map,
      roughness: 0.15,
      metalness: 0.2,
      emissive: 0xffffff,
      emissiveMap: windowTextures.emissiveMap,
      emissiveIntensity: 5.5
    });

    this.doorMat = new THREE.MeshStandardMaterial({ color: 0x3d281a, roughness: 0.6 });
    this.accessoryMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.5 });
    this.dumpsterMat = new THREE.MeshStandardMaterial({ color: 0x1f3c6d, roughness: 0.8, metalness: 0.2 });
    this.cardboardMat = new THREE.MeshStandardMaterial({ color: 0x9b7a5a, roughness: 0.9 });
    this.trashBagMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8 });
    this.woodPoleMat = new THREE.MeshStandardMaterial({ color: 0x4d3319, roughness: 0.9 });
    this.trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a3d28, roughness: 0.9 });
    this.leafMat = new THREE.MeshStandardMaterial({ color: 0x2e5c1e, roughness: 0.8 });
    this.leafCherryMat = new THREE.MeshStandardMaterial({ color: 0xe07297, roughness: 0.8 }); // Pink cherry blossom
    this.leafAutumnMat = new THREE.MeshStandardMaterial({ color: 0xd47525, roughness: 0.8 }); // Orange autumn maple
    
    this.billboardColors = [0xff0055, 0x00ff66, 0x00f0ff, 0xffaa00];

    // New breakable assets materials
    this.benchWoodMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.7 });
    this.benchIronMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8, roughness: 0.4 });
    this.phoneBoothFrameMat = new THREE.MeshStandardMaterial({ color: 0xcc2222, metalness: 0.6, roughness: 0.3 });
    this.phoneBoothGlassMat = new THREE.MeshStandardMaterial({ color: 0x99ddff, transparent: true, opacity: 0.4, metalness: 0.9, roughness: 0.1 });
    this.phoneBoothScreenMat = new THREE.MeshStandardMaterial({ color: 0x3ac3ff, emissive: 0x3ac3ff, emissiveIntensity: 3.0 });
    this.trashCanMat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.7, roughness: 0.4 });
    this.trashCanLidMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.6 });

    // Traffic light materials
    this.tlRedOnMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.tlRedOffMat = new THREE.MeshStandardMaterial({ color: 0x3a0000, roughness: 0.8 });
    
    this.tlYellowOnMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    this.tlYellowOffMat = new THREE.MeshStandardMaterial({ color: 0x3a2500, roughness: 0.8 });
    
    this.tlGreenOnMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.tlGreenOffMat = new THREE.MeshStandardMaterial({ color: 0x003a00, roughness: 0.8 });
    
    this.tlHousingMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });
    
    this.trafficLights = [];
    this.breakables = [];

    // Light source locations list
    this.lightSources = [];
    this.activeLights = [];
    this.maxLights = 36; // Restored to 36 for high GPU performance while keeping storefronts/streetlights active
    this.initLightPool();
    this.slFlareTex = createStreetlightFlareTexture();

    // Generate static templates at startup to avoid CPU mid-frame BufferGeometry merging!
    this.templates = {};
    this.generateTemplates();
  }

  initLightPool() {
    this.lightPool = [];
    // 36 lights is highly optimized for performance while ensuring all nearby storefronts,
    // streetlights, and traffic headlights can shine simultaneously.
    this.maxLights = 36;
    for (let i = 0; i < this.maxLights; i++) {
      const light = new THREE.PointLight(0xffd5a1, 0.0, 110, 1.15);
      light.castShadow = false; // Never cast shadows from pooled lights (very expensive)
      this.scene.add(light);
      this.lightPool.push(light);
    }
  }

  generateTemplates() {
    // 1. TREE MODEL TEMPLATE
    const treeGroup = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.8, 4.0, 0.8), this.trunkMat);
    trunk.position.y = 2.0;
    trunk.castShadow = true;
    treeGroup.add(trunk);

    const leafGeoms = [];
    const clusters = [
      { size: 3.5, y: 3.8 },
      { size: 2.8, y: 4.8 },
      { size: 1.8, y: 5.6 }
    ];
    clusters.forEach(c => {
      const lg = new THREE.BoxGeometry(c.size, c.size * 0.8, c.size);
      lg.translate(0, c.y, 0);
      leafGeoms.push(lg);
    });
    const mergedLeaves = BufferGeometryUtils.mergeGeometries(leafGeoms);
    const leavesMesh = new THREE.Mesh(mergedLeaves, this.leafMat);
    leavesMesh.castShadow = true;
    treeGroup.add(leavesMesh);
    this.templates.tree = treeGroup;

    // 1b. ROUND TREE TEMPLATE (Green)
    const treeRoundGroup = new THREE.Group();
    const trunkRound = new THREE.Mesh(new THREE.BoxGeometry(0.8, 3.2, 0.8), this.trunkMat);
    trunkRound.position.y = 1.6;
    trunkRound.castShadow = true;
    treeRoundGroup.add(trunkRound);

    const leafRoundGeoms = [];
    const roundClusters = [
      { sx: 3.8, sy: 3.2, sz: 3.8, y: 3.6 },
      { sx: 2.8, sy: 2.4, sz: 2.8, y: 5.0 }
    ];
    roundClusters.forEach(c => {
      const lg = new THREE.BoxGeometry(c.sx, c.sy, c.sz);
      lg.translate(0, c.y, 0);
      leafRoundGeoms.push(lg);
    });
    const mergedRoundLeaves = BufferGeometryUtils.mergeGeometries(leafRoundGeoms);
    const leavesRoundMesh = new THREE.Mesh(mergedRoundLeaves, this.leafMat);
    leavesRoundMesh.castShadow = true;
    leavesRoundMesh.receiveShadow = true;
    treeRoundGroup.add(leavesRoundMesh);
    this.templates.treeRoundGreen = treeRoundGroup;

    // 1c. PRE-BUILD LEAF COLOR VARIATIONS FOR PINE AND ROUND TREES (Zero runtime traversal!)
    const treeGroupCherry = new THREE.Group();
    treeGroupCherry.add(trunk.clone());
    const leavesCherry = new THREE.Mesh(mergedLeaves, this.leafCherryMat);
    leavesCherry.castShadow = true;
    treeGroupCherry.add(leavesCherry);
    this.templates.treeCherry = treeGroupCherry;

    const treeGroupAutumn = new THREE.Group();
    treeGroupAutumn.add(trunk.clone());
    const leavesAutumn = new THREE.Mesh(mergedLeaves, this.leafAutumnMat);
    leavesAutumn.castShadow = true;
    treeGroupAutumn.add(leavesAutumn);
    this.templates.treeAutumn = treeGroupAutumn;

    const treeRoundCherry = new THREE.Group();
    treeRoundCherry.add(trunkRound.clone());
    const leavesRoundCherry = new THREE.Mesh(mergedRoundLeaves, this.leafCherryMat);
    leavesRoundCherry.castShadow = true;
    leavesRoundCherry.receiveShadow = true;
    treeRoundCherry.add(leavesRoundCherry);
    this.templates.treeRoundCherry = treeRoundCherry;

    const treeRoundAutumn = new THREE.Group();
    treeRoundAutumn.add(trunkRound.clone());
    const leavesRoundAutumn = new THREE.Mesh(mergedRoundLeaves, this.leafAutumnMat);
    leavesRoundAutumn.castShadow = true;
    leavesRoundAutumn.receiveShadow = true;
    treeRoundAutumn.add(leavesRoundAutumn);
    this.templates.treeRoundAutumn = treeRoundAutumn;

    // 1d. FIRE HYDRANT TEMPLATE
    this.templates.fireHydrant = this.createFireHydrantMesh();

    // 1e. NEWSPAPER BOX TEMPLATE
    this.templates.newspaperBox = this.createNewspaperBoxMesh();

    // 2. STREETLIGHT MODEL TEMPLATE
    const slGroup = new THREE.Group();
    const slPole = new THREE.Mesh(new THREE.BoxGeometry(0.3, 8.5, 0.3), this.streetlightPoleMat);
    slPole.position.y = 4.25;
    slPole.castShadow = true;
    slGroup.add(slPole);
    this.templates.streetlight = slGroup;
  }

  createFireHydrantMesh() {
    const fh = new THREE.Group();
    const redMat = new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.4, metalness: 0.6 });
    const capMat = new THREE.MeshStandardMaterial({ color: 0xddaa00, roughness: 0.5, metalness: 0.7 });
    
    const barrel = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.7, 0.35), redMat);
    barrel.position.y = 0.35;
    barrel.castShadow = true;
    fh.add(barrel);
    
    const topCap = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.1, 0.42), capMat);
    topCap.position.y = 0.75;
    fh.add(topCap);
    
    const nozzleL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.15, 0.12), capMat);
    nozzleL.position.set(-0.2, 0.45, 0);
    fh.add(nozzleL);
    
    const nozzleR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.15, 0.12), capMat);
    nozzleR.position.set(0.2, 0.45, 0);
    fh.add(nozzleR);

    return fh;
  }

  createNewspaperBoxMesh() {
    const box = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1f4e79, roughness: 0.5 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0xeef7ff, transparent: true, opacity: 0.4, metalness: 0.9, roughness: 0.1 });
    const paperMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.9 });
    
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.1, 0.8), bodyMat);
    body.position.y = 0.55;
    body.castShadow = true;
    body.receiveShadow = true;
    box.add(body);
    
    const glass = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 0.05), glassMat);
    glass.position.set(0, 0.75, 0.41);
    box.add(glass);
    
    const paper = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.5), paperMat);
    paper.position.set(0, 0.35, 0.1);
    box.add(paper);
    
    return box;
  }

  update(playerX, playerZ, heading = 0, dynamicLightsList = []) {
    const pTileX = Math.round(playerX / this.tileSize);
    const pTileZ = Math.round(playerZ / this.tileSize);

    // 1. Generate/Load new tiles
    for (let x = pTileX - this.renderRadius; x <= pTileX + this.renderRadius; x++) {
      for (let z = pTileZ - this.renderRadius; z <= pTileZ + this.renderRadius; z++) {
        const key = `${x},${z}`;
        if (!this.loadedTiles.has(key)) {
          this.generateTile(x, z);
        }
      }
    }

    // 2. Unload far tiles — use stored numeric coords to avoid string split/map per tile
    for (const [key, tile] of this.loadedTiles.entries()) {
      if (Math.abs(tile.gridX - pTileX) > this.renderRadius || Math.abs(tile.gridZ - pTileZ) > this.renderRadius) {
        this.unloadTile(key, tile);
      }
    }

    // 2b. CPU-Side Heading-based Visual Chunk Culling
    const dirX = Math.sin(heading);
    const dirZ = Math.cos(heading);
    const renderLimitAngle = -0.42; // ~115 degree FOV coverage

    for (const tile of this.loadedTiles.values()) {
      const dx = tile.posX - playerX;
      const dz = tile.posZ - playerZ;
      const distSq = dx * dx + dz * dz;

      if (distSq < 65 * 65) {
        if (!tile.visible) { this.scene.add(tile.group); tile.visible = true; }
      } else {
        const dot = dx * dirX + dz * dirZ;
        const show = dot > 0 || (dot * dot < 0.1764 * distSq); // Avoids Math.sqrt (0.42 * 0.42 = 0.1764)
        if (show && !tile.visible)       { this.scene.add(tile.group);    tile.visible = true; }
        else if (!show && tile.visible)  { this.scene.remove(tile.group); tile.visible = false; }
      }
    }

    // 3. Update active lights from light pool
    // Pre-filter lightSources by distance^2 — reuse a cached array to avoid per-frame allocation
    if (!this._lightWorkBuf) this._lightWorkBuf = [];
    const lightCullDistSq = 560 * 560;
    let wli = 0;
    for (let si = 0; si < this.lightSources.length; si++) {
      const src = this.lightSources[si];
      const dx = src.x - playerX;
      const dz = src.z - playerZ;
      const distSq = dx * dx + dz * dz;

      // Update baked ground light pool opacity smoothly based ONLY on distance to player
      if (src.poolMesh) {
        if (distSq >= 12100) { // 110m * 110m
          src.poolMesh.material.opacity = src.defaultOpacity;
        } else if (distSq <= 2025) { // 45m * 45m
          src.poolMesh.material.opacity = 0.0;
        } else {
          const dist = Math.sqrt(distSq);
          const t = (dist - 45.0) / 65.0; // 0.0 at 45m, 1.0 at 110m
          const smoothT = t * t * (3.0 - 2.0 * t); // Smoothstep curve
          src.poolMesh.material.opacity = src.defaultOpacity * smoothT;
        }
      }

      if (distSq < lightCullDistSq) {
        src._distSq = distSq; // Pre-cache squared distance
        this._lightWorkBuf[wli++] = src;
      }
    }
    // Append dynamic lights (headlamps, sirens, sparks)
    for (let di = 0; di < dynamicLightsList.length; di++) {
      const src = dynamicLightsList[di];
      const dx = src.x - playerX;
      const dz = src.z - playerZ;
      src._distSq = dx * dx + dz * dz; // Pre-cache squared distance
      this._lightWorkBuf[wli++] = src;
    }

    // Heading-based cull: remove lights behind camera (in-place compact)
    let wi = 0;
    for (let ri = 0; ri < wli; ri++) {
      const src = this._lightWorkBuf[ri];
      const dx = src.x - playerX;
      const dz = src.z - playerZ;
      const distSq = src._distSq;
      const dot = dx * dirX + dz * dirZ;
      if (distSq < 65 * 65 || dot > 0 || dot * dot < 0.1764 * distSq) { // Avoids Math.sqrt (0.42 * 0.42 = 0.1764)
        this._lightWorkBuf[wi++] = src;
      }
    }
    const visibleCount = wi;

    // Sort by distance every frame — using partial selection sort to find the closest lights.
    // This runs in-place on the pre-allocated _lightWorkBuf with zero garbage collection/allocation overhead,
    // sorting only up to maxLights (24) slots which avoids expensive full sorts.
    const sortLimit = Math.min(this.maxLights, visibleCount);
    for (let i = 0; i < sortLimit; i++) {
      let minIdx = i;
      let minDistSq = this._lightWorkBuf[i]._distSq;
      for (let j = i + 1; j < visibleCount; j++) {
        const distSq = this._lightWorkBuf[j]._distSq;
        if (distSq < minDistSq) {
          minDistSq = distSq;
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        const temp = this._lightWorkBuf[i];
        this._lightWorkBuf[i] = this._lightWorkBuf[minIdx];
        this._lightWorkBuf[minIdx] = temp;
      }
    }

    // Assign pool lights to closest sources
    const maxVisibleDist = 560.0;
    const fadeStartDist  = 380.0;
    for (let i = 0; i < this.maxLights; i++) {
      const light = this.lightPool[i];
      if (i < visibleCount) {
        const source = this._lightWorkBuf[i];
        light.position.set(source.x, source.y, source.z);
        const dx = source.x - playerX;
        const dz = source.z - playerZ;
        const dist = Math.sqrt(dx * dx + dz * dz);
        let intensity = source.intensity || 0.0;
        
        if (dist > fadeStartDist) {
          intensity *= Math.max(0.0, 1.0 - (dist - fadeStartDist) / (maxVisibleDist - fadeStartDist));
        }

        // Smooth cross-fade for real-time light intensity:
        if (source.poolMesh) {
          // Streetlights: Transition range: 45m (100%) to 110m (0%)
          if (dist < 45.0) {
            // Very close: 100% real-time light intensity
          } else if (dist > 110.0) {
            // Far away: 0% real-time light intensity
            intensity = 0.0;
          } else {
            // Transition zone: smoothly interpolate real-time light fade out
            const t = (dist - 45.0) / 65.0;
            const smoothT = t * t * (3.0 - 2.0 * t); // Smoothstep curve
            intensity *= (1.0 - smoothT);
          }
        } else {
          // Other dynamic lights (traffic/cop headlights, sirens, sparks, drift glow):
          // Transition range: 80m (100%) to 120m (0%) to prevent pop-in
          if (dist < 80.0) {
            // Close: 100% intensity
          } else if (dist > 120.0) {
            // Far: 0% intensity
            intensity = 0.0;
          } else {
            // Transition zone: smoothly fade out
            const t = (dist - 80.0) / 40.0; // 0.0 at 80m, 1.0 at 120m
            const smoothT = t * t * (3.0 - 2.0 * t); // Smoothstep curve
            intensity *= (1.0 - smoothT);
          }
        }

        light.intensity = intensity;
        light.color.setHex(source.color || 0xffaa3a);
      } else {
        light.intensity = 0.0;
      }
    }

    // 4. Update traffic light visual states
    // Guard material swaps: only re-assign material when the color has actually changed
    // (avoids triggering a GPU re-bind on every frame for every traffic light)
    const gameTime = window.gameTime || 0;
    this.trafficLights.forEach(tl => {
      const state = getTrafficLightState(tl.intersectionX, tl.intersectionZ, gameTime);
      const activeColor = tl.axis === 'x' ? state.xLight : state.zLight;
      if (tl._lastColor !== activeColor) {
        tl._lastColor = activeColor;
        tl.redMesh.material    = activeColor === 'red'    ? this.tlRedOnMat    : this.tlRedOffMat;
        tl.yellowMesh.material = activeColor === 'yellow' ? this.tlYellowOnMat : this.tlYellowOffMat;
        tl.greenMesh.material  = activeColor === 'green'  ? this.tlGreenOnMat  : this.tlGreenOffMat;
      }
    });
  }

  getRoadWidthForGrid(gridX, gridZ) {
    let rwX = 26;
    let rwZ = 26;
    
    // Check horizontal street (running along X, constant gridZ)
    const seedZ = Math.sin(gridZ * 78.233) * 43758.5453;
    const randZ = seedZ - Math.floor(seedZ);
    if (randZ > 0.6) { // 40% chance of narrow road
      rwZ = 14; 
    }
    
    // Check vertical street (running along Z, constant gridX)
    const seedX = Math.sin(gridX * 12.9898) * 43758.5453;
    const randX = seedX - Math.floor(seedX);
    if (randX > 0.6) { // 40% chance of narrow road
      rwX = 14;
    }
    
    return { rwX, rwZ };
  }

  getBlockInfo(gridX, gridZ) {
    let colLeft = 0;
    let colRight = 0;
    for (let x = gridX; x >= -1000; x--) {
      if (this.roadColumns.has(x)) {
        colLeft = x;
        break;
      }
    }
    for (let x = gridX + 1; x <= 1000; x++) {
      if (this.roadColumns.has(x)) {
        colRight = x;
        break;
      }
    }
    
    let rowTop = 0;
    let rowBottom = 0;
    for (let z = gridZ; z >= -1000; z--) {
      if (this.roadRows.has(z)) {
        rowTop = z;
        break;
      }
    }
    for (let z = gridZ + 1; z <= 1000; z++) {
      if (this.roadRows.has(z)) {
        rowBottom = z;
        break;
      }
    }
    
    return {
      colLeft,
      colRight,
      rowTop,
      rowBottom,
      blockWidth: colRight - colLeft,
      blockHeight: rowBottom - rowTop,
      dx: gridX - colLeft,
      dz: gridZ - rowTop
    };
  }

  isAlley(gridX, gridZ) {
    if (this.mainRoadColumns.has(gridX) || this.mainRoadRows.has(gridZ)) return false;
    return this.shortcutColumns.has(gridX) || this.shortcutRows.has(gridZ);
  }

  snapToNearestIntersection(x, z) {
    const gridX = Math.round(x / this.tileSize);
    const gridZ = Math.round(z / this.tileSize);
    
    let nearestCol = 0;
    let minColDist = Infinity;
    for (let cx = gridX - 8; cx <= gridX + 8; cx++) {
      if (this.roadColumns.has(cx)) {
        const dist = Math.abs(cx - gridX);
        if (dist < minColDist) {
          minColDist = dist;
          nearestCol = cx;
        }
      }
    }
    
    let nearestRow = 0;
    let minRowDist = Infinity;
    for (let cz = gridZ - 8; cz <= gridZ + 8; cz++) {
      if (this.roadRows.has(cz)) {
        const dist = Math.abs(cz - gridZ);
        if (dist < minRowDist) {
          minRowDist = dist;
          nearestRow = cz;
        }
      }
    }
    
    return {
      x: nearestCol * this.tileSize,
      z: nearestRow * this.tileSize
    };
  }

  generateTile(gridX, gridZ) {
    const key = `${gridX},${gridZ}`;
    const tileGroup = new THREE.Group();
    const tileObstacles = [];
    const tileLights = [];

    const posX = gridX * this.tileSize;
    const posZ = gridZ * this.tileSize;
    
    const isAlley = this.isAlley(gridX, gridZ);
    const isRoad = this.roadColumns.has(gridX) || this.roadRows.has(gridZ);

    if (isAlley) {
      this.buildAlleyTile(gridX, gridZ, posX, posZ, tileGroup, tileObstacles, tileLights);
    } else if (isRoad) {
      this.buildRoadTile(gridX, gridZ, posX, posZ, tileGroup, tileObstacles, tileLights);
      
      // Compute and store world-space puddle circles for this tile
      const tileCircles = [];
      const matIndex = Math.abs(gridX * 17 + gridZ * 23) % this.asphaltMaterials.length;
      const localCircles = this.asphaltLocalCircles[matIndex];
      
      if (localCircles && localCircles.length > 0) {
        const ox = Math.abs((gridX * 0.317 + gridZ * 0.713) % 1.0);
        const oy = Math.abs((gridX * 0.893 + gridZ * 0.149) % 1.0);

        // Determine size of asphalt mesh for this tile (roadWidth is 26 or 14)
        let sizeX = this.tileSize;
        let sizeZ = this.tileSize;
        const isIntersection = this.roadColumns.has(gridX) && this.roadRows.has(gridZ);
        if (!isIntersection) {
          const { rwX, rwZ } = this.getRoadWidthForGrid(gridX, gridZ);
          if (this.roadRows.has(gridZ)) {
            // Vertical road (runs along X): width along X is tileSize (40), but thickness along Z is roadWidth (rwZ)
            sizeZ = rwZ;
          } else {
            // Horizontal road (runs along Z): width along X is roadWidth (rwX), thickness along Z is tileSize (40)
            sizeX = rwX;
          }
        }

        localCircles.forEach(c => {
          // Geometry UV shift was +ox, so texture pixel's local position on the geometry is shifted by -ox
          const u = c.x / 1024;
          const v = c.y / 1024;
          
          const shiftedU = (u - ox + 2.0) % 1.0;
          const shiftedV = (v + oy) % 1.0;
          
          const localX = shiftedU * sizeX - sizeX / 2;
          const localZ = shiftedV * sizeZ - sizeZ / 2;
          
          tileCircles.push({
            x: posX + localX,
            z: posZ + localZ,
            rx: (c.r / 1024) * sizeX,
            rz: (c.r / 1024) * sizeZ
          });
        });
      }
      this.tilePuddles.set(key, tileCircles);
    } else {
      this.buildBuildingTile(gridX, gridZ, posX, posZ, tileGroup, tileObstacles, tileLights);
    }

    this.scene.add(tileGroup);
    
    this.loadedTiles.set(key, {
      group: tileGroup,
      obstacles: tileObstacles,
      lights: tileLights,
      posX: posX,
      posZ: posZ,
      gridX: gridX,   // Store numeric coords to avoid string split/map in unload loop
      gridZ: gridZ,
      visible: true
    });

    this.obstacles.push(...tileObstacles);
    // Insert into spatial hash
    for (const obs of tileObstacles) {
      const x0 = Math.floor(obs.xMin / this.spatialCellSize);
      const x1 = Math.floor(obs.xMax / this.spatialCellSize);
      const z0 = Math.floor(obs.zMin / this.spatialCellSize);
      const z1 = Math.floor(obs.zMax / this.spatialCellSize);
      for (let cx = x0; cx <= x1; cx++) {
        for (let cz = z0; cz <= z1; cz++) {
          const k = `${cx},${cz}`;
          if (!this.obstacleGrid.has(k)) this.obstacleGrid.set(k, []);
          this.obstacleGrid.get(k).push(obs);
        }
      }
    }
    this.lightSources.push(...tileLights);
  }

  unloadTile(key, tile) {
    if (tile.visible) {
      this.scene.remove(tile.group);
    }
    
    // Dispose resources
    tile.group.traverse(child => {
      if (child.isMesh && child.geometry && child.geometry !== this.lightPoolGeo && child.geometry !== this.storefrontLightPoolGeo && child.geometry !== this.alleyLightPoolGeo) {
        child.geometry.dispose();
      }
    });

    // Remove from flat array
    const obsSet = new Set(tile.obstacles);
    this.obstacles = this.obstacles.filter(obs => !obsSet.has(obs));
    // Remove from spatial hash
    for (const obs of tile.obstacles) {
      const x0 = Math.floor(obs.xMin / this.spatialCellSize);
      const x1 = Math.floor(obs.xMax / this.spatialCellSize);
      const z0 = Math.floor(obs.zMin / this.spatialCellSize);
      const z1 = Math.floor(obs.zMax / this.spatialCellSize);
      for (let cx = x0; cx <= x1; cx++) {
        for (let cz = z0; cz <= z1; cz++) {
          const k = `${cx},${cz}`;
          const cell = this.obstacleGrid.get(k);
          if (cell) {
            const idx = cell.indexOf(obs);
            if (idx !== -1) cell.splice(idx, 1);
            if (cell.length === 0) this.obstacleGrid.delete(k);
          }
        }
      }
    }
    this.lightSources = this.lightSources.filter(src => !tile.lights.includes(src));

    // Clear unloaded traffic lights from tracking — use stored posX/posZ instead of parsing key string
    const tilePosX = tile.posX;
    const tilePosZ = tile.posZ;
    this.trafficLights = this.trafficLights.filter(tl => tl.tileX !== tilePosX || tl.tileZ !== tilePosZ);
    this.breakables = this.breakables.filter(b => b.tileX !== tilePosX || b.tileZ !== tilePosZ);

    this.tilePuddles.delete(key);
    this.loadedTiles.delete(key);
  }

  buildRoadTile(gridX, gridZ, posX, posZ, group, obstacles, lights) {
    const { rwX, rwZ } = this.getRoadWidthForGrid(gridX, gridZ);
    const isIntersection = this.roadColumns.has(gridX) && this.roadRows.has(gridZ);
    const roadWidth = this.roadRows.has(gridZ) ? rwZ : rwX;
    const sidewalkWidth = (this.tileSize - roadWidth) / 2;

    const matIndex = Math.abs(gridX * 17 + gridZ * 23) % this.asphaltMaterials.length;
    const chosenMat = this.asphaltMaterials[matIndex];

    // Shift UV mapping deterministically based on tile coords to prevent puddle repetition
    const randomizeRoadUVs = (roadGroup) => {
      const ox = Math.abs((gridX * 0.317 + gridZ * 0.713) % 1.0);
      const oy = Math.abs((gridX * 0.893 + gridZ * 0.149) % 1.0);
      
      roadGroup.traverse(child => {
        if (child.isMesh && (child.material === this.asphaltMat || this.asphaltMaterials.includes(child.material))) {
          child.material = chosenMat;
          child.geometry = child.geometry.clone();
          const uvs = child.geometry.attributes.uv;
          for (let i = 0; i < uvs.count; i++) {
            uvs.setXY(i, uvs.getX(i) + ox, uvs.getY(i) + oy);
          }
          uvs.needsUpdate = true;
        }
      });
    };

    const localPoles = [];
    const localBulbs = [];
    const localTrunks = [];
    const localLeaves = [];
    const localLeavesCherry = [];
    const localLeavesAutumn = [];

    const addTree = (tx, tz) => {
      const h = this.getBaseHeight(tx, tz);
      const trunkGeo = new THREE.BoxGeometry(0.8, 4.0, 0.8);
      trunkGeo.translate(tx, 2.35 + h, tz);
      localTrunks.push(trunkGeo);

      // Randomize tree style (Green, Cherry, Autumn)
      const tSeed = Math.sin(tx * 12.9898 + tz * 78.233) * 43758.5453;
      const tRand = tSeed - Math.floor(tSeed);
      const treeType = tRand > 0.85 ? 'cherry' : (tRand > 0.70 ? 'autumn' : 'normal');

      // Randomize tree shape (standard, pine, oak)
      let clusters = [];
      const shapeRand = (tRand * 10) % 1;
      if (shapeRand > 0.66) {
        // Pine shape
        clusters = [
          { size: 3.6, y: 3.5 },
          { size: 2.8, y: 4.3 },
          { size: 2.0, y: 5.1 },
          { size: 1.2, y: 5.9 }
        ];
      } else if (shapeRand > 0.33) {
        // Oak shape
        clusters = [
          { size: 3.5, y: 4.0 },
          { size: 3.5, y: 4.4 },
          { size: 2.8, y: 5.0 }
        ];
      } else {
        // Standard shape
        clusters = [
          { size: 3.5, y: 3.8 },
          { size: 2.8, y: 4.8 },
          { size: 1.8, y: 5.6 }
        ];
      }

      clusters.forEach(c => {
        const lg = new THREE.BoxGeometry(c.size, c.size * 0.85, c.size);
        lg.translate(tx, c.y + 0.35 + h, tz);
        
        if (treeType === 'cherry') {
          localLeavesCherry.push(lg);
        } else if (treeType === 'autumn') {
          localLeavesAutumn.push(lg);
        } else {
          localLeaves.push(lg);
        }
      });

      obstacles.push({
        xMin: tx - 0.4,
        xMax: tx + 0.4,
        zMin: tz - 0.4,
        zMax: tz + 0.4,
        height: 6
      });
    };

    const addFireHydrant = (fhx, fhz) => {
      const fh = this.templates.fireHydrant.clone();
      const h = this.getBaseHeight(fhx, fhz);
      fh.position.set(fhx, 0.35 + h, fhz);
      group.add(fh);
      obstacles.push({
        xMin: fhx - 0.25,
        xMax: fhx + 0.25,
        zMin: fhz - 0.25,
        zMax: fhz + 0.25,
        height: 1.0
      });
    };

    const addNewspaperBox = (nbx, nbz, rotY) => {
      const nb = this.templates.newspaperBox.clone();
      const h = this.getBaseHeight(nbx, nbz);
      nb.position.set(nbx, 0.35 + h, nbz);
      nb.rotation.y = rotY;
      group.add(nb);
      obstacles.push({
        xMin: nbx - 0.4,
        xMax: nbx + 0.4,
        zMin: nbz - 0.4,
        zMax: nbz + 0.4,
        height: 1.2
      });
    };

    const addBench = (bx, bz, rotY) => {
      const bench = this.createBenchMesh();
      const h = this.getBaseHeight(bx, bz);
      bench.position.set(bx, 0.6 + h, bz);
      bench.rotation.y = rotY;
      group.add(bench);
      
      this.breakables.push({
        type: 'bench',
        comHeight: 0.6,
        radius: 0.4,
        position: new THREE.Vector3(bx, 0.6 + h, bz),
        group: bench,
        flares: [],
        lights: [],
        broken: false,
        tileX: posX,
        tileZ: posZ,
        velocity: new THREE.Vector3(),
        angularVelocity: new THREE.Vector3()
      });
    };

    const addPhoneBooth = (pbx, pbz, rotY) => {
      const pb = this.createPhoneBoothMesh();
      const h = this.getBaseHeight(pbx, pbz);
      pb.position.set(pbx, 1.4 + h, pbz);
      pb.rotation.y = rotY;
      group.add(pb);
      
      this.breakables.push({
        type: 'phonebooth',
        comHeight: 1.4,
        radius: 0.6,
        position: new THREE.Vector3(pbx, 1.4 + h, pbz),
        group: pb,
        flares: [],
        lights: [],
        broken: false,
        tileX: posX,
        tileZ: posZ,
        velocity: new THREE.Vector3(),
        angularVelocity: new THREE.Vector3()
      });
    };

    const addTrashCan = (tcx, tcz) => {
      const tc = this.createTrashCanMesh();
      const h = this.getBaseHeight(tcx, tcz);
      tc.position.set(tcx, 0.5 + h, tcz);
      tc.rotation.y = Math.random() * Math.PI * 2;
      group.add(tc);
      
      this.breakables.push({
        type: 'trashcan',
        comHeight: 0.5,
        radius: 0.3,
        position: new THREE.Vector3(tcx, 0.5 + h, tcz),
        group: tc,
        flares: [],
        lights: [],
        broken: false,
        tileX: posX,
        tileZ: posZ,
        velocity: new THREE.Vector3(),
        angularVelocity: new THREE.Vector3()
      });
    };

    const addRoadRamp = (lx, lz, slopeType, slopeDir) => {
      const rampWidth = 4.2;
      const rampLength = 7.0;
      const rampHeight = 1.7;
      
      const rampGroup = new THREE.Group();
      
      const wedgeGeo = new THREE.BoxGeometry(
        slopeType === 'Z' ? rampWidth : rampLength,
        0.12,
        slopeType === 'Z' ? rampLength : rampWidth
      );
      
      const wedgeMesh = new THREE.Mesh(wedgeGeo, this.concreteMat);
      wedgeMesh.castShadow = true;
      wedgeMesh.receiveShadow = true;
      
      if (slopeType === 'Z') {
        if (slopeDir === 1) {
          wedgeMesh.rotation.x = Math.PI / 10;
          wedgeMesh.position.set(0, rampHeight / 2, -rampLength / 6);
        } else {
          wedgeMesh.rotation.x = -Math.PI / 10;
          wedgeMesh.position.set(0, rampHeight / 2, rampLength / 6);
        }
      } else {
        if (slopeDir === 1) {
          wedgeMesh.rotation.z = -Math.PI / 10;
          wedgeMesh.position.set(-rampLength / 6, rampHeight / 2, 0);
        } else {
          wedgeMesh.rotation.z = Math.PI / 10;
          wedgeMesh.position.set(rampLength / 6, rampHeight / 2, 0);
        }
      }
      rampGroup.add(wedgeMesh);

      const sideGeo = new THREE.BoxGeometry(
        slopeType === 'Z' ? 0.15 : rampLength,
        rampHeight,
        slopeType === 'Z' ? rampLength : 0.15
      );
      
      const side1 = new THREE.Mesh(sideGeo, this.asphaltMat);
      side1.position.set(
        slopeType === 'Z' ? -rampWidth / 2 + 0.075 : 0,
        rampHeight / 2,
        0
      );
      rampGroup.add(side1);

      const side2 = new THREE.Mesh(sideGeo, this.asphaltMat);
      side2.position.set(
        slopeType === 'Z' ? rampWidth / 2 - 0.075 : 0,
        rampHeight / 2,
        0
      );
      rampGroup.add(side2);

      const h = this.getBaseHeight(posX + lx, posZ + lz);
      rampGroup.position.set(posX + lx, 0.175 + h, posZ + lz);
      group.add(rampGroup);

      const wX = slopeType === 'Z' ? rampWidth / 2 : rampLength / 2;
      const wZ = slopeType === 'Z' ? rampLength / 2 : rampWidth / 2;
      
      obstacles.push({
        xMin: posX + lx - wX,
        xMax: posX + lx + wX,
        zMin: posZ + lz - wZ,
        zMax: posZ + lz + wZ,
        height: rampHeight + 0.35,
        isRamp: true,
        slopeType: slopeType,
        slopeDir: slopeDir
      });
    };

    if (isIntersection) {
      // Build dynamic intersection geometry matching rwX and rwZ
      const road = new THREE.Group();
      
      const asphaltGeo = new THREE.BoxGeometry(this.tileSize, 0.2, this.tileSize, 8, 1, 8);
      asphaltGeo.translate(0, 0.1, 0);
      this.deformGeometryToHills(asphaltGeo, posX, posZ);
      const asphalt = new THREE.Mesh(asphaltGeo, this.asphaltMat);
      asphalt.receiveShadow = true;
      road.add(asphalt);

      // Crosswalks
      const lineW = 0.5;
      const lineL = 5.0;
      const crosswalkWhiteGeoms = [];
      
      // North & South crosswalks (along the horizontal road of width rwZ)
      for (let offset = -rwX/2 + 2; offset <= rwX/2 - 2; offset += 3) {
        const gN = new THREE.BoxGeometry(lineL, 0.21, lineW, 4, 1, 1);
        gN.translate(offset, 0.11, -rwZ/2 - 1);
        crosswalkWhiteGeoms.push(gN);

        const gS = new THREE.BoxGeometry(lineL, 0.21, lineW, 4, 1, 1);
        gS.translate(offset, 0.11, rwZ/2 + 1);
        crosswalkWhiteGeoms.push(gS);
      }
      
      // West & East crosswalks (along the vertical road of width rwX)
      for (let offset = -rwZ/2 + 2; offset <= rwZ/2 - 2; offset += 3) {
        const gW = new THREE.BoxGeometry(lineW, 0.21, lineL, 1, 1, 4);
        gW.translate(-rwX/2 - 1, 0.11, offset);
        crosswalkWhiteGeoms.push(gW);

        const gE = new THREE.BoxGeometry(lineW, 0.21, lineL, 1, 1, 4);
        gE.translate(rwX/2 + 1, 0.11, offset);
        crosswalkWhiteGeoms.push(gE);
      }
      
      if (crosswalkWhiteGeoms.length > 0) {
        const mergedWhite = BufferGeometryUtils.mergeGeometries(crosswalkWhiteGeoms);
        this.deformGeometryToHills(mergedWhite, posX, posZ);
        road.add(new THREE.Mesh(mergedWhite, this.whiteLineMat));
      }

      // 4 Corner sidewalk slabs
      const swWidthX = 20 - rwX/2;
      const swWidthZ = 20 - rwZ/2;
      const concreteGeoms = [];
      if (swWidthX > 0 && swWidthZ > 0) {
        // NW Corner
        const slabNW = new THREE.BoxGeometry(swWidthX, 0.35, swWidthZ, 4, 1, 4);
        applySidewalkUVs(slabNW);
        slabNW.translate(-20 + swWidthX/2, 0.175, -20 + swWidthZ/2);
        concreteGeoms.push(slabNW);
        
        // NE Corner
        const slabNE = new THREE.BoxGeometry(swWidthX, 0.35, swWidthZ, 4, 1, 4);
        applySidewalkUVs(slabNE);
        slabNE.translate(20 - swWidthX/2, 0.175, -20 + swWidthZ/2);
        concreteGeoms.push(slabNE);
        
        // SW Corner
        const slabSW = new THREE.BoxGeometry(swWidthX, 0.35, swWidthZ, 4, 1, 4);
        applySidewalkUVs(slabSW);
        slabSW.translate(-20 + swWidthX/2, 0.175, 20 - swWidthZ/2);
        concreteGeoms.push(slabSW);
        
        // SE Corner
        const slabSE = new THREE.BoxGeometry(swWidthX, 0.35, swWidthZ, 4, 1, 4);
        applySidewalkUVs(slabSE);
        slabSE.translate(20 - swWidthX/2, 0.175, 20 - swWidthZ/2);
        concreteGeoms.push(slabSE);
      }
      
      if (concreteGeoms.length > 0) {
        const iMergedConcrete = BufferGeometryUtils.mergeGeometries(concreteGeoms);
        this.deformGeometryToHills(iMergedConcrete, posX, posZ);
        const iConcreteMesh = new THREE.Mesh(iMergedConcrete, this.concreteMat);
        iConcreteMesh.receiveShadow = true;
        road.add(iConcreteMesh);
      }

      randomizeRoadUVs(road);
      road.position.set(posX, 0, posZ);
      group.add(road);

      // Add streetlight poles on corners
      const corners = [
        [-rwX/2 - 1, -rwZ/2 - 1],
        [rwX/2 + 1, -rwZ/2 - 1],
        [-rwX/2 - 1, rwZ/2 + 1],
        [rwX/2 + 1, rwZ/2 + 1]
      ];
      corners.forEach(([ox, oz]) => {
        const slX = posX + ox;
        const slZ = posZ + oz;

        const slObject = new THREE.Group();
        const h = this.getBaseHeight(slX, slZ);
        slObject.position.set(slX, 4.25 + h, slZ); // Centered at Center of Mass (y=4.25)
        group.add(slObject);

        // Streetlight pole mesh (local coordinates relative to center of mass y=4.25)
        const pole = new THREE.Mesh(new THREE.BoxGeometry(0.3, 8.5, 0.3), this.streetlightPoleMat);
        pole.position.y = 0; // Centered at local origin
        pole.castShadow = true;
        slObject.add(pole);

        const armDirX = ox > 0 ? -1 : 1;
        const isLED = Math.sin(slX * 5.0 + slZ * 3.0) > 0.0;
        const lightColor = isLED ? 0xd2e5ff : 0xffd5a1;

        // Streetlight arm/handle
        const arm = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.15, 0.15), this.streetlightPoleMat);
        arm.position.set(armDirX * 0.65, 4.15, 0);
        arm.castShadow = true;
        slObject.add(arm);

        // Streetlight bulb mesh (local y offset is 8.4 - 4.25 = 4.15)
        const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.6), this.streetlightBulbMat);
        bulb.position.set(armDirX * 1.3, 4.15, 0);
        slObject.add(bulb);

        // Baked ground light pool under streetlight 1
        const poolMesh1 = new THREE.Mesh(
          this.lightPoolGeo,
          (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
        );
        poolMesh1.position.set(armDirX * 1.3, -3.89, 0);
        slObject.add(poolMesh1);

        // Double-arm variety (35% chance)
        const isDoubleArm = (Math.sin(slX * 1.2 + slZ * 2.8) - Math.floor(Math.sin(slX * 1.2 + slZ * 2.8))) > 0.65;
        const localFlares = [];
        const localLights = [];
        let poolMesh2 = null;

        if (isDoubleArm) {
          const arm2 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.15, 0.15), this.streetlightPoleMat);
          arm2.position.set(-armDirX * 0.65, 4.15, 0);
          arm2.castShadow = true;
          slObject.add(arm2);

          const bulb2 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.6), this.streetlightBulbMat);
          bulb2.position.set(-armDirX * 1.3, 4.15, 0);
          slObject.add(bulb2);

          // Baked ground light pool under streetlight 2
          poolMesh2 = new THREE.Mesh(
            this.lightPoolGeo,
            (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
          );
          poolMesh2.position.set(-armDirX * 1.3, -3.89, 0);
          slObject.add(poolMesh2);

          const flare2 = new THREE.Sprite(new THREE.SpriteMaterial({
            map: this.slFlareTex,
            color: lightColor,
            transparent: true,
            opacity: 0.70,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          }));
          flare2.position.set(-armDirX * 1.3, 4.15, 0);
          flare2.scale.set(3.8, 3.8, 1.0);
          slObject.add(flare2);
          localFlares.push(flare2);
        }

        // Add glowing lens flare sprite
        const flareSpriteMat = new THREE.SpriteMaterial({
          map: this.slFlareTex,
          color: lightColor,
          transparent: true,
          opacity: 0.70,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        const flare = new THREE.Sprite(flareSpriteMat);
        flare.position.set(armDirX * 1.3, 4.15, 0);
        flare.scale.set(3.8, 3.8, 1.0);
        slObject.add(flare);
        localFlares.push(flare);

        // Register main street lights in the lights pool with poolMesh reference for cross-fading
        const lightSrc1 = {
          x: slX + armDirX * 1.3,
          y: 7.5 + h,
          z: slZ,
          intensity: 12.0,
          color: lightColor,
          poolMesh: poolMesh1,
          defaultOpacity: isLED ? 0.16 : 0.22
        };
        lights.push(lightSrc1);
        localLights.push(lightSrc1);

        if (isDoubleArm) {
          const lightSrc2 = {
            x: slX - armDirX * 1.3,
            y: 7.5 + h,
            z: slZ,
            intensity: 12.0,
            color: lightColor,
            poolMesh: poolMesh2,
            defaultOpacity: isLED ? 0.16 : 0.22
          };
          lights.push(lightSrc2);
          localLights.push(lightSrc2);
        }

        // Add Traffic Lights
        // 1. X Axis Traffic Light (extends along Z, towards the road)
        const xArmOffsetZ = -Math.sign(oz) * 3.5;
        const xArm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 3.5), this.streetlightPoleMat);
        xArm.position.set(0, 2.5, -Math.sign(oz) * 1.75);
        xArm.castShadow = true;
        slObject.add(xArm);

        const xHousing = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 0.4), this.tlHousingMat);
        xHousing.position.set(0, 2.1, xArmOffsetZ);
        xHousing.rotation.y = ox > 0 ? -Math.PI / 2 : Math.PI / 2;
        slObject.add(xHousing);

        const bulbGeoTL = new THREE.BoxGeometry(0.24, 0.24, 0.1);

        const xRedGroup = new THREE.Group();
        xRedGroup.position.set(0, 2.1, xArmOffsetZ);
        xRedGroup.rotation.y = ox > 0 ? -Math.PI / 2 : Math.PI / 2;
        const xRed = new THREE.Mesh(bulbGeoTL, this.tlRedOffMat);
        xRed.position.set(0, 0.35, 0.21);
        xRedGroup.add(xRed);
        slObject.add(xRedGroup);

        const xYellowGroup = new THREE.Group();
        xYellowGroup.position.set(0, 2.1, xArmOffsetZ);
        xYellowGroup.rotation.y = ox > 0 ? -Math.PI / 2 : Math.PI / 2;
        const xYellow = new THREE.Mesh(bulbGeoTL, this.tlYellowOffMat);
        xYellow.position.set(0, 0, 0.21);
        xYellowGroup.add(xYellow);
        slObject.add(xYellowGroup);

        const xGreenGroup = new THREE.Group();
        xGreenGroup.position.set(0, 2.1, xArmOffsetZ);
        xGreenGroup.rotation.y = ox > 0 ? -Math.PI / 2 : Math.PI / 2;
        const xGreen = new THREE.Mesh(bulbGeoTL, this.tlGreenOffMat);
        xGreen.position.set(0, -0.35, 0.21);
        xGreenGroup.add(xGreen);
        slObject.add(xGreenGroup);

        // 2. Z Axis Traffic Light (extends along X, towards the road)
        const zArmOffsetX = -Math.sign(ox) * 3.5;
        const zArm = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.15, 0.15), this.streetlightPoleMat);
        zArm.position.set(-Math.sign(ox) * 1.75, 2.5, 0);
        zArm.castShadow = true;
        slObject.add(zArm);

        const zHousing = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 0.4), this.tlHousingMat);
        zHousing.position.set(zArmOffsetX, 2.1, 0);
        zHousing.rotation.y = oz > 0 ? Math.PI : 0;
        slObject.add(zHousing);

        const zRedGroup = new THREE.Group();
        zRedGroup.position.set(zArmOffsetX, 2.1, 0);
        zRedGroup.rotation.y = oz > 0 ? Math.PI : 0;
        const zRed = new THREE.Mesh(bulbGeoTL, this.tlRedOffMat);
        zRed.position.set(0, 0.35, 0.21);
        zRedGroup.add(zRed);
        slObject.add(zRedGroup);

        const zYellowGroup = new THREE.Group();
        zYellowGroup.position.set(zArmOffsetX, 2.1, 0);
        zYellowGroup.rotation.y = oz > 0 ? Math.PI : 0;
        const zYellow = new THREE.Mesh(bulbGeoTL, this.tlYellowOffMat);
        zYellow.position.set(0, 0, 0.21);
        zYellowGroup.add(zYellow);
        slObject.add(zYellowGroup);

        const zGreenGroup = new THREE.Group();
        zGreenGroup.position.set(zArmOffsetX, 2.1, 0);
        zGreenGroup.rotation.y = oz > 0 ? Math.PI : 0;
        const zGreen = new THREE.Mesh(bulbGeoTL, this.tlGreenOffMat);
        zGreen.position.set(0, -0.35, 0.21);
        zGreenGroup.add(zGreen);
        slObject.add(zGreenGroup);

        // Store references to update traffic light bulb colors dynamically
        this.trafficLights.push({
          tileX: posX,
          tileZ: posZ,
          intersectionX: posX,
          intersectionZ: posZ,
          axis: 'x',
          redMesh: xRed,
          yellowMesh: xYellow,
          greenMesh: xGreen
        });
        
        this.trafficLights.push({
          tileX: posX,
          tileZ: posZ,
          intersectionX: posX,
          intersectionZ: posZ,
          axis: 'z',
          redMesh: zRed,
          yellowMesh: zYellow,
          greenMesh: zGreen
        });

        this.breakables.push({
          type: 'trafficlight',
          position: new THREE.Vector3(slX, h, slZ),
          group: slObject,
          flares: localFlares,
          lights: localLights,
          poolMeshes: isDoubleArm ? [poolMesh1, poolMesh2] : [poolMesh1],
          broken: false,
          tileX: posX,
          tileZ: posZ,
          velocity: new THREE.Vector3(),
          angularVelocity: new THREE.Vector3()
        });
      });
    } 
    else {
      const isVertical = this.roadRows.has(gridZ);

      if (isVertical) {
        // Build dynamic vertical road mesh matching roadWidth (rwZ)
        const road = new THREE.Group();
        
        const asphaltGeo = new THREE.BoxGeometry(this.tileSize, 0.2, roadWidth, 8, 1, 4);
        asphaltGeo.translate(0, 0.1, 0);
        this.deformGeometryToHills(asphaltGeo, posX, posZ);
        const asphalt = new THREE.Mesh(asphaltGeo, this.asphaltMat);
        asphalt.receiveShadow = true;
        road.add(asphalt);

        const sw1 = new THREE.BoxGeometry(this.tileSize, 0.35, sidewalkWidth, 8, 1, 2);
        applySidewalkUVs(sw1);
        sw1.translate(0, 0.175, roadWidth/2 + sidewalkWidth/2);
        const sw2 = new THREE.BoxGeometry(this.tileSize, 0.35, sidewalkWidth, 8, 1, 2);
        applySidewalkUVs(sw2);
        sw2.translate(0, 0.175, -roadWidth/2 - sidewalkWidth/2);
        const mergedConcrete = BufferGeometryUtils.mergeGeometries([sw1, sw2]);
        this.deformGeometryToHills(mergedConcrete, posX, posZ);
        const concreteMesh = new THREE.Mesh(mergedConcrete, this.concreteMat);
        concreteMesh.receiveShadow = true;
        road.add(concreteMesh);

        const div1 = new THREE.BoxGeometry(this.tileSize, 0.22, 0.15, 8, 1, 1);
        div1.translate(0, 0.11, -0.2);
        const div2 = new THREE.BoxGeometry(this.tileSize, 0.22, 0.15, 8, 1, 1);
        div2.translate(0, 0.11, 0.2);
        const mergedYellow = BufferGeometryUtils.mergeGeometries([div1, div2]);
        this.deformGeometryToHills(mergedYellow, posX, posZ);
        road.add(new THREE.Mesh(mergedYellow, this.yellowLineMat));

        randomizeRoadUVs(road);
        road.position.set(posX, 0, posZ);
        group.add(road);

        // Spawn a tree or a flat road ramp
        const seed = Math.sin(gridX * 12.9898) * 43758.5453;
        const rand = seed - Math.floor(seed);
        
        const zPositiveSide = posZ + roadWidth/2 + sidewalkWidth/2;
        const zNegativeSide = posZ - roadWidth/2 - sidewalkWidth/2;

        // Left side of tile sidewalk (+X direction offset -13)
        const randLeft = (rand * 10) - Math.floor(rand * 10);
        if (randLeft > 0.85) {
          addTree(posX - 13, zPositiveSide);
        } else if (randLeft > 0.70) {
          addBench(posX - 13, zPositiveSide, Math.PI); // facing towards road (-Z)
        } else if (randLeft > 0.58) {
          addPhoneBooth(posX - 13, zPositiveSide, Math.PI);
        } else if (randLeft > 0.46) {
          addNewspaperBox(posX - 13, zPositiveSide, Math.PI);
        } else if (randLeft > 0.34) {
          addTrashCan(posX - 13, zPositiveSide);
        } else if (randLeft > 0.24) {
          addFireHydrant(posX - 13, zPositiveSide);
        }

        // Right side of tile sidewalk (+X direction offset +13)
        const randRight = (rand * 100) - Math.floor(rand * 100);
        if (randRight > 0.85) {
          addTree(posX + 13, zPositiveSide);
        } else if (randRight > 0.70) {
          addBench(posX + 13, zPositiveSide, Math.PI);
        } else if (randRight > 0.58) {
          addPhoneBooth(posX + 13, zPositiveSide, Math.PI);
        } else if (randRight > 0.46) {
          addNewspaperBox(posX + 13, zPositiveSide, Math.PI);
        } else if (randRight > 0.34) {
          addTrashCan(posX + 13, zPositiveSide);
        } else if (randRight > 0.24) {
          addFireHydrant(posX + 13, zPositiveSide);
        }

        // Left side of tile sidewalk (Negative side, offset -13)
        const randLeftN = (rand * 1000) - Math.floor(rand * 1000);
        if (randLeftN > 0.85) {
          addTree(posX - 13, zNegativeSide);
        } else if (randLeftN > 0.70) {
          addBench(posX - 13, zNegativeSide, 0); // facing towards road (+Z)
        } else if (randLeftN > 0.58) {
          addPhoneBooth(posX - 13, zNegativeSide, 0);
        } else if (randLeftN > 0.46) {
          addNewspaperBox(posX - 13, zNegativeSide, 0);
        } else if (randLeftN > 0.34) {
          addTrashCan(posX - 13, zNegativeSide);
        } else if (randLeftN > 0.24) {
          addFireHydrant(posX - 13, zNegativeSide);
        }

        // Right side of tile sidewalk (Negative side, offset +13)
        const randRightN = (rand * 10000) - Math.floor(rand * 10000);
        if (randRightN > 0.85) {
          addTree(posX + 13, zNegativeSide);
        } else if (randRightN > 0.70) {
          addBench(posX + 13, zNegativeSide, 0);
        } else if (randRightN > 0.58) {
          addPhoneBooth(posX + 13, zNegativeSide, 0);
        } else if (randRightN > 0.46) {
          addNewspaperBox(posX + 13, zNegativeSide, 0);
        } else if (randRightN > 0.34) {
          addTrashCan(posX + 13, zNegativeSide);
        } else if (randRightN > 0.24) {
          addFireHydrant(posX + 13, zNegativeSide);
        }

        // Spawn streetlight (excluding intersections)
        if (gridX % 2 === 0 && !isIntersection) {
          const sy = posZ + roadWidth/2 + sidewalkWidth/2;
          const isLED = Math.sin(posX * 5.0 + sy * 3.0) > 0.0;
          const lightColor = isLED ? 0xd2e5ff : 0xffd5a1;

          // Main streetlight (Positive side)
          const slObject = new THREE.Group();
          const h = this.getBaseHeight(posX, sy);
          slObject.position.set(posX, 4.25 + h, sy); // Centered at Center of Mass (y=4.25)
          group.add(slObject);

          // Pole mesh local
          const pole = new THREE.Mesh(new THREE.BoxGeometry(0.3, 8.5, 0.3), this.streetlightPoleMat);
          pole.position.y = 0; // Centered at local origin
          pole.castShadow = true;
          slObject.add(pole);

          // Streetlight arm/handle (extends along Z, towards the road)
          const arm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 1.3), this.streetlightPoleMat);
          arm.position.set(0, 4.15, -0.65);
          arm.castShadow = true;
          slObject.add(arm);
          
          // Bulb geometry local (local y offset is 8.4 - 4.25 = 4.15)
          const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.6), this.streetlightBulbMat);
          bulb.position.set(0, 4.15, -1.3);
          slObject.add(bulb);

          // Baked ground light pool under streetlight 1
          const poolMesh1 = new THREE.Mesh(
            this.lightPoolGeo,
            (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
          );
          poolMesh1.position.set(0, -3.89, -1.3);
          slObject.add(poolMesh1);

          // Add glowing lens flare sprite
          const flare = new THREE.Sprite(new THREE.SpriteMaterial({
            map: this.slFlareTex,
            color: lightColor,
            transparent: true,
            opacity: 0.70,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          }));
          flare.position.set(0, 4.15, -1.3);
          flare.scale.set(3.8, 3.8, 1.0);
          slObject.add(flare);

          // Register main street lights in the lights pool with poolMesh reference for cross-fading
          const lightSrc1 = {
            x: posX,
            y: 7.5 + h,
            z: sy - 1.3,
            intensity: 26.0,
            color: lightColor,
            poolMesh: poolMesh1,
            defaultOpacity: isLED ? 0.16 : 0.22
          };
          lights.push(lightSrc1);

          // Register in the breakables array
          this.breakables.push({
            type: 'streetlight',
            position: new THREE.Vector3(posX, h, sy),
            group: slObject,
            flares: [flare],
            lights: [lightSrc1],
            poolMeshes: [poolMesh1],
            broken: false,
            tileX: posX,
            tileZ: posZ,
            velocity: new THREE.Vector3(),
            angularVelocity: new THREE.Vector3()
          });

          // Second streetlight on the opposite side (30% chance)
          const isDoubleArm = (Math.sin(posX * 1.2 + sy * 2.8) - Math.floor(Math.sin(posX * 1.2 + sy * 2.8))) > 0.70;
          if (isDoubleArm) {
            const sy2 = posZ - roadWidth/2 - sidewalkWidth/2;
            const slObject2 = new THREE.Group();
            const h2 = this.getBaseHeight(posX, sy2);
            slObject2.position.set(posX, 4.25 + h2, sy2);
            group.add(slObject2);

            const pole2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 8.5, 0.3), this.streetlightPoleMat);
            pole2.position.y = 0;
            pole2.castShadow = true;
            slObject2.add(pole2);

            // Streetlight arm/handle (extends along Z, towards the road)
            const arm2 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 1.3), this.streetlightPoleMat);
            arm2.position.set(0, 4.15, 0.65);
            arm2.castShadow = true;
            slObject2.add(arm2);

            const bulb2 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.6), this.streetlightBulbMat);
            bulb2.position.set(0, 4.15, 1.3); // Offset towards the road (+Z)
            slObject2.add(bulb2);

            const poolMesh2 = new THREE.Mesh(
              this.lightPoolGeo,
              (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
            );
            poolMesh2.position.set(0, -3.89, 1.3);
            slObject2.add(poolMesh2);

            const flare2 = new THREE.Sprite(new THREE.SpriteMaterial({
              map: this.slFlareTex,
              color: lightColor,
              transparent: true,
              opacity: 0.70,
              blending: THREE.AdditiveBlending,
              depthWrite: false
            }));
            flare2.position.set(0, 4.15, 1.3);
            flare2.scale.set(3.8, 3.8, 1.0);
            slObject2.add(flare2);

            const lightSrc2 = {
              x: posX,
              y: 7.5 + h2,
              z: sy2 + 1.3,
              intensity: 26.0,
              color: lightColor,
              poolMesh: poolMesh2,
              defaultOpacity: isLED ? 0.16 : 0.22
            };
            lights.push(lightSrc2);

            this.breakables.push({
              type: 'streetlight',
              position: new THREE.Vector3(posX, h2, sy2),
              group: slObject2,
              flares: [flare2],
              lights: [lightSrc2],
              poolMeshes: [poolMesh2],
              broken: false,
              tileX: posX,
              tileZ: posZ,
              velocity: new THREE.Vector3(),
              angularVelocity: new THREE.Vector3()
            });
          }
        }
      } 
      else {
        // Build dynamic horizontal road mesh matching roadWidth (rwX)
        const road = new THREE.Group();
        
        const asphaltGeo = new THREE.BoxGeometry(roadWidth, 0.2, this.tileSize, 4, 1, 8);
        asphaltGeo.translate(0, 0.1, 0);
        this.deformGeometryToHills(asphaltGeo, posX, posZ);
        const asphalt = new THREE.Mesh(asphaltGeo, this.asphaltMat);
        asphalt.receiveShadow = true;
        road.add(asphalt);

        const sw1 = new THREE.BoxGeometry(sidewalkWidth, 0.35, this.tileSize, 2, 1, 8);
        applySidewalkUVs(sw1);
        sw1.translate(roadWidth/2 + sidewalkWidth/2, 0.175, 0);
        const sw2 = new THREE.BoxGeometry(sidewalkWidth, 0.35, this.tileSize, 2, 1, 8);
        applySidewalkUVs(sw2);
        sw2.translate(-roadWidth/2 - sidewalkWidth/2, 0.175, 0);
        const mergedConcrete = BufferGeometryUtils.mergeGeometries([sw1, sw2]);
        this.deformGeometryToHills(mergedConcrete, posX, posZ);
        const concreteMesh = new THREE.Mesh(mergedConcrete, this.concreteMat);
        concreteMesh.receiveShadow = true;
        road.add(concreteMesh);

        const div1 = new THREE.BoxGeometry(0.15, 0.22, this.tileSize, 1, 1, 8);
        div1.translate(-0.2, 0.11, 0);
        const div2 = new THREE.BoxGeometry(0.15, 0.22, this.tileSize, 1, 1, 8);
        div2.translate(0.2, 0.11, 0);
        const mergedYellow = BufferGeometryUtils.mergeGeometries([div1, div2]);
        this.deformGeometryToHills(mergedYellow, posX, posZ);
        road.add(new THREE.Mesh(mergedYellow, this.yellowLineMat));

        randomizeRoadUVs(road);
        road.position.set(posX, 0, posZ);
        group.add(road);

        // Spawn a tree or flat road ramp
        const seed = Math.sin(gridZ * 53.1198) * 43758.5453;
        const rand = seed - Math.floor(seed);
        
        const xPositiveSide = posX + roadWidth/2 + sidewalkWidth/2;
        const xNegativeSide = posX - roadWidth/2 - sidewalkWidth/2;

        // Negative Side sidewalk (Z offset -13)
        const randLeft = (rand * 10) - Math.floor(rand * 10);
        if (randLeft > 0.85) {
          addTree(xNegativeSide, posZ - 13);
        } else if (randLeft > 0.70) {
          addBench(xNegativeSide, posZ - 13, -Math.PI / 2); // facing towards road (+X)
        } else if (randLeft > 0.58) {
          addPhoneBooth(xNegativeSide, posZ - 13, -Math.PI / 2);
        } else if (randLeft > 0.46) {
          addNewspaperBox(xNegativeSide, posZ - 13, -Math.PI / 2);
        } else if (randLeft > 0.34) {
          addTrashCan(xNegativeSide, posZ - 13);
        } else if (randLeft > 0.24) {
          addFireHydrant(xNegativeSide, posZ - 13);
        }

        // Negative Side sidewalk (Z offset +13)
        const randRight = (rand * 100) - Math.floor(rand * 100);
        if (randRight > 0.85) {
          addTree(xNegativeSide, posZ + 13);
        } else if (randRight > 0.70) {
          addBench(xNegativeSide, posZ + 13, -Math.PI / 2);
        } else if (randRight > 0.58) {
          addPhoneBooth(xNegativeSide, posZ + 13, -Math.PI / 2);
        } else if (randRight > 0.46) {
          addNewspaperBox(xNegativeSide, posZ + 13, -Math.PI / 2);
        } else if (randRight > 0.34) {
          addTrashCan(xNegativeSide, posZ + 13);
        } else if (randRight > 0.24) {
          addFireHydrant(xNegativeSide, posZ + 13);
        }

        // Positive Side sidewalk (Z offset -13)
        const randLeftP = (rand * 1000) - Math.floor(rand * 1000);
        if (randLeftP > 0.85) {
          addTree(xPositiveSide, posZ - 13);
        } else if (randLeftP > 0.70) {
          addBench(xPositiveSide, posZ - 13, Math.PI / 2); // facing towards road (-X)
        } else if (randLeftP > 0.58) {
          addPhoneBooth(xPositiveSide, posZ - 13, Math.PI / 2);
        } else if (randLeftP > 0.46) {
          addNewspaperBox(xPositiveSide, posZ - 13, Math.PI / 2);
        } else if (randLeftP > 0.34) {
          addTrashCan(xPositiveSide, posZ - 13);
        } else if (randLeftP > 0.24) {
          addFireHydrant(xPositiveSide, posZ - 13);
        }

        // Positive Side sidewalk (Z offset +13)
        const randRightP = (rand * 10000) - Math.floor(rand * 10000);
        if (randRightP > 0.85) {
          addTree(xPositiveSide, posZ + 13);
        } else if (randRightP > 0.70) {
          addBench(xPositiveSide, posZ + 13, Math.PI / 2);
        } else if (randRightP > 0.58) {
          addPhoneBooth(xPositiveSide, posZ + 13, Math.PI / 2);
        } else if (randRightP > 0.46) {
          addNewspaperBox(xPositiveSide, posZ + 13, Math.PI / 2);
        } else if (randRightP > 0.34) {
          addTrashCan(xPositiveSide, posZ + 13);
        } else if (randRightP > 0.24) {
          addFireHydrant(xPositiveSide, posZ + 13);
         // Spawn streetlight (excluding intersections)
        if (gridZ % 2 === 0 && !isIntersection) {
          const sx = posX + roadWidth/2 + sidewalkWidth/2;
          const isLED = Math.sin(sx * 5.0 + posZ * 3.0) > 0.0;
          const lightColor = isLED ? 0xd2e5ff : 0xffd5a1;

          // Main streetlight (Positive side)
          const slObject = new THREE.Group();
          const h = this.getBaseHeight(sx, posZ);
          slObject.position.set(sx, 4.25 + h, posZ); // Centered at Center of Mass (y=4.25)
          group.add(slObject);

          // Pole mesh local
          const pole = new THREE.Mesh(new THREE.BoxGeometry(0.3, 8.5, 0.3), this.streetlightPoleMat);
          pole.position.y = 0; // Centered at local origin
          pole.castShadow = true;
          slObject.add(pole);

          // Streetlight arm/handle (extends along X, towards the road)
          const arm = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.15, 0.15), this.streetlightPoleMat);
          arm.position.set(-0.65, 4.15, 0);
          arm.castShadow = true;
          slObject.add(arm);
          
          // Bulb geometry local (local y offset is 8.4 - 4.25 = 4.15)
          const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.6), this.streetlightBulbMat);
          bulb.position.set(-1.3, 4.15, 0);
          slObject.add(bulb);

          // Baked ground light pool under streetlight 1
          const poolMesh1 = new THREE.Mesh(
            this.lightPoolGeo,
            (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
          );
          poolMesh1.position.set(-1.3, -3.89, 0);
          slObject.add(poolMesh1);

          // Add glowing lens flare sprite
          const flare = new THREE.Sprite(new THREE.SpriteMaterial({
            map: this.slFlareTex,
            color: lightColor,
            transparent: true,
            opacity: 0.70,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          }));
          flare.position.set(-1.3, 4.15, 0);
          flare.scale.set(3.8, 3.8, 1.0);
          slObject.add(flare);

          // Register main street lights in the lights pool with poolMesh reference for cross-fading
          const lightSrc1 = {
            x: sx - 1.3,
            y: 7.5 + h,
            z: posZ,
            intensity: 26.0,
            color: lightColor,
            poolMesh: poolMesh1,
            defaultOpacity: isLED ? 0.16 : 0.22
          };
          lights.push(lightSrc1);

          // Register in the breakables array
          this.breakables.push({
            type: 'streetlight',
            position: new THREE.Vector3(sx, h, posZ),
            group: slObject,
            flares: [flare],
            lights: [lightSrc1],
            poolMeshes: [poolMesh1],
            broken: false,
            tileX: posX,
            tileZ: posZ,
            velocity: new THREE.Vector3(),
            angularVelocity: new THREE.Vector3()
          });

          // Second streetlight on the opposite side (30% chance)
          const isDoubleArm = (Math.sin(sx * 1.2 + posZ * 2.8) - Math.floor(Math.sin(sx * 1.2 + posZ * 2.8))) > 0.70;
          if (isDoubleArm) {
            const sx2 = posX - roadWidth/2 - sidewalkWidth/2;
            const slObject2 = new THREE.Group();
            const h2 = this.getBaseHeight(sx2, posZ);
            slObject2.position.set(sx2, 4.25 + h2, posZ);
            group.add(slObject2);

            const pole2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 8.5, 0.3), this.streetlightPoleMat);
            pole2.position.y = 0;
            pole2.castShadow = true;
            slObject2.add(pole2);

            // Streetlight arm/handle (extends along X, towards the road)
            const arm2 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.15, 0.15), this.streetlightPoleMat);
            arm2.position.set(0.65, 4.15, 0);
            arm2.castShadow = true;
            slObject2.add(arm2);

            const bulb2 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.6), this.streetlightBulbMat);
            bulb2.position.set(1.3, 4.15, 0); // Offset towards the road (+X)
            slObject2.add(bulb2);

            const poolMesh2 = new THREE.Mesh(
              this.lightPoolGeo,
              (isLED ? this.ledGroundLightPoolMat : this.sodiumGroundLightPoolMat).clone()
            );
            poolMesh2.position.set(1.3, -3.89, 0);
            slObject2.add(poolMesh2);

            const flare2 = new THREE.Sprite(new THREE.SpriteMaterial({
              map: this.slFlareTex,
              color: lightColor,
              transparent: true,
              opacity: 0.70,
              blending: THREE.AdditiveBlending,
              depthWrite: false
            }));
            flare2.position.set(1.3, 4.15, 0);
            flare2.scale.set(3.8, 3.8, 1.0);
            slObject2.add(flare2);

            const lightSrc2 = {
              x: sx2 + 1.3,
              y: 7.5 + h2,
              z: posZ,
              intensity: 26.0,
              color: lightColor,
              poolMesh: poolMesh2,
              defaultOpacity: isLED ? 0.16 : 0.22
            };
            lights.push(lightSrc2);

            this.breakables.push({
              type: 'streetlight',
              position: new THREE.Vector3(sx2, h2, posZ),
              group: slObject2,
              flares: [flare2],
              lights: [lightSrc2],
              poolMeshes: [poolMesh2],
              broken: false,
              tileX: posX,
              tileZ: posZ,
              velocity: new THREE.Vector3(),
              angularVelocity: new THREE.Vector3()
            });
          }
        }
        }
      }
    }

    // Merge & instantiate collected geometries to minimize draw calls
    if (localPoles.length > 0) {
      const mergedPoles = BufferGeometryUtils.mergeGeometries(localPoles);
      const poleMesh = new THREE.Mesh(mergedPoles, this.streetlightPoleMat);
      poleMesh.castShadow = true;
      group.add(poleMesh);
    }
    if (localBulbs.length > 0) {
      const mergedBulbs = BufferGeometryUtils.mergeGeometries(localBulbs);
      const bulbMesh = new THREE.Mesh(mergedBulbs, this.streetlightBulbMat);
      group.add(bulbMesh);
    }
    if (localTrunks.length > 0) {
      const mergedTrunks = BufferGeometryUtils.mergeGeometries(localTrunks);
      const trunkMesh = new THREE.Mesh(mergedTrunks, this.trunkMat);
      trunkMesh.castShadow = true;
      group.add(trunkMesh);
    }
    if (localLeaves.length > 0) {
      const mergedLeaves = BufferGeometryUtils.mergeGeometries(localLeaves);
      const leavesMesh = new THREE.Mesh(mergedLeaves, this.leafMat);
      leavesMesh.castShadow = true;
      group.add(leavesMesh);
    }
    if (localLeavesCherry.length > 0) {
      const mergedLeaves = BufferGeometryUtils.mergeGeometries(localLeavesCherry);
      const leavesMesh = new THREE.Mesh(mergedLeaves, this.leafCherryMat);
      leavesMesh.castShadow = true;
      group.add(leavesMesh);
    }
    if (localLeavesAutumn.length > 0) {
      const mergedLeaves = BufferGeometryUtils.mergeGeometries(localLeavesAutumn);
      const leavesMesh = new THREE.Mesh(mergedLeaves, this.leafAutumnMat);
      leavesMesh.castShadow = true;
      group.add(leavesMesh);
    }
  }

  buildAlleyTile(gridX, gridZ, posX, posZ, group, obstacles, lights) {
    const matIndex = Math.abs(gridX * 17 + gridZ * 23) % this.asphaltMaterials.length;
    const chosenMat = this.asphaltMaterials[matIndex];

    // Alley floor: dark gritty concrete or asphalt (using high-quality asphalt materials)
    const floorGeo = new THREE.BoxGeometry(this.tileSize, 0.2, this.tileSize, 8, 1, 8);
    floorGeo.translate(posX, 0.1, posZ);
    this.deformGeometryToHills(floorGeo, 0, 0);

    // Shift UV mapping deterministically to prevent puddle/texture repetition
    const ox = Math.abs((gridX * 0.317 + gridZ * 0.713) % 1.0);
    const oy = Math.abs((gridX * 0.893 + gridZ * 0.149) % 1.0);
    const uvs = floorGeo.attributes.uv;
    for (let i = 0; i < uvs.count; i++) {
      uvs.setXY(i, uvs.getX(i) + ox, uvs.getY(i) + oy);
    }
    uvs.needsUpdate = true;

    const floorMesh = new THREE.Mesh(floorGeo, chosenMat);
    floorMesh.receiveShadow = true;
    group.add(floorMesh);

    const isNS = this.shortcutColumns.has(gridX);
    const isEW = this.shortcutRows.has(gridZ);

    const seed = Math.sin(gridX * 12.9898 + gridZ * 78.233) * 43758.5453;
    const rand = seed - Math.floor(seed);

    const addBox = (lx, lz, sx, sy, sz) => {
      const h = this.getBaseHeight(posX + lx, posZ + lz);
      const boxGeo = new THREE.BoxGeometry(sx, sy, sz);
      boxGeo.translate(posX + lx, 0.35 + h + sy/2, posZ + lz);
      const boxMesh = new THREE.Mesh(boxGeo, this.doorMat); // Wooden crate style
      boxMesh.castShadow = true;
      boxMesh.receiveShadow = true;
      group.add(boxMesh);
      obstacles.push({
        xMin: posX + lx - sx/2,
        xMax: posX + lx + sx/2,
        zMin: posZ + lz - sz/2,
        zMax: posZ + lz + sz/2,
        height: sy
      });
    };

    const addTrashBin = (lx, lz) => {
      const h = this.getBaseHeight(posX + lx, posZ + lz);
      const binGeo = new THREE.BoxGeometry(1.4, 2.2, 1.4);
      binGeo.translate(posX + lx, 0.35 + h + 1.1, posZ + lz);
      const binMesh = new THREE.Mesh(binGeo, this.accessoryMat); // Metallic grey bin
      binMesh.castShadow = true;
      binMesh.receiveShadow = true;
      group.add(binMesh);
      obstacles.push({
        xMin: posX + lx - 0.7,
        xMax: posX + lx + 0.7,
        zMin: posZ + lz - 0.7,
        zMax: posZ + lz + 0.7,
        height: 2.2
      });
    };

    const addDumpster = (lx, lz, rotationY = 0) => {
      const dumpsterGroup = new THREE.Group();
      const h = this.getBaseHeight(posX + lx, posZ + lz);
      
      // Dumpster Body
      const bodyGeo = new THREE.BoxGeometry(3.2, 2.2, 2.0);
      const bodyMesh = new THREE.Mesh(bodyGeo, this.dumpsterMat);
      bodyMesh.position.y = 1.1;
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      dumpsterGroup.add(bodyMesh);

      // Dumpster Lid
      const lidGeo = new THREE.BoxGeometry(3.4, 0.15, 2.1);
      const lidMesh = new THREE.Mesh(lidGeo, this.trashBagMat);
      lidMesh.position.y = 2.2 + 0.075;
      lidMesh.castShadow = true;
      dumpsterGroup.add(lidMesh);

      dumpsterGroup.position.set(posX + lx, 0.35 + h, posZ + lz);
      dumpsterGroup.rotation.y = rotationY;
      group.add(dumpsterGroup);

      obstacles.push({
        xMin: posX + lx - 1.7,
        xMax: posX + lx + 1.7,
        zMin: posZ + lz - 1.1,
        zMax: posZ + lz + 1.1,
        height: 2.5
      });
    };

    const addCardboardBoxes = (lx, lz) => {
      const h = this.getBaseHeight(posX + lx, posZ + lz);
      // Base box
      const box1Geo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
      const box1 = new THREE.Mesh(box1Geo, this.cardboardMat);
      box1.position.set(posX + lx, 0.35 + h + 0.8, posZ + lz);
      box1.rotation.y = rand * 2.0;
      box1.castShadow = true;
      box1.receiveShadow = true;
      group.add(box1);

      // Stacked box on top (slightly smaller and rotated)
      if (rand > 0.45) {
        const box2Geo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
        const box2 = new THREE.Mesh(box2Geo, this.cardboardMat);
        box2.position.set(posX + lx + (rand - 0.5) * 0.4, 0.35 + h + 1.6 + 0.6, posZ + lz + (rand - 0.5) * 0.4);
        box2.rotation.y = (rand + 1) * 3.5;
        box2.castShadow = true;
        group.add(box2);
      }

      obstacles.push({
        xMin: posX + lx - 0.9,
        xMax: posX + lx + 0.9,
        zMin: posZ + lz - 0.9,
        zMax: posZ + lz + 0.9,
        height: 2.8
      });
    };

    const addTrashBags = (lx, lz) => {
      const h = this.getBaseHeight(posX + lx, posZ + lz);
      const numBags = 2 + Math.floor(rand * 2);
      for (let i = 0; i < numBags; i++) {
        const size = 0.8 + (i * 0.15);
        const bagGeo = new THREE.BoxGeometry(size, size, size);
        const bag = new THREE.Mesh(bagGeo, this.trashBagMat);
        
        const offsetX = (i === 0 ? 0 : (i === 1 ? 0.6 : -0.6)) + (rand - 0.5) * 0.2;
        const offsetZ = (i === 0 ? 0 : (i === 1 ? -0.4 : 0.5)) + (rand - 0.5) * 0.2;
        
        bag.position.set(posX + lx + offsetX, 0.35 + h + size/2, posZ + lz + offsetZ);
        bag.rotation.set(rand * 2.0, rand * 3.0, rand * 1.5);
        bag.castShadow = true;
        group.add(bag);
      }
      
      obstacles.push({
        xMin: posX + lx - 1.2,
        xMax: posX + lx + 1.2,
        zMin: posZ + lz - 1.2,
        zMax: posZ + lz + 1.2,
        height: 1.2
      });
    };

    const addUtilityPole = (lx, lz) => {
      const poleGroup = new THREE.Group();
      const h = this.getBaseHeight(posX + lx, posZ + lz);

      // Main wooden vertical pole
      const poleGeo = new THREE.BoxGeometry(0.6, 9.5, 0.6);
      const pole = new THREE.Mesh(poleGeo, this.woodPoleMat);
      pole.position.y = 4.75;
      pole.castShadow = true;
      pole.receiveShadow = true;
      poleGroup.add(pole);

      // Horizontal crossbar
      const crossGeo = new THREE.BoxGeometry(2.4, 0.3, 0.4);
      const cross = new THREE.Mesh(crossGeo, this.woodPoleMat);
      cross.position.set(0, 8.5, 0);
      cross.castShadow = true;
      poleGroup.add(cross);

      // Metal fixture hanging down
      const fixtureGeo = new THREE.BoxGeometry(0.8, 0.5, 0.8);
      const fixture = new THREE.Mesh(fixtureGeo, this.accessoryMat);
      fixture.position.set(0, 8.1, 0);
      poleGroup.add(fixture);

      // Emissive bulb
      const bulbGeo = new THREE.BoxGeometry(0.4, 0.3, 0.4);
      const bulb = new THREE.Mesh(bulbGeo, this.streetlightBulbMat);
      bulb.position.set(0, 7.8, 0);
      poleGroup.add(bulb);

      poleGroup.position.set(posX + lx, 0.35 + h, posZ + lz);
      group.add(poleGroup);

      // Baked ground light pool under utility pole
      const poolMesh = new THREE.Mesh(
        this.alleyLightPoolGeo,
        this.sodiumGroundLightPoolMat.clone()
      );
      poolMesh.position.set(posX + lx, 0.36 + h, posZ + lz);
      group.add(poolMesh);

      // Add a working point light
      lights.push({
        x: posX + lx,
        y: 8.0 + h,
        z: posZ + lz,
        intensity: 15.0, // Boosted to make it feel bright in the dark alley
        color: 0xffaa44, // Warm amber/orange
        poolMesh: poolMesh,
        defaultOpacity: 0.35
      });

      obstacles.push({
        xMin: posX + lx - 0.4,
        xMax: posX + lx + 0.4,
        zMin: posZ + lz - 0.4,
        zMax: posZ + lz + 0.4,
        height: 9.5
      });
    };

    const addDumpsterRamp = (lx, lz, slopeType, slopeDir) => {
      // 1. Spawn Dumpster Group
      const dumpsterGroup = new THREE.Group();
      const h = this.getBaseHeight(posX + lx, posZ + lz);
      const bodyGeo = new THREE.BoxGeometry(3.2, 2.2, 2.0);
      const bodyMesh = new THREE.Mesh(bodyGeo, this.dumpsterMat);
      bodyMesh.position.y = 1.1;
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      dumpsterGroup.add(bodyMesh);

      const lidGeo = new THREE.BoxGeometry(3.4, 0.15, 2.1);
      const lidMesh = new THREE.Mesh(lidGeo, this.trashBagMat);
      lidMesh.position.y = 2.2 + 0.075;
      lidMesh.castShadow = true;
      dumpsterGroup.add(lidMesh);

      if (slopeType === 'X') {
        dumpsterGroup.rotation.y = Math.PI / 2;
      }
      dumpsterGroup.position.set(posX + lx, 0.35 + h, posZ + lz);
      group.add(dumpsterGroup);
      const plankGeo = new THREE.BoxGeometry(slopeType === 'Z' ? 2.6 : 3.4, 0.12, slopeType === 'Z' ? 3.4 : 2.6);
      const plankMesh = new THREE.Mesh(plankGeo, this.woodPoleMat);
      plankMesh.castShadow = true;
      plankMesh.receiveShadow = true;

      if (slopeType === 'Z') {
        if (slopeDir === 1) { // Slopes up along +Z (plank runs from south to north)
          plankMesh.rotation.x = Math.PI / 8.5;
          plankMesh.position.set(posX + lx, 0.35 + h + 0.95, posZ + lz - 2.0);
        } else { // Slopes up along -Z
          plankMesh.rotation.x = -Math.PI / 8.5;
          plankMesh.position.set(posX + lx, 0.35 + h + 0.95, posZ + lz + 2.0);
        }
      } else { // X Slope
        if (slopeDir === 1) { // Slopes up along +X
          plankMesh.rotation.z = -Math.PI / 8.5;
          plankMesh.position.set(posX + lx - 2.0, 0.35 + h + 0.95, posZ + lz);
        } else { // Slopes up along -X
          plankMesh.rotation.z = Math.PI / 8.5;
          plankMesh.position.set(posX + lx + 2.0, 0.35 + h + 0.95, posZ + lz);
        }
      }
      group.add(plankMesh);

      // 3. Register ramp obstacle
      const wX = slopeType === 'Z' ? 1.6 : 3.7;
      const wZ = slopeType === 'Z' ? 3.7 : 1.6;
      obstacles.push({
        xMin: posX + lx - wX,
        xMax: posX + lx + wX,
        zMin: posZ + lz - wZ,
        zMax: posZ + lz + wZ,
        height: 2.25,
        isRamp: true,
        slopeType: slopeType,
        slopeDir: slopeDir
      });
    };

    const addLogRamp = (lx, lz, slopeType, slopeDir) => {
      const logGroup = new THREE.Group();
      const h = this.getBaseHeight(posX + lx, posZ + lz);
      const numLogs = 4;
      const logLength = 3.2;
      const logRadius = 0.4;
      
      const logGeo = new THREE.CylinderGeometry(logRadius, logRadius, logLength, 8);
      if (slopeType === 'Z') {
        logGeo.rotateZ(Math.PI / 2);
      } else {
        logGeo.rotateX(Math.PI / 2);
      }

      for (let i = 0; i < numLogs; i++) {
        const stepVal = (i - 1.5) * 0.78 * slopeDir;
        const stepY = logRadius + i * 0.42;
        
        const logMesh = new THREE.Mesh(logGeo, this.woodPoleMat);
        if (slopeType === 'Z') {
          logMesh.position.set(0, stepY, stepVal);
        } else {
          logMesh.position.set(stepVal, stepY, 0);
        }
        logMesh.castShadow = true;
        logMesh.receiveShadow = true;
        logGroup.add(logMesh);
      }

      logGroup.position.set(posX + lx, 0.35 + h, posZ + lz);
      group.add(logGroup);

      // Register ramp obstacle
      obstacles.push({
        xMin: posX + lx - 1.6,
        xMax: posX + lx + 1.6,
        zMin: posZ + lz - 1.6,
        zMax: posZ + lz + 1.6,
        height: logRadius + numLogs * 0.42 + 0.1,
        isRamp: true,
        slopeType: slopeType,
        slopeDir: slopeDir
      });
    };

    if (isNS && !isEW) {
      // NS Alley: place props along left (lx = -13) and right (lx = 13) edges to keep center clear
      // Guaranteed Utility Pole for lighting on one side
      if (rand < 0.5) {
        addUtilityPole(-13, -8);
        addBox(13, 5, 2.5, 2.5, 2.5);
      } else {
        addUtilityPole(13, 8);
        addBox(-13, -8, 2.5, 2.5, 2.5);
      }

      // Decorative minor trash/cardboard details
      if (rand > 0.6) {
        addTrashBin(-13 * (rand < 0.5 ? -1 : 1), 2);
      } else {
        addTrashBags(-13 * (rand < 0.5 ? -1 : 1), 2);
      }
      if (rand > 0.3 && rand < 0.7) {
        addCardboardBoxes(13 * (rand < 0.5 ? -1 : 1), -4);
      }
    } else if (isEW && !isNS) {
      // EW Alley: place props along top (lz = -13) and bottom (lz = 13) edges to keep center clear
      // Guaranteed Utility Pole for lighting on one side
      if (rand < 0.5) {
        addUtilityPole(-8, -13);
        addBox(5, 13, 2.5, 2.5, 2.5);
      } else {
        addUtilityPole(8, 13);
        addBox(-8, -13, 2.5, 2.5, 2.5);
      }

      // Decorative minor trash/cardboard details
      if (rand > 0.6) {
        addTrashBin(2, -13 * (rand < 0.5 ? -1 : 1));
      } else {
        addTrashBags(2, -13 * (rand < 0.5 ? -1 : 1));
      }
      if (rand > 0.3 && rand < 0.7) {
        addCardboardBoxes(-4, 13 * (rand < 0.5 ? -1 : 1));
      }
    } else if (isNS && isEW) {
      // Alley-Alley Intersection: keep intersection center clear, place props in corners
      // Guaranteed Utility Pole for lighting in one corner
      if (rand < 0.5) {
        addUtilityPole(-13, 13);
        addTrashBags(13, -13);
      } else {
        addUtilityPole(13, -13);
        addTrashBags(-13, 13);
      }
    }
  }

  spawnTemplateTree(x, z, group, obstacles) {
    const seed = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453;
    const rand = seed - Math.floor(seed);
    
    // Choose template based on shape and color
    let template;
    if (rand < 0.5) {
      // Pine shape
      if (rand < 0.1) {
        template = this.templates.treeAutumn;
      } else if (rand < 0.25) {
        template = this.templates.treeCherry;
      } else {
        template = this.templates.treeGreen;
      }
    } else {
      // Round shape
      if (rand > 0.9) {
        template = this.templates.treeRoundAutumn;
      } else if (rand > 0.75) {
        template = this.templates.treeRoundCherry;
      } else {
        template = this.templates.treeRoundGreen;
      }
    }
    
    const tree = template.clone();
    
    // Random scale for size variety (between 0.7 and 1.35)
    const scale = 0.7 + rand * 0.65;
    tree.scale.set(scale, scale, scale);
    
    const h = this.getBaseHeight(x, z);
    tree.position.set(x, 0.35 + h, z);
    group.add(tree);

    obstacles.push({
      xMin: x - 0.4 * scale,
      xMax: x + 0.4 * scale,
      zMin: z - 0.4 * scale,
      zMax: z + 0.4 * scale,
      height: 6 * scale
    });
  }

  createBenchMesh() {
    const benchGroup = new THREE.Group();
    // Seat (y centered at 0.6, seat is at y=0.5, so local y = -0.1)
    const seat = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.1, 0.8), this.benchWoodMat);
    seat.position.set(0, -0.1, 0);
    seat.castShadow = true;
    seat.receiveShadow = true;
    benchGroup.add(seat);

    // Backrest (local y = 0.25, z = -0.35)
    const backrest = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.6, 0.1), this.benchWoodMat);
    backrest.position.set(0, 0.25, -0.35);
    backrest.castShadow = true;
    benchGroup.add(backrest);

    // Legs (local y = -0.35)
    const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.8), this.benchIronMat);
    leg1.position.set(-0.9, -0.35, 0);
    leg1.castShadow = true;
    benchGroup.add(leg1);

    const leg2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.8), this.benchIronMat);
    leg2.position.set(0.9, -0.35, 0);
    leg2.castShadow = true;
    benchGroup.add(leg2);

    return benchGroup;
  }

  createPhoneBoothMesh() {
    const pbGroup = new THREE.Group();
    // Base (y centered at 1.4, base is at y=0.075, so local y = -1.325)
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.15, 1.2), this.phoneBoothFrameMat);
    base.position.set(0, -1.325, 0);
    base.castShadow = true;
    base.receiveShadow = true;
    pbGroup.add(base);

    // Roof (local y = 1.325)
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.15, 1.2), this.phoneBoothFrameMat);
    roof.position.set(0, 1.325, 0);
    roof.castShadow = true;
    pbGroup.add(roof);

    // Pillars (4 corners)
    const pillarGeo = new THREE.BoxGeometry(0.1, 2.5, 0.1);
    const p1 = new THREE.Mesh(pillarGeo, this.phoneBoothFrameMat);
    p1.position.set(-0.55, 0, -0.55);
    p1.castShadow = true;
    pbGroup.add(p1);

    const p2 = new THREE.Mesh(pillarGeo, this.phoneBoothFrameMat);
    p2.position.set(0.55, 0, -0.55);
    p2.castShadow = true;
    pbGroup.add(p2);

    const p3 = new THREE.Mesh(pillarGeo, this.phoneBoothFrameMat);
    p3.position.set(-0.55, 0, 0.55);
    p3.castShadow = true;
    pbGroup.add(p3);

    const p4 = new THREE.Mesh(pillarGeo, this.phoneBoothFrameMat);
    p4.position.set(0.55, 0, 0.55);
    p4.castShadow = true;
    pbGroup.add(p4);

    // Glass Panes (Left, Right, Back)
    const glassSide = new THREE.Mesh(new THREE.BoxGeometry(0.04, 2.3, 1.0), this.phoneBoothGlassMat);
    glassSide.position.set(-0.54, 0, 0);
    pbGroup.add(glassSide);

    const glassSide2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 2.3, 1.0), this.phoneBoothGlassMat);
    glassSide2.position.set(0.54, 0, 0);
    pbGroup.add(glassSide2);

    const glassBack = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.3, 0.04), this.phoneBoothGlassMat);
    glassBack.position.set(0, 0, -0.54);
    pbGroup.add(glassBack);

    // Phone box unit inside
    const phoneBox = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, 0.2), this.benchIronMat);
    phoneBox.position.set(0, 0.1, -0.4);
    pbGroup.add(phoneBox);

    // Glowing screen
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.02), this.phoneBoothScreenMat);
    screen.position.set(0, 0.2, -0.29);
    pbGroup.add(screen);

    return pbGroup;
  }

  createTrashCanMesh() {
    const tcGroup = new THREE.Group();
    // Main body (y centered at 0.5, local y = 0)
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.9, 0.6), this.trashCanMat);
    body.position.set(0, -0.05, 0);
    body.castShadow = true;
    body.receiveShadow = true;
    tcGroup.add(body);

    // Lid
    const lid = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.1, 0.64), this.trashCanLidMat);
    lid.position.set(0, 0.45, 0);
    lid.castShadow = true;
    tcGroup.add(lid);

    return tcGroup;
  }

  buildBuildingTile(gridX, gridZ, posX, posZ, group, obstacles, lights) {
    // Helper to check if a neighbor grid cell is a building tile (excluding alleys)
    const isBuildingTile = (gx, gz) => {
      return !this.roadColumns.has(gx) && !this.roadRows.has(gz) && !this.isAlley(gx, gz);
    };

    // Generate building geometries (remains merged for high performance)
    const seed = Math.sin(gridX * 12.9898 + gridZ * 78.233) * 43758.5453;
    const rand = seed - Math.floor(seed);
    
    const levelsCount = rand > 0.8 ? 4 : (rand > 0.45 ? 3 : 2);
    const bMat = this.materials[Math.floor(rand * this.materials.length)];

    // Calculate bounds relative to tile center (tileSize is 40)
    let xMin = -14;
    let xMax = 14;
    let zMin = -14;
    let zMax = 14;

    // Determine boundaries based on neighbor tiles (roads, alleys, buildings)
    // West (xMin)
    if (isBuildingTile(gridX - 1, gridZ)) {
      xMin = -20;
    } else if (this.isAlley(gridX - 1, gridZ)) {
      // Alley neighbor: randomize width
      const alleySeed = Math.sin((gridX - 1) * 12.9898 + gridZ * 78.233) * 43758.5453;
      const alleyRand = alleySeed - Math.floor(alleySeed);
      if (alleyRand < 0.4) xMin = -19; // narrow alley (building brought closer)
      else if (alleyRand < 0.7) xMin = -16; // medium alley
      else xMin = -13; // wide alley
    } else if (this.roadColumns.has(gridX - 1) || this.roadRows.has(gridZ)) {
      // Road neighbor
      const { rwX } = this.getRoadWidthForGrid(gridX - 1, gridZ);
      if (rwX === 14 && rand < 0.5) {
        xMin = -19; // bring buildings closer sometimes for narrow roads
      }
    }

    // East (xMax)
    if (isBuildingTile(gridX + 1, gridZ)) {
      xMax = 20;
    } else if (this.isAlley(gridX + 1, gridZ)) {
      const alleySeed = Math.sin((gridX + 1) * 12.9898 + gridZ * 78.233) * 43758.5453;
      const alleyRand = alleySeed - Math.floor(alleySeed);
      if (alleyRand < 0.4) xMax = 19;
      else if (alleyRand < 0.7) xMax = 16;
      else xMax = 13;
    } else if (this.roadColumns.has(gridX + 1) || this.roadRows.has(gridZ)) {
      const { rwX } = this.getRoadWidthForGrid(gridX + 1, gridZ);
      if (rwX === 14 && rand > 0.5) {
        xMax = 19;
      }
    }

    // North (zMin)
    if (isBuildingTile(gridX, gridZ - 1)) {
      zMin = -20;
    } else if (this.isAlley(gridX, gridZ - 1)) {
      const alleySeed = Math.sin(gridX * 12.9898 + (gridZ - 1) * 78.233) * 43758.5453;
      const alleyRand = alleySeed - Math.floor(alleySeed);
      if (alleyRand < 0.4) zMin = -19;
      else if (alleyRand < 0.7) zMin = -16;
      else zMin = -13;
    } else if (this.roadColumns.has(gridX) || this.roadRows.has(gridZ - 1)) {
      const { rwZ } = this.getRoadWidthForGrid(gridX, gridZ - 1);
      if (rwZ === 14 && rand < 0.5) {
        zMin = -19;
      }
    }

    // South (zMax)
    if (isBuildingTile(gridX, gridZ + 1)) {
      zMax = 20;
    } else if (this.isAlley(gridX, gridZ + 1)) {
      const alleySeed = Math.sin(gridX * 12.9898 + (gridZ + 1) * 78.233) * 43758.5453;
      const alleyRand = alleySeed - Math.floor(alleySeed);
      if (alleyRand < 0.4) zMax = 19;
      else if (alleyRand < 0.7) zMax = 16;
      else zMax = 13;
    } else if (this.roadColumns.has(gridX) || this.roadRows.has(gridZ + 1)) {
      const { rwZ } = this.getRoadWidthForGrid(gridX, gridZ + 1);
      if (rwZ === 14 && rand > 0.5) {
        zMax = 19;
      }
    }

    const wX = xMax - xMin;
    const wZ = zMax - zMin;
    const centerX = (xMin + xMax) / 2;
    const centerZ = (zMin + zMax) / 2;

    let currentHeight = 0;
    
    const facadeGeoms = [];
    const windowGeoms = [];
    const doorGeoms = [];
    const accessoryGeoms = [];
    const billboardGeoms = [];
    const beaconGeoms = [];

    // Voxel Columns Configuration
    const colW = 0.8;
    const colOffset = colW / 2;
    const ledgeHeight = 0.8;

    // Layer 1
    const l1Height = 8 + rand * 4;
    const l1Geo = new THREE.BoxGeometry(wX, l1Height, wZ, Math.max(1, Math.round(wX / 2)), 1, Math.max(1, Math.round(wZ / 2)));
    l1Geo.translate(centerX, l1Height / 2, centerZ);
    facadeGeoms.push(l1Geo);

    // Layer 1 Corner Columns (Voxel detailing)
    if (xMin > -20 && zMin > -20) {
      const c = new THREE.BoxGeometry(colW, l1Height, colW);
      c.translate(xMin + colOffset, l1Height / 2, zMin + colOffset);
      facadeGeoms.push(c);
    }
    if (xMax < 20 && zMin > -20) {
      const c = new THREE.BoxGeometry(colW, l1Height, colW);
      c.translate(xMax - colOffset, l1Height / 2, zMin + colOffset);
      facadeGeoms.push(c);
    }
    if (xMin > -20 && zMax < 20) {
      const c = new THREE.BoxGeometry(colW, l1Height, colW);
      c.translate(xMin + colOffset, l1Height / 2, zMax - colOffset);
      facadeGeoms.push(c);
    }
    if (xMax < 20 && zMax < 20) {
      const c = new THREE.BoxGeometry(colW, l1Height, colW);
      c.translate(xMax - colOffset, l1Height / 2, zMax - colOffset);
      facadeGeoms.push(c);
    }

    // Layer 1 Molding Ledge Belt (Voxel detailing)
    const ledge1 = new THREE.BoxGeometry(wX + 0.5, ledgeHeight, wZ + 0.5, Math.max(1, Math.round(wX / 2)), 1, Math.max(1, Math.round(wZ / 2)));
    ledge1.translate(centerX, l1Height - ledgeHeight / 2, centerZ);
    facadeGeoms.push(ledge1);

    // Only generate ground features (doors, signs, shop windows) on street-facing sides (no building neighbor)
    if (zMax < 20) {
      // Front Facade features
      const frontDoor = new THREE.BoxGeometry(2.2, 4.2, 0.2, 2, 1, 1);
      frontDoor.translate(centerX, 2.1, zMax + 0.05);
      doorGeoms.push(frontDoor);

      const shopWinW = 6.0;
      const shopWinH = 4.5;
      const shopWinLeft = createDetailedWindowGeometry(shopWinW, shopWinH, 0.1);
      shopWinLeft.translate(centerX - wX / 4, 2.5, zMax + 0.05);
      windowGeoms.push(shopWinLeft);

      const shopWinRight = createDetailedWindowGeometry(shopWinW, shopWinH, 0.1);
      shopWinRight.translate(centerX + wX / 4, 2.5, zMax + 0.05);
      windowGeoms.push(shopWinRight);

      const shopSignW = 5.8;
      const shopSignH = 1.0;
      const signLeft = new THREE.BoxGeometry(shopSignW, shopSignH, 0.2, Math.max(1, Math.round(shopSignW / 2)), 1, 1);
      signLeft.translate(centerX - wX / 4, 5.4, zMax + 0.1);
      billboardGeoms.push(signLeft);

      const signRight = new THREE.BoxGeometry(shopSignW, shopSignH, 0.2, Math.max(1, Math.round(shopSignW / 2)), 1, 1);
      signRight.translate(centerX + wX / 4, 5.4, zMax + 0.1);
      billboardGeoms.push(signRight);

      const awning = new THREE.BoxGeometry(wX - 2, 0.35, 2.0, Math.max(1, Math.round((wX - 2) / 2)), 1, 1);
      awning.translate(centerX, 6.0, zMax + 1.0);
      accessoryGeoms.push(awning);

      if (wX >= 28) {
        const trashCan = new THREE.BoxGeometry(1.0, 1.6, 1.0);
        trashCan.translate(centerX - wX / 2 + 2.5, 0.8, zMax + 2.0);
        accessoryGeoms.push(trashCan);

        // Sidewalk Bench
        const benchSeat = new THREE.BoxGeometry(3.5, 0.2, 1.0, 3, 1, 1);
        benchSeat.translate(centerX + wX / 2 - 4.0, 0.8, zMax + 2.0);
        accessoryGeoms.push(benchSeat);

        const benchLegL = new THREE.BoxGeometry(0.25, 0.8, 1.0);
        benchLegL.translate(centerX + wX / 2 - 5.5, 0.4, zMax + 2.0);
        accessoryGeoms.push(benchLegL);

        const benchLegR = new THREE.BoxGeometry(0.25, 0.8, 1.0);
        benchLegR.translate(centerX + wX / 2 - 2.5, 0.4, zMax + 2.0);
        accessoryGeoms.push(benchLegR);
      }

      // Storefronts are highly emissive and glow in the dark naturally. We add storefront ground pools
      // and register their light sources to smoothly transition from baked to real-time light near the player.
      const poolMeshL = new THREE.Mesh(
        this.storefrontLightPoolGeo,
        this.storefrontGroundLightPoolMat.clone()
      );
      const hPoolL = this.getBaseHeight(posX + centerX - wX / 4, posZ + zMax + 3.0);
      poolMeshL.position.set(posX + centerX - wX / 4, 0.36 + hPoolL, posZ + zMax + 3.0);
      group.add(poolMeshL);

      const poolMeshR = new THREE.Mesh(
        this.storefrontLightPoolGeo,
        this.storefrontGroundLightPoolMat.clone()
      );
      const hPoolR = this.getBaseHeight(posX + centerX + wX / 4, posZ + zMax + 3.0);
      poolMeshR.position.set(posX + centerX + wX / 4, 0.36 + hPoolR, posZ + zMax + 3.0);
      group.add(poolMeshR);

      const storefrontLightL = {
        x: posX + centerX - wX / 4,
        y: 1.8 + hPoolL,
        z: posZ + zMax + 1.2,
        intensity: 15.0,
        color: 0xffecc4,
        poolMesh: poolMeshL,
        defaultOpacity: 0.30
      };
      lights.push(storefrontLightL);

      const storefrontLightR = {
        x: posX + centerX + wX / 4,
        y: 1.8 + hPoolR,
        z: posZ + zMax + 1.2,
        intensity: 15.0,
        color: 0xffecc4,
        poolMesh: poolMeshR,
        defaultOpacity: 0.30
      };
      lights.push(storefrontLightR);
    }

    if (zMin > -20) {
      // Back Facade features
      const backDoor = new THREE.BoxGeometry(2.2, 4.2, 0.2, 2, 1, 1);
      backDoor.translate(centerX, 2.1, zMin - 0.05);
      doorGeoms.push(backDoor);
    }

    currentHeight += l1Height;

    // Layer 2 Bounds (only inset if facing a road, keep party walls flat)
    const l2_xMin = xMin === -20 ? -20 : xMin + 1.0;
    const l2_xMax = xMax === 20 ? 20 : xMax - 1.0;
    const l2_zMin = zMin === -20 ? -20 : zMin + 1.0;
    const l2_zMax = zMax === 20 ? 20 : zMax - 1.0;

    const wX2 = l2_xMax - l2_xMin;
    const wZ2 = l2_zMax - l2_zMin;
    const centerX2 = (l2_xMin + l2_xMax) / 2;
    const centerZ2 = (l2_zMin + l2_zMax) / 2;

    const l2Height = 15 + rand * 30;
    const l2Geo = new THREE.BoxGeometry(wX2, l2Height, wZ2, Math.max(1, Math.round(wX2 / 2)), 1, Math.max(1, Math.round(wZ2 / 2)));
    l2Geo.translate(centerX2, currentHeight + l2Height / 2, centerZ2);
    facadeGeoms.push(l2Geo);

    // Layer 2 Corner Columns (Voxel detailing)
    if (l2_xMin > -20 && l2_zMin > -20) {
      const c = new THREE.BoxGeometry(colW, l2Height, colW);
      c.translate(l2_xMin + colOffset, currentHeight + l2Height / 2, l2_zMin + colOffset);
      facadeGeoms.push(c);
    }
    if (l2_xMax < 20 && l2_zMin > -20) {
      const c = new THREE.BoxGeometry(colW, l2Height, colW);
      c.translate(l2_xMax - colOffset, currentHeight + l2Height / 2, l2_zMin + colOffset);
      facadeGeoms.push(c);
    }
    if (l2_xMin > -20 && l2_zMax < 20) {
      const c = new THREE.BoxGeometry(colW, l2Height, colW);
      c.translate(l2_xMin + colOffset, currentHeight + l2Height / 2, l2_zMax - colOffset);
      facadeGeoms.push(c);
    }
    if (l2_xMax < 20 && l2_zMax < 20) {
      const c = new THREE.BoxGeometry(colW, l2Height, colW);
      c.translate(l2_xMax - colOffset, currentHeight + l2Height / 2, l2_zMax - colOffset);
      facadeGeoms.push(c);
    }

    // Layer 2 Molding Ledge Belt (Voxel detailing)
    const ledge2 = new THREE.BoxGeometry(wX2 + 0.5, ledgeHeight, wZ2 + 0.5, Math.max(1, Math.round(wX2 / 2)), 1, Math.max(1, Math.round(wZ2 / 2)));
    ledge2.translate(centerX2, currentHeight + l2Height - ledgeHeight / 2, centerZ2);
    facadeGeoms.push(ledge2);

    // Windows (Only place on non-connected street-facing sides)
    const winW = 1.5;
    const winH = 2.0;
    
    for (let wy = currentHeight + 3; wy < currentHeight + l2Height - 3; wy += 4.5) {
      for (let wx = l2_xMin + 3; wx < l2_xMax - 3; wx += 4) {
        if (l2_zMax < 20) {
          const winF = createDetailedWindowGeometry(winW, winH, 0.1);
          winF.translate(wx, wy, l2_zMax + 0.05);
          windowGeoms.push(winF);

          // Voxel style window sill
          const sill = new THREE.BoxGeometry(winW + 0.6, 0.28, 0.4);
          sill.translate(wx, wy - winH / 2 - 0.14, l2_zMax + 0.2);
          facadeGeoms.push(sill);
        }

        if (l2_zMin > -20) {
          const winB = createDetailedWindowGeometry(winW, winH, 0.1);
          winB.translate(wx, wy, l2_zMin - 0.05);
          windowGeoms.push(winB);

          // Voxel style window sill
          const sill = new THREE.BoxGeometry(winW + 0.6, 0.28, 0.4);
          sill.translate(wx, wy - winH / 2 - 0.14, l2_zMin - 0.2);
          facadeGeoms.push(sill);
        }
      }
    }

    currentHeight += l2Height;

    // Layer 3 Bounds
    if (levelsCount >= 3) {
      const l3_xMin = xMin === -20 ? -20 : xMin + 2.5;
      const l3_xMax = xMax === 20 ? 20 : xMax - 2.5;
      const l3_zMin = zMin === -20 ? -20 : zMin + 2.5;
      const l3_zMax = zMax === 20 ? 20 : zMax - 2.5;

      const wX3 = l3_xMax - l3_xMin;
      const wZ3 = l3_zMax - l3_zMin;
      const centerX3 = (l3_xMin + l3_xMax) / 2;
      const centerZ3 = (l3_zMin + l3_zMax) / 2;

      const l3Height = 8 + rand * 10;
      const l3Geo = new THREE.BoxGeometry(wX3, l3Height, wZ3, Math.max(1, Math.round(wX3 / 2)), 1, Math.max(1, Math.round(wZ3 / 2)));
      l3Geo.translate(centerX3, currentHeight + l3Height / 2, centerZ3);
      facadeGeoms.push(l3Geo);

      // Layer 3 Corner Columns (Voxel detailing)
      if (l3_xMin > -20 && l3_zMin > -20) {
        const c = new THREE.BoxGeometry(colW, l3Height, colW);
        c.translate(l3_xMin + colOffset, currentHeight + l3Height / 2, l3_zMin + colOffset);
        facadeGeoms.push(c);
      }
      if (l3_xMax < 20 && l3_zMin > -20) {
        const c = new THREE.BoxGeometry(colW, l3Height, colW);
        c.translate(l3_xMax - colOffset, currentHeight + l3Height / 2, l3_zMin + colOffset);
        facadeGeoms.push(c);
      }
      if (l3_xMin > -20 && l3_zMax < 20) {
        const c = new THREE.BoxGeometry(colW, l3Height, colW);
        c.translate(l3_xMin + colOffset, currentHeight + l3Height / 2, l3_zMax - colOffset);
        facadeGeoms.push(c);
      }
      if (l3_xMax < 20 && l3_zMax < 20) {
        const c = new THREE.BoxGeometry(colW, l3Height, colW);
        c.translate(l3_xMax - colOffset, currentHeight + l3Height / 2, l3_zMax - colOffset);
        facadeGeoms.push(c);
      }

      // Layer 3 Molding Ledge Belt (Voxel detailing)
      const ledge3 = new THREE.BoxGeometry(wX3 + 0.5, ledgeHeight, wZ3 + 0.5, Math.max(1, Math.round(wX3 / 2)), 1, Math.max(1, Math.round(wZ3 / 2)));
      ledge3.translate(centerX3, currentHeight + l3Height - ledgeHeight / 2, centerZ3);
      facadeGeoms.push(ledge3);

      // Layer 3 Windows
      for (let wy = currentHeight + 2; wy < currentHeight + l3Height - 2; wy += 4.0) {
        for (let wx = l3_xMin + 3; wx < l3_xMax - 3; wx += 4.0) {
          if (l3_zMax < 20) {
            const winF = createDetailedWindowGeometry(winW, winH, 0.1);
            winF.translate(wx, wy, l3_zMax + 0.05);
            windowGeoms.push(winF);

            // Voxel style window sill
            const sill = new THREE.BoxGeometry(winW + 0.6, 0.28, 0.4);
            sill.translate(wx, wy - winH / 2 - 0.14, l3_zMax + 0.2);
            facadeGeoms.push(sill);
          }
          if (l3_zMin > -20) {
            const winB = createDetailedWindowGeometry(winW, winH, 0.1);
            winB.translate(wx, wy, l3_zMin - 0.05);
            windowGeoms.push(winB);

            // Voxel style window sill
            const sill = new THREE.BoxGeometry(winW + 0.6, 0.28, 0.4);
            sill.translate(wx, wy - winH / 2 - 0.14, l3_zMin - 0.2);
            facadeGeoms.push(sill);
          }
        }
      }

      currentHeight += l3Height;
    }

    // Layer 4 Bounds
    if (levelsCount === 4) {
      const l4_xMin = xMin === -20 ? -20 : xMin + 4.0;
      const l4_xMax = xMax === 20 ? 20 : xMax - 4.0;
      const l4_zMin = zMin === -20 ? -20 : zMin + 4.0;
      const l4_zMax = zMax === 20 ? 20 : zMax - 4.0;

      const wX4 = l4_xMax - l4_xMin;
      const wZ4 = l4_zMax - l4_zMin;
      const centerX4 = (l4_xMin + l4_xMax) / 2;
      const centerZ4 = (l4_zMin + l4_zMax) / 2;

      const l4Height = 7 + rand * 8;
      const l4Geo = new THREE.BoxGeometry(wX4, l4Height, wZ4, Math.max(1, Math.round(wX4 / 2)), 1, Math.max(1, Math.round(wZ4 / 2)));
      l4Geo.translate(centerX4, currentHeight + l4Height / 2, centerZ4);
      facadeGeoms.push(l4Geo);

      // Layer 4 Molding Ledge Belt
      const ledge4 = new THREE.BoxGeometry(wX4 + 0.5, ledgeHeight, wZ4 + 0.5, Math.max(1, Math.round(wX4 / 2)), 1, Math.max(1, Math.round(wZ4 / 2)));
      ledge4.translate(centerX4, currentHeight + l4Height - ledgeHeight / 2, centerZ4);
      facadeGeoms.push(ledge4);

      // Layer 4 Windows
      for (let wy = currentHeight + 2; wy < currentHeight + l4Height - 2; wy += 3.8) {
        for (let wx = l4_xMin + 3; wx < l4_xMax - 3; wx += 4.0) {
          if (l4_zMax < 20) {
            const winF = createDetailedWindowGeometry(winW, winH, 0.1);
            winF.translate(wx, wy, l4_zMax + 0.05);
            windowGeoms.push(winF);

            // Voxel style window sill
            const sill = new THREE.BoxGeometry(winW + 0.6, 0.28, 0.4);
            sill.translate(wx, wy - winH / 2 - 0.14, l4_zMax + 0.2);
            facadeGeoms.push(sill);
          }
        }
      }

      currentHeight += l4Height;
    }

    // Rooftop Accessories
    const ac = new THREE.BoxGeometry(3.0, 2.0, 3.0);
    ac.translate(centerX, currentHeight + 1.0, centerZ);
    accessoryGeoms.push(ac);

    // Random Solar Panels
    if (rand > 0.45) {
      const panel = new THREE.BoxGeometry(3.2, 0.18, 1.8);
      panel.rotateX(Math.PI / 8);
      panel.translate(centerX - 3.5, currentHeight + 0.5, centerZ);
      accessoryGeoms.push(panel);
    }

    // Voxel-style Water Tower (AC or Water Tank)
    if (rand > 0.6) {
      const leg1 = new THREE.BoxGeometry(0.3, 3.0, 0.3);
      leg1.translate(centerX - 1.2, currentHeight + 1.5, centerZ - 1.2);
      accessoryGeoms.push(leg1);
      const leg2 = new THREE.BoxGeometry(0.3, 3.0, 0.3);
      leg2.translate(centerX + 1.2, currentHeight + 1.5, centerZ + 1.2);
      accessoryGeoms.push(leg2);
      
      const tank = new THREE.BoxGeometry(2.4, 2.4, 2.4);
      tank.translate(centerX, currentHeight + 3.8, centerZ);
      accessoryGeoms.push(tank);
    }

    if (rand > 0.3) {
      const antBox = new THREE.BoxGeometry(0.2, 8.0, 0.2);
      antBox.translate(centerX, currentHeight + 4.0, centerZ);
      accessoryGeoms.push(antBox);

      const beaconG = new THREE.BoxGeometry(0.6, 0.6, 0.6);
      beaconG.translate(centerX, currentHeight + 8.0, centerZ);
      beaconGeoms.push(beaconG);
    }

    const billboardColor = this.billboardColors[Math.floor(rand * this.billboardColors.length)];

    if (rand > 0.3 && currentHeight > 25 && zMax < 20) {
      const signH = 6.0;
      const signW = 10.0;
      const billboard = new THREE.BoxGeometry(signW, signH, 0.5, Math.max(1, Math.round(signW / 2)), 1, 1);
      billboard.translate(centerX, currentHeight - 10, zMax + 0.3);
      billboardGeoms.push(billboard);

      // Neon billboards are highly emissive and glow naturally, so we omit point lights here
      // to keep PointLight pool slots open for distant streetlights.
    }

    // Build meshes inside building group using THREE.LOD for optimization
    const lod = new THREE.LOD();
    lod.position.set(posX, 0.35, posZ);

    const groundGeo = new THREE.BoxGeometry(this.tileSize, 0.35, this.tileSize, 8, 1, 8);
    applySidewalkUVs(groundGeo);
    groundGeo.translate(0, -0.175, 0);
    this.deformGeometryToHills(groundGeo, posX, posZ);

    const mergedFacade = BufferGeometryUtils.mergeGeometries(facadeGeoms);
    this.deformGeometryToHills(mergedFacade, posX, posZ);
    
    // --- LOD Level 0: Full Detail (0m to 140m) ---
    const highGroup = new THREE.Group();
    const highGround = new THREE.Mesh(groundGeo, this.concreteMat);
    highGround.receiveShadow = true;
    highGroup.add(highGround);
    const facadeMesh = new THREE.Mesh(mergedFacade, bMat);
    facadeMesh.castShadow = true;
    facadeMesh.receiveShadow = true;
    highGroup.add(facadeMesh);

    let windowMeshShared = null;
    if (windowGeoms.length > 0) {
      const merged = BufferGeometryUtils.mergeGeometries(windowGeoms);
      this.deformGeometryToHills(merged, posX, posZ);
      windowMeshShared = new THREE.Mesh(merged, this.windowDetailedMat);
      highGroup.add(windowMeshShared);
    }
    if (doorGeoms.length > 0) {
      const merged = BufferGeometryUtils.mergeGeometries(doorGeoms);
      this.deformGeometryToHills(merged, posX, posZ);
      highGroup.add(new THREE.Mesh(merged, this.doorMat));
    }
    if (accessoryGeoms.length > 0) {
      const merged = BufferGeometryUtils.mergeGeometries(accessoryGeoms);
      this.deformGeometryToHills(merged, posX, posZ);
      highGroup.add(new THREE.Mesh(merged, this.accessoryMat));
    }
    
    let billboardMesh = null;
    if (billboardGeoms.length > 0) {
      const mergedBill = BufferGeometryUtils.mergeGeometries(billboardGeoms);
      this.deformGeometryToHills(mergedBill, posX, posZ);
      const neonMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        emissive: billboardColor,
        emissiveIntensity: 4.0
      });
      billboardMesh = new THREE.Mesh(mergedBill, neonMat);
      highGroup.add(billboardMesh);
    }
    
    let beaconMesh = null;
    if (beaconGeoms.length > 0) {
      const merged = BufferGeometryUtils.mergeGeometries(beaconGeoms);
      this.deformGeometryToHills(merged, posX, posZ);
      const beaconMat = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 6.0
      });
      beaconMesh = new THREE.Mesh(merged, beaconMat);
      highGroup.add(beaconMesh);
    }
    lod.addLevel(highGroup, 0);

    // --- LOD Level 1: Medium Detail (280m to 400m) ---
    const medGroup = new THREE.Group();
    const medGround = new THREE.Mesh(groundGeo, this.concreteMat);
    medGround.receiveShadow = true;
    medGroup.add(medGround);
    const medFacade = new THREE.Mesh(mergedFacade, bMat);
    medFacade.castShadow = true;
    medFacade.receiveShadow = true;
    medGroup.add(medFacade);
    if (windowMeshShared) {
      medGroup.add(new THREE.Mesh(windowMeshShared.geometry, windowMeshShared.material));
    }
    if (billboardMesh) {
      medGroup.add(new THREE.Mesh(billboardMesh.geometry, billboardMesh.material));
    }
    if (beaconMesh) {
      medGroup.add(new THREE.Mesh(beaconMesh.geometry, beaconMesh.material));
    }
    lod.addLevel(medGroup, 280);

    // --- LOD Level 2: Low Detail (400m+) ---
    const lowGroup = new THREE.Group();
    const lowGround = new THREE.Mesh(groundGeo, this.concreteMat);
    lowGround.receiveShadow = true;
    lowGroup.add(lowGround);
    const lowFacade = new THREE.Mesh(mergedFacade, bMat);
    lowGroup.add(lowFacade);
    if (windowMeshShared) {
      lowGroup.add(new THREE.Mesh(windowMeshShared.geometry, windowMeshShared.material));
    }
    lod.addLevel(lowGroup, 400);

    group.add(lod);

    obstacles.push({
      xMin: posX + xMin,
      xMax: posX + xMax,
      zMin: posZ + zMin,
      zMax: posZ + zMax,
      height: currentHeight
    });
  }

  checkCollision(posX, posZ, radius = 2.2) {
    // Spatial hash lookup: only check obstacles in nearby grid cells
    const cs = this.spatialCellSize;
    const cx0 = Math.floor((posX - radius) / cs);
    const cx1 = Math.floor((posX + radius) / cs);
    const cz0 = Math.floor((posZ - radius) / cs);
    const cz1 = Math.floor((posZ + radius) / cs);

    // Use a Set to avoid checking the same obstacle twice (can span multiple cells)
    const checked = new Set();
    const radSq = radius * radius;

    for (let cx = cx0; cx <= cx1; cx++) {
      for (let cz = cz0; cz <= cz1; cz++) {
        const cell = this.obstacleGrid.get(`${cx},${cz}`);
        if (!cell) continue;
        for (const obs of cell) {
          if (checked.has(obs)) continue;
          checked.add(obs);

          if (obs.isRamp) continue; // Skip ramps for horizontal collision resolution

          const closestX = Math.max(obs.xMin, Math.min(posX, obs.xMax));
          const closestZ = Math.max(obs.zMin, Math.min(posZ, obs.zMax));
          const distanceX = posX - closestX;
          const distanceZ = posZ - closestZ;
          const distanceSquared = distanceX * distanceX + distanceZ * distanceZ;

          if (distanceSquared < radSq) {
            const dist = Math.sqrt(distanceSquared);
            return {
              collision: true,
              normalX: dist > 0.001 ? distanceX / dist : 1,
              normalZ: dist > 0.001 ? distanceZ / dist : 0,
              overlap: radius - dist
            };
          }
        }
      }
    }
    return { collision: false };
  }

  isWetAt(x, z) {
    // Helper: check puddle circles for a specific grid tile
    const checkTile = (gX, gZ) => {
      const key = `${gX},${gZ}`;
      const circles = this.tilePuddles.get(key);
      if (!circles || circles.length === 0) return false;

      for (let i = 0; i < circles.length; i++) {
        const c = circles[i];
        const dx = x - c.x;
        const dz = z - c.z;
        // 40% radius tolerance to account for domain-warped texture shape vs math circles
        const rx = c.rx * 1.4;
        const rz = c.rz * 1.4;
        if ((dx / rx) * (dx / rx) + (dz / rz) * (dz / rz) < 1.0) {
          return true;
        }
      }
      return false;
    };

    // Use round-with-half-tile bias for tile lookup (same as generation)
    const gridX = Math.floor(x / this.tileSize + 0.5);
    const gridZ = Math.floor(z / this.tileSize + 0.5);

    // Check if primary tile is a road tile
    const isRoad = this.roadColumns.has(gridX) || this.roadRows.has(gridZ);
    if (!isRoad) return false;

    // Check point is within road lane boundary (road width = 26m, sidewalks outside)
    const { rwX, rwZ } = this.getRoadWidthForGrid(gridX, gridZ);
    const localX = x - gridX * this.tileSize;
    const localZ = z - gridZ * this.tileSize;
    const isIntersection = this.roadColumns.has(gridX) && this.roadRows.has(gridZ);

    if (!isIntersection) {
      if (this.roadRows.has(gridZ)) {
        if (Math.abs(localZ) > rwZ / 2) return false;
      } else {
        if (Math.abs(localX) > rwX / 2) return false;
      }
    }

    // Primary tile check
    if (checkTile(gridX, gridZ)) return true;

    // Near a tile boundary? Check neighbouring road tiles too (prevents misses at seams)
    const boundaryThresh = 3.0; // within 3m of tile edge
    const tileCenterX = gridX * this.tileSize;
    const tileCenterZ = gridZ * this.tileSize;
    const distToEdgeX = this.tileSize / 2 - Math.abs(localX);
    const distToEdgeZ = this.tileSize / 2 - Math.abs(localZ);

    if (distToEdgeX < boundaryThresh) {
      const nx = gridX + (localX > 0 ? 1 : -1);
      if (checkTile(nx, gridZ)) return true;
    }
    if (distToEdgeZ < boundaryThresh) {
      const nz = gridZ + (localZ > 0 ? 1 : -1);
      if (checkTile(gridX, nz)) return true;
    }

    return false;
  }

  getBaseHeight(x, z) {
    const wave1 = Math.sin(x * 0.006) * Math.cos(z * 0.006) * 14.0;
    const wave2 = Math.sin(z * 0.012) * 5.0;
    let val = wave1 + wave2;

    // Smooth sweeping modulation wave for occasional extreme valleys/peaks
    // We use a low-frequency wave that goes up to 55m and down to -65m
    const extremeWave = Math.sin(x * 0.0015) * Math.cos(z * 0.0015);
    
    // We use a threshold to determine where the extreme zones are, but interpolate smoothly
    // to avoid sudden slope steps.
    let extremeH = 0;
    const extremeThreshold = 0.2;
    const extremeAbs = Math.abs(extremeWave);
    if (extremeAbs > extremeThreshold) {
      const factor = (extremeAbs - extremeThreshold) / (1.0 - extremeThreshold);
      // Smoothstep the factor for beautiful transitions
      const smoothFactor = factor * factor * (3 - 2 * factor);
      
      // Let's create the extreme hill shape: positive goes up to +55m, negative goes down to -65m
      const targetExtreme = Math.sign(extremeWave) * (extremeWave > 0 ? 55.0 : 65.0);
      
      extremeH = targetExtreme * smoothFactor;
    }

    // Debug natural extreme hill slope: giant rolling mountain climbing to +45m and dropping to -40m
    if (x >= -16 && x <= 16 && z >= 100 && z <= 260) {
      let debugSlope = 0;
      if (z <= 160) {
        // Smooth mountain climb up to +45m
        const pct = (z - 100) / 60;
        const smooth = pct * pct * (3 - 2 * pct);
        debugSlope = smooth * 45.0;
      } else if (z <= 210) {
        // Deep canyon drop down to -40m (85m elevation delta!)
        const pct = (z - 160) / 50;
        const smooth = pct * pct * (3 - 2 * pct);
        debugSlope = 45.0 + (-40.0 - 45.0) * smooth;
      } else {
        // Recovery back to normal height
        const pct = (z - 210) / 50;
        const smooth = pct * pct * (3 - 2 * pct);
        debugSlope = -40.0 + (0.0 - (-40.0)) * smooth;
      }

      // Blend on sides (x direction) so it matches the surrounding city terrain
      const xDist = Math.abs(x);
      const xBlend = 1.0 - Math.min(1.0, xDist / 16);
      
      // Override terrain value in this zone
      val = val * (1 - xBlend) + debugSlope * xBlend;
      extremeH = 0; // Disable other extreme waves in this debug zone
    }

    const dist = Math.sqrt(x * x + z * z);
    const fade = THREE.MathUtils.clamp((dist - 60.0) / 100.0, 0.0, 1.0);
    return (val + extremeH) * fade;
  }

  deformGeometryToHills(geometry, tileX, tileZ) {
    const posAttr = geometry.attributes.position;
    if (!posAttr) return;
    
    for (let i = 0; i < posAttr.count; i++) {
      const localX = posAttr.getX(i);
      const localY = posAttr.getY(i);
      const localZ = posAttr.getZ(i);
      const worldX = tileX + localX;
      const worldZ = tileZ + localZ;
      const baseHeight = this.getBaseHeight(worldX, worldZ);
      posAttr.setY(i, localY + baseHeight);
    }
    
    posAttr.needsUpdate = true;
    geometry.computeVertexNormals();
  }

  getGroundHeight(x, z) {
    const baseH = this.getBaseHeight(x, z);
    let groundHeight = 0.5 + baseH;
    const cs = this.spatialCellSize || 40;
    const cx = Math.floor(x / cs);
    const cz = Math.floor(z / cs);
    
    const cell = this.obstacleGrid.get(`${cx},${cz}`);
    if (cell) {
      for (const obs of cell) {
        if (obs.isRamp) {
          const margin = 0.3; // safe margin
          if (x >= obs.xMin - margin && x <= obs.xMax + margin &&
              z >= obs.zMin - margin && z <= obs.zMax + margin) {
            
            let pct = 0.0;
            if (obs.slopeType === 'Z') {
              if (obs.slopeDir === 1) { // Slopes up along +Z
                pct = (z - obs.zMin) / (obs.zMax - obs.zMin);
              } else { // Slopes up along -Z
                pct = (obs.zMax - z) / (obs.zMax - obs.zMin);
              }
            } else if (obs.slopeType === 'X') {
              if (obs.slopeDir === 1) { // Slopes up along +X
                pct = (x - obs.xMin) / (obs.xMax - obs.xMin);
              } else { // Slopes up along -X
                pct = (obs.xMax - x) / (obs.xMax - obs.xMin);
              }
            }
            
            const localH = 0.5 + baseH + Math.max(0.0, Math.min(1.0, pct)) * (obs.height - 0.5);
            if (localH > groundHeight) {
              groundHeight = localH;
            }
          }
        }
      }
    }
    return groundHeight;
  }

  alignMeshToTerrain(mesh, position, heading, isAirborne = null) {
    const groundH = this.getGroundHeight(position.x, position.z);
    const heightAboveGround = Math.max(0, position.y - groundH);

    // Calculate height-based alignment weight
    let alignmentWeight = 1.0;
    if (heightAboveGround > 0.85) {
      const fadeDist = 1.15; // smooth fade from 0.85m to 2.0m height
      alignmentWeight = 1.0 - Math.min(1.0, (heightAboveGround - 0.85) / fadeDist);
      // Apply smoothstep
      alignmentWeight = alignmentWeight * alignmentWeight * (3 - 2 * alignmentWeight);
    }

    // Force alignment to 0 during rollovers or explicit airborne states
    if (isAirborne === true) {
      alignmentWeight = 0.0;
    }

    // Flat orientation quaternion (yaw only)
    _qFlat.setFromAxisAngle(_yAxis, heading);

    if (alignmentWeight <= 0.001) {
      mesh.quaternion.copy(_qFlat);
      return;
    }

    const cosH = Math.cos(heading);
    const sinH = Math.sin(heading);
    
    const dx = 0.95;
    const dz = 1.3;
    
    const flX = position.x - dx * cosH + dz * sinH;
    const flZ = position.z - dx * -sinH + dz * cosH;
    const flH = this.getGroundHeight(flX, flZ);
    
    const frX = position.x + dx * cosH + dz * sinH;
    const frZ = position.z + dx * -sinH + dz * cosH;
    const frH = this.getGroundHeight(frX, frZ);
    
    const rlX = position.x - dx * cosH - dz * sinH;
    const rlZ = position.z - dx * -sinH - dz * cosH;
    const rlH = this.getGroundHeight(rlX, rlZ);
    
    const rrX = position.x + dx * cosH - dz * sinH;
    const rrZ = position.z + dx * -sinH - dz * cosH;
    const rrH = this.getGroundHeight(rrX, rrZ);
    
    _pFL.set(flX, flH, flZ);
    _pFR.set(frX, frH, frZ);
    _pRL.set(rlX, rlH, rlZ);
    _pRR.set(rrX, rrH, rrZ);
    
    _pFront.addVectors(_pFL, _pFR).multiplyScalar(0.5);
    _pRear.addVectors(_pRL, _pRR).multiplyScalar(0.5);
    
    _fwd.subVectors(_pFront, _pRear).normalize();
    
    _pLeft.addVectors(_pFL, _pRL).multiplyScalar(0.5);
    _pRight.addVectors(_pFR, _pRR).multiplyScalar(0.5);
    _side.subVectors(_pRight, _pLeft);
    
    _up.crossVectors(_fwd, _side).normalize();
    _right.crossVectors(_up, _fwd).normalize();
    
    _matrix.makeBasis(_right, _up, _fwd);
    _qTarget.setFromRotationMatrix(_matrix);

    // Slerp from flat to terrain slope target
    mesh.quaternion.copy(_qFlat).slerp(_qTarget, alignmentWeight);
  }
}

const _pFL = new THREE.Vector3();
const _pFR = new THREE.Vector3();
const _pRL = new THREE.Vector3();
const _pRR = new THREE.Vector3();
const _pFront = new THREE.Vector3();
const _pRear = new THREE.Vector3();
const _fwd = new THREE.Vector3();
const _pLeft = new THREE.Vector3();
const _pRight = new THREE.Vector3();
const _side = new THREE.Vector3();
const _up = new THREE.Vector3();
const _right = new THREE.Vector3();
const _matrix = new THREE.Matrix4();
const _qFlat = new THREE.Quaternion();
const _qTarget = new THREE.Quaternion();
const _yAxis = new THREE.Vector3(0, 1, 0);

