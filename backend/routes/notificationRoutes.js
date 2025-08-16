const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { authenticate } = require("../middleware/auth");
const checkPermission = require("../middleware/checkPermission");

// ==================== USER NOTIFICATION ROUTES ====================
// All routes require authentication

/**
 * @route   GET /api/notifications
 * @desc    Get notifications for authenticated user
 * @access  Private
 */
router.get("/", authenticate, notificationController.getUserNotifications);

/**
 * @route   GET /api/notifications/unread-count
 * @desc    Get unread notification count for authenticated user
 * @access  Private
 */
router.get(
  "/unread-count",
  authenticate,
  notificationController.getUnreadCount
);

/**
 * @route   PUT /api/notifications/:notificationId/read
 * @desc    Mark a specific notification as read
 * @access  Private
 */
router.put(
  "/:notificationId/read",
  authenticate,
  notificationController.markAsRead
);

/**
 * @route   PUT /api/notifications/mark-all-read
 * @desc    Mark all notifications as read for authenticated user
 * @access  Private
 */
router.put(
  "/mark-all-read",
  authenticate,
  notificationController.markAllAsRead
);

/**
 * @route   PUT /api/notifications/update-last-viewed
 * @desc    Update user's last viewed time for smart notification filtering
 * @access  Private
 */
router.put(
  "/update-last-viewed",
  authenticate,
  notificationController.updateLastViewed
);

/**
 * @route   DELETE /api/notifications/:notificationId
 * @desc    Delete a specific notification
 * @access  Private
 */
router.delete(
  "/:notificationId",
  authenticate,
  notificationController.deleteNotification
);

// ==================== ADMIN NOTIFICATION ROUTES ====================
// Admin-only routes

/**
 * @route   POST /api/notifications/admin/system-announcement
 * @desc    Create a system-wide announcement (admin only)
 * @access  Private (Admin)
 */
router.post(
  "/admin/system-announcement",
  authenticate,
  checkPermission("notifications", "create"),
  notificationController.createSystemAnnouncement
);

/**
 * @route   POST /api/notifications/admin/shop-update
 * @desc    Create an ISF shop update notification (admin only)
 * @access  Private (Admin)
 */
router.post(
  "/admin/shop-update",
  authenticate,
  checkPermission("notifications", "create"),
  notificationController.createShopUpdateNotification
);

/**
 * @route   GET /api/notifications/admin/stats
 * @desc    Get notification statistics for admin dashboard (admin only)
 * @access  Private (Admin)
 */
router.get(
  "/admin/stats",
  authenticate,
  checkPermission("notifications", "read"),
  notificationController.getNotificationStats
);

/**
 * @route   POST /api/notifications/admin/cleanup
 * @desc    Cleanup expired notifications (admin only)
 * @access  Private (Admin)
 */
router.post(
  "/admin/cleanup",
  authenticate,
  checkPermission("notifications", "delete"),
  notificationController.cleanupExpiredNotifications
);

// ==================== COACH NOTIFICATION ROUTES ====================
// Coach-only routes

/**
 * @route   POST /api/notifications/coach/message
 * @desc    Send a message notification to a student (coach only)
 * @access  Private (Coach)
 */
router.post(
  "/coach/message",
  authenticate,
  checkPermission("notifications", "create"),
  notificationController.sendCoachMessage
);

module.exports = router;
