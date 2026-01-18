# Story 02: RBAC UI Enhancement - Scope Field & UX Improvement

**Story ID:** epic-01-story-02
**Epic:** Epic 01 - RBAC System Refactor
**Sprint:** DEFERRED - Post-FR Story
**Status:** ⏸️ SHELVED - Documented for Future Implementation
**Priority:** P2 - Medium (Administrative Convenience)
**Estimated Effort:** 2-3 days
**Created:** 2025-10-22 18:18:23
**Deferred:** 2025-10-22 18:25:00 (Prioritizing FR Story)
**Branch:** `feature/sprint-1.1-rbac-ui-scope` (not created)
**Dependencies:** Story 01 (Backend RBAC - COMPLETE ✅)

---

## 🔄 DEFERRAL DECISION

**Reason for Deferral:**
Backend RBAC (Story 01) is production-ready with QA approval (95/100). The scope field exists in the database and data isolation is working perfectly. This story addresses a "nice-to-have" UI enhancement for administrative convenience, not critical functionality.

**Priority Shift:**
Team shifting focus to FR (Facial Recognition) story, which has higher business impact. This story is fully documented and can be picked up post-FR with no knowledge loss.

**Current Workaround:**
Admins can manage scope values via:
- Database scripts: `backend/migrations/add-scope-to-permissions.js`
- Direct database updates if needed
- Backend API already supports scope field

**When to Resume:**
- After FR story completion
- When administrative efficiency becomes priority
- If new use cases require scope UI management

---

---

## Story Description

As a **System Administrator**, I need to **see and manage the scope field for all role permissions in the RBAC UI**, so that **I can properly configure data access levels (own/balagruh/all) without manually editing the database**.

**Current Gap:**
- Backend scope filtering working perfectly (QA PASSED 95/100)
- Database has scope values correctly set (own/balagruh/all)
- Frontend RBAC UI doesn't display or allow editing scope field
- Admins have no visibility into scope-level access control

**User Pain Point:**
> "I can't see what data scope each role has. I need to understand if a coach can see all Balagruhas or just assigned ones, but the UI doesn't show this."

---

## Acceptance Criteria

### AC1: Scope Field Visible in Permissions Table
**Given** an admin views role permissions in the RBAC page
**When** they select any role
**Then** the permissions table should display a "Scope" column
**And** each permission should show its scope value (own/balagruh/all)
**And** scope should be visually distinct (color-coded or badged)

### AC2: Scope Editing in Edit Mode
**Given** an admin clicks "Edit Permissions" for a role
**When** they modify permissions
**Then** they should be able to change the scope for each permission
**And** scope changes should be saved to the backend
**And** changes should validate correctly (e.g., Student can't have scope='all')

### AC3: Scope Indicators on Role Cards
**Given** an admin views the roles list
**When** they see role cards
**Then** each card should show scope distribution (e.g., "3 All, 5 Balagruh, 2 Own")
**And** cards should visually indicate predominant scope level

### AC4: Scope Filter/Search
**Given** an admin wants to find roles by scope
**When** they use search/filter
**Then** they should be able to filter by scope type
**And** see which roles have permissions with specific scopes

### AC5: Scope Help/Documentation
**Given** an admin is editing permissions
**When** they hover over or click scope field
**Then** they should see tooltip/help text explaining scope levels
**And** understand what each scope means (own/balagruh/all)

---

## UX Decision Tree

### 🎨 DECISION 1: Scope Visualization in Table

**Options:**

#### Option A: Badge/Chip Display
```
| Module            | Create | Read | Update | Delete | Scope       |
|-------------------|--------|------|--------|--------|-------------|
| User Management   | ✓      | ✓    | ✓      | ✓      | [All]       |
| Student Data      | ✓      | ✓    | ✓      | ✓      | [Balagruh]  |
| Own Profile       | ✓      | ✓    | ✓      | ✓      | [Own]       |
```

**Pros:**
- Clean, modern look
- Color-coded for quick scanning
- Space-efficient
- Industry standard pattern

**Cons:**
- Requires color system
- May not be accessible without text

**Color Scheme:**
- `own` = Blue badge
- `balagruh` = Purple badge
- `all` = Green badge

---

#### Option B: Icon + Text
```
| Module            | Create | Read | Update | Delete | Scope           |
|-------------------|--------|------|--------|--------|-----------------|
| User Management   | ✓      | ✓    | ✓      | ✓      | 🌍 All         |
| Student Data      | ✓      | ✓    | ✓      | ✓      | 🏠 Balagruh    |
| Own Profile       | ✓      | ✓    | ✓      | ✓      | 👤 Own         |
```

**Pros:**
- Visual + text redundancy
- More accessible
- Icon provides quick recognition

**Cons:**
- Takes more space
- Icons may not translate culturally

---

#### Option C: Inline Dropdown (Edit Mode Only)
```
Edit Mode:
| Module            | Actions | Scope                    |
|-------------------|---------|--------------------------|
| User Management   | CRUD    | [All ▼]                 |
| Student Data      | CRUD    | [Balagruh ▼]            |
```

**Pros:**
- Clean in view mode
- Direct editing
- Familiar pattern

**Cons:**
- Hidden in view mode
- No quick overview

---

**🎯 RECOMMENDATION:** **Option A (Badge) + Option B (Icon)**
- Combine badge + icon for best of both
- Badge: `[🌍 All]` `[🏠 Balagruh]` `[👤 Own]`
- Color + Icon + Text = Maximum clarity

---

### 🎨 DECISION 2: Scope Editing Workflow

**Options:**

#### Option A: Inline Dropdown Edit
```
[Edit Mode ON]
| Module            | Create | Read | Update | Delete | Scope       |
|-------------------|--------|------|--------|--------|-------------|
| User Management   | ☑      | ☑    | ☑      | ☑      | [All ▼]     |
```

**Flow:**
1. Click "Edit Permissions"
2. Scope column becomes dropdown
3. Select new scope
4. Click "Save"

**Pros:**
- Simple, direct
- Minimal clicks
- Familiar pattern

**Cons:**
- Cluttered in edit mode
- Hard to bulk-change scopes

---

#### Option B: Modal/Drawer for Each Permission
```
[Click on permission row] → Opens drawer:

┌─────────────────────────────┐
│ Edit: User Management       │
│                             │
│ Actions:                    │
│ ☑ Create  ☑ Read           │
│ ☑ Update  ☑ Delete         │
│                             │
│ Scope:                      │
│ ○ Own      ● All           │
│ ○ Balagruh                 │
│                             │
│ [Cancel]  [Save]           │
└─────────────────────────────┘
```

**Pros:**
- Focus on single permission
- More space for help text
- Can add validation rules per module

**Cons:**
- More clicks
- Slower for bulk edits

---

#### Option C: Bulk Scope Assignment
```
[Edit Mode ON]
| ☑ Module          | Create | Read | Update | Delete | Scope       |
|-------------------|--------|------|--------|--------|-------------|
| ☑ User Management | ☑      | ☑    | ☑      | ☑      | [All ▼]     |
| ☑ Student Data    | ☑      | ☑    | ☑      | ☑      | [Balagruh ▼]|

[Set Selected to: All | Balagruh | Own]
```

**Pros:**
- Fast bulk operations
- Useful when setting up new roles
- Power-user friendly

**Cons:**
- Complex UI
- Risk of accidental bulk changes

---

**🎯 RECOMMENDATION:** **Option A + Option C (Hybrid)**
- Default: Inline dropdown (simple cases)
- Add: Bulk action toolbar for power users
- Best of both: Simple + Powerful

---

### 🎨 DECISION 3: Role Card Scope Indicators

**Options:**

#### Option A: Scope Distribution Bar
```
┌─────────────────────────────┐
│ 👑 Admin                    │
│ Admin role...               │
│                             │
│ Permissions: 25/29          │
│ ▓▓▓▓▓░░░░░ 60% All         │
│ ▒▒▒ 30% Balagruh           │
│ ░ 10% Own                  │
└─────────────────────────────┘
```

**Pros:**
- Visual at-a-glance
- Shows distribution
- Modern, data-driven

**Cons:**
- Takes vertical space
- May not scale with many roles

---

#### Option B: Icon Summary
```
┌─────────────────────────────┐
│ 👑 Admin                    │
│ Admin role...               │
│                             │
│ Permissions: 25/29          │
│ 🌍 15  🏠 8  👤 2          │
└─────────────────────────────┘
```

**Pros:**
- Compact
- Clear counts
- Easy to scan

**Cons:**
- Less visual than bar
- Requires icon legend

---

#### Option C: Dominant Scope Badge
```
┌─────────────────────────────┐
│ 👑 Admin    [🌍 GLOBAL]    │
│ Admin role...               │
│                             │
│ Permissions: 25/29          │
└─────────────────────────────┘
```

**Pros:**
- Simplest
- Shows primary characteristic
- No extra space

**Cons:**
- Hides distribution
- Loses detail

---

**🎯 RECOMMENDATION:** **Option B (Icon Summary)**
- Clean and informative
- Doesn't take extra space
- Shows exact counts per scope

---

### 🎨 DECISION 4: Scope Help & Documentation

**Options:**

#### Option A: Tooltip on Hover
```
[Hover over scope field]
┌─────────────────────────────┐
│ Scope: All                  │
│                             │
│ 🌍 All: User can access     │
│    data from ALL Balagruhas │
│    and all users            │
└─────────────────────────────┘
```

**Pros:**
- Non-intrusive
- Standard pattern
- On-demand help

**Cons:**
- May be missed
- Not discoverable on mobile

---

#### Option B: Info Icon + Modal
```
| Scope [ℹ️] |

[Click ℹ️] → Opens modal:
┌─────────────────────────────┐
│ Understanding Scopes        │
│                             │
│ 👤 Own:                     │
│ User sees only their own    │
│ data (e.g., student profile)│
│                             │
│ 🏠 Balagruh:                │
│ User sees data from their   │
│ assigned Balagruha(s)       │
│                             │
│ 🌍 All:                     │
│ User sees ALL data          │
│ (admin-level access)        │
│                             │
│ [Got it]                    │
└─────────────────────────────┘
```

**Pros:**
- Comprehensive explanation
- Can include examples
- Discoverable

**Cons:**
- Extra click
- Modal may be annoying for power users

---

#### Option C: Inline Helper Text
```
| Scope |
|-------|
| [All ▼]                     |
| 🌍 User can see all data    |
```

**Pros:**
- Always visible
- No hover needed
- Great for learning

**Cons:**
- Takes space
- May look cluttered

---

**🎯 RECOMMENDATION:** **Option A + Option B (Hybrid)**
- Tooltip on hover for quick help
- Info icon in header for detailed explanation
- Best for both novice and power users

---

## User Scenarios

### Scenario 1: Admin Setting Up New Coach Role
**Goal:** Create coach role with Balagruh-level access

**Current Experience (WITHOUT Story 02):**
1. Admin creates role in UI
2. Adds permissions (CRUD on modules)
3. Saves role
4. ❌ **Can't set scope** - defaults to 'own'
5. Has to manually run database script or migration
6. Has to verify scope was applied correctly

**Desired Experience (WITH Story 02):**
1. Admin creates role in UI
2. Adds permissions (CRUD on modules)
3. **Sets scope to "Balagruh" for each permission**
4. Sees visual confirmation (🏠 badge)
5. Saves role
6. ✅ Coach now has Balagruh-level access

---

### Scenario 2: Admin Auditing Role Permissions
**Goal:** Understand what data each role can access

**Current Experience:**
1. Admin opens RBAC page
2. Sees permissions (Create, Read, Update, Delete)
3. ❌ **Can't see scope** - no visibility into data access level
4. Has to query database or check code to understand scope
5. Risk of misunderstanding access levels

**Desired Experience:**
1. Admin opens RBAC page
2. Sees permissions WITH scope indicators
3. Quickly scans: "Coach has 🏠 Balagruh access"
4. ✅ Understands data isolation at a glance

---

### Scenario 3: Admin Fixing Over-Permissioned Role
**Goal:** Restrict Purchase Manager from seeing all data

**Current Experience:**
1. Admin notices Purchase Manager shouldn't see all Balagruhas
2. ❌ No way to change scope in UI
3. Has to update database manually
4. Risk of SQL errors or wrong scope

**Desired Experience:**
1. Admin opens Purchase Manager role
2. Clicks "Edit Permissions"
3. Changes "All" → "Balagruh" for specific modules
4. Saves
5. ✅ Purchase Manager now restricted to assigned Balagruha

---

## Design Mockups (Text-Based)

### View Mode: Permissions Table with Scope
```
┌──────────────────────────────────────────────────────────────────────┐
│                         Admin Permissions                            │
│                    Admin role with specific permissions              │
│                    ID: 680dc79201ffa969facdc9ee                       │
│                                                                       │
│                                                [Edit Permissions]     │
├──────────────────────────────────────────────────────────────────────┤
│ Module             │ ➕ Create │ 👁️ Read │ ✏️ Update │ 🗑️ Delete │ 🔒 Scope    │
├────────────────────┼──────────┼────────┼─────────┼──────────┼────────────┤
│ 🔑 Role Management │    ✓     │   ✓    │    ✓    │    ✓     │ [🌍 All]   │
│ 👥 User Management │    ✓     │   ✓    │    ✓    │    ✓     │ [🌍 All]   │
│ 📋 Task Management │    ✓     │   ✓    │    ✓    │    ✓     │ [🌍 All]   │
│ 🖥️  Machine Mgmt   │    ✓     │   ✓    │    ✓    │    ✓     │ [🌍 All]   │
│ 📁 Attendance Mgmt │    ✓     │   ✓    │    ✓    │    ✓     │ [🌍 All]   │
│ 📁 Balagruha Mgmt  │    ✓     │   ✓    │    ✓    │    ✓     │ [🌍 All]   │
│ 📁 Shop Management │    -     │   -    │    -    │    -     │ [🏠 Bal]   │
└────────────────────┴──────────┴────────┴─────────┴──────────┴────────────┘
```

### Edit Mode: Permissions Table with Scope Dropdowns
```
┌──────────────────────────────────────────────────────────────────────┐
│                    [Editing: Admin Permissions]                      │
│                                                                       │
│                    [✓ Select All]        [Cancel]  [Save Changes]    │
├──────────────────────────────────────────────────────────────────────┤
│ ☐ Module           │ ➕ Create │ 👁️ Read │ ✏️ Update │ 🗑️ Delete │ 🔒 Scope    │
├────────────────────┼──────────┼────────┼─────────┼──────────┼────────────┤
│ ☐ 🔑 Role Mgmt     │    ☑     │   ☑    │    ☑    │    ☑     │ [All ▼]    │
│ ☑ 👥 User Mgmt     │    ☑     │   ☑    │    ☑    │    ☑     │ [All ▼]    │
│ ☐ 📋 Task Mgmt     │    ☑     │   ☑    │    ☑    │    ☑     │ [All ▼]    │
├────────────────────┴──────────┴────────┴─────────┴──────────┴────────────┤
│ [Bulk Actions] Set selected scope to: [All] [Balagruh] [Own]            │
└──────────────────────────────────────────────────────────────────────────┘
```

### Role Card with Scope Distribution
```
┌────────────────────────────────┐  ┌────────────────────────────────┐
│ 👑 Admin                       │  │ 🏆 Coach                       │
│ Admin role with specific...    │  │ Coach role with specific...    │
│                                │  │                                │
│ Permissions: 25/29             │  │ Permissions: 16/29             │
│ Scope: 🌍 20  🏠 4  👤 1      │  │ Scope: 🌍 2  🏠 12  👤 2       │
└────────────────────────────────┘  └────────────────────────────────┘
```

---

## Implementation Considerations

### Frontend Changes Required

**Files to Modify:**
1. `frontend/src/pages/RBACPage.jsx` (or similar)
   - Add Scope column to permissions table
   - Add scope badges/chips
   - Add scope dropdown in edit mode
   - Add bulk scope actions

2. `frontend/src/components/RoleCard.jsx` (if exists)
   - Add scope distribution display
   - Update card layout

3. `frontend/src/hooks/useRBAC.js` (if exists)
   - Update permission save logic to include scope
   - Add scope validation

**New Components to Create:**
1. `ScopeBadge.jsx` - Reusable scope indicator
2. `ScopeSelector.jsx` - Dropdown for scope selection
3. `ScopeHelpModal.jsx` - Help documentation modal

### Backend Changes Required

**✅ NONE - Backend already complete!**
- Backend API already accepts and saves scope field
- No backend changes needed
- Just need to send scope from frontend

### Testing Requirements

1. **Unit Tests:**
   - ScopeBadge renders correct colors
   - ScopeSelector validates inputs
   - Scope changes trigger save

2. **Integration Tests:**
   - Save scope changes to backend
   - Scope persists after page reload
   - Scope validation (e.g., Student can't have 'all')

3. **E2E Tests:**
   - Create role and set scopes
   - Edit existing role scopes
   - Verify scope changes affect data access

---

## Technical Implementation Plan

### Phase 1: Display Scope (View Mode)
**Effort:** 4-6 hours

**Tasks:**
1. Create `ScopeBadge` component
   - Props: `scope` (own/balagruh/all)
   - Returns: Colored badge with icon

2. Update permissions table
   - Add Scope column header
   - Map over permissions and render ScopeBadge

3. Update role cards
   - Calculate scope distribution
   - Display scope counts

**Acceptance:**
- View any role and see scope for all permissions
- Scope badges are color-coded and clear

---

### Phase 2: Edit Scope (Edit Mode)
**Effort:** 6-8 hours

**Tasks:**
1. Create `ScopeSelector` dropdown component
   - Options: own, balagruh, all
   - onChange handler

2. Toggle edit mode
   - Replace ScopeBadge with ScopeSelector in edit mode
   - Wire up onChange to update permission state

3. Update save logic
   - Include scope field in permission updates
   - POST to backend with scope data

**Acceptance:**
- Click Edit, change scope, save successfully
- Scope persists after page reload

---

### Phase 3: Bulk Actions & UX Polish
**Effort:** 4-6 hours

**Tasks:**
1. Add checkbox selection to permissions
2. Create bulk action toolbar
3. Implement "Set selected to [scope]"
4. Add scope filter/search
5. Create help modal/tooltip

**Acceptance:**
- Can bulk-change scope for multiple permissions
- Help documentation accessible and clear

---

### Phase 4: Validation & Edge Cases
**Effort:** 2-4 hours

**Tasks:**
1. Add scope validation rules
   - Students shouldn't have 'all' scope
   - Admins should typically have 'all'
2. Warning dialogs for risky changes
3. Undo/cancel functionality
4. Error handling

**Acceptance:**
- Invalid scope changes prevented
- User warned about risky changes

---

## Decision Points for Discussion

### 🤔 Question 1: Scope Column Position
**Where should Scope column appear in permissions table?**

**A.** After actions (Create/Read/Update/Delete) → Scope at end
**B.** Before actions → Scope comes first
**C.** Between actions and "All" column

**Recommendation:** A (after actions) - Follows natural flow

---

### 🤔 Question 2: Default Scope for New Permissions
**When adding a new permission, what should default scope be?**

**A.** 'own' (most restrictive, safe default)
**B.** 'all' (admin-like default)
**C.** Match role's predominant scope
**D.** Force user to select (no default)

**Recommendation:** A ('own') - Principle of least privilege

---

### 🤔 Question 3: Scope Validation Strictness
**How strict should scope validation be?**

**A.** Hard block: Can't save invalid scope
**B.** Warning: Show warning but allow save
**C.** No validation: Let admin decide

**Recommendation:** B (Warning) - Trust admin but provide guidance

---

### 🤔 Question 4: Bulk Scope Changes
**Should we allow bulk scope changes?**

**A.** Yes, full bulk operations (select + change)
**B.** Yes, but only within same module
**C.** No, one-by-one only

**Recommendation:** A (Full bulk) - Power users need this

---

### 🤔 Question 5: Mobile Responsiveness
**How should scope UI work on mobile?**

**A.** Same table, scrollable
**B.** Accordion/collapse per permission
**C.** Simplified mobile view

**Recommendation:** B (Accordion) - Better mobile UX

---

## Risks & Mitigation

### Risk 1: UI Clutter
**Risk:** Adding scope column may make table too wide

**Mitigation:**
- Use compact badge design
- Make table horizontally scrollable
- Consider collapsible action columns

---

### Risk 2: User Confusion
**Risk:** Users may not understand scope concept

**Mitigation:**
- Clear help documentation
- Tooltips on every scope indicator
- Examples in help modal
- Visual design makes it intuitive

---

### Risk 3: Accidental Bulk Changes
**Risk:** User bulk-changes scope and breaks access

**Mitigation:**
- Confirmation dialog for bulk actions
- Show preview of changes before saving
- Undo button (revert to last saved)

---

## Definition of Done

- [ ] Scope visible in all permission tables (view mode)
- [ ] Scope editable in edit mode (dropdown)
- [ ] Scope changes save to backend successfully
- [ ] Role cards show scope distribution
- [ ] Help documentation accessible
- [ ] Bulk scope actions working
- [ ] Validation prevents invalid scopes (with warnings)
- [ ] Mobile-responsive design
- [ ] All unit tests passing
- [ ] E2E tests cover scope editing
- [ ] User documentation updated
- [ ] QA approval on UX design
- [ ] Story deployed to staging

---

## Next Steps

1. **Review Decision Tree** - Discuss options with team
2. **Get UX Approval** - Validate design decisions
3. **Create Wireframes** - Visual mockups if needed
4. **Implementation** - Follow phased approach
5. **QA Testing** - Comprehensive E2E tests
6. **Deploy** - Staging first, then production

---

**Created:** 2025-10-22 18:18:23 (via bash `date '+%Y-%m-%d %H:%M:%S'`)
**Status:** Planning - Awaiting Decision Tree Discussion
**Dependencies:** Story 01 COMPLETE ✅
**Target Sprint:** Sprint 1.1 or 1.2
