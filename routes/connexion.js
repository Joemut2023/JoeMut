const express = require("express");
const router = express.Router();
const {
  Client,
  Panier,
  Panier_detail,
  Commande,
  Produit,
  Media,
} = require("../models");
var nodemailer = require("nodemailer");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
let moment = require("moment");
const { connexion } = require("../helpers/url");
const { ACTIF } = require("../helpers/utils_const");
const Logger = require("../helpers/Logger");

router.get("/", async (req, res) => {
  res.locals.titre = "connexion";
  res.render(connexion);
});
router.post("/", async (req, res) => {
  //user_login(req,res,'commander/index','/commander');
  const { cli_mail, cli_pwd } = req.body;
  var lastCartExistsInCommande;
  try {
    const client = await Client.findOne({
      where: { cli_mail: cli_mail },
    });
    if (!client) {
      return res.render("connexion/index", {
        error: true,
        errorMsg: "User or password incorrect",
      });
    }
    const valid = await bcrypt.compare(cli_pwd, client.cli_pwd);
    if (!valid) {
      return res.render("connexion/index", {
        error: true,
        errorMsg: "User or password incorrect",
      });
    }
    var panier = await Panier.findOne({
      where: { cli_id: client.cli_id },
      order: [["pan_id", "DESC"]],
    });

    if (panier) {
      lastCartExistsInCommande = await Commande.findOne({
        where: { pan_id: panier.pan_id },
      });
      if (lastCartExistsInCommande) {
        panier = await Panier.create({
          cli_id: client.cli_id,
        });
      }
    } else {
      panier = await Panier.create({
        cli_id: client.cli_id,
      });
    }
    // send link in mail with client.cli_pwd and cli mail as params
    const link = process.env.APP_URL + "connected/" + client.cli_pwd
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        // name: process.env.NAME_EMAIL,
        // host: process.env.HOST_EMAIL,
        // port: process.env.PORT_EMAIL,
        // secure: true,
        auth: {
          user: process.env.MAIL_ADRESSE,
          pass: process.env.PASSWORD_OVH,
        },
      });
      const mailOptions = {
        from: {
          name: "African's art",
          adress: process.env.MAIL_ADRESSE,
        },
        to: client.cli_mail,
        subject: "Connexion link messsage from the site African's art",
        html: `<div> <p>Hello ${client.cli_prenom},</p>  <p>To connect to the african's art website, please click <a href="${link}">here</a></p></div>`,
      };
      transporter
        .sendMail(mailOptions)
        .then(function (info) {
          return res.render("connexion/index", {
            info: true,
            message: "A connection link to the web site has been sent to your respective email",
          });

          email = "";
          // file = "";
          textarea = "";
        })
        .catch(function (error) {
          Logger.error("/emailcontact : " + error.stack);
          return res.render("connexion/index", {
            error: true,
            errorMsg: "Operation fall try again",
          });
  })
    //return res.redirect("/mon-compte");
  } catch (error) {
    Logger.error(error.stack);
    return res.render("connexion/index", {
      error: true,
      errorMsg: "Erreur serveur",
    });
    // return res.status(500).json(error);
  }
});
router.get("/panier-details/:pan_id", async (req, res) => {
  let { pan_id } = req.params;
  try {
    var Panier_details = await Panier_detail.findAll({
      include: [
        {
          model: Produit,
          attributes: ["pro_id", "pro_libelle", "pro_ref"],
          include: {
            model: Media,
            attributes: ["med_ressource"],
          },
        },
      ],
      where: { pan_id: parseInt(pan_id) },
    });
    return res.json(Panier_details);
  } catch (error) {
    Logger.error(error.stack);
    return res.status(500).json(error);
  }
});
router.get("/userStatut", async (req, res) => {
  const usersSession = req.session.userId;
  const userStatut = usersSession ? usersSession : false;
  return res.status(200).json(userStatut);
});
router.get("/password", async (req, res) => {
  res.locals.titre = "Forget password";
  res.render("connexion/forgetPassWord");
});
router.post("/password", async (req, res) => {
  res.locals.titre = "Forget password";
  const { cli_mail } = req.body;
  try {
    const client = await Client.findOne({ where: { cli_mail } });
    if (!client) {
      const typeMsg = "danger";
      const errorMsg = "No user found";
      return res.render("connexion/forgetPassWord", { errorMsg, typeMsg });
    }
    const payload = {
      cli_nom: client.cli_nom,
      cli_mail: client.cli_mail,
      cli_login: client.cli_login,
      cli_id: client.cli_id,
    };
    const cli_id = client.cli_id;
    const resetToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    const link = `${process.env.APP_URL}connexion/passwordReset/${resetToken}/${cli_id}`;
    const typeMsg = "success";
    // return res.redirect(`/connexion/passwordReset/${resetToken}/${cli_id}`);
    const transporter = nodemailer.createTransport({
      name: process.env.NAME_EMAIL,
      host: process.env.HOST_EMAIL,
      port: process.env.PORT_EMAIL,
      secure: true,
      auth: {
        user: process.env.MAIL_ADRESSE,
        pass: process.env.PASSWORD_OVH,
      },
    });
    const mailOptions = {
      to: client.cli_mail,
      from: process.env.MAIL_ADRESSE,
      subject: "Réinitialisation du mot de passe",
      html: `<div> <p>Veillez cliquer sur ce  <a href="${link}">lien</a> pour réinitialiser votre mot de passe </p></div>`,
    };

    transporter
      .sendMail(mailOptions)
      .then(function (info) {
        const successMsg =
          "Un message de réinitialisation vous a été envoyé par mail";
        res.render("connexion/forgetPassWord", { successMsg, typeMsg });
      })
      .catch(function (error) {
        Logger.error(+error.stack);
        const errorMsg =
          "Une erreur s'est produite lors de l'envoi de votre message!";
        res.render("connexion/forgetPassWord", { errorMsg, typeMsg });
      });
  } catch (error) {
    Logger.error(error.stack);
  }
});
router.get("/passwordReset/:token/:cli_id", async (req, res) => {
  res.locals.titre = " changer de mot de passe";
  const { cli_id, token } = req.params;
  res.render("connexion/passwordReset", { cli_id, token });
});
router.post("/passwordReset", async (req, res) => {
  res.locals.titre = "mot de passe oublié";
  const { cli_mail, cli_pwd, cli_id, token } = req.body;
  var lastCartExistsInCommande;
  try {
    const oldClient = await Client.findOne({ where: { cli_mail } });
    if (oldClient.cli_id != cli_id) {
      const errorMsg = "ce client n'existe pas";
      return res.render("connexion/passwordReset", { token, cli_id, errorMsg });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const now = moment().unix();

    if (now > decode.exp) {
      const errorMsg = "votre token a expiré";
      return res.render("connexion/passwordReset", { token, cli_id, errorMsg });
    }
    const newPassword = await bcrypt.hash(cli_pwd, 10);
    const id = parseInt(cli_id);
    await Client.update({ cli_pwd: newPassword }, { where: { cli_id: id } });
    const client = await Client.findOne({ where: { cli_id: id } });
    var panier = await Panier.findOne({
      where: { cli_id: client.cli_id },
      order: [["pan_id", "DESC"]],
    });

    if (panier) {
      lastCartExistsInCommande = await Commande.findOne({
        where: { pan_id: panier.pan_id },
      });
      if (lastCartExistsInCommande) {
        panier = await Panier.create({
          cli_id: client.cli_id,
        });
      }
    } else {
      panier = await Panier.create({
        cli_id: client.cli_id,
      });
    }
    req.session.panierId = panier.pan_id;
    req.session.userId = client.cli_id;
    res.locals.user = client;
    req.session.userId = client.cli_id;
    return res.redirect("/mon-compte");
  } catch (error) {
    Logger.error(error.stack);
  }
});
module.exports = router;
