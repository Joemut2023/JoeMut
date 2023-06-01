var express = require("express");
var router = express.Router();
const { Autre_frais } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const autreFrais = await Autre_frais.findOne({
      where: {
        auf_libelle: "Frais de dossier",
        auf_actif: true,
      },
    });
    return res.json(autreFrais);
  } catch (error) {
    Logger.error(+error.stack);
  }
});

module.exports = router;
