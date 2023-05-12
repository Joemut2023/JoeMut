const express = require("express");
const router = express.Router();
const { Taille } = require("../../models");
const { Op } = require("sequelize");
const { PAGINATION_LIMIT_ADMIN } = require("../../helpers/utils_const");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");

router.get("/", async (req, res) => {
  let { page, start, end } = check_admin_paginate_value(req);
  try {
    const Alltailles = await Taille.findAll();
    const tailles = await Taille.findAll({
      offset: start,
      limit: PAGINATION_LIMIT_ADMIN,
    });
    let nbrPages = Math.ceil(Alltailles.length / PAGINATION_LIMIT_ADMIN);
    res.render("tailles/index", {
      tailles,
      nbrPages,
      pageActive: page,
      start,
      end,
      taillesNbr: Alltailles.length,
    });
  } catch (error) {
    res.status(500).render("article/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

router.get("/add", async (req, res) => {
  try {
    res.render("tailles/add");
  } catch (error) {
    res.status(500).render("transporteur/add", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

router.post("/add", async (req, res) => {
  const { tai_libelle } = req.body;
  try {
    const oldTaille = await Taille.findOne({ where: { tai_libelle } });
    if (oldTaille) {
      const nothingMsg = "La taille que vous voulez créer existe déjà";
      return res.render("tailles/add", {
        nothingMsg,
      });
    }
    const allTailles = await Taille.findAll();
    const tai_ordre = allTailles[Object.keys(allTailles).pop()].tai_ordre;
    await Taille.create({
      tai_libelle,
      tai_ordre: tai_ordre + 1,
    });
    const succesMsg = "Nouvelle taille ajouté avec succès";
    res.render("tailles/add", {
      succesMsg,
    });
  } catch (error) {
    res.status(500).render("tailles/add", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

router.get("/update", async (req, res) => {
  const { tai_id } = req.query;
  try {
    const tailles = await Taille.findOne({
      where: { tai_id },
    });

    res.render("tailles/update", {
      tailles,
    });
  } catch (error) {
    res.status(500).render("tailles/update", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

router.post("/update", async (req, res) => {
  const { tai_libelle, tai_id } = req.body;
  try {
    const newTaille = await Taille.update(
      {
        tai_libelle,
      },
      { where: { tai_id } }
    );
    const tailles = await Taille.findOne({
      where: { tai_id },
    });
    if (newTaille[0] == 1) {
      const succesMsg = "les informations sur la taille mises à jour succès";
      return res.render("tailles/update", {
        succesMsg,
        tailles,
      });
    }
    const nothingMsg = "Aucune nouvelle information trouvée";
    return res.render("tailles/update", {
      nothingMsg,
      tailles,
    });
  } catch (error) {
    res.status(500).render("tailles/update", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

router.get("/search", async (req, res) => {
  const { tai_libelle } = req.query;
  let { page, start, end } = check_admin_paginate_value(req);
  try {
    const Alltailles = await Taille.findAll({
      where: { tai_libelle },
    });
    const tailles = await Taille.findAll({
      where: { tai_libelle: { [Op.substring]: tai_libelle } },
    });

    let nbrPages = Math.ceil(Alltailles.length / PAGINATION_LIMIT_ADMIN);
    res.render("tailles/index", {
      tailles,
      nbrPages,
      pageActive: page,
      start,
      end,
      taillesNbr: Alltailles.length,
    });
  } catch (error) {
    res.status(500).render("tailles/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
// router.post("/delete", async (req, res) => {
//   const { trs_id } = req.body;
//   try {
//     await Taille.destroy({
//       where: { trs_id },
//     });
//     const succesMsg = "Transporteur supprimé avec succès";
//     const Alltailles = await Taille.findAll();
//     const tailles = await Taille.findAll({
//       offset: start,
//       limit: PAGINATION_LIMIT_ADMIN,
//     });
//     let nbrPages = Math.ceil(Alltailles.length / PAGINATION_LIMIT_ADMIN);
//     res.render("tailles/index", {
//       tailles,
//       nbrPages,
//       pageActive: page,
//       start,
//       end,
//       taillesNbr: Alltailles.length,
//       succesMsg,
//     });
//   } catch (error) {
//     res.status(500).render("transporteur/index", {
//       error: true,
//       errorMsg: "une erreur est survenue ",
//     });
//   }
// });

module.exports = router;
