import React, { useState } from 'react';
import { Phone, Menu, X, MapPin, Clock, Mail } from 'lucide-react';
import { useCallModal } from '../contexts/CallModalContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useCallModal();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Алматы, Казахстан</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Пн-Пт: 9:00-18:00</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@atlantsnabcity.kz</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <a href="tel:+77777777777" className="flex items-center space-x-2 hover:text-orange-300 transition-colors">
              <Phone className="h-4 w-4" />
              <span className="font-semibold">+7 (777) 777-77-77</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">А</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">АТЛАНТ Снаб Сити</h1>
                <p className="text-sm text-gray-600">Металлопрокат из России</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Главная
              </button>
              <button 
                onClick={() => scrollToSection('calculator')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Калькулятор
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                О компании
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Контакты
              </button>
            </nav>

            {/* Call Button */}
            <div className="hidden sm:flex items-center space-x-4">
              <button
                onClick={() => openModal('Заказать звонок - Шапка сайта')}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Заказать звонок
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              <button 
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Главная
              </button>
              <button 
                onClick={() => scrollToSection('calculator')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Калькулятор
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                О компании
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Контакты
              </button>
              <button
                onClick={() => openModal('Заказать звонок - Мобильное меню')}
                className="block w-full text-left px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-md font-semibold mt-2"
              >
                Заказать звонок
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;