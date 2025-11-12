# CRITICAL BUG: Doctor Visit Data Not Saved to Database - Sprint 6 Story 3 AC2

**Bug ID:** S6-S3-AC2-CRITICAL-001
**Reported By:** Quinn (QA Agent)
**Date:** 2025-11-12 13:17:26
**Priority:** P0 (Critical - Blocks AC2 Testing)
**Status:** ❌ IDENTIFIED - Awaiting Dev Fix

---

## Executive Summary

Doctor visit data is **NOT being saved to database** when creating medical check-ins. Form accepts input and appears to submit successfully, but doctor visit information is completely lost. Backend returns **500 Internal Server Error** during submission.

---

## Impact

- **Severity:** P0 (Critical - Major Feature Failure)
- **User Impact:** Medical Incharge CANNOT save doctor visit information
- **Testing Impact:** Blocks AC2 test cases TC-003 through TC-006 (4 test cases blocked)
- **Acceptance Criteria Blocked:** AC2 (Doctor Searchable Dropdown), AC5 (Multiple Doctor Visits)

---

## Test Evidence

### TC-AC2-DOCTOR-003: New Doctor Available Across Visits

**Test Scenario:**
1. Create check-in with doctor visit:
   - Doctor Name: Dr. Rajesh Kumar (selected from dropdown)
   - Hospital Name: City General Hospital
   - Visit Date: 2025-11-12
   - Test Details: Blood test and X-ray completed
   - Doctor's Conclusion: Patient is recovering well, continue medication

**Expected:**
- ✅ Form submits successfully
- ✅ Check-in created with doctor visit data
- ✅ Doctor visit visible in check-in list
- ✅ Doctor visit data persists when editing check-in

**Actual:**
- ❌ Form submits with 500 Internal Server Error
- ❌ Check-in created WITHOUT doctor visit data
- ❌ Check-in list shows "-" in Dr Visits column
- ❌ Edit check-in shows "Doctor Visits (0)"

**Evidence:**
- Created check-in: Row 1 - "vishnu, 12 Nov 2025, 01:13 pm, Fever, Dr Visits: -"
- Console errors: "Error creating medical check-in: AxiosError"
- Backend error: "500 Internal Server Error"

---

## Console Errors

```
[error] Error submitting check-in: AxiosError
[error] Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[error] Error creating medical check-in: AxiosError
```

---

## Root Cause Analysis

### Symptom: Doctor Visit Data Lost

**Frontend Submission:**
- Form collects all doctor visit fields correctly
- React Select component properly populates doctor name
- All fields (hospital, date, test details, conclusion) filled
- Form data appears valid before submission

**Backend Processing:**
- **500 Internal Server Error** during check-in creation
- Check-in record created but WITHOUT doctor visit embedded data
- Doctor visit sub-document not being saved to medical_check_ins collection

**Possible Causes:**

1. **Backend Validation Error:** Doctor visit schema validation failing
2. **Data Transformation Error:** Frontend sends data in format backend doesn't expect
3. **Missing Required Field:** Doctor visit has undocumented required field
4. **Array Handling:** Doctor visits array not properly processed by backend

---

## Files Involved

### Frontend Files:
- `frontend/src/components/dashboard/medicalIncharge.js` - Form submission logic
- `frontend/src/components/dashboard/CheckInModal.js` - Doctor visit UI component

### Backend Files:
- `backend/controllers/medicalCheckInsController.js` - Create check-in endpoint
- `backend/services/medicalCheckIns.js` - Check-in data transformation
- `backend/models/medicalCheckIns.js` - Doctor visit schema definition

---

## Reproduction Steps

1. Login as Medical Incharge (medin@gmail.com)
2. Navigate to Health Check-ins tab
3. Click "Record New Check-in" button
4. Fill basic form:
   - Balagruha: Yeshaswani Mahila Mandaligala Okkutte
   - Student: vishnu
   - Symptoms: Fever
   - Health Status: Normal
5. Expand "Doctor Visits" section
6. Click "➕ Add Another Doctor Visit"
7. Fill doctor visit fields:
   - Doctor Name: Dr. Rajesh Kumar (select from dropdown)
   - Hospital Name: City General Hospital
   - Visit Date: 2025-11-12
   - Test Details: Blood test and X-ray completed
   - Doctor's Conclusion: Patient is recovering well
8. Click Submit
9. **Result:** Check-in created but doctor visit data lost (shows "Doctor Visits: -")

---

## Required Investigation

### Backend Logs Analysis Needed:

1. **Check backend console logs** for detailed 500 error stack trace
2. **Verify doctor visit schema** in medical_check_ins model
3. **Check data transformation** in medicalCheckIns service
4. **Verify controller logic** for processing doctor visit array

### Database Inspection:

```javascript
// Check if doctor visit data exists in database
db.medical_check_ins.findOne({
  studentId: ObjectId("680de27f2fcea3062d68ad76"),
  date: ISODate("2025-11-12")
}).pretty()

// Expected structure:
{
  _id: ObjectId("..."),
  studentId: ObjectId("680de27f2fcea3062d68ad76"),
  balagruhaId: ObjectId("6809e03c80aacbb08e74cebe"),
  symptoms: ["fever"],
  healthStatus: "normal",
  date: ISODate("2025-11-12T10:50:00.000Z"),
  doctorVisits: [  // THIS SHOULD EXIST BUT DOESN'T
    {
      doctorName: "Dr. Rajesh Kumar",
      hospitalName: "City General Hospital",
      visitDate: ISODate("2025-11-12"),
      testDetails: "Blood test and X-ray completed",
      conclusion: "Patient is recovering well, continue medication"
    }
  ]
}
```

---

## Test Results Summary

### AC2: Doctor Searchable Dropdown (6 test cases)

| Test Case ID | Description | Status | Notes |
|--------------|-------------|--------|-------|
| TC-AC2-DOCTOR-001 | Search existing doctor | ✅ PASS | Dr. Rajesh Kumar found in dropdown |
| TC-AC2-DOCTOR-002 | Add new doctor to database | ✅ PASS | Doctor added successfully |
| TC-AC2-DOCTOR-003 | New doctor available across visits | ❌ BLOCKED | Cannot verify - doctor visits not saving |
| TC-AC2-DOCTOR-004 | Clear doctor selection | ❌ BLOCKED | Prerequisite test blocked |
| TC-AC2-DOCTOR-005 | Case-insensitive search | ❌ BLOCKED | Prerequisite test blocked |
| TC-AC2-DOCTOR-006 | No duplicate doctors | ❌ BLOCKED | Prerequisite test blocked |

**Pass Rate:** 33% (2/6 passed, 4 blocked)

---

## Successful Test Cases

### ✅ TC-AC2-DOCTOR-001: Search Existing Doctor - PASS

**Evidence:** Screenshot `AC2-TC002-new-doctor-typed.png` shows dropdown displaying "Dr. Rajesh Kumar" as existing option when typing "Dr. Rajesh"

**Result:** Search functionality works correctly

---

### ✅ TC-AC2-DOCTOR-002: Add New Doctor to Database - PASS

**Evidence:**
- First submission: Typed "Dr. Rajesh Kumar", dropdown showed "Add 'Dr. Rajesh Kumar'"
- Second submission: Typed "Dr. Rajesh", dropdown showed "Dr. Rajesh Kumar" as existing option

**Result:** Auto-add functionality works correctly - new doctors are persisted to database

---

## Blocked Test Cases

### ❌ TC-AC2-DOCTOR-003: New Doctor Available Across Visits - BLOCKED

**Blocker:** Doctor visit data not saved to database

**Cannot Test:**
- Doctor availability in second visit
- Doctor name persistence across check-ins
- Doctor dropdown population from database

---

### ❌ TC-AC2-DOCTOR-004: Clear Doctor Selection - BLOCKED

**Blocker:** Need working doctor visit save functionality first

---

### ❌ TC-AC2-DOCTOR-005: Case-Insensitive Search - BLOCKED

**Blocker:** Need working doctor visit save functionality first

---

### ❌ TC-AC2-DOCTOR-006: No Duplicate Doctors - BLOCKED

**Blocker:** Need working doctor visit save functionality first

---

## Downstream Impact

### AC5: Multiple Doctor Visits (7 test cases) - **COMPLETELY BLOCKED**

Cannot test:
- Adding multiple doctor visits to single check-in
- Removing doctor visits
- Editing doctor visits
- Doctor visit display in list view

### AC7: Follow-up File Uploads (6 test cases) - **PARTIALLY BLOCKED**

Doctor visit file uploads (prescription, test results) cannot be tested until doctor visits work.

---

## Recommended Next Steps

### Immediate (P0):

1. **Check backend logs** for detailed 500 error message
2. **Verify doctor visit schema** matches frontend data structure
3. **Check FormData handling** in backend controller
4. **Test doctor visit save** with Postman/curl to isolate frontend vs backend issue

### Follow-up (P1):

5. **Add backend validation logging** to show exactly what data is received
6. **Improve error handling** - display specific backend error to user
7. **Add unit tests** for doctor visit save functionality

---

## Files Requiring Investigation

### Backend (Priority):
1. `backend/controllers/medicalCheckInsController.js` - Lines 6-122 (create endpoint)
2. `backend/services/medicalCheckIns.js` - Doctor visit data transformation
3. `backend/models/medicalCheckIns.js` - Doctor visit schema definition

### Frontend (Secondary):
1. `frontend/src/components/dashboard/medicalIncharge.js` - Lines 209-340 (submission logic)
2. `frontend/src/components/dashboard/CheckInModal.js` - Doctor visit form component

---

## QA Status

**AC2 Testing Status:** 33% Complete (2/6 passed, 4 blocked)
**Blocking Issues:** 1 critical bug (doctor visits not saving)
**Quality Gate:** ❌ FAIL (Critical functionality broken)

---

## Screenshots

- `AC2-TC002-doctor-selected.png` - Doctor name selected in dropdown
- `AC2-TC002-ready-to-submit.png` - Form filled with all doctor visit fields
- `AC2-TC002-after-submit.png` - Check-in created but doctor visit missing
- `AC2-TC002-edit-modal-opened.png` - Edit modal shows "Doctor Visits (0)"

---

**Last Updated:** 2025-11-12 13:17:26
**Updated By:** Quinn (QA Agent)
**Next Action:** Hand off to Dev for backend investigation and fix
