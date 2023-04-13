const express = require("express");
const router = express.Router();
const { Produit, Media, Tarif } = require("../models");
const { PAGINATION_LIMIT } = require("../helpers/utils_const");
const check_paginate_value = require("../helpers/check_paginate_value");

router.get("/", async (req, res) => {
  let { page, start, end } = check_paginate_value(req);
  try {
    res.locals.titre = "nouvelle collection";
    const nouveauProduits = await Produit.findAll({
      offset: start,
      limit: PAGINATION_LIMIT,
      order: [["pro_id", "DESC"]],
    });
    const produits = await Produit.findAll({
      // offset: start,
      // limit: PAGINATION_LIMIT,
      order: [["pro_id", "DESC"]],
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
      ],
      where: { pro_new_collect: 1 },
    });
    let nbrPages = Math.ceil(produits.length / PAGINATION_LIMIT);
    let next = start > 0 ? page + 1 : null;
    let prev = end < 0 ? page - 1 : null;
    res.render("nouvelleCollection/index", {
      nouveauProduits: nouveauProduits,
      produits: produits,
      nbrPages: nbrPages,
      pageActive: page,
      start: start,
      end: end,
      prev: prev,
      next: next,
    });
  } catch (error) {
    res.status(500).render("error/serverError", {
      error: true,
      errorMsg: "Une erreur est survenue!",
      detailError: error,
    });
  }
});

module.exports = router;
