import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function EditModuleModal({ isOpen, module, onClose, onUpdated }) {
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    if (module) {
      setFormData({
        title: module.title || '',
        description: module.description || ''
      });
    }
  }, [module]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement update API call
    onUpdated();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Edit Module</h3>
          <button onClick={onClose}><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Module title"
          />
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            rows={3}
            placeholder="Description"
          />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
