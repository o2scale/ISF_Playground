// frontend/src/components/coach/grading/AudioGradingInterface.jsx
import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import GradingPanel from './GradingPanel';

export default function AudioGradingInterface({ submission, onClose, coachId }) {
  const handleGrade = async (gradeData) => {
    try {
      const token = localStorage.getItem('token');

      await axios.post(
        `http://localhost:5001/api/v2/lms/coach/grading/submissions/${submission.id}/grade`,
        gradeData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(
        `✅ Grade submitted! ${submission.studentName} earned ${gradeData.coinsAwarded} ISF Coins!`
      );

      onClose();
    } catch (error) {
      console.error('Error submitting grade:', error);
      toast.error(error.response?.data?.error || 'Failed to submit grade');
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between border-b border-blue-700">
        <h2 className="text-xl font-bold">
          Grading: {submission.taskTitle} - {submission.studentName}
        </h2>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 text-2xl font-bold px-4"
        >
          ✕ Close
        </button>
      </div>

      {/* 2-Column Layout */}
      <div className="flex">
        {/* Left Column - Audio Player (60%) */}
        <div className="w-3/5 p-8 border-r border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Audio Submission</h3>

          {/* HTML5 Audio Player */}
          <div className="bg-gray-100 rounded-lg p-8 border border-gray-300">
            <div className="text-6xl text-center mb-4">🎙️</div>
            <audio
              src={submission.fileUrl}
              controls
              className="w-full"
            >
              Your browser does not support the audio tag.
            </audio>
          </div>

          {/* File Info */}
          <div className="mt-4 text-sm text-gray-600">
            {submission.metadata?.duration && (
              <div>
                <strong>Duration:</strong>{' '}
                {Math.floor(submission.metadata.duration / 60)}:
                {(submission.metadata.duration % 60).toString().padStart(2, '0')}
              </div>
            )}
            {submission.metadata?.fileSize && (
              <div>
                <strong>File Size:</strong>{' '}
                {(submission.metadata.fileSize / 1024 / 1024).toFixed(2)} MB
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Grading Panel (40%) */}
        <div className="w-2/5 bg-gray-50 overflow-y-auto" style={{ maxHeight: '100vh' }}>
          <GradingPanel
            submission={submission}
            onGrade={handleGrade}
            coachId={coachId}
          />
        </div>
      </div>
    </div>
  );
}
