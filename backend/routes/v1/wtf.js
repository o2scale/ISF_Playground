const express = require("express");
const { authorize, authenticate } = require("../../middleware/auth");
const { WtfPermissions } = require("../../constants/users");
const {
  wtfRateLimiters,
  wtfContentValidation,
  wtfSubmissionValidation,
  wtfInteractionValidation,
  handleValidationErrors,
  checkContentSizeLimits,
  wtfSecurityHeaders,
  wtfFileUploadSecurity,
} = require("../../middleware/wtfSecurity");
const {
  // Pin Management Controllers
  createPin,
  getActivePins,
  getPinById,
  updatePin,
  deletePin,
  changePinStatus,

  // Interaction Controllers
  likePin,
  markPinAsSeen,
  getPinInteractions,

  // Submission Controllers
  submitVoiceNote,
  submitArticle,
  getSubmissionsForReview,
  reviewSubmission,

  // Analytics Controllers
  getWtfAnalytics,
  getInteractionAnalytics,
  getSubmissionAnalytics,

  // Dashboard Metrics Controllers
  getWtfDashboardMetrics,
  getActivePinsCount,
  getWtfTotalEngagement,
  getCoachSuggestionsCount,

  // Student Management Controllers
  getStudentSubmissions,
  getStudentInteractionHistory,

  // Admin Management Controllers
  getPinsByAuthor,
  getSubmissionStats,
} = require("../../controllers/wtfController");

const router = express.Router();

// ==================== PIN MANAGEMENT ROUTES ====================

// Create a new WTF pin (Admin only)
router.post(
  "/pins",
  authenticate,
  authorize(WtfPermissions.WTF_PIN_CREATE, "Create"),
  wtfSecurityHeaders,
  wtfRateLimiters.pinCreation,
  wtfContentValidation,
  checkContentSizeLimits("pin"),
  handleValidationErrors,
  createPin
);

// Get active pins for students (Public - requires authentication)
router.get(
  "/pins",
  authenticate,
  wtfSecurityHeaders,
  wtfRateLimiters.general,
  getActivePins
);

// Get pin by ID (Public - requires authentication)
router.get(
  "/pins/:pinId",
  authenticate,
  wtfSecurityHeaders,
  wtfRateLimiters.general,
  getPinById
);

// Update pin (Admin only)
router.put(
  "/pins/:pinId",
  authenticate,
  authorize(WtfPermissions.WTF_PIN_UPDATE, "Update"),
  wtfSecurityHeaders,
  wtfRateLimiters.admin,
  wtfContentValidation,
  checkContentSizeLimits("pin"),
  handleValidationErrors,
  updatePin
);

// Delete pin (Admin only)
router.delete(
  "/pins/:pinId",
  authenticate,
  authorize(WtfPermissions.WTF_PIN_DELETE, "Delete"),
  deletePin
);

// Change pin status (Admin only)
router.patch(
  "/pins/:pinId/status",
  authenticate,
  authorize(WtfPermissions.WTF_PIN_UPDATE, "Update"),
  changePinStatus
);

// ==================== INTERACTION ROUTES ====================

// Like/unlike pin (Students only)
router.post(
  "/pins/:pinId/like",
  authenticate,
  authorize(WtfPermissions.WTF_INTERACTION_CREATE, "Create"),
  wtfSecurityHeaders,
  wtfRateLimiters.pinInteractions,
  wtfInteractionValidation,
  handleValidationErrors,
  likePin
);

// Mark pin as seen (Students only)
router.post(
  "/pins/:pinId/seen",
  authenticate,
  authorize(WtfPermissions.WTF_INTERACTION_CREATE, "Create"),
  wtfSecurityHeaders,
  wtfRateLimiters.pinInteractions,
  wtfInteractionValidation,
  handleValidationErrors,
  markPinAsSeen
);

// Get pin interactions (Public - requires authentication)
router.get("/pins/:pinId/interactions", authenticate, getPinInteractions);

// ==================== SUBMISSION ROUTES ====================

// Submit voice note (Students only)
router.post(
  "/submissions/voice",
  authenticate,
  authorize(WtfPermissions.WTF_SUBMISSION_CREATE, "Create"),
  wtfSecurityHeaders,
  wtfRateLimiters.submissions,
  wtfSubmissionValidation,
  checkContentSizeLimits("submission"),
  wtfFileUploadSecurity,
  handleValidationErrors,
  submitVoiceNote
);

// Submit article (Students only)
router.post(
  "/submissions/article",
  authenticate,
  authorize(WtfPermissions.WTF_SUBMISSION_CREATE, "Create"),
  wtfSecurityHeaders,
  wtfRateLimiters.submissions,
  wtfSubmissionValidation,
  checkContentSizeLimits("submission"),
  handleValidationErrors,
  submitArticle
);

// Get submissions for review (Admin only)
router.get(
  "/submissions/review",
  authenticate,
  authorize(WtfPermissions.WTF_SUBMISSION_READ, "Read"),
  getSubmissionsForReview
);

// Review submission (Admin only)
router.put(
  "/submissions/:submissionId/review",
  authenticate,
  authorize(WtfPermissions.WTF_SUBMISSION_UPDATE, "Update"),
  reviewSubmission
);

// ==================== ANALYTICS ROUTES ====================

// Get WTF analytics (Admin only)
router.get(
  "/analytics",
  authenticate,
  authorize(WtfPermissions.WTF_ANALYTICS_READ, "Read"),
  getWtfAnalytics
);

// Get interaction analytics (Admin only)
router.get(
  "/analytics/interactions",
  authenticate,
  authorize(WtfPermissions.WTF_ANALYTICS_READ, "Read"),
  getInteractionAnalytics
);

// Get submission analytics (Admin only)
router.get(
  "/analytics/submissions",
  authenticate,
  authorize(WtfPermissions.WTF_ANALYTICS_READ, "Read"),
  getSubmissionAnalytics
);

// ==================== DASHBOARD METRICS ROUTES ====================

// Get WTF dashboard metrics (Admin only)
router.get(
  "/dashboard/metrics",
  authenticate,
  authorize(WtfPermissions.WTF_ANALYTICS_READ, "Read"),
  getWtfDashboardMetrics
);

// Get active pins count (Admin only)
router.get(
  "/pins/active/count",
  authenticate,
  authorize(WtfPermissions.WTF_ANALYTICS_READ, "Read"),
  getActivePinsCount
);

// Get total engagement (Admin only)
router.get(
  "/analytics/engagement",
  authenticate,
  authorize(WtfPermissions.WTF_ANALYTICS_READ, "Read"),
  getWtfTotalEngagement
);

// Get coach suggestions count (Admin only)
router.get(
  "/coach-suggestions",
  authenticate,
  authorize(WtfPermissions.WTF_ANALYTICS_READ, "Read"),
  getCoachSuggestionsCount
);

// ==================== STUDENT MANAGEMENT ROUTES ====================

// Get student submissions (Students only - their own submissions)
router.get(
  "/submissions",
  authenticate,
  authorize(WtfPermissions.WTF_SUBMISSION_READ, "Read"),
  getStudentSubmissions
);

// Get student interaction history (Students only - their own interactions)
router.get(
  "/interactions/history",
  authenticate,
  authorize(WtfPermissions.WTF_INTERACTION_READ, "Read"),
  getStudentInteractionHistory
);

// ==================== ADMIN MANAGEMENT ROUTES ====================

// Get pins by author (Admin only)
router.get(
  "/pins/author/:authorId",
  authenticate,
  authorize(WtfPermissions.WTF_PIN_READ, "Read"),
  getPinsByAuthor
);

// Get submission stats (Admin only)
router.get(
  "/submissions/stats",
  authenticate,
  authorize(WtfPermissions.WTF_ANALYTICS_READ, "Read"),
  getSubmissionStats
);

module.exports = router;
