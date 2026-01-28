const Course = require('../../../models/course');
const StudentProgress = require('../../../models/StudentProgress');
const Submission = require('../../../models/Submission');
const mongoose = require('mongoose');

/**
 * Life Skills Controller - Epic 01 Story 05
 * Handles voice note submissions and MCQ quiz interactions
 *
 * Features:
 * - Voice note recording and submission
 * - MCQ quiz questions with audio enforcement
 * - Auto-grading (for quizzes) and coin rewards
 * - Offline sync support (queued submissions)
 */

// Helper to find life skills course
const getLifeSkillsCourse = async () => {
  return await Course.findOne({ category: 'Life Skills', status: 'published' }).lean();
};

/**
 * Get all Life Skills tasks (voice questions + quiz questions)
 * GET /api/v2/lms/student/:studentId/courses/life-skills
 */
exports.getLifeSkillsTasks = async (req, res) => {
  try {
    const { studentId } = req.params;

    const course = await getLifeSkillsCourse();
    if (!course) {
      return res.json({ success: true, tasks: [], completedTasks: 0, totalTasks: 0 });
    }

    // Fetch progress
    const progress = await StudentProgress.findOne({ student: studentId, course: course._id }).lean();
    const completedItems = new Set(progress?.completedItems?.map(i => i.itemId.toString()) || []);

    // Create tasks list from Modules/Chapters/ContentItems
    let allTasks = [];
    course.modules.forEach(m => {
      m.chapters.forEach(c => {
        c.contentItems.map(item => {
          // Determine type based on item metadata or type field
          // Assuming item.type 'task' might be voice question or 'quiz' is quiz

          let taskType = 'voice'; // Default
          if (item.type === 'quiz') taskType = 'quiz';
          else if (item.metadata && item.metadata.taskType) taskType = item.metadata.taskType;

          allTasks.push({
            id: item._id,
            taskType,
            title: item.title,
            description: item.description,
            // For Quizzes
            totalQuestions: item.metadata?.questions?.length || 0,
            totalCoins: (item.metadata?.questions?.length || 0) * 12,
            bonusCoins: item.metadata?.bonusCoins || 24,
            // For Voice
            difficulty: item.metadata?.difficulty || 'medium',
            coinsForSubmission: item.metadata?.coins || 20,
            instructions: item.description,
            category: item.metadata?.category || 'general',
            isCompleted: completedItems.has(item._id.toString())
          });
        });
      });
    });

    res.json({
      success: true,
      studentId,
      courseId: course._id,
      courseName: course.title,
      tasks: allTasks,
      completedTasks: allTasks.filter(t => t.isCompleted).length,
      totalTasks: allTasks.length
    });
  } catch (error) {
    console.error('Error fetching Life Skills tasks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Life Skills tasks'
    });
  }
};

/**
 * Get a specific voice question task (Refactored to find ContentItem)
 * GET /api/v2/lms/student/:studentId/courses/life-skills/voice/:taskId
 */
exports.getVoiceTask = async (req, res) => {
  try {
    const { studentId, taskId } = req.params;

    // taskId is contentItem._id
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ success: false, error: 'Invalid Task ID' });
    }

    const course = await Course.findOne(
      { "modules.chapters.contentItems._id": taskId },
      { "modules.chapters.contentItems.$": 1 }
    ).lean();

    if (!course) {
      // Fallback search (manually) if positional operator fails deep nesting
      // Assuming we rely on finding it
      return res.status(404).json({ success: false, error: 'Voice task not found' });
    }

    // Extract item (manual find to be safe)
    let taskItem = null;
    // We need complete course to traverse, if query above returned partial. 
    // Actually the projection returns the chapter array with 1 item.
    // Let's refine:

    // Safer: find the item
    const fullCourse = await Course.findOne({ "modules.chapters.contentItems._id": taskId }).lean();
    if (!fullCourse) return res.status(404).json({ success: false, error: 'Voice task not found' });

    fullCourse.modules.forEach(m => {
      m.chapters.forEach(c => {
        const i = c.contentItems.find(it => it._id.toString() === taskId);
        if (i) taskItem = i;
      });
    });

    if (!taskItem) {
      return res.status(404).json({
        success: false,
        error: 'Voice task not found'
      });
    }

    // Check submission status
    const submission = await Submission.findOne({ studentId, taskId }).sort({ submittedAt: -1 }).lean();

    res.json({
      success: true,
      studentId,
      task: {
        id: taskItem._id,
        taskType: 'voice',
        title: taskItem.title,
        audioUrl: taskItem.fileUrl,
        question: taskItem.description, // Mapped description to question
        duration: taskItem.metadata?.audioDuration || 15,
        maxRecordingDuration: taskItem.metadata?.maxDuration || 60,
        coinsForSubmission: taskItem.metadata?.coins || 20,
        instructions: taskItem.textContent || '',
        category: taskItem.metadata?.category,
        difficulty: taskItem.metadata?.difficulty,
        submittedAt: submission ? submission.submittedAt : null,
        grade: submission ? submission.grade : null
      }
    });
  } catch (error) {
    console.error('Error fetching voice task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch voice task'
    });
  }
};

/**
 * Submit voice recording
 * POST /api/v2/lms/student/:studentId/courses/life-skills/voice/submit
 */
exports.submitVoiceRecording = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { taskId, duration, fileSize } = req.body;

    // Validate existence
    const course = await Course.findOne({ "modules.chapters.contentItems._id": taskId });
    if (!course) return res.status(404).json({ success: false, error: 'Task not found' });

    // In production: Upload file to S3
    const mockS3Url = `https://isf-lms-voice.s3.amazonaws.com/students/${studentId}/lifeskills/${taskId}_${Date.now()}.webm`;

    // Save submission
    const submission = new Submission({
      studentId,
      courseId: course._id,
      taskId,
      taskTitle: "Voice Task", // Should look up title
      type: "voice", // or audio
      fileUrl: mockS3Url,
      metadata: { duration, fileSize },
      status: "submitted",
      submittedAt: new Date()
    });

    await submission.save();

    res.status(201).json({
      success: true,
      submissionId: submission._id,
      fileUrl: mockS3Url,
      status: 'pending', // pending | graded | rejected
      coinsEarned: 0, // Coins usually awarded after grading
      message: 'Great work! Your answer has been submitted. Coach will review it soon.'
    });
  } catch (error) {
    console.error('Error submitting voice recording:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit voice recording'
    });
  }
};

/**
 * Get quiz questions
 * GET /api/v2/lms/student/:studentId/courses/life-skills/quiz/:quizId
 */
exports.getQuiz = async (req, res) => {
  try {
    const { studentId, quizId } = req.params;

    // Use Quiz model (Already implemented in Epic 02)
    // quizId here implies ContentItem ID which LINKS to a Quiz, or the Quiz ID itself?
    // Let's assume contentItem.metadata.quizId holds the reference to the QuestionBank or Quiz model.
    // Or we treat the ContentItem AS the quiz container (embedded questions).

    // For Epic 1 simplicity and alignment with Admin Controller which uses `Quiz` model:
    // We should fetch the `Quiz` document.
    const Quiz = require('../../../models/Quiz');

    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) {
      // Ideally we search by ContentItem ID and find linked quiz
      return res.status(404).json({ success: false, error: 'Quiz not found' });
    }

    // Format for student (hide answers)
    const questions = quiz.questions.map(q => ({
      id: q._id,
      type: q.type,
      title: q.text, // "title" in UI
      audioUrl: q.audioUrl,
      question: q.text,
      options: q.options.map(o => ({ id: o._id, text: o.text })),
      coinsForCorrect: q.points || 10
    }));

    res.json({
      success: true,
      studentId,
      quiz: {
        id: quiz._id,
        title: quiz.title,
        description: quiz.description,
        totalQuestions: questions.length,
        passingScore: quiz.minScore || 60,
        questions
      }
    });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch quiz'
    });
  }
};

/**
 * Submit quiz answers and calculate score
 * POST /api/v2/lms/student/:studentId/courses/life-skills/quiz/submit
 */
exports.submitQuiz = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { quizId, answers, startedAt, completedAt } = req.body;

    // Load Quiz with answers
    const Quiz = require('../../../models/Quiz');
    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) return res.status(404).json({ success: false, error: 'Quiz not found' });

    let correctAnswers = 0;
    let baseCoins = 0;

    const breakdown = quiz.questions.map((question, index) => {
      const userAnswer = answers.find(a => a.questionId === question._id.toString());
      // Find correct option
      const correctOpt = question.options.find(o => o.isCorrect);
      const isCorrect = userAnswer && userAnswer.selectedOptionId === correctOpt._id.toString();

      if (isCorrect) {
        correctAnswers++;
        baseCoins += (question.points || 10);
      }

      return {
        questionId: question._id,
        correct: isCorrect,
        correctAnswer: correctOpt._id, // Send back ID
        explanation: question.explanation
      };
    });

    // Score
    const totalQuestions = quiz.questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const passed = score >= (quiz.minScore || 60);

    // Save Submission
    // Using Submission model or specific QuizSubmission? 
    // Let's use Submission generic for now
    const submission = new Submission({
      studentId,
      courseId: quiz.courseId, // Assuming quiz has reference
      taskId: quizId,
      type: 'quiz',
      status: passed ? 'graded' : 'failed',
      grade: {
        score,
        points: baseCoins
      },
      metadata: { breakdown }, // Store details
      submittedAt: new Date()
    });
    await submission.save();

    // Update Progress
    // If passed, mark item as completed in StudentProgress
    if (passed) {
      // Logic to update StudentProgress...
      // await StudentProgress.markItemCompleted(...)
    }

    res.json({
      success: true,
      quizId,
      results: {
        score,
        correctAnswers,
        totalQuestions,
        passed,
        coinsEarned: baseCoins,
        breakdown
      }
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit quiz'
    });
  }
};

/**
 * Get student's submission history for Life Skills
 * GET /api/v2/lms/student/:studentId/courses/life-skills/submissions
 */
exports.getSubmissionHistory = async (req, res) => {
  try {
    const { studentId } = req.params;

    const submissions = await Submission.find({ studentId }).populate('courseId').lean();
    // Filter for Life Skills course... or rely on client to filter or use query param.
    // Assuming ALL submissions for now as this is a specific controller endpoint

    res.json({
      success: true,
      studentId,
      submissions: submissions.map(s => ({
        id: s._id,
        type: s.type,
        status: s.status,
        score: s.grade?.score,
        coinsEarned: s.grade?.points,
        submittedAt: s.submittedAt
      }))
    });
  } catch (error) {
    console.error('Error fetching submission history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch submission history'
    });
  }
};
