const User = require('../../../models/user');
const Coin = require('../../../models/coin');
const Notification = require('../../../models/notification');
const EmotionTracking = require('../../../models/EmotionTracking');
const Course = require('../../../models/course');
const mongoose = require('mongoose');

/**
 * Student Dashboard Controller - Epic 01 Story 01
 * Handles all student dashboard-related operations:
 * - Dashboard data (courses, progress, last activity, stats)
 * - Coin balance
 * - Notification count
 * - Homework count
 * - Emotion tracking
 */

// ==================== DASHBOARD ====================

/**
 * @desc Get student dashboard data
 * @route GET /api/v2/lms/student/:studentId/dashboard
 * @access Private
 */
exports.getDashboard = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Verify student exists
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Get all published courses
    const allCourses = await Course.find({ status: 'Published' });

    // Build course progress data
    // For now, using mock data - will be replaced with actual progress tracking in future stories
    const courseProgressMap = {
      'Computer Apps': { totalTasks: 15, completedTasks: 3 },
      'Art': { totalTasks: 12, completedTasks: 5 },
      'Spoken English': { totalTasks: 20, completedTasks: 0 },
      'Life Skills': { totalTasks: 10, completedTasks: 2 }
    };

    const courses = Object.entries(courseProgressMap).map(([courseType, progress]) => ({
      courseType,
      totalTasks: progress.totalTasks,
      completedTasks: progress.completedTasks
    }));

    // Get last incomplete task (mock data for now)
    // TODO: Replace with actual task progress query in Story 02-05
    const lastActivity = {
      courseType: 'Computer Apps',
      taskTitle: 'Introduction to MS Word',
      progress: 45,
      taskId: new mongoose.Types.ObjectId()
    };

    // Get stats (mock data for now)
    // TODO: Replace with actual calculations from task completion data
    const stats = {
      totalTasksCompleted: 10,
      currentStreak: 3,
      coinsEarnedToday: 50
    };

    res.json({
      success: true,
      data: {
        studentName: student.name || 'Student',
        courses,
        lastActivity,
        stats
      }
    });
  } catch (error) {
    console.error('Get Dashboard Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard data',
      error: error.message
    });
  }
};

// ==================== COIN BALANCE ====================

/**
 * @desc Get student's current coin balance
 * @route GET /api/v2/lms/student/:studentId/coins
 * @access Private
 */
exports.getCoinBalance = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Verify student exists
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Get total coin balance
    const coinRecord = await Coin.findOne({ userId: studentId });
    const balance = coinRecord ? coinRecord.balance : 0;

    res.json({
      success: true,
      balance
    });
  } catch (error) {
    console.error('Get Coin Balance Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching coin balance',
      error: error.message
    });
  }
};

// ==================== NOTIFICATION COUNT ====================

/**
 * @desc Get unread notification count for student
 * @route GET /api/v2/lms/student/:studentId/notifications/count
 * @access Private
 */
exports.getNotificationCount = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Verify student exists
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Count unread notifications
    const unreadCount = await Notification.countDocuments({
      recipientId: studentId,
      isRead: false
    });

    res.json({
      success: true,
      unreadCount
    });
  } catch (error) {
    console.error('Get Notification Count Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching notification count',
      error: error.message
    });
  }
};

// ==================== HOMEWORK COUNT ====================

/**
 * @desc Get count of pending homework tasks
 * @route GET /api/v2/lms/student/:studentId/homework/pending
 * @access Private
 */
exports.getPendingHomeworkCount = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Verify student exists
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Mock homework count for now
    // TODO: Replace with actual homework query in Epic 05
    const count = 3;

    res.json({
      success: true,
      count
    });
  } catch (error) {
    console.error('Get Homework Count Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching homework count',
      error: error.message
    });
  }
};

// ==================== EMOTION TRACKING ====================

/**
 * @desc Save single emotion tracking entry
 * @route POST /api/v2/lms/student/:studentId/emotion
 * @access Private
 */
exports.saveEmotion = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { emotion, timestamp, context } = req.body;

    // Validate emotion
    if (!emotion || !['happy', 'sad', 'angry'].includes(emotion)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid emotion. Must be happy, sad, or angry'
      });
    }

    // Verify student exists
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Create emotion tracking entry
    const emotionEntry = new EmotionTracking({
      studentId,
      emotion,
      timestamp: timestamp || new Date(),
      synced: true,
      context: context || {}
    });

    await emotionEntry.save();

    res.json({
      success: true,
      message: 'Emotion saved successfully',
      data: {
        emotionId: emotionEntry._id,
        emotion,
        timestamp: emotionEntry.timestamp
      }
    });
  } catch (error) {
    console.error('Save Emotion Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving emotion',
      error: error.message
    });
  }
};

/**
 * @desc Batch save emotion tracking entries (for offline sync)
 * @route POST /api/v2/lms/student/:studentId/emotions/batch
 * @access Private
 */
exports.batchSaveEmotions = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { emotions } = req.body;

    // Validate emotions array
    if (!Array.isArray(emotions) || emotions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Emotions must be a non-empty array'
      });
    }

    // Verify student exists
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Validate each emotion entry
    const validEmotions = ['happy', 'sad', 'angry'];
    const emotionEntries = emotions
      .filter(e => e.emotion && validEmotions.includes(e.emotion))
      .map(e => ({
        studentId,
        emotion: e.emotion,
        timestamp: e.timestamp || new Date(),
        synced: false, // Mark as synced from offline
        context: e.context || {}
      }));

    if (emotionEntries.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid emotions to save'
      });
    }

    // Bulk insert
    const result = await EmotionTracking.insertMany(emotionEntries);

    res.json({
      success: true,
      message: `${result.length} emotions synced successfully`,
      data: {
        syncedCount: result.length,
        skippedCount: emotions.length - result.length
      }
    });
  } catch (error) {
    console.error('Batch Save Emotions Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while batch saving emotions',
      error: error.message
    });
  }
};
