/**
 * Life Skills Controller - Epic 01 Story 05
 * Handles voice note submissions and MCQ quiz interactions
 *
 * Features:
 * - Voice note recording and submission
 * - MCQ quiz questions with audio enforcement
 * - Auto-grading and coin rewards
 * - Offline sync support (queued submissions)
 */

// Mock data for Life Skills questions
const mockVoiceQuestions = [
  {
    id: 'voice_task_1',
    type: 'voice',
    title: 'Hygiene Importance',
    audioUrl: 'https://isf-lms-audio.s3.amazonaws.com/lifeskills/voice_q1.mp3',
    question: 'Why is washing hands before eating important?',
    duration: 15, // Audio duration in seconds
    maxRecordingDuration: 60, // Max recording time in seconds
    coinsForSubmission: 20,
    instructions: 'Listen to the question carefully and record your answer. Speak clearly and take your time!',
    category: 'hygiene',
    difficulty: 'easy'
  },
  {
    id: 'voice_task_2',
    type: 'voice',
    title: 'Managing Anger',
    audioUrl: 'https://isf-lms-audio.s3.amazonaws.com/lifeskills/voice_q2.mp3',
    question: 'What should you do when you feel angry? Share your thoughts.',
    duration: 12,
    maxRecordingDuration: 60,
    coinsForSubmission: 20,
    instructions: 'Think about a time you felt angry. How did you handle it? Tell me your experience.',
    category: 'emotional-awareness',
    difficulty: 'medium'
  },
  {
    id: 'voice_task_3',
    type: 'voice',
    title: 'Helping Others',
    audioUrl: 'https://isf-lms-audio.s3.amazonaws.com/lifeskills/voice_q3.mp3',
    question: 'Describe a time when you helped someone. How did it make you feel?',
    duration: 18,
    maxRecordingDuration: 60,
    coinsForSubmission: 20,
    instructions: 'Share a story about helping a friend, family member, or stranger. What happened?',
    category: 'social-behavior',
    difficulty: 'medium'
  }
];

const mockQuizQuestions = [
  {
    id: 'mcq_q1',
    type: 'mcq',
    title: 'Hand Washing',
    audioUrl: 'https://isf-lms-audio.s3.amazonaws.com/lifeskills/quiz_q1.mp3',
    question: 'When should you wash your hands?',
    duration: 8,
    options: [
      { id: 'A', text: 'Only before breakfast', isCorrect: false },
      { id: 'B', text: 'Before every meal and after using the bathroom', isCorrect: true },
      { id: 'C', text: 'Only when they look dirty', isCorrect: false },
      { id: 'D', text: 'Once a day is enough', isCorrect: false }
    ],
    correctAnswer: 'B',
    explanation: 'Great job! Washing hands before meals and after using the bathroom keeps you healthy and prevents germs from spreading.',
    coinsForCorrect: 12,
    category: 'hygiene',
    difficulty: 'easy'
  },
  {
    id: 'mcq_q2',
    type: 'mcq',
    title: 'Anger Management',
    audioUrl: 'https://isf-lms-audio.s3.amazonaws.com/lifeskills/quiz_q2.mp3',
    question: 'What should you do when you feel angry?',
    duration: 10,
    options: [
      { id: 'A', text: 'Yell at someone nearby', isCorrect: false },
      { id: 'B', text: 'Take deep breaths and count to 10', isCorrect: true },
      { id: 'C', text: 'Throw things around the room', isCorrect: false },
      { id: 'D', text: 'Hit something or someone', isCorrect: false }
    ],
    correctAnswer: 'B',
    explanation: 'Excellent! Taking deep breaths helps calm your body and mind. Counting to 10 gives you time to think before reacting.',
    coinsForCorrect: 12,
    category: 'emotional-awareness',
    difficulty: 'medium'
  },
  {
    id: 'mcq_q3',
    type: 'mcq',
    title: 'Sharing with Friends',
    audioUrl: 'https://isf-lms-audio.s3.amazonaws.com/lifeskills/quiz_q3.mp3',
    question: 'Your friend forgot their lunch. What should you do?',
    duration: 12,
    options: [
      { id: 'A', text: 'Eat your lunch in front of them', isCorrect: false },
      { id: 'B', text: 'Share some of your food with them', isCorrect: true },
      { id: 'C', text: 'Tell them it is their own problem', isCorrect: false },
      { id: 'D', text: 'Laugh at them for forgetting', isCorrect: false }
    ],
    correctAnswer: 'B',
    explanation: 'You are so kind! Sharing food with a friend who forgot lunch shows empathy and caring. That is what good friends do!',
    coinsForCorrect: 12,
    category: 'social-behavior',
    difficulty: 'easy'
  },
  {
    id: 'mcq_q4',
    type: 'mcq',
    title: 'Brushing Teeth',
    audioUrl: 'https://isf-lms-audio.s3.amazonaws.com/lifeskills/quiz_q4.mp3',
    question: 'How many times a day should you brush your teeth?',
    duration: 9,
    options: [
      { id: 'A', text: 'Once a week is enough', isCorrect: false },
      { id: 'B', text: 'At least twice a day: morning and night', isCorrect: true },
      { id: 'C', text: 'Only when you eat sweets', isCorrect: false },
      { id: 'D', text: 'Brushing is not important', isCorrect: false }
    ],
    correctAnswer: 'B',
    explanation: 'Perfect! Brushing twice a day keeps your teeth strong and healthy. It removes food and prevents cavities.',
    coinsForCorrect: 12,
    category: 'hygiene',
    difficulty: 'easy'
  },
  {
    id: 'mcq_q5',
    type: 'mcq',
    title: 'Feeling Sad',
    audioUrl: 'https://isf-lms-audio.s3.amazonaws.com/lifeskills/quiz_q5.mp3',
    question: 'When you feel sad, what is a good thing to do?',
    duration: 11,
    options: [
      { id: 'A', text: 'Keep it inside and do not tell anyone', isCorrect: false },
      { id: 'B', text: 'Talk to someone you trust about how you feel', isCorrect: true },
      { id: 'C', text: 'Get angry at people around you', isCorrect: false },
      { id: 'D', text: 'Pretend you are happy when you are not', isCorrect: false }
    ],
    correctAnswer: 'B',
    explanation: 'Wonderful choice! Talking about your feelings with someone you trust helps you feel better. It is okay to be sad sometimes.',
    coinsForCorrect: 12,
    category: 'emotional-awareness',
    difficulty: 'medium'
  },
  {
    id: 'mcq_q6',
    type: 'mcq',
    title: 'Helping at Home',
    audioUrl: 'https://isf-lms-audio.s3.amazonaws.com/lifeskills/quiz_q6.mp3',
    question: 'How can you help your family at home?',
    duration: 10,
    options: [
      { id: 'A', text: 'Do nothing and let others do all the work', isCorrect: false },
      { id: 'B', text: 'Clean your room and help with small chores', isCorrect: true },
      { id: 'C', text: 'Make more mess for others to clean', isCorrect: false },
      { id: 'D', text: 'Only help if you get a reward', isCorrect: false }
    ],
    correctAnswer: 'B',
    explanation: 'You are a great helper! Cleaning your room and helping with chores shows responsibility and makes your family proud.',
    coinsForCorrect: 12,
    category: 'social-behavior',
    difficulty: 'easy'
  },
  {
    id: 'mcq_q7',
    type: 'mcq',
    title: 'Bathing Regularly',
    audioUrl: 'https://isf-lms-audio.s3.amazonaws.com/lifeskills/quiz_q7.mp3',
    question: 'Why should you take a bath or shower regularly?',
    duration: 11,
    options: [
      { id: 'A', text: 'Bathing is a waste of time', isCorrect: false },
      { id: 'B', text: 'It keeps your body clean and removes germs', isCorrect: true },
      { id: 'C', text: 'Only bath when someone tells you to', isCorrect: false },
      { id: 'D', text: 'Bathing once a month is enough', isCorrect: false }
    ],
    correctAnswer: 'B',
    explanation: 'Exactly right! Regular bathing keeps you clean, fresh, and healthy. It washes away dirt and germs from your skin.',
    coinsForCorrect: 12,
    category: 'hygiene',
    difficulty: 'easy'
  },
  {
    id: 'mcq_q8',
    type: 'mcq',
    title: 'Dealing with Mistakes',
    audioUrl: 'https://isf-lms-audio.s3.amazonaws.com/lifeskills/quiz_q8.mp3',
    question: 'What should you do if you make a mistake?',
    duration: 10,
    options: [
      { id: 'A', text: 'Blame someone else for it', isCorrect: false },
      { id: 'B', text: 'Admit the mistake and try to fix it', isCorrect: true },
      { id: 'C', text: 'Hide it so no one finds out', isCorrect: false },
      { id: 'D', text: 'Get upset and give up', isCorrect: false }
    ],
    correctAnswer: 'B',
    explanation: 'Well done! Admitting mistakes shows honesty and bravery. Everyone makes mistakes - the important part is learning from them.',
    coinsForCorrect: 12,
    category: 'emotional-awareness',
    difficulty: 'medium'
  },
  {
    id: 'mcq_q9',
    type: 'mcq',
    title: 'Being Polite',
    audioUrl: 'https://isf-lms-audio.s3.amazonaws.com/lifeskills/quiz_q9.mp3',
    question: 'When should you say "please" and "thank you"?',
    duration: 9,
    options: [
      { id: 'A', text: 'Never - these words are not needed', isCorrect: false },
      { id: 'B', text: 'When asking for something and receiving help', isCorrect: true },
      { id: 'C', text: 'Only to adults, not to friends', isCorrect: false },
      { id: 'D', text: 'Only on special occasions', isCorrect: false }
    ],
    correctAnswer: 'B',
    explanation: 'Perfect! Saying "please" and "thank you" shows respect and appreciation. It makes everyone feel valued and happy.',
    coinsForCorrect: 12,
    category: 'social-behavior',
    difficulty: 'easy'
  },
  {
    id: 'mcq_q10',
    type: 'mcq',
    title: 'Wearing Clean Clothes',
    audioUrl: 'https://isf-lms-audio.s3.amazonaws.com/lifeskills/quiz_q10.mp3',
    question: 'Why is it important to wear clean clothes?',
    duration: 10,
    options: [
      { id: 'A', text: 'It does not matter what you wear', isCorrect: false },
      { id: 'B', text: 'Clean clothes keep you healthy and make you feel good', isCorrect: true },
      { id: 'C', text: 'You should wear the same clothes for a week', isCorrect: false },
      { id: 'D', text: 'Only wear clean clothes on special days', isCorrect: false }
    ],
    correctAnswer: 'B',
    explanation: 'Great thinking! Clean clothes prevent skin problems and make you feel confident and comfortable. They also smell nice!',
    coinsForCorrect: 12,
    category: 'hygiene',
    difficulty: 'easy'
  }
];

/**
 * Get all Life Skills tasks (voice questions + quiz questions)
 * GET /api/v2/lms/student/:studentId/courses/life-skills
 */
exports.getLifeSkillsTasks = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Combine voice questions and quiz questions
    const allTasks = [
      ...mockVoiceQuestions.map(q => ({ ...q, taskType: 'voice' })),
      {
        id: 'quiz_1',
        taskType: 'quiz',
        title: 'Life Skills Quiz',
        description: 'Test your knowledge with 10 multiple choice questions!',
        totalQuestions: mockQuizQuestions.length,
        totalCoins: mockQuizQuestions.length * 12, // 12 coins per question
        bonusCoins: 24, // Bonus for 80%+ score
        questions: mockQuizQuestions
      }
    ];

    res.json({
      success: true,
      studentId,
      courseId: 'life-skills',
      courseName: 'Life Skills',
      tasks: allTasks,
      completedTasks: 0, // TODO: Query from database
      totalTasks: allTasks.length
    });
  } catch (error) {
    console.error('Error fetching Life Skills tasks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Life Skills tasks'
    });
  }
};

/**
 * Get a specific voice question task
 * GET /api/v2/lms/student/:studentId/courses/life-skills/voice/:taskId
 */
exports.getVoiceTask = async (req, res) => {
  try {
    const { studentId, taskId } = req.params;

    const task = mockVoiceQuestions.find(q => q.id === taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Voice task not found'
      });
    }

    res.json({
      success: true,
      studentId,
      task: {
        ...task,
        taskType: 'voice',
        submittedAt: null, // TODO: Query from database
        grade: null
      }
    });
  } catch (error) {
    console.error('Error fetching voice task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch voice task'
    });
  }
};

/**
 * Submit voice recording
 * POST /api/v2/lms/student/:studentId/courses/life-skills/voice/submit
 */
exports.submitVoiceRecording = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { taskId, duration, fileSize } = req.body;

    // In production: Upload file to S3
    // For now: Return mock S3 URL
    const mockS3Url = `https://isf-lms-voice.s3.amazonaws.com/students/${studentId}/lifeskills/${taskId}_${Date.now()}.webm`;

    // Find the task to get coin reward
    const task = mockVoiceQuestions.find(q => q.id === taskId);
    const coinsEarned = task ? task.coinsForSubmission : 20;

    // TODO: Save submission to database
    // TODO: Update coin balance

    res.status(201).json({
      success: true,
      submissionId: `sub_${Date.now()}`,
      fileUrl: mockS3Url,
      status: 'pending', // pending | graded | rejected
      coinsEarned,
      message: 'Great work! Your answer has been submitted. Coach will review it soon.'
    });
  } catch (error) {
    console.error('Error submitting voice recording:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit voice recording'
    });
  }
};

/**
 * Get quiz questions
 * GET /api/v2/lms/student/:studentId/courses/life-skills/quiz/:quizId
 */
exports.getQuiz = async (req, res) => {
  try {
    const { studentId, quizId } = req.params;

    res.json({
      success: true,
      studentId,
      quiz: {
        id: quizId,
        title: 'Life Skills Quiz',
        description: 'Test your knowledge with 10 multiple choice questions!',
        totalQuestions: mockQuizQuestions.length,
        passingScore: 60, // 60% to pass
        coinsPerQuestion: 12,
        bonusThreshold: 80, // 80%+ gets bonus
        bonusCoins: 24,
        questions: mockQuizQuestions.map(q => ({
          ...q,
          // Don't send correctAnswer or isCorrect fields to client (prevent cheating)
          correctAnswer: undefined,
          explanation: undefined,
          options: q.options.map(opt => ({
            id: opt.id,
            text: opt.text
            // isCorrect field deliberately omitted
          }))
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch quiz'
    });
  }
};

/**
 * Submit quiz answers and calculate score
 * POST /api/v2/lms/student/:studentId/courses/life-skills/quiz/submit
 */
exports.submitQuiz = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { quizId, answers, startedAt, completedAt } = req.body;

    // Grade the quiz
    let correctAnswers = 0;
    const breakdown = mockQuizQuestions.map((question, index) => {
      const userAnswer = answers.find(a => a.questionId === question.id);
      const isCorrect = userAnswer && userAnswer.selectedOption === question.correctAnswer;

      if (isCorrect) correctAnswers++;

      return {
        questionId: question.id,
        questionNumber: index + 1,
        question: question.question,
        correct: isCorrect,
        coinsEarned: isCorrect ? question.coinsForCorrect : 0,
        correctAnswer: question.correctAnswer,
        userAnswer: userAnswer ? userAnswer.selectedOption : null,
        explanation: isCorrect ? question.explanation : `The correct answer is ${question.correctAnswer}. ${question.explanation}`
      };
    });

    // Calculate score and coins
    const totalQuestions = mockQuizQuestions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const baseCoins = correctAnswers * 12; // 12 coins per correct answer
    const bonusCoins = score >= 80 ? 24 : 0; // Bonus for 80%+ score
    const totalCoins = baseCoins + bonusCoins;

    // Calculate time taken
    const timeTaken = startedAt && completedAt
      ? Math.round((new Date(completedAt) - new Date(startedAt)) / 1000)
      : 0;

    // TODO: Save quiz results to database
    // TODO: Update coin balance

    res.json({
      success: true,
      quizId,
      results: {
        score,
        correctAnswers,
        totalQuestions,
        timeTaken,
        coinsEarned: totalCoins,
        baseCoins,
        bonusCoins,
        passed: score >= 60,
        grade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F',
        breakdown
      },
      updatedCoinBalance: 1370, // TODO: Get from database
      message: score >= 80
        ? `Excellent work! You scored ${score}% and earned ${totalCoins} coins!`
        : score >= 60
        ? `Good job! You scored ${score}% and earned ${totalCoins} coins.`
        : `Keep practicing! You scored ${score}%. Try again to improve!`
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit quiz'
    });
  }
};

/**
 * Get student's submission history for Life Skills
 * GET /api/v2/lms/student/:studentId/courses/life-skills/submissions
 */
exports.getSubmissionHistory = async (req, res) => {
  try {
    const { studentId } = req.params;

    // TODO: Query from database
    const mockSubmissions = [
      {
        id: 'sub_1',
        taskId: 'voice_task_1',
        taskTitle: 'Hygiene Importance',
        type: 'voice',
        fileUrl: 'https://isf-lms-voice.s3.amazonaws.com/...',
        status: 'graded',
        coinsEarned: 20,
        submittedAt: '2025-10-20T10:30:00Z',
        gradedAt: '2025-10-20T15:45:00Z',
        feedback: 'Excellent explanation! You clearly understand the importance of hygiene.'
      },
      {
        id: 'quiz_result_1',
        taskId: 'quiz_1',
        taskTitle: 'Life Skills Quiz',
        type: 'quiz',
        score: 85,
        correctAnswers: 8,
        totalQuestions: 10,
        coinsEarned: 120,
        submittedAt: '2025-10-22T14:00:00Z'
      }
    ];

    res.json({
      success: true,
      studentId,
      submissions: mockSubmissions,
      totalSubmissions: mockSubmissions.length,
      totalCoinsEarned: mockSubmissions.reduce((sum, sub) => sum + sub.coinsEarned, 0)
    });
  } catch (error) {
    console.error('Error fetching submission history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch submission history'
    });
  }
};
