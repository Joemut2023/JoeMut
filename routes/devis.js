var express = require("express");
var router = express.Router();
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const get_commande_data = require("../helpers/get_commande_data");
const { log } = require("console");

<<<<<<< HEAD

router.get("/", (req, res, next) => {
    res.locals.titre = "devis";
    res.render("devis/index.ejs", {});
=======
router.get("/:id", async (req, res, next) => {
  let { id } = req.params;
  get_commande_data(parseInt(id), async (commande, adresseLiv, adresseFac, panierDetails,
    essayage,
    modeLivraison,
    sous_total,
    taxe,
    totalTTC,
    totalHT, sous_totalCmd, produitsPopulaires, totalCmd) => {
    let view = await ejs.renderFile(path.join(__dirname, "../mailTemplate/devis.ejs"), {
      panierDetails: panierDetails,
      commande,
      adresseLiv,
      adresseFac,
      sous_totalCmd: sous_totalCmd,
      produitsPopulaires: produitsPopulaires,
      totalCmd: totalCmd,
      sous_total,
      modeLivraison,
      taxe,
      totalHT,
      totalTTC,
      essayage
    });
    res.send(view)
  });
>>>>>>> develop
});

module.exports = router;
