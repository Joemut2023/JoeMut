const express = require("express");
const router = express.Router();
const { Promo, Apply, Panier_detail } = require("../models");

router.get("/", async (req, res) => {
  const { prm_code } = req.body;
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
      where: { pro_id: apply.pro_id },
    });
    if (!panierDetail)
      return res
        .status(400)
        .send(
          "le code promo renseigné n'est applicable sur aucun produit se trouvant sur votre panier"
        );
    return res.json({ codePromo, apply, panierDetail });
  } catch (error) {}
});

module.exports = router;
