
const supabase = require('../config/supabase');
const Promotion = require('../models/Promotion');

// Get all promotions
exports.getAllPromotions = async () => {
  const { data, error } = await supabase
    .from('promotions')
    .select('*');
    
  if (error) {
    console.error('Error fetching promotions:', error);
    throw new Error('Failed to fetch promotions');
  }
  
  // Parse data if needed
  return data.map(promotion => Promotion.fromSupabase(promotion));
};

// Get promotion by ID
exports.getPromotionById = async (id) => {
  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error(`Error fetching promotion with ID ${id}:`, error);
    if (error.code === 'PGRST116') {
      return null; // No promotion found
    }
    throw new Error('Failed to fetch promotion');
  }
  
  return Promotion.fromSupabase(data);
};

// Get promotions by type
exports.getPromotionsByType = async (type) => {
  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .eq('type', type);
    
  if (error) {
    console.error(`Error fetching promotions by type ${type}:`, error);
    throw new Error('Failed to fetch promotions by type');
  }
  
  return data.map(promotion => Promotion.fromSupabase(promotion));
};

// Get active promotions
exports.getActivePromotions = async () => {
  const now = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .gt('validUntil', now);
    
  if (error) {
    console.error('Error fetching active promotions:', error);
    throw new Error('Failed to fetch active promotions');
  }
  
  return data.map(promotion => Promotion.fromSupabase(promotion));
};

// Validate promotion code
exports.validatePromotionCode = async (code) => {
  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .eq('code', code)
    .single();
    
  if (error) {
    console.error(`Error validating promotion code ${code}:`, error);
    if (error.code === 'PGRST116') {
      return { valid: false, message: 'Invalid promotion code' };
    }
    throw new Error('Failed to validate promotion code');
  }
  
  const promotion = Promotion.fromSupabase(data);
  
  const now = new Date();
  const validUntil = new Date(promotion.validUntil);
  
  if (validUntil < now) {
    return { valid: false, message: 'Promotion has expired' };
  }
  
  return { valid: true, promotion };
};

// Create a new promotion
exports.createPromotion = async (promotionData) => {
  // Transform promotion data for Supabase
  const supabasePromotion = Promotion.toSupabaseFormat(promotionData);
  
  const { data, error } = await supabase
    .from('promotions')
    .insert([supabasePromotion])
    .select();
    
  if (error) {
    console.error('Error creating promotion:', error);
    throw new Error('Failed to create promotion');
  }
  
  return Promotion.fromSupabase(data[0]);
};

// Update a promotion
exports.updatePromotion = async (id, promotionData) => {
  // Transform promotion data for Supabase
  const supabasePromotion = Promotion.toSupabaseFormat(promotionData);
  
  const { data, error } = await supabase
    .from('promotions')
    .update(supabasePromotion)
    .eq('id', id)
    .select();
    
  if (error) {
    console.error(`Error updating promotion with ID ${id}:`, error);
    throw new Error('Failed to update promotion');
  }
  
  if (data.length === 0) {
    return null; // No promotion found to update
  }
  
  return Promotion.fromSupabase(data[0]);
};

// Delete a promotion
exports.deletePromotion = async (id) => {
  const { error } = await supabase
    .from('promotions')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error(`Error deleting promotion with ID ${id}:`, error);
    throw new Error('Failed to delete promotion');
  }
  
  return true;
};
