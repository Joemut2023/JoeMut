const express = require("express");
const router = express.Router();
var multer = require("multer");
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
const { Op, Sequelize } = require("sequelize");
const path = require('path');

router.get("/", async (req, res) => {
  const { search } = req.query;
  let quantiteOfEachProduct = [];
  let { page, start, end } = check_admin_paginate_value(req);
  let checkSearch = false

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

    const categorie = await Categorie.findAll();
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
      categorie,
      produitsNbr: allProduits.length,
      checkSearch,
    });
    // return res.status(200).json({ produits, quantiteOfEachProduct });
  } catch (error) {
    res.status(500).render("produits/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

//RESEARCH
router.get("/search", async (req, res) => {
  const { libelle, ref, cat, tarHtUp, tarHtDown, qtyUp, qtydDown } = req.query;
  let catWhere;
  let quantiteOfEachProduct = [];
  let { page, start, end } = check_admin_paginate_value(req);
  let checkSearch = true;
  
  try {
    const allProduits = await Produit.findAll({
      include: [
        { model: Quantite, attributes: ["qua_nbre"] },
        {
          model: Tarif,
          attributes: ["tar_ht", "tar_ttc"],
          required: true,
          where: {
            tar_ht: {
              [Op.between]: [
                tarHtUp ? parseFloat(tarHtUp) : 1,
                tarHtDown ? parseFloat(tarHtDown) : 100,
              ],
            },
          },
        },
        { model: Media, attributes: ["med_ressource"] },
        {
          model: Categorie,
          required: true,
          where: {
            cat_libelle: { [Op.like]: `${cat}%` },
          },
        },
      ],
      where: {
        [Op.or]: [
          { pro_ref: { [Op.like]: `${ref !== "" ? ref : libelle}%` } },
          { pro_libelle: { [Op.like]: `${libelle !== "" ? libelle : ref}%` } },
        ],
      },
      attributes: {
        required: false,
        include: [
          [
            Sequelize.literal(`(
              SELECT SUM(qua_nbre)
              FROM Quantites as quantite
              WHERE 
                Produit.pro_id = quantite.pro_id
            )`),
            "total_qté",
          ],
        ],
      },
      having: {
        ["total_qté"]: {
          [Op.between]: [
            ` ${qtyUp ? parseInt(qtyUp) : 1}`,
            `${qtydDown ? parseInt(qtydDown) : 1000}`,
          ],
        },
      },
    });

    // console.log("============ ", tarHtUp)
    // return res.json({ data: allProduits });

    const produits = await Produit.findAll({
      offset: start,
      limit: PAGINATION_LIMIT_ADMIN,
      include: [
        { model: Quantite, attributes: ["qua_nbre"] },
        {
          model: Tarif,
          attributes: ["tar_ht", "tar_ttc"],
          required: true,
          where: {
            tar_ht: {
              [Op.between]: [
                tarHtUp ? parseFloat(tarHtUp) : 1,
                tarHtDown ? parseFloat(tarHtDown) : 100,
              ],
            },
          },
        },
        { model: Media, attributes: ["med_ressource"] },
        {
          model: Categorie,
          attributes: ["cat_libelle"],
          required: true,
          where: {
            cat_libelle: { [Op.like]: `${cat}%` },
          },
        },
      ],
      where: {
        [Op.or]: [
          { pro_ref: { [Op.like]: `${ref !== "" ? ref : libelle}%` } },
          { pro_libelle: { [Op.like]: `${libelle !== "" ? libelle : ref}%` } },
        ],
      },
      attributes: {
        required: false,
        include: [
          [
            Sequelize.literal(`(
              SELECT SUM(qua_nbre)
              FROM Quantites as quantite
              WHERE 
                Produit.pro_id = quantite.pro_id
            )`),
            "total_qté",
          ],
        ],
      },
      having: {
        ["total_qté"]: {
          [Op.between]: [
            ` ${qtyUp ? parseInt(qtyUp) : 1}`,
            `${qtydDown ? parseInt(qtydDown) : 1000}`,
          ],
        },
      },
    });

    const categorie = await Categorie.findAll();
   
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
    console.log(nbrPages);
    res.render("produits/index", {
      // produits: produits,
      quantiteOfEachProduct,
      nbrPages,
      pageActive: page,
      start,
      end,
      produitsNbr: allProduits.length,
      produits,
      categorie,
      libelle,
      ref,
      cat,
      tarHtUp,
      tarHtDown,
      qtyUp,
      qtydDown,
      checkSearch,
      // categorie,
    });
  } catch (error) {
    console.log(error);
    res.status(500).render("produits/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

//delete product
router.delete("/:id", async function (req, res) {
  const pro_id = req.params.id;
  try {
    const produit = await Produit.destroy({ where: { pro_id } });
    res.status(200).json({ produit, msg: true });
  } catch (error) {
    console.log(error.message);
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

// create categorie
router.post("/categorie", async function (req, res) {
  const { cat_libelle, tyc_id } = req.body;
  try {
    let msg;
    const oldCat = await Categorie.findOne({
      where: { cat_libelle: cat_libelle },
    });
    if (oldCat) {
      return res.json({ msg: false });
    }
    const categorie = await Categorie.create({
      tyc_id: tyc_id,
      cat_libelle: cat_libelle,
    });
    res.status(201).json({ msg: true, categorie });
  } catch (error) {
    console.log(error.message);
  }
});

//render for create
router.get("/add", async (req, res) => {
  try {
    const typeCategorie = await Type_categorie.findAll();
    const taille = await Taille.findAll();
    const categories = await Categorie.findAll({ where: { tyc_id: 1 } });

    // return res.json({ taille });

    res.render("produits/ajoutProduit", {
      typeCategorie,
      taille,
      categories,
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
    return res.status(201).json({ product, msg: true });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/media/:id", async function (req, res) {
  const { med_libelle, med_ressource,med_cover } = req.body;
  try {
    const produit = await Produit.findOne({ where: { pro_id: req.params.id } });

    const media = await Media.create({
      pro_id: produit.pro_id,
      tym_id: 1,
      med_libelle,
      med_ressource,
      med_cover,
      mimetype: "image/jpeg",
    });

    return res.status(201).json({ media, msgMedia: true });
  } catch (error) {
    console.log(error.message);
  }
});
//udpate cover image
router.put("/media/:pro_id/:med_id", async function (req, res) {
  const { med_libelle, med_ressource} = req.body;
  try {
    const produit = await Produit.findOne({
      where: { pro_id: req.params.pro_id },
    });

    const media = await Media.update(
      {
        pro_id: produit.pro_id,
        tym_id: 1,
        med_libelle,
        med_ressource,
        med_cover:true,
        mimetype: "image/jpeg",
      },
      {
        where: {
          [Op.and]: [
            { pro_id: produit.pro_id },
            { med_id: req.params.med_id }
          ],
        },
      }
    );

    return res.status(201).json({ media, msgMedia: true });
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

    return res.status(201).json({ tarif, msgTarif: true });
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

    return res.status(201).json({ qty, msgQty: true });
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

router.get("/one/:id", async function (req, res) {
  try {
    const produit = await Produit.findOne({ where: { pro_id: req.params.id } });
    res.status(200).json(produit);
  } catch (error) {}
});

router.put("/:id", async (req, res) => {
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
    const product = await Produit.update(
      {
        cat_id,
        pro_ref,
        pro_libelle,
        pro_description,
        pro_details,
        pro_new_collect,
        pro_en_avant,
        pro_comment,
        pro_statut,
      },
      { where: { pro_id: req.params.id } }
    );
    return res.status(200).json({ product });
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/tarif/:id", async function (req, res) {
  const { tar_ht, tar_ttc } = req.body;
  try {
    const produit = await Produit.findOne({ where: { pro_id: req.params.id } });

    const tarif = await Tarif.create(
      {
        tar_debut: new Date(new Date().setDate(new Date().getDate())),
        tar_fin: null,
        tar_ht,
        tar_ttc,
        tar_statut: 1,
      },
      { where: { pro_id: produit.pro_id } }
    );

    return res.status(200).json({ tarif, msgTarif: true });
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/qty/:id", async function (req, res) {
  const { qua_nbre, tai_id } = req.body;
  try {
    const produit = await Produit.findOne({ where: { pro_id: req.params.id } });
    const taille = await Taille.findOne({ where: { tai_id } });

    const qty = await Quantite.update(
      {
        qua_nbre,
      },
      {
        where: {
          [Op.and]: [{ pro_id: produit.pro_id }, { tai_id: taille.tai_id }],
        },
      }
    );

    return res.status(200).json(qty);
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/qty/:pro_id/:id", async function (req, res) {
  try {
    const qty = await Quantite.destroy({
      where: {
        [Op.and]: [{ qua_id: req.params.id }, { pro_id: req.params.pro_id }],
      },
    });
    res.status(200).json(qty);
  } catch (error) {
    console.log(error);
  }
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images/produits"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname
        .replaceAll(/\s/g, "")
        .replaceAll(/\d/g, "")
        .replaceAll(/[~`!@#$%^&*()+={}\[\];:\'\"<>,\/\\\?_]/g, "")
    );
  },
});

var upload = multer({ storage });
const upload_function = upload.array("produit-files",12)
//uplad-image
router.post("/upload-images",function (req, res, next) {
  
  upload_function(req,res,(err)=>{
    var msg;
    if (err) {
      req.session.flash = {message:"Une erreur s'est produite.",type:"danger"};
      // return res.redirect('/admin/produits/add');
    }
    req.session.flash = {message:"Produit ajouté avec succès",type:"success"};
    // return res.redirect('/admin/produits/add');
  });
  //return res.json(req.body);
    //  console.log(JSON.stringify(req.files))
  }
);

module.exports = router;
