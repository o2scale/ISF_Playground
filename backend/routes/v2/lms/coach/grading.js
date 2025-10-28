// backend/routes/v2/lms/coach/grading.js
const express = require("express");
const router = express.Router();
const coachGradingController = require("../../../../controllers/lms/coach/coachGradingController");
const { authenticate } = require("../../../../middleware/authMiddleware");

/**
 * Grading Routes for Coaches
 * Base path: /api/v2/lms/coach/grading
 */

// Get all submissions for grading with filters
router.get(
  "/:coachId/submissions",
  authenticate,
  coachGradingController.getSubmissions
);

// Get single submission details
router.get(
  "/submissions/:submissionId",
  authenticate,
  coachGradingController.getSubmissionById
);

// Submit grade for a submission
router.post(
  "/submissions/:submissionId/grade",
  authenticate,
  coachGradingController.submitGrade
);

// Bulk grade multiple submissions
router.post(
  "/submissions/bulk-grade",
  authenticate,
  coachGradingController.bulkGrade
);

// Save grading draft (auto-save)
router.put(
  "/submissions/:submissionId/draft",
  authenticate,
  coachGradingController.saveDraft
);

// Flag submission for admin review
router.put(
  "/submissions/:submissionId/flag",
  authenticate,
  coachGradingController.flagSubmission
);

// Skip submission for later review
router.put(
  "/submissions/:submissionId/skip",
  authenticate,
  coachGradingController.skipSubmission
);

module.exports = router;
