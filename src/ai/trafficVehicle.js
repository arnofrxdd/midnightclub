import * as THREE from 'three';
import { getTrafficLightState } from '../world/geometry.js';

export class TrafficVehicle {
  constructor(id, type, colorHex, playerPos, world = null) {
    this.id = id;
    this.type = type; // 'cab', 'sedan', 'suv'
    this.colorHex = colorHex;
    this.world = world;
    
    this.position = new THREE.Vector3();
    this.heading = 0;
    
    this.targetSpeed = 14 + Math.random() * 8; // Civilian cruising speed
    this.speed = 0.0; // Start at 0 speed and accelerate
    this.opacity = 0.0; // Start transparent to fade in!
    
    // Grid alignment
    this.roadAxis = 'x'; // 'x' if driving horizontally along X, 'z' if driving vertically along Z
    this.roadCoord = 0;   // The fixed coordinate of the road
    this.dirSign = 1;     // 1 for positive direction (+X or +Z), -1 for negative direction
    
    // Cooldown to prevent multi-turns at the same intersection
    this.lastIntersectionKey = '';

    // Visual mesh reference
    this.meshGroup = null;
    this.wheels = [];
    
    this.impactVelocity = new THREE.Vector3();
    this.impactSpin = 0.0;
    this.isRecovering = false;
    this.isParked = false;
    
    // Spawn initial position near player, initially out of direct view
    this.recycle(playerPos, 0, [], world);
  }

  getRoadWidth() {
    if (this.world && typeof this.world.getRoadWidthForGrid === 'function') {
      const gridCoord = Math.round(this.roadCoord / 40);
      const { rwX, rwZ } = this.world.getRoadWidthForGrid(gridCoord, gridCoord);
      return this.roadAxis === 'x' ? rwZ : rwX;
    }
    const gridCoord = Math.round(this.roadCoord / 40);
    const streetIndex = Math.floor(gridCoord / 4);
    if (this.roadAxis === 'x') {
      const seed = Math.sin(streetIndex * 78.233) * 43758.5453;
      const rand = seed - Math.floor(seed);
      return rand > 0.6 ? 14 : 26;
    } else {
      const seed = Math.sin(streetIndex * 12.9898) * 43758.5453;
      const rand = seed - Math.floor(seed);
      return rand > 0.6 ? 14 : 26;
    }
  }

  findParkingSpot(playerPos, world, existingPositions = []) {
    if (!world) return null;
    
    const playerGridX = Math.round(playerPos.x / 40);
    const playerGridZ = Math.round(playerPos.z / 40);
    
    // First pass: try 80 attempts in a 9x9 grid around the player (medium distance)
    for (let attempt = 0; attempt < 80; attempt++) {
      const gx = playerGridX + Math.floor(Math.random() * 9) - 4;
      const gz = playerGridZ + Math.floor(Math.random() * 9) - 4;
      
      const posX = gx * 40;
      const posZ = gz * 40;
      
      const tempPos = new THREE.Vector3(posX, 0.5, posZ);
      const dist = tempPos.distanceTo(playerPos);
      if (dist < 50 || dist > 220) continue;
      
      const isCol = world.roadColumns && world.roadColumns.has(gx);
      const isRow = world.roadRows && world.roadRows.has(gz);
      const isIntersection = isCol && isRow;
      const isAlley = typeof world.isAlley === 'function' && world.isAlley(gx, gz);
      
      if (isIntersection) continue;
      
      let parkX = posX;
      let parkZ = posZ;
      let heading = 0;
      let roadAxis = 'x';
      let roadCoord = 0;
      let dirSign = 1;
      let foundSpot = false;

      if (isCol && !isAlley) {
        // Vertical road: park along east/west curb
        const { rwX } = world.getRoadWidthForGrid(gx, gz);
        const roadWidth = rwX;
        const side = Math.random() > 0.5 ? 1 : -1;
        const offsetZ = Math.random() > 0.5 ? 6 : -6; // Offset 6m to stay clear of street props
        
        parkX = posX + side * (roadWidth / 2 - 1.2);
        parkZ = posZ + offsetZ;
        heading = side > 0 ? 0 : Math.PI;
        roadAxis = 'z';
        roadCoord = posX;
        dirSign = side;
        foundSpot = true;
      } else if (isRow && !isAlley) {
        // Horizontal road: park along north/south curb
        const { rwZ } = world.getRoadWidthForGrid(gx, gz);
        const roadWidth = rwZ;
        const side = Math.random() > 0.5 ? 1 : -1;
        const offsetX = Math.random() > 0.5 ? 6 : -6;
        
        parkX = posX + offsetX;
        parkZ = posZ + side * (roadWidth / 2 - 1.2);
        heading = side > 0 ? Math.PI / 2 : -Math.PI / 2;
        roadAxis = 'x';
        roadCoord = posZ;
        dirSign = side;
        foundSpot = true;
      } else if (isAlley) {
        // Alley parking: park along edges
        const isNS = world.shortcutColumns && world.shortcutColumns.has(gx);
        const isEW = world.shortcutRows && world.shortcutRows.has(gz);
        
        if (isNS && !isEW) {
          const side = Math.random() > 0.5 ? 1 : -1;
          const offsetZ = Math.random() > 0.5 ? 6 : -6;
          
          parkX = posX + side * 13;
          parkZ = posZ + offsetZ;
          heading = side > 0 ? 0 : Math.PI;
          roadAxis = 'z';
          roadCoord = posX;
          dirSign = side;
          foundSpot = true;
        } else if (isEW && !isNS) {
          const side = Math.random() > 0.5 ? 1 : -1;
          const offsetX = Math.random() > 0.5 ? 6 : -6;
          
          parkX = posX + offsetX;
          parkZ = posZ + side * 13;
          heading = side > 0 ? Math.PI / 2 : -Math.PI / 2;
          roadAxis = 'x';
          roadCoord = posZ;
          dirSign = side;
          foundSpot = true;
        }
      }

      if (foundSpot) {
        // Overlap safety check 1: Streetlight/traffic light/tree props
        let overlapsProp = false;
        if (world.breakables) {
          for (const b of world.breakables) {
            if (b.broken) continue;
            const dx = parkX - b.position.x;
            const dz = parkZ - b.position.z;
            if (dx * dx + dz * dz < 25.0) { // 5.0m radius threshold to keep clear of poles/trees
              overlapsProp = true;
              break;
            }
          }
        }
        if (overlapsProp) continue;

        // Overlap safety check 2: Other vehicles (civilian, police, etc.)
        let overlapsExisting = false;
        for (const pos of existingPositions) {
          if (!pos) continue;
          const dx = parkX - pos.x;
          const dz = parkZ - pos.z;
          if (dx * dx + dz * dz < 49.0) { // 7.0m radius threshold
            overlapsExisting = true;
            break;
          }
        }
        if (overlapsExisting) continue;

        // Overlap safety check 3: Static tile obstacles (alley dumpsters, trash bins, utility poles, walls)
        if (world.checkCollision && world.checkCollision(parkX, parkZ, 3.2).collision) {
          continue;
        }

        return { x: parkX, z: parkZ, heading, roadAxis, roadCoord, dirSign };
      }
    }

    // Second pass: wider search range (13x13 grid) and up to 80 more attempts
    for (let attempt = 0; attempt < 80; attempt++) {
      const gx = playerGridX + Math.floor(Math.random() * 13) - 6;
      const gz = playerGridZ + Math.floor(Math.random() * 13) - 6;
      
      const posX = gx * 40;
      const posZ = gz * 40;
      
      const tempPos = new THREE.Vector3(posX, 0.5, posZ);
      const dist = tempPos.distanceTo(playerPos);
      if (dist < 40 || dist > 300) continue;
      
      const isCol = world.roadColumns && world.roadColumns.has(gx);
      const isRow = world.roadRows && world.roadRows.has(gz);
      const isIntersection = isCol && isRow;
      const isAlley = typeof world.isAlley === 'function' && world.isAlley(gx, gz);
      
      if (isIntersection) continue;
      
      let parkX = posX;
      let parkZ = posZ;
      let heading = 0;
      let roadAxis = 'x';
      let roadCoord = 0;
      let dirSign = 1;
      let foundSpot = false;

      if (isCol && !isAlley) {
        const { rwX } = world.getRoadWidthForGrid(gx, gz);
        const roadWidth = rwX;
        const side = Math.random() > 0.5 ? 1 : -1;
        const offsetZ = Math.random() > 0.5 ? 6 : -6;
        
        parkX = posX + side * (roadWidth / 2 - 1.2);
        parkZ = posZ + offsetZ;
        heading = side > 0 ? 0 : Math.PI;
        roadAxis = 'z';
        roadCoord = posX;
        dirSign = side;
        foundSpot = true;
      } else if (isRow && !isAlley) {
        const { rwZ } = world.getRoadWidthForGrid(gx, gz);
        const roadWidth = rwZ;
        const side = Math.random() > 0.5 ? 1 : -1;
        const offsetX = Math.random() > 0.5 ? 6 : -6;
        
        parkX = posX + offsetX;
        parkZ = posZ + side * (roadWidth / 2 - 1.2);
        heading = side > 0 ? Math.PI / 2 : -Math.PI / 2;
        roadAxis = 'x';
        roadCoord = posZ;
        dirSign = side;
        foundSpot = true;
      } else if (isAlley) {
        const isNS = world.shortcutColumns && world.shortcutColumns.has(gx);
        const isEW = world.shortcutRows && world.shortcutRows.has(gz);
        
        if (isNS && !isEW) {
          const side = Math.random() > 0.5 ? 1 : -1;
          const offsetZ = Math.random() > 0.5 ? 6 : -6;
          
          parkX = posX + side * 13;
          parkZ = posZ + offsetZ;
          heading = side > 0 ? 0 : Math.PI;
          roadAxis = 'z';
          roadCoord = posX;
          dirSign = side;
          foundSpot = true;
        } else if (isEW && !isNS) {
          const side = Math.random() > 0.5 ? 1 : -1;
          const offsetX = Math.random() > 0.5 ? 6 : -6;
          
          parkX = posX + offsetX;
          parkZ = posZ + side * 13;
          heading = side > 0 ? Math.PI / 2 : -Math.PI / 2;
          roadAxis = 'x';
          roadCoord = posZ;
          dirSign = side;
          foundSpot = true;
        }
      }

      if (foundSpot) {
        let overlapsProp = false;
        if (world.breakables) {
          for (const b of world.breakables) {
            if (b.broken) continue;
            const dx = parkX - b.position.x;
            const dz = parkZ - b.position.z;
            if (dx * dx + dz * dz < 25.0) {
              overlapsProp = true;
              break;
            }
          }
        }
        if (overlapsProp) continue;

        let overlapsExisting = false;
        for (const pos of existingPositions) {
          if (!pos) continue;
          const dx = parkX - pos.x;
          const dz = parkZ - pos.z;
          if (dx * dx + dz * dz < 49.0) {
            overlapsExisting = true;
            break;
          }
        }
        if (overlapsExisting) continue;

        if (world.checkCollision && world.checkCollision(parkX, parkZ, 3.2).collision) {
          continue;
        }

        return { x: parkX, z: parkZ, heading, roadAxis, roadCoord, dirSign };
      }
    }

    return null;
  }

  recycle(playerPos, playerHeading = 0, aiRacers = [], world = null, isParked = false, existingPositions = []) {
    if (world) this.world = world;
    if (this.impactVelocity) this.impactVelocity.set(0, 0, 0);
    this.impactSpin = 0.0;
    this.isParked = isParked;

    let found = false;
    let spawnX = 0, spawnZ = 0;
    let axis = 'x';
    let dirSign = 1;
    let roadCoord = 0;
    let heading = 0;

    if (isParked && world) {
      const spot = this.findParkingSpot(playerPos, world, existingPositions);
      if (spot) {
        spawnX = spot.x;
        spawnZ = spot.z;
        axis = spot.roadAxis;
        roadCoord = spot.roadCoord;
        dirSign = spot.dirSign;
        heading = spot.heading;
        found = true;
      } else {
        // If we really couldn't find a spot, abort recycling to prevent spawning in active lanes
        return;
      }
    }

    if (!found) {
      const playerForward = new THREE.Vector3(Math.sin(playerHeading), 0, Math.cos(playerHeading));
      
      // Try up to 20 times — ONLY spawn in the player's FORWARD view cone (±60°)
      for (let attempt = 0; attempt < 20; attempt++) {
        // Random angle within ±60° of player heading
        const spreadAngle = (Math.random() - 0.5) * (Math.PI * 2 / 3);
        const spawnAngle = playerHeading + spreadAngle;
        // Far enough ahead to fade in before visible (120–280 units)
        const spawnDist = 120 + Math.random() * 160;

        const candidateX = playerPos.x + Math.sin(spawnAngle) * spawnDist;
        const candidateZ = playerPos.z + Math.cos(spawnAngle) * spawnDist;

        // Snap candidate to nearest road grid intersection
        const snapToIntersection = (cx, cz) => {
          let nearestCol = 0;
          let minColDist = Infinity;
          const gridX = Math.round(cx / 40);
          const gridZ = Math.round(cz / 40);
          for (let x = gridX - 8; x <= gridX + 8; x++) {
            if (world.roadColumns.has(x)) {
              const dist = Math.abs(x - gridX);
              if (dist < minColDist) {
                minColDist = dist;
                nearestCol = x;
              }
            }
          }
          let nearestRow = 0;
          let minRowDist = Infinity;
          for (let z = gridZ - 8; z <= gridZ + 8; z++) {
            if (world.roadRows.has(z)) {
              const dist = Math.abs(z - gridZ);
              if (dist < minRowDist) {
                minRowDist = dist;
                nearestRow = z;
              }
            }
          }
          return {
            blockX: nearestCol * 40,
            blockZ: nearestRow * 40
          };
        };

        let nearBlockX = Math.round(candidateX / 160) * 160;
        let nearBlockZ = Math.round(candidateZ / 160) * 160;
        if (world && world.roadColumns && world.roadRows) {
          const snapped = snapToIntersection(candidateX, candidateZ);
          nearBlockX = snapped.blockX;
          nearBlockZ = snapped.blockZ;
        }

        axis = Math.random() > 0.5 ? 'x' : 'z';
        dirSign = Math.random() > 0.5 ? 1 : -1;

        let tempX, tempZ;
        if (axis === 'x') {
          roadCoord = nearBlockZ;
          tempX = nearBlockX + (Math.random() - 0.5) * 120;
          
          // Determine roadWidth for this candidate row
          const gridZ = Math.round(roadCoord / 40);
          const streetZ = Math.floor(gridZ / 4);
          const seedZ = Math.sin(streetZ * 78.233) * 43758.5453;
          const randZ = seedZ - Math.floor(seedZ);
          const rw = randZ > 0.6 ? 14 : 26;
          const offset = rw === 14 ? 2.5 : 5.0;
          tempZ = roadCoord + (dirSign > 0 ? -offset : offset);
        } else {
          roadCoord = nearBlockX;
          tempZ = nearBlockZ + (Math.random() - 0.5) * 120;
          
          // Determine roadWidth for this candidate column
          const gridX = Math.round(roadCoord / 40);
          const streetX = Math.floor(gridX / 4);
          const seedX = Math.sin(streetX * 12.9898) * 43758.5453;
          const randX = seedX - Math.floor(seedX);
          const rw = randX > 0.6 ? 14 : 26;
          const offset = rw === 14 ? 2.5 : 5.0;
          tempX = roadCoord + (dirSign > 0 ? offset : -offset);
        }

        // Reject spawning inside alleys to keep civilian traffic on main roads
        const candGridX = Math.round(tempX / 40);
        const candGridZ = Math.round(tempZ / 40);
        if (world && typeof world.isAlley === 'function' && world.isAlley(candGridX, candGridZ)) {
          continue;
        }

        const tempPos = new THREE.Vector3(tempX, 0.5, tempZ);
        const dist = tempPos.distanceTo(playerPos);

        // Must be in forward distance band
        if (dist < 80 || dist > 320) continue;

        // Must be in the forward hemisphere — reject anything beside or behind the player
        const toSpawn = tempPos.clone().sub(playerPos).normalize();
        const dot = playerForward.dot(toSpawn);
        if (dot < 0.15) continue;

        // Don't spawn so close straight ahead that they pop in visibly
        if (dot > 0.85 && dist < 140) continue;

        // Don't spawn at the player's own block center
        let playerBlockX = Math.round(playerPos.x / 160) * 160;
        let playerBlockZ = Math.round(playerPos.z / 160) * 160;
        if (world && world.roadColumns && world.roadRows) {
          const pSnapped = snapToIntersection(playerPos.x, playerPos.z);
          playerBlockX = pSnapped.blockX;
          playerBlockZ = pSnapped.blockZ;
        }
        if (nearBlockX === playerBlockX && nearBlockZ === playerBlockZ && dist < 100) continue;

        // Avoid spawning near AI racers
        let tooCloseToAI = false;
        for (const ai of aiRacers) {
          if (tempPos.distanceTo(ai.position) < 60.0) {
            tooCloseToAI = true;
            break;
          }
        }
        if (tooCloseToAI) continue;

        spawnX = tempX;
        spawnZ = tempZ;
        found = true;
        break;
      }

      if (!found) {
        // Fallback: place car directly ahead of the player at a safe far distance
        const fallbackDist = 200 + Math.random() * 80;
        const fallbackX = playerPos.x + Math.sin(playerHeading) * fallbackDist;
        const fallbackZ = playerPos.z + Math.cos(playerHeading) * fallbackDist;

        axis = Math.random() > 0.5 ? 'x' : 'z';
        dirSign = Math.random() > 0.5 ? 1 : -1;

        if (axis === 'x') {
          roadCoord = Math.round(fallbackZ / 160) * 160;
          spawnX = fallbackX;
          
          const gridZ = Math.round(roadCoord / 40);
          const streetZ = Math.floor(gridZ / 4);
          const seedZ = Math.sin(streetZ * 78.233) * 43758.5453;
          const randZ = seedZ - Math.floor(seedZ);
          const rw = randZ > 0.6 ? 14 : 26;
          const offset = rw === 14 ? 2.5 : 5.0;
          spawnZ = roadCoord + (dirSign > 0 ? -offset : offset);
        } else {
          roadCoord = Math.round(fallbackX / 160) * 160;
          spawnZ = fallbackZ;
          
          const gridX = Math.round(roadCoord / 40);
          const streetX = Math.floor(gridX / 4);
          const seedX = Math.sin(streetX * 12.9898) * 43758.5453;
          const randX = seedX - Math.floor(seedX);
          const rw = randX > 0.6 ? 14 : 26;
          const offset = rw === 14 ? 2.5 : 5.0;
          spawnX = roadCoord + (dirSign > 0 ? offset : -offset);
        }
      }
    }

    const spawnY = (world && typeof world.getGroundHeight === 'function')
      ? world.getGroundHeight(spawnX, spawnZ)
      : 0.5;
    this.position.set(spawnX, spawnY, spawnZ);
    this.roadAxis = axis;
    this.dirSign = dirSign;
    this.roadCoord = roadCoord;
    this.lastIntersectionKey = '';

    if (found && isParked) {
      this.heading = heading;
      this.targetSpeed = 0;
      this.speed = 0;
    } else {
      this.heading = this.roadAxis === 'z'
        ? (this.dirSign > 0 ? 0 : Math.PI)
        : (this.dirSign > 0 ? Math.PI / 2 : -Math.PI / 2);

      this.targetSpeed = 14 + Math.random() * 8;
      this.speed = this.targetSpeed * 0.5; // Start at half speed to avoid stationary pop-in
    }
    this.opacity = 0.0; // Fade in from invisible
    this.isRecovering = false;
    this.crashedAirborne = false;
    this.velocityY = 0.0;
    this.roll = 0.0;
    this.pitch = 0.0;
    this.rollVelocity = 0.0;
    this.pitchVelocity = 0.0;
  }

  update(dt, playerPos, playerHeading = 0, otherCars = [], forceFade = false, frustum = null, activeCops = []) {
    const distToPlayer = this.position.distanceTo(playerPos);
    
    // Project direction to see if the vehicle is in front of or behind the player camera (pure scalar)
    const pfSin = Math.sin(playerHeading);
    const pfCos = Math.cos(playerHeading);
    const toVx = this.position.x - playerPos.x;
    const toVz = this.position.z - playerPos.z;
    const toVlen = Math.sqrt(toVx * toVx + toVz * toVz) || 1;
    const dot = pfSin * (toVx / toVlen) + pfCos * (toVz / toVlen);

    // Check if the vehicle is inside the camera frustum or visible
    let inView = true;
    if (frustum) {
      // Reuse a cached Sphere to avoid allocating a new one every frame
      if (!this._sphere) this._sphere = new THREE.Sphere();
      this._sphere.set(this.position, 6.0);
      inView = frustum.intersectsSphere(this._sphere);
    } else {
      inView = (dot >= 0.15); // Fallback: forward-facing cone
    }

    // Check if a cop is close to yield (scalar distance, no alloc)
    let closestCopDist = Infinity;
    activeCops.forEach(cop => {
      if (cop.active && !cop.isParked) {
        const d = this.position.distanceTo(cop.position);
        if (d < closestCopDist) {
          closestCopDist = d;
        }
      }
    });
    const isYielding = closestCopDist < 45.0;
    const yieldIntensity = isYielding ? (1.0 - closestCopDist / 45.0) : 0.0;

    // 1. Calculate target opacity based on distance, frustum visibility, or force fade
    let targetOpacity = 1.0;
    if (forceFade || (activeCops.length > 0 && distToPlayer > 100.0 && !inView)) {
      targetOpacity = 0.0; // Instantly prune far out-of-view cars when pursuit is active
    } else if (!inView && distToPlayer > 50.0) {
      // Fade out if outside player frustum and not super close (to avoid popping during quick camera swings)
      targetOpacity = 0.0;
    } else {
      // Different fade ranges depending on whether the car is in front or behind the player
      const fadeStart = dot >= 0.0 ? 280.0 : 200.0;
      const fadeEnd = dot >= 0.0 ? 340.0 : 260.0;
      
      if (distToPlayer > fadeEnd) {
        targetOpacity = 0.0;
      } else if (distToPlayer > fadeStart) {
        targetOpacity = 1.0 - (distToPlayer - fadeStart) / (fadeEnd - fadeStart);
      }
    }
    
    // Smoothly interpolate current opacity
    this.opacity += (targetOpacity - this.opacity) * 5.0 * dt;
    this.opacity = Math.max(0.0, Math.min(1.0, this.opacity));

    // Recycle/unload checks (completely invisible to player)
    if (!inView && distToPlayer > 50.0 && this.opacity < 0.05) {
      return true;
    }

    if (dot >= 0.0) {
      // In front of the camera: only recycle if extremely far away and fully faded out
      if (distToPlayer > 340.0 && this.opacity < 0.05) {
        return true;
      }
    } else {
      // Behind the camera: recycle once it is far enough and faded out to prevent popping
      if (distToPlayer > 260.0 || (distToPlayer > 200.0 && this.opacity < 0.05)) {
        return true;
      }
    }

    if (this.isParked) {
      // Parked vehicles are static unless pushed by an impact
      const fwdSin = Math.sin(this.heading);
      const fwdCos = Math.cos(this.heading);
      const rgtCos = Math.cos(this.heading + Math.PI / 2);
      const rgtSin = Math.sin(this.heading + Math.PI / 2);

      // No engine speed (speed = 0)
      const totalVelX = this.impactVelocity.x;
      const totalVelZ = this.impactVelocity.z;

      // Separate into forward and lateral velocities relative to tires
      const forwardSpeed = totalVelX * fwdSin + totalVelZ * fwdCos;
      const lateralSpeed = totalVelX * rgtCos + totalVelZ * rgtSin;

      // Apply lateral tire grip resistance (friction)
      const gripDecay = 7.0;
      const newLateralSpeed = lateralSpeed * Math.exp(-gripDecay * dt);

      // Update position physically
      this.position.x += (fwdSin * forwardSpeed + rgtCos * newLateralSpeed) * dt;
      this.position.z += (fwdCos * forwardSpeed + rgtSin * newLateralSpeed) * dt;

      // Advanced 3D Crash Physics
      if (this.crashedAirborne === undefined) this.crashedAirborne = false;
      if (this.velocityY === undefined) this.velocityY = 0.0;
      if (this.roll === undefined) this.roll = 0.0;
      if (this.pitch === undefined) this.pitch = 0.0;
      if (this.rollVelocity === undefined) this.rollVelocity = 0.0;
      if (this.pitchVelocity === undefined) this.pitchVelocity = 0.0;

      const targetY = (this.world && typeof this.world.getGroundHeight === 'function')
        ? this.world.getGroundHeight(this.position.x, this.position.z)
        : 0.5;

      if (this.crashedAirborne) {
        const heightAboveGround = this.position.y - targetY;
        if (heightAboveGround > 0.05 || this.velocityY > 0.5) {
          this.isAirborne = true;
          this.velocityY -= 22.0 * dt;
          this.position.y += this.velocityY * dt;
          this.roll += this.rollVelocity * dt;
          this.pitch += this.pitchVelocity * dt;
          this.rollVelocity *= Math.exp(-3.0 * dt);
          this.pitchVelocity *= Math.exp(-3.0 * dt);
        } else {
          this.position.y = targetY;
          if (this.velocityY < -2.0) {
            this.velocityY = -this.velocityY * 0.18;
          } else {
            this.velocityY = 0.0;
            this.isAirborne = false;
            this.crashedAirborne = false;
          }
          this.roll += (0.0 - this.roll) * 8.0 * dt;
          this.pitch += (0.0 - this.pitch) * 8.0 * dt;
          this.rollVelocity = 0.0;
          this.pitchVelocity = 0.0;
        }
      } else {
        this.position.y = targetY;
        this.isAirborne = false;
        this.roll += (0.0 - this.roll) * 8.0 * dt;
        this.pitch += (0.0 - this.pitch) * 8.0 * dt;
        this.rollVelocity = 0.0;
        this.pitchVelocity = 0.0;
      }

      // Decay impact forces and spin
      this.impactVelocity.multiplyScalar(Math.exp(-2.2 * dt));
      this.heading += this.impactSpin * dt;
      this.impactSpin *= Math.exp(-3.5 * dt);

      return false;
    }

    // 2. Stop Checks: Traffic Lights & Other Vehicles in front
    // 2. Stop Checks: Traffic Lights & Other Vehicles in front
    let stopForLight = false;
    let stopForCar = false;
    let yieldForIntersectionCar = false;

    // Traffic light detection
    let currentBlockX = Math.round(this.position.x / 160) * 160;
    let currentBlockZ = Math.round(this.position.z / 160) * 160;
    if (this.world && typeof this.world.snapToNearestIntersection === 'function') {
      const snapped = this.world.snapToNearestIntersection(this.position.x, this.position.z);
      currentBlockX = snapped.x;
      currentBlockZ = snapped.z;
    }
    const distToIntersectionX = this.position.x - currentBlockX;
    const distToIntersectionZ = this.position.z - currentBlockZ;

    const gameTime = window.gameTime || 0;
    const lights = getTrafficLightState(currentBlockX, currentBlockZ, gameTime);

    if (this.roadAxis === 'x') {
      const approachDist = -distToIntersectionX * this.dirSign; // positive if approaching
      if (approachDist > 12.0 && approachDist < 28.0) {
        const light = lights.xLight;
        if (light === 'red' || light === 'yellow') {
          stopForLight = true;
        }
      }
    } else {
      const approachDist = -distToIntersectionZ * this.dirSign;
      if (approachDist > 12.0 && approachDist < 28.0) {
        const light = lights.zLight;
        if (light === 'red' || light === 'yellow') {
          stopForLight = true;
        }
      }
    }

    // Dodging check: Stop/wait if there is a vehicle directly in front of us (pure scalar, no alloc)
    const fwdSin = Math.sin(this.heading);
    const fwdCos = Math.cos(this.heading);
    const rgtCos = Math.cos(this.heading);
    const rgtSin = -Math.sin(this.heading);

    for (let ci = 0; ci < otherCars.length; ci++) {
      const car = otherCars[ci];
      const cx = car.position.x - this.position.x;
      const cz = car.position.z - this.position.z;
      const localZ = cx * fwdSin + cz * fwdCos;
      const localX = cx * rgtCos + cz * rgtSin;

      // If the other vehicle is in front of us, within 22 meters, and in the same lane (width 4.0m)
      if (localZ > 0.5 && localZ < 22.0 && Math.abs(localX) < 4.0) {
        stopForCar = true;
        break;
      }
    }

    // Intersection collision avoidance (Yielding to cars already in the intersection)
    const inIntersectionCenter = Math.abs(distToIntersectionX) < 6.0 && Math.abs(distToIntersectionZ) < 6.0;
    if (!inIntersectionCenter) {
      let approachDist = 0;
      if (this.roadAxis === 'x') {
        approachDist = -distToIntersectionX * this.dirSign;
      } else {
        approachDist = -distToIntersectionZ * this.dirSign;
      }
      // If close to intersection but not yet inside the center zone
      if (approachDist > 6.0 && approachDist < 18.0) {
        // Check if any other car is already inside the intersection box
        for (let ci = 0; ci < otherCars.length; ci++) {
          const otherCar = otherCars[ci];
          const otherDistX = Math.abs(otherCar.position.x - currentBlockX);
          const otherDistZ = Math.abs(otherCar.position.z - currentBlockZ);
          if (otherDistX < 8.5 && otherDistZ < 8.5) {
            yieldForIntersectionCar = true;
            break;
          }
        }
      }
    }

    // 4. Natural Steering Correction (Steers back to lane using wheels/heading, no snap teleports)
    let baselineAngle = 0;
    let error = 0;
    let rejoinAngle = 0;

    const roadWidth = this.getRoadWidth();
    let offset = roadWidth === 14 ? 2.5 : 5.0;
    if (isYielding) {
      // Yield by steering towards the sidewalk/curb
      offset += yieldIntensity * 3.5;
    }

    if (this.roadAxis === 'x') {
      baselineAngle = this.dirSign > 0 ? Math.PI / 2 : -Math.PI / 2;
      const targetZ = this.roadCoord + (this.dirSign > 0 ? -offset : offset);
      error = targetZ - this.position.z;
      // Steer back at an angle proportional to the displacement
      rejoinAngle = Math.max(-0.65, Math.min(0.65, error * 0.12)) * (-this.dirSign);
    } else {
      baselineAngle = this.dirSign > 0 ? 0 : Math.PI;
      const targetX = this.roadCoord + (this.dirSign > 0 ? offset : -offset);
      error = targetX - this.position.x;
      // Steer back at an angle proportional to the displacement
      rejoinAngle = Math.max(-0.65, Math.min(0.65, error * 0.12)) * this.dirSign;
    }

    // Slow down in intersections / during turns to make steering smooth and prevent sliding/crashing
    const inIntersectionZone = Math.abs(distToIntersectionX) < 12.0 && Math.abs(distToIntersectionZ) < 12.0;
    const isTurningOrInIntersection = inIntersectionZone || this.isRecovering || (Math.abs(baselineAngle - this.heading) > 0.2);

    // Decelerate if stopping, otherwise accelerate to target cruising speed
    // If recovering, let the recovery sub-system handle speed acceleration.
    if (!this.isRecovering) {
      let activeTargetSpeed = (stopForLight || stopForCar || yieldForIntersectionCar) ? 0.0 : this.targetSpeed;
      if (isTurningOrInIntersection && activeTargetSpeed > 0.0) {
        // Slow down to a safe turning/intersection speed
        activeTargetSpeed = Math.min(activeTargetSpeed, 7.5);
      }
      if (isYielding && activeTargetSpeed > 0.0) {
        activeTargetSpeed *= (1.0 - yieldIntensity * 0.65); // Slow down significantly when yielding
      }
      const accelRate = activeTargetSpeed === 0.0 ? 12.0 : 4.0; // Brake harder than accelerate
      this.speed += (activeTargetSpeed - this.speed) * accelRate * dt;
      this.speed = Math.max(0.0, this.speed);
    }

    // 3. Dynamic Physics Collision & Tire Grip simulation (no hardcoding snaps)
    const isPushed = this.impactVelocity.lengthSq() > 3.0;
    if (isPushed) {
      this.isRecovering = true;
    }

    // Combine engine forward speed and external impact velocities (pure scalar, no alloc)
    const totalVelX = fwdSin * this.speed + this.impactVelocity.x;
    const totalVelZ = fwdCos * this.speed + this.impactVelocity.z;

    // Separate into forward and lateral velocities relative to tires
    const forwardSpeed = totalVelX * fwdSin + totalVelZ * fwdCos;
    const lateralSpeed = totalVelX * rgtCos + totalVelZ * rgtSin;

    // Apply lateral tire grip resistance (friction) to reduce side-sliding over time
    const gripDecay = 7.0; // Higher = tighter tire grip
    const newLateralSpeed = lateralSpeed * Math.exp(-gripDecay * dt);

    // Update the position physically
    this.position.x += (fwdSin * forwardSpeed + rgtCos * newLateralSpeed) * dt;
    this.position.z += (fwdCos * forwardSpeed + rgtSin * newLateralSpeed) * dt;

    // Advanced 3D Crash Physics
    if (this.crashedAirborne === undefined) this.crashedAirborne = false;
    if (this.velocityY === undefined) this.velocityY = 0.0;
    if (this.roll === undefined) this.roll = 0.0;
    if (this.pitch === undefined) this.pitch = 0.0;
    if (this.rollVelocity === undefined) this.rollVelocity = 0.0;
    if (this.pitchVelocity === undefined) this.pitchVelocity = 0.0;

    const targetY = (this.world && typeof this.world.getGroundHeight === 'function')
      ? this.world.getGroundHeight(this.position.x, this.position.z)
      : 0.5;

    if (this.crashedAirborne) {
      const heightAboveGround = this.position.y - targetY;
      if (heightAboveGround > 0.05 || this.velocityY > 0.5) {
        this.isAirborne = true;
        this.velocityY -= 22.0 * dt;
        this.position.y += this.velocityY * dt;
        this.roll += this.rollVelocity * dt;
        this.pitch += this.pitchVelocity * dt;
        this.rollVelocity *= Math.exp(-3.0 * dt);
        this.pitchVelocity *= Math.exp(-3.0 * dt);
      } else {
        this.position.y = targetY;
        if (this.velocityY < -2.0) {
          this.velocityY = -this.velocityY * 0.18;
        } else {
          this.velocityY = 0.0;
          this.isAirborne = false;
          this.crashedAirborne = false;
        }
        this.roll += (0.0 - this.roll) * 8.0 * dt;
        this.pitch += (0.0 - this.pitch) * 8.0 * dt;
        this.rollVelocity = 0.0;
        this.pitchVelocity = 0.0;
      }
    } else {
      this.position.y = targetY;
      this.isAirborne = false;
      this.roll += (0.0 - this.roll) * 8.0 * dt;
      this.pitch += (0.0 - this.pitch) * 8.0 * dt;
      this.rollVelocity = 0.0;
      this.pitchVelocity = 0.0;
    }

    // Decay the external impact velocity forces and spin over time
    this.impactVelocity.multiplyScalar(Math.exp(-2.2 * dt));
    this.heading += this.impactSpin * dt;
    this.impactSpin *= Math.exp(-3.5 * dt);

    if (this.isRecovering) {
      if (this.impactVelocity.lengthSq() < 1.5) {
        let diff = baselineAngle - this.heading;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;

        // Realistic driving recovery: must have speed to change heading!
        // Determine steer angle based on alignment difference
        let steer = Math.max(-0.55, Math.min(0.55, diff));

        // If coordinate error is large, steer towards the road coordinate
        if (Math.abs(error) > 4.0) {
          // Rejoin steering angle
          let rejoinSteer = Math.max(-0.55, Math.min(0.55, error * 0.08));
          steer = rejoinSteer * (this.roadAxis === 'x' ? -this.dirSign : this.dirSign);
        }

        // Drive forward slowly to execute the turn (e.g. 5.5 m/s)
        this.speed += (5.5 - this.speed) * 2.5 * dt;

        // Heading changes dynamically by driving forward (speed/length * steer)
        this.heading += (this.speed / 4.4) * steer * dt;

        // Recovery finishes when aligned to road and coordinate error is small
        let finalHeadingDiff = baselineAngle - this.heading;
        while (finalHeadingDiff < -Math.PI) finalHeadingDiff += Math.PI * 2;
        while (finalHeadingDiff > Math.PI) finalHeadingDiff -= Math.PI * 2;

        if (Math.abs(finalHeadingDiff) < 0.18 && Math.abs(error) < 3.5) {
          this.isRecovering = false;
        }
      } else {
        // Decelerate forward speed while sliding sideways from impact
        this.speed += (0.0 - this.speed) * 8.0 * dt;
      }
    } else if (!isPushed) {
      const targetAngle = baselineAngle + rejoinAngle;

      let diff = targetAngle - this.heading;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.heading += diff * 4.5 * dt; // Smooth steering rate towards targeted rejoin angle
    }

    // 5. Handle Intersections (Turning Decisions & Alley Rules)
    // If close to center of intersection in both dimensions
    if (Math.abs(distToIntersectionX) < 6.0 && Math.abs(distToIntersectionZ) < 6.0) {
      const intersectionKey = `${currentBlockX},${currentBlockZ}`;
      
      // Check if we haven't already made a turn decision at this intersection
      if (this.lastIntersectionKey !== intersectionKey) {
        this.lastIntersectionKey = intersectionKey;
        
        const gridX = Math.round(currentBlockX / 40);
        const gridZ = Math.round(currentBlockZ / 40);
        const perpAxis = this.roadAxis === 'x' ? 'z' : 'x';
        
        const isTileAlley = (gx, gz) => {
          if (this.world && typeof this.world.isAlley === 'function') {
            return this.world.isAlley(gx, gz);
          }
          return false;
        };

        // Determine if perpendicular turn options lead to alleys
        let turnPosAlley = false;
        let turnNegAlley = false;
        if (perpAxis === 'z') {
          turnPosAlley = isTileAlley(gridX, gridZ + 1);
          turnNegAlley = isTileAlley(gridX, gridZ - 1);
        } else {
          turnPosAlley = isTileAlley(gridX + 1, gridZ);
          turnNegAlley = isTileAlley(gridX - 1, gridZ);
        }

        // Determine if going straight leads to an alley
        let straightAlley = false;
        if (this.roadAxis === 'x') {
          straightAlley = isTileAlley(gridX + this.dirSign, gridZ);
        } else {
          straightAlley = isTileAlley(gridX, gridZ + this.dirSign);
        }

        const candidates = [
          { axis: this.roadAxis, coord: this.roadCoord, dir: this.dirSign, weight: straightAlley ? 0.05 : 0.65 },
          { axis: perpAxis, coord: perpAxis === 'z' ? currentBlockX : currentBlockZ, dir: 1, weight: turnPosAlley ? 0.02 : 0.30 },
          { axis: perpAxis, coord: perpAxis === 'z' ? currentBlockX : currentBlockZ, dir: -1, weight: turnNegAlley ? 0.02 : 0.30 }
        ];

        const totalWeight = candidates.reduce((sum, c) => sum + c.weight, 0);
        let randVal = Math.random() * totalWeight;
        let chosen = candidates[0];
        for (const c of candidates) {
          randVal -= c.weight;
          if (randVal <= 0) {
            chosen = c;
            break;
          }
        }

        this.roadAxis = chosen.axis;
        this.roadCoord = chosen.coord;
        this.dirSign = chosen.dir;
      }
    }
    return false;
  }
}
