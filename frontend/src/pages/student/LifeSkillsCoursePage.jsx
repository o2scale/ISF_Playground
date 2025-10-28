import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import toast from 'react-hot-toast';
import StudentLayout from '../../components/student/StudentLayout';

/**
 * Life Skills Course Page - Epic 01 Story 05
 * Main landing page showing voice tasks and MCQ quiz
 */
export default function LifeSkillsCoursePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [quizData, setQuizData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLifeSkillsTasks();
  }, []);

  const fetchLifeSkillsTasks = async () => {
    try {
      setLoading(true);
      const studentId = localStorage.getItem('userId') || 'student1';
      const response = await api.get(`/api/v2/lms/student/${studentId}/courses/life-skills`);

      if (response.data.success) {
        const allTasks = response.data.tasks;
        // Separate voice tasks and quiz
        const voiceTasks = allTasks.filter(t => t.taskType === 'voice');
        const quiz = allTasks.find(t => t.taskType === 'quiz');

        setTasks(voiceTasks);
        setQuizData(quiz);
      } else {
        setError('Failed to load Life Skills tasks');
        toast.error('Failed to load tasks');
      }
    } catch (err) {
      console.error('Error fetching Life Skills tasks:', err);
      setError('Failed to load Life Skills tasks');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceTaskClick = (taskId) => {
    navigate(`/student/life-skills/voice/${taskId}`);
  };

  const handleQuizClick = () => {
    navigate('/student/life-skills/quiz/quiz_1');
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl text-gray-600">Loading Life Skills tasks...</p>
        </div>
      </StudentLayout>
    );
  }

  if (error) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-xl text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/student/dashboard')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2" style={{ fontFamily: 'Patrick Hand, cursive' }}>
            Life Skills 🌱
          </h1>
          <p className="text-lg text-gray-600">Learn about hygiene, emotions, and social skills!</p>
        </div>

        {/* Voice Recording Tasks Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Patrick Hand, cursive' }}>
            🎤 Voice Recording Tasks
          </h2>
          <p className="text-gray-600 mb-6">Record your voice answers to these questions. Speak clearly and take your time!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(task => (
              <div
                key={task.id}
                className="bg-white border-2 border-green-300 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleVoiceTaskClick(task.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                    {task.category}
                  </span>
                  <span className="text-2xl">🎤</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Patrick Hand, cursive' }}>
                  {task.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                  {task.question}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Max {task.maxRecordingDuration}s</span>
                  <span className="text-yellow-600 font-medium">+{task.coinsForSubmission} coins</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MCQ Quiz Section */}
        {quizData && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Patrick Hand, cursive' }}>
              📝 Life Skills Quiz
            </h2>
            <p className="text-gray-600 mb-6">Test your knowledge with multiple choice questions!</p>

            <div
              className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-8 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={handleQuizClick}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-blue-900 mb-3" style={{ fontFamily: 'Patrick Hand, cursive' }}>
                    {quizData.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{quizData.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">📚</span>
                      <span>{quizData.totalQuestions} Questions</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-600 mr-2">💰</span>
                      <span>Up to {quizData.totalCoins} coins</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 mr-2">🎁</span>
                      <span>+{quizData.bonusCoins} bonus</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-purple-600 mr-2">⏱️</span>
                      <span>~10 minutes</span>
                    </div>
                  </div>
                </div>
                <div className="text-6xl ml-8">
                  📝
                </div>
              </div>
              <button className="mt-6 w-full px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-full hover:bg-blue-700 transition-colors"
                style={{ fontFamily: 'Patrick Hand, cursive' }}>
                Start Quiz →
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
          <h3 className="text-lg font-bold text-yellow-900 mb-3" style={{ fontFamily: 'Patrick Hand, cursive' }}>
            💡 How it Works
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-yellow-600 mr-3 mt-1">🎤</span>
              <span><strong>Voice Tasks:</strong> Listen to the question, then record your voice answer (up to 60 seconds). Your coach will grade it!</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">📝</span>
              <span><strong>Quiz:</strong> Answer all 10 multiple choice questions. Get instant results and earn coins based on your score!</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">💰</span>
              <span><strong>Earn Coins:</strong> Each correct quiz answer earns 12 coins. Score 80%+ to get a 24-coin bonus!</span>
            </li>
          </ul>
        </div>
      </div>
    </StudentLayout>
  );
}
