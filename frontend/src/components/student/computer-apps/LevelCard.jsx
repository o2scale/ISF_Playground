import React from 'react';

/**
 * LevelCard Component - Epic 01 Story 02
 * Displays a level card in Pane 2 (Levels List)
 * Shows level name, progress, coins earned, and lock status
 */
export default function LevelCard({ level, isSelected, onClick }) {
  const {
    id,
    name,
    totalTasks,
    completedTasks,
    status,
    coinsEarned,
    locked,
    unlockMessage,
    progressPercentage
  } = level;

  // Determine card styling based on status
  const getCardStyles = () => {
    const baseStyles = 'w-full p-3 mb-2 rounded-lg border transition-colors';

    if (locked) {
      return `${baseStyles} bg-gray-100 border border-gray-300 cursor-not-allowed opacity-75`;
    }

    if (isSelected) {
      return `${baseStyles} bg-blue-50 border-l-4 border-blue-600 border-r border-t border-b border-gray-200 cursor-pointer`;
    }

    if (status === 'completed') {
      return `${baseStyles} bg-green-50 border-l-4 border-green-600 border-r border-t border-b border-gray-200 hover:bg-green-100 cursor-pointer`;
    } else if (status === 'in_progress') {
      return `${baseStyles} bg-blue-50 border-l-4 border-blue-600 border-r border-t border-b border-gray-200 hover:bg-blue-100 cursor-pointer`;
    } else {
      return `${baseStyles} bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer`;
    }
  };

  const handleClick = () => {
    if (!locked) {
      onClick(level);
    }
  };

  const handleKeyDown = (e) => {
    if (!locked && (e.key === 'Enter' || e.key === ' ')) {
      onClick(level);
    }
  };

  return (
    <div
      className={getCardStyles()}
      onClick={handleClick}
      role="button"
      tabIndex={locked ? -1 : 0}
      onKeyDown={handleKeyDown}
      aria-label={`${name} - ${completedTasks} of ${totalTasks} tasks completed`}
      aria-disabled={locked}
    >
      {/* Level Name */}
      <div className="text-base font-semibold text-gray-900 mb-2">
        {name}
      </div>

      {/* Task Progress */}
      <div className="text-sm text-gray-600 mb-1">
        {completedTasks} of {totalTasks} tasks
      </div>

      {/* Locked Status */}
      {locked ? (
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <span className="mr-1">🔒</span>
          <span>{unlockMessage || 'Complete previous level to unlock'}</span>
        </div>
      ) : (
        <>
          {/* Completed Status */}
          {status === 'completed' && (
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-sm text-green-600">
                <span className="mr-1">✓</span>
                <span>Completed!</span>
              </div>
              {coinsEarned > 0 && (
                <div className="text-sm text-yellow-600 font-semibold">
                  💰 {coinsEarned} coins
                </div>
              )}
            </div>
          )}

          {/* In Progress Status with Progress Bar */}
          {status === 'in_progress' && (
            <div className="mt-2">
              <div className="flex items-center text-sm text-blue-600 mb-1">
                <span className="mr-1">⏳</span>
                <span>In Progress</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${progressPercentage || 0}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Progress: {progressPercentage || 0}%
              </div>
            </div>
          )}

          {/* Not Started Status */}
          {status === 'not_started' && (
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <span className="mr-1">🎯</span>
              <span>Not started</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
