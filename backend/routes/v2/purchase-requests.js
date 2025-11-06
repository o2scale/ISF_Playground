const express = require('express');
const router = express.Router();
const purchaseRequestController = require('../../controllers/purchaseRequestController');
const { authenticate } = require('../../middleware/auth');
const checkPermission = require('../../middleware/checkPermission');
const checkPurchaseRequestAccess = require('../../middleware/checkPurchaseRequestAccess'); // Sprint5-Story-24: Multi-role access
const { upload } = require('../../middleware/upload');  // File upload middleware
const {
  validateCreateRequest,
  validateRequestId,
  validateApproval,
  validateRejection,
  validateStockUpdate
} = require('../../middleware/validation/purchaseRequestValidation');

/**
 * Purchase Request Routes - Sprint5-Story-17
 * Base path: /api/v2/shop/admin/purchase-requests
 */

/**
 * Purchase Manager Routes
 */

// Get low-stock products (for request creation dropdown) - BUG-S17-004 FIX
// Sprint5-Story-24: Changed to multi-role access
router.get(
  '/products/low-stock',
  authenticate,
  checkPurchaseRequestAccess(),
  purchaseRequestController.getLowStockProducts
);

// Create new purchase request (with file upload support)
// Sprint5-Story-24: Changed to multi-role access (Coach, Medical, Admin, PM)
router.post(
  '/',
  authenticate,
  checkPurchaseRequestAccess(),
  upload.array('attachments', 5),  // Max 5 files
  validateCreateRequest,
  purchaseRequestController.createPurchaseRequest
);

// Get own purchase requests
// Sprint5-Story-24: Changed to multi-role access
router.get(
  '/my',
  authenticate,
  checkPurchaseRequestAccess(),
  purchaseRequestController.getMyPurchaseRequests
);

// Cancel pending request
// Sprint5-Story-24: Changed to multi-role access
router.put(
  '/:id/cancel',
  authenticate,
  checkPurchaseRequestAccess(),
  validateRequestId,
  purchaseRequestController.cancelPurchaseRequest
);

// Get single request details
// Sprint5-Story-24: Changed to multi-role access
router.get(
  '/:id',
  authenticate,
  checkPurchaseRequestAccess(),
  validateRequestId,
  purchaseRequestController.getPurchaseRequestById
);

/**
 * Admin Routes - Sprint5-Story-18
 */

// Get purchase request statistics
router.get(
  '/stats',
  authenticate,
  checkPermission('Purchase Management', 'Manage'),
  purchaseRequestController.getPurchaseRequestStats
);

// Get all purchase requests (Admin)
router.get(
  '/',
  authenticate,
  checkPermission('Purchase Management', 'Manage'),
  purchaseRequestController.getAllPurchaseRequests
);

// Approve purchase request
router.post(
  '/:id/approve',
  authenticate,
  checkPermission('Purchase Management', 'Manage'),
  validateRequestId,
  validateApproval,
  purchaseRequestController.approvePurchaseRequest
);

// Reject purchase request
router.post(
  '/:id/reject',
  authenticate,
  checkPermission('Purchase Management', 'Manage'),
  validateRequestId,
  validateRejection,
  purchaseRequestController.rejectPurchaseRequest
);

/**
 * Purchase Manager Routes - Sprint5-Story-19
 * Stock Update / Complete Request
 */

// Complete purchase request with stock update (Purchase Manager)
router.post(
  '/:id/complete',
  authenticate,
  checkPermission('Purchase Management', 'Update'),
  validateRequestId,
  validateStockUpdate,
  purchaseRequestController.completePurchaseRequest
);

module.exports = router;
