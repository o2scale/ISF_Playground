# Sprint 2 Developer Handoff - START HERE

**Created:** 2025-10-24 18:29:42
**Sprint:** Sprint 2 - LMS & Enhanced User Roles
**Total Stories:** 32 stories across 5 epics
**Your Mission:** Implement Sprint 2 stories one at a time following BMAD workflow

---

## 🚀 Quick Start (3 Steps)

### Step 1: Load Essential Context (Auto-loaded by BMAD)
Your BMAD agent will automatically load:
- `.ai/developer-onboarding-guide.md` - General workflow
- `.ai/workflow-quick-reference.md` - BMAD workflow rules
- `.bmad-core/agents/dev.md` - Your agent instructions

### Step 2: Read Sprint 2 Context (REQUIRED - Read Now)
```
📖 MUST READ (in order):
1. .ai/sprint-2/sprint-2-overview.md (15 min)
   → Understand Sprint 2 architecture and goals

2. .ai/sprint-2/epic-summaries.md (10 min)
   → Quick overview of all 5 epics

3. .ai/sprint-2/design-system-reference.md (10 min)
   → UI patterns and child-friendly design guidelines

4. .ai/sprint-2/technical-patterns.md (15 min)
   → Code patterns for React, MongoDB, WebSocket, etc.
```

### Step 3: Find Your First Story
```bash
# All Sprint 2 stories are in:
ls docs/stories/sprint2/

# Stories are organized by epic:
# Epic 01: epic-01-story-01 through epic-01-story-06
# Epic 02: epic-02-story-01 through epic-02-story-05
# Epic 03: epic-03-story-01 through epic-03-story-04
# Epic 04: epic-04-story-01 through epic-04-story-04
# Epic 05: epic-05-story-01 through epic-05-story-06

# RECOMMENDED START: Epic 02 Story 01 (Course Creation)
# This builds the foundation for all other stories
```

---

## 📋 Your Workflow for EACH Story

```
1. Read story file: docs/stories/sprint2/epic-XX-story-YY-{name}.md
   → Read ALL acceptance criteria (ACs)
   → Check visual diagrams in Section 1.5
   → Review technical implementation in Section 3

2. Implement feature
   → Backend: Create models, controllers, services, routes
   → Frontend: Create React components following design system
   → Follow technical patterns from .ai/sprint-2/technical-patterns.md

3. Write E2E test scenarios (MARKDOWN, not code)
   → File: docs/qa/e2e/epic-XX-story-YY-{name}.md
   → Minimum 1 test case per AC (typically 2-4 per AC)
   → Format: TC 1.1, TC 1.2, TC 1.3, etc.
   → Include: Preconditions, Steps, Expected Results, Screenshots

4. 🆕 Create quality gate YAML file (NEW REQUIREMENT!)
   → File: docs/qa/gates/sprint-2-epic-XX.story-YY-{slug}.yml
   → Define pass/fail criteria
   → Include test coverage requirement (>80%)
   → Specify critical ACs
   → Reference E2E test scenarios

5. Update Dev Agent Record section in story file
   → File List: List all files created/modified
   → Change Log: Document your changes
   → Completion Notes: Summary of implementation

6. Set status to "✅ READY FOR QA"

7. HALT - Wait for QA Agent to review
```

---

## 🎯 Sprint 2 Specific Guidelines

### Architecture Overview
Sprint 2 uses a **3-tier course hierarchy:**
```
Course (e.g., "Computer Apps")
├── Module 1 (e.g., "Introduction to MS Word")
│   ├── Chapter 1.1 ("Getting Started")
│   │   ├── Content Item 1.1.1 (Text/Image)
│   │   ├── Content Item 1.1.2 (Video)
│   │   └── Content Item 1.1.3 (Quiz)
│   └── Chapter 1.2 ("Basic Formatting")
│       └── ...
```

### Key Database Models (Create These)
```
Course, Module, Chapter, ContentItem
Progress, Quiz, QuizSubmission
Transaction (ISF Coins)
TimeLog (time tracking)
Notification, VoiceMessage
Broadcast, BroadcastRecipient
Query, Task, SLA
ErrorLog
```

### Technology Stack
**Backend:**
- Node.js 18 LTS + Express
- MongoDB + Mongoose
- API namespace: `/api/v2/` (Sprint 2)
- WebSocket for real-time updates
- AWS S3 + CloudFront CDN for media

**Frontend:**
- React 19.0.0
- TailwindCSS
- Patrick Hand font (for student UI only)
- Recharts for analytics
- React Hot Toast for notifications

### Role-Specific UI Patterns

**Student UI (Child-Friendly):**
```jsx
// Large buttons, bright colors, emojis
<button className="px-8 py-4 bg-gradient-to-br from-green-400 to-blue-500 text-white text-lg font-['Patrick_Hand'] rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
  Start Learning! 🚀
</button>

// Large course cards
<div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-md p-8 hover:shadow-xl transform hover:scale-105 transition-all cursor-pointer border-4 border-blue-200">
  <div className="text-6xl mb-4">💻</div>
  <h3 className="text-2xl font-bold font-['Patrick_Hand']">Computer Apps</h3>
</div>
```

**Admin/Coach UI (Professional):**
```jsx
// Standard buttons, tables, professional styling
<button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  Create Course
</button>

// Data tables
<div className="bg-white rounded-xl shadow-sm border border-gray-200">
  <table className="w-full">
    <thead className="bg-gray-50">...</thead>
    <tbody>...</tbody>
  </table>
</div>
```

---

## 📊 Story Dependencies (Development Order)

### CRITICAL: Start with These Foundation Stories

**1. MUST START HERE:**
```
Epic 02 Story 01: Course Creation & Structure Builder
→ This creates the Course/Module/Chapter models
→ All other stories depend on this
```

**2. THEN DO:**
```
Epic 02 Story 02: Content Management Module
→ Creates ContentItem model
→ Enables adding text, images, videos, quizzes
```

**3. THEN DO:**
```
Epic 02 Story 03: Quiz System & Assessment Builder
→ Creates Quiz, Question, Answer models
→ Enables quiz functionality
```

**4. NOW YOU CAN DO IN PARALLEL:**
```
Epic 01 Stories (Student Experience) - depends on Epic 02 Stories 1-3
Epic 03 Stories (Coach Functionality) - depends on Course models
Epic 04 Stories (Amma Enhancement) - independent
Epic 05 Stories (System Features) - mostly independent
```

### Dependency Chain
```
Epic 02 Story 01 (Course Creation)
    ↓
Epic 02 Story 02 (Content Management)
    ↓
Epic 02 Story 03 (Quiz Builder)
    ↓
Epic 01 Story 01 (Student Homepage) ← Students can now view courses
    ↓
Epic 01 Story 02 (Computer Apps) ← Students can take quizzes
```

---

## 🆕 NEW: Quality Gate YAML File (REQUIRED!)

For every story, you must now create a quality gate YAML file.

**Location:** `docs/qa/gates/sprint-2-epic-{N}.story-{M}-{slug}.yml`

**Example:** `docs/qa/gates/sprint-2-epic-02.story-01-course-creation.yml`

**Template:**
```yaml
schema: 1
story: 'sprint-2-epic-02.story-01'
story_title: 'Course Creation & Structure Builder'
gate: PENDING  # QA will update to PASS/CONCERNS/FAIL
status_reason: 'Awaiting QA review'
reviewer: 'TBD'
updated: '2025-10-24T18:30:00Z'

quality_criteria:
  test_coverage_required: 80  # Minimum % of code coverage
  critical_acs: [1, 2, 3, 5, 8]  # Must pass ACs (by number)
  e2e_scenarios_path: 'docs/qa/e2e/epic-02-story-01-course-creation.md'

acceptance_criteria_map:
  - ac_number: 1
    description: 'Admin can create new course with name, description, category'
    test_cases: ['TC 1.1', 'TC 1.2', 'TC 1.3']
    priority: 'P0'
  - ac_number: 2
    description: 'Course name is required and validated'
    test_cases: ['TC 2.1', 'TC 2.2']
    priority: 'P0'
  # ... map all ACs

pass_criteria:
  - 'All critical ACs (1, 2, 3, 5, 8) must pass'
  - 'Test coverage >= 80%'
  - 'No P0 or P1 bugs'
  - 'All E2E test scenarios executed successfully'
  - 'No console errors in browser'
  - 'Responsive design verified (mobile, tablet, desktop)'

fail_criteria:
  - 'Any critical AC fails'
  - 'Test coverage < 80%'
  - 'Security vulnerability found'
  - 'Data loss risk identified'
  - 'Any P0 bug found'
```

**What to Include:**
1. `critical_acs`: List AC numbers that are most important
2. `test_coverage_required`: Set to 80 or higher
3. `acceptance_criteria_map`: Map each AC to test cases
4. `pass_criteria`: Clear rules for PASS
5. `fail_criteria`: Clear rules for FAIL

---

## 📖 File Structure Reference

```
docs/
├── epics/sprint2/
│   ├── MPSD-sprint2.md                    # Master planning doc
│   ├── design-system-sprint2.md           # Full design system
│   └── epic-XX-{name}.md                  # Epic-level docs
│
├── stories/sprint2/
│   └── epic-XX-story-YY-{name}.md         # Your story requirements
│
└── qa/
    ├── e2e/
    │   └── epic-XX-story-YY-{name}.md     # E2E test scenarios YOU write
    └── gates/
        └── sprint-2-epic-XX.story-YY-{slug}.yml  # Quality gate YOU create

.ai/sprint-2/
├── README.md                               # Context index
├── sprint-2-overview.md                    # Sprint 2 architecture
├── epic-summaries.md                       # Epic quick reference
├── design-system-reference.md              # UI patterns quick ref
└── technical-patterns.md                   # Code patterns quick ref

backend/
├── models/                                 # MongoDB schemas
│   ├── Course.js                          # YOU CREATE
│   ├── Module.js                          # YOU CREATE
│   └── ...
├── controllers/                            # Route handlers
│   └── courseController.js                # YOU CREATE
├── services/                               # Business logic
│   └── courseService.js                   # YOU CREATE
└── routes/v2/                             # API routes (Sprint 2)
    └── courses.js                         # YOU CREATE

frontend/src/
├── components/
│   ├── student/                           # Student UI components
│   ├── admin/                             # Admin UI components
│   ├── coach/                             # Coach UI components
│   └── common/                            # Shared components
└── pages/
    ├── StudentDashboard.jsx               # YOU CREATE
    ├── AdminCourseBuilder.jsx             # YOU CREATE
    └── ...
```

---

## ⚠️ Critical Rules (Must Follow!)

### Brownfield Approach
```
✅ DO: Create new Sprint 2 files in /api/v2/ namespace
✅ DO: Reference Sprint 1.1 models (Student, User, Balagruha, etc.)
❌ DON'T: Modify Sprint 1.1 code
❌ DON'T: Change existing /api/v1/ endpoints
```

### Testing
```
✅ DO: Write E2E test scenarios (markdown)
✅ DO: Create quality gate YAML file
✅ DO: One test case per AC minimum
❌ DON'T: Write .spec.js test code
❌ DON'T: Run npx playwright test
```

### Workflow
```
✅ DO: One story at a time
✅ DO: HALT after "READY FOR QA"
✅ DO: Follow design system exactly
❌ DON'T: Start next story before current is DONE
❌ DON'T: Skip visual diagrams in story
```

---

## 🔧 Common Patterns (Copy-Paste Ready)

### MongoDB Aggregation Pipeline
```javascript
const analytics = await Progress.aggregate([
  { $match: { courseId: mongoose.Types.ObjectId(courseId) } },
  { $lookup: { from: 'students', localField: 'studentId', foreignField: '_id', as: 'student' } },
  { $unwind: '$student' },
  { $group: { _id: '$status', count: { $sum: 1 } } },
]);
```

### React Component Pattern
```jsx
import React, { useState, useEffect } from 'react';
import { courseService } from '../../services/courseService';
import { toast } from 'react-hot-toast';

const CourseDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getCourses();
      setCourses(data);
    } catch (error) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>
      {/* Component content */}
    </div>
  );
};

export default CourseDashboard;
```

### WebSocket Notification
```javascript
// Server-side
const { io } = require('../server');
io.to(`user_${userId}`).emit('notification', { type: 'quiz_graded', data: {...} });

// Client-side
socket.on('notification', (data) => {
  toast.success(data.message);
});
```

---

## 📝 Example: Complete Story Workflow

**Story:** Epic 02 Story 01 - Course Creation

### 1. Read Story
```bash
cat docs/stories/sprint2/epic-02-story-01-course-creation-structure-builder.md
# Read all 50+ acceptance criteria
# Review 8 visual diagrams
# Study technical implementation section
```

### 2. Implement
```bash
# Backend
touch backend/models/Course.js
touch backend/models/Module.js
touch backend/models/Chapter.js
touch backend/controllers/courseController.js
touch backend/services/courseService.js
touch backend/routes/v2/courses.js

# Frontend
touch frontend/src/components/admin/CourseBuilder.jsx
touch frontend/src/components/admin/ModuleEditor.jsx
touch frontend/src/components/admin/ChapterManager.jsx
touch frontend/src/services/courseService.js
```

### 3. Write E2E Test Scenarios
```bash
# Create: docs/qa/e2e/epic-02-story-01-course-creation.md
# Include 50+ test cases (1 per AC minimum)
# Format: TC 1.1, TC 1.2, etc.
# Each test case: Preconditions, Steps, Expected Results, Screenshots
```

### 4. Create Quality Gate YAML
```bash
# Create: docs/qa/gates/sprint-2-epic-02.story-01-course-creation.yml
# Define critical ACs: [1, 2, 3, 5, 8, 10]
# Set test coverage: 80%
# Map all ACs to test cases
```

### 5. Update Story File
```markdown
## Dev Agent Record

### Files Created/Modified
- backend/models/Course.js
- backend/models/Module.js
- backend/controllers/courseController.js
- frontend/src/components/admin/CourseBuilder.jsx
- docs/qa/e2e/epic-02-story-01-course-creation.md
- docs/qa/gates/sprint-2-epic-02.story-01-course-creation.yml

### Change Log
- Created Course, Module, Chapter MongoDB schemas
- Implemented course creation API endpoints
- Built CourseBuilder React component
- Wrote 52 E2E test scenarios covering all ACs
- Created quality gate YAML with 80% coverage requirement

### Completion Notes
All 50 acceptance criteria implemented. Course creation workflow complete with 3-tier hierarchy support.

## Status
✅ READY FOR QA
```

---

## 🆘 Need Help?

### Quick References (Already Loaded)
- `.ai/developer-onboarding-guide.md` - General workflow
- `.ai/workflow-quick-reference.md` - BMAD rules
- `.ai/playwright-mcp-tools-reference.md` - MCP tools (for reference)

### Sprint 2 Specific (Read These!)
- `.ai/sprint-2/sprint-2-overview.md` - Architecture & goals
- `.ai/sprint-2/design-system-reference.md` - UI patterns
- `.ai/sprint-2/technical-patterns.md` - Code patterns
- `.ai/sprint-2/epic-summaries.md` - Epic overviews

### Story Documentation
- `docs/epics/sprint2/` - Epic-level details
- `docs/stories/sprint2/` - Story requirements
- `docs/epics/sprint2/design-system-sprint2.md` - Full design system

---

## ✅ Pre-Flight Checklist

Before starting your first story:

```
□ Read .ai/sprint-2/sprint-2-overview.md (15 min)
□ Read .ai/sprint-2/epic-summaries.md (10 min)
□ Read .ai/sprint-2/design-system-reference.md (10 min)
□ Read .ai/sprint-2/technical-patterns.md (15 min)
□ Understand 3-tier course hierarchy (Course → Module → Chapter)
□ Know the difference between student UI (child-friendly) vs admin UI (professional)
□ Understand new requirement: Create quality gate YAML file
□ Servers running (backend:5001, frontend:3000)
□ Git on feature/sprint-2 branch
□ Ready to start with Epic 02 Story 01 (Course Creation)
```

---

## 🎯 Success Criteria

You're successful when:
1. Story fully implements all ACs
2. E2E test scenarios written (markdown, 1+ per AC)
3. Quality gate YAML file created with criteria
4. Design system followed exactly
5. Code follows technical patterns
6. Dev Agent Record updated
7. Status set to "READY FOR QA"

---

**Now activate your Dev agent and start with Epic 02 Story 01!**

```bash
claude --agent dev
# Say: "I'm ready to start Sprint 2, Epic 02 Story 01: Course Creation"
```

**Good luck! 🚀**

---

**Version:** 1.0
**Created:** 2025-10-24 18:29:42
**For:** Sprint 2 Developer Onboarding
