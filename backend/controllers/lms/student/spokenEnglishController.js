const Course = require('../../../models/course');
const StudentProgress = require('../../../models/StudentProgress');
const Submission = require('../../../models/Submission');
const mongoose = require('mongoose');
const s3Service = require('../../../services/aws/s3');
const fs = require('fs');

// backend/controllers/lms/student/spokenEnglishController.js
// Epic 01 Story 04: Spoken English Video Recording

/**
 * Get Spoken English Task Data (Single Task - Mapped to a ContentItem)
 * GET /api/v2/lms/student/:studentId/courses/spoken-english/:taskId
 * Returns task details (ContentItem), audio instructions, and requirements
 * Note: taskId here refers to the ContentItem ID
 */
exports.getSpokenEnglishTask = async (req, res) => {
  try {
    const { studentId, taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ success: false, message: 'Invalid Task ID' });
    }

    // 1. Find the Course/Module/Chapter that contains this ContentItem
    // This is expensive if we don't know the parent, but ContentItem IDs are unique in Mongo if they are subdocuments with _id.
    // However, Mongoose subdoc search is tricky.
    // Let's search for the Course containing this contentItem in 'modules.chapters.contentItems'

    // Optimized query to find specific content item
    const course = await Course.findOne(
      { "modules.chapters.contentItems._id": taskId },
      { "modules.chapters.contentItems.$": 1 }
    ).lean();

    // The projection "modules.chapters.contentItems.$" returns only the first matching array element, 
    // but standard Mongo positional operator only works one level deep easily.
    // We will do a broad search then filter in JS for reliability given deep nesting.

    // Re-approach: Find course with the ID
    const foundCourse = await Course.findOne({
      "modules.chapters.contentItems._id": taskId
    }).lean();

    if (!foundCourse) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Find the specific item
    let task = null;
    foundCourse.modules.forEach(m => {
      m.chapters.forEach(c => {
        const item = c.contentItems.find(i => i._id.toString() === taskId);
        if (item) task = item;
      });
    });

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found in course' });
    }

    // Get submission status
    const submission = await Submission.findOne({
      studentId: studentId,
      taskId: taskId
    }).sort({ submittedAt: -1 }).lean();

    // Construct response
    const taskResponse = {
      id: task._id,
      title: task.title,
      description: task.description,
      instructionsAudioUrl: task.fileUrl || null,
      instructionsText: task.textContent || "Please complete the recording task.",
      maxDuration: task.metadata?.maxDuration || 120,
      difficulty: foundCourse.difficultyLevel || "Beginner",
      estimatedTime: task.metadata?.estimatedTime || 10,
      poemText: task.metadata?.poemText || "", // Specific for poetry
      requirements: task.metadata?.requirements || [],
      rubric: task.metadata?.rubric || {}
    };

    res.status(200).json({
      success: true,
      task: taskResponse,
      submissionStatus: submission ? submission.status : 'not_started'
    });

  } catch (error) {
    console.error('Error fetching spoken English task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load task data',
      error: error.message
    });
  }
};

/**
 * Get All Spoken English Tasks (Courses/Modules)
 * GET /api/v2/lms/student/:studentId/courses/spoken-english
 * Returns list of available tasks (treated as ContentItems across Spoken English courses)
 */
exports.getSpokenEnglishTasks = async (req, res) => {
  try {
    const { studentId } = req.params;

    // 1. Fetch Spoken English Courses
    const courses = await Course.find({ category: 'Spoken English', status: 'published' }).lean();

    if (!courses.length) {
      return res.status(200).json({
        success: true,
        tasks: [],
        totalTasks: 0,
        availableTasks: 0,
        completedTasks: 0
      });
    }

    // 2. Fetch completed items from StudentProgress
    const progressRecords = await StudentProgress.find({
      student: studentId,
      course: { $in: courses.map(c => c._id) }
    }).lean();

    const completedItemIds = new Set();
    progressRecords.forEach(p => {
      p.completedItems?.forEach(i => completedItemIds.add(i.itemId.toString()));
    });

    // 3. Flatten Tasks (Content Items)
    // Locking logic: Sequential unlocking based on order in Module/Chapter?
    // Let's assume sequential unlocking across the entire Course for simplicity, 
    // or just mark everything available for now if logic is complex.
    // Based on mocks: locked status exists.

    let allTasks = [];

    courses.forEach(course => {
      let previousTaskCompleted = true; // First task is always unlocked

      course.modules.forEach(m => {
        m.chapters.forEach(c => {
          c.contentItems.map(item => {
            const isCompleted = completedItemIds.has(item._id.toString());
            const isLocked = !previousTaskCompleted;

            // Only include "Task" or "Video" or specific types relevant to Spoken English
            // Assuming all content items here are tasks

            allTasks.push({
              id: item._id,
              title: item.title,
              difficulty: course.difficultyLevel,
              estimatedTime: item.metadata?.estimatedTime || 10,
              type: item.type || "speech",
              status: isCompleted ? 'graded' : (isLocked ? 'locked' : 'available'),
              // Note: 'graded' is simplified; real logic checks Submission model for 'under_review' vs 'graded'
              // But 'completed' in StudentProgress usually implies passing grade or submission done.
              thumbnailUrl: course.thumbnail
            });

            if (!isCompleted) previousTaskCompleted = false;
          });
        });
      });
    });

    // Refine status with Submission data (to catch 'under_review')
    // optimization: fetch all submissions for these tasks
    const submissions = await Submission.find({
      studentId,
      taskId: { $in: allTasks.map(t => t.id) }
    }).lean();

    const submissionMap = new Map(submissions.map(s => [s.taskId.toString(), s]));

    allTasks = allTasks.map(t => {
      const sub = submissionMap.get(t.id.toString());
      if (sub) {
        if (sub.status === 'under_review' || sub.status === 'submitted') {
          t.status = 'under_review'; // Override 'available'
        } else if (sub.status === 'graded') {
          t.status = 'graded';
        }
      }
      return t;
    });

    res.status(200).json({
      success: true,
      tasks: allTasks,
      totalTasks: allTasks.length,
      availableTasks: allTasks.filter(t => t.status === 'available').length,
      completedTasks: allTasks.filter(t => t.status === 'graded').length
    });

  } catch (error) {
    console.error('Error fetching spoken English tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load tasks',
      error: error.message
    });
  }
};

/**
 * Submit Video Recording
 * POST /api/v2/lms/student/:studentId/courses/spoken-english/submissions
 * Handles video submission (multipart form-data)
 */
exports.submitVideoRecording = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { taskId, duration, fileSize } = req.body;
    const videoFile = req.file;

    // Validate required fields
    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: 'Task ID is required'
      });
    }

    if (!videoFile) {
      return res.status(400).json({
        success: false,
        message: 'Video file is required'
      });
    }

    // 1. Verify Task exists (ContentItem)
    const course = await Course.findOne({
      "modules.chapters.contentItems._id": taskId
    });

    if (!course) {
      return res.status(404).json({ success: false, message: "Task not found." });
    }

    // Find item to get title
    let taskTitle = "Spoken English Task";
    let found = false;
    course.modules.forEach(m => {
      if (found) return;
      m.chapters.forEach(c => {
        if (found) return;
        const item = c.contentItems.find(i => i._id.toString() === taskId);
        if (item) {
          taskTitle = item.title;
          found = true;
        }
      });
    });

    // 2. Upload video to S3
    const uploadResult = await s3Service.uploadLMSContent(
      videoFile.path,
      videoFile.originalname,
      'video',
      videoFile.mimetype
    );

    // Clean up temp file
    if (fs.existsSync(videoFile.path)) {
      fs.unlinkSync(videoFile.path);
    }

    if (!uploadResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to upload video to storage',
        error: uploadResult.error
      });
    }

    const s3Url = uploadResult.url;

    // 3. Create Submission Record
    const submission = new Submission({
      studentId,
      courseId: course._id,
      taskId,
      taskTitle,
      type: "video",
      fileUrl: s3Url,
      thumbnailUrl: null,
      metadata: {
        duration: duration || 0,
        fileSize: fileSize || 0
      },
      status: "submitted",
      submittedAt: new Date()
    });

    await submission.save();

    // 4. Update StudentProgress to mark as "in_progress" or "submitted"
    // (Optional, usually we wait for grade to complete it)

    res.status(200).json({
      success: true,
      message: 'Video submitted successfully!',
      submission
    });

  } catch (error) {
    console.error('Error submitting video:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit video',
      error: error.message
    });
  }
};

/**
 * Get Student Submissions
 * GET /api/v2/lms/student/:studentId/courses/spoken-english/submissions
 * Returns student's submission history
 */
exports.getStudentSubmissions = async (req, res) => {
  try {
    const { studentId } = req.params;

    const submissions = await Submission.find({ studentId, type: 'video' }) // Video type specific to Spoken English here
      .sort({ submittedAt: -1 })
      .populate('courseId', 'title')
      .lean();

    // Map to response format
    const formattedSubmissions = submissions.map(sub => ({
      submissionId: sub._id,
      taskId: sub.taskId,
      taskTitle: sub.taskTitle,
      fileUrl: sub.fileUrl,
      duration: sub.metadata?.duration || 0,
      status: sub.status,
      grade: sub.grade?.quality || null,
      score: sub.grade?.points || null,
      feedback: sub.grade?.feedback || null,
      submittedAt: sub.submittedAt,
      gradedAt: sub.grade?.gradedAt || null,
      coachName: "Coach" // Populate actual coach name if gradedBy exists
    }));

    res.status(200).json({
      success: true,
      submissions: formattedSubmissions,
      totalSubmissions: formattedSubmissions.length,
      gradedSubmissions: formattedSubmissions.filter(s => s.status === 'graded').length,
      pendingSubmissions: formattedSubmissions.filter(s => s.status === 'submitted' || s.status === 'under_review').length
    });

  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load submissions',
      error: error.message
    });
  }
};
