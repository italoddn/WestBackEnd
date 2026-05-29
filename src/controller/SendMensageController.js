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
            const whatssapPhoneNumberID = '1104607806073100';
            const whatssapAcessToken = 'EAAON878S9gcBRrt5ZC8b0Hf6LI02KoK4ZBIOHZBsOq2bGJDPw6OMKB6A7l0py4TvXCF7JB7vtt1EGTHLCdkn7hrd3OGyDDCN3M3Bt1e8FGmdOA4U1qQ1d8LNqxS6dW9RhMY9KOcRGUSHScRbQFvZAvK9E8ZCr3S70RuLbKZCmM1yudk23OzOfyMZBDdB0AA3ZA3WpvrpQSdskYZAVWZBPW1Qdp6BQlaUCYFUIJoqInznYX9sU2SuAlKUMOLLckpxZCgoLu12PID33ML8t4tNzS3QV0mwiOo';
            const config = {
                headers: {
                    'Authorization': `Bearer ${whatssapAcessToken}`,
                    'Content-Type': 'application/json' // C maiúsculo padrão
                }
            };
            const urlFinal = `${whatssapApiUrl}/${whatssapPhoneNumberID}/messages`

            // await sendWhatsAppMessage(`55${numberReformed}`,`Olá ${custumer.name}, Ótima noticia!! \nTemos uma mesa disponivel para você🥳\n\nCorra🏃‍♂️💨 aguardaremos apenas 5 minutos para que reinvidique sua mesa, se indentifique para o garçom responsável pela fila e prepare o estômago para uma deliciosa refeição!🍔🍟`);

            await axios.post(urlFinal, {
                "messaging_product": "whatsapp",
                "to": `5531987037748`,
                "type": "template",
                "template": {
                    "name": "hello_world",
                    "language": {
                        "code": "en_US"
                    }
                }
            },config)


            return res.status(200).json({ message: 'Menssagem enviada!' });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new SendMenssageController();