
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Check,
  AlertCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeaturedProducts from '@/components/FeaturedProducts';
import { getProductById, getRelatedProducts } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/lib/data';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem: addToCart } = useCart();
  const { 
    addItem: addToWishlist, 
    removeItem: removeFromWishlist, 
    isInWishlist 
  } = useWishlist();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    if (id) {
      const foundProduct = getProductById(id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setRelatedProducts(getRelatedProducts(foundProduct));
      } else {
        // Product not found, redirect to 404
        navigate('/404');
      }
    }
  }, [id, navigate]);
  
  const handlePrevImage = () => {
    if (product) {
      setActiveImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };
  
  const handleNextImage = () => {
    if (product) {
      setActiveImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
    }
  };
  
  const handleToggleWishlist = () => {
    if (!product) return;
    
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
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out this product: ${product?.name}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-muted h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-muted rounded w-32"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-48"></div>
                <div className="h-4 bg-muted rounded w-40"></div>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    );
  }
  
  const isInWish = isInWishlist(product.id);
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container px-4 mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="text-sm text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <span>/</span>
              <li>
                <Link to="/products" className="hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <span>/</span>
              <li>
                <Link 
                  to={`/products?category=${product.category}`} 
                  className="hover:text-primary transition-colors"
                >
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Link>
              </li>
              <span>/</span>
              <li className="truncate">{product.name}</li>
            </ol>
          </nav>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative rounded-xl overflow-hidden bg-accent/10 aspect-square">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              
              {/* Product Labels */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.isNew && (
                  <Badge className="bg-primary text-white">New</Badge>
                )}
                {product.isOnSale && (
                  <Badge className="bg-destructive text-white">Sale</Badge>
                )}
              </div>
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`rounded-md overflow-hidden aspect-square ${
                      activeImageIndex === index 
                        ? 'ring-2 ring-primary' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-display font-medium mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? "text-amber-500" : "text-muted-foreground"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-semibold">
                ${product.price.toFixed(2)}
              </span>
              
              {product.oldPrice && (
                <span className="text-muted-foreground line-through text-lg">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
              
              {product.isOnSale && (
                <Badge variant="outline" className="ml-auto text-destructive border-destructive">
                  <Clock size={14} className="mr-1" />
                  Limited Time Offer
                </Badge>
              )}
            </div>
            
            {/* Availability */}
            <div className="mb-6 flex items-center gap-2">
              {product.stock > 0 ? (
                <>
                  <Badge variant="outline" className="text-green-600 border-green-600 flex items-center gap-1">
                    <Check size={14} />
                    In Stock
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} units available
                  </span>
                </>
              ) : (
                <Badge variant="outline" className="text-destructive border-destructive flex items-center gap-1">
                  <AlertCircle size={14} />
                  Out of Stock
                </Badge>
              )}
            </div>
            
            <Separator className="mb-6" />
            
            {/* Short Description */}
            <p className="text-muted-foreground mb-6">
              {product.description}
            </p>
            
            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-50"
                >
                  -
                </button>
                
                <span className="w-8 text-center">{quantity}</span>
                
                <button
                  onClick={increaseQuantity}
                  className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-accent transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Button 
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                size="lg"
                className="gap-2"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={handleToggleWishlist}
                  variant="outline"
                  size="lg"
                  className={isInWish ? "text-destructive border-destructive" : ""}
                >
                  <Heart size={18} fill={isInWish ? "currentColor" : "none"} />
                </Button>
                
                <Button 
                  onClick={handleShare}
                  variant="outline"
                  size="lg"
                >
                  <Share2 size={18} />
                </Button>
              </div>
            </div>
            
            <Separator className="mb-6" />
            
            {/* Product Features */}
            <div className="mb-8">
              <h3 className="font-medium mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="mt-1 text-primary"><Check size={16} /></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specs">
            <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto">
              <TabsTrigger 
                value="specs" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger 
                value="details" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
              >
                Product Details
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
              >
                Reviews ({product.reviews})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="specs" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b">
                    <span className="font-medium">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="pt-6">
              <div className="prose max-w-none dark:prose-invert">
                <p className="mb-4">
                  {product.description}
                </p>
                <p className="mb-4">
                  Experience the future of technology with the {product.name}. Designed with precision and crafted 
                  for performance, this product combines cutting-edge features with elegant design.
                </p>
                <p>
                  Whether you're a technology enthusiast or a casual user looking for reliability, 
                  the {product.name} delivers exceptional value with its intuitive interface, powerful 
                  capabilities, and premium build quality.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-6">
              <div className="flex flex-col gap-6">
                <div className="text-center p-8 bg-muted/30 rounded-lg">
                  <p className="mb-4">Reviews will be implemented in the next version.</p>
                  <Button variant="outline">Write a Review</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <FeaturedProducts 
            title="You May Also Like" 
            products={relatedProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
