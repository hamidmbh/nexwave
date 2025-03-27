
const promotionsService = require('../services/promotionsService');

// Get all promotions
exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await promotionsService.getAllPromotions();
    res.status(200).json(promotions);
  } catch (error) {
    console.error('Error fetching promotions:', error);
    res.status(500).json({ message: 'Failed to fetch promotions' });
  }
};

// Get promotion by ID
exports.getPromotionById = async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await promotionsService.getPromotionById(parseInt(id));
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.status(200).json(promotion);
  } catch (error) {
    console.error('Error fetching promotion by ID:', error);
    res.status(500).json({ message: 'Failed to fetch promotion' });
  }
};

// Get promotions by type
exports.getPromotionsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const promotions = await promotionsService.getPromotionsByType(type);
    res.status(200).json(promotions);
  } catch (error) {
    console.error('Error fetching promotions by type:', error);
    res.status(500).json({ message: 'Failed to fetch promotions' });
  }
};

// Create a new promotion (admin only)
exports.createPromotion = async (req, res) => {
  try {
    const newPromotion = await promotionsService.createPromotion(req.body);
    res.status(201).json(newPromotion);
  } catch (error) {
    console.error('Error creating promotion:', error);
    res.status(500).json({ message: 'Failed to create promotion' });
  }
};

// Update a promotion (admin only)
exports.updatePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPromotion = await promotionsService.updatePromotion(parseInt(id), req.body);
    if (!updatedPromotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.status(200).json(updatedPromotion);
  } catch (error) {
    console.error('Error updating promotion:', error);
    res.status(500).json({ message: 'Failed to update promotion' });
  }
};

// Delete a promotion (admin only)
exports.deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await promotionsService.deletePromotion(parseInt(id));
    if (!result) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.status(200).json({ message: 'Promotion deleted successfully' });
  } catch (error) {
    console.error('Error deleting promotion:', error);
    res.status(500).json({ message: 'Failed to delete promotion' });
  }
};
