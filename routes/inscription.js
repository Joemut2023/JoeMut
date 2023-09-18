const express = require("express");
const { M, MME } = require("../helpers/titre");
const router = express.Router();
const { Client, Panier, Produit, Panier_detail, Tarif } = require("../models");
const { Op } = require("sequelize");
let bcrypt = require("bcryptjs");
const { ACTIF } = require("../helpers/utils_const");
var nodemailer = require("nodemailer");
const Logger = require("../helpers/Logger");
router.get("/", (req, res, next) => {
  res.locals.titre = "inscription";
  res.render("inscription/index");
});
router.get("/login", (req, res, next) => {
  res.locals.titre = "inscription";
  res.render("inscription/login");
});
router.post("/", async (req, res, next) => {
  var { credentials, panier_items } = req.body;

  credentials.tit_id = credentials.tit_id === "M" ? M : MME;
  try {
    if (
      credentials.cli_nom === "" ||
      credentials.cli_prenom === "" ||
      credentials.cli_mail === "" ||
      credentials.cli_pwd === "" ||
      credentials.tit_id === ""
    ) {
      return res.status(404).json({
        error: true,
        errorMsg: "Please fill in all the fields",
      });
    }

    const oldClient = await Client.findOne({
      where: { cli_mail: credentials.cli_mail },
    });
    if (oldClient) {
      return res.status(409).json({
        error: true,
        errorMsg: "An existing user already exists with this email",
      });
    }
    pwdhashed = await bcrypt.hash(credentials.cli_pwd, 10);
    let client = await Client.create({
      tit_id: credentials.tit_id,
      cli_nom: credentials.cli_nom.toUpperCase(),
      cli_prenom: credentials.cli_prenom,
      cli_mail: credentials.cli_mail,
      cli_pwd: pwdhashed,
      cli_newsletter: credentials.cli_newsletter,
      cli_inscription: new Date(new Date().setDate(new Date().getDate())),
      cli_activation: true,
      cli_num: credentials.cli_num,
    });

    //create for client panier
    let panier = await Panier.create({
      cli_id: client.cli_id,
    });

    // req.session.panierId = panier.pan_id;
    // req.session.userId = client.cli_id;
    // res.locals.user = client;
    // res.redirect(301, `/mon-compte`);

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
      html: `<div> <p>To connect to the african's art website, please click <a href="${link}">here</a></p></div>`,
    };
    transporter
      .sendMail(mailOptions)
      .then(function (info) {
        return res.render("inscription/index" ,{
          info: true,
          message: "User created successfuly! A connection link to the web site has been sent to your respective email",
        });

        email = "";
        // file = "";
        textarea = "";
      })
      .catch(function (error) {
        Logger.error("/emailcontact : " + error.stack);
        return res.status(404)({
          error: true,
          errorMsg: "Operation fall try again",
        });
      })

  } catch (error) {
    Logger.error("/inscription : " + error.stack);
    res.status(500).render("error/serverError", {
      error: true,
      errorMsg: "Une erreur est survenue!",
      detailError: error,
    });
  }
});

module.exports = router;
