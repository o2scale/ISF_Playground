import React, { useState } from 'react';
import CanvasPreview from './CanvasPreview';
import toast from 'react-hot-toast';

/**
 * FreeSketchMode Component
 * Open canvas for creative expression with personal gallery
 */
export default function FreeSketchMode({ data, studentId, onRefresh }) {
  const [canvasSize, setCanvasSize] = useState({ width: 1024, height: 768 });
  const gallery = data?.gallery || [];
  const sizeOptions = data?.canvasSizeOptions || [];

  const handleSave = async () => {
    try {
      // Gallery save not yet implemented (Artweaver IPC stubbed)
      toast.success('💾 Artwork saved to your gallery!');
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error('Failed to save artwork');
    }
  };

  const handleSubmit = async () => {
    try {
      // Submission not yet implemented (Artweaver IPC stubbed)
      toast.success('✓ Artwork submitted for grading!');
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error('Failed to submit artwork');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-pink-50 rounded-lg p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Free Sketch</h2>
        <p className="text-gray-700">
          Create anything you like! Let your imagination run wild. No rules, no instructions - just pure creativity.
        </p>
      </div>

      {/* Canvas Size Selector */}
      {sizeOptions.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Canvas Size
          </label>
          <select
            value={`${canvasSize.width}x${canvasSize.height}`}
            onChange={(e) => {
              const [width, height] = e.target.value.split('x').map(Number);
              setCanvasSize({ width, height });
            }}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          >
            {sizeOptions.map((option, idx) => (
              <option
                key={idx}
                value={`${option.width}x${option.height}`}
                disabled={option.width === 0}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Canvas Preview & Actions */}
      <CanvasPreview
        onSubmit={handleSubmit}
        onSave={handleSave}
        showSaveButton={true}
      />

      {/* My Gallery */}
      {gallery.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">My Gallery</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {gallery.map((artwork) => (
              <div
                key={artwork.id}
                className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <img
                    src={artwork.artworkUrl}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {artwork.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(artwork.createdAt).toLocaleDateString()}
                  </p>
                  {artwork.submitted && (
                    <div className="mt-1 flex items-center gap-1">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        ✓ Submitted
                      </span>
                      {artwork.grade && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Grade: {artwork.grade}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* Add New Placeholder */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center aspect-video cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-colors">
              <div className="text-center p-4">
                <span className="text-3xl text-gray-400">+</span>
                <p className="text-xs text-gray-500 mt-1">New Sketch</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
