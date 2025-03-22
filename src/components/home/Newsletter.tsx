import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите ваш email",
        variant: "destructive",
      });
      return;
    }
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный email",
        variant: "destructive",
      });
      return;
    }
    
    // Show success notification
    toast({
      title: "Подписка оформлена!",
      description: `Вы успешно подписались на рассылку на адрес ${email}`,
    });
    
    // Reset form
    setEmail('');
  };
  
  return (
    <section id="newsletter" className="bg-dns-blue py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="title-medium text-white mb-4">
          Подпишитесь на новости и акции
        </h2>
        <p className="subtitle text-blue-100 mb-8">
          Узнавайте первыми о новинках, скидках и специальных предложениях!
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row">
          <input
            type="email"
            className="flex-grow w-full sm:w-auto px-4 py-3 mb-3 sm:mb-0 sm:mr-3 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Ваш e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="dns-button-yellow w-full sm:w-auto"
          >
            Подписаться
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
