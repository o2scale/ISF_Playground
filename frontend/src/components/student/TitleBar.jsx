import React, { useState, useEffect } from 'react';
import { api } from '../../api';
import TransactionHistoryModal from './coins/TransactionHistoryModal';
import MilestoneCelebrationModal from './coins/MilestoneCelebrationModal';
import useMilestones from '../../hooks/useMilestones';

/**
 * TitleBar Component - Epic 01 Story 01 + Story 06
 * Persistent header for student pages showing:
 * - ISF Playground logo
 * - Real-time coin balance (clickable - opens transaction history modal)
 * - Notification bell with unread count
 * - Session timer (HH:MM:SS)
 * - Offline indicator
 * - Milestone celebrations (100, 500, 1000, 5000 coins)
 */
export default function TitleBar() {
  // State management
  const [coinBalance, setCoinBalance] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [sessionTime, setSessionTime] = useState(0); // seconds
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [loading, setLoading] = useState(true);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  // Milestone detection hook (Epic 01 Story 06 - Phase 3)
  const { celebrationMilestone, closeCelebration } = useMilestones(coinBalance);

  // Format session time as HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Fetch coin balance from API
  const fetchCoinBalance = async () => {
    try {
      // TODO: Get actual student ID from auth context
      const studentId = localStorage.getItem('userId') || 'student123';
      const response = await api.get(`/api/v2/lms/student/${studentId}/coins`);
      if (response.data.success) {
        setCoinBalance(response.data.balance || 0);
      }
    } catch (error) {
      console.error('Failed to fetch coin balance:', error);
      // Use cached value if offline
      if (isOffline) {
        const cachedBalance = localStorage.getItem('cachedCoinBalance');
        if (cachedBalance) {
          setCoinBalance(parseInt(cachedBalance, 10));
        }
      }
    }
  };

  // Fetch unread notification count
  const fetchNotificationCount = async () => {
    try {
      const studentId = localStorage.getItem('userId') || 'student123';
      const response = await api.get(`/api/v2/lms/student/${studentId}/notifications/count`);
      if (response.data.success) {
        setUnreadCount(response.data.unreadCount || 0);
      }
    } catch (error) {
      console.error('Failed to fetch notification count:', error);
    }
  };

  // Initialize session timer from localStorage
  const initSessionTimer = () => {
    const today = new Date().toDateString();
    const lastResetDate = localStorage.getItem('sessionResetDate');

    // Reset timer if it's a new day
    if (lastResetDate !== today) {
      localStorage.setItem('sessionResetDate', today);
      localStorage.setItem('sessionTime', '0');
      setSessionTime(0);
    } else {
      // Load saved session time
      const savedTime = localStorage.getItem('sessionTime');
      if (savedTime) {
        setSessionTime(parseInt(savedTime, 10));
      }
    }
  };

  // Handle online/offline events
  const handleOnline = () => {
    setIsOffline(false);
    fetchCoinBalance();
    fetchNotificationCount();
  };

  const handleOffline = () => {
    setIsOffline(true);
  };

  // Handle notification bell click
  const handleNotificationClick = () => {
    // TODO: Open notification center dropdown (Epic 05 Story 01)
    console.log('Open notification center');
  };

  // Effects
  useEffect(() => {
    // Initialize session timer
    initSessionTimer();

    // Fetch initial data
    fetchCoinBalance();
    fetchNotificationCount();
    setLoading(false);

    // Set up coin balance polling (every 2 seconds - Epic 01 Story 06 - Phase 4)
    const coinInterval = setInterval(fetchCoinBalance, 2000);

    // Set up notification count polling (every 30 seconds)
    const notificationInterval = setInterval(fetchNotificationCount, 30000);

    // Set up session timer (every 1 second)
    const timerInterval = setInterval(() => {
      setSessionTime(prev => {
        const newTime = prev + 1;
        localStorage.setItem('sessionTime', String(newTime));
        return newTime;
      });
    }, 1000);

    // Offline/Online listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      clearInterval(coinInterval);
      clearInterval(notificationInterval);
      clearInterval(timerInterval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Cache coin balance for offline use
  useEffect(() => {
    if (coinBalance > 0) {
      localStorage.setItem('cachedCoinBalance', String(coinBalance));
    }
  }, [coinBalance]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left: Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 flex items-center justify-center bg-purple-600 rounded-lg text-white font-bold text-xl">
              I
            </div>
            <h1 className="text-xl font-bold text-gray-900 hidden md:block">
              ISF Playground
            </h1>
          </div>

          {/* Right: Coin Balance, Notifications, Session Timer */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Coin Balance - Epic 01 Story 06: Clickable, opens transaction history modal */}
            <button
              onClick={() => setShowTransactionModal(true)}
              className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-300 hover:bg-yellow-200 transition-colors cursor-pointer"
              aria-label="View coin balance and transaction history"
            >
              <span className="text-2xl">💰</span>
              <span className="font-bold text-xl text-gray-900">
                {loading ? '...' : coinBalance.toLocaleString()}
              </span>
              {isOffline && (
                <span className="text-xs text-gray-600 ml-1">(Offline)</span>
              )}
            </button>

            {/* Notification Bell */}
            <button
              onClick={handleNotificationClick}
              className="relative hover:bg-gray-100 p-2 rounded-full transition-colors"
              aria-label="Notifications"
            >
              <span className="text-2xl">🔔</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Session Timer */}
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-xl">⏱️</span>
              <span className="font-medium text-base hidden sm:block">
                {formatTime(sessionTime)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Offline Banner */}
      {isOffline && (
        <div className="bg-yellow-200 border-b border-yellow-300 px-6 py-2 text-center sticky top-[72px] z-40">
          <span className="text-sm font-medium text-gray-800">
            ⚠️ You are offline. Some features may not work.
          </span>
        </div>
      )}

      {/* Transaction History Modal - Epic 01 Story 06 - Phase 1 */}
      <TransactionHistoryModal
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        currentBalance={coinBalance}
      />

      {/* Milestone Celebration Modal - Epic 01 Story 06 - Phase 3 */}
      <MilestoneCelebrationModal
        milestone={celebrationMilestone}
        onClose={closeCelebration}
      />
    </>
  );
}
