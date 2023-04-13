var express = require("express");
var router = express.Router();
const { Produit, Tarif, Media } = require("../models");

router.get("/", async (req, res, next) => {
  res.locals.titre = "panier";

  try {
    const produitsPopulaires = await Produit.findAll({
      limit: 16,
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ttc"] },
      ],
      where: {
        pro_en_avant: 1,
      },
    });
    // res.json({ produitsPopulaires });
    return res.render("panier/index", {
      produitsPopulaires,
    });
  } catch (error) {}
});

module.exports = router;
