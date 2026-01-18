const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access :studentId from parent router
const artCourseController = require('../../../../controllers/lms/student/artCourseController');

/**
 * Art Course Routes - Epic 01 Story 03
 * Base path: /api/v2/lms/student/:studentId/courses/art
 */

// Get Art Course data (all modes: workshops, free_sketch, art_stories, competition)
router.get('/', artCourseController.getArtCourseData);

// Submit artwork for grading or competition
router.post('/submissions', artCourseController.submitArtwork);

// Save artwork to personal gallery (Free Sketch mode)
router.post('/gallery', artCourseController.saveToGallery);

module.exports = router;
