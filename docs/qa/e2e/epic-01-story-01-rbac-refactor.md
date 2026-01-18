# E2E Test Scenarios: RBAC Refactor (Epic 01 - Story 01)

**Created:** 2025-10-18 22:33:41
**Last Updated:** 2025-10-22 16:42:56 (Phase 3 URL validation tests added)
**Sprint:** 1.1 - RBAC Refactor
**Story:** Epic 01 - Story 01 - RBAC System Refactor
**Status:** READY FOR QA

---

## Test Overview

This document outlines comprehensive End-to-End (E2E) test scenarios for the RBAC refactor. These tests verify that the three-tier permission scoping (own/balagruh/all) works correctly across all user roles and ensures proper data isolation.

---

## Test Environment Setup

### Prerequisites
- Fresh database with test data
- Multiple Balagruhs (minimum 3)
- Users for each role type
- Test data scoped to different Balagruhs
- Frontend and backend running

### Test Users

| Username | Role | Balagruha Assignment | Purpose |
|----------|------|---------------------|---------|
| `admin@test.com` | Admin | - | Global access testing |
| `coach1@test.com` | Coach | Balagruh A | Single Balagruh access |
| `coach2@test.com` | Coach | Balagruh B | Single Balagruh access |
| `coach3@test.com` | Coach | Balagruh A, B | Multi-Balagruh access |
| `student1@test.com` | Student | Balagruh A | Own data access |
| `student2@test.com` | Student | Balagruh B | Own data access |

### Test Data

| Entity | Balagruh A | Balagruh B | Balagruh C |
|--------|-----------|-----------|-----------|
| Students | 10 students | 10 students | 10 students |
| Attendance Records | 50 records | 50 records | 50 records |
| Schedule Entries | 20 entries | 20 entries | 20 entries |
| Coin Transactions | 30 transactions | 30 transactions | 30 transactions |

---

## Acceptance Criteria Tests

### AC1: Admin Role - Global Access (Scope: 'all')

**Test Case 1.1: Admin Can View All Users**
- **Login:** admin@test.com
- **Navigate:** /users
- **Expected:** See users from ALL Balagruhs (494 total in current database)
- **Verify:** User list includes users from all Balagruhs
- **Backend Check:** Query should NOT have balagruhaId filter (`req.scopeFilter = {}`)

**Test Case 1.2: Admin Can Manage All Attendance**
- **Login:** admin@test.com
- **Navigate:** /attendance
- **Expected:** See attendance records from ALL Balagruhs (150 total)
- **Verify:** Can create, update, delete attendance for any Balagruh

**Test Case 1.3: Admin Can Access Shop Transaction Reports**
- **Login:** admin@test.com
- **Navigate:** /shop/admin/reports/transactions
- **Expected:** Reports show transactions from ALL Balagruhs
- **Verify:** No data filtering by Balagruh
- **Note:** General /reports route does not exist; using shop-specific reports for testing

**Test Case 1.4: Admin UI Shows All Management Features**
- **Login:** admin@test.com
- **Verify:** All navigation menu items visible
- **Verify:** All Create/Edit/Delete buttons visible
- **Verify:** No "Access Denied" messages

---

### AC2: Coach Role - Balagruh-Level Access (Scope: 'balagruh')

**Test Case 2.1: Single-Balagruh Coach - Data Isolation**
- **Login:** coach1@test.com (assigned to Balagruh A only)
- **Navigate:** /users
- **Expected:** See ONLY Balagruh A users
- **Verify:** Balagruh B and C users NOT visible
- **Backend Check:** Query has `balagruhaId: { $in: [BalagruhA_ID] }` via `req.scopeFilter`

**Test Case 2.2: Single-Balagruh Coach - Cannot Access Other Balagruhs**
- **Login:** coach1@test.com
- **Attempt:** Direct URL to Balagruh B user: `/api/users/:userId` where user belongs to Balagruh B
- **Expected:** User not visible in list OR 403 Forbidden if accessing directly
- **Verify:** Scope filter prevents access to other Balagruh data

**Test Case 2.3: Single-Balagruh Coach - Attendance Management**
- **Login:** coach1@test.com
- **Navigate:** /attendance
- **Expected:** See ONLY Balagruh A attendance records (50 records)
- **Attempt:** Create attendance for Balagruh B student
- **Expected:** Fail with 403 error

**Test Case 2.4: Single-Balagruh Coach - UI Filtering**
- **Login:** coach1@test.com
- **Navigate:** /users
- **Verify:** User list shows ONLY Balagruh A users
- **Navigate:** /shop/admin/reports/transactions (if coach has Shop Management permission)
- **Verify:** Reports show ONLY Balagruh A data

---

### AC3: Multi-Balagruh Coach - Multiple Scope Access

**Test Case 3.1: Multi-Balagruh Coach Can Access All Assigned**
- **Login:** coach3@test.com (assigned to Balagruh A AND B)
- **Navigate:** /users
- **Expected:** See users from Balagruh A and B only
- **Verify:** Balagruh C users NOT visible
- **Backend Check:** Query has `balagruhaId: { $in: [BalagruhA_ID, BalagruhB_ID] }` via `req.scopeFilter`

**Test Case 3.2: Multi-Balagruh Coach - Cross-Balagruh Management**
- **Login:** coach3@test.com
- **Navigate:** /users
- **Verify:** Can edit Balagruh A user (if has Update permission)
- **Verify:** Can edit Balagruh B user (if has Update permission)
- **Attempt:** Edit Balagruh C user via direct API call
- **Expected:** User not visible in filtered list

**Test Case 3.3: Multi-Balagruh Coach - Attendance Across Balagruhs**
- **Login:** coach3@test.com
- **Navigate:** /attendance
- **Expected:** See Balagruh A and B attendance (100 records)
- **Verify:** Can mark attendance for both Balagruhs

**Test Case 3.4: Multi-Balagruh Coach - Reports Aggregation**
- **Login:** coach3@test.com
- **Navigate:** /shop/admin/reports/transactions (if has permission)
- **Expected:** Reports aggregate data from Balagruh A and B only
- **Verify:** Balagruh C data excluded
- **Note:** Depends on coach having Shop Management permissions

---

### AC4: Student Role - Own Data Access (Scope: 'own')

**Test Case 4.1: Student Can View Only Own Profile**
- **Login:** student1@test.com
- **Navigate:** /profile
- **Expected:** See own profile data
- **Attempt:** Navigate to `/students/student2_id`
- **Expected:** 403 Forbidden or redirect to own profile

**Test Case 4.2: Student Can View Own Attendance**
- **Login:** student1@test.com
- **Navigate:** /my-attendance
- **Expected:** See ONLY own attendance records
- **Backend Check:** Query has `userId: student1._id`

**Test Case 4.3: Student Can View Own Coin Transactions**
- **Login:** student1@test.com
- **Navigate:** /coins
- **Expected:** See ONLY own coin transactions
- **Verify:** Cannot see other students' transactions

**Test Case 4.4: Student UI - Limited Access**
- **Login:** student1@test.com
- **Verify:** Navigation menu shows only: Dashboard, Profile, Coins, Shop
- **Verify:** NO access to: User Management, Reports, Settings
- **Verify:** NO Create/Edit/Delete buttons for other users

**Test Case 4.5: Student Cannot Access User List**
- **Login:** student1@test.com
- **Attempt:** Navigate to `/users`
- **Expected:** 403 Forbidden or "Access Denied" message (no User Management Read permission)

---

### AC5: Database Indexes Performance

**Test Case 5.1: Query Performance with Scope Filter**
- **Setup:** Database with 1000+ students across 10 Balagruhs
- **Login:** coach1@test.com
- **Action:** Navigate to /students
- **Measure:** Query execution time
- **Expected:** Query completes in < 50ms
- **Verify:** MongoDB uses index on `balagruhaIds`

**Test Case 5.2: Baseline vs Scoped Query Performance**
- **Measure:** Admin query (no filter) vs Coach query (with filter)
- **Expected:** Performance degradation < 10%
- **Example:** Admin: 15ms, Coach: 16.5ms = 10% degradation ✅

**Test Case 5.3: Database Explain Plans**
- **Run:** `db.students.find({ balagruhaId: { $in: [...] }}).explain()`
- **Verify:** `executionStats.totalDocsExamined` ≈ `executionStats.nReturned`
- **Verify:** Index used: `{ balagruhaIds: 1 }`

---

### AC6: Development Bypass Removal

**Test Case 6.1: No Bypass in Development Mode**
- **Setup:** Set `NODE_ENV=development`
- **Login:** student1@test.com
- **Attempt:** Access `/users` (requires User Management permission)
- **Expected:** 403 Forbidden
- **Verify:** Permission check NOT bypassed

**Test Case 6.2: No Bypass in Local Mode**
- **Setup:** Set `NODE_ENV=local`
- **Login:** student1@test.com
- **Attempt:** Access admin-only endpoint
- **Expected:** 403 Forbidden

**Test Case 6.3: Code Audit - No Bypass Keywords**
- **File:** `backend/middleware/auth.js`
- **Verify:** No lines containing `NODE_ENV === "development"`
- **Verify:** No lines containing `BYPASS` or `Skip role checks`

---

### AC7: Frontend Permission Checks

**Test Case 7.1: PermissionGuard Component - Show/Hide Buttons**
- **Login:** coach1@test.com
- **Navigate:** /students
- **Verify:** "Edit" button visible (has Update permission)
- **Verify:** "Delete" button hidden (no Delete permission for coaches)

**Test Case 7.2: usePermission Hook - Conditional Logic**
- **Login:** student1@test.com
- **Navigate:** /profile
- **Verify:** Form fields are read-only (no Update permission)
- **Verify:** Role dropdown disabled (no Manage permission)

**Test Case 7.3: Navigation Menu Filtering**
- **Login:** coach1@test.com
- **Verify:** Menu shows: Dashboard, Students, Attendance, Schedule
- **Verify:** Menu hides: User Management, System Settings

**Test Case 7.4: Fallback Content Display**
- **Login:** student1@test.com
- **Navigate:** /reports
- **Expected:** See message: "You don't have permission to view reports"
- **Verify:** Fallback content displayed instead of crash

---

### AC8: Backend API Scope Enforcement

**Test Case 8.1: API Returns Only Scoped Data**
- **Login:** coach1@test.com (Balagruh A)
- **API Call:** `GET /api/students`
- **Expected Response:** Array of Balagruh A students only
- **Verify:** Response does NOT contain Balagruh B/C students

**Test Case 8.2: API Rejects Out-of-Scope Updates**
- **Login:** coach1@test.com (Balagruh A)
- **API Call:** `PUT /api/v2/users/:userId/update` (Balagruh B user)
- **Expected:** User not found or update fails (filtered by scope)
- **Note:** Scope filtering prevents access to out-of-scope users

**Test Case 8.3: API Rejects Out-of-Scope Deletes**
- **Login:** coach1@test.com
- **API Call:** `DELETE /api/v2/users/:userId` (Balagruh B user)
- **Expected:** User not found (filtered by scope) OR 403 Forbidden if coach lacks Delete permission

**Test Case 8.4: Middleware Injects Correct Scope Filter**
- **Login:** coach1@test.com
- **Middleware Check:** Verify `req.scopeFilter` is set
- **Expected:** `req.scopeFilter = { balagruhaId: { $in: [BalagruhA_ID] } }`
- **Expected:** `req.permissionScope = 'balagruh'`

---

## Security Penetration Tests

### Penetration Test 1: Direct URL Access Bypass Attempt
- **Login:** coach1@test.com (Balagruh A)
- **Attempt:** Direct URL: `/api/users?balagruhaId=BalagruhB_ID`
- **Expected:** Still see ONLY Balagruh A users
- **Verify:** Query parameter ignored, `req.scopeFilter` enforced by middleware

### Penetration Test 2: Token Manipulation
- **Login:** student1@test.com
- **Attempt:** Modify JWT token to add admin role
- **Expected:** Token validation fails, 401 Unauthorized

### Penetration Test 3: SQL Injection (NoSQL Injection)
- **Login:** coach1@test.com
- **Attempt:** API call with malicious payload: `{ "balagruhaId": { "$ne": null } }`
- **Expected:** Payload sanitized, scope filter still enforced

### Penetration Test 4: Permission Escalation via API
- **Login:** student1@test.com
- **Attempt:** POST to `/api/roles` to create admin role
- **Expected:** 403 Forbidden (no permission to Manage roles)

---

## Phase 3: URL Parameter Validation Tests

**Phase 3 Implementation Date:** 2025-10-22
**Feature:** `validateBalagruhaAccess` middleware prevents URL parameter manipulation
**Files Modified:**
- `backend/middleware/checkPermission.js` - Added validateBalagruhaAccess middleware
- `backend/routes/v1/user.js` - Added to 2 routes
- `backend/routes/v1/music.js` - Added to 2 routes
- `backend/routes/taskRoutes.js` - Added to 1 route

### Test Case P3.1: Admin Can Access Any BalagruhaId URL Parameter
- **Login:** admin@test.com (scope='all')
- **Navigate:** GET `/api/v1/users/students/:balagruhaId` with BalagruhaA_ID
- **Expected:** ✅ SUCCESS - Returns students from Balagruha A
- **Navigate:** GET `/api/v1/users/students/:balagruhaId` with BalagruhaB_ID
- **Expected:** ✅ SUCCESS - Returns students from Balagruha B
- **Navigate:** GET `/api/v1/users/students/:balagruhaId` with BalagruhaC_ID
- **Expected:** ✅ SUCCESS - Returns students from Balagruha C
- **Verify:** Admin can access ANY balagruhaId in URL parameters

### Test Case P3.2: Coach Can Access ONLY Assigned BalagruhaId URL Parameters
- **Login:** coach1@test.com (assigned to Balagruha A only)
- **Navigate:** GET `/api/v1/users/students/:balagruhaId` with BalagruhaA_ID
- **Expected:** ✅ SUCCESS - Returns students from Balagruha A
- **Navigate:** GET `/api/v1/users/students/:balagruhaId` with BalagruhaB_ID
- **Expected:** ❌ 403 FORBIDDEN - "Access denied. You do not have permission to access this Balagruha."
- **Navigate:** GET `/api/v1/users/students/:balagruhaId` with BalagruhaC_ID
- **Expected:** ❌ 403 FORBIDDEN
- **Verify:** validateBalagruhaAccess middleware blocks unassigned Balagruha access

### Test Case P3.3: Multi-Balagruha Coach Can Access All Assigned
- **Login:** coach3@test.com (assigned to Balagruha A AND B)
- **Navigate:** GET `/api/v1/users/students/:balagruhaId` with BalagruhaA_ID
- **Expected:** ✅ SUCCESS
- **Navigate:** GET `/api/v1/users/students/:balagruhaId` with BalagruhaB_ID
- **Expected:** ✅ SUCCESS
- **Navigate:** GET `/api/v1/users/students/:balagruhaId` with BalagruhaC_ID
- **Expected:** ❌ 403 FORBIDDEN
- **Verify:** Can access BOTH assigned Balagruhas, blocked from unassigned

### Test Case P3.4: Student CANNOT Access Balagruha-Level Routes
- **Login:** student1@test.com (scope='own')
- **Navigate:** GET `/api/v1/users/students/:balagruhaId` with ANY balagruhaId
- **Expected:** ❌ 403 FORBIDDEN - "Access denied. You do not have permission to access Balagruha-level data."
- **Verify:** Students should NEVER access Balagruha-level routes (scope='own')

### Test Case P3.5: Validate All Protected Routes with :balagruhaId
**Login:** coach1@test.com (Balagruha A only)

**Route 1: GET `/api/v1/users/students/:balagruhaId`**
- Assigned: ✅ SUCCESS
- Unassigned: ❌ 403

**Route 2: GET `/api/v1/users/students/attendance/:balagruhaId`**
- Assigned: ✅ SUCCESS
- Unassigned: ❌ 403

**Route 3: GET `/api/v1/music/overview/:balagruhaId`**
- Assigned: ✅ SUCCESS
- Unassigned: ❌ 403

**Route 4: GET `/api/v1/music/training-sessions/:balagruhaId`**
- Assigned: ✅ SUCCESS
- Unassigned: ❌ 403

**Route 5: GET `/api/tasks/overview/details/:balagruhaId`**
- Assigned: ✅ SUCCESS
- Unassigned: ❌ 403

### Test Case P3.6: URL Manipulation Attack Scenarios
**Scenario 1: Coach tries to access another coach's Balagruha**
- **Login:** coach1@test.com (Balagruha A)
- **Attack:** GET `/api/v1/users/students/:balagruhaId` with coach2's Balagruha B ID
- **Expected:** ❌ 403 FORBIDDEN with message: "Access denied. You do not have permission to access this Balagruha."
- **Verify:** Middleware compares :balagruhaId against user.balagruhaIds array

**Scenario 2: Invalid/Non-existent balagruhaId**
- **Login:** coach1@test.com
- **Attack:** GET `/api/v1/users/students/:balagruhaId` with `000000000000000000000000`
- **Expected:** ❌ 403 FORBIDDEN (not in assigned list)
- **Verify:** validateBalagruhaAccess checks BEFORE database query

**Scenario 3: Malformed balagruhaId**
- **Login:** coach1@test.com
- **Attack:** GET `/api/v1/users/students/:balagruhaId` with `<script>alert('xss')</script>`
- **Expected:** Express validates ObjectId format OR 403 if passes validation
- **Verify:** No code injection, proper error handling

### Test Case P3.7: Error Response Format Validation
**Login:** coach1@test.com (Balagruha A)
**Attack:** GET `/api/v1/users/students/:balagruhaId` with Balagruha B ID

**Expected Response:**
```json
{
  "success": false,
  "message": "Access denied. You do not have permission to access this Balagruha.",
  "balagruhaId": "6809e00080aacbb08e74cde8",
  "assignedBalagruhas": 1
}
```

**Verify:**
- Status code: 403
- success: false
- message: Clear explanation
- balagruhaId: Echo back attempted ID
- assignedBalagruhas: Count for debugging (but not IDs for security)

---

## Rollback Plan

### If Critical Bug Found During QA

**Rollback Steps:**
1. Checkout main branch: `git checkout main`
2. Database rollback (if migration ran):
   ```bash
   node backend/migrations/rollback-scope-field.js
   ```
3. Remove scope field from Role collection
4. Restore auth.js development bypass (if needed for dev)

**Rollback Decision Criteria:**
- [ ] Critical security vulnerability found
- [ ] Performance degradation > 20%
- [ ] Data corruption detected
- [ ] Production blocking bug

**Partial Rollback (Scope Field Only):**
```javascript
// Rollback migration
db.roles.updateMany({}, { $unset: { "permissions.$[].scope": "" } });
```

**Full Rollback (All Changes):**
- Revert all commits from feature branch
- Use previous version of auth.js and checkPermission.js

---

## QA Sign-Off Checklist

### Functionality
- [ ] All 8 acceptance criteria verified
- [ ] All 4 penetration tests passed
- [ ] All user roles tested (Admin, Coach, Student)
- [ ] Multi-Balagruh access verified
- [ ] Data isolation confirmed

### Performance
- [ ] Query performance < 10% degradation
- [ ] Permission check latency < 50ms
- [ ] Database indexes verified
- [ ] No memory leaks detected

### Security
- [ ] Development bypass removed
- [ ] No permission escalation possible
- [ ] Data isolation enforced at API level
- [ ] Frontend checks complement backend (not replace)

### Documentation
- [ ] API documentation updated with scope requirements
- [ ] Migration process documented
- [ ] Rollback plan tested
- [ ] E2E test scenarios documented (this file)

---

## Test Execution Log

| Test Case | Status | Tester | Date | Notes |
|-----------|--------|--------|------|-------|
| AC1.1 | ⬜ Pending | - | - | - |
| AC1.2 | ⬜ Pending | - | - | - |
| AC1.3 | ⬜ Pending | - | - | - |
| AC1.4 | ⬜ Pending | - | - | - |
| AC2.1 | ⬜ Pending | - | - | - |
| AC2.2 | ⬜ Pending | - | - | - |
| AC2.3 | ⬜ Pending | - | - | - |
| AC2.4 | ⬜ Pending | - | - | - |
| AC3.1 | ⬜ Pending | - | - | - |
| AC3.2 | ⬜ Pending | - | - | - |
| AC3.3 | ⬜ Pending | - | - | - |
| AC3.4 | ⬜ Pending | - | - | - |
| AC4.1 | ⬜ Pending | - | - | - |
| AC4.2 | ⬜ Pending | - | - | - |
| AC4.3 | ⬜ Pending | - | - | - |
| AC4.4 | ⬜ Pending | - | - | - |
| AC4.5 | ⬜ Pending | - | - | - |
| AC5.1 | ⬜ Pending | - | - | - |
| AC5.2 | ⬜ Pending | - | - | - |
| AC5.3 | ⬜ Pending | - | - | - |
| AC6.1 | ⬜ Pending | - | - | - |
| AC6.2 | ⬜ Pending | - | - | - |
| AC6.3 | ⬜ Pending | - | - | - |
| AC7.1 | ⬜ Pending | - | - | - |
| AC7.2 | ⬜ Pending | - | - | - |
| AC7.3 | ⬜ Pending | - | - | - |
| AC7.4 | ⬜ Pending | - | - | - |
| AC8.1 | ⬜ Pending | - | - | - |
| AC8.2 | ⬜ Pending | - | - | - |
| AC8.3 | ⬜ Pending | - | - | - |
| AC8.4 | ⬜ Pending | - | - | - |
| PT1 | ⬜ Pending | - | - | Penetration Test 1 |
| PT2 | ⬜ Pending | - | - | Penetration Test 2 |
| PT3 | ⬜ Pending | - | - | Penetration Test 3 |
| PT4 | ⬜ Pending | - | - | Penetration Test 4 |

---

**Last Updated:** 2025-10-18 22:33:41
**Dev Agent:** James
**QA Handoff:** READY FOR QA
**Estimated QA Time:** 8-12 hours
