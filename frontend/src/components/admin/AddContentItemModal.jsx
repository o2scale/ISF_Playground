import React, { useState, useRef } from 'react';
import { X, Upload, File, Loader, CheckCircle } from 'lucide-react';
import useFileUpload from '../../hooks/useFileUpload';
import toast from 'react-hot-toast';

export default function AddContentItemModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    type: 'video',
    title: '',
    description: '',
    fileUrl: ''
  });

  const { uploadFile, isUploading } = useFileUpload();
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    await onAdd(formData);
    setFormData({ type: 'video', title: '', description: '', fileUrl: '' });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    // Basic validation based on selected type
    const typeMap = {
      video: 'video',
      pdf: 'application/pdf',
      image: 'image',
      audio: 'audio'
    };

    const expectedType = typeMap[formData.type];
    if (expectedType && !file.type.includes(expectedType) && !(formData.type === 'pdf' && file.type === 'application/pdf')) {
      // Allow loose matching for video/image/audio, exact for pdf
      toast.error(`Invalid file type. Expected ${formData.type}.`);
      return;
    }

    // Max size check (e.g. 500MB for video, 50MB others)
    const maxSize = formData.type === 'video' ? 500 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`File too large. Max size: ${formData.type === 'video' ? '500MB' : '50MB'}`);
      return;
    }

    try {
      const result = await uploadFile({
        file,
        fileType: formData.type,
        id: `upload-${Date.now()}`
      });

      if (result.success) {
        setFormData(prev => ({ ...prev, fileUrl: result.cdnUrl }));
        toast.success('File uploaded successfully!');
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const showUpload = ['video', 'pdf', 'image', 'audio'].includes(formData.type);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
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

          {showUpload && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Upload File or URL</label>

              {/* Drag & Drop Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors mb-3 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !isUploading && fileInputRef.current.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept={
                    formData.type === 'video' ? 'video/*' :
                      formData.type === 'image' ? 'image/*' :
                        formData.type === 'audio' ? 'audio/*' :
                          formData.type === 'pdf' ? '.pdf,application/pdf' : '*/*'
                  }
                />

                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <Loader size={32} className="animate-spin text-blue-600 mb-2" />
                    <p className="text-sm text-gray-600">Uploading...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload size={32} className="text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-700">Click to upload or drag & drop</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.type === 'video' ? 'MP4, WebM (Max 500MB)' :
                        formData.type === 'pdf' ? 'PDF (Max 50MB)' : 'Max 50MB'}
                    </p>
                  </div>
                )}
              </div>

              {/* Manual URL Input */}
              <div className="relative">
                <input
                  type="text"
                  value={formData.fileUrl}
                  onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg pl-10"
                  placeholder={`Or enter ${formData.type} URL...`}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <File size={16} />
                </div>
              </div>
            </div>
          )}

          {!showUpload && formData.type === 'link' && (
            <div>
              <label className="block text-sm font-medium mb-1">Link URL</label>
              <input
                type="text"
                value={formData.fileUrl}
                onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://..."
              />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors">Cancel</button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              disabled={isUploading}
            >
              {isUploading ? <Loader size={16} className="animate-spin" /> : null}
              Add Content
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
