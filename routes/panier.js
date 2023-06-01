var express = require("express");
var router = express.Router();
const { Op } = require("sequelize");
const {
  Produit,
  Tarif,
  Media,
  Panier,
  Apply,
  Promo,
  Panier_detail,
  Frais_port,
  Quantite,
  Commande,
} = require("../models");
const { ACTIF } = require("../helpers/utils_const");
const Logger = require("../helpers/Logger");

router.get("/", async (req, res, next) => {
  res.locals.titre = "panier";
  let quantiteOfEachProduct = [];
  
  try {
    const allproducts = await Produit.findAll({
      where:{
        pro_statut:true
      }
    });
    
    const produitsPopulaires = await Produit.findAll({
      limit: 16,
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ttc"] },
      ],
      where: {
        [Op.and]: [
          {
            pro_en_avant: 1,
          },
          {
            pro_statut:true
          }
        ],
      },
    });
    for (let index = 0; index < allproducts.length; index++) {
      const quantiteInitial = await Quantite.sum("qua_nbre", {
        where: {
          pro_id: allproducts[index].pro_id,
        },
      });
      quantiteOfEachProduct.push({
        id: allproducts[index].pro_id,
        qty: quantiteInitial,
      });
    }
    // res.json({ produitsPopulaires });
    return res.render("panier/index", {
      produitsPopulaires,
      quantiteOfEachProduct,
    });
  } catch (error) {
     Logger.error("/panier : " + error.stack);
  }
});

router.post("/", async (req, res) => {
  let userId = req.session.userId;
  let panier_details = req.body;
  let frp_id = panier_details.frais.frp_id;
  let commande_data = panier_details.commandew;
  let adresse_liv = panier_details.adresse;
  if (userId) {
    try {
      let panier = await Panier.create({
        cli_id: userId,
      });
      panier_details.items.forEach(async (item) => {
        //selectionnez les produits et leurs tarifs dont statut = 1
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
        // vérifier si le produit est en promo ==> Applies
        if (produit) {
          let enPromo = await Apply.findOne({
            include: [
              {
                model: Produit,
                attributes: ["pro_id"],
                where: {
                  pro_id: item.pro_id,
                },
              },
              {
                model: Promo,
                attributes: ["prm_id", "prm_pourcent"],
                where: {
                  prm_actif: ACTIF,
                },
              },
            ],
          });
          if (enPromo) {
            // si oui recuperer l'id de la promo
            // récuperer le pourcentage de reduction de la promo (remise)
            console.log("en promo");
          } else {
            let pan_det = await Panier_detail.create({
              pro_id: produit.pro_id,
              tar_id: produit.Tarifs[0].tar_id,
              pan_id: panier.pan_id,
              pad_qte: item.pad_qte,
              pad_ht: produit.Tarifs[0].tar_ht,
            });
            // si non, laisser promo_id et remise à null dans panier_detail
            //console.log(pan_det);
          }
        }
      });
      let frais_port = Frais_port.findByPk(frp_id);
      if (!frais_port) {
        return res.json("frais de port non valide");
      } else {
        // let commande = await Commande.create({
        //   frp_id:frais_port.frp_id,
        //   cli_id:userId,
        //   com_debut_spectacle:commande_data.commande_debut,
        //   com_fin_spectacle:commande.com_fin_spectacle,
        //   com_comment:commande_data.com_compl,
        //   com_adr_liv:adresse_liv,
        //   // com_adr_fac:
        //   pan_id:panier.pan_id
        // })
        // après la boucle récuperer l'id du frais de port
        // insérer les valeurs dans la table Commande
      }
      res.status(201).json(panier);
    } catch (error) {
       Logger.error("/panier : " + error.stack);
      res.status(500).json(error);
    }
  } else {
    return res.json("veillez vous authentifier");
  }
});

module.exports = router;
