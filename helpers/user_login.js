let bcrypt = require("bcryptjs");
const {Client} = require('../models');

module.exports = async (req,res,view,route)=>{
  const { cli_mail, cli_pwd } = req.body;
  try {
    const client = await Client.findOne({ where: { cli_mail } });
    if (!client) {
      return res.render(view, {
        error: true,
        errorMsg: "paire login / mot de passe invalide",
      });
    }
    const valid = await bcrypt.compare(cli_pwd, client.cli_pwd);
    if (!valid) {
      return res.render(view, {
        error: true,
        errorMsg: "paire login / mot de passe invalide",
      });
    }
    req.session.userId = client.cli_id;
    res.redirect(301, route);
  } catch (error) {
    return res.render(view, {
      error: true,
      errorMsg: "Quelque chose s'est mal passé pendant la reqûete",
    });
  }
}