const express = require('express');
const router = express.Router();
const manualAwardController = require('../../../controllers/lms/coach/manualAwardController');
const coachReportsController = require('../../../controllers/lms/coach/coachReportsController');

// Middleware to verify coach role (mocked for now or use existing middleware)
// const { protect, authorize } = require('../../../middleware/auth');
// router.use(protect);
// router.use(authorize('coach', 'admin'));

/**
 * Story 03: Manual Awards
 */
router.post('/awards', manualAwardController.awardCoins);
router.get('/awards/history', manualAwardController.getAwardHistory);

/**
 * Story 04: Reports
 */
router.get('/reports/overview', coachReportsController.getOverviewStats);
router.get('/reports/leaderboard', coachReportsController.getLeaderboard);

module.exports = router;
