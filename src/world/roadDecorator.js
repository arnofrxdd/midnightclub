import * as THREE from 'three';

// Random helper
function hashInt(x, y, seed) {
  let h = Math.imul(x ^ (y << 16) ^ seed, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296.0;
}

export function decorateChunk(chunkPosX, chunkPosZ, tileSize, mapGraph, mockWorld) {
  const minX = chunkPosX - tileSize / 2;
  const maxX = chunkPosX + tileSize / 2;
  const minZ = chunkPosZ - tileSize / 2;
  const maxZ = chunkPosZ + tileSize / 2;

  const result = {
    streetlightTransforms: [],
    localTrunks: [],
    localLeaves: [],
    localLeavesCherry: [],
    localLeavesAutumn: [],
    benchTransforms: [],
    hydrantTransforms: [],
    phoneBoothTransforms: [],
    trashCanTransforms: [],
    trafficLights: []
  };

  const SIDEWALK_OFFSET = 12;

  // 1. Process Edges for streetlights and props
  for (const edge of mapGraph.edges.values()) {
    const nA = edge.nodeA;
    const nB = edge.nodeB;

    const dx = nB.x - nA.x;
    const dz = nB.z - nA.z;
    const len = Math.sqrt(dx * dx + dz * dz);
    const nx = -dz / len;
    const nz = dx / len;

    const hw = (edge.width / 2) + 1.5; // Place on the edge of the sidewalk

    // Walk along the edge in steps
    const step = 40; // streetlight every 40 meters
    for (let t = 0; t < len; t += step) {
      // Calculate world coordinates along the spline
      const px = nA.x + (dx / len) * t;
      const pz = nA.z + (dz / len) * t;

      // Check if this segment point falls within our chunk
      // We check a radius to ensure items spawn correctly if they are on the chunk border
      if (px < minX - 10 || px > maxX + 10 || pz < minZ - 10 || pz > maxZ + 10) continue;

      // Both sides of the road
      for (const side of [1, -1]) {
        const sx = px + nx * hw * side;
        const sz = pz + nz * hw * side;

        // Strict chunk bounds check for the actual prop position
        if (sx >= minX && sx < maxX && sz >= minZ && sz < maxZ) {
          
          const seed = hashInt(Math.floor(sx), Math.floor(sz), 0);
          
          // Add Streetlight (every 40m)
          const angle = Math.atan2(dz, dx) + (side > 0 ? Math.PI / 2 : -Math.PI / 2);
          
          const tf = new THREE.Matrix4().makeTranslation(sx, 0, sz);
          tf.multiply(new THREE.Matrix4().makeRotationY(angle));
          
          result.streetlightTransforms.push({
            matrix: tf,
            x: sx,
            z: sz,
            nx: nx * side,
            nz: nz * side,
            angle: angle,
            seed: seed
          });

          // Add Tree (offset slightly from streetlight)
          if (seed > 0.2) {
            const treeX = sx + (dx / len) * 20;
            const treeZ = sz + (dz / len) * 20;
            if (treeX >= minX && treeX < maxX && treeZ >= minZ && treeZ < maxZ) {
              const tSeed = hashInt(Math.floor(treeX), Math.floor(treeZ), 1);
              
              const trunkGeo = new THREE.BoxGeometry(0.8, 4.0, 0.8);
              trunkGeo.translate(treeX, 2.35, treeZ);
              result.localTrunks.push(trunkGeo);

              const lg = new THREE.BoxGeometry(3.5, 3.5 * 0.85, 3.5);
              lg.translate(treeX, 3.8 + 0.35, treeZ);

              if (tSeed > 0.8) {
                result.localLeavesCherry.push(lg);
              } else if (tSeed > 0.6) {
                result.localLeavesAutumn.push(lg);
              } else {
                result.localLeaves.push(lg);
              }
            }
          }

          // Random props (Benches, Trash Cans, Hydrants)
          const propSeed = hashInt(Math.floor(sx), Math.floor(sz), 2);
          if (propSeed < 0.3) {
            const propX = sx + (dx / len) * 10;
            const propZ = sz + (dz / len) * 10;
            if (propX >= minX && propX < maxX && propZ >= minZ && propZ < maxZ) {
              const tf = new THREE.Matrix4().makeTranslation(propX, 0, propZ);
              const rot = new THREE.Matrix4().makeRotationY(angle);
              tf.multiply(rot);

              if (propSeed < 0.1) {
                result.benchTransforms.push(tf);
              } else if (propSeed < 0.2) {
                result.trashCanTransforms.push(tf);
              } else {
                result.hydrantTransforms.push(tf);
              }
            }
          }
        }
      }
    }
  }

  // 2. Process Nodes (Intersections) for Traffic Lights
  for (const node of mapGraph.nodes.values()) {
    if (node.x >= minX && node.x < maxX && node.z >= minZ && node.z < maxZ) {
      if (node.edges.length > 2) {
        // Find max width
        let maxW = 0;
        for (const e of node.edges) {
          if (e.width > maxW) maxW = e.width;
        }
        const cornerDist = maxW / 2 + 1.5;

        // Place a traffic light at the 4 generic corners of the intersection
        for (const cx of [-1, 1]) {
          for (const cz of [-1, 1]) {
            const tlx = node.x + cornerDist * cx;
            const tlz = node.z + cornerDist * cz;
            
            // Add traffic light data (visuals created via worker templates)
            result.trafficLights.push({
              x: tlx,
              z: tlz,
              cx: cx,
              cz: cz,
              tileX: chunkPosX / tileSize,
              tileZ: chunkPosZ / tileSize,
              intersectionX: node.x,
              intersectionZ: node.z,
              axis: cz === 1 ? 'x' : 'z',
              redName: `tl_r_${node.id}_${cx}_${cz}`,
              yellowName: `tl_y_${node.id}_${cx}_${cz}`,
              greenName: `tl_g_${node.id}_${cx}_${cz}`
            });

          }
        }
      }
    }
  }

  return result;
}
