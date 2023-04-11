var express = require("express");
var router = express.Router();
const { Categorie, Type_categorie, Produit, Media , Tarif} = require("../models");

/**
 * @Route renvois tout
 */
router.get("/", async function (req, res, next) {
  let page = req.query.page ? parseInt(req.query.page):1;
  let limit = 100;
  let start = (page-1) * limit;
  let end = page * limit;
  try {
    res.locals.titre = "catalogue";
    const typee_categories = await Type_categorie.findAll();
    const categories = await Categorie.findAll();
    const allproducts = await Produit.findAll();
    const produits = await Produit.findAll({
      offset:start,
      limit:limit,
      order: [["pro_id", "DESC"]],
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
      ],
    });
    //let nbrProduits = await produits.length;
    let nbrPages = Math.ceil(allproducts.length/limit);
    return res.render("catalogue/index", {
      categories: categories,
      typee_categories: typee_categories,
      produits: produits,
      allproducts:allproducts,
      nbrPages:nbrPages,
      pageActive:page,
      start:start,
      end:end
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
    const categorie = await Categorie.findByPk(id, {
      include: {
        model: Produit,
        include: [
          { model: Media, attributes: ["med_id", "med_ressource"] },
          { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
        ],
      },
    });
    // res.json({categorie})
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
  var totalProductBycat = 0;
  try {
    const type_categorie = await Type_categorie.findByPk(id, {
      include: {
        model: Categorie,
        include: {
          model: Produit,
          include: [
            { model: Media, attributes: ["med_id", "med_ressource"] },
            { model: Tarif, attributes: ["tar_ht", "tar_ttc"] },
          ],
        },
      },
    });
    // res.json({data:type_categorie.Categories[0].Produits.length})
   
    type_categorie.Categories.forEach(categorie => {
       totalProductBycat = totalProductBycat + categorie.Produits.length
    });
    
    const categories = await Categorie.findAll();
    res.locals.titre = type_categorie.tyc_libelle;
    return res.render("catalogue/bytype", {
      title: "Express",
      categories: categories,
      type_categorie: type_categorie,
      totalProductBycat,
    });
  } catch (error) {
    res.status(500).render("inscription/index", {
      error: true,
      errorMsg: "Une erreur est survenue!",
    });
  }
});

module.exports = router;
