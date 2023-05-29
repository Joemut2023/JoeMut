const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");
const { Produit, Media, Tarif, Quantite, Client } = require("../models");
const { where } = require("sequelize");



/* GET home page. */
router.get("/", async (req, res, next) => {
  res.locals.titre = "Accueil";
  let quantiteOfEachProduct = [];

  const produits = await Produit.findAll({
    limit: 8,
    order: [["pro_id", "DESC"]],
    include: [
      { model: Media, attributes: ["med_id", "med_ressource"] },
      { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
    ],
    where: { pro_statut: true }
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
  let quantiteOfEachProduct = [];
  const produits = await Produit.findAll({
    limit: 10,
    order: [["pro_id", "DESC"]],
    include: [
      { model: Media, attributes: ["med_id", "med_ressource"] },
      { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
    ],
  });

  try {
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
    }
    else {

      const transporter = nodemailer.createTransport({
        name: "wcg-rdc.com",
        host: "SSL0.OVH.NET",
        port: 465,
        secure: true,
        auth: {
          user: "aes@wcg-rdc.com",
          pass: process.env.PASSWORD_OVH
        },
      });
      const mailOptions = {
        from: email,
        to: "aes@wcg-rdc.com",
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
            produits,
            quantiteOfEachProduct,
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


router.get("/newsletter", async (req, res) => {
  res.render("default/index")
})

router.post("/newsletter", async (req, res) => {
  const { cli_mail } = req.body
  try {
    
    const checkIfClientExist = await Client.findOne({ where: { cli_mail: cli_mail } })
    if (checkIfClientExist) {
      const updateNewsLetter = checkIfClientExist.update({ cli_newsletter: true}, { where: { cli_mail: cli_mail } })
      req.session.flash = {message:"Enregistrement à la newsletter réussi!",type:"success"} 
    }else{
      req.session.flash = {message:"Ce client n'existe pas",type:"danger"}
    }
    res.redirect('/')
  } catch (error) {
    req.session.flash = {message:"Erreur lors de l'enregistrement de l'utilisateur dans la newsletter",type:"danger"}
    //res.redirect('/')
  }
})

  module.exports = router;
