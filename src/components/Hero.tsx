
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-60 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 py-16 md:py-24">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block mb-4 px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              New Arrivals 2023
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-tight mb-6">
              Discover the Future of <span className="text-primary">Technology</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8">
              Experience the latest innovations in electronics. Premium devices designed for the modern lifestyle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="gap-2">
                <Link to="/products">
                  Shop Now
                  <ArrowRight size={18} />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/products?category=new">
                  New Releases
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background rounded-3xl filter blur-2xl opacity-70 transform -rotate-6 scale-95"></div>
            <img 
              src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=2662&auto=format&fit=crop" 
              alt="Latest smartphone" 
              className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto object-cover animate-scale-in"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
