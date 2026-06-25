import { MapGraph } from '../mapGraph.js';

export function generateNaturalMap(seedOffset = 0, size = 3000, spacing = 200, jitter = 80) {
  const graph = new MapGraph();
  
  // Create a grid of perturbed points
  const points = new Map(); // key -> node
  
  const minIdx = Math.floor(-size / 2 / spacing);
  const maxIdx = Math.ceil(size / 2 / spacing);
  
  // Seeded random function
  const random = (x, z, salt) => {
    const seed = Math.sin(x * 12.9898 + z * 78.233 + salt + seedOffset) * 43758.5453;
    return seed - Math.floor(seed);
  };

  // 1. Generate Nodes
  for (let x = minIdx; x <= maxIdx; x++) {
    for (let z = minIdx; z <= maxIdx; z++) {
      const baseX = x * spacing;
      const baseZ = z * spacing;
      
      const jx = (random(x, z, 1) - 0.5) * 2 * jitter;
      const jz = (random(x, z, 2) - 0.5) * 2 * jitter;
      
      const node = graph.addNode(baseX + jx, baseZ + jz);
      points.set(`${x},${z}`, node);
    }
  }

  // 2. Connect Edges
  for (let x = minIdx; x <= maxIdx; x++) {
    for (let z = minIdx; z <= maxIdx; z++) {
      const current = points.get(`${x},${z}`);
      if (!current) continue;

      const connect = (dx, dz, type, width, prob) => {
        if (random(x, z, dx * 10 + dz) > prob) return;
        const neighbor = points.get(`${x + dx},${z + dz}`);
        if (neighbor) {
          graph.addEdge(current, neighbor, width, type);
        }
      };

      // Connect East
      connect(1, 0, 'road', 26, 0.95);
      // Connect South
      connect(0, 1, 'road', 26, 0.95);
      
      // Random Diagonals for angular/natural feel
      connect(1, 1, 'road', 20, 0.3); // SE
      connect(1, -1, 'road', 20, 0.3); // NE
    }
  }

  // 3. Remove orphaned nodes (nodes with < 2 edges)
  const toRemove = [];
  for (const node of graph.nodes.values()) {
    if (node.edges.length < 2) {
      toRemove.push(node);
    }
  }
  
  for (const node of toRemove) {
    graph.nodes.delete(node.id);
    for (const edge of node.edges) {
      graph.edges.delete(edge.id);
      const other = edge.getOtherNode(node);
      if (other) {
        other.edges = other.edges.filter(e => e.id !== edge.id);
      }
    }
  }

  return graph;
}
