# Sprint 1.1 Context Management Guide

**Created:** 2025-10-18 20:43:28
**Purpose:** Preserve and restore context across sessions for long-running Sprint 1.1 stories

---

## Purpose

Long-running stories (RBAC: 5-7 days, FR: 12-15 days) will exceed Claude's context window. This guide explains how to preserve and restore context across sessions.

---

## File Structure

```
.ai/sprint-1.1/
├── README-CONTEXT-MANAGEMENT.md   # This file
├── dev-rbac-context.md            # Dev context for RBAC
├── dev-fr-context.md              # Dev context for FR
├── qa-rbac-context.md             # QA context for RBAC
└── qa-fr-context.md               # QA context for FR
```

---

## When to Update Context Files

### Developer (James)
**Update context file after EVERY checkpoint:**
1. ✅ **After completing a task** (before marking checkbox)
2. ✅ **After major refactoring** (significant code changes)
3. ✅ **Before committing to Git** (document what's being committed)
4. ✅ **When encountering blockers** (document issue and attempted solutions)
5. ✅ **End of work session** (before context resets)
6. ✅ **When context window fills** (before 80% full)

**Checkpoint Frequency:** Every 2-3 hours or after major milestones

### QA (Quinn)
**Update context file after:**
1. ✅ **After executing test suite** (document results)
2. ✅ **After finding issues** (before returning to Dev)
3. ✅ **After creating quality gate** (document decision)
4. ✅ **End of review session**

---

## Timestamp Protocol (CRITICAL)

**ALL context file updates MUST include timestamp using bash:**

```bash
date '+%Y-%m-%d %H:%M:%S'
```

**Required in every update:**
- Update "Last Updated" field with bash timestamp
- Include "Updated By" field (Dev/QA/Orchestrator)

**Example:**
```markdown
**Last Updated:** 2025-10-18 20:43:28 (via bash date command)
**Updated By:** Dev Agent (James)
```

---

## Git Commit Strategy with Context Preservation

### Rule: ALWAYS commit context file WITH code changes

```bash
# Example: Completing Task 3 of RBAC story

# 1. Get current timestamp
date '+%Y-%m-%d %H:%M:%S'

# 2. Update context file FIRST
# Edit: .ai/sprint-1.1/dev-rbac-context.md
# - Mark Task 3 complete
# - Document what was done
# - Update "Current Task" to Task 4
# - Update progress percentage
# - Add timestamp

# 3. Commit code + context file TOGETHER
git add backend/middleware/
git add backend/routes/v2/
git add .ai/sprint-1.1/dev-rbac-context.md  # Include context file!
git commit -m "feat(rbac): update middleware and routes

Context updated: Task 3 complete (45% overall progress)
Next: Task 4 - Database migration
Timestamp: 2025-10-18 20:43:28"

# 4. Push to remote
git push origin feature/sprint-1.1-rbac-refactor
```

**Why commit context files?**
- ✅ Context travels with code
- ✅ New developer can see history
- ✅ Survives local machine failure
- ✅ Easy to restore from any commit

---

## Context Restoration Workflow

### Scenario: Dev Agent context window fills up mid-story

**Step-by-step restoration:**

```bash
# 1. BEFORE context resets, get timestamp and update context file
date '+%Y-%m-%d %H:%M:%S'
# Edit .ai/sprint-1.1/dev-rbac-context.md with latest state

# 2. Commit WIP changes + context file
git add .
git add .ai/sprint-1.1/dev-rbac-context.md
git commit -m "wip: save progress before context reset

Task 3 in progress (60% done)
Next: finish updating shop routes
Timestamp: $(date '+%Y-%m-%d %H:%M:%S')"

# 3. Push to remote (safety)
git push origin feature/sprint-1.1-rbac-refactor

# 4. Exit old context, start new session
# New Terminal:
claude --agent dev

# 5. Resume from context file
*develop-story docs/stories/sprint-1.1/epic-01-story-01-rbac-refactor.md

# James will say: "Let me check for existing context..."
# You say: "Read .ai/sprint-1.1/dev-rbac-context.md first"

# 6. James reads context file, understands:
#    - What's done (Tasks 1-2 complete)
#    - What's in progress (Task 3 - 60% done)
#    - What's pending (Tasks 4-6)
#    - Current files being worked on
#    - Next steps

# 7. James continues from "Current Task" section
# No context lost!
```

---

## Context File Template Sections

### Required Sections (ALL context files must have):

1. **Header** - Branch, Story, Epic references
2. **Current Status** - Last updated (with bash timestamp!), current task, completion %
3. **Completed Tasks** - What's DONE (with commits and timestamps)
4. **Pending Tasks** - What's LEFT (with estimates)
5. **Important Notes & Decisions** - Architecture choices, trade-offs
6. **Issues Encountered** - Problems and solutions (with timestamps)
7. **Git Status** - Branch, commits, uncommitted changes
8. **Context Restoration Checklist** - How to resume
9. **Progress Tracking** - Overall completion percentage
10. **Quick Resume Commands** - Copy-paste commands to continue

---

## Example: Context Window Warning Signs

### When to preemptively save context:

**Warning Signs:**
- ❌ Claude responses getting slower
- ❌ "I don't have context" messages appearing
- ❌ Tool calls timing out
- ❌ Losing track of what was discussed earlier
- ❌ Repeating questions already answered

**Action:** Get timestamp (`date '+%Y-%m-%d %H:%M:%S'`), update context file immediately, commit, then reset

---

## Context File Naming Convention

**Pattern:** `{role}-{feature}-context.md`

**Examples:**
- `dev-rbac-context.md` - Dev work on RBAC refactor
- `dev-fr-context.md` - Dev work on FR rebuild
- `qa-rbac-context.md` - QA work on RBAC review
- `qa-fr-context.md` - QA work on FR review

**Why this works:**
- Clear role association
- Clear feature association
- Easy to find (`ls .ai/sprint-1.1/`)
- Persistent across sessions

---

## Updated BMad Workflow with Context Checkpoints

### Dev Agent Workflow (with context management):

```
1. Activate: claude --agent dev
2. Resume: Read context file first (.ai/sprint-1.1/dev-{feature}-context.md)
3. Implement:
   - Read current task from context file
   - Write code
   - After every major change:
     → Get timestamp: date '+%Y-%m-%d %H:%M:%S'
     → Update context file
     → Commit code + context file
     → Push to remote
4. Checkpoints (every 2-3 hours):
   - Get timestamp
   - Update context file
   - Commit WIP if needed
5. Task complete:
   - Get timestamp
   - Update context file (mark task done)
   - Commit code + context file
   - Write test scenarios
   - Update story Dev Agent Record
6. Story ready:
   - Set status "READY FOR QA"
   - Get timestamp
   - Update context file (final state)
   - Commit everything
   - HALT
```

### QA Agent Workflow (with context management):

```
1. Activate: claude --agent qa
2. Resume: Read context file first (.ai/sprint-1.1/qa-{feature}-context.md)
3. Review:
   - Read story + test scenarios
   - Execute tests via MCP tools
   - After each test:
     → Get timestamp: date '+%Y-%m-%d %H:%M:%S'
     → Update context file with results
4. Issues found:
   - Get timestamp
   - Document in context file
   - Commit context file
   - Return to Dev with details
5. Review complete:
   - Update QA Results section
   - Create quality gate
   - Get timestamp
   - Update context file (final)
   - Commit everything
   - HALT
```

---

## Best Practices

### DO:
- ✅ Update context file frequently (every 2-3 hours)
- ✅ ALWAYS use bash `date '+%Y-%m-%d %H:%M:%S'` for timestamps
- ✅ Commit context file WITH code changes
- ✅ Use descriptive commit messages referencing context state
- ✅ Include "Next steps" in every context update
- ✅ Document issues and solutions with timestamps

### DON'T:
- ❌ Wait until context window fills to update
- ❌ Commit code without context file
- ❌ Leave "Current Task" outdated
- ❌ Skip documenting architecture decisions
- ❌ Forget to push context files to remote
- ❌ Use manual timestamps (always use bash date command)

---

## Troubleshooting

### Problem: Context file conflicts during merge
**Solution:** Manual merge - take the version with most recent timestamp

### Problem: Forgot to update context file before reset
**Solution:** Review `git log` and `git diff` to reconstruct state

### Problem: Multiple devs working on same branch
**Solution:** Each dev has own context file: `dev-rbac-anjai.md`, `dev-rbac-other.md`

---

**Prepared By:** BMad Orchestrator
**Created:** 2025-10-18 20:43:28
**For:** Sprint 1.1 - RBAC & FR Context Management
