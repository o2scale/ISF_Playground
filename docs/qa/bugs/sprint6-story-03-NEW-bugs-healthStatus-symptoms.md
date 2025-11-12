# NEW CRITICAL BUGS: Health Status & Symptoms Validation - Sprint 6 Story 3

**Bug IDs:** S6-S3-NEW-BUG-001, S6-S3-NEW-BUG-002
**Reported By:** Quinn (QA Agent)
**Date:** 2025-11-12 10:32:30
**Priority:** P0 (Critical - Blocks ALL Testing)
**Status:** IDENTIFIED - Awaiting Dev Fix

---

## Executive Summary

**Temperature Bug Fix:** ✅ **VERIFIED** - The original AC4 temperature bug (S6-S3-AC4-CRITICAL-001) has been fixed. Empty temperature now correctly converts to `null`.

**NEW Issues Discovered:** ❌ During re-test verification, **TWO NEW critical bugs** were found that prevent form submission:

1. **Health Status Case Mismatch**: Frontend sends `"Normal"` but database expects `"normal"` (lowercase)
2. **Symptoms Double-Stringification**: Frontend sends `"[\"fever\"]"` (stringified) instead of `"fever"`

**Impact:** Form submission still fails with 500 Internal Server Error. All 39 test cases remain blocked.

---

## Bug #1: Health Status Case Mismatch

### Priority: P0 (Critical)

### Problem
Frontend sends health status with capital first letter (`"Normal"`, `"Important"`, `"Critical"`) but database schema requires lowercase (`"normal"`, `"important"`, `"critical"`).

### Error Message (from backend logs)
```
healthStatus: `Normal` is not a valid enum value for path `healthStatus`.
Valid enum values: ["normal","important","critical"]
```

### Root Cause

**Database Schema** (`backend/models/medicalCheckIns.js:13-17`)
```javascript
healthStatus: {
  type: String,
  enum: ["normal", "important", "critical"], // All lowercase
  default: "normal",
},
```

**Frontend Submission** (`frontend/src/components/dashboard/medicalIncharge.js:295`)
```javascript
formDataToSend.append("healthStatus", formData.healthStatus);
// Sends: "Normal", "Important", or "Critical" (capital first letter)
```

**Frontend Dropdown** (`frontend/src/components/dashboard/CheckInModal.js` - likely around line 200-250)
```javascript
// Health Status dropdown likely has:
<option value="Normal">Normal</option>  // WRONG - should be "normal"
<option value="Important">Important</option>  // WRONG - should be "important"
<option value="Critical">Critical</option>  // WRONG - should be "critical"
```

### Required Fix

**Option 1: Fix Frontend Dropdown Values (RECOMMENDED)**
```javascript
// CheckInModal.js - Health Status dropdown
<select name="healthStatus">
  <option value="normal">Normal</option>
  <option value="important">Important</option>
  <option value="critical">Critical</option>
</select>
```

**Option 2: Transform on Submit (Alternative)**
```javascript
// medicalIncharge.js:295
formDataToSend.append("healthStatus", formData.healthStatus.toLowerCase());
```

---

## Bug #2: Symptoms Double-Stringification

### Priority: P0 (Critical)

### Problem
Frontend is JSON.stringifying the symptoms array, which creates a string `"[\"fever\"]"` instead of sending the actual array value `"fever"`.

### Error Message (from backend logs)
```
symptoms.0: `["fever"]` is not a valid enum value for path `symptoms.0`.
Valid enum values: ["cough_cold","fever","stomach_ache","headache","injury","other",""]
```

### Root Cause

**Frontend Submission** (`frontend/src/components/dashboard/medicalIncharge.js:299`)
```javascript
// WRONG: Double-stringifies the array
formDataToSend.append("symptoms", JSON.stringify(formData.symptoms));
// formData.symptoms = ["fever"]
// JSON.stringify(["fever"]) = "[\"fever\"]" (string)
// Backend tries to use "[\"fever\"]" as enum value → FAILS
```

**Expected Behavior:**
- FormData should send symptoms as array elements, not stringified
- Backend expects: `symptoms: ["fever"]` (array of strings)
- Frontend sends: `symptoms: "[\"fever\"]"` (single stringified string)

### Required Fix

**Option 1: Send Array Elements Individually (RECOMMENDED)**
```javascript
// medicalIncharge.js:299-303
// REMOVE: formDataToSend.append("symptoms", JSON.stringify(formData.symptoms));

// ADD: Send each symptom individually
if (formData.symptoms && Array.isArray(formData.symptoms)) {
  formData.symptoms.forEach(symptom => {
    formDataToSend.append("symptoms[]", symptom);
  });
}
```

**Option 2: Backend Parse JSON String (Not Recommended)**
```javascript
// backend/controllers/medicalCheckInsController.js:23
// Parse symptoms if it's a JSON string
let symptoms = req.body.symptoms;
if (typeof symptoms === 'string') {
  try {
    symptoms = JSON.parse(symptoms);
  } catch (e) {
    symptoms = [];
  }
}
```

---

## Test Evidence

### TC-AC1-TEMP-001 RETEST Results

**Test:** Submit form WITHOUT temperature (verify temperature bug fix)

**Expected:**
- ✅ Temperature fix works (empty temperature → null)
- ✅ Form submits successfully
- ✅ Check-in created in database

**Actual:**
- ✅ Temperature fix WORKS (no temperature validation error)
- ❌ Form submission FAILS with 500 Internal Server Error
- ❌ NEW validation errors:
  - Health Status: `"Normal"` rejected (expects `"normal"`)
  - Symptoms: `"[\"fever\"]"` rejected (expects `"fever"`)

**Backend Error Log:**
```json
{
  "level": 50,
  "time": "2025-11-12T05:01:02.657Z",
  "data": {
    "error": {
      "errors": {
        "healthStatus": {
          "message": "`Normal` is not a valid enum value for path `healthStatus`.",
          "enumValues": ["normal","important","critical"],
          "value": "Normal"
        },
        "symptoms.0": {
          "message": "`[\"fever\"]` is not a valid enum value for path `symptoms.0`.",
          "enumValues": ["cough_cold","fever","stomach_ache","headache","injury","other",""],
          "value": "[\"fever\"]"
        }
      },
      "message": "medical_check_ins validation failed"
    }
  }
}
```

**Screenshots:**
- `S3-RETEST-05-form-filled-NO-temp.png` - Form filled with temperature blank
- `S3-RETEST-06-after-submit-NO-temp.png` - After submit, no check-in created

---

## Impact Assessment

### Original Temperature Bug Status
- **Bug ID:** S6-S3-AC4-CRITICAL-001
- **Status:** ✅ **FIXED AND VERIFIED**
- **Fix Applied:** `backend/services/medicalCheckIns.js:27`
- **Verification:** Empty temperature no longer causes 400 Bad Request

### NEW Bugs Impact
- **Severity:** P0 (Critical - Complete System Failure)
- **User Impact:** Medical Incharge STILL CANNOT create any check-ins
- **Testing Impact:** ALL 39 test cases remain BLOCKED
- **Progress:** 0% (no forward movement from original bug)

---

## Recommended Fix Priority

### Immediate (P0):
1. **Fix Bug #1:** Change health status dropdown values to lowercase
2. **Fix Bug #2:** Remove JSON.stringify from symptoms submission
3. **Test locally:** Create check-in with lowercase values
4. **Restart servers:** Ensure changes are deployed

### Follow-up (P1):
5. **Review all enum fields:** Check for other case sensitivity issues
6. **Add validation:** Frontend should validate data before submission
7. **Improve error UX:** Display specific validation errors to user

---

## Files Requiring Changes

### Frontend Changes Required:

1. **File:** `frontend/src/components/dashboard/CheckInModal.js`
   **Line:** ~200-250 (Health Status dropdown)
   **Change:** Update dropdown option values to lowercase
   ```javascript
   // BEFORE:
   <option value="Normal">Normal</option>

   // AFTER:
   <option value="normal">Normal</option>
   ```

2. **File:** `frontend/src/components/dashboard/medicalIncharge.js`
   **Line:** 299
   **Change:** Remove JSON.stringify for symptoms
   ```javascript
   // BEFORE:
   formDataToSend.append("symptoms", JSON.stringify(formData.symptoms));

   // AFTER:
   if (formData.symptoms && Array.isArray(formData.symptoms)) {
     formData.symptoms.forEach(symptom => {
       formDataToSend.append("symptoms[]", symptom);
     });
   }
   ```

---

## Testing Requirements After Fix

### Must Pass:
1. ✅ TC-AC1-TEMP-001: Submit WITHOUT temperature
2. ✅ TC-AC1-TEMP-002: Submit WITH temperature
3. ✅ Verify check-in created with correct healthStatus (lowercase in DB)
4. ✅ Verify symptoms stored as array in DB
5. ✅ Verify success toast appears
6. ✅ Verify check-in appears in list

### Then Proceed With:
7. ✅ Remaining 37 test cases (AC1-AC7)
8. ✅ Full regression testing

---

## Developer Notes

### Why These Bugs Weren't Caught Earlier

1. **Temperature bug masked other issues:** The 400 Bad Request from temperature validation failed BEFORE reaching healthStatus/symptoms validation
2. **Validation order:** Temperature validation happened first, preventing discovery of downstream validation errors
3. **Cascading bugs:** Fixing one bug revealed two more bugs that were always there but hidden

### Prevention for Future

1. **Schema validation in frontend:** Validate dropdown values match backend enum exactly
2. **Type checking:** Use TypeScript to catch case mismatches at compile time
3. **Integration tests:** Add tests that verify frontend-to-backend data flow
4. **Enum constants:** Define enums in shared constants file used by both frontend and backend

---

## QA Status

**Original Bug:** ✅ FIXED (temperature handling)
**NEW Bugs:** ❌ BLOCKING (healthStatus + symptoms)
**Testing Status:** BLOCKED (0/39 test cases completed)
**Quality Gate:** ❌ FAIL (critical bugs remain)

---

**Last Updated:** 2025-11-12 10:32:30
**Updated By:** Quinn (QA Agent)
**Next Action:** Hand off to Dev for Bug #1 and Bug #2 fixes
