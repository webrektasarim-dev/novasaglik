import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim - Nova Sağlık Hizmetleri ile İletişime Geçin",
  description: "Nova Sağlık Hizmetleri ile iletişime geçin. 7/24 destek hattımız, e-posta ve WhatsApp ile bize ulaşabilirsiniz. Randevu almak için formu doldurun.",
  openGraph: {
    title: "İletişim - Nova Sağlık Hizmetleri",
    description: "Bize ulaşın, size yardımcı olalım. 7/24 hizmetinizdeyiz.",
    url: 'https://www.novasaglikhizmeti.com/iletisim',
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

