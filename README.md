# Kendin Denetle

Hayatınızdaki her şey için kontrol listelerini yönetmenize yardımcı olan, mobil öncelikli bir Progressive Web App (PWA). Kontrol listeleri `checklists` klasöründeki markdown dosyaları aracılığıyla oluşturulur.

## Özellikler

- 📱 Mobil öncelikli responsive tasarım
- 📋 Etkileşimli kontrol listeleri
- 🔍 Kategorize edilmiş listeler
- 📝 Markdown tabanlı içerik
- 🌐 Çevrimdışı erişim için PWA desteği

## Başlangıç

1. Projeyi klonlayın:
```bash
git clone https://github.com/f/kendin-denetle.git
cd kendin-denetle
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak sonucu görüntüleyin.

## Yeni Kontrol Listesi Ekleme

1. `checklists` klasöründe yeni bir markdown dosyası oluşturun
2. Başlık, açıklama ve kategori bilgilerini içeren frontmatter ekleyin:
```markdown
---
title: Kontrol Listesi Başlığı
description: Kontrol listesinin kısa açıklaması
category: Kategori Adı
---
```
3. Markdown kullanarak kontrol listesi öğelerini ekleyin:
```markdown
## Bölüm Başlığı

[] Kontrol edilecek ilk madde
[] Kontrol edilecek ikinci madde
[] Kontrol edilecek üçüncü madde
```

## Katkıda Bulunma

Katkılarınızı bekliyoruz! Pull Request göndermekten çekinmeyin. 