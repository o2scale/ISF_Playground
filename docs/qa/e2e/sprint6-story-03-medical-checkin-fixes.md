# Sprint 6 Story 3 - Medical Check-in Fixes & Enhancements - E2E Test Scenarios

**Story:** Sprint 6 Story 3 - Medical Check-in Bug Fixes & Enhancements
**Acceptance Criteria:** AC1-AC7 (All) + UAT Bug Fixes (BUG-001 through BUG-006) + View Button Enhancement
**Test Type:** E2E (Playwright MCP)
**Created:** 2025-11-12 00:22:46
**Updated:** 2025-11-13 16:36:01 (Added View Button Enhancement Test Cases)
**Status:** Ready for QA Execution
**Priority:** 🔴 CRITICAL (4 Original Bugs + 3 Enhancements + 6 UAT Blockers + 1 Client Enhancement)

---

## Test Environment

**Frontend:** http://localhost:3000
**Backend:** http://localhost:5001
**Test User:** medicalincharge@gmail.com / password123
**Test Role:** Medical Incharge
**Browser:** Chromium (Playwright MCP)
**Test Data:** Clean database with test students, coaches, Balagruhas

**Test Data Requirements:**
- Minimum 5 test students across 2 Balagruhas
- Minimum 5 coaches (at least 1 each: coach, music-coach, sports-coach)
- Minimum 2 Balagruhas with assigned coaches
- Minimum 2 existing doctor names in database (for search testing)

---

## Preconditions (All Test Cases)

- ✅ Backend server running (http://localhost:5001)
- ✅ Frontend server running (http://localhost:3000)
- ✅ User logged in as Medical Incharge (medicalincharge@gmail.com)
- ✅ Medical module loaded
- ✅ Test students exist in database
- ✅ Test coaches exist in database (all types: coach, music-coach, sports-coach)
- ✅ Test Balagruhas exist with assigned coaches
- ✅ Test doctor names exist in database (optional for AC2 testing)
- ✅ Clean browser state (no cached data affecting tests)

---

## AC1-AC7 Overview

**AC1:** Temperature optional (remove required validation)
**AC2:** Doctor searchable dropdown with auto-add to database
**AC3:** Assign to coaches shows all coaches for Balagruha
**AC4:** Form submission error resolved
**AC5:** Multiple doctor visits (add/remove functionality)
**AC6:** Multiple sequential follow-ups with required dates
**AC7:** Follow-up file uploads (description files + test result files)

---

## Test Cases - AC1: Temperature Optional

### **TC-AC1-TEMP-001: Submit Form WITHOUT Temperature**
**Priority:** P0 (Critical - Primary Bug Fix)
**Description:** Verify check-in form submits successfully without temperature value

**Preconditions:**
- Medical Incharge logged in
- Medical check-in page open
- Test student exists in Balagruha

**Steps:**
1. Navigate to Medical Check-in page
2. Click "New Health Check-in" button
3. Select Balagruha: "Vivekananda Balagruha"
4. Select Student: "Test Student 1"
5. **Verify temperature field has NO red asterisk (*)**
6. **Verify temperature field shows placeholder: "Optional - Enter if measured"**
7. Leave Temperature field BLANK
8. Set Date: Today's date
9. Set Time: Current time
10. Select Health Status: "Normal"
11. Add Notes: "Routine check-up without temperature"
12. Click "Submit" button
13. **Verify success toast appears: "Medical Check-in created successfully"**
14. Navigate to check-ins list
15. **Verify new check-in appears with blank temperature**

**Expected Results:**
- ✅ Form submits successfully without temperature
- ✅ No validation error on temperature field
- ✅ Check-in created in database with null/undefined temperature
- ✅ Success message displayed
- ✅ No console errors
- ✅ Check-in appears in list without temperature value

**Screenshots Required:**
- `AC1-TEMP-001-form-no-temperature.png`
- `AC1-TEMP-001-success-toast.png`
- `AC1-TEMP-001-checkin-created.png`

---

### **TC-AC1-TEMP-002: Submit Form WITH Valid Temperature**
**Priority:** P0 (Critical)
**Description:** Verify check-in form submits successfully with valid temperature value

**Preconditions:**
- Medical Incharge logged in
- Medical check-in page open

**Steps:**
1. Navigate to Medical Check-in page
2. Click "New Health Check-in" button
3. Fill all required fields
4. Enter Temperature: 36.5
5. **Verify temperature value accepted**
6. Submit form
7. **Verify success toast appears**
8. View created check-in
9. **Verify temperature displays as 36.5°C**

**Expected Results:**
- ✅ Temperature value 36.5 accepted
- ✅ Form submits successfully
- ✅ Temperature saved correctly to database
- ✅ Temperature displays in check-in details

**Screenshots Required:**
- `AC1-TEMP-002-temperature-entered.png`
- `AC1-TEMP-002-checkin-with-temperature.png`

---

### **TC-AC1-TEMP-003: Invalid Temperature Validation**
**Priority:** P1 (High)
**Description:** Verify temperature validation enforces range (30-45°C)

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form open

**Steps:**
1. Fill required fields
2. Enter Temperature: 50 (exceeds max 45)
3. **Verify validation error appears**
4. Change Temperature: 25 (below min 30)
5. **Verify validation error appears**
6. Change Temperature: 37 (valid)
7. **Verify no validation errors**
8. Submit form
9. **Verify form submits successfully**

**Expected Results:**
- ✅ Temperature > 45 shows validation error
- ✅ Temperature < 30 shows validation error
- ✅ Temperature 30-45 accepted
- ✅ Form only submits with valid temperature range

**Screenshots Required:**
- `AC1-TEMP-003-invalid-high-temp.png`
- `AC1-TEMP-003-invalid-low-temp.png`

---

### **TC-AC1-TEMP-004: Temperature Field UI Verification**
**Priority:** P2 (Medium)
**Description:** Verify temperature field UI shows optional status correctly

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form open

**Steps:**
1. Navigate to Medical Check-in form
2. **Verify temperature field has NO red asterisk (*)**
3. **Verify placeholder text: "Optional - Enter if measured"**
4. **Verify field type is number input**
5. **Verify min/max attributes present (30, 45)**

**Expected Results:**
- ✅ No required indicator (asterisk)
- ✅ Clear placeholder text indicating optional
- ✅ Number input type
- ✅ Min/max validation attributes present

**Screenshots Required:**
- `AC1-TEMP-004-field-ui.png`

---

## Test Cases - AC2: Doctor Searchable Dropdown

### **TC-AC2-DOCTOR-001: Search Existing Doctor Name**
**Priority:** P0 (Critical)
**Description:** Verify user can search and select existing doctor from dropdown

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form open
- Doctor "Dr. Sharma" exists in database

**Steps:**
1. Navigate to Medical Check-in form
2. Expand "Doctor Visits" section
3. Click on Doctor Name dropdown
4. **Verify dropdown shows list of existing doctors**
5. Type "Sh" in search field
6. **Verify dropdown filters to show "Dr. Sharma"**
7. Click "Dr. Sharma" option
8. **Verify "Dr. Sharma" populates in field**
9. Fill remaining fields and submit
10. **Verify form submits successfully**

**Expected Results:**
- ✅ Dropdown shows existing doctors on click
- ✅ Search filters doctors in real-time
- ✅ Case-insensitive search works
- ✅ Selected doctor populates field
- ✅ Form submits with selected doctor
- ✅ No console errors

**Screenshots Required:**
- `AC2-DOCTOR-001-dropdown-list.png`
- `AC2-DOCTOR-001-search-filtered.png`
- `AC2-DOCTOR-001-doctor-selected.png`

---

### **TC-AC2-DOCTOR-002: Add New Doctor to Database**
**Priority:** P0 (Critical - Key Feature)
**Description:** Verify user can add new doctor name not in database

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form open
- Doctor "Dr. Newname" does NOT exist in database

**Steps:**
1. Navigate to Doctor Visit section
2. Click on Doctor Name dropdown
3. Type "Dr. Newname" (not in database)
4. **Verify dropdown shows "Add 'Dr. Newname'"**
5. Click "Add 'Dr. Newname'" option
6. **Verify "Dr. Newname" populates in field**
7. Fill remaining fields and submit form
8. **Verify form submits successfully**
9. Create new check-in, search "Dr. Newname"
10. **Verify "Dr. Newname" appears in searchable list**

**Expected Results:**
- ✅ Typing new name shows "Add..." option
- ✅ Clicking creates new doctor in database
- ✅ Doctor name populates in field
- ✅ Form submits successfully
- ✅ New doctor searchable in future check-ins
- ✅ No console errors
- ✅ No duplicate doctors created

**Screenshots Required:**
- `AC2-DOCTOR-002-add-new-doctor-option.png`
- `AC2-DOCTOR-002-doctor-name-populated.png`
- `AC2-DOCTOR-002-doctor-searchable-later.png`

---

### **TC-AC2-DOCTOR-003: New Doctor Available Across Visits**
**Priority:** P0 (Critical)
**Description:** Verify new doctor added in Visit 1 appears in Visit 2 dropdown

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form open
- New doctor "Dr. TestDoc" does not exist

**Steps:**
1. Navigate to Doctor Visit 1
2. Add new doctor: "Dr. TestDoc"
3. **Verify "Dr. TestDoc" added successfully**
4. Click "+ Add Another Doctor Visit"
5. In Visit 2, click Doctor Name dropdown
6. Type "TestDoc"
7. **Verify "Dr. TestDoc" appears in search results**
8. Select "Dr. TestDoc"
9. **Verify name populates in Visit 2**

**Expected Results:**
- ✅ Doctor added in Visit 1 immediately available
- ✅ Search finds newly added doctor
- ✅ Can select same doctor for multiple visits
- ✅ No duplicate creation

**Screenshots Required:**
- `AC2-DOCTOR-003-doctor-in-visit1.png`
- `AC2-DOCTOR-003-doctor-available-visit2.png`

---

### **TC-AC2-DOCTOR-004: Clear Doctor Name Selection**
**Priority:** P1 (High)
**Description:** Verify user can clear doctor selection

**Preconditions:**
- Medical Incharge logged in
- Doctor Visit section open

**Steps:**
1. Select doctor: "Dr. Sharma"
2. **Verify "Dr. Sharma" populates field**
3. Click clear (X) button in dropdown
4. **Verify field clears to empty**
5. **Verify no validation errors shown**
6. Select different doctor: "Dr. Patel"
7. **Verify "Dr. Patel" populates correctly**

**Expected Results:**
- ✅ Clear button visible when doctor selected
- ✅ Clicking clear button removes selection
- ✅ Field returns to empty state
- ✅ No errors on clear
- ✅ Can select different doctor after clear

**Screenshots Required:**
- `AC2-DOCTOR-004-doctor-selected.png`
- `AC2-DOCTOR-004-doctor-cleared.png`

---

### **TC-AC2-DOCTOR-005: Case-Insensitive Search**
**Priority:** P1 (High)
**Description:** Verify doctor search is case-insensitive

**Preconditions:**
- Medical Incharge logged in
- Doctor "Dr. Sharma" exists in database

**Steps:**
1. Open Doctor Name dropdown
2. Search "sharma" (lowercase)
3. **Verify "Dr. Sharma" appears in results**
4. Clear search
5. Search "SHARMA" (uppercase)
6. **Verify "Dr. Sharma" appears in results**
7. Clear search
8. Search "ShArMa" (mixed case)
9. **Verify "Dr. Sharma" appears in results**

**Expected Results:**
- ✅ Lowercase search finds doctor
- ✅ Uppercase search finds doctor
- ✅ Mixed case search finds doctor
- ✅ Search consistently returns same doctor

**Screenshots Required:**
- `AC2-DOCTOR-005-case-insensitive-search.png`

---

### **TC-AC2-DOCTOR-006: No Duplicate Doctors Created**
**Priority:** P1 (High)
**Description:** Verify system prevents duplicate doctor entries (case-insensitive)

**Preconditions:**
- Medical Incharge logged in
- Doctor "Dr. Smith" exists in database

**Steps:**
1. Open Doctor Name dropdown
2. Type "dr. smith" (different case)
3. **Verify system shows existing "Dr. Smith"**
4. **Verify NO "Add 'dr. smith'" option shown**
5. Type "Dr. Smith Jones" (different name)
6. **Verify "Add 'Dr. Smith Jones'" option appears**
7. Check database for "Dr. Smith" entries
8. **Verify only ONE entry exists (not duplicated)**

**Expected Results:**
- ✅ Case-insensitive duplicate detection works
- ✅ Existing doctor shown instead of add option
- ✅ Different names show add option correctly
- ✅ No duplicate entries in database

**Screenshots Required:**
- `AC2-DOCTOR-006-no-duplicate-option.png`

---

## Test Cases - AC3: All Coaches Visible

### **TC-AC3-COACHES-001: All Coaches Shown for Selected Balagruha**
**Priority:** P0 (Critical - Primary Bug Fix)
**Description:** Verify all coaches (regular, music, sports) appear when Balagruha selected

**Preconditions:**
- Medical Incharge logged in
- Balagruha "Vivekananda" has 5 coaches assigned:
  - 2 regular coaches (role: "coach")
  - 2 music coaches (role: "music-coach")
  - 1 sports coach (role: "sports-coach")

**Steps:**
1. Navigate to Medical Check-in form
2. Expand "Follow-ups" section
3. Click "+ Add Follow-up"
4. In Follow-up 1, view "Assign to Coaches" section
5. **Verify all 5 coaches are visible:**
   - Coach Riz Shaikh (coach)
   - Coach Arjun (coach)
   - Coach Priya (music-coach)
   - Coach Ravi (music-coach)
   - Coach Sunil (sports-coach)
6. **Verify coaches displayed as checkboxes**
7. Select 3 coaches (one from each type)
8. **Verify all 3 selections stick**
9. Submit form
10. **Verify all 3 coaches assigned to follow-up**

**Expected Results:**
- ✅ All 5 coaches visible in checkbox list
- ✅ Regular coaches shown
- ✅ Music coaches shown
- ✅ Sports coaches shown
- ✅ Can select multiple coaches
- ✅ Selections persist on form submit

**Screenshots Required:**
- `AC3-COACHES-001-all-coaches-visible.png`
- `AC3-COACHES-001-coaches-selected.png`

---

### **TC-AC3-COACHES-002: Coaches Update When Balagruha Changes**
**Priority:** P0 (Critical)
**Description:** Verify coaches dropdown updates when different Balagruha selected

**Preconditions:**
- Balagruha A has 3 coaches
- Balagruha B has 5 coaches

**Steps:**
1. Select Balagruha A
2. Expand Follow-ups section
3. **Verify 3 coaches shown for Balagruha A**
4. Switch to Balagruha B
5. **Verify coaches list updates to show 5 coaches for Balagruha B**
6. **Verify previously selected coaches cleared**
7. Switch back to Balagruha A
8. **Verify 3 coaches shown again**

**Expected Results:**
- ✅ Coaches update based on selected Balagruha
- ✅ Correct coaches shown for each Balagruha
- ✅ Coach selections clear when Balagruha changes
- ✅ No stale coach data shown

**Screenshots Required:**
- `AC3-COACHES-002-balagruha-a-coaches.png`
- `AC3-COACHES-002-balagruha-b-coaches.png`

---

### **TC-AC3-COACHES-003: Select Multiple Coaches**
**Priority:** P1 (High)
**Description:** Verify user can select multiple coaches for single follow-up

**Preconditions:**
- Medical Incharge logged in
- Balagruha selected with multiple coaches

**Steps:**
1. Navigate to Follow-up section
2. Click checkboxes for 3 different coaches
3. **Verify all 3 checkboxes checked**
4. **Verify coach names displayed/highlighted**
5. Uncheck one coach
6. **Verify 2 coaches remain selected**
7. Submit form
8. **Verify only 2 coaches assigned to follow-up**

**Expected Results:**
- ✅ Multiple coaches can be selected
- ✅ UI shows all selected coaches
- ✅ Can deselect coaches
- ✅ Only selected coaches submitted

**Screenshots Required:**
- `AC3-COACHES-003-multiple-selected.png`

---

### **TC-AC3-COACHES-004: Empty State When No Balagruha Selected**
**Priority:** P2 (Medium)
**Description:** Verify coaches section shows empty state when Balagruha not selected

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form open

**Steps:**
1. Open Medical Check-in form
2. Do NOT select Balagruha
3. Expand Follow-ups section
4. **Verify coaches section shows: "No coaches available for this Balagruha"**
5. OR **Verify coaches section is empty/disabled**
6. Select Balagruha
7. **Verify coaches list populates**

**Expected Results:**
- ✅ Empty/disabled state when no Balagruha selected
- ✅ Clear message to user
- ✅ Coaches populate after Balagruha selection
- ✅ No console errors

**Screenshots Required:**
- `AC3-COACHES-004-empty-state.png`

---

## Test Cases - AC4: Form Submission Error Resolved

### **TC-AC4-SUBMIT-001: Submit Complete Form Successfully**
**Priority:** P0 (Critical - Primary Bug Fix)
**Description:** Verify check-in form submits successfully with all fields filled

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form open

**Steps:**
1. Fill all required fields:
   - Balagruha: "Vivekananda"
   - Student: "Test Student 1"
   - Date: Today
   - Time: Current time
2. Fill optional fields:
   - Temperature: 36.5
   - Health Status: "Normal"
   - Symptoms: "Cough + Cold"
   - Notes: "Routine check-up"
3. Add Doctor Visit with doctor name
4. Add Follow-up with date
5. Click "Submit" button
6. **Verify no console errors**
7. **Verify success toast: "Medical Check-in created successfully"**
8. Navigate to check-ins list
9. **Verify new check-in appears in list**
10. Click on check-in to view details
11. **Verify all entered data saved correctly**

**Expected Results:**
- ✅ Form submits without errors
- ✅ Success message displayed
- ✅ Check-in created in database
- ✅ All data persisted correctly
- ✅ No console errors
- ✅ Form redirects/clears after submit

**Screenshots Required:**
- `AC4-SUBMIT-001-form-filled.png`
- `AC4-SUBMIT-001-success-toast.png`
- `AC4-SUBMIT-001-checkin-in-list.png`
- `AC4-SUBMIT-001-checkin-details.png`

---

### **TC-AC4-SUBMIT-002: Submit Minimal Form (Required Fields Only)**
**Priority:** P0 (Critical)
**Description:** Verify form submits with only required fields

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form open

**Steps:**
1. Fill ONLY required fields:
   - Balagruha: "Vivekananda"
   - Student: "Test Student 2"
   - Date: Today
   - Time: Current time
2. Leave ALL optional fields empty (temperature, notes, doctor visits, follow-ups)
3. Click "Submit"
4. **Verify form submits successfully**
5. **Verify success message appears**
6. View created check-in
7. **Verify required fields saved**
8. **Verify optional fields are empty/null**

**Expected Results:**
- ✅ Form submits with only required fields
- ✅ No validation errors on optional fields
- ✅ Check-in created successfully
- ✅ Required data saved correctly

**Screenshots Required:**
- `AC4-SUBMIT-002-minimal-form.png`
- `AC4-SUBMIT-002-checkin-created.png`

---

### **TC-AC4-SUBMIT-003: Form Validation for Required Fields**
**Priority:** P1 (High)
**Description:** Verify form shows validation errors when required fields missing

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form open

**Steps:**
1. Leave Balagruha blank
2. Click "Submit"
3. **Verify validation error: "Balagruha is required" (or similar)**
4. Select Balagruha
5. Leave Student blank
6. Click "Submit"
7. **Verify validation error: "Student is required"**
8. Select Student
9. Leave Date blank
10. Click "Submit"
11. **Verify validation error: "Date is required"**
12. Fill all required fields
13. Click "Submit"
14. **Verify form submits successfully**

**Expected Results:**
- ✅ Specific validation errors shown for each required field
- ✅ Form does not submit until all required fields filled
- ✅ Error messages clear and helpful
- ✅ Form submits after all requirements met

**Screenshots Required:**
- `AC4-SUBMIT-003-validation-balagruha.png`
- `AC4-SUBMIT-003-validation-student.png`
- `AC4-SUBMIT-003-validation-date.png`

---

### **TC-AC4-SUBMIT-004: No Console Errors During Submission**
**Priority:** P0 (Critical)
**Description:** Verify clean console logs during form submission

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form open
- Browser console open

**Steps:**
1. Clear console logs
2. Fill check-in form completely
3. Click "Submit"
4. **Verify no console errors appear**
5. **Verify no console warnings (critical ones)**
6. Check network tab
7. **Verify POST request succeeds (status 200 or 201)**
8. **Verify response contains created check-in data**

**Expected Results:**
- ✅ No console errors
- ✅ No critical warnings
- ✅ Network request successful
- ✅ Response contains expected data structure
- ✅ Clean submission flow

**Screenshots Required:**
- `AC4-SUBMIT-004-console-clean.png`
- `AC4-SUBMIT-004-network-success.png`

---

### **TC-AC4-SUBMIT-005: Form State After Successful Submission**
**Priority:** P1 (High)
**Description:** Verify form clears/resets after successful submission

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form open

**Steps:**
1. Fill complete check-in form with all fields
2. Submit form
3. **Verify success message appears**
4. **Verify form clears to empty state** OR **modal closes**
5. Open new check-in form
6. **Verify all fields are empty/default values**
7. **Verify no data from previous submission**

**Expected Results:**
- ✅ Form clears after successful submission
- ✅ Modal closes OR redirects to list view
- ✅ New form opens with clean state
- ✅ No residual data from previous submission

**Screenshots Required:**
- `AC4-SUBMIT-005-form-after-submit.png`

---

## Test Cases - AC5: Multiple Doctor Visits

### **TC-AC5-VISITS-001: Add Additional Doctor Visit**
**Priority:** P0 (Critical - Key Feature)
**Description:** Verify user can add multiple doctor visits to single check-in

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form open

**Steps:**
1. Navigate to Medical Check-in form
2. Expand "Doctor Visits" section
3. **Verify "Doctor Visit 1" section visible**
4. **Verify "+ Add Doctor Visit" button visible**
5. Fill Visit 1:
   - Doctor Name: "Dr. Sharma"
   - Hospital: "City Hospital"
   - Visit Date: Today
6. Click "+ Add Doctor Visit"
7. **Verify "Doctor Visit 2" section appears**
8. **Verify header shows "Doctor Visits (2)"**
9. Fill Visit 2:
   - Doctor Name: "Dr. Patel"
   - Hospital: "General Hospital"
   - Visit Date: Yesterday
10. **Verify both visits visible and collapsible**
11. Submit form
12. **Verify both visits saved to check-in**

**Expected Results:**
- ✅ Can add second doctor visit
- ✅ Visit 2 section appears below Visit 1
- ✅ Count updates in header
- ✅ Both visits collapsible/expandable
- ✅ Both visits submitted and saved
- ✅ Each visit maintains independent data

**Screenshots Required:**
- `AC5-VISITS-001-visit1-filled.png`
- `AC5-VISITS-001-visit2-added.png`
- `AC5-VISITS-001-both-visits-submitted.png`

---

### **TC-AC5-VISITS-002: Remove Doctor Visit (Not Last One)**
**Priority:** P0 (Critical)
**Description:** Verify user can remove doctor visit when multiple exist

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form with 3 doctor visits

**Steps:**
1. Add 3 doctor visits
2. **Verify all 3 visits shown (Visit 1, Visit 2, Visit 3)**
3. **Verify each visit has "❌ Remove Visit" button**
4. Click "Remove Visit" on Visit 2
5. **Verify Visit 2 removed**
6. **Verify Visit 3 becomes Visit 2**
7. **Verify header shows "Doctor Visits (2)"**
8. Fill remaining visits and submit
9. **Verify only 2 visits saved to check-in**

**Expected Results:**
- ✅ Remove button visible on each visit
- ✅ Clicking removes the visit
- ✅ Subsequent visits renumber automatically
- ✅ Count updates correctly
- ✅ Only remaining visits submitted

**Screenshots Required:**
- `AC5-VISITS-002-three-visits.png`
- `AC5-VISITS-002-visit2-removed.png`

---

### **TC-AC5-VISITS-003: Cannot Remove Last Doctor Visit**
**Priority:** P1 (High)
**Description:** Verify at least one doctor visit must remain

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form with single doctor visit

**Steps:**
1. Navigate to Doctor Visits section
2. **Verify only "Doctor Visit 1" shown**
3. **Verify NO "Remove Visit" button visible on Visit 1**
4. OR **Verify "Remove Visit" button is disabled**
5. Add second visit
6. **Verify "Remove Visit" button appears on both visits**
7. Remove Visit 2
8. **Verify Visit 1 remains and "Remove Visit" button disappears/disables**

**Expected Results:**
- ✅ Last visit cannot be removed
- ✅ Remove button hidden or disabled for single visit
- ✅ At least one visit always present
- ✅ Remove button appears when multiple visits exist

**Screenshots Required:**
- `AC5-VISITS-003-single-visit-no-remove.png`
- `AC5-VISITS-003-multiple-visits-can-remove.png`

---

### **TC-AC5-VISITS-004: Submit Form with Multiple Visits**
**Priority:** P0 (Critical)
**Description:** Verify check-in saves all doctor visits correctly

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form open

**Steps:**
1. Fill required check-in fields
2. Add 3 doctor visits with complete data:
   - Visit 1: Dr. Sharma, City Hospital, Date: 2025-01-10
   - Visit 2: Dr. Patel, General Hospital, Date: 2025-01-15
   - Visit 3: Dr. Kumar, Specialist Clinic, Date: 2025-01-20
3. **Verify all 3 visits show in UI**
4. Submit form
5. **Verify success message**
6. View created check-in
7. **Verify all 3 visits saved correctly**
8. **Verify visit data accurate (doctors, hospitals, dates)**
9. **Verify visits in chronological order or as entered**

**Expected Results:**
- ✅ All 3 visits submitted successfully
- ✅ All visit data persisted correctly
- ✅ Visits retrievable from database
- ✅ Data integrity maintained

**Screenshots Required:**
- `AC5-VISITS-004-three-visits-filled.png`
- `AC5-VISITS-004-checkin-all-visits-saved.png`

---

### **TC-AC5-VISITS-005: Collapsible Sections Work Correctly**
**Priority:** P1 (High)
**Description:** Verify doctor visit sections can be collapsed/expanded

**Preconditions:**
- Medical Incharge logged in
- Form with 3 doctor visits

**Steps:**
1. Add 3 doctor visits
2. **Verify all 3 visits expanded by default**
3. Click header of Visit 1 to collapse
4. **Verify Visit 1 fields hidden**
5. **Verify Visit 1 header still visible with collapse icon (▶)**
6. Click header of Visit 1 to expand
7. **Verify Visit 1 fields visible again**
8. **Verify collapse icon changes to (▼)**
9. Collapse Visit 2
10. **Verify Visit 1 and Visit 3 remain expanded**
11. **Verify no layout issues or overlapping**

**Expected Results:**
- ✅ Visits can be collapsed individually
- ✅ Collapsed visit hides fields, shows header
- ✅ Expanded visit shows all fields
- ✅ Toggle icon changes (▶/▼)
- ✅ No UI layout issues

**Screenshots Required:**
- `AC5-VISITS-005-all-expanded.png`
- `AC5-VISITS-005-visit1-collapsed.png`

---

### **TC-AC5-VISITS-006: File Uploads Work Per Visit Independently**
**Priority:** P1 (High)
**Description:** Verify file uploads are visit-specific

**Preconditions:**
- Medical Incharge logged in
- Form with 2 doctor visits

**Steps:**
1. In Visit 1, upload prescription file: "prescription1.pdf"
2. **Verify "prescription1.pdf" appears in Visit 1 files**
3. In Visit 2, upload test result file: "test-result2.jpg"
4. **Verify "test-result2.jpg" appears in Visit 2 files**
5. **Verify Visit 1 still shows only "prescription1.pdf"**
6. **Verify Visit 2 still shows only "test-result2.jpg"**
7. Submit form
8. View check-in
9. **Verify prescription file attached to Visit 1**
10. **Verify test result file attached to Visit 2**

**Expected Results:**
- ✅ Files uploaded to correct visit
- ✅ Files don't cross-contaminate between visits
- ✅ Each visit maintains independent file lists
- ✅ Files persisted correctly per visit

**Screenshots Required:**
- `AC5-VISITS-006-visit1-file-uploaded.png`
- `AC5-VISITS-006-visit2-file-uploaded.png`

---

### **TC-AC5-VISITS-007: Validation Works Per Visit Section**
**Priority:** P1 (High)
**Description:** Verify validation errors show for specific visits

**Preconditions:**
- Medical Incharge logged in
- Form with 2 doctor visits

**Steps:**
1. Fill Visit 1 completely with valid data
2. In Visit 2, leave all fields empty
3. Submit form
4. **Verify NO validation errors on Visit 1**
5. **Verify validation errors (if any) specific to Visit 2**
6. OR **Verify form submits (visits are optional)**
7. Fill Visit 2 with invalid data (e.g., future visit date)
8. Submit form
9. **Verify validation error shows on Visit 2 specifically**

**Expected Results:**
- ✅ Validation specific to each visit
- ✅ Error messages indicate which visit has issue
- ✅ Valid visits not affected by invalid visits
- ✅ Clear error indication per visit

**Screenshots Required:**
- `AC5-VISITS-007-visit2-validation-error.png`

---

## Test Cases - AC6: Multiple Follow-ups

### **TC-AC6-FOLLOWUP-001: Add Additional Follow-up**
**Priority:** P0 (Critical - Key Feature)
**Description:** Verify user can add multiple follow-ups to single check-in

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form open

**Steps:**
1. Navigate to Medical Check-in form
2. Expand "Follow-ups" section
3. **Verify "+ Add Follow-up" button visible**
4. Click "+ Add Follow-up"
5. **Verify "Follow-up 1" section appears**
6. Fill Follow-up 1:
   - Follow-up Date: 2025-01-20 (required)
   - Hospital: "City Hospital"
   - Assign 2 coaches
7. Click "+ Add Follow-up" again
8. **Verify "Follow-up 2" section appears**
9. **Verify header shows "Follow-ups (2)"**
10. Fill Follow-up 2 with different date
11. **Verify both follow-ups visible**
12. Submit form
13. **Verify both follow-ups saved**

**Expected Results:**
- ✅ Can add multiple follow-ups
- ✅ Each follow-up numbered sequentially
- ✅ Count updates in header
- ✅ All follow-ups collapsible
- ✅ All follow-ups submitted and saved

**Screenshots Required:**
- `AC6-FOLLOWUP-001-followup1-added.png`
- `AC6-FOLLOWUP-001-followup2-added.png`
- `AC6-FOLLOWUP-001-both-saved.png`

---

### **TC-AC6-FOLLOWUP-002: Follow-up Date is Required**
**Priority:** P0 (Critical - Key Validation)
**Description:** Verify follow-up date is mandatory for each follow-up

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form with follow-up

**Steps:**
1. Add Follow-up
2. Fill all fields EXCEPT Follow-up Date
3. Submit form
4. **Verify validation error: "Follow-up date is required"**
5. **Verify form does not submit**
6. Fill Follow-up Date: 2025-01-20
7. Submit form
8. **Verify form submits successfully**
9. View check-in
10. **Verify follow-up date saved correctly**

**Expected Results:**
- ✅ Follow-up date marked as required (asterisk)
- ✅ Validation error if date missing
- ✅ Form submits only with date filled
- ✅ Date persisted correctly

**Screenshots Required:**
- `AC6-FOLLOWUP-002-date-required-error.png`
- `AC6-FOLLOWUP-002-date-filled-success.png`

---

### **TC-AC6-FOLLOWUP-003: Remove Follow-up**
**Priority:** P1 (High)
**Description:** Verify user can remove follow-up when multiple exist

**Preconditions:**
- Medical Incharge logged in
- Form with 3 follow-ups

**Steps:**
1. Add 3 follow-ups
2. **Verify all 3 follow-ups shown**
3. **Verify each has "❌ Remove Follow-up" button**
4. Click "Remove Follow-up" on Follow-up 2
5. **Verify Follow-up 2 removed**
6. **Verify Follow-up 3 becomes Follow-up 2**
7. **Verify header shows "Follow-ups (2)"**
8. Submit form
9. **Verify only 2 follow-ups saved**

**Expected Results:**
- ✅ Remove button visible on all follow-ups
- ✅ Clicking removes follow-up
- ✅ Renumbering happens automatically
- ✅ Count updates correctly
- ✅ Only remaining follow-ups submitted

**Screenshots Required:**
- `AC6-FOLLOWUP-003-three-followups.png`
- `AC6-FOLLOWUP-003-followup2-removed.png`

---

### **TC-AC6-FOLLOWUP-004: Submit Form with Multiple Follow-ups**
**Priority:** P0 (Critical)
**Description:** Verify check-in saves all follow-ups correctly

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form open

**Steps:**
1. Fill required check-in fields
2. Add 3 follow-ups with complete data:
   - Follow-up 1: Date 2025-01-15, City Hospital, 2 coaches
   - Follow-up 2: Date 2025-01-22, General Hospital, 1 coach
   - Follow-up 3: Date 2025-01-29, Specialist Clinic, 3 coaches
3. **Verify all 3 follow-ups show in UI**
4. Submit form
5. **Verify success message**
6. View created check-in
7. **Verify all 3 follow-ups saved**
8. **Verify dates, hospitals, coaches correct for each**

**Expected Results:**
- ✅ All 3 follow-ups submitted successfully
- ✅ All follow-up data persisted correctly
- ✅ Dates saved accurately
- ✅ Coach assignments saved per follow-up

**Screenshots Required:**
- `AC6-FOLLOWUP-004-three-followups-filled.png`
- `AC6-FOLLOWUP-004-all-followups-saved.png`

---

### **TC-AC6-FOLLOWUP-005: Sequential Follow-up Dates**
**Priority:** P1 (High)
**Description:** Verify follow-ups can have sequential dates for treatment plans

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form open

**Steps:**
1. Add 3 follow-ups with sequential dates:
   - Follow-up 1: 2025-01-15
   - Follow-up 2: 2025-01-22 (7 days later)
   - Follow-up 3: 2025-01-29 (14 days later)
2. **Verify all dates accepted**
3. **Verify dates can be in future**
4. Submit form
5. View check-in
6. **Verify all 3 dates saved correctly**
7. **Verify dates displayed in chronological order (if UI sorts)**

**Expected Results:**
- ✅ Future dates accepted for follow-ups
- ✅ Sequential dates saved correctly
- ✅ Dates don't conflict with each other
- ✅ Treatment timeline trackable

**Screenshots Required:**
- `AC6-FOLLOWUP-005-sequential-dates.png`

---

### **TC-AC6-FOLLOWUP-006: Assign Multiple Coaches to Follow-up**
**Priority:** P1 (High)
**Description:** Verify multiple coaches can be assigned to single follow-up

**Preconditions:**
- Medical Incharge logged in
- Balagruha with 5 coaches

**Steps:**
1. Add follow-up
2. In "Assign to Coaches", select 3 coaches
3. **Verify all 3 checkboxes checked**
4. **Verify coach names visible/highlighted**
5. Submit form
6. View check-in
7. **Verify all 3 coaches assigned to follow-up**
8. **Verify coaches can view this follow-up task**

**Expected Results:**
- ✅ Multiple coaches can be assigned
- ✅ UI shows all selected coaches
- ✅ All assignments persisted
- ✅ Coaches notified (if applicable)

**Screenshots Required:**
- `AC6-FOLLOWUP-006-multiple-coaches-assigned.png`

---

### **TC-AC6-FOLLOWUP-007: Follow-up Status Toggle**
**Priority:** P2 (Medium)
**Description:** Verify follow-up status can be set (Active/Inactive/Completed)

**Preconditions:**
- Medical Incharge logged in
- Follow-up section open

**Steps:**
1. Add follow-up
2. **Verify Status dropdown shows: Active/Inactive/Completed**
3. Select "Active"
4. **Verify "Active" selected**
5. Submit form
6. View check-in
7. **Verify follow-up status shows "Active"**
8. Edit check-in, change status to "Completed"
9. **Verify status updates to "Completed"**

**Expected Results:**
- ✅ Status dropdown has correct options
- ✅ Status can be selected
- ✅ Status saved correctly
- ✅ Status can be updated later

**Screenshots Required:**
- `AC6-FOLLOWUP-007-status-dropdown.png`

---

## Test Cases - AC7: Follow-up File Uploads

### **TC-AC7-FILES-001: Upload Description File to Follow-up**
**Priority:** P0 (Critical - New Feature)
**Description:** Verify user can upload description files (prescriptions, notes) to follow-up

**Preconditions:**
- Medical Incharge logged in
- Follow-up section open
- Test image file: "prescription.jpg" (3MB)

**Steps:**
1. Add follow-up
2. Click "📎 Upload Description Files" button
3. Select file: "prescription.jpg" (3MB)
4. **Verify file appears in description files list**
5. **Verify file name shown: "prescription.jpg"**
6. **Verify thumbnail/icon visible**
7. Submit form
8. **Verify success message**
9. View check-in
10. **Verify description file attached to follow-up**
11. Click file link
12. **Verify file opens/downloads correctly**

**Expected Results:**
- ✅ File upload button visible
- ✅ File selector accepts images/PDFs
- ✅ Uploaded file shows in UI
- ✅ File submitted with follow-up
- ✅ File retrievable from check-in
- ✅ File opens correctly

**Screenshots Required:**
- `AC7-FILES-001-upload-button.png`
- `AC7-FILES-001-file-uploaded.png`
- `AC7-FILES-001-file-saved-checkin.png`

---

### **TC-AC7-FILES-002: Upload Test Result File to Follow-up**
**Priority:** P0 (Critical)
**Description:** Verify user can upload test result files (lab results, X-rays) to follow-up

**Preconditions:**
- Medical Incharge logged in
- Follow-up section open
- Test PDF file: "lab-results.pdf" (8MB)

**Steps:**
1. Add follow-up
2. Click "📎 Upload Test Result Files" button
3. Select file: "lab-results.pdf" (8MB)
4. **Verify file appears in test result files list**
5. **Verify PDF icon visible**
6. Submit form
7. View check-in
8. **Verify test result file attached to follow-up**
9. Click file link
10. **Verify PDF opens in new tab**

**Expected Results:**
- ✅ Test result upload button visible
- ✅ PDF file accepted
- ✅ Uploaded file shows in UI
- ✅ File submitted with follow-up
- ✅ File retrievable from check-in
- ✅ PDF viewable

**Screenshots Required:**
- `AC7-FILES-002-test-result-uploaded.png`
- `AC7-FILES-002-pdf-viewable.png`

---

### **TC-AC7-FILES-003: Upload Multiple Files to Single Follow-up**
**Priority:** P1 (High)
**Description:** Verify multiple files can be uploaded to single follow-up

**Preconditions:**
- Medical Incharge logged in
- Follow-up section open

**Steps:**
1. Add follow-up
2. Upload 2 description files:
   - "prescription1.pdf"
   - "doctor-notes.jpg"
3. **Verify both files appear in description files list**
4. Upload 1 test result file:
   - "xray-result.jpg"
5. **Verify file appears in test result files list**
6. **Verify total 3 files uploaded to follow-up**
7. Submit form
8. View check-in
9. **Verify all 3 files attached correctly**
10. **Verify description and test result files in separate sections**

**Expected Results:**
- ✅ Multiple files can be uploaded
- ✅ Description and test result files separate
- ✅ All files show in UI
- ✅ All files submitted correctly
- ✅ Files categorized properly

**Screenshots Required:**
- `AC7-FILES-003-multiple-files-uploaded.png`
- `AC7-FILES-003-files-categorized.png`

---

### **TC-AC7-FILES-004: File Upload Works Per Follow-up Independently**
**Priority:** P1 (High)
**Description:** Verify file uploads are follow-up specific

**Preconditions:**
- Medical Incharge logged in
- Form with 2 follow-ups

**Steps:**
1. In Follow-up 1, upload description file: "followup1-notes.pdf"
2. **Verify file appears in Follow-up 1 only**
3. In Follow-up 2, upload test result file: "followup2-xray.jpg"
4. **Verify file appears in Follow-up 2 only**
5. **Verify Follow-up 1 still shows only "followup1-notes.pdf"**
6. **Verify Follow-up 2 still shows only "followup2-xray.jpg"**
7. Submit form
8. View check-in
9. **Verify files attached to correct follow-ups**

**Expected Results:**
- ✅ Files uploaded to correct follow-up
- ✅ Files don't cross-contaminate between follow-ups
- ✅ Each follow-up maintains independent file lists
- ✅ Files persisted correctly per follow-up

**Screenshots Required:**
- `AC7-FILES-004-followup1-file.png`
- `AC7-FILES-004-followup2-file.png`

---

### **TC-AC7-FILES-005: File Size Validation for Description Files**
**Priority:** P1 (High)
**Description:** Verify description file size limit enforced (5MB images, 10MB PDFs)

**Preconditions:**
- Medical Incharge logged in
- Follow-up section open
- Test files: "large-image.jpg" (7MB), "large-pdf.pdf" (12MB)

**Steps:**
1. Add follow-up
2. Try to upload "large-image.jpg" (7MB, exceeds 5MB limit)
3. **Verify validation error: "File large-image.jpg exceeds 5MB limit"**
4. **Verify file NOT added to list**
5. Try to upload "large-pdf.pdf" (12MB, exceeds 10MB limit)
6. **Verify validation error: "File large-pdf.pdf exceeds 10MB limit"**
7. Upload valid file: "valid-image.jpg" (3MB)
8. **Verify file accepted and added to list**

**Expected Results:**
- ✅ Images > 5MB rejected
- ✅ PDFs > 10MB rejected
- ✅ Clear error message shown
- ✅ Invalid files not added to form
- ✅ Valid files accepted

**Screenshots Required:**
- `AC7-FILES-005-image-size-error.png`
- `AC7-FILES-005-pdf-size-error.png`

---

### **TC-AC7-FILES-006: File Type Validation**
**Priority:** P1 (High)
**Description:** Verify only images and PDFs accepted for file uploads

**Preconditions:**
- Medical Incharge logged in
- Follow-up section open
- Test files: "document.txt", "video.mp4"

**Steps:**
1. Add follow-up
2. Try to upload "document.txt"
3. **Verify validation error: "File must be an image or PDF"**
4. **Verify file NOT added**
5. Try to upload "video.mp4"
6. **Verify validation error shown**
7. Upload valid image: "prescription.jpg"
8. **Verify file accepted**
9. Upload valid PDF: "lab-results.pdf"
10. **Verify file accepted**

**Expected Results:**
- ✅ Only images and PDFs accepted
- ✅ Other file types rejected
- ✅ Clear error message shown
- ✅ Valid file types accepted

**Screenshots Required:**
- `AC7-FILES-006-invalid-file-type-error.png`

---

## UAT Bug Fixes (Post-Story 3 Deployment)

**Bug Report Date:** 2025-11-13
**Bugs Fixed:** 6 critical issues reported during UAT testing
**Fix Status:** All fixes implemented and ready for QA verification

### **Overview of UAT Bugs:**
- **BUG-001:** Second follow-up not displaying in edit mode
- **BUG-002:** Files not persisting sometimes
- **BUG-003:** Adding doctor visit overrides previous visits instead of adding
- **BUG-004:** Follow-ups not being updated correctly
- **BUG-005:** Doctor name dropdown missing in Follow-up section
- **BUG-006:** Hospital name needs dropdown/suggestion feature

---

### **TC-UAT-BUG001-001: Second Follow-up Displays in Edit Mode**
**Priority:** P0 (Critical - UAT Blocker)
**Description:** Verify all follow-ups display correctly when editing check-in
**Related Bug:** BUG-001 - Second follow-up not showing in edit

**Preconditions:**
- Medical Incharge logged in
- Check-in exists with 2+ follow-ups already saved

**Steps:**
1. Create new check-in with 3 follow-ups:
   - Follow-up 1: Date 2025-01-15, Hospital "City Hospital", 2 coaches assigned
   - Follow-up 2: Date 2025-01-22, Hospital "General Hospital", 1 coach assigned
   - Follow-up 3: Date 2025-01-29, Hospital "Specialist Clinic", 3 coaches assigned
2. **Verify all 3 follow-ups saved successfully**
3. Close modal/navigate away from check-in
4. Find the check-in in list
5. Click "Edit" on the check-in
6. **Verify Follow-up 1 displays with correct data (Date, Hospital, Coaches)**
7. **Verify Follow-up 2 displays with correct data (Date, Hospital, Coaches)**
8. **Verify Follow-up 3 displays with correct data (Date, Hospital, Coaches)**
9. **Verify header shows "Follow-ups (3)"**
10. **Verify no data loss or corruption**
11. Make minor edit to Follow-up 2 (change hospital name)
12. Submit form
13. Re-open check-in in edit mode
14. **Verify Follow-up 2 changes persisted**
15. **Verify all 3 follow-ups still intact**

**Expected Results:**
- ✅ All 3 follow-ups display in edit mode
- ✅ All follow-up data accurate (dates, hospitals, coaches)
- ✅ No follow-ups missing or hidden
- ✅ Can edit any follow-up and changes persist
- ✅ Follow-up count accurate in header
- ✅ No console errors

**Root Cause Fixed:**
Backend controller now accepts `followUps[]` array format instead of only single `followUp` object

**Screenshots Required:**
- `UAT-BUG001-001-three-followups-created.png`
- `UAT-BUG001-001-edit-mode-all-followups-visible.png`
- `UAT-BUG001-001-followup2-edited-persisted.png`

---

### **TC-UAT-BUG002-001: Files Persist Correctly on Edit**
**Priority:** P0 (Critical - UAT Blocker)
**Description:** Verify uploaded files persist correctly when editing check-in
**Related Bug:** BUG-002 - Files not persisting sometimes

**Preconditions:**
- Medical Incharge logged in
- Test files available: prescription.pdf, lab-results.jpg, xray.jpg

**Steps:**
1. Create new check-in
2. Add Doctor Visit 1:
   - Upload prescription file: "prescription.pdf" (3MB)
   - Upload test result file: "lab-results.jpg" (4MB)
3. **Verify both files appear in Visit 1 file lists**
4. Add Doctor Visit 2:
   - Upload test result file: "xray.jpg" (3MB)
5. **Verify file appears in Visit 2 file list**
6. Add Follow-up 1:
   - Upload description file: "followup-notes.pdf" (2MB)
7. **Verify file appears in Follow-up 1 description files**
8. Submit form
9. **Verify success message**
10. Close modal
11. Find check-in in list, click "Edit"
12. **Verify Visit 1 shows both files (prescription.pdf, lab-results.jpg)**
13. **Verify Visit 2 shows file (xray.jpg)**
14. **Verify Follow-up 1 shows file (followup-notes.pdf)**
15. **Verify all files are clickable/downloadable**
16. Add new file to Visit 1: "additional-prescription.jpg"
17. Submit form
18. Re-open in edit mode
19. **Verify all files persisted (4 files total for visits + 1 for follow-up)**
20. **Verify no files lost or corrupted**

**Expected Results:**
- ✅ All uploaded files persist on first save
- ✅ Files visible in edit mode
- ✅ Files downloadable/viewable
- ✅ New files can be added without losing existing files
- ✅ Files categorized correctly (prescription vs test results vs follow-up files)
- ✅ No file data loss

**Root Cause Fixed:**
Backend controller now correctly processes FormData with array formats for doctorVisits and followUps, preserving file attachments

**Screenshots Required:**
- `UAT-BUG002-001-files-uploaded-initial.png`
- `UAT-BUG002-001-edit-mode-files-intact.png`
- `UAT-BUG002-001-additional-file-added.png`
- `UAT-BUG002-001-all-files-persisted.png`

---

### **TC-UAT-BUG003-001: Adding Doctor Visit Does Not Override Previous Visits**
**Priority:** P0 (Critical - UAT Blocker)
**Description:** Verify adding new doctor visit appends instead of overriding existing visits
**Related Bug:** BUG-003 - Adding doctor visit overrides previous visits

**Preconditions:**
- Medical Incharge logged in
- Medical check-in form open

**Steps:**
1. Create new check-in with basic info
2. Fill Doctor Visit 1:
   - Doctor Name: "Dr. Sharma"
   - Hospital: "City Hospital"
   - Visit Date: 2025-01-10
   - Prescription file: "prescription1.pdf"
   - Conclusion: "Patient stable, continue medication"
3. **Verify Visit 1 data entered**
4. Click "+ Add Another Doctor Visit"
5. Fill Doctor Visit 2:
   - Doctor Name: "Dr. Patel"
   - Hospital: "General Hospital"
   - Visit Date: 2025-01-15
   - Test Result file: "xray2.jpg"
   - Conclusion: "X-ray shows improvement"
6. **Verify Visit 1 STILL shows Dr. Sharma data (NOT overridden)**
7. **Verify Visit 2 shows Dr. Patel data**
8. **Verify header shows "Doctor Visits (2)"**
9. Click "+ Add Another Doctor Visit"
10. Fill Doctor Visit 3:
    - Doctor Name: "Dr. Kumar"
    - Hospital: "Specialist Clinic"
    - Visit Date: 2025-01-20
11. **Verify Visit 1 STILL shows Dr. Sharma**
12. **Verify Visit 2 STILL shows Dr. Patel**
13. **Verify Visit 3 shows Dr. Kumar**
14. **Verify header shows "Doctor Visits (3)"**
15. Submit form
16. **Verify success message**
17. View created check-in
18. **Verify all 3 visits saved correctly with distinct data**
19. Open in edit mode
20. **Verify all 3 visits still intact and editable**

**Expected Results:**
- ✅ Adding Visit 2 does NOT override Visit 1
- ✅ Adding Visit 3 does NOT override Visit 1 or Visit 2
- ✅ Each visit maintains independent data
- ✅ All visits submitted as array
- ✅ All visits persisted correctly in database
- ✅ All visits editable after save
- ✅ No data loss or overriding behavior

**Root Cause Fixed:**
Backend controller updated to accept `doctorVisits[]` array instead of single `doctorVisit` object. Controller now properly handles array format sent by frontend.

**Code Fix Location:** backend/controllers/medicalCheckInsController.js:354-473

**Screenshots Required:**
- `UAT-BUG003-001-visit1-filled.png`
- `UAT-BUG003-001-visit2-added-visit1-intact.png`
- `UAT-BUG003-001-visit3-added-all-intact.png`
- `UAT-BUG003-001-all-three-visits-saved.png`

---

### **TC-UAT-BUG004-001: Follow-ups Update Correctly**
**Priority:** P0 (Critical - UAT Blocker)
**Description:** Verify follow-up data updates correctly and persists
**Related Bug:** BUG-004 - Follow-ups not being updated

**Preconditions:**
- Medical Incharge logged in
- Check-in exists with 2 follow-ups

**Steps:**
1. Create new check-in
2. Add Follow-up 1:
   - Date: 2025-01-15
   - Hospital: "City Hospital"
   - Doctor: "Dr. Sharma"
   - Assign 2 coaches
   - Status: "Active"
   - Notes: "Initial follow-up for checkup"
3. Add Follow-up 2:
   - Date: 2025-01-22
   - Hospital: "General Hospital"
   - Doctor: "Dr. Patel"
   - Assign 1 coach
   - Status: "Active"
   - Notes: "Second follow-up for test results"
4. **Verify both follow-ups show in form**
5. Submit form
6. **Verify success message**
7. View check-in
8. **Verify both follow-ups saved with correct data**
9. Click "Edit" on check-in
10. Modify Follow-up 1:
    - Change Hospital to "Updated City Hospital"
    - Change Status to "Completed"
    - Add notes: "Updated - patient recovered"
11. **Verify Follow-up 2 data unchanged**
12. Submit form
13. View check-in
14. **Verify Follow-up 1 changes persisted:**
    - Hospital: "Updated City Hospital"
    - Status: "Completed"
    - Notes: "Updated - patient recovered"
15. **Verify Follow-up 2 still has original data**
16. Edit check-in again
17. Modify Follow-up 2:
    - Change Hospital to "Updated General Hospital"
    - Assign different coach
18. Submit form
19. **Verify Follow-up 2 updates persisted**
20. **Verify Follow-up 1 retains previous changes**

**Expected Results:**
- ✅ Follow-up 1 changes save correctly
- ✅ Follow-up 2 changes save correctly
- ✅ Updates to one follow-up don't affect other follow-ups
- ✅ All follow-up data persists correctly
- ✅ Can edit follow-ups multiple times
- ✅ No data loss on updates

**Root Cause Fixed:**
Backend controller now accepts `followUps[]` array format and correctly updates all follow-ups in database

**Screenshots Required:**
- `UAT-BUG004-001-two-followups-created.png`
- `UAT-BUG004-001-followup1-edited.png`
- `UAT-BUG004-001-followup1-changes-persisted.png`
- `UAT-BUG004-001-followup2-edited.png`
- `UAT-BUG004-001-both-followups-updated.png`

---

### **TC-UAT-BUG005-001: Doctor Name Dropdown in Follow-up Section**
**Priority:** P0 (Critical - UX Consistency)
**Description:** Verify doctor name dropdown appears and works in Follow-up section
**Related Bug:** BUG-005 - Doctor name not suggested in follow-up section

**Preconditions:**
- Medical Incharge logged in
- Database has 2 existing doctors: "Dr. Sharma", "Dr. Patel"

**Steps:**
1. Navigate to Medical Check-in form
2. Expand "Doctor Visits" section
3. **Verify Doctor Name field has DROPDOWN (CreatableSelect component)**
4. **Verify can search and select from existing doctors**
5. Expand "Follow-ups" section
6. Add Follow-up
7. **Verify Doctor Name field has DROPDOWN (same as Doctor Visits)**
8. Click Doctor Name dropdown in Follow-up
9. **Verify dropdown opens showing existing doctors**
10. Type "Sh" in search
11. **Verify "Dr. Sharma" appears in filtered results**
12. Select "Dr. Sharma"
13. **Verify "Dr. Sharma" populates in field**
14. Add another Follow-up
15. In Follow-up 2, type new doctor name "Dr. Newdoc"
16. **Verify "Add 'Dr. Newdoc'" option appears**
17. Click "Add 'Dr. Newdoc'"
18. **Verify "Dr. Newdoc" populates in field**
19. **Verify "Dr. Newdoc" added to database**
20. Submit form
21. Create new check-in
22. In Follow-up section, search "Newdoc"
23. **Verify "Dr. Newdoc" appears in searchable list**

**Expected Results:**
- ✅ Doctor name dropdown visible in Follow-up section
- ✅ Dropdown identical to Doctor Visits dropdown (same UX)
- ✅ Can search existing doctors
- ✅ Can add new doctors
- ✅ New doctors immediately searchable
- ✅ Case-insensitive search works
- ✅ Dropdown has clear/reset functionality

**Implementation Fix:**
Added DoctorNameDropdown component to MultipleFollowUpsSection.js (lines 3, 159-166)

**Code Location:** frontend/src/components/dashboard/MultipleFollowUpsSection.js:3,159-166

**Screenshots Required:**
- `UAT-BUG005-001-followup-doctor-dropdown.png`
- `UAT-BUG005-001-doctor-search-working.png`
- `UAT-BUG005-001-add-new-doctor.png`
- `UAT-BUG005-001-new-doctor-searchable.png`

---

### **TC-UAT-BUG006-001: Hospital Name Dropdown in Doctor Visits**
**Priority:** P0 (Critical - UX Enhancement)
**Description:** Verify hospital name dropdown appears and works in Doctor Visits section
**Related Bug:** BUG-006 - Hospital name should have dropdown/suggestion feature

**Preconditions:**
- Medical Incharge logged in
- Database has 2 existing hospitals: "City Hospital", "General Hospital"

**Steps:**
1. Navigate to Medical Check-in form
2. Expand "Doctor Visits" section
3. **Verify Hospital Name field has DROPDOWN (CreatableSelect component)**
4. Click Hospital Name dropdown
5. **Verify dropdown opens showing existing hospitals**
6. **Verify "City Hospital" in list**
7. **Verify "General Hospital" in list**
8. Type "Cit" in search
9. **Verify "City Hospital" appears in filtered results**
10. Select "City Hospital"
11. **Verify "City Hospital" populates in field**
12. Add Doctor Visit 2
13. In Visit 2, type new hospital "Metro Medical Center"
14. **Verify "Add 'Metro Medical Center'" option appears**
15. Click "Add 'Metro Medical Center'"
16. **Verify "Metro Medical Center" populates in field**
17. **Verify hospital added to database**
18. Submit form
19. Create new check-in
20. Add Doctor Visit
21. Search "Metro" in Hospital dropdown
22. **Verify "Metro Medical Center" appears in searchable list**
23. **Verify case-insensitive search works**

**Expected Results:**
- ✅ Hospital name dropdown visible in Doctor Visits
- ✅ Dropdown shows existing hospitals
- ✅ Can search hospitals (case-insensitive)
- ✅ Can add new hospitals
- ✅ New hospitals immediately searchable
- ✅ Same UX as Doctor Name dropdown
- ✅ Clear/reset functionality works

**Implementation Fix:**
- Created HospitalNameDropdown component (frontend/src/components/dashboard/HospitalNameDropdown.js)
- Integrated into MultipleDoctorVisitsSection.js
- Created backend Hospital API (model, data-access, service, controller, routes)

**Backend Files Created:**
- backend/models/hospital.js
- backend/data-access/hospital.js
- backend/services/hospital.js
- backend/controllers/hospitalController.js
- backend/routes/hospitalRoutes.js

**Frontend Integration:**
- frontend/src/components/dashboard/HospitalNameDropdown.js
- frontend/src/components/dashboard/MultipleDoctorVisitsSection.js:3,116-122

**Screenshots Required:**
- `UAT-BUG006-001-hospital-dropdown-visits.png`
- `UAT-BUG006-001-hospital-search-working.png`
- `UAT-BUG006-001-add-new-hospital.png`
- `UAT-BUG006-001-new-hospital-searchable.png`

---

### **TC-UAT-BUG006-002: Hospital Name Dropdown in Follow-ups**
**Priority:** P0 (Critical - UX Consistency)
**Description:** Verify hospital name dropdown appears and works in Follow-ups section
**Related Bug:** BUG-006 - Hospital name should have dropdown in follow-ups too

**Preconditions:**
- Medical Incharge logged in
- Hospital "City Hospital" exists in database (created in previous test)

**Steps:**
1. Navigate to Medical Check-in form
2. Expand "Follow-ups" section
3. Add Follow-up
4. **Verify Hospital/Location field has DROPDOWN (CreatableSelect component)**
5. Click Hospital dropdown
6. **Verify dropdown opens showing existing hospitals**
7. **Verify "City Hospital" in list**
8. **Verify "Metro Medical Center" in list (from previous test)**
9. Type "metro" (lowercase) in search
10. **Verify "Metro Medical Center" appears (case-insensitive)**
11. Select "Metro Medical Center"
12. **Verify hospital populates in field**
13. Add Follow-up 2
14. In Follow-up 2, type new hospital "Children's Hospital"
15. **Verify "Add 'Children's Hospital'" option appears**
16. Click add option
17. **Verify "Children's Hospital" populates**
18. Submit form
19. Create new check-in
20. In Doctor Visits, search "Children's"
21. **Verify "Children's Hospital" appears (cross-accessible)**
22. In Follow-ups, search "Children's"
23. **Verify "Children's Hospital" appears (same data source)**

**Expected Results:**
- ✅ Hospital name dropdown visible in Follow-ups
- ✅ Dropdown shows existing hospitals
- ✅ Can search hospitals (case-insensitive)
- ✅ Can add new hospitals
- ✅ Hospitals shared between Doctor Visits and Follow-ups
- ✅ Same UX as Doctor Visits dropdown
- ✅ Clear/reset functionality works

**Implementation Fix:**
Integrated HospitalNameDropdown into MultipleFollowUpsSection.js

**Code Location:** frontend/src/components/dashboard/MultipleFollowUpsSection.js:4,148-154

**Screenshots Required:**
- `UAT-BUG006-002-hospital-dropdown-followup.png`
- `UAT-BUG006-002-hospital-search-followup.png`
- `UAT-BUG006-002-add-hospital-followup.png`
- `UAT-BUG006-002-hospital-cross-accessible.png`

---

### **TC-UAT-BUG006-003: No Duplicate Hospitals Created**
**Priority:** P1 (High - Data Integrity)
**Description:** Verify system prevents duplicate hospital entries (case-insensitive)
**Related Bug:** BUG-006 - Hospital dropdown implementation

**Preconditions:**
- Medical Incharge logged in
- Hospital "City Hospital" exists in database

**Steps:**
1. Navigate to Doctor Visits section
2. Click Hospital dropdown
3. Type "city hospital" (different case)
4. **Verify dropdown shows existing "City Hospital"**
5. **Verify NO "Add 'city hospital'" option (duplicate detection)**
6. Type "CITY HOSPITAL" (all caps)
7. **Verify dropdown shows existing "City Hospital"**
8. **Verify NO add option (case-insensitive match)**
9. Type "City Hospital 2" (different name)
10. **Verify "Add 'City Hospital 2'" option appears**
11. Add "City Hospital 2"
12. Submit form
13. Check database directly (or via API)
14. **Verify only ONE "City Hospital" entry exists (no duplicates)**
15. **Verify "City Hospital 2" is separate entry**

**Expected Results:**
- ✅ Case-insensitive duplicate detection works
- ✅ Existing hospitals shown instead of creating duplicates
- ✅ Different hospital names allowed
- ✅ Database maintains unique hospitals
- ✅ No duplicate entries created

**Backend Duplicate Check:**
backend/data-access/hospital.js uses case-insensitive regex for duplicate detection:
```javascript
const existingHospital = await Hospital.findOne({
  name: { $regex: new RegExp(`^${name}$`, "i") },
});
```

**Screenshots Required:**
- `UAT-BUG006-003-no-duplicate-option.png`
- `UAT-BUG006-003-case-insensitive-match.png`

---

### **TC-UAT-INTEGRATION-001: Complete Check-in with All Bug Fixes**
**Priority:** P0 (Critical - End-to-End Integration)
**Description:** Verify all bug fixes work together in single check-in workflow
**Related Bugs:** BUG-001 through BUG-006

**Preconditions:**
- Medical Incharge logged in
- Clean database state for test
- Test files available

**Steps:**
1. Create new check-in with basic info
2. **Add 3 Doctor Visits (BUG-003 fix):**
   - Visit 1: Dr. Sharma (from dropdown - BUG-006), City Hospital (from dropdown - BUG-006), prescription.pdf
   - Visit 2: Dr. Patel (from dropdown), General Hospital (from dropdown), xray.jpg
   - Visit 3: New Doctor "Dr. Kumar" (add new - BUG-005), New Hospital "Metro Medical" (add new - BUG-006), lab-results.pdf
3. **Verify all 3 visits visible and independent (BUG-003)**
4. **Add 3 Follow-ups (BUG-004 fix):**
   - Follow-up 1: Date 2025-01-15, Dr. Sharma (dropdown - BUG-005), City Hospital (dropdown - BUG-006), 2 coaches, followup1-notes.pdf (BUG-002)
   - Follow-up 2: Date 2025-01-22, Dr. Patel (dropdown - BUG-005), General Hospital (dropdown - BUG-006), 1 coach, followup2-xray.jpg (BUG-002)
   - Follow-up 3: Date 2025-01-29, New Doctor "Dr. Singh" (add new - BUG-005), Metro Medical (dropdown - BUG-006), 3 coaches, followup3-tests.pdf (BUG-002)
5. **Verify all 3 follow-ups visible and independent (BUG-004)**
6. **Verify all files attached correctly (BUG-002)**
7. Submit form
8. **Verify success message**
9. Close modal
10. Find check-in in list, click "Edit"
11. **Verify all 3 doctor visits display (BUG-003)**
12. **Verify all 3 follow-ups display (BUG-001, BUG-004)**
13. **Verify all files persisted correctly (BUG-002):**
    - Visit 1: prescription.pdf
    - Visit 2: xray.jpg
    - Visit 3: lab-results.pdf
    - Follow-up 1: followup1-notes.pdf
    - Follow-up 2: followup2-xray.jpg
    - Follow-up 3: followup3-tests.pdf
14. **Verify doctor dropdowns work in visits (BUG-005)**
15. **Verify doctor dropdowns work in follow-ups (BUG-005)**
16. **Verify hospital dropdowns work in visits (BUG-006)**
17. **Verify hospital dropdowns work in follow-ups (BUG-006)**
18. Edit Follow-up 2: Change hospital to "Updated Hospital"
19. Edit Visit 2: Change doctor to "Dr. Updated"
20. Submit form
21. Re-open in edit mode
22. **Verify Follow-up 2 changes persisted (BUG-004)**
23. **Verify Visit 2 changes persisted (BUG-003)**
24. **Verify all other data intact (BUG-001, BUG-002)**

**Expected Results:**
- ✅ All 6 bug fixes working correctly
- ✅ Multiple doctor visits save and edit correctly (BUG-003)
- ✅ Multiple follow-ups save and edit correctly (BUG-001, BUG-004)
- ✅ All files persist correctly (BUG-002)
- ✅ Doctor dropdowns work everywhere (BUG-005)
- ✅ Hospital dropdowns work everywhere (BUG-006)
- ✅ No regressions or new issues
- ✅ Complete workflow seamless

**Screenshots Required:**
- `UAT-INTEGRATION-001-complete-form-filled.png`
- `UAT-INTEGRATION-001-edit-mode-all-data-intact.png`
- `UAT-INTEGRATION-001-files-persisted.png`
- `UAT-INTEGRATION-001-dropdowns-working.png`
- `UAT-INTEGRATION-001-updates-persisted.png`

---

## Regression Test Cases

### **REG-S3-001: Existing Check-ins Display Correctly**
**Priority:** P0 (Critical - No Regression)
**Description:** Verify old check-ins (single doctorVisit/followUp) still display correctly after schema changes

**Preconditions:**
- Database has existing check-ins created BEFORE Sprint 6 Story 3 changes
- Check-ins have old schema (single doctorVisit object, single followUp object)

**Steps:**
1. Login as Medical Incharge
2. Navigate to Medical Check-ins list
3. **Verify old check-ins appear in list**
4. Click on old check-in to view details
5. **Verify all data displays correctly:**
   - Temperature (if present)
   - Doctor visit information (single visit)
   - Follow-up information (single follow-up)
   - Attachments
6. **Verify no console errors**
7. **Verify UI doesn't break or show "undefined"**

**Expected Results:**
- ✅ Old check-ins load without errors
- ✅ Data displays correctly
- ✅ No UI breaks or missing data
- ✅ Backward compatibility maintained
- ✅ No console errors

**Screenshots Required:**
- `REG-S3-001-old-checkin-list.png`
- `REG-S3-001-old-checkin-details.png`

---

### **REG-S3-002: Data Migration Successful**
**Priority:** P0 (Critical)
**Description:** Verify migrated check-ins have doctorVisits/followUps as arrays

**Preconditions:**
- Migration script executed successfully
- Database has check-ins migrated from old to new schema

**Steps:**
1. Query database for migrated check-ins
2. **Verify doctorVisits field is array**
3. **Verify followUps field is array**
4. **Verify old doctorVisit data present in doctorVisits[0]**
5. **Verify old followUp data present in followUps[0]**
6. **Verify no data loss during migration**
7. Open migrated check-in in UI
8. **Verify displays correctly with new format**

**Expected Results:**
- ✅ All check-ins migrated successfully
- ✅ Data converted to array format
- ✅ No data loss
- ✅ Check-ins display correctly in UI
- ✅ Can edit migrated check-ins

**Database Verification:**
```javascript
db.medicalCheckIns.find({ doctorVisits: { $exists: true } }).count()
// Should match total check-ins with doctor visits
```

**Screenshots Required:**
- `REG-S3-002-database-migrated-schema.png`
- `REG-S3-002-migrated-checkin-ui.png`

---

### **REG-S3-003: Coach View Unaffected**
**Priority:** P0 (Critical - No Regression)
**Description:** Verify coaches can still view assigned check-ins and follow-up tasks

**Preconditions:**
- Login as Coach
- Coach has assigned follow-ups

**Steps:**
1. Login as Coach (role: coach/music-coach/sports-coach)
2. Navigate to assigned tasks/follow-ups page
3. **Verify follow-ups assigned to coach are visible**
4. Click on follow-up to view details
5. **Verify check-in details load correctly**
6. **Verify coach can mark follow-up as complete (if applicable)**
7. **Verify no console errors**

**Expected Results:**
- ✅ Coaches can view assigned follow-ups
- ✅ Check-in details accessible
- ✅ Follow-up actions work correctly
- ✅ No regression in coach view functionality
- ✅ Multiple follow-ups visible if assigned

**Screenshots Required:**
- `REG-S3-003-coach-view-followups.png`
- `REG-S3-003-coach-checkin-details.png`

---

### **REG-S3-004: Medical History Module Unaffected**
**Priority:** P1 (High - No Regression)
**Description:** Verify medical history page still loads and displays check-ins

**Preconditions:**
- Medical Incharge logged in
- Student has medical check-in history

**Steps:**
1. Navigate to student profile
2. Click on "Medical History" tab
3. **Verify check-ins list loads**
4. **Verify old and new check-ins both display**
5. Click on check-in to view full history
6. **Verify all medical data displays correctly**
7. **Verify timeline/chronological order maintained**

**Expected Results:**
- ✅ Medical history page loads correctly
- ✅ All check-ins visible (old and new format)
- ✅ Data displays accurately
- ✅ No layout issues
- ✅ No console errors

**Screenshots Required:**
- `REG-S3-004-medical-history-page.png`

---

### **REG-S3-005: File Downloads Still Work**
**Priority:** P1 (High - No Regression)
**Description:** Verify prescription files and test results are downloadable from check-ins

**Preconditions:**
- Check-ins with uploaded files exist (old and new format)

**Steps:**
1. Open check-in with uploaded files
2. **Verify general attachments visible**
3. Click on general attachment file
4. **Verify file downloads/opens**
5. **Verify prescription files visible in doctor visit section**
6. Click on prescription file
7. **Verify file downloads/opens**
8. **Verify test result files visible**
9. Click on test result file
10. **Verify file downloads/opens**
11. **Verify follow-up description files visible (new)**
12. **Verify follow-up test result files visible (new)**

**Expected Results:**
- ✅ All file types downloadable
- ✅ General attachments work
- ✅ Doctor visit files work
- ✅ Follow-up files work (new feature)
- ✅ No broken file links
- ✅ Files open in correct format

**Screenshots Required:**
- `REG-S3-005-files-downloadable.png`

---

## Summary of Test Coverage

**Total Test Cases:** 48 (39 Original + 9 UAT Bug Fixes)

**By Acceptance Criteria:**
- AC1 (Temperature Optional): 4 test cases
- AC2 (Doctor Dropdown): 6 test cases
- AC3 (All Coaches): 4 test cases
- AC4 (Form Submission): 5 test cases
- AC5 (Multiple Visits): 7 test cases
- AC6 (Multiple Follow-ups): 7 test cases
- AC7 (Follow-up Files): 6 test cases
- **UAT Bug Fixes: 9 test cases** ⭐ NEW
  - BUG-001 (Second Follow-up Display): 1 test case
  - BUG-002 (File Persistence): 1 test case
  - BUG-003 (Doctor Visits Override): 1 test case
  - BUG-004 (Follow-ups Update): 1 test case
  - BUG-005 (Doctor Dropdown in Follow-up): 1 test case
  - BUG-006 (Hospital Dropdown): 3 test cases (Visits, Follow-ups, Duplicates)
  - Integration Test: 1 test case (All bugs combined)
- Regression Tests: 5 test cases

**Priority Breakdown:**
- P0 (Critical): 29 test cases (21 Original + 8 UAT) - Must pass for deployment
- P1 (High): 16 test cases (15 Original + 1 UAT) - Important for user experience
- P2 (Medium): 3 test cases - Nice-to-have features

**Coverage:**
- ✅ All 4 critical bugs (AC1-AC4)
- ✅ All 3 enhancements (AC5-AC7)
- ✅ **All 6 UAT blocker bugs (BUG-001 through BUG-006)** ⭐ NEW
- ✅ Edge cases (file size limits, validation errors)
- ✅ Regression tests (no existing functionality broken)
- ✅ Data migration verification
- ✅ Backward compatibility testing
- ✅ **End-to-end integration test (all bugs together)** ⭐ NEW

**Test Data Requirements:**
- Minimum 5 students across 2 Balagruhas
- Minimum 5 coaches (various types)
- 2 existing doctor names for search testing
- Test files: images (various sizes), PDFs (various sizes)
- Old format check-ins for regression testing

---

## QA Execution Instructions

### **Testing Method:** Playwright MCP (Programmatic Browser Control)

### **Playwright MCP Tools to Use:**

**Navigation:**
- `mcp__playwright__playwright_navigate(url="http://localhost:3000/login")`
- `mcp__playwright__playwright_go_back()`
- `mcp__playwright__playwright_go_forward()`

**Form Interaction:**
- `mcp__playwright__playwright_fill(selector="#email", value="medicalincharge@gmail.com")`
- `mcp__playwright__playwright_click(selector=".submit-button")`
- `mcp__playwright__playwright_select(selector="#balagruha", value="Vivekananda")`
- `mcp__playwright__playwright_press_key(key="Enter")`

**File Uploads:**
- `mcp__playwright__playwright_upload_file(selector="input[type='file']", filePath="D:/test-files/prescription.jpg")`

**Verification:**
- `mcp__playwright__playwright_screenshot(name="test-evidence", savePng=true)`
- `mcp__playwright__playwright_get_visible_html(selector=".check-in-form")`
- `mcp__playwright__playwright_get_visible_text()`
- `mcp__playwright__playwright_console_logs(type="error")` - Check for errors

**Evidence Required:**
- Screenshot for each test case (saved to .playwright-mcp/ folder)
- Console log verification (no critical errors)
- Database verification (check-ins created correctly)
- File upload verification (files saved to S3/local storage)

### **Pass Criteria:**

**Mandatory (Story Cannot Pass Without These):**
- All P0 test cases must pass (21 test cases) - NO exceptions
- No critical console errors during form submission
- No regression in existing functionality (all 5 REG test cases pass)
- Data migration script verified successful

**High Priority:**
- Max 1 P1 test case failure allowed (with documented workaround)
- All file upload functionality working
- Doctor dropdown working correctly

**Nice-to-Have:**
- P2 test cases passing

### **Database Verification Commands:**

```bash
# Check check-in created
mongo isf_database --eval "db.medicalCheckIns.find({studentId: ObjectId('TEST_STUDENT_ID')}).pretty()"

# Check doctor added to database
mongo isf_database --eval "db.doctors.find({name: 'Dr. Newname'}).pretty()"

# Check data migration - verify doctorVisits array exists
mongo isf_database --eval "db.medicalCheckIns.find({doctorVisits: {$exists: true}}).count()"

# Check multiple doctor visits saved
mongo isf_database --eval "db.medicalCheckIns.find({doctorVisits: {$size: 3}}).count()"

# Check follow-ups array
mongo isf_database --eval "db.medicalCheckIns.find({followUps: {$exists: true}}).count()"

# Check follow-up file uploads
mongo isf_database --eval "db.medicalCheckIns.find({'followUps.descriptionFiles': {$exists: true}}).pretty()"
```

### **File Upload Verification:**

**S3 Bucket (or Local Uploads Folder):**
- Check `medical-checkins/{checkInId}/followUps/{followUpIndex}/description/` for description files
- Check `medical-checkins/{checkInId}/followUps/{followUpIndex}/testResults/` for test result files
- Verify file paths in database match uploaded files
- Verify thumbnails generated for images (if applicable)
- Verify PDFs are downloadable

**Local Storage Path (if not using S3):**
```
uploads/medical-checkins/
```

### **Console Log Monitoring:**

**Critical Errors to Check:**
- `mcp__playwright__playwright_console_logs(type="error")` after each form submit
- No "undefined" errors related to doctorVisits or followUps
- No file upload errors
- No validation bypass errors

**Acceptable Warnings:**
- ESLint warnings (non-blocking)
- Mongoose deprecation warnings (already documented)

### **Test Execution Order:**

1. **Phase 1:** Run AC1-AC4 (Bug Fixes) - Verify all critical bugs fixed
2. **Phase 2:** Run AC5 (Multiple Visits) - Verify multiple doctor visits work
3. **Phase 3:** Run AC6-AC7 (Multiple Follow-ups + Files) - Verify follow-up functionality
4. **Phase 4:** Run Regression Tests - Verify no existing functionality broken
5. **Final:** Database verification and file upload checks

### **Failure Handling:**

**If P0 Test Fails:**
- Document failure with screenshot
- Check console logs for errors
- Report to dev team immediately
- Story cannot proceed to deployment

**If P1 Test Fails:**
- Document failure with screenshot
- Assess severity and workaround
- Report to dev team
- If workaround exists, may proceed with deployment

**If Regression Test Fails:**
- CRITICAL - Story cannot deploy
- Indicates backward compatibility issue
- Requires immediate dev investigation

---

## Test Data Setup

### **Required Test Data:**

**Students:**
```javascript
// Create test students via database or UI
Student 1: Name="Test Student 1", Balagruha="Vivekananda"
Student 2: Name="Test Student 2", Balagruha="Vivekananda"
Student 3: Name="Test Student 3", Balagruha="Ramakrishna"
```

**Coaches:**
```javascript
// Ensure multiple coach types exist
Coach 1: Name="Riz Shaikh", Role="coach", Balagruha="Vivekananda"
Coach 2: Name="Arjun Kumar", Role="coach", Balagruha="Vivekananda"
Coach 3: Name="Priya Mehta", Role="music-coach", Balagruha="Vivekananda"
Coach 4: Name="Ravi Sharma", Role="music-coach", Balagruha="Ramakrishna"
Coach 5: Name="Sunil Patel", Role="sports-coach", Balagruha="Vivekananda"
```

**Doctors:**
```javascript
// Create 2-3 existing doctors for search testing
Doctor 1: Name="Dr. Sharma"
Doctor 2: Name="Dr. Patel"
```

**Test Files (Create in D:/test-files/):**
```
prescription.jpg - 3MB image
lab-results.pdf - 8MB PDF
large-image.jpg - 7MB image (exceeds limit)
large-pdf.pdf - 12MB PDF (exceeds limit)
document.txt - Text file (invalid type)
xray-result.jpg - 4MB image
```

---

## Screenshot Naming Convention

**Format:** `[AC#]-[FEATURE]-[###]-[description].png`

**Examples:**
- `AC1-TEMP-001-form-no-temperature.png`
- `AC2-DOCTOR-002-add-new-doctor-option.png`
- `AC3-COACHES-001-all-coaches-visible.png`
- `AC5-VISITS-004-three-visits-submitted.png`
- `AC7-FILES-001-description-file-uploaded.png`
- `REG-S3-002-migrated-checkin-displays.png`

**Storage Location:** `.playwright-mcp/sprint6-story3/`

---

## Notes for QA Team

1. **Execute tests in order** - Some tests depend on previous test data (e.g., doctor created in AC2-DOCTOR-002 used in AC2-DOCTOR-003)

2. **Clean state between test runs** - Clear browser cache/cookies when starting new test session

3. **Database state** - Some tests require clean database (no existing check-ins), others require existing data (regression tests)

4. **File uploads** - Ensure test files exist before running file upload tests

5. **Console monitoring** - Keep browser console open during all tests to catch JavaScript errors

6. **Time zones** - Be aware of date/time field behavior with timezones

7. **Multiple coach types** - Verify test data has all 3 coach types (coach, music-coach, sports-coach) for AC3 testing

8. **Migration script** - Run migration script on test database before regression testing

---

## Final Checklist Before QA Sign-off

**Original Story 3 (AC1-AC7):**
- [ ] All 21 P0 test cases passed (AC1-AC7)
- [ ] Max 1 P1 test case failed (with workaround documented)
- [ ] All 5 regression test cases passed
- [ ] No critical console errors
- [ ] Data migration verified successful
- [ ] File uploads working for all file types
- [ ] Doctor dropdown functioning correctly (AC2)
- [ ] Multiple visits and follow-ups saving correctly (AC5-AC6)
- [ ] Backward compatibility verified

**UAT Bug Fixes (BUG-001 through BUG-006):** ⭐ NEW
- [ ] All 8 P0 UAT bug fix test cases passed
- [ ] BUG-001: Second follow-up displays in edit mode
- [ ] BUG-002: Files persist correctly on edit/update
- [ ] BUG-003: Doctor visits append (not override)
- [ ] BUG-004: Follow-ups update correctly
- [ ] BUG-005: Doctor dropdown works in Follow-ups
- [ ] BUG-006: Hospital dropdown works in Visits & Follow-ups
- [ ] Integration test passed (all bugs working together)
- [ ] No duplicate hospitals created (case-insensitive check)

**Final Sign-off:**
- [ ] Screenshots captured for all test cases (54 total)
- [ ] Database verification completed
- [ ] QA report written with findings
- [ ] **ALL P0 test cases passed (33 total)** - CRITICAL FOR DEPLOYMENT

---

## View Button Enhancement Test Cases

**Enhancement:** View Button for Medical Check-in Listing
**Requested:** 2025-11-13 (Post-UAT Client Request)
**Priority:** High
**Component:** ViewCheckInModal + Medical Incharge Dashboard

### Test Case: TC-VIEW-001 - View Button Visibility and Placement

**Test ID:** TC-VIEW-001
**Test Name:** View Button Visibility and Placement in Actions Column
**Priority:** P0 (Critical)
**Category:** View Button - UI/UX
**Prerequisites:**
- At least 1 medical check-in exists in the database
- User is on the "Check Ins" tab

**Test Steps:**
1. Navigate to Medical Incharge Dashboard
2. Click on "Check Ins" tab
3. Locate the Actions column in the medical check-ins table
4. Verify the presence and order of action buttons

**Expected Results:**
- ✅ Actions column shows 3 buttons for each check-in row:
  - **1st button:** 👁️ (View button)
  - **2nd button:** 📝 (Edit button)
  - **3rd button:** 🗑️ (Delete button)
- ✅ View button has tooltip "View Details" on hover
- ✅ Edit button has tooltip "Edit Check-in" on hover
- ✅ Delete button has tooltip "Delete Check-in" on hover
- ✅ All buttons are clearly visible and properly aligned
- ✅ Button styling is consistent with existing UI

**Actual Results:**
*[To be filled by QA]*

**Status:** ⏳ Pending
**Executed By:**
**Execution Date:**
**Screenshot:** `view-button-actions-column-[timestamp].png`

---

### Test Case: TC-VIEW-002 - View Modal Opens with Complete Data (Single Doctor Visit)

**Test ID:** TC-VIEW-002
**Test Name:** View Modal Displays Complete Check-in Data (Single Doctor Visit)
**Priority:** P0 (Critical)
**Category:** View Button - Modal Display
**Prerequisites:**
- Medical check-in exists with:
  - Basic info (student, date, temperature, health status)
  - Symptoms selected
  - Notes entered
  - 1 doctor visit with prescription and test result files
  - NO follow-ups
  - General attachments (1 image, 1 PDF)

**Test Steps:**
1. Navigate to "Check Ins" tab
2. Find the test check-in in the listing
3. Click the 👁️ **View** button
4. Review all displayed information in the modal

**Expected Results:**
- ✅ ViewCheckInModal opens successfully
- ✅ Modal title: "Medical Check-in Details"
- ✅ **Basic Information Section** displays:
  - Student Name: Correct
  - Date & Time: Formatted as "12 Nov, 2025 02:30 PM"
  - Temperature: Shows value with °C OR "Not measured"
  - Health Status: Color-coded badge (Normal=green, Important=yellow, Critical=red)
- ✅ **Symptoms Section** displays:
  - All selected symptoms with proper labels
  - Custom symptom (if present)
- ✅ **Notes Section** displays:
  - Full notes text (no truncation)
  - Preserves line breaks
- ✅ **Doctor Visits Section** displays:
  - Header: "Doctor Visits (1)"
  - Visit 1 card with:
    - Doctor Name
    - Hospital Name
    - Visit Date (formatted: "12 Nov, 2025")
    - Test Details
    - Conclusion
    - Prescription Files: Clickable links with 📄 icon
    - Test Result Files: Clickable links with 📋 icon
- ✅ **General Attachments Section** displays:
  - Images: Thumbnail (100x100px), clickable to open full size
  - PDFs: Clickable links with file names
- ✅ Modal is scrollable if content exceeds viewport height
- ✅ Modal width: 900px, max-height: 90vh

**Actual Results:**
*[To be filled by QA]*

**Status:** ⏳ Pending
**Executed By:**
**Execution Date:**
**Screenshot:** `view-modal-single-doctor-visit-[timestamp].png`

---

### Test Case: TC-VIEW-003 - View Modal with Multiple Doctor Visits

**Test ID:** TC-VIEW-003
**Test Name:** View Modal Displays Multiple Doctor Visits Correctly
**Priority:** P0 (Critical)
**Category:** View Button - Multiple Doctor Visits
**Prerequisites:**
- Medical check-in exists with:
  - 3 doctor visits (each with different doctor names, hospitals, dates)
  - Each visit has prescription and test result files
  - NO follow-ups

**Test Steps:**
1. Navigate to "Check Ins" tab
2. Find the check-in with 3 doctor visits
3. Click the 👁️ **View** button
4. Scroll to the "Doctor Visits" section
5. Verify all 3 visits are displayed

**Expected Results:**
- ✅ ViewCheckInModal opens successfully
- ✅ **Doctor Visits Section** shows:
  - Header: "Doctor Visits (3)"
  - **Visit 1** card with complete details
  - **Visit 2** card with complete details
  - **Visit 3** card with complete details
- ✅ Each visit card displays:
  - Visit number (Visit 1, Visit 2, Visit 3)
  - Doctor Name (different for each)
  - Hospital Name (different for each)
  - Visit Date (formatted correctly)
  - Test Details
  - Conclusion
  - Prescription Files (clickable)
  - Test Result Files (clickable)
- ✅ Visits are displayed in sequential order (1, 2, 3)
- ✅ All file attachments are clickable and open in new tab
- ✅ No truncation of any information

**Actual Results:**
*[To be filled by QA]*

**Status:** ⏳ Pending
**Executed By:**
**Execution Date:**
**Screenshot:** `view-modal-multiple-doctor-visits-[timestamp].png`

---

### Test Case: TC-VIEW-004 - View Modal with Multiple Follow-ups

**Test ID:** TC-VIEW-004
**Test Name:** View Modal Displays Multiple Follow-ups Correctly
**Priority:** P0 (Critical)
**Category:** View Button - Multiple Follow-ups
**Prerequisites:**
- Medical check-in exists with:
  - NO doctor visits
  - 3 follow-ups (each with different dates, doctors, hospitals)
  - Each follow-up has status (Completed, Scheduled, Pending)
  - Each follow-up has assigned coaches
  - Each follow-up has description and test result files

**Test Steps:**
1. Navigate to "Check Ins" tab
2. Find the check-in with 3 follow-ups
3. Click the 👁️ **View** button
4. Scroll to the "Follow-ups" section
5. Verify all 3 follow-ups are displayed

**Expected Results:**
- ✅ ViewCheckInModal opens successfully
- ✅ **Follow-ups Section** shows:
  - Header: "Follow-ups (3)"
  - **Follow-up 1** card with complete details
  - **Follow-up 2** card with complete details
  - **Follow-up 3** card with complete details
- ✅ Each follow-up card displays:
  - Follow-up number (Follow-up 1, Follow-up 2, Follow-up 3)
  - Follow-up Date (formatted: "12 Nov, 2025")
  - Hospital/Location
  - Doctor Name
  - Status badge (color-coded: Completed=green, Scheduled=blue, Pending=yellow)
  - Assigned Coaches (comma-separated names)
  - Notes (full text, preserves line breaks)
  - Description Files (clickable links with 📎 icon)
  - Test Result Files (clickable links with 📋 icon)
- ✅ Follow-ups are displayed in sequential order (1, 2, 3)
- ✅ All file attachments are clickable and open in new tab
- ✅ No truncation of any information

**Actual Results:**
*[To be filled by QA]*

**Status:** ⏳ Pending
**Executed By:**
**Execution Date:**
**Screenshot:** `view-modal-multiple-followups-[timestamp].png`

---

### Test Case: TC-VIEW-005 - View Modal with Both Doctor Visits and Follow-ups

**Test ID:** TC-VIEW-005
**Test Name:** View Modal Displays Complex Check-in (Multiple Visits + Follow-ups)
**Priority:** P0 (Critical)
**Category:** View Button - Complete Integration
**Prerequisites:**
- Medical check-in exists with:
  - Basic info complete
  - Symptoms selected
  - Notes entered
  - 2 doctor visits (each with files)
  - 2 follow-ups (each with files and assigned coaches)
  - General attachments (2 images, 1 PDF)

**Test Steps:**
1. Navigate to "Check Ins" tab
2. Find the complex check-in
3. Click the 👁️ **View** button
4. Scroll through all sections
5. Verify all data is displayed correctly

**Expected Results:**
- ✅ ViewCheckInModal opens successfully
- ✅ All sections are visible and properly formatted:
  - **Basic Information** ✅
  - **Symptoms** ✅
  - **Notes** ✅
  - **Doctor Visits (2)** ✅
  - **Follow-ups (2)** ✅
  - **General Attachments** ✅
- ✅ Modal is scrollable
- ✅ No UI overlap or layout issues
- ✅ All file attachments are clickable
- ✅ Color-coded badges display correctly
- ✅ Date formatting is consistent throughout

**Actual Results:**
*[To be filled by QA]*

**Status:** ⏳ Pending
**Executed By:**
**Execution Date:**
**Screenshot:** `view-modal-complex-checkin-[timestamp].png`

---

### Test Case: TC-VIEW-006 - Edit Button Transition from View to Edit Mode

**Test ID:** TC-VIEW-006
**Test Name:** Edit Button in View Modal Opens Edit Modal Correctly
**Priority:** P0 (Critical)
**Category:** View Button - Edit Transition
**Prerequisites:**
- Medical check-in exists with complete data
- User has permission to edit check-ins

**Test Steps:**
1. Navigate to "Check Ins" tab
2. Click the 👁️ **View** button on a check-in
3. Review the data in ViewCheckInModal
4. Locate the **"📝 Edit Check-in"** button in the modal footer (left side)
5. Click the **"📝 Edit Check-in"** button
6. Verify the edit modal opens

**Expected Results:**
- ✅ ViewCheckInModal displays correctly with all data
- ✅ **"📝 Edit Check-in"** button is visible in modal footer (left side)
- ✅ Button styling: Blue background (#4f46e5), white text
- ✅ Clicking **"📝 Edit Check-in"** button:
  - Closes ViewCheckInModal
  - Opens CheckInModal (edit mode)
  - Pre-fills all fields with check-in data:
    - Balagruha selected
    - Student selected
    - Temperature filled
    - Date and Time filled
    - Health Status selected
    - Symptoms selected
    - Notes filled
    - Doctor visits populated (all visits)
    - Follow-ups populated (all follow-ups)
    - Existing attachments shown
- ✅ User can now edit any field
- ✅ All existing data is preserved and editable

**Actual Results:**
*[To be filled by QA]*

**Status:** ⏳ Pending
**Executed By:**
**Execution Date:**
**Screenshot:** `view-to-edit-transition-[timestamp].png`

---

### Test Case: TC-VIEW-007 - Close Button Dismisses View Modal

**Test ID:** TC-VIEW-007
**Test Name:** Close Button Dismisses View Modal and Returns to Listing
**Priority:** P1 (Important)
**Category:** View Button - Modal Dismissal
**Prerequisites:**
- Medical check-in exists
- ViewCheckInModal is open

**Test Steps:**
1. Open ViewCheckInModal by clicking 👁️ **View** button
2. Locate the **"Close"** button in modal footer (right side)
3. Click the **"Close"** button
4. Verify modal closes

**Expected Results:**
- ✅ **"Close"** button is visible in modal footer (right side)
- ✅ Button styling: Secondary style (gray/white)
- ✅ Clicking **"Close"** button:
  - Closes ViewCheckInModal
  - Returns to medical check-ins listing page
  - No changes made to check-in data
  - Listing table remains visible with same filters applied

**Actual Results:**
*[To be filled by QA]*

**Status:** ⏳ Pending
**Executed By:**
**Execution Date:**
**Screenshot:** `view-modal-close-button-[timestamp].png`

---

### Test Case: TC-VIEW-008 - View Modal Handles Empty Optional Fields

**Test ID:** TC-VIEW-008
**Test Name:** View Modal Displays Correctly with Minimal Data
**Priority:** P1 (Important)
**Category:** View Button - Edge Cases
**Prerequisites:**
- Medical check-in exists with:
  - Basic info (student, date, health status=Normal)
  - NO temperature entered
  - NO symptoms selected
  - NO notes entered
  - NO doctor visits
  - NO follow-ups
  - NO attachments

**Test Steps:**
1. Navigate to "Check Ins" tab
2. Find the minimal check-in
3. Click the 👁️ **View** button
4. Review displayed information

**Expected Results:**
- ✅ ViewCheckInModal opens successfully
- ✅ **Basic Information Section** displays:
  - Student Name: ✅
  - Date & Time: ✅
  - Temperature: Shows **"Not measured"**
  - Health Status: Shows **"NORMAL"** badge (green)
- ✅ **Symptoms Section** displays:
  - Shows **"None"**
- ✅ **Notes Section** NOT displayed (hidden if no notes)
- ✅ **Doctor Visits Section** NOT displayed (hidden if no visits)
- ✅ **Follow-ups Section** NOT displayed (hidden if no follow-ups)
- ✅ **General Attachments Section** NOT displayed (hidden if no attachments)
- ✅ No "undefined" or "null" text displayed anywhere
- ✅ No UI layout issues with empty sections

**Actual Results:**
*[To be filled by QA]*

**Status:** ⏳ Pending
**Executed By:**
**Execution Date:**
**Screenshot:** `view-modal-minimal-data-[timestamp].png`

---

### Test Case: TC-VIEW-009 - View Modal File Attachments Are Clickable

**Test ID:** TC-VIEW-009
**Test Name:** All File Attachments in View Modal Open Correctly
**Priority:** P0 (Critical)
**Category:** View Button - File Attachments
**Prerequisites:**
- Medical check-in exists with:
  - Doctor visit with 1 prescription file and 1 test result file
  - Follow-up with 1 description file and 1 test result file
  - General attachments: 1 image, 1 PDF

**Test Steps:**
1. Navigate to "Check Ins" tab
2. Click the 👁️ **View** button
3. Locate **Doctor Visits** section
4. Click on prescription file link
5. Click on test result file link (doctor visit)
6. Locate **Follow-ups** section
7. Click on description file link
8. Click on test result file link (follow-up)
9. Locate **General Attachments** section
10. Click on image thumbnail
11. Click on PDF document link

**Expected Results:**
- ✅ All file links are displayed with appropriate icons:
  - Prescription: 📄 icon, blue background
  - Test Results: 📋 icon, yellow background
  - Description Files: 📎 icon, blue background
  - General PDFs: 📄 icon, blue background
- ✅ All file links are clickable (cursor changes to pointer on hover)
- ✅ Clicking any file link:
  - Opens file in **new browser tab** (`target="_blank"`)
  - Does NOT close the ViewCheckInModal
  - File displays correctly (image/PDF viewer)
- ✅ Image thumbnails are clickable and open full-size image in new tab
- ✅ All file URLs are valid and accessible

**Actual Results:**
*[To be filled by QA]*

**Status:** ⏳ Pending
**Executed By:**
**Execution Date:**
**Screenshot:** `view-modal-file-attachments-[timestamp].png`

---

### Test Case: TC-VIEW-010 - View Modal Closes When Clicking Outside (Overlay)

**Test ID:** TC-VIEW-010
**Test Name:** Clicking Modal Overlay Closes View Modal
**Priority:** P2 (Nice to Have)
**Category:** View Button - UX
**Prerequisites:**
- ViewCheckInModal is open

**Test Steps:**
1. Open ViewCheckInModal by clicking 👁️ **View** button
2. Click on the dark overlay area (outside the modal content)
3. Verify modal closes

**Expected Results:**
- ✅ Clicking on the dark overlay (background) closes the modal
- ✅ Returns to medical check-ins listing
- ✅ No data changes made

**Actual Results:**
*[To be filled by QA]*

**Status:** ⏳ Pending
**Executed By:**
**Execution Date:**
**Screenshot:** `view-modal-overlay-click-[timestamp].png`

---

### Test Case: TC-VIEW-011 - View Button Integration with Listing Filters

**Test ID:** TC-VIEW-011
**Test Name:** View Button Works After Applying Filters and Date Ranges
**Priority:** P1 (Important)
**Category:** View Button - Integration
**Prerequisites:**
- Multiple check-ins exist across different:
  - Dates
  - Health statuses (Normal, Important, Critical)
  - Balagruhas

**Test Steps:**
1. Navigate to "Check Ins" tab
2. Apply date range filter (e.g., "This Week")
3. Apply health status filter (e.g., "Important")
4. Apply Balagruha filter (e.g., select specific Balagruha)
5. Apply search filter (e.g., search for student name)
6. Verify filtered results display
7. Click 👁️ **View** button on one of the filtered results
8. Verify ViewCheckInModal opens with correct data

**Expected Results:**
- ✅ All filters work correctly (date, status, Balagruha, search)
- ✅ Table shows filtered results only
- ✅ 👁️ **View** button is present for all filtered results
- ✅ Clicking 👁️ **View** opens modal with **correct** check-in data
- ✅ Modal displays data matching the selected row
- ✅ After closing modal, filters remain applied
- ✅ User returns to the same filtered view

**Actual Results:**
*[To be filled by QA]*

**Status:** ⏳ Pending
**Executed By:**
**Execution Date:**
**Screenshot:** `view-button-with-filters-[timestamp].png`

---

## View Button Test Summary

**Total View Button Test Cases:** 11
**Priority Breakdown:**
- P0 (Critical): 6 test cases
- P1 (Important): 4 test cases
- P2 (Nice to Have): 1 test case

**Feature Coverage:**
- ✅ View button UI/UX (visibility, placement, tooltips)
- ✅ Modal display with complete data (single doctor visit)
- ✅ Modal display with multiple doctor visits
- ✅ Modal display with multiple follow-ups
- ✅ Modal display with both visits and follow-ups (complex case)
- ✅ Edit button transition (view → edit)
- ✅ Close button functionality
- ✅ Empty/minimal data handling
- ✅ File attachment clickability
- ✅ Modal overlay dismissal
- ✅ Integration with existing filters

**Pass Criteria:**
- All 6 P0 test cases must pass
- No UI/UX layout issues
- All file attachments must be accessible
- Edit transition must work seamlessly
- Backward compatibility with OLD format check-ins

---

## Complete Test Execution Checklist (Updated)

- [ ] All 54 test cases executed
- [ ] Screenshots captured for all test cases (54 total)
- [ ] Database verification completed
- [ ] QA report written with findings
- [ ] **ALL P0 test cases passed (33 total)** - CRITICAL FOR DEPLOYMENT

---

**End of E2E Test Scenarios Document**

**Created:** 2025-11-12 00:22:46
**Updated:** 2025-11-13 16:36:01 (Added View Button Enhancement Test Cases)
**Total Test Cases:** 54 (39 Original + 9 UAT Bug Fixes + 6 View Button Enhancement)
**Status:** Ready for QA Execution
**Coverage:** AC1-AC7, BUG-001 through BUG-006, View Button Enhancement
