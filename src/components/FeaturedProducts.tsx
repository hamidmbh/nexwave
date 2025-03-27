
import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { Product } from '@/lib/data';

interface FeaturedProductsProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

const FeaturedProducts = ({ title, products, viewAllLink }: FeaturedProductsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-display font-medium">{title}</h2>
          
          <div className="flex items-center gap-4">
            {/* Scroll Controls */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="p-2 rounded-full border border-border hover:bg-accent transition-colors"
                aria-label="Scroll left"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={scrollRight}
                className="p-2 rounded-full border border-border hover:bg-accent transition-colors"
                aria-label="Scroll right"
              >
                <ArrowRight size={20} />
              </button>
            </div>
            
            {/* View All Button */}
            {viewAllLink && (
              <Button variant="outline" asChild>
                <a href={viewAllLink}>View All</a>
              </Button>
            )}
          </div>
        </div>
        
        {/* Products Horizontal Scroll */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-4 -mx-4 px-4 no-scrollbar snap-x scroll-px-4"
        >
          {products.map(product => (
            <div 
              key={product.id} 
              className="w-[280px] flex-shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
