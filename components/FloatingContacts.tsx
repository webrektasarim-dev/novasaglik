"use client";

import { useState } from "react";

export default function FloatingContacts() {
  const [open, setOpen] = useState(false);
  const phone = "+905334866111";
  const whatsappLink = "https://wa.me/905334866111";
  const instagramLink = "https://www.instagram.com/novasaglikhizmeti";

  const actions = [
    {
      label: "Telefon",
      href: `tel:${phone}`,
      bg: "bg-[#0f172a]",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: whatsappLink,
      bg: "bg-[#25D366]",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.518.68 4.887 1.987 6.976L2 30l7.253-2.58A13.19 13.19 0 0016 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16 2.667zm0 24a10.6 10.6 0 01-5.653-1.637l-.403-.247-4.32 1.538 1.506-4.541-.264-.416A10.59 10.59 0 015.333 16c0-5.867 4.8-10.667 10.667-10.667S26.667 10.133 26.667 16 21.867 26.667 16 26.667zm6.186-7.987c-.34-.171-2.014-.99-2.327-1.103-.31-.113-.537-.171-.762.171-.227.34-.874 1.1-1.072 1.325-.198.226-.395.255-.735.085-.34-.17-1.44-.531-2.742-1.693-1.015-.907-1.7-2.028-1.9-2.369-.198-.34-.021-.526.148-.696.152-.151.34-.396.51-.595.17-.198.227-.34.34-.567.113-.227.057-.425-.029-.595-.085-.17-.754-1.803-1.033-2.473-.272-.649-.546-.561-.732-.57-.198-.009-.425-.012-.652-.012-.226 0-.597.085-.909.425-.312.34-1.19 1.162-1.19 2.841s1.219 3.293 1.39 3.523c.17.227 2.38 3.66 5.77 5.132.807.349 1.435.558 1.94.714.813.258 1.552.222 2.135.135.651-.097 2.004-.819 2.287-1.609.283-.79.283-1.47.198-1.612-.085-.142-.31-.226-.651-.396z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: instagramLink,
      bg: "bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc2a8d]",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="white" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.6" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40" onMouseLeave={() => setOpen(false)}>
      <div className="relative" onMouseEnter={() => setOpen(true)}>
        <div className={`flex flex-col items-end gap-3 transition-all duration-300 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}>
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target={action.href.startsWith('http') ? '_blank' : undefined}
              rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`${action.bg} text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform`}
              aria-label={action.label}
            >
              {action.icon}
            </a>
          ))}
        </div>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-14 h-14 rounded-full bg-[#14b8a6] text-white shadow-2xl flex items-center justify-center hover:bg-[#0d9488] transition-colors"
          aria-label="Hızlı erişim"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h6m-6 4h4M21 12c0 4.418-4.03 8-9 8-.985 0-1.937-.143-2.828-.409L3 21l1.38-3.219C3.512 16.372 3 14.743 3 13c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

