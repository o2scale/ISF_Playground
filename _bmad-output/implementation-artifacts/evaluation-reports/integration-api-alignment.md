# API Route Alignment & Stale References Report

**Story:** 9.1 — API Route Alignment & Stale References
**Date:** 2026-03-17
**Type:** Discovery (no code changes)

---

## 1. Complete Backend Route Table

### Auth Routes (mounted at `/api/auth`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/auth/register` | authLimiter | authController.register |
| POST | `/api/auth/login` | authLimiter | authController.login |
| POST | `/api/auth/student/login` | authLimiter | authController.studentLogin |
| GET | `/api/auth/profile` | authenticate | authController.getProfile |
| PUT | `/api/auth/profile` | authenticate | authController.updateProfile |
| PUT | `/api/auth/change-password` | authenticate | authController.changePassword |
| POST | `/api/auth/student/facial/login` | upload.fields | facialLogin (userController) |

### User Routes (mounted at `/api/users`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/users` | authenticate, authorize("User Management","Read") | getAllUsers |
| GET | `/api/users/me/balagruhas` | authenticate | inline handler |
| GET | `/api/users/assignable-for-schedule` | authenticate, authorize("Daily Schedule","Read") | getAssignableUsersForSchedule |
| GET | `/api/users/:_id` | authenticate, authorize("User Management","Read") | getUserById |
| POST | `/api/users` | authenticate, authorize("User Management","Create") | createUser |
| PUT | `/api/users/:id` | authenticate, authorize("User Management","Update") | updateUser |
| DELETE | `/api/users/:id` | authenticate, authorize("User Management","Delete") | deleteUser |

### User V1 Routes (mounted at `/api/v1/users`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/v1/users` | authenticate, authorize("User Management","Create"), upload.any() | createUserV1 |
| PUT | `/api/v1/users/medical-records` | authenticate, authorize("User Management","Create") | createStudentMedicalRecords |
| GET | `/api/v1/users/management/overview` | authenticate, authorize("User Management","Read") | getUserManagementOverviewDetails |
| GET | `/api/v1/users/students/:balagruhaId` | authenticate, authorize, validateBalagruhaAccess | getUserManagementOverviewDetails |
| POST | `/api/v1/users/students/attendance` | authenticate, authorize("User Management","Create") | createStudentAttendance |
| POST | `/api/v1/users/students/attendance/manual` | authenticate, authorize("User Management","Create") | createManualAttendance |
| GET | `/api/v1/users/students/attendance/:balagruhaId` | authenticate, authorize, validateBalagruhaAccess | getStudentListByBalagruhaIdWithAttendance |
| GET | `/api/v1/users/role/:role` | authenticate, authorize("User Management","Read") | getUsersByRoleAndBalagruhaId |
| GET | `/api/v1/users/info/:userId` | authenticate, authorize("User Management","Read") | getUserInfo |
| PUT | `/api/v1/users/password/reset` | authenticate, authorize("User Management","Update") | updateUserPassword |
| PUT | `/api/v1/users/assign/balagruha` | authenticate, authorize("User Management","Update") | assignBalagruhaToUser |
| GET | `/api/v1/users/:userId/profile` | authenticate | getStudentProfile |
| PUT | `/api/v1/users/:userId` | authenticate, authorize("User Management","Update"), upload.any() | updateUserDetails |
| DELETE | `/api/v1/users/:userId` | authenticate, authorize("User Management","Delete") | deleteUserById |
| GET | `/api/v1/users/assigned/users` | authenticate, authorize("User Management","Read") | getUserListByAssignedBalagruhaByRole |

### Role Routes (mounted at `/api/roles`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/roles` | authenticate, authorize("Role Management","Create") | createRole |
| PUT | `/api/roles/:roleId` | authenticate, authorize("Role Management","Update") | updateRolePermissions |
| GET | `/api/roles` | authenticate, authorize("Role Management","Read") | getAllRoles |
| GET | `/api/roles/getAllRolePermissions` | (none) | getAllRolePermissions |
| DELETE | `/api/roles/:roleId` | authenticate, authorize("Role Management","Delete") | deleteRole |

### Task Routes (mounted at `/api/tasks`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/tasks` | authenticate, authorize("Task Management","Create"), upload.array | createTaskV1 |
| PUT | `/api/tasks/:id` | authenticate, authorize("Task Management","Update"), upload.array | updateTask |
| GET | `/api/tasks` | authenticate, authorize("Task Management","Read") | getAllTasksV1 |
| GET | `/api/tasks/user/:userId` | authenticate, authorize("Task Management","Read") | getAllTasksForUser |
| GET | `/api/tasks/overview` | authenticate, authorize("Task Management","Read") | getTaskOverview |
| GET | `/api/tasks/assignable-users` | authenticate, authorize("Task Management","Read") | getAssignableTaskUsers |
| POST | `/api/tasks/all/list` | authenticate, authorize("Task Management","Read") | getTaskListByBalagruhaIdAndFilter |
| GET | `/api/tasks/overview/details/:balagruhaId` | authenticate, authorize, validateBalagruhaAccess | getTaskOverviewDetailsByBalagruhaId |
| PUT | `/api/tasks/status/:id` | authenticate, authorize("Task Management","Update") | updateTaskStatus |
| POST | `/api/tasks/comment/:taskId` | authenticate, authorize("Task Management","Update"), upload.fields | addCommentToTask |
| PUT | `/api/tasks/attachments/:taskId` | authenticate, authorize("Task Management","Update"), upload.fields | addOrUpdateTaskAttachment |
| DELETE | `/api/tasks/attachments/:taskId/:attachmentId` | authenticate, authorize("Task Management","Update") | deleteTaskAttachment |
| DELETE | `/api/tasks/comment/:taskId/:commentId` | authenticate, authorize("Task Management","Update") | deleteTaskComment |
| GET | `/api/tasks/:taskId` | authenticate, authorize("Task Management","Read") | getTaskDetailsById |

### Schedule Routes (mounted at `/api/schedules`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/schedules` | authenticate, authorize("Schedule Management","Create") | createSchedule |
| GET | `/api/schedules/:scheduleId` | authenticate, authorize("Schedule Management","Read") | getScheduleById |
| GET | `/api/schedules` | authenticate, authorize("Schedule Management","Read") | getSchedules |
| PUT | `/api/schedules/:scheduleId` | authenticate, authorize("Schedule Management","Update") | updateSchedule |
| DELETE | `/api/schedules/:scheduleId` | authenticate, authorize("Schedule Management","Delete") | deleteSchedule |
| GET | `/api/schedules/user/:userId` | authenticate, authorize("Schedule Management","Read") | getSchedulesByUser |
| POST | `/api/schedules/admin` | authenticate, authorize("Schedule Management","Read") | getSchedulesForAdmin |
| POST | `/api/schedules/coach` | authenticate, authorize("Schedule Management","Read") | getSchedulesForCoach |
| PUT | `/api/schedules/status/:scheduleId` | authenticate, authorize("Schedule Management","Update") | updateScheduleStatus |

### Medical Check-In Routes (mounted at `/api/medical-check-ins`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/medical-check-ins` | authenticate, authorize("Medical Management","Create"), upload.fields | createMedicalCheckIn |
| GET | `/api/medical-check-ins` | authenticate, authorize("Medical Management","Read") | getAllMedicalCheckIns |
| GET | `/api/medical-check-ins/student/:studentId` | authenticate, authorize("Medical Management","Read") | getMedicalCheckInsByStudentId |
| GET | `/api/medical-check-ins/:checkInId` | authenticate, authorize("Medical Management","Read") | getMedicalCheckInById |
| PUT | `/api/medical-check-ins/:checkInId` | authenticate, authorize("Medical Management","Update"), upload.none() | updateMedicalCheckIn |
| DELETE | `/api/medical-check-ins/:checkInId` | authenticate, authorize("Medical Management","Delete") | deleteMedicalCheckIn |
| PUT | `/api/medical-check-ins/attachments/:checkInId` | authenticate, authorize("Medical Management","Update"), upload.fields | addOrUpdateAttachments |
| DELETE | `/api/medical-check-ins/attachments/:checkInId/:attachmentId` | authenticate, authorize("Medical Management","Delete") | deleteAttachment |
| POST | `/api/medical-check-ins/students/list` | authenticate, authorize("Medical Management","Read") | getMedicalCheckInsByBalagruhaIds |

### Medical Records Routes (mounted at `/api/medical-records`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| DELETE | `/api/medical-records/user/:userId/history/:medicalHistoryId` | authenticate, authorize("Medical Management","Delete") | deleteMedicalHistoryItem |
| PUT | `/api/medical-records/user/:userId/history/:medicalHistoryId` | authenticate, authorize("Medical Management","Update") | updateMedicalHistoryItem |

### Doctor Routes (mounted at `/api/doctors`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/doctors` | authenticate, authorize("Medical Check-in","Read") | getAllDoctors |
| GET | `/api/doctors/search` | authenticate, authorize("Medical Check-in","Read") | searchDoctors |
| POST | `/api/doctors` | authenticate, authorize("Medical Check-in","Create") | createDoctor |

### Hospital Routes (mounted at `/api/hospitals`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/hospitals` | authenticate, authorize("Medical Check-in","Read") | getAllHospitals |
| GET | `/api/hospitals/search` | authenticate, authorize("Medical Check-in","Read") | searchHospitals |
| POST | `/api/hospitals` | authenticate, authorize("Medical Check-in","Create") | createHospital |

### Notification Routes (mounted at `/api/notifications`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/notifications` | authenticate | getUserNotifications |
| GET | `/api/notifications/unread-count` | authenticate | getUnreadCount |
| PUT | `/api/notifications/:notificationId/read` | authenticate | markAsRead |
| PUT | `/api/notifications/mark-all-read` | authenticate | markAllAsRead |
| PUT | `/api/notifications/update-last-viewed` | authenticate | updateLastViewed |
| DELETE | `/api/notifications/:notificationId` | authenticate | deleteNotification |
| POST | `/api/notifications/admin/system-announcement` | authenticate, checkPermission("notifications","Create") | createSystemAnnouncement |
| POST | `/api/notifications/admin/shop-update` | authenticate, checkPermission("notifications","Create") | createShopUpdateNotification |
| POST | `/api/notifications/admin/send-personal` | authenticate, checkPermission("notifications","Create") | sendAdminPersonalNotification |
| GET | `/api/notifications/debug/user-permissions` | authenticate | inline handler |
| GET | `/api/notifications/admin/stats` | authenticate, checkPermission("notifications","Read") | getNotificationStats |
| POST | `/api/notifications/admin/cleanup` | authenticate, checkPermission("notifications","Delete") | cleanupExpiredNotifications |
| POST | `/api/notifications/coach/message` | authenticate, checkPermission("notifications","Create") | sendCoachMessage |

### Offline Request Queue (mounted at `/api/offline-requests`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/offline-requests` | (none) | createOfflineRequest |
| GET | `/api/offline-requests/:requestId` | (none) | getOfflineRequestById |
| POST | `/api/offline-requests/sync` | (none) | syncOfflineRequestToServer |
| POST | `/api/offline-requests/sync/db/remote` | (none) | syncRemoteDBToLocalDB |

### Student Mood Tracker Routes (mounted at `/api/v1/mood-tracker`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/v1/mood-tracker` | authenticate, authorize("User Management","Update") | createOrUpdateMoodEntry |
| GET | `/api/v1/mood-tracker/user/:userId` | authenticate, authorize("User Management","Read") | getMoodEntriesByUserId |
| GET | `/api/v1/mood-tracker/dateRange` | authenticate, authorize("User Management","Read") | getMoodEntriesByDateRange |
| POST | `/api/v1/mood-tracker/latest` | authenticate, authorize("User Management","Read") | getLatestMoodEntry |
| GET | `/api/v1/mood-tracker/:id` | authenticate, authorize("User Management","Read") | getMoodEntryById |
| PUT | `/api/v1/mood-tracker/:id` | authenticate, authorize("User Management","Update") | updateMoodEntry |
| DELETE | `/api/v1/mood-tracker/:id` | authenticate, authorize("User Management","Delete") | deleteMoodEntry |

### Balagruha V1 Routes (mounted at `/api/v1/balagruha`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/v1/balagruha` | authenticate, authorize("User Management","Create") | createBalagruha |
| GET | `/api/v1/balagruha` | authenticate, authorize("User Management","Read") | getAllBalagruha |
| GET | `/api/v1/balagruha/with-stock` | authenticate, authorize("User Management","Read") | getBalagruhasWithStock |
| GET | `/api/v1/balagruha/:id` | authenticate, authorize("User Management","Read") | getBalagruhaById |
| PUT | `/api/v1/balagruha/:id` | authenticate, authorize("User Management","Update") | updateBalagruha |
| DELETE | `/api/v1/balagruha/:id` | authenticate, authorize("User Management","Delete") | deleteBalagruha |
| GET | `/api/v1/balagruha/user/:userId` | authenticate, authorize("User Management","Read") | getBalagruhaListByUserId |
| GET | `/api/v1/balagruha/user/assigned/:userId` | authenticate, authorize("User Management","Read") | getBalagruhaListByAssignedID |

### Machine V1 Routes (mounted at `/api/v1/machines`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/v1/machines` | authenticate, authorize("Machine Management","Read") | getAllMachines |
| POST | `/api/v1/machines` | authenticate, authorize("Machine Management","Create") | registerMachine |
| PUT | `/api/v1/machines/:id/status` | authenticate, authorize("Machine Management","Update") | toggleMachineStatus |
| PUT | `/api/v1/machines/:id/assign` | authenticate, authorize("Machine Management","Update") | assignMachine |
| GET | `/api/v1/machines/:id/logs` | authenticate, authorize("Machine Management","Read") | getMachineLogs |
| GET | `/api/v1/machines/:id/history` | authenticate, authorize("Machine Management","Read") | getMachineHistory |
| DELETE | `/api/v1/machines/:id` | authenticate, authorize("Machine Management","Delete") | deleteMachine |
| GET | `/api/v1/machines/unassigned` | authenticate, authorize("Machine Management","Read") | getUnassignedMachines |

### Sports V1 Routes (mounted at `/api/v1/sports`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/v1/sports/task` | authenticate, authorize, upload.array | createSportsTask |
| PUT | `/api/v1/sports/task/:taskId` | authenticate, authorize | updateSportsTask |
| POST | `/api/v1/sports/task/attachments/:taskId` | authenticate, authorize, upload.fields | addOrUpdateSportsTaskAttachment |
| POST | `/api/v1/sports/tasks/comment/:taskId` | authenticate, authorize, upload.fields | addCommentToSportsTask |
| POST | `/api/v1/sports/tasks/list` | authenticate, authorize | getSportsTasks |
| POST | `/api/v1/sports/training-session` | authenticate, authorize | createSportsTrainingSession |
| GET | `/api/v1/sports/overview` | authenticate, authorize | getSportsInsights |
| GET | `/api/v1/sports/training-sessions` | authenticate, authorize | getAllTrainingSessions |
| POST | `/api/v1/sports/students/all` | authenticate, authorize | getStudentsWithSportsTask |
| PUT | `/api/v1/sports/training-session/:trainingSessionId` | authenticate, authorize | editTrainingSession |
| DELETE | `/api/v1/sports/training-session/:trainingSessionId` | authenticate, authorize | deleteTrainingSession |

### Music V1 Routes (mounted at `/api/v1/music`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/v1/music/task` | authenticate, authorize, upload.array | createMusicTask |
| PUT | `/api/v1/music/task/:taskId` | authenticate, authorize | updateMusicTask |
| POST | `/api/v1/music/task/attachments/:taskId` | authenticate, authorize, upload.fields | addOrUpdateSportsTaskAttachment |
| POST | `/api/v1/music/tasks/comment/:taskId` | authenticate, authorize, upload.fields | addCommentToSportsTask |
| POST | `/api/v1/music/tasks/list` | authenticate, authorize | getSportsTasks |
| POST | `/api/v1/music/training-session` | authenticate, authorize | createTrainingSession |
| GET | `/api/v1/music/overview/:balagruhaId` | authenticate, authorize, validateBalagruhaAccess | getSportsInsights |
| GET | `/api/v1/music/training-sessions/:balagruhaId` | authenticate, authorize, validateBalagruhaAccess | getAllTrainingSessions |
| POST | `/api/v1/music/students/all` | authenticate, authorize | getStudentsWithSportsTask |
| PUT | `/api/v1/music/training-session/:trainingSessionId` | authenticate, authorize | editTrainingSession |
| DELETE | `/api/v1/music/training-session/:trainingSessionId` | authenticate, authorize | deleteTrainingSession |

### Purchase & Repair V1 Routes (mounted at `/api/v1/purchase-repair`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/v1/purchase-repair/repair-requests` | authenticate, authorize, upload.array | createRepairRequest |
| GET | `/api/v1/purchase-repair/repair-requests` | authenticate, authorize | getAllRepairRequests |
| GET | `/api/v1/purchase-repair/repair-requests/:id` | authenticate, authorize | getRepairRequestById |
| PUT | `/api/v1/purchase-repair/repair-requests/:id` | authenticate, authorize, upload.array | updateRepairRequest |
| DELETE | `/api/v1/purchase-repair/repair-requests/:id` | authenticate, authorize | deleteRepairRequest |
| PUT | `/api/v1/purchase-repair/repair-requests/status/:id` | authenticate, authorize | toggleRepairRequestStatus |
| POST | `/api/v1/purchase-repair/purchase-orders` | authenticate, authorize, upload.array | createPurchaseOrder |
| GET | `/api/v1/purchase-repair/purchase-orders` | authenticate, authorize | getAllPurchaseOrders |
| GET | `/api/v1/purchase-repair/purchase-orders/:id` | authenticate, authorize | getPurchaseOrderById |
| PUT | `/api/v1/purchase-repair/purchase-orders/:id` | authenticate, authorize, upload.array | updatePurchaseOrder |
| DELETE | `/api/v1/purchase-repair/purchase-orders/:id` | authenticate, authorize | deletePurchaseOrder |
| PUT | `/api/v1/purchase-repair/purchase-orders/status/:id` | authenticate, authorize | updatePurchaseOrderStatus |
| GET | `/api/v1/purchase-repair/overview` | authenticate, authorize | getPurchaseManagerOverview |

### Training Session V1 Routes (mounted at `/api/v1/training-session`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/v1/training-session` | authenticate, authorize | createSportsTrainingSession |
| GET | `/api/v1/training-session` | authenticate, authorize | getAllTrainingSessions |
| PUT | `/api/v1/training-session/:trainingSessionId` | authenticate, authorize | editTrainingSession |
| DELETE | `/api/v1/training-session/:trainingSessionId` | authenticate, authorize | deleteTrainingSession |

### Coin V1 Routes (mounted at `/api/v1/coin`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/v1/coin/balance` | authenticate | getUserBalance |
| GET | `/api/v1/coin/stats` | authenticate | getUserCoinStats |
| GET | `/api/v1/coin/transactions/export` | authenticate | exportTransactionHistory |
| GET | `/api/v1/coin/transactions/wtf` | authenticate | getWtfTransactionHistory |
| GET | `/api/v1/coin/transactions` | authenticate | getUserTransactionHistory |
| GET | `/api/v1/coin/bonus/first-pin-eligibility` | authenticate | checkFirstPinBonusEligibility |
| GET | `/api/v1/coin/bonus/weekly-active-eligibility` | authenticate | checkWeeklyActiveBonusEligibility |
| GET | `/api/v1/coin/all-transactions` | authenticate, authorize("Coin Analytics","Read") | getAllTransactions |
| GET | `/api/v1/coin/top-earners` | authenticate, authorize("Coin Analytics","Read") | getTopEarners |

### Course Routes (mounted at `/api/v1/courses`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/v1/courses` | authenticate, authorize("Course Management","Create"), upload.any() | createCourse |

### V2 Shop Routes (mounted at `/api/v2/shop`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/v2/shop/products` | (none) | shopController.getProducts |
| GET | `/api/v2/shop/products/featured` | (none) | shopController.getFeaturedProducts |
| GET | `/api/v2/shop/products/:id` | (none) | shopController.getProductById |
| GET | `/api/v2/shop/categories` | (none) | shopController.getCategories |
| POST | `/api/v2/shop/products/:productId/images` | authenticate, authorize | shopProductImageController.uploadProductImages |
| DELETE | `/api/v2/shop/products/:productId/images/:imageId` | authenticate, authorize | shopProductImageController.deleteProductImage |
| PUT | `/api/v2/shop/products/:productId/images/:imageId/primary` | authenticate, authorize | shopProductImageController.setPrimaryImage |
| GET | `/api/v2/shop/admin/inventory/stock-levels` | authenticate, authorize("Purchase Management","Read") | shopController.getStockLevels |
| GET | `/api/v2/shop/vendors` | authenticate, authorize("Purchase Management","Read") | shopController.getVendorsWithProductCount |
| GET | `/api/v2/shop/admin/analytics/most-consumed` | authenticate, authorize("Purchase Management","Read") | shopController.getMostConsumed |

### V2 Cart Routes (mounted at `/api/v2/shop/cart`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/v2/shop/cart` | authenticate | getCart |
| GET | `/api/v2/shop/cart/validate` | authenticate | validateStock |
| POST | `/api/v2/shop/cart` | authenticate, validate | addToCart |
| PUT | `/api/v2/shop/cart/:shopItemId` | authenticate, validate | updateQuantity |
| DELETE | `/api/v2/shop/cart/:shopItemId` | authenticate, validate | removeFromCart |
| DELETE | `/api/v2/shop/cart` | authenticate | clearCart |

### V2 Order Routes (mounted at `/api/v2/shop/orders`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/v2/shop/orders` | authenticate | createOrder |
| GET | `/api/v2/shop/orders/all` | authenticate | getAllOrders |
| GET | `/api/v2/shop/orders` | authenticate, validate | getUserOrders |
| GET | `/api/v2/shop/orders/:orderNumber` | authenticate, validate | getOrder |
| GET | `/api/v2/shop/orders/id/:orderId` | authenticate, validate | getOrderById |
| POST | `/api/v2/shop/orders/:orderNumber/cancel` | authenticate, validate | cancelOrder |

### V2 Admin Product Routes (mounted at `/api/v2/shop/admin`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/v2/shop/admin/products` | authenticate, authorize, validate | getAllProducts |
| GET | `/api/v2/shop/admin/products/:productId` | authenticate, authorize, validate | getProduct |
| POST | `/api/v2/shop/admin/products` | authenticate, authorize, validate | createProduct |
| PUT | `/api/v2/shop/admin/products/:productId` | authenticate, authorize, validate | updateProduct |
| DELETE | `/api/v2/shop/admin/products/:productId` | authenticate, authorize, validate | deleteProduct |
| POST | `/api/v2/shop/admin/products/:productId/restore` | authenticate, authorize, validate | restoreProduct |
| POST | `/api/v2/shop/admin/products/pending` | authenticate, checkPurchaseRequestAccess | createPendingProduct |
| GET | `/api/v2/shop/admin/products/pending` | authenticate, checkPurchaseRequestAccess | getPendingProducts |

### V2 Inventory Routes (mounted at `/api/v2/shop/admin/inventory`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/v2/shop/admin/inventory/bulk-update` | authenticate, authorize, validate | bulkUpdateStock |
| GET | `/api/v2/shop/admin/inventory/stock-alerts` | authenticate, authorize | getStockAlerts |
| GET | `/api/v2/shop/admin/inventory/quick-stats` | authenticate, authorize | getQuickStats |
| GET | `/api/v2/shop/admin/inventory/low-stock` | authenticate, authorize | getLowStockProducts |
| GET | `/api/v2/shop/admin/inventory/stock-levels` | authenticate | getStockLevels |
| GET | `/api/v2/shop/admin/inventory/most-consumed` | authenticate | getMostConsumed |
| GET | `/api/v2/shop/admin/inventory/out-of-stock` | authenticate, authorize | getOutOfStockProducts |
| GET | `/api/v2/shop/admin/inventory/export` | authenticate, authorize | exportInventory |
| GET | `/api/v2/shop/admin/inventory/master-report` | authenticate, authorize | getMasterInventoryReport |
| GET | `/api/v2/shop/admin/inventory` | authenticate, authorize | getInventoryDashboard |
| PATCH | `/api/v2/shop/admin/inventory/:productId/adjust` | authenticate, authorize, validate | adjustStock |
| GET | `/api/v2/shop/admin/inventory/:productId/audit` | authenticate, authorize, validate | getAuditTrail |

### V2 Analytics Routes (mounted at `/api/v2/shop/admin/analytics`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/v2/shop/admin/analytics` | authenticate, authorize | getShopAnalytics |
| GET | `/api/v2/shop/admin/analytics/participation` | authenticate, authorize | getStudentParticipationDetails |

### V2 Reports Routes (mounted at `/api/v2/shop/admin/reports`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/v2/shop/admin/reports/transactions` | authenticate, authorize | getTransactionLog |
| GET | `/api/v2/shop/admin/reports/leaderboard` | authenticate, authorize | getStudentLeaderboard |
| GET | `/api/v2/shop/admin/reports/zero-purchases` | authenticate, authorize | getZeroPurchaseStudents |
| POST | `/api/v2/shop/admin/reports/send-zero-purchase-reminder` | authenticate, authorize | sendZeroPurchaseReminder |
| GET | `/api/v2/shop/admin/reports/coin-economy` | authenticate, authorize | getCoinEconomyHealth |
| GET | `/api/v2/shop/admin/reports/participation-details` | authenticate, authorize | getParticipationDetails |
| GET | `/api/v2/shop/admin/reports/export` | authenticate, authorize | exportReport |

### V2 Coach Delivery Routes (mounted at `/api/v2/shop/coach/deliveries`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/v2/shop/coach/deliveries/stats` | authenticate, coachOrAdmin | getCoachDeliveryStats |
| GET | `/api/v2/shop/coach/deliveries` | authenticate, coachOrAdmin | getCoachDeliveries |
| PATCH | `/api/v2/shop/coach/deliveries/:orderId/deliver` | authenticate, coachOrAdmin | markOrderDelivered |

### V2 Purchase Request Routes (mounted at `/api/v2/shop/admin/purchase-requests`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/v2/shop/admin/purchase-requests/products/low-stock` | authenticate, checkPurchaseRequestAccess | getLowStockProducts |
| POST | `/api/v2/shop/admin/purchase-requests` | authenticate, checkPurchaseRequestAccess, upload.array, validate | createPurchaseRequest |
| GET | `/api/v2/shop/admin/purchase-requests/my` | authenticate, checkPurchaseRequestAccess | getMyPurchaseRequests |
| PUT | `/api/v2/shop/admin/purchase-requests/:id` | authenticate, checkPurchaseRequestAccess, upload.array, validate | updatePurchaseRequest |
| DELETE | `/api/v2/shop/admin/purchase-requests/:id` | authenticate, checkPurchaseRequestAccess, validate | deletePurchaseRequest |
| PUT | `/api/v2/shop/admin/purchase-requests/:id/cancel` | authenticate, checkPurchaseRequestAccess, validate | cancelPurchaseRequest |
| GET | `/api/v2/shop/admin/purchase-requests/pending-count` | authenticate, checkPurchaseRequestAccess | getPendingCount |
| GET | `/api/v2/shop/admin/purchase-requests/stats` | authenticate, checkPermission("Purchase Management","Manage") | getPurchaseRequestStats |
| GET | `/api/v2/shop/admin/purchase-requests` | authenticate, checkPurchaseRequestAccess | getAllPurchaseRequests |
| GET | `/api/v2/shop/admin/purchase-requests/:id` | authenticate, checkPurchaseRequestAccess, validate | getPurchaseRequestById |
| POST | `/api/v2/shop/admin/purchase-requests/:id/approve` | authenticate, checkPermission, validate | approvePurchaseRequest |
| POST | `/api/v2/shop/admin/purchase-requests/:id/reject` | authenticate, checkPermission, validate | rejectPurchaseRequest |
| POST | `/api/v2/shop/admin/purchase-requests/:id/complete` | authenticate, checkPermission, validate | completePurchaseRequest |
| PATCH | `/api/v2/shop/admin/purchase-requests/:id/status` | authenticate, validate | updateStatus |
| POST | `/api/v2/shop/admin/purchase-requests/:id/assign-stock` | authenticate, checkPermission, validate | assignFromStock |

### V2 Vendor Routes (mounted at `/api/v2/vendors`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/v2/vendors` | authenticate, isAdmin | createVendor |
| GET | `/api/v2/vendors` | authenticate, isAdmin | getAllVendors |
| GET | `/api/v2/vendors/:id` | authenticate, isAdmin | getVendorById |
| PUT | `/api/v2/vendors/:id` | authenticate, isAdmin | updateVendor |

### V2 Upload Routes (mounted at `/api/v2/upload`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/v2/upload/image` | authenticate, authorize, upload.single | uploadGenericImage |

### V2 Facial Recognition Routes (mounted at `/api/v2/fr`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/v2/fr/register` | authenticate, checkPermission, upload.single | registerFace |
| POST | `/api/v2/fr/recognize` | upload.single | recognizeFace |
| GET | `/api/v2/fr/status/:studentId` | authenticate, checkPermission | getRegistrationStatus |
| DELETE | `/api/v2/fr/register/:studentId` | authenticate, checkPermission | deleteFaceRegistration |
| GET | `/api/v2/fr/stats` | authenticate, checkPermission | getFRStats |

### V2 LMS Admin Courses (mounted at `/api/v2/lms/admin/courses`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/v2/lms/admin/courses/assignments` | authenticate, authorize | getAllAssignments |
| POST | `/api/v2/lms/admin/courses/assignments` | authenticate, authorize | createAdminAssignment |
| GET | `/api/v2/lms/admin/courses` | authenticate, authorize | getAllCourses |
| POST | `/api/v2/lms/admin/courses` | authenticate, authorize | createCourse |
| GET | `/api/v2/lms/admin/courses/:id` | authenticate, authorize | getCourseById |
| PUT | `/api/v2/lms/admin/courses/:id` | authenticate, authorize | updateCourse |
| DELETE | `/api/v2/lms/admin/courses/:id` | authenticate, authorize | deleteCourse |
| GET | `/api/v2/lms/admin/courses/:courseId/modules` | authenticate, authorize | getModulesByCourseId |
| POST | `/api/v2/lms/admin/courses/:courseId/modules` | authenticate, authorize | addModule |
| PUT | `/api/v2/lms/admin/courses/:courseId/modules/:moduleId` | authenticate, authorize | updateModule |
| DELETE | `/api/v2/lms/admin/courses/:courseId/modules/:moduleId` | authenticate, authorize | deleteModule |
| POST | `/api/v2/lms/admin/courses/:courseId/modules/:moduleId/chapters` | authenticate, authorize | addChapter |
| PUT | `/api/v2/lms/admin/courses/:courseId/modules/:moduleId/chapters/:chapterId` | authenticate, authorize | updateChapter |
| DELETE | `/api/v2/lms/admin/courses/:courseId/modules/:moduleId/chapters/:chapterId` | authenticate, authorize | deleteChapter |
| POST | `/api/v2/lms/admin/courses/:courseId/modules/:moduleId/chapters/:chapterId/content` | authenticate, authorize | addContentItem |
| PUT | `/api/v2/lms/admin/courses/:courseId/modules/:moduleId/chapters/:chapterId/content/:contentId` | authenticate, authorize | updateContentItem |
| DELETE | `/api/v2/lms/admin/courses/:courseId/modules/:moduleId/chapters/:chapterId/content/:contentId` | authenticate, authorize | deleteContentItem |
| PUT | `/api/v2/lms/admin/courses/:courseId/reorder` | authenticate, authorize | reorderItems |
| GET | `/api/v2/lms/admin/courses/:courseId/validate` | authenticate, authorize | validateCourseDetailed |
| PUT | `/api/v2/lms/admin/courses/:courseId/publish` | authenticate, authorize | publishCourse |
| PUT | `/api/v2/lms/admin/courses/:courseId/archive` | authenticate, authorize | archiveCourse |
| PUT | `/api/v2/lms/admin/courses/:courseId/restore` | authenticate, authorize | restoreCourse |
| PUT | `/api/v2/lms/admin/courses/:courseId/unpublish` | authenticate, authorize | unpublishCourse |
| POST | `/api/v2/lms/admin/courses/:courseId/duplicate` | authenticate, authorize | duplicateCourse |

### V2 LMS Admin Content (mounted at `/api/v2/lms/admin/content`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/v2/lms/admin/content/upload` | authenticate, authorize, lmsUpload | uploadFiles |
| GET | `/api/v2/lms/admin/content/library` | authenticate, authorize | getAllFiles |
| GET | `/api/v2/lms/admin/content/library/:id` | authenticate, authorize | getFileById |
| PUT | `/api/v2/lms/admin/content/library/:id` | authenticate, authorize | updateFileMetadata |
| DELETE | `/api/v2/lms/admin/content/library/:id` | authenticate, authorize | deleteFile |
| GET | `/api/v2/lms/admin/content/stats` | authenticate, authorize | getContentStats |

### V2 LMS Admin Modules (mounted at `/api/v2/lms/admin/modules`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/v2/lms/admin/modules/:moduleId/chapters` | authenticate, authorize | getChaptersByModuleId |

### V2 LMS Admin Quiz (mounted at `/api/v2/lms/admin`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/v2/lms/admin/quizzes/stats` | authenticate, authorize | getQuizStats |
| GET | `/api/v2/lms/admin/quizzes` | authenticate, authorize | getAllQuizzes |
| POST | `/api/v2/lms/admin/quizzes` | authenticate, authorize | createQuiz |
| GET | `/api/v2/lms/admin/quizzes/:quizId` | authenticate, authorize | getQuizById |
| PUT | `/api/v2/lms/admin/quizzes/:quizId` | authenticate, authorize | updateQuiz |
| POST | `/api/v2/lms/admin/quizzes/:quizId/duplicate` | authenticate, authorize | duplicateQuiz |
| DELETE | `/api/v2/lms/admin/quizzes/:quizId` | authenticate, authorize | deleteQuiz |
| PUT | `/api/v2/lms/admin/quizzes/:quizId/publish` | authenticate, authorize | publishQuiz |
| PUT | `/api/v2/lms/admin/quizzes/:quizId/unpublish` | authenticate, authorize | unpublishQuiz |
| PUT | `/api/v2/lms/admin/quizzes/:quizId/archive` | authenticate, authorize | archiveQuiz |
| PUT | `/api/v2/lms/admin/quizzes/:quizId/restore` | authenticate, authorize | restoreQuiz |
| PUT | `/api/v2/lms/admin/quizzes/:quizId/questions/reorder` | authenticate, authorize | reorderQuestions |
| GET | `/api/v2/lms/admin/question-bank/stats` | authenticate, authorize | getQuestionBankStats |
| GET | `/api/v2/lms/admin/question-bank/tags` | authenticate, authorize | getAllTags |
| GET | `/api/v2/lms/admin/question-bank/most-used` | authenticate, authorize | getMostUsedQuestions |
| GET | `/api/v2/lms/admin/question-bank` | authenticate, authorize | getAllQuestions |
| POST | `/api/v2/lms/admin/question-bank` | authenticate, authorize | createQuestion |
| GET | `/api/v2/lms/admin/question-bank/:questionId` | authenticate, authorize | getQuestionById |
| PUT | `/api/v2/lms/admin/question-bank/:questionId` | authenticate, authorize | updateQuestion |
| DELETE | `/api/v2/lms/admin/question-bank/:questionId` | authenticate, authorize | deleteQuestion |

### V2 LMS Admin Translations (mounted at `/api/v2/lms/admin/translations`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/v2/lms/admin/translations/courses/:courseId/progress` | authenticate, authorize | getTranslationProgress |
| GET | `/api/v2/lms/admin/translations/courses/:courseId/items` | authenticate, authorize | getTranslatableItems |
| PUT | `/api/v2/lms/admin/translations/courses/:courseId/items/:itemId` | authenticate, authorize | saveTranslation |
| PUT | `/api/v2/lms/admin/translations/courses/:courseId/publish` | authenticate, authorize | publishTranslations |

### V2 LMS Student Dashboard (mounted at `/api/v2/lms/student`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/v2/lms/student/:studentId/dashboard` | authenticate | getDashboard |
| GET | `/api/v2/lms/student/:studentId/coins` | authenticate | getCoinBalance |
| GET | `/api/v2/lms/student/:studentId/notifications/count` | authenticate | getNotificationCount |
| GET | `/api/v2/lms/student/:studentId/homework/pending` | authenticate | getPendingHomeworkCount |
| POST | `/api/v2/lms/student/:studentId/emotion` | authenticate | saveEmotion |
| POST | `/api/v2/lms/student/:studentId/emotions/batch` | authenticate | batchSaveEmotions |

### V2 LMS Student Course Routes (mounted at `/api/v2/lms/student/:studentId/courses/...`)

- Computer Apps: `GET /`, `GET /:courseId/hierarchy`, `GET /:courseId/content/:contentId`, `GET /quiz/:quizId`, `POST /quiz/submit`, `POST /mark-complete`
- Art: `GET /`, `POST /submissions`, `POST /gallery`
- Spoken English: `GET /`, `GET /:taskId`, `GET /submissions/history`, `POST /submissions`
- Life Skills: `GET /`, `GET /voice/:taskId`, `POST /voice/submit`, `POST /mark-complete`, `GET /quiz/:quizId`, `POST /quiz/submit`, `GET /submissions`

### V2 LMS Coach Assignment Routes (mounted at `/api/v2/lms/coach`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/v2/lms/coach/courses/published` | authenticate, authorize | getPublishedCourses |
| GET | `/api/v2/lms/coach/:coachId/students` | authenticate, authorize | getCoachStudents |
| POST | `/api/v2/lms/coach/assignments` | authenticate, authorize | createAssignment |
| GET | `/api/v2/lms/coach/:coachId/assignments` | authenticate, authorize | getCoachAssignments |
| GET | `/api/v2/lms/coach/assignments/:assignmentId` | authenticate, authorize | getAssignmentById |
| PUT | `/api/v2/lms/coach/assignments/:assignmentId` | authenticate, authorize | updateAssignment |
| DELETE | `/api/v2/lms/coach/assignments/:assignmentId` | authenticate, authorize | deleteAssignment |
| GET | `/api/v2/lms/coach/:coachId/stats` | authenticate, authorize | getCoachStats |
| PUT | `/api/v2/lms/coach/assignments/:assignmentId/progress` | authenticate, authorize | updateAssignmentProgress |

### V2 LMS Coach Grading Routes (mounted at `/api/v2/lms/coach/grading`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| GET | `/api/v2/lms/coach/grading/:coachId/submissions` | authenticate, authorize | getSubmissions |
| GET | `/api/v2/lms/coach/grading/submissions/:submissionId` | authenticate, authorize | getSubmissionById |
| POST | `/api/v2/lms/coach/grading/submissions/:submissionId/grade` | authenticate, authorize | submitGrade |
| POST | `/api/v2/lms/coach/grading/submissions/bulk-grade` | authenticate, authorize | bulkGrade |
| PUT | `/api/v2/lms/coach/grading/submissions/:submissionId/draft` | authenticate, authorize | saveDraft |
| PUT | `/api/v2/lms/coach/grading/submissions/:submissionId/flag` | authenticate, authorize | flagSubmission |
| PUT | `/api/v2/lms/coach/grading/submissions/:submissionId/skip` | authenticate, authorize | skipSubmission |

### V2 LMS Coach General (mounted at `/api/v2/lms/coach`)

| Method | Full Path | Middleware | Controller |
|--------|-----------|------------|------------|
| POST | `/api/v2/lms/coach/awards` | authenticate, authorize | awardCoins |
| GET | `/api/v2/lms/coach/awards/history` | authenticate, authorize | getAwardHistory |
| GET | `/api/v2/lms/coach/reports/overview` | authenticate, authorize | getOverviewStats |
| GET | `/api/v2/lms/coach/reports/leaderboard` | authenticate, authorize | getLeaderboard |

### WTF V1 Routes (mounted at `/api/v1/wtf`) & WTF Settings

_Omitted from individual listing due to volume (30+ endpoints). See WTF route files for complete listing. All WTF routes are under `/api/v1/wtf/` and include pins CRUD, submissions, analytics, coach-suggestions, dashboard metrics, and settings management._

### Scheduler V1 Routes (mounted at `/api/v1/scheduler`)
### WebSocket V1 Routes (mounted at `/api/v1/websocket`)

_These are backend-only infrastructure routes, not directly consumed by frontend API modules._

---

## 2. Complete Frontend API Call Table

### Module: `auth.js`

| Function | Method | Path |
|----------|--------|------|
| fetchRolesandPermissions | GET | `/api/roles` |
| faceIdlogin | POST | `/api/auth/student/facial/login` |
| updateRolePermissions | PUT | `/api/roles/:id` |
| pinLogin | POST | `/api/auth/login` |
| studentPinLogin | POST | `/api/auth/student/login` |
| debugUserPermissions | GET | `/api/notifications/debug/user-permissions` |

### Module: `users.js`

| Function | Method | Path |
|----------|--------|------|
| fetchUsers | GET | `/api/users` |
| getUserById | GET | `/api/users/:id` |
| coachBasedUsers | GET | `/api/v1/users/assigned/users` |
| addUsers | POST | `/api/v1/users` |
| updateUsers | PUT | `/api/v1/users/:id` |
| deleteUsers | DELETE | `/api/users/:id` |
| getAssignableUsersForSchedule | GET | `/api/users/assignable-for-schedule` |
| getBalagruhaListbyUserID | GET | `/api/v1/balagruha/user/:id` |
| getBalagruhaListByAssignedID | GET | `/api/v1/balagruha/user/assigned/:id` |
| getAnyUserBasedonRoleandBalagruha | GET | `/api/v1/users/role/:role/balagruha/:balagruhaId` |
| getAllCoaches | GET | `/api/v1/users/role/coach` |

### Module: `tasks.js`

| Function | Method | Path |
|----------|--------|------|
| createTask | POST | `/api/tasks` |
| addComment | POST | `/api/tasks/comment/:id` |
| updateTaskAttachments | PUT | `/api/tasks/attachments/:id` |
| deleteAttachemnets | DELETE | `/api/tasks/attachments/:taskId/:attachmentId` |
| getTasks | POST | `/api/tasks/all/list` |
| getAssignableTaskUsers | GET | `/api/tasks/assignable-users` |
| updateTask | PUT | `/api/tasks/status/:id` |
| getTaskBytaskId | GET | `/api/tasks/:id` |
| deleteCommentinTask | DELETE | `/api/tasks/comment/:id/:commentId` |

### Module: `balagruha.js`

| Function | Method | Path |
|----------|--------|------|
| getBalagruha | GET | `/api/v1/balagruha/` |
| getBalagruhaWithStock | GET | `/api/v1/balagruha/with-stock` |
| getUserBalagruhas | GET | `/api/users/me/balagruhas` |
| addMachines | POST | `/api/v1/machines` |
| toggleMachineStatus | PUT | `/api/v1/machines/:id/status` |
| assignMachineToAnotherBalagruha | PUT | `/api/v1/machines/:id/assign` |
| getMachines | GET | `/api/v1/machines` |
| addBalagruha | POST | `/api/v1/balagruha/` |
| updateBalagruha | PUT | `/api/v1/balagruha/:id` |
| getBalagruhaById | GET | `/api/v1/balagruha/user/:id` |
| deleteBalagruha | DELETE | `/api/v1/balagruha/:id` |
| deleteMachineById | DELETE | `/api/v1/machines/:id` |
| getUnAssigned | GET | `/api/v1/machines/unassigned` |

### Module: `attendance.js`

| Function | Method | Path |
|----------|--------|------|
| getStudentListforAttendance | GET | `/api/v1/users/students/attendance/:id` |
| postmarkAttendance | POST | `/api/v1/users/students/attendance` |

### Module: `sports.js`

| Function | Method | Path |
|----------|--------|------|
| getSportsOverview | GET | `/api/v1/sports/overview/:balagruhaId` |
| createSportsTask | POST | `/api/v1/sports/task` |
| updateSportsTask | PUT | `/api/v1/sports/task/:taskId` |
| addOrUpdateSportsTaskAttachments | POST | `/api/v1/sports/task/attachments/:taskId` |
| addOrUpdateSportsTaskComments | POST | `/api/v1/sports/tasks/comment/:taskId` |
| getSportsTaskListByBalagruha | POST | `/api/v1/sports/tasks/list` |
| getSportsTaskListByStudents | POST | `/api/v1/sports/students/all` |

### Module: `music.js`

| Function | Method | Path |
|----------|--------|------|
| createMusicTask | POST | `/api/v1/music/task` |
| updateMusicTask | PUT | `/api/v1/music/task/:taskId` |
| addOrUpdateMusicTaskAttachments | POST | `/api/v1/music/task/attachments/:taskId` |
| addOrUpdateMusicTaskComments | POST | `/api/v1/music/tasks/comment/:taskId` |

### Module: `training.js`

| Function | Method | Path |
|----------|--------|------|
| createTraining | POST | `api/v1/training-session` (missing leading `/`) |
| getTraining | GET | `/api/v1/sports/training-sessions` |
| updateTraining | PUT | `/api/v1/training-session/:id` |
| deleteTrainign | DELETE | `/api/v1/sports/training-session/:id` |

### Module: `repairs.js`

| Function | Method | Path |
|----------|--------|------|
| createRepair | POST | `/api/v1/purchase-repair/repair-requests` |
| getAllRepairs | GET | `/api/v1/purchase-repair/repair-requests` |
| deleteRepair | DELETE | `/api/v1/purchase-repair/repair-requests/:id` |
| updateRepairRequest | PUT | `/api/v1/purchase-repair/repair-requests/:id` |

### Module: `purchases.js`

| Function | Method | Path |
|----------|--------|------|
| getPurchaseOverView | GET | `/api/v1/purchase-repair/overview` |
| createPurchase | POST | `/api/v1/purchase-repair/purchase-orders` |
| getAllPurchases | GET | `/api/v1/purchase-repair/purchase-orders` |
| deletePurchase | DELETE | `/api/v1/purchase-repair/purchase-orders/:id` |
| updatePurchaseOrder | PUT | `/api/v1/purchase-repair/purchase-orders/:id` |

### Module: `schedule.js`

| Function | Method | Path |
|----------|--------|------|
| createSchedule | POST | `/api/schedules` |
| getSchedules | POST | `/api/schedules/admin` |
| updateSchedule | PUT | `/api/schedules/:scheduleId` |
| deleteSchedule | DELETE | `/api/schedules/:scheduleId` |
| getSchedulesByUser | GET | `/api/schedules/user/:userId` |
| getSchedulesForAdmin | POST | `/api/schedules/admin` |
| getSchedulesForCoach | POST | `/api/schedules/coach` |
| getSchedulesCoach | POST | `/api/schedules/coach` |
| updateScheduleStatus | PUT | `/api/schedules/:scheduleId/status` |

### Module: `medical.js`

| Function | Method | Path |
|----------|--------|------|
| getMedicalConditionBasedOnBalagruha | POST | `/api/medical-check-ins/students/list` |
| getMedicalCheckInsByStudentId | GET | `/api/medical-check-ins/student/:studentId` |
| getMoodBasedOnBalagruha | POST | `/api/v1/mood-tracker/latest` |
| createMedicalCheckin | POST | `/api/medical-check-ins` |
| updateMedicalCheckin | PUT | `/api/medical-check-ins/:checkInId` |
| deleteMedicalCheckin | DELETE | `/api/medical-check-ins/:checkInId` |
| addMedicalCheckinAttachments | PUT | `/api/medical-check-ins/attachments/:checkInId` |
| deleteMedicalCheckinAttachment | DELETE | `/api/medical-check-ins/attachments/:checkInId/:attachmentId` |
| getAllDoctors | GET | `/api/doctors` |
| createDoctor | POST | `/api/doctors` |
| searchDoctors | GET | `/api/doctors/search` |
| getAllHospitals | GET | `/api/hospitals` |
| createHospital | POST | `/api/hospitals` |
| searchHospitals | GET | `/api/hospitals/search` |
| createMood | POST | `/api/v1/mood-tracker` |

### Module: `notifications.js`

| Function | Method | Path |
|----------|--------|------|
| getUserNotifications | GET | `/api/notifications` |
| getUnreadNotificationCount | GET | `/api/notifications/unread-count` |
| markNotificationAsRead | PUT | `/api/notifications/:notificationId/read` |
| markAllNotificationsAsRead | PUT | `/api/notifications/mark-all-read` |
| updateNotificationLastViewed | PUT | `/api/notifications/update-last-viewed` |
| deleteNotification | DELETE | `/api/notifications/:notificationId` |
| createSystemAnnouncement | POST | `/api/notifications/admin/system-announcement` |
| createShopUpdateNotification | POST | `/api/notifications/admin/shop-update` |
| sendAdminPersonalNotification | POST | `/api/notifications/admin/send-personal` |
| getNotificationStats | GET | `/api/notifications/admin/stats` |
| sendCoachMessage | POST | `/api/notifications/coach/message` |

### Module: `shop.js`

| Function | Method | Path |
|----------|--------|------|
| getStockLevels | GET | `/api/v2/shop/admin/inventory/stock-levels` |
| getVendorsWithProductCount | GET | `/api/v2/shop/vendors` |
| getMostConsumed | GET | `/api/v2/shop/admin/analytics/most-consumed` |
| cancelOrder | POST | `/api/v2/shop/orders/:orderNumber/cancel` |
| getAllOrdersAdmin | GET | `/api/v2/shop/orders/all` |
| getShopAnalytics | GET | `/api/v2/shop/admin/analytics` |
| getStudentParticipationDetails | GET | `/api/v2/shop/admin/analytics/participation` |
| getTransactionLog | GET | `/api/v2/shop/admin/reports/transactions` |
| getStudentLeaderboard | GET | `/api/v2/shop/admin/reports/leaderboard` |
| getZeroPurchaseStudents | GET | `/api/v2/shop/admin/reports/zero-purchases` |
| getCoinEconomyHealth | GET | `/api/v2/shop/admin/reports/coin-economy` |
| exportReport | GET | `/api/v2/shop/admin/reports/export` |
| getCoachDeliveryStats | GET | `/api/v2/shop/coach/deliveries/stats` |
| getCoachDeliveries | GET | `/api/v2/shop/coach/deliveries` |
| markOrderDelivered | PATCH | `/api/v2/shop/coach/deliveries/:orderId/deliver` |
| getAllShopItems | GET | `/api/v2/shop/products` |
| getShopItemsByCategory | GET | `/api/v2/shop/products` |
| createPendingProduct | POST | `/api/v2/shop/admin/products/pending` |

### Module: `purchaseRequests.js`

| Function | Method | Path |
|----------|--------|------|
| getLowStockProducts | GET | `/api/v2/shop/products` |
| createPurchaseRequest | POST | `/api/v2/shop/admin/purchase-requests` |
| updatePurchaseRequest | PUT | `/api/v2/shop/admin/purchase-requests/:id` |
| deletePurchaseRequest | DELETE | `/api/v2/shop/admin/purchase-requests/:id` |
| getMyPurchaseRequests | GET | `/api/v2/shop/admin/purchase-requests/my` |
| getAllPurchaseRequests | GET | `/api/v2/shop/admin/purchase-requests` |
| getPendingPurchaseRequestCount | GET | `/api/v2/shop/admin/purchase-requests/pending-count` |
| getPurchaseRequestById | GET | `/api/v2/shop/admin/purchase-requests/:id` |
| cancelPurchaseRequest | PUT | `/api/v2/shop/admin/purchase-requests/:id/cancel` |
| approvePurchaseRequest | POST | `/api/v2/shop/admin/purchase-requests/:id/approve` |
| rejectPurchaseRequest | POST | `/api/v2/shop/admin/purchase-requests/:id/reject` |
| completePurchaseRequest | POST | `/api/v2/shop/admin/purchase-requests/:id/complete` |
| updatePurchaseRequestStatus | PATCH | `/api/v2/shop/admin/purchase-requests/:id/status` |
| getPurchaseRequestStats | GET | `/api/v2/shop/admin/purchase-requests/stats` |

### Module: `machines.js`

| Function | Method | Path |
|----------|--------|------|
| createMachine | POST | `/api/v1/machines` |
| updateMachine | PUT | `/api/v1/machines/:id/assign` |
| deactivateMachine | PUT | `/api/v1/machines/:id/status` |
| getMachineLogs | GET | `/api/v1/machines/:id/logs` |

### Module: `wtf.js` (extensive - 50+ functions)

All WTF API calls use `/api/v1/wtf/...` or `/api/v1/coin/...` or `/api/v1/websocket/...` paths. Key calls listed in section 3 where mismatches exist.

### Inline API Calls (in components/pages, not in API modules)

| File | Method | Path |
|------|--------|------|
| store/shopStore.js | GET/POST/PUT/DELETE | `/api/v2/shop/cart`, `/api/v2/shop/orders`, etc. |
| components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx | GET | `/api/v2/vendors` |
| components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx | POST | `/api/v2/vendors` |
| components/purchaseManagement/views/StockReconciliationView.jsx | GET | `/api/v2/shop/admin/inventory` |
| components/admin/AddContentItemModal.jsx | GET | `/api/v2/lms/admin/quizzes?status=published` |
| pages/StudentProfile.jsx | GET | `/api/v1/users/:userId/profile` |
| components/admin/BulkOperationModal.jsx | PUT/DELETE | `/api/v2/lms/admin/courses/:id/publish,archive,delete` |
| pages/OutOfStockReport.jsx | GET | `/api/v2/shop/admin/inventory/out-of-stock` |
| components/shop/AuditTrailModal.jsx | GET | `/api/v2/shop/admin/inventory/:productId/audit` |
| pages/MasterInventoryReport.jsx | GET | `/api/v2/shop/admin/inventory/master-report` |
| components/admin/PublishTranslationsModal.jsx | PUT | `/api/v2/lms/admin/translations/courses/:courseId/publish` |
| components/shop/ShopAdminControls.jsx | GET | `/api/v2/shop/admin/inventory/stock-alerts`, `/quick-stats` |
| components/shop/StockAdjustmentModal.jsx | PATCH | `/api/v2/shop/admin/inventory/:productId/adjust` |
| pages/PMLowStock.jsx | GET | `/api/v2/shop/products` |
| components/shop/ZeroPurchasesReport.jsx | POST | `/api/v2/shop/admin/reports/send-zero-purchase-reminder` |
| components/admin/ModuleCard.jsx | DELETE/PUT | `/api/v2/lms/admin/courses/:courseId/modules/:moduleId`, reorder |
| components/student/coins/TransactionHistoryModal.jsx | GET | `/api/v1/coin/transactions` |
| components/shop/ProductFormModal.jsx | GET/POST | `/api/v2/vendors` |
| pages/InventoryManagement.jsx | GET | `/api/v2/shop/admin/inventory` |
| components/shop/BulkStockUploadModal.jsx | POST | `/api/v2/shop/admin/inventory/bulk-update` |
| pages/LowStockReport.jsx | GET | `/api/v2/shop/admin/inventory/low-stock` |
| components/admin/PublishValidationModal.jsx | GET/PUT | `/api/v2/lms/admin/courses/:id/validate`, `/publish` |
| components/shop/ShopHome.jsx | GET | `/api/v2/shop/products` |
| components/shop/PaymentDetails.jsx | GET | `/api/v1/coin/balance` |
| components/admin/CourseListView.jsx | DELETE/POST | `/api/v2/lms/admin/courses/:id`, `/:id/duplicate` |
| pages/OrderHistory.jsx | GET | `/api/v2/shop/orders` |
| components/student/Toolbar.jsx | GET/POST | `/api/v2/lms/student/:studentId/homework/pending`, `/emotion`, `/emotions/batch` |
| components/shop/ImageUpload.jsx | POST | `/api/v2/upload/image` |
| components/admin/QuestionBankModal.jsx | GET | `/api/v2/lms/admin/question-bank` |
| pages/ProductManagement.jsx | GET/PUT/POST/DELETE | `/api/v2/shop/admin/products` |
| components/admin/RestoreCourseModal.jsx | PUT | `/api/v2/lms/admin/courses/:id/restore` |
| pages/VendorManagement.jsx | GET/PUT/POST | `/api/v2/vendors` |
| pages/OrderDetail.jsx | GET/POST | `/api/v2/shop/orders/:orderNumber`, `cancel` |
| pages/OrderReceipt.jsx | GET | `/api/v2/shop/orders/:orderNumber` |
| pages/student/StudentDashboardPage.jsx | GET | `/api/v2/lms/student/:studentId/dashboard` |
| pages/MachineManagement.jsx | GET | `/api/v1/machines` |
| pages/student/LifeSkillsCoursePage.jsx | GET/POST | `/api/v2/lms/student/:studentId/courses/life-skills` |
| components/admin/UnpublishConfirmationModal.jsx | PUT | `/api/v2/lms/admin/courses/:id/unpublish` |
| components/student/TitleBar.jsx | GET | `/api/v2/lms/student/:studentId/coins`, `/notifications/count` |
| components/admin/EditMetadataModal.jsx | PUT | `/api/v2/lms/admin/content/library/:id` |
| pages/student/ArtCoursePage.jsx | GET | `/api/v2/lms/student/:studentId/courses/art` |
| components/admin/ChapterCard.jsx | PUT | `/api/v2/lms/admin/courses/:courseId/reorder` |
| pages/student/ComputerAppsPage.jsx | GET/POST | `/api/v2/lms/student/:studentId/courses/computer-apps/...` |
| components/admin/ArchiveConfirmationModal.jsx | PUT | `/api/v2/lms/admin/courses/:id/archive` |
| pages/admin/* | Various | `/api/v2/lms/admin/...` (all match backend) |
| hooks/useFileUpload.js | POST | `/api/v2/lms/admin/content/upload` |

---

## 3. Mismatched Routes

### CRITICAL: Frontend Calls Backend Routes That Do NOT Exist

| Severity | Frontend Function | Frontend Path | Issue |
|----------|-------------------|---------------|-------|
| **CRITICAL** | `updateScheduleStatus` (schedule.js) | `PUT /api/schedules/:scheduleId/status` | Backend route is `PUT /api/schedules/status/:scheduleId` -- path segments are INVERTED. Frontend call will 404 or hit the wrong handler. |
| **CRITICAL** | `getSportsOverview` (sports.js) | `GET /api/v1/sports/overview/:balagruhaId` | Backend route is `GET /api/v1/sports/overview` (no path param). Frontend appends balagruhaId to path but backend expects query param. Will 404. |
| **CRITICAL** | `getAnyUserBasedonRoleandBalagruha` (users.js) | `GET /api/v1/users/role/:role/balagruha/:balagruhaId` | Backend route is `GET /api/v1/users/role/:role` (balagruhaId as query param, not path segment). Extra path segments cause 404. |
| **HIGH** | `getWtfTransactionHistory` (wtf.js) | `GET /api/v1/coins/wtf/transactions` | Backend coin routes are mounted at `/api/v1/coin` (singular). `/api/v1/coins/...` does NOT exist. Will 404. |
| **MEDIUM** | `createTraining` (training.js) | `POST api/v1/training-session` | Missing leading `/`. With axios baseURL this may work if baseURL ends with `/`, but is fragile and inconsistent with all other calls. |

### Backend Routes With No Frontend Caller

These backend endpoints have no corresponding frontend API call (some may be intentionally backend-only):

| Backend Route | Notes |
|---------------|-------|
| `POST /api/auth/register` | Registration via API -- may be admin/seed-only |
| `GET /api/auth/profile` | Profile fetch -- may be unused if handled differently |
| `PUT /api/auth/profile` | Profile update -- no frontend caller found |
| `PUT /api/auth/change-password` | Password change -- no frontend caller found |
| `GET /api/roles/getAllRolePermissions` | No auth required, no frontend caller |
| `DELETE /api/roles/:roleId` | Role deletion -- no frontend caller |
| `GET /api/tasks` | getAllTasksV1 -- frontend uses `POST /api/tasks/all/list` instead |
| `GET /api/tasks/user/:userId` | getAllTasksForUser -- no frontend caller |
| `GET /api/tasks/overview` | getTaskOverview -- no frontend caller |
| `GET /api/tasks/overview/details/:balagruhaId` | No frontend caller |
| `GET /api/schedules/:scheduleId` | getScheduleById -- no frontend caller |
| `GET /api/schedules` | getSchedules -- frontend uses POST /admin instead |
| `GET /api/medical-check-ins` | getAllMedicalCheckIns -- no frontend caller |
| `GET /api/medical-check-ins/:checkInId` | getMedicalCheckInById -- no frontend caller |
| `DELETE /api/medical-records/user/:userId/history/:medicalHistoryId` | No frontend caller |
| `PUT /api/medical-records/user/:userId/history/:medicalHistoryId` | No frontend caller |
| `POST /api/notifications/admin/cleanup` | Admin cleanup -- no frontend caller |
| `GET /api/notifications/debug/user-permissions` | Called from auth.js `debugUserPermissions` but likely debug-only |
| `POST /api/offline-requests` | Offline sync infrastructure |
| `GET /api/offline-requests/:requestId` | Offline sync infrastructure |
| `POST /api/offline-requests/sync` | Offline sync infrastructure |
| `POST /api/offline-requests/sync/db/remote` | Offline sync infrastructure |
| `GET /api/v1/coin/stats` | No frontend caller |
| `GET /api/v1/coin/transactions/export` | No frontend caller |
| `GET /api/v1/coin/transactions/wtf` | No frontend caller |
| `GET /api/v1/coin/bonus/first-pin-eligibility` | No frontend caller |
| `GET /api/v1/coin/bonus/weekly-active-eligibility` | No frontend caller |
| `GET /api/v1/coin/top-earners` | No frontend caller |
| `GET /api/v1/machines/:id/history` | No frontend caller |
| `GET /api/v1/users/info/:userId` | No frontend caller |
| `PUT /api/v1/users/password/reset` | No frontend caller |
| `PUT /api/v1/users/assign/balagruha` | No frontend caller |
| `GET /api/v1/users/students/:balagruhaId` | No frontend caller (uses management/overview) |
| `POST /api/v1/users/students/attendance/manual` | Manual attendance -- no frontend caller |
| `GET /api/v2/shop/products/featured` | No frontend caller |
| `GET /api/v2/shop/categories` | No frontend caller |
| `POST /api/v2/shop/products/:productId/images` | No frontend caller |
| `DELETE /api/v2/shop/products/:productId/images/:imageId` | No frontend caller |
| `PUT /api/v2/shop/products/:productId/images/:imageId/primary` | No frontend caller |
| `GET /api/v2/shop/orders/id/:orderId` | No frontend caller |
| `POST /api/v2/shop/admin/products/:productId/restore` | No frontend caller |
| `GET /api/v2/shop/admin/products/pending` | No frontend caller |
| `GET /api/v2/shop/admin/inventory/most-consumed` | No frontend caller (different from shop route) |
| `GET /api/v2/shop/admin/purchase-requests/products/low-stock` | No frontend caller |
| `POST /api/v2/shop/admin/purchase-requests/:id/assign-stock` | No frontend caller |
| `GET /api/v2/shop/admin/reports/participation-details` | No frontend caller |
| `GET /api/v2/fr/stats` | No frontend caller |
| `POST /api/v2/fr/register` | No frontend caller in API modules |
| `POST /api/v2/fr/recognize` | No frontend caller in API modules |
| `GET /api/v2/fr/status/:studentId` | No frontend caller in API modules |
| `DELETE /api/v2/fr/register/:studentId` | No frontend caller in API modules |
| `GET /api/v2/lms/admin/courses/assignments` | No frontend caller |
| `POST /api/v2/lms/admin/courses/assignments` | No frontend caller |
| Various LMS student course routes | Called inline from components, not via api modules |

### Duplicate Frontend Functions

| Issue | Details |
|-------|---------|
| `getSchedules` and `getSchedulesForAdmin` in schedule.js | Both call `POST /api/schedules/admin` -- redundant |
| `getSchedulesForCoach` and `getSchedulesCoach` in schedule.js | Both call `POST /api/schedules/coach` -- redundant |
| `getWtfSubmissionStats` and `getSubmissionStats` in wtf.js | Both call `GET /api/v1/wtf/admin/submissions/stats` -- redundant |

---

## 4. Stale/Hardcoded URL References

| Issue | Location | Details |
|-------|----------|--------|
| **Stale path: `/api/v1/coins/` (plural)** | `frontend/src/api/wtf.js:441` | `GET /api/v1/coins/wtf/transactions` -- should be `/api/v1/coin/...` (singular). No backend route exists at `/api/v1/coins/`. |
| **Missing leading `/`** | `frontend/src/api/training.js:5` | `api.post('api/v1/training-session', ...)` -- missing leading `/`. May work depending on baseURL config but is inconsistent and fragile. |
| **No ActivityLog/MachineAssignment references** | Frontend-wide | CLEAN: No references to removed models `ActivityLog` or `MachineAssignment` found in frontend code. |
| **No Student model references** | Frontend-wide | CLEAN: No stale references to Student-specific endpoints or Student model found. |
| **apiInstance.js deleted** | `frontend/src/utils/apiInstance.js` | File shows as deleted in git status. CLEAN: No imports of `apiInstance` found in remaining code. |

---

## 5. v1 vs v2 Inconsistencies

| Area | Current State | Issue |
|------|---------------|-------|
| **Users** | Mix of `/api/users` (no version) and `/api/v1/users` | User CRUD uses unversioned `/api/users`, while user management ops use `/api/v1/users`. Inconsistent but functional -- both mount different route files. |
| **Tasks** | Unversioned `/api/tasks` | No v1/v2 prefix. Not an issue per se, but inconsistent with the v1/v2 pattern. |
| **Schedules** | Unversioned `/api/schedules` | Same as tasks -- no version prefix. |
| **Medical** | Unversioned `/api/medical-check-ins`, `/api/doctors`, `/api/hospitals` | No version prefix. |
| **Notifications** | Unversioned `/api/notifications` | No version prefix. |
| **Roles** | Unversioned `/api/roles` | No version prefix. |
| **Mood Tracker** | `/api/v1/mood-tracker` | Uses v1 prefix but referenced from medical.js module. |
| **Sports/Music/WTF/Coin** | All under `/api/v1/` | Consistent within their domain. |
| **Shop ecosystem** | All under `/api/v2/shop/` | Consistent and well-organized. |
| **LMS** | All under `/api/v2/lms/` | Consistent and well-organized. |
| **FR** | `/api/v2/fr/` | Consistent. |
| **Vendors/Upload** | `/api/v2/vendors`, `/api/v2/upload` | Consistent with v2 convention. |

**Summary:** The codebase has a two-tier versioning pattern:
- Original features (users, tasks, schedules, medical, notifications, roles) have no version prefix or use v1
- Newer features (shop, LMS, FR, vendors) consistently use v2
- This is not a bug but an organic growth pattern. Migration to v2 would be a breaking change and is not recommended without clear benefit.

---

## 6. Summary of Findings

### Critical Issues (5)

1. **`updateScheduleStatus` path inversion** -- Frontend sends `PUT /api/schedules/:id/status` but backend expects `PUT /api/schedules/status/:id`. This call will fail or hit the wrong route handler.

2. **`getSportsOverview` path mismatch** -- Frontend sends `GET /api/v1/sports/overview/:balagruhaId` but backend has `GET /api/v1/sports/overview` (no path param; expects query). Will 404.

3. **`getAnyUserBasedonRoleandBalagruha` extra path segments** -- Frontend sends `GET /api/v1/users/role/:role/balagruha/:balagruhaId` but backend has `GET /api/v1/users/role/:role` (balagruhaId via query param). Will 404.

4. **`getWtfTransactionHistory` wrong base path** -- Uses `/api/v1/coins/wtf/transactions` (plural `coins`) but backend mounts at `/api/v1/coin` (singular). Will 404.

5. **`createTraining` missing leading slash** -- `api/v1/training-session` instead of `/api/v1/training-session`. Fragile depending on baseURL configuration.

### Moderate Issues

- **~40 backend routes with no frontend caller** -- Many are intentional (admin-only, infrastructure, future features), but some may indicate incomplete feature implementation.
- **3 duplicate frontend function pairs** in schedule.js and wtf.js.
- **Significant inline API calls** in components that bypass the centralized API modules (shopStore.js, various LMS admin components), making the API surface harder to audit and maintain.

### Clean Areas

- No stale references to removed models (ActivityLog, MachineAssignment)
- No stale Student model references
- No hardcoded localhost/IP URLs
- apiInstance.js properly removed with no remaining imports
- All v2 shop, LMS, and FR routes are consistently structured and well-aligned
- All notification routes fully aligned
- All medical routes fully aligned
- All purchase request routes fully aligned
