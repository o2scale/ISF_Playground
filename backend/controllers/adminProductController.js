const ShopItem = require('../models/shopItem');
const Vendor = require('../models/vendor');

/**
 * Admin Product Controller - Sprint5-Story-05
 * CRUD operations for shop products (admin only)
 */

/**
 * Get all products (admin view - includes inactive)
 * GET /api/v2/shop/admin/products
 * @access Admin
 */
async function getAllProducts(req, res) {
  try {
    const {
      category,
      isActive,
      search,
      page = 1,
      limit = 50,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = {};

    if (category) {
      query.category = category;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    // Execute query
    const [products, total] = await Promise.all([
      ShopItem.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      ShopItem.countDocuments(query)
    ]);

    res.status(200).json({
      success: true,
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve products',
      error: error.message
    });
  }
}

/**
 * Get single product by ID
 * GET /api/v2/shop/admin/products/:productId
 * @access Admin
 */
async function getProduct(req, res) {
  try {
    const { productId } = req.params;

    const product = await ShopItem.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve product',
      error: error.message
    });
  }
}

/**
 * Create new product
 * POST /api/v2/shop/admin/products
 * @access Admin
 */
async function createProduct(req, res) {
  try {
    const {
      sku,
      name,
      description,
      category,
      price,
      discountPrice,
      stock,
      lowStockThreshold,
      imageUrl,
      images,
      isActive,
      availableFor,
      tags,
      metadata,
      maxPrice,
      sellingPrice,
      approvedVendors
    } = req.body;

    // Sprint 5 Story 1.2: Strict Introduction Policy
    if (!maxPrice) {
      return res.status(400).json({
        success: false,
        message: 'Max Price (Rupees) is required for new items'
      });
    }

    if (!approvedVendors || !Array.isArray(approvedVendors) || approvedVendors.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one Approved Vendor is required'
      });
    }

    // Verify all vendor IDs exist
    const vendorIds = approvedVendors.map(v => v.vendorId);
    const validVendorsCount = await Vendor.countDocuments({ _id: { $in: vendorIds } });
    if (validVendorsCount !== vendorIds.length) {
      return res.status(400).json({
        success: false,
        message: 'One or more Vendor IDs are invalid'
      });
    }

    // Check SKU uniqueness
    const existingProduct = await ShopItem.findOne({ sku: sku.toUpperCase() });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'SKU already exists',
        field: 'sku'
      });
    }

    // Create product
    const product = new ShopItem({
      sku,
      name,
      description,
      category,
      price,
      discountPrice: discountPrice || null,
      stock: stock || 0,
      lowStockThreshold: lowStockThreshold || 10,
      imageUrl: imageUrl || null,
      images: images || [],
      isActive: isActive !== undefined ? isActive : true,
      availableFor: availableFor || ['student'],
      tags: tags || [],
      metadata: metadata || {},
      maxPrice,
      sellingPrice,
      approvedVendors
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.keys(error.errors).map(key => ({
          field: key,
          message: error.errors[key].message
        }))
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'SKU already exists',
        field: 'sku'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
}

/**
 * Update product
 * PUT /api/v2/shop/admin/products/:productId
 * @access Admin
 */
async function updateProduct(req, res) {
  try {
    const { productId } = req.params;
    const updateData = { ...req.body };

    // Remove SKU from update (cannot be changed)
    delete updateData.sku;

    // Remove _id and timestamps
    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    // Sprint 5 Story 1.2: Validation for updates
    if (updateData.maxPrice !== undefined && updateData.maxPrice < 0) {
      return res.status(400).json({
        success: false,
        message: 'Max Price cannot be negative'
      });
    }

    if (updateData.approvedVendors !== undefined) {
      if (!Array.isArray(updateData.approvedVendors) || updateData.approvedVendors.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'At least one Approved Vendor is required if updating vendors'
        });
      }

      // Verify all vendor IDs exist
      const vendorIds = updateData.approvedVendors.map(v => v.vendorId);
      const validVendorsCount = await Vendor.countDocuments({ _id: { $in: vendorIds } });
      if (validVendorsCount !== vendorIds.length) {
        return res.status(400).json({
          success: false,
          message: 'One or more Vendor IDs are invalid'
        });
      }
    }

    // Find and update product
    const product = await ShopItem.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.keys(error.errors).map(key => ({
          field: key,
          message: error.errors[key].message
        }))
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
}

/**
 * Soft delete product (set isActive: false)
 * DELETE /api/v2/shop/admin/products/:productId
 * @access Admin
 */
async function deleteProduct(req, res) {
  try {
    const { productId } = req.params;

    const product = await ShopItem.findByIdAndUpdate(
      productId,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully (soft delete)',
      product
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
}

/**
 * Restore soft-deleted product (set isActive: true)
 * POST /api/v2/shop/admin/products/:productId/restore
 * @access Admin
 */
async function restoreProduct(req, res) {
  try {
    const { productId } = req.params;

    const product = await ShopItem.findByIdAndUpdate(
      productId,
      { isActive: true },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product restored successfully',
      product
    });
  } catch (error) {
    console.error('Restore product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to restore product',
      error: error.message
    });
  }
}

/**
 * Create Pending Product - Sprint5-Story-25
 * POST /api/v2/shop/admin/products/pending
 * @access Admin
 */
async function createPendingProduct(req, res) {
  try {
    // Sprint 5 Story 1.2: Restrict to Admin only
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Only Admins can introduce new items.',
        error: 'Forbidden'
      });
    }

    const { name, category, unit, sku, description } = req.body;
    const userId = req.user._id;

    // Validation
    if (!name || !category || !unit) {
      return res.status(400).json({
        success: false,
        message: 'Name, category, and unit are required',
        error: 'Validation Error'
      });
    }

    // Generate SKU if not provided
    const generatedSKU = sku || `NEW-${Date.now()}`;

    // Check SKU uniqueness
    const existingProduct = await ShopItem.findOne({ sku: generatedSKU });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'SKU already exists. Please use a different SKU.',
        error: 'Duplicate SKU'
      });
    }

    // Create pending product
    const newProduct = new ShopItem({
      name,
      sku: generatedSKU,
      category,
      unit,
      description: description || 'Pending product - details to be added',
      isPendingProduct: true,
      isActive: false,
      stock: 0,
      lowStockThreshold: 0,
      price: 0,  // Default price, will be set during fulfillment
      balagruhaId: null,
      createdBy: userId,
      createdInRequest: null  // Will be set when added to request
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Pending product created successfully',
      product: newProduct
    });
  } catch (error) {
    console.error('Error creating pending product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create pending product',
      error: error.message
    });
  }
}

/**
 * Get Pending Products - Sprint5-Story-25
 * GET /api/v2/shop/admin/products/pending
 * @access Multi-role (Coach, Medical, Admin, PM)
 */
async function getPendingProducts(req, res) {
  try {
    const products = await ShopItem.find({ isPendingProduct: true })
      .populate('createdBy', 'name email')
      .populate('createdInRequest', 'requestId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Error fetching pending products:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
  createPendingProduct,
  getPendingProducts
};
