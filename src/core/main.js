import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { LightTrail } from './lighttrail.js';
import { createLensflareTexture, createSkidmarkTexture, createNitroFlareTexture } from './textures.js';
import { createVoxelCarMesh } from './carMesh.js';
import { World } from '../world/world.js';
import { CarPhysics } from './physics.js';
import { RaceManager } from '../gameplay/race.js';
import { CinematicManager } from '../gameplay/cinematicManager.js';
import { TrafficManager } from '../ai/trafficManager.js';
import { PursuitManager } from '../gameplay/pursuitManager.js';
import { initInput, initDebugVisuals } from './input.js';
import { updateCamera, cycleCameraFocus, cycleCameraMode, getTargetGameplayCamera } from './camera.js';
import { getParticleMaterial, getSmokeMaterial, initParticles, initCheckpointSmoke, initSkidmarks, spawnSkidmarkSegment, spawnParticles, spawnCheckpointSmoke, updateParticles, updateCheckpointSmoke, initDebris, spawnDebris, updateDebris } from './particles.js';
import { formatTime, showBanner, initNotifications, showNotification, removeNotification, showStuntNotification, updateMinimap, initRaceHUD, initHypeSystem, showHype, hideHype } from './hud.js';
import { HypeManager } from '../gameplay/hype.js';
import { checkBreakablesCollision } from '../gameplay/breakables.js';
import { checkSlipstream, checkNearMisses, updateDriftNitro, updateAirNitro } from '../gameplay/stunts.js';
import { handleCrashDamage } from './carMesh.js';
import { testOBBCollision } from './obb.js';

// Global scratch variables for zero-alloc math in game loop to prevent GC stutters
const _scratchV3_1 = new THREE.Vector3();
const _scratchV3_2 = new THREE.Vector3();
const _scratchV3_3 = new THREE.Vector3();
const _scratchV3_4 = new THREE.Vector3();
const _scratchQuat = new THREE.Quaternion();
const _scratchQuat2 = new THREE.Quaternion();
const _scratchEuler = new THREE.Euler();







class Game {
  constructor() {
    this.container = document.getElementById('canvas-container');
    this.speedValEl = document.getElementById('speed-val');
    this.driftStatusEl = document.getElementById('drift-status');
    this.loaderEl = document.getElementById('loader');
    this.gearValEl = document.getElementById('gear-val');
    this.dialNeedleEl = document.getElementById('dial-needle');
    this.dialRpmFillEl = document.getElementById('dial-rpm-fill');
    this.nitroBarEl = document.getElementById('dial-nitro-fill');
    this.nitroPctEl = document.getElementById('nitro-pct');
    this.stuntNotifEl = document.getElementById('stunt-notif');
    this.stuntTitleEl = document.getElementById('stunt-title');
    this.stuntScoreEl = document.getElementById('stunt-score');
    this.nearMissCooldowns = new Map();
    this.driftNitroGained = 0.0;
    this.prevIsDrifting = false;
    this.gearShiftPunch = 0.0;
    this.debugShowTrafficOnMinimap = false; // Set to true only in debug to show traffic on radar

    // Inputs
    this.keys = {};
    this.inFeedbackMenu = false;

    this.debugMenuEnabled = false;
    this.physics = new CarPhysics();
    this.race = new RaceManager();

    // Setup Feedback UI Logic
    this.setupFeedbackUI();

    this.inMainMenu = true;
    this.cinematicManager = new CinematicManager(this);
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
    this.nitroFlareTex = createNitroFlareTexture();
    this.nitroSpriteMat = new THREE.SpriteMaterial({
      map: this.nitroFlareTex,
      color: 0xffffff,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
    this.initThree();
    this.world = new World(this.scene);
    this.isInitialLoad = true;

    // Pick a random axis (X or Z) and direction to ensure the camera is always on the same
    // straight road as the player (who starts at 0,0). This guarantees the transition swoop
    // travels cleanly down the road instead of cutting diagonally through buildings!
    const axes = ['x', 'z'];
    this.menuCameraAxis = axes[Math.floor(Math.random() * axes.length)];
    this.menuCameraDir = Math.random() > 0.5 ? 1 : -1;
    this.menuCameraBaseOffset = 180 + Math.random() * 80;

    // Snap player to the dynamically generated ground height at spawn so they don't fall/clip
    const startY = this.world.getGroundHeight(this.physics.position.x, this.physics.position.z);
    this.physics.position.y = startY + 0.5; // suspension clearance

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
    this.initNotifications();
    this.initRaceHUD();
    this.initHypeSystem();
    this.hypeManager = new HypeManager(this);
    this.initDebugVisuals();
    this.perf = { world: 0, physics: 0, traffic: 0, trafficUpdate: 0, trafficMesh: 0, collisions: 0, playerVisuals: 0, pursuit: 0, race: 0, particles: 0, render: 0, eyeAdaptation: 0, total: 0 };
    this.createPerfHUD();

    // Traffic System
    this.traffic = new TrafficManager(this.scene, 30);
    this.traffic.init(this.physics.position, this.world);

    // Dynamic World Event Start Selection
    this.race.selectNewWorldEvent(this.world, this.physics.position);
    this.lastEventRefreshPos = this.physics.position.clone();

    // Create event proximity prompt dynamically
    this.eventPromptEl = document.createElement('div');
    this.eventPromptEl.className = 'event-prompt-container';
    this.eventPromptEl.innerHTML = `
      <div id="event-prompt-stats" class="event-prompt-stats"></div>
      <div id="event-prompt-mode" class="event-prompt-title">CIRCUIT EVENT</div>
      <div class="event-prompt-action">PRESS [F] TO START</div>
    `;
    document.body.appendChild(this.eventPromptEl);
    this.eventPromptModeEl = document.getElementById('event-prompt-mode');
    this.eventPromptStatsEl = document.getElementById('event-prompt-stats');

    // Precompile shaders to avoid runtime compilation stutter
    this.precompileShaders();

    // Main Menu State Initialization
    this.inMainMenu = true;
    this.menuTransitionTime = 0.0;
    this.menuTransitionDuration = 2.0; // 2 seconds swoop

    this.mainMenuEl = document.getElementById('main-menu');
    this.hudLayerEl = document.querySelector('.hud-layer');
    if (this.hudLayerEl) {
      this.hudLayerEl.style.display = 'none';
    }
    this.racePanelEl = document.querySelector('.race-panel');
    if (this.racePanelEl) {
      this.racePanelEl.style.display = 'none';
    }

    const btnPlay = document.getElementById('btn-play');
    if (btnPlay) {
      btnPlay.onclick = () => {
        if (this.inMainMenu && this.menuTransitionTime === 0.0) {
          this.menuTransitionTime = 0.001; // trigger transition
          if (this.mainMenuEl) {
            this.mainMenuEl.classList.add('fade-out');
            setTimeout(() => {
              this.mainMenuEl.remove();
            }, 600);
          }
        }
      };
    }

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
    this.scene.fog = new THREE.FogExp2(0x131726, 0.0072); // Increased density for cleaner silhouette and smoother depth transition

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // Cap pixel ratio to 1.25 to prevent extreme resolution scaling on 4K monitors (which tanks FPS even on high-end GPUs)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
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

  updateVehicleLOD(v, dist, targetOpacity = 1.0) {
    if (!v.meshGroup) return;

    let lodFactor = 1.0;
    if (dist > 95.0) {
      lodFactor = 0.0;
    } else if (dist > 80.0) {
      lodFactor = 1.0 - (dist - 80.0) / 15.0;
    }

    const useLowLOD = lodFactor <= 0.0;
    if (v._lastLOD !== useLowLOD) {
      v._lastLOD = useLowLOD;
      if (v.wheels) {
        v.wheels.forEach(w => w.visible = !useLowLOD);
      }
      v.meshGroup.children.forEach(child => {
        if (child.name !== "carBody" && child.name !== "headlightPool") {
          child.visible = !useLowLOD;
        }
      });
    }

    const bodyOpacity = targetOpacity;
    const detailOpacity = lodFactor * targetOpacity;

    if (v._lastBodyOpacity !== bodyOpacity || v._lastDetailOpacity !== detailOpacity) {
      v._lastBodyOpacity = bodyOpacity;
      v._lastDetailOpacity = detailOpacity;

      const isVisible = bodyOpacity > 0.005;
      v.meshGroup.visible = isVisible;

      if (isVisible) {
        // Set body opacity
        const carBody = v.meshGroup.getObjectByName("carBody");
        if (carBody && carBody.material) {
          carBody.material.transparent = bodyOpacity < 0.99;
          carBody.material.opacity = bodyOpacity;
        }

        // Set detail opacity
        if (!useLowLOD) {
          v.meshGroup.children.forEach(child => {
            if (child.name !== "carBody" && child.name !== "headlightPool") {
              child.traverse(sub => {
                if (sub.isMesh && sub.material) {
                  sub.material.transparent = detailOpacity < 0.99;
                  sub.material.opacity = detailOpacity;
                }
              });
            }
          });
        }
      }
    }
  }

  createCarMesh() {
    // Voxel Tuner Car for the player (Less sporty, more 'car' look per user request)
    const { carGroup, wheels } = this.createVoxelCarMesh(0x1a3d8c, 'sedan');
    const playerHeadlightPool = carGroup.getObjectByName("headlightPool");
    if (playerHeadlightPool) {
      playerHeadlightPool.material.opacity = 0.0;
    }

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

    // Nitro realtime glow and flare sprites
    this.nitroLight = new THREE.PointLight(0x00f0ff, 0.0, 15, 1.4);
    this.nitroLight.position.set(0, 0.3, -2.15);
    this.carGroup.add(this.nitroLight);

    this.sparkLight = new THREE.PointLight(0xffdd44, 0.0, 25, 2.0);
    this.scene.add(this.sparkLight);

    // Reverse Lights (White)
    this.reverseLightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.reverseLightPoint = new THREE.PointLight(0xffffff, 0.0, 8, 1.5);
    this.reverseLightPoint.position.set(0, 0.42, -2.4);
    this.carGroup.add(this.reverseLightPoint);

    const reverseLightGeo = new THREE.BoxGeometry(0.25, 0.1, 0.1);
    this.reverseLightL = new THREE.Mesh(reverseLightGeo, this.reverseLightMat);
    this.reverseLightL.position.set(-0.55, 0.42, -2.36);
    this.reverseLightL.visible = false;
    this.carGroup.add(this.reverseLightL);

    this.reverseLightR = new THREE.Mesh(reverseLightGeo, this.reverseLightMat);
    this.reverseLightR.position.set(0.55, 0.42, -2.36);
    this.reverseLightR.visible = false;
    this.carGroup.add(this.reverseLightR);

    this.nitroLeftSprite = new THREE.Sprite(this.nitroSpriteMat);
    this.nitroLeftSprite.position.set(-0.6, 0.2, -2.1);
    this.nitroLeftSprite.scale.set(0.001, 0.001, 0.001);
    this.carGroup.add(this.nitroLeftSprite);

    this.nitroRightSprite = new THREE.Sprite(this.nitroSpriteMat);
    this.nitroRightSprite.position.set(0.6, 0.2, -2.1);
    this.nitroRightSprite.scale.set(0.001, 0.001, 0.001);
    this.carGroup.add(this.nitroRightSprite);

    // Dynamic Headlight Spotlights (casting actual light beams forward!)
    // Narrowed angle (Math.PI/14) and high penumbra (0.85) to create two distinct headlight pools
    this.leftSpotTarget = new THREE.Object3D();
    this.leftSpotTarget.position.set(-0.65, 0.4, 15);
    this.scene.add(this.leftSpotTarget); // Added to scene for correct world direction calculation

    this.leftSpot = new THREE.SpotLight(0xfffae6, 14.0, 50, Math.PI / 14, 0.85, 1.0);
    this.leftSpot.position.set(-0.65, 0.4, 2.35);
    this.leftSpot.target = this.leftSpotTarget;
    this.carGroup.add(this.leftSpot);

    this.rightSpotTarget = new THREE.Object3D();
    this.rightSpotTarget.position.set(0.65, 0.4, 15);
    this.scene.add(this.rightSpotTarget); // Added to scene

    this.rightSpot = new THREE.SpotLight(0xfffae6, 14.0, 50, Math.PI / 14, 0.85, 1.0);
    this.rightSpot.position.set(0.65, 0.4, 2.35);
    this.rightSpot.target = this.rightSpotTarget;
    this.carGroup.add(this.rightSpot);

    // Car transformation nodes
    this.carVisualContainer = new THREE.Group();
    this.carVisualContainer.add(this.carGroup);
    this.scene.add(this.carVisualContainer);


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

  deformHeadlightPoolToTerrain(meshGroup) {
    const headlightPool = meshGroup.getObjectByName("headlightPool");
    if (!headlightPool || !headlightPool.visible || headlightPool.material.opacity <= 0.01) return;

    headlightPool.updateMatrixWorld(true);
    const invMat = new THREE.Matrix4().copy(headlightPool.matrixWorld).invert();

    const posAttr = headlightPool.geometry.attributes.position;
    const tempV = new THREE.Vector3();

    for (let i = 0; i < posAttr.count; i++) {
      const localX = posAttr.getX(i);
      const localZ = posAttr.getZ(i);

      // World position of the vertex on the X-Z plane
      tempV.set(localX, 0, localZ).applyMatrix4(headlightPool.matrixWorld);

      // Get ground height at this world coordinate
      const groundY = this.world.getGroundHeight(tempV.x, tempV.z);

      // Convert world target back to local space
      tempV.set(tempV.x, groundY + 0.05, tempV.z).applyMatrix4(invMat);

      posAttr.setY(i, tempV.y);
    }

    posAttr.needsUpdate = true;
  }

  createNavigationArrow() {
    // 3D voxel pointer arrow floating above the car roof
    this.navArrow = new THREE.Group();
    this.navArrow.renderOrder = 9999;

    const arrowMat = new THREE.MeshStandardMaterial({
      color: 0xe5a93b,
      emissive: 0xe5a93b,
      emissiveIntensity: 0.6,
      roughness: 0.6,
      metalness: 0.3,
      depthTest: false, // Renders on top of building geometry for visibility!
      depthWrite: false,
      transparent: true
    });

    // Arrow Shaft
    const shaftGeo = new THREE.BoxGeometry(0.3, 0.15, 1.2);
    const shaft = new THREE.Mesh(shaftGeo, arrowMat);
    shaft.position.z = -0.4;
    shaft.castShadow = true;
    shaft.receiveShadow = true;
    shaft.renderOrder = 9999;
    this.navArrow.add(shaft);

    // Arrow Tip (cone/pyramid shape)
    const tipGeo = new THREE.ConeGeometry(0.5, 1.0, 4);
    tipGeo.rotateX(Math.PI / 2);
    const tip = new THREE.Mesh(tipGeo, arrowMat);
    tip.position.z = 0.5;
    tip.castShadow = true;
    tip.receiveShadow = true;
    tip.renderOrder = 9999;
    this.navArrow.add(tip);

    // Position above cabin roof (cabin height=0.8 + 0.5/2 + offset)
    this.navArrow.position.set(0, 1.7, -0.3);
    this.navArrow.rotation.x = -0.32; // Tilt upward (pitch) like Midnight Club
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

  cycleCameraMode() {
    return cycleCameraMode.call(this);
  }

  getTargetGameplayCamera() {
    return getTargetGameplayCamera.call(this);
  }

  initMinimap() {
    this.minimapCanvas = document.getElementById('minimap-canvas');
    this.minimapCtx = this.minimapCanvas.getContext('2d');
    this.minimapCanvas.width = 140;
    this.minimapCanvas.height = 140;
  }

  createPerfHUD() {
    const hud = document.createElement('div');
    hud.id = 'perf-hud';
    hud.style.position = 'absolute';
    hud.style.top = '10px';
    hud.style.left = '10px';
    hud.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    hud.style.color = '#00ffcc';
    hud.style.fontFamily = 'monospace';
    hud.style.fontSize = '12px';
    hud.style.padding = '10px';
    hud.style.borderRadius = '5px';
    hud.style.zIndex = '99999';
    hud.style.border = '1px solid #00ffcc';
    hud.style.pointerEvents = 'none';
    hud.style.display = 'none';
    hud.innerHTML = `
      <div style="font-weight:bold;margin-bottom:5px;border-bottom:1px solid #00ffcc;">PERFORMANCE HUD</div>
      <div>FPS: <span id="perf-fps">0</span></div>
      <div>Total Frame: <span id="perf-total">0.0</span>ms</div>
      <div>World/Chunks: <span id="perf-world">0.0</span>ms</div>
      <div>Physics: <span id="perf-physics">0.0</span>ms</div>
      <div>Traffic AI: <span id="perf-traffic-update">0.0</span>ms</div>
      <div>Traffic Mesh: <span id="perf-traffic-mesh">0.0</span>ms</div>
      <div>Collisions: <span id="perf-collisions">0.0</span>ms</div>
      <div>Player Visuals: <span id="perf-player-visuals">0.0</span>ms</div>
      <div>Pursuit: <span id="perf-pursuit">0.0</span>ms</div>
      <div>Race/AI: <span id="perf-race">0.0</span>ms</div>
      <div>Particles/Ticks: <span id="perf-particles">0.0</span>ms</div>
      <div>Render Frame: <span id="perf-render">0.0</span>ms</div>
      <div>Eye Adaptation: <span id="perf-eye">0.0</span>ms</div>
      <div style="margin-top:5px;font-size:10px;color:#aaa;border-top:1px solid #444;padding-top:5px;">THREE.JS INFO</div>
      <div>Draw Calls: <span id="perf-calls">0</span></div>
      <div>Triangles: <span id="perf-triangles">0</span></div>
      <div>Geometries: <span id="perf-geometries">0</span></div>
      <div>Textures: <span id="perf-textures">0</span></div>
      <div>Shaders: <span id="perf-shaders">0</span></div>
      <div style="margin-top:5px;font-size:10px;color:#aaa;">Press 'P' to toggle HUD</div>
    `;
    document.body.appendChild(hud);

    window.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'p') {
        hud.style.display = hud.style.display === 'none' ? 'block' : 'none';
      }
    });

    this.perfFpsEl = document.getElementById('perf-fps');
    this.perfTotalEl = document.getElementById('perf-total');
    this.perfWorldEl = document.getElementById('perf-world');
    this.perfPhysicsEl = document.getElementById('perf-physics');
    this.perfTrafficUpdateEl = document.getElementById('perf-traffic-update');
    this.perfTrafficMeshEl = document.getElementById('perf-traffic-mesh');
    this.perfCollisionsEl = document.getElementById('perf-collisions');
    this.perfPlayerVisualsEl = document.getElementById('perf-player-visuals');
    this.perfPursuitEl = document.getElementById('perf-pursuit');
    this.perfRaceEl = document.getElementById('perf-race');
    this.perfParticlesEl = document.getElementById('perf-particles');
    this.perfRenderEl = document.getElementById('perf-render');
    this.perfEyeEl = document.getElementById('perf-eye');
    this.perfCallsEl = document.getElementById('perf-calls');
    this.perfTrianglesEl = document.getElementById('perf-triangles');
    this.perfGeometriesEl = document.getElementById('perf-geometries');
    this.perfTexturesEl = document.getElementById('perf-textures');
    this.perfShadersEl = document.getElementById('perf-shaders');
  }

  setupFeedbackUI() {
    const toggleBtn = document.getElementById('btn-feedback-toggle');
    const modal = document.getElementById('feedback-modal');
    const cancelBtn = document.getElementById('btn-feedback-cancel');
    const form = document.getElementById('feedback-form');
    const statusEl = document.getElementById('feedback-status');

    const openFeedback = () => {
      this.inFeedbackMenu = true;
      modal.style.display = 'flex';
      form.reset();
      statusEl.textContent = '';
      // Focus textarea
      setTimeout(() => form.querySelector('textarea').focus(), 10);
    };

    const closeFeedback = () => {
      this.inFeedbackMenu = false;
      modal.style.display = 'none';
      // Blur any inputs so keydown doesn't keep getting captured
      document.activeElement.blur();
    };

    if (toggleBtn) {
      toggleBtn.addEventListener('click', openFeedback);
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', closeFeedback);
    }

    // Quick Feedback Logic
    const likeBtn = document.getElementById('btn-like-race');
    const dislikeBtn = document.getElementById('btn-dislike-race');
    const qfThanks = document.getElementById('quick-feedback-thanks');

    const sendQuickFeedback = (rating) => {
      fetch('https://formspree.io/f/xykqyobp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ message: `Quick Feedback: User rated the ${this.race ? this.race.mode : 'race'} as ${rating}` })
      }).catch(e => console.error(e)); // Fire and forget

      if (likeBtn) likeBtn.style.display = 'none';
      if (dislikeBtn) dislikeBtn.style.display = 'none';
      if (qfThanks) qfThanks.style.display = 'block';
    };

    if (likeBtn) likeBtn.addEventListener('click', () => sendQuickFeedback('LIKE'));
    if (dislikeBtn) dislikeBtn.addEventListener('click', () => sendQuickFeedback('DISLIKE'));

    window.addEventListener('keydown', (e) => {
      // Prevent opening if they are already typing in an input
      if (e.key.toLowerCase() === 'g' && !this.inFeedbackMenu && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        openFeedback();
      } else if (e.key === 'Escape' && this.inFeedbackMenu) {
        closeFeedback();
      }
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        statusEl.textContent = 'Sending...';
        statusEl.style.color = '#fff';

        fetch(form.action, {
          method: form.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        }).then(response => {
          if (response.ok) {
            statusEl.textContent = 'Thanks for your feedback!';
            statusEl.style.color = '#00ffcc';
            setTimeout(closeFeedback, 1500);
          } else {
            statusEl.textContent = 'Oops! There was a problem submitting your form';
            statusEl.style.color = '#ff1e1e';
          }
        }).catch(error => {
          statusEl.textContent = 'Oops! There was a problem submitting your form';
          statusEl.style.color = '#ff1e1e';
        });
      });
    }
  }

  precompileShaders() {
    const dummyGroup = new THREE.Group();
    this.scene.add(dummyGroup);

    // Collect all materials to compile
    const mats = [];

    // World materials
    if (this.world) {
      if (this.world.asphaltMaterials) mats.push(...this.world.asphaltMaterials);
      if (this.world.concreteMat) mats.push(this.world.concreteMat);
      if (this.world.yellowLineMat) mats.push(this.world.yellowLineMat);
      if (this.world.whiteLineMat) mats.push(this.world.whiteLineMat);
      if (this.world.materials) mats.push(...this.world.materials);
      if (this.world.windowDetailedMat) mats.push(this.world.windowDetailedMat);
      if (this.world.doorMat) mats.push(this.world.doorMat);
      if (this.world.accessoryMat) mats.push(this.world.accessoryMat);
      if (this.world.trunkMat) mats.push(this.world.trunkMat);
      if (this.world.leafMat) mats.push(this.world.leafMat);
      if (this.world.leafCherryMat) mats.push(this.world.leafCherryMat);
      if (this.world.leafAutumnMat) mats.push(this.world.leafAutumnMat);
      if (this.world.streetlightPoleMat) mats.push(this.world.streetlightPoleMat);
      if (this.world.streetlightBulbMat) mats.push(this.world.streetlightBulbMat);
      if (this.world.ledGroundLightPoolMat) mats.push(this.world.ledGroundLightPoolMat);
      if (this.world.sodiumGroundLightPoolMat) mats.push(this.world.sodiumGroundLightPoolMat);
      if (this.world.storefrontGroundLightPoolMat) mats.push(this.world.storefrontGroundLightPoolMat);
      if (this.world.lightConeMatLED) mats.push(this.world.lightConeMatLED);
      if (this.world.lightConeMatSodium) mats.push(this.world.lightConeMatSodium);
      if (this.world.tlRedOnMat) mats.push(this.world.tlRedOnMat);
      if (this.world.tlRedOffMat) mats.push(this.world.tlRedOffMat);
      if (this.world.tlYellowOnMat) mats.push(this.world.tlYellowOnMat);
      if (this.world.tlYellowOffMat) mats.push(this.world.tlYellowOffMat);
      if (this.world.tlGreenOnMat) mats.push(this.world.tlGreenOnMat);
      if (this.world.tlGreenOffMat) mats.push(this.world.tlGreenOffMat);
      if (this.world.tlHousingMat) mats.push(this.world.tlHousingMat);
      if (this.world.benchWoodMat) mats.push(this.world.benchWoodMat);
      if (this.world.benchIronMat) mats.push(this.world.benchIronMat);
      if (this.world.phoneBoothFrameMat) mats.push(this.world.phoneBoothFrameMat);
      if (this.world.phoneBoothGlassMat) mats.push(this.world.phoneBoothGlassMat);
      if (this.world.phoneBoothScreenMat) mats.push(this.world.phoneBoothScreenMat);
      if (this.world.trashCanMat) mats.push(this.world.trashCanMat);
      if (this.world.trashCanLidMat) mats.push(this.world.trashCanLidMat);
      if (this.world.dumpsterMat) mats.push(this.world.dumpsterMat);
      if (this.world.cardboardMat) mats.push(this.world.cardboardMat);
      if (this.world.trashBagMat) mats.push(this.world.trashBagMat);
      if (this.world.woodPoleMat) mats.push(this.world.woodPoleMat);
      if (this.world.hydrantRedMat) mats.push(this.world.hydrantRedMat);
      if (this.world.hydrantCapMat) mats.push(this.world.hydrantCapMat);
      if (this.world.newspaperBodyMat) mats.push(this.world.newspaperBodyMat);
      if (this.world.newspaperGlassMat) mats.push(this.world.newspaperGlassMat);
      if (this.world.newspaperPaperMat) mats.push(this.world.newspaperPaperMat);

      // Neon/billboard color variations
      if (this.world.billboardColors) {
        this.world.billboardColors.forEach(c => {
          mats.push(new THREE.MeshStandardMaterial({
            color: 0x111111,
            emissive: c,
            emissiveIntensity: 4.0
          }));
        });
      }
    }

    // Player and car materials
    if (this.playerTaillightMat) mats.push(this.playerTaillightMat);

    // Particle & Smoke materials
    if (this.particlePool && this.particlePool.length > 0) {
      mats.push(this.particlePool[0].mat);
    }
    if (this.smokePool && this.smokePool.length > 0) {
      mats.push(this.smokePool[0].mat);
    }
    if (this.skidMaterials) {
      mats.push(...this.skidMaterials);
    }
    if (this.debrisPool && this.debrisPool.length > 0) {
      mats.push(this.debrisPool[0].material);
    }

    // Create dummy meshes for basic materials compilation
    const geom = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    mats.forEach(mat => {
      const mesh = new THREE.Mesh(geom, mat);
      dummyGroup.add(mesh);
    });

    // Compile all car types to compile their specific materials (rimMat, bodyMat variations, sirenMat, lens flares)
    const carTypes = ['sports', 'pickup', 'van', 'cop', 'sedan'];
    carTypes.forEach(type => {
      const color = type === 'cop' ? 0x000000 : 0x1a3d8c;
      const { carGroup } = this.createVoxelCarMesh(color, type);
      dummyGroup.add(carGroup);
    });

    // Compile everything
    this.renderer.compile(this.scene, this.camera);

    // Clean up dummy meshes and dispose cloned geometries to avoid memory leaks
    dummyGroup.traverse(child => {
      if (child.geometry) {
        child.geometry.dispose();
      }
    });
    this.scene.remove(dummyGroup);
    geom.dispose();
  }

  getParticleMaterial(color, opacity) {
    return getParticleMaterial.call(this, color, opacity);
  }

  getSmokeMaterial(color, opacity) {
    return getSmokeMaterial.call(this, color, opacity);
  }

  getModeColor(mode) {
    switch (mode) {
      case 'sprint': return { hex: 0xc026ff, css: '#c026ff', glow: 'rgba(192, 38, 255, 0.9)' }; // Purple
      case 'circuit': return { hex: 0xff1e1e, css: '#ff1e1e', glow: 'rgba(255, 30, 30, 0.9)' }; // Red
      case 'autocross': return { hex: 0x00e5ff, css: '#00e5ff', glow: 'rgba(0, 229, 255, 0.9)' }; // Cyan
      case 'unordered': return { hex: 0xffc600, css: '#ffc600', glow: 'rgba(255, 198, 0, 0.9)' }; // Orange
      default: return { hex: 0xff1e1e, css: '#ff1e1e', glow: 'rgba(255, 30, 30, 0.9)' };
    }
  }

  getEventTextMaterial(text, mode) {
    const key = text + '_' + mode;
    if (!this._eventTextMaterials) this._eventTextMaterials = {};
    if (this._eventTextMaterials[key]) return this._eventTextMaterials[key];

    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = 'italic 900 130px "Barlow Condensed", "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    const colors = this.getModeColor(mode);
    ctx.shadowColor = colors.glow;
    ctx.shadowBlur = 20;

    ctx.fillText(text.toUpperCase(), canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: true,
      depthWrite: false
    });

    this._eventTextMaterials[key] = material;
    return material;
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

  spawnParticles(pos, dir, color = 0x888888, count = 1, isWater = false, isSpark = false) {
    return spawnParticles.call(this, pos, dir, color, count, isWater, isSpark);
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
    return checkBreakablesCollision.call(this, dt);
  }

  handleCrashDamage(carGroup, contactPosWorld, impactSpeed, relativeVelocityVec) {
    return handleCrashDamage.call(this, carGroup, contactPosWorld, impactSpeed, relativeVelocityVec);
  }

  checkSlipstream(dt = 0.016) {
    return checkSlipstream.call(this, dt);
  }

  checkNearMisses(dt) {
    return checkNearMisses.call(this, dt);
  }

  updateDriftNitro(dt) {
    return updateDriftNitro.call(this, dt);
  }

  updateAirNitro(dt) {
    return updateAirNitro.call(this, dt);
  }

  initNotifications() {
    return initNotifications.call(this);
  }

  showNotification(id, text, duration = 2000, increment = false) {
    return showNotification.call(this, id, text, duration, increment);
  }

  removeNotification(id) {
    return removeNotification.call(this, id);
  }

  showStuntNotification(title, scoreText) {
    return showStuntNotification.call(this, title, scoreText);
  }

  initRaceHUD() {
    return initRaceHUD.call(this);
  }

  initHypeSystem() {
    return initHypeSystem.call(this);
  }

  showHype(phrase, comboCount, colorHex) {
    return showHype.call(this, phrase, comboCount, colorHex);
  }

  hideHype() {
    return hideHype.call(this);
  }

  buildAIMeshes() {
    this.clearAIMeshes();
    this.race.aiRacers.forEach(ai => {
      const container = new THREE.Group();
      const { carGroup, wheels } = this.createVoxelCarMesh(ai.colorHex, 'sedan');

      const aiNitroLeftSprite = new THREE.Sprite(this.nitroSpriteMat);
      aiNitroLeftSprite.position.set(-0.6, 0.2, -2.1);
      aiNitroLeftSprite.scale.set(0.001, 0.001, 0.001);
      carGroup.add(aiNitroLeftSprite);
      ai.nitroLeftSprite = aiNitroLeftSprite;

      const aiNitroRightSprite = new THREE.Sprite(this.nitroSpriteMat);
      aiNitroRightSprite.position.set(0.6, 0.2, -2.1);
      aiNitroRightSprite.scale.set(0.001, 0.001, 0.001);
      carGroup.add(aiNitroRightSprite);
      ai.nitroRightSprite = aiNitroRightSprite;

      // Hovering downward indicator cone above AI racer
      const indicatorMat = new THREE.MeshBasicMaterial({
        color: ai.colorHex,
        depthTest: false,
        depthWrite: false,
        transparent: true,
        opacity: 0.6
      });
      const indicatorGeo = new THREE.ConeGeometry(0.35, 0.7, 4);
      indicatorGeo.rotateX(Math.PI); // Point down
      const indicatorMesh = new THREE.Mesh(indicatorGeo, indicatorMat);
      indicatorMesh.position.set(0, 1.9, 0);
      indicatorMesh.renderOrder = 999;
      carGroup.add(indicatorMesh);
      ai.indicatorMesh = indicatorMesh;

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

  startRace(mode, eventX, eventZ, eventData) {
    // Pick a DIFFERENT intersection as the race grid — must be at least 200m from the
    // event the player triggered so the camera always has somewhere to fly to.
    let rx, rz;

    if (eventX !== undefined && eventZ !== undefined) {
      const MIN_DIST = 200; // minimum distance from the event intersection

      // Collect all valid intersections from the world road graph
      const cols = Array.from(this.world.roadColumns);
      const rows = Array.from(this.world.roadRows);
      const candidates = [];
      cols.forEach(cx => {
        rows.forEach(cz => {
          const wx = cx * this.world.tileSize;
          const wz = cz * this.world.tileSize;
          const dist = Math.hypot(wx - eventX, wz - eventZ);
          // Must be far enough from event, and within a reasonable city range (≤800m)
          if (dist >= MIN_DIST && dist <= 800) {
            candidates.push({ x: wx, z: wz, dist });
          }
        });
      });

      if (candidates.length > 0) {
        // Pick a random one from the valid candidates
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        rx = pick.x;
        rz = pick.z;
      } else {
        // Fallback: just offset by ~300m in a random direction
        const angle = Math.random() * Math.PI * 2;
        rx = eventX + Math.cos(angle) * 320;
        rz = eventZ + Math.sin(angle) * 320;
      }
    } else {
      // Called from debug menu — use a grid-snapped random point
      const gridSize = this.world.tileSize * 4;
      rx = (Math.floor(Math.random() * 11) - 5) * gridSize;
      rz = (Math.floor(Math.random() * 11) - 5) * gridSize;
    }

    // Y will be snapped at teleport time when the world chunk is loaded
    const raceStartPos = new THREE.Vector3(rx, 0, rz);

    // Store so the cinematic manager can retrieve it via this.app._raceStartX/Z
    this._raceStartX = rx;
    this._raceStartZ = rz;

    const playerHeading = 0;
    this.race.startRace(mode, this.world, raceStartPos, playerHeading, eventData);
    if (this.pursuit) this.pursuit.cancelPursuit();

    // Set nitro to maximum when starting a race
    if (this.physics) {
      this.physics.nitroLevel = this.physics.maxNitro;
    }

    // Hide stats initially until cinematic finishes
    this.hudStatsEl.style.display = 'none';
    this.cancelBtnEl.style.display = 'none';
    this.statsModeEl.textContent = mode.toUpperCase();

    // Trigger cinematic sequence
    if (this.cinematicManager) {
      this.cinematicManager.start(mode);
    } else {
      this.hudStatsEl.style.display = 'flex';
      this.cancelBtnEl.style.display = 'block';
      this.showBanner("RACE STARTED", "Follow the arrow!");
      this.rebuildCheckpointBeacons();
    }

    // Defer clock flush to avoid a large dt spike on the first frame after race start.
    // NOTE: buildAIMeshes() is now called by CinematicManager mid-flight (at 50% pan_route)
    // so AI cars appear seamlessly at the destination before the camera arrives.
    setTimeout(() => {
      // Only init traffic if cinematic is not running (it manages traffic on complete)
      if (this.traffic && (!this.cinematicManager || this.cinematicManager.state === 'none')) {
        this.traffic.clear();
        this.traffic.maxVehicles = 18;
        this.traffic.init(this.physics.position, this.world);
      }
      this.clock.getDelta(); // flush accumulated time
      this.lastFrameTime = performance.now(); // flush rAF time
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

    // Select new world event
    this.race.selectNewWorldEvent(this.world, this.physics.position);
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

    const cps = this.race.checkpoints;
    const mode = this.race.mode;
    const total = cps.length;

    cps.forEach((cp, index) => {
      // --- Visibility check ---
      let shouldRender = false;
      if (mode === 'unordered') {
        shouldRender = !this.race.unorderedCleared.has(index);
      } else {
        shouldRender = (index === this.race.currentIndex);
      }
      if (!shouldRender) return;

      // --- Ground snap ---
      const h = (this.world && typeof this.world.getGroundHeight === 'function')
        ? this.world.getGroundHeight(cp.x, cp.z)
        : 0.5;

      const cpGroup = new THREE.Group();
      cpGroup.position.set(cp.x, h - 0.4, cp.z);

      // --- Color ---
      const isFinish = (index === total - 1);
      const color = isFinish ? 0xe84545 : this.getModeColor(mode).hex;

      // --- Determine which checkpoint this arrow should point AT ---
      // Arrow sits AT checkpoint[index] and points TOWARD the next target.
      let nextCp = null;
      if (mode !== 'unordered') {
        if (index < total - 1) {
          // Not the last checkpoint — point to checkpoint[index+1]
          nextCp = cps[index + 1];
        } else if (mode === 'circuit' && this.race.lapCurrent < this.race.lapsTotal) {
          // Last checkpoint on a circuit lap that isn't the final lap — loop back to [0]
          nextCp = cps[0];
        }
        // If it IS the final finish line (sprint or last circuit lap), nextCp stays null → no arrow
      }

      // --- Build the arrow only when there is a valid next target ---
      if (nextCp !== null) {
        // Compute the direction vector in WORLD SPACE from this cp to the next cp
        const dx = nextCp.x - cp.x;
        const dz = nextCp.z - cp.z;
        // atan2(x, z) gives the Y-rotation angle in Three.js where +Z is forward
        const yaw = Math.atan2(dx, dz);

        // Use a TWO-LEVEL hierarchy so yaw and pitch never contaminate each other:
        //   yawPivot  → handles only the Y-rotation (horizontal pointing direction)
        //     tiltPivot → handles only the X-rotation (upward tilt for visibility)
        //       arrow geometry (shaft + tip) → local +Z = forward

        const yawPivot = new THREE.Group();
        yawPivot.position.set(0, 3.5, 0); // float above ground inside smoke column
        yawPivot.rotation.y = yaw;        // turn to face next checkpoint

        const tiltPivot = new THREE.Group();
        tiltPivot.rotation.x = -0.32;     // tilt upward for Midnight Club look (applied AFTER yaw)

        const arrowMat = new THREE.MeshStandardMaterial({
          color: 0xffb31a,
          emissive: 0xffb31a,
          emissiveIntensity: 0.7,
          roughness: 0.5,
          metalness: 0.2,
          depthTest: true,
        });

        // Shaft: extends along +Z (forward direction in local space)
        const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 3.2), arrowMat);
        shaft.position.z = 0.8; // centre of shaft offset so tip aligns flush
        shaft.castShadow = true;
        tiltPivot.add(shaft);

        // Tip: a cone whose natural axis is +Y — rotated to point in +Z
        const tipGeo = new THREE.ConeGeometry(1.2, 2.2, 4);
        tipGeo.rotateX(Math.PI / 2); // now points in +Z
        const tip = new THREE.Mesh(tipGeo, arrowMat);
        tip.position.z = 2.8; // sits at the front of the shaft
        tip.castShadow = true;
        tiltPivot.add(tip);

        yawPivot.add(tiltPivot);
        cpGroup.add(yawPivot);
      }

      this.checkpointVisualsGroup.add(cpGroup);
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

  animate(time) {
    const startFrame = performance.now();
    requestAnimationFrame((t) => this.animate(t));

    // Use rAF timestamp for perfect v-sync aligned delta (eliminates wake-up jitter at high refresh rates)
    const currentTime = time !== undefined ? time : performance.now();
    
    if (this.lastCalledTime === undefined) this.lastCalledTime = currentTime;
    const elapsedSinceCall = currentTime - this.lastCalledTime;
    this.lastCalledTime = currentTime;

    const rawDt = elapsedSinceCall / 1000;
    
    if (this.lastFrameTime === undefined) {
      this.lastFrameTime = currentTime;
      this.clock.getDelta(); // flush clock just in case
    }
    this.lastFrameTime = currentTime;

    // Clamp dt to max 50ms (20fps floor). This prevents physics from running
    // in slow-motion after any heavy synchronous work (e.g. mesh creation)
    // that causes the clock to accumulate a large delta in one frame.
    const dt = Math.max(0.001, Math.min(rawDt, 0.05));
    const physicsStep = 1 / 60;
    const maxPhysicsSubsteps = 5;
    if (this.physicsAccumulator === undefined) this.physicsAccumulator = 0;
    if (this.prevPhysicsPosition === undefined) this.prevPhysicsPosition = this.physics.position.clone();
    if (this.prevPhysicsHeading === undefined) this.prevPhysicsHeading = this.physics.heading || 0;
    if (this.renderPhysicsPosition === undefined) this.renderPhysicsPosition = this.physics.position.clone();
    if (this.renderPhysicsHeading === undefined) this.renderPhysicsHeading = this.physics.heading || 0;

    const tPursuitStart = performance.now();

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
    
    // Update Hype System
    if (this.hypeManager) {
      this.hypeManager.update(scaledDt);
    }

    // Update cinematic manager
    if (this.cinematicManager) {
      this.cinematicManager.update(scaledDt);
    }

    // Main Menu Camera Orbit / Swoop Transition
    if (this.inMainMenu) {
      if (this.menuTransitionTime > 0.0) {
        this.menuTransitionTime += dt;
        const t = Math.min(1.0, this.menuTransitionTime / this.menuTransitionDuration);
        const easeT = t * t * (3.0 - 2.0 * t); // smoothstep

        if (!this.menuTransitionStartPos) {
          this.menuTransitionStartPos = this.camera.position.clone();
          const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
          this.menuTransitionStartLookAt = this.menuTransitionStartPos.clone().addScaledVector(dir, 20.0);
        }

        const gameplayCam = this.getTargetGameplayCamera();

        const currentPos = this.menuTransitionStartPos.clone().lerp(gameplayCam.pos, easeT);
        const currentLookAt = this.menuTransitionStartLookAt.clone().lerp(gameplayCam.lookAt, easeT);
        const currentFov = 50 + (gameplayCam.fov - 50) * easeT;

        this.cameraOverride = {
          pos: currentPos,
          lookAt: currentLookAt,
          fov: currentFov
        };

        if (t >= 1.0) {
          this.inMainMenu = false;
          this.cameraOverride = null;
          this.menuTransitionStartPos = null;
          this.menuTransitionStartLookAt = null;
          if (this.hudLayerEl) {
            this.hudLayerEl.style.display = 'flex';
          }
          if (this.debugMenuEnabled && this.racePanelEl) {
            this.racePanelEl.style.display = 'flex';
          }
          this.clock.getDelta(); // flush delta
          this.lastFrameTime = performance.now();
        }
      } else {
        // High angled-down view looking down a street at a 45-degree angle (away from player car)
        const time = Date.now() * 0.0001;

        // Slow linear pan forward along the street
        const panDist = (this.menuCameraBaseOffset - (time % 40)) * this.menuCameraDir;
        const camY = 80;
        const lookY = 0.5;
        let camX = 0, camZ = 0, lookX = 0, lookZ = 0;

        if (this.menuCameraAxis === 'z') {
          camX = 0;
          camZ = panDist;
          lookX = 0;
          lookZ = camZ - 80 * this.menuCameraDir;
        } else {
          camZ = 0;
          camX = panDist;
          lookX = camX - 80 * this.menuCameraDir;
          lookZ = 0;
        }

        this.cameraOverride = {
          pos: new THREE.Vector3(camX, camY, camZ),
          lookAt: new THREE.Vector3(lookX, lookY, lookZ),
          fov: 48
        };
      }
    }

    // Real-time incremental event spawner (stutter-free background spawning and pruning)
    if (!this.inMainMenu && !this.race.active && this.physics.position) {
      if (this.eventSpawnTimer === undefined) this.eventSpawnTimer = 0.0;
      this.eventSpawnTimer += dt;

      if (this.eventSpawnTimer > 0.16) {
        this.eventSpawnTimer = 0.0;
        const px = this.physics.position.x;
        const pz = this.physics.position.z;
        const maxEvents = 90;
        const playerGridX = Math.round(px / this.world.tileSize);
        const playerGridZ = Math.round(pz / this.world.tileSize);

        // 1. Prune events that are too far behind (>1200m)
        if (this.race.worldEvents) {
          this.race.worldEvents = this.race.worldEvents.filter(evt => {
            const dist = Math.hypot(evt.x - px, evt.z - pz);
            return dist <= 1200.0;
          });
        } else {
          this.race.worldEvents = [];
        }

        // 2. Incrementally spawn several new events around the player's current intersection bubble
        if (this.race.worldEvents.length < maxEvents && this.world) {
          const modes = ['sprint', 'circuit'];
          const spawnAttempts = 20;

          for (let i = 0; i < spawnAttempts && this.race.worldEvents.length < maxEvents; i++) {
            const ring = 6 + Math.floor(Math.random() * 20);
            const ox = Math.floor(Math.random() * (ring * 2 + 1)) - ring;
            const oz = Math.floor(Math.random() * (ring * 2 + 1)) - ring;
            if (ox === 0 && oz === 0) continue;

            const nx = playerGridX + ox;
            const nz = playerGridZ + oz;
            const wx = nx * this.world.tileSize;
            const wz = nz * this.world.tileSize;
            const dist = Math.hypot(wx - px, wz - pz);
            const isRoadCell = (
              (this.world.roadColumns && this.world.roadColumns.has(nx)) ||
              (this.world.roadRows && this.world.roadRows.has(nz))
            );

            // Keep events seeded around the player's current intersection bubble, on roads only
            if (isRoadCell && dist >= 120.0 && dist <= 1800.0) {
              const duplicate = this.race.worldEvents.some(evt => evt.x === wx && evt.z === wz);
              if (!duplicate) {
                const mode = ['sprint', 'circuit'][Math.floor(Math.random() * 2)];
                this.race.worldEvents.push({
                  x: wx,
                  z: wz,
                  mode: mode,
                  laps: mode === 'circuit' ? Math.floor(Math.random() * 3) + 2 : 1,
                  checkpoints: Math.floor(Math.random() * 15) + 10,
                  racers: Math.floor(Math.random() * 5) + 3
                });
              }
            }
          }
        }
      }
    }

    // Proximity check and prompt for free-roam event discovery
    let nearEvent = false;
    let closestEvent = null;
    let closestDist = Infinity;
    if (!this.inMainMenu && !this.race.active && this.race.worldEvents && this.race.worldEvents.length > 0) {
      this.race.worldEvents.forEach(evt => {
        const dx = this.physics.position.x - evt.x;
        const dz = this.physics.position.z - evt.z;
        const dist = Math.hypot(dx, dz);

        if (dist < 22.0 && dist < closestDist) {
          closestDist = dist;
          closestEvent = evt;
          nearEvent = true;
        }
      });

      if (nearEvent && closestEvent) {
        if (this.eventPromptEl) {
          if (!this.eventPromptActive) {
            this.eventPromptActive = true;
            // First frame: set to the projected 3D position
            const h = (this.world && typeof this.world.getGroundHeight === 'function')
              ? this.world.getGroundHeight(closestEvent.x, closestEvent.z)
              : 0.5;
            const targetPos = new THREE.Vector3(closestEvent.x, h + 5.0, closestEvent.z);
            targetPos.project(this.camera);

            let startX = window.innerWidth / 2;
            let startY = window.innerHeight / 2;
            if (targetPos.z < 1) {
              startX = (targetPos.x * 0.5 + 0.5) * window.innerWidth;
              startY = (-(targetPos.y * 0.5) + 0.5) * window.innerHeight;
            }

            this.eventPromptEl.style.transition = 'none';
            this.eventPromptEl.style.left = `${startX}px`;
            this.eventPromptEl.style.top = `${startY}px`;
            this.eventPromptEl.classList.remove('docked', 'fade-out');
            this.eventPromptEl.style.display = 'flex';

            // Next frame: transition to HUD position
            setTimeout(() => {
              this.eventPromptEl.style.transition = 'left 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease-out';
              this.eventPromptEl.style.left = '50%';
              this.eventPromptEl.style.top = '72%';
              this.eventPromptEl.classList.add('docked');
            }, 10);
          }

          if (this.eventPromptModeEl) {
            this.eventPromptModeEl.textContent = `${closestEvent.mode.toUpperCase()} EVENT`;
            const cssColor = this.getModeColor(closestEvent.mode).css;
            this.eventPromptModeEl.style.color = '#ffffff'; // Revert text to white
            this.eventPromptEl.style.borderLeftColor = cssColor;
          }
          if (this.eventPromptStatsEl) {
            const lapsText = closestEvent.laps > 1 ? `LAPS: ${closestEvent.laps} • ` : '';
            this.eventPromptStatsEl.textContent = `${lapsText}CHECKPOINTS: ${closestEvent.checkpoints} • OPPONENTS: ${closestEvent.racers}`;
          }
        }

        // Start race on pressing key F
        if (this.keys['f'] || this.keys['keyf']) {
          this.keys['f'] = false; // Consume key press
          this.keys['keyf'] = false;
          if (this.eventPromptEl) this.eventPromptEl.style.display = 'none';
          this.eventPromptActive = false;
          this.startRace(closestEvent.mode, closestEvent.x, closestEvent.z, closestEvent);
        }
      }
    }

    if (!nearEvent && this.eventPromptEl && this.eventPromptEl.style.display !== 'none' && !this.eventPromptEl.classList.contains('fade-out')) {
      this.eventPromptEl.classList.add('fade-out');
      this.eventPromptActive = false;
      setTimeout(() => {
        if (!this.eventPromptActive && this.eventPromptEl) {
          this.eventPromptEl.style.display = 'none';
        }
      }, 500); // Wait for fade-out CSS animation (0.5s) to finish
    }

    let focusTarget = this.physics;

    // If cinematic is active or in main menu, the rendering anchor follows the camera so the world loads
    // smoothly underneath it.
    if (this.inMainMenu || (this.cinematicManager && this.cinematicManager.state !== 'none')) {
      let overrideHeading = this.camHeading || 0;
      let overridePos = this.camera.position;

      if (this.cameraOverride) {
        overridePos = this.cameraOverride.pos;
        const dx = this.cameraOverride.lookAt.x - this.cameraOverride.pos.x;
        const dz = this.cameraOverride.lookAt.z - this.cameraOverride.pos.z;
        overrideHeading = Math.atan2(dx, dz);
      }

      focusTarget = {
        position: overridePos,
        heading: overrideHeading
      };
    } else if (this.debugFocusAI && this.race && this.race.aiRacers) {
      const activeAI = this.race.aiRacers.find(ai => ai.id === this.debugFocusAI);
      if (activeAI) focusTarget = activeAI;
    }

    // Collect dynamic lights for the lighting pool (headlamps from player and traffic)
    const dynamicLights = [];

    // Spawn red smoke columns for active free-roam event beacons
    if (!this._eventSprites) this._eventSprites = [];

    if (!this.race.active && this.race.worldEvents) {
      this.race.worldEvents.forEach(evt => {
        const dx = evt.x - focusTarget.position.x;
        const dz = evt.z - focusTarget.position.z;
        const distSq = dx * dx + dz * dz;

        let spriteObj = this._eventSprites.find(s => s.evt === evt);

        // Render within 260 meters
        if (distSq < 260 * 260) {
          if (Math.random() < 0.55) {
            this.spawnCheckpointSmoke(evt, this.getModeColor(evt.mode).hex, 1.2, 1.2);
          }

          const h = (this.world && typeof this.world.getGroundHeight === 'function')
            ? this.world.getGroundHeight(evt.x, evt.z)
            : 0.5;

          dynamicLights.push({
            x: evt.x,
            y: h + 3.6,
            z: evt.z,
            intensity: 12.0,
            color: this.getModeColor(evt.mode).hex
          });

          if (!spriteObj) {
            const text = evt.mode ? evt.mode + " event" : "event";
            const material = this.getEventTextMaterial(text, evt.mode).clone(); // Clone material so opacity changes don't affect all sprites
            const sprite = new THREE.Sprite(material);
            this.scene.add(sprite);
            spriteObj = { evt, sprite };
            this._eventSprites.push(spriteObj);
          } else if (!spriteObj.sprite.parent) {
            this.scene.add(spriteObj.sprite);
          }

          const dist = Math.sqrt(distSq);
          const scaleFactor = 0.4 + 0.6 * Math.min(1.0, Math.pow(dist / 200.0, 0.7));
          spriteObj.sprite.scale.set(64 * scaleFactor, 8 * scaleFactor, 1);
          spriteObj.sprite.position.set(evt.x, h + 5.0, evt.z);

          // Smooth fade out logic if player drives past the event
          const toEvent = new THREE.Vector3(evt.x - this.camera.position.x, (h + 5.0) - this.camera.position.y, evt.z - this.camera.position.z).normalize();
          const camForward = new THREE.Vector3();
          this.camera.getWorldDirection(camForward);
          const dot = toEvent.dot(camForward);

          // Fade out as dot goes from 0.1 to -0.2 (leaving screen/going behind)
          const angleFade = Math.min(1.0, Math.max(0.0, (dot + 0.2) / 0.3));

          spriteObj.sprite.material.opacity = angleFade;
          spriteObj.sprite.visible = !(nearEvent && closestEvent === evt) && angleFade > 0;

          dynamicLights.push({
            x: evt.x,
            y: h + 3.6,
            z: evt.z,
            intensity: 15.0,
            color: 0xff1e1e
          });
        } else if (spriteObj) {
          spriteObj.sprite.visible = false;
        }
      });
    }

    // Prune sprites whose events no longer exist or race is active
    if (this._eventSprites.length > 0) {
      this._eventSprites = this._eventSprites.filter(spriteObj => {
        const stillExists = this.race.worldEvents && this.race.worldEvents.includes(spriteObj.evt);
        if (!stillExists || this.race.active) {
          if (spriteObj.sprite.parent) this.scene.remove(spriteObj.sprite);
          return false;
        }
        return true;
      });
    }

    // Active checkpoint point lights (routed to PointLight pool to keep scene light count constant)
    if (this.race && this.race.active && this.race.checkpoints) {
      this.race.checkpoints.forEach((cp, index) => {
        let shouldRender = false;
        if (this.race.mode === 'unordered') {
          shouldRender = !this.race.unorderedCleared.has(index);
        } else {
          shouldRender = (index === this.race.currentIndex);
        }

        if (shouldRender) {
          // Always use yellow/amber for checkpoint lighting — looks clean for all race modes
          const CHECKPOINT_LIGHT_COLOR = 0xffb31a;
          const h = (this.world && typeof this.world.getGroundHeight === 'function')
            ? this.world.getGroundHeight(cp.x, cp.z)
            : 0.5;
          dynamicLights.push({
            x: cp.x,
            y: h + 3.6,
            z: cp.z,
            intensity: 12.0,
            color: CHECKPOINT_LIGHT_COLOR
          });
        }
      });
    }

    // Player headlights (optimized, zero-alloc)
    _scratchV3_1.set(Math.sin(this.physics.heading), 0, Math.cos(this.physics.heading)); // playerForward
    _scratchV3_2.set(Math.cos(this.physics.heading), 0, -Math.sin(this.physics.heading)); // playerRight
    const pPos = this.physics.position;

    _scratchV3_3.copy(pPos).addScaledVector(_scratchV3_1, 2.35).addScaledVector(_scratchV3_2, -0.65); // pHeadL
    this.leftSpotTarget.position.copy(_scratchV3_3).addScaledVector(_scratchV3_1, 15.0);

    _scratchV3_3.copy(pPos).addScaledVector(_scratchV3_1, 2.35).addScaledVector(_scratchV3_2, 0.65); // pHeadR
    this.rightSpotTarget.position.copy(_scratchV3_3).addScaledVector(_scratchV3_1, 15.0);

    // Update rear tail/brake light glow intensity dynamically (single point light for performance)
    const isBraking = this.keys['s'] || this.keys['arrowdown'];

    if (isBraking) {
      this.tailLight.intensity = 5.5; // Bright red brake light
      this.playerTaillightMat.color.setHex(0xff3333);
    } else {
      this.tailLight.intensity = 1.2; // Standard running taillight
      this.playerTaillightMat.color.setHex(0xaa1111);
    }

    // Reverse lights toggle
    const isReversing = this.physics.gear === 'R';
    if (isReversing) {
      this.reverseLightPoint.intensity = 3.0;
      this.reverseLightL.visible = true;
      this.reverseLightR.visible = true;
    } else {
      this.reverseLightPoint.intensity = 0.0;
      this.reverseLightL.visible = false;
      this.reverseLightR.visible = false;
    }

    // Traffic headlights (optimized, distance-gated, zero-alloc)
    this.traffic.vehicles.forEach(v => {
      const dist = v.position.distanceTo(focusTarget.position);
      if (dist > 130.0) return; // Distance gate

      _scratchV3_1.set(Math.sin(v.heading), 0, Math.cos(v.heading)); // tForward
      _scratchV3_2.copy(v.position).addScaledVector(_scratchV3_1, 3.5); // headlampPos

      // Directional gating: headlights should only shine forward relative to camera/player view
      _scratchV3_3.copy(this.camera.position).sub(_scratchV3_2).normalize();
      const dot = _scratchV3_1.dot(_scratchV3_3);
      const dirFactor = Math.pow(Math.max(0.0, dot), 2.5);
      if (dirFactor <= 0.01) return;

      dynamicLights.push({
        x: _scratchV3_2.x,
        y: 0.4,
        z: _scratchV3_2.z,
        intensity: 8.5 * (v.opacity !== undefined ? v.opacity : 1.0) * dirFactor,
        color: 0xfffcd4
      });
    });

    // AI Racers headlights and nitro glows (optimized, distance-gated, zero-alloc)
    if (this.race && this.race.active && this.race.aiRacers) {
      this.race.aiRacers.forEach(ai => {
        if (ai.meshGroup) {
          const dist = ai.position.distanceTo(focusTarget.position);

          // Keep things optimized: update state but only spawn visual effects if within 130m
          if (ai._wasAirborne === undefined) ai._wasAirborne = ai.isAirborne;
          if (dist <= 130.0) {
            // Check for landing
            if (ai._wasAirborne && !ai.isAirborne) {
              const contactPos = ai.position.clone();
              contactPos.y += 0.1;
              const impact = Math.max(2.5, Math.abs(ai.velocityY || 0));

              // Regular landing smoke
              const count = Math.min(25, Math.floor(impact * 2.0) + 8);
              this.spawnParticles(contactPos, new THREE.Vector3(0, 1.5, 0), 0xaaaaaa, count);

              // Bright landing sparks
              const sparkCount = Math.min(30, Math.floor(impact * 3.0) + 12);
              this.spawnParticles(contactPos, new THREE.Vector3(0, 3, 0), 0xffee88, sparkCount, false, true);

              // Camera shake if close to player
              const shakeDist = ai.position.distanceTo(this.physics.position);
              if (shakeDist < 75.0) {
                const falloff = 1.0 - (shakeDist / 75.0);
                const shakeFactor = Math.min(0.6, impact * 0.045) * falloff;
                this.crashShake = Math.max(this.crashShake || 0, shakeFactor);
              }
            }

            // Check for wall crash
            if (ai.justCrashed) {
              const contactPos = ai.position.clone();
              const relSpeed = ai.lastWallImpactSpeed || 10.0;
              const pushDir = ai.lastWallImpactNormal || new THREE.Vector3(0, 0, 1);
              
              this.spawnParticles(contactPos, pushDir, 0xffe6a8, 12, false, true);
              this.spawnDebris(contactPos, pushDir, ai.colorHex, Math.min(5, Math.floor(relSpeed * 0.3)));

              // Camera shake if close to player
              const shakeDist = ai.position.distanceTo(this.physics.position);
              if (shakeDist < 60.0) {
                const falloff = 1.0 - (shakeDist / 60.0);
                const shakeFactor = Math.min(0.6, relSpeed * 0.02) * falloff;
                this.crashShake = Math.max(this.crashShake || 0, shakeFactor);
              }
              ai.justCrashed = false;
            }
          } else {
            ai.justCrashed = false; // consume it even if too far
          }
          ai._wasAirborne = ai.isAirborne;

          if (dist > 130.0) return; // Distance gate

          // AI Headlights
          _scratchV3_1.set(Math.sin(ai.heading), 0, Math.cos(ai.heading)); // aiForward
          _scratchV3_2.copy(ai.position).addScaledVector(_scratchV3_1, 3.5); // headlampPos

          // Directional gating: headlights should only shine forward relative to camera/player view
          _scratchV3_3.copy(this.camera.position).sub(_scratchV3_2).normalize();
          const dot = _scratchV3_1.dot(_scratchV3_3);
          const dirFactor = Math.pow(Math.max(0.0, dot), 2.5);
          if (dirFactor > 0.01) {
            dynamicLights.push({
              x: _scratchV3_2.x,
              y: 0.4,
              z: _scratchV3_2.z,
              intensity: 8.5 * dirFactor,
              color: 0xfffcd4
            });
          }

          // AI Nitro Glow
          if (ai.isBoosting) {
            _scratchV3_2.set(0, 0.3, -2.15).applyMatrix4(ai.meshGroup.matrixWorld);
            dynamicLights.push({
              x: _scratchV3_2.x,
              y: _scratchV3_2.y,
              z: _scratchV3_2.z,
              intensity: 6.0 + Math.random() * 2.0,
              color: 0x00f0ff
            });
          }
        }
      });
    }

    // Update police pursuit manager
    if (!this.inMainMenu && this.pursuit && (!this.cinematicManager || this.cinematicManager.state === 'none')) {
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
          const dist = cop.position.distanceTo(focusTarget.position);

          // Keep things optimized: update state but only spawn visual effects if within 130m
          if (cop._wasAirborne === undefined) cop._wasAirborne = cop.isAirborne;
          if (dist <= 130.0) {
            // Check for landing
            if (cop._wasAirborne && !cop.isAirborne) {
              const contactPos = cop.position.clone();
              contactPos.y += 0.1;
              const impact = Math.max(2.5, Math.abs(cop.velocityY || 0));

              // Regular landing smoke
              const count = Math.min(25, Math.floor(impact * 2.0) + 8);
              this.spawnParticles(contactPos, new THREE.Vector3(0, 1.5, 0), 0xaaaaaa, count);

              // Bright landing sparks
              const sparkCount = Math.min(30, Math.floor(impact * 3.0) + 12);
              this.spawnParticles(contactPos, new THREE.Vector3(0, 3, 0), 0xffee88, sparkCount, false, true);

              // Camera shake if close to player
              const shakeDist = cop.position.distanceTo(this.physics.position);
              if (shakeDist < 75.0) {
                const falloff = 1.0 - (shakeDist / 75.0);
                const shakeFactor = Math.min(0.6, impact * 0.045) * falloff;
                this.crashShake = Math.max(this.crashShake || 0, shakeFactor);
              }
            }

            // Check for wall crash
            if (cop.justCrashed) {
              const contactPos = cop.position.clone();
              const relSpeed = cop.lastWallImpactSpeed || 10.0;
              const pushDir = cop.lastWallImpactNormal || new THREE.Vector3(0, 0, 1);
              
              this.spawnParticles(contactPos, pushDir, 0xffe6a8, 12, false, true);
              this.spawnDebris(contactPos, pushDir, 0x111111, Math.min(5, Math.floor(relSpeed * 0.3)));

              // Camera shake if close to player
              const shakeDist = cop.position.distanceTo(this.physics.position);
              if (shakeDist < 60.0) {
                const falloff = 1.0 - (shakeDist / 60.0);
                const shakeFactor = Math.min(0.6, relSpeed * 0.02) * falloff;
                this.crashShake = Math.max(this.crashShake || 0, shakeFactor);
              }
              cop.justCrashed = false;
            }
          } else {
            cop.justCrashed = false; // consume it even if too far
          }
          cop._wasAirborne = cop.isAirborne;

          this.updateVehicleLOD(cop, dist, cop.opacity);

          const headlightPool = cop.meshGroup.getObjectByName("headlightPool");
          if (headlightPool) {
            headlightPool.material.opacity = 0.35 * cop.opacity;
          }

          if (!cop._lastLOD) {
            this.updateHeadlightFlares(cop.meshGroup, cop.heading);
            this.deformHeadlightPoolToTerrain(cop.meshGroup);
          }

          // Headlights and sirens (optimized, distance-gated, zero-alloc)
          if (dist <= 130.0) {
            _scratchV3_1.set(Math.sin(cop.heading), 0, Math.cos(cop.heading)); // copForward
            _scratchV3_2.copy(cop.position).addScaledVector(_scratchV3_1, 2.3); // headPos

            // Directional gating: headlights should only shine forward relative to camera/player view
            _scratchV3_3.copy(this.camera.position).sub(_scratchV3_2).normalize();
            const dot = _scratchV3_1.dot(_scratchV3_3);
            const dirFactor = Math.pow(Math.max(0.0, dot), 2.5);

            if (dirFactor > 0.01) {
              dynamicLights.push({
                x: _scratchV3_2.x,
                y: 0.4,
                z: _scratchV3_2.z,
                intensity: 8.0 * cop.opacity * dirFactor,
                color: 0xfffcd4
              });
            }

            dynamicLights.push({
              x: cop.position.x,
              y: 1.6,
              z: cop.position.z,
              intensity: 15.0 * cop.opacity,
              color: cop.sirenState ? 0xff0022 : 0x0022ff
            });
          }

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
          const dist = cop.position.distanceTo(focusTarget.position);
          this.updateVehicleLOD(cop, dist, cop.opacity);

          const headlightPool = cop.meshGroup.getObjectByName("headlightPool");
          if (headlightPool) {
            headlightPool.material.opacity = 0.35 * cop.opacity;
          }

          if (!cop._lastLOD) {
            this.updateHeadlightFlares(cop.meshGroup, cop.heading);
            this.deformHeadlightPoolToTerrain(cop.meshGroup);
          }

          // Headlights and sirens (optimized, distance-gated, zero-alloc)
          if (dist <= 130.0) {
            _scratchV3_1.set(Math.sin(cop.heading), 0, Math.cos(cop.heading)); // copForward
            _scratchV3_2.copy(cop.position).addScaledVector(_scratchV3_1, 2.3); // headPos

            // Directional gating: headlights should only shine forward relative to camera/player view
            _scratchV3_3.copy(this.camera.position).sub(_scratchV3_2).normalize();
            const dot = _scratchV3_1.dot(_scratchV3_3);
            const dirFactor = Math.pow(Math.max(0.0, dot), 2.5);

            if (dirFactor > 0.01) {
              dynamicLights.push({
                x: _scratchV3_2.x,
                y: 0.4,
                z: _scratchV3_2.z,
                intensity: 8.0 * cop.opacity * dirFactor,
                color: 0xfffcd4
              });
            }

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
        }
      });

      // Roadblock cop headlights, sirens, and flares (optimized, zero-alloc)
      if (this.pursuit.roadblocks) {
        this.pursuit.roadblocks.forEach(rb => {
          if (rb.meshGroup) {
            rb.meshGroup.traverse(child => {
              if (child.isGroup && child.getObjectByName("leftHeadlightSprite")) {
                child.getWorldQuaternion(_scratchQuat);
                _scratchEuler.setFromQuaternion(_scratchQuat, 'YXZ');
                const copHeading = _scratchEuler.y;

                this.updateHeadlightFlares(child, copHeading);

                child.getWorldPosition(_scratchV3_3); // copWorldPos

                const dist = _scratchV3_3.distanceTo(focusTarget.position);
                let lightIntensityScale = 1.0;
                if (dist > 120.0) {
                  lightIntensityScale = 0.0;
                } else if (dist > 80.0) {
                  const t = (dist - 80.0) / 40.0;
                  const smoothT = t * t * (3.0 - 2.0 * t);
                  lightIntensityScale = 1.0 - smoothT;
                }

                if (lightIntensityScale > 0.0) {
                  _scratchV3_1.set(Math.sin(copHeading), 0, Math.cos(copHeading)); // copForward
                  _scratchV3_2.copy(_scratchV3_3).addScaledVector(_scratchV3_1, 2.3); // headPos

                  // Directional gating: headlights should only shine forward relative to camera/player view
                  _scratchV3_4.copy(this.camera.position).sub(_scratchV3_2).normalize();
                  const dot = _scratchV3_1.dot(_scratchV3_4);
                  const dirFactor = Math.pow(Math.max(0.0, dot), 2.5);

                  // Headlights
                  if (dirFactor > 0.01) {
                    dynamicLights.push({
                      x: _scratchV3_2.x,
                      y: 0.4,
                      z: _scratchV3_2.z,
                      intensity: 8.0 * lightIntensityScale * dirFactor,
                      color: 0xfffcd4
                    });
                  }

                  // Sirens (pulsing blue/red)
                  const flashState = (Math.floor(Date.now() / 250) % 2 === 0);
                  dynamicLights.push({
                    x: _scratchV3_3.x,
                    y: 1.6,
                    z: _scratchV3_3.z,
                    intensity: 15.0 * lightIntensityScale,
                    color: flashState ? 0xff0022 : 0x0022ff
                  });
                }
              }
            });
          }
        });
      }
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

    this.perf.pursuit = performance.now() - tPursuitStart;

    // Dynamically load/unload infinite chunks around the car and update lights
    const tWorldStart = performance.now();
    const isLookingBack = this.keys && this.keys['b'];
    const activeWorldHeading = isLookingBack ? focusTarget.heading + Math.PI : focusTarget.heading;
    this.world.update(focusTarget.position.x, focusTarget.position.z, activeWorldHeading, dynamicLights, scaledDt, this.camera ? this.camera.position : null);
    this.perf.world = performance.now() - tWorldStart;

    if (this.isInitialLoad) {
      // 144 target tiles covers roughly a 12x12 area initially loading around the player
      const targetTiles = 140;
      const loaded = this.world.loadedTiles.size;
      const progress = Math.min(100, Math.floor((loaded / targetTiles) * 100));

      const bar = document.getElementById('loading-bar');
      if (bar) bar.style.width = `${progress}%`;

      if (loaded >= targetTiles || progress === 100) {
        this.isInitialLoad = false;
        const loader = document.getElementById('loading-screen');
        if (loader) {
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.style.display = 'none';
          }, 1000);
        }
      }
    }

    // Maintain global gameTime for traffic lights synchronization
    if (window.gameTime === undefined) window.gameTime = 0;
    window.gameTime += scaledDt;

    // Update physics
    const tPhysicsStart = performance.now();
    this.physicsAccumulator += scaledDt;
    let physicsSteps = 0;
    const isCinematic = this.cinematicManager && this.cinematicManager.state !== 'none';
    while (this.physicsAccumulator >= physicsStep && physicsSteps < maxPhysicsSubsteps) {
      this.prevPhysicsPosition.copy(this.physics.position);
      this.prevPhysicsHeading = this.physics.heading || 0;
      if (this.inMainMenu || isCinematic) {
        this.physics.speed = 0;
        this.physics.velocity.set(0, 0, 0);
        this.physics.angularVelocity = 0;
      } else {
        const activeKeys = this.inFeedbackMenu ? {} : this.keys;
        this.physics.update(physicsStep, activeKeys, this.world);
      }
      this.physicsAccumulator -= physicsStep;
      physicsSteps++;
    }
    if (physicsSteps === maxPhysicsSubsteps) {
      this.physicsAccumulator = Math.min(this.physicsAccumulator, physicsStep);
    }

    const physicsAlpha = Math.min(1, this.physicsAccumulator / physicsStep);
    this.renderPhysicsPosition.copy(this.prevPhysicsPosition).lerp(this.physics.position, physicsAlpha);
    const currentHeading = this.physics.heading || 0;
    let headingDelta = currentHeading - this.prevPhysicsHeading;
    if (headingDelta > Math.PI) headingDelta -= Math.PI * 2;
    if (headingDelta < -Math.PI) headingDelta += Math.PI * 2;
    this.renderPhysicsHeading = this.prevPhysicsHeading + headingDelta * physicsAlpha;

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
    this.perf.physics = performance.now() - tPhysicsStart;

    const tTrafficStart = performance.now();
    const tTrafficUpdateStart = performance.now();
    // Update civilian traffic (dynamically adjust density based on player speed)
    if (this.traffic) {
      const playerSpeed = this.physics.velocity.length();
      const baseMax = this.race.active ? 16 : 30;
      let densityScale = 1.0;
      if (playerSpeed > 25.0) {
        // At speed <= 25 m/s, keep 100% density. At higher speeds, reduce to 70% density.
        densityScale = Math.max(0.70, 1.0 - (playerSpeed - 25.0) / 100.0);
      }
      this.traffic.dynamicActiveMax = Math.round(baseMax * densityScale);
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
    this.perf.trafficUpdate = performance.now() - tTrafficUpdateStart;

    const tTrafficMeshStart = performance.now();

    if (!this._fauxTraffic) this._fauxTraffic = [];
    const fauxVehicles = [];
    if (this.traffic && this.traffic.sharedBuffer) {
      for (let i = 0; i < this.traffic.maxVehicles; i++) {
        const offset = i * 16;
        if (this.traffic.sharedBuffer[offset] === -1) {
          if (this._fauxTraffic[i] && this._fauxTraffic[i].meshGroup) {
            this._fauxTraffic[i].meshGroup.traverse(child => { if (child.material) child.material.dispose(); });
            this.scene.remove(this._fauxTraffic[i].meshGroup);
            this._fauxTraffic[i].meshGroup = null;
          }
          continue;
        }

        let v = this._fauxTraffic[i];
        if (!v) v = this._fauxTraffic[i] = { id: i, position: new THREE.Vector3(), impactVelocity: new THREE.Vector3() };

        v.type = this.traffic.sharedBuffer[offset + 1] === 0 ? 'cab' : (this.traffic.sharedBuffer[offset + 1] === 1 ? 'sedan' : 'suv');
        v.colorHex = this.traffic.sharedBuffer[offset + 2];
        v.position.set(this.traffic.sharedBuffer[offset + 3], this.traffic.sharedBuffer[offset + 4], this.traffic.sharedBuffer[offset + 5]);
        v.heading = this.traffic.sharedBuffer[offset + 6];
        v.pitch = this.traffic.sharedBuffer[offset + 7];
        v.roll = this.traffic.sharedBuffer[offset + 8];
        v.opacity = this.traffic.sharedBuffer[offset + 9];
        v.speed = this.traffic.sharedBuffer[offset + 10];

        const isSkidding = this.traffic.sharedBuffer[offset + 11] === 1.0;
        if (isSkidding) {
          v.impactVelocity.set(-this.traffic.sharedBuffer[offset + 12] * 4, 0, -this.traffic.sharedBuffer[offset + 13] * 4);
        } else {
          v.impactVelocity.set(0, 0, 0);
        }
        fauxVehicles.push(v);
      }
    }

    fauxVehicles.forEach(v => {
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

      const isTeleport = v.meshGroup.position.distanceToSquared(v.position) > 100.0;
      v.meshGroup.position.copy(v.position);

      const dist = v.position.distanceTo(focusTarget.position);

      // Throttling distant vehicles to 1 update every 3 frames to boost performance
      if (!v._frameCounter) v._frameCounter = 0;
      v._frameCounter++;
      const isDistant = dist > 90.0;
      const shouldUpdateThisFrame = !isDistant || isTeleport || (v._frameCounter % 3 === 0);

      if (shouldUpdateThisFrame) {
        this.world.alignMeshToTerrain(v.meshGroup, v.position, v.heading, v.isAirborne, isTeleport ? 999.0 : scaledDt);
        if (v.roll || v.pitch) {
          _scratchQuat.setFromAxisAngle(_scratchV3_1.set(0, 0, 1), v.roll || 0); // rollQ
          _scratchQuat2.setFromAxisAngle(_scratchV3_2.set(1, 0, 0), v.pitch || 0); // pitchQ
          v.meshGroup.quaternion.multiply(_scratchQuat).multiply(_scratchQuat2);
        }

        const targetOpacity = v.opacity !== undefined ? v.opacity : 1.0;
        this.updateVehicleLOD(v, dist, targetOpacity);

        if (!v._lastLOD) {
          // Update traffic headlight lens flares
          this.updateHeadlightFlares(v.meshGroup, v.heading);
          this.deformHeadlightPoolToTerrain(v.meshGroup);
        }
      }

      // Update baked headlight pool based on distance to player/focusTarget
      const headlightPool = v.meshGroup.getObjectByName("headlightPool");
      if (headlightPool) {
        headlightPool.material.opacity = 0.35 * (v.opacity !== undefined ? v.opacity : 1.0);
      }

      // Animate civilian wheels rolling
      if (shouldUpdateThisFrame) {
        const tRot = (v.speed / 0.42) * scaledDt;
        v.wheels.forEach(w => {
          w.children[0].rotation.x += tRot;
          w.children[1].rotation.x += tRot;
        });
      }

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
    if (!this._fauxParked) this._fauxParked = [];
    const fauxParked = [];
    if (this.traffic && this.traffic.sharedBuffer) {
      for (let i = 0; i < this.traffic.maxParkedVehicles; i++) {
        const offset = (this.traffic.maxVehicles + i) * 16;
        if (this.traffic.sharedBuffer[offset] === -1) {
          if (this._fauxParked[i] && this._fauxParked[i].meshGroup) {
            this._fauxParked[i].meshGroup.traverse(child => { if (child.material) child.material.dispose(); });
            this.scene.remove(this._fauxParked[i].meshGroup);
            this._fauxParked[i].meshGroup = null;
          }
          continue;
        }

        let v = this._fauxParked[i];
        if (!v) v = this._fauxParked[i] = { id: i, position: new THREE.Vector3(), impactVelocity: new THREE.Vector3() };

        v.type = this.traffic.sharedBuffer[offset + 1] === 0 ? 'cab' : (this.traffic.sharedBuffer[offset + 1] === 1 ? 'sedan' : 'suv');
        v.colorHex = this.traffic.sharedBuffer[offset + 2];
        v.position.set(this.traffic.sharedBuffer[offset + 3], this.traffic.sharedBuffer[offset + 4], this.traffic.sharedBuffer[offset + 5]);
        v.heading = this.traffic.sharedBuffer[offset + 6];
        v.pitch = this.traffic.sharedBuffer[offset + 7];
        v.roll = this.traffic.sharedBuffer[offset + 8];
        v.opacity = this.traffic.sharedBuffer[offset + 9];
        v.speed = this.traffic.sharedBuffer[offset + 10];

        const isSkidding = this.traffic.sharedBuffer[offset + 11] === 1.0;
        if (isSkidding) {
          v.impactVelocity.set(-this.traffic.sharedBuffer[offset + 12] * 4, 0, -this.traffic.sharedBuffer[offset + 13] * 4);
        } else {
          v.impactVelocity.set(0, 0, 0);
        }
        fauxParked.push(v);
      }
    }

    if (fauxParked.length > 0) {
      fauxParked.forEach(v => {
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

        const dist = v.position.distanceTo(focusTarget.position);
        const targetOpacity = v.opacity !== undefined ? v.opacity : 1.0;
        this.updateVehicleLOD(v, dist, targetOpacity);

        const isTeleport = v.meshGroup.position.distanceToSquared(v.position) > 100.0;
        const hasMovedSq = v.meshGroup.position.distanceToSquared(v.position);
        const needsAlignment = hasMovedSq > 0.001 || !v._aligned || v.impactVelocity.lengthSq() > 0.1;

        if (needsAlignment) {
          v.meshGroup.position.copy(v.position);
          this.world.alignMeshToTerrain(v.meshGroup, v.position, v.heading, v.isAirborne, isTeleport ? 999.0 : scaledDt);
          if (v.roll || v.pitch) {
            const rollQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), v.roll || 0);
            const pitchQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), v.pitch || 0);
            v.meshGroup.quaternion.multiply(rollQ).multiply(pitchQ);
          }
          v.meshGroup.updateMatrixWorld(true);
          v._aligned = true;
        }

        const headlightPool = v.meshGroup.getObjectByName("headlightPool");
        if (headlightPool) {
          headlightPool.material.opacity = 0.0;
        }

        // Parked cars don't roll wheels or make water splash unless moving from impact
        const isParkedSkidding = v.impactVelocity.lengthSq() > 0.1;
        if (isParkedSkidding) {
          const vSpeed = v.impactVelocity.length();
          const tRot = (vSpeed / 0.42) * scaledDt;
          if (!v._lastLOD) {
            v.wheels.forEach(w => {
              w.children[0].rotation.x += tRot;
              w.children[1].rotation.x += tRot;
            });
          }

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
    this.perf.trafficMesh = performance.now() - tTrafficMeshStart;

    const tCollisionsStart = performance.now();
    // Combined Collision Checks for active & parked civilian vehicles
    const allCivilians = this.traffic.vehicles.concat(this.traffic.parkedVehicles || []);
    allCivilians.forEach(v => {
      if (v.opacity < 0.1 || v.isActive === false) return;
      // Collision Check: Player vs Traffic
      const distToPlayer = this.physics.position.distanceTo(v.position);
      const obb = (distToPlayer < 8.5) ? testOBBCollision(this.physics, v) : { collision: false };
      if (obb.collision) {
        if (this.physics.speed > 16.0 && this.pursuit) {
          this.pursuit.triggerPursuit(1);
        }
        const pushDir = obb.pushDir;
        const overlap = obb.overlap;
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
          const restitution = 0.65; // partially elastic crash
          const m1 = 1350;
          const m2 = 1100;

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
        this.spawnParticles(contactPos, pushDir, 0xffe6a8, 16, false, true);

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
          const obb = (distToAI < 8.5) ? testOBBCollision(ai, v) : { collision: false };
          if (obb.collision) {
            const pushDir = obb.pushDir;
            const overlap = obb.overlap;
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
              const restitution = 0.65;
              const m1 = 1350; // AI mass
              const m2 = 1100; // Traffic mass
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
            this.spawnParticles(contactPos, pushDir, 0xffe6a8, 8, false, true);

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
        const obb = (dist < 8.5) ? testOBBCollision(v1, v2) : { collision: false };
        if (obb.collision) {
          const pushDir = obb.pushDir;
          const overlap = obb.overlap;
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
          this.spawnParticles(contactPos, pushDir, 0xffe6a8, 8, false, true);

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
        const obb = (distToPlayer < 6.0) ? testOBBCollision(this.physics, cop) : { collision: false };
        if (obb.collision) {
          const pushDir = obb.pushDir;
          const overlap = obb.overlap;
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

            // Cop Takedown! If player rams cop hard enough (high impulse)
            const pSpeed = this.physics.velocity.length();
            if (impulseScalar > 32000 && pSpeed > 18.0) {
              cop.active = false;
              this.spawnDebris(cop.position, new THREE.Vector3(0, 5, 0), 0xdd2222, 25);
              this.spawnParticles(cop.position, new THREE.Vector3(0, 3, 0), 0xff8800, 30, false, true);
              this.showNotification('cop_takedown', "COP TAKEDOWN!", 2000, true);
              // if (this.hypeManager) this.hypeManager.addStunt('cop');
              
              // Make the cop car look wrecked (spin/flip it visually)
              if (cop.meshGroup) {
                cop.meshGroup.position.y += 0.3;
                cop.meshGroup.rotation.z = 0.8; // Flip on side
                cop.meshGroup.rotation.x = 0.3;
              }
            }

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
          this.spawnParticles(contactPos, pushDir, 0xffe6a8, 16, false, true);

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
            const obb = (distToAI < 6.0) ? testOBBCollision(ai, cop) : { collision: false };
            if (obb.collision) {
              const pushDir = obb.pushDir;
              const overlap = obb.overlap;
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
              this.spawnParticles(contactPos, pushDir, 0xffe6a8, 12, false, true);

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
            const obb = (distToTraffic < 6.0) ? testOBBCollision(v, cop) : { collision: false };
            if (obb.collision) {
              const pushDir = obb.pushDir;
              const overlap = obb.overlap;
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
                this.spawnParticles(contactPos, pushDir, 0xffe6a8, 10, false, true);

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
          const obb = (dist < 6.0) ? testOBBCollision(cop1, cop2) : { collision: false };
          if (obb.collision) {
            const pushDir = obb.pushDir;
            const overlap = obb.overlap;
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
            this.spawnParticles(contactPos, pushDir, 0xffe6a8, 8, false, true);

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
    this.perf.collisions = performance.now() - tCollisionsStart;

    const isCinematicActive = this.cinematicManager && this.cinematicManager.state !== 'none';

    const tPlayerVisualsStart = performance.now();
    if (isCinematicActive) {
      // During cinematic: lock visual car with correct quaternion.
      // Must use quaternion directly — alignMeshToTerrain uses mesh.quaternion.slerp()
      // which overwrites rotation.set(). Setting quaternion directly wins.
      this.carVisualContainer.position.copy(this.physics.position);
      _scratchQuat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.physics.heading);
      this.carVisualContainer.quaternion.copy(_scratchQuat);
      this.carVisualContainer.updateMatrixWorld(true);
    } else {
      // Normal gameplay: full terrain-aligned update
      this.carVisualContainer.position.copy(this.renderPhysicsPosition);
      this.world.alignMeshToTerrain(
        this.carVisualContainer,
        this.renderPhysicsPosition,
        this.renderPhysicsHeading,
        (this.physics.isAirborne && this.physics.airTime > 0.2) || this.physics.rolloverTimer > 0,
        scaledDt
      );
      this.carVisualContainer.updateMatrixWorld(true);
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
      this.spawnParticles(contactPos, sparkDir, 0xffaa00, 3, false, true);
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

    if (this.physics.isDrifting || this.physics.isBurnout || this.physics.brakeLockup) {
      // For burnouts, velocity might be near 0, so calculate exact backward direction from heading
      const backDir = new THREE.Vector3(-Math.sin(this.physics.heading), 0.2, -Math.cos(this.physics.heading)).normalize();
      const particleDir = this.physics.isBurnout ? backDir : this.physics.velocity.clone().negate().normalize();
      const smokeCount = this.physics.isBurnout ? 4 : 2; // Thicker smoke for burnout

      if (!leftWet) this.spawnParticles(leftRear, particleDir, 0xaaaaaa, smokeCount);
      if (!rightWet) this.spawnParticles(rightRear, particleDir, 0xaaaaaa, smokeCount);
      if (this.driftStatusEl) {
        this.driftStatusEl.innerText = "DRIFTING";
        this.driftStatusEl.classList.add('active');
      }
    } else {
      if (this.driftStatusEl) {
        this.driftStatusEl.classList.remove('active');
      }

      // Idle exhaust smoke
      if (Math.random() < 0.15) {
        const exhaust = new THREE.Vector3(0.6, 0.2, -2.1).applyMatrix4(this.carVisualContainer.matrixWorld);
        const backDir = new THREE.Vector3(-Math.sin(this.physics.heading), 0.2, -Math.cos(this.physics.heading));
        this.spawnParticles(exhaust, backDir, 0x777777, 1);
      }
    }

    // Update player Nitro visual effects (sprite flare + PointLight)
    if (this.physics.isBoosting) {
      const scaleVal = 1.3 + Math.random() * 0.45;
      this.nitroLeftSprite.scale.set(scaleVal, scaleVal, scaleVal);
      this.nitroRightSprite.scale.set(scaleVal, scaleVal, scaleVal);
      this.nitroLight.intensity = 6.0 + Math.random() * 2.0;
    } else {
      this.nitroLeftSprite.scale.set(0.001, 0.001, 0.001);
      this.nitroRightSprite.scale.set(0.001, 0.001, 0.001);
      this.nitroLight.intensity = 0.0;
    }

    // Spawn player tire skid marks on drift, hard brake, burnout, or ABS lockup
    const isSkidding = this.physics.isDrifting || this.physics.isBurnout || this.physics.brakeLockup || (isBraking && playerSpeedMag > 4.0);
    
    if (this.physics.isDrifting) {
      this.driftDuration += scaledDt;
      if (this.hypeManager) this.hypeManager.driftTime = this.driftDuration;
    } else {
      if (this.driftDuration > 0.5) {
        if (this.hypeManager) this.hypeManager.addStunt('drift', this.driftDuration);
      }
      this.driftDuration = 0;
      if (this.hypeManager) this.hypeManager.driftTime = 0;
    }

    if (isSkidding) {
      if (this.prevLeftWheel) this.spawnSkidmarkSegment(this.prevLeftWheel, leftRear);
      if (this.prevRightWheel) this.spawnSkidmarkSegment(this.prevRightWheel, rightRear);
    }

    // Always track previous wheel position to ensure the first skid frame perfectly connects to the tire!
    this.prevLeftWheel = leftRear.clone();
    this.prevRightWheel = rightRear.clone();
    this.perf.playerVisuals = performance.now() - tPlayerVisualsStart;
    this.perf.traffic = performance.now() - tTrafficStart;

    const tRaceStart = performance.now();
    // UPDATE RACE SYSTEM — skip entirely during cinematic to prevent AI A* from overwriting headings
    if (this.race.active && !isCinematicActive) {
      this.race.playerVelocity = this.physics.velocity;
      const raceResult = this.race.update(this.physics.position, scaledDt, this.world, this.traffic, this.pursuit);

      // Collision Check: Player vs AI Opponents
      this.race.aiRacers.forEach(ai => {
        const dist = this.physics.position.distanceTo(ai.position);
        const obb = (dist < 6.0) ? testOBBCollision(this.physics, ai) : { collision: false };
        if (obb.collision) {
          const pushDir = obb.pushDir;
          const overlap = obb.overlap;
          this.physics.position.addScaledVector(pushDir, overlap * 0.5);
          ai.position.addScaledVector(pushDir, -overlap * 0.5);

          const v1 = this.physics.velocity;
          const v2 = ai.velocity;
          const relativeVel = v1.clone().sub(v2);
          const velAlongNormal = relativeVel.dot(pushDir);

          if (velAlongNormal < 0) {
            const restitution = 0.55;
            const m1 = 1350;
            const m2 = 900; // AI (physically lighter)
            const impulseScalar = -(1.0 + restitution) * velAlongNormal / (1.0 / m1 + 1.0 / m2);
            const impulseVec = pushDir.clone().multiplyScalar(impulseScalar);

            this.physics.velocity.addScaledVector(impulseVec, 1.0 / m1);
            ai.velocity.addScaledVector(impulseVec, -1.0 / m2);

            ai.recoveryBoostTimer = 2.0;
          }

          const contactPos = this.physics.position.clone().add(ai.position).multiplyScalar(0.5);
          contactPos.y = 0.55 + this.world.getBaseHeight(contactPos.x, contactPos.z);
          this.spawnParticles(contactPos, pushDir, 0xffe6a8, 10, false, true);

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
          const obb = (dist < 6.0) ? testOBBCollision(ai1, ai2) : { collision: false };
          if (obb.collision) {
            const pushDir = obb.pushDir;
            const overlap = obb.overlap;
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
            this.spawnParticles(contactPos, pushDir, 0xffe6a8, 6, false, true);

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
          const aiSpeed = ai.velocity.length();

          // Animate hovering indicator arrow above AI
          // Pause indicator arrow spin during cinematic
          if (ai.indicatorMesh && !isCinematicActive) {
            ai.indicatorMesh.rotation.y += 2.0 * scaledDt;
            ai.indicatorMesh.position.y = 1.9 + Math.sin(Date.now() * 0.005) * 0.12;
          }

          if (!ai._frameCounter) ai._frameCounter = 0;
          ai._frameCounter++;
          const dist = ai.position.distanceTo(focusTarget.position);
          const isDistant = dist > 90.0;
          const shouldUpdateThisFrame = !isDistant || (ai._frameCounter % 3 === 0);

          if (shouldUpdateThisFrame) {
            if (isCinematicActive) {
              // During cinematic: use quaternion directly.
              // rotation.set() is overridden by the slerp in alignMeshToTerrain on next frame.
              ai.meshGroup.position.copy(ai.spawnPos);
              const _q = new THREE.Quaternion();
              _q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), ai.heading);
              ai.meshGroup.quaternion.copy(_q);
            } else {
              this.world.alignMeshToTerrain(ai.meshGroup, ai.position, ai.heading, false, scaledDt);
            }
            ai.meshGroup.updateMatrixWorld(true);



            this.updateVehicleLOD(ai, dist, 1.0);

            if (!ai._lastLOD) {
              // Update AI headlight lens flares
              this.updateHeadlightFlares(ai.meshGroup, ai.heading);
              this.deformHeadlightPoolToTerrain(ai.meshGroup);
            }
          }

          // Update baked headlight pool based on distance to player/focusTarget
          const headlightPool = ai.meshGroup.getObjectByName("headlightPool");
          if (headlightPool) {
            headlightPool.material.opacity = 0.35;
          }

          if (shouldUpdateThisFrame && !ai._lastLOD) {
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
          }

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
          }
          // Always track previous wheel position so the first skid frame perfectly connects to the tire
          ai.prevLeftWheel = leftRear.clone();
          ai.prevRightWheel = rightRear.clone();

          // Update AI Nitro visual effects (sprite flare)
          if (ai.isBoosting) {
            const scaleVal = 1.3 + Math.random() * 0.45;
            if (ai.nitroLeftSprite) ai.nitroLeftSprite.scale.set(scaleVal, scaleVal, scaleVal);
            if (ai.nitroRightSprite) ai.nitroRightSprite.scale.set(scaleVal, scaleVal, scaleVal);
          } else {
            if (ai.nitroLeftSprite) ai.nitroLeftSprite.scale.set(0.001, 0.001, 0.001);
            if (ai.nitroRightSprite) ai.nitroRightSprite.scale.set(0.001, 0.001, 0.001);
          }
        }
      });

      // Update position standings on HUD
      const rankings = this.race.calculateRankings(this.physics.position);
      const playerRank = rankings.findIndex(r => r.isPlayer) + 1;
      const posEl = document.getElementById('stats-pos');
      if (posEl) posEl.textContent = `${playerRank}/${rankings.length}`;

      if (this.prevPlayerRank !== undefined && playerRank < this.prevPlayerRank) {
        if (this.hypeManager) this.hypeManager.addStunt('overtake', playerRank);
      }
      this.prevPlayerRank = playerRank;

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

          let posSuffix = "TH";
          if (finalPlayerRank === 1) posSuffix = "ST";
          else if (finalPlayerRank === 2) posSuffix = "ND";
          else if (finalPlayerRank === 3) posSuffix = "RD";

          const resultsContainer = document.getElementById('race-results');
          const resultsPos = document.getElementById('results-pos');
          const resultsTime = document.getElementById('results-time');

          if (resultsContainer) {
            resultsPos.textContent = `${finalPlayerRank}${posSuffix}`;
            resultsTime.textContent = this.formatTime(raceResult.time);

            // Reset Quick Feedback UI
            const likeBtn = document.getElementById('btn-like-race');
            const dislikeBtn = document.getElementById('btn-dislike-race');
            const qfThanks = document.getElementById('quick-feedback-thanks');
            if (likeBtn) likeBtn.style.display = 'block';
            if (dislikeBtn) dislikeBtn.style.display = 'block';
            if (qfThanks) qfThanks.style.display = 'none';

            resultsContainer.classList.add('show');

            setTimeout(() => {
              if (resultsContainer) resultsContainer.classList.remove('show');
            }, 6000);
          }

          this.hudStatsEl.style.display = 'none';
          this.cancelBtnEl.style.display = 'none';
          this.navArrow.visible = false;
          this.clearCheckpointBeacons();

          // Delay clearing AI so they can brake and coast to a stop
          setTimeout(() => {
            this.clearAIMeshes();
          }, 8000);

          // Restore full traffic density in free roam smoothly over time
          if (this.traffic) {
            this.traffic.maxVehicles = 40;
          }

          // Select new world event
          this.race.selectNewWorldEvent(this.world, this.physics.position);
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

      // Force hide arrow during cinematics
      if (this.cinematicManager && this.cinematicManager.state !== 'none') {
        this.navArrow.visible = false;
      }

      // Spawn tall checkpoint smoke particles
      this.race.checkpoints.forEach((cp, index) => {
        const isFinish = (index === this.race.checkpoints.length - 1);
        const color = isFinish ? 0xe84545 : 0xffaa3a;
        const isUnordered = this.race.mode === 'unordered';
        const isCleared = isUnordered ? this.race.unorderedCleared.has(index) : index < this.race.currentIndex;
        const isCurrent = isUnordered ? !isCleared : index === this.race.currentIndex;
        const isNext = !isUnordered && index === Math.min(this.race.currentIndex + 1, this.race.checkpoints.length - 1);

        if (isUnordered) {
          if (!isCleared && Math.random() < 0.35) {
            this.spawnCheckpointSmoke(cp, color, 0.85, 0.9);
          }
        } else if (isCurrent) {
          if (Math.random() < 0.55) {
            this.spawnCheckpointSmoke(cp, color, 1.0, 1.0);
          }
        } else if (isNext) {
          if (Math.random() < 0.20) {
            this.spawnCheckpointSmoke(cp, color, 0.45, 0.65);
          }
        }
      });
    }
    this.perf.race = performance.now() - tRaceStart;

    const tParticlesStart = performance.now();
    // Tick systems
    this.updateParticles(scaledDt);
    this.updateCheckpointSmoke(scaledDt);
    this.updateDebris(scaledDt);
    this.checkBreakablesCollision(scaledDt);
    this.checkSlipstream(scaledDt);
    this.checkNearMisses(scaledDt);
    this.updateDriftNitro(scaledDt);
    this.updateAirNitro(scaledDt);

    // Update debug path and lookahead visuals (DISABLED)
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


    // InstancedMesh handles skidmark rendering perfectly without CPU-side culling.
    // Replaced legacy distance culling loop for massive performance gain.

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
    if (this.speedValEl) {
      this.speedValEl.textContent = mph.toString().padStart(3, '0');
    }

    // Gear UI update
    if (this.gearValEl) {
      if (this.physics.shiftTimer > 0) {
        this.gearValEl.textContent = "—";
        this.gearValEl.style.color = "#ff3b30";
      } else {
        this.gearValEl.textContent = this.physics.gear;
        this.gearValEl.style.color = this.physics.gear === 'R' ? '#ff3b30' : '#ffc600';
      }
    }

    // RPM gauge needle, circular path, and shift light update
    if (this.dialNeedleEl && this.dialRpmFillEl) {
      const rpmPct = Math.max(0, Math.min(100, ((this.physics.rpm - 1000) / (8000 - 1000)) * 100));
      // Needle angle goes from -135deg (idle) to +135deg (max)
      const needleAngle = (rpmPct / 100) * 270 - 135;
      this.dialNeedleEl.setAttribute('transform', `rotate(${needleAngle} 80 80)`);

      // Arc fill length goes from 0 (empty) to 330 (fully active)
      const activeLength = (rpmPct / 100) * 330;
      this.dialRpmFillEl.setAttribute('stroke-dasharray', `${activeLength} 440`);

      if (this.physics.rpm > 7300) {
        this.dialRpmFillEl.style.stroke = '#ff3b30'; // Redline warning
      } else {
        this.dialRpmFillEl.style.stroke = '#ffc600'; // Racing yellow
      }
    }

    // Nitro UI circular path update
    if (this.nitroBarEl) {
      const activeLength = this.physics.nitroLevel * 287;
      this.nitroBarEl.setAttribute('stroke-dasharray', `${activeLength} 400`);

      if (this.physics.isBoosting) {
        this.nitroBarEl.style.stroke = '#ffffff'; // White/Cyan hot when boosting
      } else if (this.physics.nitroLevel < 0.10) {
        this.nitroBarEl.style.stroke = '#999999'; // Black and white (grayscale) below activation threshold
      } else {
        this.nitroBarEl.style.stroke = '#00e5ff'; // Standard electric cyan
      }
    }

    // Handle every landing (smoke and shake) regardless of tricks using Bulletproof Event Queue
    if (this.physics.landingEvents && this.physics.landingEvents.length > 0) {
      this.physics.landingEvents.forEach(event => {
        const contactPos = event.position.clone();
        contactPos.y += 0.1;

        if (this.physics.landedWipeout) {
          if (this.hypeManager) this.hypeManager.triggerWipeout();
          this.spawnDebris(contactPos, new THREE.Vector3(0, 4, 0), 0x222222, 16);
          this.crashShake = Math.max(this.crashShake || 0, 0.95);
        } else {
          // Trigger airborne stunt on clean landing
          if (event.airTime > 0.3 && this.hypeManager) {
            this.hypeManager.addStunt('air', event.airTime);
          }
          
          // Bulletproof Fix: Remove gates/thresholds. ALWAYS trigger visual feedback!
          // We guarantee a minimum impact value of 2.5 so effects always visibly pop.
          const impact = Math.max(2.5, event.impact);

          // Trigger camera landing punch (wider FOV and suspension squash)
          this.landingPunch = Math.min(2.0, impact * 0.25 + 0.5);

          // Regular landing smoke (increased density)
          const count = Math.min(65, Math.floor(impact * 4.0) + 20);
          this.spawnParticles(contactPos, new THREE.Vector3(0, 2, 0), 0xaaaaaa, count);

          // Bright landing sparks (increased count)
          const sparkCount = Math.min(90, Math.floor(impact * 6.0) + 30);
          this.spawnParticles(contactPos, new THREE.Vector3(0, 5, 0), 0xffee88, sparkCount, false, true);

          // Spawn sparks at the front and back tires to frame the vehicle
          const headingDir = new THREE.Vector3(-Math.sin(this.physics.heading), 0, -Math.cos(this.physics.heading));
          const backPos = contactPos.clone().addScaledVector(headingDir, 1.5);
          const frontPos = contactPos.clone().addScaledVector(headingDir, -1.5);
          this.spawnParticles(backPos, new THREE.Vector3(0, 4.0, 0), 0xffee88, Math.floor(sparkCount * 0.6), false, true);
          this.spawnParticles(frontPos, new THREE.Vector3(0, 4.0, 0), 0xffee88, Math.floor(sparkCount * 0.6), false, true);

          // Spawn physical dirt/rocks debris on landing impact
          const debrisCount = Math.min(20, Math.floor(impact * 1.5) + 5);
          this.spawnDebris(contactPos, new THREE.Vector3(0, 3.5, 0), 0x554433, debrisCount);

          // Flash the realtime spark light
          if (this.sparkLight) {
            this.sparkLight.position.copy(contactPos);
            this.sparkLight.position.y += 1.0;
            this.sparkLight.intensity = Math.min(25.0, impact * 3.5 + 5.0);
          }

          // Camera shake always triggers with higher intensity
          const shakeFactor = Math.min(0.9, impact * 0.08 + 0.25);
          this.crashShake = Math.max(this.crashShake || 0, shakeFactor);
        }
      });

      // Consume the events! This is bulletproof because it processes every landing 
      // even if physics sub-stepped multiple times in the background.
      this.physics.landingEvents = [];
      this.physics.justLanded = false;
      this.physics.landingImpact = 0;
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
    this.perf.particles = performance.now() - tParticlesStart;

    const tRenderStart = performance.now();
    const tEyeAdaptationStart = performance.now();
    // Dynamic HDR Auto-Exposure (Eye Adaptation)
    let localBrightness = 0.04; // Base dark brightness offset

    if (this.world && this.world.lightSources) {
      const px = this.physics.position.x;
      const pz = this.physics.position.z;
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
    this.perf.eyeAdaptation = performance.now() - tEyeAdaptationStart;

    // Fade out spark light rapidly
    if (this.sparkLight && this.sparkLight.intensity > 0) {
      this.sparkLight.intensity *= Math.exp(-6.0 * dt);
      if (this.sparkLight.intensity < 0.1) this.sparkLight.intensity = 0;
    }

    this.renderer.render(this.scene, this.camera);
    this.perf.render = performance.now() - tRenderStart;

    const totalTime = performance.now() - startFrame;
    this.perf.total = totalTime;

    if (totalTime > 33.3) {
      console.warn(`[Stutter Detected] Frame took ${totalTime.toFixed(1)}ms | ` +
        `world: ${this.perf.world.toFixed(1)}ms | ` +
        `physics: ${this.perf.physics.toFixed(1)}ms | ` +
        `trafficAI: ${this.perf.trafficUpdate.toFixed(1)}ms | ` +
        `trafficMesh: ${this.perf.trafficMesh.toFixed(1)}ms | ` +
        `collisions: ${this.perf.collisions.toFixed(1)}ms | ` +
        `playerVis: ${this.perf.playerVisuals.toFixed(1)}ms | ` +
        `pursuit: ${this.perf.pursuit.toFixed(1)}ms | ` +
        `race: ${this.perf.race.toFixed(1)}ms | ` +
        `particles: ${this.perf.particles.toFixed(1)}ms | ` +
        `render: ${this.perf.render.toFixed(1)}ms (eye: ${this.perf.eyeAdaptation.toFixed(1)}ms) | ` +
        `DrawCalls: ${this.renderer.info.render.calls} | ` +
        `Triangles: ${this.renderer.info.render.triangles} | ` +
        `Geometries: ${this.renderer.info.memory.geometries} | ` +
        `Textures: ${this.renderer.info.memory.textures} | ` +
        `Shaders: ${this.renderer.info.programs ? this.renderer.info.programs.length : 0}`);
    }

    if (this.perfFrameCount === undefined) this.perfFrameCount = 0;
    this.perfFrameCount++;

    if (this.perfFrameCount % 10 === 0) {
      const fps = Math.round(1000 / Math.max(1, totalTime));
      const hudEl = document.getElementById('perf-hud');
      if (this.perfFpsEl && hudEl && hudEl.style.display === 'block') {
        this.perfFpsEl.textContent = fps;
        this.perfTotalEl.textContent = totalTime.toFixed(1);
        this.perfWorldEl.textContent = this.perf.world.toFixed(1);
        this.perfPhysicsEl.textContent = this.perf.physics.toFixed(1);
        this.perfTrafficUpdateEl.textContent = this.perf.trafficUpdate.toFixed(1);
        this.perfTrafficMeshEl.textContent = this.perf.trafficMesh.toFixed(1);
        this.perfCollisionsEl.textContent = this.perf.collisions.toFixed(1);
        this.perfPlayerVisualsEl.textContent = this.perf.playerVisuals.toFixed(1);
        this.perfPursuitEl.textContent = this.perf.pursuit.toFixed(1);
        this.perfRaceEl.textContent = this.perf.race.toFixed(1);
        this.perfParticlesEl.textContent = this.perf.particles.toFixed(1);
        this.perfRenderEl.textContent = this.perf.render.toFixed(1);
        this.perfEyeEl.textContent = this.perf.eyeAdaptation.toFixed(1);
        this.perfCallsEl.textContent = this.renderer.info.render.calls;
        this.perfTrianglesEl.textContent = this.renderer.info.render.triangles;
        this.perfGeometriesEl.textContent = this.renderer.info.memory.geometries;
        this.perfTexturesEl.textContent = this.renderer.info.memory.textures;
        this.perfShadersEl.textContent = this.renderer.info.programs ? this.renderer.info.programs.length : 0;
      }
    }
  }
}

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

if (isMobile) {
  const blocker = document.getElementById('mobile-blocker');
  if (blocker) blocker.style.display = 'flex';
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';
  const menu = document.getElementById('main-menu');
  if (menu) menu.style.display = 'none';
  console.log("Game initialization aborted: Mobile device detected.");
} else {
  new Game();
}
