import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api';
import toast from 'react-hot-toast';
import StudentLayout from '../../components/student/StudentLayout';
import AudioQuestionCard from '../../components/student/lifeskills/AudioQuestionCard';

/**
 * Life Skills MCQ Quiz Page - Epic 01 Story 05
 * 10 MCQ questions with audio playback
 * Delayed feedback pattern - results shown only after completion
 */
export default function LifeSkillsQuizPage() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [audioCompleted, setAudioCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuizQuestions();
  }, [quizId]);

  useEffect(() => {
    // Reset audio completion when question changes
    setAudioCompleted(false);
  }, [currentQuestionIndex]);

  const fetchQuizQuestions = async () => {
    try {
      setLoading(true);
      const studentId = localStorage.getItem('userId') || 'student1';
      const response = await api.get(
        `/api/v2/lms/student/${studentId}/courses/life-skills/quiz/${quizId}`
      );

      if (response.data.success && response.data.quiz && response.data.quiz.questions) {
        setQuestions(response.data.quiz.questions);
      } else {
        setError('Failed to load quiz questions');
        toast.error('Failed to load quiz');
      }
    } catch (err) {
      console.error('Error fetching quiz:', err);
      setError('Failed to load quiz questions');
      toast.error('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (optionKey) => {
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].id]: optionKey
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    // Check if all questions are answered
    const unansweredCount = questions.length - Object.keys(answers).length;
    if (unansweredCount > 0) {
      toast.error(`Please answer all questions (${unansweredCount} remaining)`);
      return;
    }

    try {
      setSubmitting(true);
      const studentId = localStorage.getItem('userId') || 'student1';

      // Format answers for submission
      const formattedAnswers = questions.map(q => ({
        questionId: q.id,
        selectedAnswer: answers[q.id]
      }));

      const response = await api.post(
        `/api/v2/lms/student/${studentId}/courses/life-skills/quiz/submit`,
        {
          quizId: quizId,
          answers: formattedAnswers
        }
      );

      if (response.data.success) {
        toast.success('Quiz submitted successfully!');
        // Navigate to results page with quiz results
        navigate('/student/life-skills/quiz/results', {
          state: { results: response.data }
        });
      } else {
        toast.error('Failed to submit quiz');
      }
    } catch (err) {
      console.error('Error submitting quiz:', err);
      toast.error('Failed to submit quiz');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl text-gray-600">Loading quiz...</p>
        </div>
      </StudentLayout>
    );
  }

  if (error || questions.length === 0) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-xl text-red-600 mb-4">{error || 'No questions found'}</p>
            <button
              onClick={() => navigate('/student/life-skills')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Return to Life Skills
            </button>
          </div>
        </div>
      </StudentLayout>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canSubmit = Object.keys(answers).length === questions.length && !submitting;

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-blue-900" style={{ fontFamily: 'Patrick Hand, cursive' }}>
              Life Skills Quiz 📝
            </h1>
            <button
              onClick={() => navigate('/student/life-skills')}
              className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Exit Quiz
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Object.keys(answers).length} / {questions.length} answered</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Audio Question Card */}
        <AudioQuestionCard
          audioUrl={currentQuestion.audioUrl}
          questionText={currentQuestion.question}
          onAudioComplete={() => setAudioCompleted(true)}
          autoPlay={true}
        />

        {/* Question Text (redundant with audio, but helpful for accessibility) */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Patrick Hand, cursive' }}>
            {currentQuestion.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options && currentQuestion.options.map((option) => (
              <label
                key={option.id}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  currentAnswer === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
                } ${!audioCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option.id}
                  checked={currentAnswer === option.id}
                  onChange={() => handleAnswerSelect(option.id)}
                  disabled={!audioCompleted}
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-800 font-medium">
                  {option.id}. {option.text}
                </span>
              </label>
            ))}
          </div>

          {/* Audio Enforcement Message */}
          {!audioCompleted && (
            <div className="mt-4 flex items-center text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Please listen to the complete audio before selecting an answer
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            style={{ fontFamily: 'Patrick Hand, cursive' }}
          >
            ← Previous
          </button>

          <div className="flex-1 text-center">
            {currentAnswer && (
              <span className="text-green-600 font-medium">
                ✓ Answer saved
              </span>
            )}
          </div>

          {!isLastQuestion && (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              style={{ fontFamily: 'Patrick Hand, cursive' }}
            >
              Next →
            </button>
          )}

          {isLastQuestion && (
            <button
              onClick={handleSubmitQuiz}
              disabled={!canSubmit}
              className={`px-8 py-3 rounded-lg font-bold text-lg transition-all ${
                canSubmit
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              style={{ fontFamily: 'Patrick Hand, cursive' }}
            >
              {submitting ? 'Submitting...' : 'Submit Quiz 🎉'}
            </button>
          )}
        </div>

        {/* Answer Summary (Bottom) */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4" style={{ fontFamily: 'Patrick Hand, cursive' }}>
            Answer Summary
          </h3>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = !!answers[q.id];
              const isCurrent = idx === currentQuestionIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                      : isAnswered
                      ? 'bg-green-100 text-green-700 border-2 border-green-400'
                      : 'bg-gray-200 text-gray-500 border-2 border-gray-300'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Click on a question number to jump to it
          </p>
        </div>
      </div>
    </StudentLayout>
  );
}
