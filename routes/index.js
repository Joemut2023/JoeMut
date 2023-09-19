const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");
const { Produit, Media, Commande, Tarif, Quantite, Client, Panier, Apply, Promo } = require("../models");
const Logger = require("../helpers/Logger");

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.locals.titre = "Home";
  let quantiteOfEachProduct = [];
  try {
    const produits = await Produit.findAll({
      limit: 8,
      order: [["pro_id", "DESC"]],
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
      ],
      where: { pro_statut: true },
    });
    const applies = await Apply.findAll({
      include: [
        {
          model: Promo,
          attributes: [
            "prm_code",
            "prm_pourcent",
            "prm_valeur",
            "prm_debut",
            "prm_fin",
            "prm_actif",
          ],
        },
      ],
    });
    for (let index = 0; index < produits.length; index++) {
      const quantiteInitial = await Quantite.sum("qua_nbre", {
        where: {
          pro_id: produits[index].pro_id,
        },
      });
      quantiteOfEachProduct.push({
        id: produits[index].pro_id,
        qty: quantiteInitial,
      });
    }

    res.render("default/index", {
      produits: produits,
      quantiteOfEachProduct,
      applies
    });
  } catch (error) {
    Logger.error("/newsletter : " + error.stack);
  }
});

router.get("/connected/:pwd", async (req, res, next) => {
  res.locals.titre = "Connected";
  const { pwd } = req.params
  let quantiteOfEachProduct = [];
  try {

    const client = await Client.findOne({
      where: { cli_pwd: pwd },
    });
    //console.log( client, client.cli_id,"maman");
    if (!client) {
      return res.render("error/404");
    }
    //return res.render("error/serverError");
    const produits = await Produit.findAll({
      limit: 8,
      order: [["pro_id", "DESC"]],
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
      ],
      where: { pro_statut: true },
    });
    const applies = await Apply.findAll({
      include: [
        {
          model: Promo,
          attributes: [
            "prm_code",
            "prm_pourcent",
            "prm_valeur",
            "prm_debut",
            "prm_fin",
            "prm_actif",
          ],
        },
      ],
    });
    for (let index = 0; index < produits.length; index++) {
      const quantiteInitial = await Quantite.sum("qua_nbre", {
        where: {
          pro_id: produits[index].pro_id,
        },
      });
      quantiteOfEachProduct.push({
        id: produits[index].pro_id,
        qty: quantiteInitial,
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
    req.session.panierId = panier.pan_id;
    req.session.userId = client.cli_id;
    req.session.mail = client.cli_mail
    req.session.name = client.cli_prenom
    res.locals.user = client;
    req.session.userId = client.cli_id;

    console.log("malade");
    res.redirect("/my-account");

    // res.render("default/index", {
    //   produits: produits,
    //   quantiteOfEachProduct,
    //   applies
    // });
  } catch (error) {
    Logger.error("/newsletter : " + error.stack);
  }
})

//send form contact
router.post("/", async function (req, res, next) {
  const { email, textarea } = req.body;
  let quantiteOfEachProduct = [];


  try {

    const produits = await Produit.findAll({
      limit: 10,
      order: [["pro_id", "DESC"]],
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
      ],
    });

    const applies = await Apply.findAll({
      include: [
        {
          model: Promo,
          attributes: [
            "prm_code",
            "prm_pourcent",
            "prm_valeur",
            "prm_debut",
            "prm_fin",
            "prm_actif",
          ],
        },
      ],
    });
    for (let index = 0; index < produits.length; index++) {
      const quantiteInitial = await Quantite.sum("qua_nbre", {
        where: {
          pro_id: produits[index].pro_id,
        },
      });
      quantiteOfEachProduct.push({
        id: produits[index].pro_id,
        qty: quantiteInitial,
      });
    }
    if (email === "" || textarea === "") {
      return res.status(404).render("default/index", {
        error: true,
        errorMsg: "remplissez les champs necessaires",
        produits,
      });
    } else {
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
        to: email,
        subject: "Customer message from the site African's art",
        html: `<div>  <p>${textarea}</p></div>`,
      };
      transporter
        .sendMail(mailOptions)
        .then(function (info) {
          res.status(200).render("default/index", {
            messages: "Your message has been sent successfully!",
            info: true,
            error: false,
            produits,
            quantiteOfEachProduct,
            applies
          });

          email = "";
          // file = "";
          textarea = "";
        })
        .catch(function (error) {
          Logger.error("/emailcontact : " + error.stack);
          res.status(400).render("default/index", {
            error: true,
            errorMsg:
              "An error occurred while sending your message!" +
              error,
            info: false,
            produits,
          });
        });
    }
  } catch (error) {
    Logger.error("default/index : " + error.stack);
    return res.status(500).render("default/index", {
      error: true,
      errorMsg: "Une erreur est survenue! : " + error,
      produits,
    });
  }
});

router.get("/newsletter", async (req, res) => {
  res.render("default/index");
});

router.post("/newsletter", async (req, res) => {
  const { cli_mail } = req.body;
  try {
    const checkIfClientExist = await Client.findOne({
      where: { cli_mail: cli_mail },
    });
    if (checkIfClientExist) {
      const updateNewsLetter = checkIfClientExist.update(
        { cli_newsletter: true },
        { where: { cli_mail: cli_mail } }
      );
      req.session.flash = {
        message: "Enregistrement à la newsletter réussi!",
        type: "success",
      };
    } else {
      req.session.flash = { message: "Ce client n'existe pas", type: "danger" };
    }
    res.redirect("/");
  } catch (error) {
    Logger.error("/newsletter : " + error.stack);
    req.session.flash = {
      message:
        "Erreur lors de l'enregistrement de l'utilisateur dans la newsletter",
      type: "danger",
    };
    //res.redirect('/')
  }
});

module.exports = router;
