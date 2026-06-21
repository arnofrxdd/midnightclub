# Refactoring & Folder Organization Plan

This document outlines the design, folder organization, and code-splitting strategy to refactor the **Midnight Club: Voxel Edition** codebase. All functionality, physics formulas, rendering pipelines, and game logic will remain **exactly the same**.

---

## 📂 Proposed Folder Directory Structure

```
d:/INTERNSHIP/midnight club/
├── index.html
├── src/
│   ├── core/                  # Core engine, entry points, physics & scene helpers
│   │   ├── main.js            # [Refactored] Primary entry point & game loop (holds Game class)
│   │   ├── physics.js         # Core vehicle physics simulation (CarPhysics class)
│   │   ├── lighttrail.js      # [New File] Light trail rendering (LightTrail class)
│   │   ├── textures.js        # [New File] Core textures (lens flare, skidmarks)
│   │   └── carMesh.js         # [New File] Voxel car mesh generator function
│   │
│   ├── world/                 # World generation, props & navigation layouts
│   │   ├── world.js           # [Refactored] Procedural city structure (World class)
│   │   ├── navgraph.js        # Pathfinding waypoint graph & A* (NavGraph class)
│   │   ├── geometry.js        # [New File] Sidewalk/Window geometries & traffic lights state
│   │   └── textures.js        # [New File] Streetlights, asphalt & building textures
│   │
│   ├── gameplay/              # Game modes, pursuits & rules
│   │   ├── race.js            # Race checkpoint layouts, timers (RaceManager class)
│   │   ├── pursuitManager.js  # [New File] Heat logic, spawning, busting (PursuitManager class)
│   │   ├── copCar.js          # [New File] Police AI chase driver (CopCar class)
│   │   └── roadblock.js       # [New File] Police roadblocks & spikes (Roadblock class)
│   │
│   └── ai/                    # Rival drivers & ambient traffic simulation
│       ├── ai.js              # Rival AI racers (AICar class)
│       ├── trafficManager.js  # [New File] Ambient traffic generator (TrafficManager class)
│       └── trafficVehicle.js  # [New File] Ambient traffic AI vehicle (TrafficVehicle class)
```

---

## 🪓 Code Splitting Details

Here is the exact mapping of how current bloated files will be split into modular, single-responsibility files:

### 1. `src/main.js` (4,141 lines) ➡️ Split into 5 files:
*   **`src/core/main.js`**:
    *   Holds the core `Game` class.
    *   Runs the Three.js init, window resize handler, input hookups, and primary `animate()` game loop.
    *   Handles HUD UI elements, stunt notifications, and particles.
*   **`src/core/lighttrail.js`**:
    *   Holds the `LightTrail` helper class.
*   **`src/core/textures.js`**:
    *   Holds `createLensflareTexture()` and `createSkidmarkTexture()`.
*   **`src/core/carMesh.js`**:
    *   Holds `createVoxelCarMesh(bodyColorHex, type)` containing the details of voxel models (skirts, hoods, frames, headlights, mirrors) for sports cars, pickups, vans, cop cars, SUVs, etc.
*   **`src/core/physics.js`**:
    *   Moves `CarPhysics` class directly here.

### 2. `src/world.js` (approx. 1,500 lines) ➡️ Split into 3 files:
*   **`src/world/world.js`**:
    *   Holds the main `World` class.
    *   Handles tile loading, heightmaps, collision testing, grid alignment, and building setups.
*   **`src/world/textures.js`**:
    *   Holds texture generators: `createStreetlightFlareTexture()`, `createGroundLightPoolTexture()`, `createConcreteTextures()`, `createAsphaltTextures()`, `createWindowTextures()`, and `createCityEnvMap()`.
*   **`src/world/geometry.js`**:
    *   Holds geometry and state utilities: `getTrafficLightState()`, `applySidewalkUVs()`, and `createDetailedWindowGeometry()`.

### 3. `src/pursuit.js` (1,339 lines) ➡️ Split into 3 files:
*   **`src/gameplay/pursuitManager.js`**:
    *   Holds the `PursuitManager` class.
    *   Deals with heat level escalation, line-of-sight spotted timers, and police spawns.
*   **`src/gameplay/copCar.js`**:
    *   Holds the `CopCar` class.
    *   Deals with individual police car AI, PIT maneuvers, charging/ramming, and stuck escape routines.
*   **`src/gameplay/roadblock.js`**:
    *   Holds the `Roadblock` class.
    *   Deals with blocker SUVs, spikes, and visual barrier meshes.

### 4. `src/traffic.js` (1,150 lines) ➡️ Split into 2 files:
*   **`src/ai/trafficManager.js`**:
    *   Holds the `TrafficManager` class.
    *   Manages spawning, despawning, and pooling lists of traffic vehicles around the player.
*   **`src/ai/trafficVehicle.js`**:
    *   Holds the `TrafficVehicle` class.
    *   Deals with individual traffic AI, lane-following, braking for roadblocks/player/other cars, and intersection navigation.

---

## 🔗 Module Dependency & Import Path Updates

Since files are moving into subdirectories, the relative import paths must be updated. Below is a map of the new import chains:

### Core Imports
*   **`src/core/main.js`**:
    ```javascript
    import * as THREE from 'three';
    import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
    import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
    import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
    import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
    import { LightTrail } from './lighttrail.js';
    import { createLensflareTexture, createSkidmarkTexture } from './textures.js';
    import { createVoxelCarMesh } from './carMesh.js';
    import { CarPhysics } from './physics.js';
    import { World } from '../world/world.js';
    import { RaceManager } from '../gameplay/race.js';
    import { TrafficManager } from '../ai/trafficManager.js';
    import { PursuitManager } from '../gameplay/pursuitManager.js';
    ```

### World Imports
*   **`src/world/world.js`**:
    ```javascript
    import * as THREE from 'three';
    import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
    import { 
      createStreetlightFlareTexture, 
      createGroundLightPoolTexture, 
      createConcreteTextures, 
      createAsphaltTextures, 
      createWindowTextures, 
      createCityEnvMap 
    } from './textures.js';
    import { 
      getTrafficLightState, 
      applySidewalkUVs, 
      createDetailedWindowGeometry 
    } from './geometry.js';
    ```

### Gameplay Imports
*   **`src/gameplay/race.js`**:
    ```javascript
    import * as THREE from 'three';
    import { AICar } from '../ai/ai.js';
    import { NavGraph } from '../world/navgraph.js';
    ```
*   **`src/gameplay/pursuitManager.js`**:
    ```javascript
    import * as THREE from 'three';
    import { CopCar } from './copCar.js';
    import { Roadblock } from './roadblock.js';
    ```
*   **`src/gameplay/copCar.js`**:
    ```javascript
    import * as THREE from 'three';
    ```
*   **`src/gameplay/roadblock.js`**:
    ```javascript
    import * as THREE from 'three';
    import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
    ```

### AI & Traffic Imports
*   **`src/ai/trafficManager.js`**:
    ```javascript
    import * as THREE from 'three';
    import { TrafficVehicle } from './trafficVehicle.js';
    ```
*   **`src/ai/trafficVehicle.js`**:
    ```javascript
    import * as THREE from 'three';
    ```
*   **`src/ai/ai.js`**:
    ```javascript
    import * as THREE from 'three';
    ```

### HTML Setup
*   **`index.html`**:
    ```html
    <script type="module" src="/src/core/main.js"></script>
    ```

---

## ✅ Verification Strategy
1. **Compilation Check**: Run `npm run build` to make sure Vite compiles everything, resolves all paths correctly, and bundles it without static analysis errors.
2. **Visual Inspection**: Run `npm run dev` and navigate through all aspects (races, pursuits, traffic avoidance, checkpoint collection) to ensure the visual rendering, physics, and AI behaviors match perfectly.
