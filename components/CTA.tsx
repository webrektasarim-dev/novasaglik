"use client";

import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CTA() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  const { language } = useLanguage();

  const content = {
    tr: {
      badge: "⚡ Hızlı Randevu",
      title: (
        <>
          Sağlığınız İçin <span className="text-[#14b8a6]">Hemen</span> Randevu Alın
        </>
      ),
      description: "Uzman hemşirelerimiz, 7/24 evinizde veya kliniğimizde hizmetinizde. Hemen iletişime geçin, size en kısa sürede dönüş yapalım.",
      online: "Online Randevu",
      whatsapp: "WhatsApp Mesaj",
      schedule: "Pazartesi - Pazar: 00:00 - 24:00",
    },
    en: {
      badge: "⚡ Quick Appointment",
      title: (
        <>
          Book Your <span className="text-[#14b8a6]">Care Visit</span> Now
        </>
      ),
      description: "Our expert nurses are on-call 24/7 for in-home or clinical support. Reach out now and we’ll get back to you immediately.",
      online: "Book Online",
      whatsapp: "WhatsApp Message",
      schedule: "Monday - Sunday: 24/7",
    },
    ru: {
      badge: "⚡ Быстрая запись",
      title: (
        <>
          Запишитесь <span className="text-[#14b8a6]">на уход</span> прямо сейчас
        </>
      ),
      description: "Наши медсёстры дежурят 24/7 — дома или в клинике. Оставьте заявку, и мы свяжемся с вами в ближайшее время.",
      online: "Онлайн-запись",
      whatsapp: "Сообщение в WhatsApp",
      schedule: "Понедельник – воскресенье: круглосуточно",
    },
    ar: {
      badge: "⚡ موعد سريع",
      title: (
        <>
          احجز <span className="text-[#14b8a6]">زيارة الرعاية</span> الآن
        </>
      ),
      description: "فريقنا التمريضي متاح 24/7 للرعاية المنزلية أو داخل العيادة. تواصل معنا وسنرد عليك فوراً.",
      online: "احجز أونلاين",
      whatsapp: "رسالة واتساب",
      schedule: "السبت - الجمعة: متاح 24/7",
    },
  }[language];
  
  return (
    <section ref={ref} className={`relative medical-gradient py-10 overflow-hidden ${isVisible ? 'scroll-animate-right visible' : 'scroll-animate-right'}`}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 medical-pattern"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#14b8a6]/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#10b981]/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block medical-badge mb-4">
            {content.badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {content.title}
          </h2>
          <p className="text-lg text-gray-200 mb-6 leading-relaxed">
            {content.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="/randevu"
              className="bg-[#14b8a6] hover:bg-[#0d9488] text-white px-6 py-3 rounded-lg text-base font-semibold transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {content.online}
            </a>
            <a
              href="tel:+905334866111"
              className="bg-white text-[#1e3a5f] px-6 py-3 rounded-xl text-base font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +90 533 486 61 11
            </a>
            <a
              href="https://wa.me/905334866111"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3 rounded-lg text-base font-semibold transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {content.whatsapp}
            </a>
          </div>
          <p className="text-gray-300 text-xs mt-4">
            {content.schedule}
          </p>
        </div>
      </div>
    </section>
  );
}

