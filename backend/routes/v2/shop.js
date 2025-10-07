const express = require('express');
const router = express.Router();
const shopController = require('../../controllers/shopController');
const { authenticate } = require('../../middleware/auth');

/**
 * @route GET /api/v2/shop/products
 * @desc Get all products with filtering and pagination
 * @access Public
 */
router.get('/products', shopController.getProducts);

/**
 * @route GET /api/v2/shop/products/featured
 * @desc Get featured products
 * @access Public
 */
router.get('/products/featured', shopController.getFeaturedProducts);

/**
 * @route GET /api/v2/shop/products/:id
 * @desc Get single product by ID
 * @access Public
 */
router.get('/products/:id', shopController.getProductById);

/**
 * @route GET /api/v2/shop/categories
 * @desc Get categories with product counts
 * @access Public
 */
router.get('/categories', shopController.getCategories);

module.exports = router;
