"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function IletisimPage() {
  const { language } = useLanguage();
  const texts = {
    tr: {
      heroTitle: "İletişim",
      heroDescription: "Sizlere nasıl yardımcı olabiliriz? Sorularınız için bize ulaşın, en kısa sürede size dönüş yapalım.",
      contactTitle: "İletişim Bilgilerimiz",
      phoneLabel: "Telefon",
      phoneHelp: "7/24 Destek Hattı",
      whatsappLabel: "WhatsApp",
      whatsappHelp: "Hızlı mesajlaşma",
      emailLabel: "E-posta",
      emailHelp: "24 saat içinde yanıt",
      addressLabel: "Adres",
      addressText: "İstanbul / Avrupa Yakası",
      hoursLabel: "Çalışma Saatleri",
      hoursText: "Her Gün 24 Saat",
      hoursHelp: "Kesintisiz hizmet",
      formTitle: "Bize Mesaj Gönderin",
      nameLabel: "Ad Soyad *",
      namePlaceholder: "Adınızı ve soyadınızı girin",
      emailLabelForm: "E-posta *",
      emailPlaceholder: "ornek@email.com",
      phoneLabelForm: "Telefon *",
      phonePlaceholder: "05XX XXX XX XX",
      subjectLabel: "Konu *",
      subjectPlaceholder: "Konu seçiniz",
      messageLabel: "Mesajınız *",
      messagePlaceholder: "Mesajınızı buraya yazın...",
      submit: "Mesajı Gönder",
      mapTitle: "Ofis Konumumuz",
      mapSubtitle: "İstanbul / Avrupa Yakası",
      faqTitle: "Sıkça Sorulan Sorular",
      faq: [
        {
          q: "Hizmetleriniz hangi bölgeleri kapsıyor?",
          a: "İstanbul'un tüm ilçelerine hizmet vermekteyiz. Acil durumlar için 7/24 ulaşılabiliyoruz.",
        },
        {
          q: "Randevu almak için ne kadar önceden başvurmalıyım?",
          a: "Rutin hizmetler için en az 24 saat önceden, acil durumlar için aynı gün randevu alabilirsiniz.",
        },
        {
          q: "Evde sağlık hizmeti güvenli mi?",
          a: "Evet, tüm hemşirelerimiz sertifikalı ve deneyimlidir. Steril ekipman kullanımı ve hijyen kurallarına tam uyum sağlanır. Güvenliğiniz bizim önceliğimizdir.",
        },
        {
          q: "Hemşireleriniz sertifikalı mı?",
          a: "Evet, tüm hemşirelerimiz lisanslı ve sertifikalıdır. Düzenli eğitimlerle kendilerini geliştirmektedirler.",
        },
      ],
      alertSuccess: "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
      alertError: "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
      alertUnknown: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
      subjectOptions: [
        { value: "", label: "Konu seçiniz" },
        { value: "randevu", label: "Randevu Talebi" },
        { value: "bilgi", label: "Bilgi Almak İstiyorum" },
        { value: "fiyat", label: "Fiyat Teklifi" },
        { value: "sikayet", label: "Şikayet/Öneri" },
        { value: "diger", label: "Diğer" },
      ],
    },
    en: {
      heroTitle: "Contact",
      heroDescription: "How can we help you today? Send us a message and we will respond as soon as possible.",
      contactTitle: "Contact Information",
      phoneLabel: "Phone",
      phoneHelp: "24/7 Support Line",
      whatsappLabel: "WhatsApp",
      whatsappHelp: "Instant messaging",
      emailLabel: "Email",
      emailHelp: "Response within 24 hours",
      addressLabel: "Address",
      addressText: "Istanbul / European Side",
      hoursLabel: "Working Hours",
      hoursText: "24/7 Service",
      hoursHelp: "Continuous support",
      formTitle: "Send Us a Message",
      nameLabel: "Full Name *",
      namePlaceholder: "Enter your full name",
      emailLabelForm: "Email *",
      emailPlaceholder: "name@example.com",
      phoneLabelForm: "Phone *",
      phonePlaceholder: "+90 5XX XXX XX XX",
      subjectLabel: "Subject *",
      subjectPlaceholder: "Select a subject",
      messageLabel: "Message *",
      messagePlaceholder: "Write your message here...",
      submit: "Send Message",
      mapTitle: "Our Office Location",
      mapSubtitle: "Istanbul / European Side",
      faqTitle: "Frequently Asked Questions",
      faq: [
        {
          q: "Which areas do you cover?",
          a: "We serve every district of Istanbul and offer 24/7 availability for urgent cases.",
        },
        {
          q: "How early should I request an appointment?",
          a: "Please reach out at least 24 hours in advance for routine visits; same-day bookings are possible for urgent needs.",
        },
        {
          q: "Is at-home healthcare safe?",
          a: "Yes. All of our nurses are certified and experienced. We strictly follow sterile equipment and hygiene protocols.",
        },
        {
          q: "Are your nurses licensed?",
          a: "Absolutely. Our nurses are fully licensed and receive continuous training.",
        },
      ],
      alertSuccess: "Your message has been sent! We will contact you shortly.",
      alertError: "An error occurred while sending your message. Please try again.",
      alertUnknown: "Something went wrong. Please try again later.",
      subjectOptions: [
        { value: "", label: "Select a subject" },
        { value: "randevu", label: "Appointment Request" },
        { value: "bilgi", label: "Request Information" },
        { value: "fiyat", label: "Pricing Inquiry" },
        { value: "sikayet", label: "Feedback / Complaint" },
        { value: "diger", label: "Other" },
      ],
    },
    ru: {
      heroTitle: "Связаться с нами",
      heroDescription: "Как мы можем помочь? Оставьте сообщение, и мы ответим в ближайшее время.",
      contactTitle: "Контактная информация",
      phoneLabel: "Телефон",
      phoneHelp: "Круглосуточная линия",
      whatsappLabel: "WhatsApp",
      whatsappHelp: "Быстрая переписка",
      emailLabel: "Email",
      emailHelp: "Ответ в течение 24 часов",
      addressLabel: "Адрес",
      addressText: "Стамбул / Европейская сторона",
      hoursLabel: "Часы работы",
      hoursText: "24/7",
      hoursHelp: "Без перерывов",
      formTitle: "Отправьте нам сообщение",
      nameLabel: "Имя и фамилия *",
      namePlaceholder: "Укажите ваши имя и фамилию",
      emailLabelForm: "Email *",
      emailPlaceholder: "example@mail.com",
      phoneLabelForm: "Телефон *",
      phonePlaceholder: "+90 5XX XXX XX XX",
      subjectLabel: "Тема *",
      subjectPlaceholder: "Выберите тему",
      messageLabel: "Сообщение *",
      messagePlaceholder: "Напишите ваше сообщение...",
      submit: "Отправить",
      mapTitle: "Наш офис",
      mapSubtitle: "Стамбул / Европейская сторона",
      faqTitle: "Часто задаваемые вопросы",
      faq: [
        { q: "В каких районах вы работаете?", a: "Мы обслуживаем все округа Стамбула и доступны 24/7 для срочных запросов." },
        { q: "За сколько времени нужно записываться?", a: "Для плановых услуг просим связываться минимум за 24 часа. Срочные вызовы возможны в тот же день." },
        { q: "Безопасна ли домашняя помощь?", a: "Да. Все наши медсёстры сертифицированы и строго соблюдают гигиенические протоколы." },
        { q: "Ваши медсёстры лицензированы?", a: "Да, все специалисты имеют дипломы и проходят регулярное обучение." },
      ],
      alertSuccess: "Ваше сообщение отправлено! Мы свяжемся с вами совсем скоро.",
      alertError: "Произошла ошибка при отправке сообщения. Попробуйте ещё раз.",
      alertUnknown: "Что-то пошло не так. Попробуйте позже.",
      subjectOptions: [
        { value: "", label: "Выберите тему" },
        { value: "randevu", label: "Запрос на визит" },
        { value: "bilgi", label: "Хочу получить информацию" },
        { value: "fiyat", label: "Запрос стоимости" },
        { value: "sikayet", label: "Обратная связь / Жалоба" },
        { value: "diger", label: "Другое" },
      ],
    },
    ar: {
      heroTitle: "تواصل معنا",
      heroDescription: "أخبرنا كيف يمكننا مساعدتك، وسنعود إليك في أقرب وقت ممكن.",
      contactTitle: "معلومات التواصل",
      phoneLabel: "الهاتف",
      phoneHelp: "خط دعم 24/7",
      whatsappLabel: "واتساب",
      whatsappHelp: "مراسلة فورية",
      emailLabel: "البريد الإلكتروني",
      emailHelp: "نرد خلال 24 ساعة",
      addressLabel: "العنوان",
      addressText: "إسطنبول / الجانب الأوروبي",
      hoursLabel: "ساعات العمل",
      hoursText: "خدمة 24/7",
      hoursHelp: "دعم مستمر",
      formTitle: "أرسل لنا رسالة",
      nameLabel: "الاسم الكامل *",
      namePlaceholder: "اكتب اسمك بالكامل",
      emailLabelForm: "البريد الإلكتروني *",
      emailPlaceholder: "example@mail.com",
      phoneLabelForm: "رقم الهاتف *",
      phonePlaceholder: "+90 5XX XXX XX XX",
      subjectLabel: "الموضوع *",
      subjectPlaceholder: "اختر الموضوع",
      messageLabel: "الرسالة *",
      messagePlaceholder: "اكتب رسالتك هنا...",
      submit: "إرسال الرسالة",
      mapTitle: "موقع مكتبنا",
      mapSubtitle: "إسطنبول / الجانب الأوروبي",
      faqTitle: "الأسئلة الشائعة",
      faq: [
        { q: "ما هي المناطق التي تغطونها؟", a: "نخدم جميع أحياء إسطنبول ونوفر دعماً عاجلاً على مدار الساعة." },
        { q: "متى يجب حجز الموعد؟", a: "للحجوزات المخطط لها نفضل التواصل قبل 24 ساعة، وفي الحالات الطارئة يمكننا الحضور في نفس اليوم." },
        { q: "هل الرعاية المنزلية آمنة؟", a: "نعم، جميع ممرضينا معتمدون ونلتزم بإجراءات التعقيم والنظافة بشكل صارم." },
        { q: "هل الطاقم التمريضي مرخّص؟", a: "كل أفراد الفريق حاصلون على تراخيص رسمية ويتلقون تدريبات مستمرة." },
      ],
      alertSuccess: "تم إرسال رسالتك! سنتواصل معك قريباً.",
      alertError: "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      alertUnknown: "حدث خطأ غير متوقع. حاول لاحقاً.",
      subjectOptions: [
        { value: "", label: "اختر الموضوع" },
        { value: "randevu", label: "طلب موعد" },
        { value: "bilgi", label: "أرغب بالمزيد من المعلومات" },
        { value: "fiyat", label: "استفسار عن الأسعار" },
        { value: "sikayet", label: "ملاحظات / شكوى" },
        { value: "diger", label: "أخرى" },
      ],
    },
  }[language];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert(texts.alertSuccess);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        alert(texts.alertError);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(texts.alertUnknown);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a6f] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {texts.heroTitle}
            </h1>
            <p className="text-xl text-gray-200">
              {texts.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                {texts.contactTitle}
              </h2>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-[#14b8a6] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{texts.phoneLabel}</h3>
                    <a href="tel:+905334866111" className="text-gray-600 hover:text-[#14b8a6] transition-colors font-semibold">
                      +90 533 486 61 11
                    </a>
                    <p className="text-sm text-gray-500 mt-1">{texts.phoneHelp}</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{texts.whatsappLabel}</h3>
                    <a href="https://wa.me/905334866111" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#25D366] transition-colors font-semibold">
                      +90 533 486 61 11
                    </a>
                    <p className="text-sm text-gray-500 mt-1">{texts.whatsappHelp}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-[#14b8a6] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{texts.emailLabel}</h3>
                    <a href="mailto:info@novasaglikhizmeti.com" className="text-gray-600 hover:text-[#14b8a6] transition-colors font-semibold">
                      info@novasaglikhizmeti.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">{texts.emailHelp}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-[#14b8a6] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{texts.addressLabel}</h3>
                    <p className="text-gray-600">
                      {texts.addressText}
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-[#14b8a6] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{texts.hoursLabel}</h3>
                    <p className="text-gray-600">{texts.hoursText}</p>
                    <p className="text-sm text-gray-500 mt-1">{texts.hoursHelp}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-gray-50 p-8 rounded-xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  {texts.formTitle}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                      {texts.nameLabel}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none"
                      placeholder={texts.namePlaceholder}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                      {texts.emailLabelForm}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none"
                      placeholder={texts.emailPlaceholder}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                      {texts.phoneLabelForm}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none"
                      placeholder={texts.phonePlaceholder}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
                      {texts.subjectLabel}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none"
                    >
                      {texts.subjectOptions.map((option) => (
                        <option key={option.value || "placeholder"} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                      {texts.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none resize-none"
                      placeholder={texts.messagePlaceholder}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-white py-4 rounded-lg font-semibold transition-colors text-lg"
                  >
                    {texts.submit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {texts.mapTitle}
          </h2>
          <div className="h-96 bg-gray-300 rounded-xl overflow-hidden">
            <iframe
              title="İstanbul Konumu"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Istanbul%20Turkey&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-center text-gray-600 mt-4">{texts.mapSubtitle}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            {texts.faqTitle}
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {texts.faq.map((item, index) => (
              <details className="bg-gray-50 p-6 rounded-lg" key={`${language}-faq-${index}`}>
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  {item.q}
                </summary>
                <p className="text-gray-600 mt-3">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

