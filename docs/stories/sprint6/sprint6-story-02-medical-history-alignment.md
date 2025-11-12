# Sprint 6 Story 2: Medical History Alignment Across Roles

**Story ID:** Sprint6-Story-02
**Epic:** Sprint 6 - Coach View Corrections & Medical History Alignment
**Priority:** Medium (High Importance - Strategic Delivery: Last)
**Status:** Draft
**Estimate:** 3-4 days
**Created:** 2025-11-11 13:56:31
**Last Updated:** 2025-11-11 13:56:31
**Type:** Data Alignment + Feature Enhancement

---

## Context

This story addresses a critical data consistency issue identified by the client: **Coach's "Add User" medical history fields do not match Medical Incharge's "Health Check-in" form**, leading to inconsistent medical data collection across roles.

**Source:** Client Feedback Document - `corrections/Coach View Corrections needed.pdf` (Originally AC5 from Story 26)
**Affected Modules:**
- Coach - User Management (Add/Edit User)
- Medical Incharge - Health Check-ins

**Reason for Separate Story:** Client confirmed this is the "most important" correction but should be implemented "last" strategically after quick bug fixes (Story 1). The complexity and scope warrant a dedicated story.

**Data Model Reference:** Medical Check-in Enhancement (Phase 1-3 completed) provides the target data model in `backend/models/medicalCheckIns.js`

---

## User Story

**As a** Coach or Medical Incharge
**I want** consistent medical history fields across both "Add User" (Coach) and "Health Check-in" (Medical Incharge) forms
**So that** medical data is collected uniformly regardless of role, ensuring data integrity and enabling comprehensive health tracking for all students

---

## Problem Statement

Currently, there is a **mismatch between medical data collection points**:

### **Current State Analysis:**

1. **Coach Role: "Add User" → Medical History Section**
   - Used when coach creates new student profiles
   - Medical fields: [TO BE DOCUMENTED - requires code exploration]
   - Data stored in: `User` model (presumably `medicalHistory` field or similar)
   - Limited scope: Basic medical info during user onboarding

2. **Medical Incharge Role: "Health Check-in" Form**
   - Used for ongoing health check-ins and medical tracking
   - Comprehensive medical fields:
     - Basic: Temperature, Symptoms (multi-select), Date, Time, Health Status
     - Doctor Visits: Doctor Name, Hospital, Visit Date, Prescriptions, Test Details, Test Results, Conclusion
     - Follow-up: Follow-up Date, Hospital/Location, Doctor Name, Assign to Coaches, Status
     - Attachments: Notes, Images (5MB max), PDFs (10MB max)
   - Data stored in: `MedicalCheckIn` model (comprehensive schema)
   - Full scope: Ongoing medical tracking with history

### **Issues:**

1. **Data Inconsistency:** Coach and Medical Incharge collect different medical information
2. **Workflow Confusion:** Users unsure which form to use for what purpose
3. **Data Fragmentation:** Medical history split between User model and MedicalCheckIn model
4. **Missing Features:** Coach cannot create comprehensive medical records (limited to basic fields)
5. **Role Ambiguity:** Unclear if Coach should collect medical history during user creation or defer to Medical Incharge

---

## Investigation Required (Phase 1)

Before implementing alignment, Dev Agent must:

### **Task 1: Document Current Coach Medical History Fields**
1. Explore `frontend/src/components/AddUserModal.jsx` (or equivalent Coach user creation form)
2. Locate "Medical History" section in Add User form
3. Document all field names, types, labels, validation rules
4. Identify where data is stored (User model field name)

### **Task 2: Compare Data Models**
1. Review `backend/models/user.js` - identify medical history fields
2. Review `backend/models/medicalCheckIns.js` - comprehensive medical schema
3. Create comparison table showing field differences

### **Task 3: Identify Alignment Strategy**
Determine approach:
- **Option A:** Coach uses same fields as Medical Incharge (full alignment)
- **Option B:** Coach uses subset of Medical Incharge fields (partial alignment)
- **Option C:** Create shared medical component used by both roles
- **Option D:** Deprecate Coach medical history, make Medical Incharge create health check-in during onboarding

---

## Acceptance Criteria

### **AC1: Medical History Field Comparison Documented**
- ✅ Document all current medical fields in Coach's "Add User" form
- ✅ Document all fields in Medical Incharge's "Health Check-in" form
- ✅ Create comparison table showing:
  - Field names (Coach vs Medical Incharge)
  - Field types (text, dropdown, multi-select, date, file upload)
  - Validation rules (required, optional, format)
  - Data model storage location
- ✅ Identify fields present in one form but not the other
- ✅ Highlight critical differences affecting data consistency

**Documentation Location:** `docs/stories/sprint6/medical-history-field-comparison.md`

---

### **AC2: Alignment Strategy Defined and Approved**
- ✅ Propose alignment strategy based on field comparison
- ✅ Consider factors:
  - User onboarding workflow (Coach creates users)
  - Ongoing medical tracking workflow (Medical Incharge does check-ins)
  - Data model implications (User vs MedicalCheckIn)
  - Role permissions (who can see/edit what)
  - Backward compatibility (existing user medical records)
- ✅ Get client approval on chosen strategy
- ✅ Document approved strategy with rationale

**Recommended Strategy (Pending Client Approval):**
```
OPTION C: Shared Medical Component with Role-Specific Context

Coach (Add User):
- Uses shared medical component with BASIC fields only:
  - Known medical conditions
  - Allergies
  - Emergency contact
  - Blood type
  - Regular medications
- Data stored in User model (initial medical profile)
- Purpose: Capture critical medical info during onboarding

Medical Incharge (Health Check-in):
- Uses shared component + EXTENDED fields:
  - All basic fields (from Coach component)
  - Symptoms, Temperature, Health Status
  - Doctor Visits section
  - Follow-up section
  - Attachments (images, PDFs)
- Data stored in MedicalCheckIn model (ongoing health tracking)
- Can view and edit User medical profile (basic fields)
- Purpose: Comprehensive health monitoring and history

Benefits:
- Single source of truth for field definitions
- Coach captures critical info during onboarding
- Medical Incharge maintains comprehensive ongoing records
- Clear role separation (onboarding vs ongoing care)
- Backward compatible (User model stays, MedicalCheckIn extends)
```

---

### **AC3: Coach Medical History Form Updated**
- ✅ Update Coach's "Add User" → Medical History section with aligned fields
- ✅ Use shared medical component (if Option C chosen)
- ✅ Ensure field labels, types, validation match Medical Incharge form
- ✅ Required fields consistent across both forms
- ✅ Optional fields consistent across both forms
- ✅ Form layout and UX follow same patterns
- ✅ Field tooltips/help text consistent

**Fields to Include (BASIC - if Option C):**
- Known Medical Conditions (textarea)
- Allergies (textarea)
- Blood Type (dropdown): A+, A-, B+, B-, AB+, AB-, O+, O-
- Emergency Contact Name (text)
- Emergency Contact Phone (text with validation)
- Regular Medications (textarea)

---

### **AC4: Medical Incharge Form Remains Functional**
- ✅ Medical Incharge "Health Check-in" form unchanged (or enhanced with shared component)
- ✅ All existing features functional:
  - Symptoms multi-select
  - Doctor Visits section (collapsible)
  - Follow-up section (collapsible)
  - File uploads (prescriptions, test results, images, PDFs)
  - Coach assignment in follow-up
- ✅ Can view User medical profile (basic fields from Coach)
- ✅ Can edit User medical profile if needed (optional enhancement)

---

### **AC5: Data Integrity and Migration**
- ✅ Existing user medical records preserved (no data loss)
- ✅ Users created before alignment still display medical history correctly
- ✅ Users created after alignment use new field structure
- ✅ Medical Incharge can see medical history from both sources:
  - User model (basic fields from Coach)
  - MedicalCheckIn model (check-in records)
- ✅ No duplicate or conflicting data
- ✅ Migration script (if needed) to convert old medical data to new structure

---

### **AC6: Validation Rules Consistent**
- ✅ Required field validation matches across forms
- ✅ Format validation matches (e.g., phone number format)
- ✅ Error messages consistent
- ✅ File upload restrictions consistent (image max 5MB, PDF max 10MB)
- ✅ Multi-select behavior consistent (if used in both forms)

---

### **AC7: Role Permissions Enforced**
- ✅ Coach can create/edit User medical history (basic fields)
- ✅ Medical Incharge can create health check-ins (comprehensive)
- ✅ Medical Incharge can view User medical history (read-only or editable per client)
- ✅ Students cannot edit medical records (view-only if applicable)
- ✅ Admin has full access to all medical data (if applicable)
- ✅ Security: Coaches from one Balagruha cannot access medical data from another Balagruha

---

### **AC8: Cross-Role Medical Data Visibility**
- ✅ Medical Incharge can view medical history entered by Coach
- ✅ Coach can view health check-ins created by Medical Incharge (if applicable)
- ✅ User profile displays comprehensive medical overview:
  - Basic medical info (from User model)
  - Recent check-ins (from MedicalCheckIn model)
  - Follow-up tasks (from MedicalCheckIn.followUp)
- ✅ Clear indication of data source (entered by Coach vs Medical Incharge)
- ✅ Chronological timeline of medical events (if applicable)

---

## Technical Requirements

### **Backend Changes**

#### **1. Review Current Data Models**

**File:** `backend/models/user.js`
```javascript
// CURRENT STATE (TO BE VERIFIED BY DEV)
const userSchema = new mongoose.Schema({
  name: String,
  userId: String,
  // ...
  medicalHistory: {
    // DOCUMENT CURRENT FIELDS HERE
    // Example speculation:
    // conditions: String,
    // allergies: String,
    // bloodType: String,
  },
  // ...
});
```

**File:** `backend/models/medicalCheckIns.js` (ALREADY EXISTS)
```javascript
// REFERENCE MODEL (from Medical Check-in Enhancement)
const medicalCheckInSchema = new mongoose.Schema({
  studentId: { type: ObjectId, ref: 'User', required: true },
  balagruhaId: { type: ObjectId, ref: 'Balagruha', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  temperature: { type: Number, min: 30, max: 45 },

  symptoms: [{
    type: String,
    enum: ['Cough + Cold', 'Fever', 'Stomach ache', 'Headache', 'Injury', 'Other']
  }],
  customSymptom: String,

  healthStatus: {
    type: String,
    enum: ['Normal', 'Important', 'Critical']
  },

  doctorVisit: {
    doctorName: String,
    hospital: String,
    visitDate: Date,
    prescriptionFiles: [String],  // S3 URLs
    testDetails: String,
    testResultFiles: [String],     // S3 URLs
    doctorsConclusion: String
  },

  followUp: {
    followUpDate: Date,
    hospitalLocation: String,
    doctorName: String,
    assignedCoaches: [{ type: ObjectId, ref: 'User' }],
    status: { type: String, enum: ['Active', 'Inactive'] }
  },

  notes: String,
  attachments: [String],           // General images
  pdfAttachments: [String],        // General PDFs

  createdBy: { type: ObjectId, ref: 'User' },
  updatedBy: { type: ObjectId, ref: 'User' }
}, { timestamps: true });
```

#### **2. Create Shared Medical Field Definitions**

**File:** `backend/constants/medicalFields.js` (NEW)
```javascript
// Shared medical field definitions used by both Coach and Medical Incharge

const BASIC_MEDICAL_FIELDS = {
  KNOWN_CONDITIONS: {
    name: 'knownConditions',
    type: 'textarea',
    label: 'Known Medical Conditions',
    placeholder: 'e.g., Asthma, Diabetes, etc.',
    required: false,
    maxLength: 500
  },

  ALLERGIES: {
    name: 'allergies',
    type: 'textarea',
    label: 'Allergies',
    placeholder: 'e.g., Peanuts, Penicillin, etc.',
    required: false,
    maxLength: 300
  },

  BLOOD_TYPE: {
    name: 'bloodType',
    type: 'select',
    label: 'Blood Type',
    options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: false
  },

  EMERGENCY_CONTACT: {
    name: 'emergencyContactName',
    type: 'text',
    label: 'Emergency Contact Name',
    required: true,
    maxLength: 100
  },

  EMERGENCY_PHONE: {
    name: 'emergencyContactPhone',
    type: 'tel',
    label: 'Emergency Contact Phone',
    required: true,
    pattern: /^\d{10}$/  // Adjust pattern per region
  },

  REGULAR_MEDICATIONS: {
    name: 'regularMedications',
    type: 'textarea',
    label: 'Regular Medications',
    placeholder: 'List any medications the student takes regularly',
    required: false,
    maxLength: 300
  }
};

module.exports = { BASIC_MEDICAL_FIELDS };
```

#### **3. Update User Model (if needed)**

**File:** `backend/models/user.js`
```javascript
// Update medicalHistory structure to match BASIC_MEDICAL_FIELDS

const userSchema = new mongoose.Schema({
  // ... existing fields

  medicalHistory: {
    knownConditions: { type: String, maxLength: 500 },
    allergies: { type: String, maxLength: 300 },
    bloodType: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', '']
    },
    emergencyContactName: { type: String, required: true, maxLength: 100 },
    emergencyContactPhone: { type: String, required: true },
    regularMedications: { type: String, maxLength: 300 }
  },

  // ... other fields
});
```

#### **4. API Endpoints**

**File:** `backend/controllers/userController.js`
```javascript
// UPDATE: Ensure medical history saved correctly
exports.createUser = async (req, res) => {
  const { medicalHistory, ...userData } = req.body;

  // Validate medical history fields
  if (medicalHistory) {
    validateMedicalHistory(medicalHistory);
  }

  const user = new User({
    ...userData,
    medicalHistory
  });

  await user.save();
  res.json(user);
};

exports.updateUserMedicalHistory = async (req, res) => {
  const { userId } = req.params;
  const { medicalHistory } = req.body;

  // Permission check: Coach can only edit users in their Balagruhas
  const user = await User.findById(userId);
  if (!canEditUser(req.user, user)) {
    return res.status(403).json({ message: 'Permission denied' });
  }

  validateMedicalHistory(medicalHistory);
  user.medicalHistory = medicalHistory;
  await user.save();

  res.json(user);
};
```

**File:** `backend/controllers/medicalRecordController.js` (NEW or update existing)
```javascript
// Get comprehensive medical profile (User + Check-ins)
exports.getComprehensiveMedicalProfile = async (req, res) => {
  const { studentId } = req.params;

  // Permission check
  if (!canViewMedicalData(req.user, studentId)) {
    return res.status(403).json({ message: 'Permission denied' });
  }

  const user = await User.findById(studentId).select('medicalHistory');
  const checkIns = await MedicalCheckIn.find({ studentId })
    .sort({ date: -1 })
    .limit(10);  // Last 10 check-ins

  const followUps = await MedicalCheckIn.find({
    studentId,
    'followUp.status': 'Active',
    'followUp.followUpDate': { $gte: new Date() }
  }).select('followUp date');

  res.json({
    basicMedicalInfo: user.medicalHistory,
    recentCheckIns: checkIns,
    activeFollowUps: followUps
  });
};
```

---

### **Frontend Changes**

#### **1. Create Shared Medical Component**

**File:** `frontend/src/components/shared/MedicalHistoryForm.jsx` (NEW)
```jsx
import React from 'react';
import { BASIC_MEDICAL_FIELDS } from '../../constants/medicalFields';

const MedicalHistoryForm = ({ medicalData, onChange, mode = 'basic' }) => {
  const handleChange = (fieldName, value) => {
    onChange({
      ...medicalData,
      [fieldName]: value
    });
  };

  return (
    <div className="medical-history-form">
      <h3>Medical History</h3>

      {/* Known Conditions */}
      <div className="form-group">
        <label>{BASIC_MEDICAL_FIELDS.KNOWN_CONDITIONS.label}</label>
        <textarea
          name="knownConditions"
          value={medicalData.knownConditions || ''}
          onChange={(e) => handleChange('knownConditions', e.target.value)}
          placeholder={BASIC_MEDICAL_FIELDS.KNOWN_CONDITIONS.placeholder}
          maxLength={BASIC_MEDICAL_FIELDS.KNOWN_CONDITIONS.maxLength}
          rows={3}
        />
      </div>

      {/* Allergies */}
      <div className="form-group">
        <label>{BASIC_MEDICAL_FIELDS.ALLERGIES.label}</label>
        <textarea
          name="allergies"
          value={medicalData.allergies || ''}
          onChange={(e) => handleChange('allergies', e.target.value)}
          placeholder={BASIC_MEDICAL_FIELDS.ALLERGIES.placeholder}
          maxLength={BASIC_MEDICAL_FIELDS.ALLERGIES.maxLength}
          rows={2}
        />
      </div>

      {/* Blood Type */}
      <div className="form-group">
        <label>{BASIC_MEDICAL_FIELDS.BLOOD_TYPE.label}</label>
        <select
          name="bloodType"
          value={medicalData.bloodType || ''}
          onChange={(e) => handleChange('bloodType', e.target.value)}
        >
          <option value="">Select Blood Type</option>
          {BASIC_MEDICAL_FIELDS.BLOOD_TYPE.options.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Emergency Contact Name */}
      <div className="form-group">
        <label>{BASIC_MEDICAL_FIELDS.EMERGENCY_CONTACT.label} *</label>
        <input
          type="text"
          name="emergencyContactName"
          value={medicalData.emergencyContactName || ''}
          onChange={(e) => handleChange('emergencyContactName', e.target.value)}
          required
          maxLength={BASIC_MEDICAL_FIELDS.EMERGENCY_CONTACT.maxLength}
        />
      </div>

      {/* Emergency Contact Phone */}
      <div className="form-group">
        <label>{BASIC_MEDICAL_FIELDS.EMERGENCY_PHONE.label} *</label>
        <input
          type="tel"
          name="emergencyContactPhone"
          value={medicalData.emergencyContactPhone || ''}
          onChange={(e) => handleChange('emergencyContactPhone', e.target.value)}
          required
          pattern="[0-9]{10}"
          placeholder="10-digit phone number"
        />
      </div>

      {/* Regular Medications */}
      <div className="form-group">
        <label>{BASIC_MEDICAL_FIELDS.REGULAR_MEDICATIONS.label}</label>
        <textarea
          name="regularMedications"
          value={medicalData.regularMedications || ''}
          onChange={(e) => handleChange('regularMedications', e.target.value)}
          placeholder={BASIC_MEDICAL_FIELDS.REGULAR_MEDICATIONS.placeholder}
          maxLength={BASIC_MEDICAL_FIELDS.REGULAR_MEDICATIONS.maxLength}
          rows={2}
        />
      </div>
    </div>
  );
};

export default MedicalHistoryForm;
```

#### **2. Update Coach Add User Form**

**File:** `frontend/src/components/AddUserModal.jsx`
```jsx
import MedicalHistoryForm from './shared/MedicalHistoryForm';

const AddUserModal = () => {
  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    // ... other fields
    medicalHistory: {}
  });

  const handleMedicalHistoryChange = (medicalData) => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: medicalData
    }));
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        {/* ... other form fields */}

        {/* Medical History Section */}
        <MedicalHistoryForm
          medicalData={formData.medicalHistory}
          onChange={handleMedicalHistoryChange}
          mode="basic"
        />

        {/* ... submit button */}
      </form>
    </Modal>
  );
};
```

#### **3. Update Medical Incharge Check-in Form (Optional Enhancement)**

**File:** `frontend/src/components/MedicalCheckInModal.jsx`
```jsx
import MedicalHistoryForm from './shared/MedicalHistoryForm';

// OPTIONAL: Display User medical history in check-in form for reference
const MedicalCheckInModal = ({ student }) => {
  const [checkInData, setCheckInData] = useState({
    // ... check-in fields
  });

  return (
    <Modal>
      <form>
        {/* Student Selection */}
        <select value={checkInData.studentId} onChange={handleStudentChange}>
          {/* ... students */}
        </select>

        {/* OPTIONAL: Display student's basic medical info */}
        {student && student.medicalHistory && (
          <div className="student-medical-reference">
            <h4>Student Medical Profile (Reference)</h4>
            <p><strong>Allergies:</strong> {student.medicalHistory.allergies}</p>
            <p><strong>Known Conditions:</strong> {student.medicalHistory.knownConditions}</p>
            <p><strong>Blood Type:</strong> {student.medicalHistory.bloodType}</p>
            <p><strong>Emergency Contact:</strong> {student.medicalHistory.emergencyContactName} ({student.medicalHistory.emergencyContactPhone})</p>
          </div>
        )}

        {/* Existing check-in fields */}
        {/* ... temperature, symptoms, doctor visits, follow-up, etc. */}
      </form>
    </Modal>
  );
};
```

---

## Testing Strategy

### **Unit Tests**

#### **Backend Tests**

**File:** `backend/tests/medicalHistoryAlignment.test.js` (NEW)
```javascript
describe('Medical History Alignment', () => {
  describe('User Medical History', () => {
    test('Should save basic medical history when creating user', async () => {
      const userData = {
        name: 'Test Student',
        userId: 'STU-001',
        medicalHistory: {
          knownConditions: 'Asthma',
          allergies: 'Peanuts',
          bloodType: 'A+',
          emergencyContactName: 'Parent Name',
          emergencyContactPhone: '1234567890',
          regularMedications: 'Inhaler'
        }
      };

      const user = await User.create(userData);

      expect(user.medicalHistory.knownConditions).toBe('Asthma');
      expect(user.medicalHistory.allergies).toBe('Peanuts');
      expect(user.medicalHistory.bloodType).toBe('A+');
      expect(user.medicalHistory.emergencyContactName).toBe('Parent Name');
    });

    test('Should validate emergency contact fields are required', async () => {
      const userData = {
        name: 'Test Student',
        userId: 'STU-002',
        medicalHistory: {
          // Missing emergencyContactName and emergencyContactPhone
        }
      };

      await expect(User.create(userData)).rejects.toThrow();
    });
  });

  describe('Comprehensive Medical Profile API', () => {
    test('Should return user medical history + check-ins', async () => {
      const student = await User.create({
        name: 'Test Student',
        medicalHistory: { allergies: 'Dust' }
      });

      await MedicalCheckIn.create({
        studentId: student._id,
        temperature: 98.6,
        symptoms: ['Cough + Cold']
      });

      const req = { user: medicalInchargeUser, params: { studentId: student._id } };
      const res = { json: jest.fn() };

      await getComprehensiveMedicalProfile(req, res);

      const response = res.json.mock.calls[0][0];
      expect(response.basicMedicalInfo.allergies).toBe('Dust');
      expect(response.recentCheckIns).toHaveLength(1);
    });
  });
});
```

#### **Frontend Tests**

**File:** `frontend/src/components/shared/MedicalHistoryForm.test.jsx` (NEW)
```javascript
describe('MedicalHistoryForm Component', () => {
  test('Should render all basic medical fields', () => {
    render(<MedicalHistoryForm medicalData={{}} onChange={jest.fn()} />);

    expect(screen.getByLabelText(/Known Medical Conditions/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Allergies/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Blood Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Emergency Contact Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Emergency Contact Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Regular Medications/i)).toBeInTheDocument();
  });

  test('Should call onChange when field values change', () => {
    const mockOnChange = jest.fn();
    render(<MedicalHistoryForm medicalData={{}} onChange={mockOnChange} />);

    const allergiesField = screen.getByLabelText(/Allergies/i);
    fireEvent.change(allergiesField, { target: { value: 'Peanuts' } });

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({ allergies: 'Peanuts' })
    );
  });
});
```

---

### **Integration Tests**

**Test Scenario: Coach Creates User with Medical History**
1. Coach logs in and navigates to Users page
2. Coach clicks "Add New User"
3. Coach fills user details including Medical History section
4. Coach submits form
5. User created with medical history saved
6. Medical Incharge logs in and views student's medical profile
7. Medical Incharge sees medical history entered by Coach
8. Medical Incharge creates new health check-in for student
9. Both User medical history and check-in records visible

---

### **E2E Tests (Playwright MCP)**

E2E test scenarios will be written by Dev Agent in markdown format in:
**File:** `docs/qa/e2e/sprint6-story-02-medical-history-alignment.md`

**Test Cases to Include:**
- TC 2.1: Coach creates user with complete medical history
- TC 2.2: Medical Incharge views user medical profile
- TC 2.3: Medical Incharge creates check-in, sees user allergies as reference
- TC 2.4: Field validation works consistently across both forms
- TC 2.5: Emergency contact fields are required in Coach form
- TC 2.6: Medical data persists and displays correctly across roles
- TC 2.7: Existing users (created before alignment) still display medical history
- TC 2.8: Comprehensive medical profile API returns all data correctly

---

## Dependencies

### **Story Dependencies**
- ⚠️ **Sprint 6 Story 1** can be developed in parallel (no blocking dependencies)
- ✅ **Medical Check-in Enhancement** (completed) - provides target data model

### **Technical Dependencies**
- ✅ Existing User model (Sprint 1)
- ✅ Existing MedicalCheckIn model (Medical Check-in Enhancement)
- ✅ Medical Incharge module and check-in form (Sprint 1)
- ✅ Coach user management module (Sprint 1)

### **External Dependencies**
- ⚠️ **Client Approval Required:** Alignment strategy (Option A/B/C/D)
- ⚠️ **Client Clarification:** Should Medical Incharge be able to edit User medical history?
- ⚠️ **Client Clarification:** Should Coach be able to view health check-in records?

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Existing user medical data incompatible with new structure | Medium | High | Create migration script; maintain backward compatibility |
| Performance issues loading comprehensive medical profile | Low | Medium | Optimize queries; add pagination for check-ins; use select() to limit fields |
| User resistance to new medical fields (too many) | Low | Low | Client testing and feedback; make most fields optional |
| Medical data privacy concerns (cross-role access) | Low | High | Strict role permissions; audit logging for medical data access |
| Shared component breaks Medical Incharge workflow | Low | Medium | Thorough testing of existing check-in form; phased rollout |

---

## Implementation Plan

### **Phase 1: Investigation & Documentation (Day 1 Morning)**
1. Dev explores Coach Add User form code
2. Document all current medical history fields
3. Compare with Medical Incharge check-in form
4. Create field comparison table
5. Propose alignment strategy (Options A/B/C/D)
6. Present to client for approval

---

### **Phase 2: Backend Alignment (Day 1 Afternoon - Day 2 Morning)**
1. Create shared medical field definitions (`medicalFields.js`)
2. Update User model if needed (schema changes)
3. Create/update API endpoints:
   - Update user medical history
   - Get comprehensive medical profile
4. Add validation for medical fields
5. Write backend unit tests

---

### **Phase 3: Frontend Shared Component (Day 2 Afternoon)**
1. Create `MedicalHistoryForm.jsx` shared component
2. Test component in isolation (Storybook or standalone)
3. Write component unit tests

---

### **Phase 4: Coach Form Integration (Day 3 Morning)**
1. Update Coach Add User form to use shared component
2. Test user creation with medical history
3. Verify data saves correctly in User model
4. Test validation and error handling

---

### **Phase 5: Medical Incharge Integration (Day 3 Afternoon)**
1. Update Medical Incharge check-in form to display User medical history (optional enhancement)
2. Test comprehensive medical profile view
3. Ensure existing check-in workflow unaffected
4. Test cross-role data visibility

---

### **Phase 6: Data Migration (Day 4 Morning - if needed)**
1. Create migration script for existing users
2. Test migration with production data backup
3. Verify no data loss
4. Document migration process

---

### **Phase 7: Testing & QA (Day 4 Afternoon)**
1. Dev completes all unit tests
2. Dev writes E2E test scenarios (markdown)
3. QA Agent executes E2E tests via Playwright MCP
4. QA documents findings in QA gate
5. Dev fixes bugs found by QA

---

### **Phase 8: Deployment & Validation (Day 5 - if needed)**
1. Final QA gate review
2. Client UAT testing
3. Deploy to production
4. Monitor for issues

---

## Definition of Done

- [ ] All 8 acceptance criteria implemented and tested
- [ ] Field comparison document created and reviewed
- [ ] Alignment strategy approved by client
- [ ] Shared medical component created and tested
- [ ] Coach Add User form updated with aligned fields
- [ ] Medical Incharge check-in form remains functional
- [ ] Cross-role medical data visibility working
- [ ] Data migration completed (if needed)
- [ ] Unit tests written and passing (backend + frontend)
- [ ] Integration tests written and passing
- [ ] E2E test scenarios written by Dev Agent (markdown format)
- [ ] E2E tests executed by QA Agent via Playwright MCP
- [ ] QA gate passed with PASS decision
- [ ] Role permissions tested and enforced
- [ ] No data loss for existing users
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Client sign-off received

---

## Related Documentation

### **Reference Documents**
- **Client Feedback:** `corrections/Coach View Corrections needed.pdf`
- **Medical Check-in Enhancement:** `docs/Medical Check-in Enhancement - COMPLETED.md`
- **Data Model:** `backend/models/medicalCheckIns.js`
- **Playwright Exploration:** 7 screenshots from Medical Manager exploration (2025-11-11)

### **Sprint 6 Overview**
- **File:** `docs/stories/sprint6/sprint6-overview.md`

### **QA Gate**
- **File:** `docs/qa/gates/sprint-6-story-02-medical-history-alignment.yml` (to be created)

### **E2E Test Scenarios**
- **File:** `docs/qa/e2e/sprint6-story-02-medical-history-alignment.md` (to be created by Dev Agent)

---

## Questions for Client/PM

### **Critical Clarifications Needed:**

1. **Alignment Strategy Approval:**
   - Q: Which alignment approach should we use (A/B/C/D)?
   - Q: Should Coach collect basic medical info during onboarding, or defer all medical data to Medical Incharge?

2. **Cross-Role Permissions:**
   - Q: Should Medical Incharge be able to edit User medical history (basic fields entered by Coach)?
   - Q: Should Coach be able to view health check-in records created by Medical Incharge?
   - Q: Should Coach see follow-up tasks assigned to them from Medical Incharge?

3. **Field Requirements:**
   - Q: Are emergency contact name and phone required fields?
   - Q: Should blood type be required or optional?
   - Q: Any additional medical fields needed beyond the proposed basic fields?

4. **Migration:**
   - Q: How should we handle users created before this alignment (missing new fields)?
   - Q: Should we prompt Coach to update existing user medical histories?

---

## Dev Agent Record

**Assigned To:** [Dev Agent Name]
**Started:** [Date/Time]
**Completed:** [Date/Time]
**Total Time:** [Duration]

### Implementation Log
```
[Timestamp] - Sprint 6 Story 2 created and documented
[Timestamp] - Coach Add User form code explored
[Timestamp] - Medical history field comparison completed
[Timestamp] - Field comparison document created
[Timestamp] - Alignment strategy proposed to client
[Timestamp] - Client approved Option C (Shared Component)
[Timestamp] - Shared medical field definitions created
[Timestamp] - User model updated (if needed)
[Timestamp] - Shared medical component created
[Timestamp] - Coach form updated with shared component
[Timestamp] - Medical Incharge integration complete
[Timestamp] - Data migration script created (if needed)
[Timestamp] - All unit tests passing
[Timestamp] - E2E test scenarios written
[Timestamp] - Ready for QA
```

---

## QA Results

**QA Agent:** [QA Agent Name]
**Tested:** [Date/Time]
**Status:** [PASS/FAIL/CONCERNS]

### Acceptance Criteria Validation
- [ ] AC1: Field comparison documented ✅/❌
- [ ] AC2: Alignment strategy defined and approved ✅/❌
- [ ] AC3: Coach medical history form updated ✅/❌
- [ ] AC4: Medical Incharge form functional ✅/❌
- [ ] AC5: Data integrity maintained ✅/❌
- [ ] AC6: Validation rules consistent ✅/❌
- [ ] AC7: Role permissions enforced ✅/❌
- [ ] AC8: Cross-role data visibility working ✅/❌

---

## Change Log

| Date | Time | Change | Updated By |
|------|------|--------|------------|
| 2025-11-11 | 13:56:31 | Sprint 6 Story 2 created (migrated from Story 26 AC5) | Orchestrator Agent |

---

**Story Status:** Draft → Investigation → Strategy Approval → In Progress → Code Review → QA Testing → Done

**Last Updated:** 2025-11-11 13:56:31 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Updated By:** Orchestrator Agent - Sprint 6 Story 2 initial creation
