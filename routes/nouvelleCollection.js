const express = require("express");
const router = express.Router();
const { Produit, Media, Tarif, Quantite } = require("../models");
const { PAGINATION_LIMIT } = require("../helpers/utils_const");
const check_paginate_value = require("../helpers/check_paginate_value");

router.get("/", async (req, res) => {
  let { page, start, end } = check_paginate_value(req);
  let orderby = req.query.orderby;
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
    res.locals.titre = "nouvelle collection";
     const allproducts = await Produit.findAll();
    const nouveauProduits = await Produit.findAll({
      // offset: start,
      // limit: PAGINATION_LIMIT,
      // order: [["pro_id", "DESC"]],
      where: { pro_new_collect: 1,pro_statut:true },
    });
    const produits = await Produit.findAll({
      offset: start,
      limit: PAGINATION_LIMIT,
      // order: [["pro_id", "DESC"]],
      order:orderCondition,
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
      ],
      where: { pro_new_collect: 1 },
      
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

    let nbrPages = Math.ceil(nouveauProduits.length / PAGINATION_LIMIT);
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
      choix: choix,
      orderby: orderby,
      quantiteOfEachProduct,
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
