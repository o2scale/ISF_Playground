const express = require('express');
const router = express.Router();
const coachAssignmentController = require('../../../../controllers/lms/coach/coachAssignmentController');
const { authenticate, authorize } = require('../../../../middleware/auth');

// ==================== COURSE ASSIGNMENT OPERATIONS ====================

/**
 * @route GET /api/v2/lms/coach/courses/published
 * @desc Get all published courses available for assignment
 * @access Private (Coach only)
 */
router.get(
  '/courses/published',
  authenticate,
  coachAssignmentController.getPublishedCourses
);

/**
 * @route GET /api/v2/lms/coach/:coachId/students
 * @desc Get all students in coach's Balagruha
 * @access Private (Coach only)
 */
router.get(
  '/:coachId/students',
  authenticate,
  coachAssignmentController.getCoachStudents
);

/**
 * @route POST /api/v2/lms/coach/assignments
 * @desc Create new course assignment
 * @access Private (Coach only)
 */
router.post(
  '/assignments',
  authenticate,
  coachAssignmentController.createAssignment
);

/**
 * @route GET /api/v2/lms/coach/:coachId/assignments
 * @desc Get all assignments created by coach
 * @access Private (Coach only)
 */
router.get(
  '/:coachId/assignments',
  authenticate,
  coachAssignmentController.getCoachAssignments
);

/**
 * @route GET /api/v2/lms/coach/assignments/:assignmentId
 * @desc Get single assignment by ID
 * @access Private (Coach only)
 */
router.get(
  '/assignments/:assignmentId',
  authenticate,
  coachAssignmentController.getAssignmentById
);

/**
 * @route PUT /api/v2/lms/coach/assignments/:assignmentId
 * @desc Update assignment (due date, status)
 * @access Private (Coach only)
 */
router.put(
  '/assignments/:assignmentId',
  authenticate,
  coachAssignmentController.updateAssignment
);

/**
 * @route DELETE /api/v2/lms/coach/assignments/:assignmentId
 * @desc Unassign/cancel course assignment
 * @access Private (Coach only)
 */
router.delete(
  '/assignments/:assignmentId',
  authenticate,
  coachAssignmentController.deleteAssignment
);

/**
 * @route GET /api/v2/lms/coach/:coachId/stats
 * @desc Get coach assignment statistics
 * @access Private (Coach only)
 */
router.get(
  '/:coachId/stats',
  authenticate,
  coachAssignmentController.getCoachStats
);

/**
 * @route PUT /api/v2/lms/coach/assignments/:assignmentId/progress
 * @desc Update assignment progress
 * @access Private (Coach only)
 */
router.put(
  '/assignments/:assignmentId/progress',
  authenticate,
  coachAssignmentController.updateAssignmentProgress
);

module.exports = router;
