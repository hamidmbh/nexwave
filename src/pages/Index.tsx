
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import ComingSoonProducts from '@/components/ComingSoonProducts';
import { getFeaturedProducts, getTopSellingProducts, getComingSoonProducts, categories } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const topSellingProducts = getTopSellingProducts();
  const comingSoonProducts = getComingSoonProducts();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products */}
      <FeaturedProducts 
        title="Featured Products" 
        products={featuredProducts}
        viewAllLink="/products"
      />
      
      {/* Top Selling Products */}
      <FeaturedProducts 
        title="Top Selling Products" 
        products={topSellingProducts}
        viewAllLink="/products"
      />
      
      {/* Coming Soon Products */}
      <ComingSoonProducts products={comingSoonProducts} />
      
      {/* Categories Section */}
      <section className="py-16 bg-accent/50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-display font-medium mb-8 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link 
                to={`/products?category=${category.id}`}
                key={category.id}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] hover-card-lift"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                  <h3 className="text-xl font-medium text-white mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm mb-3">{category.productCount} Products</p>
                  <span className="inline-flex items-center text-sm text-white gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop Now 
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features/Benefits Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">Free shipping on all orders over $50.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Round-the-clock assistance for any query.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Secure Payment</h3>
              <p className="text-muted-foreground">Safe & secure checkout experience.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-display font-medium mb-4">Stay Connected</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter to get updates on new products, special offers, and technology news.
          </p>
          
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-l-lg border-0 focus:ring-2 focus:ring-white/20 bg-white/10 text-white placeholder:text-white/50"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-white text-primary font-medium rounded-r-lg hover:bg-white/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;
