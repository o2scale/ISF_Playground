const Quiz = require('../models/Quiz');
const QuestionBank = require('../models/QuestionBank');

/**
 * Quiz Controller - Sprint 2 Epic 02 Story 03
 * Handles quiz CRUD operations and publishing workflow
 */

/**
 * GET /api/v2/lms/admin/quizzes
 * Get all quizzes with filtering, search, and pagination
 */
exports.getAllQuizzes = async (req, res) => {
  try {
    const {
      status,
      search,
      course,
      chapter,
      sort = 'newest',
      limit = 100,
      offset = 0
    } = req.query;

    // Build query
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (course) {
      query.course = course;
    }

    if (chapter) {
      query.chapter = chapter;
    }

    // Full-text search
    if (search) {
      query.$text = { $search: search };
    }

    // Sort options
    let sortOption = {};
    switch (sort) {
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      case 'title_az':
        sortOption = { title: 1 };
        break;
      case 'title_za':
        sortOption = { title: -1 };
        break;
      case 'most_questions':
        // Will handle after fetching
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    // Execute query
    const quizzes = await Quiz.find(query)
      .populate('course', 'title')
      // Note: module and chapter are subdocuments within Course, cannot populate
      .populate('createdBy', 'name email')
      .populate('lastEditedBy', 'name email')
      .sort(sortOption)
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .lean();

    // Sort by question count if requested
    if (sort === 'most_questions') {
      quizzes.sort((a, b) => b.questions.length - a.questions.length);
    }

    // Get total count for pagination
    const total = await Quiz.countDocuments(query);

    res.json({
      success: true,
      quizzes,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: (parseInt(offset) + quizzes.length) < total
      }
    });

  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quizzes',
      error: error.message
    });
  }
};

/**
 * GET /api/v2/lms/admin/quizzes/:quizId
 * Get single quiz by ID
 */
exports.getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId)
      .populate('course', 'title')
      // Note: module and chapter are subdocuments within Course, cannot populate
      .populate('createdBy', 'name email')
      .populate('lastEditedBy', 'name email');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    res.json({
      success: true,
      quiz
    });

  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quiz',
      error: error.message
    });
  }
};

/**
 * POST /api/v2/lms/admin/quizzes
 * Create new quiz
 */
exports.createQuiz = async (req, res) => {
  try {
    const {
      title,
      description,
      course,
      module,
      chapter,
      questions = [],
      settings = {},
      tags = []
    } = req.body;

    // Validation
    if (!title || title.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Quiz title must be at least 3 characters'
      });
    }

    // Convert empty strings to undefined for ObjectId fields
    const cleanedCourse = course && course.trim() !== '' ? course : undefined;
    const cleanedModule = module && module.trim() !== '' ? module : undefined;
    const cleanedChapter = chapter && chapter.trim() !== '' ? chapter : undefined;

    // Create quiz
    const quiz = new Quiz({
      title: title.trim(),
      description: description?.trim(),
      course: cleanedCourse,
      module: cleanedModule,
      chapter: cleanedChapter,
      questions,
      settings: {
        ...settings,
        passingScore: settings.passingScore || 70
      },
      tags,
      status: 'draft',
      createdBy: req.user?._id || req.user?.id
    });

    // Debug logging
    console.log('Creating quiz with user:', {
      hasUser: !!req.user,
      userId: req.user?._id,
      userIdString: req.user?.id,
      userType: typeof req.user
    });

    await quiz.save();

    // Populate references for response (only models, not subdocuments)
    await quiz.populate([
      { path: 'course', select: 'title' },
      // Note: module and chapter are subdocuments within Course, cannot populate
      { path: 'createdBy', select: 'name email' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      quiz
    });

  } catch (error) {
    console.error('Error creating quiz:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      errors: error.errors // Mongoose validation errors
    });
    res.status(500).json({
      success: false,
      message: 'Failed to create quiz',
      error: error.message,
      details: error.errors ? Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      })) : undefined
    });
  }
};

/**
 * PUT /api/v2/lms/admin/quizzes/:quizId
 * Update quiz
 */
exports.updateQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const updates = req.body;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Update fields
    const allowedUpdates = [
      'title',
      'description',
      'course',
      'module',
      'chapter',
      'questions',
      'settings',
      'tags'
    ];

    // Sanitize empty strings for optional ObjectId fields (same as createQuiz)
    if (updates.course !== undefined && updates.course.trim && updates.course.trim() === '') {
      updates.course = undefined;
    }
    if (updates.module !== undefined && updates.module.trim && updates.module.trim() === '') {
      updates.module = undefined;
    }
    if (updates.chapter !== undefined && updates.chapter.trim && updates.chapter.trim() === '') {
      updates.chapter = undefined;
    }

    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) {
        quiz[field] = updates[field];
      }
    });

    quiz.lastEditedBy = req.user?._id || req.user?.id;

    await quiz.save();

    // Populate references (only models, not subdocuments)
    await quiz.populate([
      { path: 'course', select: 'title' },
      // Note: module and chapter are subdocuments within Course, cannot populate
      { path: 'createdBy', select: 'name email' },
      { path: 'lastEditedBy', select: 'name email' }
    ]);

    res.json({
      success: true,
      message: 'Quiz updated successfully',
      quiz
    });

  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update quiz',
      error: error.message
    });
  }
};

/**
 * POST /api/v2/lms/admin/quizzes/:quizId/duplicate
 * Duplicate quiz
 */
exports.duplicateQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    const originalQuiz = await Quiz.findById(quizId);

    if (!originalQuiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Create duplicate
    const duplicateQuiz = originalQuiz.duplicate(req.user._id);
    await duplicateQuiz.save();

    // Populate references (only models, not subdocuments)
    await duplicateQuiz.populate([
      { path: 'course', select: 'title' },
      // Note: module and chapter are subdocuments within Course, cannot populate
      { path: 'createdBy', select: 'name email' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Quiz duplicated successfully',
      quiz: duplicateQuiz
    });

  } catch (error) {
    console.error('Error duplicating quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to duplicate quiz',
      error: error.message
    });
  }
};

/**
 * DELETE /api/v2/lms/admin/quizzes/:quizId
 * Delete quiz
 */
exports.deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Remove usage tracking from question bank if questions are from bank
    const questionBankIds = quiz.questions
      .filter(q => q.questionBankId)
      .map(q => q.questionBankId);

    if (questionBankIds.length > 0) {
      await QuestionBank.updateMany(
        { _id: { $in: questionBankIds } },
        { $pull: { usedInQuizzes: { quizId: quizId } }, $inc: { usageCount: -1 } }
      );
    }

    await quiz.deleteOne();

    res.json({
      success: true,
      message: 'Quiz deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete quiz',
      error: error.message
    });
  }
};

/**
 * PUT /api/v2/lms/admin/quizzes/:quizId/publish
 * Publish quiz
 */
exports.publishQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Validation before publishing
    const errors = [];

    if (!quiz.title || quiz.title.trim().length < 3) {
      errors.push('Quiz title is required (min 3 characters)');
    }

    if (quiz.questions.length === 0) {
      errors.push('Quiz must have at least one question');
    }

    if (!quiz.chapter) {
      errors.push('Quiz must be associated with a chapter');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot publish quiz',
        errors
      });
    }

    // Publish
    await quiz.publish();

    res.json({
      success: true,
      message: 'Quiz published successfully',
      quiz
    });

  } catch (error) {
    console.error('Error publishing quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to publish quiz',
      error: error.message
    });
  }
};

/**
 * PUT /api/v2/lms/admin/quizzes/:quizId/unpublish
 * Unpublish quiz
 */
exports.unpublishQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    await quiz.unpublish();

    res.json({
      success: true,
      message: 'Quiz unpublished successfully',
      quiz
    });

  } catch (error) {
    console.error('Error unpublishing quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unpublish quiz',
      error: error.message
    });
  }
};

/**
 * PUT /api/v2/lms/admin/quizzes/:quizId/questions/reorder
 * Reorder questions
 */
exports.reorderQuestions = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { questionIds } = req.body; // Array of question _ids in new order

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Reorder questions based on questionIds array
    const reorderedQuestions = [];
    questionIds.forEach((questionId, index) => {
      const question = quiz.questions.id(questionId);
      if (question) {
        question.order = index;
        reorderedQuestions.push(question);
      }
    });

    quiz.questions = reorderedQuestions;
    quiz.lastEditedBy = req.user._id;

    await quiz.save();

    res.json({
      success: true,
      message: 'Questions reordered successfully',
      quiz
    });

  } catch (error) {
    console.error('Error reordering questions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reorder questions',
      error: error.message
    });
  }
};

/**
 * GET /api/v2/lms/admin/quizzes/stats
 * Get quiz statistics
 */
exports.getQuizStats = async (req, res) => {
  try {
    const totalQuizzes = await Quiz.countDocuments();
    const publishedQuizzes = await Quiz.countDocuments({ status: 'published' });
    const draftQuizzes = await Quiz.countDocuments({ status: 'draft' });

    const byType = await Quiz.aggregate([
      {
        $unwind: '$questions'
      },
      {
        $group: {
          _id: '$questions.type',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      stats: {
        totalQuizzes,
        publishedQuizzes,
        draftQuizzes,
        questionsByType: byType
      }
    });

  } catch (error) {
    console.error('Error fetching quiz stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quiz statistics',
      error: error.message
    });
  }
};
