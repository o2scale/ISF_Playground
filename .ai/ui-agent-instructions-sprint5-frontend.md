# UI/UX Agent Instructions: Complete ISF Playground UI Documentation

**Date Created:** October 7, 2025 - 9:12 PM
**Agent Type:** UI/UX Designer Agent (BMAD Framework)
**Mission:** Document the ENTIRE ISF Playground application UI/UX with emphasis on WTF module patterns, then create Sprint 5 frontend specifications

---

## Mission Overview

You are a UI/UX Designer Agent tasked with creating **comprehensive UI/UX documentation** for the entire ISF Playground application. This documentation will serve as:

1. **Immediate Value:** Design system reference for Sprint 5 ISF Shop development
2. **Long-term Value:** Complete UI pattern library for all future sprints and features
3. **Knowledge Base:** Visual documentation of all implemented features across the application
4. **Onboarding Resource:** New developers can understand the entire application UI

### Why This Matters

- **Sprint 5 Immediate Need:** Client is very happy with WTF module UI - Sprint 5 Shop must match this quality
- **Future Development:** Sprint 2 (LMS), Sprint 3 (Mobile), Sprint 4 (SOS) will all reference this documentation
- **Consistency:** Ensure all future features maintain visual consistency with Sprint 1
- **Knowledge Preservation:** Prevent UI pattern fragmentation as team grows

### Strategic Approach

**Primary Focus:** WTF module (client's favorite - 40% of effort)
**Secondary Focus:** All other application sections (60% of effort)
**Output:** Complete design system + Sprint 5 frontend specifications

---

## Application Access

### Production URL
```
https://playground.initiativesewafoundation.com/
```

### Login Credentials
```
Username: tony.loui.thomas@gmail.com
Password: 5322148
```

### Technology Stack (Reference)
- **Frontend:** React 19 + Tailwind CSS + Radix UI
- **State Management:** None currently (Sprint 5 will use Zustand)
- **Icons:** Likely Lucide React or similar
- **Deployment:** Electron desktop app (but also web accessible)

---

## Your Tools

You have access to **Playwright MCP** which allows you to:
- Navigate web pages
- Take screenshots
- Extract DOM structure
- Inspect element styles
- Capture CSS classes
- Test interactions

**Important:** Use Playwright extensively - take multiple screenshots, inspect elements, capture hover states, and document everything visually.

---

## Phase 1: Complete Application UI Documentation (6-8 hours)

### Objective
Document the UI/UX patterns of the ENTIRE ISF Playground application, with emphasis on the WTF module.

### Application Structure Overview

After logging in, you will see the main navigation menu. **Document EVERY section listed in the menu**, including:

#### Navigation Menu Sections (Document All)

Based on the Sprint Plan and completed features, the application should have these sections:

1. **Dashboard** (Home/Landing page)
2. **User Management** (Admin/Coach views)
3. **Balagruha Management** (Student groups)
4. **Machine Tracking** (Equipment usage tracking)
5. **Task Management** (Task assignment and tracking)
6. **WTF Module** ⭐ (Wall for Thrust towards Fame - PRIMARY FOCUS)
7. **Student Profiles** (Individual student views)
8. **Notification Center** (Notification list)
9. **Reports/Analytics** (if accessible)
10. **Settings** (User/system settings)

**Your Mission:** Explore and document EVERY accessible section with the same depth and detail.

---

### Phase 1A: Global UI Elements (1 hour)

**What to Document:**

#### 1. Authentication Pages
- Login page (you'll see this first)
- Facial recognition flow (if testable)
- Forgot password flow (if accessible)

**Screenshots:**
- Login page (full screen)
- Login form focused
- Error states (try wrong password)
- Facial recognition interface

**Document:**
```markdown
### Login Page
- Layout: [centered form, full-height, background image/color]
- Form styling: [card, shadow, padding]
- Input fields: [classes, focus states]
- Submit button: [primary button style]
- Branding: [logo placement, size]
- Remember me checkbox: [styling]
- Forgot password link: [styling]
```

#### 2. Global Navigation (Top Bar)
**Screenshots:**
- Top navigation bar (full width)
- User menu dropdown (click profile icon)
- Notification center (click bell icon)
- Coin balance display ⭐ (CRITICAL)

**Document:**
```markdown
### Top Navigation Bar
- Height: [px]
- Background: [color, backdrop-blur?]
- Logo: [size, placement]
- Nav items: [default, hover, active states]
- Search bar: [if present]
- Right side icons: [notification, profile, etc.]

### Coin Balance Display ⭐ CRITICAL
- Container: [classes]
- Icon: [type, size, color]
- Number: [font-size, weight, color, formatting]
- Label: [text, size, color]
- Placement: [top-right, in menu, etc.]
- Animation: [any transitions when balance changes]
- Screenshot: [capture close-up]
```

#### 3. Sidebar Navigation (Left Side)
**Screenshots:**
- Expanded sidebar
- Collapsed sidebar (if collapsible)
- Active menu item
- Menu item hover state

**Document:**
```markdown
### Sidebar Navigation
- Width: [expanded, collapsed]
- Background: [color]
- Nav items:
  - Default state: [classes]
  - Hover state: [classes]
  - Active state: [classes, active indicator]
- Icons: [size, color, library used]
- Collapsible: [yes/no, button location]
- Sub-menus: [if any, expansion behavior]
```

#### 4. Global Notification System
**Screenshots:**
- Notification dropdown/panel
- Individual notification (unread)
- Individual notification (read)
- Notification categories
- Empty notification state

**Document:**
```markdown
### Notification Center
- Trigger: [bell icon in top bar]
- Panel: [dropdown, full panel, modal]
- Panel dimensions: [width, max-height]
- Notification item:
  - Unread: [classes, indicator]
  - Read: [classes, opacity difference]
  - Structure: [icon, title, message, timestamp]
  - Action button: [if any]
- Categories: [tabs, filters]
- Mark all as read: [button style]
- Empty state: [icon, message]
```

---

### Phase 1B: Dashboard/Home Page (30 minutes)

**Screenshots:**
- Full page view
- Widget/card sections
- Charts/graphs (if any)
- Quick actions area

**Document:**
```markdown
### Dashboard Layout
- Grid structure: [columns, gaps]
- Widget cards: [styling, shadows, borders]
- Charts: [library used, color scheme]
- Quick stats: [number displays, icons]
- Recent activity: [list styling]
```

---

### Phase 1C: User Management Section (45 minutes)

**Navigate to:** User Management (likely in admin menu)

**Screenshots:**
- User list view (table or grid)
- User creation form
- User edit form
- User detail view
- Role assignment UI
- Bulk actions (if any)

**Document:**
```markdown
### User Management
#### List View
- Layout: [table, grid, cards]
- Table styling: [header, rows, borders]
- Row actions: [edit, delete, kebab menu]
- Search/filter: [location, styling]
- Pagination: [location, style]
- Add user button: [styling, placement]

#### Create/Edit Form
- Modal or page: [which one]
- Form layout: [single column, two column]
- Field types: [text, email, select, file upload]
- Validation: [inline, bottom, toast]
- Submit/cancel buttons: [placement, styling]
- File upload (for profile pic): [drag-drop styling]
```

---

### Phase 1D: Balagruha Management (30 minutes)

**Navigate to:** Balagruha section

**Screenshots:**
- Balagruha list
- Balagruha detail view
- Student assignment UI
- Coach assignment UI

**Document:**
```markdown
### Balagruha Management
- List view styling
- Card/tile design (if card-based)
- Student count badges
- Coach assignment dropdown/modal
- Add/edit Balagruha form
```

---

### Phase 1E: Machine Tracking (30 minutes)

**Navigate to:** Machine Tracking section

**Screenshots:**
- Machine list
- Machine status indicators
- Usage logs
- Add machine form

**Document:**
```markdown
### Machine Tracking
- Machine cards: [styling, status badges]
- Status colors: [available, in-use, maintenance]
- Usage log table: [styling]
- Add machine form: [fields, layout]
```

---

### Phase 1F: Task Management (45 minutes)

**Navigate to:** Tasks section

**Screenshots:**
- Task list (student view)
- Task list (coach/admin view)
- Task creation form
- Task detail view
- Task status badges
- Due date indicators

**Document:**
```markdown
### Task Management
- List layout: [list, kanban, calendar]
- Task card: [styling, status badge, due date]
- Priority indicators: [high, medium, low]
- Assignment UI: [student picker, coach picker]
- Filters: [status, priority, assigned to]
- Create task form: [fields, layout]
```

---

### Phase 1G: WTF Module ⭐ PRIMARY FOCUS (2-3 hours)

**Navigate to:** WTF (Wall for Thrust towards Fame) section

**This is the PRIMARY reference for Sprint 5. Document with MAXIMUM detail.**

After logging in, navigate to the **WTF (Wall for Thrust towards Fame)** section. Document:

#### 1. WTF Landing/List Page
**What to Capture:**
- Screenshot of the full page
- Layout structure (sidebar, header, main content area)
- Card/grid layout for WTF pins
- Filter/sort controls
- Search functionality (if any)
- Pagination or infinite scroll
- Empty state (if accessible)

**What to Document:**
```markdown
### Layout Structure
- Sidebar: [width, styling]
- Header: [components, styling]
- Main content: [grid columns, gaps, padding]

### Card Component Pattern
- Card container classes: [Tailwind classes]
- Card dimensions: [width, height, aspect ratio]
- Card hover effects: [transitions, shadows]
- Image placement: [aspect ratio, object-fit]
- Text hierarchy: [font sizes, weights, colors]
- Button styles: [primary, secondary, disabled states]

### Color Palette
- Primary: [hex/rgb]
- Secondary: [hex/rgb]
- Accent: [hex/rgb]
- Background: [hex/rgb]
- Text colors: [primary, secondary, muted]
- Border colors: [default, hover, focus]
```

#### 2. WTF Pin Detail/Modal
**What to Capture:**
- Screenshot of pin detail view (if modal) or full page
- Modal/dialog styling (Radix UI Dialog pattern)
- Content layout (image, description, metadata)
- Action buttons (accept, reject, edit, delete)
- Comment/interaction section (if any)

**What to Document:**
- Modal overlay styling
- Modal content dimensions and padding
- Close button placement and styling
- Primary vs secondary action button styles
- Form input styles (if any)

#### 3. WTF Submission/Create Form
**What to Capture:**
- Screenshot of the create/submit WTF pin form
- Form layout (single column, two column)
- Input field styles (text, textarea, file upload)
- Label positioning and styling
- Validation error states
- Submit button styling and loading states

**What to Document:**
```markdown
### Form Patterns
- Input field:
  - Base classes: [Tailwind classes]
  - Focus state: [ring, border color]
  - Error state: [border, text color]
  - Disabled state: [opacity, cursor]

- Label:
  - Classes: [font-size, weight, color]
  - Required indicator: [asterisk, color]

- Textarea:
  - Classes: [min-height, resize]

- File upload:
  - Drag-and-drop area styling
  - File preview styling
  - Progress indicator (if any)

- Buttons:
  - Primary: [bg, text, hover, active, disabled]
  - Secondary: [bg, text, hover, active, disabled]
  - Cancel/Tertiary: [styling]
  - Loading state: [spinner, text]
```

#### 4. WTF Admin/Management View (if accessible)
**What to Capture:**
- Screenshot of admin view (coach/admin perspective)
- Table layout (if list view)
- Bulk actions UI
- Status badges/chips
- Filter dropdowns
- Action menus (kebab menu or buttons)

**What to Document:**
- Table styling (Radix UI Table or custom)
- Header row styling
- Row hover states
- Status badge colors and styles
- Dropdown menu styling

#### 5. Navigation & Global UI Elements
**What to Capture:**
- Screenshot of top navigation bar
- Screenshot of sidebar navigation
- Notification center/icon
- User profile menu/dropdown
- Coin balance display (critical for Sprint 5!)

**What to Document:**
```markdown
### Navigation Bar
- Height: [px/rem]
- Background: [color, blur, shadow]
- Logo placement and size
- Nav links: [styling, active state, hover]
- User menu: [dropdown styling]

### Sidebar
- Width: [collapsed, expanded]
- Background: [color]
- Nav item: [default, hover, active states]
- Icon size and color
- Text styling

### Coin Balance Display (CRITICAL)
- Container styling
- Icon used (coin icon?)
- Number formatting (commas?)
- Color scheme
- Positioning in header
```

#### 6. Loading, Error, and Empty States
**What to Capture:**
- Loading spinner/skeleton (navigate quickly to catch it)
- Error message styling
- Empty state (if you can clear filters to see it)
- Toast/notification styling (trigger an action to see it)

**What to Document:**
```markdown
### Loading States
- Spinner: [size, color, animation]
- Skeleton: [background, animation, shapes]

### Error States
- Container: [background, border, icon]
- Text: [color, size]
- Retry button: [styling]

### Empty States
- Icon: [size, color]
- Heading: [size, weight, color]
- Description: [size, color]
- CTA button: [styling]

### Toast Notifications
- Position: [top-right, bottom-right, etc.]
- Background: [success, error, info colors]
- Icon: [checkmark, X, info]
- Dismiss button: [styling]
- Duration: [auto-dismiss time]
```

---

## Phase 2: Create Comprehensive Design System (2 hours)

Create a **complete ISF Playground Design System Document** based on patterns observed across ALL application sections, with emphasis on WTF module.

### File to Create: `docs/isf-playground-design-system.md`

**Purpose:** Single source of truth for all UI/UX patterns in the application.

**Structure:**

```markdown
# Sprint 5 ISF Shop - Design System

**Based on:** WTF Module UI Patterns
**Date Extracted:** October 7, 2025
**Source:** https://playground.initiativesewafoundation.com/

---

## 1. Color Palette

### Primary Colors
```css
--primary: [extracted hex]
--primary-hover: [extracted hex]
--primary-active: [extracted hex]
--primary-disabled: [extracted hex]
```

### Secondary Colors
[Continue...]

### Semantic Colors
```css
--success: [green shade]
--error: [red shade]
--warning: [orange/yellow shade]
--info: [blue shade]
```

### Neutral Colors
```css
--background: [extracted]
--foreground: [extracted]
--muted: [extracted]
--border: [extracted]
```

---

## 2. Typography

### Font Family
- Primary: [font-stack]
- Monospace: [for code/numbers]

### Font Sizes (Tailwind Scale)
```
text-xs: [captured size]
text-sm: [captured size]
text-base: [captured size]
text-lg: [captured size]
text-xl: [captured size]
text-2xl: [captured size]
```

### Font Weights
```
font-normal: 400
font-medium: 500
font-semibold: 600
font-bold: 700
```

### Usage Guidelines
- **Headings:** [text-2xl font-bold or similar]
- **Subheadings:** [text-lg font-semibold]
- **Body text:** [text-base font-normal]
- **Captions/Labels:** [text-sm text-gray-600]

---

## 3. Component Patterns

### 3.1 Buttons

**Primary Button:**
```jsx
<button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
  Button Text
</button>
```

**Secondary Button:**
```jsx
<button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 active:bg-gray-400">
  Button Text
</button>
```

**Loading State:**
```jsx
<button disabled className="bg-blue-600 text-white px-4 py-2 rounded-md opacity-70 cursor-not-allowed">
  <Spinner className="inline mr-2" />
  Loading...
</button>
```

### 3.2 Cards

**Product Card Pattern (adapt from WTF pin cards):**
```jsx
<div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
  <img className="w-full h-48 object-cover rounded-md" />
  <h3 className="mt-3 text-lg font-semibold">{title}</h3>
  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{description}</p>
  <div className="mt-3 flex justify-between items-center">
    <span className="text-xl font-bold">{price} coins</span>
    <button className="btn-primary-sm">Add to Cart</button>
  </div>
</div>
```

### 3.3 Forms

**Input Field:**
```jsx
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Product Name <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    placeholder="Enter product name"
  />
  <p className="mt-1 text-sm text-red-600">Error message here</p>
</div>
```

### 3.4 Modals (Radix UI Dialog)

**Modal Pattern:**
```jsx
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md">
      <Dialog.Title className="text-xl font-semibold">Title</Dialog.Title>
      <Dialog.Description className="mt-2 text-sm text-gray-600">
        Description
      </Dialog.Description>
      {/* Content */}
      <Dialog.Close className="absolute top-4 right-4">
        <X className="w-5 h-5" />
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

### 3.5 Tables (Admin Views)

**Table Pattern:**
```jsx
<table className="w-full border-collapse">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
        Column Header
      </th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-t hover:bg-gray-50">
      <td className="px-4 py-3 text-sm">Cell content</td>
    </tr>
  </tbody>
</table>
```

---

## 4. Layout Patterns

### Page Container
```jsx
<div className="min-h-screen bg-gray-50">
  {/* Sidebar */}
  <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r">
    {/* Nav items */}
  </aside>

  {/* Main Content */}
  <main className="ml-64 p-6">
    {/* Page header */}
    <header className="mb-6">
      <h1 className="text-2xl font-bold">Page Title</h1>
      <p className="text-gray-600">Description</p>
    </header>

    {/* Page content */}
    <div>
      {/* Content */}
    </div>
  </main>
</div>
```

### Grid Layouts
```jsx
{/* Product Grid - 4 columns on desktop */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* Cards */}
</div>
```

---

## 5. Interaction Patterns

### Hover Effects
- Cards: `hover:shadow-lg transition-shadow`
- Buttons: `hover:bg-{color}-700 transition-colors`
- Links: `hover:underline`

### Focus States
- Inputs: `focus:ring-2 focus:ring-blue-500 focus:border-blue-500`
- Buttons: `focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`

### Active States
- Buttons: `active:bg-{color}-800`
- Nav items: `bg-blue-50 text-blue-600 border-l-4 border-blue-600`

---

## 6. Responsive Design

### Breakpoints (Tailwind defaults)
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Patterns Observed
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Padding: `p-4 md:p-6`
- Text: `text-base md:text-lg`

---

## 7. Accessibility Patterns

[Document ARIA labels, keyboard navigation patterns observed in WTF]

---

## 8. Animations & Transitions

### Observed Patterns
- Fade in: `animate-fade-in`
- Slide in: `animate-slide-in-right`
- Skeleton pulse: `animate-pulse`

---

## 9. Icons

**Icon Library:** [Identify - likely Lucide React]
**Icon Size:** [Common sizes used]
**Icon Color:** [How icons are colored]

---

## 10. Coin Display Pattern (CRITICAL for Sprint 5)

[Extract exact styling of how coins are displayed throughout the app]

```jsx
<div className="flex items-center gap-2">
  <CoinIcon className="w-5 h-5 text-yellow-500" />
  <span className="text-lg font-semibold">1,250 coins</span>
</div>
```

---
```

---

## Phase 3: Create Visual Component Catalog (1 hour)

Create a **visual reference catalog** that the Architect Agent will use to write frontend specs.

### File to Create: `docs/visual-component-catalog.md`

**Purpose:** Quick reference guide with screenshots and pattern descriptions for common UI components.

**Structure:**

```markdown
# Visual Component Catalog - ISF Playground

**Purpose:** Quick visual reference for Architect Agent to write Sprint 5 frontend specs
**Date Created:** [Date]

---

## Common Patterns

### Buttons
**Primary Button:**
![Screenshot: primary-button.png]
- Classes: `bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700`
- Used for: Main actions (Submit, Save, Add)

**Secondary Button:**
![Screenshot: secondary-button.png]
- Classes: `bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300`
- Used for: Secondary actions (Cancel, Back)

**Loading State:**
![Screenshot: button-loading.png]
- Shows spinner + "Loading..." text
- Disabled with opacity-70

---

### Cards
**Standard Card:**
![Screenshot: card-standard.png]
- Classes: `border border-gray-200 rounded-lg p-4 bg-white`
- Hover: `hover:shadow-lg transition-shadow`
- Used in: WTF pins, product displays, user cards

**Card with Image:**
![Screenshot: card-with-image.png]
- Image container: `aspect-square` or `aspect-video`
- Image: `object-cover rounded-t-lg`
- Content: `p-4`

---

### Forms
**Input Field:**
![Screenshot: input-field.png]
- Label: `block text-sm font-medium text-gray-700 mb-1`
- Input: `w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500`
- Error: Red border + error message below

**Textarea:**
![Screenshot: textarea.png]
- Same styling as input
- Min-height: `min-h-[100px]`
- Resize: `resize-vertical`

**Select Dropdown:**
![Screenshot: select.png]
- Same styling as input
- Arrow icon on right

**File Upload:**
![Screenshot: file-upload.png]
- Drag-drop area styling
- File preview after upload

---

### Tables (Admin Views)
**Data Table:**
![Screenshot: table.png]
- Header: `bg-gray-50 border-b`
- Rows: `hover:bg-gray-50 border-b`
- Actions: Kebab menu or icon buttons

---

### Modals (Radix UI Dialog)
**Standard Modal:**
![Screenshot: modal.png]
- Overlay: `bg-black/50`
- Content: `bg-white rounded-lg p-6 max-w-md`
- Close button: Top-right corner with X icon

---

### Loading States
**Spinner:**
![Screenshot: spinner.png]
- Icon or CSS animation
- Size: `w-5 h-5` for buttons, `w-8 h-8` for page

**Skeleton:**
![Screenshot: skeleton.png]
- Background: `bg-gray-200`
- Animation: `animate-pulse`
- Matches final content shape

---

### Empty States
**No Results:**
![Screenshot: empty-state.png]
- Icon: Large gray icon (e.g., ShoppingBag)
- Heading: `text-xl font-semibold`
- Description: `text-gray-600`
- CTA button

---

### Notifications/Toasts
**Success Toast:**
![Screenshot: toast-success.png]
- Green background
- Checkmark icon
- Auto-dismiss after 3s

**Error Toast:**
![Screenshot: toast-error.png]
- Red background
- X icon
- Manual dismiss

---

## Section-Specific Patterns

### WTF Module Patterns ⭐

**WTF Pin Card:**
![Screenshot: wtf-pin-card.png]
- [Detailed description of WTF pin card styling]
- [Classes used]
- [Interaction states]

**WTF Submission Form:**
![Screenshot: wtf-submission-form.png]
- [Form layout]
- [Field styling]
- [Submit button]

**WTF Modal:**
![Screenshot: wtf-modal.png]
- [Modal dimensions]
- [Content layout]
- [Action buttons]

---

## Navigation Patterns

### Coin Balance Display ⭐
![Screenshot: coin-balance.png]
- Icon: [Type, size, color]
- Number: [Font size, weight, formatting (1,250)]
- Container: [Classes]
- Exact placement in header

### Sidebar Active State
![Screenshot: sidebar-active.png]
- Active indicator: Blue left border
- Background: `bg-blue-50`
- Text: `text-blue-600`

---

## Color Palette

**Primary:**
- Blue 600: `#2563EB` (buttons, links)
- Blue 700: `#1D4ED8` (hover)

**Secondary:**
- Gray 200: `#E5E7EB` (borders)
- Gray 600: `#4B5563` (secondary text)

**Semantic:**
- Success Green: `#10B981`
- Error Red: `#EF4444`
- Warning Orange: `#F59E0B`

[Continue with complete palette discovered...]

---

## Typography

**Headings:**
- H1: `text-2xl font-bold`
- H2: `text-xl font-semibold`
- H3: `text-lg font-semibold`

**Body:**
- Base: `text-base font-normal`
- Small: `text-sm`
- Tiny: `text-xs`

---

## Icons

**Library:** [Lucide React / Heroicons / etc.]
**Common sizes:**
- Small: `w-4 h-4`
- Medium: `w-5 h-5`
- Large: `w-6 h-6`

---

## Detailed Frontend Specification

### Page Layout

**URL:** `/shop/products` (for Story 01 example)

**Layout Structure:**
```
┌─────────────────────────────────────────────────┐
│  Top Navigation Bar (Global)                    │
│  [Logo] [Nav Links] [Coin Balance] [Profile]   │
├──────────┬──────────────────────────────────────┤
│          │                                       │
│ Sidebar  │  Main Content Area                   │
│          │                                       │
│ [Home]   │  ┌─────────────────────────────┐    │
│ [Tasks]  │  │ Page Header                 │    │
│ [WTF]    │  │ [Title] [Breadcrumb]        │    │
│►[Shop]   │  └─────────────────────────────┘    │
│ [Profile]│                                       │
│          │  ┌─────────────────────────────┐    │
│          │  │ Filter Panel                │    │
│          │  │ [Search] [Category] [Price] │    │
│          │  └─────────────────────────────┘    │
│          │                                       │
│          │  ┌─────────────────────────────┐    │
│          │  │ Product Grid (4 columns)    │    │
│          │  │ [Card] [Card] [Card] [Card] │    │
│          │  │ [Card] [Card] [Card] [Card] │    │
│          │  └─────────────────────────────┘    │
│          │                                       │
│          │  [Pagination]                        │
│          │                                       │
└──────────┴──────────────────────────────────────┘
```

---

### Component Specifications

#### 1. ProductList.jsx (Main Container)

**File:** `frontend/src/components/shop/ProductList.jsx`

**Purpose:** Main container component that orchestrates product browsing experience.

**Props:** None (uses Zustand store)

**State Management:**
```javascript
// Uses Zustand store
const {
  products,
  loading,
  error,
  filters,
  pagination
} = useShopStore();

const { refetch } = useShopProducts();
```

**JSX Structure:**
```jsx
export default function ProductList() {
  const { products, loading, error, filters } = useShopStore();
  const { refetch } = useShopProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <header className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">ISF Shop</h1>
        <p className="text-sm text-gray-600 mt-1">
          Browse and purchase items with your earned coins
        </p>
      </header>

      <div className="px-6 py-6">
        {/* Filter Panel */}
        <FilterPanel />

        {/* Loading State */}
        {loading && <ProductGridSkeleton />}

        {/* Error State */}
        {error && <ErrorState message={error} onRetry={refetch} />}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <EmptyState
            title="No products found"
            description="Try adjusting your filters"
          />
        )}

        {/* Product Grid */}
        {!loading && !error && products.length > 0 && (
          <>
            <ProductGrid products={products} />
            <Pagination />
          </>
        )}
      </div>
    </div>
  );
}
```

**Styling Notes:**
- Follows WTF module page structure
- Gray background (`bg-gray-50`) for content area
- White header with border-bottom
- 6-unit padding throughout (`px-6 py-6`)

---

#### 2. FilterPanel.jsx

**File:** `frontend/src/components/shop/components/FilterPanel.jsx`

**Purpose:** Provides filtering controls (category, search, price range).

**Props:** None (uses Zustand store)

**JSX Structure:**
```jsx
export default function FilterPanel() {
  const { filters, setFilters, resetFilters } = useShopStore();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Products
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              placeholder="Search by name or description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => setFilters({ category: e.target.value || null })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            <option value="stationery">Stationery</option>
            <option value="sports">Sports</option>
            <option value="books">Books</option>
            <option value="uniforms">Uniforms</option>
            <option value="digital">Digital</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            value={filters.maxPrice || ''}
            onChange={(e) => setFilters({ maxPrice: e.target.value ? Number(e.target.value) : null })}
            placeholder="Any"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Active Filters & Reset */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          {filters.category && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
              Category: {filters.category}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setFilters({ category: null })}
              />
            </span>
          )}
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
              Search: {filters.search}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setFilters({ search: '' })}
              />
            </span>
          )}
        </div>

        {(filters.category || filters.search || filters.maxPrice) && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}
```

**Styling Notes:**
- White background card with border
- Grid layout: 4 columns on desktop, 1 on mobile
- Form inputs match WTF module pattern
- Active filter badges with remove option

---

#### 3. ProductCard.jsx

**File:** `frontend/src/components/shop/components/ProductCard.jsx`

**Purpose:** Display individual product with image, name, price, stock status, and add-to-cart button.

**Props:**
```typescript
interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    currentPrice: number;
    stock: number;
    imageUrl?: string;
    category: string;
    inStock: boolean;
    lowStock: boolean;
  };
}
```

**JSX Structure:**
```jsx
import { ShoppingCart, Package } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(product, 1);
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-16 h-16 text-gray-300" />
          </div>
        )}

        {/* Discount Badge */}
        {product.discountPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
          </div>
        )}

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white px-4 py-2 rounded-md font-semibold text-gray-900">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category Badge */}
        <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded mb-2">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 min-h-[56px]">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="mt-2 text-sm text-gray-600 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="mt-4 flex items-center gap-2">
          {product.discountPrice ? (
            <>
              <span className="text-2xl font-bold text-green-600">
                {product.discountPrice} coins
              </span>
              <span className="text-sm text-gray-400 line-through">
                {product.price} coins
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-gray-900">
              {product.price} coins
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.inStock && product.lowStock && (
          <p className="mt-2 text-sm text-orange-600 font-medium">
            Only {product.stock} left in stock!
          </p>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
          className={`
            w-full mt-4 py-2 px-4 rounded-md font-medium transition-colors
            flex items-center justify-center gap-2
            ${product.inStock
              ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }
            ${isAdding ? 'opacity-70' : ''}
          `}
        >
          {isAdding ? (
            <>
              <Spinner className="w-4 h-4 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
```

**Styling Notes:**
- Card follows WTF pin card pattern (border, rounded, hover shadow)
- Aspect-square for images (1:1 ratio)
- Line-clamp for truncating text
- Min-height to maintain consistent card heights
- Discount badge: red badge, top-right corner
- Button: full width, matches WTF action buttons
- Stock status: orange warning color

**Interaction States:**
1. **Default:** White background, gray border
2. **Hover:** Shadow-lg appears
3. **Adding to Cart:** Button disabled, spinner shown
4. **Out of Stock:** Gray overlay on image, button disabled

---

#### 4. ProductGrid.jsx

**File:** `frontend/src/components/shop/components/ProductGrid.jsx`

**Purpose:** Grid container for product cards.

**JSX Structure:**
```jsx
export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
```

**Responsive Breakpoints:**
- Mobile: 1 column
- Tablet (sm): 2 columns
- Desktop (lg): 3 columns
- Large Desktop (xl): 4 columns
- Gap: 6 units (24px)

---

#### 5. Pagination.jsx

**File:** `frontend/src/components/shop/components/Pagination.jsx`

**Purpose:** Navigate between product pages.

**JSX Structure:**
```jsx
export default function Pagination() {
  const { pagination, setPagination } = useShopStore();
  const { page, pages, total } = pagination;

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= pages) {
      setPagination({ ...pagination, page: newPage });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (pages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-between border-t pt-6">
      {/* Page Info */}
      <p className="text-sm text-gray-600">
        Showing page <span className="font-medium">{page}</span> of{' '}
        <span className="font-medium">{pages}</span> ({total} total products)
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex gap-1">
          {[...Array(pages)].map((_, i) => {
            const pageNum = i + 1;
            // Show first, last, current, and +/- 1 from current
            if (
              pageNum === 1 ||
              pageNum === pages ||
              Math.abs(pageNum - page) <= 1
            ) {
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`
                    w-10 h-10 rounded-md font-medium
                    ${pageNum === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  {pageNum}
                </button>
              );
            } else if (Math.abs(pageNum - page) === 2) {
              return <span key={pageNum} className="px-2">...</span>;
            }
            return null;
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === pages}
          className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

---

#### 6. Loading States

**ProductGridSkeleton.jsx:**
```jsx
export default function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
          {/* Image skeleton */}
          <div className="aspect-square bg-gray-200"></div>

          {/* Content skeleton */}
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-2/3 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

#### 7. Error State

**ErrorState.jsx:**
```jsx
import { AlertCircle } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Failed to load products
      </h3>
      <p className="text-gray-600 mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}
```

---

#### 8. Empty State

**EmptyState.jsx:**
```jsx
import { ShoppingBag } from 'lucide-react';

export default function EmptyState({ title, description }) {
  const { resetFilters } = useShopStore();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <button
        onClick={resetFilters}
        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
      >
        Clear Filters
      </button>
    </div>
  );
}
```

---

### Accessibility Checklist

- [ ] All images have descriptive alt text (`alt={product.name}`)
- [ ] Search input has `aria-label="Search products"`
- [ ] Filter controls have proper labels
- [ ] Add to Cart button has `aria-disabled` when out of stock
- [ ] Pagination buttons have `aria-label` (e.g., "Go to page 2")
- [ ] Current page highlighted with `aria-current="page"`
- [ ] Loading state announced with `aria-live="polite"`
- [ ] Focus indicators visible on all interactive elements
- [ ] Keyboard navigation: Tab through filters, cards, buttons
- [ ] Color contrast ratio ≥ 4.5:1 (WCAG AA compliant)

---

### Performance Optimizations

1. **Image Lazy Loading:**
   - Use `loading="lazy"` on product images
   - Only load images in viewport

2. **Debounced Search:**
   - Search input debounced 300ms to reduce API calls

3. **Skeleton Loading:**
   - Show skeleton immediately (no blank screen)
   - Improves perceived performance

4. **Pagination:**
   - Limit to 20 products per page
   - Reduces initial load time

5. **Memo/Optimization:**
   ```jsx
   const MemoizedProductCard = React.memo(ProductCard);
   ```

---

### Responsive Behavior

**Mobile (< 640px):**
- 1 column grid
- Full-width filter panel
- Stack filter inputs vertically
- Larger touch targets (min 44px)

**Tablet (640px - 1024px):**
- 2 column grid
- Horizontal filter panel
- Pagination controls scale down

**Desktop (> 1024px):**
- 3-4 column grid
- Full filter panel with all controls visible
- Pagination with page numbers

---

### Testing Requirements

**Visual Regression Tests:**
- [ ] Product card renders correctly (with/without image)
- [ ] Discount badge appears for discounted products
- [ ] Out of stock overlay displays properly
- [ ] Loading skeleton matches card dimensions
- [ ] Error state centered and styled correctly
- [ ] Empty state displays with icon and CTA

**Interaction Tests:**
- [ ] Click "Add to Cart" → Cart count increments
- [ ] Change category filter → Products update
- [ ] Type in search → Results filter (debounced)
- [ ] Click pagination → Page changes, scroll to top
- [ ] Hover card → Shadow appears
- [ ] Click product → Navigate to detail page (if implemented)

---

### Design System References

**Colors Used:**
- Primary Blue: `bg-blue-600`, `text-blue-600`
- Success Green: `text-green-600` (discount price)
- Warning Orange: `text-orange-600` (low stock)
- Error Red: `bg-red-500` (discount badge)
- Gray Scale: `gray-50`, `gray-100`, `gray-200`, `gray-600`, `gray-900`

**Components Used:**
- Tailwind CSS utilities
- Lucide React icons (`ShoppingCart`, `Search`, `Package`, `AlertCircle`, `ShoppingBag`, `X`)
- React Toast notifications (for cart feedback)

---
```

---

## Phase 4: Create Summary Document (30 minutes)

### File to Create: `docs/sprint5-frontend-specification-summary.md`

**Purpose:** High-level summary for developers to understand the frontend work.

**Structure:**

```markdown
# Sprint 5 Frontend Specification - Summary

**Date Created:** October 7, 2025
**Based on:** WTF Module UI Patterns
**Status:** Complete

---

## Overview

All 12 Sprint 5 ISF Shop stories have been updated with comprehensive frontend specifications. The UI design follows the established WTF module patterns that the client loves.

---

## Key Design Principles

1. **Consistency:** Match WTF module's visual language
2. **Component Reusability:** Extract common patterns
3. **Accessibility:** WCAG 2.1 AA compliance
4. **Responsiveness:** Mobile-first approach
5. **Performance:** Lazy loading, debouncing, skeleton states

---

## Component Library Overview

### Shop Components (Student-Facing)
- `ProductList.jsx` - Main container
- `ProductCard.jsx` - Individual product display
- `ProductGrid.jsx` - Grid layout
- `FilterPanel.jsx` - Search & filter controls
- `Pagination.jsx` - Page navigation
- `Cart.jsx` - Shopping cart drawer
- `Checkout.jsx` - Checkout flow
- `OrderHistory.jsx` - Past orders
- `OrderDetail.jsx` - Order details

### Admin Components
- `ProductManagement.jsx` - Product list (admin)
- `ProductForm.jsx` - Create/edit product
- `InventoryDashboard.jsx` - Stock management
- `OrderManagement.jsx` - Order list (admin)
- `ShopAnalytics.jsx` - Analytics dashboard

### Shared Components
- `CoinBalance.jsx` - Display coin balance
- `EmptyState.jsx` - No results state
- `ErrorState.jsx` - Error handling
- `LoadingSkeleton.jsx` - Loading states
- `ConfirmDialog.jsx` - Confirmation modals

---

## Story Status

| Story ID | Frontend Spec Status | Components Defined | Screenshots Taken |
|----------|----------------------|---------------------|-------------------|
| Sprint5-Story-01 | ✅ Complete | 8 components | 5 screenshots |
| Sprint5-Story-02 | ✅ Complete | 6 components | 4 screenshots |
| Sprint5-Story-03 | ✅ Complete | 7 components | 6 screenshots |
| Sprint5-Story-04 | ✅ Complete | 4 components | 3 screenshots |
| Sprint5-Story-05 | ✅ Complete | 5 components | 4 screenshots |
| Sprint5-Story-06 | ✅ Complete | 4 components | 3 screenshots |
| Sprint5-Story-07 | ✅ Complete | 3 components | 2 screenshots |
| Sprint5-Story-08 | ✅ Complete | 2 components | 2 screenshots |
| Sprint5-Story-09 | ✅ Complete | 4 components | 3 screenshots |
| Sprint5-Story-10 | ✅ Complete | 3 components | 2 screenshots |
| Sprint5-Story-11 | ✅ Complete | 6 components | 5 screenshots |
| Sprint5-Story-12 | ✅ Complete | 4 components | 3 screenshots |

**Total:** 56 components defined, 42 screenshots captured

---

## Design System Assets

**Created Files:**
1. `docs/sprint5-design-system.md` - Complete design system
2. `docs/screenshots/wtf-module/` - 15+ WTF UI screenshots
3. `docs/screenshots/sprint5-mockups/` - Component mockups (if created)

---

## Developer Handoff Checklist

### For Developers Starting Sprint 5

**Before Coding:**
- [ ] Read `docs/sprint5-design-system.md`
- [ ] Review WTF module screenshots in `docs/screenshots/wtf-module/`
- [ ] Read story frontend specifications (pick your assigned story)
- [ ] Setup Zustand, Tailwind, Radix UI (if not already)
- [ ] Install Lucide React icons

**During Development:**
- [ ] Refer to component JSX examples in story files
- [ ] Match exact Tailwind classes from design system
- [ ] Test responsive behavior at all breakpoints
- [ ] Implement all loading/error/empty states
- [ ] Add accessibility attributes (aria-labels, etc.)

**After Development:**
- [ ] Compare your implementation with WTF screenshots
- [ ] Run accessibility audit (Lighthouse, axe-core)
- [ ] Test keyboard navigation
- [ ] Verify hover/focus states match design system
- [ ] Get UI review from QA

---

## Next Steps

1. **Developers:** Start implementing stories in recommended order
2. **QA:** Use screenshots for visual regression testing
3. **PM:** Review mockups if any changes needed
4. **Client:** Final UI review after first few components built

---

**Report Complete**
**Total Time:** ~6-7 hours
**Files Created:** 15+ files (design system + 12 updated stories + summary)
**Screenshots:** 42+ screenshots
```

---

## Your Deliverables Checklist

At the end of this mission, you should have created:

### Phase 1: Complete Application Documentation
- [ ] **100+ screenshots** organized by section:
  - `docs/screenshots/authentication/` (5-10 screenshots)
  - `docs/screenshots/global-navigation/` (10-15 screenshots)
  - `docs/screenshots/dashboard/` (5-10 screenshots)
  - `docs/screenshots/user-management/` (10-15 screenshots)
  - `docs/screenshots/balagruha/` (5-10 screenshots)
  - `docs/screenshots/machine-tracking/` (5-10 screenshots)
  - `docs/screenshots/task-management/` (10-15 screenshots)
  - `docs/screenshots/wtf-module/` ⭐ (30-40 screenshots - PRIMARY FOCUS)
  - `docs/screenshots/student-profiles/` (5-10 screenshots)
  - `docs/screenshots/notifications/` (5-10 screenshots)
  - `docs/screenshots/settings/` (5-10 screenshots)
- [ ] Notes on component patterns observed in each section
- [ ] Identification of design inconsistencies (if any)
- [ ] Catalog of all UI components used across the app

### Phase 2: Complete Design System Document
- [ ] `docs/isf-playground-design-system.md` created (comprehensive)
- [ ] Color palette documented with hex codes
- [ ] Typography patterns captured
- [ ] Button patterns (primary, secondary, disabled, loading)
- [ ] Form input patterns
- [ ] Card/modal patterns
- [ ] Table patterns (admin)
- [ ] Loading/error/empty state patterns
- [ ] Coin balance display pattern (CRITICAL)

### Phase 3: Visual Component Catalog
- [ ] `docs/visual-component-catalog.md` created
- [ ] Screenshots for each common pattern (buttons, cards, forms, tables, modals)
- [ ] WTF module specific patterns documented
- [ ] Coin balance display documented ⭐
- [ ] Navigation patterns documented
- [ ] Color palette extracted
- [ ] Typography scale documented
- [ ] Icon library identified

### Phase 4: Summary Document
- [ ] `docs/sprint5-frontend-specification-summary.md` created
- [ ] Component inventory documented
- [ ] Story status table completed
- [ ] Developer handoff checklist provided

---

## Tips for Success

1. **Take LOTS of screenshots:** More is better. Capture hover states, open modals, etc.

2. **Inspect elements carefully:** Right-click → Inspect to see exact Tailwind classes used.

3. **Test interactions:** Click buttons, open modals, trigger errors to see all states.

4. **Document patterns, not perfection:** If you find inconsistencies in Sprint 1 code, document what works best.

5. **Focus on WTF module:** Client loves it - make Sprint 5 look like WTF's sibling.

6. **Be specific with colors:** Don't say "blue" - say `bg-blue-600` or `#2563EB`.

7. **Capture coin display carefully:** This is critical for Sprint 5 integration.

8. **Mobile testing:** Use Playwright to test responsive breakpoints.

---

## Questions to Answer

As you explore, answer these in your final report:

1. **What makes the WTF UI successful?** (Why does the client love it?)
2. **What patterns should Sprint 5 definitely copy?**
3. **What patterns should Sprint 5 avoid?** (If you see Sprint 1 anti-patterns)
4. **How are coins displayed throughout the app?** (Exact styling)
5. **What's the navigation pattern?** (Sidebar, tabs, breadcrumbs?)
6. **How are forms styled?** (Labels, inputs, validation errors)
7. **What's the loading pattern?** (Spinner? Skeleton? Both?)
8. **How are success/error messages shown?** (Toast? Modal? Inline?)

---

## Final Report Format

When you complete this mission, provide a comprehensive report back with:

```markdown
# UI/UX Agent - Complete ISF Playground UI Documentation Report

**Date Completed:** [Date]
**Agent:** UI/UX Designer Agent
**Status:** ✅ Complete
**Duration:** [X hours]

---

## Executive Summary

[3-5 paragraphs summarizing:
- What you discovered across the entire application
- Overall UI/UX quality assessment
- Primary patterns identified
- Key recommendations for Sprint 5
- Long-term value of this documentation]

---

## Application Coverage

### Sections Documented

| Section | Screenshots | Pages Explored | Component Patterns | UI Quality Rating |
|---------|-------------|----------------|-------------------|-------------------|
| Authentication | 8 | 3 | 5 | ⭐⭐⭐⭐ |
| Global Navigation | 12 | N/A | 8 | ⭐⭐⭐⭐ |
| Dashboard | 6 | 1 | 4 | ⭐⭐⭐ |
| User Management | 14 | 5 | 10 | ⭐⭐⭐⭐ |
| Balagruha | 8 | 3 | 6 | ⭐⭐⭐ |
| Machine Tracking | 7 | 2 | 5 | ⭐⭐⭐ |
| Task Management | 12 | 4 | 8 | ⭐⭐⭐⭐ |
| **WTF Module** | **38** | **7** | **15** | **⭐⭐⭐⭐⭐** |
| Student Profiles | 6 | 2 | 4 | ⭐⭐⭐ |
| Notifications | 8 | 1 | 6 | ⭐⭐⭐⭐ |
| Settings | 5 | 2 | 3 | ⭐⭐⭐ |
| **TOTAL** | **124** | **30** | **74** | **⭐⭐⭐⭐** |

**Overall Assessment:** [Brief assessment of application UI quality]

---

## Design System Analysis

### Color Palette Discovery
- Primary colors: [list with hex codes]
- Secondary colors: [list with hex codes]
- Semantic colors: [success, error, warning, info]
- Neutral scale: [grays, backgrounds]

### Typography Patterns
- Font families used: [list]
- Font sizes: [documented scale]
- Common patterns: [headings, body, labels]

### Component Library Identified
[List of all reusable components discovered]

---

## Section-by-Section Findings

### 1. Authentication
**Key Findings:**
- [Finding about login UI]
- [Finding about form patterns]

**Patterns to Reuse:**
- [Pattern 1]

### 2. Global Navigation
**Key Findings:**
- [Coin balance display pattern ⭐]
- [Sidebar navigation pattern]

**Patterns to Reuse:**
- [Pattern 1]

### 3. Dashboard
[Continue for each section...]

### 8. WTF Module ⭐ PRIMARY ANALYSIS

**Key Findings:**
- [Finding 1 - Why client loves it]
- [Finding 2 - Standout patterns]
- [Finding 3 - Component quality]

**Design Patterns Identified:**
- [Pattern 1 with screenshot reference]
- [Pattern 2 with screenshot reference]
- [Pattern 3 with screenshot reference]

**Client's Favorite Elements:**
[Deep analysis of why they love the WTF UI]

**Sprint 5 Recommendations:**
[Specific recommendations for which WTF patterns to copy for Shop]

---

## Deliverables Created

1. **Design System Document:** `docs/sprint5-design-system.md` (X KB)
2. **Story Updates:** 12 files updated with frontend specs
3. **Screenshots:** 42 screenshots in `docs/screenshots/wtf-module/`
4. **Summary Document:** `docs/sprint5-frontend-specification-summary.md`

---

## Key Recommendations

1. [Recommendation 1]
2. [Recommendation 2]
3. [Recommendation 3]

---

## Developer Handoff

Developers can now:
✅ Start Story-01 (Product Catalog) with complete frontend specs
✅ Reference design system for all UI decisions
✅ Match WTF module's visual quality
✅ Build consistently across all 12 stories

---

## Screenshots Inventory

[List key screenshots with descriptions]

---

## Next Steps

[What should happen next]

---

**Mission Complete** ✅
**Total Time:** X hours
**Total Files Created:** X files
**Total Screenshots:** X screenshots
```

---

## Important Reminders

1. **Use Playwright extensively** - It's your primary tool
2. **Login first** with provided credentials
3. **Navigate to WTF module** - This is the reference UI
4. **Take screenshots of EVERYTHING** - Hover states, modals, forms
5. **Inspect elements** - Get exact Tailwind classes
6. **Document patterns** - JSX examples in story files
7. **Be thorough** - This is the foundation for all Sprint 5 frontend work
8. **Report back** - Comprehensive report with all findings

---

**Good luck! You are creating a foundational resource that will serve the ISF Playground project for years to come. The completeness and quality of your documentation will directly impact Sprint 5 success AND all future development.**

---

## Mission Success Criteria

Your mission is considered **successfully complete** when:

✅ **Coverage:** Every accessible section of the application documented
✅ **Screenshots:** 100+ high-quality screenshots organized by section
✅ **Design System:** Complete `docs/isf-playground-design-system.md` created
✅ **Visual Catalog:** `docs/visual-component-catalog.md` with pattern examples
✅ **WTF Emphasis:** 30-40% of effort spent on WTF module (client's favorite)
✅ **Patterns:** All reusable components catalogued
✅ **Consistency:** Design inconsistencies identified (if any)
✅ **Report:** Comprehensive final report with recommendations
✅ **Quality:** All documentation clear, actionable, and detailed
✅ **Handoff Ready:** Architect Agent can read docs and update stories without needing screenshots

---

## Time Budget

**Total Estimated Time:** 9-10 hours

**Phase 1:** Complete Application Documentation (6-8 hours)
- Authentication: 30 min
- Global Navigation: 1 hour
- Dashboard: 30 min
- User Management: 45 min
- Balagruha: 30 min
- Machine Tracking: 30 min
- Task Management: 45 min
- **WTF Module: 2-3 hours** ⭐
- Student Profiles: 30 min
- Notifications: 30 min
- Settings: 30 min

**Phase 2:** Design System Document (2 hours)
**Phase 3:** Visual Component Catalog (1 hour)
**Phase 4:** Final Report (30 min)

**IMPORTANT:** You will NOT update the Sprint 5 story files. The Architect Agent will do that after reading your design system and visual catalog documentation. Your job is pure visual documentation.

---

## Priority if Time is Limited

If you need to prioritize due to time constraints:

**Must Have (P0):**
1. ✅ WTF Module (comprehensive - 2-3 hours)
2. ✅ Global Navigation + Coin Balance (1 hour)
3. ✅ Design System Document (2 hours)
4. ✅ Visual Component Catalog (1 hour)

**Should Have (P1):**
5. ✅ User Management (45 min)
6. ✅ Task Management (45 min)
7. ✅ Dashboard (30 min)

**Nice to Have (P2):**
8. ⚠️ Balagruha (30 min)
9. ⚠️ Machine Tracking (30 min)
10. ⚠️ Settings (30 min)

**Minimum acceptable:** P0 + P1 = ~8 hours

---

**Good luck! The success of Sprint 5 frontend AND all future development depends on your thorough analysis.**

---

**END OF INSTRUCTIONS**

**Last Updated:** October 7, 2025 - 9:14 PM
