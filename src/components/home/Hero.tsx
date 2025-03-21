
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || !imageRef.current) return;
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 2}deg) rotateX(${y * -2}deg) scale3d(1.03, 1.03, 1.03)`;
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="min-h-screen w-full flex items-center justify-center pt-20 pb-10 px-4 md:px-8 bg-gradient-to-b from-white to-dns-gray/30 overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 staggered-fade-in">
            <div className="px-1 py-1 rounded-full bg-dns-gray inline-flex items-center mb-6">
              <span className="bg-dns-yellow rounded-full px-3 py-1 text-xs font-medium">Новинка</span>
              <span className="px-3 text-xs font-medium text-dns-darkBlue">Самые ожидаемые модели</span>
            </div>
            
            <h1 className="title-large mb-6">
              Новая эра технологий <br className="hidden md:block" />
              в магазинах DNS
            </h1>
            
            <p className="subtitle mb-8">
              Откройте для себя мир инноваций, качественной техники и невероятных технологий. Выбирайте самые современные устройства по выгодным ценам.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#products" className="dns-button-primary flex items-center justify-center">
                <span>Смотреть товары</span>
                <ArrowRight size={18} className="ml-2" />
              </a>
              <a href="#promotion" className="dns-button-secondary flex items-center justify-center">
                Акции месяца
              </a>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200 flex items-center flex-wrap gap-8">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-dns-gray flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0067B1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6V12L16 14" stroke="#0067B1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-sm text-dns-darkGray">Быстрая доставка</div>
                  <div className="text-dns-darkBlue font-semibold">от 1 дня</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-dns-gray flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 7L9 18L4 13" stroke="#0067B1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-sm text-dns-darkGray">Гарантия</div>
                  <div className="text-dns-darkBlue font-semibold">до 3 лет</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 image-reveal" ref={imageRef}>
            <img 
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" 
              alt="Modern laptop" 
              className="w-full h-auto rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-[1.02] object-cover"
            />
            <div className="absolute bottom-4 left-4 glass rounded-xl p-4 max-w-[200px]">
              <div className="text-xs text-dns-darkGray font-medium">Лучшая цена</div>
              <div className="text-dns-darkBlue font-bold text-lg">от 59 990 ₽</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
