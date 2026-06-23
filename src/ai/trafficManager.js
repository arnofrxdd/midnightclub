import * as THREE from 'three';
import { TrafficVehicle } from './trafficVehicle.js';

export class TrafficManager {
  constructor(scene, maxVehicles = 18) {
    this.scene = scene;
    this.maxVehicles = maxVehicles;
    this.vehicles = [];
    this.parkedVehicles = [];
    this.maxParkedVehicles = 12;
    
    // Web Worker Preparation: 
    // We allocate a flat array of numbers to hold all traffic data.
    // Each vehicle takes 16 floats: 
    // [id, type, color, x, y, z, heading, pitch, roll, opacity, speed, isSkidding, skidDirX, skidDirZ, pad, pad]
    const totalCars = this.maxVehicles + this.maxParkedVehicles;
    this.sharedBuffer = new Float32Array(totalCars * 16);
  }

  init(playerPos, world = null) {
    const types = ['cab', 'sedan', 'suv', 'sports', 'pickup', 'van'];
    const colors = [
      0xfce300, // Yellow Taxi Cab
      0xe0e0e0, // Silver Sedan
      0xcc2222, // Red Sport Coupe
      0x2e4a62, // Slate Blue SUV
      0x4a4a4a, // Charcoal Sedan
      0x39ff14, // Neon Lime Green
      0x00ffff, // Neon Cyan
      0xf0f0f5, // Pearl White
      0xde3163  // Cherry Pink
    ];

    for (let i = 0; i < this.maxVehicles; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const color = type === 'cab' ? 0xfce300 : colors[Math.floor(Math.random() * colors.length)];
      
      const v = new TrafficVehicle(i, type, color, playerPos, world);
      this.vehicles.push(v);
    }

    // Initialize parked vehicles
    const existingPositions = [];
    for (let i = 0; i < this.maxParkedVehicles; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const pv = new TrafficVehicle(1000 + i, type, color, playerPos, world);
      pv.recycle(playerPos, 0, [], world, true, existingPositions); // Recycle as parked!
      this.parkedVehicles.push(pv);
      existingPositions.push(pv.position);
    }
  }

  update(dt, playerPos, playerHeading = 0, aiRacers = [], camera = null, world = null, roadblocks = [], heatLevel = 0, activeCops = []) {
    // Dynamic traffic density based on heat level (clears the streets as things get wilder)
    const baseLimit = this.dynamicActiveMax !== undefined ? this.dynamicActiveMax : this.maxVehicles;
    const activeMax = Math.max(2, baseLimit - heatLevel * 3);

    // Object Pool Spawning: Wake up inactive vehicles if we are below activeMax
    let activeCount = 0;
    for (let i = 0; i < this.vehicles.length; i++) {
      if (this.vehicles[i].isActive !== false) activeCount++;
    }

    if (activeCount < activeMax && this.vehicles.length > 0) {
      // Find the first inactive vehicle and spawn it (max 1 per frame to avoid hitch)
      for (let i = 0; i < this.vehicles.length; i++) {
        if (this.vehicles[i].isActive === false) {
          this.vehicles[i].isActive = true;
          this.vehicles[i].recycle(playerPos, playerHeading, aiRacers, world);
          break;
        }
      }
    }

    // Build camera frustum if camera is provided
    // Cache the Frustum and Matrix4 as instance fields to avoid per-frame heap allocation
    if (camera) {
      if (!this._frustum)    this._frustum    = new THREE.Frustum();
      if (!this._projMatrix) this._projMatrix  = new THREE.Matrix4();
      this._projMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
      this._frustum.setFromProjectionMatrix(this._projMatrix);
    }
    const frustum = camera ? this._frustum : null;

    // Build the obstacle list for traffic vehicles collision avoidance
    const allObstacles = [];
    if (playerPos) {
      allObstacles.push({ id: 'player', position: playerPos });
    }
    aiRacers.forEach(ai => {
      allObstacles.push({ id: 'ai_' + ai.id, position: ai.position });
    });
    this.vehicles.forEach(v => {
      if (v.isActive !== false) {
        allObstacles.push({ id: 'traffic_' + v.id, position: v.position });
      }
    });
    this.parkedVehicles.forEach(v => {
      allObstacles.push({ id: 'parked_' + v.id, position: v.position });
    });

    // Hoist player forward scalars — constant for all vehicles this frame
    const pFwdX = Math.sin(playerHeading);
    const pFwdZ = Math.cos(playerHeading);

    // 1. Update parked vehicles
    for (let i = this.parkedVehicles.length - 1; i >= 0; i--) {
      const pv = this.parkedVehicles[i];
      // Parked vehicles fade out if player is far away, and resolve sliding physics when hit
      const needsRecycle = pv.update(dt, playerPos, playerHeading, [], false, frustum, []);
      if (needsRecycle) {
        // Collect existing positions to avoid spawning on top of other cars or cops
        const existingPositions = [];
        existingPositions.push(playerPos);
        this.parkedVehicles.forEach(other => {
          if (other !== pv) {
            existingPositions.push(other.position);
          }
        });
        this.vehicles.forEach(other => {
          existingPositions.push(other.position);
        });
        activeCops.forEach(cop => {
          if (cop.active) {
            existingPositions.push(cop.position);
          }
        });
        pv.recycle(playerPos, playerHeading, aiRacers, world, true, existingPositions, frustum);
      }
    }

    // 2. Update active traffic vehicles
    for (let i = this.vehicles.length - 1; i >= 0; i--) {
      const v = this.vehicles[i];
      if (v.isActive === false) continue;

      // Build per-update obstacle list excluding self (reuse allObstacles, skip by id)
      const selfKey = 'traffic_' + v.id;
      const others = allObstacles.filter(o => o.id !== selfKey);

      // Check if near any active roadblock
      let nearRoadblock = false;
      roadblocks.forEach(rb => {
        if (v.position.distanceTo(rb.position) < 65.0) {
          nearRoadblock = true;
        }
      });
      
      // Update vehicle state
      const needsRecycle = v.update(dt, playerPos, playerHeading, others, nearRoadblock, frustum, activeCops);

      if (needsRecycle) {
        if (activeCount > activeMax) {
          // Unload from scene silently
          v.isActive = false;
          activeCount--; // Adjust local count so we only disable the correct amount
          v.opacity = 0.0; // Ensure it visually disappears instantly
        } else {
          // Recycle normally (relocate out of view, fade back in, avoiding AI)
          v.recycle(playerPos, playerHeading, aiRacers, world);
        }
      }
    }

    this.syncToBuffer();
  }

  syncToBuffer() {
    let offset = 0;
    
    // Sync Active Vehicles
    for (let i = 0; i < this.maxVehicles; i++) {
      const v = this.vehicles[i];
      if (v && v.isActive !== false) {
        this.sharedBuffer[offset++] = v.id;
        this.sharedBuffer[offset++] = v.type === 'cab' ? 0 : (v.type === 'sedan' ? 1 : 2); // Simple enum mapping
        this.sharedBuffer[offset++] = v.colorHex;
        this.sharedBuffer[offset++] = v.position.x;
        this.sharedBuffer[offset++] = v.position.y;
        this.sharedBuffer[offset++] = v.position.z;
        this.sharedBuffer[offset++] = v.heading;
        this.sharedBuffer[offset++] = v.pitch || 0;
        this.sharedBuffer[offset++] = v.roll || 0;
        this.sharedBuffer[offset++] = v.opacity !== undefined ? v.opacity : 1.0;
        
        // Physics / Visual Effects Data
        this.sharedBuffer[offset++] = v.speed || 0;
        
        const isSkidding = v.impactVelocity && v.impactVelocity.lengthSq() > 9.0;
        this.sharedBuffer[offset++] = isSkidding ? 1.0 : 0.0;
        
        if (isSkidding) {
            const backward = v.impactVelocity.clone().negate().normalize();
            this.sharedBuffer[offset++] = backward.x;
            this.sharedBuffer[offset++] = backward.z;
        } else {
            this.sharedBuffer[offset++] = 0;
            this.sharedBuffer[offset++] = 0;
        }
        
        this.sharedBuffer[offset++] = 0; // Padding
        this.sharedBuffer[offset++] = 0; // Padding
      } else {
        // Inactive slot
        this.sharedBuffer[offset] = -1; // ID = -1 means empty
        this.sharedBuffer[offset + 9] = 0.0; // Opacity 0
        offset += 16;
      }
    }
    
    // Sync Parked Vehicles
    for (let i = 0; i < this.maxParkedVehicles; i++) {
      const v = this.parkedVehicles[i];
      if (v) {
        this.sharedBuffer[offset++] = v.id;
        this.sharedBuffer[offset++] = v.type === 'cab' ? 0 : (v.type === 'sedan' ? 1 : 2);
        this.sharedBuffer[offset++] = v.colorHex;
        this.sharedBuffer[offset++] = v.position.x;
        this.sharedBuffer[offset++] = v.position.y;
        this.sharedBuffer[offset++] = v.position.z;
        this.sharedBuffer[offset++] = v.heading;
        this.sharedBuffer[offset++] = v.pitch || 0;
        this.sharedBuffer[offset++] = v.roll || 0;
        this.sharedBuffer[offset++] = v.opacity !== undefined ? v.opacity : 1.0;

        // Parked cars logic
        this.sharedBuffer[offset++] = v.impactVelocity ? v.impactVelocity.length() : 0; // speed
        const isSkidding = v.impactVelocity && v.impactVelocity.lengthSq() > 0.1;
        this.sharedBuffer[offset++] = isSkidding ? 1.0 : 0.0;

        if (isSkidding) {
            const backward = v.impactVelocity.clone().negate().normalize();
            this.sharedBuffer[offset++] = backward.x;
            this.sharedBuffer[offset++] = backward.z;
        } else {
            this.sharedBuffer[offset++] = 0;
            this.sharedBuffer[offset++] = 0;
        }

        this.sharedBuffer[offset++] = 1.0; // Is Parked flag in padding slot
        this.sharedBuffer[offset++] = 0; // Padding
      } else {
        this.sharedBuffer[offset] = -1;
        this.sharedBuffer[offset + 9] = 0.0;
        offset += 16;
      }
    }
  }

  clear() {
    this.vehicles.concat(this.parkedVehicles).forEach(v => {
      if (v.meshGroup) {
        v.meshGroup.traverse(child => {
          if (child.geometry) child.geometry.dispose();
        });
        this.scene.remove(v.meshGroup);
      }
    });
    this.vehicles = [];
    this.parkedVehicles = [];
  }
}
