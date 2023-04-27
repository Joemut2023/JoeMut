const express = require("express");
const router = express.Router();
const { Produit, Quantite, Tarif, Media, Categorie } = require("../../models");
const { PAGINATION_LIMIT } = require("../../helpers/utils_const");

router.get("/", async (req, res) => {
  let quantiteOfEachProduct = [];
  try {
    const produits = await Produit.findAll({
      limit: 20,
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

    res.render("produits/index", {
      produits: produits,
      quantiteOfEachProduct: quantiteOfEachProduct,
    });
    // return res.status(200).json({ produits, quantiteOfEachProduct });
  } catch (error) {
    res.status(500).render("article/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

// post 
router.get("/add", (req, res) => {
  res.render("produits/ajoutProduit");
});

module.exports = router;
