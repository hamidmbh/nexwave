
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/context/CartContext';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const increaseQuantity = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };
  
  return (
    <div className="flex border-b border-border py-6 last:border-0">
      {/* Product Image */}
      <Link to={`/product/${item.id}`} className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </Link>
      
      {/* Product Details */}
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium">
          <Link to={`/product/${item.id}`}>
            <h3 className="hover:text-primary transition-colors">{item.name}</h3>
          </Link>
          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        
        <div className="flex items-end justify-between text-sm mt-auto">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={decreaseQuantity}
              disabled={item.quantity <= 1}
              className="p-1 rounded-md border border-border hover:bg-accent transition-colors disabled:opacity-50"
            >
              <Minus size={16} />
            </button>
            
            <span className="w-8 text-center">{item.quantity}</span>
            
            <button
              onClick={increaseQuantity}
              className="p-1 rounded-md border border-border hover:bg-accent transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          
          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 size={18} className="mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
