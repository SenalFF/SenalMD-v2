const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');

const { state, saveState } = useSingleFileAuthState('./session/session.json');
const sock = makeWASocket({ auth: state });

sock.ev.on('creds.update', saveState);

console.log('✅ Senal MD started');

// Send welcome message to owner after connection
sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'open') {
        const ownerNumber = '94769872326@s.whatsapp.net';
        const image = { url: 'https://github.com/SenalFF/botsenalpair.git' };
        const message = "🤖 Senal MD V2 is now online!

Prefix: (.)";
        await sock.sendMessage(ownerNumber, {
            image,
            caption: message
        });
    }
});

// Command handler system
const commands = new Map();
const pluginDir = path.join(__dirname, 'plugin');

fs.readdirSync(pluginDir).forEach(file => {
    if (file.endsWith('.js')) {
        const plugin = require(path.join(pluginDir, file));
        if (plugin.name && typeof plugin.execute === 'function') {
            commands.set(plugin.name, plugin.execute);
        }
    }
});

sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message || !m.key.remoteJid) return;

    const text = m.message.conversation || m.message.extendedTextMessage?.text;
    if (!text || !text.startsWith('.')) return;

    const [cmdName, ...args] = text.slice(1).split(' ');
    const command = commands.get(cmdName);
    if (command) {
        try {
            await command(sock, m, args);
        } catch (err) {
            console.error('Command Error:', err);
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Error executing command.' });
        }
    }
});
