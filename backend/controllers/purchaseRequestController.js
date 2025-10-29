const PurchaseRequest = require('../models/purchaseRequest');
const ShopItem = require('../models/shopItem');
const User = require('../models/user');

/**
 * Purchase Request Controller - Sprint5-Story-17
 * Handles purchase request creation and management
 */

/**
 * @route   POST /api/v2/shop/admin/purchase-requests
 * @desc    Create new MULTI-PRODUCT purchase request with file attachments (Purchase Manager only)
 * @access  Private (Purchase Management:Create)
 */
exports.createPurchaseRequest = async (req, res) => {
  try {
    const { balagruhaId, items, reason, justification } = req.body;
    const userId = req.user._id;

    // Files are in req.files (uploaded by multer automatically)
    const uploadedFiles = req.files || [];

    // Validate items
    if (!items) {
      return res.status(400).json({
        success: false,
        message: 'Items are required'
      });
    }

    // Parse items (comes as JSON string in multipart form)
    const parsedItems = typeof items === 'string' ? JSON.parse(items) : items;

    if (!parsedItems || parsedItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one product is required'
      });
    }

    // Validate and snapshot each item
    const validatedItems = [];
    for (const item of parsedItems) {
      const product = await ShopItem.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.productId} not found`
        });
      }

      // VALIDATION: Purchase Manager can only request for assigned balagruhas
      if (req.user.role === 'purchase-manager') {
        const userBalagruhas = req.user.balagruhaIds || [];
        if (product.balagruhaId && !userBalagruhas.includes(product.balagruhaId.toString())) {
          return res.status(403).json({
            success: false,
            message: `No access to product: ${product.name}`
          });
        }
      }

      // Validate quantity and cost
      if (!item.requestedQuantity || item.requestedQuantity < 1) {
        return res.status(400).json({
          success: false,
          message: `Invalid quantity for product: ${product.name}`
        });
      }

      if (item.estimatedUnitCost === undefined || item.estimatedUnitCost < 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid cost for product: ${product.name}`
        });
      }

      validatedItems.push({
        productId: product._id,
        productName: product.name,
        productSKU: product.sku,
        requestedQuantity: parseInt(item.requestedQuantity),
        currentStock: product.stock,
        lowStockThreshold: product.lowStockThreshold,
        estimatedUnitCost: parseFloat(item.estimatedUnitCost),
        estimatedTotalCost: parseInt(item.requestedQuantity) * parseFloat(item.estimatedUnitCost)
      });
    }

    // Process uploaded files
    const attachments = uploadedFiles.map(file => ({
      filename: file.originalname,
      fileUrl: `/uploads/${file.filename}`,  // Relative path for frontend
      uploadedAt: new Date()
    }));

    // Create purchase request
    const purchaseRequest = new PurchaseRequest({
      balagruhaId: balagruhaId || null,
      items: validatedItems,
      attachments,
      reason: reason.trim(),
      justification: justification?.trim() || '',
      requestedBy: userId,
      status: 'pending_approval'
    });

    await purchaseRequest.save();

    // Populate for response
    await purchaseRequest.populate('requestedBy', 'name email role');
    await purchaseRequest.populate('items.productId', 'name sku stock lowStockThreshold');
    if (balagruhaId) {
      await purchaseRequest.populate('balagruhaId', 'name');
    }

    res.status(201).json({
      success: true,
      message: 'Purchase request created successfully',
      data: { purchaseRequest }
    });

  } catch (error) {
    console.error('Error creating purchase request:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating purchase request',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/v2/shop/admin/purchase-requests/my
 * @desc    Get own purchase requests (Purchase Manager)
 * @access  Private (Purchase Management:Read)
 */
exports.getMyPurchaseRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status, balagruhaId, startDate, endDate } = req.query;

    // Build query
    const query = { requestedBy: userId };

    if (status && status !== 'all') {
      query.status = status;
    }

    if (balagruhaId && balagruhaId !== 'all') {
      query.balagruhaId = balagruhaId;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const requests = await PurchaseRequest.find(query)
      .populate('requestedBy', 'name email role')
      .populate('reviewedBy', 'name email')
      .populate('productId', 'name sku stock lowStockThreshold images')
      .populate('balagruhaId', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { requests, count: requests.length }
    });
  } catch (error) {
    console.error('Error fetching purchase requests:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching purchase requests',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/v2/shop/admin/purchase-requests (for Admins)
 * @desc    Get all purchase requests (Admin sees all)
 * @access  Private (Purchase Management:Manage)
 */
exports.getAllPurchaseRequests = async (req, res) => {
  try {
    const { status, balagruhaId, startDate, endDate } = req.query;

    // Build query
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (balagruhaId && balagruhaId !== 'all') {
      query.balagruhaId = balagruhaId;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const requests = await PurchaseRequest.find(query)
      .populate('requestedBy', 'name email role')
      .populate('reviewedBy', 'name email')
      .populate('productId', 'name sku stock lowStockThreshold images')
      .populate('balagruhaId', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { requests, count: requests.length }
    });
  } catch (error) {
    console.error('Error fetching purchase requests:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching purchase requests',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/v2/shop/admin/purchase-requests/:id/cancel
 * @desc    Cancel pending purchase request
 * @access  Private (Purchase Management:Update)
 */
exports.cancelPurchaseRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const request = await PurchaseRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Purchase request not found'
      });
    }

    // Validate: Only requester can cancel
    if (request.requestedBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only cancel your own requests'
      });
    }

    // Validate: Can only cancel pending requests
    if (request.status !== 'pending_approval') {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel ${request.status} request. Only pending requests can be cancelled.`
      });
    }

    request.status = 'cancelled';
    await request.save();

    res.json({
      success: true,
      message: 'Purchase request cancelled successfully',
      data: { request }
    });
  } catch (error) {
    console.error('Error cancelling purchase request:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling purchase request',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/v2/shop/admin/purchase-requests/:id
 * @desc    Get single purchase request details
 * @access  Private
 */
exports.getPurchaseRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const userRole = req.user.role;

    const request = await PurchaseRequest.findById(id)
      .populate('requestedBy', 'name email role')
      .populate('reviewedBy', 'name email')
      .populate('completedBy', 'name email')
      .populate('productId', 'name sku stock lowStockThreshold images')
      .populate('balagruhaId', 'name')
      .populate('inventoryTransactionId');

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Purchase request not found'
      });
    }

    // Authorization: Purchase Manager can only view own requests
    if (userRole === 'purchase-manager' && request.requestedBy._id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only view your own requests'
      });
    }

    res.json({
      success: true,
      data: { request }
    });
  } catch (error) {
    console.error('Error fetching purchase request:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching purchase request',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/v2/shop/admin/purchase-requests/:id/approve
 * @desc    Approve purchase request (Admin only) - Sprint5-Story-18
 * @access  Private (Purchase Management:Manage)
 */
exports.approvePurchaseRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewNotes } = req.body;
    const adminId = req.user._id;

    const request = await PurchaseRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Purchase request not found'
      });
    }

    // Validate: Can only approve pending requests
    if (request.status !== 'pending_approval') {
      return res.status(400).json({
        success: false,
        message: `Cannot approve ${request.status} request. Only pending requests can be approved.`
      });
    }

    // 🔥 VALIDATION: Cannot approve own request
    if (request.requestedBy.toString() === adminId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Cannot approve your own request. Another admin must approve.'
      });
    }

    // Update request
    request.status = 'approved';
    request.reviewedBy = adminId;
    request.reviewedAt = new Date();
    request.reviewNotes = reviewNotes?.trim() || '';

    await request.save();

    // Populate for response
    await request.populate('reviewedBy', 'name email');
    await request.populate('requestedBy', 'name email');
    await request.populate('productId', 'name sku');
    await request.populate('balagruhaId', 'name');

    res.json({
      success: true,
      message: 'Purchase request approved successfully',
      data: { request }
    });
  } catch (error) {
    console.error('Error approving purchase request:', error);
    res.status(500).json({
      success: false,
      message: 'Error approving purchase request',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/v2/shop/admin/purchase-requests/:id/reject
 * @desc    Reject purchase request (Admin only) - Sprint5-Story-18
 * @access  Private (Purchase Management:Manage)
 */
exports.rejectPurchaseRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewNotes } = req.body;
    const adminId = req.user._id;

    // Validate rejection reason
    if (!reviewNotes || reviewNotes.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Rejection reason is required'
      });
    }

    const request = await PurchaseRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Purchase request not found'
      });
    }

    // Validate: Can only reject pending requests
    if (request.status !== 'pending_approval') {
      return res.status(400).json({
        success: false,
        message: `Cannot reject ${request.status} request. Only pending requests can be rejected.`
      });
    }

    // Update request
    request.status = 'rejected';
    request.reviewedBy = adminId;
    request.reviewedAt = new Date();
    request.reviewNotes = reviewNotes.trim();

    await request.save();

    // Populate for response
    await request.populate('reviewedBy', 'name email');
    await request.populate('requestedBy', 'name email');
    await request.populate('productId', 'name sku');
    await request.populate('balagruhaId', 'name');

    res.json({
      success: true,
      message: 'Purchase request rejected',
      data: { request }
    });
  } catch (error) {
    console.error('Error rejecting purchase request:', error);
    res.status(500).json({
      success: false,
      message: 'Error rejecting purchase request',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/v2/shop/admin/purchase-requests/stats
 * @desc    Get purchase request statistics (Admin dashboard) - Sprint5-Story-18
 * @access  Private (Purchase Management:Manage)
 */
exports.getPurchaseRequestStats = async (req, res) => {
  try {
    const stats = await PurchaseRequest.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert to object format
    const statsObj = {
      pending_approval: 0,
      approved: 0,
      rejected: 0,
      completed: 0,
      cancelled: 0,
      total: 0
    };

    stats.forEach(stat => {
      statsObj[stat._id] = stat.count;
      statsObj.total += stat.count;
    });

    res.json({
      success: true,
      data: { stats: statsObj }
    });
  } catch (error) {
    console.error('Error fetching purchase request stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/v2/shop/purchase-manager/products/low-stock
 * @desc    Get low-stock products accessible to Purchase Manager
 * @access  Private (Purchase Management:Read)
 * FIX: BUG-S17-004 - Purchase Managers need access to product list for request creation
 */
exports.getLowStockProducts = async (req, res) => {
  try {
    const userId = req.user._id;
    const userBalagruhas = req.user.balagruhaIds || [];

    // Build query for low-stock products
    let query = {
      isActive: true,
      $expr: { $lte: ['$stock', '$lowStockThreshold'] }  // stock <= lowStockThreshold
    };

    // Filter by user's assigned balagruhas (Purchase Manager)
    if (req.user.role === 'purchase-manager') {
      query.$or = [
        { balagruhaId: { $in: userBalagruhas } },  // Products from assigned balagruhas
        { balagruhaId: null }  // Shop-wide products (no specific balagruha)
      ];
    }
    // Admin sees all low-stock products
    // (no additional filter needed)

    const products = await ShopItem.find(query)
      .populate('balagruhaId', 'name')
      .select('name sku stock lowStockThreshold price images balagruhaId isActive')
      .sort({ stock: 1, name: 1 })  // Out of stock first, then by name
      .limit(1000);

    res.json({
      success: true,
      products,
      count: products.length
    });
  } catch (error) {
    console.error('Error fetching low-stock products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching low-stock products',
      error: error.message
    });
  }
};

module.exports = exports;
