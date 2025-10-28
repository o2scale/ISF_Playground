import React, { useState } from 'react';
import CanvasPreview from './CanvasPreview';
import SubmissionModal from './SubmissionModal';
import toast from 'react-hot-toast';

/**
 * ArtStoriesMode Component
 * Drawing based on story prompts with audio narration
 */
export default function ArtStoriesMode({ data, studentId, onRefresh }) {
  const [selectedStory, setSelectedStory] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  const stories = data?.stories || [];

  React.useEffect(() => {
    if (stories.length > 0 && !selectedStory) {
      setSelectedStory(stories[0]);
    }
  }, [stories]);

  const handleSubmit = () => {
    setShowSubmissionModal(true);
  };

  const handleConfirmSubmission = async (metadata) => {
    try {
      toast.success('Story artwork submitted successfully!');
      setShowSubmissionModal(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error('Failed to submit artwork');
    }
  };

  if (stories.length === 0) {
    return <div className="text-center py-12"><p className="text-gray-500">No stories available</p></div>;
  }

  return (
    <div className="space-y-6">
      {/* Story Selector */}
      {stories.length > 1 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Story</label>
          <select
            value={selectedStory?.id || ''}
            onChange={(e) => setSelectedStory(stories.find(s => s.id === e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          >
            {stories.map((story) => (
              <option key={story.id} value={story.id}>
                {story.title} ({story.difficulty})
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedStory && (
        <>
          {/* Story Header */}
          <div className="bg-pink-50 rounded-lg p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedStory.title}</h2>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>📚 Difficulty: {selectedStory.difficulty}</span>
              <span>⏱️ Estimated Time: {selectedStory.estimatedTime} mins</span>
            </div>
          </div>

          {/* Audio Player (if audioUrl exists) */}
          {selectedStory.audioUrl && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">🎧 Listen to the Story</h3>
              <audio controls className="w-full">
                <source src={selectedStory.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Story Text */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">📖 Story</h3>
            <div className="text-gray-700 whitespace-pre-line leading-relaxed">
              {selectedStory.storyText}
            </div>
          </div>

          {/* Drawing Prompt */}
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">🎨 Drawing Prompt</h3>
            <div className="text-blue-800 whitespace-pre-line">
              {selectedStory.prompt}
            </div>
          </div>

          {/* Canvas Preview & Actions */}
          <CanvasPreview onSubmit={handleSubmit} />
        </>
      )}

      {/* Submission Modal */}
      {showSubmissionModal && (
        <SubmissionModal
          mode="art_story"
          metadata={{ storyId: selectedStory?.id }}
          onClose={() => setShowSubmissionModal(false)}
          onSubmit={handleConfirmSubmission}
        />
      )}
    </div>
  );
}
