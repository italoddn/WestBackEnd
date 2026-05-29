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
            const whatssapAcessToken = 'EAAON878S9gcBRiRmuZCku400Yk5C4por9gSZCo2gcDH2PK4yF3T1h55n7WrxiNBnWN848EJeddu85xJ8MyMGMhjUwh1Qr2mCQBzjAr2bx5EugwTK5OaBwFbXa5eDQWVgQWAFFD8NbdNJWiSnY7nPkPEBAS2SE27Oa6bnXngRFZBHxXdhkdMIjHuIkjN2y6bENQOdFlAJacUk8V8PXZAZAPNBuLEfisrH4my5J2gCeRtYHATnV7C6l73C09eoi7MDUFZCM0OHYV2JkfHYK0qQtk5rsk';
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