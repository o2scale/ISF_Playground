# Client Bug Reports

**Tracker:** Manual (client-reported + team-reported)
**Last Updated:** 2026-03-24
**Status:** 19 open bugs, 6 course-creation bugs fixed, 15 historical fixes

**Source:** Google Sheet "Bug Report and Feature Requests in Playground" + team report `docs/bugs/bugs230326.md`

---

## Open Bugs — Persisting (Team-verified as still broken)

### Admin (6 persisting)

| ID | Severity | Module / View | Problem Description | Reported Behavior | Status | Reported Date |
|----|----------|---------------|---------------------|-------------------|--------|---------------|
| A-2 | Critical | Admin (Purchase) | Missing Approval Action | No "Approve" button visible for purchase requests sent from the Purchase Manager | Open | 2026-03-09 |
| A-4 | High | Admin (Translation Mgmt) | Translation management not active | No course available in published course dropdown menu | Open | 2026-03-06 |
| A-6 | Medium | Admin (ISF Shop) | Missing back button in zero purchase report | ISF Shop > Reports > Zero Purchases Report > View student profile — not able to go back (no back button) | Open | 2026-03-06 |
| A-7 | Critical | Admin (Course) | Assign course failure | When clicking assign course option, screen gets blank | Open | — |
| A-8 | Medium | Admin (ISF Shop) | SKU Field Logic | The SKU field is labeled "Optional" but is actually mandatory to proceed | Open | — |
| A-9s | High | Admin (ISF Shop) | Reports not loading | Admin ISF Shop reports failed to load | Open | — |

### Coach (4 persisting)

| ID | Severity | Module / View | Problem Description | Reported Behavior | Status | Reported Date |
|----|----------|---------------|---------------------|-------------------|--------|---------------|
| C-2 | High | Coach (Courses) | Empty Course Folders | The Courses section appears incomplete as no content is visible in the folders | Open | — |
| C-4 | High | Coach (Assignment) | No progress in Assignment section | Clicked on assign new course, progress still shows 0% | Open | 2026-03-06 |
| C-8 | — | Coach (Assignment) | No progress (duplicate of C-4) | Same as C-4 | Open | 2026-03-06 |
| C-9 | High | Coach (Shop) | Item request failed in shop | When a coach requests item from the shop — request item fails | Open | — |

### Student (5 persisting)

| ID | Severity | Module / View | Problem Description | Reported Behavior | Status | Reported Date |
|----|----------|---------------|---------------------|-------------------|--------|---------------|
| S-1 | Critical | Student (Course) | Course workflow disturbed | Through admin view published one new course and quiz but it's not available in Student view | Open | 2026-02-26 |
| S-2 | Medium | Student (ISF Shop) | Order workflow unclear | Through ISF shop, made one order but who received that order I have no idea | Open | 2026-03-06 |
| S-9 | High | Student (Quiz) | Reward Error — 0 Coins | Correct quiz answers occasionally result in "0 Coins Earned" | Open | — |
| S-10 | High | Student (Coins) | Duplicate Rewards | Coin history shows multiple rewards granted for the same quiz attempt | Open | 2026-03-04 |
| S-11 | Medium | Student (ISF Shop) | Missing Shopping Cart | Products can be "Added to Cart," but there is no visible cart icon or page to view them | Open | 2026-03-04 |

### Purchase Manager (1 persisting)

| ID | Severity | Module / View | Problem Description | Reported Behavior | Status | Reported Date |
|----|----------|---------------|---------------------|-------------------|--------|---------------|
| P-1 | High | PM (ISF Shop) | Missing supplier data | Vendors added via Admin view are not appearing in the purchase supplier list | Open | — |

### Medical (2 pending)

| ID | Severity | Module / View | Problem Description | Reported Behavior | Status | Reported Date |
|----|----------|---------------|---------------------|-------------------|--------|---------------|
| M-1 | — | Medical | Doctors data bank UI | "We need doctors data bank" — Shared UI by S mam | Pending (feature) | 2025-03-10 |
| M-2 | Low | Medical (Shop) | Add to cart button visible | No use of add to cart button for medical incharge | Pending | — |

### Playground / Cross-cutting (1 persisting)

| ID | Severity | Module / View | Problem Description | Reported Behavior | Status | Reported Date |
|----|----------|---------------|---------------------|-------------------|--------|---------------|
| PG-8 | Medium | Frontend / CreatePurchaseRequestModal.jsx | Edit modal not pre-filling data | Products, deadline, and other fields empty when editing | Open | 2026-02-24 |

---

## Fixed — Course Creation & Publishing (Team report 2026-03-23)

**Source:** `docs/bugs/bugs230326.md` — reported by team member via Anjay
**Fixed in:** commit d26c69d1 (2026-03-23)

| ID | Severity | Module / View | Problem | Fix |
|----|----------|---------------|---------|-----|
| CC-1 | Critical | Admin (Course > Upload) | Thumbnail upload not updating | Base64 preview + S3 fallback |
| CC-2 | Critical | Admin (Course > Chapter) | PDF upload fails silently | Simplified MIME validation with error messages |
| CC-3 | High | Admin (Course > Publish) | Cannot publish — no error | Actionable validation messages with module/chapter names |
| CC-4 | Medium | Admin (Course > Chapter) | URL field no validation | http/https format check added |
| CC-5 | Medium | Admin (Course > Preview) | Preview opens externally | Embedded preview modal for video/audio/image/PDF |
| CC-6 | Low | Admin (Course) | Draft blocks progress | Resolved by CC-1 (thumbnail fallback) |

---

## Fixed — Historical (previously resolved, now re-verified as NOT fixed per team sheet)

> **Note:** The following bugs were previously marked Fixed in commits 07980228, 21908b22, etc. during Sprint 6. However, the team's Google Sheet (as of 2026-03-24) reports them as **still In Progress**. They have been moved back to Open above. The code changes may not have been deployed, or the fixes did not address the root cause.

**Bugs that remain genuinely fixed (confirmed by team sheet):**

| ID | Module / View | Problem | Status | Resolved |
|----|---------------|---------|--------|----------|
| A-3 | Admin (Course) | Permission Error — Access Denied | Fixed | 2026-03-09 |
| C-1 | Coach (Shop) | Shop request missing Balagruha data | Fixed | — |
| C-3 | Coach (Shop) | Shop request missing data (dup C-1) | Fixed | — |
| C-5 | Coach (Courses) | Empty course folders (dup C-2) | Fixed | — |
| C-6 | Coach (Users) | Add New User tab missing | Fixed | 2026-03-04 |
| C-7 | Coach (Dashboard) | Schedule 24hr → 12hr clock | Fixed | 2026-03-04 |
| S-7 | Student | Missing logout option | Fixed | — |
| S-8 | Student (Quiz) | Quiz logic — exceed 3 attempts | Fixed | 2026-03-06 |

### Backend / Frontend Fixes (Historical — 2026-02-24)

| ID | Module / View | Problem | Status |
|----|---------------|---------|--------|
| BF-1 | Backend / purchase-requests.js | `/pending-count` returning 400 | Fixed |
| BF-2 | Backend / shop.js | Products not showing on category filter | Fixed |
| BF-3 | Backend / api.js | Out of stock products hidden from PM | Fixed |
| BF-4 | Frontend / ProductManagement.jsx | Category filter mismatch | Fixed |
| BF-5 | Frontend / CreatePurchaseRequestModal.jsx | Missing estimated unit cost field | Fixed |
| BF-6 | Frontend / ShopInventoryView.jsx | PM not seeing pending_approval requests | Fixed |
| BF-7 | Backend / purchaseRequestController.js | Approval workflow skipping fulfillment | Fixed |
| BF-8 | Frontend / CreatePurchaseRequestModal.jsx | Edit modal not pre-filling data | Fixed (but PG-8 reports regression) |

---

## Client Suggestions (Backlog)

- **Auto-generate SKU:** Client suggests Playground should auto-create SKU for every product (raised with A-8)
- **Doctors Data Bank UI:** S mam shared UI design for medical data bank (M-1) — future sprint

---

## Summary

| Role | Fixed | Open | Pending |
|------|-------|------|---------|
| Admin | 1 (A-3) + 6 (CC-1–CC-6) | 6 (A-2, A-4, A-6, A-7, A-8, A-9s) | 0 |
| Coach | 4 (C-1, C-3, C-5, C-6, C-7) | 4 (C-2, C-4, C-8, C-9) | 0 |
| Student | 2 (S-7, S-8) | 5 (S-1, S-2, S-9, S-10, S-11) | 0 |
| Purchase Manager | 0 | 1 (P-1) | 0 |
| Medical | 0 | 0 | 2 (M-1, M-2) |
| Playground | 7 (BF-1–BF-7) | 1 (PG-8) | 0 |
| **Total** | **20** | **17** | **2** |

---

## Priority Fix Order (Recommended)

### Tier 1 — Critical (breaks core workflows)
1. **A-2** — PM Approve button missing (purchase workflow blocked)
2. **A-7** — Assign course blank screen (course assignment blocked)
3. **S-1** — Published course not visible to student (LMS workflow broken)
4. **S-9** — 0 Coins on correct answer (coin economy broken)
5. **S-10** — Duplicate coin rewards (coin economy integrity)

### Tier 2 — High (feature non-functional)
6. **A-4** — Translation management not active
7. **A-9s** — ISF Shop reports not loading
8. **C-2** — Coach empty course folders
9. **C-4/C-8** — Coach assignment progress 0%
10. **C-9** — Coach shop item request fails
11. **P-1** — PM missing supplier data

### Tier 3 — Medium (UX issues)
12. **A-6** — Missing back button in zero purchases report
13. **A-8** — SKU field labeled optional but mandatory
14. **S-2** — Order workflow unclear (who received?)
15. **S-11** — Missing shopping cart
16. **PG-8** — Edit modal not pre-filling data

### Tier 4 — Pending (feature requests)
17. **M-1** — Doctors data bank UI (net-new)
18. **M-2** — Medical cart button (hide/disable)
