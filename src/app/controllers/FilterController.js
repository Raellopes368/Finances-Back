const Finance = require('../models/Finances');
const User = require('../models/User');

class FilterController {
  async index(req, res) {
    const { filters, userId } = req.body;
    const user = await User.findById(userId);
    const finances = await Finance.find({
      $and: [
        { user },
        filters,
      ],
    });

    return res.json(finances);
  }
}

module.exports = new FilterController();
