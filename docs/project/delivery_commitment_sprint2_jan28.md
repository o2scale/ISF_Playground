# Delivery Commitment: Sprint 2 - Epic 1 & Epic 3

**Date:** January 28, 2026
**To:** Client Stakeholders
**From:** ISF Development Team

## Executive Summary

This document outlines the delivery schedule for the completion of Sprint 2, specifically focusing on **Epic 1 (Student Experience)** and **Epic 3 (Coach Functionality)**. Our team has committed to an aggressive timeline to close the remaining technical gaps and deliver production-ready features by early February.

## Delivery Schedule

| Release Milestone | Scope | Delivery Date | Client Review TAT |
| :--- | :--- | :--- | :--- |
| **Release 2.1** | **Epic 1: Student Experience**<br>*(Full DB Integration for Art, Apps, Voice, Quiz)* | **February 2, 2026 (Monday)** | 48 Hours<br>*(Due: Feb 4)* |
| **Release 2.2** | **Epic 3: Coach Functionality**<br>*(Manual Awards, Reporting, Grading)* | **February 4, 2026 (Wednesday)** | 48 Hours<br>*(Due: Feb 6)* |

---

## Detailed Scope of Delivery

### 1. Release 2.1 - Epic 1: Student Experience (Feb 2)
The current "Mock Data" implementation will be replaced with a fully functional Database-backed architecture.

*   **Student Dashboard:** Real-time Coin Balance, Active Course Tracking from DB.
*   **Computer Apps Course:** Dynamic task unlocking based on `StudentProgress` records.
*   **Art Course:** Functional "Artweaver Bridge" integration and S3 uploads for artwork.
*   **Life Skills:** Voice Recording submissions responding to dynamic questions from DB.
*   **Spoken English:** Video submissions stored in S3 and linked to Coach Grading queue.

**Verification Criteria:**
*   Student logs in → Progress persists across sessions.
*   Submissions appear immediately in the Coach Dashboard (Release 2.2).

### 2. Release 2.2 - Epic 3: Coach Functionality (Feb 4)
Enabling the feedback loop for student submissions.

*   **Assignments:** Coach can assign courses to specific Balagruhas or students.
*   **Grading Interface:** View Student Art/Video submissions, play media, and grade.
*   **Manual Awards (NEW):** Feature to award ISF Coins for behavioral achievements.
*   **Reporting (NEW):** Balagruha-level dashboards showing completion rates and leaderboards.

**Verification Criteria:**
*   Coach sees the exact submission the student created in Release 2.1.
*   Grading a submission updates the Student's Coin Balance immediately.

---

## Client Responsibilities & Turnaround Time (TAT)

To maintain momentum for Sprint 3, we request a **48-hour Turnaround Time (TAT)** for feedback on each release.

*   **Epic 1 Feedback Due:** February 4 (Wednesday)
*   **Epic 3 Feedback Due:** February 6 (Friday)

**Note:** Critical blockers reported within the TAT will be prioritized for immediate hotfixes. Cosmetic or non-blocking feedback will be scheduled for the Sprint 3 hardening phase.

---

**Signed,**
ISF Development Team
