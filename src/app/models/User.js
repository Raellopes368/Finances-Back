const { Schema, model, Types } = require('mongoose');

const UserSChema = new Schema({
  name: String,
  balance: {
    type: Number,
    default: 0,
  },
  finances: [
    {
      type: Types.ObjectId,
      ref: 'Finance',
    },
  ],
});
const autoPopulateLead = function (next) {
  this.populate('finances');
  next();
};
UserSChema.pre('find', autoPopulateLead);
UserSChema.pre('findOne', autoPopulateLead);
UserSChema.pre('findById', autoPopulateLead);

module.exports = model('User', UserSChema);
