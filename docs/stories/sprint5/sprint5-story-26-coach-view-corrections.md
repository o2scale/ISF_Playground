# Story 26: Coach View Corrections & Enhancements

**Story ID:** Sprint5-Story-26
**Epic:** Sprint 5 - System Improvements & Bug Fixes
**Priority:** High
**Status:** Draft
**Estimate:** 2-3 days
**Created:** 2025-11-11 12:06:01
**Last Updated:** 2025-11-11 12:27:37
**Type:** Bug Fixes + Enhancements

---

## Context

This story addresses multiple correction requests identified by the client for the Coach View interface. These issues originated from Sprint 1 development (which was not built using BMAT methodology) and require systematic fixes following proper development and QA processes.

**Source:** Client Feedback Document - `corrections/Coach View Corrections needed.pdf`
**Affected Module:** Coach Dashboard (Sprint 1 legacy code)
**Reason for Sprint 5 Inclusion:** Proper documentation, development tracking, and QA validation following BMAT methodology

---

## User Story

**As a** Coach
**I want** the Coach dashboard interface to work correctly with all features functional
**So that** I can efficiently manage students, tasks, schedules, and other responsibilities without encountering bugs or missing features

---

## Problem Statement

The current Coach View has multiple issues across different modules:
1. **Dashboard:** Schedule navigation and time range limitations
2. **Users Module:** Photo capture not persisting, medical history fields mismatch, machine assignment unclear
3. **Tasks Module:** Missing date field, empty "Assign to" dropdown

These issues prevent coaches from effectively using the system for daily operations.

---

## Acceptance Criteria

### **Module 1: Dashboard Enhancements**

#### **AC1: Daily Schedule - Month/Year Selector**
- ✅ Replace left/right arrow navigation with Month/Year selector dropdowns
- ✅ Month dropdown shows all 12 months (Jan-Dec)
- ✅ Year dropdown shows current year ± 2 years range
- ✅ Selecting month/year updates the weekly calendar view
- ✅ Default: Current month and year
- ✅ Calendar displays correct weeks for selected month/year

**Current Behavior:**
```
< Nov 10 - 16, 2025 >  (Arrow navigation only)
```

**Expected Behavior:**
```
Month: [November ▼]  Year: [2025 ▼]
Weekly Calendar (shows weeks for selected month/year)
```

#### **AC2: Schedule Time Range Extension**
- ✅ Weekly calendar displays time slots from 7:00 AM to 9:00 PM (21:00)
- ✅ Currently shows 7:00 AM to 6:00 PM (18:00) - EXTEND to 9:00 PM
- ✅ Time slots increment: 1 hour
- ✅ All existing schedule events display correctly in extended range
- ✅ New events can be created in 6:00 PM - 9:00 PM slots

**Current:** 07:00 - 18:00 (12 time slots)
**Required:** 07:00 - 21:00 (15 time slots)

#### **AC3: Dashboard Content Cards UI Update**
- ✅ Update UI design for all dashboard cards:
  - Task Tracker
  - Medical
  - Syllabus Tracker
  - Slow Learners
  - Repairs
  - Purchase
  - ISF Shop
  - Suggestions
  - Activities
  - Events
- ✅ Cards should display actual counts (not hardcoded "0")
- ✅ Cards should match approved UI design specifications
- ✅ Clicking card navigates to respective module
- ✅ Cards show loading state while fetching data
- ✅ Empty state: Show "No items" instead of "0"

**Clarification Needed:** Client mentioned "contents... has to change according to the ui" - Need UI design mockups/specifications from client

---

### **Module 2: Users Module Fixes**

#### **AC4: Photo Capture Persistence Bug Fix**
- ✅ When user captures photo via webcam in "Add New User" form
- ✅ Photo preview displays immediately after capture
- ✅ Captured photo persists when "Save" button clicked
- ✅ Photo uploads to server and stores in database
- ✅ After user creation, photo visible in user profile
- ✅ Photo visible in Users list table (thumbnail)

**Current Bug:** Photo captured but not visible after save
**Root Cause:** Photo capture not properly connected to form state or upload logic missing

#### **AC5: Medical History Fields Alignment**
- ✅ "Add New User" → Medical History section fields must match Medical Incharge's "New Health Check-in" form
- ✅ Compare and align field structure:
  - Field names
  - Field types
  - Validation rules
  - Required/optional status
- ✅ Both forms use same medical data structure
- ✅ Ensure data consistency across Coach and Medical Incharge roles

**Current Issue:** Medical history fields in Coach's Add User form don't match Medical Incharge's health check-in form
**Action Required:** Review Medical Incharge module's health check-in form and replicate field structure

#### **AC6: Assigned Machine - Functionality Clarification**
- ✅ Document how machine assignment works (user guide)
- ✅ "Assigned Machines" dropdown populated with available machines
- ✅ Machines are pre-configured in system (Machine Management module)
- ✅ Coach can select multiple machines for a student
- ✅ Machine assignment saves correctly in user profile
- ✅ Display assigned machines in user details view

**Client Question:** "How to connect machine with playground? How to assign it?"
**Action Required:**
1. Verify Machine Management module exists and is accessible
2. Ensure machines can be created/configured by Admin
3. Implement multi-select dropdown for machine assignment
4. Create user guide explaining workflow

---

### **Module 3: Tasks Module Fixes**

#### **AC7: Create Task - Add "Date Created" Field**
- ✅ "Create New Task" form displays "Date Created" field
- ✅ Field is auto-populated with current date/time (read-only)
- ✅ Format: DD/MM/YYYY HH:MM (e.g., "11/11/2025 14:30")
- ✅ Timestamp captured in backend when task created
- ✅ "Date Created" displayed in task list view
- ✅ "Date Created" displayed in task details view
- ✅ Tasks sortable by creation date (default: newest first)

**Current Issue:** No timestamp field for when task was created
**Impact:** Cannot track when tasks were created or sort by creation date

#### **AC8: Assign To Section - Populate Users**
- ✅ "Assign To" dropdown populated with eligible users
- ✅ Show users based on task type:
  - General Tasks: All students in coach's assigned Balagruhas
  - Sports Tasks: Students assigned to coach
  - Academic Tasks: Students in coach's assigned Balagruhas
- ✅ Dropdown displays: User Name (User ID)
- ✅ Multi-select supported (assign task to multiple users)
- ✅ "Assign To" field required validation
- ✅ Backend saves task assignments correctly
- ✅ Assigned users receive task notifications

**Current Bug:** "Assign to section" dropdown is empty
**Root Cause:** Dropdown not fetching users from API or API endpoint not implemented
**Fix:** Implement API call to fetch users filtered by coach's Balagruha assignments

---

### **Module 4: Purchase Module (EXCLUDED FROM THIS STORY)**

**Client Note:** "We will see this tomorrow - need some time to analyze"
**Status:** Purchase module corrections already covered in Sprint 5 Stories 20-25
**Action:** Inform client that Purchase Manager workflow (Stories 20-25) is complete and deployed

---

## Technical Requirements

### **Backend Changes**

#### **1. Schedule Controller Updates**
```javascript
// Extend time range to 21:00
exports.getSchedule = async (req, res) => {
  const { month, year } = req.query; // NEW: Support month/year query params

  // Generate weekly view for selected month/year
  // Time slots: 07:00 - 21:00 (instead of 07:00 - 18:00)
};
```

#### **2. User Photo Upload Fix**
```javascript
// Ensure photo capture properly integrates with user creation
exports.createUser = async (req, res) => {
  const { photo, ...userData } = req.body;

  // Upload photo to storage (S3/local)
  const photoUrl = await uploadPhoto(photo);

  const user = new User({
    ...userData,
    photoUrl
  });

  await user.save();
};
```

#### **3. Task Creation - Add Timestamp**
```javascript
// Add createdAt timestamp (auto-generated by Mongoose)
const taskSchema = new mongoose.Schema({
  // ... existing fields
  createdBy: { type: ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }, // Auto-timestamp
  // ... other fields
});
```

#### **4. Task Assignment - User Dropdown API**
```javascript
// Get users for task assignment (filtered by coach's Balagruhas)
exports.getUsersForAssignment = async (req, res) => {
  const coachId = req.user._id;
  const coach = await User.findById(coachId).populate('balagruhaIds');

  const users = await User.find({
    role: 'student',
    balagruhaId: { $in: coach.balagruhaIds }
  }).select('name userId');

  res.json(users);
};
```

---

### **Frontend Changes**

#### **1. Dashboard - Month/Year Selector**
**File:** `frontend/src/views/CoachDashboard.jsx`

```jsx
// Replace arrow navigation with dropdowns
<div className="schedule-controls">
  <select value={selectedMonth} onChange={handleMonthChange}>
    {months.map(month => <option key={month.value} value={month.value}>{month.label}</option>)}
  </select>

  <select value={selectedYear} onChange={handleYearChange}>
    {years.map(year => <option key={year} value={year}>{year}</option>)}
  </select>
</div>

<WeeklyCalendar
  month={selectedMonth}
  year={selectedYear}
  timeSlots={generateTimeSlots(7, 21)} // 7 AM to 9 PM
/>
```

#### **2. Users - Photo Capture Fix**
**File:** `frontend/src/components/AddUserModal.jsx`

```jsx
const [capturedPhoto, setCapturedPhoto] = useState(null);

const handlePhotoCapture = (photoDataUrl) => {
  setCapturedPhoto(photoDataUrl);
  // Ensure photo is part of form state
  setFormData(prev => ({ ...prev, photo: photoDataUrl }));
};

// Display captured photo preview
{capturedPhoto && (
  <div className="photo-preview">
    <img src={capturedPhoto} alt="Captured" />
  </div>
)}
```

#### **3. Tasks - Assign To Dropdown**
**File:** `frontend/src/components/CreateTaskModal.jsx`

```jsx
const [assignableUsers, setAssignableUsers] = useState([]);

useEffect(() => {
  // Fetch users for assignment
  axios.get('/api/tasks/assignable-users')
    .then(res => setAssignableUsers(res.data))
    .catch(err => console.error(err));
}, []);

<select name="assignedTo" multiple>
  {assignableUsers.map(user => (
    <option key={user._id} value={user._id}>
      {user.name} ({user.userId})
    </option>
  ))}
</select>
```

---

## Testing Strategy

### **Unit Tests**

#### **Backend Tests**
```javascript
describe('Task Creation with Timestamp', () => {
  test('Should auto-generate createdAt timestamp', async () => {
    const task = await Task.create({
      title: 'Test Task',
      assignedTo: userId
    });

    expect(task.createdAt).toBeDefined();
    expect(task.createdAt).toBeInstanceOf(Date);
  });
});

describe('Photo Upload Integration', () => {
  test('Should save photo URL when creating user', async () => {
    const userData = {
      name: 'Test Student',
      photo: 'data:image/png;base64,...'
    };

    const user = await createUser(userData);
    expect(user.photoUrl).toBeDefined();
    expect(user.photoUrl).toContain('http');
  });
});
```

#### **Frontend Tests**
```javascript
describe('Month/Year Selector', () => {
  test('Should update calendar when month changed', () => {
    render(<CoachDashboard />);

    const monthSelect = screen.getByLabelText('Month');
    fireEvent.change(monthSelect, { target: { value: '11' } });

    expect(screen.getByText(/November/i)).toBeInTheDocument();
  });
});
```

### **Integration Tests**

**Test Scenario: Complete Task Creation Flow**
1. Coach opens Create Task modal
2. "Date Created" field auto-populated with current timestamp
3. "Assign To" dropdown loads students from coach's Balagruhas
4. Coach selects student, fills form, submits
5. Task created with timestamp and assignment
6. Student receives notification

### **E2E Tests (Playwright)**

```javascript
test('Coach can create task with assignment', async ({ page }) => {
  await page.goto('/coach/tasks');
  await page.click('text=Create New Task');

  // Verify date created field
  const dateField = await page.locator('input[name="dateCreated"]');
  expect(await dateField.inputValue()).toMatch(/\d{2}\/\d{2}\/\d{4}/);

  // Verify assign to dropdown populated
  await page.click('select[name="assignedTo"]');
  const options = await page.locator('select[name="assignedTo"] option').count();
  expect(options).toBeGreaterThan(0);

  // Complete and submit
  await page.fill('input[name="title"]', 'Test Task');
  await page.selectOption('select[name="assignedTo"]', { index: 0 });
  await page.click('button[type="submit"]');

  await expect(page.locator('text=Task created successfully')).toBeVisible();
});
```

---

## Dependencies

### **Story Dependencies**
- ❌ No dependencies on other Sprint 5 stories
- ✅ Independent fixes to Sprint 1 Coach View module

### **Technical Dependencies**
- ✅ Existing User model (Sprint 1)
- ✅ Existing Task model (Sprint 1)
- ✅ Existing Schedule model (Sprint 1)
- ✅ Existing WTF module (Sprint 2)
- ✅ Medical Incharge module for field alignment (Sprint 1)

### **External Dependencies**
- ⚠️ **UI Design Specifications** - Need mockups for dashboard content cards (AC3)
- ⚠️ **Machine Management Module** - Verify existence and accessibility (AC6)

---

## Questions for Client/PM

### **Critical Clarifications Needed:**

1. **Dashboard Content Cards (AC3):**
   - Q: "Contents... has to change according to the ui" - Can you provide UI design mockups or specifications?
   - Q: What specific changes are needed beyond updating counts from "0" to actual values?

2. **Assigned Machine (AC6):**
   - Q: Is the Machine Management module already built and accessible to Admins?
   - Q: How should the machine-student assignment workflow work?
   - Q: Should we create a user guide or in-app help documentation?

3. **Medical History Alignment (AC5):**
   - Q: Should we create a shared medical history component used by both Coach and Medical Incharge?
   - Q: Are there any field differences intentional (e.g., Coach sees less info than Medical Incharge)?

4. **WTF Module (AC9):**
   - Q: Is WTF module supposed to be fully accessible to Coach role, or limited functionality?
   - Q: What specific features should Coach be able to access in WTF?

5. **Purchase Module:**
   - Q: Confirm that Sprint 5 Stories 20-25 (Purchase Manager Workflow) cover all purchase-related corrections
   - Q: Any additional purchase module issues beyond what's already implemented?

---

## Implementation Notes

### **Priority Order**
1. **HIGH:** Photo capture bug (AC4) - User creation workflow broken
2. **HIGH:** Task assignment empty dropdown (AC8) - Task creation workflow broken
3. **MEDIUM:** Schedule time extension (AC2) - Feature limitation
4. **MEDIUM:** Task date created field (AC7) - Missing metadata
5. **MEDIUM:** Month/Year selector (AC1) - UX enhancement
6. **LOW:** Medical history alignment (AC5) - Data consistency
7. **LOW:** Dashboard content cards UI (AC3) - Visual polish (DEFERRED)
8. **TBD:** Assigned machine clarification (AC6) - Pending client response

### **Risk Assessment**

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| UI design specs not available for AC3 | High | Low | Defer AC3 pending client input |
| Machine Management module doesn't exist | Medium | Medium | Create lightweight machine management if needed |
| Medical history fields too different to align | Low | Low | Propose shared component architecture |
| Photo upload S3 integration issues | Low | Medium | Test with local storage fallback |

---

## Success Metrics

### **Functional Metrics**
- ✅ All 8 acceptance criteria pass QA gate
- ✅ Zero critical bugs in Coach View after fixes
- ✅ Photo capture success rate: 100%
- ✅ Task assignment success rate: 100%
- ✅ Schedule time extension functional: 7 AM - 9 PM available

### **Quality Metrics**
- ✅ 100% test coverage for all bug fixes
- ✅ E2E tests pass for all corrected workflows
- ✅ No new bugs introduced in adjacent modules
- ✅ Performance: No degradation in page load times

---

## Rollout Plan

### **Phase 1: Investigation & Planning (Day 1 Morning)**
- Review Sprint 1 codebase for Coach View module
- Investigate WTF module "nothing clickable" issue (console errors, permissions)
- Verify Machine Management module existence
- Request UI design mockups from client (AC3)
- Get clarifications on questions listed above

### **Phase 2: Critical Fixes (Day 1 Afternoon - Day 2)**
- Fix photo capture bug (AC4) - HIGH PRIORITY
- Fix task assignment dropdown (AC8) - HIGH PRIORITY

### **Phase 3: Enhancements (Day 3)**
- Extend schedule time to 9 PM (AC2)
- Add task created date field (AC7)
- Implement month/year selector (AC1)

### **Phase 4: Data Alignment & Polish (Day 4)**
- Align medical history fields (AC5)
- Update dashboard content cards UI (AC3) - if mockups received
- Document machine assignment workflow (AC6)

### **Phase 5: Testing & QA (Day 4-5)**
- Unit tests
- Integration tests
- E2E tests
- Manual QA validation
- Bug fixes

---

## Definition of Done

- [ ] All 8 acceptance criteria implemented and tested
- [ ] All critical bugs (photo capture, task assignment) fixed and verified
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] E2E tests written and passing (Playwright)
- [ ] QA gate passed (separate QA gate document)
- [ ] Code reviewed and approved
- [ ] Documentation updated (user guides if needed)
- [ ] Client questions answered and clarifications received
- [ ] Changes deployed to production
- [ ] Client sign-off received

---

## Related Documentation

- **Client Feedback:** `corrections/Coach View Corrections needed.pdf`
- **Medical Incharge Module:** (Sprint 1 - for medical history field alignment)
- **WTF Module:** (Sprint 2 - for functionality restoration)
- **Machine Management:** (TBD - verify module existence)

---

## Dev Agent Record

**Assigned To:** [Dev Agent Name]
**Started:** [Date/Time]
**Completed:** [Date/Time]
**Total Time:** [Duration]

### Implementation Log
```
[Timestamp] - Story 26 created and documented
[Timestamp] - Sprint 1 Coach View codebase reviewed
[Timestamp] - WTF module issue investigated - root cause identified
[Timestamp] - Photo capture bug fixed
[Timestamp] - Task assignment dropdown fixed
[Timestamp] - Schedule time extended to 21:00
[Timestamp] - Month/Year selector implemented
[Timestamp] - Task created date field added
[Timestamp] - Medical history fields aligned
[Timestamp] - Dashboard content cards UI updated
[Timestamp] - All tests passing
[Timestamp] - Ready for QA
```

---

## QA Results

**QA Agent:** [QA Agent Name]
**Tested:** [Date/Time]
**Status:** [Pass/Fail]

### Test Results Summary
| Test Category | Total | Passed | Failed | Blocked |
|---------------|-------|--------|--------|---------|
| Unit Tests (Backend) | X | X | X | X |
| Unit Tests (Frontend) | X | X | X | X |
| Integration Tests | X | X | X | X |
| E2E Tests | X | X | X | X |
| Manual Tests | X | X | X | X |

### Acceptance Criteria Validation
- [ ] AC1: Month/Year selector ✅/❌
- [ ] AC2: Schedule time to 9 PM ✅/❌
- [ ] AC3: Dashboard cards UI ✅/❌
- [ ] AC4: Photo capture fix ✅/❌
- [ ] AC5: Medical history alignment ✅/❌
- [ ] AC6: Machine assignment ✅/❌
- [ ] AC7: Task created date ✅/❌
- [ ] AC8: Task assignment dropdown ✅/❌

---

**Story Status:** Draft → Ready for Development → In Progress → Code Review → QA Testing → Done

**Last Updated:** 2025-11-11 12:27:37 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Updated By:** Orchestrator Agent - Removed AC9 (WTF Module) per client clarification - module is functional

