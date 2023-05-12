const express = require("express");
const router = express.Router();
const { Transporteur } = require("../../models");
router.get("/", async (req, res) => {
  try {
    const transporteurs = await Transporteur.findAll();
    res.render("transporteur/index", { transporteurs });
  } catch (error) {
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
    res.status(500).render("transporteur/add", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.post("/add", async (req, res) => {
  const { trs_libelle } = req.body;
  try {
    await Transporteur.create({
      trs_libelle,
    });
    res.render("transporteur/add", {
      notify: "Transporteur ajouté",
    });
  } catch (error) {
    res.status(500).render("transporteur/add", {
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
    res.status(500).render("transporteur/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
module.exports = router;
