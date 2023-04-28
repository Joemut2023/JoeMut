const express = require("express");
const router = express.Router();
const { Produit, Quantite, Tarif, Media, Categorie } = require("../../models");
const { PAGINATION_LIMIT_ADMIN } = require("../../helpers/utils_const");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");

router.get("/", async (req, res) => {
  let quantiteOfEachProduct = [];
  let { page, start, end } = check_admin_paginate_value(req);
  try {
    // const url = { SITE_URL };
    // console.log(url, "site web");
    const produits = await Produit.findAll({
      offset: start,
      limit: PAGINATION_LIMIT_ADMIN,
      include: [
        { model: Quantite, attributes: ["qua_nbre"] },
        { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
        { model: Media, attributes: ["med_ressource"] },
        { model: Categorie, attributes: ["cat_libelle"] },
      ],
    });
    const allProduits = await Produit.findAll({
      include: [
        { model: Quantite, attributes: ["qua_nbre"] },
        { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
        { model: Media, attributes: ["med_ressource"] },
        { model: Categorie, attributes: ["cat_libelle"] },
      ],
    });
    for (let index = 0; index < allProduits.length; index++) {
      const quantiteInitial = await Quantite.sum("qua_nbre", {
        where: {
          pro_id: allProduits[index].pro_id,
        },
      });
      quantiteOfEachProduct.push({
        id: allProduits[index].pro_id,
        qty: quantiteInitial,
      });
    }

    let nbrPages = Math.ceil(allProduits.length / PAGINATION_LIMIT_ADMIN);
    res.render("produits/index", {
      produits: produits,
      quantiteOfEachProduct,
      nbrPages,
      pageActive: page,
      start,
      end,
      produitsNbr: allProduits.length,
    });
    // return res.status(200).json({ produits, quantiteOfEachProduct });
  } catch (error) {
    res.status(500).render("produits/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

module.exports = router;
