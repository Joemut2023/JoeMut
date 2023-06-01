var express = require("express");
var router = express.Router();
const {
  Categorie,
  Type_categorie,
  Produit,
  Media,
  Tarif,
  Quantite,
  sequelize,
} = require("../models");
const { PAGINATION_LIMIT } = require("../helpers/utils_const");
const check_paginate_value = require("../helpers/check_paginate_value");
const Logger = require("../helpers/Logger");
/**
 * @Route renvois tout
 */

router.get("/", async function (req, res, next) {
  let orderby = req.query.orderby;
  let { page, start, end } = check_paginate_value(req);
  let quantiteOfEachProduct = []
  var orderCondition;
  let choix;
  if (orderby === "AàZ") {
    orderCondition = [["pro_libelle", "ASC"]];
    choix = "Nom, A à Z";
  } else if (orderby === "ZàA") {
    orderCondition = [["pro_libelle", "DESC"]];
    choix = "Nom, Z à A";
  } else if (orderby === "PC") {
    orderCondition = [[Tarif, "tar_ttc", "ASC"]];
    choix = "Prix, croissant";
  } else if (orderby === "PD") {
    orderCondition = [[Tarif, "tar_ttc", "DESC"]];
    choix = "Prix, décroissant";
  } else {
    orderCondition = [["pro_libelle", "DESC"]];
    choix = "Choisir";
  }

  try {
    res.locals.titre = "catalogue";
    const typee_categories = await Type_categorie.findAll({
      order: [
        ['tyc_ordre', 'ASC']
      ]
    });
    const categories = await Categorie.findAll();
    const allproducts = await Produit.findAll({
      where:{
        pro_statut:true
      }
    });
    
    for (let index = 0; index < allproducts.length; index++) {
      const quantiteInitial = await Quantite.sum("qua_nbre", {
        where: {
          pro_id: allproducts[index].pro_id,
        },
      });
      quantiteOfEachProduct.push({
        id: allproducts[index].pro_id,
        qty:quantiteInitial
      });
    }

    const produits = await Produit.findAll({
      offset: start,
      limit: PAGINATION_LIMIT,
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
      ],
      where:{pro_statut:true},
      order: orderCondition,
    });

    // res.json({ quantiteOfEachProduct });
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
      choix: choix,
      orderby,
      quantiteOfEachProduct: quantiteOfEachProduct,
    });
  } catch (error) {
    Logger.error(error.stack);
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
  let orderby = req.query.orderby;
  let { page, start, end } = check_paginate_value(req);
  var orderCondition;
  let choix;
  let quantiteOfEachProduct = [];

  if (orderby === "AàZ") {
    orderCondition = [["pro_libelle", "ASC"]];
    choix = "Nom, A à Z";
  } else if (orderby === "ZàA") {
    orderCondition = [["pro_libelle", "DESC"]];
    choix = "Nom, Z à A";
  } else if (orderby === "PC") {
    orderCondition = [[Tarif, "tar_ttc", "ASC"]];
    choix = "Prix, croissant";
  } else if (orderby === "PD") {
    orderCondition = [[Tarif, "tar_ttc", "DESC"]];
    choix = "Prix, décroissant";
  } else {
    orderCondition = [["pro_libelle", "DESC"]];
    choix = "Choisir";
  }

  try {
    const allproducts = await Produit.findAll({
      where:{
        pro_statut:true
      }
    });
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

    for (let index = 0; index < allproducts.length; index++) {
      const quantiteInitial = await Quantite.sum("qua_nbre", {
        where: {
          pro_id: allproducts[index].pro_id,
        },
      });
      quantiteOfEachProduct.push({
        id: allproducts[index].pro_id,
        qty: quantiteInitial,
      });
    }

    const type_categorie = await Type_categorie.findByPk(categorie.tyc_id);
   
    const produits = await Produit.findAll({
      offset: start,
      limit: PAGINATION_LIMIT,
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
        { model: Categorie, where: { cat_id: id } },
      ],
      where:{pro_statut:true},
      order: orderCondition,
    });
    let nbrPages = Math.ceil(categorie.Produits.length / PAGINATION_LIMIT);
    res.locals.titre = categorie.cat_libelle;
    return res.render("catalogue/bycategorie", {
      categorie: categorie,
      produits: produits,
      type_categorie: type_categorie,
      nbrPages: nbrPages,
      pageActive: page,
      start,
      end,
      categorie_id: id,
      choix: choix,
      orderby: orderby,
      quantiteOfEachProduct,
    });
  } catch (error) {
    Logger.error(error.stack)
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
  let orderby = req.query.orderby;
  let { page, start, end } = check_paginate_value(req);
  let totalProductBycat = 0;
  var orderCondition;
  let choix, ordre;
  let quantiteOfEachProduct = [];


  if (orderby === "AàZ") {
    orderCondition = [["pro_libelle", "ASC"]];
    choix = "Nom, A à Z";
  } else if (orderby === "ZàA") {
    orderCondition = [["pro_libelle", "DESC"]];
    choix = "Nom, Z à A";
  } else if (orderby === "PC") {
    orderCondition = [[Tarif, "tar_ttc", "ASC"]];
    choix = "Prix, croissant";
  } else if (orderby === "PD") {
    orderCondition = [[Tarif, "tar_ttc", "DESC"]];
    choix = "Prix, décroissant";
  } else {
    orderCondition = [["pro_libelle", "DESC"]];
    choix = "Choisir";
  }
  try {
    const allproducts = await Produit.findAll({
      where:{
        pro_statut:true,
      }
    });
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
      where:{pro_statut:true},
      order: orderCondition,
    });

    for (let index = 0; index < allproducts.length; index++) {
      const quantiteInitial = await Quantite.sum("qua_nbre", {
        where: {
          pro_id: allproducts[index].pro_id,
        },
      });
      quantiteOfEachProduct.push({
        id: allproducts[index].pro_id,
        qty: quantiteInitial,
      });
    }

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
      choix: choix,
      orderby: orderby,
      quantiteOfEachProduct,
    });
  } catch (error) {
    Logger.error(error.stack)
    res.status(500).render("error/serverError", {
      error: true,
      errorMsg: "Une erreur est survenue!",
      detailError: error,
    });
  }
});

module.exports = router;
