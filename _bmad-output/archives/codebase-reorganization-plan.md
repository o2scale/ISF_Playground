# ISF Playground — Codebase Reorganization Plan

**Date:** 2026-03-15
**Branch:** dev-s2
**Prepared by:** BMad Master (Deep Research Audit)

---

## Executive Summary

The ISF Playground codebase has grown organically across multiple sprints, accumulating 60+ one-off backend scripts, stale test artifacts, duplicate files, credential files, scattered logs, and 450+ BMAD files pending migration. This plan provides a phased approach to clean up, reorganize, and align the entire project with BMAD structure — without breaking any production code.

---

## Project Overview

**ISF Playground** is a MERN + Electron desktop application for the Initiative Sewa Foundation — a comprehensive student/school management platform.

### Technology Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 19, React Router 7, Tailwind CSS, Radix UI, Zustand |
| Backend | Express.js 4.21, Mongoose 8.10, JWT, Pino logging |
| Database | MongoDB (local) |
| Desktop | Electron (electron-builder) |
| Storage | AWS S3 (file uploads) |
| Caching | Redis (ioredis) |
| ML/CV | @vladmandic/human (facial recognition) |
| Testing | Jest 30, React Testing Library, Playwright |

### Feature Modules
- **LMS** — Courses, quizzes, assignments, grading, content library
- **Shop & Purchase Management** — Inventory, vendors, purchase requests, orders, analytics
- **Wall of Fame (WTF)** — Gamification with coins, pins, leaderboards
- **Facial Recognition** — Student check-in via webcam
- **Medical/Health** — Check-ins, mood tracking, doctor visits
- **Facilities (Balagruha)** — Center management, machine assignments
- **Sports, Music, Tasks, Attendance, Scheduling**

### Current Scale
| Dimension | Count |
|-----------|-------|
| Total indexed files | 811 |
| Code symbols | 2,402 |
| Backend files | 354 |
| Frontend files | 374 |
| Mongoose models | 45 |
| API route files | 50 |
| Controllers | 39 |
| Services | 33 |
| Frontend components | 203+ |
| Frontend pages | 35 |

---

## Current Problems Identified

### 1. Backend Root Script Sprawl (60+ files)
One-off debug, check, fix, test, and seed scripts scattered at the backend root level. These make navigation difficult and obscure the actual application structure.

**Files identified:**

#### Data Addition/Modification Scripts (9 files)
- `addCoins.js`
- `add-coin-transactions.js`
- `addShopPermission.js`
- `add-shop-permissions-for-testing.js`
- `assign-orders-to-balagruhas.js`
- `seed-coin-data.js`
- `updateShopModuleName.js`
- `update-pr-to-repairs.js`
- `publish_courses.js` (at project root)

#### Check/Debug Scripts (26 files)
- `check-all-id-fields.js`
- `check-all-pins.js`
- `check-balagruha-data.js`
- `check_coins_backend.js`
- `check_coins_backend_v2.js`
- `check-raw-database.js`
- `check-roles-permissions.js`
- `check-student-balagruha-field.js`
- `check-test-data.js`
- `check-users-debug.js`
- `check-zero-purchase-balagruhas.js`
- `debug_coins.js`
- `debug-leaderboard-full.js`
- `debug-leaderboard.js`
- `debug-medical-file-urls.js`
- `debug_progress_backend.js`
- `debug-userId-field.js`
- `explore-database.js`
- `direct-cleanup-expired-pins.js`
- `direct-db-check.js`
- `investigate-expired-pins.js`
- `investigate-wtf-pins.js`
- `simple-wtf-check.js`
- `check_coins.js` (at project root)
- `debug_progress.js` (at project root)

#### Test/Data Generation Scripts (14 files)
- `create-test-data.js`
- `create_coach_user.js`
- `createDummyStudent.js`
- `createTestNotifications.js`
- `create-test-pins.js`
- `generateTestMedia.js`
- `get_quiz_details.js`
- `get_quiz_options.js`
- `list_courses.js`
- `reset_all_quizzes.js`
- `reset_progress.js`
- `see-order-structure.js`
- `simulate_submission.js`
- `test-transaction-response.js`

#### Fix/Reset Scripts (8 files)
- `fix-all-coin-records.js`
- `fix_progress.js`
- `fix-admin-permissions.js`
- `fix_admin_permissions.js` (duplicate naming)
- `reset-pm-password.js`
- `reset-samplet-password.js`
- `set-test-passwords.js`
- `unlockUserByEmail.js`

#### Search/Lookup Scripts (3 files)
- `findStudentCoach.js`
- `findUserById.js`
- `findUserByName.js`

### 2. Backend /scripts/ Directory (51 files)
An existing scripts directory with more utilities, some duplicating root-level scripts. Needs consolidation with the root-level scripts.

### 3. Root-Level Stale Files (12+ already staged for deletion)
Test artifacts already marked for deletion in git but not yet committed:
- `test-checkin-image.png`
- `test-content.pdf`
- `test-cors.html`
- `test-cors.js`
- `test-image.png`
- `test-image.txt`
- `test-medical.pdf`
- `test-prescription-file.txt`
- `test-prescription.txt`
- `test-result-file.txt`
- `test-upload.txt`
- `verify_coach_api.js`
- `todo.txt`

### 4. Security Issues — Credential Files
- `creds` (119 bytes) — Contains admin/coach login credentials in plaintext
- `creds.txt` (277 bytes) — Contains multiple user credentials in plaintext
- **Risk:** Even though `.gitignore` includes "creds", `creds.txt` may not be covered

### 5. Scattered Log Files (8+)
- Root: `backend.log`, `backend_bg.log`, `backend_startup.log`, `frontend.log`, `frontend_bg.log`
- Backend: `dev-server.log`, `quiz_debug.log`, `backend/logs/pino-logger.log` (7.1MB)
- Frontend: `dev-server.log`, `frontend.log`
- Lock files: `.~lock.fixes-session-2026-02-24.csv#`, `.~lock.fixes-combined-2026-02-24.xlsx#`

### 6. Frontend Duplicates & Stale Code
| File | Issue | Action |
|------|-------|--------|
| `src/components/PermissionGuard.js` (355B) | Duplicate — older version | DELETE |
| `src/components/PermissionGuard.jsx` (1,051B) | Newer, uses hook | KEEP |
| `src/hooks/useUserRole.tsx` (803B) | TypeScript duplicate with mock | DELETE |
| `src/hooks/useUserRole.js` (678B) | JavaScript version, correct | KEEP |
| `src/components/hooks/usePermission.js` | Wrong location, stale copy | DELETE |
| `src/hooks/usePermission.js` | Correct location | KEEP |
| `src/AppRoutes.js` (4,435B) | Dead code, never imported | DELETE |
| `frontend/build/` | Stale build from Feb 19 | DELETE |
| `frontend/dev-server.log` | Log artifact | DELETE |
| `frontend/dev-server.pid` | PID file | DELETE |
| `frontend/frontend.log` | Log artifact | DELETE |
| `frontend/README.md` | Empty file | POPULATE or DELETE |
| `frontend/.env.example` | Empty file | POPULATE or DELETE |

### 7. Monolithic API File
- `frontend/src/api.js` — **2,198 lines** containing 100+ API endpoint functions
- Should be split into feature modules (shop, lms, user, medical, wtf, etc.)

### 8. BMAD Structure Migration (450+ files)
Old nested structure in `.claude/commands/bmad/`, `.agent/workflows/bmad/`, `.gemini/commands/bmad-workflow-*` being replaced with new flat structure. All deletions are already staged in git.

### 9. Root-Level Completion Reports (10 files)
Sprint completion reports cluttering the project root:
- `ORM_STANDARDIZATION_COMPLETE.md`
- `RBAC_AUDIT_REPORT.md`
- `RBAC_FIX_SUMMARY.md`
- `RBAC-SCOPE-TEST-REPORT.md`
- `CONSOLE_LOG_CLEANUP_SUMMARY.md`
- `SECURITY_CLEANUP_COMPLETION_REPORT.md`
- `SPRINT_2_CODE_QUALITY_COMPLETION_REPORT.md`
- `TEST_RESULTS_STORY_1_1.md`
- `FINAL_TEST_RESULTS.md`
- `FINAL_TEST_VERIFICATION.md`

### 10. Miscellaneous Root Clutter
- `ISF_Playground.code-workspace 1025.code-workspace` — duplicate workspace file
- `claude.md` (0 bytes, empty) — duplicate of CLAUDE.md
- `claude copy.md` — backup copy
- `fixes-combined-2026-02-24.csv` / `.xlsx` — historical tracking
- `Coach view feedback for Tony.pdf` — product feedback
- `concurrently` (0 bytes) — stale executable placeholder
- `index.html` — minimal Electron test page
- `add student.html` (backend) — legacy HTML form

---

## BMAD Integration Status

### What's Already Done
| Artifact | Status | Location |
|----------|--------|----------|
| BMAD Core Module | Installed v6.0.4 | `_bmad/core/` |
| BMAD Method Module (BMM) | Installed v6.0.4 | `_bmad/bmm/` |
| BMAD Builder Module (BMB) | Installed v0.1.6 | `_bmad/bmb/` |
| 17 Agents configured | Active | `_bmad/*/agents/` |
| 39 Workflows installed | Active | `_bmad/*/workflows/` |
| Project Context | Generated | `project-context.md` |
| Architecture Doc | Complete | `_bmad-output/architecture.md` |
| Sprint 5 PRD | Complete | `_bmad-output/sprint-5-purchase-manager/prd-*.md` |
| Sprint 5 Epics & Stories | Complete (14 stories) | `_bmad-output/sprint-5-purchase-manager/` |
| Sprint 5 Sprint Plan | Complete | `_bmad-output/implementation-artifacts/` |
| Sprint 2 Stories | Created (3 stories) | `_bmad-output/sprint-2-code-quality/` |
| IDE Commands (Claude) | Generated | `.claude/commands/` |
| IDE Commands (Gemini) | Generated | `.gemini/commands/` |
| IDE Commands (Antigravity) | Generated | `.agent/workflows/` |

### What Needs BMAD Alignment
- Root-level completion reports should be in `_bmad-output/`
- Backend documentation should be consolidated
- Frontend documentation needs creation
- Sprint history should be tracked in BMAD workflow status

---

## Reorganization Phases

### Phase 1: Immediate Cleanup (Safe, No Code Changes)

**Risk:** None — only deleting confirmed stale/dangerous files

#### 1.1 Commit Already-Staged Deletions
```
# 450+ BMAD files already staged for deletion (old → new structure)
# 12 test artifacts already staged for deletion
# Commit all as one cleanup commit
```

#### 1.2 Credential Files — KEEP
| File | Action | Reason |
|------|--------|--------|
| `/creds` | KEEP | Developer preference — needed for testing |
| `/creds.txt` | KEEP | Developer preference — needed for testing |

#### 1.3 Delete Log Files & Lock Files
| File | Action |
|------|--------|
| `/backend.log` | DELETE |
| `/backend_bg.log` | DELETE |
| `/backend_startup.log` | DELETE |
| `/frontend.log` | DELETE |
| `/frontend_bg.log` | DELETE |
| `/.~lock.fixes-session-2026-02-24.csv#` | DELETE |
| `/.~lock.fixes-combined-2026-02-24.xlsx#` | DELETE |
| `/backend/dev-server.log` | DELETE |
| `/backend/dev-server.pid` | DELETE |
| `/backend/quiz_debug.log` | DELETE |
| `/frontend/dev-server.log` | DELETE |
| `/frontend/dev-server.pid` | DELETE |
| `/frontend/frontend.log` | DELETE |

#### 1.4 Delete Duplicates & Empty Files
| File | Action | Reason |
|------|--------|--------|
| `/claude.md` | DELETE | Empty (0 bytes), CLAUDE.md exists |
| `/claude copy.md` | DELETE | Backup copy, CLAUDE.md is authoritative |
| `/ISF_Playground.code-workspace 1025.code-workspace` | DELETE | Duplicate workspace |
| `/concurrently` | DELETE | Empty placeholder (0 bytes) |

#### 1.5 Update .gitignore
Add entries for:
```gitignore
# Logs
*.log
*.pid

# Lock files
.~lock.*

# Credentials
creds
creds.txt

# Build outputs
frontend/build/

# Stale artifacts
*.backup.*
```

---

### Phase 2: Backend Script Organization

**Risk:** Low — moving files, no code logic changes. Scripts are standalone utilities not imported by the application.

#### 2.1 Create Organized Script Directory Structure
```
backend/scripts/
├── debug/          # Debugging & inspection scripts
├── seed/           # Test data creation & seeding
├── fix/            # Data fix & repair scripts
├── migrate/        # Database migration scripts
├── verify/         # Verification & validation scripts
├── admin/          # Administrative utilities (password reset, permissions)
└── archive/        # Historical scripts kept for reference
```

#### 2.2 Move Root-Level Backend Scripts

**To `backend/scripts/debug/` (26 files):**
- `check-all-id-fields.js`, `check-all-pins.js`, `check-balagruha-data.js`
- `check_coins_backend.js`, `check_coins_backend_v2.js`, `check-raw-database.js`
- `check-roles-permissions.js`, `check-student-balagruha-field.js`
- `check-test-data.js`, `check-users-debug.js`, `check-zero-purchase-balagruhas.js`
- `debug_coins.js`, `debug-leaderboard.js`, `debug-leaderboard-full.js`
- `debug-medical-file-urls.js`, `debug_progress_backend.js`, `debug-userId-field.js`
- `explore-database.js`, `direct-db-check.js`
- `investigate-expired-pins.js`, `investigate-wtf-pins.js`, `simple-wtf-check.js`
- `see-order-structure.js`, `list_courses.js`
- `findStudentCoach.js`, `findUserById.js`, `findUserByName.js`

**To `backend/scripts/seed/` (9 files):**
- `create-test-data.js`, `create_coach_user.js`, `createDummyStudent.js`
- `createTestNotifications.js`, `create-test-pins.js`, `generateTestMedia.js`
- `seed-coin-data.js`, `add-coin-transactions.js`
- `add-shop-permissions-for-testing.js`

**To `backend/scripts/fix/` (8 files):**
- `fix-all-coin-records.js`, `fix_progress.js`
- `fix-admin-permissions.js`, `fix_admin_permissions.js`
- `direct-cleanup-expired-pins.js`
- `addCoins.js`, `addShopPermission.js`
- `updateShopModuleName.js`

**To `backend/scripts/admin/` (5 files):**
- `reset-pm-password.js`, `reset-samplet-password.js`
- `set-test-passwords.js`, `unlockUserByEmail.js`
- `assign-orders-to-balagruhas.js`

**To `backend/scripts/verify/` (7 files):**
- `get_quiz_details.js`, `get_quiz_options.js`
- `reset_all_quizzes.js`, `reset_progress.js`
- `simulate_submission.js`, `test-transaction-response.js`
- `update-pr-to-repairs.js`

**To `backend/scripts/migrate/`:** (merge with existing `backend/migrations/`)
- Any migration scripts from `backend/scripts/` that aren't already there

#### 2.3 Move Project Root Utilities
| File | Move To |
|------|---------|
| `/check_coins.js` | `backend/scripts/debug/` |
| `/publish_courses.js` | `backend/scripts/admin/` |
| `/debug_progress.js` | `backend/scripts/debug/` |

#### 2.4 Consolidate Existing backend/scripts/ (51 files)
Reorganize the existing 51 files in `backend/scripts/` into the same subdirectory structure. Many overlap with root-level scripts and should be deduplicated.

#### 2.5 Handle Special Backend Files
| File | Action | Reason |
|------|--------|--------|
| `backend/add student.html` | DELETE or move to frontend | Legacy HTML form, not part of Express app |
| `backend/notes.txt` | REVIEW | Development notes, archive if stale |

---

### Phase 3: Frontend Cleanup

**Risk:** Low-Medium — removing dead code, must verify no imports reference deleted files

#### 3.1 Remove Duplicate Files
```
DELETE: frontend/src/components/PermissionGuard.js     (keep .jsx)
DELETE: frontend/src/hooks/useUserRole.tsx             (keep .js)
DELETE: frontend/src/components/hooks/usePermission.js (stale location)
```

#### 3.2 Remove Dead Code
```
DELETE: frontend/src/AppRoutes.js    (never imported, dead code)
```

#### 3.3 Remove Stale Build & Logs
```
DELETE: frontend/build/              (stale from Feb 19)
DELETE: frontend/dev-server.log
DELETE: frontend/dev-server.pid
DELETE: frontend/frontend.log
```

#### 3.4 Populate Empty Files
```
POPULATE: frontend/README.md         (add basic frontend docs)
POPULATE: frontend/.env.example      (add REACT_APP_API_BASE_URL template)
```

#### 3.5 Plan: Split api.js (Future Story)
The monolithic `frontend/src/api.js` (2,198 lines, 100+ endpoints) should be split into feature modules. This is a code change that warrants its own BMAD story:

```
frontend/src/api/
├── index.js              # Re-exports all, axios instance setup
├── auth.js               # Authentication endpoints
├── users.js              # User management
├── courses.js            # LMS course endpoints
├── quizzes.js            # Quiz & question bank
├── assignments.js        # Assignment endpoints
├── shop.js               # Shop, cart, orders
├── inventory.js          # Inventory & vendors
├── purchaseRequests.js   # Purchase request workflow
├── medical.js            # Medical check-ins, records
├── wtf.js                # Wall of Fame
├── coins.js              # Coin system
├── balagruha.js          # Facility management
├── machines.js           # Machine management
├── sports.js             # Sports tasks
├── attendance.js         # Attendance
├── schedules.js          # Scheduling
├── notifications.js      # Notifications
└── uploads.js            # File upload endpoints
```

**This should be created as a BMAD story for a future sprint.**

---

### Phase 4: Documentation Consolidation

**Risk:** None — moving/organizing documentation files only

#### 4.1 Move Completion Reports to _bmad-output/
| File | Move To |
|------|---------|
| `/ORM_STANDARDIZATION_COMPLETE.md` | `_bmad-output/sprint-2-code-quality/` |
| `/CONSOLE_LOG_CLEANUP_SUMMARY.md` | `_bmad-output/sprint-2-code-quality/` |
| `/SECURITY_CLEANUP_COMPLETION_REPORT.md` | `_bmad-output/sprint-2-code-quality/` |
| `/SPRINT_2_CODE_QUALITY_COMPLETION_REPORT.md` | `_bmad-output/sprint-2-code-quality/` |
| `/TEST_RESULTS_STORY_1_1.md` | `_bmad-output/sprint-2-code-quality/` |
| `/FINAL_TEST_RESULTS.md` | `_bmad-output/sprint-2-code-quality/` |
| `/FINAL_TEST_VERIFICATION.md` | `_bmad-output/sprint-2-code-quality/` |
| `/RBAC_AUDIT_REPORT.md` | `_bmad-output/sprint-2-code-quality/` |
| `/RBAC_FIX_SUMMARY.md` | `_bmad-output/sprint-2-code-quality/` |
| `/RBAC-SCOPE-TEST-REPORT.md` | `_bmad-output/sprint-2-code-quality/` |

#### 4.2 Archive Historical Data Files
| File | Action |
|------|--------|
| `/fixes-combined-2026-02-24.csv` | Move to `_bmad-output/archives/` |
| `/fixes-combined-2026-02-24.xlsx` | Move to `_bmad-output/archives/` |
| `/Coach view feedback for Tony.pdf` | Move to `_bmad-output/archives/` |

#### 4.3 Consolidate Root Documentation
After cleanup, the project root should contain only:
```
ISF_Playground/
├── CLAUDE.md                    # Agent instructions (KEEP)
├── AGENTS.md                    # Agent config reference (KEEP)
├── README.md                    # Project description (KEEP, expand)
├── project-context.md           # Full project context (KEEP)
├── devnotes.md                  # Dev notes (KEEP or move to docs/)
├── package.json                 # Root Electron config
├── package-lock.json
├── main.js                      # Electron entry
├── preload.js                   # Electron preload
├── .gitignore
├── ISF_Playground.code-workspace
├── backend/                     # Express API
├── frontend/                    # React app
├── scripts/                     # Project-level scripts
├── _bmad/                       # BMAD framework
├── _bmad-output/                # BMAD generated artifacts
├── .agent/                      # Antigravity IDE commands
├── .claude/                     # Claude Code commands
└── .gemini/                     # Gemini IDE commands
```

**Target: ~15 files at root (down from 46+)**

#### 4.4 Update project-context.md
After reorganization, regenerate project context to reflect the new structure using `/bmad-bmm-generate-project-context`.

---

## Impact Summary

| Metric | Before | After |
|--------|--------|-------|
| Root-level files | 46+ | ~15 |
| Backend root scripts | 60+ | 0 (moved to scripts/) |
| Stale test artifacts | 12 | 0 |
| Credential exposure | 2 files | 0 |
| Log files in repo | 8+ | 0 |
| Frontend duplicates | 3 sets | 0 |
| Dead frontend code | 1 file | 0 |
| Completion reports at root | 10 | 0 (moved to _bmad-output/) |
| BMAD old structure files | 450+ | 0 (committed deletion) |

---

## Execution Order

1. **Phase 1** — Immediate cleanup (commit staged deletions, remove stale/dangerous files)
2. **Phase 4** — Documentation consolidation (move reports, archive data files)
3. **Phase 2** — Backend script organization (create directories, move scripts)
4. **Phase 3** — Frontend cleanup (remove duplicates, dead code, stale builds)
5. **Post-cleanup** — Regenerate project context, re-index jcodemunch/jdocmunch

Each phase should be its own git commit for easy rollback if needed.

---

## Future BMAD Stories to Create

These are code-level improvements identified during the audit that should be tracked as proper BMAD stories:

1. **Split frontend/src/api.js** — Break 2,198-line monolith into feature modules
2. **Consolidate frontend styling** — Decide between Tailwind-only vs CSS modules hybrid
3. **Increase frontend test coverage** — Currently ~5% (11 tests for 203 components)
4. **API v1 deprecation** — Plan migration from v1 routes to v2
5. **Dual drag-and-drop cleanup** — Project uses both @dnd-kit and @hello-pangea/dnd
6. **Dual icon library cleanup** — Project uses both FontAwesome (4 packages) and Lucide
