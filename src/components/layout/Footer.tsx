
import React from 'react';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-white pt-16 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          <div>
            <div className="flex items-center mb-6">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="#0067B1" />
                <path d="M8 12H32V16H8V12Z" fill="white" />
                <path d="M8 18H20V28H8V18Z" fill="white" />
                <path d="M23 18H32V28H23V18Z" fill="white" />
              </svg>
              <span className="ml-2 text-2xl font-bold text-dns-blue">DNS</span>
            </div>
            
            <p className="text-dns-darkGray mb-6">
              DNS - один из лидеров российского рынка по продаже электроники и бытовой техники. Мы предлагаем широкий ассортимент качественных товаров по доступным ценам.
            </p>
            
            <div className="flex space-x-4">
              <a href="https://t.me/dnsshop" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dns-gray flex items-center justify-center text-dns-darkBlue hover:bg-dns-blue hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13"></path>
                  <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                </svg>
              </a>
              <a href="https://instagram.com/dnsshop" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dns-gray flex items-center justify-center text-dns-darkBlue hover:bg-dns-blue hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://vk.com/dnsshop" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dns-gray flex items-center justify-center text-dns-darkBlue hover:bg-dns-blue hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15.5 5h-7A3.5 3.5 0 0 0 5 8.5v7A3.5 3.5 0 0 0 8.5 19h7a3.5 3.5 0 0 0 3.5-3.5v-7A3.5 3.5 0 0 0 15.5 5Z"></path>
                  <path d="M9 8h1.5a3.5 3.5 0 0 1 0 7H9v-7Z"></path>
                  <path d="M12.5 8H14v7h-1.5Z"></path>
                </svg>
              </a>
              <a href="https://tiktok.com/@dnsshop" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dns-gray flex items-center justify-center text-dns-darkBlue hover:bg-dns-blue hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                  <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                  <path d="M15 8v8a4 4 0 0 1-4 4"></path>
                  <path d="M15 8h-4"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-dns-darkBlue mb-6">Покупателям</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-dns-darkGray hover:text-dns-blue transition-colors">Как сделать заказ</a></li>
              <li><a href="#" className="text-dns-darkGray hover:text-dns-blue transition-colors">Способы оплаты</a></li>
              <li><a href="#" className="text-dns-darkGray hover:text-dns-blue transition-colors">Доставка</a></li>
              <li><a href="#" className="text-dns-darkGray hover:text-dns-blue transition-colors">Возврат товара</a></li>
              <li><a href="#" className="text-dns-darkGray hover:text-dns-blue transition-colors">Гарантия и сервис</a></li>
              <li><a href="#" className="text-dns-darkGray hover:text-dns-blue transition-colors">Бонусная программа</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-dns-darkBlue mb-6">Каталог</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-dns-darkGray hover:text-dns-blue transition-colors">Смартфоны и гаджеты</a></li>
              <li><a href="#" className="text-dns-darkGray hover:text-dns-blue transition-colors">Ноутбуки и компьютеры</a></li>
              <li><a href="#" className="text-dns-darkGray hover:text-dns-blue transition-colors">Телевизоры и аудио</a></li>
              <li><a href="#" className="text-dns-darkGray hover:text-dns-blue transition-colors">Бытовая техника</a></li>
              <li><a href="#" className="text-dns-darkGray hover:text-dns-blue transition-colors">Фото и видеотехника</a></li>
              <li><a href="#" className="text-dns-darkGray hover:text-dns-blue transition-colors">Игры и консоли</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-dns-darkBlue mb-6">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-dns-blue shrink-0 mt-1 mr-3" />
                <span className="text-dns-darkGray">123456, г. Москва, ул. Технологическая, д. 1</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-dns-blue shrink-0 mr-3" />
                <a href="tel:88000000000" className="text-dns-darkGray hover:text-dns-blue transition-colors">8 (800) 000-00-00</a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-dns-blue shrink-0 mr-3" />
                <a href="mailto:info@dns-shop.ru" className="text-dns-darkGray hover:text-dns-blue transition-colors">info@dns-shop.ru</a>
              </li>
            </ul>
            
            <div className="mt-6 p-4 bg-dns-gray rounded-lg">
              <h4 className="font-medium text-dns-darkBlue mb-2">Режим работы</h4>
              <p className="text-dns-darkGray">Пн-Вс: 10:00 - 22:00</p>
            </div>
          </div>
        </div>
        
        <div className="py-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left text-dns-darkGray mb-4 md:mb-0">
            © {currentYear} DNS. Все права защищены.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy" className="text-dns-darkGray hover:text-dns-blue transition-colors text-sm">Политика конфиденциальности</Link>
            <Link to="/terms" className="text-dns-darkGray hover:text-dns-blue transition-colors text-sm">Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
