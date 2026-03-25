# Recursive Verification Framework — ISF Playground

## Why This Exists

Single-pass AI fixes fail on large codebases because:
1. **Context blindness** — the agent can't hold the full codebase in context, so it fixes what it sees
2. **Fix-in-isolation** — a fix that looks correct in one file may break or miss the connected file
3. **Status vs Reality** — marking a story "done" doesn't mean the feature works end-to-end
4. **Data flow gaps** — the fix patches the API but the frontend reads a different field name
5. **Implicit dependencies** — RBAC, populated ObjectIds, status enums, field naming conventions

The solution is **recursive verification**: run multiple passes with increasing depth, where each pass feeds its findings into the next, until a pass finds zero new issues.

## Token Efficiency — MCP Tool Strategy

**CRITICAL:** This framework is designed for repeated execution. Token efficiency is paramount. All code review passes MUST use MCP tools instead of reading full files.

### jCodeMunch (code symbols)

Use for ALL code investigation in Passes 2, 3, and 5. Never `Read` a full source file when a symbol lookup will do.

| Task | Tool | Example |
|------|------|---------|
| Check if project is indexed | `list_repos` | Call first — if stale, `index_folder` |
| Re-index after fixes | `index_file { path: "backend/controllers/lms/student/lifeSkillsController.js" }` | After editing a file |
| Find a function | `search_symbols { repo, query: "handleApprove" }` | Instead of grepping |
| Read ONE function | `get_symbol { repo, symbol_id: "..." }` | Instead of reading entire 2000-line file |
| Read multiple functions | `get_symbols { repo, symbol_ids: [...] }` | Batch — one call for N symbols |
| See file structure | `get_file_outline { repo, file_path: "..." }` | See all functions/exports without reading body |
| Compare two files | `get_file_outline` on both, then `get_symbol` on specific functions | Instead of reading both full files |
| Find who calls a function | `find_references { repo, identifier: "addCoins" }` | Find all coin award sites |
| Find imports of a file | `find_importers { repo, file_path: "models/coin.js" }` | Trace dependencies |
| Check blast radius of change | `get_blast_radius { repo, file_path: "..." }` | Before fixing, see what else is affected |
| Full text search | `search_text { repo, query: "pending_approval" }` | Find all status checks across codebase |

**Workflow for code review agents:**
```
1. list_repos → get repo ID (or index_folder if stale)
2. get_file_outline → see all symbols in file (costs ~50 tokens vs ~2000 for full read)
3. get_symbol → read ONLY the function that matters (~100-300 tokens)
4. find_references → trace who calls it (~50 tokens per result)
5. search_text → find patterns across codebase (~20 tokens per match)
```

### jDocMunch (documentation sections)

Use for looking up Sprint 6 stories, epics, specs, and any doc references. Never read full doc files.

| Task | Tool | Example |
|------|------|---------|
| Check if docs indexed | `list_repos` | Call first |
| Index project docs | `index_local { path: "/data/home/dev/Desktop/dev/ISF_Playground/_bmad-output" }` | One-time |
| Find a story | `search_sections { repo, query: "coin award" }` | Instead of reading full epic file |
| Read specific section | `get_section { repo, section_id: "..." }` | Read just what's needed |
| Browse all stories | `get_toc { repo }` | See all sections at a glance |

### Token Budget per Pass

| Pass | Without MCP | With MCP | Savings |
|------|------------|----------|---------|
| Pass 2 (field alignment) | ~80K tokens (reading full files) | ~15K tokens (symbol lookups) | **80%** |
| Pass 3 (state machines) | ~60K tokens | ~12K tokens | **80%** |
| Pass 5 (cross-domain) | ~100K tokens | ~20K tokens | **80%** |
| Pass 1, 4 | No change (runtime, curl/playwright) | No change | — |

## Domains

Sprint 6 delivered across 5 domains. Each domain is a verification unit.

### Domain 1: LMS (Epics 12, 15)
**Scope:** Student courses, quiz submissions, coin awards, coach grading, coach assignments, course publishing, content management, translations
**Backend:** `controllers/lms/student/*`, `controllers/lms/admin/*`, `controllers/lms/coach/*`, `models/course.js`, `models/coin.js`, `models/Submission.js`, `models/StudentProgress.js`, `models/CourseAssignment.js`
**Frontend:** `pages/student/*`, `pages/admin/CourseStructureBuilder.jsx`, `pages/admin/AdminCourseDashboard.jsx`, `pages/admin/TranslationDashboard.jsx`, `pages/coach/GradingDashboard.jsx`, `components/coach/CoachAssignmentsView.jsx`
**E2E:** `e2e/student/*.spec.js`, `e2e/admin/course-management.spec.js`, `e2e/admin/content-quiz.spec.js`, `e2e/coach/*.spec.js`

### Domain 2: Shop & Purchase (Epic 13)
**Scope:** Product CRUD, inventory, vendors, purchase requests, approval workflow, PM dashboard, shop storefront, cart, orders
**Backend:** `controllers/adminProductController.js`, `controllers/purchaseRequestController.js`, `controllers/shopController.js`, `controllers/vendorController.js`, `controllers/purchaseDashboard.js`, `models/shopItem.js`, `models/purchaseRequest.js`, `models/order.js`
**Frontend:** `components/purchaseManagement/**`, `components/shop/**`, `pages/admin/ProductManagement.jsx`, `pages/TransactionReports.jsx`
**E2E:** `e2e/admin/purchase-approval.spec.js`, `e2e/admin/shop-management.spec.js`, `e2e/student/coin-economy.spec.js`

### Domain 3: RBAC & Auth (Epics 2, 10)
**Scope:** Role permissions, route guards (backend + frontend), authentication flow, scope filtering, data isolation
**Backend:** `middleware/auth.js`, `middleware/authorize.js`, `scripts/setupDefaultRoles.js`, `models/role.js`
**Frontend:** `components/ProtectedRoute.jsx`, `components/Layout.js` (sidebar filtering), `App.js` (route guards)

### Domain 4: Machine & Attendance (Epic 3)
**Scope:** Machine CRUD, balagruha assignment, usage logs, attendance
**Backend:** `controllers/machineController.js`, `models/Machine.js`
**Frontend:** `pages/admin/MachineManagement.jsx`, `components/MachineList.jsx`
**E2E:** `e2e/admin/machine-management.spec.js`

### Domain 5: Frontend Infrastructure (Epics 7, 8)
**Scope:** Error boundaries, dead code, console logs, API client, accessibility, design system
**Frontend:** All components — cross-cutting concerns

---

## Verification Passes

Each pass has a specific purpose, increasing in depth. Run them in order. A pass is "clean" when it finds zero new issues.

### Pass 1: API Contract Verification (Backend-only, fast)

**Purpose:** Verify every API endpoint returns the correct data shape for every role.

**Agent prompt template:**
```
You are verifying API contracts for the [DOMAIN] domain in ISF_Playground.
Backend is running on :5001.

For each endpoint listed below:
1. Login as the appropriate role (admin/coach/student/PM)
2. Call the endpoint with curl
3. Check: does it return 200? Is the response shape correct?
4. Check: does the role have RBAC access? Try with a role that SHOULDN'T have access — confirm 403.
5. Check: are field names consistent? (e.g., title vs courseTitle, _id vs id)

Test credentials:
- Admin: {"email":"admin@gmail.com","password":"test123"}
- Coach: {"email":"coach@gmail.com","password":"test123"}
- Student: {"userId":"1234","password":"test123"}
- PM: {"email":"purchase@gmail.com","password":"password123"}

Endpoints to verify:
[LIST ENDPOINTS FOR DOMAIN]

For each endpoint, report:
- PASS: [endpoint] — [role] — [status code] — [response shape summary]
- FAIL: [endpoint] — [role] — [expected vs actual]
- RBAC_FAIL: [endpoint] — [role that should be blocked] — [got 200 instead of 403]
```

**Domain 1 endpoints:**
- GET /api/v2/lms/admin/courses
- GET /api/v2/lms/admin/courses?status=published
- GET /api/v2/lms/admin/courses/:id
- PUT /api/v2/lms/admin/courses/:id/publish
- GET /api/v2/lms/student/:id/dashboard
- POST /api/v2/lms/student/:id/courses/:type/quiz/submit
- GET /api/v2/lms/coach/assignments
- POST /api/v2/lms/coach/assignments
- GET /api/v2/lms/coach/grading/submissions
- POST /api/v2/lms/coach/grading/:id
- GET /api/v2/lms/coach/reports/course/:courseId
- POST /api/v2/lms/coach/coins/awards

**Domain 2 endpoints:**
- GET /api/v2/shop/admin/products
- POST /api/v2/shop/admin/products
- GET /api/v2/shop/admin/purchase-requests
- POST /api/v2/shop/admin/purchase-requests
- PUT /api/v2/shop/admin/purchase-requests/:id/approve
- PUT /api/v2/shop/admin/purchase-requests/:id/reject
- GET /api/v2/shop/admin/reports/transactions
- GET /api/v2/vendors
- GET /api/v2/shop/storefront
- POST /api/v2/shop/orders
- GET /api/v2/shop/orders/my

**Domain 3 endpoints:**
- POST /api/auth/login (all 4 roles)
- GET /api/v2/roles (admin only)
- Verify 403 on cross-role access for 5+ endpoints

### Pass 2: Frontend-Backend Field Alignment (Code review via jCodeMunch, no runtime)

**Purpose:** Verify that the frontend reads the exact field names the backend sends. This is where most "invisible" bugs hide.

**Token strategy:** Use `get_symbol` to read only the response-building section of backend controllers and only the data-consuming section of frontend components. Never read full files.

**Agent prompt template:**
```
You are verifying field name alignment between frontend and backend for the [DOMAIN] domain.

IMPORTANT: Use jCodeMunch MCP tools for ALL code lookups. Do NOT read full files.

Setup:
1. Call list_repos to get the repo ID
2. If the index is stale, call index_folder with /data/home/dev/Desktop/dev/ISF_Playground

For each feature flow:
1. Use search_symbols to find the backend controller function (e.g., "getAllCourses")
2. Use get_symbol to read ONLY that function — note the EXACT field names in res.json()
3. Use search_symbols to find the frontend component that calls this API
4. Use get_symbol to read ONLY the fetch/useEffect/data-mapping function
5. Use search_text to find the exact API URL string to confirm they match
6. Flag any field name mismatch

Known patterns that cause bugs:
- Backend sends `courseTitle`, frontend reads `title`
- Backend sends `data.requests`, frontend reads `data` as array directly
- Backend sends populated object `{ _id, name }`, code calls `.toString()` expecting string
- Backend sends `status: 'pending'`, frontend checks `status === 'pending_approval'`
- Backend wraps in `{ success, data }`, frontend reads `response.data.data` vs `response.data`

For each mismatch found, report:
- MISMATCH: [feature] — backend sends [field] via get_symbol [symbol_id] — frontend reads [field] via get_symbol [symbol_id]
- IMPACT: [what the user sees]
```

### Pass 3: State Machine & Workflow Verification (Code review via jCodeMunch)

**Purpose:** Verify that status transitions, conditional UI, and workflow gates are consistent across the stack.

**Token strategy:** Use `search_text` to find all status enum definitions and status checks across the codebase in one sweep. Use `get_symbol` only for the specific transition functions.

**Agent prompt template:**
```
You are verifying state machines and workflow logic for the [DOMAIN] domain.

IMPORTANT: Use jCodeMunch MCP tools for ALL code lookups. Do NOT read full files.

Setup:
1. Call list_repos to get the repo ID

For each entity with status (Course, PurchaseRequest, Order, Submission):
1. Use search_text { query: "enum.*status|status.*enum" } to find status definitions in models
2. Use get_symbol on the model to read the schema status field and its enum values
3. Use search_text { query: "PENDING_APPROVAL|pending_approval" } to find ALL references across the codebase
4. Use get_symbol on each controller transition function (approve, reject, publish, etc.)
5. Use search_text to find frontend conditional checks: "request.status ===|status ===|PurchaseRequestStatuses"
6. Use get_symbol on frontend handler functions that render conditional buttons
7. Cross-reference: does frontend handle EVERY status the model defines?

Also use:
- find_references { identifier: "PurchaseRequestStatuses" } to find all frontend status usage
- search_text { query: "normalizedRole.*UserTypes" } to find all role-conditional rendering
- get_blast_radius on model files to see what depends on the status field

Known patterns that cause bugs:
- Model defines 'pending' and 'pending_approval' but frontend only checks one
- Threshold-based routing creates paths the UI doesn't handle
- Conditional buttons check status but not role, or vice versa

Report format:
- STATUS_GAP: [entity] — [status] in model but not handled in [component] (found via search_text)
- TRANSITION_BUG: [entity] — [from → to] — backend allows but frontend doesn't trigger
- ROLE_GAP: [entity] — [action] for [role] in backend but hidden in frontend
```

### Pass 4: E2E Test Execution (Runtime)

**Purpose:** Run every E2E test. For failures, categorize and fix.

**Agent prompt template:**
```
Run ALL E2E tests for the [DOMAIN] domain. Servers must be running.

cd /data/home/dev/Desktop/dev/ISF_Playground/frontend

[DOMAIN-SPECIFIC SPEC FILES]

For each failure:
1. Read the error output
2. Categorize: SELECTOR_DRIFT | REAL_BUG | MISSING_DATA | DEFERRED
3. For SELECTOR_DRIFT: fix the spec file
4. For REAL_BUG: trace to root cause, fix the source
5. For MISSING_DATA: document what needs seeding
6. For DEFERRED: re-fixme with comment

Report: test name — category — fix applied or reason deferred
```

### Pass 5: Cross-Domain Integration (Runtime + jCodeMunch for root cause tracing)

**Purpose:** Verify flows that cross domain boundaries.

**Token strategy:** Execute flows via curl (runtime). When a step fails, use jCodeMunch to trace the root cause across files WITHOUT reading full files. Use `find_importers` and `find_references` to trace data flow across domains.

**Key cross-domain flows:**
1. Admin creates course → Coach assigns → Student takes quiz → Coins awarded → Coach grades
2. Admin creates product → PM creates purchase request → Admin approves → PM marks ordered
3. Student shops → Order created → PM sees order → PM fulfills
4. Coach requests shop item → PM receives request → Approval flow
5. RBAC changes → All roles re-tested for correct access

**Agent prompt template:**
```
You are testing cross-domain integration flows in ISF_Playground.
Backend is running on :5001.

IMPORTANT: Use jCodeMunch MCP tools for root cause tracing. Do NOT read full files.

For each flow:
1. Execute step by step via API calls (curl with role-appropriate tokens)
2. Verify each step succeeds and returns expected data
3. Verify the NEXT step can see the data from the PREVIOUS step
4. Verify role transitions work (admin action visible to coach, coach action visible to student)

If any step fails:
1. Use search_symbols to find the controller function for the failing endpoint
2. Use get_symbol to read ONLY that function
3. Use find_references on the data field that's missing to trace where it's set
4. Use find_importers on the model to see who populates it
5. Use get_blast_radius to understand what else the fix might affect

Test credentials:
- Admin: {"email":"admin@gmail.com","password":"test123"} — token in response.data.token
- Coach: {"email":"coach@gmail.com","password":"test123"}
- Student: {"userId":"1234","password":"test123"}
- PM: {"email":"purchase@gmail.com","password":"password123"}

Report format per flow:
FLOW: [name]
Step 1: [action] — PASS/FAIL — [details]
Step 2: [action] — PASS/FAIL — [details]
...
ROOT CAUSE (if failed): [traced via get_symbol/find_references to file:line]
```

---

## Execution Protocol

### How to Run a Full Cycle

```
CYCLE N (where N starts at 1)

1. Run Pass 1 (API contracts) for all 5 domains — 5 sequential agents
   └── Collect: FAIL list

2. Fix all Pass 1 failures
   └── Commit fixes

3. Run Pass 2 (field alignment) for all 5 domains — 5 sequential agents
   └── Collect: MISMATCH list

4. Fix all Pass 2 mismatches
   └── Commit fixes

5. Run Pass 3 (state machines) for all 5 domains — 5 sequential agents
   └── Collect: STATUS_GAP, TRANSITION_BUG, ROLE_GAP lists

6. Fix all Pass 3 issues
   └── Commit fixes

7. Run Pass 4 (E2E tests) for all domains — sequential per domain
   └── Collect: failures by category

8. Fix SELECTOR_DRIFT and REAL_BUG from Pass 4
   └── Commit fixes

9. Run Pass 5 (cross-domain integration) — 1 agent
   └── Collect: cross-domain failures

10. Fix Pass 5 issues
    └── Commit fixes

11. CYCLE N REPORT:
    - Issues found per pass
    - Issues fixed
    - Issues deferred (with reason)
    - Total: X found, Y fixed, Z remaining

12. IF Z > 0: CYCLE N+1 (repeat from step 1)
    IF Z == 0: VERIFICATION COMPLETE
```

### When to Stop

A verification cycle is **clean** when:
- Pass 1: 0 API failures
- Pass 2: 0 field mismatches
- Pass 3: 0 status gaps
- Pass 4: 0 real bug failures (selector fixes and deferred are OK)
- Pass 5: 0 cross-domain failures

Two consecutive clean cycles = **verified**.

---

## Quick-Run Mode

For targeted verification after fixing specific bugs, run only the relevant passes:

```bash
# After fixing a backend controller:
→ Run Pass 1 (API) + Pass 2 (field alignment) for that domain only

# After fixing frontend rendering:
→ Run Pass 4 (E2E) for that domain only

# After fixing RBAC/permissions:
→ Run Pass 1 (API) for Domain 3 + Pass 5 (cross-domain)

# After fixing status/workflow logic:
→ Run Pass 3 (state machines) + Pass 5 (cross-domain)
```

---

## Findings Log

Each cycle appends findings here. This is the living record.

### Cycle 0 — Pre-framework (manual investigation, 2026-03-24)

**Pass 1 equivalent (API testing):**
- A-4: API works (5 published courses returned) — NOT a code bug
- A-9s: API works (reports returned) — NOT a code bug
- S-1: API works (5 courses with courseTitle) — field name concern
- P-1: API works (5 vendors returned) — NOT a code bug

**Pass 2 equivalent (field alignment):**
- S-1: Backend sends `courseTitle`, need to verify frontend reads correct field

**Pass 3 equivalent (state machines):**
- A-2: Purchase requests in `pending` status — threshold-based auto-skip of approval. Frontend checks `pending_approval` for approve buttons. NOT a bug — design decision. Needs requirements clarification.

**Deep investigation findings (4 agents, 2026-03-24):**
- A-8: Backend validation `.notEmpty()` vs all other layers treating SKU as optional → FIXED (e25b96a8)
- S-9/S-10: lifeSkillsController missing `passed && !alreadyPassed` guard → FIXED (e25b96a8)
- C-4/C-8: Populated ObjectId `.toString()` returning `[object Object]` → FIXED (e25b96a8)
- A-2: Working as designed (threshold routing) → needs requirements decision
- C-2: Missing feature (no coach course page) → needs new development
