import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useCallModal } from '../contexts/CallModalContext';

const Footer: React.FC = () => {
  const { openModal } = useCallModal();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">А</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">АТЛАНТ Снаб Сити</h3>
                <p className="text-gray-400">Металлопрокат из России</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Надежный поставщик металлопроката из России в Казахстан. 
              Прямые поставки, гарантия качества, быстрая доставка по всей стране.
            </p>
            <button
              onClick={() => openModal('Заказать звонок - Футер')}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Заказать звонок
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Быстрые ссылки</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Главная
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('calculator')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Калькулятор
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  О компании
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Контакты
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Контакты</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-400" />
                <a href="tel:+77777777777" className="text-gray-300 hover:text-white transition-colors">
                  +7 (777) 777-77-77
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-400" />
                <a href="mailto:info@atlantsnabcity.kz" className="text-gray-300 hover:text-white transition-colors">
                  info@atlantsnabcity.kz
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300">Алматы, Казахстан</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300">Пн-Пт: 9:00-18:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 АТЛАНТ Снаб Сити. Все права защищены.
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            Металлопрокат из России в Казахстан
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;