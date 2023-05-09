const express = require("express");
const router = express.Router();
const { Op, STRING } = require("sequelize");
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
            "prm_actif"
          ],
        },
      ],
    });
    res.render("apply/index", { applies });
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
    const oldApply = await Apply.findOne({
      where: { [Op.and]: [{ pro_id, prm_id }] },
    });
    if (oldApply) {
      const errorMsg = "cette promo est déjà appliquée à ce produit";
      return res.render("apply/add", { promos, errorMsg });
    }
    await Apply.create({ pro_id, prm_id });
    const succesMsg = "la promo a été ajoutée au produit";

    return res.render("apply/add", { promos, succesMsg });
  } catch (error) {
    res.status(500).render("apply/add", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.post("/delete", async (req, res) => {
  const app_id = req.body.app_id;
  try {
    await Apply.destroy({ where: { app_id } });
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
    const succesMsg = "Promo sur le produit supprimé avec succès";
    res.render("apply/index", { applies, succesMsg });
  } catch (error) {
    res.status(500).render("apply/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.get("/update", async (req, res) => {
  const app_id = req.query.app_id;
  try {
    const promos = await Apply.findOne({
      include: [
        {
          model: Produit,
          attributes: ["pro_libelle"],
        },
        {
          model: Promo,
          attributes: ["prm_id", "prm_code"],
        },
      ],
      where: { app_id },
    });
    const allPromos = await Promo.findAll();
    res.render("apply/update", { promos, allPromos });
  } catch (error) {
    res.status(500).render("apply/update", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.post("/update", async (req, res) => {
  const { prm_id, app_id, prod_id } = req.body;
  try {
    const allPromos = await Promo.findAll();
    if (prm_id == "Choisir la promo") {
      const promos = await Apply.findOne({
        include: [
          {
            model: Produit,
            attributes: ["pro_libelle"],
          },
          {
            model: Promo,
            attributes: ["prm_id", "prm_code"],
          },
        ],
        where: { app_id },
      });
      const errorMsg = "veillez renseigner la promo";

      return res.render("apply/update", { allPromos, promos, errorMsg });
    }
    const newApply = await Apply.update(
      {
        prm_id,
        pro_id: prod_id,
      },
      { where: { app_id } }
    );
    const promos = await Apply.findOne({
      include: [
        {
          model: Produit,
          attributes: ["pro_libelle"],
        },
        {
          model: Promo,
          attributes: ["prm_id", "prm_code"],
        },
      ],
      where: { app_id },
    });

    if (newApply[0] == 1) {
      const succesMsg = "la promo a été mise à jour avec succès";
      return res.render("apply/update", { allPromos, promos, succesMsg });
    }
    const nothingMsg = "aucune nouvelle information trouvée ";
    res.render("apply/update", { promos, allPromos, nothingMsg });
  } catch (error) {
    res.status(500).render("apply/update", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
    console.log(error);
  }
});

module.exports = router;
