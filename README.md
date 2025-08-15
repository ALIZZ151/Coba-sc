# 🤖 Panduan Instalasi Bot WhatsApp (Termux)

## 📋 Persyaratan
- Android device dengan Termux terinstall
- Koneksi internet yang stabil
- WhatsApp yang akan dijadikan bot (bisa WhatsApp kedua)

## 🚀 Langkah Instalasi

### 1. Persiapan Termux
```bash
# Update package list
pkg update && pkg upgrade -y

# Install Node.js dan Git
pkg install nodejs npm git -y

# Install Python (diperlukan untuk beberapa package native)
pkg install python -y

# Verifikasi instalasi
node --version
npm --version
```

### 2. Setup Project Bot
```bash
# Buat folder project
mkdir whatsapp-bot
cd whatsapp-bot

# Download atau buat file bot.js dan package.json
# (Copy kode dari artifact diatas)

# Install dependencies
npm install

# Berikan permission
chmod +x bot.js
```

### 3. Struktur Folder
```
whatsapp-bot/
├── bot.js              # File utama bot
├── package.json        # Dependencies
├── session/           # Folder session (auto-generated)
└── README.md          # (optional)
```

## ▶️ Cara Menjalankan Bot

### Menjalankan Bot
```bash
# Masuk ke folder project
cd whatsapp-bot

# Jalankan bot
npm start
# atau
node bot.js
```

### First Run (Login)
1. **Jalankan bot untuk pertama kali:**
   ```bash
   node bot.js
   ```

2. **Scan QR Code:**
   - QR code akan muncul di terminal Termux
   - Buka WhatsApp di HP → Settings → Linked Devices → Link a Device
   - Scan QR code yang muncul di Termux
   - Bot akan otomatis terhubung

3. **Verifikasi koneksi:**
   - Jika berhasil, akan muncul pesan "✅ Bot berhasil terhubung ke WhatsApp!"
   - Session akan tersimpan di folder `session/`
   - Untuk run selanjutnya tidak perlu scan QR lagi

## 🎯 Cara Menggunakan Bot

### Command Dasar
- `.menu` - Menampilkan menu utama dengan tombol
- `.allmenu` - Menampilkan semua fitur tanpa tombol

### Menu Download (Placeholder)
- `.tiktok <url>` - Download video TikTok
- `.youtube <url>` - Download video YouTube  
- `.instagram <url>` - Download post Instagram
- `.facebook <url>` - Download video Facebook
- `.twitter <url>` - Download video Twitter
- `.mediafire <url>` - Download file MediaFire
- `.gdrive <url>` - Download file Google Drive

### Menu Tools (Placeholder)
- `.tourl <reply media>` - Upload media ke URL
- `.shorturl <url>` - Perpendek URL
- `.qrcode <teks>` - Buat QR code
- `.translate <teks>` - Terjemahkan teks
- `.weather <kota>` - Cek cuaca
- `.kalkulator <rumus>` - Kalkulator
- `.base64 encode/decode <teks>` - Convert base64

### Menu Info
- `.ping` - Cek latency bot
- `.speed` - Test kecepatan bot
- `.runtime` - Lihat waktu aktif bot
- `.info` - Info lengkap bot
- `.owner` - Info developer
- `.donate` - Info donasi
- `.report <masalah>` - Laporkan bug

## 🛠️ Tips & Troubleshooting

### Mengatasi Error Umum

**1. Error saat install dependencies:**
```bash
# Clear npm cache
npm cache clean --force

# Install ulang
rm -rf node_modules package-lock.json
npm install
```

**2. Bot tidak bisa login:**
```bash
# Hapus session lama
rm -rf session/

# Jalankan ulang bot
node bot.js
```

**3. Bot tiba-tiba disconnect:**
```bash
# Restart bot
Ctrl + C (stop bot)
node bot.js (start ulang)
```

**4. Error "Cannot find module":**
```bash
# Install module yang hilang
npm install @whiskeysockets/baileys @hapi/boom pino

# Atau install ulang semua
npm install
```

### Auto Restart Bot (PM2)
```bash
# Install PM2 (optional)
npm install -g pm2

# Jalankan bot dengan PM2
pm2 start bot.js --name "whatsapp-bot"

# Commands PM2
pm2 list          # Lihat status
pm2 stop whatsapp-bot   # Stop bot
pm2 restart whatsapp-bot # Restart bot
pm2 logs whatsapp-bot    # Lihat logs
```

### Keep Termux Running
- Install **Termux:Boot** app dari F-Droid
- Atau gunakan **Wake Lock** di Termux settings
- Set Termux agar tidak dioptimasi battery

## 🔧 Kustomisasi Bot

### Mengubah Konfigurasi
Edit bagian config di `bot.js`:
```javascript
const config = {
    botName: "NamaBot Anda",
    developer: "Nama Anda", 
    prefix: ".",           // Ubah prefix command
    sessionDir: "./session"
};
```

### Menambahkan Fitur Baru
1. Buat fungsi di class `DownloadAPI` atau `ToolsAPI`
2. Tambahkan case baru di switch statement `handleMessage`
3. Buat handler function untuk command tersebut
4. Update menu text dengan fitur baru

### Contoh Menambahkan API
```javascript
// Di class DownloadAPI
static async spotify(url) {
    try {
        // TODO: Implementasi dengan API pilihan Anda
        const response = await fetch(`https://api.example.com/spotify?url=${url}`);
        const data = await response.json();
        
        return {
            success: true,
            message: "✅ Berhasil download!",
            data: data
        };
    } catch (error) {
        return {
            success: false,
            message: "❌ Gagal download: " + error.message,
            data: null
        };
    }
}
```

## 📝 Catatan Penting

1. **Session Management:** Session tersimpan di folder `session/`. Jangan hapus folder ini kecuali ingin login ulang.

2. **API Placeholder:** Semua fitur download/tools masih berupa placeholder. Anda perlu menambahkan API sendiri.

3. **Rate Limiting:** WhatsApp memiliki rate limit. Jangan spam command terlalu cepat.

4. **Memory Usage:** Monitor penggunaan RAM Termux, restart jika diperlukan.

5. **Backup Session:** Backup folder `session/` secara berkala untuk menghindari login ulang.

## 🆘 Support

Jika mengalami masalah:
1. Cek logs error di terminal
2. Pastikan koneksi internet stabil  
3. Restart Termux jika diperlukan
4. Gunakan command `.report` di bot untuk melaporkan bug

## 📄 License
MIT License - Bebas untuk dimodifikasi dan disebarkan