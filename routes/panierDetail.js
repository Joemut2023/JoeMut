var express = require("express");
var router = express.Router();
const { Op, and } = require("sequelize");
const {
  Panier_detail,
  Apply,
  Media,
  Tarif,
  Promo,
  Quantite,
  Produit,
} = require("../models");

router.post("/", async (req, res, next) => {
  const { pro_id, pad_qte } = req.body;
  // const pan_id = 1;

  const pan_id = req.session.panierId;
  try {
    const oldPanierDetail = await Panier_detail.findOne({
      where: {
        [Op.and]: [{ pro_id }, { pan_id }],
      },
    });

    const quantite = await Quantite.findOne({ where: { pro_id } });
    if (oldPanierDetail == null) {
      const promo = await Apply.findOne({
        where: { pro_id },
        include: [
          {
            model: Promo,
            attributes: ["prm_pourcent"],
            where: { prm_actif: true },
          },
        ],
      });
      let prm_id = promo ? promo.prm_id : null;
      let pad_remise = promo ? promo.Promo.prm_pourcent : null;
      const tarif = await Tarif.findOne({ where: { pro_id } });
      let tar_id = tarif.tar_id;
      let pad_ht = tarif.tar_ht;
      let pad_ttc = tarif.tar_ttc;
      const panierDetail = await Panier_detail.create({
        pro_id,
        tar_id,
        prm_id,
        pan_id,
        pad_qte,
        pad_ht,
        pad_ttc,
        pad_remise,
      });
      return res.status(201).json({ panierDetail });
    }

    const newQuantite = oldPanierDetail.pad_qte + pad_qte;

    if (quantite !== null) {
      let quantiteDispo = quantite.qua_nbre;
      if (newQuantite > quantiteDispo) {
        return res
          .status(409)
          .send(
            `Vous avez déjà commandé la quantité disponible pour cet article`
          );
      }
    }

    const panierDetail = await Panier_detail.update(
      {
        pad_qte: newQuantite,
      },
      { where: { pad_id: oldPanierDetail.pad_id } }
    );

    if (panierDetail[0] == 1) {
      const newPanierDetail = await Panier_detail.findOne({
        where: {
          [Op.and]: [{ pro_id }, { pan_id }],
        },
      });
      return res.status(200).json({ newPanierDetail: newPanierDetail });
    }

    return res.status(404).send("aucun produit ajouté");
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res, next) => {
  const pan_id = req.session.panierId;

  try {
    const Produits = await Panier_detail.findAll({
      include: [
        { 
          model: Produit,
          attributes: ["pro_ref", "pro_libelle"],
          include: [{ model: Media, attributes: ["med_id", "med_ressource"] }],
        },
      ],
      where: { pan_id },
    });

   return res.status(200).send(Produits);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.delete("/", async (req, res) => {
  const { pro_id } = req.body;
  const pan_id = req.session.panierId;

  try {
    const oldPanierDetail = await Panier_detail.findAll({
      where: {
        [Op.and]: [{ pro_id }, { pan_id }],
      },
    });

    console.log(oldPanierDetail, "request");

    const panierDelete = await Panier_detail.destroy({
      where: {
        pad_id: oldPanierDetail.pad_id,
      },
    });

    if (panierDelete == 1) {
      return res
        .status(200)
        .send("produit supprimé dans le panier avec succès");
    }
    return res.status(202).send("Aucun produit supprimé");
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
