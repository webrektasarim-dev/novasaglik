import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import FloatingContacts from "@/components/FloatingContacts";
import { LanguageProvider } from "@/contexts/LanguageContext";
import MaintenanceCheck from "@/components/MaintenanceCheck";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: "Nova Sağlık Hizmetleri - 7/24 Evde Sağlık Hizmeti",
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
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon.png', sizes: '48x48', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon.png',
      },
    ],
  },
  openGraph: {
    title: "Nova Sağlık Hizmetleri - 7/24 Evde Sağlık Hizmeti",
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
        {/* Favicon Set - Google Indexing için - ÖNEMLİ: Sıralama önemli */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1e3a5f" />
        <meta name="msapplication-TileColor" content="#1e3a5f" />
        <meta name="msapplication-TileImage" content="/android-chrome-192x192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "Nova Sağlık Hizmetleri",
              "description": "7/24 Evde Sağlık Hizmeti",
              "url": "https://www.novasaglikhizmeti.com",
              "telephone": "+90-533-486-61-11",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "İstanbul / Avrupa Yakası",
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
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
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

