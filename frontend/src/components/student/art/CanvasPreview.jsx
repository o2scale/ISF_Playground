import React, { useState } from 'react';
import toast from 'react-hot-toast';

/**
 * CanvasPreview Component
 * Shows real-time canvas preview from Artweaver (via Electron IPC)
 * Currently shows placeholder - full implementation requires Electron
 */
export default function CanvasPreview({ onSubmit, onSave, showSaveButton = false }) {
  const [isArtweaverRunning, setIsArtweaverRunning] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  const handleLaunchArtweaver = () => {
    // Electron IPC call to launch Artweaver not yet implemented (Sprint 2 backlog)
    // window.electron.send('launch-artweaver', { canvasSize: { width: 1024, height: 768 } })

    toast.success('🎨 Opening Artweaver... (Placeholder - requires Electron)');
    setIsArtweaverRunning(true);

    // Simulate canvas content after 3 seconds
    setTimeout(() => {
      setHasContent(true);
      toast.success('✓ Canvas connected! Start drawing.');
    }, 3000);
  };

  const handleSubmit = () => {
    if (!hasContent) {
      toast.error('Please create some artwork before submitting');
      return;
    }
    if (onSubmit) {
      onSubmit();
    }
  };

  const handleSave = () => {
    if (!hasContent) {
      toast.error('Nothing to save yet');
      return;
    }
    if (onSave) {
      onSave();
    }
  };

  return (
    <div className="space-y-4">
      {/* Launch Artweaver Button */}
      {!isArtweaverRunning && (
        <button
          onClick={handleLaunchArtweaver}
          className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors duration-200 shadow-md"
        >
          🎨 Launch Artweaver
        </button>
      )}

      {/* Connection Status */}
      {isArtweaverRunning && (
        <div className="flex items-center gap-2 text-sm">
          <span className={`w-3 h-3 rounded-full ${hasContent ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></span>
          <span className="text-gray-700">
            {hasContent ? '🟢 Connected - Drawing in progress' : '🟡 Connecting to Artweaver...'}
          </span>
        </div>
      )}

      {/* Canvas Preview Area */}
      <div className="relative">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Canvas Preview</h3>
        <div className="border-2 border-pink-300 rounded-lg overflow-hidden bg-gray-50">
          <div
            className="relative flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
            style={{ aspectRatio: '4/3', minHeight: '400px' }}
          >
            {/* Empty State */}
            {!isArtweaverRunning && (
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-gray-500 font-medium">
                  Launch Artweaver to start drawing
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Your artwork will appear here in real-time
                </p>
              </div>
            )}

            {/* Connecting State */}
            {isArtweaverRunning && !hasContent && (
              <div className="text-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">
                  Connecting to Artweaver...
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Start drawing in Artweaver to see it here
                </p>
              </div>
            )}

            {/* Canvas Content (Placeholder) */}
            {hasContent && (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                {/* Placeholder for actual canvas screenshot */}
                <div className="text-center p-8">
                  <div className="text-4xl mb-3">🖼️</div>
                  <p className="text-gray-600 font-medium">
                    Your artwork appears here
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    (Real-time canvas mirroring requires Electron IPC)
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-gray-600">Canvas Size: 1024x768</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-gray-600">Updated: Just now</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Last Update Info */}
        {hasContent && (
          <p className="text-xs text-gray-500 mt-2">
            Updates every 2 seconds • Last updated: Just now
          </p>
        )}
      </div>

      {/* Action Buttons */}
      {hasContent && (
        <div className="flex gap-3 flex-wrap">
          {showSaveButton && (
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              💾 Save to My Gallery
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            ✓ Submit Artwork for Grading
          </button>
        </div>
      )}

      {/* Graphics Pad Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
        <div className="flex items-start gap-2">
          <span className="text-yellow-600">⚠️</span>
          <div>
            <p className="text-yellow-800 font-medium">Graphics Pad Detection</p>
            <p className="text-yellow-700 mt-1">
              USB graphics pad auto-detection requires Electron. You can still use your mouse for drawing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
