import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
//  NavGraph  –  Road-intersection waypoint graph + A* pathfinder
//  Adapted for arbitrary graph structures (Nodes and Edges).
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
  constructor(mapGraph) {
    this.mapGraph = mapGraph;
  }

  // ── Snap any world position to the nearest intersection ─────────────────
  snapToNode(wx, wz) {
    return this.mapGraph.getNearestNode(wx, wz);
  }

  // ── A*  from world position (x0,z0) → (x1,z1)  returns Vector3[] ───────
  findPath(x0, z0, x1, z1, variance = 0) {
    if (!this.mapGraph || this.mapGraph.nodes.size === 0) {
      return [new THREE.Vector3(x1, 0.5, z1)];
    }

    const startNode = this.snapToNode(x0, z0);
    const goalNode = this.snapToNode(x1, z1);

    if (!startNode || !goalNode) return [new THREE.Vector3(x1, 0.5, z1)];
    if (startNode.id === goalNode.id) return [new THREE.Vector3(x1, 0.5, z1)];

    const heur = (n) => {
      const dx = n.x - goalNode.x;
      const dz = n.z - goalNode.z;
      return Math.sqrt(dx * dx + dz * dz);
    };

    const openHeap = new MinHeap();
    const closed = new Set();
    const gScore = new Map();

    const startDist = heur(startNode);
    gScore.set(startNode.id, startDist);
    openHeap.push({ node: startNode, g: startDist, f: startDist + heur(startNode), parent: null });

    const MAX_ITER = 8000;
    let iters = 0;

    while (openHeap.size > 0 && iters++ < MAX_ITER) {
      const cur = openHeap.pop();
      
      if (closed.has(cur.node.id)) continue;
      closed.add(cur.node.id);

      if (cur.node.id === goalNode.id) {
        return this._reconstruct(cur, x1, z1);
      }

      const curG = gScore.get(cur.node.id) ?? 0;

      for (const edge of cur.node.edges) {
        const neighbor = edge.getOtherNode(cur.node);
        if (!neighbor) continue;
        if (closed.has(neighbor.id)) continue;

        // Add variance bias to cost
        const varBias = variance > 0
          ? 1.0 + Math.sin(neighbor.x * variance * 5.1 + neighbor.z * variance * 3.7) * 0.30
          : 1.0;
        
        const cost = edge.length * Math.max(0.5, varBias);
        const ng = curG + cost;
        
        if (ng < (gScore.get(neighbor.id) ?? Infinity)) {
          gScore.set(neighbor.id, ng);
          openHeap.push({
            node: neighbor,
            g: ng,
            f: ng + heur(neighbor),
            parent: cur
          });
        }
      }
    }

    console.warn('[NavGraph] A* found no path, falling back to direct target');
    return [new THREE.Vector3(x1, 0.5, z1)];
  }

  // ── Reconstruct path from goal node back to start ───────────────────────
  _reconstruct(goalState, exactX, exactZ) {
    const path = [];
    let c = goalState;
    while (c) {
      path.unshift(new THREE.Vector3(c.node.x, 0.5, c.node.z));
      c = c.parent;
    }
    path.push(new THREE.Vector3(exactX, 0.5, exactZ));
    return path;
  }
}
