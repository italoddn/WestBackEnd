import bcrypt from 'bcrypt';

import User from '../model/User.js';

class RegisterCotroller {
  async store(req, res) {
    try {
      const { name, email, passWord } = req.body;

      const salt = 10;
      const encriptedPassword = await bcrypt.hashSync(passWord, salt);

      await User.create({ name: name, email: email, passWord: encriptedPassword });
      
      return res.status(200).json({
        message: 'usuario criado com sucesso'
      });

    } catch (e) {
      console.log(e);
    }
  }
}

export default new RegisterCotroller();