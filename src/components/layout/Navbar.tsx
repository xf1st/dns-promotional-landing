import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, LogIn, UserCircle } from 'lucide-react';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { buttonVariants } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import CartDrawer from '@/components/cart/CartDrawer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const location = useLocation();
  const { totalItems } = useCart();
  
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    if (user) {
      async function fetchAvatar() {
        const { data, error } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', user.id)
          .single();
          
        if (data && !error) {
          setAvatarUrl(data.avatar_url);
        }
      }
      
      fetchAvatar();
    } else {
      setAvatarUrl(null);
    }
  }, [user]);
  
  const getInitials = () => {
    if (user?.email) return user.email.substring(0, 1).toUpperCase();
    return 'U';
  };
  
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-8">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="#0066FF" />
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="16" fontWeight="bold">DNS</text>
            </svg>
            <span className="ml-2 text-lg font-bold bg-gradient-to-r from-[#4DA6FF] to-[#0066FF] bg-clip-text text-transparent">DNStoDNS</span>
          </Link>
          
          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-dns-darkBlue hover:text-dns-blue transition-colors">Главная</Link>
              <Link to="/catalog" className="text-dns-darkBlue hover:text-dns-blue transition-colors">Каталог</Link>
              <Link to="/reviews" className="text-dns-darkBlue hover:text-dns-blue transition-colors">Отзывы</Link>
            </nav>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {user ? (
            <>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-dns-darkBlue hover:text-dns-blue transition-colors"
                aria-label="Корзина"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-dns-yellow text-dns-darkBlue text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
              
              <Link to="/profile">
                <Avatar className="w-9 h-9 transition-transform hover:scale-110">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt="Аватар пользователя" />
                  ) : (
                    <AvatarFallback className="bg-dns-blue text-white">
                      {getInitials()}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Link>
            </>
          ) : (
            <Link 
              to="/auth" 
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <LogIn className="mr-2" size={16} />
              Войти
            </Link>
          )}
          
          {isMobile && (
            <button 
              onClick={toggleNav} 
              className="p-2 text-dns-darkBlue"
              aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobile && (
        <div 
          className={`fixed inset-0 z-40 bg-white p-4 pt-20 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <nav className="flex flex-col space-y-6 text-lg">
            <Link to="/" className="text-dns-darkBlue hover:text-dns-blue transition-colors py-2 border-b">Главная</Link>
            <Link to="/catalog" className="text-dns-darkBlue hover:text-dns-blue transition-colors py-2 border-b">Каталог</Link>
            <Link to="/reviews" className="text-dns-darkBlue hover:text-dns-blue transition-colors py-2 border-b">Отзывы</Link>
            {user && <Link to="/profile" className="text-dns-darkBlue hover:text-dns-blue transition-colors py-2 border-b">Профиль</Link>}
          </nav>
        </div>
      )}
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
