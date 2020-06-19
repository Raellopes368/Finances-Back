const organizeDate = require('./date');

module.exports = (init, final, type, paid, description) => {
  const filters = {};

  if (paid !== undefined) {
    filters.paid = paid;
  }

  if (init && final) {
    const { date } = organizeDate(init, final);

    filters.date = date;
  }

  if (type) {
    const [types] = type.split(',').map((tp) => tp.trim());

    filters.type = {
      $regex: types,
      $options: 'igm',
    };
  }

  if (description) {
    filters.description = {
      $regex: description,
      $options: 'igm',
    };
  }

  return filters;
};
