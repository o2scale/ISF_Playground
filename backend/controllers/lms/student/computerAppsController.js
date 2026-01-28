const Course = require('../../../models/course');
const StudentProgress = require('../../../models/StudentProgress');
const mongoose = require('mongoose');

/**
 * Computer Apps Controller - Epic 01 Story 02
 * Handles Computer Apps course interactions:
 * - Get apps list with progress
 * - Get levels for selected app
 * - Get task details for selected level
 */

// ==================== GET APPS LIST ====================

/**
 * @desc Get all Computer Apps applications (Modules/Courses) with progress
 * @route GET /api/v2/lms/student/:studentId/courses/computer-apps
 * @access Private
 */
exports.getComputerApps = async (req, res) => {
  try {
    const { studentId } = req.params;

    // 1. Fetch the main "Computer Apps" Course
    // Assuming there is one big course or multiple courses under 'Computer Apps' category.
    // Based on mocks (MS Word, Excel, PPT), these look like MODULES inside a "Computer Apps" course, 
    // OR separate courses in that category. 
    // Let's assume they are MODULES of a single "Computer Apps" Master Course for now, 
    // OR separate courses. Given the structure "getAppLevels" (appId -> levels), 
    // it likely treats each "App" as a Module or a Course.
    // Let's treat them as *Modules* within a course named "Computer Apps" OR query all courses with category "Computer Apps".

    // Strategy: Find all courses with category "Computer Apps"
    const appCourses = await Course.find({ category: 'Computer Apps', status: 'published' }).sort({ title: 1 }).lean();

    // 2. Fetch Progress
    const progressRecords = await StudentProgress.find({
      student: studentId,
      course: { $in: appCourses.map(c => c._id) }
    }).lean();

    const progressMap = new Map(progressRecords.map(p => [p.course.toString(), p]));

    // 3. Map to response format
    const apps = appCourses.map(course => {
      const progress = progressMap.get(course._id.toString());

      // Calculate tasks count recursively
      let totalTasks = 0;
      course.modules?.forEach(m => {
        m.chapters?.forEach(c => {
          totalTasks += c.contentItems?.length || 0;
        });
      });

      const completedTasks = progress?.completedItems?.length || 0;
      const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      // Determine status from progress or default
      let status = 'not_started';
      if (progressPercent === 100) status = 'completed';
      else if (progressPercent > 0) status = 'in_progress';

      return {
        id: course._id, // This is the "App ID"
        name: course.title,
        icon: course.icon || '💻',
        totalTasks,
        completedTasks,
        status,
        progressPercentage: progressPercent
      };
    });

    res.json({
      success: true,
      apps
    });
  } catch (error) {
    console.error('Get Computer Apps Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching Computer Apps',
      error: error.message
    });
  }
};

// ==================== GET LEVELS LIST ====================

/**
 * @desc Get all levels (Modules) for selected Computer Apps application (Course)
 * @route GET /api/v2/lms/student/:studentId/courses/computer-apps/:appId/levels
 * @access Private
 */
exports.getAppLevels = async (req, res) => {
  try {
    const { studentId, appId } = req.params; // appId is actually courseId

    if (!mongoose.Types.ObjectId.isValid(appId)) {
      return res.status(400).json({ success: false, message: 'Invalid App ID' });
    }

    const course = await Course.findOne({ _id: appId, status: 'published' }).lean();
    if (!course) {
      return res.status(404).json({ success: false, message: 'Application course not found' });
    }

    const progress = await StudentProgress.findOne({ student: studentId, course: appId }).lean();
    const completedItems = new Set(progress?.completedItems?.map(i => i.itemId.toString()) || []);

    // Map Modules to "Levels"
    // Locking logic: A level is unlocked if the previous level is completed.
    let isLocked = false;

    const levels = course.modules.map((module, index) => {
      // Calculate module tasks
      let moduleTasks = [];
      module.chapters?.forEach(c => {
        if (c.contentItems) moduleTasks.push(...c.contentItems);
      });

      const totalTasks = moduleTasks.length;
      const completedCount = moduleTasks.filter(t => completedItems.has(t._id.toString())).length;
      const progressPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

      // Status
      let status = 'not_started';
      if (progressPercentage === 100) status = 'completed';
      else if (progressPercentage > 0) status = 'in_progress';

      // Lock check: If previous was not 100%, this one is locked (unless it's the first one)
      // Actually, let's keep it simple: strict sequential.
      // If we are already locked, this one is locked too.
      // If we are not locked, check if this one is locked (i.e. strictly previous one finished?)
      // For UX, Level 1 is always unlocked.

      const currentLevelLocked = index > 0 && isLocked;

      // Update lock state for NEXT level: if this one isn't done, next is locked.
      if (status !== 'completed') {
        isLocked = true;
      }

      return {
        id: module._id,
        name: module.title, // e.g., "Level 1: Basics"
        totalTasks,
        completedTasks: completedCount,
        status: currentLevelLocked ? 'locked' : status,
        locked: currentLevelLocked,
        progressPercentage,
        description: module.description,
        unlockMessage: currentLevelLocked ? 'Complete previous level to unlock' : undefined
      };
    });

    res.json({
      success: true,
      appId,
      levels
    });
  } catch (error) {
    console.error('Get App Levels Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching app levels',
      error: error.message
    });
  }
};

// ==================== GET TASK DETAILS ====================

/**
 * @desc Get task details for selected level
 * @route GET /api/v2/lms/student/:studentId/courses/computer-apps/:appId/levels/:levelId/task/:taskId
 * @access Private
 */
exports.getTaskDetails = async (req, res) => {
  try {
    const { studentId, appId, levelId, taskId } = req.params;

    // TODO: Replace with actual database query
    // Generate dynamic mock task details based on appId and levelId
    const taskMap = {
      'app-ms-word': {
        'level-1': {
          title: 'Create a Formal Letter',
          tool: 'MS Word',
          instructions: 'Open MS Word and create a formal letter with proper formatting.\n\nRequirements:\n1. Heading with name and address\n2. Date on the right\n3. Recipient details\n4. Professional greeting\n5. Three-paragraph body\n6. Closing signature'
        },
        'level-2': {
          title: 'Format a Document with Styles',
          tool: 'MS Word',
          instructions: 'Apply formatting styles to a document.\n\nRequirements:\n1. Use Heading 1 and Heading 2 styles\n2. Apply bold and italic formatting\n3. Create a bulleted list\n4. Insert page numbers\n5. Add a table of contents'
        },
        'level-3': {
          title: 'Create a Report with Images',
          tool: 'MS Word',
          instructions: 'Create a professional report.\n\nRequirements:\n1. Insert and format images\n2. Use text wrapping\n3. Add captions to images\n4. Create a title page\n5. Include headers and footers'
        },
        'level-4': {
          title: 'Work with Tables and Charts',
          tool: 'MS Word',
          instructions: 'Create tables and insert charts.\n\nRequirements:\n1. Create a formatted table\n2. Insert a chart from Excel\n3. Format table borders\n4. Merge and split cells\n5. Add formulas to table'
        }
      },
      'app-excel': {
        'level-1': {
          title: 'Create a Simple Spreadsheet',
          tool: 'Excel',
          instructions: 'Create a basic spreadsheet with data and formulas.\n\nRequirements:\n1. Enter data in rows and columns\n2. Use SUM function\n3. Apply cell formatting\n4. Create a simple chart\n5. Save your work'
        },
        'level-2': {
          title: 'Use Excel Formulas',
          tool: 'Excel',
          instructions: 'Practice advanced Excel formulas.\n\nRequirements:\n1. Use IF function\n2. Use VLOOKUP\n3. Use AVERAGE and COUNT\n4. Create conditional formatting\n5. Sort and filter data'
        },
        'level-3': {
          title: 'Create Charts and Graphs',
          tool: 'Excel',
          instructions: 'Visualize data with charts.\n\nRequirements:\n1. Create a column chart\n2. Create a pie chart\n3. Format chart elements\n4. Add chart titles and labels\n5. Export chart to image'
        }
      },
      'app-powerpoint': {
        'level-1': {
          title: 'Create Your First Presentation',
          tool: 'PowerPoint',
          instructions: 'Build a simple presentation.\n\nRequirements:\n1. Create title slide\n2. Add 5 content slides\n3. Apply a theme\n4. Add transitions\n5. Practice presenting'
        }
      },
      'app-tux-typing': {
        'level-1': {
          title: 'Practice Home Row Keys',
          tool: 'Tux Typing',
          instructions: 'Master the home row keys (ASDF JKL;).\n\nGoals:\n1. Accuracy: 90%+\n2. Speed: 20 WPM\n3. Complete all drills\n4. Unlock next level\n5. Earn bronze medal'
        },
        'level-2': {
          title: 'Top Row Keys Practice',
          tool: 'Tux Typing',
          instructions: 'Learn the top row (QWERTY UIOP).\n\nGoals:\n1. Accuracy: 85%+\n2. Speed: 25 WPM\n3. Complete all drills\n4. Unlock next level\n5. Earn silver medal'
        }
      },
      'app-gcompris': {
        'level-1': {
          title: 'Complete Math Games',
          tool: 'GCompris',
          instructions: 'Practice math with fun games.\n\nGames:\n1. Addition practice\n2. Subtraction drills\n3. Counting objects\n4. Number sequences\n5. Pattern recognition'
        }
      }
    };

    // Get task data or use default
    const appTasks = taskMap[appId] || {};
    const levelTask = appTasks[levelId] || {
      title: `Task for ${appId} ${levelId}`,
      tool: 'Computer App',
      instructions: `Complete the task for ${levelId}.\n\nThis is a placeholder task. Please complete the assigned activities.`
    };

    const task = {
      id: taskId,
      title: levelTask.title,
      instructions: levelTask.instructions,
      taskType: 'external_tool',
      toolName: levelTask.tool,
      performanceMetrics: {
        timeTaken: Math.floor(Math.random() * 10) + 8, // 8-17 mins
        coinsEarned: Math.floor(Math.random() * 50) + 30, // 30-79 coins
        ranking: Math.floor(Math.random() * 10) + 1, // 1-10
        completed: true
      },
      leaderboard: [
        { rank: 1, name: 'Priya Singh', coins: 1500, time: 10, isCurrentUser: false },
        { rank: 2, name: 'Amit Patel', coins: 1250, time: 11, isCurrentUser: false },
        { rank: 3, name: 'Ravi Kumar', coins: 1100, time: 12, isCurrentUser: true },
        { rank: 4, name: 'Neha Gupta', coins: 980, time: 13, isCurrentUser: false },
        { rank: 5, name: 'Suresh Kumar', coins: 850, time: 14, isCurrentUser: false }
      ]
    };

    res.json({
      success: true,
      task
    });
  } catch (error) {
    console.error('Get Task Details Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching task details',
      error: error.message
    });
  }
};
