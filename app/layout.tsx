import type { Metadata } from "next";
import "./globals.css";
import FloatingContacts from "@/components/FloatingContacts";
import { LanguageProvider } from "@/contexts/LanguageContext";
import MaintenanceCheck from "@/components/MaintenanceCheck";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: "Nova Sağlık Hizmetleri - 7/24 Evde ve Klinik Sağlık Hizmeti",
  description: "Profesyonel evde sağlık hizmetleri: Serum takma, enjeksiyon, hemşirelik hizmetleri, yaşlı bakımı ve daha fazlası. Uzman hemşirelerimizle 7/24 hizmetinizdeyiz. Güvenilir, bütçe dostu ve şeffaf fiyatlandırılan sağlık hizmeti.",
  keywords: "evde sağlık hizmetleri, serum takma, enjeksiyon, hemşirelik hizmeti, hasta bakımı, yaşlı bakımı, evde hemşire, 7/24 sağlık hizmeti, İstanbul evde sağlık",
  authors: [{ name: "Nova Sağlık Hizmetleri" }],
  creator: "Nova Sağlık Hizmetleri",
  publisher: "Nova Sağlık Hizmetleri",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.novasaglikhizmeti.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "Nova Sağlık Hizmetleri - 7/24 Evde ve Klinik Sağlık Hizmeti",
    description: "Profesyonel evde sağlık hizmetleri: Serum takma, enjeksiyon, hemşirelik hizmetleri ve daha fazlası. Uzman hemşirelerimizle 7/24 hizmetinizdeyiz.",
    url: 'https://www.novasaglikhizmeti.com',
    siteName: 'Nova Sağlık Hizmetleri',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nova Sağlık Hizmetleri',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nova Sağlık Hizmetleri - 7/24 Evde Sağlık",
    description: "Profesyonel evde sağlık hizmetleri. Uzman hemşirelerimizle 7/24 hizmetinizdeyiz.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <meta name="theme-color" content="#1e3a5f" />
        
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "Nova Sağlık Hizmetleri",
              "description": "7/24 Evde ve Klinik Sağlık Hizmeti",
              "url": "https://www.novasaglikhizmeti.com",
              "telephone": "+90-533-486-61-11",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "İstanbul",
                "addressCountry": "TR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "41.0082",
                "longitude": "28.9784"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
              },
              "priceRange": "$$",
              "image": "https://www.novasaglikhizmeti.com/og-image.jpg",
              "sameAs": [
                "https://facebook.com/novasaglik",
                "https://instagram.com/novasaglik",
                "https://twitter.com/novasaglik"
              ]
            })
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <MaintenanceCheck>
            {children}
            <FloatingContacts />
            <Analytics />
          </MaintenanceCheck>
        </LanguageProvider>
      </body>
    </html>
  );
}

