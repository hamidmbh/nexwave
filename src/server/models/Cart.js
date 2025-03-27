
// Cart model
class CartItem {
  constructor(id, name, price, image, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.quantity = quantity;
  }
}

class Cart {
  constructor(userId) {
    this.userId = userId;
    this.items = [];
    this.appliedPromotion = null;
    this.subtotal = 0;
    this.discount = 0;
    this.total = 0;
    this.totalItems = 0;
  }

  addItem(product, quantity = 1) {
    const existingItemIndex = this.items.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      this.items[existingItemIndex].quantity += quantity;
    } else {
      this.items.push(new CartItem(
        product.id,
        product.name,
        product.discountPrice || product.price,
        product.image,
        quantity
      ));
    }
  }

  updateItemQuantity(itemId, quantity) {
    const itemIndex = this.items.findIndex(item => item.id === itemId);
    if (itemIndex >= 0) {
      this.items[itemIndex].quantity = quantity;
      return true;
    }
    return false;
  }

  removeItem(itemId) {
    const itemIndex = this.items.findIndex(item => item.id === itemId);
    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1);
      return true;
    }
    return false;
  }

  applyPromotion(promotion) {
    this.appliedPromotion = {
      id: promotion.id,
      code: promotion.code,
      title: promotion.title
    };
  }

  removePromotion() {
    this.appliedPromotion = null;
  }

  clear() {
    this.items = [];
    this.appliedPromotion = null;
    this.subtotal = 0;
    this.discount = 0;
    this.total = 0;
    this.totalItems = 0;
  }

  // Helper method to transform cart object for Supabase
  static toSupabaseFormat(cart) {
    return {
      user_id: cart.userId,
      items: JSON.stringify(cart.items),
      applied_promotion: cart.appliedPromotion ? JSON.stringify(cart.appliedPromotion) : null,
      subtotal: cart.subtotal,
      discount: cart.discount,
      total: cart.total,
      total_items: cart.totalItems
    };
  }

  // Helper method to parse from Supabase to Cart object
  static fromSupabase(supabaseCart) {
    const cart = new Cart(supabaseCart.user_id);
    
    cart.items = typeof supabaseCart.items === 'string' 
      ? JSON.parse(supabaseCart.items) 
      : supabaseCart.items || [];
      
    cart.appliedPromotion = supabaseCart.applied_promotion 
      ? (typeof supabaseCart.applied_promotion === 'string' 
        ? JSON.parse(supabaseCart.applied_promotion) 
        : supabaseCart.applied_promotion) 
      : null;
      
    cart.subtotal = supabaseCart.subtotal || 0;
    cart.discount = supabaseCart.discount || 0;
    cart.total = supabaseCart.total || 0;
    cart.totalItems = supabaseCart.total_items || 0;
    
    return cart;
  }
}

module.exports = { Cart, CartItem };
