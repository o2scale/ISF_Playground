const mongoose = require('mongoose');

/**
 * Purchase Request Validation Middleware - Sprint5-Story-17
 */

/**
 * Validate create purchase request payload - MULTI-PRODUCT (Sprint5-Story-17)
 */
exports.validateCreateRequest = (req, res, next) => {
  const { items, reason, justification } = req.body;

  // Note: items comes as JSON string from FormData, will be parsed in controller
  // Just validate that it exists here
  if (!items) {
    return res.status(400).json({
      success: false,
      message: 'Items are required'
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

/**
 * Validate approve request payload - Sprint5-Story-18
 */
exports.validateApproval = (req, res, next) => {
  const { reviewNotes } = req.body;

  // Review notes are optional but if provided, validate length
  if (reviewNotes && reviewNotes.length > 500) {
    return res.status(400).json({
      success: false,
      message: 'Review notes cannot exceed 500 characters'
    });
  }

  next();
};

/**
 * Validate reject request payload - Sprint5-Story-18
 */
exports.validateRejection = (req, res, next) => {
  const { reviewNotes } = req.body;

  // Rejection reason is required
  if (!reviewNotes || typeof reviewNotes !== 'string' || reviewNotes.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Rejection reason is required'
    });
  }

  if (reviewNotes.length > 500) {
    return res.status(400).json({
      success: false,
      message: 'Rejection reason cannot exceed 500 characters'
    });
  }

  next();
};

module.exports = exports;
