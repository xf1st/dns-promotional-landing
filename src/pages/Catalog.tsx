
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Heart, ShoppingCart, Star, Filter, ChevronDown, Search, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

// Расширенный список товаров для каталога
const catalogProducts = [
  {
    id: 1,
    name: "MacBook Pro 16\"",
    category: "Ноутбуки",
    price: 189999,
    oldPrice: 219999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFwdG9wfHx8fHx8MTcwODc5MTYyMQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500",
    isNew: true,
    discount: 15,
    brand: "Apple",
    specs: ["Apple M2 Pro", "16 ГБ RAM", "512 ГБ SSD"]
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
    discount: 10,
    brand: "Samsung",
    specs: ["12 ГБ RAM", "256 ГБ", "200 Мп камера"]
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
    discount: 10,
    brand: "Sony",
    specs: ["ANC", "Bluetooth 5.2", "30 часов работы"]
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
    discount: 8,
    brand: "Apple",
    specs: ["M2 чип", "8 ГБ RAM", "Liquid Retina XDR"]
  },
  {
    id: 5,
    name: "Dell XPS 13",
    category: "Ноутбуки",
    price: 109999,
    oldPrice: 119999,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFwdG9wfHx8fHx8MTcwODc5MTYyMQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500",
    isNew: false,
    discount: 8,
    brand: "Dell",
    specs: ["Intel Core i7", "16 ГБ RAM", "512 ГБ SSD"]
  },
  {
    id: 6,
    name: "iPhone 15 Pro",
    category: "Смартфоны",
    price: 119999,
    oldPrice: 129999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484bce71?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8aXBob25lfHx8fHx8MTcwODc5MjI3Nw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500",
    isNew: true,
    discount: 8,
    brand: "Apple",
    specs: ["A17 Pro", "8 ГБ RAM", "256 ГБ"]
  },
  {
    id: 7,
    name: "Logitech MX Master 3S",
    category: "Периферия",
    price: 9999,
    oldPrice: 12999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1629429407756-28d4a4982159?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bW91c2V8fHx8fHwxNzA4NzkyMzUw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500",
    isNew: false,
    discount: 23,
    brand: "Logitech",
    specs: ["8000 DPI", "Bluetooth", "USB-C"]
  },
  {
    id: 8,
    name: "Samsung Odyssey G9",
    category: "Мониторы",
    price: 119999,
    oldPrice: 149999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1616711906333-23cf8b122d24?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bW9uaXRvcnx8fHx8fDE3MDg3OTI0MTM&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500",
    isNew: false,
    discount: 20,
    brand: "Samsung",
    specs: ["49\" QLED", "5120x1440", "240 Гц"]
  }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
};

const categories = ["Все", "Ноутбуки", "Смартфоны", "Наушники", "Планшеты", "Периферия", "Мониторы"];
const brands = ["Все", "Apple", "Samsung", "Sony", "Dell", "Logitech"];

const Catalog = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [activeBrand, setActiveBrand] = useState("Все");
  const [filterOpen, setFilterOpen] = useState(false);
  const { addItem, items: cartItems } = useCart();

  const toggleFavorite = (id: number) => {
    setFavoriteProducts(prev => 
      prev.includes(id) ? prev.filter(productId => productId !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  // Проверяем, находится ли товар в корзине
  const isInCart = (id: number) => {
    return cartItems.some(item => item.id === id);
  };

  // Фильтрация товаров
  const filteredProducts = catalogProducts.filter(product => {
    const categoryMatch = activeCategory === "Все" || product.category === activeCategory;
    const brandMatch = activeBrand === "Все" || product.brand === activeBrand;
    return categoryMatch && brandMatch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Каталог товаров</h1>
          
          {/* Фильтры для мобильных устройств */}
          <div className="md:hidden mb-6">
            <Button
              variant="outline"
              className="w-full flex justify-between items-center"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>Фильтры</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
            </Button>
            
            {filterOpen && (
              <div className="mt-4 p-4 border rounded-lg shadow-sm bg-card">
                {/* Категории */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Категории</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        className={`px-3 py-1 text-sm rounded-full ${
                          activeCategory === category 
                            ? 'bg-dns-blue text-white' 
                            : 'bg-secondary text-foreground hover:bg-secondary/80'
                        }`}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Бренды */}
                <div>
                  <h3 className="font-medium mb-3">Бренды</h3>
                  <div className="flex flex-wrap gap-2">
                    {brands.map(brand => (
                      <button
                        key={brand}
                        className={`px-3 py-1 text-sm rounded-full ${
                          activeBrand === brand 
                            ? 'bg-dns-blue text-white' 
                            : 'bg-secondary text-foreground hover:bg-secondary/80'
                        }`}
                        onClick={() => setActiveBrand(brand)}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Боковая панель с фильтрами для десктопа */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-28 space-y-6">
                {/* Поиск */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input 
                    type="text" 
                    placeholder="Поиск товаров..." 
                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background"
                  />
                </div>
                
                {/* Категории */}
                <div>
                  <h3 className="font-medium mb-3">Категории</h3>
                  <ul className="space-y-2">
                    {categories.map(category => (
                      <li key={category}>
                        <button
                          className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            activeCategory === category 
                              ? 'bg-dns-blue/10 text-dns-blue font-medium' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => setActiveCategory(category)}
                        >
                          {activeCategory === category && <CheckCircle2 className="mr-2 h-4 w-4" />}
                          <span className={activeCategory === category ? 'ml-0' : 'ml-6'}>
                            {category}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Бренды */}
                <div>
                  <h3 className="font-medium mb-3">Бренды</h3>
                  <ul className="space-y-2">
                    {brands.map(brand => (
                      <li key={brand}>
                        <button
                          className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            activeBrand === brand 
                              ? 'bg-dns-blue/10 text-dns-blue font-medium' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => setActiveBrand(brand)}
                        >
                          {activeBrand === brand && <CheckCircle2 className="mr-2 h-4 w-4" />}
                          <span className={activeBrand === brand ? 'ml-0' : 'ml-6'}>
                            {brand}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Цена */}
                <div>
                  <h3 className="font-medium mb-3">Цена</h3>
                  <div className="flex space-x-4">
                    <input 
                      type="number" 
                      placeholder="От" 
                      className="w-full p-2 border rounded-lg bg-background"
                    />
                    <input 
                      type="number" 
                      placeholder="До" 
                      className="w-full p-2 border rounded-lg bg-background"
                    />
                  </div>
                </div>
                
                <Button className="w-full bg-dns-blue hover:bg-dns-blue/90">
                  Применить фильтры
                </Button>
                
                <Button variant="outline" className="w-full">
                  Сбросить все
                </Button>
              </div>
            </aside>
            
            {/* Каталог товаров */}
            <div className="flex-grow">
              {/* Результаты поиска */}
              <div className="mb-6 flex justify-between items-center">
                <p className="text-muted-foreground">
                  Найдено {filteredProducts.length} товаров
                </p>
                <select className="border rounded-md px-3 py-1.5 bg-background">
                  <option>По популярности</option>
                  <option>По цене (низкая &gt; высокая)</option>
                  <option>По цене (высокая &gt; низкая)</option>
                  <option>По рейтингу</option>
                </select>
              </div>
              
              {/* Сетка товаров */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="product-card relative overflow-hidden transition-all duration-300 bg-card rounded-xl p-4 border hover:shadow-md"
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
                        className="w-full h-48 object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
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
                    
                    <div className="mb-1">
                      <span className="text-sm text-muted-foreground">{product.category}</span>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-2">
                        <Star size={16} className="text-dns-yellow fill-dns-yellow" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">142 отзыва</span>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-3">
                      <ul className="space-y-1">
                        {product.specs.map((spec, index) => (
                          <li key={index} className="line-clamp-1">• {spec}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <div>
                        <div className="flex items-center">
                          <span className="text-xl font-bold text-foreground mr-2">{formatPrice(product.price)}</span>
                          {product.oldPrice && (
                            <span className="text-sm text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
                          )}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          isInCart(product.id)
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
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground">Товары не найдены</p>
                  <p className="text-muted-foreground mt-2">Попробуйте изменить параметры фильтрации</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setActiveCategory("Все");
                      setActiveBrand("Все");
                    }}
                  >
                    Сбросить фильтры
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Catalog;
