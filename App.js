import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
} from 'react-native';

const App = () => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [downloadUrl, setDownloadUrl] = useState('');

  const steps = [
    { id: 0, title: '📥 Video İndiriliyor', desc: 'YouTube\'dan video alınıyor' },
    { id: 1, title: '🎵 Ses Çıkarılıyor', desc: 'Video sesinden WAV oluşturuluyor' },
    { id: 2, title: '📝 Konuşma Tanıma', desc: 'Whisper AI ile yazıya çevriliyor' },
    { id: 3, title: '🌐 Türkçe Çeviri', desc: 'AI ile çevriliyor' },
    { id: 4, title: '🎤 Seslendirme', desc: 'Türkçe ses üretiliyor' },
    { id: 5, title: '🎬 Video Oluşturma', desc: 'Dublajlı video hazırlanıyor' },
  ];

  const validateYouTubeUrl = (url) => {
    const patterns = [
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+/,
      /^(https?:\/\/)?(www\.)?youtu\.be\/[\w-]+/,
    ];
    return patterns.some(pattern => pattern.test(url));
  };

  const startDubbing = async () => {
    if (!url.trim()) {
      Alert.alert('Hata', 'Lütfen bir YouTube linki girin!');
      return;
    }

    if (!validateYouTubeUrl(url)) {
      Alert.alert('Hata', 'Geçerli bir YouTube linki girin!');
      return;
    }

    setIsProcessing(true);
    setDownloadUrl('');

    try {
      // API endpoint'inize istek atın
      const API_URL = 'https://your-api-endpoint.com/dubbing';
      
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        await sleep(2000); // Simülasyon
      }

      // İşlem tamamlandı
      setDownloadUrl('https://example.com/dubbed_video.mp4');
      Alert.alert(
        '✅ Tamamlandı!',
        'Videonuz başarıyla dublajlandı. İndirmek için butona tıklayın.',
        [{ text: 'Tamam' }]
      );
    } catch (error) {
      Alert.alert('Hata', 'İşlem sırasında bir hata oluştu: ' + error.message);
    } finally {
      setIsProcessing(false);
      setCurrentStep(-1);
    }
  };

  const downloadVideo = () => {
    if (downloadUrl) {
      Linking.openURL(downloadUrl);
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7c3aed" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🎬 YouTube Dublaj</Text>
          <Text style={styles.headerSubtitle}>
            Videoları otomatik Türkçe dublajlayın
          </Text>
        </View>

        {/* Input Card */}
        <View style={styles.card}>
          <Text style={styles.label}>YouTube Video Linki</Text>
          <TextInput
            style={styles.input}
            placeholder="https://www.youtube.com/watch?v=..."
            placeholderTextColor="#9ca3af"
            value={url}
            onChangeText={setUrl}
            autoCapitalize="none"
            keyboardType="url"
            editable={!isProcessing}
          />

          <TouchableOpacity
            style={[styles.button, isProcessing && styles.buttonDisabled]}
            onPress={startDubbing}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>🎬 Dublajı Başlat</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Progress Steps */}
        {isProcessing && (
          <View style={styles.card}>
            <Text style={styles.progressTitle}>İşlem Durumu</Text>
            {steps.map((step, index) => (
              <View
                key={step.id}
                style={[
                  styles.stepItem,
                  index === currentStep && styles.stepActive,
                  index < currentStep && styles.stepCompleted,
                ]}
              >
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDesc}>{step.desc}</Text>
                </View>
                {index === currentStep && (
                  <ActivityIndicator color="#f97316" size="small" />
                )}
                {index < currentStep && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Result Card */}
        {downloadUrl && !isProcessing && (
          <View style={[styles.card, styles.resultCard]}>
            <Text style={styles.resultTitle}>✅ Dublaj Tamamlandı!</Text>
            <Text style={styles.resultDesc}>
              Videonuz başarıyla dublajlandı ve indirmeye hazır.
            </Text>
            
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={downloadVideo}
            >
              <Text style={styles.downloadButtonText}>💾 Videoyu İndir</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🤖</Text>
            <Text style={styles.featureTitle}>AI Destekli</Text>
            <Text style={styles.featureDesc}>
              Whisper AI ile yüksek kaliteli konuşma tanıma
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🌍</Text>
            <Text style={styles.featureTitle}>Çok Dilli</Text>
            <Text style={styles.featureDesc}>
              100+ dili otomatik algılar ve çevirir
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureTitle}>Hızlı İşlem</Text>
            <Text style={styles.featureDesc}>
              Dakikalar içinde dublajlı video
            </Text>
          </View>
        </View>

        {/* Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>ℹ️ Nasıl Kullanılır?</Text>
          <Text style={styles.infoText}>
            1. YouTube video linkini yukarıdaki alana yapıştırın{'\n'}
            2. "Dublajı Başlat" butonuna tıklayın{'\n'}
            3. İşlem tamamlandığında videoyu indirin
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    backgroundColor: '#7c3aed',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e9d5ff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  stepActive: {
    backgroundColor: '#fff7ed',
    borderColor: '#f97316',
  },
  stepCompleted: {
    backgroundColor: '#f0fdf4',
    borderColor: '#22c55e',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 14,
    color: '#6b7280',
  },
  checkmark: {
    fontSize: 24,
    color: '#22c55e',
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: '#f0fdf4',
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 8,
  },
  resultDesc: {
    fontSize: 16,
    color: '#15803d',
    marginBottom: 16,
  },
  downloadButton: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fffbeb',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#fbbf24',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#78350f',
    lineHeight: 24,
  },
});

export default App;
