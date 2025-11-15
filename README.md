# Nova Sağlık - Sağlık Hizmetleri Web Sitesi

Modern ve kullanıcı dostu sağlık hizmetleri web sitesi. Next.js 15, TypeScript, Prisma ve Tailwind CSS ile geliştirilmiştir.

## 🚀 Özellikler

- ✅ Responsive tasarım (mobil uyumlu)
- ✅ Blog yönetim sistemi
- ✅ Randevu alma formu
- ✅ İletişim formu
- ✅ Admin paneli
- ✅ Kategori yönetimi
- ✅ SEO optimizasyonu

## 📋 Gereksinimler

- Node.js 20.x veya üzeri
- npm veya yarn
- PostgreSQL (production için)

## 🛠️ Kurulum

### 1. Projeyi klonlayın

```bash
git clone <repo-url>
cd novasaglik
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Environment değişkenlerini ayarlayın

`.env` dosyası oluşturun:

```env
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
NODE_ENV=development
```

### 4. Veritabanını hazırlayın

```bash
# Migration çalıştır
npx prisma migrate dev

# (Opsiyonel) Test verisi ekle
npm run db:seed
```

### 5. Development server'ı başlatın

```bash
npm run dev
```

Site `http://localhost:3000` adresinde çalışacaktır.

## 🌐 Vercel'e Deploy Etme

### Adım 1: GitHub'a Yükleme

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/kullaniciadi/novasaglik.git
git push -u origin main
```

### Adım 2: Vercel'e Bağlama

1. [Vercel](https://vercel.com) hesabı oluşturun (GitHub ile giriş yapın)
2. "Add New Project" butonuna tıklayın
3. GitHub repository'nizi seçin
4. Framework Preset: **Next.js** (otomatik algılanır)
5. Root Directory: `.` (boş bırakın)
6. Build Command: `npm run build` (otomatik)
7. Output Directory: `.next` (otomatik)
8. Install Command: `npm install` (otomatik)

### Adım 3: Vercel Postgres Veritabanı Oluşturma

1. Vercel Dashboard'da projenize gidin
2. **Storage** sekmesine tıklayın
3. **Create Database** → **Postgres** seçin
4. Veritabanı adını girin ve oluşturun
5. `DATABASE_URL` otomatik olarak environment variable olarak eklenecek

### Adım 4: Environment Variables Ekleme

Vercel Dashboard → Settings → Environment Variables:

```
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this
NODE_ENV=production
```

**Not:** `DATABASE_URL` Vercel Postgres oluşturulduğunda otomatik eklenir.

### Adım 5: İlk Migration'ı Çalıştırma

Deploy sonrası, Vercel Dashboard → Deployments → en son deployment'a tıklayın → **Functions** sekmesi → Logs'u kontrol edin.

Veya terminal'den:

```bash
# Vercel CLI ile
vercel env pull .env.local
npx prisma migrate deploy
```

### Adım 6: Admin Kullanıcısı Oluşturma

Production'da admin kullanıcısı oluşturmak için:

1. Vercel Dashboard → Functions → API route oluşturun veya
2. Local'de seed script çalıştırın (DATABASE_URL production'a işaret ediyorsa)

```bash
npm run db:seed
```

## 📁 Proje Yapısı

```
novasaglik/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin paneli
│   ├── api/               # API routes
│   ├── blog/              # Blog sayfaları
│   └── ...                # Diğer sayfalar
├── components/            # React bileşenleri
├── lib/                   # Yardımcı fonksiyonlar
├── prisma/                # Prisma schema ve migrations
└── public/                # Statik dosyalar
```

## 🔧 Kullanılabilir Komutlar

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint kontrolü
npm run db:seed      # Veritabanı seed (test verisi)
npm run db:studio    # Prisma Studio (veritabanı GUI)
npm run db:migrate   # Yeni migration oluştur
npm run db:push      # Schema'yı veritabanına push et
```

## 🔐 Admin Paneli

Admin paneline erişim: `/admin/login`

**Not:** İlk admin kullanıcısını seed script ile oluşturabilirsiniz.

## 📝 Notlar

- **Dosya Yükleme:** Blog görselleri `public/blog-images/` klasörüne kaydedilir. Production'da kalıcı depolama için AWS S3 veya Cloudinary kullanılması önerilir.
- **Veritabanı:** Development'ta SQLite, production'da PostgreSQL kullanılır.
- **SSL:** Vercel otomatik SSL sertifikası sağlar.

## 🐛 Sorun Giderme

### Build hatası alıyorum

- `prisma generate` komutunu çalıştırın
- `node_modules` ve `.next` klasörlerini silip `npm install` yapın

### Veritabanı bağlantı hatası

- `DATABASE_URL` environment variable'ının doğru olduğundan emin olun
- Vercel Postgres'in aktif olduğunu kontrol edin

### Migration hatası

- `npx prisma migrate deploy` komutunu çalıştırın
- Vercel build logs'unu kontrol edin

## 📞 Destek

Sorularınız için issue açabilirsiniz.

## 📄 Lisans

Bu proje özel bir projedir.

