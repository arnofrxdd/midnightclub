# Web Worker Architecture Plan: Traffic & AI

This document outlines the step-by-step strategy for decoupling the AI traffic logic from the Main Thread and moving it into a dedicated Web Worker.

## The Challenge
Currently, `TrafficManager` and `TrafficVehicle` live on the Main Thread. They calculate pathfinding, physics, and intersections for up to 300 cars every single frame. This heavily taxes the CPU core responsible for rendering the game via WebGL. 

To move this to a Worker, we must separate **Math & Logic** from **Graphics (Three.js)**. 

## The Core Concept
The Worker will act as a pure "Calculator". It will hold the math for 300 cars. Every frame, it will calculate their new X, Y, and Z positions, and send a raw array of numbers back to the Main Thread. The Main Thread will take those numbers and simply update the 3D meshes on the screen.

Because the game's city is **procedurally generated** using deterministic math seeds, we don't even need to send the entire city to the Worker. We can just load the city generation script into the Worker, and it will perfectly predict where all the buildings and roads are!

## Step-by-Step Implementation Strategy

### Phase 1: Decoupling Rendering from Logic (Main Thread Prep)
Right now, `TrafficVehicle` creates a `THREE.Mesh` and updates it inside its `update()` loop.
- **Action:** We need to split this. The Main Thread will hold a `TrafficRenderer` (using `THREE.InstancedMesh` for ultimate performance) which simply waits for coordinate updates.
- **Action:** `TrafficVehicle` is stripped of all `THREE.Mesh` and `scene.add()` calls. It becomes a pure math class containing only `position`, `velocity`, and `heading`.

### Phase 2: Building the Worker Bridge
- **Action:** Create `src/worker/traffic.worker.js`.
- **Action:** Set up the messaging bridge.
  - **Main -> Worker:** `init`, `update(playerX, playerZ, dt)`
  - **Worker -> Main:** `sync(Float32Array[300 * 8])` (X, Y, Z, Rotation, Opacity, ModelID).
- We will use **Transferable Objects** (Float32Arrays) instead of JSON so that transferring data between the CPU cores takes 0.00ms.

### Phase 3: The World Simulator (Worker Side)
- **Action:** Import `World` math into the Worker. The Worker needs to know where the roads are to pathfind. We will extract the deterministic noise functions and `isIntersection` logic so the Worker can "see" the roads.
- **Action:** Move the entire `TrafficManager.update()` loop inside the Worker's `setInterval` or `requestAnimationFrame` equivalent.

### Phase 4: Splicing it Together
- **Action:** In `main.js`, disable the old `TrafficManager`.
- **Action:** Initialize `new Worker('traffic.worker.js')`.
- **Action:** In the main render loop, take the `Float32Array` from the worker and apply it to the `TrafficRenderer` meshes.

## Why do it "Partly Partly"?
If we try to rip out the entire physics engine, player, and traffic in one go, the game will completely break. 
By doing it in parts:
1. We **first** convert `TrafficManager` to use a raw Float32Array locally on the main thread (proving the architecture works).
2. We **then** copy that logic file into the worker.
3. Finally, we establish the bridge.
