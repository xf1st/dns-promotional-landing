
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Показываем баннер через 5 секунд после загрузки страницы
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
    
    // Показываем уведомление при закрытии баннера
    toast({
      title: "Баннер скрыт",
      description: "Вы всегда можете найти наши акции в разделе 'Промо'",
      duration: 3000,
    });

    // Сохраняем информацию в localStorage, чтобы не показывать баннер сразу
    localStorage.setItem('promoBannerClosed', Date.now().toString());
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-dns-yellow dark:bg-secondary p-3 sm:p-4 text-center relative">
        <button 
          onClick={closeBanner}
          className="absolute right-2 top-2 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Закрыть баннер"
        >
          <X className="h-5 w-5 text-dns-darkBlue dark:text-white" />
        </button>
        
        <div className="max-w-4xl mx-auto px-8">
          <p className="font-medium text-dns-darkBlue dark:text-white">
            🎁 Специальное предложение! Получите скидку 15% на все товары до конца недели. Используйте код: <span className="font-bold">DNS15</span>
          </p>
          <button 
            onClick={() => {
              toast({
                title: "Промокод скопирован!",
                description: "DNS15 — используйте при оформлении заказа",
                duration: 3000,
              });
              navigator.clipboard.writeText('DNS15');
            }}
            className="mt-2 dns-button-primary text-sm py-1 px-4"
          >
            Копировать код
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
