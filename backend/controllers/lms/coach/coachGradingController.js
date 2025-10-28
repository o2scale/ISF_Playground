// backend/controllers/lms/coach/coachGradingController.js
const Submission = require("../../../models/Submission");
const User = require("../../../models/user");
const Course = require("../../../models/course");
const Notification = require("../../../models/notification");
const Coin = require("../../../models/coin");

/**
 * @route GET /api/v2/lms/coach/:coachId/submissions
 * @desc Get all submissions for grading with filters
 * @access Private (Coach only)
 */
exports.getSubmissions = async (req, res) => {
  try {
    const { coachId } = req.params;
    const { courseType, status, balagruhaId, dateRange, sortBy, limit, offset } = req.query;

    // Build filters object
    const filters = {
      courseType: courseType || "all",
      status: status || "pending",
      balagruhaId: balagruhaId || "all",
      dateRange: dateRange || "all",
      sortBy: sortBy || "oldest_first",
      limit: parseInt(limit) || 20,
      offset: parseInt(offset) || 0,
    };

    // Get submissions using static method
    const submissions = await Submission.findByCoach(coachId, filters);

    // Get stats
    const stats = await Submission.getCoachStats(coachId);

    // Format submissions for response
    const formattedSubmissions = submissions.map((submission) => ({
      id: submission._id,
      studentId: submission.studentId._id,
      studentName: `${submission.studentId.firstName} ${submission.studentId.lastName}`,
      studentClass: submission.studentId.class || "N/A",
      balagruhaId: submission.studentId.balagruha,
      balagruhaName: submission.studentId.balagruha?.name || "N/A",
      courseId: submission.courseId._id,
      courseTitle: submission.courseId.title,
      courseCategory: submission.courseId.category,
      taskId: submission.taskId,
      taskTitle: submission.taskTitle,
      submissionType: submission.submissionType,
      fileUrl: submission.fileUrl,
      thumbnailUrl: submission.thumbnailUrl,
      metadata: submission.metadata,
      submittedAt: submission.submittedAt,
      timeSpent: submission.timeSpent,
      status: submission.status,
      grade: submission.grade || null,
      draft: submission.draft || null,
    }));

    res.status(200).json({
      success: true,
      submissions: formattedSubmissions,
      totalSubmissions: formattedSubmissions.length,
      stats,
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch submissions",
    });
  }
};

/**
 * @route GET /api/v2/lms/coach/submissions/:submissionId
 * @desc Get single submission details
 * @access Private (Coach only)
 */
exports.getSubmissionById = async (req, res) => {
  try {
    const { submissionId } = req.params;

    const submission = await Submission.findById(submissionId)
      .populate("studentId", "firstName lastName class balagruha")
      .populate("courseId", "title category")
      .populate("grade.gradedBy", "firstName lastName");

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: "Submission not found",
      });
    }

    res.status(200).json({
      success: true,
      submission,
    });
  } catch (error) {
    console.error("Error fetching submission:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch submission",
    });
  }
};

/**
 * @route POST /api/v2/lms/coach/submissions/:submissionId/grade
 * @desc Submit grade for a submission
 * @access Private (Coach only)
 */
exports.submitGrade = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { quality, coinsAwarded, feedback, evaluationCriteria, gradedBy } = req.body;

    // Validation
    if (!quality) {
      return res.status(400).json({
        success: false,
        error: "Quality rating is required",
      });
    }

    if (coinsAwarded === undefined || coinsAwarded === null) {
      return res.status(400).json({
        success: false,
        error: "Coin amount is required",
      });
    }

    if (coinsAwarded < 0 || coinsAwarded > 100) {
      return res.status(400).json({
        success: false,
        error: "Coin amount must be between 0 and 100",
      });
    }

    if (feedback && feedback.length > 500) {
      return res.status(400).json({
        success: false,
        error: "Feedback must not exceed 500 characters",
      });
    }

    // Find submission
    const submission = await Submission.findById(submissionId).populate("studentId courseId");

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: "Submission not found",
      });
    }

    if (submission.status === "graded") {
      return res.status(400).json({
        success: false,
        error: "Submission already graded",
      });
    }

    // Grade data
    const gradeData = {
      quality,
      coinsAwarded,
      feedback: feedback || null,
      evaluationCriteria: evaluationCriteria || {},
      gradedBy,
    };

    // Mark as graded
    await submission.markAsGraded(gradeData);

    // Update student coin balance
    if (coinsAwarded > 0) {
      const coinTransaction = new Coin({
        userId: submission.studentId._id,
        amount: coinsAwarded,
        type: "earned",
        source: "submission_grade",
        description: `Graded submission for "${submission.taskTitle}"`,
        metadata: {
          submissionId: submission._id,
          courseId: submission.courseId._id,
          quality,
        },
      });
      await coinTransaction.save();

      // Update user's coin balance
      await User.findByIdAndUpdate(submission.studentId._id, {
        $inc: { coins: coinsAwarded },
      });
    }

    // Send notification to student
    const coach = await User.findById(gradedBy);
    const notificationMessage = `Coach ${coach.firstName} ${coach.lastName} graded your "${submission.taskTitle}" submission! ${
      coinsAwarded > 0 ? `+${coinsAwarded} coins` : ""
    }`;

    const notification = new Notification({
      user: submission.studentId._id,
      type: "submission_graded",
      message: notificationMessage,
      data: {
        submissionId: submission._id,
        courseId: submission.courseId._id,
        coinsAwarded,
        quality,
        feedback: feedback || null,
      },
    });
    await notification.save();

    // Get updated student coin balance
    const student = await User.findById(submission.studentId._id);

    res.status(200).json({
      success: true,
      submissionId: submission._id,
      studentId: submission.studentId._id,
      studentCoinBalance: student.coins || 0,
      message: `Grade submitted successfully! ${submission.studentId.firstName} ${submission.studentId.lastName} has been notified and earned ${coinsAwarded} ISF Coins.`,
    });
  } catch (error) {
    console.error("Error submitting grade:", error);
    res.status(500).json({
      success: false,
      error: "Failed to submit grade",
    });
  }
};

/**
 * @route POST /api/v2/lms/coach/submissions/bulk-grade
 * @desc Bulk grade multiple submissions
 * @access Private (Coach only)
 */
exports.bulkGrade = async (req, res) => {
  try {
    const { submissionIds, quality, coinsAwarded, feedback, gradedBy } = req.body;

    // Validation
    if (!submissionIds || !Array.isArray(submissionIds) || submissionIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: "At least one submission ID is required",
      });
    }

    if (!quality) {
      return res.status(400).json({
        success: false,
        error: "Quality rating is required",
      });
    }

    if (coinsAwarded === undefined || coinsAwarded === null) {
      return res.status(400).json({
        success: false,
        error: "Coin amount is required",
      });
    }

    if (coinsAwarded < 0 || coinsAwarded > 100) {
      return res.status(400).json({
        success: false,
        error: "Coin amount must be between 0 and 100",
      });
    }

    const gradedCount = 0;
    const failedSubmissions = [];

    // Get coach info
    const coach = await User.findById(gradedBy);

    // Grade each submission
    for (const submissionId of submissionIds) {
      try {
        const submission = await Submission.findById(submissionId).populate("studentId courseId");

        if (!submission || submission.status === "graded") {
          failedSubmissions.push(submissionId);
          continue;
        }

        // Grade data
        const gradeData = {
          quality,
          coinsAwarded,
          feedback: feedback || null,
          evaluationCriteria: {},
          gradedBy,
        };

        // Mark as graded
        await submission.markAsGraded(gradeData);

        // Update student coin balance
        if (coinsAwarded > 0) {
          const coinTransaction = new Coin({
            userId: submission.studentId._id,
            amount: coinsAwarded,
            type: "earned",
            source: "submission_grade",
            description: `Graded submission for "${submission.taskTitle}"`,
            metadata: {
              submissionId: submission._id,
              courseId: submission.courseId._id,
              quality,
            },
          });
          await coinTransaction.save();

          await User.findByIdAndUpdate(submission.studentId._id, {
            $inc: { coins: coinsAwarded },
          });
        }

        // Send notification
        const notificationMessage = `Coach ${coach.firstName} ${coach.lastName} graded your "${submission.taskTitle}" submission! ${
          coinsAwarded > 0 ? `+${coinsAwarded} coins` : ""
        }`;

        const notification = new Notification({
          user: submission.studentId._id,
          type: "submission_graded",
          message: notificationMessage,
          data: {
            submissionId: submission._id,
            courseId: submission.courseId._id,
            coinsAwarded,
            quality,
            feedback: feedback || null,
          },
        });
        await notification.save();

        gradedCount++;
      } catch (error) {
        console.error(`Error grading submission ${submissionId}:`, error);
        failedSubmissions.push(submissionId);
      }
    }

    res.status(200).json({
      success: true,
      gradedCount,
      failedSubmissions,
      message: `${gradedCount} submissions graded successfully! Students notified.`,
    });
  } catch (error) {
    console.error("Error bulk grading submissions:", error);
    res.status(500).json({
      success: false,
      error: "Failed to bulk grade submissions",
    });
  }
};

/**
 * @route PUT /api/v2/lms/coach/submissions/:submissionId/draft
 * @desc Save grading draft (auto-save)
 * @access Private (Coach only)
 */
exports.saveDraft = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { quality, coinsAwarded, feedback } = req.body;

    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: "Submission not found",
      });
    }

    // Save draft
    const draftData = {
      quality: quality || null,
      coinsAwarded: coinsAwarded || null,
      feedback: feedback || null,
    };

    await submission.saveDraft(draftData);

    res.status(200).json({
      success: true,
      message: "Draft saved",
    });
  } catch (error) {
    console.error("Error saving draft:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save draft",
    });
  }
};

/**
 * @route PUT /api/v2/lms/coach/submissions/:submissionId/flag
 * @desc Flag submission for admin review
 * @access Private (Coach only)
 */
exports.flagSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { reason, flaggedBy } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        error: "Reason is required to flag submission",
      });
    }

    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: "Submission not found",
      });
    }

    // Flag submission
    await submission.flagSubmission(reason, flaggedBy);

    // Send notification to admin
    const admins = await User.find({ role: "admin" });
    const coach = await User.findById(flaggedBy);

    for (const admin of admins) {
      const notification = new Notification({
        user: admin._id,
        type: "submission_flagged",
        message: `Coach ${coach.firstName} ${coach.lastName} flagged a submission for review: ${reason}`,
        data: {
          submissionId: submission._id,
          reason,
          flaggedBy,
        },
      });
      await notification.save();
    }

    res.status(200).json({
      success: true,
      submissionId: submission._id,
      status: "flagged",
      message: "Submission flagged for admin review",
    });
  } catch (error) {
    console.error("Error flagging submission:", error);
    res.status(500).json({
      success: false,
      error: "Failed to flag submission",
    });
  }
};

/**
 * @route PUT /api/v2/lms/coach/submissions/:submissionId/skip
 * @desc Skip submission for later review
 * @access Private (Coach only)
 */
exports.skipSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;

    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: "Submission not found",
      });
    }

    // Mark as skipped
    await submission.markAsSkipped();

    res.status(200).json({
      success: true,
      submissionId: submission._id,
      message: "Submission marked for later review",
    });
  } catch (error) {
    console.error("Error skipping submission:", error);
    res.status(500).json({
      success: false,
      error: "Failed to skip submission",
    });
  }
};
