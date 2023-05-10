const express = require("express");
const router = express.Router();
const {
  Produit,
  Quantite,
  Tarif,
  Media,
  Categorie,
  Taille,
  Type_categorie,
} = require("../../models");
const { PAGINATION_LIMIT_ADMIN } = require("../../helpers/utils_const");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");

router.get("/", async (req, res) => {
  let quantiteOfEachProduct = [];
  let { page, start, end } = check_admin_paginate_value(req);
  try {
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

router.get("/add/tailles", async (req, res) => {
  try {
    const taille = await Taille.findAll();
    console.log("trgo");
    res.status(200).json(taille);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/categorie/:id", async (req, res) => {
  try {
    const categorie = await Categorie.findAll({
      where: { tyc_id: req.params.id },
    });
    res.json(categorie);
  } catch (error) {
    console.log(error.message);
  }
});
//render for create
router.get("/add", async (req, res) => {
  try {
    const typeCategorie = await Type_categorie.findAll();
    const taille = await Taille.findAll();

    // return res.json({ taille });

    res.render("produits/ajoutProduit", {
      typeCategorie,
      taille,
    });
  } catch (error) {}
});

router.post("/", async (req, res) => {
  const {
    cat_id,
    pro_ref,
    pro_libelle,
    pro_description,
    pro_details,
    pro_new_collect,
    pro_en_avant,
    pro_comment,
    pro_statut,
  } = req.body;

  try {
    const product = await Produit.create({
      cat_id,
      pro_ref,
      pro_libelle,
      pro_description,
      pro_details,
      pro_new_collect,
      pro_en_avant,
      pro_comment,
      pro_statut,
    });
    return res.status(201).json({ product });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/media/:id", async function (req, res) {
  const { med_libelle, med_ressource } = req.body;
  try {
    const produit = await Produit.findOne({ where: { pro_id: req.params.id } });

    const media = await Media.create({
      pro_id: produit.pro_id,
      tym_id: 1,
      med_libelle,
      med_ressource,
      mimetype: "image/jpeg",
    });

    return res.status(201).json(media);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/tarif/:id", async function (req, res) {
  const { tar_ht, tar_ttc } = req.body;
  try {
    const produit = await Produit.findOne({ where: { pro_id: req.params.id } });

    const tarif = await Tarif.create({
      pro_id: produit.pro_id,
      tar_debut: new Date(new Date().setDate(new Date().getDate())),
      tar_fin: null,
      tar_ht,
      tar_ttc,
      tar_statut: 1,
    });

    return res.status(201).json(tarif);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/qty/:id", async function (req, res) {
  const { qua_nbre, tai_id } = req.body;
  try {
    const produit = await Produit.findOne({ where: { pro_id: req.params.id } });

    const qty = await Quantite.create({
      pro_id: produit.pro_id,
      tai_id,
      qua_nbre,
    });

    return res.status(201).json(qty);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/allbyJson", async (req, res) => {
  try {
    let produits = await Produit.findAll();
    if (produits && produits.length > 0) {
      return res.json(produits);
    } else {
      return res.json([]);
    }
  } catch (error) {
    return res.json(error);
  }
});

//render for editting
router.get("/:id", async function (req, res) {
  try {
    const media = await Media.findAll({ where: { pro_id: req.params.id } });
    const produit = await Produit.findOne({
      where: { pro_id: req.params.id },
      include: [
        {
          model: Tarif,
        },
        {
          model: Quantite,
          include: [
            {
              model: Taille,
            },
          ],
        },
        {
          model: Categorie,
          include: [
            {
              model: Type_categorie,
            },
          ],
        },
      ],
    });
    //qty initial
    const quantiteInitial = await Quantite.sum("qua_nbre", {
      where: {
        pro_id: req.params.id,
      },
    });
    const typeCategories = await Type_categorie.findAll();
    const categories = await Categorie.findAll({
      where: { tyc_id: produit.Categorie.Type_categorie.tyc_id },
    });
    const tailles = await Taille.findAll();

    // res.json(produit.pro_new_collect);
    res.render("produits/editProduit", {
      media,
      produit,
      quantiteInitial,
      typeCategories,
      categories,
      tailles,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
