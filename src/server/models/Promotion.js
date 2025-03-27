
// Promotion model
class Promotion {
  constructor(id, code, title, description, discountType, discountValue, minimumPurchase, validUntil, appliesTo, categoryName, products) {
    this.id = id;
    this.code = code;
    this.title = title;
    this.description = description;
    this.discountType = discountType; // 'percentage' or 'fixed'
    this.discountValue = discountValue;
    this.minimumPurchase = minimumPurchase;
    this.validUntil = validUntil;
    this.appliesTo = appliesTo; // 'all', 'category', or 'products'
    this.categoryName = categoryName;
    this.products = products;
  }

  isValid() {
    const now = new Date();
    const validUntil = new Date(this.validUntil);
    return validUntil > now;
  }

  calculateDiscount(subtotal) {
    if (this.minimumPurchase && subtotal < this.minimumPurchase) {
      return 0;
    }
    
    if (this.discountType === 'percentage') {
      return subtotal * (this.discountValue / 100);
    } else if (this.discountType === 'fixed') {
      return Math.min(this.discountValue, subtotal);
    }
    
    return 0;
  }

  // Helper method to transform promotion object for Supabase
  static toSupabaseFormat(promotion) {
    return {
      ...promotion,
      products: promotion.products ? JSON.stringify(promotion.products) : null
    };
  }

  // Helper method to parse from Supabase to Promotion object
  static fromSupabase(supabasePromotion) {
    return {
      ...supabasePromotion,
      products: supabasePromotion.products 
        ? (typeof supabasePromotion.products === 'string' 
          ? JSON.parse(supabasePromotion.products) 
          : supabasePromotion.products)
        : null
    };
  }
}

module.exports = Promotion;
