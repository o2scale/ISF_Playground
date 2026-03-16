# Frontend Design System Compliance Report

**Story:** 7.5 -- Design System Compliance Scan
**Date:** 2026-03-16
**Auditor:** Sally (UX Designer)
**Scope:** `frontend/src/` -- all components, pages, styles, and UI primitives
**Status:** Complete

---

## Executive Summary

The frontend has **no centralized design system**. Tailwind CSS is installed and is the dominant styling approach for newer components (shop, admin LMS, student LMS, machine management), while legacy dashboard and management features rely on standalone CSS files with duplicated token definitions. Shadcn/ui was installed (50 components) but is used by exactly **1 file** (dead code at that). Accessibility is in poor shape across the board: 87% of images lack alt text, zero form elements have proper label associations, and keyboard navigation support exists in only 11 files. The codebase needs a design system consolidation before Sprint 2 features are built on top of it.

---

## 1. Design Token Compliance

### 1.1 Token Architecture Status

| Aspect | Finding |
|---|---|
| Tailwind config | Minimal -- `tailwind.config.js` has `theme: { extend: {} }` with zero customizations |
| Global token file | **None** -- `index.css` contains only Tailwind directives and body font |
| CSS custom properties | Defined in 3 separate CSS files (dashboard.css, usermanagement.css, attendance.css) with **identical** token sets |
| Arbitrary Tailwind values | **None found** -- no `text-[#hex]`, `bg-[#hex]`, etc. patterns detected |

### 1.2 CSS Custom Property Definitions

Tokens are defined identically in 3 separate `:root` blocks instead of one centralized file:

| Token | Value | Defined In |
|---|---|---|
| `--primary` | `#4361ee` | dashboard.css, usermanagement.css, attendance.css |
| `--primary-light` | `#4895ef` | dashboard.css, usermanagement.css, attendance.css |
| `--primary-dark` | `#3f37c9` | dashboard.css, usermanagement.css, attendance.css |
| `--secondary` | `#f72585` | dashboard.css, usermanagement.css, attendance.css |
| `--success` | `#4cc9f0` | dashboard.css, usermanagement.css, attendance.css |
| `--warning` | `#f9c74f` | dashboard.css, usermanagement.css, attendance.css |
| `--danger` | `#f94144` | dashboard.css, usermanagement.css, attendance.css |
| `--light` | `#f8f9fa` | dashboard.css, usermanagement.css, attendance.css |
| `--dark` | `#212529` | dashboard.css, usermanagement.css, attendance.css |
| `--gray` | `#6c757d` | dashboard.css, usermanagement.css, attendance.css |
| `--gray-light` | `#dee2e6` | dashboard.css, usermanagement.css, attendance.css |
| `--white` | `#ffffff` | dashboard.css, usermanagement.css, attendance.css |
| `--border-radius` | `12-16px` | dashboard.css (16px), usermanagement.css (12px), attendance.css (12px) |
| `--font-family` | Nunito | dashboard.css, usermanagement.css, attendance.css |

**Problem:** The `--border-radius` token already diverges between files (16px in dashboard, 12px in the others). Only CSS files that explicitly import one of these 3 CSS files inherit the tokens. The remaining 45 CSS files define no tokens and use hardcoded values throughout.

### 1.3 Hardcoded Color Counts

| Location | Unique Hex Colors | Total Hex Occurrences |
|---|---:|---:|
| CSS files (48 files) | 403 | 2,406 |
| JS/JSX files (76+ files) | 142 | 469 |
| **Total** | **~480 unique** | **2,875** |

### 1.4 Token Usage vs Hardcoded

| Method | Occurrences | Percentage |
|---|---:|---:|
| `var(--)` usage in CSS | 253 | 8.1% |
| Hardcoded hex in CSS | 2,406 | 77.3% |
| Hardcoded hex in JS/JSX (inline styles) | 469 | 15.1% |
| Tailwind arbitrary values (`bg-[#hex]`) | 0 | 0% |

**Token compliance ratio: 8.1% token-based vs 91.9% hardcoded**

### 1.5 Top Offending Colors (Not From Token Set)

These colors are heavily used but not mapped to any design token:

| Color | CSS Count | JS Count | Usage Pattern |
|---|---:|---:|---|
| `#333` | 77 | -- | Text color (should be `--dark` or Tailwind `text-gray-800`) |
| `#e0e0e0` | 75 | -- | Borders (should be `--gray-light` or `gray-300`) |
| `#ddd` | 69 | 11 | Borders (inconsistent with `#e0e0e0`) |
| `#666` | 68 | 47 | Secondary text (3 different grays for the same purpose) |
| `#f8f9fa` | 53 | -- | Backgrounds (matches `--light` but hardcoded) |
| `#007bff` | 28 | -- | Links/buttons (Bootstrap blue, not `--primary`) |
| `#3a86ff` | 26 | -- | Links (different blue than `--primary`) |

### 1.6 Worst Offending Files (5+ hardcoded hex in JS/JSX)

| File | Hardcoded Hex Count |
|---|---:|
| `components/purchaseManagement/views/ShopInventoryView.jsx` | 74 |
| `components/dashboard/ViewCheckInModal.js` | 66 |
| `components/TaskManagement/taskmanagement.js` | 57 |
| `components/purchaseManagement/modals/ViewRequestModal.jsx` | 35 |
| `components/dashboard/balagruha.js` | 27 |
| `components/dashboard/WeeklyCalendar.js` | 26 |
| `components/dashboard/student.js` | 23 |
| `components/wtf/WallOfFame.js` | 20 |
| `components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx` | 19 |
| `components/dashboard/admin.js` | 17 |
| `components/dashboard/Sportscoach.js` | 15 |
| `components/RBAC/RBACManagement.js` | 14 |
| `components/dashboard/MusicCoach.js` | 11 |
| `components/machineManagement/machineManagement.js` | 10 |

### 1.7 Worst Offending CSS Files

| File | Hardcoded Hex Count |
|---|---:|
| `components/TaskManagement/taskmanagement.css` | 271 |
| `components/dashboard/SportCoachDashboard.css` | 251 |
| `components/purchaseManagement/PurchaseManagement.css` | 214 |
| `components/dashboard/MedicInchargeDashboard.css` | 170 |
| `components/dashboard/balagruha-styles.css` | 141 |
| `components/machineManagement/machineManagement.css` | 133 |
| `components/dashboard/PurchaseDashboard.css` | 120 |
| `components/RBAC/RBACManagement.css` | 107 |
| `components/dashboard/AdminDashboard.css` | 103 |
| `components/dashboard/MusicCoachDashboard.css` | 88 |

---

## 2. Styling Approach Breakdown

### 2.1 Overall Styling Method Distribution

| Approach | File Count | Percentage |
|---|---:|---:|
| Tailwind utility classes only (no CSS import, no inline style) | 140 | 53.4% |
| Tailwind + CSS file import (hybrid) | 55 | 21.0% |
| Inline styles (`style={{}}`) present | 76 | 29.0% |
| CSS file import (no className at all) | 1 | 0.4% |
| Total files with className usage | 241 | -- |
| Total CSS files | 48 | -- |

**Note:** Categories overlap -- a file can use Tailwind + inline styles + CSS imports simultaneously.

### 2.2 Occurrence Counts

| Method | Total Occurrences Across All Files |
|---|---:|
| `className=` (Tailwind + CSS classes) | 9,723 |
| `style={{}}` (inline styles) | 642 |

**Ratio: 93.8% className-based vs 6.2% inline styles**

### 2.3 Domain-Level Styling Patterns

| Domain | Primary Approach | CSS Files | Notes |
|---|---|---:|---|
| **Shop** (39 components) | Tailwind-only | 4 (Checkout, OrderConfirmation, OrderSummary, PaymentDetails) | Mostly consistent Tailwind; 4 legacy CSS files |
| **Admin LMS** (33 components) | Tailwind-only | 0 | Clean Tailwind-only approach |
| **Student LMS** (23 components) | Tailwind-only | 1 (style.css) | Clean approach |
| **Dashboard** (22 components) | CSS files + inline styles | 15 | Heaviest legacy CSS dependency |
| **WTF** (18 components) | Mixed CSS + Tailwind + inline | 1 (WtfDashboard.css) | Heavy inline styles (modals) |
| **Purchase Management** (8 components) | CSS + inline styles | 1 (PurchaseManagement.css) | Most inline style-heavy domain (98 in ShopInventoryView alone) |
| **User Management** (5 components) | CSS files | 3 | Fully CSS-driven, minimal Tailwind |
| **Machine Management** (2 files) | CSS + Tailwind | 1 (machineManagement.css) | Legacy component uses CSS; page uses Tailwind |
| **Task Management** (1 file) | CSS + inline | 1 (taskmanagement.css) | 4,150-line monolith, heavy inline styles |
| **RBAC** (1 file) | CSS + inline | 1 (RBACManagement.css) | Fully CSS-driven |
| **Login** (4 files) | CSS files | 4 | Standalone CSS per component |

### 2.4 Styling Inconsistencies Within Domains

**CRITICAL: The same domain uses different approaches depending on when the code was written.**

- **Machine Management**: `machineManagement.js` (legacy) uses CSS file + 221 className occurrences from CSS classes + 3 inline styles. `pages/MachineManagement.jsx` (Sprint 6) uses Tailwind utility classes + 66 className occurrences. Same feature, incompatible styling.
- **Purchase Management**: `PurchaseManagement.jsx` uses CSS classes. Its child views (`ShopInventoryView.jsx`) use 98 inline styles. Its modals use a mix of both.
- **Dashboard**: Some dashboards (admin.js, coach.js) use CSS classes. Others (balagruha.js) mix CSS + heavy inline styles. The MusicCoach and Sportscoach share `SportCoachDashboard.css` but also contain 6-15 inline hex colors each.

---

## 3. Shadcn/UI Component Library Usage

### 3.1 Installation Status

| Metric | Count |
|---|---:|
| Shadcn .tsx components installed | 46 |
| Shadcn .jsx variants created (active) | 4 (badge, button, dialog, input) |
| Total shadcn components available | 50 |

### 3.2 Actual Import Usage

| Shadcn Component | Imported By (Non-UI Files) | Files |
|---|---|---:|
| `button.jsx` | `NewItemForm.jsx` (dead code) | 1 |
| `input.jsx` | `NewItemForm.jsx` (dead code) | 1 |
| `dialog.jsx` | **None** (only re-exported by other ui files) | 0 |
| `badge.jsx` | **None** (only re-exported by other ui files) | 0 |
| `label` (.tsx) | `NewItemForm.jsx` (dead code) | 1 |
| `textarea` (.tsx) | `NewItemForm.jsx` (dead code) | 1 |
| `select` (.tsx) | `NewItemForm.jsx` (dead code) | 1 |
| `card` (.tsx) | `NewItemForm.jsx` (dead code) | 1 |

**The only file that imports shadcn/ui components directly is `NewItemForm.jsx`, which is dead code** (identified in the component inventory as never imported by any page).

**Shadcn usage ratio: 0 out of 50 components actively used (0%)**

The 4 `.jsx` variants (badge, button, dialog, input) are imported by other components but **not as shadcn/ui primitives** -- they are consumed as wrapper components that happen to live in the `ui/` directory. Pages import `Dialog` from `../components/ui/dialog` etc., but the consuming code does not use the shadcn API patterns (variants, sizes, etc.). The Dialog component is used by 10 files, Button by 9, Badge by 8, Input by 4 -- but these are thin wrappers, not the full shadcn system.

### 3.3 What Pages Actually Use for UI

Instead of shadcn/ui, pages build UI with:
- Raw HTML elements (`<button>`, `<input>`, `<select>`, `<table>`) with Tailwind classes
- Custom CSS classes defined in per-component CSS files
- Inline styles for specific positioning/colors
- Lucide React icons (consistent across newer components)

---

## 4. Accessibility Audit

### 4.1 Summary Scores

| Category | Instances Checked | Compliant | Non-Compliant | Compliance % |
|---|---:|---:|---:|---:|
| Images with alt text | 60 | 8 | 52 | 13.3% |
| Form elements with labels | 661 | 0 | 661 | 0% |
| ARIA attributes present | -- | 113 occurrences (35 files) | -- | Sparse |
| Keyboard handlers | -- | 15 occurrences (11 files) | -- | Minimal |
| `<label>` / `htmlFor` usage | -- | 663 occurrences (92 files) | -- | Moderate (CSS-styled components) |

### 4.2 Image Accessibility

**52 `<img>` tags across the codebase lack `alt` attributes entirely.** Only 8 images include alt text. Most missing alt text is on product images, user avatars, medical check-in photos, and WTF content thumbnails.

Worst offending areas:
- Shop components: ProductCard, CartItem, OrderCard, ProductTable, StockAdjustmentModal, ImageUpload -- all display product images without alt text
- Dashboard medical: CheckInModal (3 images), DoctorVisitsSection (4 images), ViewCheckInModal, medicalIncharge -- medical photos with no alt
- WTF: WallOfFame, ImageViewer, AudioPlayer, VideoPlayer, TextReader -- all media thumbnails missing alt
- Student: CompetitionMode, FreeSketchMode, CourseImageViewer -- educational content without alt

### 4.3 Form Label Accessibility

**Zero `<input>`, `<select>`, or `<textarea>` elements have associated `<label htmlFor>` or `aria-label` attributes when checked on the element line itself.** While 92 files contain `<label>` elements or `htmlFor` attributes (663 occurrences total), these are primarily CSS-styled label elements in legacy components that may or may not be correctly associated with their form controls.

No `id` attributes were found on any `<input>`, `<select>`, or `<textarea>` element in the codebase, meaning `htmlFor` labels have nothing to bind to. This is a **systemic accessibility failure** -- screen readers cannot associate any label with any form field.

### 4.4 ARIA Attribute Coverage

- **35 files** contain `aria-label`, `aria-describedby`, `aria-labelledby`, or `role=` attributes (113 total occurrences)
- **241 files** use interactive elements (className-based)
- **Coverage: ~14.5% of interactive component files have any ARIA attributes**

### 4.5 Keyboard Navigation

- **11 files** contain `onKeyDown`, `onKeyUp`, `onKeyPress`, or `tabIndex` (15 total occurrences)
- **241 files** contain interactive UI
- **Coverage: ~4.6% of component files have keyboard handlers**

Keyboard support exists in: student computer apps (LevelCard, AppCard), CourseCategoryCard, ProductManagement, MachineManagement, EditMetadataModal, MachineLogsModal, TransactionItem, ImageUpload, student dashboard, coach dashboard.

### 4.6 Machine Management Accessibility (Sprint 6 -- Specific Check)

| File | ARIA/Label Occurrences | Keyboard Handlers |
|---|---:|---:|
| `pages/MachineManagement.jsx` | 20 (aria-label, role) | 1 (tabIndex or onKey) |
| `components/machineManagement/machineManagement.js` | 19 (aria-label, role) | 0 |

**Assessment:** Machine Management has the **best accessibility coverage of any feature** in the codebase, with 20 ARIA attributes in the page file. However, it still has zero `htmlFor`/`id` bindings for form elements and only 1 keyboard handler. It uses `role="status"` for live regions and `aria-label` for buttons. This is significantly better than legacy components (which have zero ARIA attributes) but still falls short of full WCAG 2.1 AA compliance.

### 4.7 Color Contrast Concerns

With 403 unique hex colors in CSS and no design system constraints, color contrast is unverifiable without visual testing. However, known risk patterns include:
- Light gray text (`#999`, `#aaa`, `#ccc`) on white backgrounds -- likely fails WCAG AA 4.5:1 ratio
- Yellow warning colors (`#f9c74f`, `#ffca3a`) used as background with dark text -- borderline contrast
- Multiple shades of gray for text (`#333`, `#555`, `#666`, `#777`, `#999`) -- inconsistent contrast levels

---

## 5. Responsive Design Audit

### 5.1 Breakpoint Usage

| Metric | Count |
|---|---:|
| Total responsive breakpoint occurrences (`sm:`, `md:`, `lg:`, `xl:`) | 103 |
| Files using responsive breakpoints | 51 out of 241 (21.2%) |

### 5.2 Breakpoint Distribution by Domain

| Domain | Files with Breakpoints | Total Files | Coverage |
|---|---:|---:|---:|
| Pages (newer) | ~30 | 36 | ~83% |
| Shop components | ~10 | 39 | ~26% |
| Admin LMS | ~5 | 33 | ~15% |
| Student components | ~5 | 23 | ~22% |
| Dashboard (legacy) | 0 | 22 | 0% |
| WTF | ~1 | 18 | ~6% |
| Purchase Management | 0 | 8 | 0% |
| User Management | 0 | 5 | 0% |

**Key finding:** Page files (the route-level components) generally use responsive breakpoints because they define layout grids. But the domain components they render -- especially dashboard, purchase management, and user management -- have zero responsive breakpoints. Legacy components rely on CSS media queries or have no responsive behavior at all.

### 5.3 Layout Patterns

- **Grid-based responsive layouts** (`grid grid-cols-1 md:grid-cols-3`) are used consistently in newer pages
- **Legacy components** use fixed-width CSS or percentage-based layouts without breakpoints
- **No container queries** or `min()`/`clamp()` CSS functions detected
- **Mobile-first approach** is not consistently applied -- many components start with desktop layouts

---

## 6. Visual Consistency Audit

### 6.1 Button Styles

At least 4 different button systems coexist:

| System | Pattern | Files Using |
|---|---|---:|
| **CSS class buttons** | `.btn`, `.btn-primary`, `.btn-danger`, `.btn-success` | Legacy components (dashboard, task, user management) |
| **Tailwind utility buttons** | `bg-purple-600 text-white px-4 py-2 rounded-lg` | Newer shop/admin/student components |
| **Tailwind utility buttons (blue)** | `bg-blue-600 text-white px-4 py-2 rounded-lg` | Some admin/coach components |
| **Inline style buttons** | `style={{ backgroundColor: '#4caf50' }}` | Purchase management, some dashboard |

**Primary action button colors are inconsistent:**

| Color Family | Total Occurrences |
|---|---:|
| `bg-purple-600` / `bg-purple-700` | 212 |
| `bg-blue-600` / `bg-blue-700` | 113 |
| `bg-indigo-600` / `bg-indigo-700` | 12 |
| CSS `--primary` (#4361ee) | Only in 3 CSS files |
| Inline `#4caf50` / `#007bff` / `#3b82f6` | Scattered |

Three different "primary" colors are in active use: purple, blue, and indigo. The UX spec defines `--primary` as `#4361ee` (a blue-indigo), but the most common primary button color is actually `bg-purple-600` (#9333ea), which appears in none of the token definitions.

### 6.2 Form Input Styles

- Legacy components: CSS-styled inputs with custom borders, padding, border-radius via CSS classes
- Newer components: Tailwind utility classes (`border rounded-lg px-3 py-2`)
- Shadcn Input: Used by 0 active components
- No consistent focus ring style across components

### 6.3 Spacing Patterns

- Tailwind spacing (`p-4`, `mb-6`, `gap-4`, `space-y-3`) is used consistently in newer components
- Legacy CSS uses pixel values (`padding: 20px`, `margin-bottom: 15px`) with no spacing scale
- Mixed spacing in hybrid components

### 6.4 Typography

- No centralized typography scale
- `font-family` is defined 3 times in CSS tokens (`Nunito`) but the global `index.css` uses system fonts
- Tailwind text sizes (`text-sm`, `text-lg`, `text-xl`) used in newer components
- Legacy CSS uses pixel font sizes (`font-size: 14px`, `font-size: 16px`)

---

## 7. Compliance Scorecard

| Dimension | Score | Rating |
|---|---:|---|
| Token compliance (tokens vs hardcoded) | 8.1% | CRITICAL |
| Styling consistency (single approach) | 53.4% Tailwind-only | MEDIUM |
| Shadcn/ui utilization | 0% active | CRITICAL |
| Image alt text | 13.3% | CRITICAL |
| Form label association | 0% | CRITICAL |
| ARIA coverage | 14.5% of files | HIGH |
| Keyboard navigation | 4.6% of files | CRITICAL |
| Responsive design | 21.2% of files | HIGH |
| Button consistency | 3+ competing systems | HIGH |
| Color consistency | 480 unique colors | CRITICAL |

---

## 8. Recommended Design System Consolidation Strategy

### Phase 1: Foundation (Before Sprint 2 features)

1. **Create a single global tokens file** (`src/styles/tokens.css`) that defines all CSS custom properties in one `:root` block. Remove the 3 duplicate `:root` definitions from dashboard.css, usermanagement.css, and attendance.css. Import this file in `index.css`.

2. **Extend tailwind.config.js** to map design tokens to Tailwind classes:
   - `primary` -> `#4361ee` (matching UX spec)
   - `secondary` -> `#f72585`
   - `success`, `warning`, `danger`, `coins`
   - Define spacing scale, border-radius scale, font-size scale

3. **Decide on ONE primary action color** and enforce it. Currently purple-600 dominates but the UX spec says `#4361ee`. Pick one and document it.

4. **Add global alt text requirement** -- lint rule (`jsx-a11y/alt-text`) to catch missing alt attributes in CI.

### Phase 2: Component Standardization (Sprint 2 boundary)

5. **Create shared button, input, and form components** using Tailwind that wrap consistent styles. Either activate the shadcn/ui components that are already installed, or delete them and build lightweight equivalents. The current situation of 50 installed but 0 used components is confusing.

6. **Migrate legacy CSS files incrementally** -- start with the top 10 worst offenders (271+ hex colors each). Replace hardcoded hex values with either CSS custom properties or Tailwind classes.

7. **Add `htmlFor`/`id` bindings to all form elements** -- this is a zero-effort, high-impact accessibility fix. Every `<label>` needs a `htmlFor` and every `<input>` needs a matching `id`.

### Phase 3: Full Compliance (Ongoing)

8. **Add keyboard navigation** to all interactive elements (modals, dropdowns, tables). Prioritize Machine Management (partially done), Shop, and Student LMS.

9. **Audit and consolidate colors** -- reduce from 480 unique hex values to a defined palette of ~30-40 colors mapped to semantic tokens.

10. **Implement responsive design** in all legacy components. Dashboard components (22 files, 0% responsive) are the biggest gap.

11. **Add ESLint accessibility plugin** (`eslint-plugin-jsx-a11y`) with strict rules to prevent regression.

### Priority Order

| Priority | Action | Impact | Effort |
|---|---|---|---|
| 1 | Centralize token definitions | Prevents further divergence | Low |
| 2 | Extend Tailwind config with tokens | Bridges CSS tokens and Tailwind | Low |
| 3 | Add alt text to images | WCAG compliance | Medium |
| 4 | Add form label associations | WCAG compliance | Medium |
| 5 | Standardize primary button color | Visual consistency | Low |
| 6 | Activate or remove shadcn/ui | Reduce confusion | Low |
| 7 | Add eslint-plugin-jsx-a11y | Prevent regression | Low |
| 8 | Migrate legacy CSS to Tailwind | Long-term consistency | High |
| 9 | Add keyboard navigation | Full accessibility | High |
| 10 | Responsive design for legacy | Mobile support | High |

---

*Report generated by Sally, UX Designer Agent*
*Story 7.5 -- Design System Compliance Scan*
