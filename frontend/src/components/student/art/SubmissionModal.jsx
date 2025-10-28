import React from 'react';

/**
 * SubmissionModal Component
 * Confirmation dialog for submitting artwork
 */
export default function SubmissionModal({ mode, metadata, onClose, onSubmit }) {
  const [title, setTitle] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...metadata,
      title: title || 'Untitled Artwork',
      mode
    });
  };

  const getModeLabel = () => {
    switch (mode) {
      case 'workshop': return 'Workshop';
      case 'free_sketch': return 'Free Sketch';
      case 'art_story': return 'Art Story';
      case 'competition': return 'Competition';
      default: return 'Artwork';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-pink-600 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-bold">Submit Artwork</h2>
          <p className="text-pink-100 text-sm mt-1">
            Submit your artwork for coach review
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Artwork Title (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your artwork a title..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Submission Details</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>• Type: {getModeLabel()}</p>
              <p>• Coach will review your artwork</p>
              <p>• You'll receive feedback and a grade</p>
              {mode === 'competition' && (
                <p className="text-purple-700">• Entry will be visible on leaderboard</p>
              )}
            </div>
          </div>

          {/* Canvas Preview Placeholder */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Canvas Preview:</p>
            <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
              <div
                className="bg-gray-100 flex items-center justify-center"
                style={{ aspectRatio: '4/3', minHeight: '200px' }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-gray-500 text-sm">Your artwork will be captured</p>
                  <p className="text-gray-400 text-xs">(Screenshot from Artweaver)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-800">
              ⚠️ Make sure you've saved your work in Artweaver before submitting!
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              ✓ Confirm Submission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
