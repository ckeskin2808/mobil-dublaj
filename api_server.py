#!/usr/bin/env python3
"""
YouTube Dublaj API Servisi
APK için backend sunucusu
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import tempfile
import subprocess
import json
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)  # React Native'den gelen isteklere izin ver

# Yapılandırma
UPLOAD_FOLDER = tempfile.gettempdir()
MAX_CONCURRENT_JOBS = 5
active_jobs = {}

@app.route('/health', methods=['GET'])
def health_check():
    """Sunucu sağlık kontrolü"""
    return jsonify({
        'status': 'healthy',
        'active_jobs': len(active_jobs),
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/dubbing/start', methods=['POST'])
def start_dubbing():
    """Dublaj işlemini başlat"""
    data = request.json
    
    # Validasyon
    if not data or 'url' not in data:
        return jsonify({'error': 'YouTube URL gerekli'}), 400
    
    youtube_url = data['url']
    target_lang = data.get('target_lang', 'tr')
    whisper_model = data.get('whisper_model', 'base')
    
    # YouTube URL kontrolü
    if 'youtube.com' not in youtube_url and 'youtu.be' not in youtube_url:
        return jsonify({'error': 'Geçerli bir YouTube URL girin'}), 400
    
    # Eş zamanlı işlem sınırı
    if len(active_jobs) >= MAX_CONCURRENT_JOBS:
        return jsonify({'error': 'Sistem meşgul, lütfen daha sonra tekrar deneyin'}), 503
    
    # Job ID oluştur
    job_id = str(uuid.uuid4())
    
    # Job bilgilerini kaydet
    active_jobs[job_id] = {
        'status': 'started',
        'url': youtube_url,
        'target_lang': target_lang,
        'created_at': datetime.now().isoformat(),
        'current_step': 0,
        'total_steps': 6
    }
    
    # Asenkron işlem başlat (gerçek uygulamada Celery kullanın)
    # Burada basit bir örnek
    
    return jsonify({
        'job_id': job_id,
        'status': 'started',
        'message': 'Dublaj işlemi başlatıldı'
    }), 202

@app.route('/api/dubbing/status/<job_id>', methods=['GET'])
def get_status(job_id):
    """İşlem durumunu kontrol et"""
    if job_id not in active_jobs:
        return jsonify({'error': 'İşlem bulunamadı'}), 404
    
    job = active_jobs[job_id]
    
    return jsonify({
        'job_id': job_id,
        'status': job['status'],
        'current_step': job['current_step'],
        'total_steps': job['total_steps'],
        'progress': (job['current_step'] / job['total_steps']) * 100
    })

@app.route('/api/dubbing/download/<job_id>', methods=['GET'])
def download_video(job_id):
    """Dublajlı videoyu indir"""
    if job_id not in active_jobs:
        return jsonify({'error': 'İşlem bulunamadı'}), 404
    
    job = active_jobs[job_id]
    
    if job['status'] != 'completed':
        return jsonify({'error': 'İşlem henüz tamamlanmadı'}), 400
    
    # Video dosyası yolunu al
    video_path = job.get('video_path')
    
    if not video_path or not os.path.exists(video_path):
        return jsonify({'error': 'Video dosyası bulunamadı'}), 404
    
    return send_file(
        video_path,
        as_attachment=True,
        download_name=f'dubbed_video_{job_id[:8]}.mp4',
        mimetype='video/mp4'
    )

@app.route('/api/dubbing/process', methods=['POST'])
def process_video():
    """Tam dublaj işlemi (senkron - test için)"""
    data = request.json
    
    if not data or 'url' not in data:
        return jsonify({'error': 'YouTube URL gerekli'}), 400
    
    youtube_url = data['url']
    target_lang = data.get('target_lang', 'tr')
    whisper_model = data.get('whisper_model', 'base')
    
    try:
        # Geçici dizin oluştur
        work_dir = tempfile.mkdtemp(prefix='youtube_dub_')
        
        # Python scriptini çalıştır
        script_path = os.path.join(os.path.dirname(__file__), 'youtube_dublaj_advanced.py')
        
        cmd = [
            'python3',
            script_path,
            youtube_url,
            '--whisper-model', whisper_model,
            '--target-lang', target_lang,
            '--output-dir', work_dir
        ]
        
        # İşlemi çalıştır (timeout ile)
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=600  # 10 dakika max
        )
        
        if result.returncode == 0:
            # Başarılı - video dosyasını bul
            video_files = [f for f in os.listdir(work_dir) if f.endswith('.mp4')]
            
            if video_files:
                video_path = os.path.join(work_dir, video_files[0])
                
                return jsonify({
                    'status': 'success',
                    'message': 'Dublaj tamamlandı',
                    'video_url': f'/api/download/{os.path.basename(video_path)}',
                    'video_size': os.path.getsize(video_path)
                })
            else:
                return jsonify({'error': 'Video dosyası oluşturulamadı'}), 500
        else:
            return jsonify({
                'error': 'İşlem başarısız',
                'details': result.stderr
            }), 500
            
    except subprocess.TimeoutExpired:
        return jsonify({'error': 'İşlem zaman aşımına uğradı'}), 504
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/languages', methods=['GET'])
def get_languages():
    """Desteklenen dilleri listele"""
    languages = [
        {'code': 'tr', 'name': 'Türkçe', 'flag': '🇹🇷'},
        {'code': 'en', 'name': 'İngilizce', 'flag': '🇬🇧'},
        {'code': 'es', 'name': 'İspanyolca', 'flag': '🇪🇸'},
        {'code': 'de', 'name': 'Almanca', 'flag': '🇩🇪'},
        {'code': 'fr', 'name': 'Fransızca', 'flag': '🇫🇷'},
        {'code': 'it', 'name': 'İtalyanca', 'flag': '🇮🇹'},
        {'code': 'pt', 'name': 'Portekizce', 'flag': '🇵🇹'},
        {'code': 'ru', 'name': 'Rusça', 'flag': '🇷🇺'},
        {'code': 'ja', 'name': 'Japonca', 'flag': '🇯🇵'},
        {'code': 'ko', 'name': 'Korece', 'flag': '🇰🇷'},
        {'code': 'zh', 'name': 'Çince', 'flag': '🇨🇳'},
        {'code': 'ar', 'name': 'Arapça', 'flag': '🇸🇦'},
    ]
    
    return jsonify({'languages': languages})

@app.route('/api/models', methods=['GET'])
def get_models():
    """Whisper modellerini listele"""
    models = [
        {
            'name': 'tiny',
            'speed': 'Çok Hızlı',
            'accuracy': 'Düşük',
            'size': '~75 MB',
            'description': 'Hızlı test için'
        },
        {
            'name': 'base',
            'speed': 'Hızlı',
            'accuracy': 'Orta',
            'size': '~150 MB',
            'description': 'Önerilen (dengeli)'
        },
        {
            'name': 'small',
            'speed': 'Orta',
            'accuracy': 'İyi',
            'size': '~500 MB',
            'description': 'Kaliteli sonuç'
        },
        {
            'name': 'medium',
            'speed': 'Yavaş',
            'accuracy': 'Çok İyi',
            'size': '~1.5 GB',
            'description': 'Yüksek kalite'
        }
    ]
    
    return jsonify({'models': models})

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint bulunamadı'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Sunucu hatası'}), 500

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 YouTube Dublaj API Servisi")
    print("=" * 60)
    print()
    print("API Endpoints:")
    print("  POST   /api/dubbing/start       - Dublaj başlat")
    print("  GET    /api/dubbing/status/:id  - Durum kontrol")
    print("  GET    /api/dubbing/download/:id - Video indir")
    print("  POST   /api/dubbing/process     - Tam işlem (test)")
    print("  GET    /api/languages           - Dil listesi")
    print("  GET    /api/models              - Model listesi")
    print("  GET    /health                  - Sağlık kontrolü")
    print()
    print("Sunucu: http://localhost:5000")
    print("=" * 60)
    print()
    
    # Debug modunda çalıştır (production için gunicorn kullanın)
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
