import * as THREE from 'three';
import { AICar } from './ai.js';
import { NavGraph } from './navgraph.js';


export class RaceManager {
  constructor() {
    this.active = false;
    this.mode = null; // 'sprint', 'circuit', 'unordered', 'autocross'
    this.checkpoints = [];
    this.currentIndex = 0;
    
    // Circuit specific
    this.lapsTotal = 2;
    this.lapCurrent = 1;
    
    // Unordered specific
    this.unorderedCleared = new Set();
    
    this.timeElapsed = 0;
    this.completed = false;
    this.radius = 32.0; // Trigger distance (supports cutting corners/shortcuts)

    // AI Racers list
    this.aiRacers = [];

    // Define checkpoint maps (relative to intersections spaced every 160 units)
    // Recall tileSize=40, intersections every 4 tiles = 160 units
    this.maps = {
      sprint: [
        { x: 0, z: 160 },
        { x: 160, z: 160 },
        { x: 160, z: 0 },
        { x: 320, z: 0 },
        { x: 320, z: -160 },
        { x: 160, z: -160 },
        { x: 0, z: -160 },
        { x: -160, z: -160 },
        { x: -160, z: 0 } // Finish Line
      ],
      circuit: [
        { x: 0, z: 160 },
        { x: 160, z: 160 },
        { x: 160, z: 0 },
        { x: 0, z: 0 } // Loop starts here again
      ],
      unordered: [
        { x: 0, z: 160 },
        { x: 160, z: -160 },
        { x: -160, z: 160 },
        { x: -160, z: -160 },
        { x: 160, z: 160 }
      ],
      autocross: [
        // Spaced tightly in the central square for precision slalom
        { x: 0, z: 20 },
        { x: -15, z: 40 },
        { x: 15, z: 60 },
        { x: -15, z: 80 },
        { x: 0, z: 100 },
        { x: 20, z: 120 },
        { x: 0, z: 140 }
      ]
    };
  }

  generateRandomSprint(playerPos, playerHeading) {
    // Compute forward direction from the player's actual heading
    const fwdX = Math.sin(playerHeading);
    const fwdZ = Math.cos(playerHeading);

    // Snap the player's world position to the nearest 160-unit intersection grid
    const startX = Math.round(playerPos.x / 160) * 160;
    const startZ = Math.round(playerPos.z / 160) * 160;

    // First checkpoint: one grid step straight ahead using the dominant axis of the heading
    const stepX = Math.abs(fwdX) >= Math.abs(fwdZ) ? Math.sign(fwdX) * 160 : 0;
    const stepZ = Math.abs(fwdZ) > Math.abs(fwdX) ? Math.sign(fwdZ) * 160 : 0;
    const firstX = startX + stepX;
    const firstZ = startZ + stepZ;

    const path = [];
    let current = { x: firstX, z: firstZ };
    path.push(current);

    const visited = new Set();
    visited.add(`${startX},${startZ}`);
    visited.add(`${firstX},${firstZ}`);

    const length = 15 + Math.floor(Math.random() * 6); // 15–21 checkpoints
    for (let i = 0; i < length; i++) {
      // All 8 possible grid neighbours (cardinal + diagonal)
      const allNeighbors = [
        { x: current.x + 160, z: current.z },
        { x: current.x - 160, z: current.z },
        { x: current.x,       z: current.z + 160 },
        { x: current.x,       z: current.z - 160 },
        { x: current.x + 160, z: current.z + 160 },
        { x: current.x - 160, z: current.z + 160 },
        { x: current.x + 160, z: current.z - 160 },
        { x: current.x - 160, z: current.z - 160 }
      ];

      // Only allow neighbours that are strictly forward of the player start point
      // (positive dot product with the player's heading vector)
      const validNeighbors = allNeighbors.filter(n => {
        if (visited.has(`${n.x},${n.z}`)) return false;
        const dx = n.x - startX;
        const dz = n.z - startZ;
        return dx * fwdX + dz * fwdZ > 0; // must be in the forward half-plane
      });

      if (validNeighbors.length === 0) break;

      // Prefer neighbours that continue pushing forward (highest dot product wins bias)
      validNeighbors.sort((a, b) => {
        const dotA = (a.x - startX) * fwdX + (a.z - startZ) * fwdZ;
        const dotB = (b.x - startX) * fwdX + (b.z - startZ) * fwdZ;
        return dotB - dotA;
      });

      // Weighted pick: 70% chance to pick from the top-half (forward-biased), 30% random
      let next;
      if (Math.random() < 0.7 && validNeighbors.length > 0) {
        const topHalf = validNeighbors.slice(0, Math.max(1, Math.ceil(validNeighbors.length / 2)));
        next = topHalf[Math.floor(Math.random() * topHalf.length)];
      } else {
        next = validNeighbors[Math.floor(Math.random() * validNeighbors.length)];
      }

      path.push(next);
      visited.add(`${next.x},${next.z}`);
      current = next;
    }
    return path;
  }

  generateRandomCircuit() {
    const shapes = [
      // Shape 1: Simple rectangle (force dz positive)
      () => {
        const dx = (Math.random() > 0.5 ? 160 : -160) * (1 + Math.floor(Math.random() * 2));
        const dz = 160 * (1 + Math.floor(Math.random() * 2)); // Always in front
        return [
          { x: 0, z: dz },
          { x: dx, z: dz },
          { x: dx, z: 0 },
          { x: 0, z: 0 }
        ];
      },
      // Shape 2: L-shape (force dirZ positive)
      () => {
        const dirX = Math.random() > 0.5 ? 1 : -1;
        const x1 = dirX * 160;
        const z1 = 160;
        const x2 = dirX * 320;
        const z2 = 320;
        return [
          { x: 0, z: z1 },
          { x: x1, z: z1 },
          { x: x1, z: z2 },
          { x: x2, z: z2 },
          { x: x2, z: 0 },
          { x: 0, z: 0 }
        ];
      },
      // Shape 3: Step-shape (force dz1 and dz2 positive)
      () => {
        const dx1 = (Math.random() > 0.5 ? 160 : -160);
        const dz1 = 160;
        const dx2 = dx1 + (Math.random() > 0.5 ? 160 : -160);
        const dz2 = dz1 + 160;
        return [
          { x: 0, z: dz1 },
          { x: dx1, z: dz1 },
          { x: dx1, z: dz2 },
          { x: dx2, z: dz2 },
          { x: dx2, z: 0 },
          { x: 0, z: 0 }
        ];
      }
    ];
    const select = shapes[Math.floor(Math.random() * shapes.length)];
    return select();
  }

  generateRandomUnordered() {
    const path = [];
    const visited = new Set();
    visited.add("0,0");
    
    while (path.length < 5) {
      const rx = (Math.floor(Math.random() * 5) - 2) * 160;
      const rz = (Math.floor(Math.random() * 5) - 2) * 160;
      // Prefer spawning in front where possible or scattered around center
      const key = `${rx},${rz}`;
      if (!visited.has(key)) {
        visited.add(key);
        path.push({ x: rx, z: rz });
      }
    }
    return path;
  }

  generateRandomAutocross() {
    const path = [];
    const dir = 1; // Always forward along +Z direction
    
    for (let i = 1; i <= 7; i++) {
      const progress = i * 20 * dir;
      const offset = (Math.random() > 0.5 ? 1 : -1) * (8 + Math.random() * 6);
      path.push({ x: offset, z: progress });
    }
    return path;
  }

  startRace(mode, world, playerPos, playerHeading) {
    this.active = true;
    this.mode = mode;
    
    // Dynamically generate random paths for all races!
    if (mode === 'sprint') {
      // Pass real player position + heading so all checkpoints spawn in FRONT of the player
      const pPos = playerPos || new THREE.Vector3(0, 0, 0);
      const pHead = playerHeading !== undefined ? playerHeading : 0;
      this.checkpoints = this.generateRandomSprint(pPos, pHead);
    } else if (mode === 'circuit') {
      this.checkpoints = this.generateRandomCircuit();
    } else if (mode === 'unordered') {
      this.checkpoints = this.generateRandomUnordered();
    } else if (mode === 'autocross') {
      this.checkpoints = this.generateRandomAutocross();
    } else {
      this.checkpoints = JSON.parse(JSON.stringify(this.maps[mode] || this.maps.circuit));
    }

    // Snap checkpoints to variable intersections
    if (mode !== 'autocross' && world && typeof world.snapToNearestIntersection === 'function') {
      this.checkpoints = this.checkpoints.map(cp => {
        const snapped = world.snapToNearestIntersection(cp.x, cp.z);
        return { x: snapped.x, z: snapped.z };
      });
    }

    this.currentIndex = 0;
    this.lapCurrent = 1;
    this.timeElapsed = 0;
    this.completed = false;
    this.unorderedCleared.clear();
    
    // Spawn AI Racers in grid pattern behind starting line (behind (0,0,0) facing forward along +Z)
    this.aiRacers = [
      new AICar(1, "Voxel Racer A", 0x39ff14, new THREE.Vector3(-6, 0.5, -8), 1.05), // Toxic Green, fast!
      new AICar(2, "Voxel Racer B", 0xff007f, new THREE.Vector3(6, 0.5, -8), 1.15),  // Neon Magenta, very fast!
      new AICar(3, "Voxel Racer C", 0x7f00ff, new THREE.Vector3(0, 0.5, -16), 1.25) // Neon Violet, extreme!
    ];

    // Build the road-intersection navigation graph (used by AI for A* pathfinding)
    // Must be built AFTER checkpoints are snapped to intersections.
    this.navGraph = new NavGraph(world);

    console.log(`Starting ${mode} race with ${this.checkpoints.length} checkpoints.`);

  }

  update(playerPos, dt, world, traffic) {
    if (!this.active || this.completed) return null;
    
    this.timeElapsed += dt;
    this.playerPos = playerPos;
    const playerX = playerPos.x;
    const playerZ = playerPos.z;

    // Update AI cars (pass navGraph so they can A* their paths)
    this.aiRacers.forEach(ai => {
      ai.update(dt, world, this, traffic, this.navGraph);
    });


    let triggerHit = false;

    if (this.mode === 'unordered') {
      // Player can hit checkpoints in any order
      this.checkpoints.forEach((cp, index) => {
        if (!this.unorderedCleared.has(index)) {
          const dx = cp.x - playerX;
          const dz = cp.z - playerZ;
          const distSq = dx * dx + dz * dz;
          
          let isPlayerInAlley = false;
          if (world && typeof world.isAlley === 'function') {
            const gX = Math.round(playerX / world.tileSize);
            const gZ = Math.round(playerZ / world.tileSize);
            if (world.isAlley(gX, gZ)) {
              isPlayerInAlley = true;
            }
          }
          const currentRadius = isPlayerInAlley ? 65.0 : this.radius;
          
          if (distSq < currentRadius * currentRadius) {
            this.unorderedCleared.add(index);
            triggerHit = true;
            console.log(`Cleared unordered checkpoint ${index}`);
          }
        }
      });

      if (this.unorderedCleared.size === this.checkpoints.length) {
        this.completed = true;
        this.active = false;
        console.log(`Completed Unordered Race in ${this.timeElapsed.toFixed(2)}s`);
        return { event: 'finish', time: this.timeElapsed };
      }
    } 
    else {
      // Ordered, Circuit, or Autocross modes
      const cp = this.checkpoints[this.currentIndex];
      const dx = cp.x - playerX;
      const dz = cp.z - playerZ;
      const distSq = dx * dx + dz * dz;

      let isPlayerInAlley = false;
      if (world && typeof world.isAlley === 'function') {
        const gX = Math.round(playerX / world.tileSize);
        const gZ = Math.round(playerZ / world.tileSize);
        if (world.isAlley(gX, gZ)) {
          isPlayerInAlley = true;
        }
      }
      const currentRadius = isPlayerInAlley ? 65.0 : this.radius;

      if (distSq < currentRadius * currentRadius) {
        triggerHit = true;
        
        if (this.mode === 'circuit') {
          // Lap logic
          if (this.currentIndex === this.checkpoints.length - 1) {
            if (this.lapCurrent < this.lapsTotal) {
              this.lapCurrent++;
              this.currentIndex = 0; // Reset loop
              console.log(`Lap ${this.lapCurrent} started.`);
              return { event: 'lap', lap: this.lapCurrent };
            } else {
              this.completed = true;
              this.active = false;
              console.log(`Completed Circuit Race in ${this.timeElapsed.toFixed(2)}s`);
              return { event: 'finish', time: this.timeElapsed };
            }
          } else {
            this.currentIndex++;
          }
        } 
        else {
          // Sprint or Autocross
          if (this.currentIndex === this.checkpoints.length - 1) {
            this.completed = true;
            this.active = false;
            console.log(`Completed Race in ${this.timeElapsed.toFixed(2)}s`);
            return { event: 'finish', time: this.timeElapsed };
          } else {
            this.currentIndex++;
          }
        }
      }
    }

    if (triggerHit) {
      return { event: 'checkpoint', nextIndex: this.currentIndex };
    }

    return null;
  }

  getActiveCheckpoint() {
    if (!this.active || this.completed) return null;
    
    if (this.mode === 'unordered') {
      return null; // Draw all checkpoints for unordered
    }
    
    return this.checkpoints[this.currentIndex];
  }

  calculateRankings(playerPos) {
    if (!this.active) return [];

    const drivers = [];
    
    // Player progress score
    let playerCpIndex = this.currentIndex;
    let playerLap = this.lapCurrent;
    let playerCpTarget = this.checkpoints[playerCpIndex];
    let distToNext = 0;
    if (playerCpTarget) {
      const dx = playerCpTarget.x - playerPos.x;
      const dz = playerCpTarget.z - playerPos.z;
      distToNext = Math.sqrt(dx * dx + dz * dz);
    }
    
    // In unordered mode, count how many cleared
    let playerProgress = 0;
    if (this.mode === 'unordered') {
      playerProgress = this.unorderedCleared.size;
      let nearestDist = 9999;
      this.checkpoints.forEach((cp, idx) => {
        if (!this.unorderedCleared.has(idx)) {
          const dx = cp.x - playerPos.x;
          const dz = cp.z - playerPos.z;
          const d = Math.sqrt(dx * dx + dz * dz);
          if (d < nearestDist) nearestDist = d;
        }
      });
      distToNext = nearestDist;
    }

    drivers.push({
      name: "Player",
      isPlayer: true,
      completed: this.completed,
      score: this.completed ? 999999 : (this.mode === 'unordered' ? playerProgress * 1000 - distToNext : (playerLap * 10000 + playerCpIndex * 1000 - distToNext)),
      timeFinished: this.completed ? this.timeElapsed : Infinity
    });

    // AI progress scores
    this.aiRacers.forEach(ai => {
      let aiCpIndex = ai.currentIndex;
      let aiLap = ai.lapCurrent;
      let aiCpTarget = this.checkpoints[aiCpIndex];
      let aiDist = 0;
      if (aiCpTarget) {
        const dx = aiCpTarget.x - ai.position.x;
        const dz = aiCpTarget.z - ai.position.z;
        aiDist = Math.sqrt(dx * dx + dz * dz);
      }

      let aiProgress = 0;
      if (this.mode === 'unordered') {
        aiProgress = ai.unorderedCleared.size;
        let nearestDist = 9999;
        this.checkpoints.forEach((cp, idx) => {
          if (!ai.unorderedCleared.has(idx)) {
            const dx = cp.x - ai.position.x;
            const dz = cp.z - ai.position.z;
            const d = Math.sqrt(dx * dx + dz * dz);
            if (d < nearestDist) nearestDist = d;
          }
        });
        aiDist = nearestDist;
      }

      drivers.push({
        name: ai.name,
        isPlayer: false,
        completed: ai.completed,
        score: ai.completed ? 999999 : (this.mode === 'unordered' ? aiProgress * 1000 - aiDist : (aiLap * 10000 + aiCpIndex * 1000 - aiDist)),
        timeFinished: ai.completed ? ai.timeFinished : Infinity
      });
    });

    // Sort rankings
    drivers.sort((a, b) => {
      if (a.completed && b.completed) {
        return a.timeFinished - b.timeFinished;
      }
      if (a.completed) return -1;
      if (b.completed) return 1;
      return b.score - a.score;
    });

    return drivers;
  }
}
