import React, { useState } from 'react';
import { MoreVertical, Calendar, BarChart2 } from 'lucide-react';
import { api } from '../../api';
import toast from 'react-hot-toast';
import ContextMenu from './ContextMenu';
import CourseCreationModal from './CourseCreationModal';

/**
 * CourseListView - Sprint 2 Epic 02 Story 01
 * Displays list of courses with context menu actions
 */

export default function CourseListView({
  courses,
  loading,
  onCourseUpdated,
  onCourseDeleted,
  onRefresh
}) {
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Status badge styles
  const getStatusBadge = (status) => {
    const styles = {
      draft: 'bg-gray-200 text-gray-700',
      published: 'bg-green-100 text-green-700',
      archived: 'bg-red-100 text-red-700'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${styles[status] || styles.draft}`}>
        {status === 'draft' && 'Draft'}
        {status === 'published' && 'Published'}
        {status === 'archived' && 'Archived'}
      </span>
    );
  };

  const handleMenuClick = (e, courseId) => {
    e.preventDefault();
    setSelectedCourseId(courseId);
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const closeMenu = () => {
    setSelectedCourseId(null);
  };

  const handleEdit = (course) => {
    setCourseToEdit(course);
    setIsEditModalOpen(true);
    closeMenu();
  };

  const handlePublish = async (courseId) => {
    try {
      setActionLoading(true);
      const response = await api.put(`/api/v2/lms/admin/courses/${courseId}/publish`);

      if (response.data.success) {
        toast.success('Course published successfully!');
        onRefresh();
      }
    } catch (error) {
      console.error('Error publishing course:', error);

      if (error.response?.data?.errors) {
        // Validation errors
        const errorList = error.response.data.errors.join(', ');
        toast.error(`Cannot publish: ${errorList}`);
      } else {
        toast.error('Failed to publish course');
      }
    } finally {
      setActionLoading(false);
      closeMenu();
    }
  };

  const handleArchive = async (courseId) => {
    if (!window.confirm('Are you sure you want to archive this course? It will be hidden from students and coaches.')) {
      closeMenu();
      return;
    }

    try {
      setActionLoading(true);
      const response = await api.put(`/api/v2/lms/admin/courses/${courseId}/archive`);

      if (response.data.success) {
        toast.success('Course archived successfully!');
        onRefresh();
      }
    } catch (error) {
      console.error('Error archiving course:', error);
      toast.error('Failed to archive course');
    } finally {
      setActionLoading(false);
      closeMenu();
    }
  };

  const handleRestore = async (courseId) => {
    try {
      setActionLoading(true);
      const response = await api.put(`/api/v2/lms/admin/courses/${courseId}/restore`, {
        restoreToStatus: 'published'
      });

      if (response.data.success) {
        toast.success('Course restored successfully!');
        onRefresh();
      }
    } catch (error) {
      console.error('Error restoring course:', error);
      toast.error('Failed to restore course');
    } finally {
      setActionLoading(false);
      closeMenu();
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course permanently? This action cannot be undone.')) {
      closeMenu();
      return;
    }

    try {
      setActionLoading(true);
      const response = await api.delete(`/api/v2/lms/admin/courses/${courseId}`);

      if (response.data.success) {
        onCourseDeleted(courseId);
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course');
    } finally {
      setActionLoading(false);
      closeMenu();
    }
  };

  const handleDuplicate = async (courseId) => {
    try {
      setActionLoading(true);
      const response = await api.post(`/api/v2/lms/admin/courses/${courseId}/duplicate`);

      if (response.data.success) {
        toast.success('Course duplicated successfully!');
        onRefresh();
      }
    } catch (error) {
      console.error('Error duplicating course:', error);
      toast.error('Failed to duplicate course');
    } finally {
      setActionLoading(false);
      closeMenu();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 text-lg mb-2">No courses found</p>
        <p className="text-gray-400 text-sm">
          Click "Create New Course" to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div
          key={course._id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-purple-400 transition-colors"
        >
          <div className="flex items-start gap-4">
            {/* Thumbnail */}
            <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  {course.icon || '📚'}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {course.title}
                    </h3>
                    {getStatusBadge(course.status)}
                  </div>
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Context Menu Button */}
                <button
                  onClick={(e) => handleMenuClick(e, course._id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={actionLoading}
                >
                  <MoreVertical size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
                <span>Category: <span className="font-medium text-gray-700">{course.category}</span></span>
                <span>•</span>
                <span>Difficulty: <span className="font-medium text-gray-700">{course.difficultyLevel}</span></span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <BarChart2 size={16} />
                  <span>
                    {course.moduleCount || 0} Modules • {course.chapterCount || 0} Chapters • {course.contentItemCount || 0} Items
                  </span>
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>Created: {new Date(course.createdAt).toLocaleDateString()}</span>
                </div>
                <span>•</span>
                <span>Last Updated: {new Date(course.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Context Menu */}
      {selectedCourseId && (
        <ContextMenu
          courseId={selectedCourseId}
          course={courses.find(c => c._id === selectedCourseId)}
          position={menuPosition}
          onClose={closeMenu}
          onEdit={handleEdit}
          onPublish={handlePublish}
          onArchive={handleArchive}
          onRestore={handleRestore}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && courseToEdit && (
        <CourseCreationModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setCourseToEdit(null);
          }}
          onCourseCreated={(updatedCourse) => {
            onCourseUpdated(updatedCourse);
            setIsEditModalOpen(false);
            setCourseToEdit(null);
          }}
          courseToEdit={courseToEdit}
        />
      )}
    </div>
  );
}
