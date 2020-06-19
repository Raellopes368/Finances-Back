const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSChema = new Schema({
  name: String,
  email: String,
  password: String,
  balance: {
    type: Number,
    default: 0,
  },
  totalDebit: Number,
  finances: [
    {
      type: Types.ObjectId,
      ref: 'Finance',
    },
  ],
});
function hashPassword(next) {
  if (!this.isModified('password')) return next();
  const hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
}

UserSChema.pre('save', hashPassword);

module.exports = model('User', UserSChema);
