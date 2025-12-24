const express = require('express');
const router = express.Router();
const shopProductImageController = require('../../controllers/shopProductImageController');
const { authenticate, authorize } = require('../../middleware/auth');
const { upload } = require('../../middleware/upload');

/**
 * @route POST /api/v2/upload/image
 * @desc Upload a generic image (e.g. for new product creation)
 * @access Private (Admin)
 */
router.post(
  '/image',
  authenticate,
  authorize('shop', 'manage'), // Ensure only authorized users can upload
  upload.single('image'),
  shopProductImageController.uploadGenericImage
);

module.exports = router;
