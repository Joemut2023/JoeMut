const express = require("express");
const router = express.Router();
const { Produit, Quantite, Tarif, Media, Categorie } = require("../../models");
const { PAGINATION_LIMIT } = require("../../helpers/utils_const");

router.get("/", async (req, res) => {
  try {
    const produits = await Produit.findAll({
      limit: 5,
      include: [
        { model: Quantite, attributes: ["qua_nbre",] },
        { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
        { model: Media, attributes: ["med_ressource"] },
        { model: Categorie, attributes: ["cat_libelle"] },
      ],
    });

    // res.render("produits/index", {
    //   produits: produits,
    // });
     return res.status(200).send(produits);
  } catch (error) {
    res.status(500).render("article/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

module.exports = router;
