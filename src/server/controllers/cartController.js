
const cartService = require('../services/cartService');

// Get cart items for a user
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await cartService.getCart(userId);
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    const result = await cartService.addToCart(userId, productId, quantity);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
};

// Update item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;
    const result = await cartService.updateCartItem(userId, parseInt(itemId), quantity);
    if (!result) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'Failed to update cart item' });
  }
};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const result = await cartService.removeCartItem(userId, parseInt(itemId));
    if (!result) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({ message: 'Failed to remove cart item' });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    await cartService.clearCart(userId);
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};

// Apply promotion to cart
exports.applyPromotion = async (req, res) => {
  try {
    const { userId } = req.params;
    const { promotionCode } = req.body;
    const result = await cartService.applyPromotion(userId, promotionCode);
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error applying promotion:', error);
    res.status(500).json({ message: 'Failed to apply promotion' });
  }
};

// Remove promotion from cart
exports.removePromotion = async (req, res) => {
  try {
    const { userId } = req.params;
    await cartService.removePromotion(userId);
    res.status(200).json({ message: 'Promotion removed from cart' });
  } catch (error) {
    console.error('Error removing promotion:', error);
    res.status(500).json({ message: 'Failed to remove promotion' });
  }
};
