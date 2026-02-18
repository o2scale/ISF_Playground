const express = require('express');
const router = express.Router();
const manualAwardController = require('../../../controllers/lms/coach/manualAwardController');
const coachReportsController = require('../../../controllers/lms/coach/coachReportsController');

// Middleware to verify coach role (mocked for now or use existing middleware)
const { authenticate } = require('../../../middleware/auth');
// router.use(protect);
// router.use(authorize('coach', 'admin'));

/**
 * Story 03: Manual Awards
 */
router.post('/awards', authenticate, manualAwardController.awardCoins);
router.get('/awards/history', authenticate, manualAwardController.getAwardHistory);

/**
 * Story 04: Reports
 */
router.get('/reports/overview', authenticate, coachReportsController.getOverviewStats);
router.get('/reports/leaderboard', authenticate, coachReportsController.getLeaderboard);

module.exports = router;
