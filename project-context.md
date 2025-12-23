---
stepsCompleted: []
inputDocuments: []
workflowType: 'project-context'
lastStep: 0
project_name: 'ISF_Playground'
user_name: 'Dev'
date: '2025-12-22'
---

# Project Context

**Project Name:** ISF_Playground
**Description:** Multi-Part Hybrid Application (Electron + React + Node) for Balagruha Management

## 1. Project Overview

### Core Purpose
ISF_Playground is a comprehensive management platform designed for the Indiramma School for the Future (ISF). It integrates student management, learning modules, gamified economy (Shop), medical records, and hardware interactions (WTF system) into a unified desktop application.

### Key Features
*   **Student Management:** Profiles, Attendance, Tasks.
*   **Gamified Economy:** "Coin" system where students earn currency for tasks and spend it in the internal Shop.
*   **Medical System:** Health tracking, check-ins, and doctor visit records.
*   **WTF System:** Hardware integration for interactive learning.
*   **Role-Based Access:** Granular permissions for Students, Coaches, Admins, Medical Staff, etc.

## 2. Technology Stack

### Core Technologies
*   **Language:** JavaScript (ES6+ / CommonJS for backend)
*   **Frontend Framework:** React 19.0.0
*   **Backend Framework:** Node.js / Express 4.21.2
*   **Desktop Shell:** Electron 34.2.0
*   **Database:** MongoDB (Mongoose 8.10.2)
*   **State Management:** Zustand 5.0.8
*   **Styling:** Tailwind CSS 3.4.17 + Radix UI Primitives

### Key Libraries
*   **Routing:** React Router 7.2.0
*   **Testing:** Jest, Playwright
*   **Validation:** express-validator
*   **Auth:** JWT + Bcryptjs

## 3. Architecture Patterns

### Architecture Style
**Multi-Part Hybrid Application**
*   **Frontend:** Component-Based SPA (React)
*   **Backend:** MVC with Service Layer (Node/Express)
*   **Desktop:** Electron wrapper for local hardware access and offline capabilities

### Key Patterns
*   **State Management:** Global state via Zustand (`shopStore.js`), local state via React Hooks. Avoid Redux complexity.
*   **API Design:** RESTful V2 structure (`/api/v2/shop/...`). Standard response wrapper `{ success, data, message }`.
*   **RBAC:** Hybrid approach. Middleware checks route access; Controllers check resource ownership (e.g., Balagruha match).
*   **Data Integrity:** Use MongoDB Sessions for transactions involving inventory/currency to ensure ACID compliance.

## 4. Development Standards

### Coding Conventions
*   **Naming:** PascalCase for Components/Models (`ShopItem`), camelCase for variables/functions.
*   **File Structure:** Domain-driven (`src/components/shop/`, `src/components/medical/`).
*   **Imports:** Use relative paths or configured aliases consistently.

### Testing Strategy
*   **Unit:** Jest for backend services/utils.
*   **E2E:** Playwright for critical user journeys (Purchase Flow, Login).
*   **Integration:** Supertest for API endpoints.

### Anti-Patterns (DO NOT DO)
*   **No Loose Statuses:** Never use hardcoded strings for status transitions in controllers; use the defined State Machine constants.
*   **No Direct DB Access in UI:** Frontend must strictly use API; no direct IPC to DB unless explicitly architectural exception (e.g., offline sync).
*   **No "Magic" Strings:** Use enums/constants for Roles, Categories, and Statuses.

## 5. Critical Workflows

### Purchase Manager Workflow (Sprint 5)
*   **Strict Intro:** Only Admins create items/vendors.
*   **4-Step Lifecycle:** Request -> Order -> Store -> Balagruha.
*   **Audit:** All stock changes logged to `InventoryTransaction`.
*   **Shortcuts:** If stock exists, skip procurement steps.

## 6. AI Agent Rules (CRITICAL)

*   **Read Before Write:** Always read `architecture.md` and `prd.md` before implementing features.
*   **Atomic Transactions:** If modifying `stock` or `coins`, ALWAYS use a MongoDB transaction session.
*   **Role Check:** Always verify `req.user.role` matches the allowed actor for a state transition (e.g., only PM can move to "Ordered").
*   **Files:** Do not create random files; adhere strictly to the project tree defined in Architecture.
