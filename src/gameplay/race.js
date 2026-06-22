import * as THREE from 'three';
import { AICar } from '../ai/ai.js';
import { NavGraph } from '../world/navgraph.js';


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

    // Dynamic world event starts
    this.worldEvents = [];

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

  generateRandomSprint(playerPos, playerHeading, targetLength = null) {
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
    const startDistBoost = 0.18;

    const length = targetLength || (5 + Math.floor(Math.random() * 8)); // 5–12 checkpoints
    const pickJumpCount = () => {
      const r = Math.random();
      if (r < 0.5) return 2;
      if (r < 0.8) return 3;
      return 4;
    };

    for (let i = 0; i < length; i++) {
      const candidates = [];
      const stepCount = pickJumpCount();
      const distance = 160 * stepCount;
      const directionOptions = [
        { x: 1, z: 0, kind: 'straight' },
        { x: -1, z: 0, kind: 'side' },
        { x: 0, z: 1, kind: 'straight' },
        { x: 0, z: -1, kind: 'side' },
        { x: 1, z: 1, kind: 'diagonal' },
        { x: -1, z: 1, kind: 'diagonal' },
        { x: 1, z: -1, kind: 'diagonal' },
        { x: -1, z: -1, kind: 'diagonal' }
      ];

      for (const dir of directionOptions) {
        const n = {
          x: current.x + dir.x * distance,
          z: current.z + dir.z * distance
        };

        if (visited.has(`${n.x},${n.z}`)) continue;

        const step = { x: n.x - current.x, z: n.z - current.z };
        const reversing = step.x === -prevStep.x && step.z === -prevStep.z;
        if (reversing) continue;

        const forwardBias = step.x * prevStep.x + step.z * prevStep.z;
        if (forwardBias < 0) continue;

        const distFromStart = Math.hypot(n.x - startX, n.z - startZ);
        const outwardBias = distFromStart * startDistBoost;
        const jumpBias = stepCount * 18;
        const score = forwardBias + outwardBias + jumpBias;

        candidates.push({ n, score, kind: dir.kind, stepCount });
      }

      if (candidates.length === 0) break;

      const diagonalSet = candidates.filter(entry => entry.kind === 'diagonal');
      const straightSet = candidates.filter(entry => entry.kind === 'straight');
      const sideSet = candidates.filter(entry => entry.kind === 'side');

      const roll = Math.random();
      let bucket = sideSet;
      if (roll < 0.4) bucket = diagonalSet.length > 0 ? diagonalSet : straightSet;
      else if (roll < 0.8) bucket = straightSet.length > 0 ? straightSet : diagonalSet;

      if (bucket.length === 0) {
        bucket = candidates;
      }

      bucket.sort((a, b) => b.score - a.score);
      const topHalf = bucket.slice(0, Math.max(1, Math.ceil(bucket.length / 2)));
      const chosenPool = Math.random() < 0.7 ? topHalf : bucket;
      const nextMeta = chosenPool[Math.floor(Math.random() * chosenPool.length)];
      const next = nextMeta.n;

      path.push(next);
      visited.add(`${next.x},${next.z}`);
      prevStep = { x: next.x - current.x, z: next.z - current.z };
      current = next;
    }
    return path;
  }

  generateRandomCircuit(targetCount = null) {
    const count = targetCount || (Math.floor(Math.random() * 8) + 6); // 6-13 checkpoints
    const path = [];
    let current = { x: 0, z: 0 };
    path.push(current);
    
    let prevStep = { x: 0, z: 160 }; // Assume starting forward
    const visited = new Set(["0,0"]);
    const half = Math.floor(count / 2);
    
    for (let i = 1; i < count; i++) {
      const candidates = [];
      const directionOptions = [
        { x: 160, z: 0 }, { x: -160, z: 0 },
        { x: 0, z: 160 }, { x: 0, z: -160 }
      ];
      
      for (const dir of directionOptions) {
        const n = { x: current.x + dir.x, z: current.z + dir.z };
        if (visited.has(`${n.x},${n.z}`)) continue;
        
        const reversing = (dir.x === -prevStep.x && dir.z === -prevStep.z);
        if (reversing) continue;
        
        // Outward phase vs Inward phase
        const distFromOrigin = Math.hypot(n.x, n.z);
        let score = 0;
        
        if (i < half) {
            // Outward phase: reward going further from origin
            score += distFromOrigin;
        } else {
            // Inward phase: reward going closer to origin
            score -= distFromOrigin;
        }
        
        // Prevent U-turns (dot product < 0)
        const dot = (dir.x * prevStep.x) + (dir.z * prevStep.z);
        if (dot < 0) score -= 1000; // Penalize heavy U-turns
        if (dot > 0) score += 500;  // Reward going straight
        
        candidates.push({ n, step: dir, score });
      }
      
      if (candidates.length === 0) {
         // Fallback if stuck
         const fallback = { x: current.x + prevStep.x, z: current.z + prevStep.z };
         path.push(fallback);
         current = fallback;
         continue;
      }
      
      candidates.sort((a, b) => b.score - a.score);
      // Pick randomly from top 2
      const pick = candidates[Math.floor(Math.random() * Math.min(2, candidates.length))];
      
      path.push(pick.n);
      visited.add(`${pick.n.x},${pick.n.z}`);
      prevStep = pick.step;
      current = pick.n;
    }
    
    return path;
  }

  generateRandomUnordered(targetCount = null) {
    const path = [];
    const visited = new Set();
    visited.add("0,0");
    const count = targetCount || 5;
    
    while (path.length < count) {
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

  startRace(mode, world, playerPos, playerHeading, eventData) {
    this.active = true;
    this.mode = mode;
    
    const expectedCheckpoints = (eventData && eventData.checkpoints) ? eventData.checkpoints : null;
    const expectedRacers = (eventData && eventData.racers) ? eventData.racers : 3;
    this.lapTotal = (eventData && eventData.laps) ? eventData.laps : (mode === 'circuit' ? 3 : 1);
    
    // Dynamically generate random paths for all races!
    if (mode === 'sprint') {
      // Pass real player position + heading so all checkpoints spawn in FRONT of the player
      const pPos = playerPos || new THREE.Vector3(0, 0, 0);
      const pHead = playerHeading !== undefined ? playerHeading : 0;
      this.checkpoints = this.generateRandomSprint(pPos, pHead, expectedCheckpoints);
    } else if (mode === 'circuit') {
      this.checkpoints = this.generateRandomCircuit(expectedCheckpoints);
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
    
    // Spawn AI Racers in grid pattern behind starting line.
    // Snap their Y position to the terrain so they don't float or sink.
    const pX = playerPos ? playerPos.x : 0;
    const pZ = playerPos ? playerPos.z : 0;
    
    // Calculate heading toward the first checkpoint so AI faces the right direction at start
    let startHeading = 0;
    if (this.checkpoints && this.checkpoints.length > 0) {
      const cp0 = this.checkpoints[0];
      startHeading = Math.atan2(cp0.x - pX, cp0.z - pZ);
    }

    const getY = (x, z) => {
      if (world && typeof world.getGroundHeight === 'function') {
        return world.getGroundHeight(x, z);
      }
      return 0.5;
    };

    const spawns = [];
    for(let i=0; i<expectedRacers; i++) {
        const row = Math.floor(i / 2);
        const col = (i % 2 === 0) ? -1 : 1;
        const offset = (i === 2 && expectedRacers === 3) ? 0 : col * 6; // Center the 3rd if there's only 3
        spawns.push({ x: pX + offset, z: pZ - 8 - row * 8 });
    }

    const colors = [0x39ff14, 0xff007f, 0x7f00ff, 0xffa500, 0x00ffff, 0xffd700, 0xff0000, 0xffffff];
    this.aiRacers = [];
    for(let i=0; i<expectedRacers; i++) {
        const skill = 1.0 + Math.random() * 0.25;
        this.aiRacers.push(new AICar(i+1, `Racer ${i+1}`, colors[i%colors.length], new THREE.Vector3(spawns[i].x, getY(spawns[i].x, spawns[i].z), spawns[i].z), skill));
    }

    // Point all AI cars toward the first checkpoint at spawn
    this.aiRacers.forEach(ai => { ai.heading = startHeading; });

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
      if (!cp) {
        console.warn(`Race error: Checkpoint at index ${this.currentIndex} is undefined. Ending race.`);
        this.completed = true;
        this.active = false;
        return null;
      }
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
            if (this.lapCurrent < this.lapTotal) {
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
    if (!this.active && !this.completed) return [];

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

  selectNewWorldEvent(world, playerPos) {
    const intersections = [];
    const cols = Array.from(world.roadColumns);
    const rows = Array.from(world.roadRows);

    cols.forEach(cx => {
      rows.forEach(cz => {
        // Any cell that is in both columns and rows is a valid intersection
        if (world.roadColumns.has(cx) && world.roadRows.has(cz)) {
          const wx = cx * world.tileSize;
          const wz = cz * world.tileSize;
          const dist = playerPos ? Math.hypot(wx - playerPos.x, wz - playerPos.z) : 250;
          
          // Spawn events in a broad range (80m to 1800m) to give lots of choice
          if (dist > 80 && dist < 1800) {
            intersections.push({ x: wx, z: wz });
          }
        }
      });
    });

    this.worldEvents = [];
    // Only sprint and circuit are valid race modes for world events
    const modes = ['sprint', 'circuit'];

    if (intersections.length > 0) {
      // Shuffle and pick up to 36 events for high event density
      const shuffled = intersections.sort(() => 0.5 - Math.random());
      const count = Math.min(36, shuffled.length);
      for (let i = 0; i < count; i++) {
        const mode = modes[Math.floor(Math.random() * modes.length)];
        this.worldEvents.push({
          x: shuffled[i].x,
          z: shuffled[i].z,
          mode: mode,
          laps: mode === 'circuit' ? Math.floor(Math.random() * 3) + 2 : 1,
          checkpoints: Math.floor(Math.random() * 8) + 5, // 5 to 12 checkpoints
          racers: Math.floor(Math.random() * 5) + 3
        });
      }
    } else {
      // Robust fallback on actual road intersection points
      const colArr = Array.from(world.roadColumns);
      const rowArr = Array.from(world.roadRows);
      if (colArr.length > 0 && rowArr.length > 0) {
        for (let i = 0; i < 5; i++) {
          const cx = colArr[Math.floor(Math.random() * colArr.length)];
          const mode = modes[i % modes.length];
          this.worldEvents.push({
            x: cx * world.tileSize,
            z: cz * world.tileSize,
            mode: mode,
            laps: mode === 'circuit' ? Math.floor(Math.random() * 3) + 2 : 1,
            checkpoints: Math.floor(Math.random() * 8) + 5, // 5 to 12 checkpoints
            racers: Math.floor(Math.random() * 5) + 3
          });
        }
      }
    }
  }
}
