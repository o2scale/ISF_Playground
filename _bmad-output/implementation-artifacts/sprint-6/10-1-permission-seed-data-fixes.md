# Story 10.1: Permission Seed Data & Auth Fixes

Status: ready-for-dev

## Findings Addressed
- C1: 7 permission modules missing from seed data
- C2: 4 roles missing from seed data
- C4: balagruhaIds missing from student login response
- C5: balagruha-incharge vs "balagruha in-charge" naming split
- H1: /api/roles/getAllRolePermissions has no authentication
- H2: wtfSettings.js passes array to authorize() — always 403
- H8: Offline request queue routes have no authentication
- M5: No inactive account check in studentLogin backend

## Tasks
1. Update backend/scripts/setupDefaultRoles.js — add all 7 missing modules (LMS Management, Purchase Management, Medical Check-in, Medical Management, Schedule Management, Daily Schedule, Course Management) with appropriate CRUD per role
2. Add 4 missing roles to seed: medical-incharge, sports-coach, music-coach, amma
3. Add `balagruhaIds: user.balagruhaIds || []` to authController.studentLogin() response
4. Normalize "balagruha in-charge" to "balagruha-incharge" across ALL frontend files (App.js ProtectedRoute, Layout.js, constants)
5. Add `authenticate` middleware to GET /api/roles/getAllRolePermissions route
6. Fix wtfSettings.js authorize calls — change array argument to two-string form authorize("WTF Management", "Update")
7. Add `authenticate` middleware to offline queue routes (POST /api/offline-requests, GET /api/offline-requests/:id)
8. Add server-side `user.status === "inactive"` check to authController.studentLogin()
9. Run: cd backend && npx jest --verbose (must pass)
10. Run: cd frontend && npx react-scripts build (must succeed)
