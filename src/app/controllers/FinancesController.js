const Finance = require('../models/Finances');
const User = require('../models/User');

class FinancesController {
  async index(req, res) {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({ error: 'Id de usuário inexistente' });
    }
    const finances = await Finance.find({
      $and: [
        { user },
        {
          date: {
            $gte: new Date(year, month - 1, day),
            $lte: new Date(year, month, day),
          },
        },
      ],
    });

    return res.json(finances);
  }

  async store(req, res) {
    const { data } = req.body;
    const { user: id } = data;
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ error: 'Id de usuário inexistente' });
    }
    const newFinance = await Finance.create(data);
    user.finances.push(newFinance);
    user.save();
    return res.json(newFinance);
  }

  async update(req, res) {
    const { paid, userId, financeId } = req.body;


    const finance = await Finance.findByIdAndUpdate(
      financeId,
      { paid },
      { new: true },
    );

    const user = await User.findById(userId);

    if (paid) {
      user.balance -= finance.value;
      user.balance = user.balance.toFixed(2);
    }


    user.save();

    res.json({ user, finance });
  }

  async teste(req, res) {
    const t = await Finance.aggregate([
      {
        $group: {
          _id: { year: { $year: '$date' }, month: { $month: '$date' } },
          value: { $sum: '$value' },
          total: { $sum: 1 },
        },
      },
    ]);
    return res.json(t);
  }

  async teste2(req, res) {
    const t = await Finance.aggregate([
      {
        $group: {
          _id: { year: { $year: '$date' }, month: { $month: '$date' } },
          value: { $avg: '$value' },
          total: { $sum: 1 },
        },
      },
    ]);
    return res.json(t);
  }
}

module.exports = new FinancesController();
