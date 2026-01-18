# Sprint 2 Design System - Quick Reference

**Last Updated:** 2025-10-24 17:45:28
**Full Documentation:** `docs/epics/sprint2/design-system-sprint2.md`

---

## Overview

This is a quick reference guide for Sprint 2's design system. For full details, see the complete design system document. This guide focuses on the most commonly used patterns and components.

---

## Color Palette

### Primary Colors
```
Blue Primary:   #2563eb (bg-blue-600)
Blue Light:     #3b82f6 (bg-blue-500)
Blue Dark:      #1e40af (bg-blue-700)
```

### Role-Specific Colors
```
Student:        #10b981 (bg-green-500) - Green for growth
Coach:          #f59e0b (bg-amber-500) - Amber for guidance
Admin:          #6366f1 (bg-indigo-500) - Indigo for authority
Amma:           #ec4899 (bg-pink-500) - Pink for care
PM:             #ef4444 (bg-red-500) - Red for urgency
```

### Semantic Colors
```
Success:        #10b981 (bg-green-500)
Warning:        #f59e0b (bg-amber-500)
Error:          #ef4444 (bg-red-500)
Info:           #3b82f6 (bg-blue-500)
```

### ISF Coin Colors
```
Coin Gold:      #fbbf24 (bg-yellow-400)
Coin Border:    #f59e0b (border-yellow-500)
Coin Shadow:    #d97706 (shadow-yellow-600)
```

### Background Colors
```
Page Background: #f9fafb (bg-gray-50)
Card Background: #ffffff (bg-white)
Hover State:     #f3f4f6 (bg-gray-100)
```

---

## Typography

### Font Family
```
Student UI:     'Patrick Hand', cursive (child-friendly handwritten)
Admin/Coach:    system-ui, -apple-system, sans-serif (professional)
```

### Font Sizes
```
Heading 1:      text-4xl (36px)
Heading 2:      text-3xl (30px)
Heading 3:      text-2xl (24px)
Heading 4:      text-xl (20px)
Body:           text-base (16px)
Small:          text-sm (14px)
Tiny:           text-xs (12px)
```

### Font Weights
```
Normal:         font-normal (400)
Medium:         font-medium (500)
Semibold:       font-semibold (600)
Bold:           font-bold (700)
```

---

## Spacing

### Padding (p-*)
```
p-2   = 8px   (tight spacing)
p-4   = 16px  (default button/input padding)
p-6   = 24px  (card padding)
p-8   = 32px  (section padding)
p-12  = 48px  (large section padding)
```

### Margin (m-*, my-*, mx-*)
```
m-2   = 8px   (small gaps)
m-4   = 16px  (default gaps)
m-6   = 24px  (card gaps)
m-8   = 32px  (section gaps)
mb-2  = 8px   (bottom margin)
```

### Gap (for grid/flex)
```
gap-2  = 8px  (tight grid)
gap-4  = 16px (default grid)
gap-6  = 24px (loose grid)
```

---

## Component Patterns

### Button Styles

**Primary Button:**
```jsx
<button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
  Click Me
</button>
```

**Secondary Button:**
```jsx
<button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
  Cancel
</button>
```

**Icon Button:**
```jsx
<button className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
  🔍
</button>
```

**Student-Friendly Button (Large, Colorful):**
```jsx
<button className="px-8 py-4 bg-gradient-to-br from-green-400 to-blue-500 text-white text-lg font-['Patrick_Hand'] rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
  Start Learning! 🚀
</button>
```

### Card Styles

**Standard Card:**
```jsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  Card Content
</div>
```

**Hover Card:**
```jsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
  Clickable Card
</div>
```

**Student Course Card:**
```jsx
<div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-md p-8 hover:shadow-xl transform hover:scale-105 transition-all cursor-pointer border-4 border-blue-200">
  <div className="text-6xl mb-4">💻</div>
  <h3 className="text-2xl font-bold font-['Patrick_Hand']">Computer Apps</h3>
</div>
```

### Form Input Styles

**Text Input:**
```jsx
<input
  type="text"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  placeholder="Enter text"
/>
```

**Textarea:**
```jsx
<textarea
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
  rows={4}
  placeholder="Enter description"
/>
```

**Select Dropdown:**
```jsx
<select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
  <option>Select option</option>
  <option>Option 1</option>
</select>
```

### Modal Styles

**Standard Modal:**
```jsx
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold">Modal Title</h2>
      <button className="text-gray-400 hover:text-gray-600">✕</button>
    </div>
    <div className="p-6">
      Modal Content
    </div>
    <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
      <button className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Confirm</button>
    </div>
  </div>
</div>
```

### Table Styles

**Data Table:**
```jsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
  <table className="w-full">
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
          Column 1
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      <tr className="hover:bg-gray-50">
        <td className="px-4 py-4 text-sm text-gray-900">
          Data
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## Layout Patterns

### Dashboard Grid (Admin/Coach)
```jsx
<div className="min-h-screen bg-gray-50 p-6">
  <div className="grid grid-cols-3 gap-6 mb-6">
    {/* Stat Cards */}
  </div>
  <div className="grid grid-cols-2 gap-6">
    {/* Main Content */}
  </div>
</div>
```

### Student Course View (Full Screen, Centered)
```jsx
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-12">
  <div className="max-w-4xl w-full">
    {/* Course Content */}
  </div>
</div>
```

### Two-Column Layout (Sidebar + Main)
```jsx
<div className="flex min-h-screen">
  <aside className="w-64 bg-white border-r border-gray-200 p-6">
    {/* Sidebar */}
  </aside>
  <main className="flex-1 bg-gray-50 p-6">
    {/* Main Content */}
  </main>
</div>
```

---

## Icon Usage

### Emoji Icons (Student UI)
Use large, colorful emojis for student-facing UI:
```
Courses:        💻 🎨 🗣️ 💡
Actions:        ✅ ❌ 🚀 ⭐
Feedback:       😊 😢 🎉 👍
Coins:          💰 🪙
Progress:       📊 📈 🏆
```

### Text Icons (Admin/Coach UI)
Use subtle text/emoji icons for professional UI:
```
Add:            ➕ or "+"
Edit:           ✏️ or "Edit"
Delete:         🗑️ or "Delete"
Search:         🔍 or "🔎"
Filter:         🔽 or "▼"
```

---

## Child-Friendly UI Guidelines

### For Student-Facing Components

**1. Use Large, Touch-Friendly Targets**
- Minimum button size: 60x60px (p-8)
- Spacing between clickable elements: 24px minimum

**2. High Contrast and Bright Colors**
- Use gradients for depth
- Colorful borders (border-4)
- Strong shadows for elevation

**3. Patrick Hand Font for All Text**
```jsx
<p className="font-['Patrick_Hand'] text-xl">
  Great job! Keep learning! 🎉
</p>
```

**4. Emoji Feedback**
Use emojis liberally for positive reinforcement:
```jsx
{score >= 90 && <div className="text-6xl animate-bounce">🎉</div>}
{score >= 70 && <div className="text-6xl animate-bounce">⭐</div>}
{score < 70 && <div className="text-6xl">💪</div>}
```

**5. Progress Visualization**
Always show progress visually:
```jsx
<div className="w-full bg-gray-200 rounded-full h-8">
  <div
    className="bg-gradient-to-r from-green-400 to-blue-500 h-8 rounded-full flex items-center justify-center text-white font-bold"
    style={{ width: `${progress}%` }}
  >
    {progress}%
  </div>
</div>
```

---

## Responsive Design

### Breakpoints
```
sm:  640px   (tablet)
md:  768px   (small laptop)
lg:  1024px  (laptop)
xl:  1280px  (desktop)
2xl: 1536px  (large desktop)
```

### Common Responsive Patterns

**Grid Columns:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid: 1 col mobile, 2 tablet, 3 desktop */}
</div>
```

**Hide on Mobile:**
```jsx
<div className="hidden md:block">
  {/* Only visible on tablet and up */}
</div>
```

**Different Padding by Screen Size:**
```jsx
<div className="p-4 md:p-6 lg:p-8">
  {/* Smaller padding on mobile */}
</div>
```

---

## Animation Patterns

### Hover Effects
```jsx
className="hover:shadow-xl transform hover:scale-105 transition-all duration-200"
```

### Loading States
```jsx
<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600" />
```

### Bounce Animation (Success)
```jsx
<div className="animate-bounce">🎉</div>
```

### Fade In
```jsx
className="animate-fadeIn" // Custom Tailwind animation
```

---

## Accessibility

### ARIA Labels
```jsx
<button aria-label="Close modal" className="...">
  ✕
</button>
```

### Focus States
Always include focus states for keyboard navigation:
```jsx
className="focus:ring-2 focus:ring-blue-500 focus:outline-none"
```

### Semantic HTML
Use proper semantic elements:
```jsx
<header>Header</header>
<nav>Navigation</nav>
<main>Main Content</main>
<aside>Sidebar</aside>
<footer>Footer</footer>
```

---

## Common Component Measurements

### Course Card (Student)
- Width: 280px (or 25% in grid)
- Height: 320px
- Padding: p-8 (32px)
- Border: border-4
- Border Radius: rounded-2xl

### Stat Card (Admin Dashboard)
- Width: 20% (grid-cols-5)
- Height: 140px
- Padding: p-4 (16px)
- Border: border (1px)
- Border Radius: rounded-lg

### Modal Sizes
- Small: max-w-md (448px)
- Medium: max-w-2xl (672px)
- Large: max-w-4xl (896px)
- Extra Large: max-w-6xl (1152px)

### Button Heights
- Small: py-1 (24px total)
- Medium: py-2 (36px total)
- Large: py-3 (44px total)
- Extra Large (Student): py-4 (52px total)

---

## Quick Copy-Paste Components

### Success Toast
```jsx
toast.success('✅ Course completed! +50 coins earned!', {
  duration: 5000,
  position: 'top-center',
  style: {
    background: '#10b981',
    color: '#fff',
    fontSize: '16px',
  },
});
```

### Error Message
```jsx
<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
  <div className="flex items-start gap-3">
    <span className="text-2xl">⚠️</span>
    <div>
      <h4 className="font-semibold text-red-900">Error</h4>
      <p className="text-sm text-red-700">Something went wrong. Please try again.</p>
    </div>
  </div>
</div>
```

### Loading Skeleton
```jsx
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
</div>
```

### Progress Bar with Label
```jsx
<div className="mb-2 flex items-center justify-between text-sm">
  <span>Progress</span>
  <span className="font-semibold">{progress}%</span>
</div>
<div className="w-full bg-gray-200 rounded-full h-3">
  <div
    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
    style={{ width: `${progress}%` }}
  />
</div>
```

---

## DO's and DON'Ts

### DO
✅ Use Patrick Hand font for all student UI text
✅ Use large emojis (text-6xl) for student feedback
✅ Include hover states on all clickable elements
✅ Show loading states during async operations
✅ Use semantic HTML elements
✅ Include ARIA labels for accessibility
✅ Test on multiple screen sizes

### DON'T
❌ Mix professional and child-friendly styles in same view
❌ Use small font sizes (<16px) for student UI
❌ Forget focus states for keyboard navigation
❌ Use red color for student error messages (use friendly emojis instead)
❌ Hardcode colors (use Tailwind classes)
❌ Forget to test animations on slower devices

---

**For Complete Design System:**
See `docs/epics/sprint2/design-system-sprint2.md`

**End of Quick Reference**
