
import { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import type { CartItem as CartItemType } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
};

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      onClose();
      return;
    }
    
    setProcessing(true);
    // Имитация процесса оформления заказа
    setTimeout(() => {
      clearCart();
      setProcessing(false);
      onClose();
    }, 2000);
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 bottom-0 h-full w-full max-w-md bg-background shadow-xl transition-transform duration-300 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center">
            <ShoppingBag className="mr-2" /> 
            Корзина <span className="ml-2 text-sm text-muted-foreground">({totalItems})</span>
          </h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 hover:bg-muted transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Ваша корзина пуста</h3>
            <p className="text-muted-foreground mb-8">
              Добавьте товары в корзину, чтобы продолжить покупки
            </p>
            <Button onClick={onClose} className="mx-auto">
              Вернуться к покупкам
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-6">
              {items.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  onRemove={removeItem} 
                  onUpdateQuantity={updateQuantity} 
                />
              ))}
            </div>
            
            <div className="border-t pt-4 mt-auto">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Товары ({totalItems})</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Доставка</span>
                <span>{formatPrice(300)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Итого</span>
                <span>{formatPrice(totalPrice + 300)}</span>
              </div>
              
              <div className="space-y-3">
                <Button 
                  className="w-full justify-between bg-dns-blue text-white hover:bg-dns-blue/90" 
                  onClick={handleCheckout}
                  disabled={processing}
                >
                  {processing ? 'Обработка...' : user ? 'Оформить заказ' : 'Войти и оформить заказ'}
                  <ArrowRight />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearCart}
                >
                  Очистить корзину
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Компонент для отображения отдельного товара в корзине
function CartItem({ 
  item, 
  onRemove, 
  onUpdateQuantity 
}: { 
  item: CartItemType; 
  onRemove: (id: number) => void; 
  onUpdateQuantity: (id: number, quantity: number) => void;
}) {
  return (
    <div className="flex gap-4">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <img 
          src={item.image} 
          alt={item.name} 
          className="h-full w-full object-cover" 
        />
      </div>
      
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium mb-1">
          <h3>{item.name}</h3>
          <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="p-1 px-2 hover:bg-muted disabled:opacity-50"
            >
              <Minus size={16} />
            </button>
            <span className="px-2 text-center min-w-8">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-1 px-2 hover:bg-muted"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-700 p-1"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
