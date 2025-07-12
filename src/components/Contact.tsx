import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { useCallModal } from '../contexts/CallModalContext';

const Contact: React.FC = () => {
  const { openModal } = useCallModal();

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Свяжитесь с нами
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Готовы ответить на все ваши вопросы и помочь с выбором металлопроката
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Контактная информация</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-2xl">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Телефон</h4>
                  <a href="tel:+77777777777" className="text-blue-600 hover:text-blue-700 font-medium text-lg">
                    +7 (777) 777-77-77
                  </a>
                  <p className="text-gray-600 text-sm mt-1">Звоните с 9:00 до 18:00</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-2xl">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Email</h4>
                  <a href="mailto:info@atlantsnabcity.kz" className="text-green-600 hover:text-green-700 font-medium">
                    info@atlantsnabcity.kz
                  </a>
                  <p className="text-gray-600 text-sm mt-1">Ответим в течение часа</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-orange-50 rounded-2xl">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Адрес</h4>
                  <p className="text-gray-700">г. Алматы, Казахстан</p>
                  <p className="text-gray-600 text-sm mt-1">Офис и склад</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-purple-50 rounded-2xl">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Режим работы</h4>
                  <p className="text-gray-700">Пн-Пт: 9:00 - 18:00</p>
                  <p className="text-gray-700">Сб-Вс: по договоренности</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 p-10 rounded-3xl text-white">
            <h3 className="text-3xl font-bold mb-6">Нужна помощь?</h3>
            <p className="text-blue-100 mb-8 text-lg leading-relaxed">
              Оставьте заявку, и наш менеджер свяжется с вами в течение 15 минут 
              для консультации и расчета стоимости
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4">
                <MessageCircle className="h-6 w-6 text-orange-300" />
                <span>Бесплатная консультация специалиста</span>
              </div>
              <div className="flex items-center space-x-4">
                <Send className="h-6 w-6 text-orange-300" />
                <span>Быстрый расчет стоимости</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-orange-300" />
                <span>Звонок в течение 15 минут</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => openModal('Заказать звонок - Контакты')}
                className="w-full bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all"
              >
                Заказать звонок
              </button>
              <button
                onClick={() => openModal('Получить расчет - Контакты')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
              >
                Получить расчет
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;