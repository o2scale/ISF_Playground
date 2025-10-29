const mongoose = require('mongoose');

/**
 * Purchase Request Validation Middleware - Sprint5-Story-17
 */

/**
 * Validate create purchase request payload
 */
exports.validateCreateRequest = (req, res, next) => {
  const { productId, requestedQuantity, reason, justification } = req.body;

  // Validate productId
  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      success: false,
      message: 'Valid product ID is required'
    });
  }

  // Validate quantity
  if (!requestedQuantity || typeof requestedQuantity !== 'number' || requestedQuantity < 1) {
    return res.status(400).json({
      success: false,
      message: 'Requested quantity must be a positive number'
    });
  }

  // Validate reason
  if (!reason || typeof reason !== 'string' || reason.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Reason is required'
    });
  }

  if (reason.length > 200) {
    return res.status(400).json({
      success: false,
      message: 'Reason cannot exceed 200 characters'
    });
  }

  // Validate justification (optional)
  if (justification && justification.length > 500) {
    return res.status(400).json({
      success: false,
      message: 'Justification cannot exceed 500 characters'
    });
  }

  next();
};

/**
 * Validate request ID parameter
 */
exports.validateRequestId = (req, res, next) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Valid request ID is required'
    });
  }

  next();
};

module.exports = exports;
