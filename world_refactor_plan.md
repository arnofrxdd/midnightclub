# World Refactoring Plan

Reorganize the 3,800-line procedural world generation file (`src/world/world.js`) into three modular files to improve readability and clean separation of concerns.

---

## 📂 Proposed World File Layout

```
src/world/
├── world.js      # Primary World class, coordinate math, spatial queries, heightmaps
├── textures.js   # Procedural streetlight, building window, and asphalt textures
├── geometry.js   # Sidewalk UV math, building facade window frames, traffic light state
├── props.js      # [New File] Tree models, fire hydrants, benches, phone booths, trash cans
└── tiles.js      # [New File] Detailed block/tile constructors (Roads, Alleys, Buildings)
```

---

## 🪓 Code Splitting Details

### 1. Extract Street Props Templates & Generators ➡️ `src/world/props.js`
*   **Target Methods**:
    *   `createFireHydrantMesh()`
    *   `createNewspaperBoxMesh()`
    *   `spawnTemplateTree(x, z, group, obstacles)`
    *   `createBenchMesh()`
    *   `createPhoneBoothMesh()`
    *   `createTrashCanMesh()`
*   **Integration**: Exported as standalone functions and called inside `World` using `.call(this, ...)` so execution context is maintained.

### 2. Extract Tile Constructors ➡️ `src/world/tiles.js`
*   **Target Methods**:
    *   `buildRoadTile(gridX, gridZ, posX, posZ, group, obstacles, lights)`
    *   `buildAlleyTile(gridX, gridZ, posX, posZ, group, obstacles, lights)`
    *   `buildBuildingTile(gridX, gridZ, posX, posZ, group, obstacles, lights)`
*   **Integration**: Exported as standalone functions and called inside `World` using `.call(this, ...)` to preserve context.

---

## 🔗 Dependency Updates

Imports to add to `src/world/world.js`:
```javascript
import { 
  createFireHydrantMesh, 
  createNewspaperBoxMesh, 
  spawnTemplateTree, 
  createBenchMesh, 
  createPhoneBoothMesh, 
  createTrashCanMesh 
} from './props.js';
import { 
  buildRoadTile, 
  buildAlleyTile, 
  buildBuildingTile 
} from './tiles.js';
```

---

## ✅ Verification Strategy
1. **Compilation Check**: Run `npm run build` to verify paths.
2. **Visual Inspection**: Run `npm run dev` to ensure buildings, street props, traffic lights, and alleys generate cleanly without missing meshes or misplaced collisions.
