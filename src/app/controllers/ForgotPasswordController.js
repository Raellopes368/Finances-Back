const generateToken = require('../../utils/generateToken');
const User = require('../models/User');
const sendEmail = require('../../utils/email');

class ForgotPasswordController {
  async store(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: 'Usuário não encontrado com esse email' });
    }

    const token = generateToken(user.id);

    const configsEmail = {
      from: process.env.FROM,
      to: email,
      subject: 'Recuperação de senha do App Finanças',
      html: `
      Olá, ví que você esqueceu sua senha, <a href='https://rrfinances.ga/forgot/${user.id}/${token}'>clique aqui para recuperar</a>
      <br/> 
      Obrigado por usar meu app de finanças.
      `,
    };


    await sendEmail(configsEmail);


    return res.json({ ok: true });
  }
}

module.exports = new ForgotPasswordController();
