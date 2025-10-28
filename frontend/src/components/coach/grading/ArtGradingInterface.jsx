// frontend/src/components/coach/grading/ArtGradingInterface.jsx
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import GradingPanel from './GradingPanel';

export default function ArtGradingInterface({ submission, onClose, coachId }) {
  const [zoom, setZoom] = useState(100);

  const handleGrade = async (gradeData) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `http://localhost:5001/api/v2/lms/coach/grading/submissions/${submission.id}/grade`,
        gradeData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(
        `✅ Grade submitted! ${submission.studentName} earned ${gradeData.coinsAwarded} ISF Coins!`
      );

      // Close the grading interface
      onClose();
    } catch (error) {
      console.error('Error submitting grade:', error);
      toast.error(error.response?.data?.error || 'Failed to submit grade');
      throw error;
    }
  };

  const handleZoomIn = () => {
    if (zoom < 200) {
      setZoom((prev) => prev + 25);
    }
  };

  const handleZoomOut = () => {
    if (zoom > 50) {
      setZoom((prev) => prev - 25);
    }
  };

  const handleDownload = () => {
    window.open(submission.fileUrl, '_blank');
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
        {/* Left Column - Artwork Preview (60%) */}
        <div className="w-3/5 p-8 border-r border-gray-200">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Artwork Preview</h3>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 50}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                🔍 Zoom Out
              </button>
              <span className="text-sm text-gray-600">{zoom}%</span>
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 200}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                🔍 Zoom In
              </button>
              <button
                onClick={() => setZoom(100)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Reset
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
              >
                ⬇️ Download Original
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 flex items-center justify-center overflow-auto"
            style={{ maxHeight: '600px' }}>
            <img
              src={submission.fileUrl}
              alt={submission.taskTitle}
              style={{ transform: `scale(${zoom / 100})`, transition: 'transform 0.3s ease' }}
              className="max-w-full h-auto rounded"
            />
          </div>

          {/* File Info */}
          <div className="mt-4 text-sm text-gray-600">
            {submission.metadata?.fileSize && (
              <div>
                <strong>File Size:</strong>{' '}
                {(submission.metadata.fileSize / 1024 / 1024).toFixed(2)} MB
              </div>
            )}
            {submission.metadata?.dimensions && (
              <div>
                <strong>Dimensions:</strong> {submission.metadata.dimensions.width} x{' '}
                {submission.metadata.dimensions.height}
              </div>
            )}
            {submission.metadata?.mimeType && (
              <div>
                <strong>Type:</strong> {submission.metadata.mimeType}
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
