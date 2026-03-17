# Story 8.8: Accessibility Quick Wins

Status: ready-for-dev

## Story

As a Dev,
I want to add alt text to critical images and bind form labels on the most-used pages,
so that the platform meets basic accessibility requirements for screen reader users.

## Acceptance Criteria

1. **Given** 87% of images lack alt text (only 13% have it)
   **When** Dev adds descriptive alt text to images on the 10 most-used pages (student dashboard, admin dashboard, shop, login, etc.)
   **Then** all `<img>` tags on those pages have meaningful alt text (not empty alt="" unless decorative)

2. **Given** 0% of form labels are properly bound (661 form elements without id attributes)
   **When** Dev adds id attributes and htmlFor bindings to forms on the 5 most critical pages (login, user management, course creation, purchase request, machine management)
   **Then** form inputs on those pages have associated labels via htmlFor/id binding
   **And** screen readers can announce form field purposes

3. **Given** accessibility improvements are made
   **When** Dev runs frontend tests
   **Then** all tests pass and no visual regressions

## Tasks / Subtasks

- [ ] Task 1: Add alt text to critical page images (AC: #1)
  - [ ] Identify the 10 most important pages (by user traffic / role criticality)
  - [ ] For each page, find all `<img>` tags without alt text
  - [ ] Add descriptive alt text (describe the image content, not "image")
  - [ ] For decorative images, use `alt=""` with `role="presentation"`

- [ ] Task 2: Bind form labels on critical pages (AC: #2)
  - [ ] Login page — bind all input labels
  - [ ] User management page — bind all CRUD form inputs
  - [ ] Course creation page — bind content forms
  - [ ] Purchase request form — bind all input fields
  - [ ] Machine Management page — bind registration and edit forms
  - [ ] Pattern: add `id` to `<input>`, add `htmlFor` to `<label>`

- [ ] Task 3: Verify (AC: #3)
  - [ ] Run frontend tests — zero regressions
  - [ ] Tab through key forms with keyboard — verify focus order is logical

## Dev Notes

### Quick Win Scope

This is NOT a full accessibility audit — it's the highest-impact quick fixes. Full WCAG compliance is future work. Focus on:
- **Alt text** — screen readers need this for images
- **Form labels** — screen readers need this to announce input purposes
- **Keyboard basics** — Radix UI components handle this natively

### Critical Constraints

- **Don't rewrite components** — just add attributes
- **Meaningful alt text** — "Student profile photo" not "image" or "photo"
- **Focus on most-used pages** — don't try to fix all 36 pages
- **Machine Management UI specifically** — Sprint 6 built this, verify it's accessible

### References

- [Source: frontend-evaluation-summary.md#FH2]
- [Source: frontend-design-compliance.md — accessibility gaps]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
