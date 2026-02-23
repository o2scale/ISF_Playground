# RBAC Permissions Audit Report

**Date:** February 20, 2026  
**Auditor:** Dev Agent  
**Purpose:** Comprehensive audit of RBAC permissions to identify potential issues after recent changes

---

## Executive Summary

This audit examines the current state of Role-Based Access Control (RBAC) across the ISF Playground application. The goal is to identify any missing, incorrect, or overly permissive permissions that may have been introduced during recent RBAC refactoring.

### Key Findings
1. **Multiple roles are missing from `setupDefaultRoles.js`** - sports-coach, music-coach, medical-incharge, amma have NO default permissions defined
2. **Frontend uses role-based menu filtering** - Backend permissions may not match frontend expectations
3. **Purchase Request access is overly permissive** - `checkPurchaseRequestAccess.js` allows ALL non-student roles
4. **Missing scope values in default roles** - Default roles don't include scope field (own/balagruh/all)
5. **ProtectedRoute permission checks are COMMENTED OUT** - Frontend doesn't enforce permissions

---

## 1. Roles Defined in System

### Backend Constants (`backend/constants/users.js`)
```javascript
UserTypes = {
  ADMIN: "admin",
  COACH: "coach",
  IN_CHARGE: "balagruha in-charge",
  STUDENT: "student",
  PURCHASE_MANAGER: "purchase-manager",
  MEDICAL_IN_CHARGE: "medical-incharge",
  SPORTS_COACH: "sports-coach",
  MUSIC_COACH: "music-coach",
  AMMA: "amma",
}
```

### Roles with Default Permissions (`backend/scripts/setupDefaultRoles.js`)
| Role | Has Default Permissions | Scope Defined |
|------|------------------------|---------------|
| admin | ✅ Yes | ❌ No |
| purchase-manager | ✅ Yes | ❌ No |
| coach | ✅ Yes | ❌ No |
| student | ✅ Yes | ❌ No |
| balagruha-incharge | ✅ Yes | ❌ No |
| **sports-coach** | ❌ **NO** | ❌ No |
| **music-coach** | ❌ **NO** | ❌ No |
| **medical-incharge** | ❌ **NO** | ❌ No |
| **amma** | ❌ **NO** | ❌ No |

**CRITICAL ISSUE:** 4 roles have NO default permissions defined!

---

## 2. Current Default Permissions by Role

### Admin
```javascript
permissions: [
  { module: "User Management", actions: ["Create", "Read", "Update", "Delete"] },
  { module: "Role Management", actions: ["Create", "Read", "Update", "Delete"] },
  { module: "Task Management", actions: ["Create", "Read", "Update", "Delete"] },
  { module: "Machine Management", actions: ["Create", "Read", "Update", "Delete"] },
  { module: "WTF Management", actions: ["Create", "Read", "Update", "Delete"] },
  { module: "WTF Interaction", actions: ["Create", "Read", "Update", "Delete"] },
  { module: "WTF Submission", actions: ["Create", "Read", "Update", "Delete"] },
  { module: "WTF Coach Suggestion", actions: ["Create", "Read", "Update", "Delete"] },
  { module: "WTF Analytics", actions: ["Create", "Read", "Update", "Delete"] },
  { module: "Coin Analytics", actions: ["Create", "Read", "Update", "Delete"] },
  { module: "Shop Management", actions: ["Manage"] },
  { module: "notifications", actions: ["Create", "Read", "Update", "Delete"] },
]
```

### Purchase-Manager
```javascript
permissions: [
  { module: "Shop Management", actions: ["Manage"] }
]
```

### Coach
```javascript
permissions: [
  { module: "Task Management", actions: ["Create", "Read", "Update"] },
  { module: "WTF Management", actions: ["Read"] },
  { module: "WTF Interaction", actions: ["Create", "Read"] },
  { module: "WTF Submission", actions: ["Read", "Update"] },
  { module: "WTF Coach Suggestion", actions: ["Create", "Read"] },
]
```

### Student
```javascript
permissions: [
  { module: "WTF Interaction", actions: ["Create", "Read"] },
  { module: "WTF Submission", actions: ["Create", "Read"] },
]
```

### Balagruha-Incharge
```javascript
permissions: [
  { module: "Task Management", actions: ["Create", "Read", "Update"] },
  { module: "WTF Management", actions: ["Read"] },
  { module: "WTF Interaction", actions: ["Read"] },
  { module: "WTF Submission", actions: ["Read"] },
]
```

### Sports-Coach, Music-Coach, Medical-Incharge, Amma
```javascript
permissions: []  // NO PERMISSIONS DEFINED!
```

---

## 3. Frontend Menu Access by Role (`frontend/src/components/Layout.js`)

### Menu Items and Allowed Roles

| Menu Item | Allowed Roles |
|-----------|---------------|
| Dashboard | admin, coach, balagruha-incharge, student, purchase-manager, medicalincharge, sports-coach, music-coach, amma |
| Users | admin, coach |
| Machines | admin, coach, balagruha-incharge, purchase-manager, medicalincharge, sports-coach, music-coach, amma |
| Tasks | admin, coach |
| Attendance | admin, coach |
| Balagruhas | admin |
| Courses | admin |
| Access (RBAC) | admin |
| Repairs | admin |
| Purchases | admin, purchase-manager, coach, medicalincharge, balagruha-incharge, sports-coach, music-coach, amma |
| Shop | student, admin, coach, medicalincharge, balagruha-incharge, sports-coach, music-coach, amma |
| WTF | admin, coach, balagruha-incharge, student, medicalincharge, sports-coach, music-coach, amma |
| Translations | admin |
| Coach Courses | coach |
| Coach Assignments | coach |
| Student My Courses | student |

### Custom Dashboard Menus

**Medical Incharge Menu:**
- Dashboard, Students, Check Ins, Tasks, Machines, Purchases, Shop

**Sports Coach Menu:**
- Dashboard, Students, Training, Sports Tasks, Performance, Reports, Tasks, Machines, Purchases, Shop

**Music Coach Menu:**
- Dashboard, Students, Training, Music Tasks, Performance, Reports, Tasks, Machines, Purchases, Shop

**Amma Menu:**
- Dashboard, Students, Tasks, Machines, Purchases, Shop

---

## 4. API Endpoints and Required Permissions

### User Management (`backend/routes/userRoutes.js`)
| Endpoint | Method | Required Permission |
|----------|--------|---------------------|
| `/api/users` | GET | User Management: Read |
| `/api/users/me/balagruhas` | GET | authenticate only |
| `/api/users/assignable-for-schedule` | GET | Daily Schedule: Read |
| `/api/users/:_id` | GET | User Management: Read |
| `/api/users` | POST | User Management: Create |
| `/api/users/:id` | PUT | User Management: Update |
| `/api/users/:id` | DELETE | User Management: Delete |

### Task Management (`backend/routes/taskRoutes.js`)
| Endpoint | Method | Required Permission |
|----------|--------|---------------------|
| `/api/tasks` | POST | Task Management: Create |
| `/api/tasks/:id` | PUT | Task Management: Update |
| `/api/tasks` | GET | Task Management: Read |
| `/api/tasks/user/:userId` | GET | Task Management: Read |
| `/api/tasks/overview` | GET | Task Management: Read |
| `/api/tasks/assignable-users` | GET | Task Management: Read |
| `/api/tasks/all/list` | POST | Task Management: Read |
| `/api/tasks/overview/details/:balagruhaId` | GET | Task Management: Read + validateBalagruhaAccess |
| `/api/tasks/status/:id` | PUT | Task Management: Update |
| `/api/tasks/comment/:taskId` | POST | Task Management: Update |
| `/api/tasks/attachments/:taskId` | PUT | Task Management: Update |
| `/api/tasks/attachments/:taskId/:attachmentId` | DELETE | Task Management: Update |
| `/api/tasks/comment/:taskId/:commentId` | DELETE | Task Management: Update |
| `/api/tasks/:taskId` | GET | Task Management: Read |

### Machine Management (`backend/routes/v1/machines.js`)
| Endpoint | Method | Required Permission |
|----------|--------|---------------------|
| `/api/machines` | GET | Machine Management: Read |
| `/api/machines` | POST | Machine Management: Create |
| `/api/machines/:id/status` | PUT | Machine Management: Update |
| `/api/machines/:id/assign` | PUT | Machine Management: Update |
| `/api/machines/:id/history` | GET | Machine Management: Read |
| `/api/machines/:id` | DELETE | Machine Management: Delete |
| `/api/machines/unassigned` | GET | Machine Management: Read |

### Balagruha Management (`backend/routes/v1/balagruha.js`)
| Endpoint | Method | Required Permission |
|----------|--------|---------------------|
| `/api/balagruha` | POST | User Management: Create |
| `/api/balagruha` | GET | User Management: Read |
| `/api/balagruha/with-stock` | GET | User Management: Read |
| `/api/balagruha/:id` | GET | User Management: Read |
| `/api/balagruha/:id` | PUT | User Management: Update |
| `/api/balagruha/:id` | DELETE | User Management: Delete |
| `/api/balagruha/user/:userId` | GET | User Management: Read |
| `/api/balagruha/user/assigned/:userId` | GET | User Management: Read |

### Shop/Purchase Management (`backend/routes/v2/shop.js`)
| Endpoint | Method | Required Permission |
|----------|--------|---------------------|
| `/api/v2/shop/products` | GET | Public |
| `/api/v2/shop/products/featured` | GET | Public |
| `/api/v2/shop/products/:id` | GET | Public |
| `/api/v2/shop/categories` | GET | Public |
| `/api/v2/shop/products/:productId/images` | POST | Shop Management: Manage |
| `/api/v2/shop/products/:productId/images/:imageId` | DELETE | Shop Management: Manage |
| `/api/v2/shop/products/:productId/images/:imageId/primary` | PUT | Shop Management: Manage |
| `/api/v2/shop/admin/inventory/stock-levels` | GET | Purchase Management: Read |
| `/api/v2/shop/vendors` | GET | Purchase Management: Read |
| `/api/v2/shop/admin/analytics/most-consumed` | GET | Purchase Management: Read |

### Purchase Requests (`backend/routes/v2/purchase-requests.js`)
| Endpoint | Method | Required Permission |
|----------|--------|---------------------|
| `/api/v2/shop/admin/purchase-requests/products/low-stock` | GET | checkPurchaseRequestAccess() |
| `/api/v2/shop/admin/purchase-requests` | POST | checkPurchaseRequestAccess() |
| `/api/v2/shop/admin/purchase-requests/my` | GET | checkPurchaseRequestAccess() |
| `/api/v2/shop/admin/purchase-requests/:id` | PUT | checkPurchaseRequestAccess() |
| `/api/v2/shop/admin/purchase-requests/:id` | DELETE | checkPurchaseRequestAccess() |
| `/api/v2/shop/admin/purchase-requests/:id/cancel` | PUT | checkPurchaseRequestAccess() |
| `/api/v2/shop/admin/purchase-requests/:id` | GET | checkPurchaseRequestAccess() |
| `/api/v2/shop/admin/purchase-requests/pending-count` | GET | checkPurchaseRequestAccess() |
| `/api/v2/shop/admin/purchase-requests/stats` | GET | Purchase Management: Manage |
| `/api/v2/shop/admin/purchase-requests` | GET | checkPurchaseRequestAccess() |
| `/api/v2/shop/admin/purchase-requests/:id/approve` | POST | Purchase Management: Manage |
| `/api/v2/shop/admin/purchase-requests/:id/reject` | POST | Purchase Management: Manage |
| `/api/v2/shop/admin/purchase-requests/:id/complete` | POST | Purchase Management: Update |
| `/api/v2/shop/admin/purchase-requests/:id/status` | PATCH | (checked in controller) |
| `/api/v2/shop/admin/purchase-requests/:id/assign-stock` | POST | Purchase Management: Update |

### Medical Check-ins (`backend/routes/medicalCheckInsRoutes.js`)
| Endpoint | Method | Required Permission |
|----------|--------|---------------------|
| `/api/medical-checkins` | POST | authenticate only |
| `/api/medical-checkins` | GET | authenticate only |
| `/api/medical-checkins/student/:studentId` | GET | authenticate only |
| `/api/medical-checkins/:checkInId` | GET | authenticate only |
| `/api/medical-checkins/:checkInId` | PUT | authenticate only |
| `/api/medical-checkins/:checkInId` | DELETE | authenticate only |
| `/api/medical-checkins/attachments/:checkInId` | PUT | authenticate only |
| `/api/medical-checkins/attachments/:checkInId/:attachmentId` | DELETE | authenticate only |
| `/api/medical-checkins/students/list` | POST | authenticate only |

### WTF (Walk The Flow) (`backend/routes/v1/wtf.js`)
Uses `WtfPermissions` constants for authorization.

| Permission Constant | Module |
|---------------------|--------|
| WTF_PIN_CREATE/READ/UPDATE/DELETE | WTF Management |
| WTF_INTERACTION_CREATE/READ | WTF Interaction |
| WTF_SUBMISSION_CREATE/READ/UPDATE | WTF Submission |
| WTF_COACH_SUGGESTION_CREATE/READ | WTF Coach Suggestion |
| WTF_ANALYTICS_READ | WTF Analytics |
| WTF_ADMIN | WTF Admin |

### Schedule Management (`backend/routes/scheduleRoutes.js`)
| Endpoint | Method | Required Permission |
|----------|--------|---------------------|
| `/api/schedules` | POST | authenticate only |
| `/api/schedules/:scheduleId` | GET | Schedule Management: Read |
| `/api/schedules` | GET | Schedule Management: Read |
| `/api/schedules/:scheduleId` | PUT | authenticate only |
| `/api/schedules/:scheduleId` | DELETE | authenticate only |
| `/api/schedules/user/:userId` | GET | Schedule Management: Read |
| `/api/schedules/admin` | POST | authenticate only |
| `/api/schedules/coach` | POST | authenticate only |
| `/api/schedules/status/:scheduleId` | PUT | authenticate only |

### Sports (`backend/routes/v1/sports.js`)
| Endpoint | Method | Required Permission |
|----------|--------|---------------------|
| `/api/sports/task` | POST | Task Management: Create |
| `/api/sports/task/:taskId` | PUT | Task Management: Update |
| `/api/sports/task/attachments/:taskId` | POST | Task Management: Update |
| `/api/sports/tasks/comment/:taskId` | POST | Task Management: Update |
| `/api/sports/tasks/list` | POST | Task Management: Read |
| `/api/sports/training-session` | POST | Task Management: Create |
| `/api/sports/overview` | GET | Task Management: Read |
| `/api/sports/training-sessions` | GET | Task Management: Read |
| `/api/sports/students/all` | POST | Task Management: Read |
| `/api/sports/training-session/:trainingSessionId` | PUT | Task Management: Update |
| `/api/sports/training-session/:trainingSessionId` | DELETE | Task Management: Delete |

### Music (`backend/routes/v1/music.js`)
| Endpoint | Method | Required Permission |
|----------|--------|---------------------|
| `/api/music/task` | POST | Task Management: Create |
| `/api/music/task/:taskId` | PUT | Task Management: Update |
| `/api/music/task/attachments/:taskId` | POST | Task Management: Update |
| `/api/music/tasks/comment/:taskId` | POST | Task Management: Update |
| `/api/music/tasks/list` | POST | Task Management: Read |
| `/api/music/training-session` | POST | Task Management: Create |
| `/api/music/overview/:balagruhaId` | GET | Task Management: Read + validateBalagruhaAccess |
| `/api/music/training-sessions/:balagruhaId` | GET | Task Management: Read + validateBalagruhaAccess |
| `/api/music/students/all` | POST | Task Management: Read |
| `/api/music/training-session/:trainingSessionId` | PUT | Task Management: Update |
| `/api/music/training-session/:trainingSessionId` | DELETE | Task Management: Delete |

---

## 5. Permission Mismatches Identified

### Issue 1: Missing Default Permissions for 4 Roles
**Severity:** HIGH

**Roles affected:**
- sports-coach
- music-coach
- medical-incharge
- amma

**Problem:** These roles have NO permissions defined in `setupDefaultRoles.js`, but they DO have menu access in the frontend.

**Impact:**
- Users with these roles will get 403 Forbidden errors when trying to access features shown in their menus
- Tasks menu shows for sports-coach/music-coach/amma but they don't have Task Management permissions
- Machines menu shows but no Machine Management permissions

**Required Permissions Based on Menu Access:**

| Role | Menu Items | Required Permissions (Missing) |
|------|------------|-------------------------------|
| sports-coach | Tasks, Machines, Purchases, Shop, Dashboard | Task Management (CRU), Machine Management (R), Purchase Management (R) |
| music-coach | Tasks, Machines, Purchases, Shop, Dashboard | Task Management (CRU), Machine Management (R), Purchase Management (R) |
| medicalincharge | Tasks, Machines, Purchases, Shop, Dashboard | Task Management (CRU), Machine Management (R), Purchase Management (R) |
| amma | Tasks, Machines, Purchases, Shop, Dashboard | Task Management (CRU), Machine Management (R), Purchase Management (R) |

---

### Issue 2: Missing Scope Values in Default Roles
**Severity:** MEDIUM

**Problem:** The `setupDefaultRoles.js` file doesn't include the `scope` field in permissions, but the middleware (`checkPermission.js`) expects it.

**Current default:** `scope: 'own'` (set in schema)

**Expected scopes by role:**
| Role | Expected Scope |
|------|---------------|
| admin | all |
| purchase-manager | balagruh |
| coach | balagruh |
| student | own |
| balagruha-incharge | balagruh |

**Impact:** Without proper scope, data filtering may not work correctly. Coaches might see all data instead of just their assigned Balagruhas.

---

### Issue 3: Purchase Request Access Too Permissive
**Severity:** MEDIUM

**File:** `backend/middleware/checkPurchaseRequestAccess.js`

**Current Logic:**
```javascript
// Blocks ONLY students
const blockedRoles = ['student'];
if (blockedRoles.includes(userRole)) {
  return res.status(403).json({...});
}
// All other roles allowed
```

**Problem:** This allows ANY non-student role to create/view purchase requests, including roles that may not have Purchase Management permissions.

**Expected Behavior:** Should check if user has Purchase Management permissions OR is in an approved role list.

---

### Issue 4: Frontend ProtectedRoute Permission Checks Disabled
**Severity:** HIGH

**File:** `frontend/src/components/ProtectedRoute.js` (lines 38-41)

**Current Code:**
```javascript
// if (!hasPermission) {
//     console.log(`Access denied for ${user?.role} to ${action} on ${module}`);
//     return <Navigate to="/access-denied" replace />;
// }
```

**Problem:** The permission check is COMMENTED OUT! This means any authenticated user can access any protected route, regardless of permissions.

**Impact:** Frontend doesn't enforce RBAC at all - relies entirely on backend.

---

### Issue 5: Medical Check-ins Have No Permission Checks
**Severity:** MEDIUM

**File:** `backend/routes/medicalCheckInsRoutes.js`

**Problem:** All endpoints only use `authenticate` middleware, no `authorize` checks.

**Impact:** Any authenticated user can create/view/update/delete medical check-ins, regardless of role.

---

### Issue 6: Schedule Management Inconsistent Permissions
**Severity:** LOW

**File:** `backend/routes/scheduleRoutes.js`

**Problem:** Some endpoints require "Schedule Management: Read" permission, but create/update/delete only require authentication.

**Inconsistency:**
- GET `/api/schedules/:scheduleId` - requires Schedule Management: Read
- POST `/api/schedules` - only authenticate
- PUT `/api/schedules/:scheduleId` - only authenticate
- DELETE `/api/schedules/:scheduleId` - only authenticate

---

### Issue 7: Frontend Menu vs Backend Permission Mismatch
**Severity:** MEDIUM

**Examples:**

1. **Machines Menu:**
   - Frontend shows Machines menu to: admin, coach, balagruha-incharge, purchase-manager, medicalincharge, sports-coach, music-coach, amma
   - Backend requires: Machine Management: Read
   - Only admin has Machine Management permissions!

2. **Tasks Menu:**
   - Frontend shows Tasks menu to: admin, coach
   - But custom menus show Tasks to sports-coach, music-coach, amma, medicalincharge
   - Backend requires: Task Management permissions
   - These roles don't have Task Management permissions!

3. **Purchases Menu:**
   - Frontend shows Purchases to: admin, purchase-manager, coach, medicalincharge, balagruha-incharge, sports-coach, music-coach, amma
   - Backend uses `checkPurchaseRequestAccess()` which allows all non-students
   - But Purchase Management permissions are only for admin and purchase-manager

---

## 6. Recommendations

### Immediate Actions Required

1. **Add Missing Role Permissions to `setupDefaultRoles.js`:**
```javascript
{
  roleName: "sports-coach",
  permissions: [
    { module: "Task Management", actions: ["Create", "Read", "Update"], scope: "balagruh" },
    { module: "Machine Management", actions: ["Read"], scope: "balagruh" },
    { module: "Purchase Management", actions: ["Read"], scope: "balagruh" },
    { module: "WTF Management", actions: ["Read"], scope: "balagruh" },
    { module: "WTF Interaction", actions: ["Create", "Read"], scope: "own" },
    { module: "WTF Coach Suggestion", actions: ["Create", "Read"], scope: "own" },
  ],
},
{
  roleName: "music-coach",
  permissions: [
    { module: "Task Management", actions: ["Create", "Read", "Update"], scope: "balagruh" },
    { module: "Machine Management", actions: ["Read"], scope: "balagruh" },
    { module: "Purchase Management", actions: ["Read"], scope: "balagruh" },
    { module: "WTF Management", actions: ["Read"], scope: "balagruh" },
    { module: "WTF Interaction", actions: ["Create", "Read"], scope: "own" },
    { module: "WTF Coach Suggestion", actions: ["Create", "Read"], scope: "own" },
  ],
},
{
  roleName: "medical-incharge",
  permissions: [
    { module: "Task Management", actions: ["Create", "Read", "Update"], scope: "balagruh" },
    { module: "Machine Management", actions: ["Read"], scope: "balagruh" },
    { module: "Purchase Management", actions: ["Read"], scope: "balagruh" },
    { module: "WTF Management", actions: ["Read"], scope: "balagruh" },
    { module: "WTF Interaction", actions: ["Read"], scope: "own" },
    { module: "Medical Management", actions: ["Create", "Read", "Update", "Delete"], scope: "balagruh" },
  ],
},
{
  roleName: "amma",
  permissions: [
    { module: "Task Management", actions: ["Create", "Read", "Update"], scope: "balagruh" },
    { module: "Machine Management", actions: ["Read"], scope: "balagruh" },
    { module: "Purchase Management", actions: ["Read"], scope: "balagruh" },
    { module: "WTF Management", actions: ["Read"], scope: "balagruh" },
  ],
},
```

2. **Update Existing Roles to Include Scope:**
```javascript
// Admin - scope: 'all'
{ module: "User Management", actions: ["Create", "Read", "Update", "Delete"], scope: "all" }

// Coach - scope: 'balagruh'
{ module: "Task Management", actions: ["Create", "Read", "Update"], scope: "balagruh" }

// Student - scope: 'own'
{ module: "WTF Interaction", actions: ["Create", "Read"], scope: "own" }
```

3. **Enable Frontend Permission Checks:**
   - Uncomment the permission check in `ProtectedRoute.js`
   - Ensure RBACContext properly loads user permissions

4. **Fix Medical Check-in Permissions:**
   - Add appropriate `authorize` middleware to medical check-in routes
   - Consider creating a new "Medical Management" module

5. **Review Purchase Request Access:**
   - Either add Purchase Management permissions to all roles that need access
   - OR update `checkPurchaseRequestAccess` to check for specific approved roles

### Testing Checklist

- [ ] Test each role can access their assigned menus
- [ ] Test each role gets 403 when accessing unauthorized features
- [ ] Test data scoping (coach only sees their Balagruha data)
- [ ] Test purchase request creation for each role
- [ ] Test task management for coaches
- [ ] Test medical check-ins for medical-incharge
- [ ] Test sports/music coach specific features

---

## 7. Summary Table: Role Permissions Status

| Role | Has Defaults | Has Scope | Can Access Tasks | Can Access Machines | Can Access Purchases | Can Access Shop | Can Access WTF |
|------|-------------|-----------|------------------|---------------------|----------------------|-----------------|----------------|
| admin | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| purchase-manager | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| coach | ✅ | ❌ | ✅ | ❌ | ⚠️* | ❌ | ✅ |
| student | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| balagruha-incharge | ✅ | ❌ | ✅ | ❌ | ⚠️* | ❌ | ✅ |
| **sports-coach** | ❌ | ❌ | ❌** | ❌** | ⚠️* | ❌** | ❌** |
| **music-coach** | ❌ | ❌ | ❌** | ❌** | ⚠️* | ❌** | ❌** |
| **medical-incharge** | ❌ | ❌ | ❌** | ❌** | ⚠️* | ❌** | ❌** |
| **amma** | ❌ | ❌ | ❌** | ❌** | ⚠️* | ❌** | ❌** |

*Purchase request access via `checkPurchaseRequestAccess()` middleware which allows all non-students
**Will get 403 Forbidden due to missing permissions

---

**Report Complete** - Ready for review and remediation planning
