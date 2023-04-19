var express = require("express");
var router = express.Router();
const {
  Panier_detail,
  Produit,
  Client,
  Commande,
  Panier,
  Frais_port,
  Media,
  Tarif,
  Frais_supp,
  Autre_frais,
} = require("../models");

router.get("/", async (req, res, next) => {
  res.locals.titre = "confirmation_commande";

  try {
    const commandeId = req.session.commandeId;
    const userId = req.session.userId;
    let commande = await Commande.findByPk(commandeId, {
      include: [
        { model: Client, attributes: ["cli_mail"] },
        { model: Frais_port },
      ],
    });
    const panierDetails = await Panier_detail.findAll({
      include: [
        {
          model: Produit,
          include: [
            { model: Media, attributes: ["med_id", "med_ressource"] },
            { model: Tarif, attributes: ["tar_ttc"] },
          ],
        },
      ],
      where: {
        pan_id: commande.pan_id,
      },
    });
    console.log("========= panier Id ========")
    console.log(req.session.panierId)
    const produitsPopulaires = await Produit.findAll({
      limit: 16,
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ttc"] },
      ],
      where: {
        pro_en_avant: 1,
      },
    });

    let sous_total = 0;
    for (let index = 0; index < panierDetails.length; index++) {
      sous_total += panierDetails[index].pad_ttc * panierDetails[index].pad_qte
    }

    let total = sous_total + commande.Frais_port.frp_ttc + commande.com_frais
    // res.json({ panierDetails });
    return res.render("confirmationCommande/index", {
      panierDetails: panierDetails,
      commande: commande,
      sous_total: sous_total,
      produitsPopulaires: produitsPopulaires,
      total: total
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
