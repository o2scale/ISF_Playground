# Sprint 6 Story 3 - Complete Test Execution Guide

**Test Session:** S6-S3-COMPLETE-SUITE
**Tester:** Manual Execution Required
**Date:** 2025-11-13 14:23:01
**Environment:** Development (localhost)
**Status:** 🟡 READY FOR EXECUTION

---

## 📋 Executive Summary

**Total Test Cases:** 39
**Previously Passed:** 12 (AC1: 4, AC2: 2, AC3: 2, AC6: 3, AC7: 1)
**Remaining:** 27
**Critical Priority:** Test doctor visits save fix FIRST

---

## 🚨 CRITICAL: Test Priority Order

**Execute in this order:**

1. **P0 - Doctor Visits Save Fix** (BLOCKING 18 test cases)
2. **AC2 - Doctor Dropdown** (4 remaining tests)
3. **AC5 - Multiple Doctor Visits** (7 tests - was blocked)
4. **AC6 - Follow-ups** (4 remaining tests)
5. **AC7 - File Uploads** (5 remaining tests)
6. **AC3 - Coaches** (2 remaining tests)

---

## 🔧 Test Environment Setup

### Verify Servers Running

```bash
# Check frontend server
curl http://localhost:3000
# Should return: HTML page (200 OK)

# Check backend server
curl http://localhost:5001/api/health
# Should return: {"status": "ok"}
```

**Expected:**
- ✅ Frontend: Port 3000, PID 19740, Clean webpack build
- ✅ Backend: Port 5001, PID 9624, MongoDB connected
- ✅ No .hot-update.js files cached

### Login Credentials

```
Email: medin@gmail.com
Password: password123
Role: Medical Incharge
```

---

## 🎯 TEST SECTION 1: DOCTOR VISITS SAVE FIX (P0 - CRITICAL)

### Bug ID: S6-S3-AC2-CRITICAL-001
**Status:** Fix deployed, awaiting verification
**Impact:** Blocks 18 test cases
**Files Changed:**
- `backend/controllers/medicalCheckInsController.js` (JSON parsing)
- `frontend/src/components/dashboard/medicalIncharge.js` (edit mode)

---

### Test 1.1: CREATE Check-in with Complete Doctor Visit Data

**Objective:** Verify doctor visit data saves to database

**Steps:**

1. Open fresh browser window (Ctrl+Shift+R to clear cache)
2. Navigate to `http://localhost:3000`
3. Click "User Login"
4. Login: medin@gmail.com / password123
5. Click "Check Ins" tab
6. Click "Record New Check-in" button

7. **Fill Basic Form:**
   - Balagruha: Select "Yeshaswani Mahila Mandaligala Okkutte"
   - Wait 2 seconds for student dropdown to populate
   - Student: Select "vishnu"
   - Symptoms: Click "Fever" (hold Ctrl for multi-select)
   - Health Status: Leave as "Normal"

8. **Add Doctor Visit:**
   - Click "Doctor Visits (0)" header to expand
   - Click "➕ Add Another Doctor Visit"
   - Doctor Name: Type "Dr. Rajesh Kumar" → Press Enter
   - Hospital Name: Type "City General Hospital"
   - Visit Date: Select "2025-11-13"
   - Test Details: Type "Blood test and X-ray completed"
   - Doctor's Conclusion: Type "Patient is recovering well"

9. **Submit:**
   - Scroll to bottom
   - Click "Submit" button
   - Wait 3 seconds for submission

**Expected Results:**

✅ **Console (F12 → Console tab):**
- NO "Cannot read properties of undefined" errors
- NO "500 Internal Server Error"
- Message: "Fetched medical check-ins successfully"

✅ **List View:**
- New check-in appears at top (Row 1)
- Shows: vishnu, 13 Nov 2025, Fever
- **CRITICAL:** "Dr Visits" column shows **"1"** (NOT "-")
- If shows "-", the bug is NOT fixed

✅ **Network (F12 → Network tab):**
- POST /api/medical-check-ins → Status: 200 or 201
- Response includes doctorVisits array

**Pass Criteria:** Dr Visits column shows "1"

**Record Result:**
- [ ] PASS - Dr Visits shows "1"
- [ ] FAIL - Dr Visits shows "-"
- [ ] ERROR - Console shows errors

**If FAIL:** Stop here. Notify Dev immediately. Do not proceed with other tests.

---

### Test 1.2: EDIT Check-in - Verify Data Persists

**Objective:** Verify doctor visit data loads correctly in edit mode

**Precondition:** Test 1.1 passed

**Steps:**

1. Click "📝" (edit pencil icon) on the check-in from Test 1.1 (Row 1)
2. Wait 2 seconds for modal to open
3. Scroll down to "Doctor Visits" section
4. Check the header text

**Expected Results:**

✅ **Doctor Visits Header:**
- Shows "Doctor Visits (1)" (NOT "Doctor Visits (0)")

5. Click "Doctor Visits (1)" header to expand (if collapsed)
6. Verify all fields populated:

✅ **Visit #1 Fields:**
- Doctor Name dropdown: Shows "Dr. Rajesh Kumar"
- Hospital Name: Shows "City General Hospital"
- Visit Date: Shows "2025-11-13"
- Test Details: Shows "Blood test and X-ray completed"
- Doctor's Conclusion: Shows "Patient is recovering well"

**Pass Criteria:** All 5 fields populated correctly

**Record Result:**
- [ ] PASS - All fields populated
- [ ] PARTIAL - Some fields empty (specify which)
- [ ] FAIL - All fields empty or error

**If PARTIAL/FAIL:** Document which fields are empty and notify Dev.

---

### Test 1.3: EDIT Check-in - Modify and Update

**Objective:** Verify doctor visit updates persist

**Precondition:** Test 1.2 passed

**Steps:**

1. In the same edit modal from Test 1.2
2. Modify Hospital Name:
   - Change "City General Hospital" to "General Hospital"
   - (Remove "City" from the name)
3. Scroll to bottom
4. Click "Update Check-in" button
5. Wait 3 seconds

**Expected Results:**

✅ **Console:**
- NO errors during update

✅ **Modal Behavior:**
- Modal closes after successful update
- Returns to list view

6. Click "📝" (edit) on the SAME check-in again
7. Expand Doctor Visits section
8. Check Hospital Name field

✅ **Verify Update Persisted:**
- Hospital Name shows "General Hospital" (NOT "City General Hospital")

**Pass Criteria:** Modified data persists after re-opening

**Record Result:**
- [ ] PASS - Change persisted
- [ ] FAIL - Shows old value or empty

---

### Test 1.4: EDIT Check-in - Add Second Doctor Visit

**Objective:** Verify multiple doctor visits work in edit mode

**Precondition:** Test 1.3 passed

**Steps:**

1. In the same edit modal
2. Expand Doctor Visits section (if collapsed)
3. Click "➕ Add Another Doctor Visit"
4. Wait for Visit #2 form to appear

**Expected:**
✅ "Visit #2" form appears below "Visit #1"

5. Fill Visit #2 fields:
   - Doctor Name: Type "Dr. Smith" → Press Enter
   - Hospital Name: Type "Metro Hospital"
   - Visit Date: Select "2025-11-14"
   - Test Details: Type "Follow-up scan performed"
   - Doctor's Conclusion: Type "All clear"

6. Scroll to bottom
7. Click "Update Check-in"
8. Wait 3 seconds

**Expected Results:**

✅ **List View:**
- Same check-in now shows "Dr Visits: 2"

9. Click "📝" (edit) on same check-in again
10. Expand Doctor Visits
11. Verify both visits visible:

✅ **Visit #1:**
- Doctor: Dr. Rajesh Kumar
- Hospital: General Hospital (from Test 1.3)

✅ **Visit #2:**
- Doctor: Dr. Smith
- Hospital: Metro Hospital

**Pass Criteria:** List shows "Dr Visits: 2", both visits persist

**Record Result:**
- [ ] PASS - Both visits saved and visible
- [ ] PARTIAL - Only 1 visit shows
- [ ] FAIL - Error or data loss

---

### ✅ Doctor Visits Fix - Summary Checklist

**If ALL 4 sub-tests pass:**
- ✅ Bug S6-S3-AC2-CRITICAL-001 is **VERIFIED FIXED**
- ✅ Proceed with remaining test cases
- ✅ Update bug report status to "VERIFIED FIXED"

**If ANY sub-test fails:**
- ❌ Bug is NOT fully fixed
- ❌ Stop testing, document failure details
- ❌ Notify Dev with specific failure information

---

## 🎯 TEST SECTION 2: AC2 - Doctor Searchable Dropdown (4 Remaining)

**Previously Passed:**
- ✅ TC-AC2-DOCTOR-001: Search existing doctor
- ✅ TC-AC2-DOCTOR-002: Add new doctor to database

**Remaining Tests:**

---

### TC-AC2-DOCTOR-003: New Doctor Available Across Visits

**Objective:** Verify newly added doctor appears in subsequent visits

**Steps:**

1. Create new check-in
2. Add doctor visit with doctor: "Dr. TestDoc ABC"
3. Click "➕ Add Another Doctor Visit" (in same check-in)
4. Click Doctor Name dropdown in Visit #2
5. Type "TestDoc"

**Expected:**
✅ "Dr. TestDoc ABC" appears in dropdown (not "Add..." option)

6. Select "Dr. TestDoc ABC"
7. Submit check-in
8. Create ANOTHER new check-in
9. Add doctor visit
10. Type "TestDoc" in Doctor Name dropdown

**Expected:**
✅ "Dr. TestDoc ABC" still available in new check-in

**Pass Criteria:** Doctor persists across check-ins

**Record Result:**
- [ ] PASS
- [ ] FAIL

---

### TC-AC2-DOCTOR-004: Clear Doctor Selection

**Objective:** Verify user can clear selected doctor

**Steps:**

1. Create new check-in
2. Add doctor visit
3. Select doctor "Dr. Rajesh Kumar"
4. Verify doctor appears in field
5. Click the "X" (clear) button in doctor dropdown

**Expected:**
✅ Doctor field clears
✅ Placeholder returns: "Search or add doctor name"
✅ Can select different doctor

6. Type "Dr. Smith" and select

**Expected:**
✅ Dr. Smith selected (Dr. Rajesh Kumar replaced)

**Pass Criteria:** Clear and re-select works

**Record Result:**
- [ ] PASS
- [ ] FAIL

---

### TC-AC2-DOCTOR-005: Case-Insensitive Search

**Objective:** Verify search is case-insensitive

**Steps:**

1. Create new check-in
2. Add doctor visit
3. Type "dr. rajesh" (all lowercase) in Doctor Name

**Expected:**
✅ Dropdown shows "Dr. Rajesh Kumar" (original capitalization)

4. Type "DR. RAJESH" (all uppercase)

**Expected:**
✅ Still shows "Dr. Rajesh Kumar"

5. Type "Dr. rAjEsH" (mixed case)

**Expected:**
✅ Still shows "Dr. Rajesh Kumar"

**Pass Criteria:** All case variations match

**Record Result:**
- [ ] PASS
- [ ] FAIL

---

### TC-AC2-DOCTOR-006: No Duplicate Doctors Created

**Objective:** Verify case-insensitive duplicate prevention

**Steps:**

1. Create new check-in
2. Add doctor visit
3. Type "dr. rajesh kumar" (lowercase)
4. Check dropdown options

**Expected:**
✅ Shows "Dr. Rajesh Kumar" as existing option
✅ NO "Add 'dr. rajesh kumar'" option (duplicate prevented)

5. Type "DR. RAJESH KUMAR" (uppercase)

**Expected:**
✅ Shows "Dr. Rajesh Kumar" as existing option
✅ NO duplicate "Add..." option

**Pass Criteria:** No duplicates created with different cases

**Record Result:**
- [ ] PASS
- [ ] FAIL

---

## 🎯 TEST SECTION 3: AC5 - Multiple Doctor Visits (7 Tests)

**Previously:** ALL BLOCKED by doctor visits save bug
**Now:** Unblocked if Section 1 tests passed

---

### TC-AC5-VISIT-001: Add Multiple Doctor Visits

**Objective:** Verify can add 3+ doctor visits to single check-in

**Steps:**

1. Create new check-in
2. Add Doctor Visit #1:
   - Doctor: Dr. Rajesh Kumar
   - Hospital: City General Hospital
3. Click "➕ Add Another Doctor Visit"
4. Add Doctor Visit #2:
   - Doctor: Dr. Smith
   - Hospital: Metro Hospital
5. Click "➕ Add Another Doctor Visit"
6. Add Doctor Visit #3:
   - Doctor: Dr. Johnson
   - Hospital: St. Mary's Hospital
7. Submit check-in

**Expected:**
✅ All 3 visits save successfully
✅ List view shows "Dr Visits: 3"
✅ Edit modal shows all 3 visits

**Pass Criteria:** 3 visits saved and visible

**Record Result:**
- [ ] PASS
- [ ] FAIL

---

### TC-AC5-VISIT-002: Remove Doctor Visit

**Objective:** Verify can remove visit before submission

**Steps:**

1. Create new check-in
2. Add 3 doctor visits (any data)
3. Verify "Doctor Visits (3)" header
4. Find "Remove Visit" button on Visit #2
5. Click "Remove Visit" for Visit #2

**Expected:**
✅ Visit #2 removed
✅ Header updates to "Doctor Visits (2)"
✅ Remaining visits renumbered (Visit #3 becomes Visit #2)

6. Submit check-in

**Expected:**
✅ Only 2 visits saved
✅ List shows "Dr Visits: 2"

**Pass Criteria:** Remove works, correct count saved

**Record Result:**
- [ ] PASS
- [ ] FAIL

---

### TC-AC5-VISIT-003: Edit Doctor Visit Details

**Objective:** Verify can modify existing visit in edit mode

**Steps:**

1. Edit check-in from TC-AC5-VISIT-001 (3 visits)
2. Expand Doctor Visits
3. Modify Visit #2:
   - Change Hospital from "Metro Hospital" to "Updated Hospital"
4. Click "Update Check-in"
5. Re-open edit modal
6. Check Visit #2 hospital field

**Expected:**
✅ Shows "Updated Hospital"

**Pass Criteria:** Edit persists

**Record Result:**
- [ ] PASS
- [ ] FAIL

---

### TC-AC5-VISIT-004: Different Doctors for Each Visit

**Objective:** Verify each visit can have unique doctor

**Steps:**

1. Create check-in with 3 visits:
   - Visit #1: Dr. Rajesh Kumar
   - Visit #2: Dr. Smith
   - Visit #3: Dr. Johnson
2. Submit
3. Edit check-in

**Expected:**
✅ Visit #1: Dr. Rajesh Kumar
✅ Visit #2: Dr. Smith
✅ Visit #3: Dr. Johnson
✅ All 3 doctors distinct and correct

**Pass Criteria:** Each visit retains correct doctor

**Record Result:**
- [ ] PASS
- [ ] FAIL

---

### TC-AC5-VISIT-005: Doctor Visit Dates Validation

**Objective:** Verify visit dates can be different

**Steps:**

1. Create check-in with 3 visits:
   - Visit #1: Date 2025-11-13
   - Visit #2: Date 2025-11-14
   - Visit #3: Date 2025-11-15
2. Submit
3. Edit

**Expected:**
✅ Each visit has correct date preserved

**Pass Criteria:** Dates save independently

**Record Result:**
- [ ] PASS
- [ ] FAIL

---

### TC-AC5-VISIT-006: Doctor Visits Display in List View

**Objective:** Verify list view shows visit count correctly

**Test Cases:**

| Visits | Expected Display |
|--------|------------------|
| 0 | Dr Visits: - |
| 1 | Dr Visits: 1 |
| 2 | Dr Visits: 2 |
| 3 | Dr Visits: 3 |

**Steps:**

1. Create 4 check-ins with 0, 1, 2, 3 visits respectively
2. Verify list view shows correct counts

**Pass Criteria:** All 4 check-ins display correct visit counts

**Record Result:**
- [ ] PASS
- [ ] FAIL

---

### TC-AC5-VISIT-007: Doctor Visits Persist After Edit

**Objective:** Verify visits don't disappear after edit

**Steps:**

1. Create check-in with 2 visits
2. Edit check-in (change something unrelated, like symptoms)
3. Click "Update Check-in"
4. Edit again

**Expected:**
✅ Both visits still present
✅ No data loss from edit operation

**Pass Criteria:** Visits survive edit roundtrip

**Record Result:**
- [ ] PASS
- [ ] FAIL

---

## 🎯 TEST SECTION 4: AC6 - Multiple Follow-ups (4 Remaining)

**Previously Passed:**
- ✅ TC-AC6-FOLLOWUP-001: Add multiple follow-ups (4 created)
- ✅ TC-AC6-FOLLOWUP-002: Remove follow-up
- ✅ TC-AC6-FOLLOWUP-003: Sequential dates

**Remaining Tests:**

---

### TC-AC6-FOLLOWUP-004: Required Date Validation

**Objective:** Verify follow-up date is required

**Steps:**

1. Create new check-in
2. Add follow-up
3. Leave Follow-up Date field EMPTY
4. Fill other fields (coaches, status)
5. Try to submit

**Expected:**
✅ Validation error: "Follow-up date is required"
✅ Form does not submit

6. Fill Follow-up Date: 2025-11-20
7. Submit

**Expected:**
✅ Form submits successfully

**Pass Criteria:** Date required, validation works

**Record Result:**
- [ ] PASS
- [ ] FAIL

---

### TC-AC6-FOLLOWUP-005: Coaches Assignment Per Follow-up

**Objective:** Verify each follow-up can have different coaches

**Steps:**

1. Create check-in with 2 follow-ups:
   - Follow-up #1:
     - Date: 2025-11-20
     - Coaches: Select "coach1" and "coach2" (2 coaches)
   - Follow-up #2:
     - Date: 2025-11-27
     - Coaches: Select "coach3" and "coach" (2 different coaches)
2. Submit
3. Edit check-in
4. Expand Follow-ups

**Expected:**
✅ Follow-up #1: coach1 and coach2 checked
✅ Follow-up #2: coach3 and coach checked
✅ Each follow-up has independent coach selections

**Pass Criteria:** Coach assignments persist correctly

**Record Result:**
- [ ] PASS
- [ ] FAIL

---

### TC-AC6-FOLLOWUP-006: Follow-up Status Dropdown

**Objective:** Verify status dropdown works

**Steps:**

1. Create check-in
2. Add follow-up
3. Check Status dropdown options

**Expected:**
✅ Options available:
- (empty) - Select Status
- Active
- Completed
- Inactive

4. Select "Active"
5. Submit
6. Edit check-in

**Expected:**
✅ Status shows "Active"

7. Change to "Completed"
8. Update check-in
9. Re-open edit

**Expected:**
✅ Status shows "Completed"

**Pass Criteria:** Status persists correctly

**Record Result:**
- [ ] PASS
- [ ] FAIL

---

### TC-AC6-FOLLOWUP-007: Follow-ups Persist After Save

**Objective:** Verify follow-ups don't disappear

**Steps:**

1. Create check-in with 3 follow-ups (any data)
2. Submit
3. List view should show check-in
4. Edit check-in
5. Expand Follow-ups section

**Expected:**
✅ All 3 follow-ups present
✅ All data populated correctly

6. Don't change anything
7. Click "Update Check-in"
8. Edit again

**Expected:**
✅ All 3 follow-ups still present
✅ No data loss from save operation

**Pass Criteria:** Follow-ups survive multiple edit cycles

**Record Result:**
- [ ] PASS
- [ ] FAIL

---

## 🎯 TEST SECTION 5: AC7 - Follow-up File Uploads (5 Remaining)

**Previously Passed:**
- ✅ TC-AC7-UPLOAD-001: Upload buttons present

**Remaining Tests:**

**Note:** File upload testing requires access to local files. If files not available, mark as "CANNOT TEST - No file access".

---

### TC-AC7-UPLOAD-002: Upload Description Files (Images)

**Objective:** Verify can upload images for description

**Prerequisites:**
- Have test image file ready (JPG or PNG, < 5MB)
- Example: D:\Dev\ISF_Playground\test-image.png

**Steps:**

1. Create check-in
2. Add follow-up
3. Click "📎 Upload Description Files"
4. Select test image file (test-image.png)

**Expected:**
✅ File name appears in uploaded files list
✅ File size shown
✅ Remove (X) button appears next to file

5. Submit check-in

**Expected:**
✅ No errors during upload
✅ Check-in created successfully

**Pass Criteria:** Image upload works

**Record Result:**
- [ ] PASS
- [ ] FAIL
- [ ] CANNOT TEST - No file access

---

### TC-AC7-UPLOAD-003: Upload Description Files (PDFs)

**Objective:** Verify can upload PDFs for description

**Prerequisites:** Have test PDF file (< 10MB)

**Steps:**

1. Create check-in
2. Add follow-up
3. Click "📎 Upload Description Files"
4. Select test PDF file

**Expected:**
✅ PDF file appears in list
✅ Can upload multiple files

5. Upload second PDF
6. Submit

**Expected:**
✅ Both files upload successfully

**Pass Criteria:** PDF upload works, multiple files allowed

**Record Result:**
- [ ] PASS
- [ ] FAIL
- [ ] CANNOT TEST

---

### TC-AC7-UPLOAD-004: Upload Test Result Files (Images)

**Objective:** Verify can upload images for test results

**Steps:**

1. Create check-in
2. Add follow-up
3. Click "📎 Upload Test Result Files"
4. Select test image file

**Expected:**
✅ File uploads successfully
✅ Separate from Description Files section

**Pass Criteria:** Test result image upload works

**Record Result:**
- [ ] PASS
- [ ] FAIL
- [ ] CANNOT TEST

---

### TC-AC7-UPLOAD-005: Upload Test Result Files (PDFs)

**Objective:** Verify can upload PDFs for test results

**Steps:**

1. Create check-in
2. Add follow-up
3. Click "📎 Upload Test Result Files"
4. Select test PDF file

**Expected:**
✅ PDF uploads successfully

**Pass Criteria:** Test result PDF upload works

**Record Result:**
- [ ] PASS
- [ ] FAIL
- [ ] CANNOT TEST

---

### TC-AC7-UPLOAD-006: File Size Validation

**Objective:** Verify file size limits enforced

**Prerequisites:**
- Large image file (> 5MB)
- Large PDF file (> 10MB)

**Steps:**

1. Create check-in
2. Add follow-up
3. Try to upload image > 5MB to Description Files

**Expected:**
✅ Error: "Image must be less than 5MB"
✅ File NOT uploaded

4. Try to upload PDF > 10MB to Description Files

**Expected:**
✅ Error: "PDF must be less than 10MB"
✅ File NOT uploaded

5. Upload valid-sized files (< limits)

**Expected:**
✅ Files upload successfully

**Pass Criteria:** Size limits enforced, errors shown

**Record Result:**
- [ ] PASS
- [ ] FAIL
- [ ] CANNOT TEST

---

## 🎯 TEST SECTION 6: AC3 - All Coaches Visible (2 Remaining)

**Previously Passed:**
- ✅ TC-AC3-COACHES-001: All coaches shown (9 coaches)
- ✅ TC-AC3-COACHES-003: Multiple coach selection works

**Remaining Tests:**

---

### TC-AC3-COACHES-002: Coaches Update When Balagruha Changes

**Objective:** Verify coaches change based on Balagruha

**Prerequisites:** Need 2+ Balagruhas with different coach sets

**Current State:** Only 1 Balagruha available in test environment

**Steps:**

1. Check available Balagruhas
2. If only 1 Balagruha: Mark test as "CANNOT TEST - Environment limitation"
3. If 2+ Balagruhas:
   - Create check-in
   - Select Balagruha A
   - Add follow-up
   - Note coaches shown
   - Go back, change to Balagruha B
   - Add follow-up
   - Note coaches shown
   - Verify lists are different

**Pass Criteria:** Coach list updates per Balagruha

**Record Result:**
- [ ] PASS
- [ ] FAIL
- [ ] CANNOT TEST - Only 1 Balagruha available

---

### TC-AC3-COACHES-004: Empty State When No Balagruha Selected

**Objective:** Verify coaches section handles no Balagruha

**Steps:**

1. Open new check-in modal
2. DO NOT select Balagruha (leave empty)
3. Add follow-up
4. Check "Assign to Coaches" section

**Expected:**
✅ Shows: "No coaches available for this Balagruha"
OR
✅ Section is empty/disabled

5. Select Balagruha
6. Check coaches section again

**Expected:**
✅ Coaches populate after Balagruha selection

**Pass Criteria:** Empty state handled gracefully

**Record Result:**
- [ ] PASS
- [ ] FAIL
- [ ] CANNOT TEST - Cannot prevent Balagruha selection

---

## 📊 TEST RESULTS SUMMARY TEMPLATE

After completing all tests, fill in this summary:

```
Sprint 6 Story 3 - Test Execution Results
Date: [Fill in date]
Tester: [Fill in name]
Duration: [Fill in time]

=================================
CRITICAL BUG FIX VERIFICATION
=================================

S6-S3-AC2-CRITICAL-001: Doctor Visits Save Fix
- Test 1.1 (CREATE): [PASS/FAIL]
- Test 1.2 (EDIT Load): [PASS/FAIL]
- Test 1.3 (EDIT Update): [PASS/FAIL]
- Test 1.4 (Add 2nd Visit): [PASS/FAIL]
Overall Status: [VERIFIED FIXED / NOT FIXED / PARTIAL]

=================================
TEST CASE RESULTS
=================================

AC2: Doctor Searchable Dropdown (6 total)
- TC-001: Search existing ✅ PASS (previous)
- TC-002: Add new doctor ✅ PASS (previous)
- TC-003: Available across visits [PASS/FAIL]
- TC-004: Clear selection [PASS/FAIL]
- TC-005: Case-insensitive [PASS/FAIL]
- TC-006: No duplicates [PASS/FAIL]
Pass Rate: __/6 (__%)

AC3: All Coaches Visible (4 total)
- TC-001: All coaches shown ✅ PASS (previous)
- TC-002: Coaches update [PASS/FAIL/CANNOT TEST]
- TC-003: Multiple selection ✅ PASS (previous)
- TC-004: Empty state [PASS/FAIL/CANNOT TEST]
Pass Rate: __/4 (__%)

AC5: Multiple Doctor Visits (7 total)
- TC-001: Add multiple [PASS/FAIL]
- TC-002: Remove visit [PASS/FAIL]
- TC-003: Edit details [PASS/FAIL]
- TC-004: Different doctors [PASS/FAIL]
- TC-005: Date validation [PASS/FAIL]
- TC-006: Display in list [PASS/FAIL]
- TC-007: Persist after edit [PASS/FAIL]
Pass Rate: __/7 (__%)

AC6: Multiple Follow-ups (7 total)
- TC-001: Add multiple ✅ PASS (previous)
- TC-002: Remove follow-up ✅ PASS (previous)
- TC-003: Sequential dates ✅ PASS (previous)
- TC-004: Required date [PASS/FAIL]
- TC-005: Coach assignment [PASS/FAIL]
- TC-006: Status dropdown [PASS/FAIL]
- TC-007: Persist after save [PASS/FAIL]
Pass Rate: __/7 (__%)

AC7: Follow-up File Uploads (6 total)
- TC-001: Buttons present ✅ PASS (previous)
- TC-002: Upload images [PASS/FAIL/CANNOT TEST]
- TC-003: Upload PDFs [PASS/FAIL/CANNOT TEST]
- TC-004: Upload test images [PASS/FAIL/CANNOT TEST]
- TC-005: Upload test PDFs [PASS/FAIL/CANNOT TEST]
- TC-006: Size validation [PASS/FAIL/CANNOT TEST]
Pass Rate: __/6 (__%)

=================================
OVERALL SUMMARY
=================================

Total Test Cases: 39
Previously Passed: 12
Executed This Session: __
Total Passed: __
Total Failed: __
Cannot Test: __
Pass Rate: __% (__/39)

=================================
CRITICAL ISSUES FOUND
=================================

[List any P0/P1 bugs discovered]

1. [Bug description]
2. [Bug description]

=================================
QUALITY GATE DECISION
=================================

Status: [PASS / CONDITIONAL PASS / FAIL]
Recommendation: [APPROVE FOR PROD / NEEDS FIX / BLOCK RELEASE]

Justification:
[Explain decision based on test results]

=================================
NEXT STEPS
=================================

For Dev:
[List any bugs that need fixing]

For QA:
[List any remaining tests or re-tests needed]

For Product:
[List any feature gaps or clarifications needed]
```

---

## 🐛 Bug Report Template

If you find bugs during testing, document them using this format:

```markdown
# BUG REPORT

**Bug ID:** S6-S3-[COMPONENT]-[NUMBER]
**Reported By:** [Your name]
**Date:** [Date]
**Priority:** P0/P1/P2

## Summary
[One-sentence description]

## Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Expected Result
[What should happen]

## Actual Result
[What actually happened]

## Evidence
- Console errors: [Copy error text]
- Network errors: [Copy 500/400 response]
- Screenshots: [Attach if possible]

## Impact
- User impact: [How does this affect users?]
- Severity: [How critical is this?]
- Workaround: [Is there a workaround?]

## Test Environment
- Frontend: localhost:3000 (PID 19740)
- Backend: localhost:5001 (PID 9624)
- Browser: [Chrome/Firefox/etc]
- Date: [Test date]
```

---

## 📁 Documentation Files

**Test Specifications:**
- `docs/qa/e2e/sprint6-story-03-medical-checkin-fixes.md` (Detailed test cases)
- `docs/qa/e2e/sprint6-story-03-hospital-dropdown-feature-specs.md` (Hospital dropdown specs)

**Bug Reports:**
- `docs/qa/bugs/sprint6-story-03-AC2-doctor-visits-not-saved.md` (Doctor visits bug)
- Create new bug reports as needed

**Test Results:**
- This file: Complete execution guide
- Create: `sprint6-story-03-FINAL-test-results.md` (Summary after completion)

---

## ⚠️ Important Notes

1. **Test in Order:** Follow the priority order (Critical fix first)
2. **Stop on Critical Failure:** If Test 1.1 fails, stop and notify Dev
3. **Document Everything:** Take screenshots of bugs, copy error messages
4. **Browser Cache:** Hard refresh (Ctrl+Shift+R) before starting
5. **Server Status:** Verify servers running before each session
6. **Time Estimate:** Allow 2-3 hours for complete test execution
7. **File Access:** Some AC7 tests require local files (mark as "CANNOT TEST" if unavailable)

---

**Status:** 📋 READY FOR MANUAL EXECUTION
**Next Action:** Execute tests in priority order
**Report Results To:** Dev Team + QA Lead

**Last Updated:** 2025-11-13 14:23:01
**Updated By:** Quinn (QA Agent)
