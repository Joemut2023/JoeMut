const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");
const { Produit, Media, Tarif, Quantite, Client, Apply,Promo } = require("../models");
const Logger = require("../helpers/Logger");

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.locals.titre = "Accueil";
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

//send form contact
router.post("/", async function (req, res, next) {
  const { email,  textarea } = req.body;
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
        from: email,
        to: process.env.MAIL_ADRESSE,
        subject: "Customer message from the site",
        html: `<div>  <p>Email: ${email}</p> <p>Message: ${textarea}</p></div>`,
      };

      transporter
        .sendMail(mailOptions)
        .then(function (info) {
          console.log("Email sent: " + info.response);
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
