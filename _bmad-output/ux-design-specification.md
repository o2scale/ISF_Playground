---
stepsCompleted: [discovery, core-experience, design-system, user-journeys, component-strategy, ux-patterns, responsive-accessibility]
inputDocuments: [project-context.md, sprint-reconciliation-report.md, docs/isf-playground-complete-design-system.md, docs/design-systems/sprint-2-lms-design-system.md]
---

# UX Design Specification — ISF Playground

**Author:** Sally (UX Designer) with Dev
**Date:** March 15, 2026
**Status:** Brownfield documentation — captures existing implementation + identifies gaps

---

## 1. Product Context

ISF Playground is a desktop-first (Electron) educational platform for the Initiative Sewa Foundation, serving children's homes (Balagruhas) across India. The platform manages learning, gamification, e-commerce, health, and operations for 9 distinct user roles.

**Primary users:** Students (children), Coaches (teachers), Admins
**Secondary users:** Purchase Managers, Medical In-Charges, Sports/Music Coaches, Balagruha In-Charges, Amma (caretakers)

**Platform:** Electron desktop app with embedded web (React 19)
**Key constraint:** Runs on institutional hardware with varying specs; some locations have intermittent connectivity

---

## 2. Design Philosophy

The existing frontend exhibits a **playful educational aesthetic** — child-friendly with vibrant colors, smooth animations, and approachable typography. The design serves two audiences simultaneously:

- **Students:** Warm, game-like, encouraging — gold coins, confetti, playful fonts ("Comic Sans", "Patrick Hand"), celebration modals
- **Staff:** Professional, efficient, data-dense — tables, dashboards, filters, RBAC-gated views

This dual personality is achieved through **role-based layout wrappers**:
- `StudentLayout` — simplified TitleBar navigation, course-focused
- `Layout` — full sidebar + header navigation, module-rich

---

## 3. Color System

### Primary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | `#4361ee` | Primary actions, links, active states |
| `--primary-light` | `#4895ef` | Hover states, lighter accents |
| `--primary-dark` | `#3f37c9` | Pressed states, emphasis |
| `--secondary` | `#f72585` | Highlights, badges, attention |

### Status Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--success` | `#4cc9f0` | Success states, completed items |
| `--warning` | `#f9c74f` | Warnings, pending states |
| `--danger` | `#f94144` | Errors, destructive actions, critical alerts |

### Neutral Scale

| Token | Hex | Usage |
|-------|-----|-------|
| `--light` | `#f8f9fa` | Page backgrounds, card backgrounds |
| `--dark` | `#212529` | Body text, headings |
| `--gray` | `#6c757d` | Secondary text, labels |
| `--gray-light` | `#dee2e6` | Borders, dividers |

### Special Purpose

| Token | Hex | Usage |
|-------|-----|-------|
| `--coins` | `#ffd700` | Coin display, rewards, gold accents |
| `--notification` | `#ff6b6b` | Notification badges, unread counts |
| `--admin-header` | `#8a7bff` | Admin dashboard header |
| `--balagruha-bg` | `#E6F7FF` | Balagruha dashboard background |
| `--present` | `#4CAF50` | Attendance present |
| `--absent` | `#F44336` | Attendance absent |
| `--not-marked` | `#FFC107` | Attendance unmarked |

### Tailwind Usage
No custom theme extensions — relies on Tailwind 3.4 default palette alongside CSS custom properties. Common Tailwind colors: `blue-600`, `red-500`, `green-500`, `slate-200`, `gray-100`.

---

## 4. Typography

### Font Stacks

| Context | Font Family | Usage |
|---------|------------|-------|
| **System Default** | `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif` | All standard UI |
| **Playful** | `"Comic Sans MS", "Chalkboard SE", "Marker Felt", sans-serif` | Balagruha, Task modules |
| **Handwritten** | `"Patrick Hand", cursive` | Purchase forms |
| **Rounded** | `"Nunito", "Segoe UI", sans-serif` | Attendance module |
| **Monospace** | `source-code-pro, Menlo, Monaco, Consolas` | Code/data display |
| **WTF Override** | `var(--wtf-font-family)` | Global override via CSS variable (personalization feature) |

### Type Scale

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| Display | 2.5rem (40px) | 900 | Main page headings, celebration text |
| H1 | 2rem (32px) | 700 | Page titles |
| H2 | 1.5rem (24px) | 700 | Section headers |
| H3 | 1.2rem (19px) | 600 | Card titles, subsections |
| Body | 1rem (16px) | 400 | Standard body text, inputs |
| Body Small | 0.875rem (14px) | 400 | Secondary text, table cells |
| Caption | 0.75rem (12px) | 400–600 | Labels, metadata, badges |

### Text Effects
- Playful headings: `text-shadow: 2px 2px 0 #fdcb6e` (yellow shadow)
- Coin display: Dynamic font size based on digit count (`data-digits` attribute)

---

## 5. Spacing & Layout

### Spacing Scale
Standard Tailwind 4px increments used throughout:

| Token | Value | Usage |
|-------|-------|-------|
| `gap-2.5` | 10px | Tight gaps (within cards) |
| `gap-4` | 16px | Standard component gaps |
| `gap-5` | 20px | Section gaps |
| `p-4` | 16px | Standard padding |
| `p-5` / `p-6` | 20px / 24px | Card/container padding |
| `px-3 py-2` | 12px / 8px | Input padding |
| `px-4 py-2` | 16px / 8px | Button padding |

### Border Radius

| Value | Usage |
|-------|-------|
| `4px` | Small elements (tags, pills) |
| `8px` / `rounded-md` | Medium elements (inputs, dropdowns) |
| `12px` / `rounded-lg` | Cards, containers |
| `15px–20px` | Pill buttons, date selectors |
| `50%` | Circles (avatars, coin display, notification badge) |

### Elevation (Box Shadows)

| Level | Shadow | Usage |
|-------|--------|-------|
| **Subtle** | `0 1px 3px rgba(0,0,0,0.1)` | Base cards, inputs |
| **Card** | `0 2px 5px rgba(0,0,0,0.1)` | Elevated cards |
| **Raised** | `0 4px 12px rgba(0,0,0,0.1)` | Hover states, dropdowns |
| **High** | `0 8px 16px rgba(0,0,0,0.15)` | Modals, floating elements |
| **Focus Ring** | `0 0 0 3px rgba(67,97,238,0.2)` | Focus states (primary color) |

---

## 6. Component Library

### Foundation: shadcn/ui Pattern
The UI layer follows a **shadcn/ui-inspired architecture**:
- **Radix UI primitives** for accessible, unstyled base components
- **CVA (class-variance-authority)** for composable variants
- **`cn()` utility** (`clsx` + `tailwind-merge`) for safe class merging
- **Tailwind CSS** for styling

### Core Components (src/ui/)

#### Button
- **Variants:** default (primary), destructive, outline, secondary, ghost, link
- **Sizes:** default (h-10), sm (h-9), lg (h-11), icon (h-10 w-10)
- **States:** hover (opacity shift), focus (ring-2), disabled (opacity-50, pointer-events-none)
- **Composition:** Supports `asChild` via Radix Slot for custom element rendering

#### Badge
- **Variants:** default, secondary, destructive, outline
- **Shape:** Pill (rounded-full)
- **Size:** Compact (px-2.5 py-0.5, text-xs, font-semibold)

#### Input
- **Height:** h-10 (40px)
- **Border:** 1px, theme `border-input`
- **Focus:** ring-2 with offset
- **File input:** Styled with transparent background
- **Responsive:** md:text-sm

#### Dialog (Modal)
- **Overlay:** Fixed, black/80, fade animation
- **Content:** Centered, max-w-lg, zoom+fade animation
- **Accessible:** Radix Dialog primitive ensures focus trap, ESC close, click-outside

#### Card
- **Structure:** Card → CardHeader → CardTitle + CardDescription → CardContent → CardFooter
- **Styling:** rounded-lg, border, shadow-sm
- **Padding:** p-6 for header/content

### Radix UI Primitives in Use
Accordion, Alert Dialog, Avatar, Checkbox, Collapsible, Context Menu, Dialog, Dropdown Menu, Hover Card, Label, Menubar, Navigation Menu, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Slider, Switch, Tabs, Toast, Toggle, Tooltip

### Icon System
- **Primary:** Lucide React (v0.462) — size prop: 16/20/24/28px, Tailwind color classes
- **Secondary:** FontAwesome (v6.7.2, 4 packages) — used in some legacy components
- **Recommendation:** Consolidate to Lucide only in future sprint

---

## 7. Layout Architecture

### App Shell

```
┌─────────────────────────────────────────────────┐
│  Header (70px)                                  │
│  ┌──────┬──────────────────────┬──────────────┐ │
│  │ ☰    │  Brand/Logo          │ 🔔 💰 👤 🚪 │ │
│  └──────┴──────────────────────┴──────────────┘ │
├───────────┬─────────────────────────────────────┤
│  Sidebar  │  Main Content                       │
│  (250px)  │                                     │
│           │  ┌─────────────────────────────────┐ │
│  Nav      │  │  Page Header / Breadcrumbs      │ │
│  Links    │  ├─────────────────────────────────┤ │
│           │  │                                 │ │
│  Grouped  │  │  Page Content                   │ │
│  by       │  │  (scrollable)                   │ │
│  Section  │  │                                 │ │
│           │  └─────────────────────────────────┘ │
└───────────┴─────────────────────────────────────┘
```

**Staff Layout (`Layout.js`):**
- Fixed header (70px) with logo, notifications, coin display, user menu
- Collapsible sidebar (250px) with role-filtered navigation
- Main content area (flex: 1, scrollable)
- Hamburger menu on mobile collapses sidebar

**Student Layout (`StudentLayout`):**
- Simplified TitleBar navigation
- Course-focused content area
- Minimal chrome — maximizes learning space
- Coin balance in header

### Navigation Model

**Staff:** Sidebar with grouped sections
- Top-level: Dashboard, Users, Tasks, Machines, Courses, etc.
- Sections dynamically filtered by RBAC permissions
- Active state: blue text + background highlight
- Section headers: uppercase, letter-spacing, muted color

**Student:** Direct course navigation
- Dashboard → Course cards → Course content → Quizzes
- Back navigation via TitleBar
- Progress indicators per course

---

## 8. Interaction Patterns

### State Feedback

| State | Pattern | Example |
|-------|---------|---------|
| **Loading** | Skeleton cards (animate-pulse) | Product grid: 8 skeleton cards |
| **Loading (action)** | Spinner + text | "Processing your order..." |
| **Success** | Toast (top-center, 4s, green, ✅) | "Product added to cart" |
| **Error** | Toast (top-center, 3s, red, ❌) + inline message | "Failed to load products" + retry button |
| **Empty** | Centered icon + message + suggestion | ShoppingBag icon + "No products found" + "Try adjusting filters" |
| **Disabled** | opacity-50 + cursor-not-allowed | Out of stock button |

### Toast Notifications
- Library: react-hot-toast
- Position: top-center
- Duration: 2000–4000ms
- Accessible: `role="status"`, `aria-live="polite"`
- Custom icons per context (🛒 cart, ✅ success, ❌ error)

### Optimistic Updates
Cart operations, WTF pin reordering, and task status changes use optimistic local state updates with background API sync. Toast on success, rollback + error toast on failure.

### Transitions & Animation

| Effect | CSS | Usage |
|--------|-----|-------|
| **Standard** | `transition: all 0.2s ease` | Buttons, links, interactive elements |
| **Hover lift** | `transform: translateY(-5px)` | Cards, feature items |
| **Hover scale** | `transform: scale(1.05)` | Buttons, icons |
| **Focus ring** | `box-shadow: 0 0 0 3px rgba(primary, 0.2)` | All focusable elements |
| **Badge pulse** | `@keyframes badge-pulse` (scale 1→1.05) | Notification badge |
| **Confetti** | `@keyframes makeItRain` | Purchase celebrations |
| **Shake** | `@keyframes subtle-shake` | Attention/notification |

### Drag & Drop
- Library: react-beautiful-dnd (WTF pins, task columns)
- Pattern: optimistic reorder → API persist → toast feedback
- Handles no-op drops (same position)

---

## 9. User Journeys

### Student Learning Journey
```
Login (FaceID/PIN)
  → Student Dashboard
    → Course Card (Computer Apps / Art / Spoken English / Life Skills)
      → Module → Chapter → Content Item
        → Quiz (MCQ, True/False, Fill-in-blanks)
          → Results → Coin Award (auto)
    → Shop (browse → cart → checkout → receipt)
    → Wall of Fame (view/submit pins)
    → Profile (coin balance, purchase history)
```

### Coach Workflow
```
Login (PIN/FaceID)
  → Coach Dashboard
    → Assignments (assign courses to students/Balagruhas)
    → Grading (Art/Audio/Video submissions, rubrics)
    → Deliveries (track item deliveries to students)
    → My Requests (purchase requests for supplies)
```

### Admin Workflow
```
Login (PIN)
  → Admin Dashboard (module cards grid)
    → User Management (CRUD, role assignment)
    → Course Management (create/edit/publish courses)
    → Content Library (S3 uploads, metadata)
    → Quiz Builder (question bank, assessments)
    → Translation (English → Telugu)
    → Shop Admin (products, inventory, analytics)
    → Reports (transactions, leaderboards, coin economy)
    → RBAC (role/permission management)
```

### Purchase Manager Workflow
```
Login (PIN)
  → PM Dashboard (pending badge count)
    → Purchase Requests (view all, filter by category/status/coach)
      → Approve/Reject with notes
      → Mark as Ordered → Delivered to Store → Delivered to Balagruha
    → Low Stock Report
    → Inventory Management
    → Stock Reconciliation
```

---

## 10. Responsive Strategy

### Approach: Mobile-First CSS + Tailwind Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| Base | < 576px | Mobile |
| `sm:` | ≥ 640px | Large mobile |
| `md:` | ≥ 768px | Tablet |
| `lg:` | ≥ 1024px | Desktop |
| `xl:` | ≥ 1280px | Large desktop |

### Key Responsive Behaviors

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| **Sidebar** | Hidden (hamburger) | Hidden (hamburger) | Visible (250px) |
| **Product Grid** | 1 column | 2 columns | 4 columns |
| **Data Tables** | Horizontal scroll | Horizontal scroll | Full width |
| **Modals** | Full width | max-w-lg centered | max-w-lg centered |
| **Form Layout** | Stacked | 2-column | 2-column |
| **Font Sizes** | Reduced (1.25rem headings) | Medium (1.5rem) | Full (2rem) |
| **Padding** | Compact (10-15px) | Medium (15-20px) | Full (20-30px) |

### Touch Targets
- Minimum button height: 36px (hamburger), 40px (standard)
- Gap between interactive elements: 8px minimum
- Tables use overflow-x: auto for horizontal scrolling

---

## 11. Accessibility

### Built-in via Radix UI
All Radix primitives provide:
- Keyboard navigation (Tab, Arrow keys, Enter, Escape)
- Focus trap in modals/dialogs
- ARIA attributes (role, aria-label, aria-expanded, etc.)
- Screen reader announcements

### Application-Level
- Semantic HTML: `<nav>`, `<main>`, `<table>`, `<form>`, `<label>`
- Toast notifications: `role="status"`, `aria-live="polite"`
- Disabled states: `aria-disabled`, `cursor-not-allowed`, `opacity-50`
- Color + icon for status (not color-only)
- Focus rings: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`

### Known Gaps
- No skip-to-content link
- Scrollbar hidden globally (`::-webkit-scrollbar { display: none }`) — may impact keyboard-only users
- Some custom CSS modals may not have proper focus trap (use Radix Dialog instead)
- Font override system (`!important` on all elements) may conflict with user stylesheets

---

## 12. Data Display Patterns

### Tables
- Search bar with debounced input (300–500ms)
- Collapsible filter panel (dropdowns, date range pickers)
- Sortable columns (visual indicator for sort direction)
- Pagination: Previous/Next + "Page X of Y" + "Showing N to M of Total"
- Empty state: centered icon + message + helpful context
- Row hover: subtle background change
- Row click: navigate to detail view

### Cards / Grid
- Responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Skeleton loading: `animate-pulse` with gray placeholder shapes
- Card hover: `transform: translateY(-5px)` or `scale(1.05)`
- Status badges: pill-shaped, color-coded

### Charts (Recharts)
- Revenue charts (line/bar)
- Category pie charts
- Used in ShopAnalytics and TransactionReports
- Responsive containers with `ResponsiveContainer`

---

## 13. Form Patterns

### Library: react-hook-form
- `register()` for field binding
- `handleSubmit()` for form submission
- `formState.errors` for validation messages
- Error display: `text-red-500 text-sm` below field

### Field Layout
- Labels above inputs
- Required fields marked with asterisk or "(Required)" text
- Validation messages inline below field
- Group related fields in sections with headers

### Submit Pattern
- Primary action button (right-aligned or full-width on mobile)
- Disable button during submission (`disabled={isSubmitting}`)
- Show spinner inside button during loading
- Toast on success, inline error on failure
- Cancel button as secondary/ghost variant

---

## 14. Known UX Gaps & Recommendations

### Inconsistencies to Address

| Issue | Current State | Recommendation |
|-------|--------------|----------------|
| **Dual icon libraries** | Lucide + FontAwesome (4 packages) | Consolidate to Lucide only |
| **Dual DnD libraries** | @dnd-kit + @hello-pangea/dnd | Consolidate to one |
| **Mixed CSS approach** | Tailwind utilities + 48 CSS files + CSS variables | Migrate custom CSS to Tailwind where possible |
| **Font inconsistency** | System + Comic Sans + Patrick Hand + Nunito | Define when each is used, document in design tokens |
| **No design tokens file** | Colors/spacing in CSS vars, Tailwind defaults, and inline | Create single `design-tokens.css` or extend Tailwind config |
| **Scrollbar hidden** | Global `::-webkit-scrollbar { display: none }` | Consider custom scrollbar instead of hiding |

### Missing UX Elements

| Element | Status | Priority |
|---------|--------|----------|
| **Machine Management UI** | Backend exists, no frontend | HIGH — Sprint 1 gap |
| **Amma Dashboard** | Role exists, no dedicated views | MEDIUM — Sprint 2 gap |
| **Artweaver Integration** | IPC stubbed | LOW — niche feature |
| **Skip-to-content link** | Missing | MEDIUM — accessibility |
| **Onboarding flow** | None exists | LOW — future enhancement |
| **Offline indicator** | Cached data but no UI indicator | MEDIUM — UX clarity |
| **Error boundary** | No global error boundary component | HIGH — crash resilience |

---

## 15. File Reference

### Design System Sources
- `/docs/isf-playground-complete-design-system.md` — Comprehensive reference (53KB)
- `/docs/design-systems/sprint-2-lms-design-system.md` — LMS-specific (60KB)
- `/frontend/tailwind.config.js` — Tailwind configuration
- `/frontend/src/index.css` — Global styles + Tailwind directives
- `/frontend/src/App.css` — App-level styles + WTF font override
- `/frontend/src/lib/utils.js` — `cn()` class merging utility

### Core UI Components
- `/frontend/src/ui/button.jsx` — CVA button with 6 variants
- `/frontend/src/ui/badge.jsx` — CVA badge with 4 variants
- `/frontend/src/ui/input.jsx` — Styled input
- `/frontend/src/ui/dialog.jsx` — Radix Dialog with animations
- `/frontend/src/ui/card.tsx` — Card compound component

### Layout Components
- `/frontend/src/components/Layout.js` — Staff layout (sidebar + header)
- `/frontend/src/components/Layout.css` — Layout styles (554 lines)
- `/frontend/src/components/student/StudentLayout.jsx` — Student layout
- `/frontend/src/components/Navigation.js` — Navigation component
- `/frontend/src/components/ProtectedRoute.js` — RBAC route guard

### State Management
- `/frontend/src/contexts/AuthContext.js` — Auth state + localStorage
- `/frontend/src/contexts/RBACContext.js` — Permission checks
- `/frontend/src/contexts/CoinBalanceContext.js` — Coin balance
- `/frontend/src/store/shopStore.js` — Zustand cart store
