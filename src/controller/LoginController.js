import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../model/User.js';

class LoginController {
  async store(req, res) {

    try {
      const { email, passWord } = req.body;

      const user = await User.findOne({ email: email })

      if (!user) return res.status(401).json({ message: 'Email ou senha invalidos' });

      const validation = await bcrypt.compare(passWord, user.passWord);

      if (!validation) return res.status(401).json({ message: 'Email ou senha invalidos' });

      const tooken = jwt.sign({ name: user.name, email: user.email }, process.env.SECRET, { expiresIn: '1d' })

      return res.status(200).json({ tooken });

    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: e
      })
    }

  }
}

export default new LoginController();