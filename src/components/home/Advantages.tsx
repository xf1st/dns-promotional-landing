
import React from 'react';
import { Truck, ShieldCheck, Award, Clock, CreditCard, Package } from 'lucide-react';

const Advantages = () => {
  const advantages = [
    {
      id: 1,
      icon: <Truck className="h-10 w-10 text-dns-blue" />,
      title: 'Быстрая доставка',
      description: 'Доставка по всей России. В крупных городах возможна доставка в день заказа.'
    },
    {
      id: 2,
      icon: <ShieldCheck className="h-10 w-10 text-dns-blue" />,
      title: 'Гарантия качества',
      description: 'Все товары сертифицированы и имеют официальную гарантию от производителя.'
    },
    {
      id: 3,
      icon: <Award className="h-10 w-10 text-dns-blue" />,
      title: 'Лучшие цены',
      description: 'Мы постоянно мониторим рынок и предлагаем конкурентные цены.'
    },
    {
      id: 4,
      icon: <Clock className="h-10 w-10 text-dns-blue" />,
      title: 'Круглосуточная поддержка',
      description: 'Наши специалисты готовы помочь вам в любое время дня и ночи.'
    },
    {
      id: 5,
      icon: <CreditCard className="h-10 w-10 text-dns-blue" />,
      title: 'Удобная оплата',
      description: 'Оплата при получении, банковской картой, онлайн или в рассрочку.'
    },
    {
      id: 6,
      icon: <Package className="h-10 w-10 text-dns-blue" />,
      title: '200+ пунктов выдачи',
      description: 'Обширная сеть пунктов выдачи заказов по всей России.'
    }
  ];

  return (
    <section id="advantages" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="title-medium mb-4">Почему выбирают нас</h2>
          <p className="subtitle">
            DNS — это не просто магазин, это надежный партнер для ваших технологических потребностей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage) => (
            <div 
              key={advantage.id} 
              className="p-6 rounded-xl border border-gray-100 hover:border-dns-blue/30 transition-all hover:shadow-md"
            >
              <div className="mb-4">
                {advantage.icon}
              </div>
              <h3 className="text-xl font-semibold text-dns-darkBlue mb-2">
                {advantage.title}
              </h3>
              <p className="text-dns-darkGray">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
