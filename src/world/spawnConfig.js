export const SPAWN_CONFIG = {
  // -----------------------------------------------------
  // WORLD LAYOUT (world.js)
  // -----------------------------------------------------
  WORLD: {
    // Spacing between main roads (in tiles). 
    // Logic: ROAD_SPACING_MIN + Math.floor(rand * (ROAD_SPACING_MAX - ROAD_SPACING_MIN + 1))
    ROAD_SPACING_MIN: 2,
    ROAD_SPACING_MAX: 7, 

    // Alleys
    ALLEY_MIN_BLOCK_WIDTH: 3,
    ALLEY_SPAWN_PROBABILITY: 0.20 // 20% chance of a shortcut alley
  },

  // -----------------------------------------------------
  // SPECIAL BLOCKS
  // -----------------------------------------------------
  BLOCKS: {
    MALL: {
      PROBABILITY: 0.35,
      MIN_WIDTH: 2,
      MIN_HEIGHT: 2,
      MAX_SLOPE: 2.5 // Maximum height difference across the block
    },
    GAS_STATION: {
      PROBABILITY: 0.85, // 85% chance for 1x1 blocks outside center
      MIN_WIDTH: 1, 
      MIN_HEIGHT: 1
    }
  },

  // -----------------------------------------------------
  // ROADS (roadTile.js)
  // -----------------------------------------------------
  ROADS: {
    MAINTENANCE_ZONE: {
      // Determines how frequently a maintenance zone spawns.
      // Higher means less frequent. E.g., 25 means 1 in 25 offset chance.
      SPACING_FREQUENCY: 25,
      MIN_ROAD_LENGTH: 5
    }
  },

  // -----------------------------------------------------
  // BUILDINGS (buildingTile.js)
  // -----------------------------------------------------
  BUILDINGS: {
    LEVELS: {
      LEVEL_4_THRESHOLD: 0.8,  // rand > 0.8  (20% chance)
      LEVEL_3_THRESHOLD: 0.45  // rand > 0.45 (35% chance, otherwise Level 2)
    },
    ALLEY_WIDTHS: {
      NARROW_THRESHOLD: 0.4,   // 40% chance
      MEDIUM_THRESHOLD: 0.7    // 30% chance (otherwise wide)
    },
    ROAD_EDGE: {
      BRING_CLOSER_THRESHOLD: 0.5 // 50% chance to bring buildings closer on narrow roads
    }
  },

  // -----------------------------------------------------
  // EVENTS (race.js)
  // -----------------------------------------------------
  EVENTS: {
    RACE: {
      // Spawn distances from player (in meters)
      MIN_SPAWN_DISTANCE: 80,
      MAX_SPAWN_DISTANCE: 1800,
      
      // How many event beacons to spawn in the world at once
      MAX_CONCURRENT_EVENTS: 36,
      
      // Random ranges for race properties
      CHECKPOINTS_MIN: 5,
      CHECKPOINTS_MAX: 12,
      RACERS_MIN: 3,
      RACERS_MAX: 7,
      CIRCUIT_LAPS_MIN: 2,
      CIRCUIT_LAPS_MAX: 4
    }
  },

  // -----------------------------------------------------
  // COPS & PURSUITS (pursuitManager.js)
  // -----------------------------------------------------
  COPS: {
    // Limits the max cops chasing based on heat level: Math.min(MAX_COPS_CAP, Math.max(1, heatLevel))
    MAX_COPS_CAP: 5,
    
    // Spawning frequency coefficients: baseMin = Math.max(COOLDOWN_MIN, COOLDOWN_FACTOR / heatLevel)
    COOLDOWN_MIN: 3.5,
    COOLDOWN_FACTOR: 9.0,
    COOLDOWN_RAND_MIN: 4.0,
    COOLDOWN_RAND_FACTOR: 10.0
  }
};
