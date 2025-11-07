const ShopItem = require('../models/shopItem');
const { logger, errorLogger } = require('../config/pino-config');

class ShopService {
  /**
   * Get filtered products with pagination
   * @param {Object} filters - Category, search, price filters
   * @param {Object} pagination - Page and limit
   * @returns {Promise<Object>} Products and pagination info
   */
  static async getProducts(filters = {}, pagination = {}) {
    try {
      const {
        category,
        search,
        minPrice,
        maxPrice,
        inStock = true,
        sort = '-createdAt'
      } = filters;

      const {
        page = 1,
        limit = 20
      } = pagination;

      // Build query
      // Sprint5-Story-25 (AC8): Include both active products AND pending products
      const query = {
        $or: [
          { isActive: true },
          { isPendingProduct: true }
        ]
      };

      // Category filter
      if (category) {
        query.category = category;
      }

      // Search filter (text index)
      if (search) {
        query.$text = { $search: search };
      }

      // Price range
      if (minPrice !== undefined || maxPrice !== undefined) {
        query.price = {};
        if (minPrice !== undefined) query.price.$gte = Number(minPrice);
        if (maxPrice !== undefined) query.price.$lte = Number(maxPrice);
      }

      // Stock filter - Sprint5-Story-25: Don't filter out pending products by stock
      if (inStock === true || inStock === 'true') {
        // Pending products should always appear regardless of stock level
        // Only apply stock filter to non-pending products
        query.$and = query.$and || [];
        query.$and.push({
          $or: [
            { isPendingProduct: true },      // Pending products: include regardless of stock
            { stock: { $gt: 0 } }            // Regular products: only if stock > 0
          ]
        });
      }

      const skip = (page - 1) * limit;

      // Execute queries in parallel
      const [products, total] = await Promise.all([
        ShopItem.find(query)
          .select('-__v')
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .lean(),
        ShopItem.countDocuments(query)
      ]);

      // Add computed fields (since virtuals don't work with .lean())
      const enrichedProducts = products.map(product => {
        // Compute primaryImageUrl (virtual field logic)
        let primaryImageUrl = product.imageUrl; // fallback
        if (product.images && product.images.length > 0) {
          const primaryImage = product.images.find(img => img.isPrimary);
          primaryImageUrl = primaryImage ? primaryImage.url : product.images[0].url;
        }

        return {
          ...product,
          primaryImageUrl,
          inStock: product.stock > 0,
          lowStock: product.stock > 0 && product.stock <= (product.lowStockThreshold || 10),
          currentPrice: product.discountPrice !== null ? product.discountPrice : product.price
        };
      });

      logger.info({
        filters,
        pagination: { page, limit },
        resultCount: products.length,
        total
      }, 'Products retrieved successfully');

      return {
        success: true,
        data: {
          products: enrichedProducts,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            pages: Math.ceil(total / limit)
          }
        }
      };
    } catch (error) {
      errorLogger.error({ error: error.message, filters, pagination }, 'Error retrieving products');
      return {
        success: false,
        message: 'Failed to retrieve products',
        error: error.message
      };
    }
  }

  /**
   * Get single product by ID
   * @param {String} productId - Product ID
   * @returns {Promise<Object>} Product data
   */
  static async getProductById(productId) {
    try {
      const product = await ShopItem.findOne({
        _id: productId,
        isActive: true
      }).select('-__v');

      if (!product) {
        return {
          success: false,
          message: 'Product not found'
        };
      }

      logger.info({ productId }, 'Product retrieved successfully');

      return {
        success: true,
        data: {
          product: {
            ...product.toObject(),
            inStock: product.inStock,
            lowStock: product.lowStock,
            currentPrice: product.currentPrice
          }
        }
      };
    } catch (error) {
      errorLogger.error({ error: error.message, productId }, 'Error retrieving product');
      return {
        success: false,
        message: 'Failed to retrieve product',
        error: error.message
      };
    }
  }

  /**
   * Get featured products (low stock or recently added)
   * @param {Number} limit - Number of products to return
   * @returns {Promise<Object>} Featured products
   */
  static async getFeaturedProducts(limit = 6) {
    try {
      const products = await ShopItem.find({
        isActive: true,
        stock: { $gt: 0 }
      })
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('-__v')
        .lean();

      const enrichedProducts = products.map(product => {
        // Compute primaryImageUrl (virtual field logic)
        let primaryImageUrl = product.imageUrl; // fallback
        if (product.images && product.images.length > 0) {
          const primaryImage = product.images.find(img => img.isPrimary);
          primaryImageUrl = primaryImage ? primaryImage.url : product.images[0].url;
        }

        return {
          ...product,
          primaryImageUrl,
          inStock: product.stock > 0,
          lowStock: product.stock > 0 && product.stock <= (product.lowStockThreshold || 10),
          currentPrice: product.discountPrice !== null ? product.discountPrice : product.price
        };
      });

      logger.info({ count: products.length }, 'Featured products retrieved');

      return {
        success: true,
        data: {
          products: enrichedProducts
        }
      };
    } catch (error) {
      errorLogger.error({ error: error.message }, 'Error retrieving featured products');
      return {
        success: false,
        message: 'Failed to retrieve featured products',
        error: error.message
      };
    }
  }

  /**
   * Get categories with product counts
   * @returns {Promise<Object>} Categories
   */
  static async getCategories() {
    try {
      const categories = await ShopItem.aggregate([
        {
          $match: { isActive: true }
        },
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
            inStockCount: {
              $sum: { $cond: [{ $gt: ['$stock', 0] }, 1, 0] }
            }
          }
        },
        {
          $project: {
            _id: 0,
            category: '$_id',
            count: 1,
            inStockCount: 1
          }
        },
        {
          $sort: { category: 1 }
        }
      ]);

      logger.info({ categoriesCount: categories.length }, 'Categories retrieved');

      return {
        success: true,
        data: { categories }
      };
    } catch (error) {
      errorLogger.error({ error: error.message }, 'Error retrieving categories');
      return {
        success: false,
        message: 'Failed to retrieve categories',
        error: error.message
      };
    }
  }
}

module.exports = ShopService;
