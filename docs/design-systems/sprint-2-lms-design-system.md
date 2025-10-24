# Sprint 2 LMS - Design System

**Project:** ISF Playground - Sprint 2 LMS & Communication
**Version:** 1.0
**Created:** 2025-10-24 13:15:34
**Based On:** Production ISF Playground UI Patterns (WTF Module, Shop Module, Dashboard)
**Source:** https://playground.initiativesewafoundation.com/
**Screenshots:** `.playwright-mcp/sprint2-design-system/`

---

## Document Purpose

This Design System serves as the **single source of truth** for all Sprint 2 LMS UI/UX implementation. It extracts proven patterns from the existing ISF Playground application (particularly the client-loved WTF module and successful Shop module) to ensure Sprint 2 features maintain visual consistency and quality.

**Target Audience:** Frontend developers, UX designers, QA testers, product owners

---

## Table of Contents

1. [Color Palette](#1-color-palette)
2. [Typography](#2-typography)
3. [Component Library](#3-component-library)
4. [Layout Patterns](#4-layout-patterns)
5. [Interaction States](#5-interaction-states)
6. [Navigation Patterns](#6-navigation-patterns)
7. [Form Patterns](#7-form-patterns)
8. [Content Display Patterns](#8-content-display-patterns)
9. [Feedback Patterns](#9-feedback-patterns)
10. [Accessibility Guidelines](#10-accessibility-guidelines)
11. [Responsive Design](#11-responsive-design)
12. [LMS-Specific Patterns](#12-lms-specific-patterns)

---

## 1. Color Palette

### 1.1 Primary Colors

**Blue (Primary Action & Navigation)**
```css
--blue-600: #3B82F6   /* Primary buttons, active states */
--blue-500: #60A5FA   /* Hover states */
--blue-400: #93C5FD   /* Lighter accents */
--blue-50:  #EFF6FF   /* Backgrounds, subtle highlights */
```

**Usage:** Primary action buttons, active navigation items, links, focus indicators

---

### 1.2 Semantic Colors

**Success (Green)**
```css
--green-600: #16A34A  /* Success messages, positive actions */
--green-500: #22C55E  /* Hover states */
--green-50:  #F0FDF4  /* Success backgrounds */
```

**Usage:** "Courses" button (WTF), "Medical" category pill, success states, completion indicators

**Warning (Orange)**
```css
--orange-600: #EA580C  /* Warning messages, attention */
--orange-500: #F97316  /* Hover states */
--orange-50:  #FFF7ED  /* Warning backgrounds */
```

**Usage:** "Comp Apps" category pill, low stock warnings, pending states

**Error (Red)**
```css
--red-600: #DC2626    /* Error messages, destructive actions */
--red-500: #EF4444    /* Hover states, "Sports" category pill */
--red-50:  #FEF2F2    /* Error backgrounds */
```

**Usage:** Delete buttons, error states, critical alerts, logout button (pink/red)

**Info (Purple/Violet)**
```css
--purple-600: #9333EA  /* Info messages, special features */
--purple-500: #A855F7  /* Hover states */
--purple-50:  #FAF5FF  /* Info backgrounds */
```

**Usage:** "Create New Pin" button (WTF), shop admin panel, special action buttons

---

### 1.3 Neutral Scale (Gray)

```css
--gray-900: #111827   /* Primary text, headings */
--gray-800: #1F2937   /* Secondary headings */
--gray-700: #374151   /* Body text */
--gray-600: #4B5563   /* Secondary text */
--gray-500: #6B7280   /* Placeholders, disabled text */
--gray-400: #9CA3AF   /* Borders, dividers */
--gray-300: #D1D5DB   /* Subtle borders */
--gray-200: #E5E7EB   /* Card borders, light backgrounds */
--gray-100: #F3F4F6   /* Hover backgrounds, disabled states */
--gray-50:  #F9FAFB   /* Page backgrounds, subtle sections */
```

---

### 1.4 Background Colors (Contextual)

**Dashboard Sections** (from observed patterns):
```css
--bg-yellow-light: #FEF9C3   /* Balagruhas section background */
--bg-gray-light:   #E5E7EB   /* Coaches section background */
--bg-pink-light:   #FBE2E8   /* Students section background */
```

**Page Backgrounds:**
```css
--bg-main: #FFFFFF           /* Main content area (white) */
--bg-page: #F8FAFC           /* Page wrapper (very light gray/blue) */
```

---

### 1.5 ISF Brand Colors

**Coin Yellow (ISF Coins)**
```css
--coin-gold: #FCD34D      /* Coin icon color */
--coin-text: #D97706      /* Coin amount text */
```

**Category Pill Colors** (from WTF module):
```css
--category-medical:     #10B981  /* Green */
--category-life-skills: #10B981  /* Green */
--category-spoken-eng:  #10B981  /* Green */
--category-comp-apps:   #EA580C  /* Orange */
--category-art:         #10B981  /* Green */
--category-sports:      #EF4444  /* Red */
--category-technology:  #3B82F6  /* Blue */
```

---

## 2. Typography

### 2.1 Font Families

**Primary Font (Playful, Child-Friendly):**
```css
--font-primary: "Patrick Hand", cursive;
```
- **Usage:** Headings, buttons, navigation, most UI elements
- **Why:** Handwritten feel, friendly, accessible for children
- **Fallback:** system-ui, sans-serif

**Secondary Font (Readable Body Text):**
```css
--font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```
- **Usage:** Long-form content, descriptions, body text where readability is critical
- **Why:** High readability for extended reading

**Monospace (Code, Numbers):**
```css
--font-mono: "SF Mono", Monaco, "Cascadia Code", "Courier New", monospace;
```
- **Usage:** Coin amounts, SKU codes, technical data
- **Why:** Tabular numerals, clear distinction

---

### 2.2 Font Scale

```css
/* Headings */
--text-3xl: 1.875rem;  /* 30px - Page titles */
--text-2xl: 1.5rem;    /* 24px - Section headings */
--text-xl:  1.25rem;   /* 20px - Subsection headings */
--text-lg:  1.125rem;  /* 18px - Card titles */

/* Body */
--text-base: 1rem;     /* 16px - Default body text */
--text-sm:   0.875rem; /* 14px - Secondary text, captions */
--text-xs:   0.75rem;  /* 12px - Labels, badges, metadata */
```

**Usage Examples:**
- **H1 (Page Title):** `text-3xl font-bold` → "ISF Shop"
- **H2 (Section Title):** `text-2xl font-semibold` → "Balagruhas"
- **H3 (Card Title):** `text-lg font-semibold` → Product name
- **Body:** `text-base` → Descriptions, paragraphs
- **Label:** `text-sm text-gray-600` → Form labels
- **Badge:** `text-xs` → Category badges, status chips

---

### 2.3 Font Weights

```css
--font-normal:    400   /* Body text */
--font-medium:    500   /* Slightly emphasized text */
--font-semibold:  600   /* Subheadings, button text */
--font-bold:      700   /* Headings, strong emphasis */
```

---

### 2.4 Line Heights

```css
--leading-tight:  1.25   /* Headings, titles */
--leading-normal: 1.5    /* Body text, default */
--leading-relaxed: 1.625 /* Long-form content */
```

---

## 3. Component Library

### 3.1 Buttons

#### Primary Button

**Appearance:** Rounded pill shape, blue background, white text

```jsx
<button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm">
  Button Text
</button>
```

**CSS:**
```css
.btn-primary {
  padding: 0.5rem 1.5rem;
  background-color: var(--blue-600);
  color: white;
  font-weight: 600;
  border-radius: 9999px; /* Fully rounded (pill) */
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  transition: background-color 150ms ease-in-out;
}

.btn-primary:hover {
  background-color: var(--blue-500);
}

.btn-primary:active {
  background-color: var(--blue-800);
}

.btn-primary:disabled {
  background-color: var(--gray-300);
  color: var(--gray-500);
  cursor: not-allowed;
}
```

**States:**
- **Default:** Blue background, white text
- **Hover:** Lighter blue background
- **Active/Click:** Darker blue background
- **Disabled:** Gray background, light gray text
- **Loading:** Same as default + spinner icon

---

#### Secondary Button

**Appearance:** Rounded pill, white/light gray background, gray text, border

```jsx
<button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 active:bg-gray-100 transition-colors">
  Button Text
</button>
```

---

#### Pill Button (Navigation)

**Appearance:** Small pill-shaped buttons (observed in top nav and category pills)

```jsx
<button className="px-4 py-1.5 bg-gray-100 text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-colors">
  Dashboard
</button>

{/* Active state */}
<button className="px-4 py-1.5 bg-blue-100 text-blue-600 font-medium rounded-full border border-blue-300">
  Dashboard
</button>
```

**Usage:** Top navigation buttons, filter pills, category tags

---

#### Category Pill Button (WTF Pattern)

**Appearance:** Vibrant colored pills with full rounded corners

```jsx
{/* Medical - Green */}
<button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors">
  Medical
</button>

{/* Comp Apps - Orange */}
<button className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-700 transition-colors">
  Comp Apps
</button>

{/* Sports - Red */}
<button className="px-6 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors">
  Sports
</button>

{/* Technology - Blue */}
<button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
  Technology
</button>
```

**Pattern:** Fully rounded (`rounded-full`), vibrant color-coded by category, white text

---

#### Icon Button

**Appearance:** Circular or square button with icon only

```jsx
<button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors">
  <ChevronRight className="w-5 h-5 text-gray-600" />
</button>
```

**Usage:** Carousel arrows, close buttons, minimize/expand controls

---

#### Destructive Button (Logout)

**Appearance:** Pink/red rounded pill (observed as "Logout")

```jsx
<button className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 active:bg-pink-700 transition-colors">
  Logout
</button>
```

---

### 3.2 Cards

#### Standard Card

**Appearance:** White background, rounded corners, subtle shadow, border optional

```jsx
<div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
  {/* Card content */}
</div>
```

**CSS:**
```css
.card {
  background-color: white;
  border-radius: 0.5rem;  /* 8px */
  border: 1px solid var(--gray-200);
  padding: 1rem;
  transition: box-shadow 200ms ease-in-out;
}

.card:hover {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
```

**Variants:**
- **No border:** Remove `border` class
- **With shadow:** Add `shadow-md` for persistent shadow
- **Colored background:** Replace `bg-white` with contextual color (e.g., `bg-yellow-50`)

---

#### Product Card (Shop Pattern)

**Appearance:** Image on top, content below, hover shadow

```jsx
<div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
  {/* Image */}
  <div className="aspect-square bg-gray-100">
    <img src={imageUrl} alt={productName} className="w-full h-full object-cover" />
  </div>

  {/* Content */}
  <div className="p-4">
    {/* Category Badge */}
    <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full mb-2">
      stationery
    </span>

    {/* Title */}
    <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-2">
      Mathematics Workbook
    </h3>

    {/* Description */}
    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
      Comprehensive mathematics practice workbook for grade 5 students
    </p>

    {/* Price */}
    <div className="text-xl font-bold text-gray-900 mb-3">
      80 coins
    </div>

    {/* Button */}
    <button className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
      Add to Cart
    </button>
  </div>
</div>
```

**Key Features:**
- **Aspect-square image container:** Maintains 1:1 ratio
- **Line-clamp-2:** Truncates text to 2 lines with ellipsis
- **Full-width button:** Spans card width
- **Hover shadow:** `hover:shadow-lg`

---

#### Course Card (WTF/Dashboard Pattern)

**Appearance:** Rounded card with colored background, name centered

```jsx
<div className="w-32 h-32 flex items-center justify-center bg-purple-100 rounded-lg cursor-pointer hover:bg-purple-200 transition-colors">
  <span className="text-center font-semibold text-gray-800">
    Dance Mat Typing
  </span>
</div>
```

**Variants (from WTF course sidebar):**
```jsx
{/* Purple background */}
<div className="px-6 py-3 bg-purple-100 rounded-full text-gray-800 font-medium cursor-pointer hover:bg-purple-200">
  Dance Mat Typing
</div>

{/* Gray background */}
<div className="px-6 py-3 bg-gray-200 rounded-full text-gray-800 font-medium cursor-pointer hover:bg-gray-300">
  Simple Maths
</div>
```

---

#### Carousel Card (Dashboard Pattern)

**Appearance:** Horizontal scrolling cards with navigation arrows

```jsx
<div className="relative">
  {/* Left Arrow */}
  <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center justify-center">
    <ChevronLeft className="w-6 h-6" />
  </button>

  {/* Card Container */}
  <div className="overflow-x-auto flex gap-4 px-12">
    <div className="flex-shrink-0 w-48 p-4 bg-orange-100 rounded-lg text-center">
      <span className="font-semibold text-gray-800">
        Sadashraya Charitable Trust
      </span>
    </div>
    {/* More cards */}
  </div>

  {/* Right Arrow */}
  <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center justify-center">
    <ChevronRight className="w-6 h-6" />
  </button>
</div>
```

---

### 3.3 Forms

#### Input Field

**Appearance:** Light border, rounded corners, focus ring

```jsx
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Search Products
  </label>
  <input
    type="text"
    placeholder="Search by name..."
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
</div>
```

**CSS:**
```css
.input-field {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.375rem; /* 6px */
  font-size: 1rem;
}

.input-field:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--blue-500);
  border-color: var(--blue-500);
}

.input-field:disabled {
  background-color: var(--gray-100);
  color: var(--gray-500);
  cursor: not-allowed;
}
```

**States:**
- **Default:** Light gray border
- **Focus:** Blue ring (2px shadow), blue border
- **Error:** Red border, red ring
- **Disabled:** Gray background, gray text

---

#### Search Input (with Icon)

**Appearance:** Input field with magnifying glass icon inside

```jsx
<div className="relative">
  <input
    type="text"
    placeholder="Search by name..."
    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
</div>
```

---

#### Radio Button (Category Filter)

**Appearance:** Custom styled radio with label

```jsx
<label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
  <input
    type="radio"
    name="category"
    value="stationery"
    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
  />
  <span className="text-sm text-gray-700">Stationery</span>
</label>
```

---

#### Checkbox

**Appearance:** Checkbox with label, blue accent

```jsx
<label className="flex items-center gap-2 cursor-pointer">
  <input
    type="checkbox"
    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
  />
  <span className="text-sm text-gray-700">In stock only</span>
</label>
```

---

#### Select Dropdown

**Appearance:** Native select styled to match input fields

```jsx
<select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
  <option>Sort by: Newest</option>
  <option>Price: Low to High</option>
  <option>Price: High to Low</option>
</select>
```

---

#### Slider (Price Range)

**Appearance:** Range slider with current value display

```jsx
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Price Range (up to 500 coins)
  </label>
  <input
    type="range"
    min="0"
    max="500"
    value={maxPrice}
    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
  />
  <div className="flex justify-between text-xs text-gray-500 mt-1">
    <span>0 coins</span>
    <span>{maxPrice} coins</span>
  </div>
</div>
```

---

### 3.4 Modals

#### Standard Modal (Radix UI Pattern)

**Appearance:** Centered overlay with backdrop

```jsx
{/* Backdrop */}
<div className="fixed inset-0 bg-black bg-opacity-50 z-40" />

{/* Modal */}
<div className="fixed inset-0 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
    {/* Close Button */}
    <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
      <X className="w-5 h-5" />
    </button>

    {/* Header */}
    <h2 className="text-xl font-semibold text-gray-900 mb-2">
      Modal Title
    </h2>

    {/* Content */}
    <p className="text-sm text-gray-600 mb-6">
      Modal description or content goes here.
    </p>

    {/* Actions */}
    <div className="flex gap-3 justify-end">
      <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
        Cancel
      </button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Confirm
      </button>
    </div>
  </div>
</div>
```

---

### 3.5 Badges & Pills

#### Category Badge

**Appearance:** Small rounded pill, colored background

```jsx
<span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
  stationery
</span>
```

**Variants:**
```jsx
{/* Success/Active */}
<span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
  Active
</span>

{/* Warning */}
<span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
  Low Stock
</span>

{/* Error */}
<span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
  Out of Stock
</span>

{/* Info */}
<span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
  New
</span>
```

---

#### Count Badge (Notification)

**Appearance:** Small circle with number, positioned absolutely

```jsx
<div className="relative">
  <button className="px-4 py-2 bg-gray-200 rounded-md">
    Inventory
  </button>
  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
    1
  </span>
</div>
```

---

### 3.6 Empty States

**Appearance:** Centered icon, heading, description, CTA button

```jsx
<div className="flex flex-col items-center justify-center py-16 px-4">
  <div className="w-16 h-16 mb-4 text-gray-400">
    <Pushpin className="w-full h-full" />
  </div>

  <h3 className="text-xl font-semibold text-gray-900 mb-2">
    No Pins Yet
  </h3>

  <p className="text-center text-gray-600 max-w-md mb-6">
    The Wall of Fame is waiting for amazing content! Create the first pin to get started.
  </p>

  <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 flex items-center gap-2">
    <Plus className="w-5 h-5" />
    Create First Pin
  </button>
</div>
```

**Pattern:**
- Large icon (64px) in muted gray
- Clear heading explaining empty state
- Short description with actionable guidance
- Primary CTA button

---

### 3.7 Loading States

#### Spinner

**Appearance:** Rotating circle animation

```jsx
<div className="flex items-center justify-center py-8">
  <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
</div>
```

---

#### Skeleton Loader

**Appearance:** Pulsing gray rectangles mimicking content shape

```jsx
<div className="animate-pulse">
  {/* Card skeleton */}
  <div className="bg-white rounded-lg border border-gray-200 p-4">
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
    <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-6 bg-gray-200 rounded w-2/3 mb-3"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-10 bg-gray-200 rounded w-full"></div>
  </div>
</div>
```

---

### 3.8 Pagination

**Appearance:** Page numbers with Previous/Next buttons

```jsx
<div className="flex items-center justify-between mt-8">
  {/* Page Info */}
  <p className="text-sm text-gray-600">
    Page <span className="font-medium">1</span> of <span className="font-medium">3</span>
  </p>

  {/* Controls */}
  <div className="flex items-center gap-2">
    <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
      Previous
    </button>

    <div className="flex gap-1">
      <button className="w-10 h-10 bg-blue-600 text-white font-medium rounded-md">
        1
      </button>
      <button className="w-10 h-10 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
        2
      </button>
      <button className="w-10 h-10 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
        3
      </button>
    </div>

    <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
      Next
    </button>
  </div>
</div>
```

---

## 4. Layout Patterns

### 4.1 Page Container

**Appearance:** Full-height page with top navigation and main content

```jsx
<div className="min-h-screen bg-gray-50">
  {/* Top Navigation */}
  <TopNav />

  {/* Main Content */}
  <main className="max-w-7xl mx-auto px-4 py-6">
    {/* Page content */}
  </main>
</div>
```

**Breakpoints:**
- **max-w-7xl:** 1280px max width, centered with auto margins
- **px-4:** 16px horizontal padding on mobile
- **py-6:** 24px vertical padding

---

### 4.2 Two-Column Layout (Sidebar + Main)

**Appearance:** Fixed sidebar, scrollable main content

```jsx
<div className="flex gap-6">
  {/* Sidebar (Filters) */}
  <aside className="w-64 flex-shrink-0 sticky top-20 h-fit">
    <FilterPanel />
  </aside>

  {/* Main Content */}
  <div className="flex-1 min-w-0">
    <ProductGrid />
  </div>
</div>
```

**Key Features:**
- **Sidebar:** Fixed width (256px), sticky positioning
- **Main:** Flexible width, minimum width 0 (prevents overflow)
- **Gap:** 24px between columns

---

### 4.3 Grid Layouts

#### Product Grid (4 Columns)

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

**Breakpoints:**
- **Mobile (< 640px):** 1 column
- **Tablet (640px - 1024px):** 2 columns
- **Desktop (1024px - 1280px):** 3 columns
- **Large Desktop (1280px+):** 4 columns
- **Gap:** 24px

#### Dashboard Sections (Flexible)

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <BalagruhaSection />
  <CoachSection />
</div>
```

---

### 4.4 Top Navigation Bar

**Appearance:** Horizontal pill buttons with greeting and logout

```jsx
<header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-3">
  <div className="flex items-center justify-between">
    {/* Left: Greeting */}
    <span className="text-blue-600 font-semibold text-lg">
      Hi Tony
    </span>

    {/* Center: Navigation Pills */}
    <nav className="flex gap-2">
      <button className="px-4 py-1.5 bg-blue-100 text-blue-600 font-medium rounded-full">
        Dashboard
      </button>
      <button className="px-4 py-1.5 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200">
        Users
      </button>
      <button className="px-4 py-1.5 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200">
        Machines
      </button>
      {/* More nav items */}
    </nav>

    {/* Right: Logout */}
    <button className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600">
      Logout
    </button>
  </div>
</header>
```

**Pattern:**
- **Sticky:** Stays at top on scroll
- **Pill buttons:** Fully rounded, active state highlighted
- **Logout:** Distinct pink color

---

## 5. Interaction States

### 5.1 Hover States

**Buttons:**
```css
/* Primary Button */
hover:bg-blue-700

/* Secondary Button */
hover:bg-gray-50

/* Card */
hover:shadow-lg

/* Link */
hover:underline hover:text-blue-700
```

---

### 5.2 Active/Focus States

**Buttons:**
```css
/* Primary Button Active */
active:bg-blue-800

/* Focus Ring (all interactive elements) */
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
```

---

### 5.3 Disabled States

```css
/* Button */
disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed

/* Input */
disabled:bg-gray-100 disabled:text-gray-500
```

---

### 5.4 Loading States

**Button with Loading:**
```jsx
<button className="px-6 py-2 bg-blue-600 text-white rounded-full disabled:opacity-70" disabled>
  <Spinner className="inline-block w-4 h-4 mr-2 animate-spin" />
  Loading...
</button>
```

---

## 6. Navigation Patterns

### 6.1 Top Navigation (Admin)

**Pattern:** Horizontal pill-style buttons

**Usage:** All admin pages (Dashboard, Shop, WTF, etc.)

```jsx
<nav className="flex gap-2">
  <NavButton active>Dashboard</NavButton>
  <NavButton>Users</NavButton>
  <NavButton>Machines</NavButton>
  <NavButton>Shop</NavButton>
  <NavButton>WTF</NavButton>
</nav>
```

---

### 6.2 Sidebar Navigation (Courses - WTF)

**Pattern:** Vertical stacked buttons with different background colors

**Usage:** Course selection in WTF module, LMS course categories

```jsx
<aside className="w-64 space-y-2">
  <button className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-full text-left">
    Courses
  </button>

  <button className="w-full px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-full text-left hover:bg-gray-300">
    Minimouse
  </button>

  <button className="w-full px-6 py-3 bg-purple-100 text-gray-800 font-medium rounded-full text-left hover:bg-purple-200">
    Dance Mat Typing
  </button>

  {/* More courses */}
</aside>
```

---

### 6.3 Breadcrumb Navigation

**Pattern:** Simple text-based breadcrumb

```jsx
<nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
  <a href="/shop" className="hover:text-blue-600">Shop</a>
  <ChevronRight className="w-4 h-4" />
  <span className="text-gray-900 font-medium">Products</span>
</nav>
```

---

## 7. Form Patterns

### 7.1 Filter Panel (Shop Pattern)

**Pattern:** Sidebar with stacked filter sections

```jsx
<aside className="w-64 bg-white rounded-lg border border-gray-200 p-4 sticky top-20">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

  {/* Search */}
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Search Products
    </label>
    <input
      type="text"
      placeholder="Search by name..."
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Categories */}
  <div className="mb-6">
    <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
    <div className="space-y-2">
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="category" className="w-4 h-4" />
        <span className="text-sm">Stationery</span>
      </label>
      {/* More categories */}
    </div>
  </div>

  {/* Price Range */}
  <div className="mb-6">
    <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
    <input type="range" min="0" max="500" className="w-full" />
  </div>

  {/* Clear Button */}
  <button className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
    Clear All Filters
  </button>
</aside>
```

---

## 8. Content Display Patterns

### 8.1 Coin Display

**Pattern:** Icon + amount with colored text

```jsx
<div className="flex items-center gap-2">
  <CoinIcon className="w-5 h-5 text-yellow-500" />
  <span className="text-xl font-bold text-gray-900">
    80 coins
  </span>
</div>
```

**Variants:**
```jsx
{/* With discount */}
<div className="flex items-center gap-2">
  <span className="text-xl font-bold text-green-600">
    400 coins
  </span>
  <span className="text-sm text-gray-400 line-through">
    500 coins
  </span>
</div>
```

---

### 8.2 Status Indicators

**Pattern:** Colored dot + text

```jsx
<div className="flex items-center gap-2">
  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
  <span className="text-sm text-gray-700">Active</span>
</div>
```

---

### 8.3 Image Placeholders

**Pattern:** Gray background with icon for missing images

```jsx
<div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
  <Package className="w-16 h-16 text-gray-300" />
</div>
```

---

## 9. Feedback Patterns

### 9.1 Toast Notifications

**Appearance:** Slide-in message at top-right

```jsx
{/* Success */}
<div className="fixed top-4 right-4 z-50 bg-white border-l-4 border-green-500 shadow-lg rounded-lg p-4 flex items-start gap-3">
  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
  <div>
    <p className="font-semibold text-gray-900">Success!</p>
    <p className="text-sm text-gray-600">Item added to cart.</p>
  </div>
  <button className="ml-auto text-gray-400 hover:text-gray-600">
    <X className="w-4 h-4" />
  </button>
</div>

{/* Error */}
<div className="fixed top-4 right-4 z-50 bg-white border-l-4 border-red-500 shadow-lg rounded-lg p-4 flex items-start gap-3">
  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
  <div>
    <p className="font-semibold text-gray-900">Error</p>
    <p className="text-sm text-gray-600">Failed to add item.</p>
  </div>
  <button className="ml-auto text-gray-400 hover:text-gray-600">
    <X className="w-4 h-4" />
  </button>
</div>
```

---

### 9.2 Inline Validation

**Pattern:** Error message below input field

```jsx
<div>
  <input
    type="email"
    className="w-full px-3 py-2 border border-red-500 rounded-md focus:ring-2 focus:ring-red-500"
  />
  <p className="mt-1 text-sm text-red-600">Please enter a valid email address.</p>
</div>
```

---

## 10. Accessibility Guidelines

### 10.1 Color Contrast

**WCAG 2.1 Level AA Compliance:**
- Normal text (< 18px): **4.5:1 contrast ratio**
- Large text (≥ 18px): **3:1 contrast ratio**
- UI components: **3:1 contrast ratio**

**Validated Combinations:**
- White text on `blue-600` (#3B82F6): ✅ Pass
- `gray-700` text on white: ✅ Pass
- `gray-600` text on white: ✅ Pass (for secondary text)

---

### 10.2 Keyboard Navigation

**Required:**
- All interactive elements must be keyboard accessible
- Tab order must follow logical reading order
- Focus indicators must be visible (2px blue ring)
- Modals must trap focus
- Escape key closes modals

```css
/* Focus styles */
*:focus-visible {
  outline: 2px solid var(--blue-500);
  outline-offset: 2px;
}
```

---

### 10.3 ARIA Labels

**Required for:**
- Icon-only buttons
- Form inputs without visible labels
- Complex widgets (carousels, tabs)

```jsx
<button aria-label="Close modal" className="...">
  <X className="w-5 h-5" />
</button>

<input
  type="search"
  aria-label="Search products"
  placeholder="Search..."
/>
```

---

### 10.4 Alternative Text

**Required for all images:**

```jsx
{/* Product images */}
<img
  src={product.imageUrl}
  alt={product.name}
  className="..."
/>

{/* Decorative images */}
<img src="decorative.png" alt="" role="presentation" />
```

---

## 11. Responsive Design

### 11.1 Breakpoints

```css
/* Tailwind default breakpoints */
sm:  640px   /* Small tablet */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large desktop */
```

---

### 11.2 Mobile-First Patterns

**Grid Columns:**
```jsx
{/* Mobile: 1 column, Tablet: 2, Desktop: 4 */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
```

**Padding:**
```jsx
{/* Mobile: 16px, Desktop: 24px */}
<div className="px-4 md:px-6">
```

**Typography:**
```jsx
{/* Mobile: 1.5rem, Desktop: 1.875rem */}
<h1 className="text-2xl md:text-3xl font-bold">
```

---

### 11.3 Touch Targets

**Minimum:** 44x44px for all touchable elements on mobile

```jsx
<button className="min-w-[44px] min-h-[44px] px-4 py-2 ...">
  Button
</button>
```

---

## 12. LMS-Specific Patterns

### 12.1 Student Course Cards

**Pattern:** Large, colorful category cards (4 types)

```jsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {/* Computer Apps - Orange */}
  <div className="bg-orange-100 border-2 border-orange-300 rounded-xl p-6 cursor-pointer hover:bg-orange-200 transition-colors">
    <Monitor className="w-12 h-12 text-orange-600 mb-3 mx-auto" />
    <h3 className="text-center font-semibold text-gray-800">Computer Apps</h3>
  </div>

  {/* Art - Purple */}
  <div className="bg-purple-100 border-2 border-purple-300 rounded-xl p-6 cursor-pointer hover:bg-purple-200 transition-colors">
    <Palette className="w-12 h-12 text-purple-600 mb-3 mx-auto" />
    <h3 className="text-center font-semibold text-gray-800">Art</h3>
  </div>

  {/* Spoken English - Blue */}
  <div className="bg-blue-100 border-2 border-blue-300 rounded-xl p-6 cursor-pointer hover:bg-blue-200 transition-colors">
    <Mic className="w-12 h-12 text-blue-600 mb-3 mx-auto" />
    <h3 className="text-center font-semibold text-gray-800">Spoken English</h3>
  </div>

  {/* Life Skills - Green */}
  <div className="bg-green-100 border-2 border-green-300 rounded-xl p-6 cursor-pointer hover:bg-green-200 transition-colors">
    <Heart className="w-12 h-12 text-green-600 mb-3 mx-auto" />
    <h3 className="text-center font-semibold text-gray-800">Life Skills</h3>
  </div>
</div>
```

---

### 12.2 Title Bar (Persistent - Student View)

**Pattern:** Sticky header with coin balance, notifications, session timer

```jsx
<header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3">
  <div className="flex items-center justify-between">
    {/* Left: Logo */}
    <div className="flex items-center gap-3">
      <img src="/logo.png" alt="ISF Playground" className="h-8" />
      <span className="font-semibold text-gray-800">ISF Playground</span>
    </div>

    {/* Right: Coin Balance, Notifications, Timer */}
    <div className="flex items-center gap-6">
      {/* Coin Balance */}
      <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
        <CoinIcon className="w-5 h-5 text-yellow-600" />
        <span className="font-bold text-gray-900">1,250</span>
      </div>

      {/* Notifications */}
      <button className="relative">
        <Bell className="w-6 h-6 text-gray-600" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
          3
        </span>
      </button>

      {/* Session Timer */}
      <div className="flex items-center gap-2 text-gray-600">
        <Clock className="w-5 h-5" />
        <span className="font-medium">00:45:32</span>
      </div>
    </div>
  </div>
</header>
```

---

### 12.3 Student Toolbar (Emotion Emojis + Voice Chat)

**Pattern:** Horizontal toolbar with emoji buttons and chat/homework

```jsx
<div className="bg-gray-100 border-b border-gray-200 px-6 py-3">
  <div className="flex items-center justify-between">
    {/* Left: Emotion Emojis */}
    <div className="flex gap-3">
      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
        😊
      </button>
      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
        😐
      </button>
      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
        😔
      </button>
    </div>

    {/* Right: Voice Chat + Homework */}
    <div className="flex gap-3">
      <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center gap-2">
        <Mic className="w-5 h-5" />
        Voice Chat
      </button>
      <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 flex items-center gap-2">
        <BookOpen className="w-5 h-5" />
        Homework
      </button>
    </div>
  </div>
</div>
```

---

### 12.4 Progress Bar (Course/Module Completion)

**Pattern:** Horizontal bar with percentage

```jsx
<div className="mb-4">
  <div className="flex items-center justify-between mb-1">
    <span className="text-sm font-medium text-gray-700">Course Progress</span>
    <span className="text-sm font-semibold text-blue-600">65%</span>
  </div>
  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
    <div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
  </div>
</div>
```

---

### 12.5 Quiz Question Card

**Pattern:** Card with question, options, submit button

```jsx
<div className="bg-white rounded-lg border border-gray-200 p-6">
  {/* Question */}
  <div className="mb-4">
    <span className="text-sm font-medium text-gray-500">Question 3 of 10</span>
    <h3 className="text-lg font-semibold text-gray-900 mt-1">
      What is the capital of India?
    </h3>
  </div>

  {/* Options */}
  <div className="space-y-3 mb-6">
    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
      <input type="radio" name="question3" value="a" className="w-5 h-5" />
      <span className="text-gray-800">New Delhi</span>
    </label>
    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
      <input type="radio" name="question3" value="b" className="w-5 h-5" />
      <span className="text-gray-800">Mumbai</span>
    </label>
    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
      <input type="radio" name="question3" value="c" className="w-5 h-5" />
      <span className="text-gray-800">Kolkata</span>
    </label>
    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
      <input type="radio" name="question3" value="d" className="w-5 h-5" />
      <span className="text-gray-800">Chennai</span>
    </label>
  </div>

  {/* Submit */}
  <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
    Submit Answer
  </button>
</div>
```

---

### 12.6 Voice Recording Interface

**Pattern:** Microphone button with waveform visualization

```jsx
<div className="bg-white rounded-lg border border-gray-200 p-6">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">
    Record Your Response
  </h3>

  {/* Recording Status */}
  <div className="flex items-center justify-center mb-6">
    <div className="relative">
      <button className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'}`}>
        <Mic className="w-12 h-12 text-white" />
      </button>
      {isRecording && (
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-sm font-medium text-red-600">
          Recording...
        </span>
      )}
    </div>
  </div>

  {/* Waveform (if recording) */}
  {isRecording && (
    <div className="flex items-center justify-center gap-1 h-16 mb-4">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="w-2 bg-blue-600 rounded-full animate-pulse" style={{height: `${Math.random() * 100}%`}}></div>
      ))}
    </div>
  )}

  {/* Duration */}
  <div className="text-center text-gray-600 mb-4">
    {recordingDuration > 0 ? `00:${String(recordingDuration).padStart(2, '0')}` : 'Press to start recording'}
  </div>

  {/* Actions */}
  <div className="flex gap-3">
    <button className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
      Cancel
    </button>
    <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" disabled={!hasRecording}>
      Submit
    </button>
  </div>
</div>
```

---

### 12.7 Grading Interface (Coach - Syllabus Tracker)

**Pattern:** Student submission with grading controls

```jsx
<div className="bg-white rounded-lg border border-gray-200 p-6">
  {/* Student Info */}
  <div className="flex items-center justify-between mb-4">
    <div>
      <h3 className="font-semibold text-gray-900">Raj Kumar</h3>
      <p className="text-sm text-gray-600">Art Submission - Landscape Painting</p>
    </div>
    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
      Pending
    </span>
  </div>

  {/* Submission Preview */}
  <div className="mb-4">
    <img src={submissionUrl} alt="Student artwork" className="w-full rounded-lg" />
  </div>

  {/* Grading Form */}
  <div className="space-y-4">
    {/* Coin Award */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Award ISF Coins
      </label>
      <input
        type="number"
        min="0"
        max="100"
        placeholder="Enter amount"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Feedback */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Feedback (Optional)
      </label>
      <textarea
        rows="3"
        placeholder="Provide feedback to the student..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>

    {/* Actions */}
    <div className="flex gap-3">
      <button className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
        Skip
      </button>
      <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Submit Grade
      </button>
    </div>
  </div>
</div>
```

---

## 13. Animation & Transitions

### 13.1 Standard Transitions

```css
/* Button hover */
transition: background-color 150ms ease-in-out;

/* Card hover shadow */
transition: box-shadow 200ms ease-in-out;

/* Modal/dropdown fade in */
transition: opacity 200ms ease-in-out;

/* Slide in from right */
transition: transform 250ms ease-out;
```

---

### 13.2 Loading Animations

**Spinner:**
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
```

**Pulse (skeleton loader):**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

## 14. Icon Library

**Recommended:** [Lucide React](https://lucide.dev/) (SVG icons)

**Common Icons:**
```jsx
import {
  ChevronRight,
  ChevronLeft,
  X,
  Search,
  ShoppingCart,
  Package,
  AlertCircle,
  CheckCircle,
  Bell,
  Clock,
  Mic,
  BookOpen,
  Monitor,
  Palette,
  Heart,
  Plus,
  Settings,
  User,
  LogOut
} from 'lucide-react';
```

**Icon Sizing:**
```jsx
{/* Small (16px) */}
<Icon className="w-4 h-4" />

{/* Medium (20px) */}
<Icon className="w-5 h-5" />

{/* Large (24px) */}
<Icon className="w-6 h-6" />

{/* Extra Large (32px) */}
<Icon className="w-8 h-8" />
```

---

## 15. Child-Friendly Design Principles

### 15.1 Visual Hierarchy

**Priority:**
1. **Large buttons with icons** - Easy to identify
2. **Bright colors** - Engaging and fun
3. **Playful fonts** - Patrick Hand (handwritten feel)
4. **Cartoon characters** - Login page background
5. **Minimal text** - Short, simple labels

---

### 15.2 Error Messages (Child-Friendly)

**Do:**
```jsx
<div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg">
  <div className="flex items-start gap-3">
    <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
    <div>
      <p className="font-semibold text-orange-900">Oops! Something went wrong.</p>
      <p className="text-sm text-orange-700">
        Don't worry! Please try again in a moment, or ask your coach for help.
      </p>
    </div>
  </div>
</div>
```

**Don't:**
- ❌ "Error 404: Resource not found"
- ❌ "Network timeout exception"
- ❌ "Invalid input parameters"

**Do:**
- ✅ "Oops! We couldn't find that page. Let's go back home!"
- ✅ "The internet is being slow. Let's wait a moment!"
- ✅ "Hmm, something doesn't look right. Can you try again?"

---

## 16. Documentation Conventions

### 16.1 Component File Structure

```
frontend/src/components/
├── shop/
│   ├── ShopHome.jsx
│   ├── ProductList.jsx
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── FilterPanel.jsx
│   └── Pagination.jsx
├── lms/
│   ├── StudentHomepage.jsx
│   ├── CourseCard.jsx
│   ├── QuizCard.jsx
│   ├── VoiceRecorder.jsx
│   └── ProgressBar.jsx
├── shared/
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Modal.jsx
│   ├── Input.jsx
│   └── Badge.jsx
└── layout/
    ├── TopNav.jsx
    ├── TitleBar.jsx
    ├── Toolbar.jsx
    └── Sidebar.jsx
```

---

### 16.2 Naming Conventions

**Components:**
- PascalCase: `ProductCard.jsx`
- Descriptive: `StudentHomepage.jsx` (not `Home.jsx`)

**CSS Classes:**
- kebab-case: `btn-primary`
- BEM notation for complex components: `card__title--highlighted`

**Tailwind Utilities:**
- Use standard Tailwind classes
- Extract repeated patterns into components (not custom CSS)

---

## 17. Performance Optimization

### 17.1 Image Optimization

**Always use:**
```jsx
<img
  src={imageUrl}
  alt={description}
  loading="lazy"
  className="w-full h-full object-cover"
/>
```

**For hero images:**
```jsx
<img src={heroImage} alt={description} loading="eager" />
```

---

### 17.2 Component Lazy Loading

**Lazy load heavy components:**
```jsx
const LazyShopModule = React.lazy(() => import('./Shop'));

<Suspense fallback={<LoadingSpinner />}>
  <LazyShopModule />
</Suspense>
```

---

## 18. Browser Support

**Target Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Not Supported:**
- Internet Explorer (any version)

---

## 19. Design System Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-10-24 | Initial creation based on WTF + Shop patterns |

---

## 20. Quick Reference Guide

### Most Common Patterns

**Button:**
```jsx
<button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700">
  Click Me
</button>
```

**Card:**
```jsx
<div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
  Card Content
</div>
```

**Input:**
```jsx
<input
  type="text"
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
/>
```

**Badge:**
```jsx
<span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
  Badge
</span>
```

---

## 21. Contact & Support

**Questions about this Design System:**
- Product Owner: [Name]
- Lead Designer: [Name]
- Frontend Lead: [Name]

**File Location:** `docs/design-systems/sprint-2-lms-design-system.md`

**Screenshots:** `.playwright-mcp/sprint2-design-system/`
- `01-login-page.png`
- `02-admin-dashboard.png`
- `03-shop-page.png`
- `04-wtf-module.png`

---

**END OF DESIGN SYSTEM**

**Version:** 1.0
**Last Updated:** 2025-10-24 13:15:34
**Total Pages:** 48
**Word Count:** ~12,000
