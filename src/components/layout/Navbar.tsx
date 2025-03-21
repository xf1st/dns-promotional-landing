
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const showCartToast = () => {
    toast({
      title: "Корзина пуста",
      description: "Добавьте товары в корзину для оформления заказа",
      duration: 3000,
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm dark:bg-background/90' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold flex items-center">
          <span className="text-dns-blue dark:text-white">DNS</span>
          <span className="text-dns-yellow ml-1">Store</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#features" className="text-dns-darkBlue hover:text-dns-blue dark:text-gray-200 dark:hover:text-white transition-colors">Особенности</a>
          <a href="#products" className="text-dns-darkBlue hover:text-dns-blue dark:text-gray-200 dark:hover:text-white transition-colors">Продукты</a>
          <a href="#promotion" className="text-dns-darkBlue hover:text-dns-blue dark:text-gray-200 dark:hover:text-white transition-colors">Акции</a>
          <a href="#newsletter" className="text-dns-darkBlue hover:text-dns-blue dark:text-gray-200 dark:hover:text-white transition-colors">Подписка</a>
        </div>

        {/* Action buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={showCartToast} 
                className="p-2 rounded-full bg-white hover:bg-gray-100 dark:bg-secondary dark:hover:bg-secondary/80 transition-colors"
              >
                <ShoppingCart className="h-5 w-5 text-dns-darkBlue dark:text-white" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Корзина</p>
            </TooltipContent>
          </Tooltip>
          
          <button 
            onClick={() => toast({
              title: "Функция авторизации",
              description: "Для использования авторизации необходимо подключить Supabase",
              duration: 5000,
            })}
            className="dns-button-primary"
          >
            Войти
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          
          <button 
            onClick={showCartToast} 
            className="p-2 rounded-full bg-white hover:bg-gray-100 dark:bg-secondary dark:hover:bg-secondary/80 transition-colors"
          >
            <ShoppingCart className="h-5 w-5 text-dns-darkBlue dark:text-white" />
          </button>
          
          <button onClick={toggleMenu} className="text-dns-darkBlue dark:text-white">
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-background p-4 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4 py-2">
            <a 
              href="#features" 
              className="text-dns-darkBlue hover:text-dns-blue px-4 py-2 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-secondary/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Особенности
            </a>
            <a 
              href="#products" 
              className="text-dns-darkBlue hover:text-dns-blue px-4 py-2 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-secondary/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Продукты
            </a>
            <a 
              href="#promotion" 
              className="text-dns-darkBlue hover:text-dns-blue px-4 py-2 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-secondary/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Акции
            </a>
            <a 
              href="#newsletter" 
              className="text-dns-darkBlue hover:text-dns-blue px-4 py-2 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-secondary/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Подписка
            </a>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                toast({
                  title: "Функция авторизации",
                  description: "Для использования авторизации необходимо подключить Supabase",
                  duration: 5000,
                });
              }}
              className="dns-button-primary w-full"
            >
              Войти
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
