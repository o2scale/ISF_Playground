---
name: e2e-user-flow-testing
description: >
  Orchestrator + subagent workflow for browser-based E2E user flow testing
  across all ISF Playground user roles. The orchestrator reads the status file,
  dispatches one subagent per user, and each subagent runs to completion before
  the next is dispatched. All handoff state lives in the status file.
autonomous: true
human_input_required: false
---

# E2E User Flow Testing — Workflow

## Architecture

```
ORCHESTRATOR (main agent)
  ├── reads e2e-user-flow-status.md
  ├── determines next pending user
  ├── dispatches SUBAGENT for that user
  │     └── subagent tests all flows for one user
  │     └── subagent fixes bugs it finds
  │     └── subagent updates status file
  │     └── subagent commits fixes
  │     └── subagent returns DONE/BLOCKED
  ├── orchestrator reads updated status
  ├── dispatches next subagent
  └── repeats until all users DONE
```

## Orchestrator Instructions

The orchestrator agent:
1. Reads `docs/qa/context/e2e-user-flow-status.md`
2. Finds the first user row with status `IN PROGRESS` or `PENDING`
3. Dispatches a subagent with the prompt template below (filled in for that user)
4. When the subagent returns, reads the updated status file
5. Repeats until all users show `DONE`
6. Does NOT test anything directly — only coordinates

### Subagent Dispatch Prompt Template

```
You are an E2E testing subagent for the ISF Playground app.

Your job: test ALL flows for ONE user role, fix every bug you find, and update
the shared status file when done.

TARGET USER: {ROLE_NAME} ({EMAIL} / {PASSWORD})

REQUIRED READING (do this first, do not skip):
1. Read docs/qa/context/e2e-user-flow-workflow.md — full techniques and conventions
2. Read docs/qa/context/e2e-user-flow-status.md — find the section for {ROLE_NAME}
   and continue from the first flow marked NEXT or PENDING

RULES:
- Run fully autonomously. Do not ask questions or pause for confirmation.
- Test every flow in the user's section of the status file.
- If a flow has a bug: diagnose root cause, fix it, re-test to confirm.
- After every flow (pass or fail) update the status file immediately.
- Commit bug fixes to branch `stable` when you finish the user's section.
- Mark the user DONE in the status file when all flows pass.
- If you find a BLOCKED state (e.g. feature not built), mark it SKIP with a reason.
- When finished, output: STATUS: DONE or STATUS: BLOCKED with a reason.
```

## Subagent Instructions

### Step 0: Setup

```bash
B=~/.claude/skills/gstack/browse/dist/browse
[ -x "$B" ] && echo "READY" || echo "NEEDS_SETUP"
```

### Step 1: Read Status File

Read `docs/qa/context/e2e-user-flow-status.md`. Find the section for your assigned
user. Note the exact flow to resume from.

### Step 2: Login

**Staff login (admin, coach, purchase-manager, medical-incharge):**
```bash
$B goto "http://localhost:3000/login"
$B click 'a[href="/admin/login"], [role=link]'  # click "User Login" link
sleep 0.5
$B fill 'input[type="email"], input[aria-label*="Email"]' "EMAIL"
$B fill 'input[type="password"]' "PASSWORD"
$B click 'button[type="submit"]'
sleep 2
$B snapshot -C
```

**Student login (User ID 123):**
```bash
$B goto "http://localhost:3000/login"
# Already on student login page by default
$B fill 'input[placeholder*="user id" i], input[name="userId"], input[aria-label*="User ID"]' "123"
$B click 'button[type="submit"]'
sleep 2
$B snapshot -C
```

If already logged in as the correct user (check banner heading), skip re-login.

### Step 3: Test Each Flow

For each flow in the user's section:

1. Navigate to the URL
2. Check: does the page load without redirecting to `/login` or `/dashboard`?
3. Exercise the primary action (see flow definitions below)
4. Update status file: mark PASS, FAIL, or BUG
5. If BUG: go to Step 4, then return here

### Step 4: Bug Fix Protocol

1. Diagnose root cause (use jCodeMunch for code lookup)
2. Read affected file(s)
3. Make minimal targeted fix
4. Re-test the flow
5. Record fix details in status file bugs table
6. Continue to next flow

### Step 5: Commit

When all flows for the user are tested:
```bash
git add <changed files>
git commit -m "fix: <summary>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```
Only commit if there were actual fixes. Skip commit if all flows passed with no changes.

### Step 6: Update Status and Return

- Mark user as DONE in the overall progress table in the status file
- Write the final commit hash if applicable
- Output `STATUS: DONE` or `STATUS: BLOCKED <reason>`

---

## Credentials

| Role | Email / ID | Password | Login Path |
|------|-----------|----------|------------|
| Admin | tony.loui.thomas@gmail.com | 5322148 | /admin/login |
| Coach | coach@gmail.com | password123 | /admin/login |
| Purchase Manager | purchase@gmail.com | password123 | /admin/login |
| Medical Incharge | medin@gmail.com | password123 | /admin/login |
| Student | User ID: 123 | (no password) | /login (student tab) |

## Environment

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5001`
- Student default login page: `http://localhost:3000/login`
- Staff login page: `http://localhost:3000/admin/login`
- gstack browse: `~/.claude/skills/gstack/browse/dist/browse`
- Working branch: `stable`

---

## React Controlled Input Techniques

Standard `$B fill` / `$B select` often don't trigger React state. Use these instead:

**React select/combobox:**
```bash
$B js "
  const el = document.querySelector('select[aria-label=\"Label\"]');
  const rp = Object.keys(el).find(k => k.startsWith('__reactProps'));
  el[rp].onChange({target:{value:'desired-value'}});
"
```

**React text input (when fill doesn't work):**
```bash
$B js "
  const el = document.querySelector('input[placeholder*=\"keyword\"]');
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;
  setter.call(el, 'new value');
  el.dispatchEvent(new Event('input', {bubbles:true}));
"
```

**Click button by text (when @ref is ambiguous):**
```bash
$B js "
  [...document.querySelectorAll('button')]
    .find(b => b.textContent.trim() === 'Button Text')?.click();
"
```

---

## Known Fixes (do not re-apply)

| Fix | File | Description | Commit |
|-----|------|-------------|--------|
| `updateRolePermissions` ignores scope | `backend/controllers/roleController.js` | Now persists `scope` field | 86fa4f8a |
| ProtectedRoute race condition | `frontend/src/components/ProtectedRoute.js` | `permissionsReady` guard added | 86fa4f8a |
| MachineManagement admin-only guard | `frontend/src/pages/MachineManagement.jsx` | Removed `\|\| !isAdmin` blocks | 86fa4f8a |
| Coach role scope | MongoDB data fix | All coach modules: `own` → `balagruh` | 86fa4f8a |
| Purchase-manager role scope | MongoDB data fix | All PM modules: `own` → `balagruh` | pending commit |

## Key Architecture Notes

- RBAC: `scope:'own'` = filter by `_id: user._id` (blocks balagruha-level data)
- RBAC: `scope:'balagruh'` = filter by `_id: { $in: user.balagruhaIds }` (correct for staff)
- RBAC: `scope:'all'` = no filter (admin)
- `validateBalagruhaAccess` middleware: rejects `scope:'own'` on balagruha-level routes
- Backend runs as `node server.js` (no nodemon) — code changes need server restart OR direct DB fix
- Direct DB fix: copy script to `backend/` dir and run with `node <script>.js` (mongoose available there)
- Admin JWT: `POST /api/auth/login` with `{email:"tony.loui.thomas@gmail.com","password":"5322148"}`
- Nav plural vs singular: links may use `/tasks`, `/repairs` etc but routes are `/task`, `/repair`
