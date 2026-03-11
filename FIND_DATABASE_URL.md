# DATABASE_URL Bulma Rehberi

Neon Import Data Assistant için eski veritabanı bağlantı string'ini bulma yöntemleri.

## 🔍 Yöntem 1: Vercel Dashboard'dan (Önerilen)

1. **Vercel Dashboard'a gidin:** https://vercel.com/dashboard
2. **Projenizi seçin:** `novasaglik` veya proje adınız
3. **Settings** → **Environment Variables** sekmesine gidin
4. **`DATABASE_URL`** değişkenini bulun
5. **Değeri kopyalayın** (göster butonuna tıklayın)
6. **Neon Import Data Assistant'a yapıştırın**

## 🔍 Yöntem 2: Neon Dashboard'dan

1. **Neon Dashboard'a gidin:** https://console.neon.tech
2. **Projenizi açın:** `ep-withered-mouse-ags58v4m` veya proje adınız
3. **Connection Details** sekmesine gidin
4. **Connection string'i kopyalayın:**
   - **Pooler connection** (önerilen) veya
   - **Direct connection**
5. **Neon Import Data Assistant'a yapıştırın**

## 🔍 Yöntem 3: Vercel CLI ile

Eğer Vercel CLI yüklüyse:

```bash
# Vercel CLI ile environment variables'ı çek
npx vercel env pull .env.local

# .env.local dosyasını açın
# DATABASE_URL değerini kopyalayın
```

## 📋 Connection String Formatı

Neon connection string şu formatta olmalı:

```
postgresql://[user]:[password]@[host]:[port]/[database]?sslmode=require
```

Örnek:
```
postgresql://user:password@ep-withered-mouse-ags58v4m-pooler.c-2.eu-central-1.aws.neon.tech:5432/neondb?sslmode=require
```

## ⚠️ Önemli Notlar

1. **Pooler vs Direct:**
   - **Pooler connection** (önerilen): `-pooler` içeren URL
   - **Direct connection**: `-pooler` içermeyen URL

2. **SSL Mode:**
   - Neon için `?sslmode=require` eklenmeli

3. **Güvenlik:**
   - Connection string'i paylaşırken dikkatli olun
   - Şifre içerir!

## 🚀 Neon Import Data Assistant Kullanımı

1. **Neon Dashboard'a gidin**
2. **Yeni proje oluşturun** (veya mevcut projeyi açın)
3. **Import Data Assistant'ı açın**
4. **"Check compatibility"** butonuna tıklayın
5. **Eski veritabanı connection string'ini yapıştırın**
6. **Compatibility check'i çalıştırın**
7. **Import işlemini başlatın**

## 📞 Yardım

Eğer connection string'i bulamıyorsanız:
1. Vercel Dashboard → Settings → Environment Variables kontrol edin
2. Neon Dashboard → Connection Details kontrol edin
3. Eski deployment logs'larını kontrol edin




