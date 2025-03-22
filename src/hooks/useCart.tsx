
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { toast } from "sonner";
import { useAuth } from '@/hooks/useAuth';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast: uiToast } = useToast();
  const { user } = useAuth();
  
  // Загрузка корзины из localStorage при инициализации
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (e) {
          console.error('Ошибка при загрузке корзины из localStorage:', e);
        }
      }
    } else {
      // Очищаем корзину, если пользователь не авторизован
      setItems([]);
    }
  }, [user]);
  
  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    if (user) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, user]);
  
  const addItem = (product: Omit<CartItem, 'quantity'>) => {
    // Проверяем, авторизован ли пользователь
    if (!user) {
      toast.error('Необходима авторизация', {
        description: 'Для добавления товара в корзину необходимо войти в аккаунт',
      });
      return;
    }

    setItems(prevItems => {
      // Проверяем, есть ли товар уже в корзине
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Если товар уже в корзине, увеличиваем количество
        toast.success(`${product.name} добавлен в корзину`, {
          description: 'Количество увеличено',
        });
        
        return prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Если товара нет в корзине, добавляем с количеством 1
        toast.success(`${product.name} добавлен в корзину`, {
          description: 'Товар добавлен в корзину',
        });
        
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };
  
  const removeItem = (id: number) => {
    if (!user) return;
    
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      
      if (itemToRemove) {
        toast.info(`${itemToRemove.name} удален из корзины`);
      }
      
      return prevItems.filter(item => item.id !== id);
    });
  };
  
  const updateQuantity = (id: number, quantity: number) => {
    if (!user || quantity < 1) return;
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    if (!user) return;
    
    setItems([]);
    uiToast({
      title: "Корзина очищена",
      description: "Все товары удалены из корзины",
    });
  };
  
  // Рассчитываем общее количество товаров
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  // Рассчитываем общую стоимость
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart, 
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart должен использоваться внутри CartProvider');
  }
  return context;
};
