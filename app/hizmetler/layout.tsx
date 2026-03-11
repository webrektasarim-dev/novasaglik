import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetlerimiz - Nova Sağlık Hizmetleri",
  description: "Profesyonel evde sağlık hizmetleri: Serum takma, enjeksiyon, hemşirelik hizmetleri, yaşlı bakımı ve daha fazlası. Uzman hemşirelerimizle 7/24 hizmetinizdeyiz.",
  keywords: "evde sağlık hizmetleri, serum takma, enjeksiyon, hemşirelik hizmeti, hasta bakımı, yaşlı bakımı, evde hemşire, 7/24 sağlık hizmeti",
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
  alternates: {
    canonical: 'https://www.novasaglikhizmeti.com/hizmetler',
  },
  openGraph: {
    title: "Hizmetlerimiz - Nova Sağlık Hizmetleri",
    description: "Profesyonel evde sağlık hizmetleri: Serum takma, enjeksiyon, hemşirelik hizmetleri ve daha fazlası.",
    url: 'https://www.novasaglikhizmeti.com/hizmetler',
    siteName: 'Nova Sağlık Hizmetleri',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nova Sağlık Hizmetleri - Hizmetler',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hizmetlerimiz - Nova Sağlık Hizmetleri",
    description: "Profesyonel evde sağlık hizmetleri. Uzman hemşirelerimizle 7/24 hizmetinizdeyiz.",
    images: ['/og-image.jpg'],
  },
};

export default function HizmetlerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



