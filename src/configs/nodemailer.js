require('dotenv').config();
const nodemailer = require('nodemailer');


const mailerClient = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});


module.exports = mailerClient;
