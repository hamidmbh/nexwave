
// Product model
class Product {
  constructor(id, name, description, price, discountPrice, discountPercentage, stock, category, image, rating, reviews, featured, specifications) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.discountPrice = discountPrice;
    this.discountPercentage = discountPercentage;
    this.stock = stock;
    this.category = category;
    this.image = image;
    this.rating = rating;
    this.reviews = reviews;
    this.featured = featured;
    this.specifications = specifications;
  }

  static fromJSON(json) {
    return new Product(
      json.id,
      json.name,
      json.description,
      json.price,
      json.discountPrice,
      json.discountPercentage,
      json.stock,
      json.category,
      json.image,
      json.rating,
      json.reviews,
      json.featured,
      json.specifications
    );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      discountPrice: this.discountPrice,
      discountPercentage: this.discountPercentage,
      stock: this.stock,
      category: this.category,
      image: this.image,
      rating: this.rating,
      reviews: this.reviews,
      featured: this.featured,
      specifications: this.specifications
    };
  }

  // Helper method to transform product object for Supabase
  static toSupabaseFormat(product) {
    // Convert specifications to JSON if it's an object
    const specifications = typeof product.specifications === 'object' 
      ? JSON.stringify(product.specifications)
      : product.specifications;
      
    return {
      ...product,
      specifications
    };
  }
}

module.exports = Product;
