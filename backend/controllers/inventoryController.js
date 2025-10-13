const ShopItem = require('../models/shopItem');
const InventoryTransaction = require('../models/inventoryTransaction');
const csv = require('csv-parser');
const { Readable } = require('stream');

/**
 * Inventory Controller - Sprint5-Story-06
 * Handles inventory management operations with audit trail
 */

/**
 * @route   PATCH /api/v2/shop/admin/inventory/:productId/adjust
 * @desc    Manually adjust product stock with audit trail
 * @access  Admin (Shop Management: Manage)
 */
exports.adjustStock = async (req, res) => {
  try {
    const { productId } = req.params;
    const { adjustment, reason, notes } = req.body;
    const userId = req.user._id;

    // Find product
    const product = await ShopItem.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const previousStock = product.stock;
    const newStock = previousStock + adjustment;

    // Validate new stock is not negative
    if (newStock < 0) {
      return res.status(400).json({
        message: 'Stock cannot be negative',
        previousStock,
        adjustment,
        wouldBe: newStock
      });
    }

    // Update product stock
    product.stock = newStock;
    await product.save();

    // Create audit trail entry
    const transaction = await InventoryTransaction.create({
      productId: product._id,
      transactionType: reason,
      quantity: adjustment,
      previousStock,
      newStock,
      reference: {
        type: 'manual',
        id: null
      },
      reason,
      notes: notes || '',
      performedBy: userId
    });

    // Populate user information for response
    await transaction.populate('performedBy', 'name email');

    res.status(200).json({
      message: 'Stock adjusted successfully',
      product: {
        _id: product._id,
        sku: product.sku,
        name: product.name,
        previousStock,
        newStock: product.stock,
        adjustment
      },
      transaction
    });
  } catch (error) {
    console.error('Error adjusting stock:', error);
    res.status(500).json({
      message: 'Failed to adjust stock',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/v2/shop/admin/inventory/bulk-update
 * @desc    Bulk update stock levels via CSV
 * @access  Admin (Shop Management: Manage)
 */
exports.bulkUpdateStock = async (req, res) => {
  try {
    const { csvData, reason, notes } = req.body;
    const userId = req.user._id;

    if (!csvData || !Array.isArray(csvData)) {
      return res.status(400).json({
        message: 'CSV data is required and must be an array',
        example: [
          { sku: 'PROD-001', stock: 50 },
          { sku: 'PROD-002', stock: 100 }
        ]
      });
    }

    const results = {
      successful: [],
      failed: [],
      totalProcessed: csvData.length
    };

    // Process each row
    for (const row of csvData) {
      try {
        const { sku, stock } = row;

        if (!sku || stock === undefined || stock === null) {
          results.failed.push({
            sku: sku || 'UNKNOWN',
            error: 'Missing SKU or stock value',
            row
          });
          continue;
        }

        // Parse stock as integer
        const newStock = parseInt(stock, 10);
        if (isNaN(newStock) || newStock < 0) {
          results.failed.push({
            sku,
            error: 'Invalid stock value (must be non-negative integer)',
            value: stock
          });
          continue;
        }

        // Find product by SKU
        const product = await ShopItem.findOne({ sku: sku.toUpperCase().trim() });
        if (!product) {
          results.failed.push({
            sku,
            error: 'Product not found'
          });
          continue;
        }

        const previousStock = product.stock;
        const adjustment = newStock - previousStock;

        // Update product stock
        product.stock = newStock;
        await product.save();

        // Create audit trail entry
        await InventoryTransaction.create({
          productId: product._id,
          transactionType: reason || 'adjustment',
          quantity: adjustment,
          previousStock,
          newStock,
          reference: {
            type: 'bulk_import',
            id: null
          },
          reason: reason || 'Bulk CSV import',
          notes: notes || `Bulk import: ${sku}`,
          performedBy: userId
        });

        results.successful.push({
          sku,
          name: product.name,
          previousStock,
          newStock,
          adjustment
        });
      } catch (rowError) {
        results.failed.push({
          sku: row.sku || 'UNKNOWN',
          error: rowError.message,
          row
        });
      }
    }

    res.status(200).json({
      message: 'Bulk update completed',
      summary: {
        total: results.totalProcessed,
        successful: results.successful.length,
        failed: results.failed.length
      },
      results
    });
  } catch (error) {
    console.error('Error in bulk update:', error);
    res.status(500).json({
      message: 'Failed to process bulk update',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/v2/shop/admin/inventory/:productId/audit
 * @desc    Get audit trail for a product
 * @access  Admin (Shop Management: Manage)
 */
exports.getAuditTrail = async (req, res) => {
  try {
    const { productId } = req.params;
    const { limit = 50, page = 1 } = req.query;

    // Validate product exists
    const product = await ShopItem.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get transactions for this product
    const [transactions, total] = await Promise.all([
      InventoryTransaction.find({ productId })
        .populate('performedBy', 'name email role')
        .sort({ createdAt: -1 })
        .limit(parseInt(limit))
        .skip(skip),
      InventoryTransaction.countDocuments({ productId })
    ]);

    res.status(200).json({
      product: {
        _id: product._id,
        sku: product.sku,
        name: product.name,
        currentStock: product.stock
      },
      transactions,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching audit trail:', error);
    res.status(500).json({
      message: 'Failed to fetch audit trail',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/v2/shop/admin/inventory
 * @desc    Get inventory dashboard with all products and stock levels
 * @access  Admin (Shop Management: Manage)
 */
exports.getInventoryDashboard = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      search,
      category,
      stockStatus, // 'high', 'low', 'out'
      sortBy = 'stock',
      sortOrder = 'asc'
    } = req.query;

    // Build filter
    const filter = {};

    if (search) {
      filter.$or = [
        { sku: new RegExp(search, 'i') },
        { name: new RegExp(search, 'i') }
      ];
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    // Stock status filter
    if (stockStatus === 'out') {
      filter.stock = 0;
    } else if (stockStatus === 'low') {
      filter.$expr = {
        $and: [
          { $gt: ['$stock', 0] },
          { $lte: ['$stock', '$lowStockThreshold'] }
        ]
      };
    } else if (stockStatus === 'high') {
      filter.$expr = { $gt: ['$stock', '$lowStockThreshold'] };
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get products with pagination
    const [products, total] = await Promise.all([
      ShopItem.find(filter)
        .sort(sort)
        .limit(parseInt(limit))
        .skip(skip)
        .select('sku name category stock lowStockThreshold price imageUrl isActive updatedAt'),
      ShopItem.countDocuments(filter)
    ]);

    // Calculate stock statistics
    const stats = await ShopItem.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          outOfStock: {
            $sum: { $cond: [{ $eq: ['$stock', 0] }, 1, 0] }
          },
          lowStock: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gt: ['$stock', 0] },
                    { $lte: ['$stock', '$lowStockThreshold'] }
                  ]
                },
                1,
                0
              ]
            }
          },
          totalValue: {
            $sum: { $multiply: ['$stock', '$price'] }
          }
        }
      }
    ]);

    res.status(200).json({
      products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      statistics: stats[0] || {
        totalProducts: 0,
        outOfStock: 0,
        lowStock: 0,
        totalValue: 0
      }
    });
  } catch (error) {
    console.error('Error fetching inventory dashboard:', error);
    res.status(500).json({
      message: 'Failed to fetch inventory dashboard',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/v2/shop/admin/inventory/export
 * @desc    Export current inventory to CSV format
 * @access  Admin (Shop Management: Manage)
 */
exports.exportInventory = async (req, res) => {
  try {
    const products = await ShopItem.find({ isActive: true })
      .sort({ sku: 1 })
      .select('sku name category stock lowStockThreshold price');

    // Generate CSV data
    const csvHeaders = 'SKU,Name,Category,Stock,Low Stock Threshold,Price\n';
    const csvRows = products.map(p =>
      `${p.sku},"${p.name}",${p.category},${p.stock},${p.lowStockThreshold},${p.price}`
    ).join('\n');

    const csvContent = csvHeaders + csvRows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="inventory-export.csv"');
    res.status(200).send(csvContent);
  } catch (error) {
    console.error('Error exporting inventory:', error);
    res.status(500).json({
      message: 'Failed to export inventory',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/v2/shop/admin/inventory/low-stock
 * @desc    Get products with stock <= lowStockThreshold (Story-07)
 * @access  Admin (Shop Management: Manage)
 */
exports.getLowStockProducts = async (req, res) => {
  try {
    const products = await ShopItem.find({
      isActive: true,
      stock: { $gt: 0 },
      $expr: { $lte: ['$stock', '$lowStockThreshold'] }
    })
      .sort({ stock: 1 })
      .select('sku name category stock lowStockThreshold price imageUrl');

    res.status(200).json({
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Error fetching low stock products:', error);
    res.status(500).json({
      message: 'Failed to fetch low stock products',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/v2/shop/admin/inventory/out-of-stock
 * @desc    Get products with stock = 0 (Story-07)
 * @access  Admin (Shop Management: Manage)
 */
exports.getOutOfStockProducts = async (req, res) => {
  try {
    const products = await ShopItem.find({
      isActive: true,
      stock: 0
    })
      .sort({ name: 1 })
      .select('sku name category stock lowStockThreshold price imageUrl updatedAt');

    res.status(200).json({
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Error fetching out of stock products:', error);
    res.status(500).json({
      message: 'Failed to fetch out of stock products',
      error: error.message
    });
  }
};
