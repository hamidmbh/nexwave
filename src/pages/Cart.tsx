
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CartItem from '@/components/CartItem';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-4xl">
          <h1 className="text-3xl font-display font-medium mb-8">Your Cart</h1>
          
          <div className="bg-muted/30 rounded-lg p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6">
              <ShoppingCart size={32} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link to="/products">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Calculate shipping costs - free shipping over $50
  const shippingCost = totalPrice >= 50 ? 0 : 9.99;
  const taxRate = 0.07; // 7% tax rate
  const taxAmount = totalPrice * taxRate;
  const orderTotal = totalPrice + shippingCost + taxAmount;
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container px-4 mx-auto">
        <h1 className="text-3xl font-display font-medium mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-background rounded-lg border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">
                  Cart Items ({totalItems})
                </h2>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearCart}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 size={18} className="mr-2" />
                  Clear Cart
                </Button>
              </div>
              
              <Separator className="mb-6" />
              
              <div className="space-y-0">
                {items.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-background rounded-lg border p-6 sticky top-24">
              <h2 className="text-xl font-medium mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shippingCost === 0 
                      ? <span className="text-green-600 dark:text-green-400">Free</span> 
                      : `$${shippingCost.toFixed(2)}`
                    }
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (7%)</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="w-full gap-2 mb-4"
                asChild
              >
                <Link to="/checkout">
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </Link>
              </Button>
              
              <div className="flex justify-center">
                <Link 
                  to="/products" 
                  className="text-sm text-primary hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
              
              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-muted-foreground text-center mb-3">
                  Secured Payment Methods
                </p>
                <div className="flex justify-center gap-2">
                  <div className="h-8 w-12 bg-muted/50 rounded"></div>
                  <div className="h-8 w-12 bg-muted/50 rounded"></div>
                  <div className="h-8 w-12 bg-muted/50 rounded"></div>
                  <div className="h-8 w-12 bg-muted/50 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
