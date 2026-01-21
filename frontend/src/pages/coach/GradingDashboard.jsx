// frontend/src/pages/coach/GradingDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import config from '../../config';
import SubmissionQueue from '../../components/coach/grading/SubmissionQueue';
import ArtGradingInterface from '../../components/coach/grading/ArtGradingInterface';
import VideoGradingInterface from '../../components/coach/grading/VideoGradingInterface';
import AudioGradingInterface from '../../components/coach/grading/AudioGradingInterface';

export default function GradingDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ pending: 0, graded: 0, flagged: 0, thisWeek: 0 });
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [showGradingInterface, setShowGradingInterface] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    courseType: 'all',
    status: 'pending',
    sortBy: 'oldest_first',
    search: '',
  });
  const [allSubmissions, setAllSubmissions] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      fetchSubmissions();
    }
  }, [user, filters.courseType, filters.status, filters.sortBy]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const queryParams = new URLSearchParams({
        courseType: filters.courseType,
        status: filters.status,
        sortBy: filters.sortBy,
        limit: 20,
        offset: 0,
      });

      const response = await axios.get(
        `${config.API_BASE_URL}/api/v2/lms/coach/grading/${user.id}/submissions?${queryParams}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAllSubmissions(response.data.submissions || []);
      setStats(response.data.stats || { pending: 0, graded: 0, flagged: 0, thisWeek: 0 });
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  // Client-side filtering for search
  const filteredSubmissions = allSubmissions.filter((submission) => {
    if (!filters.search) return true;
    const searchLower = filters.search.toLowerCase();
    const studentName = submission.studentName?.toLowerCase() || '';
    const courseTitle = submission.courseTitle?.toLowerCase() || '';
    const taskTitle = submission.taskTitle?.toLowerCase() || '';
    return studentName.includes(searchLower) || courseTitle.includes(searchLower) || taskTitle.includes(searchLower);
  });

  const handleOpenGrading = (submission) => {
    setCurrentSubmission(submission);
    setShowGradingInterface(true);
  };

  const handleCloseGrading = () => {
    setCurrentSubmission(null);
    setShowGradingInterface(false);
    // Refresh submissions after grading
    fetchSubmissions();
  };

  // Navigation controls
  const handleNavigate = (direction) => {
    const currentIndex = filteredSubmissions.findIndex(
      (sub) => sub.id === currentSubmission.id
    );
    if (direction === 'previous' && currentIndex > 0) {
      setCurrentSubmission(filteredSubmissions[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < filteredSubmissions.length - 1) {
      setCurrentSubmission(filteredSubmissions[currentIndex + 1]);
    }
  };

  const handleSkip = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${config.API_BASE_URL}/api/v2/lms/coach/grading/submissions/${currentSubmission.id}/skip`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Submission skipped');
      handleNavigate('next');
    } catch (error) {
      console.error('Error skipping submission:', error);
      toast.error('Failed to skip submission');
    }
  };

  const handleFlag = async () => {
    try {
      const token = localStorage.getItem('token');
      const reason = prompt('Enter reason for flagging this submission:');
      if (!reason) return;

      await axios.put(
        `${config.API_BASE_URL}/api/v2/lms/coach/grading/submissions/${currentSubmission.id}/flag`,
        { reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Submission flagged for admin review');
      handleNavigate('next');
    } catch (error) {
      console.error('Error flagging submission:', error);
      toast.error('Failed to flag submission');
    }
  };

  const handleFilterChange = (filterKey, value) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }));
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4 border-b border-blue-700">
        <h1 className="text-2xl font-bold">Syllabus Tracker & Grading</h1>
        <div className="text-sm mt-1">
          Coach: {user.firstName} {user.lastName}
          {user.balagruha?.name && ` • Balagruha: ${user.balagruha.name}`}
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="w-full px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending Submissions</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-gray-900">{stats.graded}</div>
            <div className="text-sm text-gray-600">Graded Submissions</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-3xl mb-2">⚠️</div>
            <div className="text-2xl font-bold text-gray-900">{stats.flagged}</div>
            <div className="text-sm text-gray-600">Flagged for Review</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-2xl font-bold text-gray-900">{stats.thisWeek}</div>
            <div className="text-sm text-gray-600">This Week</div>
          </div>
        </div>

        {/* Submission Queue */}
        <SubmissionQueue
          submissions={filteredSubmissions}
          loading={loading}
          filters={filters}
          onFilterChange={handleFilterChange}
          onOpenGrading={handleOpenGrading}
        />
      </div>

      {/* Grading Interface (Full Screen Modal) */}
      {showGradingInterface && currentSubmission && (
        <div className="fixed inset-0 bg-gray-900 z-50 overflow-y-auto">
          {currentSubmission.submissionType === 'art' && (
            <ArtGradingInterface
              submission={currentSubmission}
              onClose={handleCloseGrading}
              coachId={user.id}
              onNavigate={handleNavigate}
              onSkip={handleSkip}
              onFlag={handleFlag}
              currentIndex={filteredSubmissions.findIndex((sub) => sub.id === currentSubmission.id)}
              totalCount={filteredSubmissions.length}
            />
          )}
          {currentSubmission.submissionType === 'video' && (
            <VideoGradingInterface
              submission={currentSubmission}
              onClose={handleCloseGrading}
              coachId={user.id}
              onNavigate={handleNavigate}
              onSkip={handleSkip}
              onFlag={handleFlag}
              currentIndex={filteredSubmissions.findIndex((sub) => sub.id === currentSubmission.id)}
              totalCount={filteredSubmissions.length}
            />
          )}
          {currentSubmission.submissionType === 'audio' && (
            <AudioGradingInterface
              submission={currentSubmission}
              onClose={handleCloseGrading}
              coachId={user.id}
              onNavigate={handleNavigate}
              onSkip={handleSkip}
              onFlag={handleFlag}
              currentIndex={filteredSubmissions.findIndex((sub) => sub.id === currentSubmission.id)}
              totalCount={filteredSubmissions.length}
            />
          )}
        </div>
      )}
    </div>
  );
}
