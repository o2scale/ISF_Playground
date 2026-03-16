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

import { useAuth } from '../contexts/AuthContext';

export const usePermission = (module, action) => {
  const { user } = useAuth();

  const can = (checkAction, checkModule) => {
    if (!user) return false;
    if (user.role === 'admin') return true;

    if (user.permissions && Array.isArray(user.permissions)) {
      return user.permissions.some((permission) => {
        return (
          permission.module === checkModule &&
          permission.actions &&
          permission.actions.includes(checkAction)
        );
      });
    }
    return false;
  };

  // If called with args directly, return boolean (legacy usage)
  if (module && action) {
    return can(action, module);
  }

  // If called without args, return object with can() (ProtectedRoute usage)
  return { can };
};

export default usePermission;
