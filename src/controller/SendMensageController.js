// import { sendWhatsAppMessage } from "../services/whatssapService.js";
import axios from 'axios';

import Fila from '../model/Fila.js';

class SendMenssageController {
    async store(req, res) {
        try {
            const id = req.params.id
            const custumer = await Fila.findById(id);
            const phoneNumber = custumer.phoneNumber.trim().replace(/\D/g, "");
            const numberReformed = phoneNumber.replace(/^(\d{2})9/, "$1");

            const whatssapApiUrl = 'https://graph.facebook.com/v25.0';
            const whatssapPhoneNumberID = '1198886893300922';
            const whatssapAcessToken = 'EAAON878S9gcBRik6xOQdPHZClHPZA4g7CgwIu6Gw3mCDwJmdzePTZA1Ij0owU5q0yRCH2JZCbjvO93St0BdE78oWRkwLv1WcMxhCbHSjo78iZA0Iw2RD1SE524XqRIjycgQRAdPA1q1cGvRGbapKamfvQ8GoZCZB48tZCN52imvL96ghzZA4ZBH0ZB2jnO9n9YZA4Jc7KgZDZD';
            const config = {
                headers: {
                    'Authorization': `Bearer ${whatssapAcessToken}`,
                    'Content-Type': 'application/json' // C maiúsculo padrão
                }
            };
            const urlFinal = `${whatssapApiUrl}/${whatssapPhoneNumberID}/messages`

            // await sendWhatsAppMessage(`55${numberReformed}`,`Olá ${custumer.name}, Ótima noticia!! \nTemos uma mesa disponivel para você🥳\n\nCorra🏃‍♂️💨 aguardaremos apenas 5 minutos para que reinvidique sua mesa, se indentifique para o garçom responsável pela fila e prepare o estômago para uma deliciosa refeição!🍔🍟`);

            const {data} = await axios.post(urlFinal, {
                "messaging_product": "whatsapp",
                "to": `55${numberReformed}`,
                "type": "template",
                "template": {
                    "name": "west_fila_autorizado",
                    "language": {
                        "code": "pt_BR"
                    },
                    "components": [
                        {
                            "type": "body",
                            "parameters": [
                                {
                                    "type": "text",
                                    "text": custumer.name
                                }
                            ]
                        }
                    ]
                }
            },config)

            console.log(data)
            return res.status(200).json({ message: 'Menssagem enviada!' });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new SendMenssageController();