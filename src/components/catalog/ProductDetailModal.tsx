
import React from 'react';
import { X, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  discount?: number;
  inStock: boolean;
}

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
  formatPrice: (price: number) => string;
  calculateFinalPrice: (price: number, discount?: number) => number;
}

const ProductDetailModal = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
  isInCart,
  formatPrice,
  calculateFinalPrice
}: ProductDetailModalProps) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  const specificationsData = [
    { name: "Категория", value: product.category },
    { name: "Рейтинг", value: product.rating },
    { name: "Наличие", value: product.inStock ? "В наличии" : "Под заказ" },
    { name: "Артикул", value: `SKU-${product.id}${product.category.slice(0, 3).toUpperCase()}` },
    { name: "Гарантия", value: "12 месяцев" },
  ];

  const finalPrice = product.discount 
    ? Math.round(calculateFinalPrice(product.price, product.discount))
    : product.price;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
          <button 
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
            onClick={onClose}
          >
            <X size={24} />
          </button>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="product-image relative">
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center h-80">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain" 
                />
              </div>
              
              {product.discount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  Скидка {product.discount}%
                </div>
              )}
            </div>
            
            <div className="product-info flex flex-col">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                    {product.category}
                  </span>
                  {product.inStock ? (
                    <span className="px-3 py-1 bg-green-100 rounded-full text-xs font-medium text-green-600">
                      В наличии
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                      Под заказ
                    </span>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-yellow-400 mr-2">
                    <Star size={18} fill="currentColor" />
                    <span className="ml-1 font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">142 отзыва</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Описание</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Характеристики</h3>
                <div className="space-y-2">
                  {specificationsData.map((spec, index) => (
                    <div key={index} className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">{spec.name}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex items-center mb-4">
                  {product.discount ? (
                    <>
                      <span className="text-2xl font-bold text-gray-900 mr-3">
                        {formatPrice(finalPrice)} ₽
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.price)} ₽
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(product.price)} ₽
                    </span>
                  )}
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    className="flex-1 justify-center gap-2"
                    size="lg"
                    disabled={!product.inStock || !user}
                    variant={isInCart ? "secondary" : "default"}
                    onClick={() => onAddToCart(product)}
                  >
                    <ShoppingCart size={16} />
                    {isInCart ? 'В корзине' : 'Добавить в корзину'}
                  </Button>
                </div>
                
                {!user && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Для добавления товара в корзину необходимо авторизоваться
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
