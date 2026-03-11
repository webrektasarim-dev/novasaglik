# Vercel Postgres Bağlantı Sorunu Çözümü

503 hatası alıyorsanız, Vercel Postgres'e bağlanamıyorsunuz demektir. Aşağıdaki adımları izleyin.

## 🔍 Adım 1: Vercel Dashboard'da Veritabanı Kontrolü

1. **Vercel Dashboard'a gidin:** https://vercel.com/dashboard
2. **Projenizi seçin:** `novasaglik` veya proje adınız
3. **Storage** sekmesine tıklayın
4. **Postgres veritabanınızı** kontrol edin:
   - Veritabanı görünüyor mu?
   - Durum "Active" mi?
   - Eğer görünmüyorsa veya silinmişse, yeni bir tane oluşturun

## 🔧 Adım 2: DATABASE_URL Kontrolü

1. **Vercel Dashboard** → **Settings** → **Environment Variables**
2. **`DATABASE_URL`** değişkenini kontrol edin:
   - Var mı?
   - Değeri doğru mu?
   - Eğer yoksa veya yanlışsa, Storage'dan yeni connection string alın

## 🚀 Adım 3: Migration'ları Çalıştırın

Vercel Postgres oluşturulduktan sonra migration'ları çalıştırmanız gerekir.

### Yöntem 1: Vercel CLI ile (Önerilen)

```bash
# Vercel CLI ile environment variables'ı çek
npx vercel env pull .env.local

# Migration'ları çalıştır
npx prisma migrate deploy
```

### Yöntem 2: Vercel Dashboard'dan

1. **Vercel Dashboard** → **Deployments**
2. **En son deployment'a** tıklayın
3. **Redeploy** yapın (migration'lar build sırasında çalışacak)

## 📝 Adım 4: Blog Verilerini Yükleyin

Migration'lar çalıştıktan sonra blog verilerini yükleyin:

### API Üzerinden (Production)

Tarayıcıda veya Postman'de:

```bash
# Kategorileri yükle
POST https://www.novasaglikhizmeti.com/api/categories/seed

# Blog yazılarını yükle
POST https://www.novasaglikhizmeti.com/api/blogs/seed
```

### Local'den (DATABASE_URL production'a işaret ediyorsa)

```bash
# Environment variable'ı ayarla
$env:DATABASE_URL="vercel-postgres-connection-string"

# Kategorileri yükle
tsx prisma/seed-categories.ts

# Blog yazılarını yükle
tsx prisma/seed-blogs.ts

# Admin kullanıcısı oluştur
npm run db:seed
```

## ✅ Adım 5: Bağlantıyı Test Edin

1. **Siteyi yenileyin:** https://www.novasaglikhizmeti.com/blog
2. **Blog yazıları görünüyor mu?** kontrol edin
3. **Admin panelinden:** `/admin/blogs` - Blog yazılarını kontrol edin

## 🚨 Sorun Devam Ediyorsa

### Vercel Postgres Yeniden Oluşturma

Eğer veritabanı silinmişse:

1. **Vercel Dashboard** → **Storage** → **Create Database** → **Postgres**
2. **Veritabanı adını girin** (örn: `novasaglik-db`)
3. **Create** tıklayın
4. **`DATABASE_URL` otomatik eklenir**
5. **Migration'ları çalıştırın** (Adım 3)
6. **Verileri yükleyin** (Adım 4)

### Vercel Logs Kontrolü

1. **Vercel Dashboard** → **Deployments** → **Functions** → **Logs**
2. **Hata mesajlarını** kontrol edin
3. **Veritabanı bağlantı hatalarını** arayın

## 📋 Hızlı Checklist

- [ ] Vercel Dashboard'da Postgres veritabanı var mı?
- [ ] `DATABASE_URL` environment variable tanımlı mı?
- [ ] Migration'lar çalıştırıldı mı?
- [ ] Blog verileri yüklendi mi?
- [ ] Site çalışıyor mu?

## 🔗 İlgili Dosyalar

- Migration dosyaları: `prisma/migrations/`
- Seed dosyaları: `prisma/seed-*.ts`
- API routes: `app/api/blogs/`, `app/api/categories/`




