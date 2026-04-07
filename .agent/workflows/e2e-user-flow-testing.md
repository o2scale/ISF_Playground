---
name: 'e2e-user-flow-testing'
description: >
  Orchestrator workflow for E2E user flow testing across all ISF Playground roles.
  Runs fully autonomously — reads status file, dispatches subagents one per user,
  each subagent tests all flows, fixes bugs, and commits before returning.
  No human input required.
autonomous: true
human_input_required: false
---

# E2E User Flow Testing — Orchestrator

## What This Does

Tests every user role in ISF Playground via a real browser session.
Subagents are dispatched one at a time, each handling one user completely
(all flows, all bugs fixed, all fixes committed) before the next starts.
State is shared via a status file so any session can resume exactly where the last left off.

## How to Run (fully autonomous)

1. Read `docs/qa/context/e2e-user-flow-status.md`
2. Find first user row that is NOT `✅ DONE`
3. Dispatch subagent with the filled-in prompt below
4. When subagent returns, re-read status file
5. Repeat from step 2 until all users are `✅ DONE`
6. Print final summary of all bugs found and fixed

## Subagent Prompt (fill in USER, EMAIL, PASSWORD per row)

```
You are an E2E testing subagent for the ISF Playground app. Run fully autonomously.
Do NOT ask questions. Do NOT pause for confirmation. Complete all steps independently.

TARGET USER: {ROLE_NAME}
EMAIL/ID: {EMAIL_OR_ID}
PASSWORD: {PASSWORD}
LOGIN URL: {LOGIN_URL}

STEP 1 — Read context (required, do not skip):
  Read docs/qa/context/e2e-user-flow-workflow.md
  Read docs/qa/context/e2e-user-flow-status.md

STEP 2 — Start browser:
  B=~/.claude/skills/gstack/browse/dist/browse

STEP 3 — Login as the target user (see workflow file for exact technique).
  If already logged in as the correct user, skip re-login.

STEP 4 — Test every flow in the {ROLE_NAME} section of the status file.
  For each flow marked NEXT or PENDING:
    - Navigate to the URL
    - Verify page loads (no redirect to /login or /dashboard)
    - Exercise the primary action
    - Update status file: mark PASS, FAIL, or BUG
    - If BUG: diagnose root cause, fix, re-test, record fix in status file

STEP 5 — When all flows done:
  - Commit any fixes: git commit -m "fix: <summary>" on branch stable
  - Mark user DONE in status file with commit hash
  - Output exactly: STATUS: DONE

If you hit something you cannot fix after 3 attempts:
  - Mark flow as BLOCKED with reason in status file
  - Continue to next flow (do not stop)
  - Output: STATUS: DONE_WITH_CONCERNS <list blocked flows>
```

## User List (in order)

| # | Role | Email/ID | Password | Login URL | Status |
|---|------|---------|----------|-----------|--------|
| 1 | admin | tony.loui.thomas@gmail.com | 5322148 | /admin/login | ✅ prior session |
| 2 | coach | coach@gmail.com | password123 | /admin/login | ✅ commit 86fa4f8a |
| 3 | purchase-manager | purchase@gmail.com | password123 | /admin/login | 🔄 in progress |
| 4 | medicalincharge | medin@gmail.com | password123 | /admin/login | ⏳ pending |
| 5 | student | User ID: 123 | — | /login | ⏳ pending |

## Context Files

- Workflow (techniques, fixes, architecture): `docs/qa/context/e2e-user-flow-workflow.md`
- Status (progress, bugs, resume point): `docs/qa/context/e2e-user-flow-status.md`
