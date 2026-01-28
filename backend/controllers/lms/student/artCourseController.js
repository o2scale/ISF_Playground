const Course = require('../../../models/course');
const StudentProgress = require('../../../models/StudentProgress');
const mongoose = require('mongoose');

/**
 * Art Course Controller - Epic 01 Story 03
 * Handles Art Course with 4 modes:
 * - Workshops: Guided art lessons with instructor videos
 * - Free Sketch: Open canvas for creative expression
 * - Art Stories: Drawing based on story prompts
 * - Competition: Themed art contests with leaderboard
 * 
 * NOTE: The data model for "Modes" is currently mapped to Mongoose "Modules" or "Category"
 * We assume "Art" category Courses map to these modes via tags or sub-categories in real DB.
 * For now, we will map simply:
 * - Modules with title containing "Workshop" -> Workshop Mode
 * - Modules with title containing "Story" -> Art Stories
 * - "Free Sketch" is a frontend feature (tool), but we might track gallery in DB.
 */

// ==================== GET ART COURSE DATA ====================

/**
 * @desc Get Art Course data for all modes
 * @route GET /api/v2/lms/student/:studentId/courses/art
 * @access Private
 */
exports.getArtCourseData = async (req, res) => {
  try {
    const { studentId } = req.params;

    // 1. Fetch Art Courses
    const artCourses = await Course.find({ category: 'Art', status: 'published' }).lean();

    // 2. Fetch Progress
    const progressRecords = await StudentProgress.find({
      student: studentId,
      course: { $in: artCourses.map(c => c._id) }
    }).lean();

    const progressMap = new Map(progressRecords.map(p => [p.course.toString(), p]));

    // 3. Separate logic for modes
    let workshops = [];
    let stories = [];

    // Process courses into modes
    // IF we are using Course-per-Workshop model:
    artCourses.forEach(course => {
      const progress = progressMap.get(course._id.toString());

      const item = {
        id: course._id,
        title: course.title,
        instructor: 'Coach Interface', // Should be populated from createdBy
        duration: 45, // Placeholder if field missing
        level: course.difficultyLevel || 'Beginner',
        videoUrl: null, // Would be in ContentItems
        thumbnailUrl: course.thumbnail,
        instructions: course.description,
        completed: progress?.status === 'completed',
        progress: progress?.completionPercentage || 0
      };

      // Extract video URL if possible from first video content item
      if (course.modules?.[0]?.chapters?.[0]?.contentItems?.[0]?.type === 'video') {
        item.videoUrl = course.modules[0].chapters[0].contentItems[0].fileUrl;
      }

      // Discriminator logic (naive string check on Title/Desc)
      if (course.title.toLowerCase().includes('story')) {
        stories.push(item);
      } else {
        workshops.push(item);
      }
    });

    // Mock Data for "Free Sketch" and "Competition" as they are likely separate collections
    // or not yet fully modeled in Course schema (Competition might be a separate model).
    // Keeping existing separate structure for response compatibility.

    const artCourseData = {
      success: true,
      modes: [
        {
          mode: 'workshops',
          workshops: workshops.length > 0 ? workshops : [] // Fallback to empty if DB empty
        },
        {
          mode: 'art_stories',
          stories: stories.length > 0 ? stories : []
        },
        {
          mode: 'competition',
          currentCompetition: null // TODO: Implement Competition Model
        },
        {
          mode: 'free_sketch',
          gallery: [] // TODO: Implement Gallery Model
        }
      ]
    };

    res.json(artCourseData);
  } catch (error) {
    console.error('Get Art Course Data Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching Art Course data',
      error: error.message
    });
  }
};

// ==================== SUBMIT ARTWORK ====================

/**
 * @desc Submit artwork for grading or competition
 * @route POST /api/v2/lms/student/:studentId/submissions
 * @access Private
 */
exports.submitArtwork = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { type, mode, metadata } = req.body;
    const file = req.file; // Assuming multer middleware

    // TODO: Implement actual S3 upload and database storage
    // For now, returning mock success response

    // Validate required fields
    if (!type || type !== 'art') {
      return res.status(400).json({
        success: false,
        message: 'Invalid submission type. Must be "art".'
      });
    }

    if (!mode || !['workshop', 'free_sketch', 'art_story', 'competition'].includes(mode)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid mode. Must be one of: workshop, free_sketch, art_story, competition'
      });
    }

    // Mock file upload simulation
    const submissionId = `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const mockFileUrl = `https://isf-playground-art.s3.amazonaws.com/submissions/${studentId}/${submissionId}.png`;

    const response = {
      success: true,
      submissionId,
      fileUrl: mockFileUrl,
      message: 'Artwork submitted successfully! Your coach will review it soon.',
      metadata: {
        mode,
        submittedAt: new Date().toISOString(),
        ...metadata
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Submit Artwork Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting artwork',
      error: error.message
    });
  }
};

// ==================== SAVE TO GALLERY ====================

/**
 * @desc Save artwork to student's personal gallery (Free Sketch mode)
 * @route POST /api/v2/lms/student/:studentId/gallery
 * @access Private
 */
exports.saveToGallery = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { title, canvasSize, sessionDuration } = req.body;
    const file = req.file;

    // TODO: Implement actual S3 upload and database storage
    const artworkId = `sketch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const mockArtworkUrl = `https://isf-playground-art.s3.amazonaws.com/gallery/${studentId}/${artworkId}.png`;

    const savedArtwork = {
      success: true,
      artwork: {
        id: artworkId,
        title: title || 'Untitled Sketch',
        artworkUrl: mockArtworkUrl,
        createdAt: new Date().toISOString(),
        canvasSize: canvasSize || { width: 1024, height: 768 },
        sessionDuration: sessionDuration || 0,
        submitted: false
      },
      message: 'Artwork saved to your gallery!'
    };

    res.json(savedArtwork);
  } catch (error) {
    console.error('Save to Gallery Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving artwork',
      error: error.message
    });
  }
};
