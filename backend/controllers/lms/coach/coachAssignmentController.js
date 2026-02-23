const CourseAssignment = require("../../../models/CourseAssignment");
const Course = require("../../../models/course");
const User = require("../../../models/user");
const Notification = require("../../../models/notification");
const mongoose = require("mongoose");

// ====================COURSE ASSIGNMENT OPERATIONS ====================

/**
 * GET /api/v2/lms/coach/courses/published
 * Get all published courses for assignment
 */
exports.getPublishedCourses = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = { status: "published" };

    // Apply filters
    if (category) {
      filter.category = category;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const courses = await Course.find(filter)
      .select("title description category difficultyLevel thumbnail icon")
      .sort({ createdAt: -1 });

    // Add content item count
    const coursesWithCounts = courses.map((course) => {
      const courseObj = course.toObject({ virtuals: true });
      return courseObj;
    });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: coursesWithCounts,
    });
  } catch (error) {
    console.error("Error fetching published courses:", error);
    console.error("Stack trace:", error.stack);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/**
 * GET /api/v2/lms/coach/:coachId/students
 * Get all students in coach's Balagruha
 */
exports.getCoachStudents = async (req, res) => {
  try {
    const { coachId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(coachId)) {
      return res.status(400).json({ error: "Invalid coach ID" });
    }

    // Get coach to find their Balagruhas
    const coach = await User.findById(coachId).populate("balagruhaIds");

    if (!coach) {
      return res.status(404).json({ error: "Coach not found" });
    }

    if (!coach.balagruhaIds || coach.balagruhaIds.length === 0) {
      return res.status(404).json({ error: "Coach not assigned to any Balagruha" });
    }

    // Get all students in the coach's Balagruhas with Balagruha info
    const students = await User.find({
      balagruhaIds: { $in: coach.balagruhaIds },
      role: "student",
    })
      .populate("balagruhaIds", "name")
      .select("name email userId balagruhaIds")
      .sort({ name: 1 });

    // Map students to include their Balagruha names
    const studentsWithBalagruha = students.map(student => {
      const studentObj = student.toObject();
      return {
        ...studentObj,
        balagruhaNames: studentObj.balagruhaIds?.map(bg => bg.name).filter(Boolean) || []
      };
    });

    res.status(200).json({
      success: true,
      balagruhas: coach.balagruhaIds.map(bg => ({
        id: bg._id,
        name: bg.name,
      })),
      count: students.length,
      data: studentsWithBalagruha,
    });
  } catch (error) {
    console.error("Error fetching coach students:", error);
    console.error("Stack trace:", error.stack);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/**
 * POST /api/v2/lms/coach/assignments
 * Create new course assignment
 */
exports.createAssignment = async (req, res) => {
  try {
    const {
      courseId,
      assignedBy,
      assignedTo,
      dueDate,
      notifications,
    } = req.body;

    // Validation
    if (!courseId || !assignedBy || !assignedTo) {
      return res.status(400).json({
        error: "Course ID, assigned by, and assigned to are required",
      });
    }

    if (!["balagruha", "students"].includes(assignedTo.type)) {
      return res.status(400).json({
        error: "Assignment type must be 'balagruha' or 'students'",
      });
    }

    // Verify course exists and is published
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    if (course.status !== "published") {
      return res.status(400).json({ error: "Can only assign published courses" });
    }

    // Verify assigner exists
    const assigner = await User.findById(assignedBy);
    if (!assigner) {
      return res.status(404).json({ error: "Assigner not found" });
    }

    // Check if assigner is admin or coach
    const isAdmin = assigner.role === "admin";

    // Get list of student IDs
    let studentIds = [];
    if (assignedTo.type === "balagruha") {
      // Support multiple Balagruhas (new) or single Balagruha (backward compat)
      const balagruhaIds = assignedTo.balagruhaIds || (assignedTo.balagruhaId ? [assignedTo.balagruhaId] : []);
      
      if (balagruhaIds.length === 0) {
        return res.status(400).json({ error: "No Balagruhas selected" });
      }

      // For non-admin (coach), verify they have access to the Balagruhas
      if (!isAdmin) {
        const unauthorizedBalagruhas = balagruhaIds.filter(
          bgId => !assigner.balagruhaIds.some(assignerBgId => assignerBgId.toString() === bgId.toString())
        );
        if (unauthorizedBalagruhas.length > 0) {
          return res.status(403).json({ error: "Not authorized to assign to some Balagruhas" });
        }
      }

      // Get all students in the selected Balagruhas
      const students = await User.find({
        balagruhaIds: { $in: balagruhaIds },
        role: "student",
      }).select("_id");
      studentIds = students.map((s) => s._id);
    } else {
      studentIds = assignedTo.studentIds;
    }

    // Validate due date if provided
    if (dueDate) {
      const dueDateObj = new Date(dueDate);
      if (dueDateObj < new Date()) {
        return res.status(400).json({ error: "Due date must be in the future" });
      }
    }

    // Prepare assignedTo with balagruhaIds if applicable
    const assignedToData = { ...assignedTo };
    if (assignedTo.type === "balagruha") {
      const balagruhaIds = assignedTo.balagruhaIds || (assignedTo.balagruhaId ? [assignedTo.balagruhaId] : []);
      assignedToData.balagruhaIds = balagruhaIds;
      assignedToData.balagruhaId = balagruhaIds.length > 0 ? balagruhaIds[0] : null; // Backward compat
    }

    // Create assignment
    const assignment = new CourseAssignment({
      courseId,
      assignedBy,
      assignedTo: assignedToData,
      dueDate: dueDate || null,
      notifications: notifications || { inApp: true, email: true },
      progress: {
        totalStudents: studentIds.length,
        studentsStarted: 0,
        studentsCompleted: 0,
        averageCompletionPercentage: 0,
      },
    });

    await assignment.save();

    // Send notifications to students
    let notificationsSent = { inApp: 0, email: 0 };
    if (notifications?.inApp || notifications === undefined) {
      // Send in-app notifications
      const notificationPromises = studentIds.map((studentId) => {
        return Notification.create({
          userId: studentId,
          type: "PERSONAL",
          category: "TASK_ASSIGNED",
          title: "New Course Assigned",
          message: `${isAdmin ? 'Admin' : 'Coach'} ${assigner.name || assigner.firstName || 'Unknown'} assigned you "${course.title}"`,
          data: {
            courseId: course._id,
            assignmentId: assignment._id,
            dueDate: dueDate || null,
          },
        });
      });

      await Promise.all(notificationPromises);
      notificationsSent.inApp = studentIds.length;

      // TODO: Email notifications (if notifications.email is true)
      // This would integrate with email service
      if (notifications?.email) {
        // Email logic would go here
        notificationsSent.email = studentIds.length;
      }
    }

    // Update assignment with notification status
    assignment.notifications.sent = true;
    assignment.notifications.sentAt = new Date();
    assignment.notifications.recipientCount = notificationsSent.inApp;
    await assignment.save();

    res.status(201).json({
      success: true,
      message: "Course assigned successfully",
      data: {
        assignmentId: assignment._id,
        studentsAssigned: studentIds.length,
        notificationsSent,
      },
    });
  } catch (error) {
    console.error("Error creating assignment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * GET /api/v2/lms/coach/:coachId/assignments
 * Get all assignments created by coach
 */
exports.getCoachAssignments = async (req, res) => {
  try {
    const { coachId } = req.params;
    const { status, courseId, search } = req.query;

    if (!mongoose.Types.ObjectId.isValid(coachId)) {
      return res.status(400).json({ error: "Invalid coach ID" });
    }

    const filter = { assignedBy: coachId };

    // Apply filters
    if (status && ["active", "completed", "expired", "cancelled"].includes(status)) {
      filter.status = status;
    }
    if (courseId && mongoose.Types.ObjectId.isValid(courseId)) {
      filter.courseId = courseId;
    }

    const assignments = await CourseAssignment.find(filter)
      .populate("courseId", "title category thumbnail difficultyLevel")
      .populate("assignedTo.balagruhaId", "name")
      .populate("assignedBy", "firstName lastName")
      .sort({ createdAt: -1 });

    // Filter by search if provided
    let filteredAssignments = assignments;
    if (search) {
      filteredAssignments = assignments.filter((assignment) => {
        const courseTitle = assignment.courseId?.title || "";
        const balagruhaName = assignment.assignedTo.balagruhaId?.name || "";
        const searchLower = search.toLowerCase();
        return (
          courseTitle.toLowerCase().includes(searchLower) ||
          balagruhaName.toLowerCase().includes(searchLower)
        );
      });
    }

    res.status(200).json({
      success: true,
      count: filteredAssignments.length,
      data: filteredAssignments,
    });
  } catch (error) {
    console.error("Error fetching coach assignments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * GET /api/v2/lms/coach/assignments/:assignmentId
 * Get single assignment by ID
 */
exports.getAssignmentById = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({ error: "Invalid assignment ID" });
    }

    const assignment = await CourseAssignment.findById(assignmentId)
      .populate("courseId", "title description category thumbnail difficultyLevel")
      .populate("assignedTo.balagruhaId", "name")
      .populate("assignedTo.studentIds", "firstName lastName email studentId class")
      .populate("assignedBy", "firstName lastName email");

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const assignmentWithVirtuals = assignment.toObject({ virtuals: true });

    res.status(200).json({
      success: true,
      data: assignmentWithVirtuals,
    });
  } catch (error) {
    console.error("Error fetching assignment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * PUT /api/v2/lms/coach/assignments/:assignmentId
 * Update assignment (due date, status)
 */
exports.updateAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { dueDate, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({ error: "Invalid assignment ID" });
    }

    const assignment = await CourseAssignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    // Update due date if provided
    if (dueDate !== undefined) {
      if (dueDate === null) {
        assignment.dueDate = null;
      } else {
        const dueDateObj = new Date(dueDate);
        if (dueDateObj < new Date()) {
          return res.status(400).json({ error: "Due date must be in the future" });
        }
        assignment.dueDate = dueDateObj;
      }
    }

    // Update status if provided
    if (status) {
      if (!["active", "completed", "expired", "cancelled"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      assignment.status = status;
    }

    await assignment.save();

    res.status(200).json({
      success: true,
      message: "Assignment updated successfully",
      data: assignment,
    });
  } catch (error) {
    console.error("Error updating assignment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * DELETE /api/v2/lms/coach/assignments/:assignmentId
 * Unassign/cancel course assignment
 */
exports.deleteAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({ error: "Invalid assignment ID" });
    }

    const assignment = await CourseAssignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    // Mark as cancelled instead of deleting
    assignment.status = "cancelled";
    await assignment.save();

    res.status(200).json({
      success: true,
      message: "Assignment cancelled successfully",
    });
  } catch (error) {
    console.error("Error deleting assignment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * GET /api/v2/lms/coach/:coachId/stats
 * Get coach assignment statistics
 */
exports.getCoachStats = async (req, res) => {
  try {
    const { coachId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(coachId)) {
      return res.status(400).json({ error: "Invalid coach ID" });
    }

    const stats = await CourseAssignment.getCoachStats(coachId);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching coach stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * PUT /api/v2/lms/coach/assignments/:assignmentId/progress
 * Update assignment progress
 */
exports.updateAssignmentProgress = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { studentsStarted, studentsCompleted, averageCompletionPercentage } = req.body;

    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({ error: "Invalid assignment ID" });
    }

    const assignment = await CourseAssignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    // Update progress
    const progressData = {};
    if (studentsStarted !== undefined) progressData.studentsStarted = studentsStarted;
    if (studentsCompleted !== undefined) progressData.studentsCompleted = studentsCompleted;
    if (averageCompletionPercentage !== undefined)
      progressData.averageCompletionPercentage = averageCompletionPercentage;

    await assignment.updateProgress(progressData);

    res.status(200).json({
      success: true,
      message: "Progress updated successfully",
      data: assignment,
    });
  } catch (error) {
    console.error("Error updating assignment progress:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
