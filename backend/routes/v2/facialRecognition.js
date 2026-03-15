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
const { authenticate, authorize } = require('../../middleware/auth');

/**
 * @route POST /api/v2/fr/register
 * @desc Register face for a student
 * @access Private (Admin, In-Charge)
 */
router.post(
  '/register',
  authenticate,
  authorize("User Management", "Create"),
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
 * @access Private (Admin, In-Charge)
 */
router.delete(
  '/register/:studentId',
  authenticate,
  authorize("User Management", "Delete"),
  frController.deleteFaceRegistration
);

/**
 * @route GET /api/v2/fr/stats
 * @desc Get FR system statistics
 * @access Private (Admin only)
 */
router.get(
  '/stats',
  authenticate,
  authorize("User Management", "Read"),
  frController.getFRStats
);

module.exports = router;
