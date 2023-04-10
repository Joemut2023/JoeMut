const express = require("express");
const router = express.Router();
const { Produit, Media, Tarif } = require("../models");

router.get("/", async (req, res) => {
  res.locals.titre = "nouvelle collection";
  const produits = await Produit.findAll({
    limit: 8,
    order: [["pro_id", "DESC"]],
    include: [
      { model: Media, attributes: ["med_id", "med_ressource"] },
      { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
    ],
    where: { pro_en_avant: 1 },
  });
  res.render("nouvelleCollection/index", {
    produits: produits,
  });
});

module.exports = router;
