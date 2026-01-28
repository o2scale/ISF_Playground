# Code Review Report: Epic 04 - Amma Role Enhancement

## Overview
Epic 04 focuses on enhancing the role of "Amma" within the platform, including self-registration and a dedicated dashboard.

## Implementation Status: 🔴 PENDING / DRAFT

### Story 01: Individual Amma Accounts & Self-Registration
- **Status:** Integrated into standard User model, but lacks dedicated self-registration routes.
- **Findings:** `userRoutes.js` supports generic admin-led user creation. No specialized "Amma registration" logic found in controllers.

### Story 02: Enhanced Query Management
- **Status:** Likely shares the same "Task Management" or "Support" system as existing roles.
- **Findings:** No dedicated "Amma Query" controller or service found.

### Story 03: SLA & Task Management
- **Status:** Integrated into the core `TaskManagement` system.
- **Findings:** Global task logic handles reassignment, but "Amma-specific" SLA configurations are not explicitly visible in the backend models.

### Story 04: Amma Dashboard Client UI
- **Status:** Missing dedicated frontend component.
- **Findings:** `Dashboard.js` does not have a case for the "amma" role, causing it to fall back to a default view (`MusicCoachDashboard`). No `AmmaDashboard.jsx` file exists in the `pages` directory.

## Observations
- While the "Amma" role is a first-class citizen in the `Role` enum and `UserTypes` constants, the specialized features promised in Sprint 2 are either sharing generic interfaces or have not been started.
- The absence of a dedicated dashboard suggests this Epic is still in the "Planning/Design" phase despite being part of the Sprint 2 scope.
