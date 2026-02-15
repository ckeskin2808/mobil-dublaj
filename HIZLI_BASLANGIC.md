# 📱 YouTube Türkçe Dublaj - Android APK

YouTube videolarını otomatik Türkçe dublajlayan mobil uygulama.

## 🚀 Hızlı Başlangıç

### 3 Seçeneğiniz Var:

---

## ✅ SEÇENEK 1: Hazır APK İndir (EN KOLAY) ⭐

**Python bilgisi gerektirmez - Sadece indir ve kur!**

1. **APK İndir**: 
   - GitHub Releases'dan `youtube-dublaj.apk` dosyasını indirin
   - Veya doğrudan linki telefonunuzda açın

2. **Güvenlik Ayarı**:
   - Telefonunuzda: Ayarlar → Güvenlik → "Bilinmeyen kaynaklardan yükleme" ✓

3. **APK'yı Kur**:
   - İndirilen APK'ya dokunun
   - "Yükle" deyin
   - Bitti! 🎉

4. **Kullanın**:
   - Uygulamayı açın
   - YouTube linkini yapıştırın
   - "Dublajı Başlat" butonuna basın

**NOT**: APK çalışması için internet bağlantısı ve backend API gerekir (aşağıya bakın).

---

## 🛠️ SEÇENEK 2: APK'yı Kendiniz Oluşturun (ORTA SEVİYE)

**React Native bilgisi gerektirir**

### Gereksinimler:
```bash
- Node.js v18+
- Android Studio
- JDK 11
- React Native CLI
```

### Kurulum:
```bash
# 1. Proje bağımlılıklarını yükle
npm install

# 2. Android Emulator veya gerçek cihaz hazırla

# 3. Development modda test et
npm run android

# 4. Release APK oluştur
cd android
./gradlew assembleRelease

# APK buradadır:
# android/app/build/outputs/apk/release/app-release.apk
```

**Detaylı kurulum için**: `APK_KURULUM_KILAVUZU.md` dosyasına bakın

---

## 🐍 SEÇENEK 3: Sadece Python Scriptlerini Kullan (KOLAY)

**APK istemiyorsanız - Bilgisayarınızda Python ile çalıştırın**

```bash
# 1. Gereksinimleri kurun
pip install openai-whisper yt-dlp gtts --break-system-packages
sudo apt install ffmpeg  # Ubuntu/Debian

# 2. Scripti çalıştırın
python youtube_dublaj_advanced.py "YOUTUBE_URL"

# 3. Dublajlı video hazır!
```

**Detaylı kullanım için**: `README.md` dosyasına bakın

---

## 🌐 Backend API Kurulumu (APK için ZORUNLU)

APK'nın çalışması için bir backend API'ye ihtiyacınız var:

### A) Yerel Sunucu (Test için):

```bash
# Flask API'yi başlatın
pip install flask flask-cors
python api_server.py

# API şu adreste çalışacak: http://localhost:5000
```

### B) Cloud Deployment (Üretim için):

**Railway.app ile (ÜCRETSİZ):**

1. [Railway.app](https://railway.app) hesabı oluşturun
2. "New Project" → "Deploy from GitHub"
3. Bu repo'yu seçin
4. Otomatik deploy edilecek
5. URL'yi kopyalayın (örn: `https://your-app.railway.app`)

**App.js'te API URL'yi güncelleyin:**
```javascript
const API_URL = 'https://your-app.railway.app/api/dubbing';
```

**Alternatif Cloud Platformlar:**
- Render.com (ücretsiz tier)
- Heroku (ücretsiz tier kaldırıldı)
- Vercel (serverless)
- Google Cloud Run
- AWS Lambda

---

## 📱 Uygulama Özellikleri

✅ **Kolay Kullanım**: Sadece YouTube linkini yapıştırın
✅ **AI Destekli**: Whisper AI konuşma tanıma
✅ **Otomatik Çeviri**: 100+ dil desteği
✅ **Hızlı İşlem**: Dakikalar içinde sonuç
✅ **Ücretsiz**: Açık kaynak kodlu

---

## 📋 Dosya Yapısı

```
youtube-dublaj-apk/
├── App.js                          # React Native ana uygulama
├── package.json                    # Node.js bağımlılıkları
├── AndroidManifest.xml             # Android uygulama ayarları
├── android-build.gradle            # Android build yapılandırması
├── api_server.py                   # Flask backend API
├── youtube_dublaj_advanced.py     # Python dublaj scripti
├── APK_KURULUM_KILAVUZU.md        # Detaylı APK kılavuzu
└── README.md                       # Python script kılavuzu
```

---

## ⚡ Hızlı Test

### APK ile:
1. APK'yı yükleyin
2. Backend API'yi başlatın (`python api_server.py`)
3. Uygulamayı açın
4. Test URL'i yapıştırın: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
5. "Dublajı Başlat" butonuna basın

### Python ile:
```bash
python youtube_dublaj_advanced.py "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

---

## 🐛 Sorun Giderme

### "Backend API'ye bağlanılamıyor"
- Backend API'nin çalıştığından emin olun: `http://localhost:5000/health`
- App.js'te doğru URL'yi kullandığınızı kontrol edin
- Firewall ayarlarını kontrol edin

### "APK yüklenmiyor"
- "Bilinmeyen kaynaklardan yükleme" izni verin
- Eski versiyonu kaldırıp tekrar deneyin
- APK dosyasının bozuk olmadığından emin olun

### "Whisper modeli indirilemiyor"
```bash
# Manuel indirme:
python -c "import whisper; whisper.load_model('base')"
```

### "FFmpeg bulunamadı"
```bash
# Ubuntu/Debian:
sudo apt install ffmpeg

# macOS:
brew install ffmpeg

# Windows:
# https://ffmpeg.org/download.html
```

---

## 📊 Sistem Gereksinimleri

### Mobil (APK):
- **Android**: 5.0+ (API 21)
- **RAM**: 2GB+
- **Depolama**: 100MB uygulama + video boyutu
- **İnternet**: Gerekli

### Backend Sunucu:
- **CPU**: 2+ core
- **RAM**: 4GB+ (Whisper için)
- **Depolama**: 10GB+
- **Python**: 3.8+

---

## 🔒 Güvenlik ve Gizlilik

- ✅ Videolar geçici olarak işlenir ve silinir
- ✅ Kullanıcı verileri saklanmaz
- ✅ Açık kaynak kodlu
- ⚠️ YouTube kullanım şartlarına uyun
- ⚠️ Telif haklarına saygı gösterin

---

## 📝 Lisans

Bu proje eğitim amaçlıdır. Ticari kullanım için gerekli izinleri alın.

---

## 🙋 SSS

**S: APK ücretsiz mi?**
C: Evet, tamamen ücretsiz ve açık kaynak.

**S: İnternet olmadan çalışır mı?**
C: Hayır, video indirme ve API iletişimi için internet gerekli.

**S: Hangi videoları dublajlayabilirim?**
C: YouTube'daki herkese açık videoları. Telif korumalı içeriğe dikkat edin.

**S: Dublaj kalitesi nasıl?**
C: Whisper AI kullanılır, %85-95 doğruluk oranı. Model seçimine bağlı.

**S: Ne kadar sürer?**
C: 10 dakikalık video için ~8-13 dakika (model ve sunucu hızına bağlı).

**S: iOS versiyonu var mı?**
C: Şu an yok, ama React Native kodunu kullanarak iOS build edebilirsiniz.

**S: Offline kullanabilir miyim?**
C: Hayır, şu an backend API gerekiyor. Gelecekte offline destek eklenebilir.

---

## 🚀 Gelecek Özellikler

- [ ] Offline mod
- [ ] Çoklu dil seçimi
- [ ] Ses efektleri
- [ ] Video kalite seçimi
- [ ] İndirme geçmişi
- [ ] Paylaşma özelliği
- [ ] iOS desteği
- [ ] Batch işlem

---

## 🤝 Katkıda Bulunun

Pull request'ler memnuniyetle karşılanır!

1. Fork yapın
2. Feature branch oluşturun
3. Commit yapın
4. Push edin
5. Pull request açın

---

## 📞 İletişim ve Destek

- **Issues**: GitHub Issues sayfasından
- **Dokümantasyon**: Bu README ve APK_KURULUM_KILAVUZU.md
- **Topluluk**: GitHub Discussions

---

## ⭐ Projeyi Beğendiniz mi?

GitHub'da ⭐ vererek destek olabilirsiniz!

---

**Kolay gelsin!** 🎬🎉

Hangi seçeneği tercih ederseniz edin, başarılar dileriz!
