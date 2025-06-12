module.exports = {
    name: "alive",
    description: "Check if bot is alive",
    execute: async (sock, m) => {
        const image = { url: "https://github.com/SenalFF/botsenalpair.git" };
        await sock.sendMessage(m.key.remoteJid, {
            image,
            caption: "I'm SenalMD, how can I help you?"
        });
    }
};