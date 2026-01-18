// backend/routes/v2/lms/student/spokenEnglish.js
// Epic 01 Story 04: Spoken English Video Recording Routes

const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access :studentId from parent router

const spokenEnglishController = require('../../../../controllers/lms/student/spokenEnglishController');

/**
 * Spoken English Course Routes
 * Base path: /api/v2/lms/student/:studentId/courses/spoken-english
 */

// GET all tasks for spoken English course
router.get('/', spokenEnglishController.getSpokenEnglishTasks);

// GET specific task details
router.get('/:taskId', spokenEnglishController.getSpokenEnglishTask);

// GET student's submissions
router.get('/submissions/history', spokenEnglishController.getStudentSubmissions);

// POST submit video recording
router.post('/submissions', spokenEnglishController.submitVideoRecording);

module.exports = router;
