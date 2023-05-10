const express = require("express");
const router = express.Router();
const { Apply, Promo, Produit, Tarif, Media } = require("../models");

router.get("/", async (req, res) => {
  res.locals.titre = "promotion";
  const ProduitEnPromos = await Apply.findAll({
    limit: 10,
    include: [
      {
        model: Produit,
        attributes: ["pro_id", "pro_libelle", "pro_ref"],
        include: [
          { model: Media, attributes: ["med_id", "med_ressource"] },
          { model: Tarif, attributes: ["tar_ttc", "tar_ht"] },
        ],
      },
      {
        model: Promo,
        attributes: ["prm_code", "prm_pourcent", "prm_valeur"],
        where: {
          prm_actif: true,
        },
      },
    ],
  });
  res.render("promotion/index", {
    produits: ProduitEnPromos,
    nbrProduit: ProduitEnPromos.length,
  });
});
module.exports = router;
