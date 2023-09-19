var express = require("express");
var router = express.Router();
const {
  Panier_detail,
  Produit,
  Client,
  Commande,
  Panier,
  Frais_port,
  Media,
  Tarif,
  Adresse,
  Frais_supp,
  Autre_frais,
  Essayage,
  QUantite,
} = require("../models");
var nodemailer = require("nodemailer");
const Logger = require("../helpers/Logger");
const send_mail_confirmation = require("../helpers/send_mail_confirmation");
const { TVA } = require("../helpers/utils_const");
const get_commande_data = require("../helpers/get_commande_data");

router.get("/", async (req, res, next) => {
  res.locals.titre = "confirmation_commande";
  try {
    const commandeId = req.session.commandeId;
    const userId = req.session.userId;
    await get_commande_data(
      commandeId,
      async (
        commande,
        adresseLiv,
        adresseFac,
        panierDetails,
        essayage,
        modeLivraison,
        sous_total,
        taxe,
        totalTTC,
        totalHT,
        sous_totalCmd,
        produitsPopulaires,
        totalCmd,
        quantiteOfEachProduct,
        refCommande) => {
        // await send_mail_confirmation(
        //   res,
        //   req,
        //   commande,
        //   adresseLiv,
        //   adresseFac,
        //   panierDetails,
        //   essayage,
        //   modeLivraison,
        //   sous_total,
        //   taxe,
        //   totalTTC,
        //   totalHT);
        //const link = process.env.APP_URL + "connected/" + client.cli_pwd
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
          to: req.session.mail,
          subject: "Order confirmation from Africna's art web site",
          html: `<div> <p>Dear ${req.session.name},</p>  <p>Your order has been taken into account. We will get back to you to confirm your quote. </p> <p>With kind regards,<br>
          Customer Service African's art</p></div>`,
        };
        transporter
          .sendMail(mailOptions)
          .then(function (info) {
          })
          .catch(function (error) {
            Logger.error("/emailcontact : " + error.stack);
          })
        return res.render("confirmationCommande/index", {
          panierDetails: panierDetails,
          commande,
          adresseLiv,
          adresseFac,
          sous_total,
          panier_ttc: sous_totalCmd,
          produitsPopulaires: produitsPopulaires,
          totalCmd: totalCmd,
          quantiteOfEachProduct: quantiteOfEachProduct,
          refCommande,
          totalTTC,
          totalHT
        });
      }
    );
  } catch (error) {
    Logger.error('/confirmation_commande: ' + error.stack);
    res.redirect('/');
  }
});

module.exports = router;
