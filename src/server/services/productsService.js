
const supabase = require('../config/supabase');
const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
    
  if (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
  
  return data;
};

// Get product by ID
exports.getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    if (error.code === 'PGRST116') {
      return null; // No product found
    }
    throw new Error('Failed to fetch product');
  }
  
  return data;
};

// Get products by category
exports.getProductsByCategory = async (category) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category);
    
  if (error) {
    console.error(`Error fetching products by category ${category}:`, error);
    throw new Error('Failed to fetch products by category');
  }
  
  return data;
};

// Get products by promotion
exports.getProductsByPromotion = async (promotionId) => {
  const promotionsService = require('./promotionsService');
  const promotion = await promotionsService.getPromotionById(promotionId);
  
  if (!promotion) {
    return [];
  }
  
  if (promotion.appliesTo === 'all') {
    return this.getAllProducts();
  }
  
  if (promotion.appliesTo === 'category' && promotion.categoryName) {
    return this.getProductsByCategory(promotion.categoryName);
  }
  
  if (promotion.appliesTo === 'products' && promotion.products) {
    const productIds = promotion.products.map(p => p.id);
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds);
      
    if (error) {
      console.error('Error fetching products by promotion:', error);
      throw new Error('Failed to fetch products by promotion');
    }
    
    return data;
  }
  
  return [];
};

// Create a new product
exports.createProduct = async (productData) => {
  // Transform product data for Supabase
  const supabaseProduct = Product.toSupabaseFormat(productData);
  
  const { data, error } = await supabase
    .from('products')
    .insert([supabaseProduct])
    .select();
    
  if (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
  
  return data[0];
};

// Update a product
exports.updateProduct = async (id, productData) => {
  // Transform product data for Supabase
  const supabaseProduct = Product.toSupabaseFormat(productData);
  
  const { data, error } = await supabase
    .from('products')
    .update(supabaseProduct)
    .eq('id', id)
    .select();
    
  if (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw new Error('Failed to update product');
  }
  
  if (data.length === 0) {
    return null; // No product found to update
  }
  
  return data[0];
};

// Delete a product
exports.deleteProduct = async (id) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw new Error('Failed to delete product');
  }
  
  return true;
};
