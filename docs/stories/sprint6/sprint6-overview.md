# Sprint 6: Coach View Corrections & Medical History Alignment

**Created:** 2025-11-11 13:48:56
**Sprint Type:** Corrections Sprint (Organizational Bucket)
**Methodology:** BMAD (Build-Measure-Analyze-Deploy)
**Status:** Planning Phase

---

## Sprint Overview

Sprint 6 is a **corrections sprint** created to systematically address client-reported issues and enhancements discovered during production use of the Coach dashboard (originally developed in Sprint 1). This sprint follows full BMAD methodology to ensure proper documentation, quality assurance, and traceability.

### Why Sprint 6 (Not Retrofit to Sprint 1)?

Sprint 1 was developed without BMAD methodology:
- No formal user stories or acceptance criteria
- Limited QA gates and test coverage
- No E2E test scenarios with Playwright MCP
- Difficult to trace changes and decisions

Sprint 6 provides:
- ✅ Full BMAD methodology with proper documentation
- ✅ Comprehensive QA gates and test coverage
- ✅ E2E testing with Playwright MCP
- ✅ Clear traceability and audit trail
- ✅ Systematic bug tracking and resolution

---

## Sprint 6 Stories

### **Sprint 6 Story 1: Coach View Corrections**
**File:** `sprint6-story-01-coach-view-corrections.md`
**Priority:** HIGH (2 critical bugs blocking Coach operations)
**Estimate:** 2-3 days
**Status:** Ready for Development

**Scope:**
- **Dashboard Module:** Month/year selector, time range extension (7 AM → 9 PM), content cards cleanup + count fixes
- **Users Module:** Photo capture bug fix
- **Tasks Module:** Assignment dropdown fix

**5 Acceptance Criteria:**
- AC1: Month/Year selector (dropdown navigation)
- AC2: Schedule time extension to 9 PM
- AC3: Dashboard content cards (remove specific cards + fix counts for remaining cards + Task Tracker enhancement)
- AC4: Photo capture bug fix
- AC8: Task assignment dropdown fix

**Critical Bugs:**
- Photo capture not saving (AC4)
- Task assignment dropdown empty (AC8)

---

### **Sprint 6 Story 2: Medical History Alignment**
**File:** `sprint6-story-02-medical-history-alignment.md`
**Priority:** MEDIUM (Important for data consistency across roles)
**Estimate:** 3-4 days
**Status:** Planning (Story creation in progress)

**Scope:**
Align Coach's "Add User" medical history fields with Medical Incharge's "Health Check-in" form to ensure consistent medical data collection across roles.

**Current State:**
- Medical Incharge uses comprehensive check-in form with: symptoms, doctor visits, follow-up tracking, file uploads
- Coach uses older/different medical history structure in user management
- Data model exists in `medicalCheckIns.js` (from Medical Check-in Enhancement)

**Requirements:**
- Compare existing field structures
- Determine shared vs role-specific fields
- Create alignment strategy (shared component vs separate with sync)
- Update Coach user edit forms
- Ensure backward compatibility with existing medical records

---

## Deferred Items (Future Stories)

### **Machine Assignment Workflow (AC6 - Deferred)**
**Reason:** Pending client clarification on requirements
**Questions:**
- Is there existing Machine Management module?
- Should we create assignment functionality or just documentation?
- What types of machines (laptops, tablets, other equipment)?

**Action:** Schedule client call to understand requirements before creating story

---

### **Removed Items**

#### **WTF Module (Originally AC9)**
**Status:** ❌ REMOVED
**Reason:** Client confirmed WTF module is functional - no fixes needed

#### **Task Created Date (Originally AC7)**
**Status:** ❌ REMOVED
**Reason:** Feature already exists - auto-timestamp visible in task details modal

---

## Sprint 6 Timeline & Strategy

### **Strategic Delivery Approach**
Per client direction: **Do small bugs first, then medical history last**

**Phase 1: Critical Bug Fixes (Day 1)**
- Story 1 AC4: Photo capture fix
- Story 1 AC8: Task assignment dropdown fix
- Quick QA and deployment

**Phase 2: Dashboard Enhancements (Day 2-3)**
- Story 1 AC1: Month/year selector
- Story 1 AC2: Schedule time extension
- Story 1 AC3: Content cards cleanup + enhancements
- Comprehensive QA with Playwright MCP

**Phase 3: Medical History Alignment (Day 4-7)**
- Story 2: Full medical history alignment
- Create shared component architecture
- Update Coach user forms
- Comprehensive testing across roles

---

## Client Clarifications Received

### ✅ **Dashboard Content Cards (AC3) - CLARIFIED**
**Question:** Remove cards OR fix counts?
**Client Answer:** BOTH actions required:

**Remove These Cards:**
- Syllabus tracker
- Slow learners
- Repairs
- Suggestions
- Activities
- Events

**Keep & Fix Counts:**
- Daily schedule
- Task tracker (with enhancement - see below)
- Medical
- Purchases
- ISF shop

**Task Tracker Enhancement:**
Show tasks created BY coach OR assigned TO coach, with modal/navigation to full task list.

---

### ✅ **WTF Module - CLARIFIED**
**Client:** "There is no issues with WTF. I manually checked it. It's functioning as perfectly as it should."
**Action:** Removed from Story 26/Sprint 6 Story 1 entirely

---

### ✅ **Purchase Module - CLARIFIED**
**Client:** "We will see this tomorrow - need some time to analyze"
**Resolution:** Already covered in Sprint 5 Stories 20-25 (Purchase Manager Workflow)
**Stories:** Category classification (Story 20), STOCK purchases (Story 21), date filters (Story 22), multi-role access (Story 23), approval thresholds (Story 24), order numbers (Story 25)

---

## Quality Assurance Strategy

### **BMAD Methodology Compliance**

**QA Gates:**
- Each story has dedicated QA gate YAML file
- Test cases mapped to acceptance criteria
- PASS/FAIL/CONCERNS decision framework
- Regression testing included

**E2E Testing:**
- Playwright MCP for programmatic browser control
- Test scenarios written by Dev Agent (markdown format)
- QA Agent executes via MCP tools
- Screenshots and console logs for verification

**Test Coverage Requirements:**
- Unit tests for all new/modified functions
- Integration tests for API endpoints
- E2E tests for all user workflows
- Regression tests for existing functionality

---

## Dependencies & Risks

### **Dependencies**
- Medical Check-in Enhancement (already deployed) - provides data model for Story 2
- Sprint 5 Stories 20-25 (already deployed) - Purchase module functionality
- Client mockups/wireframes for dashboard content cards (if design changes needed)

### **Risks**

| Risk | Severity | Mitigation |
|------|----------|------------|
| Photo capture bug may be environment-specific | Medium | Test across browsers and devices; check file upload permissions |
| Task assignment dropdown may have data issues | Medium | Verify student/coach data in database; check API responses |
| Medical history alignment may break existing records | HIGH | Thorough testing with production data backup; migration script if needed |
| Content cards count logic may require complex queries | Medium | Review existing dashboard service; optimize queries if needed |

---

## Documentation Artifacts

### **Story 1 Files**
- ✅ User Story: `sprint6-story-01-coach-view-corrections.md`
- ✅ QA Gate: `docs/qa/gates/sprint-6-story-01-coach-view-corrections.yml`
- ✅ E2E Test Scenarios: To be created by Dev Agent

### **Story 2 Files**
- ⏳ User Story: `sprint6-story-02-medical-history-alignment.md` (In Progress)
- ⏳ QA Gate: `docs/qa/gates/sprint-6-story-02-medical-history-alignment.yml` (Pending)
- ⏳ E2E Test Scenarios: To be created by Dev Agent

### **Supporting Documents**
- ✅ Sprint 6 Overview: This file
- ✅ Recommendation Document: `RECOMMENDATION-Story-26-Coach-View-Corrections.md` (to be updated for Sprint 6)
- 📸 Playwright Screenshots: 7 screenshots from Medical Manager exploration
- 📄 Reference: Medical Check-in Enhancement documentation

---

## Team Roles (BMAD)

### **Planning Phase**
- **Business Analyst:** Story creation, requirements gathering
- **Project Manager:** Sprint planning, timeline management
- **Solution Architect:** Technical design, alignment strategy
- **Product Owner:** Approval and prioritization

### **Core Development Cycle**
- **Scrum Master (SM):** Story coordination, blocker resolution
- **Dev Agent (James):** Implementation, unit tests, E2E test scenarios
- **Test Architect (Quinn):** QA gates, test execution via Playwright MCP, bug reporting

---

## Success Criteria

Sprint 6 is successful when:

✅ **Story 1 Complete:**
- Critical bugs fixed (photo capture, task assignment)
- Dashboard enhancements deployed (month/year selector, time extension, content cards)
- All 5 acceptance criteria met
- QA gate passed with PASS decision
- E2E tests passing

✅ **Story 2 Complete:**
- Medical history fields aligned across Coach and Medical Incharge roles
- Shared component architecture implemented
- Backward compatibility maintained
- Data migration (if needed) completed successfully
- QA gate passed with PASS decision

✅ **Client Approval:**
- UAT testing completed
- Client sign-off received
- No critical bugs reported

---

## Change Log

| Date | Time | Change | Updated By |
|------|------|--------|------------|
| 2025-11-11 | 13:48:56 | Sprint 6 created, overview document initialized | Orchestrator Agent |

---

**Last Updated:** 2025-11-11 13:48:56
**Document Owner:** Orchestrator Agent (BMad Orchestrator)
**Sprint Status:** Planning Phase
**Next Action:** Complete Story 1 migration from Sprint 5, create Story 2 documentation
