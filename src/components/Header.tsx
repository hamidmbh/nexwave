import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  User,
  ChevronDown,
  Tag,
  UserPlus
} from 'lucide-react';
import SearchBar from './SearchBar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { totalItems: cartItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const isMobile = useIsMobile();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state for demo
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setIsSearchOpen(false);
    }
  };
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Toggle login state (for demo purposes)
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-background/80 backdrop-blur-lg shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-display font-bold tracking-tight flex items-center"
        >
          <span className="text-primary">Nex</span>
          <span>Wave</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/products" className="hover:text-primary transition-colors">
            All Products
          </Link>
          
          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors">
              Categories <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-background">
              <DropdownMenuItem>
                <Link to="/products?category=smartphones" className="w-full">
                  Smartphones
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/products?category=laptops" className="w-full">
                  Laptops
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/products?category=audio" className="w-full">
                  Audio
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/products?category=wearables" className="w-full">
                  Wearables
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Promotions Link */}
          <Link to="/promotions" className="hover:text-primary transition-colors flex items-center gap-1">
            <Tag size={18} />
            <span>Promotions</span>
          </Link>
        </nav>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          {/* Search Toggle */}
          <button 
            onClick={toggleSearch}
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Search"
          >
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
          
          {/* Wishlist */}
          <Link 
            to="/wishlist" 
            className="p-2 rounded-full hover:bg-accent transition-colors relative"
            aria-label="Wishlist"
          >
            <Heart size={20} />
            {wishlistItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistItems}
              </span>
            )}
          </Link>
          
          {/* Cart */}
          <Link 
            to="/cart" 
            className="p-2 rounded-full hover:bg-accent transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </Link>
          
          {/* Login / Account / Signup */}
          {isLoggedIn ? (
            <Link to="/account" className="hidden md:block">
              <Avatar className="h-9 w-9 border border-primary/20">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className="gap-1">
                  <UserPlus size={16} />
                  <span>Signup</span>
                </Button>
              </Link>
            </div>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMobileMenu}
            className="p-2 md:hidden rounded-full hover:bg-accent transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Search Bar - Full Width */}
      {isSearchOpen && (
        <div className="container px-4 py-3 mx-auto animate-fade-in">
          <SearchBar onClose={() => setIsSearchOpen(false)} />
        </div>
      )}
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-md animate-fade-in">
          <nav className="container px-4 py-4 mx-auto flex flex-col space-y-4">
            <Link 
              to="/products" 
              className="py-2 px-4 hover:bg-accent rounded-md transition-colors"
            >
              All Products
            </Link>
            
            <div className="py-2 px-4 font-medium">Categories</div>
            
            <Link 
              to="/products?category=smartphones" 
              className="py-2 px-8 hover:bg-accent rounded-md transition-colors"
            >
              Smartphones
            </Link>
            <Link 
              to="/products?category=laptops" 
              className="py-2 px-8 hover:bg-accent rounded-md transition-colors"
            >
              Laptops
            </Link>
            <Link 
              to="/products?category=audio" 
              className="py-2 px-8 hover:bg-accent rounded-md transition-colors"
            >
              Audio
            </Link>
            <Link 
              to="/products?category=wearables" 
              className="py-2 px-8 hover:bg-accent rounded-md transition-colors"
            >
              Wearables
            </Link>
            
            <Link 
              to="/promotions" 
              className="py-2 px-4 hover:bg-accent rounded-md transition-colors flex items-center gap-2"
            >
              <Tag size={18} />
              <span>Promotions</span>
            </Link>
            
            {isLoggedIn ? (
              <Link 
                to="/account" 
                className="py-2 px-4 hover:bg-accent rounded-md transition-colors flex items-center gap-2"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span>My Account</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="py-2 px-4 hover:bg-accent rounded-md transition-colors flex items-center gap-2"
              >
                <UserPlus size={18} />
                <span>Signup</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
