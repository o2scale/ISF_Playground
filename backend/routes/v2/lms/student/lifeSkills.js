/**
 * Life Skills Routes - Epic 01 Story 05
 * Voice recording + MCQ quiz routes for Life Skills course
 */

const express = require('express');
const router = express.Router({ mergeParams: true }); // Enables access to :studentId from parent route

const lifeSkillsController = require('../../../../controllers/lms/student/lifeSkillsController');

// Get all Life Skills tasks (voice questions + quiz)
router.get('/', lifeSkillsController.getLifeSkillsTasks);

// Voice Recording Routes
router.get('/voice/:taskId', lifeSkillsController.getVoiceTask);
router.post('/voice/submit', lifeSkillsController.submitVoiceRecording);

// MCQ Quiz Routes
router.get('/quiz/:quizId', lifeSkillsController.getQuiz);
router.post('/quiz/submit', lifeSkillsController.submitQuiz);

// Submission History
router.get('/submissions', lifeSkillsController.getSubmissionHistory);

module.exports = router;
