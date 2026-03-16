# Frontend Architecture Pattern Audit

**Story:** 7.4 -- Frontend Architecture Pattern Audit
**Date:** 2026-03-16
**Auditor:** Winston (Architect)
**Scope:** `frontend/src/` -- all state management, RBAC, API usage, component architecture, routing, and data flow patterns
**Status:** Complete

---

## Executive Summary

The frontend exhibits a **mixed-pattern architecture** that grew organically across 6+ sprints. While individual features work, there is no consistent architectural strategy. The most critical finding is that **frontend RBAC enforcement is effectively disabled** -- the ProtectedRoute component has its permission-denial logic commented out, meaning all authenticated users can access any route regardless of role. This is a **CRITICAL security gap**.

### Severity Legend

| Rating | Meaning |
|---|---|
| CRITICAL | Security vulnerability or data integrity risk requiring immediate attention |
| HIGH | Architectural violation that will cause maintenance pain or bugs |
| MEDIUM | Inconsistency that should be resolved before Sprint 2 features |
| LOW | Technical debt to address opportunistically |

---

## 1. State Management Audit

### 1.1 Zustand Stores

| Store | File | Lines | Domain | Importers |
|---|---|---:|---|---:|
| useShopStore | `store/shopStore.js` | 441 | Cart, orders, purchase requests | 7 |

**Only 1 Zustand store exists.** Per `project-context.md`: "Use Zustand for global state (do NOT use Context API for global state)." This rule is violated.

### 1.2 Context Providers (4 total)

| Context | File | Lines | Purpose | Consumers | Assessment |
|---|---|---:|---|---:|---|
| AuthContext | `contexts/AuthContext.js` | 114 | Auth state, login/logout | App-wide | **Legitimate** -- auth/theme providers are the documented exception |
| RBACContext | `contexts/RBACContext.js` | 164 | Permission data from API | 9 components | **Violation** -- this is global state that should be a Zustand store |
| CoinBalanceContext | `contexts/CoinBalanceContext.js` | 70 | Student coin balance | 3 components | **Violation** -- global state used across multiple component trees |
| WtfBackgroundContext | `contexts/WtfBackgroundContext.js` | 302 | WTF page theming (fonts, backgrounds) | 2 components | **Borderline** -- only used within WTF feature subtree, wraps itself locally |
| SidebarContext | `components/Layout.js` (inline) | ~10 | Sidebar collapse state | Layout internals | **Legitimate** -- component-local UI context |

### 1.3 Violations of Zustand-Only Rule

**Severity: HIGH**

1. **RBACContext** -- Stores permissions fetched from API, consumed by 9+ components across the app. This is textbook global state. Should be a Zustand store with `persist` middleware for offline resilience.

2. **CoinBalanceContext** -- Stores student coin balance, consumed by Layout, StudentQuizPage, and OrderConfirmation across different route subtrees. Should be merged into a user/session Zustand store.

3. **WtfBackgroundContext** -- 302 lines of font loading, DOM manipulation, and state. While scoped to WTF components, it uses `document.querySelectorAll('*')` to force-apply fonts globally (line 139), making it effectively global. Should be a Zustand store or at minimum refactored to remove DOM manipulation from React state.

### 1.4 Local State Used for Shared Data

Multiple components use `localStorage.getItem("role")` directly instead of consuming from a store:

| Component | Occurrences | Pattern |
|---|---:|---|
| `Layout.js` | 8 | `localStorage.getItem("role")` for menu filtering |
| `usermanagement.js` | 6+ | `localStorage.getItem("role")` for UI gating |
| `UserForm.js` | 7+ | `localStorage.getItem("role")` for field visibility |
| `MusicCoach.js` | 6 | `localStorage.getItem("role")` for API type selection |
| `Sportscoach.js` | 2 | `localStorage.getItem("role")` for type selection |
| `machineManagement.js` | 2 | `localStorage.getItem("role")` for UI gating |

**Severity: MEDIUM** -- Direct localStorage reads for role bypass the auth context entirely. If the auth state and localStorage ever diverge (which they can during logout race conditions), UI will show stale role data. All role checks should flow through `useAuth()`.

---

## 2. RBAC Coverage on Frontend

### 2.1 CRITICAL: ProtectedRoute Permission Denial is DISABLED

**Severity: CRITICAL**

In `components/ProtectedRoute.js` (lines 38-41), the permission denial redirect is **commented out**:

```javascript
// if (!hasPermission) {
//     console.log(`Access denied for ${user?.role} to ${action} on ${module}`);
//     return <Navigate to="/access-denied" replace />;
// }
```

This means every `<ProtectedRoute module="X" action="Y">` wrapper in `App.js` performs the authentication check but **never enforces the permission check**. All 15+ routes that specify `module` and `action` props are effectively unprotected at the RBAC level.

**Impact:** Any authenticated user (including students) can navigate directly to admin routes like `/shop/admin/products`, `/rbac`, `/users`, `/machines`, etc. The backend API still enforces RBAC, so data operations would fail, but the UI is fully accessible.

### 2.2 Dual Permission Systems (Conflicting)

**Severity: HIGH**

Two separate permission checking systems exist and produce different results:

| System | Location | Data Source | Used By |
|---|---|---|---|
| `usePermission` hook | `hooks/usePermission.js` | `user.permissions` from AuthContext | ProtectedRoute, Layout, UserManagement, BalagruhaManagement |
| `useRBAC` / `hasPermission` | `contexts/RBACContext.js` | API call to `/api/roles/getAllRolePermissions` | 9 page components (MachineManagement, InventoryManagement, ProductManagement, VendorManagement, etc.) |

**The `usePermission` hook checks `user.permissions`** -- a field that comes from the login response and is stored in AuthContext. But AuthContext only stores `name`, `role`, `id`, and `balagruhaIds` from localStorage (see AuthContext.js lines 20-25). **The `permissions` array is never persisted.** This means `usePermission` will always return `false` after a page refresh (when auth is restored from localStorage).

**The `useRBAC` hook fetches permissions from the API** on mount and stores them in context state. This is the only working permission system, but it is not used by ProtectedRoute.

### 2.3 Broken usePermission Destructuring

**Severity: HIGH**

Two components destructure properties from `usePermission()` that do not exist:

```javascript
// In usermanagement.js (line 57):
const { canCreate, canRead, canUpdate, canDelete } = usePermission();

// In balagruhamanagement.js (line 37):
const { canCreate, canRead, canUpdate, canDelete } = usePermission();
```

The hook returns `{ can }` when called without arguments. `canCreate`, `canRead`, `canUpdate`, `canDelete` are all `undefined`. Every permission check derived from these (`canCreate("User Management")`, etc.) will throw a TypeError when invoked. These components likely work only because the calling code either:
- Is inside conditional branches that never execute, or
- The admin role short-circuits in `usePermission` (line 21: `if (user.role === 'admin') return true`), but this only works for the `can()` method, not the non-existent destructured methods.

Also in `Layout.js` (line 35): `const { canRead } = usePermission()` -- same issue, `canRead` is `undefined`.

### 2.4 Route-Level RBAC Coverage

| Protection Level | Routes | Count |
|---|---|---:|
| ProtectedRoute + module/action (RBAC intended but disabled) | `/users`, `/rbac`, `/task`, `/machines`, `/shop/admin/*` (8 routes), `/admin/courses`, `/admin/courses/:id/structure`, `/admin/content`, `/admin/quizzes/*` (3 routes), `/admin/translations/*` (3 routes) | 20 |
| ProtectedRoute only (auth, no RBAC) | `/dashboard`, `/wtf`, `/shop`, `/shop/checkout`, `/shop/orders/*` (3 routes), `/coins/history`, `/purchase-manager/low-stock`, `/coach/deliveries`, `/coach/assignments`, `/coach/grading`, `/profile`, `/admin/students/:userId` | 13 |
| ProtectedRoute + CoachOrAdminRoute (role check) | `/coach/requests` | 1 |
| No ProtectedRoute (auth via Layout only) | `/balagruha`, `/attendance`, `/course`, `/repair`, `/purchase` | 5 |
| Public | `/login`, `/admin/login` | 2 |

**Routes with NO RBAC enforcement at all (5):**

| Route | Component | Risk |
|---|---|---|
| `/balagruha` | BalagruhaManagement | Any authenticated user can access Balagruha management |
| `/attendance` | AttendanceComponent | Any authenticated user can access attendance |
| `/course` | CourseManagement | Any authenticated user can access course management |
| `/repair` | RepairManagement | Any authenticated user can access repair management |
| `/purchase` | PurchaseManagement | Any authenticated user can access purchase management |

These routes are commented-out ProtectedRoute wrappers in App.js (lines 263-269, 271-278) or have no wrapper at all (lines 279-281).

### 2.5 PermissionGuard Component -- Dead Code

`components/PermissionGuard.jsx` (45 lines) was built in Sprint 1.1 for conditional UI element rendering. It imports from `../hooks/usePermission` and works correctly as a wrapper. However, it is **never imported by any component**. It is dead code.

### 2.6 Navigation-Level Role Filtering

`Layout.js` uses a `topMenus` array with `roles` arrays to filter sidebar items by role. This is the **only working frontend RBAC mechanism** -- it hides menu items from users who shouldn't see them. However, it is visibility-only (hide/show), not access control. Users can still type URLs directly.

---

## 3. API Module Usage Audit

### 3.1 API Architecture Overview

The API layer has three separate Axios instance patterns:

| Instance | File | Used By |
|---|---|---|
| `api` (primary) | `api/client.js` | 118 files via barrel import `from '../api'` |
| `apiWithoutContentType` | `api/client.js` | File upload operations |
| `getApiInstance()` (factory) | `utils/apiInstance.js` | **Nobody** -- dead code |
| Raw `axios` imports | Various | 12 files bypass the API client entirely |

**Severity: HIGH** -- Three different Axios patterns create inconsistent interceptor behavior. The `api/client.js` instances set MAC address at module load time (line 4: `const macAddress = localStorage.getItem("macAddress")`), meaning it captures the value once and never updates. The `apiInstance.js` factory reads it per-request. Neither approach is clearly documented as the standard.

### 3.2 Direct Axios Usage (Bypassing API Modules)

**Severity: HIGH**

12 component/page files import `axios` directly and make raw API calls, bypassing the centralized `api/client.js` interceptors:

| File | Raw axios calls | Domain |
|---|---:|---|
| `components/coach/CoachAssignmentsView.jsx` | 2 | Course assignments |
| `components/coach/CourseAssignmentModal.jsx` | 5 | Assignment creation |
| `components/coach/grading/VideoGradingInterface.jsx` | 1 | Grade submission |
| `components/coach/grading/AudioGradingInterface.jsx` | 1 | Grade submission |
| `components/coach/grading/ArtGradingInterface.jsx` | 1 | Grade submission |
| `components/admin/AdminCourseAssignmentModal.jsx` | 3 | Admin assignment |
| `hooks/useFileUpload.js` | 1 | File uploads |
| `pages/coach/GradingDashboard.jsx` | 3 | Grading operations |
| `contexts/AuthContext.js` | 1 | Auth header setup (not an API call) |
| `contexts/RBACContext.js` | 1 | Permission fetch |
| `components/admin/inventory/NewItemForm.jsx` | (dead code) | -- |

These files will NOT benefit from the centralized interceptors (token injection, 401 redirect, MAC address header). The coach/grading and LMS assignment features are entirely outside the API module system.

### 3.3 API Module Import Patterns

118 files import from the barrel `../api` (or `../../api`, etc.). Only 2 files import directly from specific modules:

- `pages/MachineManagement.jsx` -> `from '../api/machines'`
- `components/admin/MachineLogsModal.jsx` -> `from '../../api/machines'`

**Assessment:** The barrel pattern works and is consistently used. The Machine Management direct imports are fine (tree-shaking benefit). The legacy `api.js` (4 lines) at `src/api.js` re-exports from `api/index.js` and is redundant.

### 3.4 Unused API Modules

All 17 feature API modules are re-exported through the barrel and their functions are consumed somewhere in the codebase. However, two modules have no direct imports (only used via barrel):

- `api/training.js` (43 lines) -- training-related functions. Consumed via barrel by dashboard components.
- `api/schedule.js` (93 lines) -- scheduling functions. Consumed via barrel by calendar components.

These are not dead code, but their consumers could not be identified through direct import tracing. They are accessible through the barrel.

### 3.5 Dead API Infrastructure

| File | Lines | Status |
|---|---:|---|
| `utils/apiInstance.js` | 103 | **Dead code** -- never imported. Contains a third Axios instance factory with different interceptor behavior (uses `alert()` for 401 errors). |
| `src/api.js` | 4 | **Redundant** -- barrel re-export to `api/index.js`. Works but adds an unnecessary indirection layer. |

### 3.6 Error Handling Patterns

**Severity: MEDIUM**

Error handling is inconsistent across the codebase:

| Pattern | Used By | Behavior |
|---|---|---|
| `toast.error()` via react-hot-toast | shopStore.js, 30 page/component files | User-visible error notification |
| `console.error()` only | AuthContext, RBACContext, CoinBalanceContext | Silent failure -- user sees nothing |
| `alert()` | utils/apiInstance.js (dead code) | Blocking browser alert |
| No error handling | Some coach/grading components | Errors propagate to caller |

The Zustand shop store (`shopStore.js`) is the gold standard -- every action has try/catch with toast notifications. Most other components handle errors inconsistently.

---

## 4. Component Architecture Patterns

### 4.1 Overall Pattern Assessment

**Severity: MEDIUM**

| Pattern | Usage | Assessment |
|---|---|---|
| Functional components + hooks | 99% of components (334/335) | Correct per project rules |
| Class components | 1 (ErrorBoundary.jsx) | Acceptable -- React requires class for error boundaries |
| Container/presenter separation | None | Not practiced -- pages are monolithic |
| Custom hooks for logic extraction | 8 hooks exist | Underutilized -- most logic lives in components |
| `useCallback` for handler memoization | 6 files (21 occurrences) | **Severely underutilized** -- project rules say "ALWAYS use useCallback for event handlers passed to child components" |

### 4.2 Monolith Components

6 components exceed 2,000 lines with no separation of concerns:

| Component | Lines | Functions Inlined | API Calls Inlined |
|---|---:|---|---|
| `TaskManagement/taskmanagement.js` | 4,150 | All CRUD, filtering, sorting, pagination | Yes -- all in component |
| `wtf/WTFManagement.js` | 3,441 | All management, modals, state | Yes |
| `wtf/WallOfFame.js` | 2,926 | Display, voting, animations | Yes |
| `dashboard/MusicCoach.js` | 2,861 | All dashboard sections | Yes |
| `dashboard/Sportscoach.js` | 2,513 | All dashboard sections | Yes |
| `dashboard/medicalIncharge.js` | 2,182 | All medical check-in logic | Yes |

These components violate every React best practice: no separation of data fetching from presentation, no custom hooks for business logic, no component decomposition. Each is a single file handling state, API calls, business logic, and UI rendering.

### 4.3 File Naming Inconsistency

**Severity: LOW**

| Convention | Examples | Count |
|---|---|---|
| PascalCase.jsx (correct) | `MachineManagement.jsx`, `ShopHome.jsx` | Most pages |
| camelCase.js (incorrect for components) | `taskmanagement.js`, `balagruhamanagement.js`, `usermanagement.js`, `dashboard.js` | ~15 component files |
| PascalCase.js (mixed extension) | `WallOfFame.js`, `RBACManagement.js` | ~20 component files |

The project rule says "Frontend components: PascalCase.jsx" but older files use camelCase.js.

---

## 5. Routing Architecture

### 5.1 Route Organization

**Severity: MEDIUM**

All routes are defined in a single `App.js` (575 lines) with no code splitting:

- **No lazy loading** (`React.lazy` / `Suspense`) -- zero usage found. All 60+ route components are eagerly imported.
- **No route-level error boundaries** -- The `ErrorBoundary` component exists but is dead code (never imported/used).
- **No nested route groups** beyond `StudentLayout` and `Layout` wrappers.
- **Dead routing file** -- `AppRoutes.js` (111 lines) is never imported.

### 5.2 Auth Guard Architecture

| Guard | Implementation | Scope |
|---|---|---|
| `ProtectedRoute` | Checks `isAuthenticated`, loads RBAC (but never denies) | 34 routes |
| `CoachOrAdminRoute` | Inline component in App.js, checks `user.role` directly | 1 route |
| `Layout` | Redirects to login if `!isAuthenticated` | All layout-wrapped routes |
| `StudentLayout` | Uses `<Outlet>` with `ProtectedRoute` children | Student LMS routes |

There is no unified guard strategy. Three different mechanisms exist:
1. `ProtectedRoute` (auth + broken RBAC)
2. `CoachOrAdminRoute` (hardcoded role check)
3. Layout implicit auth check

### 5.3 Bundle Size Impact

With 60+ eagerly imported page components (including 6 monoliths over 2,000 lines), the initial bundle includes all code for all routes. Estimated impact:
- ~93,000 lines of frontend source loaded on first visit
- Student users load admin, coach, purchase manager, and medical code they will never use

---

## 6. Data Flow Patterns

### 6.1 API-to-UI Data Flow

There is no consistent data flow pattern. Three distinct patterns coexist:

**Pattern A: API Module -> Zustand Store -> Component (Shop domain only)**
```
api/shop.js -> shopStore.js -> Cart.jsx, ProductCard.jsx, Checkout.jsx
```
Used by: 7 shop components. This is the intended architecture per project rules.

**Pattern B: API Module via barrel -> useState in Component (Most features)**
```
import { fetchX } from '../api' -> useState + useEffect in component
```
Used by: ~100+ components. Data is fetched in the component, stored in local state, never shared.

**Pattern C: Raw Axios -> useState in Component (Coach/LMS features)**
```
import axios -> axios.get(url) -> useState in component
```
Used by: ~10 components. Bypasses both the API module layer and state management.

### 6.2 Prop Drilling Assessment

**Severity: LOW**

Prop drilling is not a major issue because most components fetch their own data locally rather than passing props down. The component tree is relatively flat (pages render modals/views directly). The deepest prop chains observed:

- `Layout.js` -> notification state -> notification panel (2 levels)
- `WallOfFame.js` -> pin data -> card components (2-3 levels)
- `PurchaseManagement.js` -> views -> modals (2-3 levels)

Prop drilling is limited because the architecture leans toward "every component fetches its own data" rather than lifting state up. While this avoids deep props, it creates duplicate API calls and makes state synchronization difficult.

### 6.3 State Synchronization Issues

**Severity: MEDIUM**

Because there is no centralized state management (beyond shopStore), components that display the same data can show stale values:

1. **Coin balance**: CoinBalanceContext fetches once on mount. If coins are awarded in StudentQuizPage, the Layout header shows stale balance until `refreshBalance()` is explicitly called.

2. **Notifications**: Layout fetches and manages notification state locally. No other component can trigger a notification refresh.

3. **User data**: AuthContext stores basic user info, but many components read `localStorage.getItem("role")` directly, creating two sources of truth.

---

## 7. Findings Summary

### CRITICAL (Immediate Action Required)

| # | Finding | Location |
|---|---|---|
| C-1 | ProtectedRoute permission denial is commented out -- all RBAC route guards are non-functional | `components/ProtectedRoute.js:38-41` |
| C-2 | 5 admin routes have no ProtectedRoute wrapper at all | `App.js:263-281` (`/balagruha`, `/attendance`, `/course`, `/repair`, `/purchase`) |

### HIGH (Resolve Before Sprint 2 Features)

| # | Finding | Location |
|---|---|---|
| H-1 | Dual permission systems (usePermission vs useRBAC) produce different results; usePermission has no persisted data source | `hooks/usePermission.js`, `contexts/RBACContext.js` |
| H-2 | usePermission destructured with non-existent properties (canCreate, canRead, etc.) in 3 components | `usermanagement.js:57`, `balagruhamanagement.js:37`, `Layout.js:35` |
| H-3 | 12 files use raw axios bypassing centralized API client interceptors | See section 3.2 |
| H-4 | 3 Context providers used for global state violating Zustand-only rule | `RBACContext`, `CoinBalanceContext`, `WtfBackgroundContext` |
| H-5 | ErrorBoundary exists but is dead code -- no error boundaries protect any route | `components/ErrorBoundary.jsx` |

### MEDIUM (Resolve During Normal Development)

| # | Finding | Location |
|---|---|---|
| M-1 | No React.lazy or code splitting -- all routes eagerly loaded | `App.js` |
| M-2 | Direct localStorage reads for role bypass AuthContext (30+ occurrences) | Layout.js, usermanagement.js, UserForm.js, MusicCoach.js, etc. |
| M-3 | Inconsistent error handling (toast vs console.error vs silent) | See section 3.6 |
| M-4 | `useCallback` severely underutilized (6 files vs 200+ component files) | Project-wide |
| M-5 | State sync issues from lack of centralized state management | See section 6.3 |

### LOW (Technical Debt)

| # | Finding | Location |
|---|---|---|
| L-1 | Dead API infrastructure (`utils/apiInstance.js`, `src/api.js` barrel) | See section 3.5 |
| L-2 | File naming inconsistency (camelCase.js vs PascalCase.jsx) | See section 4.3 |
| L-3 | `AppRoutes.js` dead routing file | `src/AppRoutes.js` |
| L-4 | `PermissionGuard.jsx` built but never used | `components/PermissionGuard.jsx` |
| L-5 | 6 monolith components (2,000-4,150 lines) with no separation of concerns | See section 4.2 |

---

## 8. Recommended Remediation Priority

### Phase 1: Security (Before any new features)
1. **Uncomment the ProtectedRoute permission denial** (C-1) -- 2 lines of code
2. **Add ProtectedRoute wrappers to 5 unprotected routes** (C-2) -- straightforward
3. **Unify permission systems** (H-1) -- consolidate on useRBAC as the single source, remove or fix usePermission
4. **Fix broken usePermission destructuring** (H-2) -- update 3 components

### Phase 2: Architecture Alignment (Sprint boundary)
5. Migrate RBACContext and CoinBalanceContext to Zustand stores (H-4)
6. Create API module functions for coach/grading features, eliminate raw axios (H-3)
7. Wire ErrorBoundary into App.js route tree (H-5)

### Phase 3: Performance & Quality (Ongoing)
8. Add React.lazy for route-level code splitting (M-1)
9. Replace localStorage.getItem("role") with useAuth() hook (M-2)
10. Standardize error handling on toast notifications (M-3)
11. Decompose monolith components starting with highest-traffic pages (L-5)

---

*Report generated by Winston, Architect Agent*
*Story 7.4 -- Frontend Architecture Pattern Audit*
