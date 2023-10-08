var express = require("express");
var router = express.Router();
const { Autre_frais } = require("../models");
const { Op } = require("sequelize");
const Logger = require("../helpers/Logger");

router.get("/", async (req, res) => {
  try {
    const autreFrais = await Autre_frais.findOne({
      where: {
        auf_libelle: "Application fees",
        auf_actif: true,
      },
    });
    return res.json(autreFrais);
  } catch (error) {
    Logger.error(+error.stack);
  }
});

module.exports = router;
