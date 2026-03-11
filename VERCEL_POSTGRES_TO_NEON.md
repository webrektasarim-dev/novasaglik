# Vercel Postgres'ten Neon'a Veri Import Etme Rehberi

Vercel Postgres veritabanınızdan Neon'a veri import etmek için bu rehberi kullanın.

## 🔍 Vercel Postgres Connection String Bulma

### Yöntem 1: Vercel Dashboard - Storage (Önerilen)

1. **Vercel Dashboard'a gidin:** https://vercel.com/dashboard
2. **Projenizi seçin:** `novasaglik` veya proje adınız
3. **Storage** sekmesine tıklayın
4. **Postgres veritabanınızı** bulun ve tıklayın
5. **Connection string'i kopyalayın:**
   - **.env.local** formatında veya
   - **Connection string** formatında

### Yöntem 2: Vercel Dashboard - Environment Variables

1. **Vercel Dashboard** → Projeniz → **Settings** → **Environment Variables**
2. **`DATABASE_URL`** değişkenini bulun
3. **Değeri göster** ve kopyalayın
4. Bu connection string Vercel Postgres'e işaret ediyor

### Yöntem 3: Vercel CLI ile

```bash
# Vercel CLI ile environment variables'ı çek
npx vercel env pull .env.local

# .env.local dosyasını açın
# DATABASE_URL değerini kopyalayın
```

## 📋 Vercel Postgres Connection String Formatı

Vercel Postgres connection string şu formatta olur:

```
postgres://default:[password]@[host]:[port]/verceldb?sslmode=require
```

Veya:

```
postgresql://default:[password]@[host]:[port]/verceldb?sslmode=require
```

Örnek:
```
postgres://default:AbCdEf123456@ep-xyz-123456.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require
```

## 🚀 Neon Import Data Assistant Kullanımı

### Adım 1: Vercel Postgres Connection String'i Alın

1. **Vercel Dashboard** → **Storage** → **Postgres**
2. **Connection string'i kopyalayın**

### Adım 2: Neon'da Yeni Proje Oluşturun

1. **Neon Dashboard'a gidin:** https://console.neon.tech
2. **New Project** butonuna tıklayın
3. **Proje adını girin** (örn: `novasaglik-production`)
4. **Region seçin** (örn: `EU (Frankfurt)`)
5. **Create Project** tıklayın

### Adım 3: Import Data Assistant'ı Kullanın

1. **Neon Dashboard'da** yeni projenizi açın
2. **Import Data Assistant** butonuna tıklayın
3. **"Check compatibility"** butonuna tıklayın
4. **Vercel Postgres connection string'ini yapıştırın:**
   ```
   postgres://default:[password]@[host]:[port]/verceldb?sslmode=require
   ```
5. **"Check compatibility"** butonuna tıklayın
6. **Compatibility check sonuçlarını** kontrol edin
7. **Uyumluysa "Import"** butonuna tıklayın

## ⚠️ Önemli Notlar

1. **SSL Mode:**
   - Vercel Postgres için `?sslmode=require` gerekli
   - Neon Import Data Assistant bunu otomatik ekler

2. **Veri Boyutu:**
   - Büyük veritabanları için import işlemi zaman alabilir
   - İşlem sırasında Vercel Postgres'e bağlantı kurulur

3. **Downtime:**
   - Import işlemi sırasında Vercel Postgres'e yazma yapmayın
   - Import tamamlandıktan sonra `DATABASE_URL`'i güncelleyin

## 🔄 Import Sonrası

### Adım 1: Migration'ları Kontrol Edin

```bash
# Neon'a bağlanarak migration'ları kontrol edin
DATABASE_URL="neon-connection-string" npx prisma migrate status
```

### Adım 2: Verileri Doğrulayın

```bash
# Prisma Studio ile veritabanını görüntüle
DATABASE_URL="neon-connection-string" npx prisma studio
```

### Adım 3: Vercel'de DATABASE_URL'i Güncelleyin

1. **Vercel Dashboard** → **Settings** → **Environment Variables**
2. **`DATABASE_URL`** değişkenini bulun
3. **Edit** butonuna tıklayın
4. **Yeni Neon connection string'ini** yapıştırın
5. **Save** tıklayın
6. **Redeploy** yapın

## 📊 Veri Doğrulama

Import sonrası verilerin doğru geldiğini kontrol edin:

1. **Admin Panel:** `/admin/blogs` - Blog yazılarını kontrol edin
2. **Admin Panel:** `/admin/categories` - Kategorileri kontrol edin
3. **Admin Panel:** `/admin/appointments` - Randevuları kontrol edin
4. **Admin Panel:** `/admin/contacts` - İletişim mesajlarını kontrol edin

## 🚨 Sorun Giderme

### Connection string bulamıyorum

1. Vercel Dashboard → Storage → Postgres kontrol edin
2. Environment Variables'da `DATABASE_URL` kontrol edin
3. Vercel CLI ile `vercel env pull` yapın

### Import başarısız oluyor

1. Connection string'in doğru olduğundan emin olun
2. Vercel Postgres'in aktif olduğunu kontrol edin
3. SSL mode'un (`?sslmode=require`) eklendiğinden emin olun
4. Neon support ile iletişime geçin

### Veriler eksik

1. Import log'larını kontrol edin
2. Vercel Postgres'te verilerin olduğunu doğrulayın
3. Gerekirse manuel export/import yapın

## ✅ Checklist

- [ ] Vercel Postgres connection string'i bulundu
- [ ] Neon'da yeni proje oluşturuldu
- [ ] Import Data Assistant ile compatibility check yapıldı
- [ ] Import işlemi başarıyla tamamlandı
- [ ] Veriler doğrulandı
- [ ] Vercel'de `DATABASE_URL` güncellendi
- [ ] Redeploy yapıldı
- [ ] Site çalışıyor ve veriler görünüyor




