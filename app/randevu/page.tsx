"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppointmentForm from "@/components/AppointmentForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RandevuPage() {
  const { language } = useLanguage();
  const texts = {
    tr: {
      heroTitle: "Online Randevu",
      heroDescription: "Hızlı ve kolay randevu sistemi ile size en uygun zamanı seçin. Uzman hemşirelerimiz en kısa sürede sizinle iletişime geçecektir.",
      processTitle: "Randevu Süreci Nasıl İşler?",
      steps: [
        { title: "Form Doldurun", desc: "Yukarıdaki formu eksiksiz doldurun" },
        { title: "Onay Bekleyin", desc: "Ekibimiz talebinizi değerlendirir" },
        { title: "Hizmet Alın", desc: "Uzman hemşiremiz randevunuzda" },
      ],
      emergencyTitle: "Acil Durum mu?",
      emergencyDesc: "7/24 destek hattımızdan hemen ulaşın",
      phoneLabel: "Telefon",
      phoneHelp: "7/24 Destek Hattı",
      whatsappLabel: "WhatsApp",
      whatsappHelp: "Hemen Mesaj",
    },
    en: {
      heroTitle: "Online Appointment",
      heroDescription: "Pick the time that suits you best. Our expert nurses will reach out right away.",
      processTitle: "How Does the Appointment Process Work?",
      steps: [
        { title: "Fill the Form", desc: "Complete the form above with your details" },
        { title: "Await Confirmation", desc: "Our team reviews your request" },
        { title: "Receive Care", desc: "Our nurse arrives at the scheduled time" },
      ],
      emergencyTitle: "Emergency?",
      emergencyDesc: "Contact our 24/7 hotline immediately",
      phoneLabel: "Phone",
      phoneHelp: "24/7 Support Line",
      whatsappLabel: "WhatsApp",
      whatsappHelp: "Message Now",
    },
    ru: {
      heroTitle: "Онлайн-запись",
      heroDescription: "Выберите удобное время. Наши медсёстры свяжутся с вами в ближайшее время.",
      processTitle: "Как проходит запись?",
      steps: [
        { title: "Заполните форму", desc: "Укажите свои данные и пожелания" },
        { title: "Ожидайте подтверждения", desc: "Мы свяжемся и согласуем время" },
        { title: "Получите услугу", desc: "Медсестра приедет в назначенный час" },
      ],
      emergencyTitle: "Срочный случай?",
      emergencyDesc: "Позвоните на нашу круглосуточную линию",
      phoneLabel: "Телефон",
      phoneHelp: "24/7 линия поддержки",
      whatsappLabel: "WhatsApp",
      whatsappHelp: "Написать сейчас",
    },
    ar: {
      heroTitle: "حجز موعد إلكتروني",
      heroDescription: "اختر الوقت الأنسب لك وسيتواصل معك فريقنا التمريضي مباشرة.",
      processTitle: "كيف تتم عملية الحجز؟",
      steps: [
        { title: "املأ النموذج", desc: "اكتب بياناتك واحتياجاتك بالكامل" },
        { title: "انتظر التأكيد", desc: "يتواصل فريقنا لتأكيد الموعد" },
        { title: "استقبل الخدمة", desc: "تصل الممرضة في الوقت المحدد" },
      ],
      emergencyTitle: "حالة طارئة؟",
      emergencyDesc: "اتصل بخط الدعم المتاح 24/7 فوراً",
      phoneLabel: "الهاتف",
      phoneHelp: "خط دعم 24/7",
      whatsappLabel: "واتساب",
      whatsappHelp: "راسلنا الآن",
    },
  }[language];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="medical-gradient text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 medical-pattern"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {texts.heroTitle}
            </h1>
            <p className="text-xl text-gray-200">
              {texts.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AppointmentForm />
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {texts.processTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {texts.steps.map((step, idx) => (
                <div className="text-center" key={`${language}-step-${idx}`}>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#14b8a6] to-[#10b981] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="medical-card max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{texts.emergencyTitle}</h3>
              <p className="text-gray-600">{texts.emergencyDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="tel:+905334866111"
                className="flex items-center justify-center gap-3 p-6 bg-gradient-to-br from-[#14b8a6] to-[#10b981] text-white rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="text-left">
                  <div className="text-sm opacity-90">{texts.phoneLabel}</div>
                  <div className="text-xl font-bold">+90 533 486 61 11</div>
                  <p className="text-xs text-white/80">{texts.phoneHelp}</p>
                </div>
              </a>
              <a
                href="https://wa.me/905334866111"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-6 bg-[#25D366] text-white rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div className="text-left">
                  <div className="text-sm opacity-90">{texts.whatsappLabel}</div>
                  <div className="text-xl font-bold">{texts.whatsappHelp}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

