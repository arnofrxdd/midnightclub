import * as THREE from 'three';
import { getMallBounds, isMallBlock } from './mallTile.js';

// ─────────────────────────────────────────────────────────────────────────────
//  NavGraph  –  Road-intersection waypoint graph + A* pathfinder
//
//  How the world road grid works:
//    • world.roadColumns = Set<gx>  (vertical roads at tile column gx)
//    • world.roadRows    = Set<gz>  (horizontal roads at tile row gz)
//    • An INTERSECTION   = (gx, gz) where gx ∈ roadColumns AND gz ∈ roadRows
//    • World position    = (gx * tileSize,  gz * tileSize)
//    • An EDGE           = two adjacent intersections sharing a road segment
//
//  findPath() returns a Vector3[] that stays 100% on road intersections.
//  inside a building — they are all on road intersections.
// ─────────────────────────────────────────────────────────────────────────────

class MinHeap {
  constructor() { this.data = []; }
  push(val) {
    this.data.push(val);
    this.up(this.data.length - 1);
  }
  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];
    const bottom = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = bottom;
      this.down(0);
    }
    return top;
  }
  up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[i].f >= this.data[p].f) break;
      const tmp = this.data[i];
      this.data[i] = this.data[p];
      this.data[p] = tmp;
      i = p;
    }
  }
  down(i) {
    const len = this.data.length;
    while ((i << 1) + 1 < len) {
      let left = (i << 1) + 1;
      let right = left + 1;
      let best = i;
      if (this.data[left].f < this.data[best].f) best = left;
      if (right < len && this.data[right].f < this.data[best].f) best = right;
      if (best === i) break;
      const tmp = this.data[i];
      this.data[i] = this.data[best];
      this.data[best] = tmp;
      i = best;
    }
  }
  get size() { return this.data.length; }
}
export class NavGraph {
  constructor(world) {
    this.world = world;
    this.ts    = world.tileSize; // 40 m per tile

    // Sorted arrays for O(log n) nearest-lookup
    this._cols = Array.from(world.roadColumns).sort((a, b) => a - b);
    this._rows = Array.from(world.roadRows).sort((a, b) => a - b);

    // O(1) index maps: gridValue → index in sorted array
    this._colIdx = new Map(this._cols.map((v, i) => [v, i]));
    this._rowIdx = new Map(this._rows.map((v, i) => [v, i]));
  }

  // ── Snap any world position to the nearest intersection ─────────────────
  snapToNode(wx, wz) {
    const gx = this._bsNearest(this._cols, wx / this.ts);
    const gz = this._bsNearest(this._rows, wz / this.ts);
    return { gx, gz };
  }

  // ── Edge Injection: Find bounding intersections for current position ────
  _getStartNodes(wx, wz, allowMalls = true) {
    // Detect if we are inside ANY mall shortcut block
    if (allowMalls && this.world && this.world.getBaseHeight) {
      const gx = wx / this.ts;
      const gz = wz / this.ts;
      
      if (isMallBlock(Math.floor(gx), Math.floor(gz), this.world.roadColumns, this.world.roadRows, null, this.world.getBaseHeight.bind(this.world))) {
        // Find the bounding roads for this block
        const cols = Array.from(this.world.roadColumns).sort((a, b) => a - b);
        const rows = Array.from(this.world.roadRows).sort((a, b) => a - b);
        let leftCol = 0, rightCol = 0, topRow = 0, bottomRow = 0;
        
        for (let i = 0; i < cols.length - 1; i++) {
          if (gx > cols[i] && gx < cols[i+1]) { leftCol = cols[i]; rightCol = cols[i+1]; break; }
        }
        for (let i = 0; i < rows.length - 1; i++) {
          if (gz > rows[i] && gz < rows[i+1]) { topRow = rows[i]; bottomRow = rows[i+1]; break; }
        }

        // If we found valid boundaries, create the 4 corner nodes
        if (leftCol !== rightCol && topRow !== bottomRow) {
          const nodes = [
            { gx: leftCol, gz: topRow },
            { gx: rightCol, gz: topRow },
            { gx: leftCol, gz: bottomRow },
            { gx: rightCol, gz: bottomRow }
          ];
          return nodes.map(n => {
            const dX = n.gx * this.ts - wx;
            const dZ = n.gz * this.ts - wz;
            return { ...n, cost: Math.sqrt(dX * dX + dZ * dZ) };
          });
        }
      }
    }

    const gxNearest = this._bsNearest(this._cols, wx / this.ts);
    const gzNearest = this._bsNearest(this._rows, wz / this.ts);
    
    // Determine if we are on a vertical or horizontal road by seeing which axis we are closer to
    const dx = Math.abs(wx / this.ts - gxNearest);
    const dz = Math.abs(wz / this.ts - gzNearest);
    
    const nodes = [];
    
    if (dx < dz) {
      // Closer to a vertical road (column gxNearest), bounded by rows
      const val = wz / this.ts;
      let ri = 0;
      while (ri < this._rows.length && this._rows[ri] < val) ri++;
      if (ri > 0) nodes.push({ gx: gxNearest, gz: this._rows[ri - 1] });
      if (ri < this._rows.length) nodes.push({ gx: gxNearest, gz: this._rows[ri] });
    } else {
      // Closer to a horizontal road (row gzNearest), bounded by columns
      const val = wx / this.ts;
      let ci = 0;
      while (ci < this._cols.length && this._cols[ci] < val) ci++;
      if (ci > 0) nodes.push({ gx: this._cols[ci - 1], gz: gzNearest });
      if (ci < this._cols.length) nodes.push({ gx: this._cols[ci], gz: gzNearest });
    }
    
    // Fallback if empty (should never happen on valid grid)
    if (nodes.length === 0) nodes.push({ gx: gxNearest, gz: gzNearest });
    
    // Map to node objects with initial Euclidean distance cost
    return nodes.map(n => {
      const dX = n.gx * this.ts - wx;
      const dZ = n.gz * this.ts - wz;
      return { ...n, cost: Math.sqrt(dX * dX + dZ * dZ) };
    });
  }

  // ── A*  from world position (x0,z0) → (x1,z1)  returns Vector3[] ───────
  // All waypoints sit at road intersections → the path never enters a building.
  // variance: per-AI float (0..2) that biases edge costs to create different routes.
  findPath(x0, z0, x1, z1, variance = 0, allowMalls = true) {
    const goal       = this.snapToNode(x1, z1);
    const startNodes = this._getStartNodes(x0, z0, allowMalls);

    const key  = (gx, gz) => `${gx},${gz}`;
    const hdx  = goal.gx;
    const hdz  = goal.gz;
    const ts   = this.ts;
    const heur = (gx, gz) => {
      const dx = (gx - hdx) * ts;
      const dz = (gz - hdz) * ts;
      return Math.sqrt(dx * dx + dz * dz);
    };

    const openHeap = new MinHeap();
    const closed   = new Set();
    const gScore   = new Map();

    // Inject start edges
    for (const sn of startNodes) {
      if (sn.gx === goal.gx && sn.gz === goal.gz) {
        return [new THREE.Vector3(x1, 0.5, z1)]; // Trivial case
      }
      const sk = key(sn.gx, sn.gz);
      gScore.set(sk, sn.cost);
      openHeap.push({ gx: sn.gx, gz: sn.gz, g: sn.cost, f: sn.cost + heur(sn.gx, sn.gz), parent: null, key: sk });
    }

    const MAX_ITER = 4000;
    let iters = 0;

    while (openHeap.size > 0 && iters++ < MAX_ITER) {
      const cur = openHeap.pop();
      
      // Lazy deletion: skip if we already visited this node via a shorter path
      if (closed.has(cur.key)) continue;
      closed.add(cur.key);

      // Goal reached → reconstruct path
      if (cur.gx === goal.gx && cur.gz === goal.gz) {
        return this._reconstruct(cur, x1, z1);
      }

      const curG = gScore.get(cur.key) ?? 0;

      const neighbors = this._neighbors(cur.gx, cur.gz, variance, allowMalls);
      for (let i = 0; i < neighbors.length; i++) {
        const nb = neighbors[i];
        const nk = key(nb.gx, nb.gz);
        if (closed.has(nk)) continue;

        const ng = curG + nb.cost;
        if (ng < (gScore.get(nk) ?? Infinity)) {
          gScore.set(nk, ng);
          openHeap.push({
            gx: nb.gx, gz: nb.gz,
            g: ng, f: ng + heur(nb.gx, nb.gz),
            parent: cur,
            key: nk
          });
        }
      }
    }

    // Fallback: single waypoint (straight line) — A* failed
    console.warn('[NavGraph] A* found no path, falling back to direct target');
    return [new THREE.Vector3(x1, 0.5, z1)];
  }

  // ── Reconstruct path from goal node back to start ───────────────────────
  _reconstruct(goalNode, exactX, exactZ) {
    const rawPath = [];
    let c = goalNode;
    while (c) {
      rawPath.unshift(new THREE.Vector3(c.gx * this.ts, 0.5, c.gz * this.ts));
      c = c.parent;
    }
    
    // Post-process to inject curved waypoints around the mall showroom foundation
    const path = [];
    for (let i = 0; i < rawPath.length; i++) {
      if (i > 0) {
        const A = rawPath[i - 1];
        const B = rawPath[i];
        // Detect mall diagonal edge (skips both rows and columns by more than 1 tile)
        if (Math.abs(A.x - B.x) > this.ts * 1.5 && Math.abs(A.z - B.z) > this.ts * 1.5) {
          const dir = B.clone().sub(A).normalize();
          const right = new THREE.Vector3(dir.z, 0, -dir.x); // Perpendicular vector
          const dist = A.distanceTo(B);

          // 1. Entry glass door (36.06m inward from the corner intersection matches the 25.5m offset in world coords)
          const entryDoor = A.clone().addScaledVector(dir, 36.06);
          path.push(entryDoor);

          // 2. Smooth arc approach (pushed 22m right to ensure pure pursuit lookahead clears the 14.5m pedestal)
          const arc1 = A.clone().addScaledVector(dir, dist * 0.5 - 14.0).addScaledVector(right, 22.0);
          path.push(arc1);

          // 3. Center arc
          const centerArc = A.clone().addScaledVector(dir, dist * 0.5).addScaledVector(right, 22.0);
          path.push(centerArc);

          // 4. Smooth arc exit
          const arc2 = A.clone().addScaledVector(dir, dist * 0.5 + 14.0).addScaledVector(right, 22.0);
          path.push(arc2);

          // 5. Exit glass door
          const exitDoor = B.clone().sub(dir.clone().multiplyScalar(36.06));
          path.push(exitDoor);
        }
      }
      path.push(rawPath[i]);
    }
    
    // Append the exact goal world position as the final target
    path.push(new THREE.Vector3(exactX, 0.5, exactZ));
    return path;
  }

  // ── Get all navigable neighbor intersections from (gx, gz) ─────────────
  _neighbors(gx, gz, variance = 0, allowMalls = true) {

    const result = [];
    const ci = this._colIdx.get(gx);
    const ri = this._rowIdx.get(gz);

    // Safety: node must be a valid intersection
    if (ci === undefined || ri === undefined) return result;

    // Horizontal road (row gz): move to adjacent columns
    if (ci > 0)
      result.push(this._edge(gx, gz, this._cols[ci - 1], gz, variance));
    if (ci < this._cols.length - 1)
      result.push(this._edge(gx, gz, this._cols[ci + 1], gz, variance));

    // Vertical road (column gx): move to adjacent rows
    if (ri > 0)
      result.push(this._edge(gx, gz, gx, this._rows[ri - 1], variance));
    if (ri < this._rows.length - 1)
      result.push(this._edge(gx, gz, gx, this._rows[ri + 1], variance));

    // --- MALL SHORTCUT INJECTION ---
    // Detect if we are at a corner of ANY mall block
    if (allowMalls && this.world && this.world.getBaseHeight) {
      const checkMall = (colLeft, colRight, rowTop, rowBottom) => {
        if (colLeft === undefined || colRight === undefined || rowTop === undefined || rowBottom === undefined) return;
        const midX = Math.floor((colLeft + colRight) / 2);
        const midZ = Math.floor((rowTop + rowBottom) / 2);
        
        if (isMallBlock(midX, midZ, this.world.roadColumns, this.world.roadRows, null, this.world.getBaseHeight.bind(this.world))) {
          // If we are Top-Left of this mall
          if (gx === colLeft && gz === rowTop) result.push(this._mallEdge(gx, gz, colRight, rowBottom));
          // If we are Bottom-Right
          if (gx === colRight && gz === rowBottom) result.push(this._mallEdge(gx, gz, colLeft, rowTop));
          // If we are Top-Right
          if (gx === colRight && gz === rowTop) result.push(this._mallEdge(gx, gz, colLeft, rowBottom));
          // If we are Bottom-Left
          if (gx === colLeft && gz === rowBottom) result.push(this._mallEdge(gx, gz, colRight, rowTop));
        }
      };

      // Check the 4 adjacent blocks (defined by the roads bordering them)
      if (ci < this._cols.length - 1 && ri < this._rows.length - 1)
        checkMall(this._cols[ci], this._cols[ci+1], this._rows[ri], this._rows[ri+1]); // Bottom-Right block
      if (ci > 0 && ri < this._rows.length - 1)
        checkMall(this._cols[ci-1], this._cols[ci], this._rows[ri], this._rows[ri+1]); // Bottom-Left block
      if (ci < this._cols.length - 1 && ri > 0)
        checkMall(this._cols[ci], this._cols[ci+1], this._rows[ri-1], this._rows[ri]); // Top-Right block
      if (ci > 0 && ri > 0)
        checkMall(this._cols[ci-1], this._cols[ci], this._rows[ri-1], this._rows[ri]); // Top-Left block
    }

    return result;
  }

  // ── Build a special, highly-discounted diagonal edge through the mall ───
  _mallEdge(gx0, gz0, gx1, gz1) {
    const dx = (gx1 - gx0) * this.ts;
    const dz = (gz1 - gz0) * this.ts;
    const dist = Math.sqrt(dx * dx + dz * dz);
    // Apply a 30% cost discount (0.7). This ensures it's a huge shortcut for corners,
    // but not cheap enough to justify taking it just to immediately merge back onto the same straight road.
    return { gx: gx1, gz: gz1, cost: dist * 0.70 };
  }

  // ── Build one edge with Euclidean distance cost (alleys discounted) ─────
  _edge(gx0, gz0, gx1, gz1, variance = 0) {
    const dx   = (gx1 - gx0) * this.ts;
    const dz   = (gz1 - gz0) * this.ts;
    const dist = Math.sqrt(dx * dx + dz * dz);

    // Alley tiles along the midpoint of this segment are shortcuts → cheaper
    const midGx = Math.round((gx0 + gx1) / 2);
    const midGz = Math.round((gz0 + gz1) / 2);
    const alley = this.world.isAlley && this.world.isAlley(midGx, midGz);

    // Per-AI variance: slight sinusoidal cost bias so each car finds different routes
    // Uses a hash of the destination node so bias is consistent for same edge
    const varBias = variance > 0
      ? 1.0 + Math.sin(gx1 * variance * 5.1 + gz1 * variance * 3.7) * 0.30
      : 1.0;

    return { gx: gx1, gz: gz1, cost: dist * (alley ? 0.55 : 1.0) * Math.max(0.5, varBias) };
  }

  // ── Binary-search nearest value in a sorted array ───────────────────────
  _bsNearest(arr, val) {
    if (arr.length === 0) return 0;
    let lo = 0, hi = arr.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid] < val) lo = mid + 1; else hi = mid;
    }
    if (lo > 0 && Math.abs(arr[lo - 1] - val) <= Math.abs(arr[lo] - val)) lo--;
    return arr[lo];
  }
}
