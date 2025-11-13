# QA Handoff Document - Sprint 6 Story 1 Bug Fix (S6-S1-PROD-BUG-001)

**Bug ID:** S6-S1-PROD-BUG-001
**Story:** Sprint6-Story-01 - Coach View Corrections
**Developer:** Dev Agent
**Date:** 2025-11-13 17:20:52
**Status:** ✅ READY FOR QA TESTING

---

## 🎯 What Was Fixed

### Bug Description
**Problem 1:** Coaches were completely BLOCKED from creating schedules. Backend rejected all non-ADMIN users with authorization error.

**Problem 2:** The "Assign To" dropdown showed ALL users from ALL Balagruhas, not just the coach's assigned Balagruhas.

**Problem 3:** Students appeared in the dropdown (though frontend filtered them, it wasn't secure).

### Solution Implemented
✅ **Backend authorization updated** - Both ADMIN and COACH roles can now create schedules
✅ **New API endpoint created** - Returns filtered users based on role and Balagruha assignments
✅ **Frontend updated** - Uses new API for secure, backend-filtered user lists
✅ **Comprehensive validation** - Multiple layers of security checks in backend

---

## 📋 What QA Needs to Test

### Priority 0 (Critical - Must Pass)
1. **Coach can create schedules** (was completely blocked before)
2. **Coach only sees users from assigned Balagruha(s)** in dropdown
3. **Students NEVER appear** in the dropdown (for both Admin and Coach)
4. **Admin still has global access** (no regression)

### Priority 1 (High - Should Pass)
1. **Backend validates** coach cannot bypass frontend restrictions via API
2. **Sports-coach and Music-coach** roles work same as coach
3. **Schedule creation still works** end-to-end (no regressions)

---

## 📁 Test Documentation

**Complete E2E Test Cases:**
```
D:\Dev\ISF_Playground\docs\qa\e2e\sprint6-story-01-bug-001-schedule-assignment-fix.md
```

This document contains:
- ✅ 16 comprehensive test cases
- ✅ Step-by-step instructions with screenshots
- ✅ API testing scenarios (Postman tests)
- ✅ Expected vs actual behavior
- ✅ Test data setup guide
- ✅ 30-minute quick verification script
- ✅ Bug report template

---

## 🧪 Test Data Setup

### Required Test Users

| Account | Email | Password | Role | Assigned Balagruhas | Purpose |
|---------|-------|----------|------|---------------------|---------|
| Coach 1 | coach1@test.com | Coach@2024 | coach | Balagruha A only | Test single Balagruha filtering |
| Coach 2 | coach2@test.com | Coach@2024 | coach | Balagruha A, B | Test multiple Balagruha filtering |
| Sports Coach | sportscoach@test.com | Coach@2024 | sports-coach | Balagruha B | Test sports-coach role works |
| Admin | admin@test.com | Admin@2024 | admin | N/A (global) | Test admin global access |

### Required Test Data

**Balagruha A Users:**
- 2 coaches (visible to coach1, coach2)
- 2 students (should NOT be visible)
- 1 sports-coach

**Balagruha B Users:**
- 2 coaches (visible to coach2, NOT coach1)
- 2 students (should NOT be visible)
- 1 music-coach

**Balagruha C Users:**
- 2 coaches (NOT visible to coach1 or coach2)
- 2 students (should NOT be visible)

---

## ⚡ Quick Verification (30 Minutes)

**Step-by-step quick test:**

### Test 1: Coach Can Create Schedule (5 min)
```
1. Login as coach1@test.com
2. Click "Daily Schedule" card
3. Click any time slot
4. Verify: Form opens (no authorization error)
5. Verify: "Assign To" dropdown shows users
6. Create schedule
7. Verify: Schedule created successfully
```
**Expected:** ✅ No authorization errors, schedule created

---

### Test 2: Filtered User List (5 min)
```
1. Still logged in as coach1
2. Open "Assign To" dropdown
3. Count users shown
4. Verify: Only shows ~2 users (coaches from Balagruha A)
5. Verify: NO students visible
6. Verify: NO users from other Balagruhas
```
**Expected:** ✅ Only Balagruha A coaches/staff visible

---

### Test 3: Multiple Balagruha Coach (5 min)
```
1. Logout, login as coach2@test.com
2. Open schedule creation
3. Open "Assign To" dropdown
4. Verify: Shows users from BOTH Balagruha A and B
5. Verify: Does NOT show users from Balagruha C
```
**Expected:** ✅ Shows users from multiple assigned Balagruhas

---

### Test 4: Admin Global Access (5 min)
```
1. Logout, login as admin@test.com
2. Open schedule creation
3. Open "Assign To" dropdown
4. Verify: Shows ALL coaches from ALL Balagruhas
5. Verify: Still NO students visible
```
**Expected:** ✅ Admin sees all coaches globally

---

### Test 5: API Security Test (10 min)
**Tool:** Postman or browser DevTools

```
1. Login as coach1
2. Open DevTools > Network tab
3. Create valid schedule for Balagruha A (success)
4. Copy request, modify to use Balagruha C ID
5. Send modified request
6. Verify: Backend REJECTS with error message
```
**Expected:** ✅ Backend validation prevents unauthorized Balagruha access

---

## 🔍 Files Changed

| File | Changes | Why |
|------|---------|-----|
| `backend/controllers/userController.js` | New API endpoint `getAssignableUsersForSchedule()` | Returns filtered users based on role/Balagruha |
| `backend/routes/userRoutes.js` | New route `/assignable-for-schedule` | Registers new endpoint |
| `backend/services/schedule.js` | Updated authorization logic | Allows COACH role, validates Balagruha access |
| `frontend/src/api.js` | New function `getAssignableUsersForSchedule()` | Calls new backend API |
| `frontend/src/components/dashboard/coach.js` | Updated `getUsersList()` | Uses new API instead of fetchUsers |
| `frontend/src/components/dashboard/WeeklyCalendar.js` | Removed frontend filtering | Backend handles filtering now |

---

## 🚀 How to Run/Test

### Start Servers
```bash
# Terminal 1 - Backend
cd backend
npm start
# Should run on port 5001

# Terminal 2 - Frontend
cd frontend
npm start
# Should run on port 3000
```

### Verify Servers Running
```bash
# Backend health check
curl http://localhost:5001/

# API endpoint exists
curl http://localhost:5001/api/users/assignable-for-schedule \
  -H "Authorization: Bearer <your-token>"
```

---

## 🐛 Known Issues / Expected Behavior

1. **Students Never Assignable:** By design, students do NOT appear in dropdown for ANY role (Admin or Coach). This is intentional.

2. **Admin Users Not Assignable:** Admin users also do not appear in dropdown. This is expected.

3. **Empty Dropdown:** If a coach has NO Balagruha assignments, the dropdown will be empty. This is correct behavior.

---

## ✅ Acceptance Criteria Checklist

### Must Pass (Critical):
- [ ] Coach can successfully create schedules (no authorization error)
- [ ] Coach sees ONLY users from assigned Balagruha(s)
- [ ] Students NEVER appear in dropdown
- [ ] Admin can still create schedules for any coach/staff globally
- [ ] Backend validates and rejects unauthorized requests

### Should Pass (High Priority):
- [ ] Sports-coach and Music-coach roles work identically to coach
- [ ] Schedule appears in calendar after creation
- [ ] Existing schedule functionality not broken (no regressions)
- [ ] New API endpoint returns correct filtered data

---

## 📊 Expected Test Results

| Test Scenario | Before Fix | After Fix |
|---------------|------------|-----------|
| Coach creates schedule | ❌ Authorization error | ✅ Success |
| Coach sees user dropdown | ❌ Shows ALL users | ✅ Shows only assigned Balagruha users |
| Students in dropdown | ⚠️ Filtered frontend only | ✅ Excluded by backend (secure) |
| Admin creates schedule | ✅ Works | ✅ Still works (no regression) |
| Backend validation | ❌ Missing | ✅ Comprehensive validation |

---

## 🔗 Related Documentation

- **Story Document:** `docs/stories/sprint6/sprint6-story-01-coach-view-corrections.md`
- **E2E Test Cases:** `docs/qa/e2e/sprint6-story-01-bug-001-schedule-assignment-fix.md`
- **Bug Analysis:** See "Post-Production Bug Fix" section in Story Document (line 1681)

---

## 📞 Contact for Questions

**Developer:** Dev Agent (Claude)
**Test Documentation:** See E2E test cases file
**Bug Details:** See Story Document (S6-S1-PROD-BUG-001 section)

---

## 🎯 Success Criteria for QA Sign-off

QA can sign off and mark bug as **RESOLVED** when:

1. ✅ All P0 (Critical) test cases pass
2. ✅ At least 80% of P1 (High) test cases pass
3. ✅ No new bugs introduced (regression tests pass)
4. ✅ Backend security validation confirmed working
5. ✅ Test execution results documented

---

## 📝 Next Steps After QA

1. **If tests PASS:**
   - QA signs off on bug fix
   - Update Story status to "COMPLETED"
   - Create git commit with bug fix
   - Prepare for deployment

2. **If tests FAIL:**
   - QA documents failed test cases with screenshots
   - Developer investigates and fixes issues
   - Re-test after fixes applied

---

**QA Handoff Complete - Ready for Testing** ✅

*Timestamp: 2025-11-13 17:20:52*
