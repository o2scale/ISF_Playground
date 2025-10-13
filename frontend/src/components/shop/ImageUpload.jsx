import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

/**
 * ImageUpload Component - Sprint5-Story-05
 * Simple image upload with preview (placeholder for S3 integration)
 * TODO: Integrate with AWS S3 in future sprint
 */

export default function ImageUpload({ currentImageUrl, onUpload }) {
  const [imageUrl, setImageUrl] = useState(currentImageUrl || '');
  const [isManualInput, setIsManualInput] = useState(false);

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    onUpload(url);
  };

  const handleRemoveImage = () => {
    setImageUrl('');
    onUpload('');
  };

  return (
    <div className="space-y-3">
      {imageUrl ? (
        /* Image Preview */
        <div className="relative">
          <img
            src={imageUrl}
            alt="Product preview"
            className="w-full h-48 object-cover rounded-lg border border-slate-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
            }}
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Upload Area */
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50">
          <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-sm text-slate-600 mb-2">
            Add product image URL
          </p>
          <p className="text-xs text-slate-500">
            S3 upload coming soon - use URL for now
          </p>
        </div>
      )}

      {/* URL Input */}
      {(!imageUrl || isManualInput) && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={handleUrlChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <p className="mt-1 text-xs text-slate-500">
            Paste an image URL or use a placeholder like https://via.placeholder.com/300
          </p>
        </div>
      )}

      {imageUrl && !isManualInput && (
        <button
          type="button"
          onClick={() => setIsManualInput(true)}
          className="text-sm text-purple-600 hover:text-purple-700"
        >
          Change image URL
        </button>
      )}
    </div>
  );
}
