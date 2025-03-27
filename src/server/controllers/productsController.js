
const productsService = require('../services/productsService');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(parseInt(id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await productsService.getProductsByCategory(category);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// Get products by promotion
exports.getProductsByPromotion = async (req, res) => {
  try {
    const { promotionId } = req.params;
    const products = await productsService.getProductsByPromotion(parseInt(promotionId));
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by promotion:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// Create a new product (admin only)
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await productsService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

// Update a product (admin only)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productsService.updateProduct(parseInt(id), req.body);
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product' });
  }
};

// Delete a product (admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsService.deleteProduct(parseInt(id));
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};
