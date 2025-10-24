const Course = require("../../../models/course");
const mongoose = require("mongoose");

// ==================== COURSE CRUD OPERATIONS ====================

/**
 * GET /api/v2/lms/admin/courses
 * Get all courses with optional filters
 */
exports.getAllCourses = async (req, res) => {
  try {
    const { status, category, search } = req.query;
    const filter = {};

    // Apply filters
    if (status && ["draft", "published", "archived"].includes(status)) {
      filter.status = status;
    }
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
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    // Add virtual counts to response
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
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * GET /api/v2/lms/admin/courses/:id
 * Get single course by ID
 */
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const course = await Course.findById(id).populate("createdBy", "name email");

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const courseWithCounts = course.toObject({ virtuals: true });

    res.status(200).json({
      success: true,
      data: courseWithCounts,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * POST /api/v2/lms/admin/courses
 * Create new course
 */
exports.createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      difficultyLevel,
      thumbnail,
      icon,
    } = req.body;

    // Validation
    if (!title || !description || !category || !difficultyLevel) {
      return res.status(400).json({
        error: "Title, description, category, and difficulty level are required",
      });
    }

    // Validate category
    const validCategories = [
      "Computer Apps",
      "Art",
      "Spoken English",
      "Life Skills",
    ];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        error: `Category must be one of: ${validCategories.join(", ")}`,
      });
    }

    // Validate difficulty level
    const validDifficulties = ["Beginner", "Intermediate", "Advanced"];
    if (!validDifficulties.includes(difficultyLevel)) {
      return res.status(400).json({
        error: `Difficulty level must be one of: ${validDifficulties.join(", ")}`,
      });
    }

    const course = new Course({
      title: title.trim(),
      description: description.trim(),
      category,
      difficultyLevel,
      thumbnail,
      icon: icon || "📚",
      createdBy: req.user._id, // From auth middleware
      status: "draft",
      modules: [],
    });

    await course.save();

    res.status(201).json({
      success: true,
      courseId: course._id,
      message: "Course created successfully with Draft status",
      data: course,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

/**
 * PUT /api/v2/lms/admin/courses/:id
 * Update course metadata
 */
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Allowed fields for update
    const allowedUpdates = [
      "title",
      "description",
      "category",
      "difficultyLevel",
      "thumbnail",
      "icon",
      "enableCoinReward",
      "coinsOnCompletion",
      "translations",
    ];

    // Apply updates
    Object.keys(updates).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        course[key] = updates[key];
      }
    });

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * DELETE /api/v2/lms/admin/courses/:id
 * Delete course permanently
 */
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted permanently",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ==================== STRUCTURE MANAGEMENT ====================

/**
 * POST /api/v2/lms/admin/courses/:courseId/modules
 * Add module to course
 */
exports.addModule = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Module title is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Calculate order (append to end)
    const order = course.modules.length;

    course.modules.push({
      title: title.trim(),
      description: description?.trim() || "",
      order,
      chapters: [],
    });

    await course.save();

    const addedModule = course.modules[course.modules.length - 1];

    res.status(201).json({
      success: true,
      moduleId: addedModule._id,
      message: "Module added successfully",
      data: addedModule,
    });
  } catch (error) {
    console.error("Error adding module:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * POST /api/v2/lms/admin/courses/:courseId/modules/:moduleId/chapters
 * Add chapter to module
 */
exports.addChapter = async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Chapter title is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const module = course.modules.id(moduleId);
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }

    // Calculate order (append to end)
    const order = module.chapters.length;

    module.chapters.push({
      title: title.trim(),
      description: description?.trim() || "",
      order,
      contentItems: [],
    });

    await course.save();

    const addedChapter = module.chapters[module.chapters.length - 1];

    res.status(201).json({
      success: true,
      chapterId: addedChapter._id,
      message: "Chapter added successfully",
      data: addedChapter,
    });
  } catch (error) {
    console.error("Error adding chapter:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * POST /api/v2/lms/admin/courses/:courseId/modules/:moduleId/chapters/:chapterId/content
 * Add content item to chapter
 */
exports.addContentItem = async (req, res) => {
  try {
    const { courseId, moduleId, chapterId } = req.params;
    const {
      type,
      title,
      description,
      fileUrl,
      metadata,
      quizData,
      textContent,
      externalUrl,
      taskData,
    } = req.body;

    if (!type || !title) {
      return res.status(400).json({ error: "Type and title are required" });
    }

    const validTypes = [
      "video",
      "pdf",
      "audio",
      "image",
      "text",
      "link",
      "quiz",
      "task",
    ];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        error: `Type must be one of: ${validTypes.join(", ")}`,
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const module = course.modules.id(moduleId);
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }

    const chapter = module.chapters.id(chapterId);
    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    // Calculate order (append to end)
    const order = chapter.contentItems?.length || 0;

    const contentItem = {
      type,
      title: title.trim(),
      description: description?.trim() || "",
      order,
      fileUrl,
      metadata,
      quizData,
      textContent,
      externalUrl,
      taskData,
    };

    if (!chapter.contentItems) {
      chapter.contentItems = [];
    }
    chapter.contentItems.push(contentItem);

    await course.save();

    const addedContentItem =
      chapter.contentItems[chapter.contentItems.length - 1];

    res.status(201).json({
      success: true,
      contentItemId: addedContentItem._id,
      message: "Content item added successfully",
      data: addedContentItem,
    });
  } catch (error) {
    console.error("Error adding content item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * PUT /api/v2/lms/admin/courses/:courseId/reorder
 * Reorder modules, chapters, or content items
 */
exports.reorderItems = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { level, parentId, orderedIds } = req.body;

    if (!level || !orderedIds || !Array.isArray(orderedIds)) {
      return res.status(400).json({
        error: "Level and orderedIds array are required",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    if (level === "module") {
      // Reorder modules
      const moduleMap = new Map(
        course.modules.map((m) => [m._id.toString(), m])
      );
      course.modules = orderedIds
        .map((id, index) => {
          const module = moduleMap.get(id);
          if (module) {
            module.order = index;
            return module;
          }
          return null;
        })
        .filter(Boolean);
    } else if (level === "chapter" && parentId) {
      // Reorder chapters within a module
      const module = course.modules.id(parentId);
      if (!module) {
        return res.status(404).json({ error: "Module not found" });
      }

      const chapterMap = new Map(
        module.chapters.map((c) => [c._id.toString(), c])
      );
      module.chapters = orderedIds
        .map((id, index) => {
          const chapter = chapterMap.get(id);
          if (chapter) {
            chapter.order = index;
            return chapter;
          }
          return null;
        })
        .filter(Boolean);
    } else if (level === "content_item" && parentId) {
      // Reorder content items within a chapter
      // parentId is chapterId in this case, need to find module first
      let targetChapter = null;
      for (const module of course.modules) {
        const chapter = module.chapters.id(parentId);
        if (chapter) {
          targetChapter = chapter;
          break;
        }
      }

      if (!targetChapter) {
        return res.status(404).json({ error: "Chapter not found" });
      }

      if (!targetChapter.contentItems) {
        targetChapter.contentItems = [];
      }

      const contentItemMap = new Map(
        targetChapter.contentItems.map((c) => [c._id.toString(), c])
      );
      targetChapter.contentItems = orderedIds
        .map((id, index) => {
          const contentItem = contentItemMap.get(id);
          if (contentItem) {
            contentItem.order = index;
            return contentItem;
          }
          return null;
        })
        .filter(Boolean);
    } else {
      return res.status(400).json({ error: "Invalid level or missing parentId" });
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
    });
  } catch (error) {
    console.error("Error reordering items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ==================== PUBLISHING WORKFLOW ====================

/**
 * Validate course before publishing
 */
const validateCourseForPublish = (course) => {
  const errors = [];

  if (!course.title) errors.push("Missing course title");
  if (!course.description) errors.push("Missing course description");
  if (!course.category) errors.push("Missing category");
  if (!course.difficultyLevel) errors.push("Missing difficulty level");
  if (!course.thumbnail) errors.push("Missing thumbnail");

  if (!course.modules || course.modules.length === 0) {
    errors.push("Course must have at least one module");
  } else {
    course.modules.forEach((module, mIndex) => {
      if (!module.chapters || module.chapters.length === 0) {
        errors.push(`Module ${mIndex + 1} has no chapters`);
      } else {
        module.chapters.forEach((chapter, cIndex) => {
          if (!chapter.contentItems || chapter.contentItems.length === 0) {
            errors.push(
              `Module ${mIndex + 1}, Chapter ${cIndex + 1} has no content items`
            );
          }
        });
      }
    });
  }

  return errors;
};

/**
 * PUT /api/v2/lms/admin/courses/:courseId/publish
 * Publish course
 */
exports.publishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Validate course
    const validationErrors = validateCourseForPublish(course);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: validationErrors,
        message: "Cannot publish: Missing required fields or content",
      });
    }

    // Publish course
    await course.publish();

    res.status(200).json({
      success: true,
      publishedAt: course.publishedAt,
      message: "Course published successfully",
    });
  } catch (error) {
    console.error("Error publishing course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * PUT /api/v2/lms/admin/courses/:courseId/archive
 * Archive course
 */
exports.archiveCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Archive course
    await course.archive();

    res.status(200).json({
      success: true,
      archivedAt: course.archivedAt,
      message: "Course archived successfully",
    });
  } catch (error) {
    console.error("Error archiving course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * PUT /api/v2/lms/admin/courses/:courseId/restore
 * Restore archived course
 */
exports.restoreCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { restoreToStatus } = req.body;

    if (
      restoreToStatus &&
      !["published", "draft"].includes(restoreToStatus)
    ) {
      return res.status(400).json({
        error: "restoreToStatus must be 'published' or 'draft'",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Restore course
    await course.restore(restoreToStatus || "published");

    res.status(200).json({
      success: true,
      message: `Course restored to ${course.status} status`,
    });
  } catch (error) {
    console.error("Error restoring course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * PUT /api/v2/lms/admin/courses/:courseId/duplicate
 * Duplicate course (bonus feature)
 */
exports.duplicateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const originalCourse = await Course.findById(courseId);
    if (!originalCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Create duplicate
    const duplicateData = originalCourse.toObject();
    delete duplicateData._id;
    delete duplicateData.createdAt;
    delete duplicateData.updatedAt;
    duplicateData.title = `${duplicateData.title} (Copy)`;
    duplicateData.status = "draft";
    duplicateData.publishedAt = null;
    duplicateData.archivedAt = null;
    duplicateData.createdBy = req.user._id;

    // Remove _id from nested documents
    duplicateData.modules = duplicateData.modules.map((module) => {
      delete module._id;
      module.chapters = module.chapters.map((chapter) => {
        delete chapter._id;
        if (chapter.contentItems) {
          chapter.contentItems = chapter.contentItems.map((item) => {
            delete item._id;
            return item;
          });
        }
        return chapter;
      });
      return module;
    });

    const duplicateCourse = new Course(duplicateData);
    await duplicateCourse.save();

    res.status(201).json({
      success: true,
      courseId: duplicateCourse._id,
      message: "Course duplicated successfully",
      data: duplicateCourse,
    });
  } catch (error) {
    console.error("Error duplicating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
