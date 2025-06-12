module.exports = {
    name: "owner",
    description: "Show owner information",
    execute: async (sock, m) => {
        const ownerInfo = `
👤 Name: Mr Senal
📞 Number: 0769872326
🌍 Country: Sri Lanka
🎂 Age: 22
        `;
        await sock.sendMessage(m.key.remoteJid, { text: ownerInfo });
    }
};