# Project Overview - ISF Playground

## Executive Summary
ISF Playground is a comprehensive management platform designed for the Indiramma School for the Future (ISF). It integrates student management, learning modules, gamified economy (Shop), medical records, and hardware interactions (WTF system) into a unified desktop application.

## Key Features
*   **Student Management:** Profiles, Attendance, Tasks.
*   **Gamified Economy:** "Coin" system where students earn currency for tasks and spend it in the internal Shop.
*   **Medical System:** Health tracking, check-ins, and doctor visit records.
*   **WTF System:** Hardware integration for interactive learning.
*   **Role-Based Access:** Granular permissions for Students, Coaches, Admins, Medical Staff, etc.

## Architecture Type
**Multi-Part Hybrid Application:**
*   **Frontend:** React SPA (Single Page Application).
*   **Backend:** Node.js/Express REST API.
*   **Desktop:** Electron wrapper for local hardware access and offline capabilities.

## Technical Stack Summary
| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Zustand, Tailwind CSS, Radix UI |
| **Backend** | Node.js, Express, MongoDB, Mongoose |
| **Desktop** | Electron 34 |
| **Testing** | Jest, Playwright |

## Project Status
*   **Current Phase:** Sprint 6 (Medical Enhancements).
*   **Recent Features:** Shop System (Sprint 5), Medical Check-ins (Sprint 6).
*   **Next Steps:** Enhancing offline capabilities and reporting.
