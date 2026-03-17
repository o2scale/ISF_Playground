# Story 7.1: Component & Page Inventory

Status: ready-for-dev

## Story

As a Dev,
I want to produce a complete inventory of all frontend components, pages, hooks, and stores with usage mapping,
so that we know what exists, what's actively used, and what's dead code.

## Acceptance Criteria

1. **Given** `frontend/src/` contains components, pages, hooks, stores, and API modules
   **When** Dev scans the entire frontend source tree
   **Then** a complete inventory is produced listing every .jsx and .js file with its category (component/page/hook/store/api/util)
   **And** total counts per category are reported

2. **Given** the inventory exists
   **When** Dev traces imports from App.js and page files through the component tree
   **Then** each component is classified as: actively imported, transitively imported, or unused (dead code)
   **And** unused components are listed with file paths and sizes

3. **Given** the usage map exists
   **When** Dev maps pages to their component dependencies
   **Then** a page-to-component dependency table shows which components each page uses
   **And** shared components (used by 3+ pages) are identified as core reusable components

## Tasks / Subtasks

- [ ] Task 1: Scan frontend source tree (AC: #1)
  - [ ] Count all .jsx and .js files in `frontend/src/`
  - [ ] Categorize: components/ (by domain subfolder), pages/, hooks/, store/, api/, utils, other
  - [ ] Report totals per category and per domain subfolder
  - [ ] List the largest files (>200 lines) — potential god components

- [ ] Task 2: Trace import tree (AC: #2)
  - [ ] Start from `App.js` — trace all route imports to pages
  - [ ] From each page, trace component imports recursively
  - [ ] Identify components that are NEVER imported by any page or other component
  - [ ] List dead components with file paths, line counts, and last git modification date

- [ ] Task 3: Build page-to-component dependency map (AC: #3)
  - [ ] For each page in `frontend/src/pages/`, list all components it imports
  - [ ] Identify shared components (imported by 3+ pages)
  - [ ] Identify single-use components (imported by exactly 1 page)
  - [ ] Note any circular imports

- [ ] Task 4: Produce inventory report (AC: #1, #2, #3)
  - [ ] Save to `_bmad-output/implementation-artifacts/evaluation-reports/frontend-component-inventory.md`
  - [ ] Include: total counts, category breakdown, dead component list, dependency map, shared components

## Dev Notes

### Frontend Structure (expected from project-context.md)

```
frontend/src/
├── components/          ← domain-organized (admin/, shop/, coach/, student/, etc.)
├── pages/               ← page components as default exports
├── hooks/               ← custom hooks (usePermission, use-toast, etc.)
├── store/               ← Zustand stores
├── api/                 ← 17 feature modules (split from monolithic api.js)
├── App.js               ← Route definitions
├── config.js            ← Non-sensitive configuration
└── __tests__/           ← Component tests
```

### Critical Constraints

- **DO NOT modify any files** — this is inventory only
- **Trace from App.js** — that's the entry point for all routes/pages
- **Check for lazy-loaded components** — `React.lazy()` or dynamic imports may hide usage
- **api.js split verification** — check if old monolithic api.js import paths still exist anywhere

### References

- [Source: project-context.md#Section 5 — Frontend Structure]
- [Source: _bmad-output/ux-design-specification.md — component patterns]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
