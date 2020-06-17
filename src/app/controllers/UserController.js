/* eslint-disable no-useless-escape */
const User = require('../models/User');
const Finances = require('../models/Finances');
const generateToken = require('../../utils/generateToken');
const porcentage = require('../../utils/porcentage');

class UserController {
  async store(req, res) {
    const { name, password, email } = req.body;
    let user = await User.findOne({ name });
    if (user) {
      return res.json({ error: 'Usuário já existe' });
    }

    if (name.match(/([^a-z0-9@#])/igm)) {
      return res.json({ error: 'Nome de usuário não pode conter caracteres especiais, exceto @ e #' });
    }


    if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      return res.json({ error: 'Informe um email válido' });
    }

    user = await User.create({ name, password, email });

    user.password = undefined;

    const { _id: id } = user;

    const token = generateToken(id);

    return res.json({ user, token });
  }

  async edite(req, res) {
    const { id, password } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.json({ error: 'Usuário não encontrado' });
    }

    user.password = password;
    const token = generateToken(id);

    await user.save();

    user.password = undefined;

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

    user.password = undefined;

    return res.json(user);
  }

  async show(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);

    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const finances = await Finances.find({
      $and: [
        { user: user.id },
        {
          date: {
            $gte: new Date(year, month, 1),
            $lte: new Date(year, month, 31),
          },
        },
      ],
    });


    const [totalDebit] = await Finances.aggregate([
      {
        $match: {
          $and: [{
            paid: false,
            user: user.id,
          }],
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$value' },
        },
      },
    ]);


    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }


    user.password = undefined;
    user.finances = finances;
    const userResult = user;
    userResult.totalDebit = totalDebit
      ? totalDebit.total
      : 0;
    return res.json({
      user: userResult,
    });
  }
}

module.exports = new UserController();
