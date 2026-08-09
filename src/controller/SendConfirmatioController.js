// import { sendWhatsAppMessage } from "../services/whatssapService.js";
import axios from 'axios';

import Fila from '../model/Fila.js';

class SendConfirmatioController {
    async store(req, res) {
        try {
            const id = req.params.id
            const custumer = await Fila.findById(id);
            const phoneNumber = custumer.phoneNumber.trim().replace(/\D/g, "");
            const numberReformed = phoneNumber.replace(/^(\d{2})9/, "$1");

            const whatssapApiUrl = process.env.WHATSSAPURL;
            const whatssapPhoneNumberID = process.env.WHATSSAPHONEID;
            const whatssapAcessToken = process.env.WHATSSAPTOOKEN;
            const config = {
                headers: {
                    'Authorization': `Bearer ${whatssapAcessToken}`,
                    'Content-Type': 'application/json'
                }
            };
            const urlFinal = `${whatssapApiUrl}/${whatssapPhoneNumberID}/messages`

            const { data } = await axios.post(urlFinal, {
                "messaging_product": "whatsapp",
                "to": `55${numberReformed}`,
                "type": "template",
                "template": {
                    "name": "confirmacao_fila",
                    "language": {
                        "code": "pt_BR"
                    },
                    "components": [
                        {
                            "type": "body",
                            "parameters": [
                                {
                                    "type": "text",
                                    "parameter_name": "name",
                                    "text": custumer.name
                                }
                            ]
                        }
                    ]
                }
            }, config)

            console.log(data)
            return res.status(200).json({ message: 'Menssagem enviada!' });
        } catch (e) {
            if (e.response) {
                // Isso vai quebrar o [Object] e mostrar a mensagem real em texto no terminal
                console.log("=== ERRO DETALHADO DA META ===");
                console.log(JSON.stringify(e.response.data, null, 2));
            } else {
                console.log("Erro geral:", e.message);
            }
            return res.status(500).json({ error: 'Erro ao enviar' });
        }
    }
}

export default new SendConfirmatioController();