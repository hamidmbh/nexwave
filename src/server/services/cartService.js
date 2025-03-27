
const supabase = require('../config/supabase');
const { Cart } = require('../models/Cart');
const productsService = require('./productsService');
const promotionsService = require('./promotionsService');

// Helper function to calculate cart totals
const calculateCartTotals = async (cart) => {
  let subtotal = 0;
  let totalItems = 0;

  for (const item of cart.items) {
    subtotal += item.price * item.quantity;
    totalItems += item.quantity;
  }

  let discountAmount = 0;
  
  if (cart.appliedPromotion) {
    const promotion = await promotionsService.getPromotionById(cart.appliedPromotion.id);
    
    if (promotion) {
      if (promotion.discountType === 'percentage' && promotion.discountValue) {
        discountAmount = subtotal * (promotion.discountValue / 100);
      } else if (promotion.discountType === 'fixed' && promotion.discountValue) {
        discountAmount = promotion.discountValue;
      }
    }
  }

  const total = Math.max(subtotal - discountAmount, 0);
  
  return {
    subtotal,
    discount: discountAmount,
    total,
    totalItems
  };
};

// Get cart for a user
exports.getCart = async (userId) => {
  const { data, error } = await supabase
    .from('carts')
    .select('*')
    .eq('user_id', userId)
    .single();
    
  let cart;
    
  if (error) {
    if (error.code === 'PGRST116') {
      // Cart doesn't exist, create a new one
      cart = new Cart(userId);
    } else {
      console.error(`Error fetching cart for user ${userId}:`, error);
      throw new Error('Failed to fetch cart');
    }
  } else {
    // Cart exists, parse it from Supabase format
    cart = Cart.fromSupabase(data);
  }
  
  const totals = await calculateCartTotals(cart);
  
  // Update cart with calculated totals
  const updatedCart = { ...cart, ...totals };
  
  // If cart is new or totals have changed, save it
  if (!data || 
      data.subtotal !== updatedCart.subtotal || 
      data.discount !== updatedCart.discount || 
      data.total !== updatedCart.total || 
      data.total_items !== updatedCart.totalItems) {
    
    await this.saveCart(updatedCart);
  }
  
  return updatedCart;
};

// Save cart to database
exports.saveCart = async (cart) => {
  const supabaseCart = Cart.toSupabaseFormat(cart);
  
  const { data: existingCart } = await supabase
    .from('carts')
    .select('*')
    .eq('user_id', cart.userId)
    .single();
    
  let result;
    
  if (existingCart) {
    // Update existing cart
    const { data, error } = await supabase
      .from('carts')
      .update(supabaseCart)
      .eq('user_id', cart.userId)
      .select();
      
    if (error) {
      console.error(`Error updating cart for user ${cart.userId}:`, error);
      throw new Error('Failed to update cart');
    }
    
    result = data[0];
  } else {
    // Insert new cart
    const { data, error } = await supabase
      .from('carts')
      .insert([supabaseCart])
      .select();
      
    if (error) {
      console.error(`Error creating cart for user ${cart.userId}:`, error);
      throw new Error('Failed to create cart');
    }
    
    result = data[0];
  }
  
  return Cart.fromSupabase(result);
};

// Add item to cart
exports.addToCart = async (userId, productId, quantity = 1) => {
  const product = await productsService.getProductById(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  
  const cart = await this.getCart(userId);
  const existingItemIndex = cart.items.findIndex(item => item.id === productId);
  
  if (existingItemIndex >= 0) {
    // Update quantity if item already exists
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.items.push({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.image,
      quantity
    });
  }
  
  const totals = await calculateCartTotals(cart);
  const updatedCart = { ...cart, ...totals };
  
  return await this.saveCart(updatedCart);
};

// Update cart item
exports.updateCartItem = async (userId, itemId, quantity) => {
  const cart = await this.getCart(userId);
  const itemIndex = cart.items.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return null;
  }
  
  if (quantity <= 0) {
    // Remove item if quantity is 0 or negative
    return this.removeCartItem(userId, itemId);
  }
  
  cart.items[itemIndex].quantity = quantity;
  
  const totals = await calculateCartTotals(cart);
  const updatedCart = { ...cart, ...totals };
  
  return await this.saveCart(updatedCart);
};

// Remove item from cart
exports.removeCartItem = async (userId, itemId) => {
  const cart = await this.getCart(userId);
  const itemIndex = cart.items.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return false;
  }
  
  cart.items.splice(itemIndex, 1);
  
  const totals = await calculateCartTotals(cart);
  const updatedCart = { ...cart, ...totals };
  
  await this.saveCart(updatedCart);
  
  return true;
};

// Clear cart
exports.clearCart = async (userId) => {
  const cart = await this.getCart(userId);
  cart.items = [];
  cart.appliedPromotion = null;
  
  const totals = await calculateCartTotals(cart);
  const updatedCart = { ...cart, ...totals };
  
  await this.saveCart(updatedCart);
};

// Apply promotion to cart
exports.applyPromotion = async (userId, promotionCode) => {
  const cart = await this.getCart(userId);
  
  // Find promotion by code
  const { valid, message, promotion } = await promotionsService.validatePromotionCode(promotionCode);
  
  if (!valid) {
    return { success: false, message };
  }
  
  // Check if cart meets minimum purchase requirement
  if (promotion.minimumPurchase && cart.subtotal < promotion.minimumPurchase) {
    return { 
      success: false, 
      message: `This promotion requires a minimum purchase of $${promotion.minimumPurchase}`
    };
  }
  
  // Apply promotion
  cart.appliedPromotion = {
    id: promotion.id,
    code: promotion.code,
    title: promotion.title
  };
  
  const totals = await calculateCartTotals(cart);
  const updatedCart = { ...cart, ...totals };
  
  await this.saveCart(updatedCart);
  
  return { 
    success: true, 
    message: 'Promotion applied successfully',
    cart: updatedCart
  };
};

// Remove promotion from cart
exports.removePromotion = async (userId) => {
  const cart = await this.getCart(userId);
  cart.appliedPromotion = null;
  
  const totals = await calculateCartTotals(cart);
  const updatedCart = { ...cart, ...totals };
  
  await this.saveCart(updatedCart);
};
