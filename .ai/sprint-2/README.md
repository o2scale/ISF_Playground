# Sprint 2 Context Documentation

**Last Updated:** 2025-10-24 17:45:28
**Sprint:** Sprint 2 - LMS & Enhanced User Roles
**Status:** Story Documentation Complete (32/32 stories)

---

## Overview

This directory contains comprehensive context documentation for **Sprint 2** of the ISF Playground project. Sprint 2 focuses on building a complete Learning Management System (LMS) with enhanced roles for Students, Admins, Coaches, Ammas, and introducing the new Playground Manager role.

## Sprint 2 Structure

**Total Stories:** 32 across 5 Epics

### Epic 01: LMS Student Experience (6 stories)
Student-facing LMS features including course navigation, interactive learning modules, and ISF Coin wallet.

### Epic 02: LMS Admin Course Management (5 stories)
Admin tools for creating, managing, and publishing courses with translation and quiz systems.

### Epic 03: LMS Coach Functionality (4 stories)
Coach interfaces for course assignment, syllabus tracking, grading, and reporting.

### Epic 04: Amma Role Enhancement (4 stories)
Enhanced Amma portal with individual accounts, query management, and SLA-based task system.

### Epic 05: System-Wide Features (6 stories)
Cross-cutting features including notifications, voice communication, broadcasts, WhatsApp integration, error handling, and reporting.

---

## Context Files in This Directory

### 1. `sprint-2-overview.md`
High-level overview of Sprint 2 goals, architecture, and dependencies.

### 2. `epic-01-lms-student-context.md`
Detailed context for Epic 01: LMS Student Experience
- Student homepage and course navigation
- Course-specific interactions (Computer Apps, Art, Spoken English, Life Skills)
- ISF Coin wallet and accumulation system

### 3. `epic-02-lms-admin-context.md`
Detailed context for Epic 02: LMS Admin Course Management
- Course creation and structure builder
- Content management module
- Quiz system and assessment builder
- Translation module
- Publishing and archiving workflow

### 4. `epic-03-lms-coach-context.md`
Detailed context for Epic 03: LMS Coach Functionality
- Course assignment interface
- Syllabus tracker and grading interface
- Manual ISF Coin award system
- Coach reporting dashboard

### 5. `epic-04-amma-enhancement-context.md`
Detailed context for Epic 04: Amma Role Enhancement
- Individual Amma accounts with self-registration
- Enhanced query management
- SLA-based task management with auto-reassignment
- Amma dashboard (client UI)

### 6. `epic-05-system-features-context.md`
Detailed context for Epic 05: System-Wide Features
- In-app notification center
- Voice communication infrastructure
- Admin broadcast system (Mann ki Baat)
- WhatsApp integration for schedule delivery
- Playground Manager role and error handling
- Course reporting system

### 7. `design-system-reference.md`
Quick reference for Sprint 2 design system including:
- Color palette and typography
- Component library patterns
- Responsive breakpoints
- Child-friendly UI guidelines

### 8. `technical-patterns.md`
Common technical patterns used across Sprint 2:
- React 19 with hooks patterns
- MongoDB aggregation pipelines
- WebSocket real-time updates
- File upload and CDN integration
- Error handling and logging

---

## How to Use This Documentation

### For Development Agents
1. Start with `sprint-2-overview.md` for high-level understanding
2. Read the specific epic context file for the story you're implementing
3. Reference `design-system-reference.md` for UI/UX patterns
4. Reference `technical-patterns.md` for backend implementation patterns
5. Consult individual story files in `docs/stories/sprint2/` for detailed acceptance criteria

### For QA Agents
1. Review `sprint-2-overview.md` for overall sprint context
2. Read relevant epic context file to understand feature relationships
3. Use story files for acceptance criteria and test scenarios
4. Reference design system for visual regression testing
5. Create E2E tests covering all acceptance criteria

### For Orchestrator Agents
1. Use this README for sprint progress tracking
2. Reference epic context files for dependency management
3. Coordinate work across epics using story dependencies
4. Monitor quality gates and test coverage

---

## Sprint 2 Dependencies

### From Sprint 1.1
- RBAC system (roles, permissions, scope-based filtering)
- Facial Recognition system (for student authentication)
- User models (Student, Coach, Admin, Amma)
- Balagruha and attendance models

### External Systems
- AWS S3 + CDN (for media file storage)
- Twilio WhatsApp API (for automated messaging)
- Electron.js (desktop application wrapper)
- MongoDB (primary database)
- Node.js/Express (backend API)

---

## Key Metrics

**Total Stories:** 32
**Total Acceptance Criteria:** 3,200+ across all stories
**Estimated Development Time:** 300-400 hours
**Visual Diagrams Created:** 160+ ASCII diagrams
**React Components:** 120+ new components
**API Endpoints:** 80+ new endpoints
**MongoDB Schemas:** 25+ new/updated schemas

---

## Story Documentation Locations

All story documents are located in:
```
docs/stories/sprint2/
├── epic-01-story-01-student-homepage-course-navigation.md
├── epic-01-story-02-computer-apps-course-interaction.md
├── epic-01-story-03-art-course-artweaver-integration.md
├── epic-01-story-04-spoken-english-video-recording.md
├── epic-01-story-05-life-skills-voice-responses.md
├── epic-01-story-06-isf-coin-wallet.md
├── epic-02-story-01-course-creation-structure-builder.md
├── epic-02-story-02-content-management-module.md
├── epic-02-story-03-quiz-assessment-builder.md
├── epic-02-story-04-translation-module.md
├── epic-02-story-05-course-publishing-archiving.md
├── epic-03-story-01-course-assignment-interface.md
├── epic-03-story-02-syllabus-tracker-grading.md
├── epic-03-story-03-manual-coin-award-system.md
├── epic-03-story-04-coach-reporting-dashboard.md
├── epic-04-story-01-individual-amma-accounts-self-registration.md
├── epic-04-story-02-enhanced-query-management.md
├── epic-04-story-03-sla-task-management-auto-reassignment.md
├── epic-04-story-04-amma-dashboard-client-ui.md
├── epic-05-story-01-in-app-notification-center.md
├── epic-05-story-02-voice-communication-infrastructure.md
├── epic-05-story-03-admin-broadcast-system.md
├── epic-05-story-04-whatsapp-integration.md
├── epic-05-story-05-pm-error-handling.md
└── epic-05-story-06-course-reporting-system.md
```

---

## Epic and MPSD Documentation Locations

### Master Planning and Strategy Document (MPSD)
```
docs/epics/sprint2/MPSD-sprint2.md
```

### Epic-Level Documents
```
docs/epics/sprint2/
├── epic-01-lms-student-experience.md
├── epic-02-lms-admin-course-management.md
├── epic-03-lms-coach-functionality.md
├── epic-04-amma-role-enhancement.md
└── epic-05-system-wide-features.md
```

### Design System Document
```
docs/epics/sprint2/design-system-sprint2.md
```

---

## Workflow for Developers

When implementing a Sprint 2 story:

1. **Read Context Files**
   - Sprint 2 overview
   - Relevant epic context
   - Design system reference
   - Technical patterns

2. **Read Story Document**
   - User story and acceptance criteria
   - Visual diagrams
   - Technical implementation details
   - Task breakdown

3. **Implement**
   - Follow design system guidelines
   - Use established technical patterns
   - Write code with proper error handling
   - Create tests as you develop

4. **Create E2E Tests**
   - Write comprehensive E2E tests covering all acceptance criteria
   - Create quality gate YAML file
   - Ensure test coverage >80%

5. **QA Handoff**
   - Mark story as "Ready for QA"
   - Provide QA with test instructions
   - Share any edge cases or known issues

---

## Contact and Support

For questions about Sprint 2 context documentation:
- Check this README first
- Review relevant epic context file
- Consult story documents for specific acceptance criteria
- Refer to design system for UI/UX questions

---

**Next Steps:**
After Sprint 2 story implementation, developers must create:
1. Comprehensive E2E test suite covering all acceptance criteria
2. Quality gate YAML file defining pass/fail criteria
3. Update this context documentation if new patterns emerge

---

**End of README**
