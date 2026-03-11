# Veritabanı Verilerini Geri Getirme Rehberi

Eğer Neon veritabanı silinmiş veya veriler kaybolmuşsa, bu rehberi kullanarak verilerinizi geri getirebilirsiniz.

## 🔍 Önce Kontrol Edin

1. **Neon Dashboard'da veritabanı durumunu kontrol edin:**
   - https://console.neon.tech
   - Projenizi açın
   - Veritabanı suspend edilmişse "Resume" ile başlatın
   - Eğer gerçekten silinmişse aşağıdaki adımları izleyin

## 📋 Veri Geri Getirme Yöntemleri

### Yöntem 1: Neon Point-in-Time Recovery (En Hızlı) ⭐

Neon otomatik olarak veritabanınızı yedekler ve Point-in-Time Recovery özelliği sunar.

1. **Neon Dashboard'a gidin:** https://console.neon.tech
2. **Projenizi açın**
3. **Branches** sekmesine gidin
4. **Time Travel** özelliğini kullanın
5. **Silinmeden önceki bir zamanı seçin**
6. **Restore** butonuna tıklayın

Bu yöntem tüm verilerinizi geri getirir.

---

### Yöntem 2: Local SQLite Veritabanından Export/Import

Eğer local'de `prisma/dev.db` dosyanız varsa ve orada verileriniz varsa:

#### Adım 1: Local SQLite'dan Veri Export Et

```bash
# Local SQLite veritabanından verileri export et
npm run db:export
```

Bu komut `backup-data.json` dosyası oluşturur.

#### Adım 2: Neon Veritabanına Import Et

1. **Neon Dashboard'da yeni bir veritabanı oluşturun** (eğer silinmişse)
2. **Vercel'de `DATABASE_URL` environment variable'ını güncelleyin**
3. **Migration'ları çalıştırın:**

```bash
# Migration'ları çalıştır
npm run db:deploy
```

4. **Export edilen verileri import edin:**

```bash
# DATABASE_URL Neon'a işaret ediyor olmalı
npm run db:import
```

---

### Yöntem 3: Seed Dosyalarını Kullanarak Temel Verileri Geri Yükleme

Eğer hiçbir backup yoksa, seed dosyalarını kullanarak temel verileri geri yükleyebilirsiniz:

#### Adım 1: Migration'ları Çalıştır

```bash
npm run db:deploy
```

#### Adım 2: Kategorileri Yükle

```bash
# API üzerinden
curl -X POST https://www.novasaglikhizmeti.com/api/categories/seed

# Veya local'de
tsx prisma/seed-categories.ts
```

#### Adım 3: Blog Yazılarını Yükle

```bash
# API üzerinden
curl -X POST https://www.novasaglikhizmeti.com/api/blogs/seed

# Veya local'de
tsx prisma/seed-blogs.ts
```

#### Adım 4: Admin Kullanıcısı Oluştur

```bash
npm run db:seed
```

Bu komut admin kullanıcısı oluşturur:
- Email: `admin@novasaglik.com`
- Password: `novasaglik2025`

---

## 🚨 Önemli Notlar

1. **Backup Alın:** Gelecekte veri kaybını önlemek için düzenli backup alın
2. **Neon Auto-Suspend:** Production için auto-suspend'i kapatın
3. **Environment Variables:** `DATABASE_URL`'in doğru olduğundan emin olun

---

## 📞 Yardım

Eğer sorun yaşıyorsanız:
1. Neon Dashboard'da veritabanı durumunu kontrol edin
2. Vercel logs'ları kontrol edin
3. Migration dosyalarını kontrol edin

---

## ✅ Başarı Kontrolü

Verilerin geri yüklendiğini kontrol etmek için:

```bash
# Prisma Studio ile veritabanını görüntüle
npm run db:studio
```

Veya admin panelinden:
- `/admin/blogs` - Blog yazılarını kontrol edin
- `/admin/categories` - Kategorileri kontrol edin




