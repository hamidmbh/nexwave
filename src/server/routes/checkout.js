
const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// Process checkout
router.post('/:userId', checkoutController.processCheckout);

// Get order history for a user
router.get('/orders/:userId', checkoutController.getOrderHistory);

// Get order details
router.get('/orders/:userId/:orderId', checkoutController.getOrderDetails);

module.exports = router;
