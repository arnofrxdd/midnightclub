import * as THREE from 'three';

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
//  The AI can NEVER be steered through a building because no waypoint is ever
//  inside a building — they are all on road intersections.
// ─────────────────────────────────────────────────────────────────────────────
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

  // ── A*  from world position (x0,z0) → (x1,z1)  returns Vector3[] ───────
  // All waypoints sit at road intersections → the path never enters a building.
  // variance: per-AI float (0..2) that biases edge costs to create different routes.
  findPath(x0, z0, x1, z1, variance = 0) {
    const start = this.snapToNode(x0, z0);
    const goal  = this.snapToNode(x1, z1);

    // Trivial case: already at the same intersection
    if (start.gx === goal.gx && start.gz === goal.gz) {
      return [new THREE.Vector3(x1, 0.5, z1)];
    }

    const key  = (gx, gz) => `${gx},${gz}`;
    const hdx  = goal.gx;
    const hdz  = goal.gz;
    const ts   = this.ts;
    const heur = (gx, gz) => {
      const dx = (gx - hdx) * ts;
      const dz = (gz - hdz) * ts;
      return Math.sqrt(dx * dx + dz * dz);
    };

    // open: key → node  (node = { gx, gz, g, f, parent })
    const open   = new Map();
    const closed = new Set();
    const gScore = new Map();

    const sk = key(start.gx, start.gz);
    open.set(sk, { gx: start.gx, gz: start.gz, g: 0, f: heur(start.gx, start.gz), parent: null });
    gScore.set(sk, 0);

    const MAX_ITER = 4000;
    let iters = 0;

    while (open.size > 0 && iters++ < MAX_ITER) {
      // Extract lowest-f node (simple linear scan — open set stays small ~100 nodes)
      let bestKey = null, bestF = Infinity;
      for (const [k, n] of open) {
        if (n.f < bestF) { bestF = n.f; bestKey = k; }
      }

      const cur = open.get(bestKey);
      open.delete(bestKey);
      closed.add(bestKey);

      // Goal reached → reconstruct path
      if (cur.gx === goal.gx && cur.gz === goal.gz) {
        return this._reconstruct(cur, x1, z1);
      }

      const curG = gScore.get(bestKey) ?? 0;

      for (const nb of this._neighbors(cur.gx, cur.gz, variance)) {

        const nk = key(nb.gx, nb.gz);
        if (closed.has(nk)) continue;

        const ng = curG + nb.cost;
        if (ng < (gScore.get(nk) ?? Infinity)) {
          gScore.set(nk, ng);
          open.set(nk, {
            gx: nb.gx, gz: nb.gz,
            g: ng, f: ng + heur(nb.gx, nb.gz),
            parent: cur
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
    const path = [];
    let c = goalNode;
    while (c) {
      path.unshift(new THREE.Vector3(c.gx * this.ts, 0.5, c.gz * this.ts));
      c = c.parent;
    }
    // Append the exact goal world position as the final target
    path.push(new THREE.Vector3(exactX, 0.5, exactZ));
    return path;
  }

  // ── Get all navigable neighbor intersections from (gx, gz) ─────────────
  _neighbors(gx, gz, variance = 0) {

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

    return result;
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
