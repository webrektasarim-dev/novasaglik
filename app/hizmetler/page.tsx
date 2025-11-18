"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type ServiceItem = {
  title: string;
  icon: string;
  description: string;
  details: string[];
  pricing: string;
};

const servicesContent: Record<
  "tr" | "en" | "ru" | "ar",
  {
    heroTitle: string;
    heroDescription: string;
    detailHeading: string;
    ctaLabel: string;
    services: ServiceItem[];
    whyTitle: string;
    whySubtitle: string;
    whyItems: { icon: string; title: string; desc: string }[];
  }
> = {
  tr: {
    heroTitle: "Profesyonel Evde Sağlık Hizmetleri",
    heroDescription:
      "Uzman hemşirelerimizle evinizin konforunda en kaliteli sağlık hizmetini alın. 7/24 hizmetinizde, güvenilir ve bütçe dostu çözümlerle.",
    detailHeading: "Hizmet Detayları:",
    ctaLabel: "Randevu Al",
    services: [
      {
        title: "Serum Takma",
        icon: "💉",
        description: "Evde serum tedavisi hizmetimiz ile rahatlığınızı bozmadan tedavinizi sürdürün.",
        details: [
          "IV (intravenöz) serum uygulaması",
          "Vitamin ve mineral desteği",
          "Antibiyotik tedavisi",
          "Sıvı elektrolit dengesi",
          "Günlük veya haftalık tedavi programları",
        ],
        pricing: "Hizmet başına ücretlendirme",
      },
      {
        title: "Enjeksiyon Hizmeti",
        icon: "💊",
        description: "Her türlü enjeksiyon uygulaması için uzman hemşire desteği.",
        details: [
          "İntramüsküler (kas içi) enjeksiyon",
          "Subkutan (deri altı) enjeksiyon",
          "İnsülin enjeksiyonu ve eğitimi",
          "Aşı uygulamaları",
          "Antikoagülan ilaç enjeksiyonları",
        ],
        pricing: "Şeffaf fiyatlandırma",
      },
      {
        title: "Hemşirelik Hizmetleri",
        icon: "👩‍⚕️",
        description: "Deneyimli ve sertifikalı hemşirelerimizle kapsamlı bakım hizmeti.",
        details: [
          "Yaşlı hasta bakımı",
          "Kronik hastalık takibi",
          "Medikal cihaz kullanımı",
          "Vital bulgu takibi (tansiyon, nabız, ateş)",
          "İlaç takibi ve hatırlatma",
        ],
        pricing: "Saatlik veya günlük paketler",
      },
      {
        title: "Yara Bakımı",
        icon: "🩹",
        description: "Profesyonel yara bakımı ve pansuman hizmetleri.",
        details: [
          "Cerrahi yara bakımı",
          "Bası yarası tedavisi ve önleme",
          "Diyabetik yara bakımı",
          "Yanık bakımı",
          "Steril pansuman uygulamaları",
        ],
        pricing: "Yara durumuna göre",
      },
      {
        title: "Sonda ve Kateter Bakımı",
        icon: "🔬",
        description: "Nazogastrik sonda, idrar sondası ve kateter bakım hizmetleri.",
        details: [
          "Nazogastrik sonda takılması ve bakımı",
          "Foley sonda (idrar sondası) bakımı",
          "PEG (gastrostomi) bakımı",
          "Sonda değişimi",
          "Enfeksiyon kontrolü",
        ],
        pricing: "İşlem başına",
      },
      {
        title: "Tansiyon ve Şeker Ölçümü",
        icon: "📊",
        description: "Düzenli vital bulgu takibi ve raporlama hizmeti.",
        details: [
          "Kan basıncı ölçümü ve takibi",
          "Kan şekeri ölçümü",
          "Nabız ve oksijen saturasyonu",
          "Ateş takibi",
          "Detaylı raporlama",
        ],
        pricing: "Paket fiyatları mevcut",
      },
      {
        title: "Taburcu Sonrası Bakım",
        icon: "🏥",
        description: "Hastaneden taburcu sonrası evde profesyonel bakım hizmeti.",
        details: [
          "Ameliyat sonrası bakım",
          "İyileşme sürecinin takibi",
          "İlaç yönetimi",
          "Komplikasyon önleme",
          "Hekim ile koordinasyon",
        ],
        pricing: "Özel paketler",
      },
      {
        title: "Yaşlı Bakımı",
        icon: "👴",
        description: "Yaşlı hastalarınız için özel bakım ve refakatçi hizmeti.",
        details: [
          "Günlük yaşam aktiviteleri desteği",
          "Hijyen ve temizlik yardımı",
          "Beslenme yardımı",
          "Mobilizasyon desteği",
          "Sosyal aktivite eşliği",
        ],
        pricing: "8/12/24 saatlik paketler",
      },
      {
        title: "Fizik Tedavi Desteği",
        icon: "🤸",
        description: "Evde fizik tedavi egzersizleri ve rehabilitasyon desteği.",
        details: [
          "Hareket kısıtlılığı egzersizleri",
          "Denge ve koordinasyon çalışmaları",
          "Eklem hareketleri",
          "Kas güçlendirme",
          "Post-operatif rehabilitasyon",
        ],
        pricing: "Seans bazlı",
      },
      {
        title: "Laboratuvar Hizmetleri",
        icon: "🧪",
        description: "Kan alma, örnek toplama ve resmi laboratuvar raporlaması.",
        details: [
          "Evde kan alma ve örnek toplama",
          "Hızlı raporlama ve dijital sonuç paylaşımı",
          "Doktorunuzla koordinasyon",
          "Pre-op ve check-up paketleri",
          "Grip, COVID-19, enfeksiyon paneli testleri",
        ],
        pricing: "Test bazlı şeffaf fiyatlandırma",
      },
    ],
    whyTitle: "Nova Sağlık'ı Neden Tercih Etmelisiniz?",
    whySubtitle: "Sağlığınız için en iyi hizmeti sunmak amacıyla çalışıyoruz",
    whyItems: [
      { icon: "✅", title: "Sertifikalı Hemşireler", desc: "Deneyimli ve lisanslı sağlık profesyonelleri" },
      { icon: "🕐", title: "7/24 Hizmet", desc: "Haftanın her günü, günün her saati" },
      { icon: "💰", title: "Bütçe Dostu", desc: "Şeffaf ve erişilebilir fiyatlandırma" },
      { icon: "🏠", title: "Evde Konfor", desc: "Kendi ortamınızda hizmet" },
    ],
  },
  en: {
    heroTitle: "Professional In-Home Healthcare",
    heroDescription:
      "Receive premium medical care without leaving your home. Our certified nurses deliver trusted, budget-friendly support 24/7.",
    detailHeading: "Service Details:",
    ctaLabel: "Book Now",
    services: [
      {
        title: "IV Therapy",
        icon: "💉",
        description: "Continue your treatment comfortably at home with our IV therapy service.",
        details: [
          "Intravenous (IV) infusions",
          "Vitamin and mineral support",
          "Antibiotic infusions",
          "Fluid & electrolyte balance",
          "Daily or weekly therapy plans",
        ],
        pricing: "Priced per visit",
      },
      {
        title: "Injection Service",
        icon: "💊",
        description: "Expert nurses handle every type of injection safely at home.",
        details: [
          "Intramuscular injections",
          "Subcutaneous injections",
          "Insulin support & training",
          "Vaccine administration",
          "Anticoagulant injections",
        ],
        pricing: "Transparent pricing",
      },
      {
        title: "Nursing Care",
        icon: "👩‍⚕️",
        description: "Comprehensive care by experienced and certified nurses.",
        details: [
          "Elderly patient care",
          "Chronic disease monitoring",
          "Medical device management",
          "Vital signs tracking",
          "Medication reminders",
        ],
        pricing: "Hourly or daily packages",
      },
      {
        title: "Wound Care",
        icon: "🩹",
        description: "Professional wound care and dressing services.",
        details: [
          "Post-surgical wound care",
          "Pressure ulcer prevention & treatment",
          "Diabetic wound management",
          "Burn care",
          "Sterile dressing applications",
        ],
        pricing: "Based on wound condition",
      },
      {
        title: "Catheter Care",
        icon: "🔬",
        description: "Nazogastric tube, urinary catheter, and PEG care at home.",
        details: [
          "NG tube placement & maintenance",
          "Foley catheter care",
          "PEG (gastrostomy) care",
          "Catheter replacement",
          "Infection prevention",
        ],
        pricing: "Per procedure",
      },
      {
        title: "Vitals & Glucose Monitoring",
        icon: "📊",
        description: "Consistent vital sign monitoring with clear reporting.",
        details: [
          "Blood pressure checks",
          "Blood glucose monitoring",
          "Pulse & oxygen saturation",
          "Temperature tracking",
          "Detailed reporting",
        ],
        pricing: "Package plans available",
      },
      {
        title: "Post-Discharge Care",
        icon: "🏥",
        description: "Professional care after hospital discharge.",
        details: [
          "Post-operative care",
          "Recovery follow-up",
          "Medication management",
          "Complication prevention",
          "Physician coordination",
        ],
        pricing: "Custom packages",
      },
      {
        title: "Elderly Care",
        icon: "👴",
        description: "Personalised companion and nursing support for seniors.",
        details: [
          "Assistance with daily activities",
          "Hygiene and grooming support",
          "Meal assistance",
          "Mobility encouragement",
          "Social engagement",
        ],
        pricing: "8/12/24-hour packages",
      },
      {
        title: "Physiotherapy Support",
        icon: "🤸",
        description: "At-home exercises and rehabilitation programs.",
        details: [
          "Mobility limitation exercises",
          "Balance and coordination work",
          "Joint mobilisation",
          "Muscle strengthening",
          "Post-op rehabilitation",
        ],
        pricing: "Per session",
      },
      {
        title: "Laboratory Services",
        icon: "🧪",
        description: "Blood draws, sample collection, and official lab reporting.",
        details: [
          "At-home blood collection",
          "Fast reporting & digital results",
          "Physician coordination",
          "Pre-op and check-up panels",
          "Flu, COVID-19, infection panels",
        ],
        pricing: "Test-based transparent pricing",
      },
    ],
    whyTitle: "Why Choose Nova Sağlık?",
    whySubtitle: "We work tirelessly to deliver the safest care for your family.",
    whyItems: [
      { icon: "✅", title: "Certified Nurses", desc: "Experienced and licensed healthcare professionals" },
      { icon: "🕐", title: "24/7 Support", desc: "Anytime, any day of the week" },
      { icon: "💰", title: "Budget Friendly", desc: "Transparent and accessible pricing" },
      { icon: "🏠", title: "Home Comfort", desc: "Receive care in your own space" },
    ],
  },
  ru: {
    heroTitle: "Профессиональная домашняя медицина",
    heroDescription:
      "Получайте качественную медицинскую помощь, не выходя из дома. Наши сертифицированные медсёстры доступны круглосуточно и предлагают прозрачные решения.",
    detailHeading: "Детали услуги:",
    ctaLabel: "Записаться",
    services: [
      {
        title: "Внутривенная терапия",
        icon: "💉",
        description: "Капельницы и инфузии для комфортного лечения дома.",
        details: [
          "Внутривенные инфузии",
          "Витаминная и минеральная поддержка",
          "Антибиотикотерапия",
          "Баланс электролитов",
          "Ежедневные или еженедельные программы",
        ],
        pricing: "Оплата за визит",
      },
      {
        title: "Инъекционные услуги",
        icon: "💊",
        description: "Все виды уколов выполняются нашими лицензированными специалистами.",
        details: [
          "Внутримышечные инъекции",
          "Подкожные инъекции",
          "Инсулинотерапия и обучение",
          "Вакцинация",
          "Антикоагулянтные инъекции",
        ],
        pricing: "Прозрачное ценообразование",
      },
      {
        title: "Сестринский уход",
        icon: "👩‍⚕️",
        description: "Комплексный уход от опытных и сертифицированных медсестёр.",
        details: [
          "Уход за пожилыми пациентами",
          "Мониторинг хронических заболеваний",
          "Работа с медицинскими устройствами",
          "Контроль жизненных показателей",
          "Напоминание о приёме лекарств",
        ],
        pricing: "Почасовые и дневные пакеты",
      },
      {
        title: "Уход за ранами",
        icon: "🩹",
        description: "Профессиональная обработка ран и перевязки.",
        details: [
          "Послеоперационный уход",
          "Профилактика и лечение пролежней",
          "Уход за диабетическими ранами",
          "Лечение ожогов",
          "Стерильные перевязки",
        ],
        pricing: "В зависимости от состояния раны",
      },
      {
        title: "Уход за катетерами",
        icon: "🔬",
        description: "Назогастральные, мочевые катетеры и PEG — установка и контроль.",
        details: [
          "Установка и уход за НГ-зондами",
          "Обслуживание катетера Фолея",
          "Уход за гастростомой (PEG)",
          "Своевременная замена катетеров",
          "Профилактика инфекций",
        ],
        pricing: "Оплата за процедуру",
      },
      {
        title: "Контроль показателей",
        icon: "📊",
        description: "Регулярный мониторинг давления и сахара с отчётами.",
        details: [
          "Измерение артериального давления",
          "Контроль уровня сахара",
          "Пульс и сатурация",
          "Измерение температуры",
          "Подробные отчёты",
        ],
        pricing: "Доступные пакеты",
      },
      {
        title: "Уход после выписки",
        icon: "🏥",
        description: "Профессиональная помощь после выхода из стационара.",
        details: [
          "Послеоперационный мониторинг",
          "Контроль процесса восстановления",
          "Менеджмент медикаментов",
          "Профилактика осложнений",
          "Координация с лечащим врачом",
        ],
        pricing: "Индивидуальные пакеты",
      },
      {
        title: "Уход за пожилыми",
        icon: "👴",
        description: "Персональное сопровождение и уход для ваших близких.",
        details: [
          "Помощь в ежедневных делах",
          "Гигиена и чистота",
          "Помощь с питанием",
          "Поддержка мобильности",
          "Социальное сопровождение",
        ],
        pricing: "Пакеты на 8/12/24 часа",
      },
      {
        title: "Физиотерапия дома",
        icon: "🤸",
        description: "Упражнения и реабилитация в домашних условиях.",
        details: [
          "Упражнения при ограничении подвижности",
          "Тренировка баланса и координации",
          "Разработка суставов",
          "Укрепление мышц",
          "Реабилитация после операций",
        ],
        pricing: "Оплата за сеанс",
      },
      {
        title: "Лабораторные услуги",
        icon: "🧪",
        description: "Забор анализов на дому и официальные результаты.",
        details: [
          "Забор крови и образцов дома",
          "Быстрая выдача результатов онлайн",
          "Координация с вашим врачом",
          "Пакеты для check-up и предоперационных анализов",
          "Тесты на грипп, COVID-19 и инфекции",
        ],
        pricing: "Прозрачные цены за анализ",
      },
    ],
    whyTitle: "Почему выбирают Nova Sağlık?",
    whySubtitle: "Мы работаем, чтобы вы получили лучший и самый безопасный уход.",
    whyItems: [
      { icon: "✅", title: "Сертифицированные медсёстры", desc: "Опытные и лицензированные специалисты" },
      { icon: "🕐", title: "24/7 поддержка", desc: "Работаем ежедневно и круглосуточно" },
      { icon: "💰", title: "Доступные цены", desc: "Прозрачное и понятное ценообразование" },
      { icon: "🏠", title: "Удобство дома", desc: "Получайте лечение в привычной обстановке" },
    ],
  },
  ar: {
    heroTitle: "رعاية صحية منزلية متكاملة",
    heroDescription:
      "استمتع برعاية طبية عالية المستوى في منزلك مع فريق تمريضي معتمد وخطط تسعير واضحة وخدمة على مدار الساعة.",
    detailHeading: "تفاصيل الخدمة:",
    ctaLabel: "احجز الآن",
    services: [
      {
        title: "العلاج الوريدي",
        icon: "💉",
        description: "جلسات محاليل وحقن وريدية داخل المنزل مع متابعة دقيقة.",
        details: [
          "جلسات حقن وريدي (IV)",
          "دعم الفيتامينات والمعادن",
          "إعطاء المضادات الحيوية",
          "موازنة السوائل والإلكتروليت",
          "خطط علاج يومية أو أسبوعية",
        ],
        pricing: "حسب الزيارة",
      },
      {
        title: "خدمات الحقن",
        icon: "💊",
        description: "تنفيذ جميع أنواع الحقن بواسطة ممرضين متخصصين.",
        details: [
          "حقن عضلي",
          "حقن تحت الجلد",
          "إرشاد وحقن الإنسولين",
          "التطعيمات",
          "حقن مميّعات الدم",
        ],
        pricing: "تسعير شفاف",
      },
      {
        title: "الرعاية التمريضية",
        icon: "👩‍⚕️",
        description: "رعاية يومية وشاملة لكبار السن والمرضى في منازلهم.",
        details: [
          "رعاية كبار السن",
          "متابعة الأمراض المزمنة",
          "إدارة الأجهزة الطبية المنزلية",
          "مراقبة العلامات الحيوية",
          "تنظيم الأدوية والتذكير",
        ],
        pricing: "باقات يومية أو بالساعة",
      },
      {
        title: "العناية بالجروح",
        icon: "🩹",
        description: "تنظيف الجروح وتغيير الضمادات وفق معايير طبية دقيقة.",
        details: [
          "رعاية ما بعد الجراحة",
          "الوقاية من تقرحات الفراش",
          "علاج جروح السكري",
          "العناية بالحروق",
          "تغيير الضمادات المعقمة",
        ],
        pricing: "حسب حالة الجرح",
      },
      {
        title: "العناية بالقساطر",
        icon: "🔬",
        description: "تركيب القساطر وأنابيب التغذية ومتابعتها داخل المنزل.",
        details: [
          "تركيب ورعاية أنابيب الأنف المعدية",
          "متابعة قسطرة فولي",
          "العناية بقساطر PEG",
          "استبدال القساطر بأمان",
          "الوقاية من العدوى",
        ],
        pricing: "لكل إجراء",
      },
      {
        title: "متابعة الضغط والسكر",
        icon: "📊",
        description: "قياسات دورية للضغط والسكر والنبض مع تقارير مفصلة.",
        details: [
          "قياس ضغط الدم",
          "فحص مستوى الجلوكوز",
          "مراقبة النبض ونسبة الأكسجين",
          "قياس درجة الحرارة",
          "تقارير دورية مفصلة",
        ],
        pricing: "باقات مرنة",
      },
      {
        title: "الرعاية بعد الخروج من المستشفى",
        icon: "🏥",
        description: "متابعة دقيقة بعد العمليات أو علاج الحالات المزمنة.",
        details: [
          "رعاية ما بعد الجراحة",
          "مراقبة مراحل التعافي",
          "تنظيم الأدوية والمواعيد",
          "الوقاية من المضاعفات",
          "التنسيق مع الطبيب المعالج",
        ],
        pricing: "باقات خاصة",
      },
      {
        title: "رعاية كبار السن",
        icon: "👴",
        description: "رعاية إنسانية وصحية لكبار السن داخل المنزل.",
        details: [
          "مساعدة في الأنشطة اليومية",
          "دعم النظافة الشخصية",
          "مساعدة في التغذية",
          "دعم الحركة والتنقل",
          "مرافقة اجتماعية",
        ],
        pricing: "باقات 8 / 12 / 24 ساعة",
      },
      {
        title: "دعم العلاج الطبيعي",
        icon: "🤸",
        description: "جلسات علاج طبيعي وتمارين خاصة بكل حالة داخل المنزل.",
        details: [
          "تمارين لتحسين الحركة والمرونة",
          "تدريبات التوازن والتناسق",
          "تحريك المفاصل",
          "تقوية العضلات",
          "إعادة تأهيل ما بعد العمليات",
        ],
        pricing: "لكل جلسة",
      },
      {
        title: "الخدمات المخبرية",
        icon: "🧪",
        description: "سحب العينات وإجراء التحاليل مع نتائج رقمية معتمدة.",
        details: [
          "سحب عينات الدم والبول في المنزل",
          "نتائج سريعة وتقارير رقمية",
          "التواصل مع الطبيب المعالج",
          "حزم فحوصات وقائية",
          "اختبارات الإنفلونزا وكوفيد والالتهابات",
        ],
        pricing: "تسعير واضح لكل تحليل",
      },
    ],
    whyTitle: "لماذا تختارون Nova Sağlık؟",
    whySubtitle: "نضمن لكم راحة المنزل، جودة الرعاية، وتسعيراً شفافاً في كل خدمة.",
    whyItems: [
      { icon: "✅", title: "ممرضات معتمدات", desc: "فريق محترف ذو خبرة طويلة" },
      { icon: "🕐", title: "خدمة 24/7", desc: "جاهزون دائماً لتلبية احتياجاتكم" },
      { icon: "💰", title: "تسعير واضح", desc: "باقات مرنة وتكاليف معروفة مسبقاً" },
      { icon: "🏠", title: "راحة المنزل", desc: "رعاية كاملة دون الحاجة للسفر" },
    ],
  },
};

export default function HizmetlerPage() {
  const { language } = useLanguage();
  const content = servicesContent[language];
  const services = content.services;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a6f] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{content.heroTitle}</h1>
            <p className="text-xl text-gray-200">{content.heroDescription}</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
              const animationClass = index % 2 === 0 ? "scroll-card-left" : "scroll-card-right";
              const visibleClass = isVisible ? "visible" : "";

              return (
                <div
                  key={`${language}-${service.title}`}
                  ref={ref}
                  className={`bg-white border-2 border-gray-100 rounded-xl p-8 hover:border-[#14b8a6] hover:shadow-xl transition-all duration-300 ${animationClass} ${visibleClass}`}
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h2>
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{content.detailHeading}</h3>
                    <ul className="space-y-2">
                      {service.details.map((detail, idx) => (
                        <li key={`${service.title}-${idx}`} className="flex items-start gap-2 text-sm text-gray-600">
                          <svg className="w-5 h-5 text-[#14b8a6] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-sm text-[#14b8a6] font-semibold">{service.pricing}</p>
                    <a
                      href="/iletisim"
                      className="bg-[#14b8a6] hover:bg-[#0d9488] text-white px-6 py-2 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={2} />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                      {content.ctaLabel}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{content.whyTitle}</h2>
            <p className="text-xl text-gray-600">{content.whySubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.whyItems.map((item, index) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
              const animationClass = index % 2 === 0 ? "scroll-card-left" : "scroll-card-right";
              const visibleClass = isVisible ? "visible" : "";

              return (
                <div key={`${language}-${item.title}`} ref={ref} className={`bg-white p-6 rounded-lg shadow-md text-center ${animationClass} ${visibleClass}`}>
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
