import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import CoachAssignmentsView from '../../components/coach/CoachAssignmentsView';

export default function CoachAssignmentsPage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <CoachAssignmentsView
      coachId={user._id}
      coachName={`${user.firstName} ${user.lastName}`}
      balagruhaName={user.balagruha?.name}
    />
  );
}
