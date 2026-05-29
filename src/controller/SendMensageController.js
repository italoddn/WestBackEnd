// import { sendWhatsAppMessage } from "../services/whatssapService.js";
import axios from 'axios';

import Fila from '../model/Fila.js';

class SendMenssageController {
    async store(req, res) {
        try {
            const id = req.params.id;
            const custumer = await Fila.findById(id);
            const phoneNumber = custumer.phoneNumber.trim().replace(/\D/g, "");
            const numberReformed = phoneNumber.replace(/^(\d{2})9/, "$1");

            const whatssapApiUrl = 'https://graph.facebook.com/v25.0';
            const whatssapPhoneNumberID = '1198886893300922';
            const whatssapAcessToken = 'EAAON878S9gcBRik6xOQdPHZClHPZA4g7CgwIu6Gw3mCDwJmdzePTZA1Ij0owU5q0yRCH2JZCbjvO93St0BdE78oWRkwLv1WcMxhCbHSjo78iZA0Iw2RD1SE524XqRIjycgQRAdPA1q1cGvRGbapKamfvQ8GoZCZB48tZCN52imvL96ghzZA4ZBH0ZB2jnO9n9YZA4Jc7KgZDZD';
            
            const config = {
                headers: {
                    'Authorization': `Bearer ${whatssapAcessToken}`,
                    'Content-Type': 'application/json'
                }
            };
            const urlFinal = `${whatssapApiUrl}/${whatssapPhoneNumberID}/messages`;

            // Envio de mensagem direta (Texto Livre / Crua)
            const { data } = await axios.post(urlFinal, {
                "messaging_product": "whatsapp",
                "to": `55${numberReformed}`,
                "type": "text", // Mudamos de "template" para "text"
                "text": {
                    "body": `Olá ${custumer.name}, estamos testando o sistema! Sua mesa estará pronta em breve. 🍔` // Sua mensagem crua aqui
                }
            }, config);

            console.log(data);
            return res.status(200).json({ message: 'Menssagem de teste enviada!' });
        } catch (e) {
            if (e.response) {
                console.log("=== ERRO DETALHADO DA META ===");
                console.log(JSON.stringify(e.response.data, null, 2));
            } else {
                console.log("Erro geral:", e.message);
            }
            return res.status(500).json({ error: 'Erro ao enviar' });
        }
    }
}

export default new SendMenssageController();