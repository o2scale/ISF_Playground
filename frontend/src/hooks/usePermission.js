/**
 * usePermission Hook - RBAC Permission Check
 *
 * Purpose: Check if current user has permission for a specific module and action
 * Created: 2025-10-18 22:28:00
 * Sprint: 1.1 - RBAC Refactor
 *
 * Usage:
 *   const hasPermission = usePermission('User Management', 'Read');
 *   const canEdit = usePermission('Student Management', 'Update');
 */

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const usePermission = (module, action) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return false;
  }

  // Admin role has all permissions
  if (user.role === 'admin') {
    return true;
  }

  // Check if user has permissions array (new RBAC system)
  if (user.permissions && Array.isArray(user.permissions)) {
    return user.permissions.some((permission) => {
      return (
        permission.module === module &&
        permission.actions &&
        permission.actions.includes(action)
      );
    });
  }

  // Fallback: role-based check (old system)
  // This will be deprecated once all users have permissions array
  return false;
};

export default usePermission;
