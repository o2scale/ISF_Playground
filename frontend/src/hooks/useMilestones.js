import { useState, useEffect, useRef } from 'react';

/**
 * useMilestones Hook - Epic 01 Story 06
 * Detects when student crosses coin milestones (100, 500, 1000, 5000)
 * Triggers celebration modal only once per milestone
 */
export default function useMilestones(currentBalance) {
  const [celebrationMilestone, setCelebrationMilestone] = useState(null);
  const previousBalance = useRef(currentBalance);
  const achievedMilestones = useRef(new Set());

  // Milestone thresholds
  const MILESTONES = [100, 500, 1000, 5000];

  useEffect(() => {
    // Check if balance increased and crossed a milestone
    if (currentBalance > previousBalance.current) {
      MILESTONES.forEach(milestone => {
        // Check if milestone was crossed (old balance < milestone <= new balance)
        if (
          previousBalance.current < milestone &&
          currentBalance >= milestone &&
          !achievedMilestones.current.has(milestone)
        ) {
          // Mark milestone as achieved
          achievedMilestones.current.add(milestone);

          // Trigger celebration
          setCelebrationMilestone(milestone);
        }
      });
    }

    // Update previous balance
    previousBalance.current = currentBalance;
  }, [currentBalance]);

  const closeCelebration = () => {
    setCelebrationMilestone(null);
  };

  return {
    celebrationMilestone,
    closeCelebration
  };
}
