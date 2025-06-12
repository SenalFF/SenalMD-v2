module.exports = {
    name: "menu",
    description: "Display command menu",
    execute: async (sock, m) => {
        const menuText = `
Available Commands:
.owner - Show bot owner info
.alive - Check if bot is active
.pin   - Sample command
.menu  - Show this help menu
        `;
        await sock.sendMessage(m.key.remoteJid, { text: menuText });
    }
};