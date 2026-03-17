# Story 8.3: Wire ErrorBoundary into App.js

Status: ready-for-dev

## Story

As a Dev,
I want to wire the existing ErrorBoundary component into App.js,
so that uncaught React errors show a user-friendly fallback instead of crashing the entire app.

## Acceptance Criteria

1. **Given** ErrorBoundary component exists but is dead code (never imported)
   **When** Dev imports and wraps the main app content with ErrorBoundary in App.js
   **Then** uncaught errors in any page render a fallback UI instead of a white screen
   **And** the fallback provides a "reload" or "go home" action

## Tasks / Subtasks

- [ ] Task 1: Wire ErrorBoundary (AC: #1)
  - [ ] Find the existing ErrorBoundary component file
  - [ ] Import it in App.js
  - [ ] Wrap the main route/content area with `<ErrorBoundary>`
  - [ ] Verify fallback UI renders on error (can test by temporarily throwing in a component)
  - [ ] Remove the temporary test error

## Dev Notes

### Single-line high-impact fix

```jsx
// App.js
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      {/* existing routes */}
    </ErrorBoundary>
  );
}
```

### Critical Constraints

- **ErrorBoundary already exists** — just wire it in, don't rewrite
- **Minimal change** — this is a one-line import + one-line wrap

### References

- [Source: frontend-evaluation-summary.md#FH6]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List
