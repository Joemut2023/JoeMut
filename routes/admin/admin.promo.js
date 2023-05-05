const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { Promo } = require("../../models");
const { PAGINATION_LIMIT_ADMIN } = require("../../helpers/utils_const");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");

router.get("/", async (req, res) => {
  try {
    const promos = await Promo.findAll();
    res.render("promo/index", { promos });
  } catch (error) {
    res.status(500).render("promo/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.get("/add", async (req, res) => {
  try {
    // const promos = await Promo.findAll();
    res.render("promo/add");
  } catch (error) {
    res.status(500).render("promo/add", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.post("/add", async (req, res) => {
  const { prm_code, prm_pourcent, prm_valeur, prm_debut, prm_fin, prm_actif } =
    req.body;
  try {
    const oldPromo = await Promo.findOne({ where: { prm_code } });
    if (oldPromo) {
      const errorMsg = "Cette promo existe déjà";
      return res.render("promo/add", {
        errorMsg,
      });
    }
    const promos = await Promo.create({
      prm_code,
      prm_pourcent,
      prm_valeur,
      prm_debut,
      prm_fin,
      prm_actif,
    });
    const succesMsg = "promo créée et enregistrée avec succès";
    res.render("promo/add", { succesMsg });
  } catch (error) {
    res.status(500).render("promo/add", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.post("/delete", async (req, res) => {
  const prm_id = req.body.prm_id;
  console.log(prm_id, "prm");
  try {
    await Promo.destroy({ where: { prm_id } });
    res.redirect("/admin/promo");
  } catch (error) {
    res.status(500).render("promo/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.get("/update", async (req, res) => {
  const prm_id = req.query.prm_id;
  try {
    const promos = await Promo.findOne({ where: { prm_id } });
    res.render("promo/update", { promos });
  } catch (error) {
    res.status(500).render("promo/update", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

module.exports = router;
