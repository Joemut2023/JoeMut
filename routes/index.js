const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");
const { Produit, Media, Tarif, Quantite } = require("../models");

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.locals.titre = "Accueil";
  let quantiteOfEachProduct = [];

  const produits = await Produit.findAll({
    limit: 12,
    order: [["pro_id", "DESC"]],
    include: [
      { model: Media, attributes: ["med_id", "med_ressource"] },
      { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
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
  });
});


//send form contact 
router.post("/", async function (req, res, next) {
  const { email, file, textarea } = req.body;

  const produits = await Produit.findAll({
    limit: 12,
    order: [["pro_id", "DESC"]],
    include: [
      { model: Media, attributes: ["med_id", "med_ressource"] },
      { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
    ],
  });

  try {
    if (email === "" || textarea === "") {
      return res
        .status(404)
        .render("default/index", {
          error: true,
          errorMsg: "remplissez les champs necessaires",
          produits
        });
    }
    else {

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "myindavictoire@gmail.com",
          pass: process.env.PASSWORD_NODEMAILER,
        },
      });
      const mailOptions = {
        from: email,
        to: "myindavictoire@gmail.com",
        subject: "Message du client depuis le site",
        html: `<div>  <p>Email: ${email}</p> <p>File :${file}</p> <p>Message:${textarea}</p></div>`,
      };

      transporter
        .sendMail(mailOptions)
        .then(function (info) {
          console.log("Email sent: " + info.response);
          res.status(200).render("default/index", {
            messages: "Votre message a été envoyé avec succès!",
            info: true,
            error: false,
            produits
          });

          email = "";
          file = "";
          textarea = "";

        })
        .catch(function (error) {
          console.log(error);
          res.status(400).render("default/index", {
            error: true,
            errorMsg:
              "Une erreur s'est produite lors de l'envoi de votre message!" + error,
            info: false,
            produits
          });

        });
    }


  } catch (error) {
    console.log(error);
    return res.status(500).render("default/index", {

      error: true,
      errorMsg: "Une erreur est survenue! : " + error,
      produits
    });
  }
});









module.exports = router;
