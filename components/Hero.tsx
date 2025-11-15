"use client";

import React from "react";
import Image from "next/image";
import heroImage from "@/images/hero.png";

export default function Hero() {
  return (
    <section className="relative medical-gradient text-white overflow-hidden min-h-[500px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-15">
        <Image
          src={heroImage}
          alt="Hero Background"
          fill
          className="object-cover object-right"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/90 to-transparent"></div>
      </div>

      {/* Medical Pattern Overlay */}
      <div className="absolute inset-0 medical-pattern"></div>

      {/* Floating Medical Icons */}
      <div className="absolute top-20 right-20 pulse-medical hidden lg:block">
        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <svg className="w-10 h-10 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-block medical-badge mb-5 animate-pulse">
            ✓ Sertifikalı Uzman Kadro
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight drop-shadow-lg">
            7/24 Evde ve Klinik
            <span className="block text-[#14b8a6]">Sağlık Hizmeti</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-100 leading-relaxed">
            Serum takma, enjeksiyon, hemşirelik hizmetleri ve daha fazlası. 
            Uzman hemşirelerimizle yanınızdayız.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/randevu" className="btn-medical text-center">
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Hemen Randevu Al
              </span>
            </a>
            <a href="tel:+905334866111" className="bg-white text-[#1e3a5f] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +90 533 486 61 11
            </a>
          </div>
        </div>
      </div>

      {/* Stats Section - Integrated into Hero */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">
                10+
              </div>
              <div className="text-xs md:text-sm tracking-wider text-gray-200 font-semibold">
                YIL DENEYİM
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">
                500+
              </div>
              <div className="text-xs md:text-sm tracking-wider text-gray-200 font-semibold">
                MEMNUN HASTA
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">
                15
              </div>
              <div className="text-xs md:text-sm tracking-wider text-gray-200 font-semibold">
                UZMAN HEMŞİRE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

