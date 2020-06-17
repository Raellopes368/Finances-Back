const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateToken = require('../../utils/generateToken');


class SessionsController {
  async store(req, res) {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (user) {
      const result = await bcrypt.compare(password, user.password);

      if (result) {
        const token = generateToken(user.id);
        user.password = undefined;
        return res.json({ user, token });
      }

      return res.json({ error: 'Senha incorreta!' });
    }

    return res.json({ error: 'Usuário não encontrado' });
  }
}

module.exports = new SessionsController();
