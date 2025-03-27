
const checkoutService = require('../services/checkoutService');

// Process checkout
exports.processCheckout = async (req, res) => {
  try {
    const { userId } = req.params;
    const { shippingInfo, paymentInfo } = req.body;
    
    const order = await checkoutService.processCheckout(userId, shippingInfo, paymentInfo);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({ message: 'Failed to process checkout', error: error.message });
  }
};

// Get order history for a user
exports.getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await checkoutService.getOrderHistory(userId);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Failed to fetch order history' });
  }
};

// Get order details
exports.getOrderDetails = async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    const order = await checkoutService.getOrderDetails(userId, orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Failed to fetch order details' });
  }
};
