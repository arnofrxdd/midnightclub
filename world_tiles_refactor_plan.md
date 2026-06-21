# World Tiles Code-Splitting Plan

The current `src/world/tiles.js` file is **2,116 lines long (approx 82KB)**, containing all the complex procedural logic for roads, alleys, and buildings. To make this much more maintainable, we will split it into three dedicated files under `src/world/`.

---

## 📂 Proposed File Layout

```
src/world/
├── world.js          # Primary World class orchestration
├── roadTile.js       # [New File] buildRoadTile logic (lanes, pavements, streetlights)
├── alleyTile.js      # [New File] buildAlleyTile logic (dumpsters, trash bags, barriers)
└── buildingTile.js   # [New File] buildBuildingTile logic (skyscrapers, facades, billboards)
```

---

## 🪓 Code Splitting Details

### 1. Extract `buildRoadTile` ➡️ `src/world/roadTile.js`
*   **Contents**: All mesh generation for roads, sidewalks, lane markings, streetlights, and traffic light positions.
*   **Imports**: `THREE`, `BufferGeometryUtils`

### 2. Extract `buildAlleyTile` ➡️ `src/world/alleyTile.js`
*   **Contents**: Mesh generation for shortcut alleys, dumpsters, trash bags, and fences.
*   **Imports**: `THREE`, `BufferGeometryUtils`

### 3. Extract `buildBuildingTile` ➡️ `src/world/buildingTile.js`
*   **Contents**: Skyscraper block sizes, step heights, window frame geometries, neon billboards, and ambient storefront lights.
*   **Imports**: `THREE`, `BufferGeometryUtils`, `createDetailedWindowGeometry` from `./geometry.js`

---

## 🔗 Dependency Updates

Imports to update in `src/world/world.js`:
```diff
-import { buildRoadTile, buildAlleyTile, buildBuildingTile } from './tiles.js';
+import { buildRoadTile } from './roadTile.js';
+import { buildAlleyTile } from './alleyTile.js';
+import { buildBuildingTile } from './buildingTile.js';
```

---

## ✅ Verification Strategy
1. **Compilation Check**: Run `npm run build` to verify rollup bundle paths.
2. **Visual Inspection**: Run `npm run dev` and navigate the city map to ensure roads, alleys, and skyscrapers generate correctly.
