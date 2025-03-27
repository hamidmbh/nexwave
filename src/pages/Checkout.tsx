
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, CreditCard, Truck, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

type CheckoutStep = 'shipping' | 'payment' | 'review';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Shipping costs and tax calculations
  const shippingCost = totalPrice >= 50 ? 0 : 9.99;
  const taxRate = 0.07; // 7% tax rate
  const taxAmount = totalPrice * taxRate;
  const orderTotal = totalPrice + shippingCost + taxAmount;
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Redirect to cart if cart is empty
    if (items.length === 0) {
      navigate('/cart');
      toast.error('Your cart is empty. Add some products before checkout.');
    }
  }, [items.length, navigate]);
  
  const handleSubmitOrder = () => {
    setIsSubmitting(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      navigate('/');
      toast.success('Your order has been placed successfully!');
    }, 1500);
  };
  
  const goToNextStep = () => {
    if (currentStep === 'shipping') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('review');
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep === 'payment') {
      setCurrentStep('shipping');
    } else if (currentStep === 'review') {
      setCurrentStep('payment');
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container px-4 mx-auto max-w-5xl">
        <h1 className="text-3xl font-display font-medium mb-8">Checkout</h1>
        
        {/* Checkout Progress */}
        <div className="flex items-center justify-between mb-10 px-4">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === 'shipping' || currentStep === 'payment' || currentStep === 'review'
                ? 'bg-primary text-white' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {currentStep === 'payment' || currentStep === 'review' ? <Check size={16} /> : 1}
            </div>
            <div className="ml-2">
              <p className="font-medium">Shipping</p>
            </div>
          </div>
          
          <ChevronRight className="text-muted-foreground" size={16} />
          
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === 'payment' || currentStep === 'review'
                ? 'bg-primary text-white' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {currentStep === 'review' ? <Check size={16} /> : 2}
            </div>
            <div className="ml-2">
              <p className="font-medium">Payment</p>
            </div>
          </div>
          
          <ChevronRight className="text-muted-foreground" size={16} />
          
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === 'review'
                ? 'bg-primary text-white' 
                : 'bg-muted text-muted-foreground'
            }`}>
              3
            </div>
            <div className="ml-2">
              <p className="font-medium">Review</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                {currentStep === 'shipping' && (
                  <div>
                    <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                      <Truck size={20} />
                      Shipping Information
                    </h2>
                    
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                          <input
                            id="firstName"
                            type="text"
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            defaultValue="John"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                          <input
                            id="lastName"
                            type="text"
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            defaultValue="Doe"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                        <input
                          id="address"
                          type="text"
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          defaultValue="123 Main St"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                          <input
                            id="city"
                            type="text"
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            defaultValue="New York"
                          />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                          <select
                            id="state"
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            defaultValue="NY"
                          >
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="zip" className="block text-sm font-medium mb-1">ZIP Code</label>
                          <input
                            id="zip"
                            type="text"
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            defaultValue="10001"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <input
                          id="email"
                          type="email"
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          defaultValue="john.doe@example.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                        <input
                          id="phone"
                          type="tel"
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          defaultValue="(555) 123-4567"
                        />
                      </div>
                    </form>
                    
                    <div className="mt-6 flex justify-end">
                      <Button onClick={goToNextStep}>
                        Continue to Payment
                        <ChevronRight size={18} />
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 'payment' && (
                  <div>
                    <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                      <CreditCard size={20} />
                      Payment Method
                    </h2>
                    
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium mb-1">Name on Card</label>
                        <input
                          id="cardName"
                          type="text"
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          defaultValue="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
                        <input
                          id="cardNumber"
                          type="text"
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          defaultValue="4242 4242 4242 4242"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium mb-1">Expiry Date</label>
                          <input
                            id="expiry"
                            type="text"
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="MM/YY"
                            defaultValue="12/25"
                          />
                        </div>
                        <div>
                          <label htmlFor="cvc" className="block text-sm font-medium mb-1">CVC</label>
                          <input
                            id="cvc"
                            type="text"
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            defaultValue="123"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          id="saveCard" 
                          type="checkbox" 
                          className="h-4 w-4 border-border rounded focus:ring-primary"
                          defaultChecked
                        />
                        <label htmlFor="saveCard" className="ml-2 text-sm">
                          Save this card for future purchases
                        </label>
                      </div>
                    </form>
                    
                    <div className="mt-6 flex justify-between">
                      <Button variant="outline" onClick={goToPreviousStep}>
                        Back to Shipping
                      </Button>
                      <Button onClick={goToNextStep}>
                        Review Order
                        <ChevronRight size={18} />
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 'review' && (
                  <div>
                    <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                      <User size={20} />
                      Review Order
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground mb-2">Shipping Information</h3>
                        <p>John Doe</p>
                        <p>123 Main St</p>
                        <p>New York, NY 10001</p>
                        <p>john.doe@example.com</p>
                        <p>(555) 123-4567</p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground mb-2">Payment Method</h3>
                        <p>Credit Card ending in 4242</p>
                        <p>Expires 12/25</p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground mb-2">Items ({items.length})</h3>
                        {items.map(item => (
                          <div key={item.id} className="flex items-center justify-between py-2">
                            <div className="flex items-center">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-12 h-12 object-cover rounded mr-3" 
                              />
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <Button variant="outline" onClick={goToPreviousStep}>
                        Back to Payment
                      </Button>
                      <Button 
                        onClick={handleSubmitOrder} 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Processing...' : 'Place Order'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-4">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
