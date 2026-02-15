# 📱 YouTube Türkçe Dublaj - Android APK Kurulum Kılavuzu

Bu kılavuz, YouTube Türkçe Dublaj uygulamasını Android APK olarak nasıl oluşturacağınızı adım adım açıklar.

## 🚀 Hızlı Başlangıç (APK İndir ve Kur)

### Hazır APK İndirme (En Kolay Yöntem)

Eğer APK'yı kendiniz build etmek istemiyorsanız:

1. **APK'yı İndirin**: [Releases](https://github.com/yourrepo/releases) sayfasından en son APK'yı indirin
2. **Güvenlik Ayarları**: Telefonunuzda Ayarlar > Güvenlik > "Bilinmeyen kaynaklardan yükleme" seçeneğini aktifleştirin
3. **APK'yı Kurun**: İndirilen APK dosyasına tıklayın ve kurulumu tamamlayın
4. **Uygulamayı Açın**: Yüklendikten sonra uygulamayı açıp kullanmaya başlayabilirsiniz

---

## 🛠️ APK'yı Kendiniz Oluşturma (Gelişmiş)

### Gereksinimler

APK oluşturmak için şunlar gerekli:

1. **Node.js** (v18 veya üzeri) - [İndir](https://nodejs.org/)
2. **Android Studio** - [İndir](https://developer.android.com/studio)
3. **JDK 11** - Android Studio ile birlikte gelir
4. **React Native CLI**
5. **Git** (opsiyonel)

### Adım 1: Ortamı Hazırlayın

#### Windows için:

```bash
# Node.js ve npm kurun (nodejs.org'dan)

# Android Studio'yu kurun ve SDK'ları indirin
# Android Studio > SDK Manager > Android 13.0 (API 33) işaretleyin

# Çevre değişkenlerini ayarlayın
setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
setx PATH "%PATH%;%LOCALAPPDATA%\Android\Sdk\platform-tools"

# React Native CLI'yi kurun
npm install -g react-native-cli
```

#### macOS/Linux için:

```bash
# Node.js kurun
# macOS: brew install node
# Linux: sudo apt install nodejs npm

# Android Studio'yu kurun
# https://developer.android.com/studio

# Çevre değişkenlerini ayarlayın (.bashrc veya .zshrc'ye ekleyin)
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
# export ANDROID_HOME=$HOME/Android/Sdk        # Linux
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools

# React Native CLI
npm install -g react-native-cli
```

### Adım 2: Projeyi Kurun

```bash
# Proje klasörüne gidin
cd youtube-dublaj-apk

# Bağımlılıkları yükleyin
npm install

# iOS için (macOS'ta - opsiyonel)
cd ios && pod install && cd ..
```

### Adım 3: Android Emulator veya Gerçek Cihaz Hazırlayın

#### Emulator için:

```bash
# Android Studio > AVD Manager > Create Virtual Device
# Pixel 5 veya benzeri bir cihaz seçin
# Android 13.0 (API 33) sistem görüntüsü indirin
```

#### Gerçek Cihaz için:

1. Telefonunuzda "Geliştirici Seçenekleri"ni aktifleştirin
2. "USB Hata Ayıklama"yı açın
3. USB ile bilgisayara bağlayın
4. `adb devices` komutuyla cihazın görünüp görünmediğini kontrol edin

### Adım 4: Development Modunda Çalıştırın (Test)

```bash
# Metro bundler'ı başlatın (bir terminalde)
npm start

# Uygulamayı Android'e yükleyin (başka bir terminalde)
npm run android

# veya
react-native run-android
```

Uygulama emulator/cihazınızda açılacak ve canlı olarak test edebilirsiniz.

---

## 📦 Release APK Oluşturma

### Adım 1: Keystore Oluşturun (İlk Kez)

APK'nızı imzalamak için bir keystore dosyası oluşturmanız gerekir:

```bash
# Proje kök dizininde
cd android/app

# Keystore oluşturun
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Şifre soracak - güçlü bir şifre seçin ve kaydedin!
# İsim, organizasyon gibi bilgileri doldurun
```

**ÖNEMLİ**: Bu keystore dosyasını ve şifresini GÜVENLİ bir yerde saklayın! Kaybederseniz uygulamanızı güncelleyemezsiniz.

### Adım 2: Gradle Ayarlarını Yapılandırın

`android/gradle.properties` dosyasını oluşturun veya düzenleyin:

```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your_keystore_password
MYAPP_RELEASE_KEY_PASSWORD=your_key_password
```

**ÖNEMLİ**: Bu dosyayı Git'e commit ETMEYİN! `.gitignore`'a ekleyin.

### Adım 3: APK'yı Oluşturun

```bash
# Proje kök dizininde
cd android

# Release APK oluştur
./gradlew assembleRelease

# Windows için:
# gradlew.bat assembleRelease
```

Build işlemi 2-5 dakika sürebilir.

### Adım 4: APK'yı Bulun

APK şurada oluşturulur:

```
android/app/build/outputs/apk/release/app-release.apk
```

Bu dosya artık yüklenmeye hazır!

---

## 📤 APK'yı Paylaşma ve Yükleme

### APK Boyutunu Küçültme (Opsiyonel)

```bash
# Proguard'ı aktifleştirin (android/app/build.gradle)
# minifyEnabled true yapın

# APK'yı tekrar build edin
cd android && ./gradlew assembleRelease
```

### APK'yı Telefonunuza Yükleyin

#### Yöntem 1: USB ile

```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

#### Yöntem 2: Dosya Paylaşımı

1. APK'yı Google Drive, Dropbox veya başka bir servise yükleyin
2. Telefonunuzda indirin
3. Dosyaya dokunun ve kurulumu tamamlayın

#### Yöntem 3: QR Kod

1. APK'yı bir web sunucusuna yükleyin
2. URL için QR kod oluşturun
3. Telefonunuzla QR'ı tarayın ve APK'yı indirin

---

## 🏪 Google Play Store'da Yayınlama (Opsiyonel)

### AAB (Android App Bundle) Oluşturun

Play Store, APK yerine AAB formatını tercih eder:

```bash
cd android
./gradlew bundleRelease

# AAB dosyası burada:
# android/app/build/outputs/bundle/release/app-release.aab
```

### Play Store Adımları

1. **Play Console Hesabı**: [Google Play Console](https://play.google.com/console) hesabı oluşturun ($25 tek seferlik ücret)
2. **Yeni Uygulama**: "Uygulama Oluştur" butonuna tıklayın
3. **Uygulama Detayları**: İsim, açıklama, ekran görüntüleri ekleyin
4. **AAB Yükle**: Üretim > Yeni sürüm > AAB'yi yükleyin
5. **İçerik Derecelendirmesi**: Yaş sınıflandırması yapın
6. **Gizlilik Politikası**: Gerekli politikaları ekleyin
7. **Yayınla**: İnceleme için gönderin (1-3 gün sürebilir)

---

## 🔧 Sorun Giderme

### "SDK location not found" Hatası

```bash
# android/local.properties dosyası oluşturun:
sdk.dir=/Users/USERNAME/Library/Android/sdk  # macOS
# sdk.dir=C:\\Users\\USERNAME\\AppData\\Local\\Android\\Sdk  # Windows
```

### "INSTALL_FAILED_UPDATE_INCOMPATIBLE" Hatası

```bash
# Eski versiyonu kaldırın
adb uninstall com.youtubedublaj

# Yeniden yükleyin
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Metro Bundler Bağlantı Hatası

```bash
# Cache'i temizleyin
npm start -- --reset-cache

# veya
react-native start --reset-cache
```

### Build Hatası: "Could not resolve all files"

```bash
# Gradle cache'i temizleyin
cd android
./gradlew clean

# Tekrar build edin
./gradlew assembleRelease
```

### Uygulama Açılmıyor / Crash Oluyor

```bash
# Logları kontrol edin
adb logcat | grep ReactNativeJS

# veya
react-native log-android
```

---

## 📊 APK Bilgileri

### Beklenen APK Boyutu

- **Debug APK**: ~40-60 MB
- **Release APK**: ~25-40 MB (ProGuard ile)
- **AAB**: ~20-30 MB

### Desteklenen Android Versiyonları

- **Minimum SDK**: Android 5.0 (API 21)
- **Target SDK**: Android 13.0 (API 33)

### İzinler

Uygulama şu izinleri gerektirir:

- ✅ İnternet Erişimi (video indirme için)
- ✅ Depolama Erişimi (video kaydetme için)

---

## 🎯 Hızlı Komutlar Özeti

```bash
# Kurulum
npm install

# Development test
npm run android

# Release APK oluştur
cd android && ./gradlew assembleRelease

# APK yükle
adb install android/app/build/outputs/apk/release/app-release.apk

# Logları görüntüle
react-native log-android
```

---

## 📱 Backend API Entegrasyonu

Uygulama çalışması için bir backend API'ye ihtiyacınız var. İki seçeneğiniz var:

### Seçenek 1: Kendi Backend'inizi Kurun

Python scriptlerini bir sunucuda çalıştırın ve API endpoint oluşturun:

```bash
# Backend sunucunuzda
pip install flask flask-cors
python api_server.py
```

`App.js` dosyasında API URL'yi güncelleyin:

```javascript
const API_URL = 'https://your-server.com/api/dubbing';
```

### Seçenek 2: Serverless Çözüm (Önerilen)

- **Railway**, **Render**, veya **Heroku** gibi platformlarda Python backend deploy edin
- Ücretsiz tier'lar mevcut
- Otomatik scaling

---

## 🔐 Güvenlik Notları

1. **API Keys**: API anahtarlarınızı APK'ya hardcode ETMEYİN
2. **Backend**: Tüm işlemleri backend'de yapın
3. **Rate Limiting**: API'nize rate limiting ekleyin
4. **SSL**: HTTPS kullanın

---

## 📞 Destek

Sorun yaşarsanız:

1. [Issues](https://github.com/yourrepo/issues) sayfasından konu açın
2. Hata loglarını ekleyin (`adb logcat`)
3. Android versiyonunuzu belirtin

---

## 📝 Lisans

Bu uygulama eğitim amaçlıdır. Ticari kullanım için gerekli lisansları alın.

**Not**: YouTube'un kullanım şartlarına ve telif haklarına uygun kullanın.

---

## ✨ Sonraki Adımlar

APK'nızı başarıyla oluşturduktan sonra:

- [ ] Beta test yapın
- [ ] Kullanıcı geri bildirimi toplayın
- [ ] Hataları düzeltin
- [ ] Yeni özellikler ekleyin
- [ ] Play Store'da yayınlayın

---

**Başarılar!** 🎉

Herhangi bir sorunuz varsa dokümantasyonu kontrol edin veya destek isteyin.
