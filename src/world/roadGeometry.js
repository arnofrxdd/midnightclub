import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// Sutherland-Hodgman Polygon Clipping
function clipPolygonAgainstEdge(polygon, edgeStart, edgeEnd, normal) {
  const output = [];
  if (polygon.length === 0) return output;

  let prevPoint = polygon[polygon.length - 1];
  let prevInside = (prevPoint.x - edgeStart.x) * normal.x + (prevPoint.z - edgeStart.z) * normal.z >= 0;

  for (let i = 0; i < polygon.length; i++) {
    const currPoint = polygon[i];
    const currInside = (currPoint.x - edgeStart.x) * normal.x + (currPoint.z - edgeStart.z) * normal.z >= 0;

    if (currInside) {
      if (!prevInside) {
        // Intersection point
        const t = ((edgeStart.x - prevPoint.x) * normal.x + (edgeStart.z - prevPoint.z) * normal.z) /
                  ((currPoint.x - prevPoint.x) * normal.x + (currPoint.z - prevPoint.z) * normal.z);
        output.push({
          x: prevPoint.x + t * (currPoint.x - prevPoint.x),
          z: prevPoint.z + t * (currPoint.z - prevPoint.z)
        });
      }
      output.push(currPoint);
    } else if (prevInside) {
      // Intersection point
      const t = ((edgeStart.x - prevPoint.x) * normal.x + (edgeStart.z - prevPoint.z) * normal.z) /
                ((currPoint.x - prevPoint.x) * normal.x + (currPoint.z - prevPoint.z) * normal.z);
      output.push({
        x: prevPoint.x + t * (currPoint.x - prevPoint.x),
        z: prevPoint.z + t * (currPoint.z - prevPoint.z)
      });
    }

    prevPoint = currPoint;
    prevInside = currInside;
  }

  return output;
}

function clipPolygonAgainstAABB(polygon, minX, maxX, minZ, maxZ) {
  let clipped = polygon;
  clipped = clipPolygonAgainstEdge(clipped, {x: minX, z: 0}, {x: minX, z: 1}, {x: 1, z: 0}); // Left
  clipped = clipPolygonAgainstEdge(clipped, {x: maxX, z: 0}, {x: maxX, z: 1}, {x: -1, z: 0}); // Right
  clipped = clipPolygonAgainstEdge(clipped, {x: 0, z: minZ}, {x: 1, z: minZ}, {x: 0, z: 1}); // Top
  clipped = clipPolygonAgainstEdge(clipped, {x: 0, z: maxZ}, {x: 1, z: maxZ}, {x: 0, z: -1}); // Bottom
  return clipped;
}

function triangulatePolygon(polygon, yOffset = 0) {
  if (polygon.length < 3) return null;
  
  const shape = new THREE.Shape();
  // We map -z to y, and use rotateX(-PI/2) so the normals point UP (0,1,0) and the final Z is correct.
  shape.moveTo(polygon[0].x, -polygon[0].z);
  for (let i = 1; i < polygon.length; i++) {
    shape.lineTo(polygon[i].x, -polygon[i].z);
  }
  shape.lineTo(polygon[0].x, -polygon[0].z);

  const geometry = new THREE.ShapeGeometry(shape);
  // ShapeGeometry creates vertices in X, Y plane. We need them in X, Z.
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, yOffset, 0);
  
  // Set UVs based on world coordinates to prevent seams across chunks
  const posAttr = geometry.attributes.position;
  const uvAttr = geometry.attributes.uv;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const z = posAttr.getZ(i);
    uvAttr.setXY(i, x / 40, z / 40); // Standardize UV scaling
  }

  return geometry;
}

export function generateRoadGeometryForChunk(chunkPosX, chunkPosZ, tileSize, mapGraph) {
  const minX = chunkPosX - tileSize / 2;
  const maxX = chunkPosX + tileSize / 2;
  const minZ = chunkPosZ - tileSize / 2;
  const maxZ = chunkPosZ + tileSize / 2;

  const geometries = [];

  // 1. Process Edges (Road Segments)
  for (const edge of mapGraph.edges.values()) {
    const nA = edge.nodeA;
    const nB = edge.nodeB;

    // Quick AABB reject
    const edgeMinX = Math.min(nA.x, nB.x) - edge.width;
    const edgeMaxX = Math.max(nA.x, nB.x) + edge.width;
    const edgeMinZ = Math.min(nA.z, nB.z) - edge.width;
    const edgeMaxZ = Math.max(nA.z, nB.z) + edge.width;

    if (edgeMaxX < minX || edgeMinX > maxX || edgeMaxZ < minZ || edgeMinZ > maxZ) {
      continue;
    }

    const dx = nB.x - nA.x;
    const dz = nB.z - nA.z;
    const len = Math.sqrt(dx * dx + dz * dz);
    const nx = -dz / len;
    const nz = dx / len;

    const hw = edge.width / 2;
    
    // Rectangle corners for the road segment
    const poly = [
      { x: nA.x + nx * hw, z: nA.z + nz * hw },
      { x: nB.x + nx * hw, z: nB.z + nz * hw },
      { x: nB.x - nx * hw, z: nB.z - nz * hw },
      { x: nA.x - nx * hw, z: nA.z - nz * hw }
    ];

    const clipped = clipPolygonAgainstAABB(poly, minX, maxX, minZ, maxZ);
    const geo = triangulatePolygon(clipped, 0.1);
    if (geo) geometries.push(geo);
  }

  // 2. Process Nodes (Intersections)
  for (const node of mapGraph.nodes.values()) {
    // Determine max road width at this intersection
    let maxWidth = 0;
    for (const e of node.edges) {
      if (e.width > maxWidth) maxWidth = e.width;
    }
    
    const r = maxWidth / 2;
    if (node.x + r < minX || node.x - r > maxX || node.z + r < minZ || node.z - r > maxZ) {
      continue;
    }

    // Generate a circle polygon for the intersection
    const segments = 16;
    const poly = [];
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      poly.push({
        x: node.x + Math.cos(angle) * r,
        z: node.z + Math.sin(angle) * r
      });
    }

    const clipped = clipPolygonAgainstAABB(poly, minX, maxX, minZ, maxZ);
    const geo = triangulatePolygon(clipped, 0.11); // Slightly higher to prevent z-fighting with roads
    if (geo) geometries.push(geo);
  }

  if (geometries.length === 0) return null;

  return BufferGeometryUtils.mergeGeometries(geometries);
}

export function generateSidewalkGeometryForChunk(chunkPosX, chunkPosZ, tileSize, mapGraph) {
  const minX = chunkPosX - tileSize / 2;
  const maxX = chunkPosX + tileSize / 2;
  const minZ = chunkPosZ - tileSize / 2;
  const maxZ = chunkPosZ + tileSize / 2;

  const geometries = [];

  const SIDEWALK_OFFSET = 12; // 6 meters on each side

  // 1. Process Edges (Road Segments + Sidewalk)
  for (const edge of mapGraph.edges.values()) {
    const nA = edge.nodeA;
    const nB = edge.nodeB;

    const totalWidth = edge.width + SIDEWALK_OFFSET;

    const edgeMinX = Math.min(nA.x, nB.x) - totalWidth;
    const edgeMaxX = Math.max(nA.x, nB.x) + totalWidth;
    const edgeMinZ = Math.min(nA.z, nB.z) - totalWidth;
    const edgeMaxZ = Math.max(nA.z, nB.z) + totalWidth;

    if (edgeMaxX < minX || edgeMinX > maxX || edgeMaxZ < minZ || edgeMinZ > maxZ) {
      continue;
    }

    const dx = nB.x - nA.x;
    const dz = nB.z - nA.z;
    const len = Math.sqrt(dx * dx + dz * dz);
    const nx = -dz / len;
    const nz = dx / len;

    const hw = totalWidth / 2;
    
    // Rectangle corners for the wider sidewalk segment
    // We extend the length slightly to overlap intersections perfectly
    const ext = 2; // small extension to avoid cracks at corners
    const poly = [
      { x: nA.x + nx * hw - (dx/len)*ext, z: nA.z + nz * hw - (dz/len)*ext },
      { x: nB.x + nx * hw + (dx/len)*ext, z: nB.z + nz * hw + (dz/len)*ext },
      { x: nB.x - nx * hw + (dx/len)*ext, z: nB.z - nz * hw + (dz/len)*ext },
      { x: nA.x - nx * hw - (dx/len)*ext, z: nA.z - nz * hw - (dz/len)*ext }
    ];

    const clipped = clipPolygonAgainstAABB(poly, minX, maxX, minZ, maxZ);
    // Render sidewalks at yOffset 0.05, underneath asphalt at 0.1
    const geo = triangulatePolygon(clipped, 0.05);
    if (geo) geometries.push(geo);
  }

  // 2. Process Nodes (Intersections)
  for (const node of mapGraph.nodes.values()) {
    let maxWidth = 0;
    for (const e of node.edges) {
      if (e.width > maxWidth) maxWidth = e.width;
    }
    
    const r = (maxWidth + SIDEWALK_OFFSET) / 2;
    if (node.x + r < minX || node.x - r > maxX || node.z + r < minZ || node.z - r > maxZ) {
      continue;
    }

    const segments = 16;
    const poly = [];
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      poly.push({
        x: node.x + Math.cos(angle) * r,
        z: node.z + Math.sin(angle) * r
      });
    }

    const clipped = clipPolygonAgainstAABB(poly, minX, maxX, minZ, maxZ);
    const geo = triangulatePolygon(clipped, 0.055); // Slightly higher than sidewalk edges to prevent z-fighting
    if (geo) geometries.push(geo);
  }

  if (geometries.length === 0) return null;

  return BufferGeometryUtils.mergeGeometries(geometries);
}
