# Story 10.3: Security Hardening

Status: ready-for-dev

## Findings Addressed
- H4: No rate limiting on FR endpoints
- H7: Unauthenticated WS connections not disconnected
- H9: express.json body limit set to 100MB
- M3: Frontend coach/grading/assignments routes have no role guard
- M4: /admin/students/:userId has no admin role check

## Tasks
1. Add authLimiter (or dedicated rate limiter) to FR routes: POST /api/auth/student/facial/login and POST /api/v2/fr/recognize
2. Fix backend/services/wtfWebSocket.js — close WebSocket connection after auth failure (with brief delay for error message delivery)
3. Reduce express.json body limit in backend/server.js from 100MB to 5MB default
4. Add requiredRoles={['coach', 'admin']} to frontend App.js coach/grading/assignment routes
5. Add admin guard to /admin/students/:userId route in App.js
6. Run: cd backend && npx jest --verbose (must pass)
7. Run: cd frontend && npx react-scripts build (must succeed)
