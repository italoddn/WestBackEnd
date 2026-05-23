// src/services/whatsappService.js
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import pino from 'pino';
import qrcode from 'qrcode-terminal';

let sock = null;

export const connectToWhatsApp = async () => {
    // 1. Gerenciamento de estado (onde as chaves de login ficam salvas)
    const { state, saveCreds } = await useMultiFileAuthState('auth_baileys');

    sock = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false, // Vamos imprimir manualmente abaixo para evitar bugs
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        // Se o QR Code aparecer, imprime no terminal
        if (qr) {
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Conexão fechada devido a:', lastDisconnect.error, '. Reconectando:', shouldReconnect);
            if (shouldReconnect) connectToWhatsApp();
        } else if (connection === 'open') {
            console.log('✅ WhatsApp Conectado (v7.0.0)!');
        }
    });

    return sock;
};

export const sendWhatsAppMessage = async (numero, mensagem) => {
    if (!sock) throw new Error("WhatsApp não inicializado");

    // Formatação rigorosa para a v7: remove tudo que não é número e adiciona o sufixo
    const cleanNumber = numero.replace(/\D/g, '');
    const jid = `${cleanNumber}@s.whatsapp.net`;
    
    // Na v7, o sendMessage retorna uma promise que você pode aguardar
    return await sock.sendMessage(jid, { text: mensagem });
};