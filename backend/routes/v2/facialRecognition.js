/**
 * Facial Recognition Routes (v2)
 *
 * API endpoints for face registration, recognition, and management.
 *
 * @module routes/v2/facialRecognition
 */

const express = require('express');
const router = express.Router();
const frController = require('../../controllers/frController');
const { authenticate } = require('../../middleware/auth');
// TODO: Add RBAC middleware after Sprint 1.1 RBAC refactor (Epic 01 Story 01) is complete
// const { checkPermission } = require('../../middleware/rbac');

/**
 * @route POST /api/v2/fr/register
 * @desc Register face for a student
 * @access Private (Admin, In-Charge) - TODO: Add RBAC permission check
 */
router.post(
  '/register',
  authenticate,
  // checkPermission('manage', 'students'), // TODO: Enable after RBAC refactor
  frController.upload.single('photo'),
  frController.registerFace
);

/**
 * @route POST /api/v2/fr/recognize
 * @desc Recognize face (identify student)
 * @access Public (for login) or Private (for attendance)
 * Note: In production, add rate limiting to prevent brute force
 */
router.post(
  '/recognize',
  frController.upload.single('photo'),
  frController.recognizeFace
);

/**
 * @route GET /api/v2/fr/status/:studentId
 * @desc Check if student has face registered
 * @access Private
 */
router.get(
  '/status/:studentId',
  authenticate,
  frController.getRegistrationStatus
);

/**
 * @route DELETE /api/v2/fr/register/:studentId
 * @desc Delete face registration for student (GDPR compliance)
 * @access Private (Admin, In-Charge) - TODO: Add RBAC permission check
 */
router.delete(
  '/register/:studentId',
  authenticate,
  // checkPermission('manage', 'students'), // TODO: Enable after RBAC refactor
  frController.deleteFaceRegistration
);

/**
 * @route GET /api/v2/fr/stats
 * @desc Get FR system statistics
 * @access Private (Admin only) - TODO: Add RBAC permission check
 */
router.get(
  '/stats',
  authenticate,
  // checkPermission('view', 'analytics'), // TODO: Enable after RBAC refactor
  frController.getFRStats
);

module.exports = router;
