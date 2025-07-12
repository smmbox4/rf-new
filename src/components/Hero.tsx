import React from 'react';
import { ArrowRight, CheckCircle, Truck, Clock, Shield, Star } from 'lucide-react';
import { useCallModal } from '../contexts/CallModalContext';

const Hero: React.FC = () => {
  const { openModal } = useCallModal();

  const scrollToCalculator = () => {
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-orange-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-flex items-center bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-6 py-3 mb-8">
              <Star className="h-5 w-5 text-orange-400 mr-2" />
              <span className="text-orange-300 font-semibold">Лидер поставок металлопроката</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Металлопрокат
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                из России
              </span>
              <br />
              <span className="text-white text-3xl lg:text-4xl">
                в Казахстан
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
              Прямые поставки стальных кругов, труб и профильных труб. 
              <span className="text-orange-300 font-semibold"> Доставка 5-10 дней</span> по всему Казахстану
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-blue-100">1000+ позиций в наличии</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-blue-100">Доставка по всему КЗ</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-blue-100">Быстрая отгрузка</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-blue-100">Гарантия качества</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToCalculator}
                className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
              >
                <span className="flex items-center justify-center">
                  Рассчитать стоимость
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={() => openModal('Заказать звонок - Главный экран')}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                Заказать звонок
              </button>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl text-center">
              <div className="text-4xl lg:text-5xl font-bold text-orange-400 mb-2">1000+</div>
              <div className="text-blue-100 font-medium">позиций металлопроката</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl text-center">
              <div className="text-4xl lg:text-5xl font-bold text-green-400 mb-2">5-10</div>
              <div className="text-blue-100 font-medium">дней доставка</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl text-center">
              <div className="text-4xl lg:text-5xl font-bold text-blue-400 mb-2">15%</div>
              <div className="text-blue-100 font-medium">экономия от рынка</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl text-center">
              <div className="text-4xl lg:text-5xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-blue-100 font-medium">консультации</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;