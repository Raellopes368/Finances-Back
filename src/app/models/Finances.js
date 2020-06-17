const { Schema, model } = require('mongoose');

const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDate();


const FinanceSchema = new Schema({
  user: String,
  description: String,
  date: {
    type: Date,
    default: new Date(year, month, day),
  },
  type: String,
  value: Number,
  paid: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('Finance', FinanceSchema);
