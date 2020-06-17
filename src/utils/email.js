const clientEmail = require('../configs/nodemailer');


module.exports = function sendEmail(config) {
  return new Promise((resolve) => {
    clientEmail.sendMail(config, (error) => {
      if (!error) resolve('Success');
      resolve(error);
    });
  });
};
