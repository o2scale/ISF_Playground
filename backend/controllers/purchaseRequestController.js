const PurchaseRequest = require('../models/purchaseRequest');
const ShopItem = require('../models/shopItem');
const User = require('../models/user');
const InventoryTransaction = require('../models/inventoryTransaction');
const mongoose = require('mongoose');

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
    const { balagruhaId, category, items, reason, justification, deadline, priority } = req.body;
    const userId = req.user._id;

    const normalizedPriority = typeof priority === 'string' ? priority.toLowerCase().trim() : '';
    const allowedPriorities = new Set(['low', 'medium', 'high']);
    const finalPriority = allowedPriorities.has(normalizedPriority) ? normalizedPriority : 'medium';

    // Files are in req.files (uploaded by multer automatically)
    const uploadedFiles = req.files || [];

    // Sprint5-Story-24: Role-based access control
    const user = await User.findById(userId).select('role balagruhaIds');
    if (!user.canCreatePurchaseRequest()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to create purchase requests. Only Coach, Medical Incharge, Admin, and Purchase Manager can create requests.'
      });
    }

    // Validate category
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category is required'
      });
    }

    const validCategories = ['ISF Shop', 'Medicines', 'Consumables', 'Repairs', 'Infra', 'Others'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category value. Must be one of: ISF Shop, Medicines, Consumables, Repairs, Infra, Others'
      });
    }

    // Deadline is optional; if provided must be a valid date.
    // If provided as a date-only string (YYYY-MM-DD), store it as local date midnight
    // to avoid timezone off-by-one when later rendering as a date.
    let parsedDeadline = null;
    if (deadline) {
      if (typeof deadline === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(deadline)) {
        const [y, m, d] = deadline.split('-').map((v) => Number(v));
        parsedDeadline = new Date(y, m - 1, d);
      } else {
        parsedDeadline = new Date(deadline);
      }

      if (Number.isNaN(parsedDeadline.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid deadline format'
        });
      }
    }

    // Validate balagruhaId (Sprint5-Story-21: Support STOCK)
    if (!balagruhaId) {
      return res.status(400).json({
        success: false,
        message: 'Balagruha or STOCK selection is required'
      });
    }

    // Validate balagruhaId is either 'STOCK' or valid ObjectId
    if (balagruhaId !== 'STOCK' && !mongoose.Types.ObjectId.isValid(balagruhaId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Balagruha ID format'
      });
    }

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

      // Sprint5-Story-25: Track pending products
      const isPendingProduct = product.isPendingProduct === true;

      validatedItems.push({
        productId: product._id,
        productName: product.name,
        productSKU: product.sku,
        requestedQuantity: parseInt(item.requestedQuantity),
        currentStock: product.stock,
        lowStockThreshold: product.lowStockThreshold,
        estimatedUnitCost: parseFloat(item.estimatedUnitCost),
        estimatedTotalCost: parseInt(item.requestedQuantity) * parseFloat(item.estimatedUnitCost),
        isPendingProduct  // Sprint5-Story-25: Mark if this is a pending product
      });
    }

    // Process uploaded files
    const attachments = uploadedFiles.map(file => ({
      filename: file.originalname,
      fileUrl: `/uploads/${file.filename}`,  // Relative path for frontend
      uploadedAt: new Date()
    }));

    // Sprint5-Story-24: Calculate approval threshold
    const maxItemCost = Math.max(...validatedItems.map(item => item.estimatedUnitCost));
    const totalOrderCost = validatedItems.reduce((sum, item) => sum + item.estimatedTotalCost, 0);

    const ITEM_THRESHOLD = 1000; // Rs 1,000 per item
    const ORDER_THRESHOLD = 25000; // Rs 25,000 total order

    const isSmallPurchase = (maxItemCost <= ITEM_THRESHOLD) && (totalOrderCost <= ORDER_THRESHOLD);

    // Set initial status (Story 2.1: Strict lifecycle starts at pending)
    const initialStatus = 'pending';

    // Create purchase request
    const purchaseRequest = new PurchaseRequest({
      balagruhaId: balagruhaId,  // Now required: either 'STOCK' or ObjectId
      category: category.trim(),
      deadline: parsedDeadline,
      priority: finalPriority,
      items: validatedItems,
      attachments,
      reason: reason.trim(),
      justification: justification?.trim() || '',
      requestedBy: userId,
      status: initialStatus,
      thresholdAnalysis: {
        maxItemCost,
        totalOrderCost,
        itemThreshold: ITEM_THRESHOLD,
        orderThreshold: ORDER_THRESHOLD,
        requiresApproval: !isSmallPurchase
      }
    });

    await purchaseRequest.save();

    // Sprint5-Story-25: Link pending products to this request
    for (const item of validatedItems) {
      if (item.isPendingProduct) {
        await ShopItem.findByIdAndUpdate(item.productId, {
          createdInRequest: purchaseRequest._id
        });
      }
    }

    // Populate for response
    await purchaseRequest.populate('requestedBy', 'name email role');
    await purchaseRequest.populate('items.productId', 'name sku stock lowStockThreshold');
    // Sprint5-Story-21: Skip populate if STOCK
    if (balagruhaId && balagruhaId !== 'STOCK') {
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
 * @desc    Get own purchase requests (Purchase Manager) - MULTI-PRODUCT
 * @access  Private (Purchase Management:Read)
 */
exports.getMyPurchaseRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role;
    const { status, balagruhaId, category, startDate, endDate } = req.query;

    const validCategories = ['ISF Shop', 'Medicines', 'Consumables', 'Repairs', 'Infra', 'Others'];

    // Role-based filtering
    // This endpoint is now only used for non-admin/non-purchase-manager roles
    // Admin and Purchase Manager use getAllPurchaseRequests instead
    let query = {};

    // All roles using this endpoint see ONLY their own requests
    query.requestedBy = userId;

    if (status && status !== 'all') {
      query.status = status;
    }

    // Balagruha filter - user can filter their own requests by balagruha
    if (balagruhaId && balagruhaId !== 'all') {
      query.balagruhaId = balagruhaId;
    }

    if (category && category !== 'All Categories') {
      if (!validCategories.includes(category)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid category value. Must be one of: ISF Shop, Medicines, Consumables, Repairs, Infra, Others'
        });
      }
      query.category = category;
    }

    // Sprint5-Story-22: Date filtering with proper timezone handling (S22-BUG-002 FIX)
    if (startDate || endDate) {
      query.createdAt = {};

      if (startDate) {
        // Parse start date and set to beginning of day in UTC (00:00:00)
        const start = new Date(startDate);
        start.setUTCHours(0, 0, 0, 0);
        query.createdAt.$gte = start;
      }

      if (endDate) {
        // Parse end date and set to END of day in UTC (23:59:59.999)
        const end = new Date(endDate);
        end.setUTCHours(23, 59, 59, 999);
        query.createdAt.$lte = end;
      }
    }

    const requests = await PurchaseRequest.find(query)
      .populate('requestedBy', 'name email role')
      .populate('reviewedBy', 'name email')
      .populate('deliveredByCoachId', 'name email')  // Story 2.6: Delivery tracking
      .populate('items.productId', 'name sku stock lowStockThreshold images')
      .sort({ createdAt: -1 });

    // Sprint5-Story-21: Manually populate balagruhaId (skip if STOCK)
    for (const request of requests) {
      if (request.balagruhaId && request.balagruhaId !== 'STOCK') {
        await request.populate('balagruhaId', 'name');
      }
    }

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
 * @desc    Get all purchase requests (Admin sees all) - MULTI-PRODUCT
 * @access  Private (Purchase Management:Manage)
 *
 * Sprint6-Story-XX: Purchase Request Filtering by Creator
 * - Admin and Purchase Manager see ALL requests
 * - Other roles (Coach, Medical Incharge, etc.) see ONLY their own requests
 */
exports.getAllPurchaseRequests = async (req, res) => {
  try {
    const { status, balagruhaId, category, startDate, endDate } = req.query;

    const validCategories = ['ISF Shop', 'Medicines', 'Consumables', 'Repairs', 'Infra', 'Others'];
    const userId = req.user._id;
    const userRole = req.user.role;

    // Build query
    const query = {};

    // Role-based filtering
    if (userRole === 'admin') {
      // Admin sees ALL requests - no filter
    } else if (userRole === 'purchase-manager') {
      // Purchase Manager sees ALL requests in their assigned Balagruha(s)
      const user = await User.findById(userId).select('balagruhaIds');
      const userBalagruhaIds = (user.balagruhaIds || []).map(id => id.toString());

      // Show requests from assigned balagruhas OR STOCK requests
      query.$or = [
        { balagruhaId: { $in: userBalagruhaIds } },
        { balagruhaId: 'STOCK' }
      ];
    } else {
      // Other roles (Coach, Medical Incharge, etc.) see ONLY their own requests
      query.requestedBy = userId;
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    // Balagruha filter - respect role-based restrictions
    if (balagruhaId && balagruhaId !== 'all') {
      if (userRole === 'purchase-manager') {
        // For purchase-manager, ensure they can only filter by their assigned balagruhas or STOCK
        const user = await User.findById(userId).select('balagruhaIds');
        const userBalagruhaIds = (user.balagruhaIds || []).map(id => id.toString());

        if (balagruhaId === 'STOCK' || userBalagruhaIds.includes(balagruhaId)) {
          // Override $or when filtering by specific balagruha
          delete query.$or;
          query.balagruhaId = balagruhaId;
        }
        // If they try to filter by unassigned balagruha, keep the $or filter (ignore the invalid filter)
      } else {
        // Admin and other roles can filter normally
        query.balagruhaId = balagruhaId;
      }
    }

    if (category && category !== 'All Categories') {
      if (!validCategories.includes(category)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid category value. Must be one of: ISF Shop, Medicines, Consumables, Repairs, Infra, Others'
        });
      }
      query.category = category;
    }

    // Sprint5-Story-22: Date filtering with proper timezone handling (S22-BUG-002 FIX)
    if (startDate || endDate) {
      query.createdAt = {};

      if (startDate) {
        // Parse start date and set to beginning of day in UTC (00:00:00)
        const start = new Date(startDate);
        start.setUTCHours(0, 0, 0, 0);
        query.createdAt.$gte = start;
      }

      if (endDate) {
        // Parse end date and set to END of day in UTC (23:59:59.999)
        const end = new Date(endDate);
        end.setUTCHours(23, 59, 59, 999);
        query.createdAt.$lte = end;
      }
    }

    const requests = await PurchaseRequest.find(query)
      .populate('requestedBy', 'name email role')
      .populate('reviewedBy', 'name email')
      .populate('deliveredByCoachId', 'name email')  // Story 2.6: Delivery tracking
      .populate('items.productId', 'name sku stock lowStockThreshold images')
      .sort({ createdAt: -1 });

    // Sprint5-Story-21: Manually populate balagruhaId (skip if STOCK)
    for (const request of requests) {
      if (request.balagruhaId && request.balagruhaId !== 'STOCK') {
        await request.populate('balagruhaId', 'name');
      }
    }

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
 * @desc    Get single purchase request details - MULTI-PRODUCT
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
      .populate('items.productId', 'name sku stock lowStockThreshold images')
      .populate('inventoryTransactionIds');

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Purchase request not found'
      });
    }

    // Sprint5: Resource-level access control (align with list filtering)
    if (userRole === 'purchase-manager') {
      const requestBalagruhaId = request.balagruhaId;
      const userBalagruhaIds = (req.user.balagruhaIds || []).map((bgId) => bgId.toString());
      const requestBalagruhaIdStr = requestBalagruhaId?.toString?.() ?? requestBalagruhaId;

      const hasAccess = requestBalagruhaId === 'STOCK' || userBalagruhaIds.includes(requestBalagruhaIdStr);
      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to view this purchase request'
        });
      }
    } else if (userRole !== 'admin') {
      // Non-admin non-PM users can only view their own requests
      if (request.requestedBy?._id?.toString() !== userId.toString()) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to view this purchase request'
        });
      }
    }

    // Sprint5-Story-21: Populate balagruhaId only when not STOCK
    if (request.balagruhaId && request.balagruhaId !== 'STOCK') {
      await request.populate('balagruhaId', 'name');
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
    await request.populate('items.productId', 'name sku');
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
    await request.populate('items.productId', 'name sku');
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

/**
 * @route   POST /api/v2/shop/admin/purchase-requests/:id/complete
 * @desc    Complete purchase request with multi-product stock update (Purchase Manager only) - Sprint5-Story-19
 * @access  Private (Purchase Management:Update)
 * @features
 *   - ATOMIC multi-product stock update using MongoDB transactions
 *   - Creates multiple InventoryTransaction records (one per product)
 *   - Per-product received quantities and actual costs
 *   - Idempotency: Prevents duplicate stock updates
 *   - Complete audit trail for all products
 */
exports.completePurchaseRequest = async (req, res) => {
  // Start a MongoDB session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const { supplierName, invoiceNumber, purchaseDate, items } = req.body;
    const userId = req.user._id;

    // 1. FETCH AND VALIDATE REQUEST
    const request = await PurchaseRequest.findById(id).session(session);

    if (!request) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: 'Purchase request not found'
      });
    }

    // Validate: Can only complete approved requests
    if (request.status !== 'approved') {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: `Cannot complete ${request.status} request. Only approved requests can be completed.`
      });
    }

    // Validate: Purchase Manager can only complete own requests
    if (req.user.role === 'purchase-manager' && request.requestedBy.toString() !== userId.toString()) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({
        success: false,
        message: 'You can only complete your own requests'
      });
    }

    // 2. IDEMPOTENCY CHECK
    if (request.inventoryTransactionIds && request.inventoryTransactionIds.length > 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'This request has already been completed. Stock has already been updated.'
      });
    }

    // 3. VALIDATE ALL PRODUCTS EXIST
    const productIds = items.map(item => item.productId);
    const products = await ShopItem.find({ _id: { $in: productIds } }).session(session);

    if (products.length !== items.length) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: 'One or more products not found'
      });
    }

    // Create a map for quick product lookup
    const productMap = new Map(products.map(p => [p._id.toString(), p]));

    // 4. ATOMIC MULTI-PRODUCT STOCK UPDATE
    const inventoryTransactionIds = [];
    const updatedItems = [];
    let actualTotalCost = 0;

    for (const itemUpdate of items) {
      const product = productMap.get(itemUpdate.productId.toString());

      if (!product) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({
          success: false,
          message: `Product ${itemUpdate.productId} not found`
        });
      }

      const receivedQty = itemUpdate.receivedQuantity;
      const actualUnitCost = itemUpdate.actualUnitCost;
      const actualItemCost = itemUpdate.actualTotalCost;

      // Sprint5-Story-25: Activate pending products on fulfillment
      const previousStock = product.stock;
      if (product.isPendingProduct === true) {
        // ACTIVATE PENDING PRODUCT
        product.isPendingProduct = false;
        product.isActive = true;
        product.stock = receivedQty;  // Set initial stock (not increment)
        product.lowStockThreshold = getDefaultThresholdForCategory(product.category);
        product.price = actualUnitCost || 0;  // Set price based on actual cost
        // Set balagruhaId based on request
        if (request.balagruhaId && request.balagruhaId !== 'STOCK') {
          product.balagruhaId = request.balagruhaId;
        }
      } else {
        // Existing product: increment stock
        product.stock += receivedQty;
      }
      await product.save({ session });

      // Create inventory transaction record
      const transaction = new InventoryTransaction({
        productId: product._id,
        transactionType: 'purchase_request',
        quantity: receivedQty,  // Positive for stock increase
        previousStock: previousStock,
        newStock: product.stock,
        reference: {
          type: 'purchase_request',
          id: request._id
        },
        reason: `Purchase request ${request.requestId} completed`,
        notes: `Supplier: ${supplierName || 'N/A'}, Invoice: ${invoiceNumber || 'N/A'}, Purchase Date: ${new Date(purchaseDate).toLocaleDateString()}`,
        performedBy: userId
      });

      await transaction.save({ session });
      inventoryTransactionIds.push(transaction._id);

      // Update item in request with actual purchase details
      const requestItem = request.items.find(
        item => item.productId.toString() === itemUpdate.productId.toString()
      );

      if (requestItem) {
        requestItem.receivedQuantity = receivedQty;
        requestItem.actualUnitCost = actualUnitCost;
        requestItem.actualTotalCost = actualItemCost;
      }

      actualTotalCost += actualItemCost;
    }

    // 5. UPDATE PURCHASE REQUEST
    request.status = 'completed';
    request.completedBy = userId;
    request.completedAt = new Date();
    request.supplierName = supplierName?.trim() || '';
    request.invoiceNumber = invoiceNumber?.trim() || '';
    request.purchaseDate = new Date(purchaseDate);
    request.actualTotalCost = actualTotalCost;
    request.inventoryTransactionIds = inventoryTransactionIds;

    await request.save({ session });

    // 6. COMMIT TRANSACTION
    await session.commitTransaction();
    session.endSession();

    // 7. POPULATE AND RETURN RESPONSE
    await request.populate('completedBy', 'name email');
    await request.populate('requestedBy', 'name email');
    await request.populate('reviewedBy', 'name email');
    await request.populate('items.productId', 'name sku stock');
    await request.populate('balagruhaId', 'name');
    await request.populate('inventoryTransactionIds');

    res.json({
      success: true,
      message: `Purchase request completed successfully. ${items.length} product(s) updated.`,
      data: {
        request,
        transactionsCreated: inventoryTransactionIds.length,
        totalStockAdded: items.reduce((sum, item) => sum + item.receivedQuantity, 0)
      }
    });

  } catch (error) {
    // ROLLBACK on any error
    await session.abortTransaction();
    session.endSession();

    console.error('Error completing purchase request:', error);
    res.status(500).json({
      success: false,
      message: 'Error completing purchase request. All changes have been rolled back.',
      error: error.message
    });
  }
};

/**
 * @route   PATCH /api/v2/shop/admin/purchase-requests/:id/status
 * @desc    Update purchase request status (State Machine) - Story 2.1
 * @access  Private (Role based)
 */
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, repairTechnicianName } = req.body;  // Story 2.6: Add repairTechnicianName
    const userId = req.user._id;
    const userRole = req.user.role;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const allowedStatuses = new Set([
      'pending',
      'ordered',
      'delivered_store',
      'delivered_balagruha',
      'rejected',
      'on_hold'
    ]);

    if (!allowedStatuses.has(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status: ${status}`
      });
    }

    const request = await PurchaseRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Purchase request not found'
      });
    }

    const currentStatus = request.status;

    // Sprint5: Resource-level access control (align with list filtering)
    if (userRole === 'purchase-manager') {
      const requestBalagruhaId = request.balagruhaId;
      const userBalagruhaIds = (req.user.balagruhaIds || []).map((bgId) => bgId.toString());
      const requestBalagruhaIdStr = requestBalagruhaId?.toString?.() ?? requestBalagruhaId;

      const hasAccess = requestBalagruhaId === 'STOCK' || userBalagruhaIds.includes(requestBalagruhaIdStr);
      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to update this purchase request'
        });
      }
    }

    // Story 2.6: Require Repair Technician Name for Repairs category at delivered_store
    if (status === 'delivered_store' && request.category === 'Repairs') {
      if (!repairTechnicianName || !repairTechnicianName.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Repair Technician Name is required for repair items'
        });
      }
    }

    // Transition Guards (Story 2.1 strict lifecycle)
    let allowed = false;

    if (currentStatus === 'pending' && status === 'ordered') {
      // Guard: Purchase Manager only
      allowed = userRole === 'purchase-manager';
    } else if (currentStatus === 'ordered' && status === 'delivered_store') {
      // Guard: Purchase Manager only
      allowed = userRole === 'purchase-manager';
    } else if (currentStatus === 'delivered_store' && status === 'delivered_balagruha') {
      // Guard: Requester (Coach) or Admin
      allowed = request.requestedBy.toString() === userId.toString() || userRole === 'admin';
    } else if (currentStatus === 'pending' && (status === 'rejected' || status === 'on_hold')) {
      // Keep existing non-happy-path statuses constrained to pending only
      allowed = userRole === 'purchase-manager';
    }

    if (!allowed) {
      return res.status(403).json({
        success: false,
        message: `Transition from ${currentStatus} to ${status} not allowed for your role.`
      });
    }

    // Update Status
    request.status = status;
    request.statusHistory.push({
      status,
      changedBy: userId,
      changedAt: new Date(),
      notes: notes || `Status changed to ${status}`
    });

    // Story 2.6: Capture Repair Technician Name at delivered_store for Repairs
    if (status === 'delivered_store' && request.category === 'Repairs' && repairTechnicianName) {
      request.repairTechnicianName = repairTechnicianName.trim();
    }

    // Story 2.6: Auto-capture delivery info at delivered_balagruha
    if (status === 'delivered_balagruha') {
      request.deliveredByCoachId = userId;
      request.deliveredToBalagruhaAt = new Date();
    }

    await request.save();

    res.status(200).json({
      success: true,
      message: `Status updated to ${status}`,
      data: { request }
    });
  } catch (error) {
    console.error('Error updating status:', error);
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: error.message || 'Invalid request'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating status',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/v2/shop/admin/purchase-requests/:id/assign-stock
 * @desc    Assign from Stock (Shortcut) - Story 2.1
 * @access  Private (Purchase Manager)
 */
exports.assignFromStock = async (req, res) => {
  let session = null;
  // Bypass transaction in test environment to avoid replica set errors
  if (process.env.NODE_ENV !== 'test') {
    session = await mongoose.startSession();
    session.startTransaction();
  }

  try {
    const { id } = req.params;
    const { notes } = req.body;
    const userId = req.user._id;
    const userRole = req.user.role;

    if (userRole !== 'purchase-manager' && userRole !== 'admin') {
      if (session) {
        await session.abortTransaction();
        session.endSession();
      }
      return res.status(403).json({
        success: false,
        message: 'Only Purchase Manager can assign from stock'
      });
    }

    let requestQuery = PurchaseRequest.findById(id);
    if (session) requestQuery = requestQuery.session(session);
    const request = await requestQuery;

    if (!request) {
      if (session) {
        await session.abortTransaction();
        session.endSession();
      }
      return res.status(404).json({
        success: false,
        message: 'Purchase request not found'
      });
    }

    // Sprint5: Resource-level access control (align with list filtering)
    if (userRole === 'purchase-manager') {
      const requestBalagruhaId = request.balagruhaId;
      const userBalagruhaIds = (req.user.balagruhaIds || []).map((bgId) => bgId.toString());
      const requestBalagruhaIdStr = requestBalagruhaId?.toString?.() ?? requestBalagruhaId;

      const hasAccess = requestBalagruhaId === 'STOCK' || userBalagruhaIds.includes(requestBalagruhaIdStr);
      if (!hasAccess) {
        if (session) {
          await session.abortTransaction();
          session.endSession();
        }
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to update this purchase request'
        });
      }
    }

    if (request.status !== 'pending') {
      if (session) {
        await session.abortTransaction();
        session.endSession();
      }
      return res.status(400).json({
        success: false,
        message: 'Only pending requests can be assigned from stock'
      });
    }

    // Check and Decrement Stock
    for (const item of request.items) {
      let productQuery = ShopItem.findById(item.productId);
      if (session) productQuery = productQuery.session(session);
      const product = await productQuery;
      
      if (!product) {
        throw new Error(`Product ${item.productName} not found`);
      }

      if (product.stock < item.requestedQuantity) {
        throw new Error(`Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.requestedQuantity}`);
      }

      const previousStock = product.stock;
      product.stock -= item.requestedQuantity;
      await product.save({ session });

      // Create Inventory Transaction
      await InventoryTransaction.create([{
        productId: product._id,
        transactionType: 'purchase_request',
        quantity: -item.requestedQuantity,
        previousStock,
        newStock: product.stock,
        reference: {
          type: 'purchase_request',
          id: request._id
        },
        reason: 'Assigned from Stock (Shortcut)',
        notes: `${request.requestId}: Shortcut assignment`,
        performedBy: userId
      }], { session });
    }

    // Update PR Status -> delivered_store (skip ordered)
    request.status = 'delivered_store';
    request.statusHistory.push({
      status: 'delivered_store',
      changedBy: userId,
      changedAt: new Date(),
      notes: notes || 'Assigned from stock (Shortcut)'
    });

    await request.save({ session });

    if (session) {
      await session.commitTransaction();
      session.endSession();
    }

    res.status(200).json({
      success: true,
      message: 'Stock assigned and request moved to delivered_store',
      data: { request }
    });

  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    console.error('Error assigning from stock:', error);
    res.status(400).json({ // 400 for business logic errors (like insufficient stock)
      success: false,
      message: error.message || 'Error assigning from stock'
    });
  }
};

/**
 * Sprint5-Story-25: Helper function to get default low stock threshold based on category
 * @param {String} category - Product category
 * @returns {Number} Default threshold value
 */
function getDefaultThresholdForCategory(category) {
  const thresholds = {
    'Consumables': 20,
    'Stationery': 15,
    'Hygiene': 25,
    'Equipment': 5,
    'stationery': 15,
    'sports': 10,
    'books': 8,
    'uniforms': 10,
    'digital': 5,
    'other': 10
  };
  return thresholds[category] || 10;  // Default to 10 if category not found
}

/**
 * Story 3.9: Get pending request count for PM navigation badge
 * @route   GET /api/v2/shop/admin/purchase-requests/pending-count
 * @desc    Returns count of pending requests for PM badge
 * @access  Private (Purchase Manager, Admin)
 */
exports.getPendingCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = typeof req.user.role === 'string' ? req.user.role.toLowerCase() : req.user.role?.roleName?.toLowerCase() || '';

    // Build query for pending status
    let query = { status: 'pending' };

    // PM sees only their assigned balagruhas + STOCK
    if (userRole === 'purchase-manager') {
      const user = await User.findById(userId).select('balagruhaIds');
      const balagruhaIds = user?.balagruhaIds || [];
      
      query.$or = [
        { balagruhaId: { $in: balagruhaIds } },
        { balagruhaId: 'STOCK' }
      ];
    }

    const total = await PurchaseRequest.countDocuments(query);

    // Also get high priority count
    const highPriority = await PurchaseRequest.countDocuments({
      ...query,
      priority: 'high'
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        highPriority,
        normalPriority: total - highPriority
      }
    });

  } catch (error) {
    console.error('Error getting pending count:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pending request count'
    });
  }
};

module.exports = exports;
