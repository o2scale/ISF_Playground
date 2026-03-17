# Epic 14: Cross-Cutting & Unbuilt Features (Backlog / Future Sprint)

**Status:** backlog
**Sprint:** Future (Sprint 2 Completion or Sprint 7)
**Stories:** 10 (6 buildable + 4 deferred)
**Estimated Effort:** ~47h buildable + deferred items for Electron milestone
**Source:** Epic 11 QA validation (fix-stories-consolidated.md)

## Summary

Large-scope items that don't fit Sprint 6 stabilization — net-new feature work (Amma role, WhatsApp), reusable component extraction, and Electron-dependent features. These are NOT stabilization fixes and belong in a dedicated feature sprint.

## Stories

### CRITICAL (Net-New Features)

| Story | Fix ID | Title | Effort | Status |
|-------|--------|-------|--------|--------|
| 14.1 | FIX-005 | Amma role enhancement — 4 stories (FR28-31) | 24h | backlog |
| 14.2 | FIX-006 | WhatsApp integration (FR27) | 8h | backlog |

### HIGH

| Story | Fix ID | Title | Effort | Status |
|-------|--------|-------|--------|--------|
| 14.3 | FIX-021 | Voice communication — extract reusable component (FR26) | 5h | backlog |

### MEDIUM

| Story | Fix ID | Title | Effort | Status |
|-------|--------|-------|--------|--------|
| 14.4 | FIX-028 | Toast notification UI (FR24 gap) | 3h | backlog |

### LOW

| Story | Fix ID | Title | Effort | Status |
|-------|--------|-------|--------|--------|
| 14.5 | FIX-051 | S3 upload offline queue (FR10) | 4h | backlog |
| 14.6 | FIX-052 | Coin balance WebSocket push | 3h | backlog |

### DEFERRED (Electron Milestone)

| Story | Fix ID | Title | Status |
|-------|--------|-------|--------|
| 14.7 | DEF-001 | External tool launch via Electron IPC (FR4) | deferred |
| 14.8 | DEF-002 | SQLite offline caching (FR10) | deferred |
| 14.9 | DEF-003 | Artweaver IPC integration (FR11) | deferred |
| 14.10 | DEF-004 | Live calling infrastructure (FR26) | deferred |

---

## Story Details

### 14.1 — FIX-005: Amma Role Enhancement (FR28-FR31)
- **Priority:** CRITICAL
- **Source:** QA-D3 (Finding #1)
- **Scope:** Net-new controllers, routes, models, and frontend components
- **Description:** Zero Amma-specific code exists. The `amma` role exists in RBAC but has no dedicated functionality. Covers 4 PRD requirements.
- **Sub-Stories:**
  - **A — Self-Registration (6h):** `POST /api/v2/amma/register`, `RegistrationRequest` model, admin approval flow, frontend forms
  - **B — Query Management (8h):** `Query` model with categorization/escalation, CRUD endpoints, frontend UI
  - **C — SLA Auto-Reassignment (8h):** SLA timer fields, `slaMonitorJob` cron, round-robin reassignment, breach notifications
  - **D — Amma Dashboard (4h):** `AmmaDashboard.jsx` with query list, well-being insights, SLA timers

### 14.2 — FIX-006: WhatsApp Integration (FR27)
- **Priority:** CRITICAL
- **Source:** QA-D3 (Finding #2)
- **Scope:** Net-new integration
- **Description:** Zero WhatsApp integration exists. No Business API, no group number storage, no auto-send, no retry queue.
- **AC:**
  - [ ] WhatsApp Business API integration (Twilio or 360dialog)
  - [ ] Balagruha WhatsApp group number storage in settings
  - [ ] Auto-send schedule on admin publish (Monday 8:00 AM)
  - [ ] Retry queue for failed sends
  - [ ] Success/failure logging

### 14.3 — FIX-021: Voice Communication — Reusable Component (FR26)
- **Priority:** HIGH
- **Source:** QA-D3 (Finding #3)
- **Scope:** `CreateNewPinModal.js`; `LifeSkillsVoiceTaskPage.jsx`
- **Description:** Voice recording works but embedded in specific pages. No reusable component or dedicated API.
- **AC:**
  - [ ] `VoiceRecorder.jsx` reusable component extracted
  - [ ] Dedicated `/api/v2/voice-notes/*` endpoints
  - [ ] `VoiceNote` MongoDB model
  - [ ] WTF and Life Skills refactored to use shared component

### 14.4 — FIX-028: Toast Notification UI (FR24 gap)
- **Priority:** MEDIUM
- **Source:** QA-D3 (Finding #6)
- **Scope:** Missing `Toast.jsx`, `ToastContainer.jsx`, `ToastContext.js`
- **Description:** No toast/auto-dismiss notification components despite backend notification system.
- **AC:**
  - [ ] `Toast.jsx` and `ToastContainer.jsx` created
  - [ ] `ToastContext` / `useToast` hook
  - [ ] Auto-dismiss after configurable timeout
  - [ ] Integration with existing notification system

### 14.5 — FIX-051: S3 Upload Offline Queue (FR10)
- **Priority:** LOW
- **Source:** QA-D1 (FR10 notes)
- **Scope:** Frontend student submission pages
- **Description:** No offline submission queue for work submitted during connectivity loss.
- **AC:**
  - [ ] Offline queue via IndexedDB or Service Worker
  - [ ] Auto-retry on connectivity restore
  - [ ] Visual indicator for queued submissions

### 14.6 — FIX-052: Coin Balance WebSocket Push
- **Priority:** LOW
- **Source:** QA-D3 (FR33 notes)
- **Scope:** `TitleBar.jsx`
- **Description:** Coin balance relies on polling instead of real-time push.
- **AC:**
  - [ ] WebSocket or SSE channel for coin balance updates
  - [ ] TitleBar subscribes to push instead of polling

### 14.7 — DEF-001: External Tool Launch via Electron IPC (FR4)
- **Status:** DEFERRED — requires Electron desktop wrapper

### 14.8 — DEF-002: SQLite Offline Caching (FR10)
- **Status:** DEFERRED — requires Electron or WebAssembly SQLite (sql.js)

### 14.9 — DEF-003: Artweaver IPC Integration (FR11)
- **Status:** DEFERRED — requires Electron IPC for canvas mirroring

### 14.10 — DEF-004: Live Calling Infrastructure (FR26)
- **Status:** DEFERRED — requires WebRTC peer-to-peer or SFU infrastructure
