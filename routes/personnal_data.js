const express = require('express');
const router = express.Router();
const {
  Client,
  Panier,
  Panier_detail,
  Produit,
  Adresse,
  Commande,
  Titre,
  Tarif,
  Quantite,
} = require("../models");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
router.get("/myInfo/:cli_id", async (req, res) => {
    const cli_id = req.params.cli_id;
  try {
    const client = await Client.findOne({
      include: [{ model: Adresse }, { model: Commande }, { model: Titre }],
      where: { cli_id: cli_id },
    });
    const panier = await Panier.findAll({
      include: [
        {
          model: Panier_detail,
          include: [{ model: Produit, attributes: ["pro_ref", "pro_libelle"],include:[{model:Tarif,attributes:["tar_ht"]},{model:Quantite,attributes:["qua_nbre"]}] }],
        },
      ],
      where: { cli_id: cli_id },
    });

    // res.json(panier);
    let view = await ejs.renderFile(
      path.join(__dirname, "../mailTemplate/user_info.ejs"),
      {
        client,
        panier,
      }
    );

    res.send(view);
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router