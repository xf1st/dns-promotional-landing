
import React, { useEffect, useRef } from 'react';
import { Smartphone, Tv, Cpu, Headphones, Laptop, Camera } from 'lucide-react';

const features = [
  {
    icon: <Smartphone className="w-8 h-8 text-dns-blue" />,
    title: "Смартфоны",
    description: "Новейшие модели от ведущих производителей с бесплатной настройкой"
  },
  {
    icon: <Tv className="w-8 h-8 text-dns-blue" />,
    title: "Телевизоры",
    description: "Безупречное качество изображения и звука для вашего домашнего кинотеатра"
  },
  {
    icon: <Cpu className="w-8 h-8 text-dns-blue" />,
    title: "Компьютеры",
    description: "Производительные системы для работы, учебы и развлечений"
  },
  {
    icon: <Headphones className="w-8 h-8 text-dns-blue" />,
    title: "Аудиотехника",
    description: "Погрузитесь в мир кристально чистого звучания"
  },
  {
    icon: <Laptop className="w-8 h-8 text-dns-blue" />,
    title: "Ноутбуки",
    description: "Портативные и мощные решения для мобильной работы"
  },
  {
    icon: <Camera className="w-8 h-8 text-dns-blue" />,
    title: "Фототехника",
    description: "Запечатлейте важные моменты с профессиональным качеством"
  }
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    cardsRef.current.forEach(card => {
      if (card) {
        card.classList.add('opacity-0', 'translate-y-10');
        observer.observe(card);
      }
    });

    return () => {
      cardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section id="features" className="section-padding bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-dns-blue/10 rounded-lg text-dns-blue font-medium text-sm mb-4">
            Категории товаров
          </div>
          <h2 className="title-medium mb-6">
            Выбирайте из широкого ассортимента<br className="hidden md:block" /> качественной техники
          </h2>
          <p className="subtitle">
            Мы предлагаем только надежные и современные устройства от проверенных производителей с официальной гарантией
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="feature-card flex flex-col"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-xl bg-dns-gray flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-dns-darkBlue mb-3">{feature.title}</h3>
              <p className="text-dns-darkGray flex-grow">{feature.description}</p>
              <a 
                href="#" 
                className="mt-4 inline-flex items-center text-dns-blue font-medium hover:underline"
              >
                Подробнее
                <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
