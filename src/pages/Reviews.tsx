import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AddReview from '@/components/reviews/AddReview';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Review {
  id: number | string;
  name?: string;
  avatar?: string;
  rating: number;
  text: string;
  position?: string;
  product?: string;
  date?: string;
  username?: string | null;
  content?: string;
  created_at?: string;
}

const Reviews = () => {
  const { user } = useAuth();
  const [dbReviews, setDbReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = 'DNStoDNS - отзывы клиентов';
  }, []);

  // Загрузка отзывов из Supabase
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setDbReviews(data.map(r => ({
          id: r.id,
          username: r.username,
          rating: r.rating,
          text: r.content,
          created_at: r.created_at,
        })));
      }
      setLoading(false);
    };
    fetchReviews();
  }, []);

  const staticReviews: Review[] = [
    {
      id: 1,
      name: 'Александр Петров',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      text: 'Отличный магазин! Быстрая доставка, качественные товары и хорошие цены. Я регулярно делаю покупки здесь и всегда остаюсь доволен обслуживанием.',
      position: 'Программист',
      product: 'Ноутбук Asus ROG Strix',
      date: '15.01.2024'
    },
    {
      id: 2,
      name: 'Елена Смирнова',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4,
      text: 'Заказывала смартфон, привезли на следующий день. Качество товара на высоте, цена ниже, чем в других магазинах. Рекомендую!',
      position: 'Дизайнер',
      product: 'iPhone 14 Pro',
      date: '03.06.2024'
    },
    {
      id: 3,
      name: 'Дмитрий Иванов',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      rating: 5,
      text: 'Покупал комплектующие для ПК. Большой выбор, грамотные консультации и быстрая доставка. Однозначно лучший магазин электроники!',
      position: 'Инженер',
      product: 'Комплектующие для ПК',
      date: '22.07.2024'
    },
    {
      id: 4,
      name: 'Мария Козлова',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      rating: 5,
      text: 'Очень довольна покупкой холодильника. Менеджер помог выбрать модель под мои требования, доставка была в точно оговоренное время, установка заняла минимум времени.',
      position: 'Врач',
      product: 'Холодильник Samsung',
      date: '11.08.2024'
    },
    {
      id: 5,
      name: 'Игорь Соколов',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 4,
      text: 'Покупка прошла гладко, товар соответствует описанию. Единственное - была небольшая задержка с доставкой, но меня предупредили заранее.',
      position: 'Менеджер',
      product: 'Телевизор LG OLED',
      date: '29.09.2024'
    },
    {
      id: 6,
      name: 'Анна Морозова',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      rating: 5,
      text: 'Приобрела кофемашину. Спасибо консультанту за подробное объяснение всех функций. Доставили в целости и сохранности, работает отлично!',
      position: 'Преподаватель',
      product: 'Кофемашина De\'Longhi',
      date: '14.10.2024'
    },
    {
      id: 7,
      name: 'Сергей Новиков',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 3,
      text: 'В целом доволен покупкой, но было несколько моментов: долго ждал ответа от службы поддержки, и в комплекте не было обещанного аксессуара. После обращения вопрос решили.',
      position: 'Архитектор',
      product: 'Планшет iPad Pro',
      date: '05.11.2024'
    },
    {
      id: 8,
      name: 'Ольга Кузнецова',
      avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
      rating: 5,
      text: 'Второй раз заказываю в этом магазине и снова все идеально! Быстрая доставка, вежливый курьер, товар в отличном состоянии. Буду обращаться еще!',
      position: 'Бухгалтер',
      product: 'Фотоаппарат Canon',
      date: '23.12.2024'
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

  // Объединяем отзывы из БД и статичные
  const allReviews = [...dbReviews, ...staticReviews];

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

          <div className="mb-8 text-center">
            {user && (
              <button
                className="dns-button-primary mb-4"
                onClick={() => setShowForm(f => !f)}
              >
                {showForm ? 'Скрыть форму' : 'Оставить отзыв'}
              </button>
            )}
            {showForm && user && (
              <div className="max-w-xl mx-auto mb-8">
                <AddReview onReviewAdded={() => window.location.reload()} />
              </div>
            )}
          </div>

          {loading && <div className="text-center text-dns-darkGray mb-8">Загрузка отзывов...</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full mr-4 bg-dns-gray flex items-center justify-center text-dns-darkBlue font-bold text-lg">
                      {review.username ? review.username[0].toUpperCase() : '?'}
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-dns-darkBlue">{review.name || review.username || 'Пользователь'}</h4>
                    {review.position && <p className="text-sm text-dns-darkGray">{review.position}</p>}
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
                  {review.product && <div className="font-medium text-dns-blue">{review.product}</div>}
                  <div className="text-dns-darkGray">
                    {review.date || (review.created_at && new Date(review.created_at).toLocaleDateString())}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;
