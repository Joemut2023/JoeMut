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

      //console.log(essayages);
      commandes_data.push({ commande, ...paniers, essayage: essayages });
    }

    console.log(commandes_data[0].commande.Frais_port.frp_libelle);
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
