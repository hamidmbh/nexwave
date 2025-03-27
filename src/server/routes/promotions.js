
const express = require('express');
const router = express.Router();
const promotionsController = require('../controllers/promotionsController');

// Get all promotions
router.get('/', promotionsController.getAllPromotions);

// Get promotion by ID
router.get('/:id', promotionsController.getPromotionById);

// Get promotions by type
router.get('/type/:type', promotionsController.getPromotionsByType);

// Create a new promotion (admin only)
router.post('/', promotionsController.createPromotion);

// Update a promotion (admin only)
router.put('/:id', promotionsController.updatePromotion);

// Delete a promotion (admin only)
router.delete('/:id', promotionsController.deletePromotion);

module.exports = router;
