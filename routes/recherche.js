var express = require("express");
var router = express.Router();
var { Produit, Media, Tarif } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {
  const search = req.query.search;
  res.locals.titre = "recherche";
  const produits = await Produit.findAll({
    order: [["pro_id", "DESC"]],
    include: [
      { model: Media, attributes: ["med_id", "med_ressource"] },
      { model: Tarif, attributes: ["tar_ttc"] },
    ],
    where: { pro_libelle: { [Op.substring]: search } },
  });
  res.render("recherche/index", {
    produits: produits,
    search: search,
  });
});

module.exports = router;
