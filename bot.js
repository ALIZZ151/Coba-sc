// ========================================
// BOT WHATSAPP MENGGUNAKAN BAILEYS
// Developer: Alizz
// Platform: Node.js (Termux Compatible)
// ========================================

const { 
    default: makeWASocket, 
    DisconnectReason, 
    useMultiFileAuthState,
    fetchLatestBaileysVersion 
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const P = require('pino');

// ========================================
// KONFIGURASI BOT
// ========================================
const config = {
    botName: "AlizzBot",
    developer: "Alizz",
    prefix: ".",
    sessionDir: "./session"
};

// ========================================
// FUNGSI UTILITAS
// ========================================

// Fungsi untuk mendapatkan waktu Indonesia
function getIndonesianTime() {
    const now = new Date();
    const options = {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long'
    };
    return now.toLocaleDateString('id-ID', options);
}

// Fungsi untuk membuat tombol menu
function createMenuButtons() {
    return [
        {
            buttonId: 'download_menu',
            buttonText: { displayText: '📥 Download Menu' },
            type: 1
        },
        {
            buttonId: 'tools_menu', 
            buttonText: { displayText: '🛠️ Tools Menu' },
            type: 1
        },
        {
            buttonId: 'bug_menu',
            buttonText: { displayText: '🐛 Bug Menu' },
            type: 1
        }
    ];
}

// ========================================
// MENU KONTEN
// ========================================

// Menu Download
const downloadMenu = `
╭─「 📥 DOWNLOAD MENU 」
├ ${config.prefix}tiktok <url>
├ ${config.prefix}youtube <url>
├ ${config.prefix}instagram <url>
├ ${config.prefix}facebook <url>
├ ${config.prefix}twitter <url>
├ ${config.prefix}mediafire <url>
├ ${config.prefix}gdrive <url>
╰────────────────`;

// Menu Tools
const toolsMenu = `
╭─「 🛠️ TOOLS MENU 」
├ ${config.prefix}tourl <reply media>
├ ${config.prefix}shorturl <url>
├ ${config.prefix}qrcode <teks>
├ ${config.prefix}translate <teks>
├ ${config.prefix}weather <kota>
├ ${config.prefix}kalkulator <rumus>
├ ${config.prefix}base64 <encode/decode>
╰────────────────`;

// Menu Bug (untuk testing)
const bugMenu = `
╭─「 🐛 BUG MENU 」
├ ${config.prefix}ping
├ ${config.prefix}speed
├ ${config.prefix}runtime
├ ${config.prefix}info
├ ${config.prefix}owner
├ ${config.prefix}donate
├ ${config.prefix}report <masalah>
╰────────────────`;

// All Menu
const allMenu = `
╭─「 📋 SEMUA MENU 」
│
├─「 📥 DOWNLOAD 」
├ ${config.prefix}tiktok <url>
├ ${config.prefix}youtube <url>
├ ${config.prefix}instagram <url>
├ ${config.prefix}facebook <url>
├ ${config.prefix}twitter <url>
├ ${config.prefix}mediafire <url>
├ ${config.prefix}gdrive <url>
│
├─「 🛠️ TOOLS 」
├ ${config.prefix}tourl <reply media>
├ ${config.prefix}shorturl <url>
├ ${config.prefix}qrcode <teks>
├ ${config.prefix}translate <teks>
├ ${config.prefix}weather <kota>
├ ${config.prefix}kalkulator <rumus>
├ ${config.prefix}base64 <encode/decode>
│
├─「 🐛 LAINNYA 」
├ ${config.prefix}ping
├ ${config.prefix}speed
├ ${config.prefix}runtime
├ ${config.prefix}info
├ ${config.prefix}owner
├ ${config.prefix}donate
├ ${config.prefix}report <masalah>
╰────────────────`;

// ========================================
// PLACEHOLDER FUNGSI API
// ========================================

// Download Functions (Placeholder)
class DownloadAPI {
    // TikTok Downloader
    static async tiktok(url) {
        // TODO: Implementasi API TikTok downloader
        return {
            success: false,
            message: "Fitur TikTok downloader belum diimplementasi",
            data: null
        };
    }

    // YouTube Downloader
    static async youtube(url) {
        // TODO: Implementasi API YouTube downloader
        return {
            success: false,
            message: "Fitur YouTube downloader belum diimplementasi",
            data: null
        };
    }

    // Instagram Downloader
    static async instagram(url) {
        // TODO: Implementasi API Instagram downloader
        return {
            success: false,
            message: "Fitur Instagram downloader belum diimplementasi",
            data: null
        };
    }

    // Facebook Downloader
    static async facebook(url) {
        // TODO: Implementasi API Facebook downloader
        return {
            success: false,
            message: "Fitur Facebook downloader belum diimplementasi",
            data: null
        };
    }

    // Twitter Downloader
    static async twitter(url) {
        // TODO: Implementasi API Twitter downloader
        return {
            success: false,
            message: "Fitur Twitter downloader belum diimplementasi",
            data: null
        };
    }

    // MediaFire Downloader
    static async mediafire(url) {
        // TODO: Implementasi API MediaFire downloader
        return {
            success: false,
            message: "Fitur MediaFire downloader belum diimplementasi",
            data: null
        };
    }

    // Google Drive Downloader
    static async gdrive(url) {
        // TODO: Implementasi API Google Drive downloader
        return {
            success: false,
            message: "Fitur Google Drive downloader belum diimplementasi",
            data: null
        };
    }
}

// Tools Functions (Placeholder)
class ToolsAPI {
    // Upload to URL
    static async toUrl(buffer, filename) {
        // TODO: Implementasi upload file ke hosting
        return {
            success: false,
            message: "Fitur upload to URL belum diimplementasi",
            data: null
        };
    }

    // Short URL
    static async shortUrl(url) {
        // TODO: Implementasi URL shortener
        return {
            success: false,
            message: "Fitur short URL belum diimplementasi",
            data: null
        };
    }

    // QR Code Generator
    static async qrcode(text) {
        // TODO: Implementasi QR code generator
        return {
            success: false,
            message: "Fitur QR code belum diimplementasi",
            data: null
        };
    }

    // Translate
    static async translate(text, to = 'id') {
        // TODO: Implementasi translator
        return {
            success: false,
            message: "Fitur translate belum diimplementasi",
            data: null
        };
    }

    // Weather
    static async weather(city) {
        // TODO: Implementasi weather API
        return {
            success: false,
            message: "Fitur weather belum diimplementasi",
            data: null
        };
    }

    // Calculator
    static async calculator(expression) {
        // TODO: Implementasi calculator
        try {
            // Basic math evaluation (hati-hati dengan eval!)
            return {
                success: true,
                message: "Hasil kalkulasi",
                data: { result: "Fitur belum diimplementasi" }
            };
        } catch (error) {
            return {
                success: false,
                message: "Format rumus tidak valid",
                data: null
            };
        }
    }

    // Base64 Encode/Decode
    static async base64(action, text) {
        // TODO: Implementasi base64 converter
        return {
            success: false,
            message: "Fitur base64 belum diimplementasi",
            data: null
        };
    }
}

// ========================================
// HANDLER PESAN
// ========================================

// Handler untuk pesan masuk
async function handleMessage(sock, message) {
    try {
        const m = message.messages[0];
        if (!m.message) return;
        
        const messageType = Object.keys(m.message)[0];
        const from = m.key.remoteJid;
        const isGroup = from.endsWith('@g.us');
        
        let body = '';
        if (messageType === 'conversation') {
            body = m.message.conversation;
        } else if (messageType === 'extendedTextMessage') {
            body = m.message.extendedTextMessage.text;
        } else if (messageType === 'buttonsResponseMessage') {
            body = m.message.buttonsResponseMessage.selectedButtonId;
        }

        // Ignore jika bukan command atau button
        if (!body.startsWith(config.prefix) && !['download_menu', 'tools_menu', 'bug_menu'].includes(body)) return;
        
        const args = body.slice(config.prefix.length).trim().split(' ');
        const command = args[0].toLowerCase();

        console.log(`📨 Pesan diterima: ${body} dari ${from}`);

        // ========================================
        // HANDLER COMMAND
        // ========================================

        switch (command) {
            case 'menu':
                await handleMenuCommand(sock, from);
                break;
            case 'allmenu':
                await handleAllMenuCommand(sock, from);
                break;
            // Download Commands
            case 'tiktok':
                await handleTikTokCommand(sock, from, args[1]);
                break;
            case 'youtube':
                await handleYouTubeCommand(sock, from, args[1]);
                break;
            case 'instagram':
                await handleInstagramCommand(sock, from, args[1]);
                break;
            case 'facebook':
                await handleFacebookCommand(sock, from, args[1]);
                break;
            case 'twitter':
                await handleTwitterCommand(sock, from, args[1]);
                break;
            case 'mediafire':
                await handleMediaFireCommand(sock, from, args[1]);
                break;
            case 'gdrive':
                await handleGDriveCommand(sock, from, args[1]);
                break;
            // Tools Commands
            case 'tourl':
                await handleToUrlCommand(sock, from, m);
                break;
            case 'shorturl':
                await handleShortUrlCommand(sock, from, args[1]);
                break;
            case 'qrcode':
                await handleQRCodeCommand(sock, from, args.slice(1).join(' '));
                break;
            case 'translate':
                await handleTranslateCommand(sock, from, args.slice(1).join(' '));
                break;
            case 'weather':
                await handleWeatherCommand(sock, from, args.slice(1).join(' '));
                break;
            case 'kalkulator':
                await handleCalculatorCommand(sock, from, args.slice(1).join(' '));
                break;
            case 'base64':
                await handleBase64Command(sock, from, args[1], args.slice(2).join(' '));
                break;
            // Bug/Info Commands
            case 'ping':
                await handlePingCommand(sock, from);
                break;
            case 'speed':
                await handleSpeedCommand(sock, from);
                break;
            case 'runtime':
                await handleRuntimeCommand(sock, from);
                break;
            case 'info':
                await handleInfoCommand(sock, from);
                break;
            case 'owner':
                await handleOwnerCommand(sock, from);
                break;
            case 'donate':
                await handleDonateCommand(sock, from);
                break;
            case 'report':
                await handleReportCommand(sock, from, args.slice(1).join(' '));
                break;
            default:
                // Handle button responses
                if (['download_menu', 'tools_menu', 'bug_menu'].includes(body)) {
                    await handleButtonResponse(sock, from, body);
                }
                break;
        }
    } catch (error) {
        console.error('❌ Error handling message:', error);
    }
}

// ========================================
// COMMAND HANDLERS
// ========================================

// Handler Menu Command
async function handleMenuCommand(sock, from) {
    const currentTime = getIndonesianTime();
    const menuText = `Halo! 👋\n\nSaya adalah bot yang dirancang untuk membantu semua orang\n\n📅 ${currentTime}\n👨‍💻 Developer: ${config.developer}\n\nSilakan pilih menu dibawah ini:`;
    
    await sock.sendMessage(from, {
        text: menuText,
        buttons: createMenuButtons(),
        headerType: 1
    });
}

// Handler All Menu Command
async function handleAllMenuCommand(sock, from) {
    const currentTime = getIndonesianTime();
    const menuText = `${allMenu}\n\n📅 ${currentTime}\n👨‍💻 Developer: ${config.developer}`;
    
    await sock.sendMessage(from, { text: menuText });
}

// Handler Button Response
async function handleButtonResponse(sock, from, buttonId) {
    let responseText = '';
    
    switch (buttonId) {
        case 'download_menu':
            responseText = downloadMenu;
            break;
        case 'tools_menu':
            responseText = toolsMenu;
            break;
        case 'bug_menu':
            responseText = bugMenu;
            break;
    }
    
    await sock.sendMessage(from, { text: responseText });
}

// ========================================
// DOWNLOAD COMMAND HANDLERS
// ========================================

async function handleTikTokCommand(sock, from, url) {
    if (!url) {
        await sock.sendMessage(from, { text: '❌ Masukkan URL TikTok!\nContoh: .tiktok https://vm.tiktok.com/xxx' });
        return;
    }
    
    await sock.sendMessage(from, { text: '⏳ Sedang memproses...' });
    
    const result = await DownloadAPI.tiktok(url);
    await sock.sendMessage(from, { text: result.message });
}

async function handleYouTubeCommand(sock, from, url) {
    if (!url) {
        await sock.sendMessage(from, { text: '❌ Masukkan URL YouTube!\nContoh: .youtube https://youtu.be/xxx' });
        return;
    }
    
    await sock.sendMessage(from, { text: '⏳ Sedang memproses...' });
    
    const result = await DownloadAPI.youtube(url);
    await sock.sendMessage(from, { text: result.message });
}

async function handleInstagramCommand(sock, from, url) {
    if (!url) {
        await sock.sendMessage(from, { text: '❌ Masukkan URL Instagram!\nContoh: .instagram https://instagram.com/p/xxx' });
        return;
    }
    
    await sock.sendMessage(from, { text: '⏳ Sedang memproses...' });
    
    const result = await DownloadAPI.instagram(url);
    await sock.sendMessage(from, { text: result.message });
}

async function handleFacebookCommand(sock, from, url) {
    if (!url) {
        await sock.sendMessage(from, { text: '❌ Masukkan URL Facebook!\nContoh: .facebook https://facebook.com/xxx' });
        return;
    }
    
    await sock.sendMessage(from, { text: '⏳ Sedang memproses...' });
    
    const result = await DownloadAPI.facebook(url);
    await sock.sendMessage(from, { text: result.message });
}

async function handleTwitterCommand(sock, from, url) {
    if (!url) {
        await sock.sendMessage(from, { text: '❌ Masukkan URL Twitter!\nContoh: .twitter https://twitter.com/xxx' });
        return;
    }
    
    await sock.sendMessage(from, { text: '⏳ Sedang memproses...' });
    
    const result = await DownloadAPI.twitter(url);
    await sock.sendMessage(from, { text: result.message });
}

async function handleMediaFireCommand(sock, from, url) {
    if (!url) {
        await sock.sendMessage(from, { text: '❌ Masukkan URL MediaFire!\nContoh: .mediafire https://mediafire.com/file/xxx' });
        return;
    }
    
    await sock.sendMessage(from, { text: '⏳ Sedang memproses...' });
    
    const result = await DownloadAPI.mediafire(url);
    await sock.sendMessage(from, { text: result.message });
}

async function handleGDriveCommand(sock, from, url) {
    if (!url) {
        await sock.sendMessage(from, { text: '❌ Masukkan URL Google Drive!\nContoh: .gdrive https://drive.google.com/file/d/xxx' });
        return;
    }
    
    await sock.sendMessage(from, { text: '⏳ Sedang memproses...' });
    
    const result = await DownloadAPI.gdrive(url);
    await sock.sendMessage(from, { text: result.message });
}

// ========================================
// TOOLS COMMAND HANDLERS
// ========================================

async function handleToUrlCommand(sock, from, message) {
    // TODO: Implement file upload to URL
    await sock.sendMessage(from, { text: '❌ Reply media untuk mengupload ke URL\nFitur belum diimplementasi' });
}

async function handleShortUrlCommand(sock, from, url) {
    if (!url) {
        await sock.sendMessage(from, { text: '❌ Masukkan URL untuk dipendekkan!\nContoh: .shorturl https://google.com' });
        return;
    }
    
    const result = await ToolsAPI.shortUrl(url);
    await sock.sendMessage(from, { text: result.message });
}

async function handleQRCodeCommand(sock, from, text) {
    if (!text) {
        await sock.sendMessage(from, { text: '❌ Masukkan teks untuk QR Code!\nContoh: .qrcode Hello World' });
        return;
    }
    
    const result = await ToolsAPI.qrcode(text);
    await sock.sendMessage(from, { text: result.message });
}

async function handleTranslateCommand(sock, from, text) {
    if (!text) {
        await sock.sendMessage(from, { text: '❌ Masukkan teks untuk diterjemahkan!\nContoh: .translate Hello World' });
        return;
    }
    
    const result = await ToolsAPI.translate(text);
    await sock.sendMessage(from, { text: result.message });
}

async function handleWeatherCommand(sock, from, city) {
    if (!city) {
        await sock.sendMessage(from, { text: '❌ Masukkan nama kota!\nContoh: .weather Jakarta' });
        return;
    }
    
    const result = await ToolsAPI.weather(city);
    await sock.sendMessage(from, { text: result.message });
}

async function handleCalculatorCommand(sock, from, expression) {
    if (!expression) {
        await sock.sendMessage(from, { text: '❌ Masukkan rumus matematika!\nContoh: .kalkulator 2+2*3' });
        return;
    }
    
    const result = await ToolsAPI.calculator(expression);
    await sock.sendMessage(from, { text: result.message });
}

async function handleBase64Command(sock, from, action, text) {
    if (!action || !text) {
        await sock.sendMessage(from, { text: '❌ Format: .base64 encode/decode <teks>\nContoh: .base64 encode Hello World' });
        return;
    }
    
    const result = await ToolsAPI.base64(action, text);
    await sock.sendMessage(from, { text: result.message });
}

// ========================================
// INFO COMMAND HANDLERS
// ========================================

async function handlePingCommand(sock, from) {
    const start = Date.now();
    await sock.sendMessage(from, { text: '🏓 Pong!' });
    const ping = Date.now() - start;
    await sock.sendMessage(from, { text: `⚡ Latency: ${ping}ms` });
}

async function handleSpeedCommand(sock, from) {
    const start = process.hrtime();
    await sock.sendMessage(from, { text: '⏱️ Testing speed...' });
    const end = process.hrtime(start);
    const speed = (end[0] * 1000) + (end[1] / 1000000);
    await sock.sendMessage(from, { text: `🚀 Speed: ${speed.toFixed(2)}ms` });
}

let startTime = Date.now();
async function handleRuntimeCommand(sock, from) {
    const uptime = Date.now() - startTime;
    const hours = Math.floor(uptime / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
    
    await sock.sendMessage(from, { 
        text: `⏰ Bot Runtime: ${hours}h ${minutes}m ${seconds}s` 
    });
}

async function handleInfoCommand(sock, from) {
    const info = `
╭─「 ℹ️ INFO BOT 」
├ Nama: ${config.botName}
├ Developer: ${config.developer}
├ Platform: Node.js
├ Library: Baileys
├ Prefix: ${config.prefix}
├ Version: 1.0.0
╰────────────────`;
    
    await sock.sendMessage(from, { text: info });
}

async function handleOwnerCommand(sock, from) {
    await sock.sendMessage(from, { 
        text: `👨‍💻 Owner: ${config.developer}\n📱 Bot ini dibuat dengan ❤️ menggunakan Baileys` 
    });
}

async function handleDonateCommand(sock, from) {
    const donateText = `
╭─「 💰 DONASI 」
├ Terima kasih atas niat baiknya!
├ Donasi membantu pengembangan bot
│
├ 🏦 Dana/OVO/GoPay: 
├ 08xxxxxxxxxx
│
├ 💳 Saweria:
├ https://saweria.co/alizz
╰────────────────

Setiap donasi sangat berarti! 🙏`;
    
    await sock.sendMessage(from, { text: donateText });
}

async function handleReportCommand(sock, from, report) {
    if (!report) {
        await sock.sendMessage(from, { text: '❌ Masukkan laporan masalah!\nContoh: .report Bot tidak merespon' });
        return;
    }
    
    console.log(`📋 Report dari ${from}: ${report}`);
    await sock.sendMessage(from, { text: '✅ Laporan berhasil dikirim! Terima kasih atas feedbacknya.' });
}

// ========================================
// FUNGSI UTAMA BOT
// ========================================

async function startBot() {
    try {
        console.log('🚀 Memulai bot WhatsApp...');
        
        // Buat folder session jika belum ada
        if (!fs.existsSync(config.sessionDir)) {
            fs.mkdirSync(config.sessionDir);
        }

        // Setup authentication state
        const { state, saveCreds } = await useMultiFileAuthState(config.sessionDir);
        const { version } = await fetchLatestBaileysVersion();

        // Buat socket WhatsApp
        const sock = makeWASocket({
            version,
            logger: P({ level: 'silent' }),
            printQRInTerminal: true,
            auth: state,
            browser: [config.botName, "Chrome", "1.0.0"]
        });

        // Event listener untuk credential updates
        sock.ev.on('creds.update', saveCreds);

        // Event listener untuk connection updates
        sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect, qr } = update;
            
            if (qr) {
                console.log('📱 Scan QR code diatas untuk login');
            }
            
            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log('❌ Koneksi terputus:', lastDisconnect?.error, 'Reconnecting:', shouldReconnect);
                
                if (shouldReconnect) {
                    setTimeout(startBot, 5000);
                }
            } else if (connection === 'open') {
                console.log('✅ Bot berhasil terhubung ke WhatsApp!');
                console.log('📞 Ketik .menu untuk melihat daftar perintah');
            }
        });

        // Event listener untuk pesan masuk
        sock.ev.on('messages.upsert', (m) => handleMessage(sock, m));

    } catch (error) {
        console.error('❌ Error starting bot:', error);
        setTimeout(startBot, 10000);
    }
}

// ========================================
// JALANKAN BOT
// ========================================

console.log(`
╭─────────────────────────────╮
│     🤖 ${config.botName} Starting...     │
│                             │
│  Developer: ${config.developer}            │
│  Platform: Node.js          │
│  Library: Baileys           │
╰─────────────────────────────╯
`);

// Handle process termination
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
});

// Start the bot
startBot();