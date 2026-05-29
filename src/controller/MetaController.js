

class MetaController {
  index(req, res) {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    const meuToken = 'batata123';

    if (mode === 'subscribe' && token === meuToken) {
      return res.status(200).send(challenge);
    } else {

      return res.sendStatus(403);
    }
  }
}

export default new MetaController();