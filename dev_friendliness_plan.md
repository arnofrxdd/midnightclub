# Developer Friendliness Refactoring Plan

This plan describes how we will organize the remaining monolithic segments of the codebase—specifically the CSS inside `index.html` and the major subsystems inside `src/core/main.js`—to make the project much more developer-friendly, clean, and modular.

---

## 📂 Proposed File Layout & Subsystems

```
src/
└── core/
    ├── main.js         # Core Game loop & primary orchestration (Game class)
    ├── hud.css         # [New File] All HUD, menus, alerts, and speedometer CSS styles
    ├── input.js        # [New File] Keyboard & controls handling (InputManager class)
    ├── camera.js       # [New File] Isometric, follow, and debug cameras (CameraManager class)
    ├── particles.js    # [New File] Debris, water splatters, and smoke (ParticleSystem class)
    └── hud.js          # [New File] Speedometer calculations, gear updates, and banners (HUDManager class)
```

---

## 🪓 Refactoring Steps

### 1. Extract CSS styles from `index.html` ➡️ `src/core/hud.css`
*   **Action**: Move all CSS styles from the `<style>` tag in `index.html` to a new `src/core/hud.css` file.
*   **HTML Link**: Add `<link rel="stylesheet" href="/src/core/hud.css">` to the `<head>` of `index.html`.

### 2. Extract Input Management ➡️ `src/core/input.js`
*   **Action**: Move `this.keys` state and the key event listeners (`keydown`, `keyup`) from `Game` into a standalone `InputManager` class.
*   **Integration**: Instantiated inside `Game` constructor as `this.input = new InputManager()`. Checks will change from `this.keys['w']` to `this.input.isPressed('w')`.

### 3. Extract Camera Handling ➡️ `src/core/camera.js`
*   **Action**: Move camera tracking logic, isometric offsets, camera rotation, and shakes (`updateCamera`, `cycleCameraFocus`) to a `CameraManager` class.
*   **Integration**: Instantiated as `this.cameraManager = new CameraManager(this.camera, this.renderer)`.

### 4. Extract Particle and Debris Systems ➡️ `src/core/particles.js`
*   **Action**: Move particle pooling, debris generation, checkpoint smoke emitters, and updates (`spawnParticles`, `spawnDebris`, `updateParticles`, `updateDebris`, etc.) into a `ParticleSystem` class.
*   **Integration**: Instantiated as `this.particles = new ParticleSystem(this.scene)`.

### 5. Extract HUD & UI Updating ➡️ `src/core/hud.js`
*   **Action**: Move HUD updates (speedometer velocity, gear shifts, nitro bar values, RPM dials, race timer formatting, and banner popups) into a `HUDManager` class.
*   **Integration**: Instantiated as `this.hud = new HUDManager()`.

---

## 🔗 Dependency Updates

Moving these files requires importing them back into `src/core/main.js`:
```javascript
import { InputManager } from './input.js';
import { CameraManager } from './camera.js';
import { ParticleSystem } from './particles.js';
import { HUDManager } from './hud.js';
```

---

## ✅ Verification Strategy
1. **Compilation Check**: Run `npm run build` to verify rollup bundle paths.
2. **Visual Inspection**: Run `npm run dev` to ensure styling loads correctly, inputs work, the camera follows smoothly, particles spawn on drift/crash, and HUD updating displays current parameters.
