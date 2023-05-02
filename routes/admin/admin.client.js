const express = require("express");
const router = express.Router();
const { Client, Titre } = require("../../models");
router.get("/", async (req, res) => {
  try {
    const clients = await Client.findAll({
      include: [{ model: Titre, attributes: ["tit_libelle"] }],
    });
    res.render("client/index", { clients });
  } catch (error) {
    res.status(500).render("factures/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

module.exports = router;
