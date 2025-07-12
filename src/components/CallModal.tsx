import React, { useState, useEffect } from 'react';
import { X, Phone, User, MessageCircle, CheckCircle, Loader } from 'lucide-react';
import { useCallModal } from '../contexts/CallModalContext';
import { submitForm } from '../services/bitrixService';

const CallModal: React.FC = () => {
  const { isOpen, formType, closeModal } = useCallModal();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset form when modal closes
      setFormData({ name: '', phone: '', comment: '' });
      setIsSuccess(false);
      setError('');
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await submitForm({
        name: formData.name,
        phone: formData.phone,
        comment: formData.comment,
        formType: formType,
        source: 'Сайт АТЛАНТ Снаб Сити'
      });

      setIsSuccess(true);
      setTimeout(() => {
        closeModal();
      }, 3000);
    } catch (err) {
      setError('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-3xl relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-3 mb-2">
            <Phone className="h-6 w-6" />
            <h3 className="text-xl font-bold">Заказать звонок</h3>
          </div>
          <p className="text-blue-100 text-sm">
            Оставьте заявку и мы перезвоним в течение 15 минут
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Заявка отправлена!</h4>
              <p className="text-gray-600 mb-4">
                Наш менеджер свяжется с вами в течение 15 минут
              </p>
              <div className="text-sm text-gray-500">
                Окно закроется автоматически...
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ваше имя *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Введите ваше имя"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Номер телефона *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="+7 (777) 777-77-77"
                  />
                </div>
              </div>

              {/* Comment Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Комментарий
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Дополнительная информация..."
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader className="animate-spin h-5 w-5 mr-2" />
                    Отправляем...
                  </span>
                ) : (
                  'Заказать звонок'
                )}
              </button>

              {/* Privacy Notice */}
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных 
                и политикой конфиденциальности
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallModal;