#!/bin/bash

# ========================================
# AUTO SETUP SCRIPT UNTUK BOT WHATSAPP
# Platform: Termux (Android)
# Developer: Alizz
# ========================================

echo "🤖 WhatsApp Bot Auto Setup Script"
echo "=================================="
echo ""

# Warna untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function untuk print dengan warna
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Cek apakah running di Termux
if [ ! -d "/data/data/com.termux" ]; then
    print_error "Script ini hanya bisa dijalankan di Termux!"
    exit 1
fi

print_status "Memulai setup WhatsApp Bot..."
echo ""

# Step 1: Update packages
print_step "1. Updating Termux packages..."
if pkg update -y && pkg upgrade -y; then
    print_status "✅ Packages berhasil diupdate"
else
    print_error "❌ Gagal update packages"
    exit 1
fi
echo ""

# Step 2: Install required packages
print_step "2. Installing Node.js, npm, git, python..."
if pkg install nodejs npm git python -y; then
    print_status "✅ Packages berhasil terinstall"
    
    # Verifikasi instalasi
    NODE_VERSION=$(node --version)
    NPM_VERSION=$(npm --version)
    print_status "Node.js version: $NODE_VERSION"
    print_status "npm version: $NPM_VERSION"
else
    print_error "❌ Gagal install packages"
    exit 1
fi
echo ""

# Step 3: Create project directory
print_step "3. Creating project directory..."
PROJECT_DIR="$HOME/whatsapp-bot"

if [ -d "$PROJECT_DIR" ]; then
    print_warning "Directory $PROJECT_DIR sudah ada"
    read -p "Apakah ingin menghapus dan buat ulang? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf "$PROJECT_DIR"
        print_status "Directory lama dihapus"
    else
        print_error "Setup dibatalkan"
        exit 1
    fi
fi

mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"
print_status "✅ Project directory created: $PROJECT_DIR"
echo ""

# Step 4: Create package.json
print_step "4. Creating package.json..."
cat > package.json << 'EOL'
{
  "name": "whatsapp-bot-baileys",
  "version": "1.0.0",
  "description": "Bot WhatsApp menggunakan Baileys untuk Termux",
  "main": "bot.js",
  "scripts": {
    "start": "node bot.js",
    "dev": "node bot.js"
  },
  "keywords": [
    "whatsapp",
    "bot",
    "baileys",
    "termux",
    "nodejs"
  ],
  "author": "Alizz",
  "license": "MIT",
  "dependencies": {
    "@whiskeysockets/baileys": "^6.7.8",
    "@hapi/boom": "^10.0.1",
    "pino": "^8.19.0"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
EOL
print_status "✅ package.json created"
echo ""

# Step 5: Install npm dependencies
print_step "5. Installing npm dependencies..."
if npm install; then
    print_status "✅ Dependencies berhasil terinstall"
else
    print_error "❌ Gagal install dependencies"
    print_warning "Mencoba dengan cache clean..."
    npm cache clean --force
    if npm install; then
        print_status "✅ Dependencies berhasil terinstall (after cache clean)"
    else
        print_error "❌ Gagal install dependencies setelah cache clean"
        exit 1
    fi
fi
echo ""

# Step 6: Create start script
print_step "6. Creating start script..."
cat > start.sh << 'EOL'
#!/bin/bash
echo "🚀 Starting WhatsApp Bot..."
echo "Tekan Ctrl+C untuk stop bot"
echo "=========================="
node bot.js
EOL

chmod +x start.sh
print_status "✅ Start script created (start.sh)"
echo ""

# Step 7: Create .gitignore
print_step "7. Creating .gitignore..."
cat > .gitignore << 'EOL'
# Dependencies
node_modules/
package-lock.json

# Session data (jangan di-commit)
session/
*.session

# Logs
*.log
logs/

# Environment variables
.env

# Temporary files
tmp/
temp/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
EOL
print_status "✅ .gitignore created"
echo ""

# Step 8: Download bot script
print_step "8. Creating bot.js file..."
print_warning "⚠️  Anda perlu copy-paste kode bot.js dari artifact yang diberikan"
print_warning "⚠️  File bot.js belum dibuat otomatis oleh script ini"
echo ""

# Step 9: Setup completion
print_status "🎉 Setup completed successfully!"
echo ""
echo "======================================"
echo "📋 LANGKAH SELANJUTNYA:"
echo "======================================"
echo "1. Copy kode bot.js dari artifact"
echo "2. Paste ke file: $PROJECT_DIR/bot.js"
echo "3. Jalankan bot dengan: ./start.sh"
echo "4. Scan QR code yang muncul"
echo "5. Bot siap digunakan!"
echo ""
echo "📁 Project location: $PROJECT_DIR"
echo "🚀 Start command: cd $PROJECT_DIR && ./start.sh"
echo "🛑 Stop command: Ctrl + C"
echo ""
print_status "Happy coding! 🤖"