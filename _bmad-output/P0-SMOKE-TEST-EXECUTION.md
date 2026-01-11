# P0 Smoke Test Execution - Sprint 5 PM Corrections

**Test Session ID:** P0-SMOKE-SPRINT5-20260105  
**Execution Date:** January 5, 2026  
**Tester:** _____________  
**Environment:** 
- Frontend: http://localhost:3000
- Backend: http://localhost:5001
- Browser: Chrome (latest)

**Objective:** Validate 8 critical tests MUST PASS before Sprint 5 ships  
**Estimated Duration:** 45-50 minutes  
**Decision Rule:** If ANY P0 test fails → STOP and fix before continuing  

---

## 🎯 Pre-Flight Checklist

**Before starting, verify:**

- [ ] Backend server is running (`http://localhost:5001` responds)
- [ ] Frontend server is running (`http://localhost:3000` loads)
- [ ] Test users configured:
  - [ ] PM user: `purchase@gmail.com` / `password123`
  - [ ] Coach user: `coach@isf.org` / `test123`
  - [ ] Admin user: `admin@isf.org` / `test123`
- [ ] Test data created (see main document lines 54-80)
  - [ ] At least 1 PENDING request exists
  - [ ] At least 1 ORDERED request with category "Repairs" exists
  - [ ] At least 2 PENDING requests for same product
- [ ] Browser DevTools Network tab ready (for TC-2.6.8)
- [ ] Screenshot tool ready (if capturing evidence)

**Status:** ⬜ NOT READY | ✅ READY TO START

---

## 📋 P0 Test Execution Tracker

### Test 1 of 8: TC-2.6.1 - Repair Technician Prompt

**Priority:** P0 (Critical)  
**Time Allocated:** 4 minutes  
**Risk:** 🟢 Low  
**Story:** 2.6 - Repair Technician & Delivery Tracking  

**Objective:** Verify PM must enter technician name when marking Repairs as delivered to store

**Preconditions:**
- [ ] At least 1 ORDERED request with category "Repairs" exists

**Execution Steps:**
1. [ ] Find an ORDERED request with "Repairs" category
2. [ ] Click "📦 Mark Received at Store" button
3. [ ] Observe the prompt/modal

**Expected Results:**
- [ ] Prompt appears asking for "Repair Technician Name"
- [ ] Field is clearly marked as required
- [ ] Submit and Cancel buttons are visible

**Screenshot Required:** Yes - capture technician prompt

**Actual Results:**
```
[Record what actually happened]




```

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL | ⚠️ BLOCKED

**If FAIL, record defect:**
- Defect ID: ___________
- Severity: Critical
- Summary: ___________________________________________

---

### Test 2 of 8: TC-2.6.3 - Technician Name Saved Successfully

**Priority:** P0 (Critical)  
**Time Allocated:** 5 minutes  
**Risk:** 🟡 Medium (Database save timing, modal interactions)  
**Story:** 2.6 - Repair Technician & Delivery Tracking  

**Objective:** Verify technician name is saved with the request

**Execution Steps:**
1. [ ] Enter a technician name: "John Smith - Plumber"
2. [ ] Click Submit
3. [ ] Wait for success toast
4. [ ] Open the request details (View modal)
5. [ ] Look for tracking information

**Expected Results:**
- [ ] Success toast: "Request marked as received at store"
- [ ] Request status changes to DELIVERED_STORE
- [ ] In View modal, "Delivery Tracking" section appears
- [ ] "Repair Technician: 🔧 John Smith - Plumber" is displayed

**Screenshot Required:** Yes - capture View modal with technician name

**Actual Results:**
```
[Record what actually happened]




```

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL | ⚠️ BLOCKED

**If FAIL, record defect:**
- Defect ID: ___________
- Severity: Critical
- Summary: ___________________________________________

---

### Test 3 of 8: TC-2.6.8 - Backend API Validation

**Priority:** P0 (Critical)  
**Time Allocated:** 5 minutes  
**Risk:** 🔴 High (API testing, network timing, requires DevTools)  
**Story:** 2.6 - Repair Technician & Delivery Tracking  

**Objective:** Verify backend rejects missing technician name for Repairs

**⚠️ CRITICAL TEST - Backend data integrity validation (defense in depth)**

**Execution Steps:**
1. [ ] Open browser DevTools → Network tab
2. [ ] Attempt to update a Repairs request to delivered_store without technician name
   - (Try bypassing frontend validation if possible, or observe API call)
3. [ ] Check API response in Network tab

**Expected Results:**
- [ ] API returns 400 Bad Request
- [ ] Error message: "Repair Technician Name is required for repair items"
- [ ] Request status unchanged in database

**Screenshot Required:** Optional - Network tab showing API error

**Actual Results:**
```
API Endpoint Called: ___________________________________________
Status Code: ___________
Response Body:




```

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL | ⚠️ BLOCKED

**If FAIL, record defect:**
- Defect ID: ___________
- Severity: Critical (Security - backend validation missing)
- Summary: ___________________________________________

---

### Test 4 of 8: TC-3.5.6 - Order All Functionality

**Priority:** P0 (Critical)  
**Time Allocated:** 7 minutes  
**Risk:** 🟡 Medium (Multi-request state transition, badge update timing)  
**Story:** 3.5 - Enhanced Bunched View  

**Objective:** Verify Order All marks all grouped requests as ordered

**⚠️ CRITICAL TEST - Core PM workflow action, batch processing**

**Preconditions:**
- [ ] At least 2 PENDING requests for the same product exist

**Execution Steps:**
1. [ ] Note the Request IDs of 2+ requests for the same product: _____, _____
2. [ ] Switch to Bunched View (📦 Bunched button)
3. [ ] Find the grouped item card
4. [ ] Click "🛒 Order All" on that bunched item
5. [ ] Confirm the action in the confirmation dialog
6. [ ] Wait for success toast
7. [ ] Switch to "On Going Order" tab

**Expected Results:**
- [ ] Confirmation dialog appears: "Mark all X request(s) for 'Product Name' as Ordered?"
- [ ] After confirmation, success toast appears
- [ ] All the grouped requests move from PENDING to ORDERED status
- [ ] Badge count in sidebar decrements by number of requests processed
- [ ] Requests appear in "On Going Order" tab

**Screenshot Required:** No (but capture if issues arise)

**Actual Results:**
```
Number of requests bundled: ___
Product name: ___________________________________________
All transitioned to ORDERED: YES / NO
Badge updated: YES / NO (Old: ___, New: ___)




```

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL | ⚠️ BLOCKED

**If FAIL, record defect:**
- Defect ID: ___________
- Severity: Critical (Core workflow broken)
- Summary: ___________________________________________

---

### Test 5 of 8: TC-3.9.3 - Badge Updates After Status Change

**Priority:** P0 (Critical)  
**Time Allocated:** 4 minutes  
**Risk:** 🟡 Medium (Reactivity timing, WebSocket/polling dependencies)  
**Story:** 3.9 - PM Navigation Badge  

**Objective:** Verify badge count updates when requests are processed

**⚠️ CRITICAL TEST - Real-time updates are core to PM workflow**

**Execution Steps:**
1. [ ] Note current badge count in sidebar: _____
2. [ ] Navigate to Purchase Management
3. [ ] Mark one PENDING request as "Ordered"
4. [ ] Observe the sidebar badge (may need to navigate back or wait for update)

**Expected Results:**
- [ ] Badge count decrements by 1 (e.g., "5" → "4")
- [ ] Update happens without page refresh (or after returning to sidebar)

**Screenshot Required:** Yes - capture sidebar with badge

**Actual Results:**
```
Initial badge count: ___
Expected after update: ___
Actual after update: ___
Update timing: Immediate / After page refresh / Did not update




```

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL | ⚠️ BLOCKED

**If FAIL, record defect:**
- Defect ID: ___________
- Severity: Critical (Real-time feedback broken)
- Summary: ___________________________________________

---

### Test 6 of 8: TC-INT-2 - Full Coach End-to-End Delivery

**Priority:** P0 (Critical)  
**Time Allocated:** 10 minutes  
**Risk:** 🟡 Medium (Multi-role workflow, state transitions, timing)  
**Story:** Cross-Story Integration  

**Objective:** Test complete PM→Coach delivery flow and tracking

**⚠️ CRITICAL TEST - End-to-end delivery workflow validation**

**Execution Steps:**
1. [ ] As PM: Mark a request as ORDERED
2. [ ] As PM: Mark request as DELIVERED_STORE (with technician if Repairs)
3. [ ] Log out
4. [ ] Log in as Coach (`coach@isf.org`)
5. [ ] Navigate to deliveries / Purchase Management
6. [ ] Find the DELIVERED_STORE request
7. [ ] Click "🏠 Mark Delivered" (or equivalent button)
8. [ ] Log out
9. [ ] Log in as PM (`pm@isf.org`)
10. [ ] View the request details (click View/Details)
11. [ ] Scroll to "Delivery Tracking" section

**Expected Results:**
- [ ] Request transitions: ORDERED → DELIVERED_STORE → DELIVERED_BALAGRUHA
- [ ] In View modal, "Delivery Tracking" section shows:
  - [ ] "Delivered to Balagruha By: 👤 Coach Name (coach@isf.org)"
  - [ ] "Delivered At: 📅 [today's date] [time] (just now)"
- [ ] Coach info is auto-captured (not manually entered)

**Screenshot Required:** Yes - capture delivery tracking section

**Actual Results:**
```
Request ID tested: ___________
Status transitions: _______ → _______ → _______
Coach info captured: YES / NO
  Name: ___________________________________________
  Email: ___________________________________________
  Timestamp: ___________________________________________




```

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL | ⚠️ BLOCKED

**If FAIL, record defect:**
- Defect ID: ___________
- Severity: Critical (End-to-end workflow broken)
- Summary: ___________________________________________

---

### Test 7 of 8: TC-REG-1 - Existing Filters Still Work

**Priority:** P0 (Critical)  
**Time Allocated:** 6 minutes  
**Risk:** 🟡 Medium (Multiple filter combinations, data dependencies)  
**Story:** Regression Test  

**Objective:** Verify existing filters (Date, Priority, Balagruha) still function

**⚠️ CRITICAL TEST - Regression validation for modified filter system**

**Execution Steps:**
1. [ ] Test Date Range filter with "This Week"
   - Result: Shows only this week's requests? YES / NO
2. [ ] Test Priority filter with "High"
   - Result: Shows only HIGH priority requests? YES / NO
3. [ ] Test Balagruha filter with specific Balagruha: ___________
   - Result: Shows only that Balagruha's requests? YES / NO
4. [ ] Test combination: Date="This Week" + Priority="High"
   - Result: Shows only high-priority requests from this week? YES / NO
5. [ ] Test Search filter with product name: ___________
   - Result: Shows only requests containing that product? YES / NO

**Expected Results:**
- [ ] All existing filters work correctly
- [ ] Filters combine properly (AND logic)
- [ ] No regressions from new features (Story 3.8 Coach filter)

**Actual Results:**
```
Date filter: PASS / FAIL
Priority filter: PASS / FAIL
Balagruha filter: PASS / FAIL
Combined filters: PASS / FAIL
Search filter: PASS / FAIL

Issues found:




```

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL | ⚠️ BLOCKED

**If FAIL, record defect:**
- Defect ID: ___________
- Severity: Critical (Core feature broken - regression)
- Summary: ___________________________________________

---

### Test 8 of 8: TC-REG-2 - Non-PM Roles Unaffected

**Priority:** P0 (Critical)  
**Time Allocated:** 5 minutes  
**Risk:** 🟢 Low (Role switching, static access checks)  
**Story:** Regression Test  

**Objective:** Verify Coach and Admin views work correctly

**⚠️ CRITICAL TEST - Role-based access security regression**

**Execution Steps:**

**Part 1: Coach Role**
1. [ ] Log out from PM
2. [ ] Log in as Coach (`coach@isf.org`)
3. [ ] Navigate to Purchase Management
4. [ ] Verify can see own requests only
5. [ ] Verify can mark DELIVERED_STORE requests as delivered

**Part 2: Admin Role**
6. [ ] Log out from Coach
7. [ ] Log in as Admin (`admin@isf.org`)
8. [ ] Navigate to Purchase Management
9. [ ] Verify can see all requests (not just own)
10. [ ] Verify "Requester" column visible (Admin-only feature)

**Expected Results:**
- [ ] Coach: Can see own requests only
- [ ] Coach: Can mark DELIVERED_STORE → DELIVERED_BALAGRUHA
- [ ] Coach: Does NOT see "Requested By" filter (PM-only)
- [ ] Admin: Can see ALL requests
- [ ] Admin: "Requester" column is visible
- [ ] New PM features don't break other roles

**Actual Results:**
```
Coach View:
  Can see own requests only: YES / NO
  Can mark delivered: YES / NO
  "Requested By" filter hidden: YES / NO

Admin View:
  Can see all requests: YES / NO
  "Requester" column visible: YES / NO

Issues found:




```

**Status:** ⬜ NOT RUN | ✅ PASS | ❌ FAIL | ⚠️ BLOCKED

**If FAIL, record defect:**
- Defect ID: ___________
- Severity: Critical (Security - role access broken)
- Summary: ___________________________________________

---

## 📊 Test Execution Summary

**Execution Completed:** _______________ (Date/Time)  
**Total Duration:** ________ minutes (Target: 45-50 min)  

### Results Overview

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| TC-2.6.1 | Repair technician prompt | ⬜ / ✅ / ❌ / ⚠️ | |
| TC-2.6.3 | Technician name saved | ⬜ / ✅ / ❌ / ⚠️ | |
| TC-2.6.8 | Backend API validation | ⬜ / ✅ / ❌ / ⚠️ | |
| TC-3.5.6 | Order All functionality | ⬜ / ✅ / ❌ / ⚠️ | |
| TC-3.9.3 | Badge updates | ⬜ / ✅ / ❌ / ⚠️ | |
| TC-INT-2 | Full delivery workflow | ⬜ / ✅ / ❌ / ⚠️ | |
| TC-REG-1 | Existing filters work | ⬜ / ✅ / ❌ / ⚠️ | |
| TC-REG-2 | Non-PM roles unaffected | ⬜ / ✅ / ❌ / ⚠️ | |

**Total:** ___ / 8 tests passed

### Pass/Fail Statistics

- ✅ **PASSED:** ___ tests (___%)
- ❌ **FAILED:** ___ tests (___%)
- ⚠️ **BLOCKED:** ___ tests (___%)
- ⬜ **NOT RUN:** ___ tests (___%)

---

## 🎯 Ship/No-Ship Decision

### Decision Matrix

| P0 Failures | Decision | Action Required |
|-------------|----------|-----------------|
| **0 failures** | ✅ **SHIP** | Proceed to P1 tests or ship Sprint 5 |
| **1-2 failures (Low risk)** | ⚠️ **CONDITIONAL** | Fix and re-test failed tests only |
| **1+ failures (Medium/High risk)** | ❌ **DO NOT SHIP** | Fix all P0 issues, run full P0 suite again |
| **3+ failures** | 🛑 **STOP** | Major issues - development review required |

### Actual Decision

**P0 Failures:** ___  
**Decision:** ✅ SHIP | ⚠️ CONDITIONAL | ❌ DO NOT SHIP | 🛑 STOP  

**Rationale:**
```
[Explain decision based on results]




```

**Next Steps:**
```
[What needs to happen before ship/next test phase]




```

---

## 🐛 Defects Logged

| Defect ID | Test ID | Severity | Summary | Status |
|-----------|---------|----------|---------|--------|
| | | | | |
| | | | | |
| | | | | |

---

## 📝 Tester Notes

**Environment Issues:**
```
[Any environment problems encountered]




```

**Test Data Issues:**
```
[Any test data problems]




```

**Browser/Network Issues:**
```
[Any technical issues]




```

**General Observations:**
```
[Any other notes or observations]




```

---

## ✅ Sign-Off

**Tester:** ___________________________ Date: ___________  
**QA Lead:** __________________________ Date: ___________  
**Product Owner:** ____________________ Date: ___________ (if shipping)

---

**Test Session Complete**  
**Document:** P0-SMOKE-SPRINT5-20260105.md  
**Generated By:** BMad TEA Agent (Test Architect)
