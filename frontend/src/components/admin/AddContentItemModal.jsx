import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddContentItemModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    type: 'video',
    title: '',
    description: '',
    fileUrl: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    await onAdd(formData);
    setFormData({ type: 'video', title: '', description: '', fileUrl: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-blue-900">Add Content Item</h3>
          <button onClick={onClose}><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Content Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="video">🎥 Video</option>
              <option value="pdf">📄 PDF</option>
              <option value="audio">🔊 Audio</option>
              <option value="image">🖼️ Image</option>
              <option value="text">📝 Text</option>
              <option value="link">🔗 Link</option>
              <option value="quiz">❓ Quiz</option>
              <option value="task">✅ Task</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g., How to Create a Document"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">File URL (for video/pdf/image)</label>
            <input
              type="text"
              value={formData.fileUrl}
              onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="https://..."
            />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add Content</button>
          </div>
        </form>
      </div>
    </div>
  );
}
