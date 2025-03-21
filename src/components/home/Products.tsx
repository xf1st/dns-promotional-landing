
import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "MacBook Pro 16\"",
    category: "Ноутбуки",
    price: 189999,
    oldPrice: 219999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFwdG9wfHx8fHx8MTcwODc5MTYyMQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500",
    isNew: true,
    discount: 15
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    category: "Смартфоны",
    price: 99999,
    oldPrice: 109999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8c21hcnRwaG9uZXx8fHx8fDE3MDg3OTE3MTY&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500",
    isNew: true,
    discount: 10
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    category: "Наушники",
    price: 39999,
    oldPrice: 44999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8aGVhZHBob25lc3x8fHx8fDE3MDg3OTE3Njc&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500",
    isNew: false,
    discount: 10
  },
  {
    id: 4,
    name: "iPad Pro 12.9\"",
    category: "Планшеты",
    price: 129999,
    oldPrice: 139999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8aXBhZHx8fHx8fDE3MDg3OTE4MjY&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500",
    isNew: false,
    discount: 8
  }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
};

const Products = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>([]);
  const [cartProducts, setCartProducts] = useState<number[]>([]);
  const productsRef = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFavorite = (id: number) => {
    setFavoriteProducts(prev => 
      prev.includes(id) ? prev.filter(productId => productId !== id) : [...prev, id]
    );
  };

  const addToCart = (id: number) => {
    if (!cartProducts.includes(id)) {
      setCartProducts(prev => [...prev, id]);
      
      // Show a toast or some notification here
      console.log(`Product ${id} added to cart`);
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    productsRef.current.forEach(product => {
      if (product) {
        product.classList.add('opacity-0', 'translate-y-10');
        observer.observe(product);
      }
    });

    return () => {
      productsRef.current.forEach(product => {
        if (product) observer.unobserve(product);
      });
    };
  }, []);

  return (
    <section id="products" className="section-padding bg-dns-gray/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-dns-yellow/20 rounded-lg text-dns-darkBlue font-medium text-sm mb-4">
            Хиты продаж
          </div>
          <h2 className="title-medium mb-6">
            Популярные товары этого месяца
          </h2>
          <p className="subtitle">
            Самые востребованные модели с высоким рейтингом и отличными отзывами от наших покупателей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={el => productsRef.current[index] = el}
              className="product-card relative overflow-hidden transition-all duration-300"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {product.isNew && (
                <div className="absolute top-4 left-4 z-10 bg-dns-blue text-white text-xs font-bold px-2 py-1 rounded">
                  NEW
                </div>
              )}
              
              {product.discount > 0 && (
                <div className="absolute top-4 right-4 z-10 bg-dns-yellow text-dns-darkBlue text-xs font-bold px-2 py-1 rounded">
                  -{product.discount}%
                </div>
              )}
              
              <div className="relative mb-5 overflow-hidden rounded-lg group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                />
                <button 
                  onClick={() => toggleFavorite(product.id)}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    favoriteProducts.includes(product.id) 
                      ? 'bg-dns-blue text-white' 
                      : 'bg-white/80 text-dns-darkGray hover:text-dns-blue'
                  }`}
                >
                  <Heart size={18} fill={favoriteProducts.includes(product.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              <div className="mb-2">
                <span className="text-sm text-dns-darkGray">{product.category}</span>
              </div>
              
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center mr-2">
                  <Star size={16} className="text-dns-yellow fill-dns-yellow" />
                  <span className="ml-1 text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-dns-darkGray">142 отзыва</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-dns-darkBlue mr-2">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                      <span className="text-sm text-dns-darkGray line-through">{formatPrice(product.oldPrice)}</span>
                    )}
                  </div>
                </div>
                
                <button 
                  onClick={() => addToCart(product.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    cartProducts.includes(product.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-dns-blue text-white hover:bg-dns-blue/80'
                  }`}
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="dns-button-primary inline-flex items-center">
            <span>Смотреть все товары</span>
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
