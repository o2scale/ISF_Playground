const Role = require("../models/role");

/**
 * Generate scope-based query filter for data access control
 * @param {Object} user - The authenticated user object
 * @param {string} scope - The permission scope ('own', 'balagruh', 'all')
 * @returns {Object} MongoDB query filter
 */
function getScopeFilter(user, scope) {
  if (!scope) {
    // Default to 'own' if scope is undefined (backward compatibility)
    scope = 'own';
  }

  switch (scope) {
    case 'all':
      // Admin or global access - no filtering
      return {};

    case 'balagruh':
      // Balagruh-level access - filter by user's assigned Balagruh(s)
      // Support both single balagruhId and multiple balagruhIds array
      if (user.balagruhIds && user.balagruhIds.length > 0) {
        return { balagruhId: { $in: user.balagruhIds } };
      } else if (user.balagruhId) {
        return { balagruhId: user.balagruhId };
      } else {
        // User has no assigned Balagruh - return filter that matches nothing
        return { balagruhId: null };
      }

    case 'own':
      // Own data only - filter by user ID
      return { userId: user._id };

    default:
      // Invalid scope - default to most restrictive (own)
      console.warn(`Invalid scope value: ${scope}. Defaulting to 'own'.`);
      return { userId: user._id };
  }
}

const checkPermission = (module, action) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res
          .status(403)
          .json({ error: "Access denied. User role is not defined." });
      }

      const userRole = req.user.role;

      const role = await Role.findOne({ roleName: userRole });

      if (!role) {
        return res
          .status(403)
          .json({ error: "Access denied. Role not found." });
      }

      // Find the permission that matches module and action
      const permission = role.permissions.find((permission) => {
        return (
          permission.module === module && permission.actions.includes(action)
        );
      });

      if (!permission) {
        return res.status(403).json({
          error:
            "Access denied. You do not have permission to perform this action.",
        });
      }

      // RBAC Refactor: Inject scope-based filter for data access control
      // Controllers will use req.scopeFilter to filter queries by Balagruh/User
      req.scopeFilter = getScopeFilter(req.user, permission.scope);

      // Store the permission scope for debugging/logging
      req.permissionScope = permission.scope || 'own';

      next();
    } catch (error) {
      console.error("Error in checkPermission middleware:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};

module.exports = checkPermission;
module.exports.getScopeFilter = getScopeFilter; // Export for testing
