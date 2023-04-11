const express = require("express");
const router = express.Router();
const { Produit, Media, Tarif } = require("../models");

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.locals.titre = "Accueil";
  const produits = await Produit.findAll({
    limit: 10,
    order: [["pro_id", "DESC"]],
    include: [
      { model: Media, attributes: ["med_id", "med_ressource"] },
      { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
    ],
  });
  res.render("default/index", {
    produits: produits,
  });
});

module.exports = router;
