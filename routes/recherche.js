var express = require("express");
var router = express.Router();
var { Produit, Media, Tarif, Quantite,Promo,Apply } = require("../models");
const { Op } = require("sequelize");
const check_paginate_value = require("../helpers/check_paginate_value");
const { PAGINATION_LIMIT } = require("../helpers/utils_const");
const Logger = require("../helpers/Logger")

router.get("/", async (req, res, next) => {
  const { search, orderby } = req.query;
  
  var orderCondition;
  let choix;
  let quantiteOfEachProduct = [];

  let { page, start, end } = check_paginate_value(req);

  if (orderby === "AZ") {
    orderCondition = [["pro_libelle", "ASC"]];
    choix = "Nom, A à Z";
  } else if (orderby === "ZA") {
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
    const all_produits = await Produit.findAll({
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ttc"] },
      ],
      where: { pro_libelle: { [Op.substring]: search } },
      order: orderCondition,
    });

    const produits = await Produit.findAll({
      offset: start,
      limit: PAGINATION_LIMIT,
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ttc","tar_ht"] },
      ],
      where: { pro_libelle: { [Op.substring]: search } },
      order: orderCondition,
    });
    const applies = await Apply.findAll({
      include: [
        {
          model: Promo,
          attributes: [
            "prm_code",
            "prm_pourcent",
            "prm_valeur",
            "prm_debut",
            "prm_fin",
            "prm_actif",
          ],
        },
      ],
    });
    
    for (let index = 0; index < all_produits.length; index++) {
      const quantiteInitial = await Quantite.sum("qua_nbre", {
        where: {
          pro_id: all_produits[index].pro_id,
        },
      });
      quantiteOfEachProduct.push({
        id: all_produits[index].pro_id,
        qty: quantiteInitial,
      });
    }

    let nbrPages = Math.ceil(all_produits.length / PAGINATION_LIMIT);
    res.locals.titre = `recherche - ${search}`;
    res.render("recherche/index", {
      produits: produits,
      search: search,
      nbrPages,
      pageActive: page,
      start,
      end,
      choix: choix,
      orderby: orderby,
      produitsNbr: all_produits.length,
      quantiteOfEachProduct,
      applies
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
