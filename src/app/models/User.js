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
  const hash = bcrypt.hashSync(this.password, 8);
  console.log('Passou por aqui');
  this.password = hash;
  next();
}

UserSChema.pre('save', hashPassword);

module.exports = model('User', UserSChema);
