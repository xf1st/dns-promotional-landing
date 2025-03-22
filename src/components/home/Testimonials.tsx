
import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Александр Петров',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      text: 'Отличный магазин! Быстрая доставка, качественные товары и хорошие цены. Я регулярно делаю покупки здесь и всегда остаюсь доволен обслуживанием.',
      position: 'Программист',
      product: 'Ноутбук Asus ROG Strix',
    },
    {
      id: 2,
      name: 'Елена Смирнова',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4,
      text: 'Заказывала смартфон, привезли на следующий день. Качество товара на высоте, цена ниже, чем в других магазинах. Рекомендую!',
      position: 'Дизайнер',
      product: 'iPhone 14 Pro',
    },
    {
      id: 3,
      name: 'Дмитрий Иванов',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      rating: 5,
      text: 'Покупал комплектующие для ПК. Большой выбор, грамотные консультации и быстрая доставка. Однозначно лучший магазин электроники!',
      position: 'Инженер',
      product: 'Комплектующие для ПК',
    },
  ];

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="title-medium mb-4">Что говорят наши клиенты</h2>
          <p className="subtitle">
            Мы гордимся тем, что наши клиенты довольны нашими товарами и сервисом
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover" 
                />
                <div>
                  <h4 className="font-semibold text-dns-darkBlue">{testimonial.name}</h4>
                  <p className="text-sm text-dns-darkGray">{testimonial.position}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                  />
                ))}
              </div>
              
              <p className="text-dns-darkGray mb-4">"{testimonial.text}"</p>
              
              <div className="text-sm font-medium text-dns-blue">
                Покупка: {testimonial.product}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="dns-button-secondary inline-flex">
            Все отзывы
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
