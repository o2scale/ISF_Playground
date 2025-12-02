# Medical History Field Comparison Document

**Sprint 6 Story 2 - Medical History Alignment**

**Last Updated:** 2025-11-13 13:22:48 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Updated By:** Dev Agent (Claude) - Phase 1 Investigation Complete
**Status:** Investigation Complete - Ready for Alignment Strategy Approval

---

## 1. Executive Summary

This document provides a comprehensive comparison of medical history fields between:
- **Coach's "Add User" Form** (frontend/src/components/usermanagement/UserForm.js)
- **Medical Incharge's "Health Check-in" Form** (frontend/src/components/dashboard/CheckInModal.js)

### Key Findings:
1. **Major Overlap:** Both forms collect doctor visits, hospital information, and file attachments
2. **Different Purposes:**
   - Coach form: Long-term medical history (chronic conditions, past diagnoses)
   - Medical Incharge form: Acute health check-ins (daily/weekly health monitoring)
3. **Field Gaps:** Coach form lacks symptom tracking; Medical Incharge form lacks medical condition tracking
4. **Storage Models:** Coach → User model; Medical Incharge → MedicalCheckIn model

---

## 2. Coach "Add User" Form - Medical History Fields

**Component:** `frontend/src/components/usermanagement/UserForm.js` (lines 1371-1717)
**Data Model:** User model → `medicalHistory` array
**Purpose:** Capture historical medical conditions and ongoing treatments during student onboarding

### Complete Field List:

| # | Field Name | Type | Input Type | Validation | Description |
|---|------------|------|------------|------------|-------------|
| 1 | `name` | String | Text input | Optional | Medical condition name (e.g., "Asthma", "Diabetes") |
| 2 | `description` | String | Textarea (3 rows) | Optional | Detailed description of the medical condition |
| 3 | `date` | Date | Date picker | Optional | Diagnosis/record date |
| 4 | `caseId` | String | Text input | Optional | Medical case identifier or reference number |
| 5 | `doctorsName` | String | Text input | Optional | Primary doctor's name treating this condition |
| 6 | `hospitalName` | String | Text input | Optional | Hospital or clinic name |
| 7 | `currentStatus.status` | String | Dropdown | Optional | Status: active, resolved, ongoing, monitoring, stable, managed |
| 8 | `currentStatus.date` | Date | Date picker | Optional | Date of current status update |
| 9 | `currentStatus.notes` | String | Textarea (2 rows) | Optional | Notes about current status |
| 10 | `prescriptions` | Array[File] | File upload | Optional | Prescription files (images/PDFs, max 5MB images, 10MB PDFs) |
| 11 | `otherAttachments` | Array[File] | File upload | Optional | Other medical documents (images/PDFs/docs) |
| 12 | `nextActionDate` | Date | Date picker | Optional | **NOTE: Form-level field, not medical history level** |

### Multi-Record Support:
- ✅ Users can add **multiple medical history records** per student
- ✅ Each record represents a separate medical condition or case
- ✅ Each record has its own prescriptions and attachments
- ✅ Records can be individually removed

### File Upload Details:
- **Prescriptions:** Accepts `.pdf, .jpg, .jpeg, .png`
- **Other Attachments:** Accepts `.pdf, .jpg, .jpeg, .png, .doc, .docx`
- **Size Limits:** 5MB for images, 10MB for PDFs
- **Display:** In edit mode, existing files show "View" link to open in new tab

### Code References:
- Medical history state: lines 37-54
- Add/remove functions: lines 225-301
- Form rendering: lines 1371-1717
- File handling: lines 338-376, 538-553
- Form submission: lines 629-687

---

## 3. Medical Incharge "Health Check-in" Form - Fields

**Component:** `frontend/src/components/dashboard/CheckInModal.js`
**Data Model:** MedicalCheckIn model
**Purpose:** Track daily/weekly health status, symptoms, and acute medical events

### Complete Field List:

#### 3.1 Basic Check-in Fields (CheckInModal.js)

| # | Field Name | Type | Input Type | Validation | Description |
|---|------------|------|------------|------------|-------------|
| 1 | `temperature` | Number | Number input | Optional, 30-45°C | Body temperature in Celsius |
| 2 | `date` | Date | Date picker | Required | Check-in date |
| 3 | `time` | Time | Time picker | Required | Check-in time |
| 4 | `healthStatus` | String | Dropdown | Required | Health status: normal, important, critical |
| 5 | `symptoms` | Array[String] | Multi-select | Required | Predefined symptoms (see 3.2) |
| 6 | `customSymptom` | String | Text input | Conditional | Custom symptom if "other" selected |
| 7 | `notes` | String | Textarea (3 rows) | Optional | General notes about check-in |
| 8 | `uploadedImages` | Array[File] | File upload | Optional | General images (max 5MB each) |
| 9 | `uploadedPdfs` | Array[File] | File upload | Optional | General PDFs (max 10MB each) |
| 10 | `doctorVisits` | Array[Object] | Complex component | Optional | Multiple doctor visits (see 3.3) |
| 11 | `followUps` | Array[Object] | Complex component | Optional | Multiple follow-ups (see 3.4) |

#### 3.2 Symptoms Options (SymptomsSelector.js)

**Component:** `frontend/src/components/dashboard/SymptomsSelector.js`

| Symptom Value | Display Label |
|---------------|---------------|
| `cough_cold` | Cough + Cold |
| `fever` | Fever |
| `stomach_ache` | Stomach ache |
| `headache` | Headache |
| `injury` | Injury |
| `other` | Other (Type your own) |

- **Input Type:** Multi-select dropdown (hold Ctrl/Cmd for multiple)
- **Custom Symptom:** If "other" selected, shows text input for custom symptom description

#### 3.3 Doctor Visits Structure (MultipleDoctorVisitsSection.js)

**Component:** `frontend/src/components/dashboard/MultipleDoctorVisitsSection.js` (lines 10-18)

Each doctor visit in the `doctorVisits` array contains:

| # | Field Name | Type | Input Type | Validation | Description |
|---|------------|------|------------|------------|-------------|
| 1 | `doctorName` | String | Dropdown + Text | Optional | Doctor name (searchable dropdown with existing doctors) |
| 2 | `hospitalName` | String | Text input | Optional | Hospital or clinic name |
| 3 | `visitDate` | Date | Date picker | Optional | Date of doctor visit |
| 4 | `prescriptionFiles` | Array[File] | File upload | Optional | Prescription files (images/PDFs) |
| 5 | `testDetails` | String | Textarea (2 rows) | Optional | Test details/notes |
| 6 | `testResultFiles` | Array[File] | File upload | Optional | Test result files (images/PDFs) |
| 7 | `conclusion` | String | Textarea (2 rows) | Optional | Doctor's conclusion or diagnosis |

**Multi-Visit Support:**
- ✅ Can add multiple doctor visits per check-in
- ✅ Collapsible section (▶/▼ toggle)
- ✅ Each visit can be removed individually (min 1 visit if any added)
- ✅ File uploads per visit (prescription + test results)

#### 3.4 Follow-ups Structure (MultipleFollowUpsSection.js)

**Component:** `frontend/src/components/dashboard/MultipleFollowUpsSection.js` (lines 29-38)

Each follow-up in the `followUps` array contains:

| # | Field Name | Type | Input Type | Validation | Description |
|---|------------|------|------------|------------|-------------|
| 1 | `followUpDate` | Date | Date picker | **Required** | Scheduled follow-up date |
| 2 | `hospital` | String | Text input | Optional | Hospital/location for follow-up |
| 3 | `doctor` | String | Text input | Optional | Doctor name for follow-up |
| 4 | `assignedCoaches` | Array[String] | Checkboxes | Optional | Coach IDs assigned to this follow-up |
| 5 | `status` | String | Dropdown | Optional | Status: active, completed, inactive |
| 6 | `descriptionFiles` | Array[File] | File upload | Optional | Description/notes files (images/PDFs) |
| 7 | `testResultFiles` | Array[File] | File upload | Optional | Test result files (images/PDFs) |
| 8 | `notes` | String | Textarea (2 rows) | Optional | Follow-up notes |

**Multi-Follow-up Support:**
- ✅ Can add multiple follow-ups per check-in
- ✅ Collapsible section (▶/▼ toggle)
- ✅ Coach assignment per follow-up (fetches coaches from selected balagruha)
- ✅ File uploads per follow-up (description + test results)
- ✅ Each follow-up can be removed individually

### File Upload Details:
- **General Images:** Max 5MB each, image/* types
- **General PDFs:** Max 10MB each, application/pdf
- **Doctor Visit Files:** Images/PDFs (5MB images, 10MB PDFs)
- **Follow-up Files:** Images/PDFs (5MB images, 10MB PDFs)

### Code References:
- CheckInModal state: lines 9-24
- Symptoms selector: lines 295-299
- Doctor visits section: lines 341-344
- Follow-ups section: lines 347-351
- File uploads: lines 158-212

---

## 4. Field Overlap Analysis

### 4.1 Overlapping Fields (Similar Purpose)

| Coach Field | Medical Incharge Field | Overlap % | Notes |
|-------------|------------------------|-----------|-------|
| `doctorsName` | `doctorVisits[].doctorName` | 90% | Both capture doctor names |
| `hospitalName` | `doctorVisits[].hospitalName` | 90% | Both capture hospital names |
| `prescriptions` (files) | `doctorVisits[].prescriptionFiles` | 85% | Both store prescription files |
| - | `doctorVisits[].testResultFiles` | - | Medical Incharge has test results; Coach doesn't |
| `description` | `notes` | 60% | Both free-text descriptions |
| `currentStatus.notes` | `notes` | 60% | Both capture status notes |
| `date` | `date` | 80% | Both capture dates (diagnosis vs check-in) |
| `nextActionDate` | `followUps[].followUpDate` | 70% | Follow-up scheduling |

### 4.2 Unique Fields - Coach Form Only

| Field Name | Purpose | Keep/Migrate? |
|------------|---------|---------------|
| `name` | Medical condition name | **KEEP** - Critical for identifying chronic conditions |
| `caseId` | Medical case reference | **KEEP** - Important for tracking official cases |
| `currentStatus.status` | Condition status (6 options) | **KEEP** - Essential for chronic condition management |
| `currentStatus.date` | Status update date | **KEEP** - Tracks condition progression |
| `otherAttachments` | Non-prescription files | **KEEP** - Allows diverse document types |

### 4.3 Unique Fields - Medical Incharge Form Only

| Field Name | Purpose | Keep/Migrate? |
|------------|---------|---------------|
| `temperature` | Body temperature | **KEEP** - Acute health monitoring |
| `time` | Check-in time | **KEEP** - Tracks daily check-in timing |
| `healthStatus` | Alert level (3 levels) | **KEEP** - Critical for urgent health issues |
| `symptoms` | Predefined + custom | **KEEP** - Essential for daily health tracking |
| `doctorVisits[].testDetails` | Test information | **KEEP** - Detailed test tracking |
| `doctorVisits[].conclusion` | Doctor's diagnosis | **KEEP** - Medical conclusion tracking |
| `followUps[].assignedCoaches` | Coach assignments | **KEEP** - Task delegation feature |
| `followUps[].status` | Follow-up status | **KEEP** - Track follow-up completion |
| `followUps[].descriptionFiles` | Follow-up docs | **KEEP** - Document follow-up details |

---

## 5. Data Model Comparison

### 5.1 Current Storage Structure

#### Coach Form → User Model (backend/models/User.js)
```javascript
medicalHistory: [{
  name: String,                    // Medical condition name
  description: String,             // Condition description
  date: Date,                      // Diagnosis date
  caseId: String,                  // Case reference
  doctorsName: String,             // Doctor name
  hospitalName: String,            // Hospital name
  currentStatus: {
    status: String,                // Condition status
    notes: String,                 // Status notes
    date: Date                     // Status date
  },
  prescriptions: [ObjectId],       // References to Attachment model
  otherAttachments: [ObjectId],    // References to Attachment model
  _id: ObjectId                    // Record ID
}]
nextActionDate: Date               // Form-level, not in medicalHistory
```

#### Medical Incharge Form → MedicalCheckIn Model (backend/models/medicalCheckIns.js)
```javascript
{
  studentId: ObjectId,             // Reference to User
  userName: String,                // Student name
  temperature: Number,             // Body temperature
  date: Date,                      // Check-in date
  time: String,                    // Check-in time
  healthStatus: String,            // normal/important/critical
  notes: String,                   // General notes
  symptoms: [String],              // Array of symptom values
  customSymptom: String,           // Custom symptom text

  // Sprint6-Story-3: New array fields
  doctorVisits: [{
    doctorName: String,
    hospitalName: String,
    visitDate: Date,
    testDetails: String,
    conclusion: String,
    prescriptionFiles: [ObjectId],  // References to Attachment model
    testResultFiles: [ObjectId]     // References to Attachment model
  }],

  followUps: [{
    followUpDate: Date,
    hospital: String,
    doctor: String,
    assignedCoaches: [ObjectId],   // References to User (coaches)
    status: String,                // active/completed/inactive
    descriptionFiles: [ObjectId],  // References to Attachment model
    testResultFiles: [ObjectId],   // References to Attachment model
    notes: String
  }],

  attachments: [ObjectId],         // General attachments (images/PDFs)
  balagruhaIds: [ObjectId],        // References to Balagruha
  createdAt: Date,
  updatedAt: Date
}
```

### 5.2 Key Differences

| Aspect | Coach (User Model) | Medical Incharge (MedicalCheckIn Model) |
|--------|-------------------|----------------------------------------|
| **Purpose** | Long-term medical history | Acute health check-in events |
| **Frequency** | One-time (onboarding) + updates | Daily/weekly check-ins |
| **Doctor Tracking** | Single doctor per condition | Multiple visits per check-in |
| **Follow-ups** | Next action date only | Full follow-up tracking with coach assignment |
| **Symptoms** | Not tracked | Core feature (predefined + custom) |
| **Condition Status** | 6-option status tracking | 3-level health alert (normal/important/critical) |
| **File Organization** | Per condition (prescriptions + other) | Per visit + per follow-up + general |

---

## 6. Gap Analysis

### 6.1 What Coach Form is Missing (vs Medical Incharge)

1. **Symptom Tracking** ❌
   - Coach cannot record symptoms associated with a medical condition
   - Recommendation: Add symptom field to Coach medical history

2. **Temperature Recording** ❌
   - No vitals tracking in Coach form
   - Recommendation: Consider adding basic vitals section

3. **Health Alert Levels** ❌
   - Coach status is condition-based (resolved/ongoing), not urgency-based
   - Current structure adequate for historical conditions

4. **Time Tracking** ❌
   - Coach only tracks dates, not times
   - Not critical for historical medical records

5. **Multiple Doctor Visits Per Condition** ❌
   - Coach tracks one doctor per condition
   - Recommendation: Could enhance with visit history

6. **Follow-up Task Assignment** ❌
   - Coach has nextActionDate but no coach assignment
   - Recommendation: Add follow-up scheduling with coach assignment

### 6.2 What Medical Incharge Form is Missing (vs Coach)

1. **Medical Condition Naming** ❌
   - Medical Incharge doesn't label chronic conditions
   - Recommendation: Add condition/diagnosis field to doctor visits

2. **Case ID Tracking** ❌
   - No official case reference numbers
   - Recommendation: Add case ID to doctor visits for official cases

3. **Condition Status Tracking** ❌
   - No long-term status tracking (resolved/ongoing/managed)
   - Recommendation: Add status field to follow-ups

4. **Document Type Separation** ❌
   - Medical Incharge has limited file categories
   - Current structure adequate for check-ins

5. **Historical Context** ❌
   - Check-ins are point-in-time; no condition history
   - This is by design (different purpose)

---

## 7. Alignment Strategy Recommendations

### 7.1 Recommended Approach: Option C (Shared Component with Role-Specific Context)

**Rationale:**
1. ✅ Both forms have **distinct purposes** (historical vs acute)
2. ✅ **Overlapping fields** (doctor, hospital, files) can be standardized
3. ✅ **Role-specific fields** should remain separate
4. ✅ **Data visibility**: Medical check-ins should appear in User medical history view

### 7.2 Implementation Strategy

#### Phase 1: Create Shared Field Definitions
**File:** `backend/constants/medicalFields.js`

```javascript
// Shared field definitions
export const MEDICAL_FIELD_TYPES = {
  CONDITION_STATUS: ['active', 'resolved', 'ongoing', 'monitoring', 'stable', 'managed'],
  HEALTH_STATUS: ['normal', 'important', 'critical'],
  FOLLOWUP_STATUS: ['active', 'completed', 'inactive'],
  SYMPTOM_OPTIONS: [
    { value: 'cough_cold', label: 'Cough + Cold' },
    { value: 'fever', label: 'Fever' },
    { value: 'stomach_ache', label: 'Stomach ache' },
    { value: 'headache', label: 'Headache' },
    { value: 'injury', label: 'Injury' },
    { value: 'other', label: 'Other (Type your own)' }
  ]
};

// Shared validation rules
export const MEDICAL_VALIDATION = {
  temperature: { min: 30, max: 45 },
  fileSize: {
    image: 5 * 1024 * 1024,  // 5MB
    pdf: 10 * 1024 * 1024     // 10MB
  },
  acceptedFileTypes: {
    images: 'image/*',
    pdfs: 'application/pdf',
    documents: '.pdf,.jpg,.jpeg,.png,.doc,.docx'
  }
};
```

#### Phase 2: Create Shared Components

**Component:** `frontend/src/components/shared/DoctorVisitFields.jsx`
- Reusable doctor visit fields (name, hospital, date, files)
- Used by both Coach and Medical Incharge forms

**Component:** `frontend/src/components/shared/FileUploadSection.jsx`
- Standardized file upload with validation
- Supports images, PDFs, documents

**Component:** `frontend/src/components/shared/FollowUpScheduler.jsx`
- Follow-up date + coach assignment
- Used for both long-term and short-term follow-ups

#### Phase 3: Update Coach Form

**Enhancements:**
1. ✅ Add symptom field to medical history records
2. ✅ Add follow-up scheduler with coach assignment (replace nextActionDate)
3. ✅ Use shared components for doctor fields
4. ✅ Maintain existing condition-specific fields (name, caseId, currentStatus)

**Keep Existing:**
- Medical condition name
- Case ID
- Condition status (6 options)
- Current status section

#### Phase 4: Update Medical Incharge Form

**Enhancements:**
1. ✅ Display User medical history (read-only) at top of form
2. ✅ Add condition name field to doctor visits (optional)
3. ✅ Add case ID field to doctor visits (optional)
4. ✅ Use shared components

**Keep Existing:**
- Temperature tracking
- Time tracking
- Health status (3 levels)
- Symptom tracking
- All doctor visit and follow-up fields

#### Phase 5: Cross-Role Visibility

**AC8 Requirement:** Medical check-ins visible in Users tab Medical History

**Implementation:**
1. Update User model to include virtual field `medicalCheckIns`
2. Update User API endpoint to populate medical check-ins
3. Update User Medical History view to display both:
   - Static medical history (from User model)
   - Recent check-ins (from MedicalCheckIn model)
4. Add visual distinction (e.g., badges: "Historical Condition" vs "Recent Check-in")

#### Phase 6: Data Migration (if needed)

**Assessment:** No breaking changes required
- User model medical history structure remains intact
- MedicalCheckIn model already has new array structure (Sprint6-Story-3)
- No data migration script needed

---

## 8. Visual Mockup: Unified Medical History View

### 8.1 User Medical History Tab (Enhanced)

```
┌─────────────────────────────────────────────────────────────────┐
│ Student: Ramesh Kumar | Age: 14 | Balagruha: Mohor Boys         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│ [📋 MEDICAL HISTORY] [🩺 RECENT CHECK-INS] [➕ Add History]     │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│ 📋 MEDICAL HISTORY (Long-term Conditions)                        │
│                                                                   │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │ 🟢 Asthma (Stable)                          Case: MED-2024│   │
│ │ Doctor: Dr. Sharma | Hospital: Apollo Clinic              │   │
│ │ Diagnosed: Jan 15, 2024                                   │   │
│ │ Status: Managed | Last Updated: Mar 10, 2024              │   │
│ │ Notes: Uses inhaler twice daily, no recent episodes       │   │
│ │ 📎 Prescription (2 files) | Other Attachments (1 file)    │   │
│ │ 📅 Next Action: Jun 15, 2024 (Follow-up with Dr. Sharma)  │   │
│ └───────────────────────────────────────────────────────────┘   │
│                                                                   │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │ 🟡 Anemia (Ongoing Treatment)               Case: MED-2023│   │
│ │ Doctor: Dr. Patel | Hospital: City Hospital               │   │
│ │ Diagnosed: Aug 20, 2023                                   │   │
│ │ Status: Ongoing | Last Updated: Apr 05, 2024              │   │
│ │ Notes: Iron supplements daily, monthly blood tests        │   │
│ │ 📎 Prescription (3 files) | Test Results (2 files)        │   │
│ └───────────────────────────────────────────────────────────┘   │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│ 🩺 RECENT HEALTH CHECK-INS (Last 30 Days)                        │
│                                                                   │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │ 🔴 CRITICAL | Apr 10, 2024 10:30 AM | Temp: 39.2°C       │   │
│ │ Symptoms: Fever, Headache, Body Ache                      │   │
│ │ Doctor Visit: Dr. Kumar @ City Hospital (Apr 10, 2024)    │   │
│ │   - Tests: Blood test, COVID test                         │   │
│ │   - Conclusion: Viral fever, prescribed rest + meds       │   │
│ │   - 📎 Prescription (1 file) | Test Results (2 files)     │   │
│ │ Follow-up: Apr 13, 2024 @ City Hospital (Dr. Kumar)       │   │
│ │   - Status: Completed | Assigned: Coach Ramesh            │   │
│ └───────────────────────────────────────────────────────────┘   │
│                                                                   │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │ 🟢 NORMAL | Apr 08, 2024 09:00 AM | Temp: 36.8°C         │   │
│ │ Symptoms: Cough + Cold                                    │   │
│ │ Notes: Mild cold, no doctor visit needed                  │   │
│ └───────────────────────────────────────────────────────────┘   │
│                                                                   │
│ [Load More Check-ins...]                                         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 8.2 Field Mapping for Unified View

| Display Element | Source | Field |
|-----------------|--------|-------|
| **Historical Conditions** | User.medicalHistory | All fields |
| Condition Name | User.medicalHistory[].name | String |
| Status Badge | User.medicalHistory[].currentStatus.status | Color-coded |
| Case ID | User.medicalHistory[].caseId | String |
| Doctor/Hospital | User.medicalHistory[].doctorsName / hospitalName | String |
| Dates | User.medicalHistory[].date, currentStatus.date | Date |
| Files | User.medicalHistory[].prescriptions, otherAttachments | Attachment refs |
| **Recent Check-ins** | MedicalCheckIn (populated) | All fields |
| Health Status Badge | MedicalCheckIn.healthStatus | Color-coded (🔴🟡🟢) |
| DateTime | MedicalCheckIn.date + time | Date + Time |
| Temperature | MedicalCheckIn.temperature | Number |
| Symptoms | MedicalCheckIn.symptoms + customSymptom | Array + String |
| Doctor Visits | MedicalCheckIn.doctorVisits[] | Nested array |
| Follow-ups | MedicalCheckIn.followUps[] | Nested array |

---

## 9. Acceptance Criteria Mapping

| AC | Description | Status | Implementation Plan |
|----|-------------|--------|---------------------|
| **AC1** | Medical History Field Comparison Documented | ✅ COMPLETE | This document |
| **AC2** | Alignment Strategy Defined and Approved | 🔄 IN PROGRESS | Awaiting client approval of Option C |
| **AC3** | Coach Medical History Form Updated | ⏳ PENDING | Phase 3: Add symptoms, shared components |
| **AC4** | Medical Incharge Form Remains Functional | ⏳ PENDING | Phase 4: Display User history, use shared components |
| **AC5** | Data Integrity and Migration | ⏳ PENDING | Phase 6: Assess migration needs (likely none) |
| **AC6** | Validation Rules Consistent | ⏳ PENDING | Phase 1: Create shared validation constants |
| **AC7** | Role Permissions Enforced | ⏳ PENDING | Backend validation in API controllers |
| **AC8** | Cross-Role Medical Data Visibility | ⏳ PENDING | Phase 5: Update User API + frontend view |

---

## 10. Next Steps

### Immediate Actions:
1. ✅ **COMPLETED:** Document all fields from both forms (this document)
2. 🔄 **IN PROGRESS:** Present alignment strategy to client for approval
3. ⏳ **PENDING:** Get client sign-off on Option C approach

### After Client Approval:
1. Create shared field definitions file (Phase 1)
2. Create shared React components (Phase 2)
3. Update Coach form with enhancements (Phase 3)
4. Update Medical Incharge form to display User history (Phase 4)
5. Implement cross-role visibility (Phase 5)
6. Write E2E test scenarios (Phase 7)
7. Complete QA handoff documentation

---

## 11. Questions for Client

1. **Symptom Tracking in Coach Form:**
   - Should Coach be able to record symptoms when adding historical medical conditions?
   - Example: "Asthma - symptoms: shortness of breath, wheezing"

2. **Follow-up Assignment:**
   - Should Coach form have full follow-up scheduling with coach assignment (like Medical Incharge)?
   - Or keep simple nextActionDate field?

3. **Medical Check-in Display in User View:**
   - Should recent check-ins display in User Medical History tab?
   - If yes, how many days of check-ins to show? (Default: 30 days)

4. **Condition Naming in Check-ins:**
   - Should Medical Incharge be able to label a check-in with a condition name?
   - Example: "Asthma flare-up" or "Seasonal allergies"

5. **Case ID for Check-ins:**
   - Should severe check-ins be linkable to official medical cases?
   - Should Medical Incharge be able to add case ID to doctor visits?

---

## 12. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking existing functionality | HIGH | Thorough testing, backward compatibility checks |
| Data loss during migration | HIGH | No breaking changes planned; existing data preserved |
| User confusion with unified view | MEDIUM | Clear visual distinction (badges, sections) |
| Performance with large datasets | MEDIUM | Pagination, lazy loading for check-ins |
| Duplicate data entry | LOW | Shared components, clear role separation |

---

## 13. File References

### Frontend Files:
- `frontend/src/components/usermanagement/UserForm.js` (1745 lines) - Coach Add User form
- `frontend/src/components/dashboard/CheckInModal.js` (502 lines) - Medical Incharge check-in modal
- `frontend/src/components/dashboard/MultipleDoctorVisitsSection.js` (269 lines) - Doctor visits component
- `frontend/src/components/dashboard/MultipleFollowUpsSection.js` (333 lines) - Follow-ups component
- `frontend/src/components/dashboard/SymptomsSelector.js` (61 lines) - Symptoms selector

### Backend Files (to be investigated):
- `backend/models/User.js` - User model with medicalHistory
- `backend/models/medicalCheckIns.js` - MedicalCheckIn model
- `backend/controllers/*` - User and medical check-in controllers
- `backend/routes/*` - API routes

### New Files to Create:
- `backend/constants/medicalFields.js` - Shared field definitions
- `frontend/src/components/shared/DoctorVisitFields.jsx` - Shared doctor fields
- `frontend/src/components/shared/FileUploadSection.jsx` - Shared file upload
- `frontend/src/components/shared/FollowUpScheduler.jsx` - Shared follow-up scheduler

---

**Document Status:** ✅ Complete - Ready for Client Review
**Next Milestone:** Client approval of alignment strategy (Option C)
**Estimated Implementation Time:** 3-4 days after approval
