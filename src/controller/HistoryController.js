import Historico from '../model/Historico.js';

class HistoryControler {
  
  async index(req, res) {

    try {
      const response = await Historico.find().sort({createdAt: -1 });
      
      return res.status(200).json(response);
    } catch (e) {
      console.log(e);
    }

  }

  async store(req, res) {
    const {name, accents, phoneNumber, stats, timeInLine} = req.body;

    try {
      const response = await Historico.create({
        name,
        accents,
        phoneNumber,
        stats,
        timeInLine 
      });

      return res.status(200).json(response);
    } catch (e) {
      console.log(e);
    }
  }

  async delete(req, res) {
    try {
      const response = await Historico.deleteMany({})
      console.log(response);
      return res.status(200).json(response)
    } catch (e) {
      console.log(e)
    }
  }
}

export default new HistoryControler();