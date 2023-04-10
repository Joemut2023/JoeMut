var express = require("express");
var router = express.Router();
const { Categorie, Type_categorie, Produit, Media , Tarif} = require("../models");

/**
 * @Route renvois tout
 */
router.get("/", async function (req, res, next) {
  try {
    res.locals.titre = "catalogue";
    const typee_categories = await Type_categorie.findAll();
    const categories = await Categorie.findAll();
    const allproducts = await Produit.findAll();
    const produits = await Produit.findAll({
      limit:8,
      order: [["pro_id", "DESC"]],
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
      ],
    });
    return res.render("catalogue/index", {
      title: "Express",
      categories: categories,
      typee_categories: typee_categories,
      produits: produits,
      allproducts:allproducts
    });
  } catch (error) {
    res.status(500).render("inscription/index", {
      error: true,
      errorMsg: "Une erreur est survenue!",
    });
  }
});
/**
 * @Route renvois la listes des produits pour une catégorie
 */
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const typee_categories = await Type_categorie.findAll();
    const categories = await Categorie.findAll();
    const categorie = await Categorie.findByPk(id);
    res.locals.titre = categorie.cat_libelle;
    return res.render("catalogue/bycategorie", {
      title: "Express",
      categories: categories,
      categorie: categorie,
      typee_categories: typee_categories,
    });
  } catch (error) {
    res.status(500).render("inscription/index", {
      error: true,
      errorMsg: "Une erreur est survenue!",
    });
  }
});
/**
 * @Route renvois la listes des produits pour un Type catégorie
 */
router.get("/type/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const type_categorie = await Type_categorie.findByPk(id, {
      include: { model: Categorie },
    });
    const categories = await Categorie.findAll();
    res.locals.titre = type_categorie.tyc_libelle;
    return res.render("catalogue/bytype", {
      title: "Express",
      categories: categories,
      type_categorie: type_categorie,
    });
  } catch (error) {
    res.status(500).render("inscription/index", {
      error: true,
      errorMsg: "Une erreur est survenue!",
    });
  }
});

module.exports = router;
