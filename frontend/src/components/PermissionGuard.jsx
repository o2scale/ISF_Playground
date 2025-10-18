/**
 * PermissionGuard Component - Conditional Rendering Based on Permissions
 *
 * Purpose: Show/hide UI elements based on user permissions
 * Created: 2025-10-18 22:28:00
 * Sprint: 1.1 - RBAC Refactor
 *
 * Usage:
 *   <PermissionGuard module="User Management" action="Create">
 *     <button>Create User</button>
 *   </PermissionGuard>
 *
 * Advanced:
 *   <PermissionGuard
 *     module="User Management"
 *     action="Delete"
 *     fallback={<p>You don't have permission to delete users.</p>}
 *   >
 *     <button>Delete User</button>
 *   </PermissionGuard>
 */

import React from 'react';
import usePermission from '../hooks/usePermission';

export const PermissionGuard = ({
  module,
  action,
  children,
  fallback = null,
  hideIfNoPermission = true,
}) => {
  const hasPermission = usePermission(module, action);

  if (!hasPermission) {
    if (hideIfNoPermission) {
      return null; // Don't render anything
    }
    return fallback; // Render fallback content
  }

  return <>{children}</>;
};

export default PermissionGuard;
