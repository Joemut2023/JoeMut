const express = require("express");
const router = express.Router();
const {
  Client,
  Panier,
  Panier_detail,
  Commande,
  Produit,
  Tarif,
  Media,
} = require("../models");
let bcrypt = require("bcryptjs");
let { Op } = require("sequelize");

const { connexion } = require("../helpers/url");
const { ACTIF } = require("../helpers/utils_const");

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
      return res.render("connexion/index",{
        error:true,
        errorMsg:"Utilisateur ou mot de passe incorect"
      });
    }
    const valid = await bcrypt.compare(cli_pwd, client.cli_pwd);
    if (!valid) {
      return res.render("connexion/index",{
        error:true,
        errorMsg:"Utilisateur ou mot de passe incorect"
      });
    }
    var panier = await Panier.findOne({
      where: { cli_id: client.cli_id },
      order: [['pan_id', 'DESC']],
    });

    if (panier) {
      lastCartExistsInCommande = await Commande.findOne({
        where: { pan_id: panier.pan_id },
      });
      if (lastCartExistsInCommande) {
        panier = await Panier.create({
          cli_id: client.cli_id,
        });
        //console.log(panier);
      }
    }else{
      panier = await Panier.create({
        cli_id: client.cli_id,
      });
    }
    req.session.panierId = panier.pan_id;
    req.session.userId = client.cli_id;
    res.locals.user = client;
    req.session.userId = client.cli_id;
    //console.log('ooooooooooooo');
    return res.redirect("/mon-compte");;
  } catch (error) {
    console.log(error);
    return res.render("connexion/index",{
      error:true,
      errorMsg:"Erreur serveur"
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
    console.log(error);
    return res.status(500).json(error);
  }
});
router.get("/userStatut", async (req, res) => {
  const usersSession = req.session.userId;
  const userStatut = usersSession ? usersSession : false;
  return res.status(200).json(userStatut);
});
module.exports = router;
