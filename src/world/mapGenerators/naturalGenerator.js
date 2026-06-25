import { MapGraph } from '../mapGraph.js';

export function generateNaturalMap(seedOffset = 0, size = 3000, spacing = 200, jitter = 20) {
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

  // Force local jitter to be max 15-20 units for city structure alignment
  const targetJitter = Math.min(jitter, 20);

  // 1. Generate Nodes
  for (let x = minIdx; x <= maxIdx; x++) {
    for (let z = minIdx; z <= maxIdx; z++) {
      const baseX = x * spacing;
      const baseZ = z * spacing;
      
      // Snapping diagonal highway nodes and peripheral ring road nodes to eliminate crookedness
      const isDiagonalHighway = (x === z);
      const isRingRoad = (x === minIdx || x === maxIdx || z === minIdx || z === maxIdx);
      const snapNode = isDiagonalHighway || isRingRoad;

      const jx = snapNode ? 0 : (random(x, z, 1) - 0.5) * 2 * targetJitter;
      const jz = snapNode ? 0 : (random(x, z, 2) - 0.5) * 2 * targetJitter;
      
      const node = graph.addNode(baseX + jx, baseZ + jz);
      points.set(`${x},${z}`, node);
    }
  }

  // 2. Connect Edges
  for (let x = minIdx; x <= maxIdx; x++) {
    for (let z = minIdx; z <= maxIdx; z++) {
      const current = points.get(`${x},${z}`);
      if (!current) continue;

      const isRingRoadZ = (z === minIdx || z === maxIdx);
      const isRingRoadX = (x === minIdx || x === maxIdx);

      // East connection (horizontal)
      const neighborEast = points.get(`${x + 1},${z}`);
      if (neighborEast) {
        // High connection probability for grid roads
        const prob = 0.98;
        if (random(x, z, 10) <= prob) {
          // If along the peripheral border, make it a wider ring highway
          const width = isRingRoadZ ? 36 : 26;
          graph.addEdge(current, neighborEast, width, 'road');
        }
      }

      // South connection (vertical)
      const neighborSouth = points.get(`${x},${z + 1}`);
      if (neighborSouth) {
        const prob = 0.98;
        if (random(x, z, 20) <= prob) {
          const width = isRingRoadX ? 36 : 26;
          graph.addEdge(current, neighborSouth, width, 'road');
        }
      }
      
      // Clean Diagonal Highway (connecting x===z to x+1===z+1 sequentially)
      if (x === z) {
        const neighborDiag = points.get(`${x + 1},${z + 1}`);
        if (neighborDiag) {
          // Dedicated 40m wide diagonal freeway
          graph.addEdge(current, neighborDiag, 40, 'road');
        }
      }
    }
  }

  // 3. Remove orphaned nodes (nodes with < 1 edge, grid cities have dead ends but no isolated dots)
  const toRemove = [];
  for (const node of graph.nodes.values()) {
    if (node.edges.length === 0) {
      toRemove.push(node);
    }
  }
  
  for (const node of toRemove) {
    graph.nodes.delete(node.id);
  }

  return graph;
}

