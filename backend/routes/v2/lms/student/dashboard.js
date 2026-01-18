const express = require('express');
const router = express.Router();
const studentDashboardController = require('../../../../controllers/lms/student/studentDashboardController');
const { authenticate } = require('../../../../middleware/auth');

// ==================== STUDENT DASHBOARD ROUTES - Epic 01 Story 01 ====================

/**
 * @route GET /api/v2/lms/student/:studentId/dashboard
 * @desc Get student dashboard data (courses, progress, last activity, stats)
 * @access Private (Student only)
 */
router.get(
  '/:studentId/dashboard',
  authenticate,
  studentDashboardController.getDashboard
);

/**
 * @route GET /api/v2/lms/student/:studentId/coins
 * @desc Get student's current coin balance
 * @access Private (Student only)
 */
router.get(
  '/:studentId/coins',
  authenticate,
  studentDashboardController.getCoinBalance
);

/**
 * @route GET /api/v2/lms/student/:studentId/notifications/count
 * @desc Get unread notification count for student
 * @access Private (Student only)
 */
router.get(
  '/:studentId/notifications/count',
  authenticate,
  studentDashboardController.getNotificationCount
);

/**
 * @route GET /api/v2/lms/student/:studentId/homework/pending
 * @desc Get count of pending homework tasks
 * @access Private (Student only)
 */
router.get(
  '/:studentId/homework/pending',
  authenticate,
  studentDashboardController.getPendingHomeworkCount
);

/**
 * @route POST /api/v2/lms/student/:studentId/emotion
 * @desc Save single emotion tracking entry
 * @access Private (Student only)
 */
router.post(
  '/:studentId/emotion',
  authenticate,
  studentDashboardController.saveEmotion
);

/**
 * @route POST /api/v2/lms/student/:studentId/emotions/batch
 * @desc Batch save emotion tracking entries (for offline sync)
 * @access Private (Student only)
 */
router.post(
  '/:studentId/emotions/batch',
  authenticate,
  studentDashboardController.batchSaveEmotions
);

module.exports = router;
