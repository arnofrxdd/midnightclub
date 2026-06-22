# 🏎️ Midnight Club — Voxel Edition

> **A browser-based concept racing game inspired by the Midnight Club franchise, built entirely with Three.js and vanilla JavaScript.**

![Midnight Club Voxel Edition](https://img.shields.io/badge/status-concept%20%2F%20beta-blueviolet?style=flat-square)
![Three.js](https://img.shields.io/badge/Three.js-r160-black?style=flat-square&logo=three.js)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)

---

## 🎮 About

**Midnight Club: Voxel Edition** is a fan-made, browser-based concept game that recreates the spirit of the original Midnight Club street racing games in a fully procedural, voxel-style 3D city. The world streams infinitely around the player, generating new city blocks, roads, buildings, alleys and props on the fly.

This is a **concept / prototype** — not a commercial product. It exists to explore what a modern, real-time street racer could look like running entirely in the browser with zero plugins.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or later
- npm (bundled with Node.js)

### Install & Run

```bash
# 1. Clone or download the project
cd "midnight club"

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production
```bash
npm run build
```
Output will be in the `dist/` folder.

### Deploy to GitHub Pages
```bash
npm run deploy
```

---

## 🕹️ Controls

| Key | Action |
|-----|--------|
| **W / ↑** | Accelerate |
| **S / ↓** | Brake / Reverse |
| **A / ←** | Steer Left |
| **D / →** | Steer Right |
| **Space** | Nitro Boost |
| **F** | Start nearby race event |
| **B** | Open Beta Feedback panel |
| **P** | Toggle performance HUD |
| **Esc** | Close feedback panel |

---

## 🗺️ Game Modes

| Mode | Description |
|------|-------------|
| **Sprint** | Race from start to finish through a series of checkpoints. No U-turns — path always flows forward. |
| **Circuit** | Race multiple laps around a generated loop. Lap counter tracks progress. |
| **Scavenger Hunt** | Hit checkpoints in any order before time runs out. |
| **Autocross Slalom** | Precision driving through a tight cone course. |

---

## ✨ Features

- **Infinite Procedural City** — The world generates city blocks, roads, intersections, alleys, buildings, and props in real time as you drive. Old chunks stream out behind you.
- **Dynamic Day/Night Lighting** — Real-time deferred lighting with a pooled point light system. Headlights, taillights, checkpoint beacons and cop sirens all cast coloured light on the road surface.
- **Voxel Car Physics** — Custom-built arcade physics engine with gear simulation, suspension, drift, nitro boost, and reverse gear with a launch-torque burst.
- **AI Racers** — Opponent cars use A\* pathfinding on a dynamically built navigation graph. They brake, drift and race intelligently against you.
- **Police Pursuit System** — Speed traps, chasing cop cars, heat levels 1–5, and a bust mechanic. Roadblock system exists but is currently disabled.
- **Stunts & Near Misses** — Score points for drifts, jumps, near-misses with traffic, and other tricks.
- **Race Events** — World events spawn near the player with beacon markers and minimap indicators. Drive up and press **F** to start.
- **Cinematic Camera** — Smooth intro swoops and race-start cinematics.
- **Beta Feedback** — Press **B** at any time (or click the button above the minimap) to submit in-game feedback via Formspree. Quick 👍 / 👎 rating also appears on the Race Finished screen.
- **Reverse Lights** — White reverse lights activate when in reverse gear.
- **LOD System** — Distant geometry and lighting are culled or simplified for performance.

---

## 🏗️ Architecture

```
midnight club/
├── index.html              # Main HTML shell, HUD markup
├── src/
│   ├── core/
│   │   ├── main.js         # Game class — master orchestrator, animation loop
│   │   ├── physics.js      # Arcade car physics engine
│   │   ├── camera.js       # Chase camera, cinematic camera
│   │   ├── hud.js          # Minimap, notifications, race HUD
│   │   ├── hud.css         # All in-game UI styles
│   │   ├── carMesh.js      # Voxel car mesh builder
│   │   ├── particles.js    # Smoke, sparks, skidmarks, debris
│   │   ├── input.js        # Keyboard input manager
│   │   ├── lighttrail.js   # Light trail effect
│   │   └── textures.js     # Procedural texture generation
│   │
│   ├── world/
│   │   ├── world.js        # Chunk streaming, world state, collision
│   │   ├── roadTile.js     # Road geometry builder
│   │   ├── buildingTile.js # Building geometry builder
│   │   ├── alleyTile.js    # Alley tile builder
│   │   ├── navgraph.js     # Road intersection graph for AI A* pathfinding
│   │   ├── props.js        # Street props (signs, bins, cones, etc.)
│   │   ├── geometry.js     # Shared geometry helpers
│   │   └── textures.js     # World texture atlas
│   │
│   ├── gameplay/
│   │   ├── race.js         # RaceManager — checkpoint logic, lap tracking, AI spawning
│   │   ├── pursuitManager.js # Police pursuit, heat levels, cop spawning
│   │   ├── copCar.js       # Cop car AI and behaviour
│   │   ├── roadblock.js    # Roadblock mesh and collision (disabled)
│   │   ├── stunts.js       # Stunt detection — drift, near miss, air time
│   │   ├── breakables.js   # Breakable street prop system
│   │   └── cinematicManager.js # Intro / race-start cinematic sequences
│   │
│   └── ai/
│       ├── ai.js           # AICar — A* racing AI, steering, collision avoidance
│       ├── trafficManager.js # Traffic vehicle spawning and recycling
│       └── trafficVehicle.js # Individual traffic car physics and mesh
│
├── vite.config.js
└── package.json
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| **3D Rendering** | [Three.js](https://threejs.org/) r160 |
| **Bundler** | [Vite](https://vitejs.dev/) 5.x |
| **Physics** | Custom arcade engine (no library) |
| **AI Pathfinding** | Custom A\* on procedural nav-graph |
| **Feedback** | [Formspree](https://formspree.io/) (serverless form backend) |
| **Language** | Vanilla ES2022 JavaScript (ESM modules) |

---

## 📋 Known Limitations / Beta Notes

- World is procedurally generated so there is no persistent map — the city is always different on each session.
- Police roadblocks are implemented but currently disabled.
- Mobile / touch controls are not supported.
- Save data / leaderboards are not implemented.
- This is a **concept prototype** — performance and polish are ongoing work.

---

## 💬 Feedback

Found a bug or have a suggestion? Press **B** in-game to open the feedback panel, or rate your race experience with the quick 👍 / 👎 after a race finishes.

---

## 📄 License

This is a fan-made concept project created for educational and entertainment purposes. It is not affiliated with or endorsed by Rockstar Games or the Midnight Club franchise.
