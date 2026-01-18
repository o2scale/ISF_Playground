# Task 1: FR System Removal Log

**Date:** 2025-10-22 22:58:02
**Task:** Remove Old face-api.js FR System
**Reason:** Complete rebuild with @vladmandic/human
**Story:** epic-02-story-01

---

## Files to be Removed

### Dependencies (package.json)
- **Backend:** `face-api.js: ^0.22.2` (line 39)
- **Frontend:** `face-api.js: ^0.22.2` (line 49)

### Model Weight Files (backend/weights/)
All face-api.js model files:
- `tiny_face_detector_model-weights_manifest.json`
- `face_recognition_model-weights_manifest.json` (+ shards)
- `face_landmark_68_model-weights_manifest.json`
- `face_landmark_68_tiny_model-weights_manifest.json`
- `face_expression_model-weights_manifest.json`
- `mtcnn_model-shard1`
- `ssd_mobilenetv1_model` (shard1, shard2)
- `age_gender_model-shard1`

### Model Weight Files (frontend/public/models/ and frontend/src/components/faceidlogin/models/)
All face-api.js model files in frontend

### Code Files to Modify (NOT delete - keep for new implementation)
- `backend/services/student.js` - Remove faceLogin() and face detection in registerStudentNew()
- `backend/controllers/userController.js` - Remove facialLogin()
- `backend/models/user.js` - Remove facialData schema (will recreate with encryption)
- `backend/routes/auth.js` - Keep route but will reimplement
- `frontend/src/components/faceidlogin/FaceIdLogin.js` - Keep component, reimplement logic
- `frontend/src/components/usermanagement/FaceCapture.js` - Keep component, reimplement logic
- `frontend/src/api.js` - Keep faceIdlogin() function, will work with new endpoints

### Code References to Remove
- All `require('face-api.js')` or `import face-api.js` statements
- All face-api.js method calls (detectSingleFace, FaceMatcher, etc.)
- face-api.js initialization code in backend/server.js

---

## Removal Strategy

### Phase 1: Dependencies
1. Remove face-api.js from backend/package.json
2. Remove face-api.js from frontend/package.json
3. Run npm install in both directories

### Phase 2: Model Files
1. Delete backend/weights/ directory entirely
2. Delete frontend/public/models/ directory (face-api.js models)
3. Delete frontend/src/components/faceidlogin/models/

### Phase 3: Code Cleanup
1. Remove face-api.js imports from backend/server.js
2. Remove face-api.js imports from backend/services/student.js
3. Comment out faceLogin() method in backend/services/student.js (keep for reference)
4. Comment out face detection in registerStudentNew() in backend/services/student.js
5. Comment out facialLogin() in backend/controllers/userController.js
6. Remove facialData from backend/models/user.js schema

### Phase 4: Verification
1. Search codebase for remaining "face-api" references
2. Run npm prune to clean unused packages
3. Verify backend still starts successfully
4. Verify frontend still builds successfully

---

## Rollback Instructions

**If needed to restore (NOT RECOMMENDED - old system was broken):**

1. Restore package.json files from git:
   ```bash
   git checkout HEAD -- backend/package.json frontend/package.json
   ```

2. Restore model files from git:
   ```bash
   git checkout HEAD -- backend/weights/ frontend/public/models/
   ```

3. Restore code files:
   ```bash
   git checkout HEAD -- backend/services/student.js
   git checkout HEAD -- backend/controllers/userController.js
   git checkout HEAD -- backend/models/user.js
   ```

4. Run npm install:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

**Note:** Old system had critical issues (no liveness detection, deprecated library, security flaws). Rollback only for emergency.

---

## Removal Progress

- [ ] Phase 1: Dependencies removed
- [ ] Phase 2: Model files deleted
- [ ] Phase 3: Code cleaned up
- [ ] Phase 4: Verification complete

**Status:** In Progress
**Last Updated:** 2025-10-22 22:58:02
