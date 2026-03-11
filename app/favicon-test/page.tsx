import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favicon Test - Nova Sağlık",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FaviconTestPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Favicon Test Sayfası</h1>
      <p>Bu sayfa favicon dosyalarının erişilebilirliğini test etmek içindir.</p>
      
      <h2>Favicon Dosyaları:</h2>
      <ul>
        <li>
          <a href="/favicon.ico" target="_blank">/favicon.ico</a> (Ana favicon - Google bunu arar)
        </li>
        <li>
          <a href="/favicon-16x16.png" target="_blank">/favicon-16x16.png</a>
        </li>
        <li>
          <a href="/favicon-32x32.png" target="_blank">/favicon-32x32.png</a>
        </li>
        <li>
          <a href="/icon.png" target="_blank">/icon.png</a>
        </li>
        <li>
          <a href="/apple-touch-icon.png" target="_blank">/apple-touch-icon.png</a>
        </li>
      </ul>

      <h2>Google için Önemli Notlar:</h2>
      <ol>
        <li>Google genellikle <code>/favicon.ico</code> dosyasını doğrudan arar</li>
        <li>Favicon'un 16x16 veya 32x32 boyutunda olması önerilir</li>
        <li>Google'ın favicon'u görmesi birkaç gün ila birkaç hafta sürebilir</li>
        <li>Google Search Console'dan URL Inspection ile test edebilirsiniz</li>
        <li>Yeniden indeksleme isteği yapabilirsiniz</li>
      </ol>

      <h2>Test Etmek İçin:</h2>
      <p>
        Google Search Console → URL Inspection → 
        <code>https://www.novasaglikhizmeti.com/favicon.ico</code>
      </p>
    </div>
  );
}



