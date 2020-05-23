const Finance = require('../models/Finances');
const User = require('../models/User');

class CompareDateFinances {
  async index(req, res) {
    const { init, final, userID } = req.body;
    const user = await User.findById(userID);
    const [dayInit, monthInit, yearInit] = init.split('/');
    const [dayFinal, monthFinal, yearFinal] = final.split('/');

    const finances = await Finance.find({
      $and: [
        { user },
        {
          date: {
            $gte: new Date(yearInit, monthInit, dayInit),
            $lte: new Date(yearFinal, monthFinal, dayFinal),
          },
        },
      ],
    });

    return res.json(finances);
  }
}

module.exports = new CompareDateFinances();
