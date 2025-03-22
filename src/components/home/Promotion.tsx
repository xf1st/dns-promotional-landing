import React, { useRef, useEffect } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { useAuth, useNavigate } from 'react-router-dom';

const Promotion = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handlePromotionClick = () => {
    if (user) {
      navigate('/catalog');
    } else {
      navigate('/auth');
    }
  };

  useEffect(() => {
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 3);
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate.getTime() - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      if (timerRef.current) {
        timerRef.current.innerHTML = `
          <div class="flex gap-4">
            <div class="text-center">
              <div class="bg-white w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold text-dns-darkBlue shadow-sm">
                ${days < 10 ? '0' + days : days}
              </div>
              <div class="text-xs mt-1 text-white/80">дней</div>
            </div>
            <div class="text-center">
              <div class="bg-white w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold text-dns-darkBlue shadow-sm">
                ${hours < 10 ? '0' + hours : hours}
              </div>
              <div class="text-xs mt-1 text-white/80">часов</div>
            </div>
            <div class="text-center">
              <div class="bg-white w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold text-dns-darkBlue shadow-sm">
                ${minutes < 10 ? '0' + minutes : minutes}
              </div>
              <div class="text-xs mt-1 text-white/80">минут</div>
            </div>
            <div class="text-center">
              <div class="bg-white w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold text-dns-darkBlue shadow-sm">
                ${seconds < 10 ? '0' + seconds : seconds}
              </div>
              <div class="text-xs mt-1 text-white/80">секунд</div>
            </div>
          </div>
        `;
      }
      
      if (distance < 0) {
        clearInterval(interval);
        if (timerRef.current) {
          timerRef.current.innerHTML = "Акция завершена";
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollPosition = window.scrollY;
      const sectionPosition = sectionRef.current.offsetTop;
      const distance = scrollPosition - sectionPosition;
      
      if (distance > -500 && distance < 500) {
        const parallaxElements = sectionRef.current.querySelectorAll('.parallax');
        parallaxElements.forEach((el, index) => {
          const speed = (index + 1) * 0.05;
          (el as HTMLElement).style.transform = `translateY(${distance * speed}px)`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="promotion" 
      ref={sectionRef}
      className="py-20 relative bg-gradient-to-r from-dns-blue to-dns-lightBlue overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/3 -translate-y-1/3 parallax"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4 parallax"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Clock size={18} className="mr-2" />
            <span className="text-sm font-medium">Ограниченное предложение</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Скидки до 30% на все смартфоны
          </h2>
          
          <p className="text-xl text-white/80 mb-8">
            Только 3 дня! Не упустите возможность приобрести новейшие модели по специальным ценам
          </p>
          
          <div className="mb-10 flex justify-center" ref={timerRef}>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#" 
              className="bg-white text-dns-blue font-medium px-8 py-4 rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center"
              onClick={handlePromotionClick}
            >
              <span>Перейти к акции</span>
              <ArrowRight size={18} className="ml-2" />
            </a>
            <a 
              href="#" 
              className="bg-transparent border border-white/20 text-white font-medium px-8 py-4 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              Все акции
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotion;
