import React, { useState } from 'react';
import {
  Video,
  FileText,
  Music,
  Image,
  AlignLeft,
  Link,
  HelpCircle,
  CheckSquare,
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  GripVertical,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';
import EditContentItemModal from './EditContentItemModal';

/**
 * ContentItemCard - Sprint 2 Epic 02 Story 01
 * Displays an individual content item (video, PDF, quiz, etc.)
 */

export default function ContentItemCard({
  contentItem,
  chapterId,
  moduleId,
  courseId,
  onContentUpdated
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const navigate = useNavigate();

  // Drag-and-drop
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: contentItem._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  // Get icon based on content type
  const getIcon = () => {
    const iconProps = { size: 18, className: 'text-gray-600' };

    switch (contentItem.type) {
      case 'video':
        return <Video {...iconProps} />;
      case 'pdf':
        return <FileText {...iconProps} />;
      case 'audio':
        return <Music {...iconProps} />;
      case 'image':
        return <Image {...iconProps} />;
      case 'text':
        return <AlignLeft {...iconProps} />;
      case 'link':
        return <Link {...iconProps} />;
      case 'quiz':
        return <HelpCircle {...iconProps} />;
      case 'task':
        return <CheckSquare {...iconProps} />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  // Get metadata text based on content type
  const getMetadata = () => {
    const parts = [];

    if (contentItem.type === 'video' && contentItem.metadata?.duration) {
      const minutes = Math.floor(contentItem.metadata.duration / 60);
      const seconds = contentItem.metadata.duration % 60;
      parts.push(`Duration: ${minutes}:${seconds.toString().padStart(2, '0')}`);
    }

    if (contentItem.type === 'audio' && contentItem.metadata?.duration) {
      const minutes = Math.floor(contentItem.metadata.duration / 60);
      const seconds = contentItem.metadata.duration % 60;
      parts.push(`Duration: ${minutes}:${seconds.toString().padStart(2, '0')}`);
    }

    if (contentItem.type === 'pdf' && contentItem.metadata?.pages) {
      parts.push(`Pages: ${contentItem.metadata.pages}`);
    }

    if (contentItem.metadata?.fileSize) {
      const mb = (contentItem.metadata.fileSize / (1024 * 1024)).toFixed(2);
      parts.push(`File Size: ${mb} MB`);
    }

    if (contentItem.type === 'quiz') {
      const qCount = contentItem.quizRef?.questions?.length || contentItem.quizData?.questions?.length || 0;
      parts.push(`${qCount} Questions`);
      if (contentItem.quizData?.timeLimit) {
        parts.push(`Time Limit: ${contentItem.quizData.timeLimit} min`);
      }
    }

    if (contentItem.createdAt) {
      parts.push(`Added: ${new Date(contentItem.createdAt).toLocaleDateString()}`);
    }

    return parts.join(' • ');
  };

  const handlePreview = () => {
    const previewUrl = contentItem.fileUrl || contentItem.externalUrl;

    if (previewUrl && ['video', 'pdf', 'image', 'audio'].includes(contentItem.type)) {
      // Open embedded preview modal for supported media types
      setIsPreviewOpen(true);
    } else if (contentItem.type === 'quiz' && contentItem.quizRef?._id) {
      navigate(`/admin/quizzes/${contentItem.quizRef._id}/edit`);
    } else if (previewUrl) {
      // Fallback for links and unsupported types — open in new tab
      window.open(previewUrl, '_blank');
    } else {
      toast('Preview not available for this item');
    }
    setShowMenu(false);
  };

  const handleEdit = () => {
    if (contentItem.type === 'quiz' && contentItem.quizRef?._id) {
      navigate(`/admin/quizzes/${contentItem.quizRef._id}/edit`);
    } else {
      setIsEditModalOpen(true);
    }
    setShowMenu(false);
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${contentItem.title}"?`)) {
      setShowMenu(false);
      return;
    }

    try {
      const response = await api.delete(
        `/api/v2/lms/admin/courses/${courseId}/modules/${moduleId}/chapters/${chapterId}/content/${contentItem._id}`
      );

      if (response.data.success) {
        toast.success('Content item deleted successfully');
        onContentUpdated();
      }
    } catch (error) {
      console.error('Error deleting content item:', error);
      toast.error('Failed to delete content item');
    } finally {
      setShowMenu(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`ml-7 bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors ${isDragging ? 'shadow-lg ring-2 ring-blue-200' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 flex items-start gap-3">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="flex-shrink-0 mt-0.5 p-0.5 hover:bg-gray-200 rounded transition-colors cursor-grab active:cursor-grabbing"
            title="Drag to reorder"
          >
            <GripVertical size={16} className="text-gray-200" />
          </button>

          {/* Content Type Icon */}
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>

          {/* Content Info */}
          <div className="flex-1 min-w-0">
            <h5 className="text-sm font-medium text-gray-900 truncate">
              {contentItem.title}
            </h5>
            {contentItem.description && (
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {contentItem.description}
              </p>
            )}
            {getMetadata() && (
              <p className="text-xs text-gray-500 mt-1">
                {getMetadata()}
              </p>
            )}
          </div>
        </div>

        {/* Content Item Menu */}
        <div className="relative flex-shrink-0 ml-2">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <MoreVertical size={16} className="text-gray-600" />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 py-2 w-44 z-20">
                <button
                  onClick={handlePreview}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Eye size={14} />
                  Preview
                </button>
                <button
                  onClick={handleEdit}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                <div className="border-t border-gray-200 my-1" />
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {isEditModalOpen && (
        <EditContentItemModal
          isOpen={isEditModalOpen}
          contentItem={contentItem}
          chapterId={chapterId}
          moduleId={moduleId}
          courseId={courseId}
          onClose={() => setIsEditModalOpen(false)}
          onUpdated={onContentUpdated}
        />
      )}

      {/* Embedded Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-3 border-b">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{contentItem.title}</h3>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center min-h-[300px]">
              {contentItem.type === 'video' && (
                <video
                  src={contentItem.fileUrl || contentItem.externalUrl}
                  controls
                  className="max-w-full max-h-[70vh] rounded"
                >
                  Your browser does not support the video tag.
                </video>
              )}
              {contentItem.type === 'audio' && (
                <div className="text-center">
                  <Music size={64} className="mx-auto mb-4 text-gray-400" />
                  <audio
                    src={contentItem.fileUrl || contentItem.externalUrl}
                    controls
                    className="w-full max-w-md"
                  />
                </div>
              )}
              {contentItem.type === 'image' && (
                <img
                  src={contentItem.fileUrl || contentItem.externalUrl}
                  alt={contentItem.title}
                  className="max-w-full max-h-[70vh] rounded object-contain"
                />
              )}
              {contentItem.type === 'pdf' && (
                <iframe
                  src={contentItem.fileUrl || contentItem.externalUrl}
                  title={contentItem.title}
                  className="w-full h-[70vh] rounded border"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div >
  );
}
