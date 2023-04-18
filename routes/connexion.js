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

  const { credentials, panier_items } = req.body;
  try {
    const client = await Client.findOne({
      where: { cli_mail: credentials.cli_mail },
    });
    if (!client) {
      return res.json("mot de passe incorrect");
    }
    const valid = await bcrypt.compare(credentials.cli_pwd, client.cli_pwd);
    if (!valid) {
      return res.json("mot de passe incorrect");
    }
    const panier = await Panier.findOne({
      where: { cli_id: client.cli_id },
      include: [{ model: Commande, required: false }],
      where: { "$Commande.com_id$": null },
    });

    if (!panier) {
      panier = await Panier.create({
        cli_id: client.cli_id,
      });

      if (panier_items && panier_items.length > 0) {
        let insert_panier_details = async () => {
          panier_items.forEach(async (item) => {
            // récuperation du produit avec les bonnes infos
            let produit = await Produit.findByPk(item.pro_id, {
              include: [
                {
                  model: Tarif,
                  attributes: ["tar_ttc", "tar_id", "tar_ht"],
                  where: {
                    [Op.and]: [
                      {
                        pro_id: item.pro_id,
                      },
                      {
                        tar_statut: ACTIF,
                      },
                    ],
                  },
                },
              ],
            });
            // insérer dans panier_details
            let panier_dtl = await Panier_detail.create({
              pro_id: produit.pro_id,
              tar_id: produit.Tarifs[0].tar_id,
              pan_id: panier.pan_id,
              pad_qte: item.pad_qte,
              pad_ht: produit.Tarifs[0].tar_ht,
              pad_ttc: produit.Tarifs[0].tar_ttc,
            });
          });
        };
        await insert_panier_details();
      }
      // si des données panier_details sont envoyés insérés dans la bd
    } else {
     // if (panier_items.length > 0) {
        // supprimer tout les paniers details et insérer des nouveaux
      //}
    }
    req.session.panierId = panier.pan_id;
    req.session.userId = client.cli_id;
    res.locals.user = client;
    req.session.userId = client.cli_id;
    return res.json(panier.pan_id);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
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
    // return res.json(Panier_details);
    return res.json('ok')
  } catch (error) {
   // console.log(error);
    return res.status(500).json(error);
  }
});
router.get("/userStatut", async (req, res) => {
  const usersSession = req.session.userId;
  const userStatut = usersSession ? usersSession : false;
  return res.status(200).json(userStatut);
});
module.exports = router;
