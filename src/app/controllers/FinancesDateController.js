const Finances = require('../models/Finances');
const User = require('../models/User');

class FinancesDateController {
  async index(req, res) {
    const { date, id } = req.body;
    const user = await User.findById(id);

    const [day, month, year] = date.split('/');

    const finances = await Finances.find({
      $and: [
        { user },
        {
          date: { $eq: new Date(year, month, day) },
        },
      ],
    });
    return res.json(finances);
  }
}

module.exports = new FinancesDateController();
