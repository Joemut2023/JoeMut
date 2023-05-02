const express = require("express");
const router = express.Router();
const { Adresse } = require("../../models");
router.get("/", async (req, res) => {
  try {
    const adresses = await Adresse.findAll();
    res.render("adresses/index", { adresses });
  } catch (error) {
    res.status(500).render("factures/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

module.exports = router;
