
import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Sliders, ChevronDown, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Смартфон Samsung Galaxy S23',
      description: 'Флагманский смартфон с AMOLED-дисплеем 6.1", процессором Snapdragon 8 Gen 2, 8 ГБ RAM, 128 ГБ памяти и тройной камерой',
      price: 74990,
      image: 'https://cdn1.ozone.ru/s3/multimedia-0/6563632776.jpg',
      category: 'Смартфоны',
      rating: 4.8,
      inStock: true
    },
    {
      id: 2,
      name: 'Ноутбук ASUS ROG Strix G15',
      description: 'Игровой ноутбук с 15.6" IPS-дисплеем, процессором AMD Ryzen 7, 16 ГБ RAM, SSD 512 ГБ и видеокартой NVIDIA GeForce RTX 3060',
      price: 129990,
      image: 'https://cdn1.technopark.ru/technopark/photos_resized/product/1000_1000/664542/2_664542.jpg',
      category: 'Ноутбуки',
      rating: 4.7,
      inStock: true
    },
    {
      id: 3,
      name: 'Телевизор LG OLED C2',
      description: '55" OLED-телевизор с разрешением 4K, поддержкой HDR, WebOS и технологией OLED evo для повышенной яркости',
      price: 119990,
      image: 'https://www.ixbt.com/img/n1/news/2022/1/1/2022-LG-OLED-evo-C2-42inch-scaled-1-scaled_large.png',
      category: 'Телевизоры',
      rating: 4.9,
      discount: 10,
      inStock: true
    },
    {
      id: 4,
      name: 'Планшет Apple iPad Air',
      description: '10.9" планшет с процессором Apple M1, 8 ГБ RAM, 256 ГБ памяти, поддержкой Apple Pencil и Magic Keyboard',
      price: 62990,
      image: 'https://cdn1.ozone.ru/s3/multimedia-v/6460908175.jpg',
      category: 'Планшеты',
      rating: 4.8,
      inStock: true
    },
    {
      id: 5,
      name: 'Наушники Sony WH-1000XM5',
      description: 'Беспроводные накладные наушники с активным шумоподавлением, временем работы до 30 часов и улучшенным качеством звонков',
      price: 32990,
      image: 'https://krd.store123.ru/upload/iblock/cbc/s6zo9fg8mn1ivd92q1fsdg415fwf1qgm.jpeg',
      category: 'Наушники',
      rating: 4.8,
      inStock: true
    },
    {
      id: 6,
      name: 'Умные часы Apple Watch Series 8',
      description: 'Смарт-часы с Always-On Retina дисплеем, датчиком ЭКГ, измерением кислорода в крови и функцией определения падений',
      price: 39990,
      image: 'https://yandex-images.clstorage.net/5zYXI4118/7d29659Xa/emJLFeoAkuQWrrlG2K2KpoEZfWsDfIq7WS8jHq6KAQtY7CsHCgsQcY1RHJYKT0IOXNpXJRiEEm114bg-4C60729rRnmWZfP5Q7_tAoTVqr-dRCVTc0iCJp2Ts8duKt3-8HzTRwIODWwkzU0X_5Jim1lDqtBtEUrcSDwA5qyLKZZyapr06xC26LJ6MepFGdbmLHEhwx-wvoLR_5NXCt41DiAEty_DauFQEIQdv4_Ssi-BJxJUSeWS2DxUFH7os01Svj6OnGsorgQGmiW2WVmCklyNDdc3hAbqscOXB55yLVb4sEdn0_qlYGAg1c9n1rozIZ_22N1VJqhcPBDGlPPVvmbKkuCzCELsclo5KtVZbvZESR3zcwz-wsULO2sGuo1GXNRHGx_SUZxk0CXjmz4GK8XTMnD9yXq0cDRk4sinZc6edt44bww-eFbeCSKNVQrW9DG1v_NYkhJVX1OPxlqFCkR4ew8nConk9GBpJ2922rMxw3bUgYUSbFhQkJa8LxFSGrbG7EP0Wlymxo3Oqf1ivnwFJc8TKL7OWa_vD_o-RT48uNc_UyLVoMQUwTNTehpTIcuCvLnNMgAwIGxCoHf5Ov7mgvRr8M60xmadBk311iJs-cVPL9wqvq1HY-_WOpl6QGhHMxM-jViI1BW3C0aCm02nRiTFJV60xFDovihfea528q7c-2gaYE5GmUZ9maIGHOkRw2f00kbVfyertoI9xigYe_-TjmGMbLwVU-OWuleRO6LowRUmCPCAUJpw-zneGjJWuG8E2pA2Vv1O_UVWMsj51U_TzLIW5QsnD3JWgebUsI_7F5oZGAScbdfz-p6nXbf2MB1ZTiTEqMw6EN9xBhp6onTP5PJ4Vp6dFgmpiibYAb1jjySidrUr1-c6CtEKzIir86f2bZCMcA0nA0pKK1G7kvzxldqs-EzEnrhnvV4i5mKgYyhOfLKWqYY99XrS5L3VX9N8-r45J_cvirKM',
      category: 'Умные часы',
      rating: 4.7,
      discount: 15,
      inStock: false
    },
    {
      id: 7,
      name: 'Фотоаппарат Canon EOS R6',
      description: 'Полнокадровая беззеркальная камера с 20.1 МП сенсором, стабилизацией изображения на 8 ступеней и 4K видео',
      price: 199990,
      image: 'https://avatars.mds.yandex.net/get-mpic/4342845/img_id1720051664548390269.jpeg/orig',
      category: 'Фотоаппараты',
      rating: 4.9,
      inStock: true
    },
    {
      id: 8,
      name: 'Игровая консоль PlayStation 5',
      description: 'Консоль нового поколения с SSD накопителем, поддержкой 4K и 8K графики, трассировкой лучей и 3D-аудио',
      price: 49990,
      image: 'https://img.mvideo.ru/Big/40078233bb.jpg',
      category: 'Игровые консоли',
      rating: 4.8,
      inStock: false
    },
    {
      id: 9,
      name: 'Монитор LG UltraGear 27GP850',
      description: '27" IPS-монитор с разрешением 2560x1440, частотой 165 Гц, временем отклика 1 мс и поддержкой HDR10',
      price: 42990,
      image: 'https://cdn1.ozone.ru/s3/multimedia-1-u/7083204078.jpg',
      category: 'Мониторы',
      rating: 4.7,
      discount: 5,
      inStock: true
    },
  ]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('default');
  const [priceRange, setPriceRange] = useState<{min: number, max: number}>({min: 0, max: 200000});
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(products.map(product => product.category)))];

  // Set page title
  useEffect(() => {
    document.title = 'DNStoDNS - каталог';
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Filter by availability
    if (showOnlyInStock) {
      result = result.filter(product => product.inStock);
    }
    
    // Sort products
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'alphabetical':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Default sorting (by id)
        result.sort((a, b) => a.id - b.id);
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, sortOption, priceRange, showOnlyInStock]);

  // Format price with spaces
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Calculate final price with discount
  const calculateFinalPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return price - (price * (discount / 100));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Каталог товаров</h1>
          <div className="flex items-center space-x-2">
            <button 
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-dns-blue text-white' : 'bg-gray-100'}`}
              onClick={() => setViewMode('grid')}
              aria-label="Сетка"
            >
              <Grid3X3 size={18} />
            </button>
            <button 
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-dns-blue text-white' : 'bg-gray-100'}`}
              onClick={() => setViewMode('list')}
              aria-label="Список"
            >
              <List size={18} />
            </button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar - desktop */}
          <div className="hidden lg:block w-64 bg-white rounded-lg shadow p-4 h-fit">
            <h2 className="font-bold text-lg mb-4">Фильтры</h2>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Категория</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'Все категории' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Цена</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="от"
                  className="w-full p-2 border rounded-md text-sm"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                />
                <input
                  type="number"
                  placeholder="до"
                  className="w-full p-2 border rounded-md text-sm"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4"
                  checked={showOnlyInStock}
                  onChange={(e) => setShowOnlyInStock(e.target.checked)}
                />
                Только в наличии
              </label>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Сортировка</label>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">По умолчанию</SelectItem>
                  <SelectItem value="price-asc">Сначала дешевые</SelectItem>
                  <SelectItem value="price-desc">Сначала дорогие</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                  <SelectItem value="alphabetical">По алфавиту</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {/* Search & Mobile filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  className="w-full px-4 py-2 pr-10 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <Select 
                value={sortOption} 
                onValueChange={setSortOption}
                className="sm:w-48 lg:hidden"
              >
                <SelectTrigger>
                  <SlidersHorizontal size={16} className="mr-2" />
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">По умолчанию</SelectItem>
                  <SelectItem value="price-asc">Сначала дешевые</SelectItem>
                  <SelectItem value="price-desc">Сначала дорогие</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                  <SelectItem value="alphabetical">По алфавиту</SelectItem>
                </SelectContent>
              </Select>
              
              <button 
                className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 bg-white border rounded-lg"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={16} />
                Фильтры
              </button>
            </div>
            
            {/* Mobile filters */}
            <Collapsible open={isFilterOpen} className="lg:hidden mb-6">
              <CollapsibleContent>
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                  <h2 className="font-bold text-lg mb-4">Фильтры</h2>
                  
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Категория</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category === 'all' ? 'Все категории' : category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Цена</label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="от"
                        className="w-full p-2 border rounded-md text-sm"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                      />
                      <input
                        type="number"
                        placeholder="до"
                        className="w-full p-2 border rounded-md text-sm"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4"
                        checked={showOnlyInStock}
                        onChange={(e) => setShowOnlyInStock(e.target.checked)}
                      />
                      Только в наличии
                    </label>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            {/* Results summary */}
            <div className="mb-4 text-sm text-gray-500">
              Найдено товаров: {filteredProducts.length}
            </div>
            
            {/* Products grid/list */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium mb-2">Товары не найдены</h3>
                <p className="text-gray-500">Попробуйте изменить параметры поиска или фильтры</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border"
                  >
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-contain p-4" 
                      />
                      {product.discount && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{product.discount}%
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute top-2 left-2 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Под заказ
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center mb-1">
                        <span className="text-yellow-400 text-sm mr-1">★</span>
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 h-12">{product.name}</h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{product.description}</p>
                      
                      {product.discount ? (
                        <div className="mb-2">
                          <span className="text-gray-400 text-sm line-through mr-2">
                            {formatPrice(product.price)} ₽
                          </span>
                          <span className="text-red-500 font-bold">
                            {formatPrice(Math.round(calculateFinalPrice(product.price, product.discount)))} ₽
                          </span>
                        </div>
                      ) : (
                        <div className="font-bold text-blue-600 mb-2">
                          {formatPrice(product.price)} ₽
                        </div>
                      )}
                      
                      <button 
                        className="w-full bg-dns-blue hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
                        disabled={!product.inStock}
                      >
                        <ShoppingCart size={16} />
                        В корзину
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border p-4 flex flex-col md:flex-row gap-4"
                  >
                    <div className="relative w-full md:w-1/4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-contain" 
                      />
                      {product.discount && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{product.discount}%
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute top-2 left-2 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Под заказ
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="text-yellow-400 text-sm mr-1">★</span>
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                    </div>
                    <div className="w-full md:w-1/5 flex flex-col justify-between">
                      {product.discount ? (
                        <div className="mb-2">
                          <span className="text-gray-400 text-sm line-through block">
                            {formatPrice(product.price)} ₽
                          </span>
                          <span className="text-red-500 font-bold text-xl">
                            {formatPrice(Math.round(calculateFinalPrice(product.price, product.discount)))} ₽
                          </span>
                        </div>
                      ) : (
                        <div className="font-bold text-blue-600 text-xl mb-2">
                          {formatPrice(product.price)} ₽
                        </div>
                      )}
                      
                      <button 
                        className="w-full bg-dns-blue hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
                        disabled={!product.inStock}
                      >
                        <ShoppingCart size={16} />
                        В корзину
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Catalog;
