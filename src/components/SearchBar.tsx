
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchProducts } from '@/lib/data';
import { Product } from '@/lib/data';

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Add click outside listener
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        setIsLoading(true);
        // Simulate API call with mock data
        const foundProducts = searchProducts(query);
        setResults(foundProducts);
        setIsLoading(false);
      } else {
        setResults([]);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      setQuery('');
      if (onClose) onClose();
    }
  };
  
  const handleResultClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setQuery('');
    if (onClose) onClose();
  };
  
  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };
  
  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search for products..."
            className="w-full pl-10 pr-10 py-2 rounded-lg border bg-background focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        {/* Search Results Dropdown */}
        {isFocused && query.trim() && (
          <div className="absolute z-50 top-full mt-1 left-0 right-0 bg-background border rounded-lg shadow-md overflow-hidden animate-fade-in">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">Searching...</div>
            ) : results.length > 0 ? (
              <ul className="max-h-96 overflow-y-auto">
                {results.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => handleResultClick(product.id)}
                      className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-accent transition-colors"
                    >
                      <div className="h-12 w-12 rounded-md bg-muted overflow-hidden flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{product.name}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
                <li className="px-4 py-2 text-center border-t">
                  <button
                    type="submit"
                    className="text-primary text-sm hover:underline"
                  >
                    View all results for "{query}"
                  </button>
                </li>
              </ul>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No products found for "{query}"
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
