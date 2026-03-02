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
  return await Course.findOne({ category: 'Life Skills', status: 'published' })
    .populate({
      path: 'modules.chapters.contentItems',
      populate: { path: 'quizRef' } // Deep populate Quiz
    })
    .lean();
};

// Helper to update progress
const updateProgress = async (studentId, courseId, itemId, itemType, score = null) => {
  try {
    let progress = await StudentProgress.findOne({ student: studentId, course: courseId });

    if (!progress) {
      progress = new StudentProgress({
        student: studentId,
        course: courseId,
        startedAt: new Date(),
        status: 'in_progress',
        completedItems: []
      });
    }

    // Add new item (or replace existing)
    const newItem = {
      itemId: itemId,
      itemType: itemType,
      completedAt: new Date(),
      score: score
    };

    // Add to list
    progress.completedItems.push(newItem);

    // Deduplicate: Keep the LATEST entry for each itemId
    // Logic: Reverse array -> Map sets key (itemId) -> First encountered (latest) wins -> Values -> Reverse back (optional, but Map insertion order is by first set)
    // Simpler: Map key=itemId. Overwrites. Last one in array wins.
    const uniqueItemsMap = new Map();
    progress.completedItems.forEach(item => {
      uniqueItemsMap.set(item.itemId.toString(), item);
    });
    progress.completedItems = Array.from(uniqueItemsMap.values());

    progress.lastAccessedAt = new Date();
    await progress.save();

  } catch (err) {
    console.error('Error updating progress:', err);
  }
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

    // Map modules with completion status
    const modules = course.modules.map(m => ({
      id: m._id,
      title: m.title,
      chapters: m.chapters.map(c => ({
        id: c._id,
        title: c.title,
        contentItems: c.contentItems.map(item => {
          // Determine type
          let type = item.type;
          // Fallback logic if type is missing or generic 'task'
          if (!type || type === 'task') {
            if (item.metadata && item.metadata.taskType) {
              type = item.metadata.taskType;
            } else {
              type = 'voice'; // Default fallback
            }
          }

          return {
            id: item._id,
            type: type,
            title: item.title,
            description: item.description,
            fileUrl: item.fileUrl,
            // For Quizzes: Check quizRef first, then metadata
            totalQuestions: item.quizRef?.questions?.length || item.metadata?.questions?.length || 0,
            totalCoins: (item.quizRef?.questions?.length || item.metadata?.questions?.length || 0) * 12,
            bonusCoins: item.metadata?.bonusCoins || 24,
            // For Voice
            difficulty: item.metadata?.difficulty || 'medium',
            coinsForSubmission: item.metadata?.coins || 20,
            instructions: item.description,
            category: item.metadata?.category || 'general',
            // For Video
            duration: item.metadata?.duration,
            isCompleted: completedItems.has(item._id.toString())
          };
        })
      }))
    }));

    res.json({
      success: true,
      studentId,
      courseId: course._id,
      courseName: course.title,
      modules: modules,
      // Keep legacy counts for dashboard if needed
      completedTasks: completedItems.size,
      totalTasks: course.modules.reduce((acc, m) => acc + m.chapters.reduce((cAcc, c) => cAcc + c.contentItems.length, 0), 0)
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

    // ... submission logic

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
    const Course = require('../../../models/course');

    // Attempt to find by direct Quiz ID first
    let quiz = null;
    // Check if it's a valid ObjectId to avoid CastError if looking up strict model
    if (mongoose.Types.ObjectId.isValid(quizId)) {
      try {
        quiz = await Quiz.findById(quizId).populate('questions');
      } catch (err) {
        // Ignore cast errors or similar, proceed to ContentItem lookup
        console.log("Not a direct Quiz ID or not found, trying ContentItem...");
      }
    }

    // If not found, it might be a ContentItem ID (from Course structure)
    if (!quiz) {
      // Find the Course containing this content item
      // We don't use projection $ because deep nesting is tricky. catch the whole course (or specific fields if optimization needed)
      const course = await Course.findOne(
        { "modules.chapters.contentItems._id": quizId }
      ).lean();

      if (course) {
        // Manually find the item in the nested arrays
        let contentItem = null;
        for (const m of course.modules) {
          for (const c of m.chapters) {
            const found = c.contentItems.find(i => i._id.toString() === quizId);
            if (found) {
              contentItem = found;
              break;
            }
          }
          if (contentItem) break;
        }

        if (contentItem) {
          if (contentItem.quizRef) {
            quiz = await Quiz.findById(contentItem.quizRef).populate('questions');
          } else if (contentItem.metadata?.quizId) {
            quiz = await Quiz.findById(contentItem.metadata.quizId).populate('questions');
          }
        }
      }
    }

    if (!quiz) {
      return res.status(404).json({ success: false, error: 'Quiz not found' });
    }

    // Check Max Attempts
    const maxAttempts = quiz.settings?.maxAttempts || 3;
    const unlimitedAttempts = quiz.settings?.unlimitedAttempts || false;

    if (!unlimitedAttempts) {
      const Submission = require('../../../models/Submission');
      const attemptCount = await Submission.countDocuments({
        studentId,
        taskId: quizId,
        submissionType: 'quiz'
      });

      if (attemptCount >= maxAttempts) {
        return res.status(403).json({
          success: false,
          error: `Maximum attempts (${maxAttempts}) exceeded for this quiz.`
        });
      }
    }

    // Format for student (hide answers)
    const questions = quiz.questions.map(q => ({
      id: q._id,
      type: q.type,
      title: q.questionText, // "title" in UI
      audioUrl: q.audioUrl,
      question: q.questionText,
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
    const Course = require('../../../models/course');

    let quiz = null;
    let courseRef = null;
    if (mongoose.Types.ObjectId.isValid(quizId)) {
      quiz = await Quiz.findById(quizId).populate('questions');
    }

    if (!quiz) {
      const course = await Course.findOne({ "modules.chapters.contentItems._id": quizId }).lean();
      if (course) {
        courseRef = course._id;
        let contentItem = null;
        for (const m of course.modules) {
          for (const c of m.chapters) {
            const found = c.contentItems.find(i => i._id.toString() === quizId);
            if (found) { contentItem = found; break; }
          }
          if (contentItem) break;
        }
        if (contentItem) {
          if (contentItem.quizRef) quiz = await Quiz.findById(contentItem.quizRef).populate('questions');
          else if (contentItem.metadata?.quizId) quiz = await Quiz.findById(contentItem.metadata.quizId).populate('questions');
        }
      }
    }

    if (!quiz) return res.status(404).json({ success: false, error: 'Quiz not found' });

    // Check Max Attempts before processing submission
    const maxAttempts = quiz.settings?.maxAttempts || 3;
    const unlimitedAttempts = quiz.settings?.unlimitedAttempts || false;

    if (!unlimitedAttempts) {
      const Submission = require('../../../models/Submission');
      const attemptCount = await Submission.countDocuments({
        studentId,
        taskId: quizId,
        submissionType: 'quiz'
      });

      if (attemptCount >= maxAttempts) {
        return res.status(403).json({
          success: false,
          error: `Maximum attempts (${maxAttempts}) exceeded for this quiz.`
        });
      }
    }

    let correctAnswers = 0;

    let baseCoins = 0;

    // Check if user already passed this quiz (to prevent duplicate coins)
    // 1. Check Submissions (Legacy)
    const existingSubmission = await Submission.findOne({
      studentId,
      taskId: quizId,
      submissionType: 'quiz',
      'grade.score': { $gte: (quiz.minScore || 60) }
    });

    // 2. Check StudentProgress (Robust)
    const courseIdToUse = quiz.course || (courseRef && courseRef._id) || courseRef;
    let existingProgress = false;
    if (courseIdToUse) {
      const progress = await StudentProgress.findOne({
        student: studentId,
        course: courseIdToUse,
        'completedItems.itemId': quizId
      });
      if (progress) existingProgress = true;
    }

    const alreadyPassed = !!existingSubmission || existingProgress;

    const breakdown = quiz.questions.map((question, index) => {
      const userAnswer = answers.find(a => a.questionId === question._id.toString());
      // Find correct option
      const correctOpt = question.options.find(o => o.isCorrect);
      const isCorrect = userAnswer && userAnswer.selectedOptionId === correctOpt._id.toString();

      if (isCorrect) {
        correctAnswers++;
        // Only award coins if not already passed
        if (!alreadyPassed) {
          baseCoins += (question.points || 10);
        }
      }

      // Find Option Texts
      const selectedOption = question.options.find(o => o._id.toString() === userAnswer?.selectedOptionId);

      return {
        questionId: question._id,
        question: question.text, // Return Question Text
        correct: isCorrect,
        isCorrect: isCorrect, // MATCH FRONTEND PROPERTY
        points: question.points || 10, // Pass points
        studentAnswer: selectedOption ? selectedOption.text : 'No Answer', // Return Text
        correctAnswer: correctOpt.text, // Return Text
        correctAnswerId: correctOpt._id, // Keep ID just in case
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
      courseId: quiz.course || courseRef, // Use cached ref if quiz doesn't have it
      taskId: quizId,
      taskTitle: quiz.title || 'Quiz Submission',
      submissionType: 'quiz',
      fileUrl: 'quiz-submission', // Placeholder for required field
      status: 'graded',
      grade: {
        score,
        points: baseCoins
      },
      metadata: { breakdown }, // Store details
      submittedAt: new Date()
    });
    await submission.save();

    // Award Coins
    if (baseCoins > 0) {
      try {
        const Coin = require('../../../models/coin');
        const User = require('../../../models/user');

        const coinRecord = await Coin.findOrCreateForUser(studentId);

        // Determine courseId (use quiz.course or courseRef)
        const cId = quiz.course || courseRef;

        await coinRecord.addCoins(
          baseCoins,
          'earned',
          `Quiz Completed: ${quiz.title}`,
          'task',
          { quizId: quiz._id, courseId: cId }
        );

        // Update User Balance Legacy
        await User.findByIdAndUpdate(studentId, { $inc: { coins: baseCoins } });
      } catch (coinError) {
        console.error('Error awarding coins in Life Skills:', coinError);
        // Fallback to just User update if Coin model fails?
        // Better to log and persist main balance at least
        const User = require('../../../models/user');
        await User.findByIdAndUpdate(studentId, { $inc: { coins: baseCoins } });
      }
    }

    // Amount of coins logic handled earlier

    // Update Progress
    if (passed) {
      // Ensure we pass the ID, not the object
      const courseIdToUse = quiz.course || (courseRef && courseRef._id) || courseRef;
      await updateProgress(studentId, courseIdToUse, quizId, 'quiz', score);
    }

    res.json({
      success: true,
      quizId,
      results: {
        score,
        correctAnswers,
        totalQuestions,
        passed,
        passed,
        coinsEarned: baseCoins,
        alreadyPassed: alreadyPassed, // Debug info for client
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

/**
 * Mark content item as complete (Video/PDF)
 * POST /api/v2/lms/student/:studentId/courses/life-skills/mark-complete
 */
exports.markItemComplete = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { itemId, itemType, courseId } = req.body;

    if (!itemId || !courseId) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    await updateProgress(studentId, courseId, itemId, itemType || 'content');

    res.json({ success: true });
  } catch (error) {
    console.error('Error marking completion:', error);
    res.status(500).json({ success: false, error: 'Failed' });
  }
};
