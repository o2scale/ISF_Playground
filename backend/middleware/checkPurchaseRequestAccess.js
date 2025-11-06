/**
 * Sprint5-Story-24: Multi-Role Purchase Request Access Middleware
 * Allows Coach, Medical Incharge, Admin, and Purchase Manager to access purchase requests
 * without requiring specific "Purchase Management" permissions
 */

const checkPurchaseRequestAccess = () => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(403).json({
          success: false,
          error: "Access denied. User role is not defined."
        });
      }

      const userRole = req.user.role.toLowerCase();

      // Sprint5-Story-24: Allow these roles to access purchase requests
      const allowedRoles = ['coach', 'medical_incharge', 'medical-incharge', 'admin', 'purchase_manager', 'purchase-manager'];

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          error: "Access denied. Only Coach, Medical Incharge, Admin, and Purchase Manager can access purchase requests."
        });
      }

      next();
    } catch (error) {
      console.error("Error in checkPurchaseRequestAccess middleware:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error"
      });
    }
  };
};

module.exports = checkPurchaseRequestAccess;
