module.exports = {
    name: "pin",
    description: "Sample pin command",
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: "📌 This is a sample pin response!" });
    }
};