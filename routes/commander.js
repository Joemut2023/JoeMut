const express = require("express");
const router = express.Router();
const {
  Adresse,
  Frais_port,
  Panier,
  Produit,
  Media,
  Commande,
  Panier_detail,
  Autre_frais,
  Essayage,
  Client,
  Chronologie,
  Promo,
} = require("../models");
const createadress = require("../helpers/createadress");
const user_subscribe = require("../helpers/user_subscribe");
const user_login = require("../helpers/user_login");
const { Op } = require("sequelize");
const {
  STATUT_COMMANDE_FINALISATION_DEVIS,
  DEFAULT_ADMIN_USER_ID,
} = require("../helpers/utils_const");
const Logger = require("../helpers/Logger");

router.get("/", async (req, res) => {
  res.locals.titre = "commander";
  let userId = req.session.userId;
  let { newadress } = req.query;
  const pan_id = req.session.panierId;

  try {
    const produits = await Panier_detail.findAll({
      include: [
        {
          model: Produit,
          attributes: ["pro_ref", "pro_libelle"],
          include: [{ model: Media, attributes: ["med_id", "med_ressource"] }],
        },
      ],
      where: { pan_id },
    });

    const mode_livraisons = await Frais_port.findAll({
      where: { frp_actif: true },
    });
    if (newadress) {
      return res.render("commander/index", {
        mode_livraisons: mode_livraisons,
        produits,
      });
    }
    if (userId) {
      const adresses = await Adresse.findAll({
        where: {
          cli_id: req.session.userId,
        },
      });
      if (adresses.length === 0) {
        return res.render("commander/index", {
          mode_livraisons: mode_livraisons,
          produits,
        });
      } else {
        return res.render("commander/index", {
          adresses,
          mode_livraisons: mode_livraisons,
          produits,
        });
      }
    } else {
      return res.render("commander/index", {
        mode_livraisons: mode_livraisons,
      });
    }
  } catch (error) {
    res.status(500).render("error/serverError", {
      error: true,
      errorMsg: "Une erreur est survenue!",
      detailError: error,
    });
  }
});
router.post("/", async (req, res) => {
  let userId = req.session.userId;
  let pan_id = req.session.panierId;

  let { frais, adresse, commande, essayages, prm_code,adresse_livraison } = req.body;
  try {
    // récuperation du panier du user(panier, non commande)
    //enregistrement du panier dans la commande

    let panier = await Panier.findByPk(pan_id,{
      include:[{
        model:Panier_detail,
        attributes:['pad_id']
      }]
    });
    let adress_item = await Adresse.findOne({where:{adr_id:parseInt(adresse)}});
    let adresse_livraison_item = await Adresse.findOne({where:{adr_id:parseInt(adresse_livraison)}});
    Logger.error(adresse_livraison_item.adr_id);
    const somme_ttc = await Panier_detail.sum("pad_ttc", { where: { pan_id } });
    const somme_ht = await Panier_detail.sum("pad_ht", { where: { pan_id } });
    const user = await Client.findOne({ where: { cli_id: userId } });
    let today = new Date();
    let remise;
    let if_commande_exist = await Commande.findOne({
      where:{pan_id}
    });
    if (if_commande_exist) {
      let new_panier = await Panier.create({
        cli_id: userId,
      });
      await new_panier.save();
      req.session.panierId = new_panier.pan_id;
      return res.json(false);
    } else {
      if (panier.Panier_details.length === 0) {
        return res.json(false);
      } else {
        const autres_frais = await Autre_frais.findAll({
          where: {
            [Op.and]: [
              { auf_actif: true },
              { auf_debut: { [Op.lte]: today } },
              { auf_fin: { [Op.gte]: today } },
            ],
          },
        });
        var total_autres_frais = 0;
        autres_frais.forEach((auf) => {
          total_autres_frais += auf.auf_ttc;
        });
        let commande_item = await Commande.create({
          frp_id: frais.frp_id,
          cli_id: userId,
          com_debut_spectacle: commande.commande_debut,
          com_fin_spectacle: commande.com_fin_spectacle,
          com_comment: commande.com_compl,
          com_adr_liv: adresse_livraison_item.adr_id,
          com_adr_fac: adress_item.adr_id,
          pan_id: panier.pan_id,
          com_ht: somme_ht,
          com_ttc: somme_ttc,
          com_port: frais.frais_port,
          com_frais: total_autres_frais,
          com_num: `${user.cli_nom.substring(0, 3).toUpperCase()}-${
            panier.pan_id
          }-${new Date().getFullYear()}`,
        });
        if (prm_code !== "") {
          const codePromo = await Promo.findOne({
            where: {
              [Op.and]: [
                {
                  prm_code: prm_code,
                },
                {
                  prm_actif: true,
                },
                {
                  prm_debut: {
                    [Op.lte]: new Date(new Date().setDate(new Date().getDate())),
                  },
                },
                {
                  prm_fin: {
                    [Op.gte]: new Date(new Date().setDate(new Date().getDate())),
                  },
                },
                {
                  prm_commande: true,
                },
              ],
            },
          });
          if (codePromo) {
            if (codePromo.prm_pourcent) {
              remise = codePromo.prm_pourcent;
              remise = parseFloat(
                parseFloat(commande_item.com_ht) * (remise / 100)
              ).toFixed(2);
            } else if (codePromo.prm_valeur) {
              remise = codePromo.prm_valeur;
            }
            await Commande.update(
              {
                com_remise: remise,
                com_code_promo: prm_code,
              },
              { where: { com_id: commande_item.com_id } }
            );
            //update
          }
        }
        let chronologie = await Chronologie.create({
          stc_id: STATUT_COMMANDE_FINALISATION_DEVIS,
          com_id: commande_item.com_id,
          usr_id: DEFAULT_ADMIN_USER_ID,
          chr_date: new Date(new Date().setDate(new Date().getDate())),
        });
        for (let i = 0; i < essayages.length; i++) {
          if (essayages[i] !== "") {
            let essayage = await Essayage.create({
              com_id: commande_item.com_id,
              ess_repetition: essayages[i],
            });
          }
        }
        // normalement la valeur pour com_port et com_frais doivenet être calculé en bdd
        let new_panier = await Panier.create({
          cli_id: userId,
        });
        await new_panier.save();
        req.session.panierId = new_panier.pan_id;
        req.session.commandeId = commande_item.com_id;
        return res.json(new_panier);
      }
    }
   
  } catch (error) {
    Logger.error('/commander: ' + error.stack);
    req.session.flash = {message:"Une erreur est survenue, veillez-vous assurer d'avoir rempli les champs requis.",type:"danger"}
    return res.redirect('/commander');
  }
});
router.post("/add-adresse", async (req, res) => {
  res.locals.titre = "commander";
  let userId = req.session.userId;
  createadress(req, res, "/commander", true);
});
router.post("/user-login", async (req, res) => {
  user_login(req, res, "commander/index", "/commander");
});
router.post("/user-subscribe", async (req, res) => {
  user_subscribe(req, res, "commander/index", "/commander");
});
module.exports = router;
