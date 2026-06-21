import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { LightTrail } from './lighttrail.js';
import { createLensflareTexture, createSkidmarkTexture } from './textures.js';
import { createVoxelCarMesh } from './carMesh.js';
import { World } from '../world/world.js';
import { CarPhysics } from './physics.js';
import { RaceManager } from '../gameplay/race.js';
import { TrafficManager } from '../ai/trafficManager.js';
import { PursuitManager } from '../gameplay/pursuitManager.js';
import { initInput, initDebugVisuals } from './input.js';
import { updateCamera, cycleCameraFocus } from './camera.js';
import { getParticleMaterial, getSmokeMaterial, initParticles, initCheckpointSmoke, initSkidmarks, spawnSkidmarkSegment, spawnParticles, spawnCheckpointSmoke, updateParticles, updateCheckpointSmoke, initDebris, spawnDebris, updateDebris } from './particles.js';
import { formatTime, showBanner, showNitroNotification, showStuntNotification, updateMinimap, initRaceHUD } from './hud.js';







class Game {
  constructor() {
    this.container = document.getElementById('canvas-container');
    this.speedValEl = document.getElementById('speed-val');
    this.driftStatusEl = document.getElementById('drift-status');
    this.loaderEl = document.getElementById('loader');
    this.gearValEl = document.getElementById('gear-val');
    this.rpmBarEl = document.getElementById('rpm-bar');
    this.nitroBarEl = document.getElementById('nitro-bar');
    this.nitroPctEl = document.getElementById('nitro-pct');
    this.nitroNotifEl = document.getElementById('nitro-notif');
    this.stuntNotifEl = document.getElementById('stunt-notif');
    this.stuntTitleEl = document.getElementById('stunt-title');
    this.stuntScoreEl = document.getElementById('stunt-score');
    this.nearMissCooldowns = new Map();
    this.driftNitroGained = 0.0;
    this.prevIsDrifting = false;
    this.gearShiftPunch = 0.0;
    
    // Inputs
    this.keys = {};
    
    this.physics = new CarPhysics();
    this.race = new RaceManager();
    this.aiMeshes = [];
    this.pursuit = new PursuitManager(this);

    // Dom queries for cops
    this.copFlashEl = document.getElementById('cop-flash');
    this.heatHudEl = document.getElementById('heat-hud');
    this.heatHudValueEl = document.getElementById('heat-hud-value');
    this.heatHudLosEl = document.getElementById('heat-hud-los');
    this.heatFillEl = document.getElementById('heat-fill');
    this.bustedContainerEl = document.getElementById('busted-container');
    this.bustedFillEl = document.getElementById('busted-fill');
    this.noiseOverlayEl = document.getElementById('noise-overlay');
    
    this.lensflareTex = createLensflareTexture();
    this.initThree();
    this.world = new World(this.scene);
    this.createCarMesh();
    this.createNavigationArrow();
    this.initInput();
    this.initMinimap();
    this.initParticles();
    this.initCheckpointSmoke();
    this.initDebris();
    this.slowMoTimer = 0.0;
    this.crashShake = 0.0;
    this.initSkidmarks(); // Pooled system for tire skid marks
    this.initRaceHUD();
    this.initDebugVisuals();
    
    // Traffic System
    this.traffic = new TrafficManager(this.scene, 30);
    this.traffic.init(this.physics.position, this.world);
    
    // Hide loader
    setTimeout(() => {
      if (this.loaderEl) {
        this.loaderEl.style.opacity = 0;
        setTimeout(() => this.loaderEl.remove(), 500);
      }
    }, 800);

    // Run loop
    this.clock = new THREE.Clock();
    this.animate();
  }

  initThree() {
    // Scene - NFS 2015 Style Realistic Dark Night
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x131726); // Brighter midnight indigo haze (visible under ACES Filmic Tone Mapping)
    this.scene.fog = new THREE.FogExp2(0x131726, 0.0042); // Slightly denser fog to create a strong silhouette effect

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping; // HDR filmic tone mapping
    this.renderer.toneMappingExposure = 1.0;
    this.container.appendChild(this.renderer.domElement);

    // Camera: Classic Isometric camera setup
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camHeading = 0;
    
    // Lighting - Realistic night scene (NFS 2015 desaturated street-driven lights)
    // Ambient: Dark slate/coal ambient (significantly increased to prevent far-distance roads from going pitch black)
    const ambientLight = new THREE.AmbientLight(0x354158, 0.95);
    this.scene.add(ambientLight);
 
    // Directional: Dim moonlighting (increased intensity and angled to illuminate building facades)
    this.dirLight = new THREE.DirectionalLight(0x6b7b99, 0.9);
    this.dirLight.position.set(0.6, 1.2, 0.4).normalize(); // Angled so vertical building walls get moonlight definition
    this.dirLight.castShadow = false; // Disabled completely for extreme GPU performance gains
    this.scene.add(this.dirLight);
 
    // Sky Hemisphere Light (very dim, desaturated sky/ground)
    const hemiLight = new THREE.HemisphereLight(0x14182b, 0x0c0b0c, 0.35);
    this.scene.add(hemiLight);

    // Post-processing setup
    const renderPass = new RenderPass(this.scene, this.camera);
    const outputPass = new OutputPass();

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(renderPass);
    this.composer.addPass(outputPass);
 
    // Resize handler
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.composer.setSize(window.innerWidth, window.innerHeight);
    });
  }

    createVoxelCarMesh(bodyColorHex, type = 'sports') {
    return createVoxelCarMesh(bodyColorHex, type, this.lensflareTex);
  }

  createCarMesh() {
    // Voxel Tuner Car for the player (Bayside Blue)
    const { carGroup, wheels } = this.createVoxelCarMesh(0x1a3d8c, 'sports');
    this.carGroup = carGroup;
    this.wheels = wheels;

    // Create a unique material for the player's taillights so they can glow brighter when braking
    this.playerTaillightMat = new THREE.MeshBasicMaterial({ color: 0xaa1111 });
    const taillightsMesh = this.carGroup.getObjectByName("taillights");
    if (taillightsMesh) {
      taillightsMesh.material = this.playerTaillightMat;
    }

    // Dynamic Taillight/Brakelight (casting red glow behind the car)
    this.tailLight = new THREE.PointLight(0xff0000, 1.2, 12, 1.3);
    this.tailLight.position.set(0, 0.42, -2.35);
    this.carGroup.add(this.tailLight);

    // Dynamic Headlight Spotlights (casting actual light beams forward!)
    // Narrowed angle (Math.PI/14) and high penumbra (0.85) to create two distinct headlight pools
    this.leftSpotTarget = new THREE.Object3D();
    this.leftSpotTarget.position.set(-0.65, 0.4, 15);
    this.scene.add(this.leftSpotTarget); // Added to scene for correct world direction calculation
    
    this.leftSpot = new THREE.SpotLight(0xfffae6, 14.0, 50, Math.PI/14, 0.85, 1.0);
    this.leftSpot.position.set(-0.65, 0.4, 2.35);
    this.leftSpot.target = this.leftSpotTarget;
    this.carGroup.add(this.leftSpot);

    this.rightSpotTarget = new THREE.Object3D();
    this.rightSpotTarget.position.set(0.65, 0.4, 15);
    this.scene.add(this.rightSpotTarget); // Added to scene
    
    this.rightSpot = new THREE.SpotLight(0xfffae6, 14.0, 50, Math.PI/14, 0.85, 1.0);
    this.rightSpot.position.set(0.65, 0.4, 2.35);
    this.rightSpot.target = this.rightSpotTarget;
    this.carGroup.add(this.rightSpot);

    // Car transformation nodes
    this.carVisualContainer = new THREE.Group();
    this.carVisualContainer.add(this.carGroup);
    this.scene.add(this.carVisualContainer);

    // PS2 Taillight Trails
    this.playerLeftTrail = new LightTrail(this.scene, 0xff0033, 0.24);
    this.playerRightTrail = new LightTrail(this.scene, 0xff0033, 0.24);
  }

  updateHeadlightFlares(meshGroup, heading) {
    // Throttle: update only every 3rd call (frame skip for off-screen/distant cars)
    if (!meshGroup._flareThrottle) meshGroup._flareThrottle = 0;
    meshGroup._flareThrottle = (meshGroup._flareThrottle + 1) % 3;
    if (meshGroup._flareThrottle !== 0) return;

    const leftSprite = meshGroup.getObjectByName("leftHeadlightSprite");
    const rightSprite = meshGroup.getObjectByName("rightHeadlightSprite");
    if (!leftSprite || !rightSprite) return;
    
    const camPos = this.camera.position;

    // Use cached scratch vectors
    if (!this._flScratch) {
      this._flScratch = {
        lw: new THREE.Vector3(), rw: new THREE.Vector3(),
        fw: new THREE.Vector3(), tcl: new THREE.Vector3(), tcr: new THREE.Vector3()
      };
    }
    const s = this._flScratch;
    s.lw.copy(leftSprite.position).applyMatrix4(meshGroup.matrixWorld);
    s.rw.copy(rightSprite.position).applyMatrix4(meshGroup.matrixWorld);

    // Distance gate: skip if too far (save dot-product math)
    const distL = camPos.distanceTo(s.lw);
    if (distL > 340.0) {
      leftSprite.material.opacity = 0;
      rightSprite.material.opacity = 0;
      return;
    }
    const distR = camPos.distanceTo(s.rw);
    s.fw.set(Math.sin(heading), 0, Math.cos(heading));
    
    s.tcl.copy(camPos).sub(s.lw).normalize();
    s.tcr.copy(camPos).sub(s.rw).normalize();
    
    const dotL = s.fw.dot(s.tcl);
    const dotR = s.fw.dot(s.tcr);
    
    const distFadeL = Math.max(0.0, 1.0 - distL / 340.0);
    const distFadeR = Math.max(0.0, 1.0 - distR / 340.0);
    
    const intensityL = Math.pow(Math.max(0.0, dotL), 3.5) * distFadeL;
    const intensityR = Math.pow(Math.max(0.0, dotR), 3.5) * distFadeR;
    
    leftSprite.material.opacity = intensityL * 0.95;
    leftSprite.scale.set(3.4 * (0.3 + intensityL * 1.5), 0.7 * (0.3 + intensityL * 1.5), 1.0);
    
    rightSprite.material.opacity = intensityR * 0.95;
    rightSprite.scale.set(3.4 * (0.3 + intensityR * 1.5), 0.7 * (0.3 + intensityR * 1.5), 1.0);
  }

  createNavigationArrow() {
    // 3D voxel pointer arrow floating above the car roof
    this.navArrow = new THREE.Group();
    
    const arrowMat = new THREE.MeshBasicMaterial({
      color: 0xe5a93b,
      depthTest: false // Renders on top of building geometry for visibility!
    });
    
    // Arrow Shaft
    const shaftGeo = new THREE.BoxGeometry(0.3, 0.15, 1.2);
    const shaft = new THREE.Mesh(shaftGeo, arrowMat);
    shaft.position.z = -0.4;
    this.navArrow.add(shaft);

    // Arrow Tip (cone/pyramid shape)
    const tipGeo = new THREE.ConeGeometry(0.5, 1.0, 4);
    tipGeo.rotateX(Math.PI / 2);
    const tip = new THREE.Mesh(tipGeo, arrowMat);
    tip.position.z = 0.5;
    this.navArrow.add(tip);

    // Position above cabin roof (cabin height=0.8 + 0.5/2 + offset)
    this.navArrow.position.set(0, 1.7, -0.3);
    this.navArrow.visible = false;
    
    // Add to car group so it moves & rotates with the car automatically
    this.carVisualContainer.add(this.navArrow);
  }

  initInput() {
    return initInput.call(this);
  }

  initDebugVisuals() {
    return initDebugVisuals.call(this);
  }

  cycleCameraFocus() {
    return cycleCameraFocus.call(this);
  }

  initMinimap() {
    this.minimapCanvas = document.getElementById('minimap-canvas');
    this.minimapCtx = this.minimapCanvas.getContext('2d');
    this.minimapCanvas.width = 140;
    this.minimapCanvas.height = 140;
  }

  getParticleMaterial(color, opacity) {
    return getParticleMaterial.call(this, color, opacity);
  }

  getSmokeMaterial(color, opacity) {
    return getSmokeMaterial.call(this, color, opacity);
  }

  initParticles() {
    return initParticles.call(this);
  }

  initCheckpointSmoke() {
    return initCheckpointSmoke.call(this);
  }

  initSkidmarks() {
    return initSkidmarks.call(this);
  }

  spawnSkidmarkSegment(p1, p2) {
    return spawnSkidmarkSegment.call(this, p1, p2);
  }

  spawnParticles(pos, dir, color = 0x888888, count = 1, isWater = false) {
    return spawnParticles.call(this, pos, dir, color, count, isWater);
  }

  spawnCheckpointSmoke(pos, color = 0xffaa3a, opacityScale = 1.0, sizeScale = 1.0) {
    return spawnCheckpointSmoke.call(this, pos, color, opacityScale, sizeScale);
  }

  updateParticles(dt) {
    return updateParticles.call(this, dt);
  }

  updateCheckpointSmoke(dt) {
    return updateCheckpointSmoke.call(this, dt);
  }

  initDebris() {
    return initDebris.call(this);
  }

  spawnDebris(pos, dir, color, count = 5) {
    return spawnDebris.call(this, pos, dir, color, count);
  }

  updateDebris(dt) {
    return updateDebris.call(this, dt);
  }

  checkBreakablesCollision(dt) {
    if (!this.world || !this.world.breakables) return;

    // Cache Frustum and Matrix4 as instance fields — avoid allocating every frame
    if (!this._breakFrustum) {
      this._breakFrustum = new THREE.Frustum();
      this._breakProjMat  = new THREE.Matrix4();
    }
    this._breakProjMat.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    this._breakFrustum.setFromProjectionMatrix(this._breakProjMat);
    const frustum = this._breakFrustum;

    // List of active physical entities that can break streetlights/traffic lights
    const entities = [
      {
        position: this.physics.position,
        velocity: this.physics.velocity,
        radius: 2.2,
        isPlayer: true
      }
    ];

    // Add AI Racers to collision check
    if (this.race.active) {
      this.race.aiRacers.forEach(ai => {
        entities.push({
          position: ai.position,
          velocity: ai.velocity || new THREE.Vector3(),
          radius: 2.0,
          isPlayer: false
        });
      });
    }

    // Add Cops
    if (this.pursuit && this.pursuit.active) {
      this.pursuit.cops.forEach(cop => {
        if (cop.active) {
          const copForward = new THREE.Vector3(Math.sin(cop.heading), 0, Math.cos(cop.heading));
          const copVel = copForward.clone().multiplyScalar(cop.speed);
          entities.push({
            position: cop.position,
            velocity: copVel,
            radius: 2.0,
            isPlayer: false
          });
        }
      });
    }

    // Add Traffic
    if (this.traffic && this.traffic.vehicles) {
      // Preallocate scratch forward vector for traffic to avoid per-vehicle alloc
      if (!this._trafficFwdScratch) this._trafficFwdScratch = new THREE.Vector3();
      this.traffic.vehicles.forEach(v => {
        this._trafficFwdScratch.set(Math.sin(v.heading), 0, Math.cos(v.heading));
        entities.push({
          position: v.position,
          // Clone only when velocity is needed for breakable impulse calc
          velocity: this._trafficFwdScratch.clone().multiplyScalar(v.speed).add(v.impactVelocity),
          radius: 2.0,
          isPlayer: false
        });
      });
    }

    // Add Parked Vehicles
    if (this.traffic && this.traffic.parkedVehicles) {
      this.traffic.parkedVehicles.forEach(v => {
        entities.push({
          position: v.position,
          velocity: v.impactVelocity.clone(),
          radius: 2.0,
          isPlayer: false
        });
      });
    }

    // Loop through breakables and update them
    this.world.breakables.forEach(b => {
      if (!b.broken) {
        // Check collision against all entities
        for (let ent of entities) {
          const dist = ent.position.distanceTo(b.position);
          const collisionDist = ent.radius + (b.radius !== undefined ? b.radius : 0.6);
          if (dist < collisionDist) {
            const speed = ent.velocity.length();
            if (speed < 4.0) {
              // Solid collision: push out and bounce velocity
              const normal = ent.position.clone().sub(b.position);
              normal.y = 0;
              normal.normalize();
              const overlap = collisionDist - dist;
              ent.position.addScaledVector(normal, overlap);
              
              const dot = ent.velocity.dot(normal);
              if (dot < 0) {
                ent.velocity.addScaledVector(normal, -1.2 * dot);
              }
              continue;
            }

            // CRASH! Break the streetlight
            b.broken = true;
            b.fadeTimer = 10.0; // minimum stay time before eligible for off-camera cleanup (increased from 3.5s)

            // Impulse calculation
            const impactForceDir = ent.velocity.clone().normalize();
            if (speed > 2.0) {
              // Pole flies off in the direction of the impact velocity
              b.velocity.copy(impactForceDir).multiplyScalar(speed * 0.9 + 5.0);
              b.velocity.y = speed * 0.4 + 4.0; // upward launch speed
              
              // Add crazy spin
              b.angularVelocity.set(
                (Math.random() - 0.5) * 12.0,
                (Math.random() - 0.5) * 6.0,
                (Math.random() - 0.5) * 12.0
              );
            } else {
              b.velocity.set((Math.random() - 0.5) * 3, 2.0, (Math.random() - 0.5) * 3);
              b.angularVelocity.set(Math.random() * 4, Math.random() * 4, Math.random() * 4);
            }

            // Turn off light source
            b.lights.forEach(src => {
              src.intensity = 0.0;
            });

            // Turn off flares
            b.flares.forEach(fl => {
              fl.visible = false;
            });

            // Turn off baked ground light pools
            if (b.poolMeshes) {
              b.poolMeshes.forEach(pm => {
                pm.visible = false;
              });
            }

            // If it is a traffic light, also turn off the colored light bulbs visually
            if (b.type === 'trafficlight') {
              b.group.traverse(child => {
                if (child.isMesh && child.material && child !== b.group.children[0]) {
                  // Turn bulb material to off (dark black/gray housing or dark standard mat)
                  child.material = this.world.tlHousingMat;
                }
              });
            }

            // Screen shake / crash feedback if player rammed it
            if (ent.isPlayer && speed > 8.0) {
              this.crashShake = Math.min(0.5, speed * 0.025);
              // Deduct a little forward speed from player on impact (heavy pole resistance)
              this.physics.velocity.multiplyScalar(0.92);
            }

            // Spawn sparks and wood/metal debris
            const sparkPos = b.position.clone();
            sparkPos.y = 0.8;
            this.spawnParticles(sparkPos, impactForceDir, 0xffaa00, 10);
            this.spawnDebris(sparkPos, impactForceDir, 0x333333, 5); // metal shards

            break; // Stop checking other entities for this breakable
          }
        }
      } else {
        // Update physics of falling breakable prop
        b.velocity.y += -22.0 * dt; // strong gravity
        b.group.position.addScaledVector(b.velocity, dt);

        b.group.rotation.x += b.angularVelocity.x * dt;
        b.group.rotation.y += b.angularVelocity.y * dt;
        b.group.rotation.z += b.angularVelocity.z * dt;

        // Bounce on ground level
        const groundHeight = this.world.getGroundHeight(b.group.position.x, b.group.position.z);
        const upVec = new THREE.Vector3(0, 1, 0).applyQuaternion(b.group.quaternion);
        const tiltCos = Math.abs(upVec.dot(new THREE.Vector3(0, 1, 0))); // 1 = standing, 0 = flat
        const comHeight = b.comHeight !== undefined ? b.comHeight : 4.25;
        const radius = b.radius !== undefined ? b.radius : 0.22;
        const minHeight = groundHeight + THREE.MathUtils.lerp(radius, comHeight, tiltCos);

        if (b.group.position.y < minHeight) {
          b.group.position.y = minHeight;
          if (b.velocity.y < -1.5) {
            b.velocity.y = -b.velocity.y * 0.22; // bounce damping
          } else {
            b.velocity.y = 0.0;
          }
          b.velocity.x *= 0.65 * Math.exp(-dt * 4.0); // slide friction
          b.velocity.z *= 0.65 * Math.exp(-dt * 4.0);
          b.angularVelocity.multiplyScalar(0.5 * Math.exp(-dt * 3.0));
          
          // Slowly align rotation to lie flat on the ground (prevent goofy standing tilts)
          let targetX = Math.round(b.group.rotation.x / (Math.PI / 2)) * (Math.PI / 2);
          let targetZ = Math.round(b.group.rotation.z / (Math.PI / 2)) * (Math.PI / 2);
          if (Math.abs(targetX) < 0.1 && Math.abs(targetZ) < 0.1) {
            if (Math.abs(b.velocity.x) > Math.abs(b.velocity.z)) {
              targetZ = b.velocity.x > 0 ? -Math.PI / 2 : Math.PI / 2;
            } else {
              targetX = b.velocity.z > 0 ? Math.PI / 2 : -Math.PI / 2;
            }
          }
          b.group.rotation.x += (targetX - b.group.rotation.x) * 4.0 * dt;
          b.group.rotation.z += (targetZ - b.group.rotation.z) * 4.0 * dt;
        }

        // Fade out/scale down only when off-camera
        const inView = frustum.containsPoint(b.group.position);
        
        b.fadeTimer -= dt;
        if (!inView && b.fadeTimer <= 0) {
          b.group.scale.multiplyScalar(Math.max(0, 1.0 - dt * 2.5));
          if (b.group.scale.x < 0.05) {
            b.group.visible = false;
            this.scene.remove(b.group);
            b.shouldRemove = true;
          }
        }
      }
    });

    // Clean up breakables that have been removed from the scene
    this.world.breakables = this.world.breakables.filter(b => !b.shouldRemove);
  }

  handleCrashDamage(carGroup, contactPosWorld, impactSpeed, relativeVelocityVec) {
    const bodyMesh = carGroup.getObjectByName("carBody");
    if (bodyMesh && bodyMesh.geometry) {
      const geo = bodyMesh.geometry;
      const posAttr = geo.attributes.position;
      if (!posAttr) return;
      
      const localContact = contactPosWorld.clone().applyMatrix4(bodyMesh.matrixWorld.clone().invert());
      const localForceDir = relativeVelocityVec.clone().normalize().applyQuaternion(bodyMesh.quaternion.clone().invert());
      
      const intensity = Math.min(0.48, impactSpeed * 0.0125);
      const radius = 1.5 + Math.random() * 0.6;
      
      const v = new THREE.Vector3();
      for (let i = 0; i < posAttr.count; i++) {
        v.set(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
        const dist = v.distanceTo(localContact);
        if (dist < radius) {
          const falloff = 1.0 - dist / radius;
          const deform = falloff * falloff * intensity;
          v.addScaledVector(localForceDir, deform);
          posAttr.setXYZ(i, v.x, v.y, v.z);
        }
      }
      posAttr.needsUpdate = true;
      geo.computeVertexNormals();
    }
  }

  checkSlipstream(dt = 0.016) {
    const playerPos = this.physics.position;
    const playerHeading = this.physics.heading;
    const playerForward = new THREE.Vector3(Math.sin(playerHeading), 0, Math.cos(playerHeading));
    
    let inDraft = false;
    let targetVeh = null;
    
    const allVehs = [];
    if (this.traffic && this.traffic.vehicles) allVehs.push(...this.traffic.vehicles);
    if (this.race.active && this.race.aiRacers) allVehs.push(...this.race.aiRacers);
    if (this.pursuit && this.pursuit.active && this.pursuit.cops) allVehs.push(...this.pursuit.cops);
    
    for (const v of allVehs) {
      if (v.opacity !== undefined && v.opacity < 0.5) continue;
      const toVeh = v.position.clone().sub(playerPos);
      const dist = toVeh.length();
      if (dist > 4.5 && dist < 28.0) {
        toVeh.normalize();
        const dot = toVeh.dot(playerForward);
        if (dot > 0.96) {
          const vForward = new THREE.Vector3(Math.sin(v.heading), 0, Math.cos(v.heading));
          if (vForward.dot(playerForward) > 0.8) {
            inDraft = true;
            targetVeh = v;
            break;
          }
        }
      }
    }
    
    this.physics.inSlipstream = inDraft;
    
    if (inDraft) {
      this.physics.nitroLevel = Math.min(this.physics.maxNitro, this.physics.nitroLevel + 0.08 * dt); // NFS slipstream charge
      this.driftStatusEl.innerText = "DRAFTING";
      this.driftStatusEl.classList.add('active');
      if (Math.random() < 0.35) {
        const startOffset = new THREE.Vector3((Math.random() - 0.5) * 1.5, 0.4 + Math.random() * 0.4, 1.8).applyMatrix4(this.carVisualContainer.matrixWorld);
        const windDir = playerForward.clone().negate();
        this.spawnParticles(startOffset, windDir, 0xffffff, 1);
      }
    } else {
      if (!this.physics.isDrifting) {
        this.driftStatusEl.classList.remove('active');
        this.driftStatusEl.innerText = "DRIFT";
      }
    }
  }

  checkNearMisses(dt) {
    if (!this.nearMissCooldowns) this.nearMissCooldowns = new Map();

    // Decrement cooldowns
    for (const [id, time] of this.nearMissCooldowns.entries()) {
      if (time <= dt) {
        this.nearMissCooldowns.delete(id);
      } else {
        this.nearMissCooldowns.set(id, time - dt);
      }
    }

    const playerSpeed = this.physics.velocity.length();
    if (playerSpeed < 15.0) return; // Only at high speeds (33+ mph)

    const playerPos = this.physics.position;

    // Collect all other vehicles
    const targets = [];
    if (this.traffic && this.traffic.vehicles) {
      this.traffic.vehicles.forEach(v => {
        targets.push({ id: `traffic_${v.id}`, position: v.position, opacity: v.opacity });
      });
    }
    if (this.race.active && this.race.aiRacers) {
      this.race.aiRacers.forEach(ai => {
        targets.push({ id: `ai_${ai.id}`, position: ai.position, opacity: 1.0 });
      });
    }
    if (this.pursuit && this.pursuit.active && this.pursuit.cops) {
      this.pursuit.cops.forEach(cop => {
        if (cop.active) {
          targets.push({ id: `cop_${cop.id}`, position: cop.position, opacity: 1.0 });
        }
      });
    }

    for (const target of targets) {
      if (target.opacity !== undefined && target.opacity < 0.5) continue;
      
      const dist = playerPos.distanceTo(target.position);
      // Near miss radius: between 2.2m (car radius sum) and 5.0m
      if (dist > 2.2 && dist < 5.0) {
        if (!this.nearMissCooldowns.has(target.id)) {
          // Award Nitro!
          this.physics.nitroLevel = Math.min(this.physics.maxNitro, this.physics.nitroLevel + 0.15); // +15%
          this.nearMissCooldowns.set(target.id, 3.0); // 3 seconds cooldown for this vehicle

          // Show floating notification
          this.showNitroNotification("NEAR MISS! +15%");
        }
      }
    }
  }

  updateDriftNitro(dt) {
    if (this.prevIsDrifting === undefined) this.prevIsDrifting = false;
    if (this.driftNitroGained === undefined) this.driftNitroGained = 0;

    const isCurrentlyDrifting = this.physics.isDrifting;

    if (isCurrentlyDrifting) {
      // Accumulate nitro gained during drift
      const lateralSpeed = this.physics.velocity.dot(new THREE.Vector3(Math.cos(this.physics.heading), 0, -Math.sin(this.physics.heading)));
      const driftIntensity = Math.min(2.0, Math.abs(lateralSpeed) / 8.0);
      const gain = 0.075 * dt * driftIntensity;
      this.driftNitroGained += gain;
    } else {
      // Drift just ended!
      if (this.prevIsDrifting && this.driftNitroGained > 0.03) {
        const pctGained = Math.round(this.driftNitroGained * 100);
        this.showNitroNotification(`DRIFT! +${pctGained}%`);
      }
      this.driftNitroGained = 0;
    }

    this.prevIsDrifting = isCurrentlyDrifting;
  }

  showNitroNotification(text) {
    return showNitroNotification.call(this, text);
  }

  showStuntNotification(title, scoreText) {
    return showStuntNotification.call(this, title, scoreText);
  }

  initRaceHUD() {
    return initRaceHUD.call(this);
  }

  buildAIMeshes() {
    this.clearAIMeshes();
    this.race.aiRacers.forEach(ai => {
      const container = new THREE.Group();
      const { carGroup, wheels } = this.createVoxelCarMesh(ai.colorHex, 'sports');
      container.add(carGroup);
      this.scene.add(container);
      ai.meshGroup = container;
      ai.wheels = wheels;
      ai.prevLeftWheel = null;
      ai.prevRightWheel = null;
      ai.smokeTimer = 0;
      this.aiMeshes.push(container);
    });
  }

  clearAIMeshes() {
    this.race.aiRacers.forEach(ai => {
      if (ai.leftTrail) {
        ai.leftTrail.destroy();
        ai.leftTrail = null;
      }
      if (ai.rightTrail) {
        ai.rightTrail.destroy();
        ai.rightTrail = null;
      }
    });

    this.aiMeshes.forEach(mesh => {
      mesh.traverse(child => {
        if (child.geometry) child.geometry.dispose();
      });
      this.scene.remove(mesh);
    });
    this.aiMeshes = [];
  }

  startRace(mode) {
    // Grab the player's current world position and heading (Y-axis rotation)
    const playerPos = this.physics ? this.physics.position.clone() : new THREE.Vector3();
    const playerHeading = (this.physics && this.physics.mesh) ? this.physics.mesh.rotation.y : 0;
    this.race.startRace(mode, this.world, playerPos, playerHeading);
    if (this.pursuit) this.pursuit.cancelPursuit();
    
    // Show stats immediately
    this.hudStatsEl.style.display = 'flex';
    this.cancelBtnEl.style.display = 'block';
    this.statsModeEl.textContent = mode.toUpperCase();
    this.showBanner("RACE STARTED", "Follow the arrow!");
    this.rebuildCheckpointBeacons();

    // Defer heavy mesh creation & traffic reinit to next frames to avoid
    // a huge dt spike (slow-motion effect) on the first frame after race start.
    setTimeout(() => {
      // Build AI car meshes (heavy: mergeGeometries x3)
      this.buildAIMeshes();

      // Reduce traffic density during active race
      if (this.traffic) {
        this.traffic.clear();
        this.traffic.maxVehicles = 18;
        this.traffic.init(this.physics.position, this.world);
      }

      // Reset the clock so the elapsed time during setup doesn't
      // become a giant dt on the next animation frame.
      this.clock.getDelta(); // flush accumulated time
    }, 0);
  }

  cancelRace() {
    this.race.active = false;
    if (this.pursuit) this.pursuit.cancelPursuit();
    this.hudStatsEl.style.display = 'none';
    this.cancelBtnEl.style.display = 'none';
    this.navArrow.visible = false;
    this.clearCheckpointBeacons();
    this.clearAIMeshes();
    this.showBanner("RACE CANCELLED", "Free Roam Mode");

    // Defer traffic reinit to avoid dt spike
    setTimeout(() => {
      if (this.traffic) {
        this.traffic.clear();
        this.traffic.maxVehicles = 30;
        this.traffic.init(this.physics.position, this.world);
      }
      this.clock.getDelta(); // flush accumulated time
    }, 0);
  }

  clearCheckpointBeacons() {
    // Dispose geometries & remove from group
    while (this.checkpointVisualsGroup.children.length > 0) {
      const child = this.checkpointVisualsGroup.children[0];
      child.traverse(c => {
        if (c.geometry) c.geometry.dispose();
      });
      this.checkpointVisualsGroup.remove(child);
    }
  }

  rebuildCheckpointBeacons() {
    this.clearCheckpointBeacons();
    if (!this.race.active) return;

    // Build visual cylinder markers for active checkpoints
    this.race.checkpoints.forEach((cp, index) => {
      // In ordered modes, only render current active target
      // In unordered mode, render all uncleared checkpoints
      let shouldRender = false;
      if (this.race.mode === 'unordered') {
        shouldRender = !this.race.unorderedCleared.has(index);
      } else {
        shouldRender = (index === this.race.currentIndex);
      }

      if (shouldRender) {
        const isFinish = (index === this.race.checkpoints.length - 1);
        const color = isFinish ? 0xe84545 : 0xffaa3a; // Red for finish, amber standard

        const cpGroup = new THREE.Group();
        const h = (this.world && typeof this.world.getGroundHeight === 'function')
          ? this.world.getGroundHeight(cp.x, cp.z)
          : 0.5;
        cpGroup.position.set(cp.x, h - 0.4, cp.z);

        // PointLight source at the checkpoint (warm glow matched to color)
        const cpLight = new THREE.PointLight(color, 12.0, 80.0, 1.25);
        cpLight.position.set(0, 4.0, 0);
        cpGroup.add(cpLight);

        // Hovering Indicator Arrow pointing to the NEXT checkpoint (Midnight Club style)
        let nextCp = null;
        if (this.race.mode !== 'unordered') {
          if (index < this.race.checkpoints.length - 1) {
            nextCp = this.race.checkpoints[index + 1];
          } else if (this.race.mode === 'circuit' && this.race.lapCurrent < this.race.lapsTotal) {
            nextCp = this.race.checkpoints[0];
          }
        }

        if (nextCp) {
          const cpArrow = new THREE.Group();
          cpArrow.position.set(0, 3.5, 0); // Position high inside the smoke column
          cpArrow.name = "nextCPArrow";

          const arrowColor = 0xffb31a;
          const arrowMat = new THREE.MeshBasicMaterial({
            color: arrowColor,
            depthTest: true
          });

          // Voxel arrow shaft
          const arrowShaft = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 3.2), arrowMat);
          arrowShaft.position.z = -1.0;
          cpArrow.add(arrowShaft);

          // Voxel arrow tip pointing towards next checkpoint
          const arrowTipGeo = new THREE.ConeGeometry(1.5, 2.5, 4);
          arrowTipGeo.rotateX(Math.PI / 2);
          const arrowTip = new THREE.Mesh(arrowTipGeo, arrowMat);
          arrowTip.position.z = 1.2;
          cpArrow.add(arrowTip);

          // Calculate angle from current checkpoint to next checkpoint
          const dx = nextCp.x - cp.x;
          const dz = nextCp.z - cp.z;
          cpArrow.rotation.y = Math.atan2(dx, dz);

          cpGroup.add(cpArrow);
        }

        this.checkpointVisualsGroup.add(cpGroup);
      }
    });
  }

  showBanner(title, subtitle, duration = 2000) {
    return showBanner.call(this, title, subtitle, duration);
  }

  updateCamera(dt = 0.016) {
    return updateCamera.call(this, dt);
  }

  updateMinimap() {
    return updateMinimap.call(this);
  }

  formatTime(seconds) {
    return formatTime.call(this, seconds);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    // Clamp dt to max 50ms (20fps floor). This prevents physics from running
    // in slow-motion after any heavy synchronous work (e.g. mesh creation)
    // that causes the clock to accumulate a large delta in one frame.
    const dt = Math.min(this.clock.getDelta(), 0.05);
    
    if (this.slowMoTimer === undefined) this.slowMoTimer = 0.0;
    if (this.crashShake === undefined) this.crashShake = 0.0;
    
    if (this.slowMoTimer > 0) {
      this.slowMoTimer -= dt;
    }
    if (this.crashShake > 0) {
      this.crashShake *= Math.exp(-6.0 * dt);
      if (this.crashShake < 0.01) this.crashShake = 0.0;
    }
    
    const scaledDt = dt; // Slow-motion disabled by player request
    
    let focusTarget = this.physics;
    if (this.debugFocusAI && this.race && this.race.aiRacers) {
      const activeAI = this.race.aiRacers.find(ai => ai.id === this.debugFocusAI);
      if (activeAI) focusTarget = activeAI;
    }
    
    // Collect dynamic lights for the lighting pool (headlamps from player and traffic)
    const dynamicLights = [];
    
    // Player headlights
    const playerForward = new THREE.Vector3(Math.sin(this.physics.heading), 0, Math.cos(this.physics.heading));
    const playerRight = new THREE.Vector3(Math.cos(this.physics.heading), 0, -Math.sin(this.physics.heading));
    const pPos = this.physics.position;
    const pHeadL = pPos.clone().addScaledVector(playerForward, 2.35).addScaledVector(playerRight, -0.65);
    const pHeadR = pPos.clone().addScaledVector(playerForward, 2.35).addScaledVector(playerRight, 0.65);
    
    // Update SpotLight targets in world space pointing forward
    this.leftSpotTarget.position.copy(pHeadL).addScaledVector(playerForward, 15.0);
    this.rightSpotTarget.position.copy(pHeadR).addScaledVector(playerForward, 15.0);

    // Update rear tail/brake light glow intensity dynamically
    const isBraking = this.keys['s'] || this.keys['arrowdown'];
    if (isBraking) {
      this.tailLight.intensity = 5.5; // Bright red brake light
      this.playerTaillightMat.color.setHex(0xff3333);
    } else {
      this.tailLight.intensity = 1.2; // Standard running taillight
      this.playerTaillightMat.color.setHex(0xaa1111);
    }

    // Traffic headlights (pushed further forward to 3.5 to prevent underglow light spill on wheels/doors)
    this.traffic.vehicles.forEach(v => {
      const tForward = new THREE.Vector3(Math.sin(v.heading), 0, Math.cos(v.heading));
      const headlampPos = v.position.clone().addScaledVector(tForward, 3.5);
      
      dynamicLights.push({
        x: headlampPos.x,
        y: 0.4,
        z: headlampPos.z,
        intensity: 8.5 * (v.opacity !== undefined ? v.opacity : 1.0),
        color: 0xfffcd4
      });
    });

    // Update police pursuit manager
    if (this.pursuit) {
      const playerSpeed = this.physics.velocity.length();
      const isPlayerTryingToMove = !!(
        this.keys['w'] || this.keys['arrowup'] ||
        this.keys['s'] || this.keys['arrowdown'] ||
        this.keys['a'] || this.keys['arrowleft'] ||
        this.keys['d'] || this.keys['arrowright']
      );
      this.pursuit.update(
        dt,
        this.physics.position,
        playerSpeed,
        this.world,
        this.traffic,
        this.race.navGraph || null,
        this.race.active ? this.race.aiRacers : [],
        isPlayerTryingToMove
      );

      // Check if any cop is trailing behind the player, and find the closest one's distance
      let copBehind = false;
      let closestCopBehindDist = Infinity;
      if (this.pursuit.active && this.pursuit.cops.length > 0) {
        const playerPos = this.physics.position;
        const playerForward = new THREE.Vector3(Math.sin(this.physics.heading), 0, Math.cos(this.physics.heading));
        
        for (let i = 0; i < this.pursuit.cops.length; i++) {
          const cop = this.pursuit.cops[i];
          const toCop = cop.position.clone().sub(playerPos);
          const distance = toCop.length();
          
          if (distance < 90) { // Only check cops within 90 meters
            const dot = playerForward.dot(toCop.normalize());
            if (dot < -0.15) { // Negative dot product means cop is behind player
              copBehind = true;
              if (distance < closestCopBehindDist) {
                closestCopBehindDist = distance;
              }
            }
          }
        }
      }

      // Flash and dynamically scale bottom HUD light overlay based on trailing proximity
      if (copBehind) {
        this.copFlashEl.style.display = 'block';
        const flashBlue = (Math.floor(Date.now() / 300) % 2 === 0);
        
        // Calculate factor based on closest cop trailing distance (10m to 90m)
        const proximityFactor = Math.max(0, Math.min(1, 1 - (closestCopBehindDist - 10) / 80));
        
        // Scale height between 5vh (far) and 22vh (bumper-to-bumper)
        const dynamicHeight = 5 + proximityFactor * 17;
        this.copFlashEl.style.height = `${dynamicHeight}vh`;
        
        // Toggle flash color class
        if (flashBlue) {
          this.copFlashEl.classList.add('flash-blue');
        } else {
          this.copFlashEl.classList.remove('flash-blue');
        }
        
        // Scale opacity dynamically: brighter and more saturated when closer, dims when flashing off
        const targetOpacity = flashBlue 
          ? (0.35 + proximityFactor * 0.65) 
          : (0.05 + proximityFactor * 0.25);
        this.copFlashEl.style.opacity = targetOpacity;
      } else {
        this.copFlashEl.style.opacity = 0;
        this.copFlashEl.style.display = 'none';
      }

      // Update Heat HUD
      if (this.pursuit.active) {
        this.heatHudEl.style.display = 'flex';
        if (this.heatHudValueEl) {
          this.heatHudValueEl.textContent = this.pursuit.heatLevel;
        }

        // Update Line of Sight (LOS) status
        if (this.heatHudLosEl) {
          if (this.pursuit.canSeePlayer) {
            this.heatHudLosEl.textContent = 'SPOTTED';
            this.heatHudLosEl.className = 'heat-hud-los spotted';
          } else {
            this.heatHudLosEl.textContent = 'HIDDEN';
            this.heatHudLosEl.className = 'heat-hud-los hidden';
          }
        }

        // Update Heat Escalation Progress Bar
        if (this.heatFillEl) {
          const progressPercent = (this.pursuit.heatProgress || 0) * 100;
          this.heatFillEl.style.width = `${progressPercent}%`;
        }
      } else {
        this.heatHudEl.style.display = 'none';
      }

      // Update Busted warning container
      if (this.pursuit.bustProgress > 0) {
        this.bustedContainerEl.style.display = 'flex';
        this.bustedFillEl.style.width = `${this.pursuit.bustProgress * 100}%`;
      } else {
        this.bustedContainerEl.style.display = 'none';
      }

      // Dynamic Film Grain / Noise Intensity based on cop pursuit and busting state
      if (this.noiseOverlayEl) {
        let noiseOpacity = 0.05; // Clean, subtle base film grain
        
        if (this.pursuit) {
          if (this.pursuit.active) {
            // Increase noise based on heat level (up to +0.06 at heat 5)
            noiseOpacity += (this.pursuit.heatLevel || 1) * 0.012;
            
            // Increase noise based on proximity to nearest cop (up to +0.08 when very close)
            let closestCopDist = Infinity;
            this.pursuit.cops.forEach(cop => {
              const dist = this.physics.position.distanceTo(cop.position);
              if (dist < closestCopDist) {
                closestCopDist = dist;
              }
            });
            if (closestCopDist < 60) {
              const proximityFactor = 1.0 - (closestCopDist / 60); // 0 to 1
              noiseOpacity += proximityFactor * 0.08;
            }
          }
          
          // Intensify noise heavily as player is being busted (up to +0.22 when fully busting)
          if (this.pursuit.bustProgress > 0) {
            noiseOpacity += this.pursuit.bustProgress * 0.22;
          }
        }
        
        // Clamp to a safe maximum to keep game readable
        noiseOpacity = Math.min(0.40, noiseOpacity);
        this.noiseOverlayEl.style.opacity = noiseOpacity;
      }

      // Push active cop vehicle headlights and sirens to dynamic lights list
      this.pursuit.cops.forEach(cop => {
        if (cop.meshGroup) {
          // Set mesh group materials transparency / opacity for seamless fade-in
          cop.meshGroup.traverse(child => {
            if (child.isMesh && child.material) {
              child.material.transparent = true;
              child.material.opacity = cop.opacity;
            }
          });

          const copForward = new THREE.Vector3(Math.sin(cop.heading), 0, Math.cos(cop.heading));
          
          // Headlights
          const headPos = cop.position.clone().addScaledVector(copForward, 2.3);
          dynamicLights.push({
            x: headPos.x,
            y: 0.4,
            z: headPos.z,
            intensity: 8.0 * cop.opacity, // Scale light intensity with opacity
            color: 0xfffcd4
          });

          // Sirens (pulsing bright red/blue light source)
          dynamicLights.push({
            x: cop.position.x,
            y: 1.6,
            z: cop.position.z,
            intensity: 15.0 * cop.opacity,
            color: cop.sirenState ? 0xff0022 : 0x0022ff
          });

          // Cop tire smoke when sliding/skidding
          const rgtCos = Math.cos(cop.heading + Math.PI / 2);
          const rgtSin = Math.sin(cop.heading + Math.PI / 2);
          const lateralSpeed = Math.abs(cop.velocity.x * rgtCos + cop.velocity.z * rgtSin);
          const isSkidding = cop.velocity && (lateralSpeed > 3.2 || (cop.velocity.lengthSq() > 300 && Math.abs(cop.angularVelocity) > 1.0));
          
          if (isSkidding) {
            const leftRear = new THREE.Vector3(-0.95, 0.1, -1.3).applyMatrix4(cop.meshGroup.matrixWorld);
            const rightRear = new THREE.Vector3(0.95, 0.1, -1.3).applyMatrix4(cop.meshGroup.matrixWorld);
            const backward = cop.velocity.clone().negate().normalize();
            backward.y = 0.3;
            backward.normalize();
            
            const leftWet = this.world.isWetAt(leftRear.x, leftRear.z);
            const rightWet = this.world.isWetAt(rightRear.x, rightRear.z);
            
            if (!leftWet) this.spawnParticles(leftRear, backward, 0xaaaaaa, 1);
            if (!rightWet) this.spawnParticles(rightRear, backward, 0xaaaaaa, 1);

            // Spawn cop tire skid marks
            if (cop.prevLeftWheel) this.spawnSkidmarkSegment(cop.prevLeftWheel, leftRear);
            if (cop.prevRightWheel) this.spawnSkidmarkSegment(cop.prevRightWheel, rightRear);
            cop.prevLeftWheel = leftRear.clone();
            cop.prevRightWheel = rightRear.clone();
          } else {
            cop.prevLeftWheel = null;
            cop.prevRightWheel = null;
          }
        }
      });

      // Parked alert headlamps
      this.pursuit.parkedCops.forEach(cop => {
        if (cop.meshGroup) {
          // Set mesh group materials transparency / opacity for seamless fade-in
          cop.meshGroup.traverse(child => {
            if (child.isMesh && child.material) {
              child.material.transparent = true;
              child.material.opacity = cop.opacity;
            }
          });

          const copForward = new THREE.Vector3(Math.sin(cop.heading), 0, Math.cos(cop.heading));
          const headPos = cop.position.clone().addScaledVector(copForward, 2.3);
          dynamicLights.push({
            x: headPos.x,
            y: 0.4,
            z: headPos.z,
            intensity: 8.0 * cop.opacity,
            color: 0xfffcd4
          });
          if (cop.alerted) {
            dynamicLights.push({
              x: cop.position.x,
              y: 1.6,
              z: cop.position.z,
              intensity: 15.0 * cop.opacity,
              color: cop.sirenState ? 0xff0022 : 0x0022ff
            });
          }
        }
      });
    }

    // Push dynamic lights for wall scraping sparks and tire skid friction (optimized)
    if (this.physics.isScraping) {
      const contactPos = this.physics.position.clone();
      contactPos.addScaledVector(this.physics.scrapeNormal, -0.9);
      dynamicLights.push({
        x: contactPos.x,
        y: 0.45 + this.world.getBaseHeight(contactPos.x, contactPos.z),
        z: contactPos.z,
        intensity: 12.0,
        color: 0xffaa00 // Bright spark-orange illumination
      });
    }

    if (this.physics.isDrifting) {
      const leftRearTire = new THREE.Vector3(-0.95, 0.22, -1.3).applyMatrix4(this.carVisualContainer.matrixWorld);
      const rightRearTire = new THREE.Vector3(0.95, 0.22, -1.3).applyMatrix4(this.carVisualContainer.matrixWorld);
      dynamicLights.push({
        x: leftRearTire.x,
        y: 0.25 + this.world.getBaseHeight(leftRearTire.x, leftRearTire.z),
        z: leftRearTire.z,
        intensity: 6.5,
        color: 0xff4400 // Orange/red friction heat glow
      });
      dynamicLights.push({
        x: rightRearTire.x,
        y: 0.25 + this.world.getBaseHeight(rightRearTire.x, rightRearTire.z),
        z: rightRearTire.z,
        intensity: 6.5,
        color: 0xff4400
      });
    }

    // Dynamically load/unload infinite chunks around the car and update lights
    this.world.update(focusTarget.position.x, focusTarget.position.z, focusTarget.heading, dynamicLights);
    
    // Maintain global gameTime for traffic lights synchronization
    if (window.gameTime === undefined) window.gameTime = 0;
    window.gameTime += scaledDt;

    // Update physics
    this.physics.update(scaledDt, this.keys, this.world);

    // Player wall collision check (applied damage, debris, slow-mo)
    if (this.physics.justCrashed) {
      const impactSpeed = this.physics.lastWallImpactSpeed;
      const normal = this.physics.lastWallImpactNormal;
      const contactPos = this.physics.position.clone().addScaledVector(normal, -1.8);
      contactPos.y = 0.4 + this.world.getBaseHeight(contactPos.x, contactPos.z);
      const relativeVel = normal.clone().multiplyScalar(impactSpeed);
      
      this.handleCrashDamage(this.carVisualContainer, contactPos, impactSpeed, relativeVel);
      this.spawnDebris(contactPos, normal, 0x1a3d8c, Math.min(10, Math.floor(impactSpeed * 0.45)));
      
      if (impactSpeed > 10.0) {
        this.slowMoTimer = 0.28;
        this.crashShake = Math.min(0.85, impactSpeed * 0.045);
      }
      this.physics.justCrashed = false;
    }

    // Detect gear shift and trigger camera punch
    if (this.physics.gear !== this.physics.prevGear) {
      if (this.physics.justUpshifted) {
        this.gearShiftPunch = 1.0;
      }
      this.physics.prevGear = this.physics.gear;
    }
    
    // Update civilian traffic (dynamically adjust density based on player speed)
    if (this.traffic) {
      const playerSpeed = this.physics.velocity.length();
      const baseMax = this.race.active ? 18 : 30;
      let densityScale = 1.0;
      if (playerSpeed > 25.0) {
        // At speed <= 25 m/s, keep 100% density. At higher speeds, reduce to 70% density.
        densityScale = Math.max(0.70, 1.0 - (playerSpeed - 25.0) / 100.0);
      }
      this.traffic.maxVehicles = Math.round(baseMax * densityScale);
    }
    
    this.traffic.update(
      scaledDt,
      focusTarget.position,
      focusTarget.heading,
      this.race.active ? this.race.aiRacers : [],
      this.camera,
      this.world,
      this.pursuit ? this.pursuit.roadblocks : [],
      this.pursuit ? this.pursuit.heatLevel : 0,
      this.pursuit ? this.pursuit.cops.concat(this.pursuit.parkedCops || []) : []
    );
    this.traffic.vehicles.forEach(v => {
      if (!v.meshGroup) {
        const { carGroup, wheels } = this.createVoxelCarMesh(v.colorHex, v.type);
        
        if (v.type === 'cab') {
          // Yellow Taxi roof light sign
          const taxiLight = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.2, 0.8),
            new THREE.MeshBasicMaterial({ color: 0xffaa00 })
          );
          taxiLight.position.set(0, 1.1, -0.3);
          carGroup.add(taxiLight);
        }
        
        this.scene.add(carGroup);
        v.meshGroup = carGroup;
        v.wheels = wheels;
      }
      
      v.meshGroup.position.copy(v.position);
      this.world.alignMeshToTerrain(v.meshGroup, v.position, v.heading, v.isAirborne, scaledDt);
      if (v.roll || v.pitch) {
        const rollQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), v.roll || 0);
        const pitchQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), v.pitch || 0);
        v.meshGroup.quaternion.multiply(rollQ).multiply(pitchQ);
      }

      // Update traffic headlight lens flares
      this.updateHeadlightFlares(v.meshGroup, v.heading);
      
      // Update mesh opacity smoothly — only traverse when opacity actually changed
      const targetOpacity = v.opacity !== undefined ? v.opacity : 1.0;
      if (v._lastOpacity !== targetOpacity) {
        v._lastOpacity = targetOpacity;
        v.meshGroup.traverse(child => {
          if (child.isMesh && child.material) {
            child.material.transparent = targetOpacity < 1.0;
            child.material.opacity = targetOpacity;
          }
        });
      }
      
      // Animate civilian wheels rolling
      const tRot = (v.speed / 0.42) * scaledDt;
      v.wheels.forEach(w => {
        w.children[0].rotation.x += tRot;
        w.children[1].rotation.x += tRot;
      });

      // Civilian tire water splash particle effect (throttled per-vehicle to avoid pool starvation)
      const tSpeed = v.speed;
      if (!v.splashTimer) v.splashTimer = 0;
      v.splashTimer -= scaledDt;
      if (tSpeed > 3.0 && (v.opacity === undefined || v.opacity > 0.8) && v.splashTimer <= 0) {
        const leftRear = new THREE.Vector3(-0.95, 0.1, -1.3).applyMatrix4(v.meshGroup.matrixWorld);
        const rightRear = new THREE.Vector3(0.95, 0.1, -1.3).applyMatrix4(v.meshGroup.matrixWorld);
        
        const leftWet = this.world.isWetAt(leftRear.x, leftRear.z);
        const rightWet = this.world.isWetAt(rightRear.x, rightRear.z);
        
        if (leftWet || rightWet) {
          v.splashTimer = 0.1; // fire every 100ms per traffic car
          const backward = new THREE.Vector3(-Math.sin(v.heading), 0.55, -Math.cos(v.heading)).normalize();
          const count = Math.min(4, Math.floor(tSpeed * 0.2));
          if (leftWet && count > 0) this.spawnParticles(leftRear, backward, 0xccddee, count, true);
          if (rightWet && count > 0) this.spawnParticles(rightRear, backward, 0xccddee, count, true);
        }
      }

      // Tire smoke & skid marks when sliding/spinning from impact (active civilian traffic)
      const isCivilianSkidding = v.impactVelocity && v.impactVelocity.lengthSq() > 9.0;
      if (isCivilianSkidding) {
        const leftRear = new THREE.Vector3(-0.95, 0.1, -1.3).applyMatrix4(v.meshGroup.matrixWorld);
        const rightRear = new THREE.Vector3(0.95, 0.1, -1.3).applyMatrix4(v.meshGroup.matrixWorld);
        const backward = v.impactVelocity.clone().negate().normalize();
        backward.y = 0.3;
        backward.normalize();
        
        const leftWet = this.world.isWetAt(leftRear.x, leftRear.z);
        const rightWet = this.world.isWetAt(rightRear.x, rightRear.z);
        
        if (!leftWet) this.spawnParticles(leftRear, backward, 0xaaaaaa, 1);
        if (!rightWet) this.spawnParticles(rightRear, backward, 0xaaaaaa, 1);

        // Spawn civilian tire skid marks
        if (v.prevLeftWheel) this.spawnSkidmarkSegment(v.prevLeftWheel, leftRear);
        if (v.prevRightWheel) this.spawnSkidmarkSegment(v.prevRightWheel, rightRear);
        v.prevLeftWheel = leftRear.clone();
        v.prevRightWheel = rightRear.clone();
      } else {
        v.prevLeftWheel = null;
        v.prevRightWheel = null;
      }
    });

    // Render / update parked vehicles
    if (this.traffic && this.traffic.parkedVehicles) {
      this.traffic.parkedVehicles.forEach(v => {
        if (!v.meshGroup) {
          const { carGroup, wheels } = this.createVoxelCarMesh(v.colorHex, v.type);
          
          if (v.type === 'cab') {
            const taxiLight = new THREE.Mesh(
              new THREE.BoxGeometry(0.5, 0.2, 0.8),
              new THREE.MeshBasicMaterial({ color: 0xffaa00 })
            );
            taxiLight.position.set(0, 1.1, -0.3);
            carGroup.add(taxiLight);
          }
          
          // Disable headlight lens flare sprites for parked cars initially
          const leftSprite = carGroup.getObjectByName("leftHeadlightSprite");
          const rightSprite = carGroup.getObjectByName("rightHeadlightSprite");
          if (leftSprite) leftSprite.visible = false;
          if (rightSprite) rightSprite.visible = false;
          
          this.scene.add(carGroup);
          v.meshGroup = carGroup;
          v.wheels = wheels;
        }
        
        v.meshGroup.position.copy(v.position);
        this.world.alignMeshToTerrain(v.meshGroup, v.position, v.heading, v.isAirborne, scaledDt);
        if (v.roll || v.pitch) {
          const rollQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), v.roll || 0);
          const pitchQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), v.pitch || 0);
          v.meshGroup.quaternion.multiply(rollQ).multiply(pitchQ);
        }
        
        // Update mesh opacity smoothly
        const targetOpacity = v.opacity !== undefined ? v.opacity : 1.0;
        if (v._lastOpacity !== targetOpacity) {
          v._lastOpacity = targetOpacity;
          v.meshGroup.traverse(child => {
            if (child.isMesh && child.material) {
              child.material.transparent = targetOpacity < 1.0;
              child.material.opacity = targetOpacity;
            }
          });
        }
        
        // Parked cars don't roll wheels or make water splash unless moving from impact
        const isParkedSkidding = v.impactVelocity.lengthSq() > 0.1;
        if (isParkedSkidding) {
          const vSpeed = v.impactVelocity.length();
          const tRot = (vSpeed / 0.42) * scaledDt;
          v.wheels.forEach(w => {
            w.children[0].rotation.x += tRot;
            w.children[1].rotation.x += tRot;
          });
          
          const leftRear = new THREE.Vector3(-0.95, 0.1, -1.3).applyMatrix4(v.meshGroup.matrixWorld);
          const rightRear = new THREE.Vector3(0.95, 0.1, -1.3).applyMatrix4(v.meshGroup.matrixWorld);

          if (vSpeed > 3.0 && (v.opacity === undefined || v.opacity > 0.8) && (!v.splashTimer || v.splashTimer <= 0)) {
            v.splashTimer = 0.1;
            const leftWet = this.world.isWetAt(leftRear.x, leftRear.z);
            const rightWet = this.world.isWetAt(rightRear.x, rightRear.z);
            if (leftWet || rightWet) {
              const backward = new THREE.Vector3(-Math.sin(v.heading), 0.55, -Math.cos(v.heading)).normalize();
              const count = Math.min(4, Math.floor(vSpeed * 0.2));
              if (leftWet && count > 0) this.spawnParticles(leftRear, backward, 0xccddee, count, true);
              if (rightWet && count > 0) this.spawnParticles(rightRear, backward, 0xccddee, count, true);
            } else {
              const backward = v.impactVelocity.clone().negate().normalize();
              backward.y = 0.3;
              backward.normalize();
              this.spawnParticles(leftRear, backward, 0xaaaaaa, 1);
              this.spawnParticles(rightRear, backward, 0xaaaaaa, 1);
            }
          }

          // Spawn parked tire skid marks when sliding from impact
          if (vSpeed > 3.0) {
            if (v.prevLeftWheel) this.spawnSkidmarkSegment(v.prevLeftWheel, leftRear);
            if (v.prevRightWheel) this.spawnSkidmarkSegment(v.prevRightWheel, rightRear);
            v.prevLeftWheel = leftRear.clone();
            v.prevRightWheel = rightRear.clone();
          } else {
            v.prevLeftWheel = null;
            v.prevRightWheel = null;
          }
        } else {
          v.prevLeftWheel = null;
          v.prevRightWheel = null;
        }
        if (v.splashTimer > 0) v.splashTimer -= scaledDt;
      });
    }

    // Combined Collision Checks for active & parked civilian vehicles
    const allCivilians = this.traffic.vehicles.concat(this.traffic.parkedVehicles || []);
    allCivilians.forEach(v => {
      // Collision Check: Player vs Traffic
      const distToPlayer = this.physics.position.distanceTo(v.position);
      if (distToPlayer < 4.0) {
        if (this.physics.speed > 16.0 && this.pursuit) {
          this.pursuit.triggerPursuit(1);
        }
        const pushDir = this.physics.position.clone().sub(v.position).normalize();
        pushDir.y = 0;
        
        const overlap = 4.0 - distToPlayer;
        // Position resolution: push both out of collision proportional to mass
        // Player mass = 1350, Traffic mass = 1500. Total = 2850.
        this.physics.position.addScaledVector(pushDir, overlap * 0.52);
        v.position.addScaledVector(pushDir, -overlap * 0.48);

        // Physical Conservation of Momentum Response
        const tForward = new THREE.Vector3(Math.sin(v.heading), 0, Math.cos(v.heading));
        const v2 = tForward.clone().multiplyScalar(v.speed).add(v.impactVelocity);
        const v1 = this.physics.velocity;

        // Relative velocity along normal
        const relativeVel = v1.clone().sub(v2);
        const velAlongNormal = relativeVel.dot(pushDir);

        if (velAlongNormal < 0) {
          const restitution = 0.48; // partially elastic crash
          const m1 = 1350;
          const m2 = 1500;
          
          const impulseScalar = -(1.0 + restitution) * velAlongNormal / (1.0 / m1 + 1.0 / m2);
          const impulseVec = pushDir.clone().multiplyScalar(impulseScalar);

          // Apply forces
          this.physics.velocity.addScaledVector(impulseVec, 1.0 / m1);
          
          // For traffic car, we add the impulse directly to impactVelocity
          v.impactVelocity.addScaledVector(impulseVec, -1.0 / m2);
          
          // Spin traffic car based on impact force offset (random offset torque)
          const contactPos = this.physics.position.clone().add(v.position).multiplyScalar(0.5);
          const offset = contactPos.clone().sub(v.position);
          offset.y = 0;
          const forceDir = pushDir.clone().negate();
          const leverArm = offset.x * forceDir.z - offset.z * forceDir.x;
          const spinFactor = 0.2 + Math.min(2.5, Math.abs(leverArm));
          const spinDirection = leverArm >= 0 ? 1 : -1;
          v.impactSpin = spinDirection * Math.min(4.2, (impulseScalar / 300.0) * spinFactor);

          // Launch the traffic car in the air on heavy impact!
          if (impulseScalar > 8000) {
            v.crashedAirborne = true;
            v.isAirborne = true;
            v.velocityY = Math.min(2.0, impulseScalar * 0.0001 + 0.5);
            v.rollVelocity = (Math.random() - 0.5) * Math.min(2.0, impulseScalar * 0.0001);
            v.pitchVelocity = (Math.random() - 0.5) * Math.min(2.0, impulseScalar * 0.0001);
          }
          
          // Deduct speed based on how much was absorbed
          v.speed = Math.max(0.0, v.speed - (impulseScalar * 0.0006));
        }

        // Spawn bright crash sparks and debris
        const contactPos = this.physics.position.clone().add(v.position).multiplyScalar(0.5);
        contactPos.y = 0.55 + this.world.getBaseHeight(contactPos.x, contactPos.z);
        this.spawnParticles(contactPos, pushDir, 0xffaa00, 16);

        // Crash physics: vertex dent damage and 3D bouncing debris particles
        const relativeVelVec = this.physics.velocity.clone().sub(tForward.clone().multiplyScalar(v.speed).add(v.impactVelocity));
        const relSpeed = relativeVelVec.length();
        if (relSpeed > 5.0) {
          this.handleCrashDamage(this.carVisualContainer, contactPos, relSpeed, relativeVelVec);
          if (v.meshGroup) {
            this.handleCrashDamage(v.meshGroup, contactPos, relSpeed, relativeVelVec.clone().negate());
          }
          this.spawnDebris(contactPos, pushDir, 0x1a3d8c, Math.min(8, Math.floor(relSpeed * 0.4)));
          this.spawnDebris(contactPos, pushDir.clone().negate(), v.colorHex, Math.min(8, Math.floor(relSpeed * 0.4)));
        }
        if (relSpeed > 10.0) {
          this.slowMoTimer = 0.28;
          this.crashShake = Math.min(0.8, relSpeed * 0.035);
        }
      }

      // Collision Check: AI Opponents vs Traffic
      if (this.race.active) {
        this.race.aiRacers.forEach(ai => {
          const distToAI = ai.position.distanceTo(v.position);
          if (distToAI < 4.0) {
            const pushDir = ai.position.clone().sub(v.position).normalize();
            pushDir.y = 0;
            
            const overlap = 4.0 - distToAI;
            // Position resolution
            ai.position.addScaledVector(pushDir, overlap * 0.5);
            v.position.addScaledVector(pushDir, -overlap * 0.5);
            
            // Physics impulse
            const tForward = new THREE.Vector3(Math.sin(v.heading), 0, Math.cos(v.heading));
            const v2 = tForward.clone().multiplyScalar(v.speed).add(v.impactVelocity);
            const v1 = ai.velocity;

            const relativeVel = v1.clone().sub(v2);
            const velAlongNormal = relativeVel.dot(pushDir);

            if (velAlongNormal < 0) {
              const restitution = 0.45;
              const m1 = 1350; // AI mass
              const m2 = 1500; // Traffic mass
              const impulseScalar = -(1.0 + restitution) * velAlongNormal / (1.0 / m1 + 1.0 / m2);
              const impulseVec = pushDir.clone().multiplyScalar(impulseScalar);

              ai.velocity.addScaledVector(impulseVec, 1.0 / m1);
              v.impactVelocity.addScaledVector(impulseVec, -1.0 / m2);
              
              const contactPos = ai.position.clone().add(v.position).multiplyScalar(0.5);
              const offset = contactPos.clone().sub(v.position);
              offset.y = 0;
              const forceDir = pushDir.clone().negate();
              const leverArm = offset.x * forceDir.z - offset.z * forceDir.x;
              const spinFactor = 0.2 + Math.min(2.5, Math.abs(leverArm));
              const spinDirection = leverArm >= 0 ? 1 : -1;
              v.impactSpin = spinDirection * Math.min(4.2, (impulseScalar / 300.0) * spinFactor);
              v.speed = Math.max(0.0, v.speed - (impulseScalar * 0.0005));

              // Launch the traffic car in the air on heavy impact!
              if (impulseScalar > 8000) {
                v.crashedAirborne = true;
                v.isAirborne = true;
                v.velocityY = Math.min(2.0, impulseScalar * 0.0001 + 0.5);
                v.rollVelocity = (Math.random() - 0.5) * Math.min(2.0, impulseScalar * 0.0001);
                v.pitchVelocity = (Math.random() - 0.5) * Math.min(2.0, impulseScalar * 0.0001);
              }
            }

            ai.recoveryBoostTimer = 3.0;

            const contactPos = ai.position.clone().add(v.position).multiplyScalar(0.5);
            contactPos.y = 0.55 + this.world.getBaseHeight(contactPos.x, contactPos.z);
            this.spawnParticles(contactPos, pushDir, 0xffaa00, 8);

            // Crash physics: vertex damage and 3D debris
            const relativeVelVec = ai.velocity.clone().sub(tForward.clone().multiplyScalar(v.speed).add(v.impactVelocity));
            const relSpeed = relativeVelVec.length();
            if (relSpeed > 5.0) {
              if (ai.meshGroup) this.handleCrashDamage(ai.meshGroup, contactPos, relSpeed, relativeVelVec);
              if (v.meshGroup) this.handleCrashDamage(v.meshGroup, contactPos, relSpeed, relativeVelVec.clone().negate());
              this.spawnDebris(contactPos, pushDir, ai.colorHex, Math.min(6, Math.floor(relSpeed * 0.3)));
              this.spawnDebris(contactPos, pushDir.clone().negate(), v.colorHex, Math.min(6, Math.floor(relSpeed * 0.3)));
            }
          }
        });
      }
    });

    // Collision Check: Traffic vs Traffic (active vs active, active vs parked, parked vs parked)
    for (let i = 0; i < allCivilians.length; i++) {
      const v1 = allCivilians[i];
      if (v1.opacity < 0.5) continue;
      for (let j = i + 1; j < allCivilians.length; j++) {
        const v2 = allCivilians[j];
        if (v2.opacity < 0.5) continue;

        const dist = v1.position.distanceTo(v2.position);
        if (dist < 4.0) {
          const pushDir = v1.position.clone().sub(v2.position).normalize();
          pushDir.y = 0;

          const overlap = 4.0 - dist;
          // Resolve overlap equally (0.5 weight each)
          v1.position.addScaledVector(pushDir, overlap * 0.5);
          v2.position.addScaledVector(pushDir, -overlap * 0.5);

          // Physical Conservation of Momentum Response
          const fwd1 = new THREE.Vector3(Math.sin(v1.heading), 0, Math.cos(v1.heading));
          const fwd2 = new THREE.Vector3(Math.sin(v2.heading), 0, Math.cos(v2.heading));
          
          const vel1 = fwd1.multiplyScalar(v1.speed).add(v1.impactVelocity);
          const vel2 = fwd2.multiplyScalar(v2.speed).add(v2.impactVelocity);

          const relativeVel = vel1.clone().sub(vel2);
          const velAlongNormal = relativeVel.dot(pushDir);

          if (relativeVel.lengthSq() > 3.0) {
            v1.isRecovering = true;
            v2.isRecovering = true;
          }

          if (velAlongNormal < 0) {
            const restitution = 0.45;
            const m1 = 1500;
            const m2 = 1500;
            
            const impulseScalar = -(1.0 + restitution) * velAlongNormal / (1.0 / m1 + 1.0 / m2);
            const impulseVec = pushDir.clone().multiplyScalar(impulseScalar);

            v1.impactVelocity.addScaledVector(impulseVec, 1.0 / m1);
            v2.impactVelocity.addScaledVector(impulseVec, -1.0 / m2);

            // Spin cars based on impact offset torque
            const contactPos = v1.position.clone().add(v2.position).multiplyScalar(0.5);
            
            const offset1 = contactPos.clone().sub(v1.position);
            offset1.y = 0;
            const forceDir1 = pushDir.clone().negate();
            const leverArm1 = offset1.x * forceDir1.z - offset1.z * forceDir1.x;
            const spinFactor1 = 0.2 + Math.min(2.5, Math.abs(leverArm1));
            const spinDirection1 = leverArm1 >= 0 ? 1 : -1;
            v1.impactSpin = spinDirection1 * Math.min(4.2, (impulseScalar / 300.0) * spinFactor1);

            const offset2 = contactPos.clone().sub(v2.position);
            offset2.y = 0;
            const forceDir2 = pushDir.clone();
            const leverArm2 = offset2.x * forceDir2.z - offset2.z * forceDir2.x;
            const spinFactor2 = 0.2 + Math.min(2.5, Math.abs(leverArm2));
            const spinDirection2 = leverArm2 >= 0 ? 1 : -1;
            v2.impactSpin = spinDirection2 * Math.min(4.2, (impulseScalar / 300.0) * spinFactor2);

            // Launch in air on heavy impact!
            if (impulseScalar > 8000) {
              if (Math.random() > 0.5) {
                v1.crashedAirborne = true;
                v1.isAirborne = true;
                v1.velocityY = Math.min(2.0, impulseScalar * 0.0001 + 0.5);
                v1.rollVelocity = (Math.random() - 0.5) * Math.min(2.0, impulseScalar * 0.0001);
                v1.pitchVelocity = (Math.random() - 0.5) * Math.min(2.0, impulseScalar * 0.0001);
              } else {
                v2.crashedAirborne = true;
                v2.isAirborne = true;
                v2.velocityY = Math.min(2.0, impulseScalar * 0.0001 + 0.5);
                v2.rollVelocity = (Math.random() - 0.5) * Math.min(2.0, impulseScalar * 0.0001);
                v2.pitchVelocity = (Math.random() - 0.5) * Math.min(2.0, impulseScalar * 0.0001);
              }
            }

            // Reduce forward speed slightly
            v1.speed = Math.max(0.0, v1.speed - (impulseScalar * 0.0005));
            v2.speed = Math.max(0.0, v2.speed - (impulseScalar * 0.0005));
          }

          // Spawn sparks and crash damage
          const contactPos = v1.position.clone().add(v2.position).multiplyScalar(0.5);
          contactPos.y = 0.55 + this.world.getBaseHeight(contactPos.x, contactPos.z);
          this.spawnParticles(contactPos, pushDir, 0xffaa00, 8);

          const relativeVelVec = vel1.clone().sub(vel2);
          const relSpeed = relativeVelVec.length();
          if (relSpeed > 5.0) {
            if (v1.meshGroup) this.handleCrashDamage(v1.meshGroup, contactPos, relSpeed, relativeVelVec);
            if (v2.meshGroup) this.handleCrashDamage(v2.meshGroup, contactPos, relSpeed, relativeVelVec.clone().negate());
            this.spawnDebris(contactPos, pushDir, v1.colorHex, Math.min(4, Math.floor(relSpeed * 0.2)));
            this.spawnDebris(contactPos, pushDir.clone().negate(), v2.colorHex, Math.min(4, Math.floor(relSpeed * 0.2)));
          }
        }
      }
    }

    // Collision Check: Cops vs Player & AI Racers
    if (this.pursuit && this.pursuit.active) {
      this.pursuit.cops.forEach(cop => {
        if (!cop.active) return;
        
        // Cop vs Player
        const distToPlayer = this.physics.position.distanceTo(cop.position);
        if (distToPlayer < 4.0) {
          const pushDir = this.physics.position.clone().sub(cop.position).normalize();
          pushDir.y = 0;
          
          const overlap = 4.0 - distToPlayer;
          this.physics.position.addScaledVector(pushDir, overlap * 0.52);
          cop.position.addScaledVector(pushDir, -overlap * 0.48);

          // Physical Conservation of Momentum Response
          const copForward = new THREE.Vector3(Math.sin(cop.heading), 0, Math.cos(cop.heading));
          const v2 = copForward.clone().multiplyScalar(cop.speed);
          const v1 = this.physics.velocity;

          const relativeVel = v1.clone().sub(v2);
          const velAlongNormal = relativeVel.dot(pushDir);

          if (velAlongNormal < 0) {
            const restitution = 0.5; 
            const m1 = 1350; // Player
            const m2 = 1600; // Heavy Cop Cruiser
            
            const impulseScalar = -(1.0 + restitution) * velAlongNormal / (1.0 / m1 + 1.0 / m2);
            const impulseVec = pushDir.clone().multiplyScalar(impulseScalar);

            this.physics.velocity.addScaledVector(impulseVec, 1.0 / m1);
            cop.speed = Math.max(-10.0, cop.speed - (impulseScalar * 0.0006));
            
            // Side impact / spin-out logic
            const playerRight = new THREE.Vector3(Math.cos(this.physics.heading), 0, -Math.sin(this.physics.heading));
            const sideImpactSpeed = relativeVel.dot(playerRight);
            
            if (Math.abs(sideImpactSpeed) > 9.5) {
              // Spin out player's car (toned down)
              this.physics.externalSpin = Math.sign(sideImpactSpeed) * (1.8 + Math.random() * 1.5);
              this.physics.isDrifting = true;
              this.physics.driftTraction = 0.55; // Retain 55% tire grip for easier recovery
            } else if (relativeVel.length() > 22.0) {
              // High speed impact (head-on / rear-end): partial spin out (toned down)
              this.physics.externalSpin = (Math.random() > 0.5 ? 1 : -1) * (1.1 + Math.random() * 0.9);
              this.physics.isDrifting = true;
              this.physics.driftTraction = 0.65;
            }

            // Trigger/raise pursuit level on hitting a cop
            this.pursuit.triggerPursuit(2);
          }

          const contactPos = this.physics.position.clone().add(cop.position).multiplyScalar(0.5);
          contactPos.y = 0.55 + this.world.getBaseHeight(contactPos.x, contactPos.z);
          this.spawnParticles(contactPos, pushDir, 0xffaa00, 16);

          // Crash damage and debris
          const relativeVelVec = this.physics.velocity.clone().sub(copForward.clone().multiplyScalar(cop.speed));
          const relSpeed = relativeVelVec.length();
          if (relSpeed > 5.0) {
            this.handleCrashDamage(this.carVisualContainer, contactPos, relSpeed, relativeVelVec);
            if (cop.meshGroup) {
              this.handleCrashDamage(cop.meshGroup, contactPos, relSpeed, relativeVelVec.clone().negate());
            }
            this.spawnDebris(contactPos, pushDir, 0x1a3d8c, Math.min(8, Math.floor(relSpeed * 0.4)));
            this.spawnDebris(contactPos, pushDir.clone().negate(), 0x111111, Math.min(8, Math.floor(relSpeed * 0.4)));
          }
          if (relSpeed > 10.0) {
            this.slowMoTimer = 0.28;
            this.crashShake = Math.min(0.8, relSpeed * 0.035);
          }
        }

        // Cop vs AI Racers
        if (this.race.active) {
          this.race.aiRacers.forEach(ai => {
            const distToAI = ai.position.distanceTo(cop.position);
            if (distToAI < 4.0) {
              const pushDir = ai.position.clone().sub(cop.position).normalize();
              pushDir.y = 0;
              
              const overlap = 4.0 - distToAI;
              ai.position.addScaledVector(pushDir, overlap * 0.5);
              cop.position.addScaledVector(pushDir, -overlap * 0.5);

              const copForward = new THREE.Vector3(Math.sin(cop.heading), 0, Math.cos(cop.heading));
              const v2 = copForward.clone().multiplyScalar(cop.speed);
              const v1 = ai.velocity;

              const relativeVel = v1.clone().sub(v2);
              const velAlongNormal = relativeVel.dot(pushDir);

              if (velAlongNormal < 0) {
                const restitution = 0.5;
                const m1 = 1350;
                const m2 = 1600;
                const impulseScalar = -(1.0 + restitution) * velAlongNormal / (1.0 / m1 + 1.0 / m2);
                const impulseVec = pushDir.clone().multiplyScalar(impulseScalar);

                ai.velocity.addScaledVector(impulseVec, 1.0 / m1);
                cop.speed = Math.max(-10.0, cop.speed - (impulseScalar * 0.0006));
              }

              const contactPos = ai.position.clone().add(cop.position).multiplyScalar(0.5);
              contactPos.y = 0.55 + this.world.getBaseHeight(contactPos.x, contactPos.z);
              this.spawnParticles(contactPos, pushDir, 0xffaa00, 12);

              // Crash damage and debris
              const relativeVelVec = ai.velocity.clone().sub(copForward.clone().multiplyScalar(cop.speed));
              const relSpeed = relativeVelVec.length();
              if (relSpeed > 5.0) {
                if (ai.meshGroup) this.handleCrashDamage(ai.meshGroup, contactPos, relSpeed, relativeVelVec);
                if (cop.meshGroup) this.handleCrashDamage(cop.meshGroup, contactPos, relSpeed, relativeVelVec.clone().negate());
                this.spawnDebris(contactPos, pushDir, ai.colorHex, Math.min(6, Math.floor(relSpeed * 0.3)));
                this.spawnDebris(contactPos, pushDir.clone().negate(), 0x111111, Math.min(6, Math.floor(relSpeed * 0.3)));
              }
            }
          });
        }

        // Cop vs Traffic Vehicles
        if (this.traffic) {
          const allCivilians = this.traffic.vehicles.concat(this.traffic.parkedVehicles || []);
          allCivilians.forEach(v => {
            const distToTraffic = v.position.distanceTo(cop.position);
            if (distToTraffic < 4.0) {
              const pushDir = v.position.clone().sub(cop.position).normalize();
              pushDir.y = 0;

              const overlap = 4.0 - distToTraffic;
              v.position.addScaledVector(pushDir, overlap * 0.5);
              cop.position.addScaledVector(pushDir, -overlap * 0.5);

              const copForward = new THREE.Vector3(Math.sin(cop.heading), 0, Math.cos(cop.heading));
              const copVel = copForward.clone().multiplyScalar(cop.speed);
              
              const trafficForward = new THREE.Vector3(Math.sin(v.heading), 0, Math.cos(v.heading));
              const trafficVel = trafficForward.clone().multiplyScalar(v.speed).add(v.impactVelocity);

              const relativeVel = trafficVel.clone().sub(copVel);
              const velAlongNormal = relativeVel.dot(pushDir);

              if (velAlongNormal < 0) {
                const restitution = 0.5;
                const m1 = 1500; // Traffic
                const m2 = 1600; // Cop
                
                const impulseScalar = -(1.0 + restitution) * velAlongNormal / (1.0 / m1 + 1.0 / m2);
                const impulseVec = pushDir.clone().multiplyScalar(impulseScalar);

                v.impactVelocity.addScaledVector(impulseVec, 1.0 / m1);
                v.isRecovering = true;
                cop.speed = Math.max(-10.0, cop.speed - (impulseScalar * 0.0006));
                
                const contactPos = v.position.clone().add(cop.position).multiplyScalar(0.5);
                contactPos.y = 0.55 + this.world.getBaseHeight(contactPos.x, contactPos.z);
                this.spawnParticles(contactPos, pushDir, 0xffaa00, 10);

                // Crash damage and debris
                const relativeVelVec = trafficVel.clone().sub(copVel);
                const relSpeed = relativeVelVec.length();
                if (relSpeed > 5.0) {
                  if (v.meshGroup) this.handleCrashDamage(v.meshGroup, contactPos, relSpeed, relativeVelVec);
                  if (cop.meshGroup) this.handleCrashDamage(cop.meshGroup, contactPos, relSpeed, relativeVelVec.clone().negate());
                  this.spawnDebris(contactPos, pushDir, v.colorHex, Math.min(6, Math.floor(relSpeed * 0.3)));
                  this.spawnDebris(contactPos, pushDir.clone().negate(), 0x111111, Math.min(6, Math.floor(relSpeed * 0.3)));
                }
              }
            }
          });
        }
      });
    }

    // Collision Check: Cop vs Cop
    if (this.pursuit && this.pursuit.active) {
      const cops = this.pursuit.cops;
      for (let i = 0; i < cops.length; i++) {
        const cop1 = cops[i];
        if (!cop1.active) continue;
        for (let j = i + 1; j < cops.length; j++) {
          const cop2 = cops[j];
          if (!cop2.active) continue;

          const dist = cop1.position.distanceTo(cop2.position);
          if (dist < 4.0) {
            const pushDir = cop1.position.clone().sub(cop2.position).normalize();
            pushDir.y = 0;

            const overlap = 4.0 - dist;
            // Push both cops out of collision equally
            cop1.position.addScaledVector(pushDir, overlap * 0.5);
            cop2.position.addScaledVector(pushDir, -overlap * 0.5);

            // Momentum exchange
            const cop1Forward = new THREE.Vector3(Math.sin(cop1.heading), 0, Math.cos(cop1.heading));
            const cop2Forward = new THREE.Vector3(Math.sin(cop2.heading), 0, Math.cos(cop2.heading));
            
            const v1 = cop1Forward.clone().multiplyScalar(cop1.speed);
            const v2 = cop2Forward.clone().multiplyScalar(cop2.speed);

            const relativeVel = v1.clone().sub(v2);
            const velAlongNormal = relativeVel.dot(pushDir);

            if (velAlongNormal < 0) {
              const restitution = 0.5;
              // Both cops have the same mass (1600kg)
              const impulseScalar = -(1.0 + restitution) * velAlongNormal / (2.0 / 1600.0);
              const impulseVec = pushDir.clone().multiplyScalar(impulseScalar);

              const impulseVector1 = impulseVec.clone().multiplyScalar(1.0 / 1600.0);
              const impulseVector2 = impulseVec.clone().multiplyScalar(-1.0 / 1600.0);

              // Project impulse back to forward speed
              cop1.speed += impulseVector1.dot(cop1Forward);
              cop2.speed += impulseVector2.dot(cop2Forward);
            }

            // Spawn sparks and crash damage/debris
            const contactPos = cop1.position.clone().add(cop2.position).multiplyScalar(0.5);
            contactPos.y = 0.55 + this.world.getBaseHeight(contactPos.x, contactPos.z);
            this.spawnParticles(contactPos, pushDir, 0xffaa00, 8);

            const relativeVelVec = v1.clone().sub(v2);
            const relSpeed = relativeVelVec.length();
            if (relSpeed > 5.0) {
              if (cop1.meshGroup) this.handleCrashDamage(cop1.meshGroup, contactPos, relSpeed, relativeVelVec);
              if (cop2.meshGroup) this.handleCrashDamage(cop2.meshGroup, contactPos, relSpeed, relativeVelVec.clone().negate());
              this.spawnDebris(contactPos, pushDir, 0x111111, Math.min(4, Math.floor(relSpeed * 0.2)));
              this.spawnDebris(contactPos, pushDir.clone().negate(), 0x111111, Math.min(4, Math.floor(relSpeed * 0.2)));
            }
          }
        }
      }
    }
    
    // Coordinate translation
    this.carVisualContainer.position.copy(this.physics.position);
    this.world.alignMeshToTerrain(
      this.carVisualContainer,
      this.physics.position,
      this.physics.heading,
      (this.physics.isAirborne && this.physics.airTime > 0.2) || this.physics.rolloverTimer > 0,
      scaledDt
    );
    this.carVisualContainer.updateMatrixWorld(true);

    // Update player light trails
    if (this.playerLeftTrail && this.playerRightTrail) {
      const leftTailPos = new THREE.Vector3(-0.65, 0.42, -2.11).applyMatrix4(this.carVisualContainer.matrixWorld);
      const rightTailPos = new THREE.Vector3(0.65, 0.42, -2.11).applyMatrix4(this.carVisualContainer.matrixWorld);
      const playerSpeed = this.physics.velocity.length();
      const trailsActive = playerSpeed > 5.0;
      this.playerLeftTrail.update(leftTailPos, scaledDt, trailsActive);
      this.playerRightTrail.update(rightTailPos, scaledDt, trailsActive);
    }
    
    // Update player headlight lens flares
    this.updateHeadlightFlares(this.carVisualContainer, this.physics.heading);
    
    // Body roll/pitch dynamics
    this.carGroup.rotation.z = this.physics.bodyRoll;
    this.carGroup.rotation.x = this.physics.bodyPitch;

    // Wall scraping sparks
    if (this.physics.isScraping) {
      const contactPos = this.physics.position.clone();
      contactPos.addScaledVector(this.physics.scrapeNormal, -1.0);
      contactPos.y = 0.25 + this.world.getBaseHeight(contactPos.x, contactPos.z);

      const sparkDir = this.physics.velocity.clone().negate().normalize();
      sparkDir.addScaledVector(new THREE.Vector3(Math.random() - 0.5, 0.4, Math.random() - 0.5), 0.45).normalize();
      this.spawnParticles(contactPos, sparkDir, 0xffaa00, 3);
    }
    
    // Rotate wheels
    const fwdSinH = Math.sin(this.physics.heading);
    const fwdCosH = Math.cos(this.physics.heading);
    const forwardSpeed = this.physics.velocity.x * fwdSinH + this.physics.velocity.z * fwdCosH;
    const wheelRotSpeed = (forwardSpeed / 0.42) * scaledDt;
    this.wheels.forEach((w, idx) => {
      // Steer the entire parent group on the Y axis for front wheels
      w.rotation.y = (idx < 2) ? this.physics.steeringAngle : 0;
      
      // Clear child Y-axis rotations to avoid double-transformation / gimbal wobble
      w.children[0].rotation.y = 0;
      w.children[1].rotation.y = 0;
      
      // Roll children on their local X axes
      w.children[0].rotation.x += wheelRotSpeed;
      w.children[1].rotation.x += wheelRotSpeed;
    });

    // Smoke or Splash particles on drift/accel/movement
    const leftRear = new THREE.Vector3(-0.95, 0.1, -1.3).applyMatrix4(this.carVisualContainer.matrixWorld);
    const rightRear = new THREE.Vector3(0.95, 0.1, -1.3).applyMatrix4(this.carVisualContainer.matrixWorld);
    const playerSpeedMag = this.physics.velocity.length();
    
    // Check center too so tile-boundary straddling doesn't silently miss puddles
    const leftWet = this.world.isWetAt(leftRear.x, leftRear.z);
    const rightWet = this.world.isWetAt(rightRear.x, rightRear.z);

    // Throttle splashes to ~80ms intervals to prevent particle pool starvation
    if (!this.splashTimer) this.splashTimer = 0;
    this.splashTimer -= scaledDt;


    if (playerSpeedMag > 3.0 && (leftWet || rightWet) && this.splashTimer <= 0) {
      this.splashTimer = 0.08; // fire every 80ms
      const backward = this.physics.velocity.clone().negate().normalize();
      backward.y = 0.55; // spray upwards
      backward.normalize();
      
      const count = Math.min(8, Math.floor(playerSpeedMag * 0.35));
      if (leftWet && count > 0) {
        this.spawnParticles(leftRear, backward, 0xccddee, count, true);
      }
      if (rightWet && count > 0) {
        this.spawnParticles(rightRear, backward, 0xccddee, count, true);
      }
    }

    if (this.physics.isDrifting) {
      const backward = this.physics.velocity.clone().negate().normalize();
      if (!leftWet) this.spawnParticles(leftRear, backward, 0xaaaaaa, 2);
      if (!rightWet) this.spawnParticles(rightRear, backward, 0xaaaaaa, 2);
      this.driftStatusEl.classList.add('active');
    } else {
      this.driftStatusEl.classList.remove('active');
      
      // Idle exhaust smoke
      if (Math.random() < 0.15) {
        const exhaust = new THREE.Vector3(0.6, 0.2, -2.1).applyMatrix4(this.carVisualContainer.matrixWorld);
        const backDir = new THREE.Vector3(-Math.sin(this.physics.heading), 0.2, -Math.cos(this.physics.heading));
        this.spawnParticles(exhaust, backDir, 0x777777, 1);
      }
    }

    // Spawn player Nitro Exhaust particles if boosting!
    if (this.physics.isBoosting) {
      if (Math.random() < 0.65) {
        const exhaustL = new THREE.Vector3(-0.6, 0.2, -2.1).applyMatrix4(this.carVisualContainer.matrixWorld);
        const exhaustR = new THREE.Vector3(0.6, 0.2, -2.1).applyMatrix4(this.carVisualContainer.matrixWorld);
        const backDir = new THREE.Vector3(-Math.sin(this.physics.heading), 0.1, -Math.cos(this.physics.heading)).normalize();
        
        // Neon cyan/blue fire particles for nitro!
        this.spawnParticles(exhaustL, backDir, 0x00f0ff, 3);
        this.spawnParticles(exhaustR, backDir, 0x00f0ff, 3);
        if (Math.random() < 0.3) {
          this.spawnParticles(exhaustL, backDir, 0xffbb00, 1);
          this.spawnParticles(exhaustR, backDir, 0xffbb00, 1);
        }
      }
    }

    // Spawn player tire skid marks on drift or hard brake
    const isSkidding = this.physics.isDrifting || (isBraking && playerSpeedMag > 4.0);
    if (isSkidding) {
      if (this.prevLeftWheel) this.spawnSkidmarkSegment(this.prevLeftWheel, leftRear);
      if (this.prevRightWheel) this.spawnSkidmarkSegment(this.prevRightWheel, rightRear);
      this.prevLeftWheel = leftRear.clone();
      this.prevRightWheel = rightRear.clone();
    } else {
      this.prevLeftWheel = null;
      this.prevRightWheel = null;
    }

    // UPDATE RACE SYSTEM
    if (this.race.active) {
      this.race.playerVelocity = this.physics.velocity;
      const raceResult = this.race.update(this.physics.position, scaledDt, this.world, this.traffic);

      // Collision Check: Player vs AI Opponents
      this.race.aiRacers.forEach(ai => {
        const dist = this.physics.position.distanceTo(ai.position);
        if (dist < 4.0) {
          const pushDir = this.physics.position.clone().sub(ai.position).normalize();
          pushDir.y = 0;
          
          const overlap = 4.0 - dist;
          this.physics.position.addScaledVector(pushDir, overlap * 0.5);
          ai.position.addScaledVector(pushDir, -overlap * 0.5);

          const v1 = this.physics.velocity;
          const v2 = ai.velocity;
          const relativeVel = v1.clone().sub(v2);
          const velAlongNormal = relativeVel.dot(pushDir);

          if (velAlongNormal < 0) {
            const restitution = 0.55;
            const m1 = 1350;
            const m2 = 1350;
            const impulseScalar = -(1.0 + restitution) * velAlongNormal / (1.0 / m1 + 1.0 / m2);
            const impulseVec = pushDir.clone().multiplyScalar(impulseScalar);
            
            this.physics.velocity.addScaledVector(impulseVec, 1.0 / m1);
            ai.velocity.addScaledVector(impulseVec, -1.0 / m2);
            
            ai.recoveryBoostTimer = 2.0;
          }

          const contactPos = this.physics.position.clone().add(ai.position).multiplyScalar(0.5);
          contactPos.y = 0.55 + this.world.getBaseHeight(contactPos.x, contactPos.z);
          this.spawnParticles(contactPos, pushDir, 0xffaa00, 10);

          // Crash damage and debris
          const relativeVelVec = this.physics.velocity.clone().sub(ai.velocity);
          const relSpeed = relativeVelVec.length();
          if (relSpeed > 5.0) {
            this.handleCrashDamage(this.carVisualContainer, contactPos, relSpeed, relativeVelVec);
            if (ai.meshGroup) {
              this.handleCrashDamage(ai.meshGroup, contactPos, relSpeed, relativeVelVec.clone().negate());
            }
            this.spawnDebris(contactPos, pushDir, 0x1a3d8c, Math.min(8, Math.floor(relSpeed * 0.4)));
            this.spawnDebris(contactPos, pushDir.clone().negate(), ai.colorHex, Math.min(8, Math.floor(relSpeed * 0.4)));
          }
          if (relSpeed > 10.0) {
            this.slowMoTimer = 0.28;
            this.crashShake = Math.min(0.8, relSpeed * 0.035);
          }
        }
      });

      // Collision Check: AI vs AI Opponents
      for (let i = 0; i < this.race.aiRacers.length; i++) {
        for (let j = i + 1; j < this.race.aiRacers.length; j++) {
          const ai1 = this.race.aiRacers[i];
          const ai2 = this.race.aiRacers[j];
          const dist = ai1.position.distanceTo(ai2.position);
          if (dist < 4.0) {
            const pushDir = ai1.position.clone().sub(ai2.position).normalize();
            pushDir.y = 0;
            
            const overlap = 4.0 - dist;
            ai1.position.addScaledVector(pushDir, overlap * 0.5);
            ai2.position.addScaledVector(pushDir, -overlap * 0.5);

            const v1 = ai1.velocity;
            const v2 = ai2.velocity;
            const relativeVel = v1.clone().sub(v2);
            const velAlongNormal = relativeVel.dot(pushDir);

            if (velAlongNormal < 0) {
              const restitution = 0.5;
              const m1 = 1350;
              const m2 = 1350;
              const impulseScalar = -(1.0 + restitution) * velAlongNormal / (1.0 / m1 + 1.0 / m2);
              const impulseVec = pushDir.clone().multiplyScalar(impulseScalar);
              
              ai1.velocity.addScaledVector(impulseVec, 1.0 / m1);
              ai2.velocity.addScaledVector(impulseVec, -1.0 / m2);
            }

            const contactPos = ai1.position.clone().add(ai2.position).multiplyScalar(0.5);
            contactPos.y = 0.55 + this.world.getBaseHeight(contactPos.x, contactPos.z);
            this.spawnParticles(contactPos, pushDir, 0xffaa00, 6);

            // Crash damage and debris
            const relativeVelVec = ai1.velocity.clone().sub(ai2.velocity);
            const relSpeed = relativeVelVec.length();
            if (relSpeed > 5.0) {
              if (ai1.meshGroup) this.handleCrashDamage(ai1.meshGroup, contactPos, relSpeed, relativeVelVec);
              if (ai2.meshGroup) this.handleCrashDamage(ai2.meshGroup, contactPos, relSpeed, relativeVelVec.clone().negate());
              this.spawnDebris(contactPos, pushDir, ai1.colorHex, Math.min(6, Math.floor(relSpeed * 0.3)));
              this.spawnDebris(contactPos, pushDir.clone().negate(), ai2.colorHex, Math.min(6, Math.floor(relSpeed * 0.3)));
            }
          }
        }
      }
      
      // Update AI mesh positions and rotations
      this.race.aiRacers.forEach(ai => {
        if (ai.meshGroup) {
          ai.meshGroup.position.copy(ai.position);
          this.world.alignMeshToTerrain(ai.meshGroup, ai.position, ai.heading, false, scaledDt);
          ai.meshGroup.updateMatrixWorld(true);
          
          // Update AI light trails
          if (!ai.leftTrail) {
            ai.leftTrail = new LightTrail(this.scene, 0xff2200, 0.24);
            ai.rightTrail = new LightTrail(this.scene, 0xff2200, 0.24);
          }
          const aiLeftTail = new THREE.Vector3(-0.65, 0.42, -2.11).applyMatrix4(ai.meshGroup.matrixWorld);
          const aiRightTail = new THREE.Vector3(0.65, 0.42, -2.11).applyMatrix4(ai.meshGroup.matrixWorld);
          const aiSpeed = ai.velocity.length();
          ai.leftTrail.update(aiLeftTail, scaledDt, aiSpeed > 5.0);
          ai.rightTrail.update(aiRightTail, scaledDt, aiSpeed > 5.0);

          // Update AI headlight lens flares
          this.updateHeadlightFlares(ai.meshGroup, ai.heading);
          
          // Animate AI wheels rolling (pure scalar — no Vector3 alloc)
          const aiFwdSinH = Math.sin(ai.heading);
          const aiFwdCosH = Math.cos(ai.heading);
          const aiForwardSpeed = ai.velocity.x * aiFwdSinH + ai.velocity.z * aiFwdCosH;
          const aiWheelRot = (aiForwardSpeed / 0.42) * scaledDt;
          ai.wheels.forEach((w, idx) => {
            if (idx < 2) {
              w.children[0].rotation.y = ai.steeringAngle;
              w.children[1].rotation.y = ai.steeringAngle;
            }
            w.children[0].rotation.x += aiWheelRot;
            w.children[1].rotation.x += aiWheelRot;
          });

          // Spawn AI drift smoke or puddle splashes!
          const leftRear = new THREE.Vector3(-0.95, 0.1, -1.3).applyMatrix4(ai.meshGroup.matrixWorld);
          const rightRear = new THREE.Vector3(0.95, 0.1, -1.3).applyMatrix4(ai.meshGroup.matrixWorld);
          
          const leftWet = this.world.isWetAt(leftRear.x, leftRear.z);
          const rightWet = this.world.isWetAt(rightRear.x, rightRear.z);

          // Throttle AI water splashes to 120ms intervals
          if (!ai.splashTimer) ai.splashTimer = 0;
          ai.splashTimer -= scaledDt;

          if (aiSpeed > 3.0 && (leftWet || rightWet) && ai.splashTimer <= 0) {
            ai.splashTimer = 0.12;
            const backward = ai.velocity.clone().negate().normalize();
            backward.y = 0.55;
            backward.normalize();
            const count = Math.min(6, Math.floor(aiSpeed * 0.25));
            if (leftWet && count > 0) this.spawnParticles(leftRear, backward, 0xccddee, count, true);
            if (rightWet && count > 0) this.spawnParticles(rightRear, backward, 0xccddee, count, true);
          }

          if (ai.isDrifting) {
            const backward = ai.velocity.clone().negate().normalize();
            if (!leftWet) this.spawnParticles(leftRear, backward, 0xaaaaaa, 1);
            if (!rightWet) this.spawnParticles(rightRear, backward, 0xaaaaaa, 1);
          }

          // Spawn AI tire skid marks on drift
          if (ai.isDrifting) {
            if (ai.prevLeftWheel) this.spawnSkidmarkSegment(ai.prevLeftWheel, leftRear);
            if (ai.prevRightWheel) this.spawnSkidmarkSegment(ai.prevRightWheel, rightRear);
            ai.prevLeftWheel = leftRear.clone();
            ai.prevRightWheel = rightRear.clone();
          } else {
            ai.prevLeftWheel = null;
            ai.prevRightWheel = null;
          }

          // Spawn AI Nitro Exhaust particles if boosting!
          if (ai.isBoosting && Math.random() < 0.45) {
            const exhaustL = new THREE.Vector3(-0.6, 0.2, -2.1).applyMatrix4(ai.meshGroup.matrixWorld);
            const exhaustR = new THREE.Vector3(0.6, 0.2, -2.1).applyMatrix4(ai.meshGroup.matrixWorld);
            const backDir = new THREE.Vector3(-Math.sin(ai.heading), 0.1, -Math.cos(ai.heading));
            
            // Neon cyan/blue fire particles for nitro!
            this.spawnParticles(exhaustL, backDir, 0x00f0ff, 2);
            this.spawnParticles(exhaustR, backDir, 0x00f0ff, 2);
          }
        }
      });

      // Update position standings on HUD
      const rankings = this.race.calculateRankings(this.physics.position);
      const playerRank = rankings.findIndex(r => r.isPlayer) + 1;
      const posEl = document.getElementById('stats-pos');
      if (posEl) posEl.textContent = `${playerRank}/${rankings.length}`;

      if (raceResult) {
        if (raceResult.event === 'checkpoint') {
          // Flash a check point banner
          this.showBanner("CHECKPOINT", `Index: ${raceResult.nextIndex + 1}/${this.race.checkpoints.length}`, 800);
          this.rebuildCheckpointBeacons();
        } 
        else if (raceResult.event === 'lap') {
          this.showBanner("LAP COMPLETED", `LAP ${raceResult.lap} Started!`, 1500);
          this.rebuildCheckpointBeacons();
        } 
        else if (raceResult.event === 'finish') {
          const finalRankings = this.race.calculateRankings(this.physics.position);
          const finalPlayerRank = finalRankings.findIndex(r => r.isPlayer) + 1;
          const posSuffix = ["th", "st", "nd", "rd"][finalPlayerRank] || "th";

          this.showBanner("RACE FINISHED!", `Standing: ${finalPlayerRank}${posSuffix} | Time: ${this.formatTime(raceResult.time)}`, 5000);
          this.hudStatsEl.style.display = 'none';
          this.cancelBtnEl.style.display = 'none';
          this.navArrow.visible = false;
          this.clearCheckpointBeacons();
          this.clearAIMeshes();

          // Restore full traffic density in free roam
          if (this.traffic) {
            this.traffic.clear();
            this.traffic.maxVehicles = 40;
            this.traffic.init(this.physics.position, this.world);
          }
        }
      }

      // Update HUD Stats
      this.statsTimerEl.textContent = this.formatTime(this.race.timeElapsed);
      if (this.race.mode === 'circuit') {
        this.statsProgressLabelEl.textContent = "LAP";
        this.statsProgressEl.textContent = `${this.race.lapCurrent}/${this.race.lapsTotal}`;
      } else if (this.race.mode === 'unordered') {
        this.statsProgressLabelEl.textContent = "CLEARED";
        this.statsProgressEl.textContent = `${this.race.unorderedCleared.size}/${this.race.checkpoints.length}`;
      } else {
        this.statsProgressLabelEl.textContent = "CHECKPOINT";
        this.statsProgressEl.textContent = `${this.race.currentIndex + 1}/${this.race.checkpoints.length}`;
      }

      // Compass arrow pointing to the next active target checkpoint
      const activeCP = this.race.getActiveCheckpoint();
      if (activeCP) {
        this.navArrow.visible = true;
        const dx = activeCP.x - this.physics.position.x;
        const dz = activeCP.z - this.physics.position.z;
        const targetAngle = Math.atan2(dx, dz);
        // Rotate arrow relative to the car heading
        this.navArrow.rotation.y = targetAngle - this.physics.heading;
      } else if (this.race.mode === 'unordered') {
        // Point to nearest uncleared checkpoint in unordered mode
        let nearest = null;
        let minDist = Infinity;
        this.race.checkpoints.forEach((cp, idx) => {
          if (!this.race.unorderedCleared.has(idx)) {
            const dx = cp.x - this.physics.position.x;
            const dz = cp.z - this.physics.position.z;
            const dSq = dx * dx + dz * dz;
            if (dSq < minDist) {
              minDist = dSq;
              nearest = cp;
            }
          }
        });

        if (nearest) {
          this.navArrow.visible = true;
          const dx = nearest.x - this.physics.position.x;
          const dz = nearest.z - this.physics.position.z;
          const targetAngle = Math.atan2(dx, dz);
          this.navArrow.rotation.y = targetAngle - this.physics.heading;
        } else {
          this.navArrow.visible = false;
        }
      } else {
        this.navArrow.visible = false;
      }

      // Spawn tall checkpoint smoke particles
      this.race.checkpoints.forEach((cp, index) => {
        let isCurrent = false;
        let isNext = false;

        if (this.race.mode === 'unordered') {
          isCurrent = !this.race.unorderedCleared.has(index);
        } else {
          isCurrent = (index === this.race.currentIndex);
          
          let nextIndex = this.race.currentIndex + 1;
          if (nextIndex >= this.race.checkpoints.length) {
            if (this.race.mode === 'circuit' && this.race.lapCurrent < this.race.lapsTotal) {
              nextIndex = 0;
            } else {
              nextIndex = -1; // End of race
            }
          }
          isNext = (index === nextIndex);
        }

        if (isCurrent) {
          const isFinish = (index === this.race.checkpoints.length - 1);
          const color = isFinish ? 0xe84545 : 0xffaa3a;
          if (Math.random() < 0.55) {
            this.spawnCheckpointSmoke(cp, color, 1.0, 1.0);
          }
        } else if (isNext) {
          const isFinish = (index === this.race.checkpoints.length - 1);
          const color = isFinish ? 0xe84545 : 0xffaa3a;
          if (Math.random() < 0.20) {
            this.spawnCheckpointSmoke(cp, color, 0.45, 0.65); // Less loud: smaller size, lower opacity
          }
        }
      });
    }

    // Tick systems
    this.updateParticles(scaledDt);
    this.updateCheckpointSmoke(scaledDt);
    this.updateDebris(scaledDt);
    this.checkBreakablesCollision(scaledDt);
    this.checkSlipstream(scaledDt);
    this.checkNearMisses(scaledDt);
    this.updateDriftNitro(scaledDt);

    // Update debug path and lookahead visuals
    let hasPath = false;
    if (this.debugFocusAI && this.race && this.race.aiRacers) {
      const activeAI = this.race.aiRacers.find(ai => ai.id === this.debugFocusAI);
      if (activeAI) {
        if (activeAI._currentPath && activeAI._currentPath.length > 0) {
          hasPath = true;
          const pts = [];
          pts.push(activeAI.position.clone());
          for (let i = activeAI._pathWptIdx; i < activeAI._currentPath.length; i++) {
            const wpt = activeAI._currentPath[i].clone();
            wpt.y = 1.2 + (this.world ? this.world.getGroundHeight(wpt.x, wpt.z) : 0.5);
            pts.push(wpt);
          }
          this.debugPathLine.geometry.setFromPoints(pts);
          this.debugPathLine.visible = true;
        }
        
        if (activeAI.debugLookahead) {
          this.debugLookaheadMarker.position.copy(activeAI.debugLookahead);
          this.debugLookaheadMarker.position.y = 1.5 + (this.world ? this.world.getGroundHeight(activeAI.debugLookahead.x, activeAI.debugLookahead.z) : 0.5);
          this.debugLookaheadMarker.visible = true;
        } else {
          this.debugLookaheadMarker.visible = false;
        }
      }
    }
    
    if (!hasPath) {
      this.debugPathLine.visible = false;
      this.debugLookaheadMarker.visible = false;
    }
    
    // Update skidmarks (Persistent until far away - 220m)
    const px = this.physics.position.x;
    const pz = this.physics.position.z;
    const pruneDistSq = 220 * 220;

    this.skidmarkPool.forEach(s => {
      if (s.mesh.visible) {
        const dx = s.mesh.position.x - px;
        const dz = s.mesh.position.z - pz;
        const distSq = dx * dx + dz * dz;
        if (distSq > pruneDistSq) {
          s.mesh.visible = false;
        }
      }
    });
    
    // Animate floating checkpoint next-arrows (bobbing and pulsing)
    this.checkpointVisualsGroup.children.forEach(cpGroup => {
      const arrow = cpGroup.getObjectByName("nextCPArrow");
      if (arrow) {
        arrow.position.y = 3.5 + Math.sin(this.clock.getElapsedTime() * 4.0) * 0.6;
        const scale = 1.2 + Math.sin(this.clock.getElapsedTime() * 8.0) * 0.15;
        arrow.scale.set(scale, scale, scale);
      }
    });

    this.updateCamera(dt);
    // Minimap is cheap but still skip every other frame for a free 50% minimap savings
    if (!this._minimapFrame) this._minimapFrame = 0;
    if ((this._minimapFrame++ & 1) === 0) this.updateMinimap();

    // Speedometer UI update
    const mph = Math.round(Math.abs(forwardSpeed) * 2.23694);
    this.speedValEl.textContent = mph;

    // Gear UI update
    if (this.gearValEl) {
      if (this.physics.shiftTimer > 0) {
        this.gearValEl.textContent = "—";
        this.gearValEl.style.color = "#ffaa3a";
      } else {
        this.gearValEl.textContent = this.physics.gear;
        this.gearValEl.style.color = this.physics.gear === 'R' ? '#e84545' : '#e5a93b';
      }
    }

    // RPM UI update
    if (this.rpmBarEl) {
      const rpmPct = ((this.physics.rpm - 1000) / (8000 - 1000)) * 100;
      this.rpmBarEl.style.width = `${Math.max(0, Math.min(100, rpmPct))}%`;
      if (this.physics.rpm > 7300) {
        this.rpmBarEl.style.background = '#e84545';
      } else {
        this.rpmBarEl.style.background = 'linear-gradient(90deg, #e5a93b 70%, #e84545 100%)';
      }
    }

    // Nitro UI update
    if (this.nitroBarEl && this.nitroPctEl) {
      const nitroPct = Math.round(this.physics.nitroLevel * 100);
      this.nitroPctEl.textContent = `${nitroPct}%`;
      this.nitroBarEl.style.width = `${nitroPct}%`;
      
      if (this.physics.isBoosting) {
        this.nitroBarEl.style.background = 'linear-gradient(90deg, #00ffff 0%, #ffffff 100%)';
        this.nitroBarEl.style.boxShadow = '0 0 12px #ffffff';
      } else {
        this.nitroBarEl.style.background = 'linear-gradient(90deg, #0099ff 0%, #00f0ff 100%)';
        this.nitroBarEl.style.boxShadow = '0 0 8px #00f0ff';
      }
    }

    // Check for new stunt notification from the physics engine
    if (this.physics.trickNotification) {
      const msg = this.physics.trickNotification;
      this.physics.trickNotification = ""; // consume immediately
      
      let title = "STUNT LANDED!";
      let scoreText = "";
      
      if (msg.includes("WIPEOUT")) {
        title = "WIPEOUT!";
        scoreText = msg.replace("WIPEOUT: ", "");
        this.showStuntNotification(title, scoreText);
        // Play crash sparks / debris
        const contactPos = this.physics.position.clone();
        contactPos.y += 0.3;
        this.spawnDebris(contactPos, new THREE.Vector3(0, 4, 0), 0x222222, 16);
        
        // Massive wipeout screenshake!
        this.crashShake = Math.max(this.crashShake || 0, 0.95);
      } else if (msg.includes("CLEAN LANDING")) {
        title = "CLEAN LANDING!";
        scoreText = msg.replace("CLEAN LANDING: ", "");
        this.showStuntNotification(title, scoreText);
        // Clean landing particles
        const contactPos = this.physics.position.clone();
        contactPos.y += 0.1;
        this.spawnParticles(contactPos, new THREE.Vector3(0, 2, 0), 0x00f0ff, 15);
        
        // Landing shake (impact based)
        const verticalImpact = Math.abs(this.physics.velocityY);
        if (verticalImpact > 6.0) {
          this.crashShake = Math.max(this.crashShake || 0, Math.min(0.7, verticalImpact * 0.055));
        }
      } else if (msg.includes("LANDED")) {
        title = "STUNT LANDED!";
        scoreText = msg.replace("LANDED: ", "");
        this.showStuntNotification(title, scoreText);
        const contactPos = this.physics.position.clone();
        contactPos.y += 0.1;
        this.spawnParticles(contactPos, new THREE.Vector3(0, 1.5, 0), 0xe5a93b, 10);
        
        // Landing shake (impact based)
        const verticalImpact = Math.abs(this.physics.velocityY);
        if (verticalImpact > 6.0) {
          this.crashShake = Math.max(this.crashShake || 0, Math.min(0.6, verticalImpact * 0.05));
        }
      } else {
        title = msg;
        scoreText = "";
        this.showStuntNotification(title, scoreText);
        const contactPos = this.physics.position.clone();
        contactPos.y += 0.1;
        this.spawnParticles(contactPos, new THREE.Vector3(0, 1.5, 0), 0x00ff7f, 8);
        
        const verticalImpact = Math.abs(this.physics.velocityY);
        if (verticalImpact > 6.0) {
          this.crashShake = Math.max(this.crashShake || 0, Math.min(0.5, verticalImpact * 0.055));
        }
      }
    }

    // Dynamic HDR Auto-Exposure (Eye Adaptation)
    let localBrightness = 0.04; // Base dark brightness offset
    
    if (this.world && this.world.lightSources) {
      this.world.lightSources.forEach(light => {
        const dx = light.x - px;
        const dz = light.z - pz;
        const distSq = dx * dx + dz * dz;
        if (distSq < 1600) { // Check within 40m
          const dist = Math.sqrt(distSq);
          const contribution = (light.intensity || 10) / (1.0 + distSq * 0.1);
          localBrightness += contribution;
        }
      });
    }
    
    // Add headlight baseline contribution
    localBrightness += 1.5;

    // target exposure: inverse of square root of brightness (higher base and max targets for dark areas)
    const targetExposure = Math.max(0.85, Math.min(3.2, 2.6 / Math.sqrt(localBrightness)));
    
    if (this.renderer.toneMappingExposure === undefined) {
      this.renderer.toneMappingExposure = 1.0;
    }
    // Eye adaptation latency interpolation
    this.renderer.toneMappingExposure += (targetExposure - this.renderer.toneMappingExposure) * dt * 2.5;

    this.composer.render();
  }
}

new Game();
