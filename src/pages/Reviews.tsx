
import React, { useEffect } from 'react';
import { Star } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  position: string;
  product: string;
  date: string;
}

const Reviews = () => {
  // Set page title
  useEffect(() => {
    document.title = 'DNStoDNS - отзывы клиентов';
  }, []);

  const reviews: Review[] = [
    {
      id: 1,
      name: 'Александр Петров',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      text: 'Отличный магазин! Быстрая доставка, качественные товары и хорошие цены. Я регулярно делаю покупки здесь и всегда остаюсь доволен обслуживанием.',
      position: 'Программист',
      product: 'Ноутбук Asus ROG Strix',
      date: '15.05.2023'
    },
    {
      id: 2,
      name: 'Елена Смирнова',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4,
      text: 'Заказывала смартфон, привезли на следующий день. Качество товара на высоте, цена ниже, чем в других магазинах. Рекомендую!',
      position: 'Дизайнер',
      product: 'iPhone 14 Pro',
      date: '03.06.2023'
    },
    {
      id: 3,
      name: 'Дмитрий Иванов',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      rating: 5,
      text: 'Покупал комплектующие для ПК. Большой выбор, грамотные консультации и быстрая доставка. Однозначно лучший магазин электроники!',
      position: 'Инженер',
      product: 'Комплектующие для ПК',
      date: '22.07.2023'
    },
    {
      id: 4,
      name: 'Мария Козлова',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      rating: 5,
      text: 'Очень довольна покупкой холодильника. Менеджер помог выбрать модель под мои требования, доставка была в точно оговоренное время, установка заняла минимум времени.',
      position: 'Врач',
      product: 'Холодильник Samsung',
      date: '11.08.2023'
    },
    {
      id: 5,
      name: 'Игорь Соколов',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 4,
      text: 'Покупка прошла гладко, товар соответствует описанию. Единственное - была небольшая задержка с доставкой, но меня предупредили заранее.',
      position: 'Менеджер',
      product: 'Телевизор LG OLED',
      date: '29.09.2023'
    },
    {
      id: 6,
      name: 'Анна Морозова',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      rating: 5,
      text: 'Приобрела кофемашину. Спасибо консультанту за подробное объяснение всех функций. Доставили в целости и сохранности, работает отлично!',
      position: 'Преподаватель',
      product: 'Кофемашина De\'Longhi',
      date: '14.10.2023'
    },
    {
      id: 7,
      name: 'Сергей Новиков',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 3,
      text: 'В целом доволен покупкой, но было несколько моментов: долго ждал ответа от службы поддержки, и в комплекте не было обещанного аксессуара. После обращения вопрос решили.',
      position: 'Архитектор',
      product: 'Планшет iPad Pro',
      date: '05.11.2023'
    },
    {
      id: 8,
      name: 'Ольга Кузнецова',
      avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
      rating: 5,
      text: 'Второй раз заказываю в этом магазине и снова все идеально! Быстрая доставка, вежливый курьер, товар в отличном состоянии. Буду обращаться еще!',
      position: 'Бухгалтер',
      product: 'Фотоаппарат Canon',
      date: '23.12.2023'
    },
    {
      id: 9,
      name: 'Павел Федоров',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      rating: 4,
      text: 'Заказывал игровую консоль. Все пришло вовремя, в хорошей упаковке. Немного завышена цена по сравнению с другими магазинами, но сервис на высоте.',
      position: 'Маркетолог',
      product: 'PlayStation 5',
      date: '17.01.2024'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-dns-darkBlue mb-4">Отзывы наших клиентов</h1>
            <p className="text-dns-darkGray max-w-2xl mx-auto">
              Мы ценим мнение каждого клиента и постоянно работаем над улучшением качества обслуживания.
              Ознакомьтесь с отзывами тех, кто уже совершил покупки в нашем магазине.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-12 h-12 rounded-full mr-4 object-cover" 
                  />
                  <div>
                    <h4 className="font-semibold text-dns-darkBlue">{review.name}</h4>
                    <p className="text-sm text-dns-darkGray">{review.position}</p>
                  </div>
                </div>
                
                <div className="flex mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                    />
                  ))}
                </div>
                
                <p className="text-dns-darkGray mb-4">"{review.text}"</p>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="font-medium text-dns-blue">
                    {review.product}
                  </div>
                  <div className="text-dns-darkGray">
                    {review.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-dns-darkGray mb-6">
              Хотите оставить свой отзыв о покупке? Авторизуйтесь в личном кабинете и поделитесь своими впечатлениями.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reviews;
