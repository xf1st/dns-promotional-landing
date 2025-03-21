
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? 'auto' : 'hidden';
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out px-4 md:px-8',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' 
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="z-50 relative">
            <div className="flex items-center">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="#0067B1"/>
                <path d="M8 12H32V16H8V12Z" fill="white"/>
                <path d="M8 18H20V28H8V18Z" fill="white"/>
                <path d="M23 18H32V28H23V18Z" fill="white"/>
              </svg>
              <span className="ml-2 text-2xl font-bold text-dns-blue">DNS</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#products" className="text-dns-darkBlue hover:text-dns-blue transition-colors">Продукты</a>
            <a href="#features" className="text-dns-darkBlue hover:text-dns-blue transition-colors">Преимущества</a>
            <a href="#promotion" className="text-dns-darkBlue hover:text-dns-blue transition-colors">Акции</a>
            <a href="#contact" className="text-dns-darkBlue hover:text-dns-blue transition-colors">Контакты</a>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-dns-darkBlue hover:text-dns-blue transition-colors">
              <Search size={22} />
            </button>
            <button className="text-dns-darkBlue hover:text-dns-blue transition-colors">
              <User size={22} />
            </button>
            <button className="text-dns-darkBlue hover:text-dns-blue transition-colors relative">
              <ShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-dns-yellow text-dns-darkBlue text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-dns-darkBlue z-50"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu */}
          <div className={cn(
            "fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}>
            <nav className="flex flex-col items-center space-y-8 mb-12">
              <a 
                href="#products" 
                className="text-2xl font-medium text-dns-darkBlue hover:text-dns-blue transition-colors"
                onClick={toggleMobileMenu}
              >
                Продукты
              </a>
              <a 
                href="#features" 
                className="text-2xl font-medium text-dns-darkBlue hover:text-dns-blue transition-colors"
                onClick={toggleMobileMenu}
              >
                Преимущества
              </a>
              <a 
                href="#promotion" 
                className="text-2xl font-medium text-dns-darkBlue hover:text-dns-blue transition-colors"
                onClick={toggleMobileMenu}
              >
                Акции
              </a>
              <a 
                href="#contact" 
                className="text-2xl font-medium text-dns-darkBlue hover:text-dns-blue transition-colors"
                onClick={toggleMobileMenu}
              >
                Контакты
              </a>
            </nav>
            <div className="flex items-center space-x-8">
              <button className="text-dns-darkBlue hover:text-dns-blue transition-colors">
                <Search size={24} />
              </button>
              <button className="text-dns-darkBlue hover:text-dns-blue transition-colors">
                <User size={24} />
              </button>
              <button className="text-dns-darkBlue hover:text-dns-blue transition-colors relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-dns-yellow text-dns-darkBlue text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
