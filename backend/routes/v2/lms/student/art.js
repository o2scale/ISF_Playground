const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access :studentId from parent router
const artCourseController = require('../../../../controllers/lms/student/artCourseController');
const { authenticate } = require('../../../../middleware/auth');
const verifyStudentOwnership = require('../../../../middleware/verifyStudentOwnership');

/**
 * Art Course Routes - Epic 01 Story 03
 * Base path: /api/v2/lms/student/:studentId/courses/art
 */

// Get Art Course data (all modes: workshops, free_sketch, art_stories, competition)
router.get('/', authenticate, verifyStudentOwnership, artCourseController.getArtCourseData);

// Submit artwork for grading or competition
router.post('/submissions', authenticate, verifyStudentOwnership, artCourseController.submitArtwork);

// Save artwork to personal gallery (Free Sketch mode)
router.post('/gallery', authenticate, verifyStudentOwnership, artCourseController.saveToGallery);

module.exports = router;
