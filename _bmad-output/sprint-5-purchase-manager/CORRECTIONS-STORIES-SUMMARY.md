# Sprint 5 Purchase Manager - Corrections Stories Summary

**Created:** January 5, 2026  
**Status:** Ready for Development  
**Total New Stories:** 7

---

## 📋 Stories Created from Client Corrections

| Story # | Title | Priority | Effort | Status |
|---------|-------|----------|--------|--------|
| **3.5** | PM Bunched/Grouped View | 🔴 P0 | 1-2 days | `pending` |
| **3.6** | Additional Status Tabs (Present Stock, Supplier List, Most Consumed) | 🔴 P0 | 2-3 days | `pending` |
| **3.7** | Shorten Request ID to 5 Digits | 🟡 P1 | 0.5 day | `pending` |
| **3.8** | Add Coach Filter | 🟡 P1 | 0.5 day | `pending` |
| **3.9** | PM Navigation Pending Badge | 🟡 P1 | 0.5 day | `pending` |
| **3.10** | Column Reorder & UI Cleanup | 🟢 P2 | 0.5 day | `pending` |
| **2.6** | Repair Technician & Delivered By Coach Tracking | 🟡 P1 | 0.5 day | `pending` |

**Total Estimated Effort:** 5.5 - 8 days

---

## 📁 Story Files Location

All stories are in: `_bmad-output/sprint-5-purchase-manager/`

| File | Story |
|------|-------|
| `3-5-pm-bunched-view.md` | PM Bunched/Grouped View |
| `3-6-additional-status-tabs.md` | Additional Status Tabs |
| `3-7-shorten-request-id.md` | Shorten Request ID |
| `3-8-coach-filter.md` | Add Coach Filter |
| `3-9-pm-navigation-badge.md` | PM Navigation Badge |
| `3-10-column-reorder-cleanup.md` | Column Reorder & UI Cleanup |
| `2-6-repair-technician-tracking.md` | Repair Technician Tracking |

---

## 🎯 Recommended Implementation Order

### Phase 1: Critical (Do First)
1. **Story 3.10** - Column Reorder & UI Cleanup (quick win, improves UX immediately)
2. **Story 3.7** - Shorten Request ID (foundational change)

### Phase 2: High Priority
3. **Story 3.6** - Additional Status Tabs (major feature)
4. **Story 3.5** - PM Bunched View (major feature)

### Phase 3: Medium Priority
5. **Story 3.8** - Coach Filter
6. **Story 3.9** - PM Navigation Badge
7. **Story 2.6** - Repair Technician Tracking

---

## 🔧 Backend Changes Summary

| Endpoint | Story | Description |
|----------|-------|-------------|
| `GET /api/v2/shop/admin/inventory/stock-levels` | 3.6 | Present stock with status |
| `GET /api/v2/shop/admin/analytics/most-consumed` | 3.6 | Most consumed products |
| `GET /api/v2/shop/admin/requests/bunched` | 3.5 | Bunched view aggregation |
| `GET /api/v2/shop/admin/requests/coaches` | 3.8 | List requesting coaches |
| `GET /api/v2/shop/admin/requests/pending-count` | 3.9 | Pending count for badge |

### Schema Changes
| Model | Field | Story |
|-------|-------|-------|
| `PurchaseRequest` | `shortId` (Number, unique) | 3.7 |
| `PurchaseRequest` | `repairTechnicianName` (String) | 2.6 |
| `PurchaseRequest` | `deliveredByCoachId` (ObjectId) | 2.6 |
| `PurchaseRequest` | `deliveredToBalagruhaAt` (Date) | 2.6 |
| `Counter` | NEW MODEL for auto-increment | 3.7 |

---

## 🎨 Frontend Changes Summary

| Component | Stories | Changes |
|-----------|---------|---------|
| `ShopInventoryView.jsx` | 3.5, 3.6, 3.8, 3.10 | Add tabs, bunched view toggle, coach filter, reorder columns |
| `PresentStockView.jsx` | 3.6 | NEW - Stock levels view |
| `SupplierListView.jsx` | 3.6 | NEW - Vendor list view |
| `MostConsumedView.jsx` | 3.6 | NEW - Analytics view |
| `BunchedItemsView.jsx` | 3.5 | NEW - Grouped items view |
| `ViewRequestModal.jsx` | 2.6, 3.7 | Show short ID, tracking info |
| `Sidebar.jsx` | 3.9 | Add pending badge |
| `NavBadge.jsx` | 3.9 | NEW - Badge component |

---

## ✅ Definition of Done (All Stories)

- [ ] Backend endpoints implemented and tested
- [ ] Frontend components implemented
- [ ] Unit tests written
- [ ] Manual QA passed
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] Client demo/approval

---

## 📚 Related Documents

- `CLIENT-CORRECTIONS-CONSOLIDATED.md` - Full list of client feedback
- `dev-handoff-comprehensive.md` - Developer handoff guide
- `epics.md` - Updated epics with all stories
- `prd-purchase-manager-workflow.md` - Product requirements

---

**Document End**
