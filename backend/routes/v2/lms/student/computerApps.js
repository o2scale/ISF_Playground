const express = require('express');
const router = express.Router();
const computerAppsController = require('../../../../controllers/lms/student/computerAppsController');

/**
 * Computer Apps Routes - Epic 01 Story 02
 * Base path: /api/v2/lms/student/:studentId/courses/computer-apps
 */

// @route   GET /api/v2/lms/student/:studentId/courses/computer-apps
// @desc    Get all Computer Apps applications with progress
// @access  Private
router.get('/', computerAppsController.getComputerApps);

// @route   GET /api/v2/lms/student/:studentId/courses/computer-apps/:appId/levels
// @desc    Get all levels for selected app
// @access  Private
router.get('/:appId/levels', computerAppsController.getAppLevels);

// @route   GET /api/v2/lms/student/:studentId/courses/computer-apps/:appId/levels/:levelId/task/:taskId
// @desc    Get task details for selected level
// @access  Private
router.get('/:appId/levels/:levelId/task/:taskId', computerAppsController.getTaskDetails);

module.exports = router;
