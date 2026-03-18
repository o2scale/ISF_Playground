const express = require('express');
const router = express.Router();
const vendorController = require('../../controllers/vendorController');
const { authenticate } = require('../../middleware/auth');

// Middleware to check for Admin role
const isAdmin = (req, res, next) => {
  // Check if user exists and has admin role
  // Using case-insensitive check
  if (req.user && req.user.role && req.user.role.toLowerCase() === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      error: 'Access denied: Admin role required'
    });
  }
};

// All routes require authentication and admin role
router.use(authenticate);
router.use(isAdmin);

router.post('/', vendorController.createVendor);
router.get('/', vendorController.getAllVendors);
router.get('/:id', vendorController.getVendorById);
router.put('/:id', vendorController.updateVendor);
router.delete('/:id', vendorController.deactivateVendor);

module.exports = router;
