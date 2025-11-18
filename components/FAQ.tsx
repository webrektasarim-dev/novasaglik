"use client";

import React, { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FAQ() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language } = useLanguage();

  const content = {
    tr: {
      title: "Sıkça Sorulan Sorular",
      description: "Merak ettiğiniz soruların cevaplarını burada bulabilirsiniz",
      moreQuestion: "Başka bir sorunuz mu var?",
      contact: "Bize Ulaşın",
      faqs: [
        {
          question: "Hizmetleriniz hangi bölgelerde mevcut?",
          answer: "Şu anda İstanbul ve çevresinde hizmet veriyoruz. Tüm İstanbul ilçelerinde evde sağlık hizmeti sunuyoruz. İstanbul dışı talepler için lütfen bizimle iletişime geçin.",
        },
        {
          question: "Randevu için ne kadar önceden haber vermem gerekiyor?",
          answer: "Acil durumlar için 7/24 hizmetimiz mevcuttur ve mümkün olduğunca kısa sürede size ulaşmaya çalışırız. Planlı randevular için en az 24 saat önceden haber vermenizi öneririz.",
        },
        {
          question: "Fiyatlandırma nasıl yapılıyor?",
          answer: "Hizmetlerimiz için şeffaf ve erişilebilir fiyatlandırma sunuyoruz. Fiyatlar, hizmetin türüne, süresine ve gereksinimlere göre değişiklik gösterebilir. Detaylı fiyat bilgisi için bizimle iletişime geçebilirsiniz.",
        },
        {
          question: "Hemşireleriniz sertifikalı mı?",
          answer: "Evet, tüm hemşirelerimiz üniversite mezunu, sertifikalı ve lisanslı sağlık profesyonelleridir. Ekipteki her hemşire, alanında deneyimli ve sürekli eğitim almaktadır.",
        },
        {
          question: "Sigorta kapsamında mı?",
          answer: "Bazı sigorta şirketleri evde sağlık hizmetlerini kapsamaktadır. Sigortanızın kapsamı hakkında detaylı bilgi için bizimle iletişime geçin, size yardımcı olalım.",
        },
        {
          question: "Evde hangi malzemeler hazır olmalı?",
          answer: "Gerekli tüm medikal malzemeleri ve ekipmanları biz temin ediyoruz. Sizden sadece temiz ve uygun bir ortam hazırlamanızı rica ediyoruz. Özel bir durum varsa randevu öncesi size bilgi veririz.",
        },
      ],
    },
    en: {
      title: "Frequently Asked Questions",
      description: "Find answers to the most common questions about our services.",
      moreQuestion: "Need more information?",
      contact: "Contact Us",
      faqs: [
        {
          question: "Which areas do you serve?",
          answer: "We currently operate across Istanbul and surrounding districts. For requests outside the city, please contact us to plan the visit together.",
        },
        {
          question: "How early should I book an appointment?",
          answer: "We provide 24/7 urgent support and try to reach you as soon as possible. For planned visits we recommend notifying us at least 24 hours in advance.",
        },
        {
          question: "How is pricing determined?",
          answer: "We offer transparent and accessible pricing. Fees vary depending on the service type, duration, and specific needs. Contact us for a detailed quote.",
        },
        {
          question: "Are your nurses certified?",
          answer: "Yes, all of our nurses are university graduates, certified and licensed health professionals who continue regular training.",
        },
        {
          question: "Is the service covered by insurance?",
          answer: "Some insurance companies cover at-home healthcare. Reach out so we can guide you based on your provider’s coverage.",
        },
        {
          question: "Do we need to prepare any equipment?",
          answer: "We supply all required medical materials and equipment. We just ask for a clean, suitable space. If any special preparation is needed, we inform you beforehand.",
        },
      ],
    },
    ru: {
      title: "Часто задаваемые вопросы",
      description: "Здесь вы найдёте ответы на самые популярные вопросы об услугах.",
      moreQuestion: "Нужна дополнительная информация?",
      contact: "Связаться с нами",
      faqs: [
        {
          question: "В каких районах вы работаете?",
          answer: "Мы обслуживаем Стамбул и ближайшие районы. Для вызовов за пределами города свяжитесь с нами для согласования визита.",
        },
        {
          question: "За сколько времени нужно бронировать визит?",
          answer: "В экстренных случаях мы доступны 24/7. Для плановых обращений рекомендуем сообщать минимум за 24 часа.",
        },
        {
          question: "Как формируется стоимость?",
          answer: "Мы придерживаемся прозрачного и доступного ценообразования. Стоимость зависит от типа услуги, длительности и индивидуальных потребностей. Свяжитесь с нами для детального расчёта.",
        },
        {
          question: "Ваши медсёстры имеют сертификаты?",
          answer: "Да, все наши медсёстры — дипломированные и лицензированные специалисты, регулярно проходящие обучение.",
        },
        {
          question: "Работаете ли вы со страховыми компаниями?",
          answer: "Некоторые страховые покрывают домашний уход. Мы готовы помочь уточнить условия вашего полиса.",
        },
        {
          question: "Нужно ли готовить оборудование дома?",
          answer: "Мы привозим всё необходимое. Достаточно подготовить чистое и удобное пространство. Если требуется особая подготовка, мы заранее сообщим.",
        },
      ],
    },
    ar: {
      title: "الأسئلة الشائعة",
      description: "تعرّف على إجابات الأسئلة الأكثر تداولًا حول خدماتنا.",
      moreQuestion: "هل لديك سؤال آخر؟",
      contact: "تواصل معنا",
      faqs: [
        {
          question: "ما هي المناطق التي تقدمون فيها خدماتكم؟",
          answer: "نخدم جميع مناطق إسطنبول والمناطق المجاورة. للحجوزات خارج المدينة يرجى التواصل معنا للتنسيق.",
        },
        {
          question: "متى يجب حجز الموعد؟",
          answer: "نقدم دعماً على مدار الساعة للحالات الطارئة، وللحجوزات المسبقة يُفضَّل التواصل قبل 24 ساعة.",
        },
        {
          question: "كيف يتم تحديد الأسعار؟",
          answer: "نلتزم بالتسعير الشفاف والمناسب، ويتغير السعر حسب نوع الخدمة ومدة الزيارة واحتياجاتكم الخاصة.",
        },
        {
          question: "هل الممرضات معتمدات؟",
          answer: "جميع الممرضات والممرضين لدينا حاصلون على شهادات معترف بها ويتلقّون تدريبات مستمرة.",
        },
        {
          question: "هل يشمل التأمين هذه الخدمات؟",
          answer: "بعض شركات التأمين تغطي خدمات الرعاية المنزلية. يمكننا مساعدتك في التحقق من بوليصة التأمين الخاصة بك.",
        },
        {
          question: "هل يجب تحضير أدوات أو معدات؟",
          answer: "نحن نحضر جميع الأدوات الطبية المطلوبة، ونطلب فقط توفير مساحة نظيفة ومناسبة. وإذا كانت هناك تجهيزات خاصة سنخبرك مسبقًا.",
        },
      ],
    },
  }[language];

  return (
    <section ref={ref} className={`py-20 bg-gray-50 ${isVisible ? 'scroll-animate-right visible' : 'scroll-animate-right'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {content.faqs.map((faq, index) => (
            <div
              key={index}
              className="module-card overflow-hidden module-fade-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-[#14b8a6] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">{content.moreQuestion}</p>
          <a
            href="/iletisim"
            className="inline-flex items-center gap-2 text-[#14b8a6] hover:text-[#0d9488] font-semibold"
          >
            {content.contact}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

