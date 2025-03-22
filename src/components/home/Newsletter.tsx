
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast: uiToast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      uiToast({
        title: "Ошибка",
        description: "Пожалуйста, введите ваш email",
        variant: "destructive",
      });
      return;
    }
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      uiToast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный email",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate sending request
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Show success notification
      toast.success('Подписка оформлена!', {
        description: `Вы успешно подписались на рассылку на адрес ${email}`,
        duration: 5000,
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });
      
      // Reset form
      setEmail('');
    }, 1000);
  };
  
  return (
    <section id="newsletter" className="bg-gradient-to-r from-dns-blue to-blue-700 py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg border border-white/20">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="bg-blue-600 rounded-full p-4 flex-shrink-0">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Подпишитесь на новости и акции
              </h2>
              <p className="text-blue-100">
                Узнавайте первыми о новинках, скидках и специальных предложениях!
              </p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <input
                type="email"
                className="w-full px-5 py-4 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all bg-white/90 backdrop-blur-sm border border-white/20"
                placeholder="Ваш e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              className={`px-6 py-4 rounded-lg text-white font-medium transition duration-300 flex items-center justify-center ${
                isSubmitting 
                  ? 'bg-yellow-400 cursor-wait' 
                  : 'bg-yellow-500 hover:bg-yellow-400 hover:shadow-lg active:scale-95 transform'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
              ) : null}
              <span>Подписаться</span>
              {!isSubmitting && <ArrowRight size={18} className="ml-2" />}
            </button>
          </form>
          
          <div className="mt-6 text-sm text-blue-100 text-center">
            Нажимая кнопку «Подписаться», вы соглашаетесь на обработку персональных данных
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
