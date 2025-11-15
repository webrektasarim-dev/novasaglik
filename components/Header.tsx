"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoImage from "@/images/logo2.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#1a2f4a] text-white border-b border-[#2a4a6f]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <div className="relative w-32 h-16">
              <Image
                src={logoImage}
                alt="Nova Sağlık Hizmetleri"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Navigation & Action Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-12">
              <Link href="/" className="text-base font-medium tracking-wide hover:text-[#14b8a6] transition-colors">
                Ana Sayfa
              </Link>
              <Link href="/hizmetler" className="text-base font-medium tracking-wide hover:text-[#14b8a6] transition-colors">
                Hizmetler
              </Link>
              <Link href="/hakkimizda" className="text-base font-medium tracking-wide hover:text-[#14b8a6] transition-colors">
                Hakkımızda
              </Link>
              <Link href="/blog" className="text-base font-medium tracking-wide hover:text-[#14b8a6] transition-colors">
                Blog
              </Link>
              <Link href="/iletisim" className="text-base font-medium tracking-wide hover:text-[#14b8a6] transition-colors">
                İletişim
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <a href="/randevu" className="h-10 px-6 rounded-lg border-2 border-white flex items-center gap-2 hover:bg-white hover:bg-opacity-10 transition-colors">
                <svg className="w-5 h-5 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={2} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 2v4M8 2v4M3 10h18" />
                  <circle cx="8" cy="14" r="1" fill="currentColor" />
                  <circle cx="12" cy="14" r="1" fill="currentColor" />
                  <circle cx="16" cy="14" r="1" fill="currentColor" />
                </svg>
                <span className="text-sm font-medium">Randevu</span>
              </a>
              <a href="https://wa.me/905334866111" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-lg border-2 border-[#25D366] flex items-center justify-center transition-colors bg-[#25D366] hover:bg-[#20BA5A]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-base font-medium tracking-wide hover:text-[#14b8a6] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                href="/hizmetler"
                className="text-base font-medium tracking-wide hover:text-[#14b8a6] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hizmetler
              </Link>
              <Link
                href="/hakkimizda"
                className="text-base font-medium tracking-wide hover:text-[#14b8a6] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hakkımızda
              </Link>
              <Link
                href="/blog"
                className="text-base font-medium tracking-wide hover:text-[#14b8a6] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/iletisim"
                className="text-base font-medium tracking-wide hover:text-[#14b8a6] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                İletişim
              </Link>
              <div className="flex flex-col gap-3 pt-4 border-t border-[#2a4a6f]">
                <a href="/randevu" className="h-10 px-6 rounded-lg border-2 border-white flex items-center gap-2 hover:bg-white hover:bg-opacity-10 transition-colors justify-center">
                  <svg className="w-5 h-5 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={2} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 2v4M8 2v4M3 10h18" />
                    <circle cx="8" cy="14" r="1" fill="currentColor" />
                    <circle cx="12" cy="14" r="1" fill="currentColor" />
                    <circle cx="16" cy="14" r="1" fill="currentColor" />
                  </svg>
                  <span className="text-sm font-medium">Randevu</span>
                </a>
                <a href="https://wa.me/905334866111" target="_blank" rel="noopener noreferrer" className="h-10 px-6 rounded-lg border-2 border-[#25D366] flex items-center gap-2 transition-colors bg-[#25D366] hover:bg-[#20BA5A] justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="text-sm font-medium">WhatsApp</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

