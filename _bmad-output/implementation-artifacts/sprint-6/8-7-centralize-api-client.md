# Story 8.7: Centralize API Client Usage

Status: ready-for-dev

## Story

As a Dev,
I want to migrate the 12 files that bypass the centralized API client (direct axios imports with manual token handling) to use the standard API modules,
so that all HTTP requests go through the interceptor chain (token refresh, error handling, base URL).

## Acceptance Criteria

1. **Given** 12 files make direct axios calls with `localStorage.getItem('token')` instead of using `frontend/src/api/` modules
   **When** Dev migrates each to use the centralized API client
   **Then** zero files import axios directly outside of the `api/` module directory
   **And** all HTTP requests use the centralized interceptors for auth token, error handling, and base URL

2. **Given** migration is complete
   **When** Dev tests the affected features
   **Then** all features work correctly through the centralized API client
   **And** frontend tests pass

## Tasks / Subtasks

- [ ] Task 1: Identify all direct axios imports (AC: #1)
  - [ ] `grep -rn "import axios\|require.*axios" frontend/src/ --include="*.js" --include="*.jsx" | grep -v "src/api/"` — find files bypassing centralized client
  - [ ] List each file with the API calls it makes
  - [ ] Map each call to the corresponding API module function (or identify if one needs to be created)

- [ ] Task 2: Migrate each file (AC: #1)
  - [ ] For each of the 12 files:
    - [ ] Replace direct axios import with import from appropriate `api/<module>.js`
    - [ ] Replace manual `localStorage.getItem('token')` header setting with centralized interceptor
    - [ ] If no API module function exists for the call, add it to the appropriate module
  - [ ] Verify each feature still works after migration

- [ ] Task 3: Verify (AC: #2)
  - [ ] `grep -rn "import axios" frontend/src/ --include="*.js" --include="*.jsx" | grep -v "src/api/"` — should return zero
  - [ ] Run frontend tests

## Dev Notes

### API Module Structure

```
frontend/src/api/
├── index.js           ← centralized axios instance with interceptors
├── auth.js
├── users.js
├── shop.js
├── ... (17 modules total)
└── machines.js        ← added in Sprint 6
```

### Critical Constraints

- **Don't break features** — migrate one file at a time, test each
- **Add missing API functions** if the centralized module doesn't have the needed endpoint
- **The centralized client handles:** base URL, auth token injection, token refresh, error interceptors

### References

- [Source: frontend-evaluation-summary.md#FH5, FM10]
- [Source: frontend-architecture-audit.md — API usage analysis]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
