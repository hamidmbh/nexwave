
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { products, categories, Product } from '@/lib/data';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Extract query parameters
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sortBy = searchParams.get('sort') || 'newest';
  
  // Price range state
  const [priceRange, setPriceRange] = useState({
    min: minPrice ? parseInt(minPrice) : 0,
    max: maxPrice ? parseInt(maxPrice) : 2000,
  });
  
  // Filter and sort products
  useEffect(() => {
    // Start with all products
    let result = [...products];
    
    // Apply category filter
    if (categoryParam) {
      result = result.filter(product => product.category === categoryParam);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply price filter
    result = result.filter(
      product => 
        product.price >= priceRange.min && 
        product.price <= priceRange.max
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
      default:
        // Assuming newer products are at the beginning of the array
        // In a real app, this would use a timestamp or id
        break;
    }
    
    setFilteredProducts(result);
  }, [categoryParam, searchQuery, priceRange, sortBy]);
  
  // Handle price range changes
  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = value === '' ? (type === 'min' ? 0 : 2000) : parseInt(value);
    
    setPriceRange(prev => ({
      ...prev,
      [type]: numValue
    }));
    
    // Update URL params
    if (type === 'min') {
      if (numValue === 0) {
        searchParams.delete('minPrice');
      } else {
        searchParams.set('minPrice', numValue.toString());
      }
    } else {
      if (numValue === 2000) {
        searchParams.delete('maxPrice');
      } else {
        searchParams.set('maxPrice', numValue.toString());
      }
    }
    
    setSearchParams(searchParams);
  };
  
  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    searchParams.set('sort', value);
    setSearchParams(searchParams);
  };
  
  // Handle category selection
  const handleCategoryChange = (categoryId: string) => {
    if (categoryParam === categoryId) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setPriceRange({ min: 0, max: 2000 });
  };
  
  // Responsive filter menu toggle
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-medium mb-2">
              {categoryParam 
                ? categories.find(c => c.id === categoryParam)?.name || 'Products' 
                : searchQuery 
                  ? `Search results for "${searchQuery}"`
                  : 'All Products'
              }
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </div>
          
          {/* Mobile Filter Toggle */}
          <div className="block lg:hidden mb-6">
            <Button onClick={toggleFilter} variant="outline" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <Filter size={18} />
                Filters
              </span>
              {isFilterOpen ? <X size={18} /> : <span>{filteredProducts.length} results</span>}
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside 
              className={`w-full lg:w-64 flex-shrink-0 ${
                isFilterOpen ? 'block' : 'hidden lg:block'
              }`}
            >
              <div className="bg-background rounded-lg border p-6 sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-medium">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="h-8 text-muted-foreground hover:text-foreground"
                  >
                    Reset All
                  </Button>
                </div>
                
                <Separator className="mb-4" />
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center gap-2">
                        <Checkbox 
                          id={`category-${category.id}`}
                          checked={categoryParam === category.id}
                          onCheckedChange={() => handleCategoryChange(category.id)}
                        />
                        <label 
                          htmlFor={`category-${category.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="mb-4" />
                
                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Price Range</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Min</label>
                      <input
                        type="number"
                        min="0"
                        max={priceRange.max}
                        value={priceRange.min}
                        onChange={e => handlePriceChange('min', e.target.value)}
                        className="w-full px-3 py-1 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Max</label>
                      <input
                        type="number"
                        min={priceRange.min}
                        max="10000"
                        value={priceRange.max}
                        onChange={e => handlePriceChange('max', e.target.value)}
                        className="w-full px-3 py-1 border rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <Separator className="mb-4" />
                
                {/* Special Filters */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Special Offers</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="filter-sale" />
                      <label htmlFor="filter-sale" className="text-sm cursor-pointer">
                        On Sale
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="filter-new" />
                      <label htmlFor="filter-new" className="text-sm cursor-pointer">
                        New Arrivals
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="filter-stock" />
                      <label htmlFor="filter-stock" className="text-sm cursor-pointer">
                        In Stock Only
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            
            {/* Products Grid */}
            <div className="flex-1">
              {/* Sort Controls */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-muted-foreground hidden lg:block">
                  Showing {filteredProducts.length} results
                </p>
                
                <div className="flex items-center gap-2 ml-auto">
                  <label htmlFor="sort" className="text-sm whitespace-nowrap">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="px-3 py-1 border rounded text-sm bg-background"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                </div>
              </div>
              
              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-accent/30 rounded-lg p-8 text-center">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search query.
                  </p>
                  <Button onClick={clearFilters}>Clear All Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
