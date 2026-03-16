import React from 'react';
import PerformanceMetrics from './PerformanceMetrics';
import Leaderboard from './Leaderboard';
import toast from 'react-hot-toast';

/**
 * TaskDetails Component - Epic 01 Story 02
 * Displays task details in Pane 3
 * Shows title, instructions, metrics, action buttons, and leaderboard
 */
export default function TaskDetails({ task }) {
  if (!task) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <div className="text-center text-gray-500">
          <span className="text-6xl mb-4 block">📝</span>
          <p className="text-lg">Select a level to see task details</p>
        </div>
      </div>
    );
  }

  const {
    title,
    instructions,
    taskType,
    toolName,
    performanceMetrics,
    leaderboard
  } = task;

  // Handle Start Task button click
  const handleStartTask = () => {
    // In-browser task launch not yet implemented
    toast.success('Starting task in browser...');
  };

  // Handle Open External Tool button click
  const handleOpenTool = () => {
    // Electron IPC tool launch not yet implemented
    // For web-based app, show placeholder message
    toast(`Opening ${toolName}...`, { icon: '🚀' });

    // Placeholder: In Electron app, this would use ipcRenderer.send('launch-tool', { toolName })
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Task Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        TASK: {title.toUpperCase()}
      </h2>

      {/* Performance Metrics */}
      <PerformanceMetrics metrics={performanceMetrics} />

      {/* Instructions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructions:</h3>
        <div className="text-base text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 border border-gray-200 rounded-lg p-4">
          {instructions}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {taskType === 'in_browser' && (
          <button
            onClick={handleStartTask}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Start Task in Browser
          </button>
        )}

        {taskType === 'external_tool' && toolName && (
          <button
            onClick={handleOpenTool}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md"
          >
            Open {toolName}
          </button>
        )}

        {/* Mark as Complete Button (if task not completed) */}
        {performanceMetrics && !performanceMetrics.completed && (
          <button
            onClick={() => {
              toast.success('Task marked as complete!');
              // Progress update API call not yet implemented
            }}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            ✓ Mark as Complete
          </button>
        )}
      </div>

      {/* Leaderboard */}
      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
}
