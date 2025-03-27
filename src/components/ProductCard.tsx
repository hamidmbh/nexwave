
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    });
  };
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
    }
  };
  
  const inWishlist = isInWishlist(product.id);
  
  return (
    <div className={`group relative overflow-hidden rounded-xl bg-background hover-card-lift ${className}`}>
      <Link to={`/product/${product.id}`} className="block">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-accent/20 rounded-t-xl">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        
        {/* Labels - New, Sale, etc. */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-primary text-white">New</Badge>
          )}
          {product.isOnSale && (
            <Badge className="bg-destructive text-white">Sale</Badge>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleToggleWishlist}
            className={`p-2 rounded-full transition-colors ${
              inWishlist 
                ? 'bg-destructive text-white' 
                : 'bg-background/80 backdrop-blur-sm hover:bg-background'
            }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-medium line-clamp-2 mb-1">{product.name}</h3>
          
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-semibold">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-muted-foreground line-through text-sm">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Availability */}
          <div className="flex justify-between items-center">
            <span className={`text-sm ${
              product.stock > 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-destructive'
            }`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            
            <div className="flex items-center">
              <span className="text-sm text-amber-500">★</span>
              <span className="text-sm ml-1">{product.rating}</span>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Add to Cart Button */}
      <div className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="w-full gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
