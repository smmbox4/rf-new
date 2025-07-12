import React from 'react';
import { Award, Users, Truck, Shield, Clock, Target, Factory, Globe } from 'lucide-react';
import { useCallModal } from '../contexts/CallModalContext';

const About: React.FC = () => {
  const { openModal } = useCallModal();

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            О компании <span className="text-blue-600">АТЛАНТ Снаб Сити</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Мы являемся надежным поставщиком металлопроката из России в Казахстан. 
            Наша компания специализируется на прямых поставках качественной продукции 
            с гарантией и быстрой доставкой.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Factory className="h-8 w-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-600 font-medium">лет на рынке</div>
          </div>

          <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-green-600 mb-2">5000+</div>
            <div className="text-gray-600 font-medium">довольных клиентов</div>
          </div>

          <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
            <div className="text-gray-600 font-medium">городов доставки</div>
          </div>

          <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
            <div className="text-gray-600 font-medium">тонн в месяц</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Наши преимущества</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Гарантия качества</h4>
                  <p className="text-gray-600">Вся продукция соответствует ГОСТ и имеет сертификаты качества</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Быстрая доставка</h4>
                  <p className="text-gray-600">Доставка по Казахстану от 5 до 10 дней с момента заказа</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Выгодные цены</h4>
                  <p className="text-gray-600">Прямые поставки от производителей без посредников</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Профессиональный сервис</h4>
                  <p className="text-gray-600">Консультации специалистов и помощь в выборе продукции</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-10 rounded-3xl text-white">
            <h3 className="text-3xl font-bold mb-6">Получите консультацию</h3>
            <p className="text-blue-100 mb-8 text-lg leading-relaxed">
              Наши специалисты помогут подобрать оптимальное решение для ваших задач 
              и рассчитают точную стоимость с доставкой
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>Бесплатная консультация</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>Расчет стоимости за 15 минут</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>Помощь в выборе продукции</span>
              </div>
            </div>
            <button
              onClick={() => openModal('Получить консультацию - О компании')}
              className="w-full bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all"
            >
              Получить консультацию
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;