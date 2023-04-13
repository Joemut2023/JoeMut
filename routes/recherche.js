var express = require("express");
var router = express.Router();
var { Produit, Media, Tarif } = require("../models");
const { Op } = require("sequelize");
const check_paginate_value = require("../helpers/check_paginate_value");
const { PAGINATION_LIMIT } = require("../helpers/utils_const");
router.get("/", async (req, res, next) => {
  const search = req.query.search;
  let { page, start, end } = check_paginate_value(req);

  try {
    const all_produits = await Produit.findAll({
      order: [["pro_id", "DESC"]],
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ttc"] },
      ],
      where: { pro_libelle: { [Op.substring]: search } },
    });
    const produits = await Produit.findAll({
      limit: start,
      limit: PAGINATION_LIMIT,
      order: [["pro_id", "DESC"]],
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ttc"] },
      ],
      where: { pro_libelle: { [Op.substring]: search } },
    });
    let nbrPages = Math.ceil(all_produits.length / PAGINATION_LIMIT);
    res.locals.titre = `recherche - ${search}`;
    res.render("recherche/index", {
      produits: produits,
      search: search,
      nbrPages,
      pageActive: page,
      start,
      end,
      produitsNbr: all_produits.length,
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
