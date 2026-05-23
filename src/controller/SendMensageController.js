import { sendWhatsAppMessage } from "../services/whatssapService.js";

import Fila from '../model/Fila.js';

class SendMenssageController {
    async store(req, res) {
        try {
            const id = req.params.id
            const custumer = await Fila.findById(id);
            const phoneNumber = custumer.phoneNumber.trim().replace(/\D/g, "");
            const numberReformed = phoneNumber.replace(/^(\d{2})9/, "$1");

            await sendWhatsAppMessage(`55${numberReformed}`,`Olá ${custumer.name}, Ótima noticia!! \nTemos uma mesa disponivel para você🥳\n\nCorra🏃‍♂️💨 aguardaremos apenas 5 minutos para que reinvidique sua mesa, se indentifique para o garçom responsável pela fila e prepare o estômago para uma deliciosa refeição!🍔🍟`);
            return res.status(200).json({ message: 'Menssagem enviada!' });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new SendMenssageController();