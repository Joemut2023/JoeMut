const express = require("express");
const router = express.Router();
const { Promo, Apply, Panier_detail } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const { prm_code } = req.body;
  //   const pan_id = req.session.panierId;
  const pan_id = 3;
  try {
    const codePromo = await Promo.findOne({ where: { prm_code } });
    if (!codePromo) {
      return res.status(400).send("le code promo renseigné n'existe pas");
    }
    if (codePromo.prm_commande) {
      return res
        .status(400)
        .send("Ce code promo  renseigné ne concerne que les commandes");
    }
    const todayDate = new Date().toISOString().substring(0, 10);
    if (todayDate < codePromo.prm_debut) {
      return res
        .status(400)
        .send("le code promo renseigné n'est pas encore actif");
    }
    if (todayDate > codePromo.prm_fin) {
      return res.status(400).send("le code promo renseigné n'est plus active");
    }
    if (!codePromo.prm_actif) {
      return res.status(400).send("le code promo renseigné n'est pas actif");
    }

    const apply = await Apply.findOne({ where: { prm_id: codePromo.prm_id } });
    if (!apply)
      return res
        .status(400)
        .send(
          "le code promo renseigné n'est pas encore applicable sur les produits"
        );

    const panierDetail = await Panier_detail.findOne({
      where: { [Op.and]: [{ pro_id: apply.pro_id }, { pan_id }] },
    });

    if (!panierDetail)
      return res
        .status(400)
        .send(
          "le code promo renseigné n'est applicable sur aucun produit se trouvant sur votre panier"
        );
    let pad_remise = 0;
    if (codePromo.prm_pourcent) {
      pad_remise =
        panierDetail.pad_ht *
        panierDetail.pad_qte *
        (codePromo.prm_pourcent / 100);
    } else {
      pad_remise = codePromo.prm_valeur;
    }

    pad_remise = panierDetail.pad_remise
      ? panierDetail.pad_remise + pad_remise
      : pad_remise;

    const newPanierDetail = await Panier_detail.update(
      { pad_remise },
      { where: { pad_id: panierDetail.pad_id } }
    );

    console.log(newPanierDetail[0]);

    if (newPanierDetail[0] == 1) {
      return res.json({ codePromo, apply, panierDetail });
    }

    return res.json("data");

    // return res.json({ codePromo, apply, panierDetail });
  } catch (error) {}
});

module.exports = router;
