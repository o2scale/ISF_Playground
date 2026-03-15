const express = require('express');
const router = express.Router({ mergeParams: true });
const computerAppsController = require('../../../../controllers/lms/student/computerAppsController');
const { authenticate } = require('../../../../middleware/auth');

/**
 * Computer Apps Routes - Epic 01 Story 02
 * Base path: /api/v2/lms/student/:studentId/courses/computer-apps
 */

// @route   GET /api/v2/lms/student/:studentId/courses/computer-apps
// @desc    Get all Computer Apps applications with progress
// @access  Private
router.get('/', authenticate, computerAppsController.getComputerApps);

// @route   GET /api/v2/lms/student/:studentId/courses/computer-apps/:courseId/hierarchy
// @desc    Get course hierarchy (Modules/Chapters/Items)
// @access  Private
router.get('/:courseId/hierarchy', authenticate, computerAppsController.getCourseHierarchy);

// @route   GET /api/v2/lms/student/:studentId/courses/computer-apps/:courseId/content/:contentId
// @desc    Get specific content item details
// @access  Private
router.get('/:courseId/content/:contentId', authenticate, computerAppsController.getContentDetails);

// @route   GET /api/v2/lms/student/:studentId/courses/computer-apps/quiz/:quizId
// @desc    Get quiz details and questions
// @access  Private
router.get('/quiz/:quizId', authenticate, computerAppsController.getQuiz);

// @route   POST /api/v2/lms/student/:studentId/courses/computer-apps/quiz/submit
// @desc    Submit quiz answers
// @access  Private
router.post('/quiz/submit', authenticate, computerAppsController.submitQuiz);

// @route   POST /api/v2/lms/student/:studentId/courses/computer-apps/mark-complete
// @desc    Mark content item as complete
// @access  Private
router.post('/mark-complete', authenticate, computerAppsController.markComplete);

module.exports = router;
