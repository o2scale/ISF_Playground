# Sprint 2 Comparison Report: Epic 03 (Coach Functionality)

**Date:** January 28, 2026
**Epic:** [SPRINT2-EPIC-03] LMS Coach Functionality
**MPSD:** Sprint 2-5 Combined MPSD (v3.0)

## 1. Executive Summary

This report analyzes the alignment between the defined Epic requirements, the Master Project Specification Document (MPSD), and the current state of the codebase.

**Key Findings:**
- **Codebase Gaps:** The codebase currently **lacks implementation for Story 03 (Manual Awards)** and **Story 04 (Coach Reporting)**. The associated controllers and routes were found to be deleted or missing.
- **Implemented Features:** **Story 01 (Assignments)** and **Story 02 (Grading)** are **FULLY IMPLEMENTED** and **DB INTEGRATED** in `coachAssignmentController.js` and `coachGradingController.js`.
- **MPSD Alignment:** The MPSD generally supports the Epic, but is less explicit about "Standalone Manual Awards" (Story 03) compared to the Epic. The MPSD *adds* a requirement for "Voice Note Feedback" in grading (Section 14) which is not explicitly detailed in the Epic's Story 02.
- **Implementation Status:** **Partially Complete.** Stories 01 & 02 are Production Ready. Stories 03 & 04 are Missing.

## 2. Detailed Gap Analysis

| Feature Area | Epic Requirement (Story) | MPSD Specification | Codebase State | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Course Assignment** | **Story 01:** Assign to Balagruha/Student, Due Dates, Notifications. | **Supported:** "Course Assignment (Admin & Coach): Flexible assignment to Balagruhas and individual students" (Line 94). | **Present (Real):** `coachAssignmentController.js` implements full assignment workflow with Notifications. | ✅ **Complete** |
| **Grading Interface** | **Story 02:** Filter submissions, Preview Art/Video/Audio, Quality Rating, Coin Award, Text Feedback. | **Supported & Enhanced:** Section 14 details "Syllabus Tracker". **Difference:** MPSD specifies **Voice Note Feedback** option (Line 626), Epic only mentions Text. | **Present (Real):** `coachGradingController.js` implements grading, coins, and feedback. | ✅ **Complete** |
| **Manual Coin Awards** | **Story 03:** **Standalone** modal to award coins for behavior/extra effort (Reason + Amount). | **Implied/Vague:** Mentioned in Coach Persona (Line 69 "manually awards ISF Coins"). Section 14 links coin awards primarily to *Grading*. No specific "Standalone Award" spec found. | **MISSING:** Controller (`manualAwardController.js`) and Routes (`awards.js`) are deleted/absent. `manual_award` enum removed from `coin.js`. | ❌ **Critical Gap** |
| **Coach Reporting** | **Story 04:** Balagruha-scoped dashboard (Completion, Coins, Leaderboard). | **Supported:** "Course Reporting System (Admin & Coach): Performance dashboards" (Line 98). | **MISSING:** Controller (`coachReportsController.js`) and Routes (`reports.js`) are deleted/absent. | ❌ **Critical Gap** |

## 3. Analysis by Story

### Story 01: Course Assignment Interface
*   **Codebase:** `coachAssignmentController.js` is fully implemented using `CourseAssignment` model. Supports filtering, assignment to Balagruha/Student, and Notifications.
*   **Gap:** None.

### Story 02: Syllabus Tracker & Grading
*   **Codebase:** `coachGradingController.js` is fully implemented using `Submission` model. Supports grading, coins, and text feedback.
*   **Gap:** "Voice Note Feedback" (MPSD requirement) is not in the current controller logic, only text feedback.

### Story 03: Manual ISF Coin Award System
*   **Epic:** Defined as Story 03 (Standalone feature).
*   **MPSD:** Vague. Primarily associates awards with grading. Does not explicitly detail the "Award Coins Modal" described in the Epic.
*   **Codebase:** **Completely Missing.** The implementation for this was removed.
*   **Action:** Needs re-implementation strictly following Epic Story 03, as MPSD is less detailed here but implies the capability in the Persona description.

### Story 04: Coach Reporting Dashboard
*   **Epic:** Defined as Story 04.
*   **MPSD:** Clearly defined as "Course Reporting System (Admin & Coach)" in Line 98.
*   **Codebase:** **Completely Missing.** The implementation for this was removed.
*   **Action:** Needs re-implementation.

## 4. Recommendations

1.  **Re-implement Story 03 & 04:** Restore or rewrite `manualAwardController.js` and `coachReportsController.js` to fulfill Epic requirements, as these are critical missing pieces in the code.
2.  **Enhance Grading (Story 02):** Update the grading logic to support **Voice Note Feedback** as specified in the MPSD (Section 14), bridging the gap with the Epic.
3.  **Restore Helper Models:** Ensure any required Enums (like `manual_award` in `Coin` model) that were removed are restored to support Story 03.

---
**Prepared By:** Antigravity (Dev Agent)
