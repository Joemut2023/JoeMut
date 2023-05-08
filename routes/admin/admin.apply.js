const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { Promo, Apply, Produit, Media } = require("../../models");
const { PAGINATION_LIMIT_ADMIN } = require("../../helpers/utils_const");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");

router.get("/", async (req, res) => {
  try {
    const applies = await Apply.findAll({
      include: [
        {
          model: Produit,
          attributes: ["pro_libelle"],
          include: { model: Media, attributes: ["med_ressource"] },
        },
        {
          model: Promo,
          attributes: [
            "prm_code",
            "prm_pourcent",
            "prm_valeur",
            "prm_debut",
            "prm_fin",
          ],
        },
      ],
    });
    res.render("apply/index", { applies });
    // res.json(applies);
  } catch (error) {
    res.status(500).render("apply/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.get("/add", async (req, res) => {
  try {
    const promos = await Promo.findAll();
    const produits = await Produit.findAll();
    res.render("apply/add", {  promos,  produits });
  } catch (error) {
    res.status(500).render("apply/add", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.post("/add", async (req, res) => {
  const {
    prm_code,
    prm_pourcent,
    prm_valeur,
    prm_debut,
    prm_fin,
    prm_actif,
    prm_commande,
  } = req.body;

  try {
    if (prm_fin < prm_debut) {
      const errorMsg =
        "La création de la promo a échouée : la date du début de la promo doit être inférieure à la date de fin";
      return res.render("promo/add", { errorMsg });
    }
    const oldPromo = await Promo.findOne({ where: { prm_code } });
    if (oldPromo) {
      const errorMsg = "Cette promo existe déjà";
      return res.render("promo/add", {
        errorMsg,
      });
    }
    console.log(prm_commande, "pour une commande");
    await Promo.create({
      prm_code,
      prm_pourcent,
      prm_valeur,
      prm_debut,
      prm_fin,
      prm_actif,
      prm_commande,
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
  const app_id = req.body.app_id;
  try {
    await Apply.destroy({ where: { app_id } });
    res.redirect("/admin/apply");
  } catch (error) {
    res.status(500).render("apply/index", {
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
router.post("/update", async (req, res) => {
  const {
    prm_code,
    prm_pourcent,
    prm_valeur,
    prm_debut,
    prm_fin,
    prm_actif,
    prm_id,
    prm_commande,
  } = req.body;
  console.log(prm_commande, "commande");
  const statusUpdate = typeof prm_actif == "undefined" ? false : true;
  const prmCommande = typeof prm_commande == "undefined" ? false : true;
  try {
    if (prm_fin < prm_debut) {
      const promos = await Promo.findOne({ where: { prm_id } });
      const nothingMsg =
        "La création de la promo a échouée : la date du début de la promo doit être inférieure à la date de fin";
      return res.render("promo/update", { promos, nothingMsg });
    }
    const newPromos = await Promo.update(
      {
        prm_code,
        prm_pourcent,
        prm_valeur,
        prm_debut,
        prm_fin,
        prm_actif: statusUpdate,
        prm_commande: prmCommande,
      },
      { where: { prm_id } }
    );
    const promos = await Promo.findOne({ where: { prm_id } });
    if (newPromos[0] == 1) {
      const succesMsg = "la promo a été mise à jour avec succès";
      return res.render("promo/update", { promos, succesMsg });
    }
    const nothingMsg = "aucune nouvelle information trouvée ";
    res.render("promo/update", { promos, nothingMsg });
  } catch (error) {
    res.status(500).render("promo/update", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

module.exports = router;
