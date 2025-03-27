
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get cart items for a user
router.get('/:userId', cartController.getCart);

// Add item to cart
router.post('/:userId/items', cartController.addToCart);

// Update item quantity
router.put('/:userId/items/:itemId', cartController.updateCartItem);

// Remove item from cart
router.delete('/:userId/items/:itemId', cartController.removeCartItem);

// Clear cart
router.delete('/:userId', cartController.clearCart);

// Apply promotion to cart
router.post('/:userId/promotion', cartController.applyPromotion);

// Remove promotion from cart
router.delete('/:userId/promotion', cartController.removePromotion);

module.exports = router;
