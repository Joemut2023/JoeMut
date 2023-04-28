const express = require("express");
const router = express.Router();
const { Facture } = require("../../models");
router.get("/", async (req, res) => {
  try {
    res.render("factures/index", {});
  } catch (error) {
    res.status(500).render("factures/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

module.exports = router;
