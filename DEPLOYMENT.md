# Nova Sağlık - Deployment Rehberi

## 🌐 Domain Yapılandırması (Vercel)

### Adım 1: Domain Satın Alma
1. Vercel Dashboard → Projeniz → **Settings** → **Domains**
2. **Add Domain** butonuna tıklayın
3. Domain adınızı girin (örn: `novasaglik.com`)
4. Vercel size domain satın alma seçenekleri sunacak veya kendi domain'inizi ekleyebilirsiniz

### Adım 2: Kendi Domain'inizi Bağlama
Eğer domain'i başka bir yerden satın aldıysanız:

1. **Vercel Dashboard** → **Settings** → **Domains** → **Add Domain**
2. Domain adınızı girin (örn: `novasaglik.com`)
3. Vercel size DNS kayıtlarını gösterecek:
   - **A Record**: `76.76.21.21` (Vercel IP)
   - **CNAME Record**: `cname.vercel-dns.com`

4. **Domain sağlayıcınızda DNS ayarları:**
   - Domain sağlayıcınızın DNS yönetim paneline gidin
   - Aşağıdaki kayıtları ekleyin:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

5. **SSL Sertifikası:**
   - Vercel otomatik olarak SSL sertifikası sağlar
   - Domain bağlandıktan sonra birkaç dakika içinde aktif olur

### Adım 3: Domain Doğrulama
- DNS kayıtları 24-48 saat içinde yayınlanır
- Vercel Dashboard'da domain durumunu kontrol edebilirsiniz
- "Valid Configuration" göründüğünde domain hazırdır

---

## 🗄️ Veritabanı Yapılandırması

### Vercel Postgres Kurulumu

1. **Vercel Dashboard** → Projeniz → **Storage** sekmesi
2. **Create Database** → **Postgres** seçin
3. Veritabanı adını girin (örn: `novasaglik-db`)
4. **Create** tıklayın
5. `DATABASE_URL` otomatik olarak environment variable olarak eklenecek

### Migration Çalıştırma

```bash
# Vercel CLI ile environment variables'ı çekin
npx vercel env pull .env.local

# Migration çalıştırın
npx prisma migrate deploy
```

Veya Vercel Dashboard'dan yeni bir deployment tetikleyin (build sırasında migration çalışacak).

---

## 📧 Email Bildirimleri (Opsiyonel)

Randevu sistemine email bildirimleri eklemek için:

### Resend Kullanımı (Önerilen)

1. **Resend hesabı oluşturun:** https://resend.com
2. **API Key alın**
3. **Vercel Environment Variables ekleyin:**
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ADMIN_EMAIL=admin@novasaglik.com
   ```

4. **Package yükleyin:**
   ```bash
   npm install resend
   ```

5. **Email servisi oluşturun:** `lib/email.ts`
6. **Randevu API'sinde email gönderimi ekleyin**

---

## 🔔 Randevu Sistemi Özellikleri

### Mevcut Özellikler:
- ✅ Randevu oluşturma formu
- ✅ Randevu çakışma kontrolü
- ✅ Admin panelinde randevu yönetimi
- ✅ Randevu durumu güncelleme (pending, confirmed, completed, cancelled)
- ✅ Randevu filtreleme (tümü, bekleyen, onaylanan, tamamlanan, iptal)

### Gelecek Geliştirmeler:
- 📧 Email bildirimleri (randevu onayı, hatırlatma)
- 📱 SMS bildirimleri (opsiyonel)
- 📅 Takvim entegrasyonu
- 🔄 Otomatik hatırlatmalar (24 saat öncesi)
- 📊 Randevu istatistikleri ve raporları

---

## 🔐 Güvenlik Ayarları

### Environment Variables (Vercel Dashboard → Settings → Environment Variables):

```
DATABASE_URL=postgresql://... (Vercel Postgres otomatik ekler)
JWT_SECRET=güçlü-bir-secret-key-en-az-32-karakter
NODE_ENV=production
ADMIN_CREATE_SECRET=geçici-admin-oluşturma-secret (kullanıldıktan sonra silin)
```

### Önemli Notlar:
- `JWT_SECRET` için güçlü bir anahtar kullanın
- `ADMIN_CREATE_SECRET` admin oluşturduktan sonra silin
- Production'da `NODE_ENV=production` olduğundan emin olun

---

## 📱 Randevu Sistemi Kullanımı

### Müşteri Tarafı:
1. `/randevu` sayfasına gidin
2. Formu doldurun:
   - Ad Soyad
   - Email
   - Telefon
   - Hizmet seçin
   - Tarih ve saat seçin
   - Mesaj (opsiyonel)
3. **Randevu Talebini Gönder** butonuna tıklayın
4. Sistem çakışma kontrolü yapar
5. Randevu `pending` durumunda oluşturulur

### Admin Tarafı:
1. `/admin/login` ile giriş yapın
2. **Randevular** menüsüne gidin
3. Randevuları görüntüleyin ve yönetin:
   - **Onayla**: Randevuyu onaylayın
   - **Tamamla**: Randevuyu tamamlandı olarak işaretleyin
   - **İptal Et**: Randevuyu iptal edin
   - **Sil**: Randevuyu silin

---

## 🚀 Production Checklist

- [ ] Vercel Postgres oluşturuldu
- [ ] Migration'lar çalıştırıldı
- [ ] Admin kullanıcısı oluşturuldu
- [ ] Domain bağlandı ve SSL aktif
- [ ] Environment variables ayarlandı
- [ ] JWT_SECRET güçlü bir değer
- [ ] ADMIN_CREATE_SECRET silindi (güvenlik)
- [ ] Test randevusu oluşturuldu
- [ ] Email bildirimleri test edildi (opsiyonel)

---

## 📞 Destek

Sorularınız için:
- Vercel Dokümantasyon: https://vercel.com/docs
- Prisma Dokümantasyon: https://www.prisma.io/docs

