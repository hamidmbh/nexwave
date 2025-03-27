
// Order model
class Order {
  constructor(id, userId, items, shippingInfo, paymentInfo, appliedPromotion, subtotal, discount, shipping, tax, total) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.shippingInfo = shippingInfo;
    this.paymentInfo = paymentInfo;
    this.appliedPromotion = appliedPromotion;
    this.subtotal = subtotal;
    this.discount = discount;
    this.shipping = shipping;
    this.tax = tax;
    this.total = total;
    this.status = 'processing';
    this.createdAt = new Date().toISOString();
  }

  updateStatus(status) {
    this.status = status;
    this.updatedAt = new Date().toISOString();
  }

  // Helper method to transform order object for Supabase
  static toSupabaseFormat(order) {
    return {
      ...order,
      items: JSON.stringify(order.items),
      shippingInfo: JSON.stringify(order.shippingInfo),
      paymentInfo: JSON.stringify(order.paymentInfo),
      appliedPromotion: order.appliedPromotion ? JSON.stringify(order.appliedPromotion) : null
    };
  }

  // Helper method to parse from Supabase to Order object
  static fromSupabase(supabaseOrder) {
    const order = {
      ...supabaseOrder,
      items: typeof supabaseOrder.items === 'string' ? JSON.parse(supabaseOrder.items) : supabaseOrder.items,
      shippingInfo: typeof supabaseOrder.shippingInfo === 'string' ? JSON.parse(supabaseOrder.shippingInfo) : supabaseOrder.shippingInfo,
      paymentInfo: typeof supabaseOrder.paymentInfo === 'string' ? JSON.parse(supabaseOrder.paymentInfo) : supabaseOrder.paymentInfo,
      appliedPromotion: supabaseOrder.appliedPromotion 
        ? (typeof supabaseOrder.appliedPromotion === 'string' 
          ? JSON.parse(supabaseOrder.appliedPromotion) 
          : supabaseOrder.appliedPromotion)
        : null
    };
    
    return order;
  }
}

module.exports = Order;
