import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Смартфон Example 1',
      description: 'Описание смартфона Example 1',
      price: 25000,
      image: 'https://via.placeholder.com/150',
      category: 'Смартфоны'
    },
    {
      id: 2,
      name: 'Ноутбук Example 2',
      description: 'Описание ноутбука Example 2',
      price: 50000,
      image: 'https://via.placeholder.com/150',
      category: 'Ноутбуки'
    },
    {
      id: 3,
      name: 'Телевизор Example 3',
      description: 'Описание телевизора Example 3',
      price: 30000,
      image: 'https://via.placeholder.com/150',
      category: 'Телевизоры'
    },
  ]);

  // Set page title
  useEffect(() => {
    document.title = 'DNStoDNS - каталог';
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Каталог товаров</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="border rounded-md p-4">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-blue-500">{product.price} руб.</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Catalog;
