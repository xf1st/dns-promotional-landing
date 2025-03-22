
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      id: "item-1",
      question: "Как оформить заказ на сайте?",
      answer: "Чтобы оформить заказ, выберите нужный товар, добавьте его в корзину, перейдите в корзину и нажмите 'Оформить заказ'. Заполните необходимые данные для доставки и выберите способ оплаты. После подтверждения заказа вы получите уведомление на указанный email."
    },
    {
      id: "item-2",
      question: "Какие способы оплаты доступны?",
      answer: "Мы предлагаем различные способы оплаты: банковской картой онлайн, наличными при получении, безналичным расчетом для юридических лиц, а также в рассрочку или кредит от наших банков-партнеров."
    },
    {
      id: "item-3",
      question: "Как узнать статус заказа?",
      answer: "Статус вашего заказа доступен в личном кабинете на сайте или в мобильном приложении. Также вы будете получать уведомления о смене статуса заказа на указанный при оформлении email или номер телефона."
    },
    {
      id: "item-4",
      question: "Как вернуть товар?",
      answer: "Вы можете вернуть товар надлежащего качества в течение 14 дней с момента покупки. Для этого необходимо сохранить товарный вид, комплектацию и документы о покупке. Товар ненадлежащего качества подлежит гарантийному обслуживанию или возврату в соответствии с Законом о защите прав потребителей."
    },
    {
      id: "item-5",
      question: "Есть ли у вас программа лояльности?",
      answer: "Да, у нас действует бонусная программа DNS-Бонус. За каждую покупку вы получаете бонусы, которыми можно оплатить до 50% стоимости следующих покупок. Также участники программы получают доступ к эксклюзивным акциям и предложениям."
    },
    {
      id: "item-6",
      question: "Как стать участником программы DNS-Бонус?",
      answer: "Чтобы стать участником программы, зарегистрируйтесь на сайте или в приложении DNS, либо оформите карту DNS-Бонус в любом из наших магазинов. После регистрации вы сразу начнете накапливать бонусы за покупки."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="title-medium mb-4">Часто задаваемые вопросы</h2>
          <p className="subtitle">
            Ответы на самые популярные вопросы наших клиентов
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-lg font-medium text-dns-darkBlue hover:text-dns-blue">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-dns-darkGray">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="mb-4 text-dns-darkGray">Не нашли ответ на свой вопрос?</p>
          <a href="#" className="dns-button-primary">
            Связаться с поддержкой
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
