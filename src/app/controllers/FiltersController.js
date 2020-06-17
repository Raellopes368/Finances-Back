const Finance = require('../models/Finances');
const User = require('../models/User');
const organizeFilters = require('../../utils/organizeFilters');

class FiltersController {
  async index(req, res) {
    const { id } = req.params;
    const {
      paid, init = false, final = false, type = false, description = false,
    } = req.query;

    const filters = organizeFilters(init, final, type, paid, description);

    const user = await User.findById(id);

    const finances = await Finance.find({
      $and: [
        { user: user.id },
        filters,
      ],
    });

    return res.json(finances);
  }
}

module.exports = new FiltersController();
