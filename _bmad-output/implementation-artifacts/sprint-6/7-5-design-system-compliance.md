# Story 7.5: Design System Compliance Scan

Status: ready-for-dev

## Story

As a Dev,
I want to audit frontend components for design system compliance (color tokens, Tailwind consistency, accessibility),
so that Sprint 2 features are built on a consistent visual foundation.

## Acceptance Criteria

1. **Given** the UX design specification documents color tokens (--primary, --secondary, status colors, etc.)
   **When** Dev scans for hardcoded color values in components
   **Then** a report lists: components using hardcoded hex values instead of CSS custom properties or Tailwind classes
   **And** the ratio of token-based vs hardcoded colors is reported

2. **Given** Tailwind CSS 3.4 is the styling framework
   **When** Dev audits styling approaches across components
   **Then** a report categorizes components by styling method: Tailwind classes only, inline styles, CSS modules, mixed
   **And** inconsistencies are flagged (components in the same domain using different approaches)

3. **Given** accessibility baseline exists (Radix UI primitives)
   **When** Dev scans for basic accessibility patterns
   **Then** a report identifies: forms without labels, images without alt text, interactive elements without ARIA attributes, missing keyboard handlers
   **And** the Machine Management UI (Sprint 6) is specifically checked for accessibility compliance

## Tasks / Subtasks

- [ ] Task 1: Color token compliance (AC: #1)
  - [ ] `grep -rn "#[0-9a-fA-F]\{3,6\}" frontend/src/components/ frontend/src/pages/ --include="*.jsx" --include="*.js" --include="*.css"` — find hardcoded hex colors
  - [ ] Cross-reference against documented tokens from UX spec (--primary #4361ee, etc.)
  - [ ] Count: token-based vs hardcoded
  - [ ] List worst offenders (files with 5+ hardcoded colors)

- [ ] Task 2: Styling consistency audit (AC: #2)
  - [ ] Count inline styles: `grep -rn "style={{" frontend/src/ --include="*.jsx" | wc -l`
  - [ ] Count Tailwind className usage: `grep -rn "className=" frontend/src/ --include="*.jsx" | wc -l`
  - [ ] Check for CSS module imports: `grep -rn "import.*\.css\|import.*\.module" frontend/src/ --include="*.jsx" --include="*.js"`
  - [ ] Categorize components by primary styling method

- [ ] Task 3: Accessibility scan (AC: #3)
  - [ ] `grep -rn "<img" frontend/src/ --include="*.jsx" | grep -v "alt="` — images without alt
  - [ ] `grep -rn "<input\|<select\|<textarea" frontend/src/ --include="*.jsx" | grep -v "aria-label\|htmlFor\|id="` — form elements without labels
  - [ ] Check `frontend/src/pages/MachineManagement.jsx` specifically for ARIA labels, keyboard handlers
  - [ ] Count Radix UI component usage vs raw HTML elements for interactive items

- [ ] Task 4: Produce compliance report (AC: #1, #2, #3)
  - [ ] Save to `_bmad-output/implementation-artifacts/evaluation-reports/frontend-design-compliance.md`
  - [ ] Include: token compliance ratio, styling consistency score, accessibility gaps
  - [ ] Prioritize: accessibility issues > color inconsistency > styling mix

## Dev Notes

### UX Design Spec Color Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| --primary | #4361ee | Primary actions, links |
| --secondary | #f72585 | Highlights, badges |
| --success | #4cc9f0 | Success states |
| --warning | #f9c74f | Warnings |
| --danger | #f94144 | Errors, destructive |
| --coins | #ffd700 | Coin display |

### Tailwind Usage Note

From UX spec: "No custom theme extensions — relies on Tailwind 3.4 default palette alongside CSS custom properties."

### Critical Constraints

- **DO NOT modify any files** — scan and report only
- **Accessibility is HIGH priority** — gaps here affect all users
- **Machine Management UI specifically** — this was built by AI agent in Sprint 6, verify quality

### References

- [Source: _bmad-output/ux-design-specification.md — Color System, Typography, Accessibility]
- [Source: project-context.md#Section 2 — React Patterns]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
