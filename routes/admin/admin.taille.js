const express = require("express");
const router = express.Router();
const { Taille } = require("../../models");
router.get("/", async (req, res) => {
  try {
    const tailles = await Taille.findAll();
    res.render("tailles/index", {
      tailles,
    });
    // return res.status(200).json({ produits, quantiteOfEachProduct });
  } catch (error) {
    res.status(500).render("article/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
    console.log(error);
  }
});

module.exports = router;
