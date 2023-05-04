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
        refCommande
      ) => {
        
        await send_mail_confirmation(
          res,
          req,
          commande,
          adresseLiv,
          adresseFac,
          panierDetails,
          essayage,
          modeLivraison,
          sous_total,
          taxe,
          totalTTC,
          totalHT
        );

        return res.render("confirmationCommande/index", {
          panierDetails: panierDetails,
          commande,
          adresseLiv,
          adresseFac,
          sous_totalCmd: sous_totalCmd,
          produitsPopulaires: produitsPopulaires,
          totalCmd: totalCmd,
          quantiteOfEachProduct: quantiteOfEachProduct,
          refCommande,
        });
      }
    );
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
