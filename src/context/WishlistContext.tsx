
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  
  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('nexwave-wishlist');
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
        localStorage.removeItem('nexwave-wishlist');
      }
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('nexwave-wishlist', JSON.stringify(items));
  }, [items]);
  
  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id);
  };
  
  const addItem = (newItem: WishlistItem) => {
    // Only add if not already in wishlist
    if (!isInWishlist(newItem.id)) {
      setItems(currentItems => [...currentItems, newItem]);
      toast.success(`${newItem.name} added to your wishlist`);
    }
  };
  
  const removeItem = (id: string) => {
    setItems(currentItems => {
      const item = currentItems.find(item => item.id === id);
      if (item) {
        toast.success(`${item.name} removed from your wishlist`);
      }
      return currentItems.filter(item => item.id !== id);
    });
  };
  
  const clearWishlist = () => {
    setItems([]);
    toast.success('Wishlist cleared');
  };
  
  const totalItems = items.length;
  
  return (
    <WishlistContext.Provider 
      value={{ 
        items, 
        addItem, 
        removeItem, 
        clearWishlist, 
        isInWishlist,
        totalItems 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
