
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/lib/data';
import { toast } from 'sonner';

interface ComingSoonProductsProps {
  products: Product[];
}

const ComingSoonProducts = ({ products }: ComingSoonProductsProps) => {
  const [notifiedProducts, setNotifiedProducts] = useState<string[]>([]);
  
  const handleNotify = (productId: string, productName: string) => {
    if (notifiedProducts.includes(productId)) {
      toast.info(`You've already signed up for notifications for ${productName}`);
      return;
    }
    
    setNotifiedProducts([...notifiedProducts, productId]);
    toast.success(`You'll be notified when ${productName} is available!`);
  };
  
  const formatReleaseDate = (dateString?: string) => {
    if (!dateString) return 'Coming Soon';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <section className="py-16 bg-gradient-to-b from-background to-accent/20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-display font-medium mb-2">Coming Soon</h2>
            <p className="text-muted-foreground">Be the first to know when these exciting products launch</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <Card key={product.id} className="overflow-hidden h-full flex flex-col hover-card-lift">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="flex items-center text-white/90 mb-2">
                    <CalendarDays size={16} className="mr-2" />
                    <span className="text-sm">
                      {formatReleaseDate(product.releaseDate)}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-white">{product.name}</h3>
                </div>
              </div>
              
              <CardContent className="flex-grow flex flex-col justify-between pt-4">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-muted-foreground line-clamp-3">{product.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <Button 
                    variant="outline" 
                    asChild
                    className="w-full"
                  >
                    <Link to={`/product/${product.id}`}>
                      Details
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                  <Button 
                    onClick={() => handleNotify(product.id, product.name)}
                    className={`w-full ${notifiedProducts.includes(product.id) ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  >
                    <Bell size={16} className="mr-1" />
                    {notifiedProducts.includes(product.id) ? 'Notified' : 'Notify Me'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoonProducts;
