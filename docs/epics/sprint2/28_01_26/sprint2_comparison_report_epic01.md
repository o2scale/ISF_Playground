# Sprint 2 Comparison Report: Epic 01 (Student Experience)

**Date:** January 28, 2026
**Epic:** [SPRINT2-EPIC-01] LMS Student Experience
**MPSD:** Sprint 2-5 Combined MPSD (v3.0)

## 1. Executive Summary

This report analyzes the alignment between the defined Epic requirements, the Master Project Specification Document (MPSD), and the current state of the codebase.

**Key Findings:**
- **Codebase Scope:** The backend codebase has controllers for Stories 01-05, BUT they are **Mock Implementations** yielding static JSON data. They are **NOT** integrated with the MongoDB `Course`, `ContentItem`, or `StudentProgress` models.
- **MPSD Alignment:** The robust requirements for real-time progress, ranking, and file upload (S3) are **NOT** functionally implemented in these controllers.
- **Implementation Status:** **Partially Complete (Mock Only).** The API surface exists but the business logic is a placeholder.

## 2. Detailed Gap Analysis

| Feature Area | Epic Requirement (Story) | MPSD Specification | Codebase State | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Student Dashboard** | **Story 01:** Title bar (Coin Balance, Timer), Toolbar (Emojis, Voice Chat), Course Categories. | **Enhanced:** Section 8 Detailed breakdown of UI components and API endpoints. | **Partial (Mock):** `studentDashboardController.js` returns mock JSON. No DB queries. | ⚠️ **Mock Only** |
| **Computer Apps** | **Story 02:** Three-pane layout, App/Level/Task hierarchy, Tool launch (Tux, GCompris). | **Detailed:** Section 9 specifies 3-pane layout, state management, and ranking aggregation. | **Partial (Mock):** `computerAppsController.js` returns static `apps` array. No real progress tracking. | ⚠️ **Mock Only** |
| **Art Course** | **Story 03:** 4 modes (Workshop, Free, Story, Comp), Artweaver integration, Real-time mirror. | **Detailed:** Section 10 details "Artweaver Bridge" architecture and Electron IPC calls. | **Partial (Mock):** `artCourseController.js` returns static `workshops` and `stories`. No S3 upload logic. | ⚠️ **Mock Only** |
| **Spoken English** | **Story 04:** Video recording (WebRTC), Playback, Submission. | **Detailed:** Section 11 details VideoRecorder object and WebRTC constraints. | **Partial (Mock):** `spokenEnglishController.js` returns mock task data. | ⚠️ **Mock Only** |
| **Life Skills** | **Story 05:** Voice note responses (WhatsApp style), MCQs, Delayed feedback. | **Detailed:** Section 12 details press-and-hold voice recording. | **Partial (Mock):** `lifeSkillsController.js` uses `mockVoiceQuestions` array. | ⚠️ **Mock Only** |
| **Coin Wallet** | **Story 06:** Real-time balance, Transaction history, Animations. | **Supported:** Section 16 & Global UI. | **Present:** Shared Coin controller (seemingly real DB). | ✅ **Complete** |

## 3. Analysis by Story

### Story 01: Student Homepage & Course Navigation
*   **Codebase:** `studentDashboardController.js` handles dashboard data fetching. `dashboard.js` routes are mounted.
*   **Gap:** None identified at architecture level.

### Story 02: Computer Apps Course Interaction
*   **Codebase:** `computerAppsController.js` handles app/level/task data.
*   **Gap:** Verify if "Launch external tools" IPC logic is accounted for in Electron main process (outside scope of backend controller).

### Story 03: Art Course + Artweaver Integration
*   **Codebase:** `artCourseController.js` accounts for art modes and submissions.
*   **Gap:** Verify "Real-time canvas mirroring" implementation on frontend/Electron side. Backend just needs to receive the final submission.

### Story 04: Spoken English Video Recording
*   **Codebase:** `spokenEnglishController.js` handles video submission uploads.
*   **Gap:** None. Backend standard file upload.

### Story 05: Life Skills Voice Responses
*   **Codebase:** `lifeSkillsController.js` handles voice submissions.
*   **Gap:** None.

## 4. Recommendations
1.  **Replace Mocks with Real DB Logic:** Major effort required to refactor `lms/student` controllers to query the `Course` and `StudentProgress` collections instead of returning static JSON.
2.  **Implement S3 Uploads:** Current controllers return mock S3 URLs. Real `aws-sdk` integration is needed for Art/Video/Voice submissions.
3.  **Frontend Integration:** Ensure frontend calls these endpoints but be aware the data is currently static.

---
**Prepared By:** Antigravity (Dev Agent)
