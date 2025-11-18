"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AppointmentFormProps {
  defaultService?: string;
}

interface ServiceLabels {
  [key: string]: string;
}

const serviceOptions: { value: string; labels: ServiceLabels }[] = [
  {
    value: 'Serum Takma',
    labels: {
      tr: 'Serum Takma',
      en: 'IV Therapy',
      ru: 'Внутривенная терапия',
      ar: 'العلاج الوريدي',
    },
  },
  {
    value: 'Enjeksiyon Hizmeti',
    labels: {
      tr: 'Enjeksiyon Hizmeti',
      en: 'Injection Service',
      ru: 'Инъекционные услуги',
      ar: 'خدمة الحقن',
    },
  },
  {
    value: 'Hemşirelik Hizmetleri',
    labels: {
      tr: 'Hemşirelik Hizmetleri',
      en: 'Nursing Care',
      ru: 'Сестринский уход',
      ar: 'الرعاية التمريضية',
    },
  },
  {
    value: 'Yara Bakımı',
    labels: {
      tr: 'Yara Bakımı',
      en: 'Wound Care',
      ru: 'Уход за ранами',
      ar: 'العناية بالجروح',
    },
  },
  {
    value: 'Sonda ve Kateter Bakımı',
    labels: {
      tr: 'Sonda ve Kateter Bakımı',
      en: 'Catheter Care',
      ru: 'Уход за катетерами',
      ar: 'العناية بالقساطر',
    },
  },
  {
    value: 'Tansiyon ve Şeker Ölçümü',
    labels: {
      tr: 'Tansiyon ve Şeker Ölçümü',
      en: 'Vital & Glucose Monitoring',
      ru: 'Контроль давления и сахара',
      ar: 'قياس الضغط والسكر',
    },
  },
  {
    value: 'Taburcu Sonrası Bakım',
    labels: {
      tr: 'Taburcu Sonrası Bakım',
      en: 'Post-Discharge Care',
      ru: 'Уход после выписки',
      ar: 'الرعاية بعد الخروج من المستشفى',
    },
  },
  {
    value: 'Yaşlı Bakımı',
    labels: {
      tr: 'Yaşlı Bakımı',
      en: 'Elderly Care',
      ru: 'Уход за пожилыми',
      ar: 'رعاية كبار السن',
    },
  },
  {
    value: 'Fizik Tedavi Desteği',
    labels: {
      tr: 'Fizik Tedavi Desteği',
      en: 'Physiotherapy Support',
      ru: 'Поддержка физиотерапии',
      ar: 'دعم العلاج الطبيعي',
    },
  },
];

export default function AppointmentForm({ defaultService }: AppointmentFormProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService || '',
    date: '',
    time: '',
    message: ''
  });
  
  useEffect(() => {
    if (defaultService) {
      setFormData(prev => ({ ...prev, service: defaultService }));
    }
  }, [defaultService]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const texts = {
    tr: {
      title: 'Randevu Talebi',
      subtitle: 'Formu doldurun, size en kısa sürede dönüş yapalım',
      nameLabel: 'Ad Soyad *',
      namePlaceholder: 'Adınızı ve soyadınızı girin',
      emailLabel: 'E-posta *',
      emailPlaceholder: 'ornek@email.com',
      phoneLabel: 'Telefon *',
      phonePlaceholder: '05XX XXX XX XX',
      serviceLabel: 'Hizmet *',
      servicePlaceholder: 'Hizmet seçin',
      dateLabel: 'Tarih *',
      timeLabel: 'Saat *',
      timePlaceholder: 'Saat seçin',
      messageLabel: 'Mesajınız (Opsiyonel)',
      messagePlaceholder: 'Eklemek istediğiniz notlar...',
      submit: 'Randevu Talebini Gönder',
      sending: 'Gönderiliyor...',
      successTitle: 'Randevunuz Alındı!',
      successDesc: 'En kısa sürede size dönüş yapacağız.',
      errorConflict: 'Bu saatte zaten bir randevu var. Lütfen başka bir saat seçin.',
      errorGeneric: 'Randevu oluşturulurken hata oluştu',
      errorUnknown: 'Bir hata oluştu',
      emergency: '📞 Acil durumlar için:',
    },
    en: {
      title: 'Appointment Request',
      subtitle: 'Fill out the form and we will get back to you shortly.',
      nameLabel: 'Full Name *',
      namePlaceholder: 'Enter your first and last name',
      emailLabel: 'Email *',
      emailPlaceholder: 'name@example.com',
      phoneLabel: 'Phone *',
      phonePlaceholder: '+90 5XX XXX XX XX',
      serviceLabel: 'Service *',
      servicePlaceholder: 'Select a service',
      dateLabel: 'Date *',
      timeLabel: 'Time *',
      timePlaceholder: 'Choose a time',
      messageLabel: 'Message (Optional)',
      messagePlaceholder: 'Add any notes you would like us to know...',
      submit: 'Send Appointment Request',
      sending: 'Sending...',
      successTitle: 'Request Received!',
      successDesc: 'We will reach out to you very soon.',
      errorConflict: 'There is already an appointment at this time. Please choose another time.',
      errorGeneric: 'An error occurred while creating the appointment.',
      errorUnknown: 'An unexpected error occurred.',
      emergency: '📞 For emergencies:',
    },
    ru: {
      title: 'Заявка на приём',
      subtitle: 'Заполните форму, и мы свяжемся с вами в ближайшее время.',
      nameLabel: 'Имя и фамилия *',
      namePlaceholder: 'Укажите ваши имя и фамилию',
      emailLabel: 'Email *',
      emailPlaceholder: 'example@mail.com',
      phoneLabel: 'Телефон *',
      phonePlaceholder: '+90 5XX XXX XX XX',
      serviceLabel: 'Услуга *',
      servicePlaceholder: 'Выберите услугу',
      dateLabel: 'Дата *',
      timeLabel: 'Время *',
      timePlaceholder: 'Выберите удобное время',
      messageLabel: 'Комментарий (необязательно)',
      messagePlaceholder: 'Добавьте любую полезную информацию...',
      submit: 'Отправить заявку',
      sending: 'Отправляем...',
      successTitle: 'Заявка получена!',
      successDesc: 'Мы свяжемся с вами в самое ближайшее время.',
      errorConflict: 'На это время уже есть запись. Пожалуйста, выберите другое.',
      errorGeneric: 'Произошла ошибка при создании заявки.',
      errorUnknown: 'Произошла непредвиденная ошибка.',
      emergency: '📞 В экстренных случаях:',
    },
    ar: {
      title: 'طلب حجز موعد',
      subtitle: 'يرجى تعبئة النموذج وسنقوم بالتواصل معك في أسرع وقت.',
      nameLabel: 'الاسم الكامل *',
      namePlaceholder: 'اكتب اسمك الكامل',
      emailLabel: 'البريد الإلكتروني *',
      emailPlaceholder: 'example@mail.com',
      phoneLabel: 'رقم الهاتف *',
      phonePlaceholder: '+90 5XX XXX XX XX',
      serviceLabel: 'الخدمة *',
      servicePlaceholder: 'اختر الخدمة المطلوبة',
      dateLabel: 'التاريخ *',
      timeLabel: 'الوقت *',
      timePlaceholder: 'اختر وقتًا مناسبًا',
      messageLabel: 'ملاحظات إضافية (اختياري)',
      messagePlaceholder: 'اكتب تفاصيل أو احتياجات خاصة...',
      submit: 'إرسال طلب الحجز',
      sending: 'جاري الإرسال...',
      successTitle: 'تم استلام طلبك!',
      successDesc: 'سيتواصل معك فريقنا قريبًا.',
      errorConflict: 'هناك حجز آخر في هذا التوقيت، يرجى اختيار وقت مختلف.',
      errorGeneric: 'حدث خطأ أثناء إنشاء الحجز.',
      errorUnknown: 'حدث خطأ غير متوقع.',
      emergency: '📞 للحالات الطارئة:',
    },
  }[language];

  // Generate 24-hour time slots (00:00 to 23:00)
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const result = await res.json();
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          time: '',
          message: ''
        });
        
        setTimeout(() => setSuccess(false), 5000);
      } else {
        const error = await res.json();
        if (error.conflict) {
          alert(error.error || texts.errorConflict);
        } else {
          alert(error.error || texts.errorGeneric);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert(texts.errorUnknown);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Get today's date for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="medical-card max-w-3xl mx-auto">
      {success && (
        <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-bold text-green-800">{texts.successTitle}</h4>
              <p className="text-sm text-green-700">{texts.successDesc}</p>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#14b8a6] to-[#10b981] rounded-2xl mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{texts.title}</h2>
        <p className="text-gray-600">{texts.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              {texts.nameLabel}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none transition-colors"
              placeholder={texts.namePlaceholder}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              {texts.emailLabel}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none transition-colors"
              placeholder={texts.emailPlaceholder}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              {texts.phoneLabel}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none transition-colors"
              placeholder={texts.phonePlaceholder}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              {texts.serviceLabel}
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none transition-colors"
            >
              <option value="">{texts.servicePlaceholder}</option>
              {serviceOptions.map((service) => {
                const label = service.labels[language] ?? service.labels.tr;
                return (
                  <option key={service.value} value={service.value}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              {texts.dateLabel}
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={today}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              {texts.timeLabel}
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none transition-colors"
            >
              <option value="">{texts.timePlaceholder}</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            {texts.messageLabel}
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none resize-none transition-colors"
            placeholder={texts.messagePlaceholder}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-medical text-center disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {texts.sending}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {texts.submit}
            </span>
          )}
        </button>

        <p className="text-center text-sm text-gray-500">
          {texts.emergency} <a href="tel:+905334866111" className="text-[#14b8a6] hover:text-[#0d9488] font-semibold">+90 533 486 61 11</a>
        </p>
      </form>
    </div>
  );
}

