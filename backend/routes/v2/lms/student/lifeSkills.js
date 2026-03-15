/**
 * Life Skills Routes - Epic 01 Story 05
 * Voice recording + MCQ quiz routes for Life Skills course
 */

const express = require('express');
const router = express.Router({ mergeParams: true }); // Enables access to :studentId from parent route

const lifeSkillsController = require('../../../../controllers/lms/student/lifeSkillsController');
const { authenticate } = require('../../../../middleware/auth');

// Get all Life Skills tasks (voice questions + quiz)
router.get('/', authenticate, lifeSkillsController.getLifeSkillsTasks);

// Voice Recording Routes
router.get('/voice/:taskId', authenticate, lifeSkillsController.getVoiceTask);
router.post('/voice/submit', authenticate, lifeSkillsController.submitVoiceRecording);
router.post('/mark-complete', authenticate, lifeSkillsController.markItemComplete);

// MCQ Quiz Routes
router.get('/quiz/:quizId', authenticate, lifeSkillsController.getQuiz);
router.post('/quiz/submit', authenticate, lifeSkillsController.submitQuiz);

// Submission History
router.get('/submissions', authenticate, lifeSkillsController.getSubmissionHistory);

module.exports = router;
