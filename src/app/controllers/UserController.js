const User = require('../models/User');
const generateToken = require('../../utils/generateToken');
const porcentage = require('../../utils/porcentage');

class UserController {
  async store(req, res) {
    const { name } = req.body;
    let user = await User.findOne({ name });
    if (user) {
      const { _id: id } = user;

      const token = generateToken(id);

      return res.json({ user, token });
    }
    user = await User.create({ name });

    const { _id: id } = user;

    const token = generateToken(id);

    return res.json({ user, token });
  }

  async update(req, res) {
    const { balance, userId, tithe } = req.body;

    const user = await User.findById(userId);
    if (tithe) {
      const result = porcentage(balance);

      const newBalance = result + user.balance;

      user.balance = newBalance;

      await user.save();

      return res.json(user);
    }
    const newBalance = balance + user.balance;

    user.balance = newBalance;

    await user.save();

    return res.json(user);
  }

  async show(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }
    return res.json(user);
  }
}

module.exports = new UserController();
