
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Get all products
router.get('/', productsController.getAllProducts);

// Get product by ID
router.get('/:id', productsController.getProductById);

// Get products by category
router.get('/category/:category', productsController.getProductsByCategory);

// Get products by promotion
router.get('/promotion/:promotionId', productsController.getProductsByPromotion);

// Create a new product (admin only)
router.post('/', productsController.createProduct);

// Update a product (admin only)
router.put('/:id', productsController.updateProduct);

// Delete a product (admin only)
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
