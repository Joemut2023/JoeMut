const express = require("express");
const router = express.Router();
const { Apply, Promo, Produit, Tarif, Media, Quantite } = require("../models");
const Logger = require("../helpers/Logger");

const { PAGINATION_LIMIT } = require("../helpers/utils_const");
const check_paginate_value = require("../helpers/check_paginate_value");


router.get("/", async (req, res) => {
  res.locals.titre = "promotion";
   let { page, start, end } = check_paginate_value(req);
   let orderby = req.query.orderby;
   var orderCondition;
   let choix;
   let quantiteOfEachProduct = [];

    if (orderby === "AàZ") {
      orderCondition = [[Produit,"pro_libelle", "ASC"]];
      choix = "Nom, A à Z";
    } else if (orderby === "ZàA") {
      orderCondition = [[Produit,"pro_libelle", "DESC"]];
      choix = "Nom, Z à A";
    } 
    else if (orderby === "PC") {
      orderCondition = [[Produit,Tarif, "tar_ttc", "ASC"]];
      choix = "Prix, croissant";
    } else if (orderby === "PD") {
      orderCondition = [[Produit,Tarif, "tar_ttc", "DESC"]];
      choix = "Prix, décroissant";
    } 
    else {
      orderCondition = [[Produit,"pro_libelle", "DESC"]];
      choix = "Choisir";
    }

try {
  const allproducts = await Produit.findAll();
  const nouveauProduits = await Apply.findAll({
    //  offset: start,
    //  limit: PAGINATION_LIMIT,
    //  order: orderCondition,
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

  const ProduitEnPromos = await Apply.findAll({
    offset: start,
    limit: PAGINATION_LIMIT,
    order: orderCondition,
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

  // res.json(nbrPages);
  res.render("promotion/index", {
    produits: ProduitEnPromos,
    nouveauProduits,
    nbrProduit: nouveauProduits.length,
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
  Logger.error("/promotion : " + error.stack);

  
}
});
module.exports = router;

 