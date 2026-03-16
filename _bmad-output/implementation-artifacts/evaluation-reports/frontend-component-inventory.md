# Frontend Component & Page Inventory

**Story:** 7.1 -- Component & Page Inventory
**Date:** 2026-03-16
**Scope:** `frontend/src/` -- all .js, .jsx, .tsx, .ts files (excluding test files)

---

## 1. Total Counts

| Category | File Count | Total Lines |
|---|---:|---:|
| Pages | 36 | 12,648 |
| Components (domain) | 202 | 70,643 |
| UI Primitives (components/ui/) | 51 | 4,809 |
| UI Duplicates (src/ui/) | 2 | 82 |
| Hooks | 8 | 755 |
| Contexts | 4 | 650 |
| Store (Zustand) | 1 | 441 |
| API Modules (api/) | 19 | 2,027 |
| Constants | 2 | 137 |
| Utils | 3 | 268 |
| Lib | 1 | 6 |
| Other (App.js, index.js, etc.) | 6 | 646 |
| **TOTAL** | **335** | **93,112** |

### Component Subfolder Breakdown

| Subfolder | Files | Lines |
|---|---:|---:|
| components/admin/ | 33 | 8,296 |
| components/shop/ | 39 | 7,068 |
| components/dashboard/ | 22 | 14,065 |
| components/wtf/ | 18 | 11,118 |
| components/student/ | 23 | 3,211 |
| components/purchaseManagement/ | 8 | 6,130 |
| components/usermanagement/ | 5 | 3,839 |
| components/coach/ | 7 | 1,561 |
| components/profile/ | 7 | 694 |
| components/pinlogin/ | 2 | 308 |
| components/login/ | 2 | 99 |
| components/faceidlogin/ | 1 | 599 |
| components/balagruhaManagement/ | 1 | 601 |
| components/machineManagement/ | 1 | 1,318 |
| components/RBAC/ | 1 | 786 |
| components/repairManagement/ | 1 | 942 |
| components/TaskManagement/ | 1 | 4,150 |
| components/courseManagement/ | 2 | 63 |
| components/Attendance/ | 1 | 196 |
| components/cards/ | 1 | 8 |
| components/header/ | 1 | 56 |
| components/sidebar/ | 1 | 20 |
| components/hooks/ | 1 | (see Hooks) |
| components/ (root-level) | 7 | 939 |

---

## 2. Route Table

All routes are defined in `frontend/src/App.js` (575 lines). The file `AppRoutes.js` (111 lines) exists but is **never imported** -- it is dead code containing an older route configuration.

### Student LMS Routes (wrapped in `<StudentLayout>`)

| Path | Component | Auth |
|---|---|---|
| `/student/dashboard` | StudentDashboardPage | ProtectedRoute |
| `/student/computer-apps` | ComputerAppsPage | ProtectedRoute |
| `/student/computer-apps/quiz/results` | StudentQuizResults | ProtectedRoute |
| `/student/computer-apps/quiz/:quizId` | StudentQuizPage | ProtectedRoute |
| `/student/computer-apps/:courseId` | ComputerAppsPage | ProtectedRoute |
| `/student/art` | ArtCoursePage | ProtectedRoute |
| `/student/spoken-english` | SpokenEnglishPage | ProtectedRoute |
| `/student/spoken-english/:taskId` | SpokenEnglishPage | ProtectedRoute |
| `/student/life-skills` | LifeSkillsCoursePage | ProtectedRoute |
| `/student/life-skills/quiz/results` | StudentQuizResults | ProtectedRoute |
| `/student/life-skills/quiz/:quizId` | StudentQuizPage | ProtectedRoute |
| `/student/life-skills/voice/:taskId` | LifeSkillsVoiceTaskPage | ProtectedRoute |
| `/student/homework` | Placeholder (Coming Soon) | ProtectedRoute |

### Main Layout Routes (wrapped in `<Layout>`)

| Path | Component | Auth |
|---|---|---|
| `/` | Redirect to `/dashboard` | -- |
| `/login` | StudentLogin | Public |
| `/admin/login` | LoginCard | Public |
| `/dashboard` | Dashboard | ProtectedRoute |
| `/users` | UserManagement | module="User Management" action="Read" |
| `/rbac` | RBACManagement | module="Role Management" action="Read" |
| `/task` | TaskManagement | module="Task Management" action="Read" |
| `/machines` | MachineManagement | module="Machine Management" action="Read" |
| `/balagruha` | BalagruhaManagement | **No ProtectedRoute wrapper** |
| `/attendance` | AttendanceComponent | **No ProtectedRoute wrapper** |
| `/course` | CourseManagement | None (open) |
| `/repair` | RepairManagement | None (open) |
| `/purchase` | PurchaseManagement | None (open) |
| `/wtf` | WtfDashboard | ProtectedRoute |
| `/shop` | ShopHome | ProtectedRoute |
| `/shop/checkout` | Checkout | ProtectedRoute |
| `/shop/orders` | OrderHistory | ProtectedRoute |
| `/shop/orders/:orderNumber` | OrderDetail | ProtectedRoute |
| `/shop/orders/:orderNumber/receipt` | OrderReceipt | ProtectedRoute |
| `/coins/history` | TransactionHistory | ProtectedRoute |
| `/shop/admin/products` | ProductManagement | module="Shop Management" action="Manage" |
| `/shop/admin/vendors` | VendorManagement | module="Shop Management" action="Manage" |
| `/shop/admin/inventory` | InventoryManagement | module="Shop Management" action="Manage" |
| `/shop/admin/inventory/low-stock` | LowStockReport | module="Shop Management" action="Manage" |
| `/shop/admin/inventory/out-of-stock` | OutOfStockReport | module="Shop Management" action="Manage" |
| `/shop/admin/inventory/master-report` | MasterInventoryReport | module="Shop Management" action="Manage" |
| `/shop/admin/analytics` | ShopAnalytics | module="Shop Management" action="Manage" |
| `/shop/admin/reports` | TransactionReports | module="Shop Management" action="Manage" |
| `/purchase-manager/low-stock` | PMLowStock | ProtectedRoute |
| `/coach/deliveries` | CoachDeliveries | ProtectedRoute |
| `/coach/requests` | CoachRequestsDashboard | ProtectedRoute + CoachOrAdminRoute |
| `/profile` | StudentProfile | ProtectedRoute |
| `/admin/students/:userId` | StudentProfile | ProtectedRoute |
| `/admin/courses` | AdminCourseDashboard | module="LMS Management" action="Manage" |
| `/admin/courses/:courseId/structure` | CourseStructureBuilder | module="LMS Management" action="Manage" |
| `/admin/content` | ContentLibrary | module="LMS Management" action="Manage" |
| `/admin/quizzes` | QuizDashboard | module="LMS Management" action="Manage" |
| `/admin/quizzes/create` | QuizBuilder | module="LMS Management" action="Manage" |
| `/admin/quizzes/:quizId/edit` | QuizBuilder | module="LMS Management" action="Manage" |
| `/admin/courses/:courseId/quizzes/create` | QuizBuilder | module="LMS Management" action="Manage" |
| `/admin/translations` | TranslationDashboard | module="LMS Management" action="Manage" |
| `/admin/translations/:courseId/queue` | TranslationQueue | module="LMS Management" action="Manage" |
| `/admin/translations/:courseId/editor` | TranslationEditor | module="LMS Management" action="Manage" |
| `/coach/assignments` | CoachAssignmentsPage | ProtectedRoute |
| `/coach/grading` | GradingDashboard | ProtectedRoute |
| `/access-denied` | AccessDenied | Inside Layout |
| `*` | NotFound | Inside Layout |

**Note:** Routes for `/balagruha`, `/attendance`, `/course`, `/repair`, and `/purchase` lack a `<ProtectedRoute>` wrapper. They sit inside `<Layout>` which checks `isAuthenticated`, so they are indirectly protected, but they have no RBAC permission checks.

---

## 3. Navigation Entries (Layout.js sidebar/top-menu)

Navigation is defined as a `topMenus` array in `Layout.js` (not a separate sidebar component). Role-based filtering is applied at render time.

| ID | Label | Link | Roles |
|---:|---|---|---|
| 1 | Dashboard | /dashboard | admin, coach, balagruha-incharge, student, purchase-manager, medical-incharge, sports-coach, music-coach, amma |
| 2 | Users | /users | admin, coach |
| 3 | Machines | /machines | admin, coach, balagruha-incharge, purchase-manager, medical-incharge, sports-coach, music-coach, amma |
| 4 | Tasks | /task | admin, coach |
| 5 | Attendance | /attendance | admin, coach |
| 6 | Balagruhas | /balagruha | admin |
| 7 | Courses | /admin/courses | admin |
| 8 | Access | /rbac | admin |
| 9 | Repairs | /repair | admin |
| 10 | Purchases | /purchase | admin, purchase-manager, coach, medical-incharge, balagruha-incharge, sports-coach, music-coach, amma |
| 11 | Shop | /shop | student, admin, coach, medical-incharge, balagruha-incharge, sports-coach, music-coach, amma |
| 12 | Low Stock | /purchase-manager/low-stock | purchase-manager |
| 13 | WTF | /wtf | admin, coach, balagruha-incharge, student, medical-incharge, sports-coach, music-coach, amma |
| 15 | Translations | /admin/translations | admin |
| 16 | Courses | /coach/grading | coach |
| 17 | Assignments | /coach/assignments | coach, admin |
| 18 | My Courses | /student/dashboard | student |

Additional custom role menus are defined for: `medical-incharge`, `sports-coach`, `music-coach`, `amma`. Student users get routed through `StudentLayout` with `TitleBar` navigation instead of the standard Layout top-menu.

---

## 4. Page-to-Component Dependency Map

### Shop Pages

| Page | Component Imports |
|---|---|
| Checkout.jsx | OrderSummary, PaymentDetails, OrderConfirmation |
| CoachDeliveries.jsx | ShopNavigation, Breadcrumbs |
| CoachRequestsDashboard.jsx | ShopNavigation, Breadcrumbs |
| InventoryManagement.jsx | StockAdjustmentModal, BulkStockUploadModal, AuditTrailModal, Breadcrumbs, ShopAdminControls |
| LowStockReport.jsx | StockAdjustmentModal, Breadcrumbs |
| MasterInventoryReport.jsx | Breadcrumbs, ShopAdminControls |
| OrderDetail.jsx | StatusBadge, OrderTimeline, CancellationTimer, CancelOrderModal, ShopNavigation, Breadcrumbs |
| OrderHistory.jsx | OrderCard, OrdersEmptyState, ShopNavigation, Breadcrumbs |
| OrderReceipt.jsx | (none -- uses API directly) |
| OutOfStockReport.jsx | StockAdjustmentModal, Breadcrumbs |
| PMLowStock.jsx | CreatePurchaseRequestModal |
| ProductManagement.jsx | ProductTable, ProductFormModal, DeleteConfirmModal, Breadcrumbs, ShopAdminControls |
| ShopAnalytics.jsx | DateRangeSelector, AnalyticsOverview, RevenueChart, CategoryPieChart, TopProductsTable, Breadcrumbs, ShopAdminControls |
| TransactionHistory.jsx | TransactionFilters, TransactionList, TransactionDetailModal, ShopNavigation, Breadcrumbs |
| TransactionReports.jsx | TransactionLogTable, StudentLeaderboard, ZeroPurchasesReport, CoinEconomyHealth, Breadcrumbs, ShopAdminControls |
| VendorManagement.jsx | Breadcrumbs, ShopAdminControls, VendorFormModal |

### Admin LMS Pages

| Page | Component Imports |
|---|---|
| AdminCourseDashboard.jsx | CourseListView, CourseCreationModal |
| ContentLibrary.jsx | FileUploadModal, FileDetailsModal, EditMetadataModal, UploadQueue |
| CourseStructureBuilder.jsx | ModuleCard, AddModuleModal |
| QuizBuilder.jsx | MCQEditor, TrueFalseEditor, FillBlankEditor, QuestionBankModal, QuizPreview |
| QuizDashboard.jsx | (none -- self-contained) |
| TranslationDashboard.jsx | (none -- self-contained) |
| TranslationEditor.jsx | PublishTranslationsModal |
| TranslationQueue.jsx | (none -- self-contained) |

### Admin Machine Management

| Page | Component Imports |
|---|---|
| MachineManagement.jsx (pages/) | MachineRegistrationModal, MachineEditModal, DeactivateConfirmModal, MachineLogsModal |

### Student LMS Pages

| Page | Component Imports |
|---|---|
| StudentDashboardPage.jsx | StudentLayout, ResumeActivityCard, CourseCategoryCard |
| ComputerAppsPage.jsx | AppCard, CourseAudioPlayer, CourseImageViewer |
| ArtCoursePage.jsx | StudentLayout, WorkshopsMode, FreeSketchMode, ArtStoriesMode, CompetitionMode |
| SpokenEnglishPage.jsx | StudentLayout, AudioInstructions, WebcamPreview, RecordingControls, RedoModal |
| LifeSkillsCoursePage.jsx | StudentLayout |
| LifeSkillsVoiceTaskPage.jsx | StudentLayout, AudioQuestionCard, WaveformVisualizer |
| StudentQuizPage.jsx | AudioQuestionCard |
| StudentQuizResults.jsx | (none -- self-contained) |

### Coach Pages

| Page | Component Imports |
|---|---|
| CoachAssignmentsPage.jsx | CoachAssignmentsView |
| GradingDashboard.jsx | SubmissionQueue, ArtGradingInterface, VideoGradingInterface, AudioGradingInterface |

### Profile Pages

| Page | Component Imports |
|---|---|
| StudentProfile.jsx | ProfileHeader, CoinWalletCard, WTFActivityCard, ShoppingCard, LearningCard, WellnessCard, QuickActionsPanel |

---

## 5. Shared Components (imported by 3+ files)

These are core reusable components:

| Component | Importers |
|---|---:|
| components/shop/Breadcrumbs.jsx | 14 |
| components/ui/dialog.jsx | 10 |
| components/ui/button.jsx | 9 |
| components/ui/badge.jsx | 8 |
| components/shop/ShopAdminControls.jsx | 7 |
| components/student/StudentLayout.jsx | 7 |
| components/shop/ShopNavigation.jsx | 6 |
| components/TaskManagement/taskmanagement.js | 6 |
| components/shop/StockAdjustmentModal.jsx | 4 |
| components/student/art/CanvasPreview.jsx | 4 |
| components/dashboard/WeeklyCalendar.js | 4 |
| components/ui/input.jsx | 4 |
| components/shop/StatusBadge.jsx | 3 |
| components/shop/VendorFormModal.jsx | 3 |
| components/coach/grading/GradingPanel.jsx | 3 |
| components/dashboard/DoctorNameDropdown.js | 3 |
| components/student/art/SubmissionModal.jsx | 3 |
| components/usermanagement/usermanagement.js | 3 |

---

## 6. Dead Components (imported nowhere)

61 component files are never imported by any source file in the project.

### Application-Level Dead Components (non-UI-primitive)

| File | Lines | Notes |
|---|---:|---|
| components/ErrorBoundary.jsx | 65 | Registered in index.js? No -- not imported anywhere |
| components/Navigation.js | 58 | Legacy navigation component |
| components/PermissionGuard.jsx | 45 | Replaced by ProtectedRoute |
| components/RoleBasedNavigation.js | 72 | Replaced by Layout.js role filtering |
| components/admin/CourseAuditTrail.jsx | 204 | Built but never wired into a page |
| components/admin/inventory/NewItemForm.jsx | 473 | Only imported by its test file |
| components/cards/cards.js | 8 | Empty/stub component |
| components/dashboard/DoctorVisitsSection.js | 265 | Replaced by MultipleDoctorVisitsSection |
| components/dashboard/FollowUpSection.js | 121 | Replaced by MultipleFollowUpsSection |
| components/header/header.js | 56 | Legacy header, replaced by Layout.js |
| components/sidebar/sidebar.js | 20 | Legacy sidebar, replaced by Layout.js |
| components/student/coins/CoinAnimation.jsx | 120 | Built but never used |
| components/student/computer-apps/LevelCard.jsx | 128 | Built but never used |
| components/student/computer-apps/TaskDetails.jsx | 105 | Built but never used |
| components/usermanagement/form.js | 95 | Legacy form, replaced by UserForm.js |
| components/wtf/LevelIndicators.js | 68 | Built but never used |

**Subtotal: 16 application dead components (1,903 lines)**

### Dead UI Primitives (shadcn/ui -- installed but never imported)

46 `.tsx` files in `components/ui/` are never directly imported. These are shadcn/ui components that were installed but are not currently used:

accordion, alert-dialog, alert, aspect-ratio, avatar, badge.tsx, breadcrumb, button.tsx, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, drawer, dropdown-menu, form, hover-card, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar (761 lines), skeleton, slider, sonner, switch, table, tabs, textarea, toast, toaster, toggle-group, toggle, tooltip, use-toast.ts

**Note:** The project uses `.jsx` variants (badge.jsx, button.jsx, dialog.jsx, input.jsx) from `components/ui/` instead of the `.tsx` equivalents. The `.tsx` files are unused duplicates from the shadcn/ui installation.

**Subtotal: 45 UI primitive dead files (4,809 lines)**

---

## 7. Dead Top-Level Files

| File | Lines | Notes |
|---|---:|---|
| AppRoutes.js | 111 | Never imported -- older route config superseded by App.js |
| api.js | 4 | Barrel re-export to api/index.js; imported by some files but functionally redundant |
| components/hooks/usePermission.js | -- | Duplicate hook; also exists at hooks/usePermission.js. Layout.js imports from components/hooks/ |
| hooks/useUserRole.tsx | -- | Does not exist; only hooks/useUserRole.js exists |

---

## 8. Large Files (> 500 lines)

| File | Lines | Category |
|---|---:|---|
| components/TaskManagement/taskmanagement.js | 4,150 | Monolithic -- God component |
| components/wtf/WTFManagement.js | 3,441 | Monolithic -- God component |
| components/wtf/WallOfFame.js | 2,926 | Monolithic -- God component |
| components/dashboard/MusicCoach.js | 2,861 | Monolithic -- God component |
| components/dashboard/Sportscoach.js | 2,513 | Monolithic -- God component |
| components/dashboard/medicalIncharge.js | 2,182 | Monolithic -- God component |
| components/purchaseManagement/views/ShopInventoryView.jsx | 1,997 | Very large view |
| components/usermanagement/UserForm.js | 1,930 | Monolithic form |
| components/usermanagement/usermanagement.js | 1,696 | Monolithic |
| components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx | 1,609 | Very large modal |
| components/wtf/CreateNewPinModal.js | 1,521 | Very large modal |
| components/dashboard/admin.js | 1,439 | Monolithic dashboard |
| components/machineManagement/machineManagement.js | 1,318 | Monolithic |
| components/dashboard/WeeklyCalendar.js | 1,296 | Large component |
| components/dashboard/balagruha.js | 975 | Large component |
| components/repairManagement/RepairManagement.js | 942 | Monolithic |
| components/purchaseManagement/views/MachineRepairsView.jsx | 926 | Large view |
| components/dashboard/purchaseDashboard.js | 926 | Large dashboard |
| pages/admin/QuizBuilder.jsx | 802 | Large page |
| components/RBAC/RBACManagement.js | 786 | Monolithic |
| components/ui/sidebar.tsx | 761 | Dead -- unused shadcn component |
| pages/CoachDeliveries.jsx | 759 | Large page |
| components/shop/ProductFormModal.jsx | 651 | Large modal |
| pages/admin/TranslationEditor.jsx | 608 | Large page |
| components/Layout.js | 602 | Layout (contains nav, notifications, menus) |
| components/balagruhaManagement/balagruhamanagement.js | 601 | Monolithic |
| components/faceidlogin/FaceIdLogin.js | 599 | Large component |
| components/purchaseManagement/modals/ViewRequestModal.jsx | 595 | Large modal |
| pages/MachineManagement.jsx | 593 | Large page |
| App.js | 575 | Entry point with all routes |
| api/wtf.js | 575 | Large API module |
| components/wtf/modals/AudioPlayer.js | 572 | Large modal |
| pages/InventoryManagement.jsx | 567 | Large page |
| components/wtf/modals/ImageViewer.js | 540 | Large modal |
| components/dashboard/CheckInModal.js | 535 | Large modal |
| components/admin/CourseListView.jsx | 527 | Large component |
| components/dashboard/coach.js | 521 | Large dashboard |

**32 source files exceed 500 lines.** The top 6 are extreme monoliths (2,000-4,150 lines).

---

## 9. API Module Inventory

The monolithic `api.js` (4 lines) now serves as a barrel re-export to `api/index.js`. The actual API logic is split across 19 feature modules in `frontend/src/api/`:

| Module | Lines | Domain |
|---|---:|---|
| api/client.js | 72 | Axios instance & interceptors |
| api/index.js | 21 | Barrel re-export |
| api/attendance.js | 13 | Attendance |
| api/auth.js | 51 | Authentication |
| api/balagruha.js | 73 | Balagruha management |
| api/machines.js | 43 | Machine management |
| api/medical.js | 154 | Medical check-ins |
| api/music.js | 49 | Music coach |
| api/notifications.js | 111 | Notifications |
| api/purchaseRequests.js | 154 | Purchase requests |
| api/purchases.js | 61 | Purchases |
| api/repairs.js | 51 | Repair management |
| api/schedule.js | 93 | Scheduling |
| api/shop.js | 249 | Shop operations |
| api/sports.js | 81 | Sports coach |
| api/tasks.js | 53 | Task management |
| api/training.js | 43 | Training |
| api/users.js | 80 | User management |
| api/wtf.js | 575 | Wall of Fame |

**Legacy api.js import paths still in use:** Several page files still import from `../api` (the barrel) rather than from specific modules under `api/`. This works because of the barrel but is inconsistent with the split architecture.

---

## 10. Hooks & Contexts

### Hooks (8 files)

| File | Lines | Notes |
|---|---:|---|
| hooks/usePermission.js | 43 | RBAC permission checks |
| hooks/useUserRole.js | 24 | Role detection |
| hooks/useAutoSave.js | 119 | Auto-save for forms |
| hooks/useDebounce.js | 24 | Debounce utility |
| hooks/useFileUpload.js | 272 | File upload logic |
| hooks/useMilestones.js | 63 | Coin milestones |
| hooks/use-mobile.tsx | 19 | Mobile detection |
| hooks/use-toast.ts | 191 | Toast notification hook |
| components/hooks/usePermission.js | -- | **Duplicate** of hooks/usePermission.js; imported by Layout.js, ProtectedRoute.js, and others |

### Contexts (4 files)

| File | Lines | Purpose |
|---|---:|---|
| contexts/AuthContext.js | 114 | Authentication state & login/logout |
| contexts/RBACContext.js | 164 | Role-based access control |
| contexts/CoinBalanceContext.js | 70 | Student coin balance |
| contexts/WtfBackgroundContext.js | 302 | WTF page background customization |

### Store (1 file)

| File | Lines | Purpose |
|---|---:|---|
| store/shopStore.js | 441 | Zustand store for cart & shop state |

---

## 11. Key Findings & Risks

1. **61 dead component files** (6,712 lines total) -- 16 are application components, 45 are unused shadcn/ui primitives.

2. **AppRoutes.js is dead** -- it contains an older routing config that was superseded by App.js. Should be deleted.

3. **Duplicate usePermission hook** -- exists at both `hooks/usePermission.js` and `components/hooks/usePermission.js`. Layout.js and ProtectedRoute.js import from the `components/hooks/` path; other files import from `hooks/`. This is a maintenance hazard.

4. **Duplicate UI components** -- `src/ui/badge.jsx` and `src/ui/button.jsx` duplicate `components/ui/badge.jsx` and `components/ui/button.jsx`.

5. **6 extreme monoliths (> 2,000 lines)** -- TaskManagement (4,150), WTFManagement (3,441), WallOfFame (2,926), MusicCoach (2,861), Sportscoach (2,513), medicalIncharge (2,182). These are strong candidates for decomposition.

6. **32 files exceed 500 lines** -- significant technical debt in component size.

7. **Unprotected routes** -- `/balagruha`, `/attendance`, `/course`, `/repair`, `/purchase` lack explicit `<ProtectedRoute>` wrappers. They rely on Layout's authentication check only, with no RBAC enforcement.

8. **Legacy api.js barrel** -- The old monolithic api.js was split into 19 modules. The 4-line barrel file remains and some pages still import through it rather than specific modules.

9. **No lazy loading** -- All route components are eagerly imported in App.js. No `React.lazy()` or dynamic `import()` is used. This impacts initial bundle size.

10. **No circular imports detected** in the static analysis.
