# Story 7.3: Frontend Code Quality Scan

Status: ready-for-dev

## Story

As a Dev,
I want to scan the frontend codebase for code quality issues (console.logs, TODOs, dead imports, old api.js paths, inline styles),
so that we have a prioritized cleanup list before building Sprint 2 features.

## Acceptance Criteria

1. **Given** the backend had 173 console.logs cleaned in Epic 6
   **When** Dev scans `frontend/src/` for console.log statements
   **Then** a count and file list of all console.log occurrences in production code is produced
   **And** debug artifacts (hardcoded strings, test data) are flagged separately

2. **Given** the api.js monolith was split into 17 feature modules
   **When** Dev scans for imports still using the old monolithic path
   **Then** any components importing from `../api.js` or `../../api.js` (old path) instead of `../api/<module>` (new path) are listed
   **And** the completeness of the API split migration is assessed

3. **Given** TODOs and dead imports exist
   **When** Dev scans for TODO/FIXME/HACK comments and unused imports
   **Then** all occurrences are listed with file paths and line numbers
   **And** severity is assessed (security-relevant vs cosmetic)

## Tasks / Subtasks

- [ ] Task 1: Console.log scan (AC: #1)
  - [ ] `grep -rn "console.log\|console.warn\|console.error" frontend/src/ --include="*.js" --include="*.jsx" | wc -l`
  - [ ] Get full list with file paths
  - [ ] Exclude test files (`__tests__/`)
  - [ ] Flag any that log user data, tokens, or PII

- [ ] Task 2: API import migration check (AC: #2)
  - [ ] `grep -rn "from.*['\"].*api['\"]" frontend/src/ --include="*.js" --include="*.jsx" | grep -v "api/" | head -30`
  - [ ] Check: are components importing from old `api.js` or new `api/<module>.js`?
  - [ ] List any files still using old import paths
  - [ ] Verify all 17 API modules are actually imported somewhere

- [ ] Task 3: TODO/FIXME/dead imports scan (AC: #3)
  - [ ] `grep -rn "TODO\|FIXME\|HACK\|XXX" frontend/src/ --include="*.js" --include="*.jsx"`
  - [ ] Check for unused imports (components imported but never used in JSX)
  - [ ] Check for commented-out code blocks (>5 lines)

- [ ] Task 4: Inline style scan (AC: #1)
  - [ ] `grep -rn "style={{" frontend/src/ --include="*.jsx" | wc -l`
  - [ ] Count inline styles vs Tailwind className usage
  - [ ] Flag any hardcoded color hex values not using design tokens

- [ ] Task 5: Produce quality report (AC: #1, #2, #3)
  - [ ] Save to `_bmad-output/implementation-artifacts/evaluation-reports/frontend-code-quality.md`
  - [ ] Prioritize findings: security > functionality > cosmetic

## Dev Notes

### Critical Constraints

- **DO NOT modify any files** — scan and report only
- **Exclude node_modules, build, and test files** from all scans
- **Old api.js path** — the monolith was at `frontend/src/api.js`, new modules are in `frontend/src/api/`

### References

- [Source: project-context.md#Section 5 — Frontend Structure]
- [Source: _bmad-output/implementation-artifacts/sprint-6/6-1-credential-security-cleanup.md — backend equivalent]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
