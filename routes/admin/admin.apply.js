const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Promo, Apply, Produit, Media } = require("../../models");

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
    res.render("apply/add", { promos, produits });
  } catch (error) {
    res.status(500).render("apply/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.post("/add", async (req, res) => {
  const { pro_id, prm_id } = req.body;
  try {
    const promos = await Promo.findAll();
    const produits = await Produit.findAll();
    const oldApply = await Apply.findOne({
      where: { [Op.and]: [{ pro_id, prm_id }] },
    });
    if (oldApply) {
      const errorMsg = "cette promo est déjà appliquée à ce produit";
      return res.render("apply/add", { promos, produits, errorMsg });
    }
    await Apply.create({ pro_id, prm_id });
    const succesMsg = "la promo a été ajoutée au produit";

    return res.render("apply/add", { promos, produits, succesMsg });
  } catch (error) {
    res.status(500).render("apply/add", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
    console.log(error);
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
  const app_id = req.query.app_id;
  console.log(req.query);
  try {
    const promos = await Apply.findOne({ where: { app_id } });
    res.render("apply/update", { promos });
  } catch (error) {
    res.status(500).render("apply/update", {
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
