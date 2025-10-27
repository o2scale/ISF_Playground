import React, { useState, useEffect } from 'react';
import StudentLayout from '../../components/student/StudentLayout';
import AppCard from '../../components/student/computer-apps/AppCard';
import LevelCard from '../../components/student/computer-apps/LevelCard';
import TaskDetails from '../../components/student/computer-apps/TaskDetails';
import { api } from '../../api';
import toast from 'react-hot-toast';

/**
 * ComputerAppsPage Component - Epic 01 Story 02
 * Three-pane layout for Computer Apps course interaction
 * Pane 1: Apps List | Pane 2: Levels List | Pane 3: Task Details
 */
export default function ComputerAppsPage() {
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [taskDetails, setTaskDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const studentId = localStorage.getItem('userId') || 'student123';

  // Fetch apps list on mount
  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/v2/lms/student/${studentId}/courses/computer-apps`);
      if (response.data.success) {
        setApps(response.data.apps || []);

        // Auto-select first app
        if (response.data.apps && response.data.apps.length > 0) {
          handleAppSelect(response.data.apps[0]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch apps:', error);
      toast.error('Failed to load Computer Apps');
    } finally {
      setLoading(false);
    }
  };

  const handleAppSelect = async (app) => {
    setSelectedApp(app);
    setSelectedLevel(null);
    setTaskDetails(null);

    try {
      const response = await api.get(
        `/api/v2/lms/student/${studentId}/courses/computer-apps/${app.id}/levels`
      );
      if (response.data.success) {
        setLevels(response.data.levels || []);

        // Auto-select first unlocked level
        const firstUnlockedLevel = response.data.levels.find(level => !level.locked);
        if (firstUnlockedLevel) {
          // Pass app explicitly to avoid stale state issue
          handleLevelSelect(firstUnlockedLevel, app);
        }
      }
    } catch (error) {
      console.error('Failed to fetch levels:', error);
      toast.error('Failed to load levels');
    }
  };

  const handleLevelSelect = async (level, app = selectedApp) => {
    // Add null checks to prevent errors
    if (!level || !level.id) {
      console.warn('Invalid level selected:', level);
      setTaskDetails(null);
      return;
    }

    if (!app || !app.id) {
      console.warn('No app selected, cannot load task details');
      setTaskDetails(null);
      return;
    }

    if (level.locked) {
      toast.error(level.unlockMessage || 'This level is locked');
      return;
    }

    setSelectedLevel(level);

    try {
      // For now, using the first task in the level
      // TODO: Expand to show all tasks in level
      const taskId = `task-${level.id}-1`;
      const response = await api.get(
        `/api/v2/lms/student/${studentId}/courses/computer-apps/${app.id}/levels/${level.id}/task/${taskId}`
      );
      if (response.data.success) {
        setTaskDetails(response.data.task);
      }
    } catch (error) {
      console.error('Failed to fetch task details:', error);
      toast.error('Failed to load task details');
      setTaskDetails(null);
    }
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Computer Apps...</p>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="flex h-[calc(100vh-128px)] overflow-hidden">
        {/* Pane 1: Apps List */}
        <div className="w-60 border-r border-gray-200 overflow-y-auto p-4 bg-white">
          <div className="bg-orange-100 rounded-lg p-3 mb-4">
            <h2 className="text-lg font-bold text-gray-900">COMPUTER APPS</h2>
          </div>

          {apps.length === 0 ? (
            <p className="text-gray-500 text-center">No apps available</p>
          ) : (
            apps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                isSelected={selectedApp?.id === app.id}
                onClick={handleAppSelect}
              />
            ))
          )}
        </div>

        {/* Pane 2: Levels List */}
        <div className="w-60 border-r border-gray-200 overflow-y-auto p-4 bg-white">
          {selectedApp ? (
            <>
              <div className="bg-blue-100 rounded-lg p-3 mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  {selectedApp.name.toUpperCase()} LEVELS
                </h2>
              </div>

              {levels.length === 0 ? (
                <p className="text-gray-500 text-center">No levels available</p>
              ) : (
                levels.map((level) => (
                  <LevelCard
                    key={level.id}
                    level={level}
                    isSelected={selectedLevel?.id === level.id}
                    onClick={handleLevelSelect}
                  />
                ))
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-center p-4">
              <p>Select an app to view levels</p>
            </div>
          )}
        </div>

        {/* Pane 3: Task Details */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <TaskDetails task={taskDetails} />
        </div>
      </div>
    </StudentLayout>
  );
}
