
const supabase = require('../config/supabase');
const Order = require('../models/Order');
const cartService = require('./cartService');

// Generate a random order ID
const generateOrderId = () => {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// Process checkout
exports.processCheckout = async (userId, shippingInfo, paymentInfo) => {
  // Get the user's cart
  const cart = await cartService.getCart(userId);
  
  if (cart.items.length === 0) {
    throw new Error('Cart is empty');
  }
  
  // Create order
  const order = {
    id: generateOrderId(),
    userId,
    items: [...cart.items],
    shippingInfo,
    paymentInfo: {
      ...paymentInfo,
      cardNumber: paymentInfo.cardNumber ? `xxxx-xxxx-xxxx-${paymentInfo.cardNumber.slice(-4)}` : undefined
    },
    appliedPromotion: cart.appliedPromotion,
    subtotal: cart.subtotal,
    discount: cart.discount,
    shipping: cart.subtotal >= 50 ? 0 : 9.99, // Free shipping over $50
    tax: cart.total * 0.07, // 7% tax
    total: cart.total + (cart.subtotal >= 50 ? 0 : 9.99) + (cart.total * 0.07),
    status: 'processing',
    createdAt: new Date().toISOString()
  };
  
  // Save order to database
  const supabaseOrder = Order.toSupabaseFormat(order);
  
  const { data, error } = await supabase
    .from('orders')
    .insert([supabaseOrder])
    .select();
    
  if (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
  
  // Clear the cart after checkout
  await cartService.clearCart(userId);
  
  return Order.fromSupabase(data[0]);
};

// Get order history for a user
exports.getOrderHistory = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('userId', userId)
    .order('createdAt', { ascending: false });
    
  if (error) {
    console.error(`Error fetching order history for user ${userId}:`, error);
    throw new Error('Failed to fetch order history');
  }
  
  return data.map(order => Order.fromSupabase(order));
};

// Get order details
exports.getOrderDetails = async (userId, orderId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('userId', userId)
    .eq('id', orderId)
    .single();
    
  if (error) {
    console.error(`Error fetching order ${orderId} for user ${userId}:`, error);
    if (error.code === 'PGRST116') {
      return null; // Order not found
    }
    throw new Error('Failed to fetch order details');
  }
  
  return Order.fromSupabase(data);
};
