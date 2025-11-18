"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitch() {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 text-gray-200">
      <button
        className={`text-xs font-semibold px-2 py-1 rounded ${
          language === "tr" ? "bg-white/20 text-white" : "hover:text-white text-gray-300"
        }`}
        aria-pressed={language === "tr"}
        onClick={() => setLanguage("tr")}
      >
        TR
      </button>
      <span className="text-gray-500">|</span>
      <button
        className={`text-xs font-semibold px-2 py-1 rounded ${
          language === "en" ? "bg-white/20 text-white" : "hover:text-white text-gray-300"
        }`}
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
      <span className="text-gray-500">|</span>
      <button
        className={`text-xs font-semibold px-2 py-1 rounded ${
          language === "ru" ? "bg-white/20 text-white" : "hover:text-white text-gray-300"
        }`}
        aria-pressed={language === "ru"}
        onClick={() => setLanguage("ru")}
      >
        RU
      </button>
      <span className="text-gray-500">|</span>
      <button
        className={`text-xs font-semibold px-2 py-1 rounded ${
          language === "ar" ? "bg-white/20 text-white" : "hover:text-white text-gray-300"
        }`}
        aria-pressed={language === "ar"}
        onClick={() => setLanguage("ar")}
      >
        AR
      </button>
      <button
        className="hidden"
        aria-label="Toggle language"
        onClick={toggleLanguage}
      />
    </div>
  );
}

