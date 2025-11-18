import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    console.log('📝 Seeding SEO blog posts...')

    const blogPosts = [
      {
        title: "Evde Serum Takma Hizmeti: Güvenli ve Konforlu Tedavi",
        excerpt: "Evde serum takma hizmeti ile rahatlığınızı bozmadan tedavinizi sürdürün. Uzman hemşirelerimizle güvenli IV uygulamaları hakkında bilgi alın.",
        category: "Serum Takma",
        content: `<h2>Evde Serum Takma Hizmeti Nedir?</h2>
<p>Evde serum takma hizmeti, hastane ortamına gitmeden, kendi konforlu ortamınızda intravenöz (IV) tedavi almanızı sağlayan profesyonel bir sağlık hizmetidir. Nova Sağlık Hizmetleri olarak, sertifikalı ve deneyimli hemşirelerimizle size evinizde güvenli serum takma hizmeti sunuyoruz.</p>

<h2>Evde Serum Takma Hizmetinin Avantajları</h2>
<ul>
<li><strong>Konforlu Ortam:</strong> Hastane stresi olmadan, kendi evinizde tedavi alın</li>
<li><strong>Zaman Tasarrufu:</strong> Hastane yolculuğu ve bekleme süresi yok</li>
<li><strong>Güvenli Uygulama:</strong> Steril koşullarda, uzman hemşireler tarafından uygulanır</li>
<li><strong>Esnek Program:</strong> Size uygun saatlerde hizmet alabilirsiniz</li>
<li><strong>Maliyet Etkin:</strong> Hastane masraflarından tasarruf edin</li>
</ul>

<h2>Hangi Durumlarda Evde Serum Takma Hizmeti Gerekir?</h2>
<p>Evde serum takma hizmeti şu durumlarda tercih edilir:</p>
<ul>
<li>Vitamin ve mineral desteği</li>
<li>Antibiyotik tedavisi</li>
<li>Sıvı elektrolit dengesi</li>
<li>Kronik hastalık tedavisi</li>
<li>Ameliyat sonrası iyileşme desteği</li>
<li>Beslenme desteği</li>
</ul>

<h2>Nova Sağlık'ta Serum Takma Süreci</h2>
<p>Hizmetimiz 4 basit adımda gerçekleşir:</p>
<ol>
<li><strong>Randevu:</strong> Telefon veya online randevu sistemi ile randevu alın</li>
<li><strong>Değerlendirme:</strong> Uzman hemşiremiz evinize gelerek durumunuzu değerlendirir</li>
<li><strong>Uygulama:</strong> Steril koşullarda, uzman ellerle serum takılır</li>
<li><strong>Takip:</strong> Tedavi süresince yanınızda oluruz</li>
</ol>

<h2>Güvenlik ve Sterilizasyon</h2>
<p>Nova Sağlık Hizmetleri olarak, hasta güvenliği bizim önceliğimizdir. Tüm uygulamalarımız:</p>
<ul>
<li>Steril malzemelerle yapılır</li>
<li>Tek kullanımlık ekipmanlarla gerçekleştirilir</li>
<li>Enfeksiyon kontrol protokollerine uygun olarak uygulanır</li>
<li>Uzman hemşireler tarafından yönetilir</li>
</ul>

<h2>Sonuç</h2>
<p>Evde serum takma hizmeti, tedavi sürecinizi daha konforlu hale getirir. Nova Sağlık Hizmetleri olarak, 10+ yıllık deneyimimizle size güvenli ve profesyonel evde sağlık hizmeti sunuyoruz. Randevu almak için hemen bizimle iletişime geçin.</p>`,
        image: "/blog-images/serum-takma.jpg"
      },
      {
        title: "Profesyonel Enjeksiyon Hizmeti: Evde Güvenli Uygulama",
        excerpt: "Her türlü enjeksiyon uygulaması için uzman hemşire desteği. İnsülin, aşı ve diğer enjeksiyon hizmetleri hakkında detaylı bilgi.",
        category: "Enjeksiyon Hizmeti",
        content: `<h2>Evde Enjeksiyon Hizmeti Nedir?</h2>
<p>Evde enjeksiyon hizmeti, yaşlılar, kronik hastalar veya enjeksiyon yapmaktan çekinen bireyler için profesyonel bir çözümdür. Nova Sağlık Hizmetleri olarak, deneyimli hemşirelerimizle size güvenli ve doğru enjeksiyon uygulaması sunuyoruz.</p>

<h2>Enjeksiyon Türleri</h2>
<h3>1. İntramüsküler (Kas İçi) Enjeksiyon</h3>
<p>Vitamin B12, aşılar ve bazı ilaçlar kas içine uygulanır. Uzman hemşirelerimiz doğru anatomik bölgeyi seçerek güvenli uygulama yapar.</p>

<h3>2. Subkutan (Deri Altı) Enjeksiyon</h3>
<p>İnsülin, heparin ve bazı hormonlar deri altına uygulanır. Özellikle diyabet hastaları için günlük insülin uygulaması yapıyoruz.</p>

<h3>3. İntravenöz (Damar İçi) Enjeksiyon</h3>
<p>Acil durumlarda veya hızlı etki gerektiren ilaçlar damar içine verilir. Uzman hemşirelerimiz damar yolu açma konusunda deneyimlidir.</p>

<h2>Evde Enjeksiyon Hizmetinin Faydaları</h2>
<ul>
<li><strong>Doğru Uygulama:</strong> Yanlış uygulama riskini ortadan kaldırır</li>
<li><strong>Hijyen:</strong> Steril koşullarda, profesyonel ellerde uygulama</li>
<li><strong>Eğitim:</strong> Aile üyelerine doğru enjeksiyon tekniği öğretilir</li>
<li><strong>Takip:</strong> İlaç takvimi ve uygulama programı yönetilir</li>
<li><strong>Yan Etki Kontrolü:</strong> Uygulama sonrası gözlem yapılır</li>
</ul>

<h2>Hangi Durumlarda Evde Enjeksiyon Gerekir?</h2>
<ul>
<li>İnsülin gereksinimi olan diyabet hastaları</li>
<li>Günlük ağrı kesici ihtiyacı olanlar</li>
<li>Aşı programı takibi gerektirenler</li>
<li>Vitamin B12 eksikliği olanlar</li>
<li>Kan sulandırıcı (antikoagülan) kullananlar</li>
<li>Kronik hastalık tedavisi görenler</li>
</ul>

<h2>İnsülin Enjeksiyonu ve Eğitimi</h2>
<p>Diyabet hastaları için özel insülin enjeksiyonu hizmeti sunuyoruz. Ayrıca hasta ve yakınlarına:</p>
<ul>
<li>Doğru enjeksiyon tekniği</li>
<li>İnsülin saklama koşulları</li>
<li>Dozaj hesaplama</li>
<li>Yan etki yönetimi</li>
</ul>
<p>konularında eğitim veriyoruz.</p>

<h2>Sonuç</h2>
<p>Evde enjeksiyon hizmeti, tedavi sürekliliğini sağlar ve hasta konforunu artırır. Nova Sağlık Hizmetleri olarak, deneyimli ekibimizle size güvenli enjeksiyon hizmeti sunuyoruz. Hemen randevu alın, sağlık hizmetini evinizde alın.</p>`,
        image: "/blog-images/enjeksiyon-hizmeti.jpg"
      },
      {
        title: "Evde Hemşirelik Hizmetleri: Profesyonel Hasta Bakımı",
        excerpt: "Yaşlı hasta bakımı, kronik hastalık takibi ve medikal cihaz kullanımı. Uzman hemşirelerimizle 7/24 evde hemşirelik hizmeti.",
        category: "Hemşirelik Hizmetleri",
        content: `<h2>Evde Hemşirelik Hizmeti Nedir?</h2>
<p>Evde hemşirelik hizmeti, hastane dışında, hastanın kendi konforlu ortamında profesyonel sağlık bakımı almasını sağlayan kapsamlı bir hizmettir. Nova Sağlık Hizmetleri olarak, sertifikalı hemşirelerimizle size evinizde profesyonel hemşirelik hizmeti sunuyoruz.</p>

<h2>Evde Hemşirelik Hizmetinin Kapsamı</h2>
<h3>1. Yaşlı Hasta Bakımı</h3>
<p>Yaşlı bireylerin özel bakım ihtiyaçlarını karşılamak için kapsamlı hemşirelik hizmeti sunuyoruz. Günlük yaşam aktiviteleri desteği, ilaç yönetimi ve sağlık takibi yapıyoruz.</p>

<h3>2. Kronik Hastalık Takibi</h3>
<p>Diyabet, hipertansiyon, kalp hastalıkları gibi kronik hastalıkların düzenli takibi ve yönetimi konusunda uzmanız.</p>

<h3>3. Medikal Cihaz Kullanımı</h3>
<p>Ev tipi oksijen konsantratörü, nebulizatör, aspiratör gibi medikal cihazların doğru kullanımı ve bakımı konusunda destek veriyoruz.</p>

<h3>4. Vital Bulgu Takibi</h3>
<p>Düzenli tansiyon, nabız, ateş ve kan şekeri ölçümleri yaparak hastanın durumunu izliyoruz.</p>

<h3>5. İlaç Takibi ve Hatırlatma</h3>
<p>İlaç programlarının takibi, doğru dozaj kullanımı ve ilaç etkileşimlerinin kontrolü yapıyoruz.</p>

<h2>Evde Hemşirelik Hizmetinin Avantajları</h2>
<ul>
<li><strong>Kişiselleştirilmiş Bakım:</strong> Hastaya özel bakım planı</li>
<li><strong>Aile Desteği:</strong> Aile üyelerine eğitim ve rehberlik</li>
<li><strong>Hastane Enfeksiyonu Riski Yok:</strong> Evde güvenli ortam</li>
<li><strong>Maliyet Etkin:</strong> Hastane masraflarından tasarruf</li>
<li><strong>Psikolojik Destek:</strong> Hasta ve aile için moral desteği</li>
<li><strong>7/24 Erişim:</strong> Acil durumlarda destek</li>
</ul>

<h2>Sonuç</h2>
<p>Evde hemşirelik hizmeti, hasta konforunu artıran ve sağlık sonuçlarını iyileştiren önemli bir hizmettir. Nova Sağlık Hizmetleri olarak, deneyimli ekibimizle size kapsamlı evde hemşirelik hizmeti sunuyoruz. Hizmetlerimiz hakkında detaylı bilgi almak için bizimle iletişime geçin.</p>`,
        image: "/blog-images/hemsirelik-hizmetleri.jpg"
      },
      {
        title: "Evde Yara Bakımı: Profesyonel Pansuman Hizmetleri",
        excerpt: "Cerrahi yara bakımı, diyabetik yara tedavisi ve bası yarası önleme. Uzman hemşirelerimizle evde profesyonel yara bakımı.",
        category: "Yara Bakımı",
        content: `<h2>Evde Yara Bakımı Nedir?</h2>
<p>Evde yara bakımı, cerrahi yaralar, bası yaraları, diyabetik yaralar ve diğer cilt bütünlüğü bozulmalarının evde, profesyonel hemşireler tarafından tedavi edilmesi hizmetidir. Nova Sağlık Hizmetleri olarak, deneyimli hemşirelerimizle size evde güvenli yara bakımı sunuyoruz.</p>

<h2>Yara Bakımı Türleri</h2>
<h3>1. Cerrahi Yara Bakımı</h3>
<p>Ameliyat sonrası dikişlerin takibi, pansuman değişimi ve iyileşme sürecinin izlenmesi yapılır.</p>

<h3>2. Bası Yarası (Dekübit) Tedavisi ve Önleme</h3>
<p>Yatak yaralarının tedavisi ve yeniden oluşmasını önlemek için pozisyon değişikliği, özel yatak kullanımı gibi önlemler alınır.</p>

<h3>3. Diyabetik Yara Bakımı</h3>
<p>Diyabet hastalarında oluşan ayak yaralarının özel bakımı ve tedavisi yapılır. Düzenli kontrol ve uygun pansuman materyalleri kullanılır.</p>

<h3>4. Yanık Bakımı</h3>
<p>Yanık yaralarının steril pansumanı, enfeksiyon önleme ve iyileşme sürecinin takibi yapılır.</p>

<h2>Evde Yara Bakımının Avantajları</h2>
<ul>
<li><strong>Hijyenik Ortam:</strong> Ev ortamında steril pansuman</li>
<li><strong>Düzenli Takip:</strong> Yara iyileşme sürecinin günlük izlenmesi</li>
<li><strong>Enfeksiyon Önleme:</strong> Profesyonel tekniklerle enfeksiyon riski azaltılır</li>
<li><strong>Hasta Konforu:</strong> Hastane yolculuğu olmadan tedavi</li>
<li><strong>Maliyet Tasarrufu:</strong> Hastane masraflarından tasarruf</li>
</ul>

<h2>Sonuç</h2>
<p>Evde yara bakımı, yara iyileşmesini hızlandırır ve enfeksiyon riskini azaltır. Nova Sağlık Hizmetleri olarak, deneyimli hemşirelerimizle size profesyonel yara bakımı hizmeti sunuyoruz. Yara bakımı ihtiyacınız için hemen bizimle iletişime geçin.</p>`,
        image: "/blog-images/yara-bakimi.jpg"
      },
      {
        title: "Sonda ve Kateter Bakımı: Evde Güvenli Uygulama",
        excerpt: "Nazogastrik sonda, idrar sondası ve PEG bakımı. Uzman hemşirelerimizle evde sonda ve kateter bakım hizmetleri.",
        category: "Sonda ve Kateter Bakımı",
        content: `<h2>Evde Sonda ve Kateter Bakımı Nedir?</h2>
<p>Sonda ve kateter bakımı, beslenme veya idrar çıkışı için vücuda yerleştirilen tüplerin bakımı, değişimi ve enfeksiyon önleme hizmetidir. Nova Sağlık Hizmetleri olarak, deneyimli hemşirelerimizle size evde güvenli sonda ve kateter bakımı sunuyoruz.</p>

<h2>Sonda ve Kateter Türleri</h2>
<h3>1. Nazogastrik (NG) Sonda</h3>
<p>Burundan mideye uzanan, beslenme ve ilaç verme için kullanılan sondadır. Takılması, bakımı ve değişimi uzman hemşireler tarafından yapılır.</p>

<h3>2. Foley Sonda (İdrar Sondası)</h3>
<p>Mesaneden idrar çıkışını sağlayan kateterdir. Takılması, bakımı ve düzenli değişimi önemlidir.</p>

<h3>3. PEG (Gastrostomi) Bakımı</h3>
<p>Karından direkt mideye açılan, beslenme için kullanılan tüpün bakımı yapılır.</p>

<h2>Sonda ve Kateter Bakımının Önemi</h2>
<p>Düzenli ve doğru bakım, ciddi enfeksiyonları önler. Nova Sağlık ekibi olarak:</p>
<ul>
<li>Steril bakım teknikleri uygularız</li>
<li>Düzenli değişim programı oluştururuz</li>
<li>Enfeksiyon belirtilerini erken tespit ederiz</li>
<li>Aile üyelerine bakım eğitimi veririz</li>
</ul>

<h2>Sonuç</h2>
<p>Evde sonda ve kateter bakımı, hastanın konforunu artırır ve ciddi komplikasyonları önler. Nova Sağlık Hizmetleri olarak, deneyimli ekibimizle size güvenli sonda ve kateter bakımı hizmeti sunuyoruz. Detaylı bilgi ve randevu için bizimle iletişime geçin.</p>`,
        image: "/blog-images/sonda-kateter-bakimi.jpg"
      },
      {
        title: "Evde Tansiyon ve Şeker Ölçümü: Düzenli Takip Hizmeti",
        excerpt: "Kan basıncı ve kan şekeri ölçümü, vital bulgu takibi. Uzman hemşirelerimizle evde düzenli sağlık ölçümleri.",
        category: "Tansiyon ve Şeker Ölçümü",
        content: `<h2>Evde Tansiyon ve Şeker Ölçümü Nedir?</h2>
<p>Evde tansiyon ve şeker ölçümü, kronik hastalıkları olan bireylerin sağlık durumlarının düzenli takibi için yapılan önemli bir hizmettir. Nova Sağlık Hizmetleri olarak, uzman hemşirelerimizle size evde düzenli vital bulgu takibi sunuyoruz.</p>

<h2>Hangi Ölçümler Yapılır?</h2>
<h3>1. Kan Basıncı (Tansiyon) Ölçümü</h3>
<p>Hipertansiyon ve hipotansiyon takibi için düzenli kan basıncı ölçümü yapılır. Ölçüm sonuçları kaydedilir ve değerlendirilir.</p>

<h3>2. Kan Şekeri (Glukoz) Ölçümü</h3>
<p>Diyabet hastaları için öğün öncesi ve sonrası kan şekeri ölçümü yapılır. Sonuçlar grafik halinde takip edilir.</p>

<h3>3. Nabız Ölçümü</h3>
<p>Kalp ritmi ve nabız hızı kontrolü yapılır. Aritmi tespiti için düzenli takip önemlidir.</p>

<h3>4. Oksijen Saturasyonu (SpO2)</h3>
<p>Solunum fonksiyonlarının değerlendirilmesi için kandaki oksijen seviyesi ölçülür.</p>

<h2>Düzenli Takibin Önemi</h2>
<p>Kronik hastalıklarda düzenli takip:</p>
<ul>
<li>Erken komplikasyon tespiti sağlar</li>
<li>İlaç dozaj ayarlamasına yardımcı olur</li>
<li>Hastane yatışlarını azaltır</li>
<li>Yaşam kalitesini artırır</li>
</ul>

<h2>Sonuç</h2>
<p>Düzenli tansiyon ve şeker ölçümü, kronik hastalık yönetiminin temelidir. Nova Sağlık Hizmetleri olarak, deneyimli hemşirelerimizle size evde düzenli vital bulgu takibi hizmeti sunuyoruz. Sağlık takibiniz için bizimle iletişime geçin.</p>`,
        image: "/blog-images/tansiyon-seker-olcumu.jpg"
      },
      {
        title: "Taburcu Sonrası Bakım: Evde İyileşme Süreci",
        excerpt: "Ameliyat sonrası bakım, ilaç yönetimi ve komplikasyon önleme. Hastaneden taburcu sonrası profesyonel evde bakım hizmeti.",
        category: "Taburcu Sonrası Bakım",
        content: `<h2>Taburcu Sonrası Bakım Nedir?</h2>
<p>Taburcu sonrası bakım, hastaneden çıktıktan sonra evde devam eden tedavi ve iyileşme sürecinin profesyonel hemşireler tarafından yönetilmesidir. Nova Sağlık Hizmetleri olarak, ameliyat sonrası ve hastane taburcu sonrası evde kapsamlı bakım hizmeti sunuyoruz.</p>

<h2>Taburcu Sonrası Bakımın Önemi</h2>
<p>Hastane taburcu sonrası ilk 30 gün kritik bir dönemdir. Bu dönemde:</p>
<ul>
<li>Komplikasyonlar sıklıkla görülür</li>
<li>İlaç uyumu zor olabilir</li>
<li>Yara iyileşmesi devam eder</li>
<li>Mobilizasyon önemlidir</li>
<li>Enfeksiyon riski yüksektir</li>
</ul>
<p>Bu nedenle profesyonel bakım desteği kritiktir.</p>

<h2>Bakım Hizmetlerimiz</h2>
<h3>1. Ameliyat Sonrası Bakım</h3>
<ul>
<li>Dikiş takibi ve pansuman</li>
<li>Ağrı yönetimi</li>
<li>Mobilizasyon desteği</li>
<li>Nefes egzersizleri</li>
</ul>

<h3>2. İlaç Yönetimi</h3>
<ul>
<li>Doğru dozaj ve zamanlama</li>
<li>İlaç etkileşimleri kontrolü</li>
<li>Yan etki takibi</li>
</ul>

<h2>Sonuç</h2>
<p>Taburcu sonrası bakım, iyileşme sürecini hızlandırır ve ciddi komplikasyonları önler. Nova Sağlık Hizmetleri olarak, deneyimli ekibimizle size kapsamlı taburcu sonrası bakım hizmeti sunuyoruz. Hastaneden çıktıktan sonra güvenle iyileşmeniz için yanınızdayız.</p>`,
        image: "/blog-images/taburcu-sonrasi-bakim.jpg"
      },
      {
        title: "Yaşlı Bakımı: Evde Kapsamlı Hasta Bakım Hizmeti",
        excerpt: "Yaşlı hasta bakımı, günlük yaşam desteği ve refakatçi hizmetleri. Uzman hemşirelerimizle yaşlılar için özel bakım.",
        category: "Yaşlı Bakımı",
        content: `<h2>Evde Yaşlı Bakımı Nedir?</h2>
<p>Evde yaşlı bakımı, yaşlı bireylerin kendi evlerinde, ailelerinin yanında, profesyonel hemşireler tarafından verilen kapsamlı bakım hizmetidir. Nova Sağlık Hizmetleri olarak, yaşlıların yaşam kalitesini artırmak için özel bakım programları sunuyoruz.</p>

<h2>Yaşlı Bakımı Hizmetlerimiz</h2>
<h3>1. Günlük Yaşam Aktivitesi Desteği</h3>
<ul>
<li>Kişisel hijyen desteği (banyo, tuvalet)</li>
<li>Giyinme ve soyunma yardımı</li>
<li>Yemek yeme desteği</li>
<li>Mobilizasyon yardımı</li>
</ul>

<h3>2. Sağlık Bakımı</h3>
<ul>
<li>İlaç yönetimi ve takibi</li>
<li>Vital bulgu ölçümleri</li>
<li>Kronik hastalık takibi</li>
<li>Yara bakımı</li>
</ul>

<h3>3. Beslenme Desteği</h3>
<ul>
<li>Yaşlıya uygun beslenme planı</li>
<li>Yemek hazırlama desteği</li>
<li>Beslenme takibi</li>
</ul>

<h2>Yaşlı Bakımında Özel Dikkat Edilen Konular</h2>
<ul>
<li><strong>Düşme Önleme:</strong> Ev güvenliği değerlendirmesi</li>
<li><strong>İlaç Yönetimi:</strong> Çoklu ilaç kullanımı takibi</li>
<li><strong>Beslenme:</strong> Yutma güçlüğü, beslenme sorunları</li>
<li><strong>Bilişsel Fonksiyon:</strong> Demans, Alzheimer takibi</li>
<li><strong>Mobilite:</strong> Hareket desteği</li>
</ul>

<h2>Sonuç</h2>
<p>Evde yaşlı bakımı, yaşlıların yaşam kalitesini artırır ve ailelerin yükünü hafifletir. Nova Sağlık Hizmetleri olarak, deneyimli ve empatik ekibimizle size kapsamlı yaşlı bakımı hizmeti sunuyoruz. Sevdikleriniz için en iyi bakımı sağlamak için bizimle iletişime geçin.</p>`,
        image: "/blog-images/yasli-bakimi.jpg"
      },
      {
        title: "Evde Fizik Tedavi Desteği: Rehabilitasyon Hizmetleri",
        excerpt: "Hareket kısıtlılığı egzersizleri, denge çalışmaları ve post-operatif rehabilitasyon. Evde fizik tedavi desteği.",
        category: "Fizik Tedavi Desteği",
        content: `<h2>Evde Fizik Tedavi Desteği Nedir?</h2>
<p>Evde fizik tedavi desteği, hareket kısıtlılığı, güçsüzlük veya ameliyat sonrası rehabilitasyon ihtiyacı olan bireylere kendi evlerinde sunulan egzersiz ve rehabilitasyon hizmetidir. Nova Sağlık Hizmetleri olarak, deneyimli hemşirelerimizle size evde fizik tedavi desteği sunuyoruz.</p>

<h2>Fizik Tedavi Desteği Kapsamı</h2>
<h3>1. Hareket Kısıtlılığı Egzersizleri</h3>
<p>Eklem hareket açıklığını artırmak için özel egzersiz programları uygulanır.</p>

<h3>2. Kas Güçlendirme</h3>
<p>Zayıflamış kasları güçlendirmek için direnç egzersizleri yapılır.</p>

<h3>3. Denge ve Koordinasyon Çalışmaları</h3>
<p>Düşme riskini azaltmak için denge egzersizleri ve koordinasyon çalışmaları uygulanır.</p>

<h3>4. Post-Operatif Rehabilitasyon</h3>
<p>Ameliyat sonrası iyileşme sürecini hızlandırmak için özel rehabilitasyon programları uygulanır.</p>

<h2>Hangi Durumlarda Fizik Tedavi Gerekir?</h2>
<ul>
<li>Ameliyat sonrası (diz, kalça, omuz)</li>
<li>Felç (inme) sonrası rehabilitasyon</li>
<li>Kırık sonrası iyileşme</li>
<li>Yatalak hasta mobilizasyonu</li>
<li>Eklem ağrıları ve hareket kısıtlılığı</li>
<li>Yaşlılığa bağlı güçsüzlük</li>
</ul>

<h2>Evde Fizik Tedavinin Avantajları</h2>
<ul>
<li><strong>Konforlu Ortam:</strong> Kendi evinizde çalışın</li>
<li><strong>Kişiselleştirilmiş Program:</strong> Size özel egzersizler</li>
<li><strong>Pratik Uygulama:</strong> Günlük yaşam aktivitelerine entegre</li>
<li><strong>Aile Katılımı:</strong> Aile üyeleri de öğrenir</li>
</ul>

<h2>Sonuç</h2>
<p>Evde fizik tedavi desteği, iyileşme sürecini hızlandırır ve bağımsızlığı artırır. Nova Sağlık Hizmetleri olarak, deneyimli ekibimizle size evde fizik tedavi desteği hizmeti sunuyoruz. Hareket özgürlüğünüze kavuşmak için bizimle iletişime geçin.</p>`,
        image: "/blog-images/fizik-tedavi-destegi.jpg"
      }
    ];

    const created = []
    const skipped = []

    for (const post of blogPosts) {
      try {
        // Generate slug from title
        const slug = post.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()

        // Check if post already exists
        const existing = await prisma.blogPost.findUnique({
          where: { slug }
        })

        if (existing) {
          skipped.push(post.title)
          console.log(`⏭️  Blog post already exists: ${post.title}`)
          continue
        }

        const blog = await prisma.blogPost.create({
          data: {
            title: post.title,
            slug: slug,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            image: post.image,
            published: true
          }
        })

        created.push(blog.title)
        console.log(`✅ Blog post created: ${post.title}`)
      } catch (error: any) {
        if (error.code === 'P2002') {
          skipped.push(post.title)
          console.log(`⏭️  Blog post already exists: ${post.title}`)
        } else {
          console.error(`❌ Error creating blog post ${post.title}:`, error)
          throw error
        }
      }
    }

    console.log('🎉 Blog posts seeding completed!')
    console.log(`Created: ${created.length}, Skipped: ${skipped.length}`)

    return NextResponse.json({
      success: true,
      message: 'Blog yazıları başarıyla eklendi',
      created: created.length,
      skipped: skipped.length,
      posts: [...created, ...skipped]
    })
  } catch (error) {
    console.error('❌ Seeding error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to seed blog posts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}


