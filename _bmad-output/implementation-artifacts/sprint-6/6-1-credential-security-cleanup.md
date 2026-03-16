# Story 6.1: Credential & Security Cleanup

Status: ready-for-dev

## Story

As a Dev,
I want to remove all hardcoded credentials, console.log statements, and TODO/FIXME comments from the codebase,
so that no secrets are exposed in source control and production logs are clean.

## Acceptance Criteria

1. **Given** `backend/scripts/fix_admin_scope.js` contains hardcoded MongoDB Atlas credentials (username `admin`, password `admin0987`)
   **When** Dev replaces the hardcoded URI with `process.env.MONGO_URI`
   **Then** zero hardcoded MongoDB connection strings remain in any script file
   **And** all 15+ scripts in `backend/scripts/` use environment variables for database connections

2. **Given** 173 `console.log` statements exist in production code including debug artifacts and user data logging in auth middleware
   **When** Dev removes or replaces them with structured logging (existing @logtail/pino)
   **Then** zero `console.log` statements remain in `backend/controllers/`, `backend/routes/`, `backend/middleware/`, and `backend/services/`
   **And** auth middleware does NOT log user credentials, tokens, or PII
   **And** scripts in `backend/scripts/` may retain console.log for CLI output

3. **Given** 12 TODO/FIXME comments remain in the codebase including 1 security-relevant in wtf.js
   **When** Dev triages each: resolve, convert to backlog item, or remove with justification
   **Then** zero unresolved TODO/FIXME comments remain in production code
   **And** any converted to backlog are documented

## Tasks / Subtasks

- [ ] Task 1: Fix hardcoded credentials (AC: #1)
  - [ ] Replace hardcoded MongoDB URI in `backend/scripts/fix_admin_scope.js` with `process.env.MONGO_URI`
  - [ ] Scan ALL files in `backend/scripts/` for hardcoded URIs (11 files flagged)
  - [ ] Replace each with `process.env.MONGO_URI` or `require('dotenv').config()` + env var
  - [ ] Verify `.env.example` documents required `MONGO_URI` variable
  - [ ] Grep verify: `grep -r "mongodb+srv" backend/scripts/` returns empty
  - [ ] Check git history: note if credentials were in previous commits (for password rotation advisory)

- [ ] Task 2: Remove console.log from production code (AC: #2)
  - [ ] Run `grep -rn "console.log" backend/controllers/ backend/routes/ backend/middleware/ backend/services/` to get full list
  - [ ] Remove debug artifacts (e.g., `"abccc"` in taskController)
  - [ ] Remove user data logging in auth middleware (security risk)
  - [ ] Replace any legitimate logging needs with existing @logtail/pino logger
  - [ ] Leave console.log in `backend/scripts/` (CLI tools)
  - [ ] Run tests after removal: `cd backend && npx jest --verbose`

- [ ] Task 3: Triage TODO/FIXME comments (AC: #3)
  - [ ] Run `grep -rn "TODO\|FIXME\|HACK\|XXX" backend/ frontend/src/` to get full list
  - [ ] For each: resolve inline, convert to documented backlog item, or remove with justification
  - [ ] Pay special attention to security-relevant TODO in wtf.js
  - [ ] Document all decisions in completion notes

- [ ] Task 4: Test password cleanup (AC: #1)
  - [ ] Check `backend/scripts/admin/set-test-passwords.js` and `reset-*-password.js` for hardcoded passwords
  - [ ] Replace with env vars or parameterized inputs where possible

## Dev Notes

### Files Flagged by Evaluation

**Hardcoded credentials (11 files):**
- `backend/scripts/fix_admin_scope.js` — CRITICAL: production Atlas URI with password
- `backend/scripts/admin/set-test-passwords.js`
- `backend/scripts/verify/test-login.js`
- `backend/scripts/verify/test-rbac-scope.js`
- `backend/scripts/verify_coach_api.js`
- `backend/scripts/seedShopProducts.js`
- `backend/scripts/reset-pm-password.js`
- `backend/scripts/reset-samplet-password.js`
- `backend/scripts/create_coach_user.js`

### Critical Constraints

- **DO NOT commit credentials** — if any are found, replace with env vars
- **Auth middleware logging is a security risk** — remove ALL user data from logs
- **Run tests after every batch of changes** — console.log removal could mask test setup issues
- **Password rotation advisory:** Note in completion notes that Atlas password should be rotated if it was ever in git history

### References

- [Source: sprint-6-evaluation-summary.md#C1, H2, M2, M5, L5]
- [Source: dev-code-review-report.md — full findings]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
