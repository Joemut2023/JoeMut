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
  Autre_frais
} = require("../models");

router.get("/", async (req, res, next) => {
  res.locals.titre = "confirmation_commande";

  try {
    const commandeId = req.session.commandeId;
    const userId = req.session.userId

    const commande = await Commande.findOne({
      include: [
        { model: Client, attributes: ["cli_mail"] },
        { model: Frais_port,attributes:["frp_id","frp_libelle"] },
      ],
      where: {
        cli_id: userId,
      },
    });
    const panierDetails = await Panier_detail.findAll({
      include:[
        {model:Produit, include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ttc"] },
      ],}
      ],
      where: {
        pan_id: req.session.panierId
      },
    });

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

    // const frais_suppl = await Frais_supp.findAll({
    //   include:[
    //     {model:Autre_frais}
    //   ],
    //   where:{
    //     com_id:commandeId
    //   }
    // })
    // res.json(frais_suppl)
    let sous_total = 0
    for (let index = 0; index < panierDetails.length; index++) {
      sous_total += panierDetails[index].pad_ttc * panierDetails[index].pad_qte
    }
    // res.json({ sous_total });
     res.render("confirmationCommande/index", {
       panierDetails: panierDetails,
       commande: commande,
       sous_total: sous_total,
       produitsPopulaires: produitsPopulaires,
     });
  } catch (error) {
    
  }

});

module.exports = router;
