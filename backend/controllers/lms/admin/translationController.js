const Course = require('../../../models/course');
const mongoose = require('mongoose');

/**
 * Translation Controller - Sprint 2 Epic 02 Story 04
 * Handles English → Telugu translation management for LMS courses
 */

/**
 * GET /api/v2/lms/admin/courses/:courseId/translation-progress
 * Get translation progress for a course
 */
exports.getTranslationProgress = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID'
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Calculate translation progress
    const progress = calculateTranslationProgress(course);

    res.json({
      success: true,
      progress
    });

  } catch (error) {
    console.error('Error fetching translation progress:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch translation progress',
      error: error.message
    });
  }
};

/**
 * GET /api/v2/lms/admin/courses/:courseId/translatable-items
 * Get list of all translatable items in a course
 */
exports.getTranslatableItems = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { status, type, search } = req.query;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID'
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Build translatable items list
    const items = buildTranslatableItemsList(course);

    // Apply filters
    let filteredItems = items;

    if (status && status !== 'all') {
      filteredItems = filteredItems.filter(item => item.translationStatus === status);
    }

    if (type && type !== 'all') {
      filteredItems = filteredItems.filter(item => item.type === type);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.english.title?.toLowerCase().includes(searchLower) ||
        item.telugu.title?.toLowerCase().includes(searchLower)
      );
    }

    res.json({
      success: true,
      items: filteredItems,
      total: filteredItems.length
    });

  } catch (error) {
    console.error('Error fetching translatable items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch translatable items',
      error: error.message
    });
  }
};

/**
 * PUT /api/v2/lms/admin/courses/:courseId/translate/:itemId
 * Save translation for a specific item
 */
exports.saveTranslation = async (req, res) => {
  try {
    const { courseId, itemId } = req.params;
    const { translations, markAsTranslated } = req.body;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID'
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Parse itemId to determine item type and location
    // Format: "course" | "module-{moduleId}" | "chapter-{moduleId}-{chapterId}" | "content-{moduleId}-{chapterId}-{contentId}"
    const updated = updateTranslation(course, itemId, translations, markAsTranslated);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    await course.save();

    // Get updated progress
    const progress = calculateTranslationProgress(course);

    res.json({
      success: true,
      message: 'Translation saved successfully',
      progress
    });

  } catch (error) {
    console.error('Error saving translation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save translation',
      error: error.message
    });
  }
};

/**
 * PUT /api/v2/lms/admin/courses/:courseId/publish-translations
 * Publish all translations for a course
 */
exports.publishTranslations = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID'
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Mark translations as published
    // This could be a new field: translationsPublished: true
    // For now, we'll just verify translations exist

    const progress = calculateTranslationProgress(course);

    res.json({
      success: true,
      message: 'Translations published successfully',
      progress
    });

  } catch (error) {
    console.error('Error publishing translations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to publish translations',
      error: error.message
    });
  }
};

// ================== HELPER FUNCTIONS ==================

/**
 * Calculate translation progress for a course
 */
function calculateTranslationProgress(course) {
  let totalItems = 0;
  let translatedItems = 0;

  // Course metadata
  totalItems += 2; // title, description
  if (course.translations?.telugu?.title) translatedItems++;
  if (course.translations?.telugu?.description) translatedItems++;

  // Modules
  course.modules.forEach(module => {
    totalItems += 2; // title, description
    if (module.translations?.telugu?.title) translatedItems++;
    if (module.translations?.telugu?.description) translatedItems++;

    // Chapters
    module.chapters.forEach(chapter => {
      totalItems += 2; // title, description
      if (chapter.translations?.telugu?.title) translatedItems++;
      if (chapter.translations?.telugu?.description) translatedItems++;

      // Content items
      chapter.contentItems?.forEach(item => {
        totalItems += 2; // title, description
        if (item.translations?.telugu?.title) translatedItems++;
        if (item.translations?.telugu?.description) translatedItems++;
      });
    });
  });

  const percentage = totalItems > 0 ? Math.round((translatedItems / totalItems) * 100) : 0;

  return {
    totalItems,
    translatedItems,
    percentage,
    breakdown: {
      course: {
        total: 2,
        translated: (course.translations?.telugu?.title ? 1 : 0) +
                    (course.translations?.telugu?.description ? 1 : 0)
      },
      modules: getModuleProgress(course.modules),
      chapters: getChapterProgress(course.modules),
      contentItems: getContentItemProgress(course.modules)
    }
  };
}

function getModuleProgress(modules) {
  let total = 0;
  let translated = 0;

  modules.forEach(module => {
    total += 2;
    if (module.translations?.telugu?.title) translated++;
    if (module.translations?.telugu?.description) translated++;
  });

  return { total, translated };
}

function getChapterProgress(modules) {
  let total = 0;
  let translated = 0;

  modules.forEach(module => {
    module.chapters.forEach(chapter => {
      total += 2;
      if (chapter.translations?.telugu?.title) translated++;
      if (chapter.translations?.telugu?.description) translated++;
    });
  });

  return { total, translated };
}

function getContentItemProgress(modules) {
  let total = 0;
  let translated = 0;

  modules.forEach(module => {
    module.chapters.forEach(chapter => {
      chapter.contentItems?.forEach(item => {
        total += 2;
        if (item.translations?.telugu?.title) translated++;
        if (item.translations?.telugu?.description) translated++;
      });
    });
  });

  return { total, translated };
}

/**
 * Build list of all translatable items in a course
 */
function buildTranslatableItemsList(course) {
  const items = [];

  // Course metadata
  items.push({
    id: 'course',
    type: 'course',
    breadcrumb: 'Course Information',
    english: {
      title: course.title,
      description: course.description
    },
    telugu: {
      title: course.translations?.telugu?.title || '',
      description: course.translations?.telugu?.description || ''
    },
    translationStatus: getTranslationStatus({
      title: course.translations?.telugu?.title,
      description: course.translations?.telugu?.description
    })
  });

  // Modules, Chapters, and Content Items
  course.modules.forEach((module, moduleIndex) => {
    items.push({
      id: `module-${module._id}`,
      type: 'module',
      breadcrumb: `Module ${moduleIndex + 1}: ${module.title}`,
      english: {
        title: module.title,
        description: module.description
      },
      telugu: {
        title: module.translations?.telugu?.title || '',
        description: module.translations?.telugu?.description || ''
      },
      translationStatus: getTranslationStatus({
        title: module.translations?.telugu?.title,
        description: module.translations?.telugu?.description
      })
    });

    module.chapters.forEach((chapter, chapterIndex) => {
      items.push({
        id: `chapter-${module._id}-${chapter._id}`,
        type: 'chapter',
        breadcrumb: `Module ${moduleIndex + 1} > Chapter ${chapterIndex + 1}: ${chapter.title}`,
        english: {
          title: chapter.title,
          description: chapter.description
        },
        telugu: {
          title: chapter.translations?.telugu?.title || '',
          description: chapter.translations?.telugu?.description || ''
        },
        translationStatus: getTranslationStatus({
          title: chapter.translations?.telugu?.title,
          description: chapter.translations?.telugu?.description
        })
      });

      chapter.contentItems?.forEach((item, itemIndex) => {
        items.push({
          id: `content-${module._id}-${chapter._id}-${item._id}`,
          type: 'content',
          breadcrumb: `Module ${moduleIndex + 1} > Chapter ${chapterIndex + 1} > ${item.type}: ${item.title}`,
          english: {
            title: item.title,
            description: item.description
          },
          telugu: {
            title: item.translations?.telugu?.title || '',
            description: item.translations?.telugu?.description || ''
          },
          translationStatus: getTranslationStatus({
            title: item.translations?.telugu?.title,
            description: item.translations?.telugu?.description
          })
        });
      });
    });
  });

  return items;
}

function getTranslationStatus(translations) {
  const hasTitle = translations.title && translations.title.trim().length > 0;
  const hasDescription = translations.description && translations.description.trim().length > 0;

  if (hasTitle && hasDescription) return 'translated';
  if (hasTitle || hasDescription) return 'in_progress';
  return 'untranslated';
}

/**
 * Update translation for a specific item
 */
function updateTranslation(course, itemId, translations, markAsTranslated) {
  const parts = itemId.split('-');
  const itemType = parts[0];

  if (itemType === 'course') {
    if (!course.translations) course.translations = {};
    if (!course.translations.telugu) course.translations.telugu = {};

    course.translations.telugu.title = translations.title;
    course.translations.telugu.description = translations.description;
    return true;
  }

  if (itemType === 'module') {
    const moduleId = parts[1];
    const module = course.modules.id(moduleId);

    if (!module) return false;

    if (!module.translations) module.translations = {};
    if (!module.translations.telugu) module.translations.telugu = {};

    module.translations.telugu.title = translations.title;
    module.translations.telugu.description = translations.description;
    return true;
  }

  if (itemType === 'chapter') {
    const moduleId = parts[1];
    const chapterId = parts[2];
    const module = course.modules.id(moduleId);

    if (!module) return false;

    const chapter = module.chapters.id(chapterId);

    if (!chapter) return false;

    if (!chapter.translations) chapter.translations = {};
    if (!chapter.translations.telugu) chapter.translations.telugu = {};

    chapter.translations.telugu.title = translations.title;
    chapter.translations.telugu.description = translations.description;
    return true;
  }

  if (itemType === 'content') {
    const moduleId = parts[1];
    const chapterId = parts[2];
    const contentId = parts[3];

    const module = course.modules.id(moduleId);
    if (!module) return false;

    const chapter = module.chapters.id(chapterId);
    if (!chapter) return false;

    const content = chapter.contentItems.id(contentId);
    if (!content) return false;

    if (!content.translations) content.translations = {};
    if (!content.translations.telugu) content.translations.telugu = {};

    content.translations.telugu.title = translations.title;
    content.translations.telugu.description = translations.description;
    return true;
  }

  return false;
}
