# Sprint 6 Story 5: Purchase Request Creator-Based Filtering - QA Handoff

**Story ID:** Sprint6-Story-05
**QA Handoff Date:** 2025-11-14 12:00:22
**Developer:** Claude (Dev Agent)
**QA Engineer:** [To be assigned]
**Status:** 🧪 READY FOR QA
**Priority:** High

---

## Feature Overview

**What Changed:**
Purchase request visibility is now role-based:
- **Admin** and **Purchase Manager**: See ALL purchase requests from all users (no change)
- **All other roles** (Coach, Medical Incharge, Balagruha Incharge): See ONLY their own purchase requests

**Why:**
Users were confused seeing purchase requests they didn't create. This change helps users focus on tracking their own submissions.

**User Story Reference:** [Sprint6-Story-05](./sprint6-story-05-purchase-request-creator-filtering.md)

---

## Files Changed

### Backend (1 file)
- ✅ `backend/controllers/purchaseRequestController.js` (Lines 329-346)
  - Added role-based filtering in `getAllPurchaseRequests` function
  - Admin and Purchase Manager see all requests
  - Other roles see only requests where `requestedBy` matches their user ID

### Frontend
- ✅ **NO CHANGES** - Frontend already works correctly with filtered backend results

---

## Setup Instructions

### Prerequisites

1. **Test Users Required:**
   Create these test users if they don't exist:

   ```
   Admin User:
   - Email: admin@isftest.com
   - Password: Test@123
   - Role: admin
   - Balagruha: All

   Purchase Manager:
   - Email: pm@isftest.com
   - Password: Test@123
   - Role: purchase-manager
   - Balagruha: Balagruha 1, Balagruha 2

   Coach A:
   - Email: coach-a@isftest.com
   - Password: Test@123
   - Role: coach
   - Balagruha: Balagruha 1

   Coach B:
   - Email: coach-b@isftest.com
   - Password: Test@123
   - Role: coach
   - Balagruha: Balagruha 2

   Medical Incharge:
   - Email: medical@isftest.com
   - Password: Test@123
   - Role: medical-incharge
   - Balagruha: Balagruha 1

   Balagruha Incharge:
   - Email: bg-incharge@isftest.com
   - Password: Test@123
   - Role: balagruha-incharge
   - Balagruha: Balagruha 1
   ```

2. **Test Data Setup:**
   Create these purchase requests:

   | Creator | Balagruha | Status | Category | Items | Notes |
   |---------|-----------|--------|----------|-------|-------|
   | Coach A | Balagruha 1 | pending_approval | New Equipment | 2 products | Test PR 1 |
   | Coach A | STOCK | pending_fulfillment | Consumables | 1 product | Test PR 2 |
   | Coach B | Balagruha 2 | approved | Others | 3 products | Test PR 3 |
   | Coach B | Balagruha 2 | fulfilled | New Equipment | 1 product | Test PR 4 |
   | Medical Incharge | STOCK | pending_approval | Consumables | 2 products | Test PR 5 |
   | Admin | Balagruha 1 | approved | New Equipment | 1 product | Test PR 6 |

3. **Environment:**
   - ✅ Backend running on http://localhost:5001
   - ✅ Frontend running on http://localhost:3000
   - ✅ MongoDB connected with test data

---

## Test Cases

### 🔴 CRITICAL TESTS (Must Pass)

#### TC1: Admin Sees All Purchase Requests

**Priority:** P0 (Critical)
**Steps:**
1. Login as `admin@isftest.com`
2. Navigate to **Purchase Requests** dashboard
3. Observe the list of purchase requests

**Expected Results:**
- ✅ See ALL 6 test purchase requests
- ✅ Requests from Coach A (2 requests)
- ✅ Requests from Coach B (2 requests)
- ✅ Request from Medical Incharge (1 request)
- ✅ Request from Admin (1 request)
- ✅ Count badge shows "6" total requests

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue): ______________________

---

#### TC2: Purchase Manager Sees All Purchase Requests

**Priority:** P0 (Critical)
**Steps:**
1. Login as `pm@isftest.com`
2. Navigate to **Purchase Requests** dashboard
3. Observe the list of purchase requests

**Expected Results:**
- ✅ See ALL 6 test purchase requests
- ✅ Can see requests from all users
- ✅ Count badge shows "6" total requests

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue): ______________________

---

#### TC3: Coach A Sees Only Own Purchase Requests

**Priority:** P0 (Critical)
**Steps:**
1. Login as `coach-a@isftest.com`
2. Navigate to **Purchase Requests** dashboard
3. Observe the list of purchase requests

**Expected Results:**
- ✅ See ONLY 2 purchase requests (own requests)
  - Test PR 1 (Balagruha 1, pending_approval)
  - Test PR 2 (STOCK, pending_fulfillment)
- ❌ Do NOT see requests from Coach B
- ❌ Do NOT see requests from Medical Incharge
- ❌ Do NOT see requests from Admin
- ✅ Count badge shows "2" requests

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue): ______________________

---

#### TC4: Coach B Sees Only Own Purchase Requests

**Priority:** P0 (Critical)
**Steps:**
1. Login as `coach-b@isftest.com`
2. Navigate to **Purchase Requests** dashboard
3. Observe the list of purchase requests

**Expected Results:**
- ✅ See ONLY 2 purchase requests (own requests)
  - Test PR 3 (Balagruha 2, approved)
  - Test PR 4 (Balagruha 2, fulfilled)
- ❌ Do NOT see requests from Coach A
- ❌ Do NOT see requests from Medical Incharge
- ❌ Do NOT see requests from Admin
- ✅ Count badge shows "2" requests

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue): ______________________

---

#### TC5: Medical Incharge Sees Only Own Purchase Requests

**Priority:** P0 (Critical)
**Steps:**
1. Login as `medical@isftest.com`
2. Navigate to **Purchase Requests** dashboard
3. Observe the list of purchase requests

**Expected Results:**
- ✅ See ONLY 1 purchase request (own request)
  - Test PR 5 (STOCK, pending_approval)
- ❌ Do NOT see any requests from Coaches
- ❌ Do NOT see requests from Admin
- ✅ Count badge shows "1" request

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue): ______________________

---

### 🟡 HIGH PRIORITY TESTS

#### TC6: Status Filter Works with Role-Based Filtering

**Priority:** P1 (High)
**Test for:** Coach A
**Steps:**
1. Login as `coach-a@isftest.com`
2. Navigate to Purchase Requests
3. Apply status filter: **"Pending Approval"**
4. Observe results

**Expected Results:**
- ✅ See ONLY Coach A's pending_approval requests (Test PR 1)
- ✅ Count badge shows "1" request
- ❌ Do NOT see Coach B's requests (even if they match status)

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue): ______________________

---

#### TC7: Balagruha Filter Works with Role-Based Filtering

**Priority:** P1 (High)
**Test for:** Coach A
**Steps:**
1. Login as `coach-a@isftest.com`
2. Navigate to Purchase Requests
3. Apply balagruha filter: **"Balagruha 1"**
4. Observe results

**Expected Results:**
- ✅ See ONLY Coach A's Balagruha 1 request (Test PR 1)
- ✅ Count badge shows "1" request
- ✅ STOCK request filtered out (Test PR 2 not shown)

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue): ______________________

---

#### TC8: STOCK Requests Filtering

**Priority:** P1 (High)
**Steps:**
1. Login as `coach-a@isftest.com`
2. Apply balagruha filter: **"STOCK"**
3. Observe results
4. Logout and login as `admin@isftest.com`
5. Apply balagruha filter: **"STOCK"**
6. Observe results

**Expected Results (Coach A):**
- ✅ See ONLY Coach A's STOCK request (Test PR 2)
- ❌ Do NOT see Medical Incharge's STOCK request

**Expected Results (Admin):**
- ✅ See ALL STOCK requests (2 total)
  - Coach A's STOCK request (Test PR 2)
  - Medical Incharge's STOCK request (Test PR 5)

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue): ______________________

---

#### TC9: Category Filter Works with Role-Based Filtering

**Priority:** P1 (High)
**Test for:** Coach A
**Steps:**
1. Login as `coach-a@isftest.com`
2. Apply category filter: **"Consumables (Including medicines)"**
3. Observe results

**Expected Results:**
- ✅ See ONLY Coach A's consumables request (Test PR 2)
- ✅ Count badge shows "1" request

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue): ______________________

---

#### TC10: Date Filter Works with Role-Based Filtering

**Priority:** P1 (High)
**Test for:** Coach B
**Steps:**
1. Login as `coach-b@isftest.com`
2. Apply date filter: **"Today"**
3. Observe results

**Expected Results:**
- ✅ See only Coach B's requests created today (if any)
- ✅ Count reflects only own requests matching date range
- ❌ Do NOT see other users' requests created today

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue): ______________________

---

### 🟢 MEDIUM PRIORITY TESTS

#### TC11: Combined Filters Work Correctly

**Priority:** P2 (Medium)
**Test for:** Admin
**Steps:**
1. Login as `admin@isftest.com`
2. Apply multiple filters:
   - Status: **"Approved"**
   - Balagruha: **"Balagruha 2"**
   - Category: **"New Equipment"**
3. Observe results

**Expected Results:**
- ✅ See Coach B's approved, Balagruha 2, New Equipment request (Test PR 3)
- ✅ Filters work on complete dataset (all users)

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue): ______________________

---

#### TC12: Create New Request and Verify Visibility

**Priority:** P2 (Medium)
**Steps:**
1. Login as `coach-a@isftest.com`
2. Create a NEW purchase request
3. Submit the request
4. Verify it appears in own dashboard
5. Logout and login as `coach-b@isftest.com`
6. Check if the new request is visible

**Expected Results:**
- ✅ Coach A sees new request in their dashboard
- ❌ Coach B does NOT see Coach A's new request
- ✅ Admin sees Coach A's new request (verify separately)

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue): ______________________

---

#### TC13: Edit/Cancel Own Request

**Priority:** P2 (Medium)
**Steps:**
1. Login as `coach-a@isftest.com`
2. Find a pending request
3. Click "Cancel" button
4. Confirm cancellation

**Expected Results:**
- ✅ Request status changes to "cancelled"
- ✅ Request still visible in own dashboard
- ✅ Cancellation works as before

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue): ______________________

---

### 🔵 LOW PRIORITY TESTS (Regression)

#### TC14: Admin Approval Workflow Unchanged

**Priority:** P3 (Low)
**Steps:**
1. Login as `admin@isftest.com`
2. Find a `pending_approval` request
3. Approve the request
4. Logout and login as the request creator
5. Verify status update

**Expected Results:**
- ✅ Admin can approve any user's request
- ✅ Creator sees status change to "approved"
- ✅ Approval workflow works as before

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue): ______________________

---

#### TC15: Purchase Manager Fulfillment Workflow Unchanged

**Priority:** P3 (Low)
**Steps:**
1. Login as `pm@isftest.com`
2. Find an `approved` or `pending_fulfillment` request
3. Fulfill the request (update stock)
4. Logout and login as the request creator
5. Verify status update

**Expected Results:**
- ✅ Purchase Manager can fulfill any user's request
- ✅ Creator sees status change to "fulfilled"
- ✅ Stock updates work correctly
- ✅ Fulfillment workflow unchanged

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue): ______________________

---

#### TC16: No Access for Student Role

**Priority:** P3 (Low)
**Steps:**
1. Login as a Student user
2. Try to access Purchase Requests dashboard

**Expected Results:**
- ❌ Purchase Requests menu item NOT visible
- ❌ Cannot access purchase request pages
- ✅ Behavior unchanged from before

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue): ______________________

---

## Edge Cases & Negative Tests

### EC1: Empty State for New User

**Scenario:** User with no purchase requests
**Steps:**
1. Create a brand new Coach user (coach-c@isftest.com)
2. Login and navigate to Purchase Requests

**Expected:**
- ✅ See empty state message
- ✅ Count badge shows "0" requests
- ✅ "Create Purchase Request" button visible

---

### EC2: Request Deleted by Admin

**Scenario:** Admin deletes another user's request
**Steps:**
1. Admin deletes Coach A's request
2. Coach A refreshes their dashboard

**Expected:**
- ✅ Request no longer visible to Coach A
- ✅ No errors or broken UI

---

### EC3: Simultaneous Multi-User Testing

**Scenario:** Multiple users online simultaneously
**Steps:**
1. Have Admin, Coach A, and Coach B logged in at same time
2. Coach A creates a request
3. Verify visibility for all three users in real-time

**Expected:**
- ✅ Coach A sees new request immediately
- ❌ Coach B does NOT see Coach A's request
- ✅ Admin sees Coach A's request (may need refresh)

---

## Performance Testing

### PT1: Large Dataset Test

**Scenario:** 100+ purchase requests in database
**Setup:** Create 100 test purchase requests across multiple users
**Steps:**
1. Login as Coach A (who has 50 requests)
2. Load Purchase Requests dashboard
3. Measure load time

**Expected:**
- ✅ Page loads in < 3 seconds
- ✅ Only Coach A's 50 requests loaded (not all 100)
- ✅ Pagination works if implemented

---

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

---

## Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader announces filter changes
- [ ] ARIA labels present
- [ ] Color contrast meets WCAG AA standards

---

## Known Limitations

1. **Team Visibility:** Team leads cannot see their team members' requests (by design)
2. **Reporting:** May need separate admin report for cross-user analytics (future)

---

## Bug Report Template

If you find a bug, please report using this format:

```
**Bug ID:** S6-S5-BUG-XXX
**Severity:** Critical / High / Medium / Low
**Test Case:** TC-XX

**Steps to Reproduce:**
1.
2.
3.

**Expected Result:**
-

**Actual Result:**
-

**Screenshots:**
[Attach screenshots]

**Environment:**
- Browser:
- OS:
- User Role:
- Date/Time:

**Additional Notes:**
-
```

---

## Sign-Off

### QA Results

**Test Summary:**
- Total Test Cases: 16
- Passed: ___ / 16
- Failed: ___ / 16
- Blocked: ___ / 16

**Critical Tests (TC1-TC5):**
- [ ] All critical tests passed
- [ ] Critical test(s) failed (blocking)

**Overall Status:**
- [ ] ✅ APPROVED - Ready for Production
- [ ] 🔴 REJECTED - Bugs found, Dev team to fix
- [ ] ⏸️ BLOCKED - Cannot complete testing

**QA Engineer Signature:** ___________________
**Date:** ___________________

**QA Notes:**
```
[Add any additional observations, concerns, or recommendations here]
```

---

## Deployment Checklist

After QA approval:

- [ ] Merge to `develop` branch
- [ ] Update CHANGELOG.md
- [ ] Tag release: `v1.x.x-sprint6-story-05`
- [ ] Deploy to staging
- [ ] Smoke test on staging
- [ ] Deploy to production
- [ ] Monitor logs for errors
- [ ] Notify stakeholders

---

## Rollback Plan

If critical issues found in production:

1. **Immediate Rollback:**
   ```bash
   git revert <commit-hash>
   git push origin develop
   pm2 restart backend
   ```

2. **Database:** No schema changes, no migration rollback needed

3. **Impact:** All users will see all requests again (old behavior)

4. **Estimated Rollback Time:** 5 minutes

---

## Support Contact

**Developer:** Claude (Dev Agent)
**Tech Lead:** [To be assigned]
**Product Owner:** Tony

For questions during QA, contact the development team via Slack #dev-channel.

---

**QA Handoff Completed:** 2025-11-14 12:00:22
**QA Testing Start:** [To be filled by QA]
**QA Testing End:** [To be filled by QA]
