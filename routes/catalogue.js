var express = require("express");
var router = express.Router();
const {
  Categorie,
  Type_categorie,
  Produit,
  Media,
  Tarif,
} = require("../models");
const { PAGINATION_LIMIT } = require("../helpers/utils_const");
const check_paginate_value = require("../helpers/check_paginate_value");
/**
 * @Route renvois tout
 */
router.get("/", async function (req, res, next) {
  let { page, start, end } = check_paginate_value(req);
  try {
    res.locals.titre = "catalogue";
    const typee_categories = await Type_categorie.findAll();
    const categories = await Categorie.findAll();
    const allproducts = await Produit.findAll();
    const produits = await Produit.findAll({
      offset: start,
      limit: PAGINATION_LIMIT,
      order: [["pro_id", "DESC"]],
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
      ],
    });
    let nbrPages = Math.ceil(allproducts.length / PAGINATION_LIMIT);
    let next = start > 0 ? page + 1 : null;
    let prev = end < 0 ? page - 1 : null;
    return res.render("catalogue/index", {
      categories: categories,
      typee_categories: typee_categories,
      produits: produits,
      allproducts: allproducts,
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
/**
 * @Route renvois la listes des produits pour une catégorie
 */
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  let { page, start, end } = check_paginate_value(req);
  try {
    const categorie = await Categorie.findByPk(id, {
      offset: start,
      limit: PAGINATION_LIMIT,
      include: {
        model: Produit,
        include: [
          { model: Media, attributes: ["med_id", "med_ressource"] },
          { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
        ],
      },
    });
    const produits = await Produit.findAll({
      offset: start,
      limit: PAGINATION_LIMIT,
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
        { model: Categorie, where: { cat_id: id } },
      ],
    });
    let nbrPages = Math.ceil(categorie.Produits.length / PAGINATION_LIMIT);
    res.locals.titre = categorie.cat_libelle;
    return res.render("catalogue/bycategorie", {
      categorie: categorie,
      produits: produits,
      nbrPages: nbrPages,
      pageActive: page,
      start,
      end,
      categorie_id: id,
    });
  } catch (error) {
    res.status(500).render("error/serverError", {
      error: true,
      errorMsg: "Une erreur est survenue!",
      detailError: error,
    });
  }
});
/**
 * @Route renvois la listes des produits pour un Type catégorie
 * @param {Number} id => Type_categorie id
 */
router.get("/type/:id", async (req, res) => {
  const id = req.params.id;
  let { page, start, end } = check_paginate_value(req);
  let totalProductBycat = 0;
  try {
    const type_categorie = await Type_categorie.findByPk(id, {
      include: {
        model: Categorie,
        include: {
          model: Produit,
        },
      },
    });
    type_categorie.Categories.forEach((categorie) => {
      categorie.Produits.forEach((produit) => {
        totalProductBycat = totalProductBycat + 1;
      });
    });
    const produits = await Produit.findAll({
      offset: start,
      limit: PAGINATION_LIMIT,
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
        { model: Categorie, where: { tyc_id: id } },
      ],
    });
    res.locals.titre = type_categorie.tyc_libelle;
    let nbrPages = Math.ceil(totalProductBycat / PAGINATION_LIMIT);
    return res.render("catalogue/bytype", {
      type_categorie: type_categorie,
      totalProductBycat,
      produits: produits,
      nbrPages: nbrPages,
      pageActive: page,
      type_categorie_id: id,
      start,
      end,
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
