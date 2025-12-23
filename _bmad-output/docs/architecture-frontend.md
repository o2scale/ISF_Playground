# Architecture - React Frontend

## Executive Summary
The frontend is a Single Page Application (SPA) built with React 19. It uses a component-based architecture with a focus on domain-driven organization. State is managed via Zustand for global data and React Context for app-wide settings.

## Technology Stack
*   **Framework:** React 19
*   **Routing:** React Router 7
*   **State Management:** Zustand (Stores), Context API (Auth/Theme)
*   **Styling:** Tailwind CSS + Radix UI Primitives
*   **Build Tool:** react-scripts (Create React App) / Electron Builder

## Architectural Pattern
**Component-Based Architecture:**
*   **Feature Modules:** Components are grouped by domain (e.g., `components/shop`, `components/medical`).
*   **Atomic UI:** Low-level UI components in `ui/` (Buttons, Inputs).
*   **Smart vs. Dumb:** Container components handle logic/state, presentational components handle rendering.

## Key Subsystems

### 1. Routing & Navigation
*   **Router:** `AppRoutes.js` defines the route map.
*   **Guards:** `ProtectedRoute.js` and `PermissionGuard.js` enforce RBAC.
*   **Navigation:** `RoleBasedNavigation.js` dynamically renders menu items based on user role.

### 2. State Management
*   **Shop Store (`shopStore.js`):** Handles complex shop logic (cart manipulation, filtering, pagination).
*   **Auth Context:** Manages user session and token.

### 3. API Integration
*   **Client:** Axios instance configured in `api.js` (or similar utils).
*   **Pattern:** API calls are often wrapped in custom hooks (`hooks/`) or called directly in services.

## UX & Design
*   **Design System:** "Mango Cabs" / ISF Design System (Tailwind-based).
*   **Responsiveness:** Mobile-first approach using Tailwind breakpoints.
*   **Feedback:** Toast notifications (`react-hot-toast`) for user actions.
