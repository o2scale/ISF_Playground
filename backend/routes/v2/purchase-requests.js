const express = require('express');
const router = express.Router();
const purchaseRequestController = require('../../controllers/purchaseRequestController');
const { authenticate } = require('../../middleware/auth');
const checkPermission = require('../../middleware/checkPermission');
const { upload } = require('../../middleware/upload');  // File upload middleware
const {
  validateCreateRequest,
  validateRequestId,
  validateApproval,
  validateRejection
} = require('../../middleware/validation/purchaseRequestValidation');

/**
 * Purchase Request Routes - Sprint5-Story-17
 * Base path: /api/v2/shop/admin/purchase-requests
 */

/**
 * Purchase Manager Routes
 */

// Get low-stock products (for request creation dropdown) - BUG-S17-004 FIX
router.get(
  '/products/low-stock',
  authenticate,
  checkPermission('Purchase Management', 'Read'),
  purchaseRequestController.getLowStockProducts
);

// Create new purchase request (with file upload support)
router.post(
  '/',
  authenticate,
  checkPermission('Purchase Management', 'Create'),
  upload.array('attachments', 5),  // Max 5 files
  validateCreateRequest,
  purchaseRequestController.createPurchaseRequest
);

// Get own purchase requests
router.get(
  '/my',
  authenticate,
  checkPermission('Purchase Management', 'Read'),
  purchaseRequestController.getMyPurchaseRequests
);

// Cancel pending request
router.put(
  '/:id/cancel',
  authenticate,
  checkPermission('Purchase Management', 'Update'),
  validateRequestId,
  purchaseRequestController.cancelPurchaseRequest
);

// Get single request details
router.get(
  '/:id',
  authenticate,
  checkPermission('Purchase Management', 'Read'),
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

module.exports = router;
