
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';

// Banner types
type BannerType = 'promo' | 'telegram' | 'newsletter';

// Banner interface
interface BannerData {
  type: BannerType;
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<BannerData | null>(null);
  const { toast: uiToast } = useToast();

  // Define all possible banners with enhanced styles
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
      backgroundColor: 'bg-gradient-to-r from-[#FEF9E7] to-[#FEF7CD]',
      textColor: 'text-[#403E43]',
      borderColor: 'border-amber-200'
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
      backgroundColor: 'bg-gradient-to-r from-[#DFE9FD] to-[#D3E4FD]',
      textColor: 'text-[#403E43]',
      borderColor: 'border-blue-200'
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
      backgroundColor: 'bg-gradient-to-r from-[#EEE6FF] to-[#E5DEFF]',
      textColor: 'text-[#403E43]',
      borderColor: 'border-purple-200'
    }
  ];

  // Ensure only one banner is shown and prevent overlapping
  useEffect(() => {
    // Track active banners to avoid showing multiple
    let isMounted = true;
    
    // Check when the last banner was hidden
    const checkBannerTimings = () => {
      if (!isMounted) return;
      
      const lastBannerTime = localStorage.getItem('lastBannerTime');
      const lastBannerType = localStorage.getItem('lastBannerType');
      const now = Date.now();
      
      // If more than 15 minutes have passed or no banner has been shown yet
      if (!lastBannerTime || (now - parseInt(lastBannerTime, 10)) > 15 * 60 * 1000) {
        // Make sure no banner is currently visible before showing a new one
        setIsVisible(false);
        
        // Choose a random banner, but not the same as the last one shown
        let availableBanners = banners;
        if (lastBannerType) {
          availableBanners = banners.filter(banner => banner.type !== lastBannerType);
        }
        
        // If there are available banners, select a random one
        if (availableBanners.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableBanners.length);
          
          // Short timeout to ensure any previous banner is fully hidden
          setTimeout(() => {
            if (isMounted) {
              setCurrentBanner(availableBanners[randomIndex]);
              setIsVisible(true);
            }
          }, 300);
        } else {
          // If no available banners (except the last one), show any
          const randomIndex = Math.floor(Math.random() * banners.length);
          
          // Short timeout to ensure any previous banner is fully hidden
          setTimeout(() => {
            if (isMounted) {
              setCurrentBanner(banners[randomIndex]);
              setIsVisible(true);
            }
          }, 300);
        }
      }
    };

    // Check on page load with a delay
    const timer = setTimeout(() => {
      checkBannerTimings();
    }, 5000); // 5-second delay before first check

    // Scroll event handler with debounce
    let scrollTimeout: number | null = null;
    const handleScroll = () => {
      // Cancel previous timeout if it exists
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Set new timeout for checking after scrolling stops
      scrollTimeout = window.setTimeout(() => {
        // Record last scroll time
        localStorage.setItem('lastScrollTime', Date.now().toString());
        
        // Check if a banner should be shown
        checkBannerTimings();
      }, 1000); // Wait 1 second after scrolling stops
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      isMounted = false;
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
    
    // Show notification when banner is closed
    uiToast({
      title: "Баннер скрыт",
      description: "Вы всегда можете найти наши акции в разделе 'Промо'",
      duration: 3000,
    });

    // Save information about when the banner was closed and its type
    if (currentBanner) {
      localStorage.setItem('lastBannerTime', Date.now().toString());
      localStorage.setItem('lastBannerType', currentBanner.type);
    }
  };

  // Don't render anything if no banner is visible
  if (!isVisible || !currentBanner) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div 
        className={`${currentBanner.backgroundColor} ${currentBanner.textColor} p-4 sm:p-5 text-center relative shadow-lg rounded-xl 
        border ${currentBanner.borderColor} max-w-xl mx-auto pointer-events-auto animate-float backdrop-blur-none
        transition-all duration-300 transform translate-y-0`}
        style={{ backdropFilter: 'none' }}
      >
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
            className="mt-2 bg-white hover:bg-gray-100 transition-colors font-medium py-2 px-4 rounded-md shadow-sm border border-gray-200 hover:shadow-md"
          >
            {currentBanner.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
