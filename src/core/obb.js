import * as THREE from 'three';

/**
 * Separating Axis Theorem (SAT) for 2D Oriented Bounding Box collision.
 * Evaluates in the X/Z plane.
 * 
 * @param {Object} carA - Must have .position (Vector3) and .heading (radians)
 * @param {Object} carB - Must have .position (Vector3) and .heading (radians)
 * @param {number} widthA - Width of carA in meters
 * @param {number} lengthA - Length of carA in meters
 * @param {number} widthB - Width of carB in meters
 * @param {number} lengthB - Length of carB in meters
 * @returns {Object} { collision: boolean, overlap: number, pushDir: THREE.Vector3 }
 */
export function testOBBCollision(carA, carB, widthA = 1.9, lengthA = 4.6, widthB = 1.9, lengthB = 4.6, heightThreshold = 1.8) {
  // Prevent collision if one car is significantly above/below another
  if (Math.abs(carA.position.y - carB.position.y) > heightThreshold) {
    return { collision: false };
  }

  const posA = { x: carA.position.x, z: carA.position.z };
  const posB = { x: carB.position.x, z: carB.position.z };

  const axes = [
    { x: Math.cos(carA.heading), z: -Math.sin(carA.heading) }, // A's local X (Right)
    { x: Math.sin(carA.heading), z: Math.cos(carA.heading) },  // A's local Z (Forward)
    { x: Math.cos(carB.heading), z: -Math.sin(carB.heading) }, // B's local X (Right)
    { x: Math.sin(carB.heading), z: Math.cos(carB.heading) }   // B's local Z (Forward)
  ];

  let minOverlap = Infinity;
  let smallestAxis = null;

  for (let i = 0; i < 4; i++) {
    const axis = axes[i];
    
    const pA = projectOBB(posA, carA.heading, widthA, lengthA, axis);
    const pB = projectOBB(posB, carB.heading, widthB, lengthB, axis);

    if (pA.max <= pB.min || pB.max <= pA.min) {
      return { collision: false };
    }

    const overlap1 = pA.max - pB.min;
    const overlap2 = pB.max - pA.min;
    const overlap = Math.min(overlap1, overlap2);

    if (overlap < minOverlap) {
      minOverlap = overlap;
      smallestAxis = axis;
      
      // Ensure normal points from B to A
      const dX = posA.x - posB.x;
      const dZ = posA.z - posB.z;
      if (dX * axis.x + dZ * axis.z < 0) {
        smallestAxis = { x: -axis.x, z: -axis.z };
      }
    }
  }

  // Return a normalized 3D push vector from B to A (on XZ plane)
  // And a slight padding to prevent getting stuck
  return { 
    collision: true, 
    overlap: minOverlap + 0.05, 
    pushDir: new THREE.Vector3(smallestAxis.x, 0, smallestAxis.z) 
  };
}

function projectOBB(pos, heading, w, l, axis) {
  const hw = w / 2;
  const hl = l / 2;
  
  const rightX = Math.cos(heading);
  const rightZ = -Math.sin(heading);
  const fwdX = Math.sin(heading);
  const fwdZ = Math.cos(heading);

  const corners = [
    { x: pos.x + rightX * hw + fwdX * hl, z: pos.z + rightZ * hw + fwdZ * hl },
    { x: pos.x - rightX * hw + fwdX * hl, z: pos.z - rightZ * hw + fwdZ * hl },
    { x: pos.x - rightX * hw - fwdX * hl, z: pos.z - rightZ * hw - fwdZ * hl },
    { x: pos.x + rightX * hw - fwdX * hl, z: pos.z + rightZ * hw - fwdZ * hl }
  ];

  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < 4; i++) {
    const proj = corners[i].x * axis.x + corners[i].z * axis.z;
    if (proj < min) min = proj;
    if (proj > max) max = proj;
  }
  return { min, max };
}
