
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

const Wishlist = () => {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
  };
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-4xl">
          <h1 className="text-3xl font-display font-medium mb-8">Your Wishlist</h1>
          
          <div className="bg-muted/30 rounded-lg p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6">
              <Heart size={32} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">
              Save items you love to your wishlist. Review them anytime and easily move them to the cart.
            </p>
            <Button asChild size="lg">
              <Link to="/products">
                Browse Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-medium">Your Wishlist</h1>
          
          <Button 
            variant="ghost" 
            onClick={clearWishlist}
            className="text-muted-foreground hover:text-destructive"
          >
            Clear All
          </Button>
        </div>
        
        <div className="bg-background rounded-lg border overflow-hidden">
          {items.map((item, index) => (
            <div key={item.id}>
              {index > 0 && <Separator />}
              <div className="p-6 flex items-center gap-4">
                {/* Product Image */}
                <Link to={`/product/${item.id}`} className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </Link>
                
                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="hover:text-primary transition-colors">
                    <h3 className="text-lg font-medium mb-1 truncate">{item.name}</h3>
                  </Link>
                  <p className="text-lg font-semibold mb-2">${item.price.toFixed(2)}</p>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="gap-2"
                  >
                    <ShoppingCart size={18} />
                    <span className="hidden sm:inline">Add to Cart</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Heart size={18} fill="currentColor" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/products">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
