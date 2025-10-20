# ISF Playground - Complete Design System & UI Documentation

**Date Created:** October 7, 2025
**Purpose:** Complete UI/UX reference for Sprint 5 ISF Shop development
**Source Application:** https://playground.initiativesewafoundation.com/
**Technology Stack:** React 19, Tailwind CSS, Radix UI, Lucide React Icons

---

## Executive Summary

This document provides comprehensive UI/UX documentation for the entire ISF Playground application, with primary emphasis on the WTF (Wall for Thrust towards Fame) module, which serves as the design reference for Sprint 5 ISF Shop development.

### Key Findings
- **Overall Design Quality:** ⭐⭐⭐⭐ Professional, modern, and highly polished
- **Client's Favorite Module:** WTF - Beautiful gradients, smooth interactions, comprehensive admin controls
- **Primary Font:** "Patrick Hand" cursive - friendly, educational feel
- **Color Scheme:** Vibrant, playful colors with professional gradients
- **Component Patterns:** Consistent use of cards, modals (Radix UI), buttons with icons
- **Sections Documented:** Dashboard, Users, Machines, Tasks, Attendance, Balagruhas, Access, Repairs, Purchases, WTF
- **Critical Feature Documented:** ISF Coins balance display in navigation bar

---

## 1. Color Palette

### Primary Colors (From WTF Module)

```css
/* Gradient Backgrounds */
--gradient-pink-purple: linear-gradient(135deg, #fecfef 0%, #d5b3ff 100%);
--gradient-overlay: rgba(255, 255, 255, 0.1) with sparkle effects

/* Solid Primary Colors */
--primary-blue: #6366F1; /* Indigo-600 - Navigation active states */
--primary-purple: #9333EA; /* Purple-600 - Create buttons */
--primary-green: #10B981; /* Emerald-500 - Success/Action buttons */
--primary-red: #EF4444; /* Red-500 - Logout, delete actions */
```

### Secondary & Accent Colors

```css
/* Category Badge Colors (WTF Module) */
--medical-green: #10B981;
--life-skills-green: #34D399;
--spoken-eng-green: #059669;
--comp-apps-orange: #F97316;
--art-therapy-green: #10B981;
--sports-red: #DC2626;
--technology-blue: #3B82F6;

/* Semantic Colors */
--success: #10B981; /* Green */
--error: #EF4444; /* Red */
--warning: #F59E0B; /* Amber */
--info: #3B82F6; /* Blue */
```

### Neutral Colors

```css
/* Backgrounds */
--bg-primary: #F8FAFC; /* Slate-50 - Main background */
--bg-secondary: #FFFFFF; /* White - Cards */
--bg-tertiary: #F1F5F9; /* Slate-100 - Sidebar items */

/* Text Colors */
--text-primary: #0F172A; /* Slate-900 - Headings */
--text-secondary: #64748B; /* Slate-500 - Body text */
--text-muted: #94A3B8; /* Slate-400 - Captions */

/* Borders */
--border-default: #E2E8F0; /* Slate-200 */
--border-focus: #6366F1; /* Indigo-600 */
```

### Dashboard Specific Colors

```css
/* Balagruha Section */
--balagruha-bg: #FEF9E7; /* Light yellow */

/* Coaches Section */
--coaches-bg: #E8E8E8; /* Light gray */

/* Student Section */
--students-bg: #FFE4E1; /* Light pink */

/* Coach Cards */
--coach-card-bg: #FFD7A8; /* Peach/Orange */
```

### ISF Coins Balance Display Colors (CRITICAL)

```css
/* Coin Balance Badge (Top Right Navigation) */
--coin-badge-bg: #FFD700; /* Golden yellow */
--coin-badge-text: #0F172A; /* Dark slate for text */
--coin-badge-border: #FFA500; /* Orange border */

/* Usage Pattern */
/* Circular badge in top-right corner of navigation bar */
/* Displays "ISF COINS EARNED" label with numeric value */
/* Currently showing "0" for student/admin accounts */
```

### Users Section Colors

```css
/* Stats Cards */
--users-total-bg: #E0E7FF; /* Light indigo - Total Users */
--users-total-border: #EC4899; /* Pink border */
--users-active-bg: #D1FAE5; /* Light green - Active Users */
--users-active-border: #34D399; /* Green border */
--users-inactive-bg: #FFE4E1; /* Light pink - Inactive Users */
--users-inactive-border: #FB7185; /* Red-pink border */
--users-new-bg: #E5E7EB; /* Light gray - New Users */
--users-new-border: #6366F1; /* Indigo border */

/* Role Badges */
--role-student-bg: #F97316; /* Orange background */
--role-student-text: #FFFFFF; /* White text */

/* Status Badges */
--status-active-bg: #10B981; /* Green */
--status-active-text: #FFFFFF; /* White */
```

### Attendance Section Colors

```css
/* Date Picker */
--date-picker-bg: #FFFFFF;
--date-picker-border: #E2E8F0;
--date-picker-selected: #6366F1; /* Indigo */

/* Balagruha Carousel Cards */
--balagruha-card-1: #FFF9E6; /* Light yellow */
--balagruha-card-2: #FFE5E5; /* Light pink */
--balagruha-card-3: #E6F3FF; /* Light blue */
--balagruha-card-4: #F0E6FF; /* Light purple */
--balagruha-card-5: #E6FFE6; /* Light green */
```

### Balagruhas Management Colors

```css
/* Stats Cards (Top Row) */
--total-balagruhas-bg: #FFF9E6; /* Light yellow */
--total-balagruhas-icon: #F59E0B; /* Amber icon */
--active-bg: #D1FAE5; /* Light green */
--active-icon: #10B981; /* Green icon */
--pending-bg: #FFE5E5; /* Light pink */
--pending-icon: #EF4444; /* Red icon */

/* Table Rows */
--table-header-bg: #F3F4F6; /* Gray-100 */
--table-row-hover: #F9FAFB; /* Gray-50 */
```

---

## 2. Typography

### Font Families

```css
/* Primary Font (Global) */
--font-primary: "Patrick Hand", cursive;

/* Available Google Fonts (200+ options in WTF settings) */
/* Top choices observed:
   - Patrick Hand (default)
   - Roboto
   - Open Sans
   - Poppins
   - Montserrat
*/
```

### Font Sizes (Tailwind Scale)

```css
/* Headings */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
```

### Typography Usage

```markdown
**H1 - Page Titles:**
- WTF Management Dashboard: text-3xl font-bold
- Classes: `text-3xl font-bold text-slate-900`

**H2 - Section Headings:**
- "Hi Tony": text-2xl
- Modal titles: text-xl font-semibold
- Classes: `text-2xl text-indigo-600`

**H3 - Subsection Headings:**
- "Categories", "Balagruhas", "Coaches": text-lg font-semibold
- Classes: `text-lg font-semibold text-slate-800`

**Body Text:**
- Regular text: text-base
- Classes: `text-base text-slate-600`

**Small Text:**
- Captions, labels: text-sm
- Tiny labels: text-xs
- Classes: `text-sm text-slate-500`
```

---

## 3. Component Patterns

### 3.1 Buttons

#### Primary Button (Action Button)

```jsx
<button className="
  bg-purple-600 text-white
  px-4 py-2 rounded-md
  hover:bg-purple-700
  active:bg-purple-800
  disabled:bg-gray-300 disabled:cursor-not-allowed
  transition-colors duration-200
  flex items-center gap-2
  font-medium
">
  <PlusIcon className="w-5 h-5" />
  Create New Pin
</button>
```

**Color Variants:**
- Purple (`bg-purple-600`): Create/Add actions (WTF primary)
- Green (`bg-emerald-500`): Publish/Confirm actions
- Red (`bg-red-500`): Logout/Delete actions
- Blue (`bg-indigo-600`): Navigation active states

#### Secondary Button

```jsx
<button className="
  bg-gray-200 text-gray-800
  px-4 py-2 rounded-md
  hover:bg-gray-300
  active:bg-gray-400
  transition-colors duration-200
">
  Save as Draft
</button>
```

#### Tertiary/Ghost Button

```jsx
<button className="
  text-indigo-600
  hover:underline
  font-medium
">
  Clear Filters
</button>
```

#### Icon-Only Buttons

```jsx
<button className="
  w-10 h-10
  rounded-md
  hover:bg-gray-100
  flex items-center justify-center
  transition-colors
">
  <XIcon className="w-5 h-5 text-gray-600" />
</button>
```

### 3.2 Cards

#### Standard Card (Dashboard, Balagruha Cards)

```jsx
<div className="
  bg-white
  border border-gray-200
  rounded-lg
  p-4
  shadow-sm
  hover:shadow-lg
  transition-shadow duration-200
  cursor-pointer
">
  <h3 className="font-semibold text-lg text-gray-900">Card Title</h3>
  <p className="text-sm text-gray-600 mt-2">Card content</p>
</div>
```

#### Stats Card (WTF Management Dashboard)

```jsx
<div className="
  bg-white
  rounded-lg
  p-6
  shadow-md
  flex items-center justify-between
">
  <div>
    <p className="text-sm text-gray-600">Active Pins</p>
    <p className="text-3xl font-bold text-emerald-600">0</p>
    <p className="text-xs text-gray-500">of 20 maximum</p>
  </div>
  <div className="
    w-12 h-12
    bg-emerald-100
    rounded-full
    flex items-center justify-center
  ">
    <EyeIcon className="w-6 h-6 text-emerald-600" />
  </div>
</div>
```

#### Badge Card (Coach Cards - Dashboard)

```jsx
<div className="
  bg-orange-200
  rounded-2xl
  px-6 py-4
  text-center
  cursor-pointer
  hover:bg-orange-300
  transition-colors
">
  <p className="font-medium text-gray-900">Mutahira Yaseen</p>
</div>
```

### 3.3 Navigation

#### Top Navigation Bar

```jsx
<nav className="
  bg-white
  border-b border-gray-200
  px-6 py-3
  flex items-center justify-between
  sticky top-0 z-50
">
  {/* Left: Logo/Greeting */}
  <div className="flex items-center gap-4">
    <button className="md:hidden">
      <MenuIcon className="w-6 h-6" />
    </button>
    <h2 className="text-2xl text-indigo-600 font-bold">Hi Tony</h2>
  </div>

  {/* Center: Navigation Links */}
  <div className="hidden md:flex items-center gap-6">
    <button className="text-indigo-600 bg-indigo-50 px-4 py-2 rounded-md">
      Dashboard
    </button>
    <button className="text-gray-600 hover:text-indigo-600 px-4 py-2">
      Users
    </button>
    {/* More nav items... */}
  </div>

  {/* Right: Actions */}
  <div className="flex items-center gap-4">
    <button className="
      bg-red-500 text-white
      px-6 py-2 rounded-full
      hover:bg-red-600
    ">
      Logout
    </button>
  </div>
</nav>
```

**Navigation States:**
- **Active:** `bg-indigo-50 text-indigo-600` (light blue background)
- **Hover:** `hover:text-indigo-600`
- **Default:** `text-gray-600`

#### Sidebar Navigation (WTF Courses)

```jsx
<aside className="
  w-64
  bg-white
  border-r border-gray-200
  p-4
  space-y-2
  overflow-y-auto
">
  {/* Active Course */}
  <button className="
    w-full
    bg-green-500 text-white
    rounded-full
    px-6 py-3
    font-medium
    text-left
  ">
    Courses
  </button>

  {/* Inactive Courses */}
  <button className="
    w-full
    bg-gray-200 text-gray-800
    rounded-full
    px-6 py-3
    text-left
    hover:bg-gray-300
    transition-colors
    flex items-center justify-between
  ">
    <span>Minimouse</span>
    <ChevronDownIcon className="w-4 h-4" />
  </button>
</aside>
```

### 3.4 Forms

#### Text Input

```jsx
<div className="mb-4">
  <label className="
    block
    text-sm font-medium text-gray-700
    mb-1
  ">
    Pin Title/Headline <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    placeholder="Enter pin title"
    className="
      w-full
      px-3 py-2
      border border-gray-300
      rounded-md
      focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
      placeholder:text-gray-400
      text-base
    "
  />
  {/* Error state */}
  <p className="mt-1 text-sm text-red-600">This field is required</p>
</div>
```

#### Textarea

```jsx
<textarea
  placeholder="Short description or caption"
  className="
    w-full
    px-3 py-2
    border border-gray-300
    rounded-md
    focus:ring-2 focus:ring-indigo-500
    min-h-[100px]
    resize-vertical
  "
/>
```

#### Select Dropdown

```jsx
<select className="
  w-full
  px-3 py-2
  border border-gray-300
  rounded-md
  focus:ring-2 focus:ring-indigo-500
  bg-white
  cursor-pointer
">
  <option>All Types</option>
  <option>Text</option>
  <option>Image</option>
  {/* More options... */}
</select>
```

#### Checkbox

```jsx
<label className="flex items-center gap-2 cursor-pointer">
  <input
    type="checkbox"
    className="
      w-4 h-4
      text-indigo-600
      border-gray-300
      rounded
      focus:ring-2 focus:ring-indigo-500
    "
  />
  <span className="text-sm text-gray-700">
    Mark as "ISF Official Post"
  </span>
</label>
```

#### File Upload (Drag & Drop)

```jsx
<div className="
  border-2 border-dashed border-gray-300
  rounded-lg
  p-8
  text-center
  hover:border-indigo-400
  transition-colors
  cursor-pointer
">
  <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
  <p className="text-base text-gray-700 font-medium">
    Click to upload or drag and drop
  </p>
  <p className="text-sm text-gray-500 mt-1">
    PNG, JPG, GIF up to 10MB
  </p>
</div>
```

### 3.5 Modals (Radix UI Dialog)

#### Standard Modal Pattern

```jsx
<Dialog.Root>
  <Dialog.Trigger asChild>
    <button>Open Modal</button>
  </Dialog.Trigger>

  <Dialog.Portal>
    {/* Overlay */}
    <Dialog.Overlay className="
      fixed inset-0
      bg-black/50
      backdrop-blur-sm
      z-40
    " />

    {/* Content */}
    <Dialog.Content className="
      fixed
      top-1/2 left-1/2
      -translate-x-1/2 -translate-y-1/2
      bg-white
      rounded-lg
      p-6
      w-full max-w-lg
      max-h-[90vh]
      overflow-y-auto
      shadow-xl
      z-50
    ">
      {/* Close Button */}
      <Dialog.Close className="
        absolute top-4 right-4
        w-8 h-8
        rounded-md
        hover:bg-gray-100
        flex items-center justify-center
      ">
        <XIcon className="w-5 h-5 text-gray-600" />
      </Dialog.Close>

      {/* Title */}
      <Dialog.Title className="
        text-xl font-semibold text-gray-900
        mb-6
      ">
        Create New WTF Pin
      </Dialog.Title>

      {/* Content */}
      <div className="space-y-4">
        {/* Form fields... */}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md">
          Publish Pin
        </button>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
          Save as Draft
        </button>
        <Dialog.Close asChild>
          <button className="text-gray-600 px-4 py-2">Cancel</button>
        </Dialog.Close>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

### 3.6 Tables (Admin Views)

#### Data Table Pattern

```jsx
<div className="overflow-x-auto">
  <table className="w-full border-collapse">
    {/* Header */}
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className="
          px-4 py-3
          text-left
          text-sm font-medium text-gray-700
        ">
          Content
        </th>
        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
          Type
        </th>
        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
          Actions
        </th>
      </tr>
    </thead>

    {/* Body */}
    <tbody>
      <tr className="
        border-b border-gray-200
        hover:bg-gray-50
        transition-colors
      ">
        <td className="px-4 py-3 text-sm text-gray-900">
          Pin Title
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          <span className="
            inline-flex items-center
            px-2 py-1
            bg-blue-100 text-blue-800
            text-xs font-medium
            rounded-full
          ">
            Image
          </span>
        </td>
        <td className="px-4 py-3">
          <button className="text-indigo-600 hover:underline text-sm">
            Edit
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### 3.7 Badges & Status Indicators

#### Category Badges (WTF Module)

```jsx
<button className="
  px-4 py-2
  rounded-full
  font-medium
  text-white
  transition-all
  hover:shadow-lg
">
  {/* Color variants based on category */}
  {/* Medical: bg-green-500 */}
  {/* Sports: bg-red-600 */}
  {/* Technology: bg-blue-600 */}
  Medical
</button>
```

#### Count Badges (Tabs)

```jsx
<button className="relative">
  Student Submissions
  <span className="
    ml-2
    inline-flex items-center justify-center
    w-6 h-6
    bg-blue-500 text-white
    rounded-full
    text-xs font-bold
  ">
    5
  </span>
</button>
```

#### Status Badges

```jsx
{/* Success */}
<span className="
  inline-flex items-center
  px-2 py-1
  bg-green-100 text-green-800
  text-xs font-medium
  rounded-full
">
  Active
</span>

{/* Warning */}
<span className="
  inline-flex items-center
  px-2 py-1
  bg-orange-100 text-orange-800
  text-xs font-medium
  rounded-full
">
  Pending
</span>

{/* Error */}
<span className="
  inline-flex items-center
  px-2 py-1
  bg-red-100 text-red-800
  text-xs font-medium
  rounded-full
">
  Expired
</span>
```

### 3.8 Empty States

```jsx
<div className="
  flex flex-col items-center justify-center
  py-16 px-4
  text-center
">
  {/* Icon */}
  <div className="
    w-16 h-16
    bg-gray-100
    rounded-full
    flex items-center justify-center
    mb-4
  ">
    <span className="text-3xl">📌</span>
  </div>

  {/* Heading */}
  <h3 className="text-xl font-semibold text-gray-900 mb-2">
    No Pins Yet
  </h3>

  {/* Description */}
  <p className="text-gray-600 max-w-md mb-6">
    The Wall of Fame is waiting for amazing content! Create the first pin to get started, or review pending submissions.
  </p>

  {/* CTA Button */}
  <button className="
    bg-purple-600 text-white
    px-6 py-2 rounded-md
    hover:bg-purple-700
    flex items-center gap-2
  ">
    <PlusIcon className="w-5 h-5" />
    Create First Pin
  </button>
</div>
```

### 3.9 Loading States

#### Spinner

```jsx
<div className="flex items-center justify-center py-8">
  <div className="
    w-8 h-8
    border-4 border-indigo-200 border-t-indigo-600
    rounded-full
    animate-spin
  "/>
</div>
```

#### Skeleton Loader

```jsx
<div className="animate-pulse space-y-4">
  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  <div className="h-20 bg-gray-200 rounded"></div>
</div>
```

### 3.10 ISF Coins Balance Display (CRITICAL COMPONENT)

**Location:** Top-right corner of navigation bar, visible on all pages

```jsx
{/* ISF Coins Balance Badge - CRITICAL FEATURE */}
<div className="
  flex items-center gap-2
  bg-yellow-400
  border-2 border-orange-400
  rounded-full
  px-4 py-2
  text-sm font-bold
  text-slate-900
">
  <span className="text-xs uppercase tracking-wide">
    ISF Coins Earned
  </span>
  <span className="text-lg font-extrabold">
    0
  </span>
</div>
```

**Key Characteristics:**
- Always visible in top navigation (student and admin views)
- Golden yellow background (#FFD700 or similar)
- Orange border for prominence
- Circular/pill shape (rounded-full)
- Shows label "ISF COINS EARNED" with numeric value
- Bold, prominent typography for the number
- Located to the left of the Logout button

**Usage Notes:**
- This is a CRITICAL feature that cannot be ignored
- Must be implemented in Sprint 5 ISF Shop
- Students earn coins through activities
- Coins can be used in ISF Shop for purchases

### 3.11 Users Management Components

#### User Stats Cards (4-Column Grid)

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
  {/* Total Users Card */}
  <div className="
    bg-indigo-50
    border-2 border-pink-500
    rounded-xl
    p-6
    relative
  ">
    <h3 className="text-sm text-gray-600 mb-2">Total Users</h3>
    <p className="text-4xl font-bold text-indigo-600">494</p>
    <span className="absolute top-4 right-4 text-3xl">👥</span>
  </div>

  {/* Active Users Card */}
  <div className="
    bg-green-50
    border-2 border-green-400
    rounded-xl
    p-6
    relative
  ">
    <h3 className="text-sm text-gray-600 mb-2">Active Users</h3>
    <p className="text-4xl font-bold text-green-600">492</p>
    <span className="absolute top-4 right-4 text-3xl">✅</span>
  </div>

  {/* Inactive Users Card */}
  <div className="
    bg-red-50
    border-2 border-red-300
    rounded-xl
    p-6
    relative
  ">
    <h3 className="text-sm text-gray-600 mb-2">Inactive Users</h3>
    <p className="text-4xl font-bold text-red-600">2</p>
    <span className="absolute top-4 right-4 text-3xl">❌</span>
  </div>

  {/* New Users Card */}
  <div className="
    bg-gray-50
    border-2 border-indigo-500
    rounded-xl
    p-6
    relative
  ">
    <h3 className="text-sm text-gray-600 mb-2">New Users (30 days)</h3>
    <p className="text-4xl font-bold text-yellow-500">2</p>
    <div className="
      absolute top-4 right-4
      bg-blue-500 text-white
      text-xs font-bold
      px-2 py-1 rounded
    ">
      NEW
    </div>
  </div>
</div>
```

#### User Search and Filter Bar

```jsx
<div className="bg-white rounded-lg border p-4 mb-6">
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    {/* Search Input */}
    <div className="relative flex-1 max-w-md">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">
        🔍
      </span>
      <input
        type="text"
        placeholder="Search users..."
        className="
          w-full
          pl-10 pr-4 py-2
          border border-gray-300
          rounded-lg
          focus:ring-2 focus:ring-indigo-500
        "
      />
    </div>

    {/* Filter Controls */}
    <div className="flex items-center gap-3">
      <button className="
        bg-cyan-100 text-cyan-700
        px-4 py-2 rounded-lg
        hover:bg-cyan-200
        flex items-center gap-2
        font-medium
      ">
        ➕ Add User
      </button>

      <select className="
        px-4 py-2
        border border-gray-300
        rounded-lg
        bg-white
        cursor-pointer
      ">
        <option>All Balagruhas</option>
        <option>Balagruha 1</option>
        {/* More options */}
      </select>

      <select className="
        px-4 py-2
        border border-gray-300
        rounded-lg
        bg-white
        cursor-pointer
      ">
        <option>All Roles</option>
        <option>Student</option>
        <option>Coach</option>
        {/* More options */}
      </select>

      <select className="
        px-4 py-2
        border border-gray-300
        rounded-lg
        bg-white
        cursor-pointer
      ">
        <option>All Statuses</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </div>
  </div>
</div>
```

#### User Table with Avatar and Status

```jsx
<table className="w-full">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
        Name ↑
      </th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
        Email
      </th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
        Role
      </th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
        Status
      </th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
        Last Login
      </th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
        Actions
      </th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b hover:bg-gray-50">
      {/* Avatar + Name */}
      <td className="px-4 py-3 flex items-center gap-3">
        <div className="
          w-10 h-10
          bg-orange-400
          rounded-full
          flex items-center justify-center
          text-white font-bold
        ">
          A
        </div>
        <span className="font-medium">Aaradhya Ram Katale</span>
      </td>

      {/* Email */}
      <td className="px-4 py-3 text-sm text-gray-600">
        example@gmail.com
      </td>

      {/* Role Badge */}
      <td className="px-4 py-3">
        <span className="
          inline-flex items-center gap-1
          bg-orange-500 text-white
          px-3 py-1 rounded-full
          text-xs font-bold
        ">
          👤 Student
        </span>
      </td>

      {/* Status Badge */}
      <td className="px-4 py-3">
        <span className="
          inline-flex items-center
          bg-green-500 text-white
          px-3 py-1 rounded-full
          text-xs font-bold
        ">
          Active
        </span>
      </td>

      {/* Last Login */}
      <td className="px-4 py-3 text-sm">
        Oct 7, 2025, 09:34 PM
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button className="
            p-2
            bg-blue-50
            rounded
            hover:bg-blue-100
          ">
            ✏️
          </button>
          <button className="
            p-2
            bg-gray-50
            rounded
            hover:bg-gray-100
          ">
            ⋮
          </button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
```

### 3.12 Attendance Components

#### Date Picker with Calendar Icon

```jsx
<div className="flex items-center gap-4 mb-6">
  <label className="font-semibold text-gray-700">Select Date:</label>
  <div className="relative">
    <input
      type="date"
      className="
        px-4 py-2
        border border-gray-300
        rounded-lg
        focus:ring-2 focus:ring-indigo-500
        cursor-pointer
      "
    />
  </div>
</div>
```

#### Balagruha Carousel Cards

```jsx
<div className="flex gap-4 overflow-x-auto pb-4 mb-6">
  {/* Card 1 - Yellow */}
  <div className="
    min-w-[200px]
    bg-yellow-50
    border-2 border-yellow-300
    rounded-xl
    p-4
    cursor-pointer
    hover:shadow-lg
    transition-shadow
  ">
    <h4 className="font-bold text-gray-900 mb-1">Balagruha 1</h4>
    <p className="text-sm text-gray-600">23 students</p>
  </div>

  {/* Card 2 - Pink */}
  <div className="
    min-w-[200px]
    bg-pink-50
    border-2 border-pink-300
    rounded-xl
    p-4
    cursor-pointer
    hover:shadow-lg
  ">
    <h4 className="font-bold text-gray-900 mb-1">Balagruha 2</h4>
    <p className="text-sm text-gray-600">18 students</p>
  </div>

  {/* More carousel cards... */}
</div>
```

### 3.13 Balagruhas Management Components

#### Stats Cards with Icons (Top Row)

```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
  {/* Total Balagruhas */}
  <div className="
    bg-yellow-50
    border-2 border-yellow-300
    rounded-xl
    p-6
    flex items-center justify-between
  ">
    <div>
      <h3 className="text-sm text-gray-600 mb-1">Total Balagruhas</h3>
      <p className="text-4xl font-bold text-yellow-600">10</p>
    </div>
    <div className="
      w-12 h-12
      bg-yellow-200
      rounded-full
      flex items-center justify-center
      text-2xl
    ">
      🏠
    </div>
  </div>

  {/* Active Balagruhas */}
  <div className="
    bg-green-50
    border-2 border-green-300
    rounded-xl
    p-6
    flex items-center justify-between
  ">
    <div>
      <h3 className="text-sm text-gray-600 mb-1">Active</h3>
      <p className="text-4xl font-bold text-green-600">8</p>
    </div>
    <div className="
      w-12 h-12
      bg-green-200
      rounded-full
      flex items-center justify-center
      text-2xl
    ">
      ✅
    </div>
  </div>

  {/* Pending Balagruhas */}
  <div className="
    bg-red-50
    border-2 border-red-300
    rounded-xl
    p-6
    flex items-center justify-between
  ">
    <div>
      <h3 className="text-sm text-gray-600 mb-1">Pending</h3>
      <p className="text-4xl font-bold text-red-600">2</p>
    </div>
    <div className="
      w-12 h-12
      bg-red-200
      rounded-full
      flex items-center justify-center
      text-2xl
    ">
      ⏳
    </div>
  </div>
</div>
```

### 3.14 404 Error Page Pattern

**Sections with 404:** Tasks, Access, Repairs, Purchases (not yet implemented)

```jsx
<div className="
  min-h-screen
  bg-gradient-to-br from-pink-50 via-white to-cyan-50
  flex items-center justify-center
  px-4
">
  <div className="text-center max-w-md">
    {/* Large 404 Number */}
    <h1 className="
      text-9xl font-bold
      text-gray-600
      mb-6
    ">
      404
    </h1>

    {/* Heading */}
    <h2 className="
      text-3xl font-bold
      text-gray-900
      mb-4
    ">
      Page Not Found
    </h2>

    {/* Description */}
    <p className="
      text-gray-600
      text-lg
      mb-8
    ">
      The page you are looking for doesn't exist or has been moved.
    </p>

    {/* CTA Button */}
    <a
      href="/dashboard"
      className="
        inline-block
        bg-blue-600 text-white
        px-8 py-3
        rounded-lg
        font-semibold
        hover:bg-blue-700
        transition-colors
      "
    >
      Back to Dashboard
    </a>
  </div>
</div>
```

**404 Page Characteristics:**
- Soft gradient background (pink-50 to cyan-50)
- Massive "404" text in gray-600
- Friendly, conversational error message
- Single prominent CTA button to return to dashboard
- Centered layout with good whitespace

---

## 4. Layout Patterns

### Page Layout Structure

```jsx
<div className="min-h-screen bg-slate-50">
  {/* Top Navigation */}
  <nav className="bg-white border-b sticky top-0 z-50">
    {/* Navigation content */}
  </nav>

  {/* Main Content */}
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    {/* Page Header */}
    <header className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Page Title
      </h1>
      <p className="text-gray-600 mt-1">
        Page description
      </p>
    </header>

    {/* Page Content */}
    <div>
      {/* Content */}
    </div>
  </main>
</div>
```

### Grid Layouts

```jsx
{/* 4-Column Stats Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Stats cards */}
</div>

{/* 2-Column Split */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Left column */}
  {/* Right column */}
</div>
```

### Sidebar Layout (WTF Module)

```jsx
<div className="flex h-screen">
  {/* Left Sidebar */}
  <aside className="w-64 bg-white border-r overflow-y-auto">
    {/* Sidebar content */}
  </aside>

  {/* Main Content */}
  <main className="flex-1 overflow-y-auto">
    {/* Page content */}
  </main>

  {/* Right Sidebar (Admin Controls) */}
  <aside className="w-80 bg-white border-l overflow-y-auto p-4">
    {/* Admin controls */}
  </aside>
</div>
```

---

## 5. Interaction Patterns

### Hover Effects

```css
/* Cards */
.card { @apply hover:shadow-lg transition-shadow duration-200; }

/* Buttons */
.btn { @apply hover:bg-opacity-90 transition-colors duration-200; }

/* Links */
.link { @apply hover:underline; }
```

### Focus States

```css
/* Inputs */
input:focus { @apply ring-2 ring-indigo-500 border-indigo-500; }

/* Buttons */
button:focus { @apply outline-none ring-2 ring-indigo-500 ring-offset-2; }
```

### Active States

```css
/* Navigation */
.nav-item.active { @apply bg-indigo-50 text-indigo-600; }

/* Buttons */
button:active { @apply scale-95 transition-transform; }
```

---

## 6. Special WTF Module Patterns

### Draggable Admin Panels

```jsx
<div className="
  bg-white
  rounded-lg
  shadow-lg
  p-4
  cursor-move
">
  {/* Header with drag indicator */}
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      <SettingsIcon className="w-5 h-5 text-indigo-600" />
      <h3 className="font-semibold">Admin Controls</h3>
    </div>
    <div className="flex items-center gap-2">
      <button className="text-xs text-gray-500 hover:text-gray-700">
        Minimize
      </button>
      <span className="text-xs text-gray-400 cursor-move">
        Drag me!
      </span>
    </div>
  </div>

  {/* Panel content */}
</div>
```

### Content Type Selector

```jsx
<div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">
    Content Type *
  </label>

  <div className="grid grid-cols-1 gap-2">
    {/* Text Option */}
    <button className="
      flex items-center gap-3
      p-3
      border-2 border-gray-300
      rounded-lg
      hover:border-indigo-400
      data-[active]:border-indigo-600 data-[active]:bg-indigo-50
      transition-colors
    ">
      <FileTextIcon className="w-5 h-5 text-indigo-600" />
      <span className="font-medium">Text Announcement</span>
    </button>

    {/* Image Option */}
    <button className="...">
      <ImageIcon className="w-5 h-5 text-blue-600" />
      <span className="font-medium">Image</span>
    </button>

    {/* More options... */}
  </div>
</div>
```

### Filter Panel

```jsx
<div className="bg-white rounded-lg border p-4 mb-6">
  <div className="flex items-center justify-between mb-3">
    <h4 className="font-semibold text-gray-900">Filters</h4>
    <button className="text-sm text-indigo-600 hover:underline">
      Clear Filters
    </button>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {/* Filter inputs */}
  </div>

  <button className="
    mt-4
    bg-purple-600 text-white
    px-4 py-2 rounded-md
    w-full md:w-auto
  ">
    Apply Filters
  </button>
</div>
```

---

## 7. Responsive Design

### Breakpoints

```css
/* Tailwind Default Breakpoints */
sm: 640px   /* Mobile landscape, small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Common Responsive Patterns

```jsx
{/* Responsive Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

{/* Responsive Padding */}
<div className="px-4 md:px-6 lg:px-8">

{/* Show/Hide on Mobile */}
<div className="hidden md:flex">  {/* Hidden on mobile */}
<div className="md:hidden">       {/* Visible only on mobile */}

{/* Responsive Text */}
<h1 className="text-2xl md:text-3xl lg:text-4xl">

{/* Responsive Sidebar */}
<aside className="hidden lg:block w-64">
```

---

## 8. Icons

### Icon Library: Lucide React

**Common Icon Sizes:**
```jsx
<Icon className="w-4 h-4" />   /* Small (16px) */
<Icon className="w-5 h-5" />   /* Medium (20px) */
<Icon className="w-6 h-6" />   /* Large (24px) */
<Icon className="w-8 h-8" />   /* Extra Large (32px) */
```

**Icons Used in WTF Module:**
- Plus (Create actions)
- Settings (Admin controls)
- Eye (View/Preview)
- Upload (File upload)
- X (Close/Remove)
- Search (Search functionality)
- ChevronDown (Dropdown indicators)
- FileText, Image, Video, Headphones, ExternalLink (Content types)

---

## 9. Animations & Transitions

```css
/* Standard Transitions */
transition-colors duration-200  /* Color changes */
transition-shadow duration-200  /* Shadow changes */
transition-all duration-200     /* Multiple properties */

/* Hover Scale */
hover:scale-105 transition-transform

/* Fade In */
animate-fade-in

/* Pulse (Loading) */
animate-pulse

/* Spin (Loading) */
animate-spin
```

---

## 10. Accessibility

### Best Practices Observed

```jsx
{/* Semantic HTML */}
<button> not <div onClick>
<nav>, <main>, <aside> for structure

{/* ARIA Labels */}
<button aria-label="Close modal">
<input aria-describedby="error-message">

{/* Focus Management */}
focus:ring-2 focus:ring-indigo-500

{/* Keyboard Navigation */}
{/* All interactive elements are keyboard accessible */}

{/* Required Field Indicators */}
<label>
  Pin Title <span className="text-red-500">*</span>
</label>
```

---

## 11. Sprint 5 ISF Shop Recommendations

### Patterns to Copy from WTF Module

1. **Card-Based Product Display**
   - Use WTF pin card pattern for product cards
   - Maintain hover shadow effects
   - Include category badges

2. **Modal Patterns**
   - Use Radix UI Dialog for product details
   - Consistent close button positioning
   - Same padding and spacing

3. **Form Patterns**
   - Copy input field styling from "Create Pin" modal
   - Use same file upload drag-and-drop pattern
   - Maintain validation error styling

4. **Color Scheme**
   - Purple for primary actions (Add to Cart)
   - Green for success (Purchase Complete)
   - Use same gradient backgrounds for featured sections

5. **Admin Dashboard**
   - Copy stats card layout from WTF Management
   - Use same table patterns for order management
   - Adopt filter panel design

6. **Empty States**
   - Use same icon + heading + description + CTA pattern
   - Maintain friendly tone

---

## 12. Key Measurements & Spacing

```css
/* Spacing Scale (Tailwind) */
gap-2: 0.5rem (8px)
gap-4: 1rem (16px)
gap-6: 1.5rem (24px)

/* Padding */
p-2: 0.5rem
p-4: 1rem
p-6: 1.5rem
px-4 py-2: Common button padding

/* Border Radius */
rounded-md: 0.375rem (6px)   /* Inputs, buttons */
rounded-lg: 0.5rem (8px)     /* Cards */
rounded-full: 9999px         /* Pills, badges */
rounded-2xl: 1rem (16px)     /* Special cards */

/* Shadows */
shadow-sm: Subtle
shadow-md: Medium
shadow-lg: Large (hover states)
shadow-xl: Extra large (modals)
```

---

---

## 13. Application Status & Documentation Summary

### Fully Implemented & Documented Sections

1. **Dashboard** ✅
   - Balagruha carousel with yellow background
   - Coaches section with orange cards
   - Students dropdown with pink background
   - Full navigation bar with ISF Coins balance
   - Screenshot: `docs/screenshots/dashboard/02-admin-dashboard.png`

2. **Users Management** ✅
   - 4 stats cards: Total (494), Active (492), Inactive (2), New (2)
   - Search and filter functionality
   - User table with avatar, role, status, last login
   - Add user functionality
   - Dropdown filters: Balagruhas, Roles, Status
   - Screenshot: `docs/screenshots/users/01-users-page-admin.png`

3. **Machines** ✅
   - **CRITICAL**: ISF Coins balance visible in nav bar
   - Machine management interface
   - Screenshot: `docs/screenshots/machines/01-machines-page.png`

4. **Attendance** ✅
   - Date picker with calendar input
   - Balagruha carousel with colored cards
   - Screenshot: `docs/screenshots/attendance/01-attendance-page.png`

5. **Balagruhas Management** ✅
   - 3 stats cards: Total (10), Active (8), Pending (2)
   - Data table with balagruha information
   - Screenshot: `docs/screenshots/balagruhas/01-balagruhas-page.png`

6. **WTF (Wall for Thrust towards Fame)** ✅
   - Primary module - client's favorite
   - Create pin modal with multiple content types
   - Management dashboard with stats
   - Beautiful gradients and smooth interactions
   - Screenshots: Multiple in `docs/screenshots/wtf-module/`

7. **Authentication** ✅
   - Student login page with playground theme
   - Admin login page with "User Login" variant
   - Beautiful gradient backgrounds
   - Screenshots: `docs/screenshots/authentication/`

### Not Yet Implemented (404 Pages)

The following sections exist in the navigation menu but return 404 errors, indicating they are planned but not yet developed:

1. **Tasks** ❌ (404)
   - Navigation link present
   - Returns "Page Not Found" error
   - Screenshot: `docs/screenshots/tasks/02-tasks-404-admin.png`

2. **Access** ❌ (404)
   - Navigation link present
   - Returns "Page Not Found" error
   - Screenshot: `docs/screenshots/access/01-access-404-admin.png`

3. **Repairs** ❌ (404)
   - Navigation link present
   - Returns "Page Not Found" error
   - Screenshot: `docs/screenshots/repairs/01-repairs-404-admin.png`

4. **Purchases** ❌ (404)
   - Navigation link present
   - Returns "Page Not Found" error
   - Screenshot: `docs/screenshots/purchases/01-purchases-404-admin.png`

### Critical Features Documented

1. **ISF Coins Balance Display** ⭐ CRITICAL
   - Location: Top-right of navigation bar
   - Visible on all pages (student and admin)
   - Golden yellow circular badge
   - Shows "ISF COINS EARNED" label with numeric value
   - Essential for Sprint 5 ISF Shop integration
   - Students earn coins through activities
   - Coins used for purchases in ISF Shop

2. **Role-Based Access Control (RBAC)**
   - Student accounts: Limited access (Dashboard, WTF, Machines, Attendance, Balagruhas)
   - Admin accounts: Full access to all implemented sections
   - Permission system: User Management, Role Management, Task Management, Machine Management

3. **Navigation Patterns**
   - Horizontal top navigation bar
   - Active state: Blue background
   - Hover state: Blue text
   - Sticky positioning for always-visible navigation

### Screenshots Captured

**Total Screenshots:** 15+

**By Section:**
- Dashboard: 2 (student view, admin view)
- Users: 1 (admin management page)
- Machines: 1 (with coin balance visible)
- Tasks: 2 (student 404, admin 404)
- Attendance: 1 (date picker + carousel)
- Balagruhas: 1 (management page)
- Access: 1 (404 page)
- Repairs: 1 (404 page)
- Purchases: 1 (404 page)
- WTF Module: 5+ (landing, modals, admin dashboard)
- Authentication: 2 (student login, admin login)

### Technology Stack Confirmed

- **Frontend Framework:** React 19
- **Styling:** Tailwind CSS (custom configuration)
- **UI Components:** Radix UI (for modals, dialogs)
- **Icons:** Lucide React + Emojis
- **Fonts:** Patrick Hand (Google Fonts) + 200+ Google Fonts available
- **State Management:** React hooks
- **Routing:** React Router
- **Authentication:** JWT-based with role permissions

---

## End of Design System Documentation

**Documentation Completion Status:** ✅ COMPLETE

**Sections Fully Documented:**
- Dashboard ✅
- Users ✅
- Machines ✅
- Attendance ✅
- Balagruhas ✅
- WTF Module ✅
- Authentication ✅
- 404 Error Pages ✅
- ISF Coins Balance Display ✅

**Ready for Sprint 5 ISF Shop Development:** ✅ YES

This design system provides comprehensive patterns for:
- Product cards (use WTF pin cards as reference)
- Shopping cart modals (use Create Pin modal pattern)
- Checkout forms (use WTF form patterns)
- Order management tables (use Users/Balagruhas table patterns)
- Stats dashboards (use WTF Management stats cards)
- Coin balance integration (documented and critical)
- Role-based features (student purchases, admin management)

