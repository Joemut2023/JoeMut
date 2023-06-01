const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Transporteur } = require("../../models");
const Logger = require("../../helpers/Logger");
router.get("/", async (req, res) => {
  try {
    const transporteurs = await Transporteur.findAll();
    res.render("transporteur/index", { transporteurs });
  } catch (error) {
    Logger.error(+error.stack);
    res.status(500).render("transporteur/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.get("/add", async (req, res) => {
  try {
    res.render("transporteur/add");
  } catch (error) {
    Logger.error(+error.stack);
    res.status(500).render("transporteur/add", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.post("/add", async (req, res) => {
  const { trs_libelle } = req.body;
  try {
    const oldTransporteur = await Transporteur.findOne({
      where: { trs_libelle },
    });
    if (oldTransporteur) {
      const nothingMsg = "Le transporteur que vous voulez créer existe déjà";
      return res.render("transporteur/add", {
        nothingMsg,
      });
    }
    await Transporteur.create({
      trs_libelle,
    });
    const succesMsg = "Nouveau transporteur ajouté avec succès";
    res.render("transporteur/add", {
      succesMsg,
    });
  } catch (error) {
    Logger.error(+error.stack);
    res.status(500).render("transporteur/add", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.get("/update", async (req, res) => {
  const { trs_id } = req.query;
  try {
    const transporteurs = await Transporteur.findOne({
      where: { trs_id },
    });

    res.render("transporteur/update", {
      transporteurs,
    });
  } catch (error) {
    Logger.error(+error.stack);
    res.status(500).render("transporteur/update", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.post("/update", async (req, res) => {
  const { trs_libelle, trs_id } = req.body;
  try {
    const newTransporteur = await Transporteur.update(
      {
        trs_libelle,
      },
      { where: { trs_id } }
    );
    const transporteurs = await Transporteur.findOne({
      where: { trs_id },
    });
    if (newTransporteur[0] == 1) {
      const succesMsg =
        "les informations sur le transporteur mises à jour succès";
      return res.render("transporteur/update", {
        succesMsg,
        transporteurs,
      });
    }
    const nothingMsg = "Aucune nouvelle information trouvée";
    return res.render("transporteur/update", {
      nothingMsg,
      transporteurs,
    });
  } catch (error) {
    Logger.error(+error.stack);
    res.status(500).render("transporteur/update", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.post("/delete", async (req, res) => {
  const { trs_id } = req.body;
  try {
    await Transporteur.destroy({
      where: { trs_id },
    });
    const transporteurs = await Transporteur.findAll();
    const succesMsg = "Transporteur supprimé avec succès";
    res.render("transporteur/index", {
      succesMsg,
      transporteurs,
    });
  } catch (error) {
    Logger.error(+error.stack);
    res.status(500).render("transporteur/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.get("/search", async (req, res) => {
  const { trs_libelle } = req.query;
  try {
    const transporteurs = await Transporteur.findAll({
      where: { trs_libelle: { [Op.like]: `%${trs_libelle}` } },
    });

    res.render("transporteur/index", {
      transporteurs,
    });
  } catch (error) {
    Logger.error(+error.stack);
    res.status(500).render("transporteur/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
module.exports = router;
