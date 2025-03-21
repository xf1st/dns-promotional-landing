
import React, { useState } from 'react';
import { Check } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Пожалуйста, введите корректный email');
      return;
    }
    
    // Clear previous error
    setError('');
    
    // Mock form submission
    setTimeout(() => {
      setSubmitted(true);
      setEmail('');
    }, 500);
  };

  return (
    <section id="contact" className="py-24 bg-dns-gray">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 relative overflow-hidden">
          
          {/* Decorative elements */}
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-dns-yellow/20"></div>
          <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-dns-blue/10"></div>
          
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-dns-darkBlue mb-4">
                  Подпишитесь на новости и акции
                </h2>
                <p className="text-dns-darkGray mb-6">
                  Будьте в курсе последних поступлений, эксклюзивных предложений и специальных акций
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-dns-blue/10 flex items-center justify-center mr-3">
                      <Check size={12} className="text-dns-blue" />
                    </div>
                    <p className="text-sm text-dns-darkGray">Первыми узнавайте о новинках и акциях</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-dns-blue/10 flex items-center justify-center mr-3">
                      <Check size={12} className="text-dns-blue" />
                    </div>
                    <p className="text-sm text-dns-darkGray">Персональные предложения и скидки</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-dns-blue/10 flex items-center justify-center mr-3">
                      <Check size={12} className="text-dns-blue" />
                    </div>
                    <p className="text-sm text-dns-darkGray">Полезные советы по выбору техники</p>
                  </div>
                </div>
              </div>
              
              <div>
                {submitted ? (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={24} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-dns-darkBlue mb-2">Спасибо за подписку!</h3>
                    <p className="text-dns-darkGray">Мы отправили письмо с подтверждением на ваш email.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-dns-gray/30 border border-gray-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-dns-darkBlue mb-4">
                      Введите ваш email для подписки
                    </h3>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-dns-darkGray mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          error ? 'border-red-400' : 'border-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-dns-blue focus:border-transparent`}
                      />
                      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                    </div>
                    
                    <div className="mb-6">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          className="mt-1 rounded border-gray-300 text-dns-blue focus:ring-dns-blue"
                          required
                        />
                        <span className="ml-2 text-sm text-dns-darkGray">
                          Я согласен с <a href="#" className="text-dns-blue hover:underline">политикой конфиденциальности</a> и даю согласие на обработку персональных данных
                        </span>
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full dns-button-primary"
                    >
                      Подписаться
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
