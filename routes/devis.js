var express = require("express");
var router = express.Router();
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const get_commande_data = require("../helpers/get_commande_data");
const moment = require("moment");
const Logger = require("../helpers/Logger");
router.get("/:id", async (req, res, next) => {
  let { id } = req.params;
  get_commande_data(
    parseInt(id),
    async (
      commande,
      adresseLiv,
      adresseFac,
      panierDetails,
      essayage,
      modeLivraison,
      sous_total,
      taxe,
      totalTTC,
      totalHT,
      sous_totalCmd,
      produitsPopulaires,
      totalCmd
    ) => {

      try {
        let view = await ejs.renderFile(
          path.join(__dirname, "../mailTemplate/devis.ejs"),
          {
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
            essayage,
            moment,
          }
        );
        res.send(view);
      } catch (error) {
        Logger.error(error.stack);
        res.send('erreur page de rendu puppeter')
      }
    }
  );
});

module.exports = router;
