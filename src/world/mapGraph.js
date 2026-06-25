export class MapNode {
  constructor(id, x, z) {
    this.id = id;
    this.x = x;
    this.z = z;
    this.edges = []; // Array of MapEdge
  }
}

export class MapEdge {
  constructor(id, nodeA, nodeB, width, type = 'road') {
    this.id = id;
    this.nodeA = nodeA;
    this.nodeB = nodeB;
    this.width = width;
    this.type = type; // 'road', 'alley', 'highway'
    
    // Derived properties
    const dx = nodeB.x - nodeA.x;
    const dz = nodeB.z - nodeA.z;
    this.length = Math.sqrt(dx * dx + dz * dz);
  }

  getOtherNode(node) {
    if (this.nodeA.id === node.id) return this.nodeB;
    if (this.nodeB.id === node.id) return this.nodeA;
    return null;
  }
}

export class MapGraph {
  constructor() {
    this.nodes = new Map(); // id -> MapNode
    this.edges = new Map(); // id -> MapEdge
    this.nextNodeId = 0;
    this.nextEdgeId = 0;
  }

  addNode(x, z) {
    const id = this.nextNodeId++;
    const node = new MapNode(id, x, z);
    this.nodes.set(id, node);
    return node;
  }

  addEdge(nodeA, nodeB, width, type = 'road') {
    // Check if edge already exists
    for (const edge of nodeA.edges) {
      if (edge.getOtherNode(nodeA).id === nodeB.id) {
        return edge; // Edge already exists
      }
    }

    const id = this.nextEdgeId++;
    const edge = new MapEdge(id, nodeA, nodeB, width, type);
    this.edges.set(id, edge);
    nodeA.edges.push(edge);
    nodeB.edges.push(edge);
    return edge;
  }

  getNode(id) {
    return this.nodes.get(id);
  }

  getEdge(id) {
    return this.edges.get(id);
  }

  // Find the nearest node to a given position
  getNearestNode(x, z) {
    let minDist = Infinity;
    let nearest = null;
    for (const node of this.nodes.values()) {
      const dx = node.x - x;
      const dz = node.z - z;
      const distSq = dx * dx + dz * dz;
      if (distSq < minDist) {
        minDist = distSq;
        nearest = node;
      }
    }
    return nearest;
  }

  // Find the nearest edge (road segment) to a given position
  getNearestEdge(x, z) {
    let minDist = Infinity;
    let nearestEdge = null;
    let nearestPoint = null;

    for (const edge of this.edges.values()) {
      const nA = edge.nodeA;
      const nB = edge.nodeB;
      const dx = nB.x - nA.x;
      const dz = nB.z - nA.z;
      const lenSq = dx * dx + dz * dz;

      let t = ((x - nA.x) * dx + (z - nA.z) * dz) / lenSq;
      t = Math.max(0, Math.min(1, t));

      const px = nA.x + t * dx;
      const pz = nA.z + t * dz;

      const dpx = x - px;
      const dpz = z - pz;
      const distSq = dpx * dpx + dpz * dpz;

      if (distSq < minDist) {
        minDist = distSq;
        nearestEdge = edge;
        nearestPoint = { x: px, z: pz, t };
      }
    }
    return { edge: nearestEdge, point: nearestPoint, distSq: minDist };
  }

  isOnRoad(x, z) {
    const { edge, distSq } = this.getNearestEdge(x, z);
    if (!edge) return false;
    const widthSq = (edge.width / 2) * (edge.width / 2);
    return distSq <= widthSq;
  }

  serialize() {
    const nodes = Array.from(this.nodes.values()).map(n => ({
      id: n.id,
      x: n.x,
      z: n.z
    }));

    const edges = Array.from(this.edges.values()).map(e => ({
      id: e.id,
      nodeA: e.nodeA.id,
      nodeB: e.nodeB.id,
      width: e.width,
      type: e.type,
      length: e.length
    }));

    return { nodes, edges };
  }

  deserialize(data) {
    this.nodes.clear();
    this.edges.clear();
    this.nextNodeId = 0;
    this.nextEdgeId = 0;

    for (const n of data.nodes) {
      const node = new MapNode(n.id, n.x, n.z);
      this.nodes.set(node.id, node);
      this.nextNodeId = Math.max(this.nextNodeId, node.id + 1);
    }

    for (const e of data.edges) {
      const nodeA = this.nodes.get(e.nodeA);
      const nodeB = this.nodes.get(e.nodeB);
      if (nodeA && nodeB) {
        const edge = new MapEdge(e.id, nodeA, nodeB, e.width, e.type);
        this.edges.set(edge.id, edge);
        nodeA.edges.push(edge);
        nodeB.edges.push(edge);
        this.nextEdgeId = Math.max(this.nextEdgeId, edge.id + 1);
      }
    }
  }
}
