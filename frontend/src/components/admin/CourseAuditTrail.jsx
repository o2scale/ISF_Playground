import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, Archive, RotateCcw, Edit, AlertCircle } from 'lucide-react';
import { api } from '../../api';
import toast from 'react-hot-toast';

/**
 * CourseAuditTrail - Epic 02 Story 05
 * Timeline component showing all status changes and modifications
 *
 * Acceptance Criteria:
 * AUDIT-01: Timeline shows all status changes (draft->published, published->archived, etc)
 * AUDIT-02: Each entry shows admin name, timestamp, action performed
 * AUDIT-03: Archived entries show reason if provided
 * AUDIT-04: Timeline sorted chronologically (newest first)
 * AUDIT-05: Visual indicators for each action type (color-coded icons)
 */
export default function CourseAuditTrail({ courseId }) {
  const [loading, setLoading] = useState(false);
  const [auditLog, setAuditLog] = useState([]);

  useEffect(() => {
    if (courseId) {
      fetchAuditLog();
    }
  }, [courseId]);

  const fetchAuditLog = async () => {
    try {
      setLoading(true);
      // Backend audit endpoint not yet implemented (Sprint 2 backlog)
      // For now, using mock data
      setAuditLog([
        {
          _id: '1',
          action: 'created',
          performedBy: { name: 'Admin User', email: 'admin@example.com' },
          timestamp: new Date().toISOString(),
          details: { status: 'draft' }
        }
      ]);
    } catch (error) {
      console.error('Error fetching audit log:', error);
      toast.error('Failed to load audit trail');
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'created':
        return <Edit className="text-blue-600" size={20} />;
      case 'published':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'archived':
        return <Archive className="text-red-600" size={20} />;
      case 'restored':
        return <RotateCcw className="text-blue-600" size={20} />;
      case 'unpublished':
        return <AlertCircle className="text-yellow-600" size={20} />;
      case 'updated':
        return <Edit className="text-gray-600" size={20} />;
      default:
        return <Clock className="text-gray-600" size={20} />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'created':
        return 'border-blue-300 bg-blue-50';
      case 'published':
        return 'border-green-300 bg-green-50';
      case 'archived':
        return 'border-red-300 bg-red-50';
      case 'restored':
        return 'border-blue-300 bg-blue-50';
      case 'unpublished':
        return 'border-yellow-300 bg-yellow-50';
      case 'updated':
        return 'border-gray-300 bg-gray-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getActionLabel = (entry) => {
    switch (entry.action) {
      case 'created':
        return 'Course created as draft';
      case 'published':
        return 'Course published';
      case 'archived':
        return 'Course archived';
      case 'restored':
        return `Course restored to ${entry.details?.restoredToStatus || 'published'} status`;
      case 'unpublished':
        return 'Course unpublished (returned to draft)';
      case 'updated':
        return 'Course details updated';
      default:
        return 'Status changed';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-3 text-gray-600">Loading audit trail...</span>
      </div>
    );
  }

  if (!auditLog || auditLog.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Clock size={48} className="mx-auto mb-3 text-gray-400" />
        <p>No audit history available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Course History</h3>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>

        {/* Timeline entries */}
        <div className="space-y-4">
          {auditLog.map((entry, index) => (
            <div key={entry._id || index} className="relative flex gap-4">
              {/* Icon circle */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full border-4 border-white ${getActionColor(entry.action)} flex items-center justify-center z-10`}>
                {getActionIcon(entry.action)}
              </div>

              {/* Content card */}
              <div className={`flex-1 border-2 rounded-lg p-4 ${getActionColor(entry.action)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-gray-900">{getActionLabel(entry)}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      by <span className="font-semibold">{entry.performedBy?.name || 'Unknown'}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={12} />
                      {formatTimestamp(entry.timestamp)}
                    </p>
                  </div>
                </div>

                {/* Reason (for archive) */}
                {entry.action === 'archived' && entry.details?.reason && (
                  <div className="mt-2 pt-2 border-t border-red-200">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Reason:</span> <span className="italic">"{entry.details.reason}"</span>
                    </p>
                  </div>
                )}

                {/* Additional details */}
                {entry.details?.notifiedCoaches && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                      Coaches were notified about this change
                    </p>
                  </div>
                )}

                {/* Status change details */}
                {entry.details?.previousStatus && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                      Changed from <span className="font-semibold">{entry.details.previousStatus}</span> to{' '}
                      <span className="font-semibold">{entry.details.newStatus}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
