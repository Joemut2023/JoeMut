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
    console.log("trgo")
    res.status(200).json(taille);
  } catch (error) {
    console.log(error.message)
  }
});

router.get("/categorie/:id", async(req, res)=>{
  try {
    const categorie = await Categorie.findAll({where:{tyc_id:req.params.id}})
    res.json(categorie)
  } catch (error) {
    console.log(error.message);
  }
})
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

router.post('/',async (req,res) =>{

  const {cat_id,pro_ref,pro_libelle,pro_description,pro_details,pro_new_collect,pro_en_avant,pro_comment,pro_statut} = req.body

  try {
    const oldProduct = await Produit.findOne({where:{pro_ref}})
    if(oldProduct) return res.status(409).send("produit existe déjà")
    
  } catch (error) {
    console.log(error.message);
  }
})










//render for editting
router.get("/:id", async function (req, res) {
  res.render("produits/editProduit");
});

module.exports = router;
