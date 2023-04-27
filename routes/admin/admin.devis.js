const express = require("express");
const router = express.Router();
const {
  Commande,
  Panier,
  Panier_detail,
  Client,
  Tarif,
  Frais_port,
  Essayage,
  Sequelize,
  Adresse
} = require("../../models/");
const moment = require("moment");

router.get("/", async (req, res) => {
  try {
    let commandes_data = [];
    let commandes = await Commande.findAll({
      attributes: [
        "com_id",
        "com_date",
        "com_debut_spectacle",
        "com_fin_spectacle",
        "pan_id",
        "frp_id",
        "com_adr_liv",
        "com_adr_fac",
        [
          Sequelize.fn("SUM", Sequelize.col("Panier.Panier_details.pad_ttc")),
          "total_pad_ttc",
        ],
      ],
      include: [
        { model: Client, attributes: ["cli_mail", "cli_nom", "cli_prenom"] },
        { model: Frais_port },
        //  { model: Essayage },
        {
          model: Panier,
          attributes: ["pan_id"],
          include: [
            {
              model: Panier_detail,
              attributes: [],
            },
          ],
        },
      ],
      group: ["Commande.com_id"],
    });
    for (let commande of commandes) {
      let paniers = await Panier.findOne({
        where: { pan_id: commande.pan_id },
        include: {
          model: Panier_detail,
        },
      });
      let essayages = await Essayage.findAll({
        where: {
          com_id: commande.com_id,
        },
      });
      let adress_liv = await Adresse.findOne({
        where:{
          adr_id:commande.com_adr_liv
        }
      })
      //console.log(essayages);
      commandes_data.push({ commande, ...paniers, essayage: essayages,adresseLivraison:adress_liv });
    }

    console.log(commandes_data[0].adresseLivraison.adr_societe);
    res.render("devis/index", {
      commandes: commandes_data,
      moment,
    });
  } catch (error) {
    console.log(error);
    return res.send("erreur");
  }
});

module.exports = router;
