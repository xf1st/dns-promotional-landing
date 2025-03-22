
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';

// Типы баннеров
type BannerType = 'promo' | 'telegram' | 'newsletter';

// Интерфейс для баннера
interface BannerData {
  type: BannerType;
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
  backgroundColor: string;
  textColor: string;
}

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<BannerData | null>(null);
  const { toast: uiToast } = useToast();

  // Определение всех возможных баннеров с обновленными стилями
  const banners: BannerData[] = [
    {
      type: 'promo',
      title: '🎁 Специальное предложение!',
      description: 'Получите скидку 15% на все товары до конца недели. Используйте код: DNS15',
      buttonText: 'Копировать код',
      buttonAction: () => {
        toast.success('Промокод скопирован!', {
          description: 'DNS15 — используйте при оформлении заказа',
          duration: 3000,
        });
        navigator.clipboard.writeText('DNS15');
        closeBanner(); // Close banner after action
      },
      backgroundColor: 'bg-[#FEF7CD]',
      textColor: 'text-[#403E43]'
    },
    {
      type: 'telegram',
      title: '📱 Присоединяйтесь к нам в Telegram!',
      description: 'Узнавайте первыми о новых акциях и поступлениях!',
      buttonText: 'Подписаться',
      buttonAction: () => {
        window.open('https://t.me/dnsshop', '_blank');
        toast.success('Спасибо за подписку!', {
          description: 'Вы будете получать все новости первыми',
          duration: 3000,
        });
        closeBanner(); // Close banner after action
      },
      backgroundColor: 'bg-[#D3E4FD]',
      textColor: 'text-[#403E43]'
    },
    {
      type: 'newsletter',
      title: '📧 Подпишитесь на нашу рассылку',
      description: 'Получайте персональные предложения и специальные скидки!',
      buttonText: 'Подписаться',
      buttonAction: () => {
        toast.success('Спасибо за подписку!', {
          description: 'Вы успешно подписались на нашу рассылку',
          duration: 3000,
        });
        closeBanner(); // Close banner after action
      },
      backgroundColor: 'bg-[#E5DEFF]',
      textColor: 'text-[#403E43]'
    }
  ];

  useEffect(() => {
    // Проверяем, когда последний раз был скрыт баннер
    const checkBannerTimings = () => {
      const lastBannerTime = localStorage.getItem('lastBannerTime');
      const lastBannerType = localStorage.getItem('lastBannerType');
      const now = Date.now();
      
      // Если прошло больше 15 минут или баннер еще не показывался
      if (!lastBannerTime || (now - parseInt(lastBannerTime, 10)) > 15 * 60 * 1000) {
        // Выбираем случайный баннер, но не тот же, что показывался последний раз
        let availableBanners = banners;
        if (lastBannerType) {
          availableBanners = banners.filter(banner => banner.type !== lastBannerType);
        }
        
        // Если есть доступные баннеры, выбираем случайный
        if (availableBanners.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableBanners.length);
          setCurrentBanner(availableBanners[randomIndex]);
          setIsVisible(true);
        } else {
          // Если нет доступных баннеров (кроме последнего), показываем любой
          const randomIndex = Math.floor(Math.random() * banners.length);
          setCurrentBanner(banners[randomIndex]);
          setIsVisible(true);
        }
      }
    };

    // Проверяем при загрузке страницы
    const timer = setTimeout(() => {
      checkBannerTimings();
    }, 5000); // Задержка 5 секунд перед первой проверкой

    // Обработчик события прокрутки
    let scrollTimeout: number | null = null;
    const handleScroll = () => {
      // Отменяем предыдущий таймаут, если он был
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Устанавливаем новый таймаут для проверки после окончания прокрутки
      scrollTimeout = window.setTimeout(() => {
        // Записываем время последнего скролла
        localStorage.setItem('lastScrollTime', Date.now().toString());
        
        // Проверяем, нужно ли показать баннер
        checkBannerTimings();
      }, 1000); // Ждем 1 секунду после окончания прокрутки
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
    
    // Показываем уведомление при закрытии баннера
    uiToast({
      title: "Баннер скрыт",
      description: "Вы всегда можете найти наши акции в разделе 'Промо'",
      duration: 3000,
    });

    // Сохраняем информацию о времени закрытия баннера и его типе
    if (currentBanner) {
      localStorage.setItem('lastBannerTime', Date.now().toString());
      localStorage.setItem('lastBannerType', currentBanner.type);
    }
  };

  if (!isVisible || !currentBanner) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 animate-slide-up flex justify-center pointer-events-none">
      <div className={`${currentBanner.backgroundColor} ${currentBanner.textColor} p-3 sm:p-4 text-center relative shadow-md rounded-xl border border-gray-200 max-w-xl mx-auto pointer-events-auto animate-float`}>
        <button 
          onClick={closeBanner}
          className="absolute right-2 top-2 p-1 rounded-full hover:bg-black/10 transition-colors"
          aria-label="Закрыть баннер"
        >
          <X className="h-5 w-5 text-current" />
        </button>
        
        <div className="px-6">
          <p className="font-medium">
            <span className="text-lg font-bold block mb-1">{currentBanner.title}</span>
            {currentBanner.description}
          </p>
          <button 
            onClick={() => {
              // Call the action and banner will be closed in the action
              currentBanner.buttonAction();
            }}
            className="mt-2 bg-white hover:bg-gray-100 transition-colors font-medium py-1 px-4 rounded shadow-sm border border-gray-200"
          >
            {currentBanner.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
