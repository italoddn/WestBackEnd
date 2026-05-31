import Fila from '../model/Fila.js'

class HomeController {

    async index(req, res) {
        try {
            const clientes = await Fila.find()
            return res.status(200).json(clientes);
        } catch (e) {
            console.log(e);
        }
    }

    async store(req, res) {
        try {
            const { name, accents, phoneNumber } = req.body;

            const response = await Fila.create({
                name,
                accents: Number(accents),
                phoneNumber
            })

            return res.status(200).json(response);
        } catch (e) {
            console.log(e);
        }
    }

    async delete(req, res) {
        try {
            if (!req.params.id) return res.status(400).json({ message: 'ID não enviado' });

            const custumer = await Fila.findById(req.params.id);

            if (!custumer) return res.status(200).json({ message: 'Cliente não encontrado' });

            await custumer.deleteOne();

            res.status(200).json({ message: 'Cliente deletado com sucesso' });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new HomeController();