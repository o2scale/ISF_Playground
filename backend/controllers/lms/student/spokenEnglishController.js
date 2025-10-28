// backend/controllers/lms/student/spokenEnglishController.js
// Epic 01 Story 04: Spoken English Video Recording

/**
 * Get Spoken English Task Data
 * GET /api/v2/lms/student/:studentId/courses/spoken-english/:taskId
 * Returns task details, audio instructions, and requirements
 */
exports.getSpokenEnglishTask = async (req, res) => {
  try {
    const { studentId, taskId } = req.params;

    // Mock data for Spoken English task
    // In production, this would query the database for actual task data
    const task = {
      id: taskId || "task1",
      title: "Recite 'Twinkle Twinkle Little Star'",
      description: "Listen to the audio instructions and recite the poem clearly in front of the camera.",
      instructionsAudioUrl: null, // Mock - no actual audio file
      instructionsText: "Listen carefully to the poem. Practice once or twice before recording. Speak clearly and look at the camera. You can re-record as many times as needed.",
      maxDuration: 120, // Maximum recording duration in seconds (2 minutes)
      difficulty: "Beginner",
      estimatedTime: 10, // Estimated time in minutes
      poemText: `Twinkle, twinkle, little star,
How I wonder what you are!
Up above the world so high,
Like a diamond in the sky.

When the blazing sun is gone,
When he nothing shines upon,
Then you show your little light,
Twinkle, twinkle, all the night.`,
      requirements: [
        "Speak clearly and at a moderate pace",
        "Look at the camera while reciting",
        "Recite the complete poem without stopping",
        "Maintain good posture and expression"
      ],
      rubric: {
        pronunciation: {
          weight: 30,
          description: "Clear pronunciation and correct word stress"
        },
        fluency: {
          weight: 25,
          description: "Smooth delivery without hesitation"
        },
        expression: {
          weight: 20,
          description: "Appropriate emotion and tone"
        },
        confidence: {
          weight: 15,
          description: "Eye contact and body language"
        },
        completeness: {
          weight: 10,
          description: "Recited the entire poem"
        }
      }
    };

    res.status(200).json({
      success: true,
      task
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
 * Get All Spoken English Tasks
 * GET /api/v2/lms/student/:studentId/courses/spoken-english
 * Returns list of available tasks
 */
exports.getSpokenEnglishTasks = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Mock data for available tasks
    const tasks = [
      {
        id: "task1",
        title: "Recite 'Twinkle Twinkle Little Star'",
        difficulty: "Beginner",
        estimatedTime: 10,
        type: "poetry",
        status: "available", // available, in_progress, submitted, graded
        thumbnailUrl: null
      },
      {
        id: "task2",
        title: "Introduce Yourself",
        difficulty: "Beginner",
        estimatedTime: 5,
        type: "speech",
        status: "available",
        thumbnailUrl: null
      },
      {
        id: "task3",
        title: "Recite 'Humpty Dumpty'",
        difficulty: "Beginner",
        estimatedTime: 8,
        type: "poetry",
        status: "locked", // Locked until task1 is completed
        thumbnailUrl: null
      },
      {
        id: "task4",
        title: "Tell About Your Family",
        difficulty: "Intermediate",
        estimatedTime: 15,
        type: "speech",
        status: "locked",
        thumbnailUrl: null
      },
      {
        id: "task5",
        title: "Recite 'Mary Had a Little Lamb'",
        difficulty: "Intermediate",
        estimatedTime: 12,
        type: "poetry",
        status: "locked",
        thumbnailUrl: null
      }
    ];

    res.status(200).json({
      success: true,
      tasks,
      totalTasks: tasks.length,
      availableTasks: tasks.filter(t => t.status === 'available').length,
      completedTasks: tasks.filter(t => t.status === 'graded').length
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
    // const videoFile = req.file; // Multer will handle file upload

    // Validate required fields
    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: 'Task ID is required'
      });
    }

    // Mock S3 upload response
    // In production, upload video to S3 and get actual URL
    const mockS3Url = `https://isf-lms-videos.s3.amazonaws.com/spoken-english/${studentId}/${taskId}/${Date.now()}.webm`;

    // Mock submission record
    const submission = {
      submissionId: `sub_${Date.now()}`,
      studentId,
      taskId,
      type: "video",
      fileUrl: mockS3Url,
      duration: duration || 0,
      fileSize: fileSize || 0,
      status: "submitted", // submitted, under_review, graded
      submittedAt: new Date().toISOString(),
      grade: null,
      feedback: null
    };

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

    // Mock submission history
    const submissions = [
      {
        submissionId: "sub_001",
        taskId: "task1",
        taskTitle: "Recite 'Twinkle Twinkle Little Star'",
        fileUrl: "https://isf-lms-videos.s3.amazonaws.com/spoken-english/mock-video-1.webm",
        duration: 45,
        status: "graded",
        grade: "A",
        score: 92,
        feedback: "Excellent pronunciation and expression! Great job.",
        submittedAt: "2025-10-25T10:30:00Z",
        gradedAt: "2025-10-25T14:20:00Z",
        coachName: "Coach Priya"
      },
      {
        submissionId: "sub_002",
        taskId: "task2",
        taskTitle: "Introduce Yourself",
        fileUrl: "https://isf-lms-videos.s3.amazonaws.com/spoken-english/mock-video-2.webm",
        duration: 30,
        status: "under_review",
        grade: null,
        score: null,
        feedback: null,
        submittedAt: "2025-10-26T09:15:00Z",
        gradedAt: null,
        coachName: "Coach Amit"
      }
    ];

    res.status(200).json({
      success: true,
      submissions,
      totalSubmissions: submissions.length,
      gradedSubmissions: submissions.filter(s => s.status === 'graded').length,
      pendingSubmissions: submissions.filter(s => s.status === 'under_review').length
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
