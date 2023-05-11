var express = require("express");
var router = express.Router();
const { Op, and, Sequelize } = require("sequelize");
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
  const pan_id = req.session.panierId;
  try {
    const oldPanierDetail = await Panier_detail.findOne({
      where: {
        [Op.and]: [{ pro_id }, { pan_id }],
      },
    });

    // const quantite = await Quantite.findAll({
    //   attributes: [
    //     "qua_nbre",
    //     "pro_id",
    //     [Sequelize.fn("SUM", Sequelize.col("qua_nbre")), "qteTotal"],
    //   ],
    //   where: { pro_id },
    // });

    const quantite = await Quantite.sum("qua_nbre", {
      where: { pro_id },
    });
    if (oldPanierDetail == null) {
      if (quantite) {
        if (pad_qte > quantite) {
          return res.status(200).send("indisponible");
        }
      }
      const tarif = await Tarif.findOne({ where: { pro_id } });
      let tar_id = tarif.tar_id;
      let pad_ht = tarif.tar_ht;
      let pad_ttc = tarif.tar_ttc;
      const promo = await Apply.findOne({
        where: { pro_id },
        include: [
          {
            model: Promo,
            attributes: ["prm_pourcent", "prm_valeur"],
            where: { prm_actif: true },
          },
        ],
      });
      let pad_remise = 0;
      if (promo) {
        if (promo.Promo.prm_pourcent) {
          pad_remise = pad_ht * (promo.Promo.prm_pourcent / 100);
        } else if (promo.Promo.prm_valeur) {
          pad_remise = promo.Promo.prm_valeur;
        }
      }
      let prm_id = promo ? promo.prm_id : null;
      // let pad_remise = promo ? promo.Promo.prm_pourcent : null;

      const panierDetail = await Panier_detail.create({
        pro_id,
        tar_id,
        prm_id,
        pan_id,
        pad_qte,
        pad_ht,
        pad_ttc,
        pad_remise: pad_remise ? pad_remise : null,
      });
      return res.status(201).json({ panierDetail });
    }

    const newQuantite = oldPanierDetail.pad_qte + pad_qte;

    if (quantite) {
      if (newQuantite > quantite) {
        return res.status(200).send("indisponible");
      }
    }

    let panierDetail = await Panier_detail.update(
      {
        pad_qte: newQuantite,
      },
      { where: { pad_id: oldPanierDetail.pad_id } }
    );

    if (panierDetail[0] == 1) {
      panierDetail = await Panier_detail.findOne({
        where: {
          [Op.and]: [{ pro_id }, { pan_id }],
        },
      });
      return res.status(200).json({ panierDetail });
    }

    return res.status(404).send("aucun produit ajouté");
  } catch (error) {
   
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res, next) => {
  const pan_id = req.session.panierId;

  try {
    const produits = await Panier_detail.findAll({
      include: [
        {
          model: Produit,
          attributes: ["pro_ref", "pro_libelle"],
          include: [{ model: Media, attributes: ["med_id", "med_ressource"] }],
        },
      ],
      where: { pan_id },
    });

    //if (Produits.length !== 0) return res.status(200).send(Produits);
    return res.status(200).send(produits);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});

router.delete("/", async (req, res) => {
  const { pro_id } = req.body;
  const pan_id = req.session.panierId;

  try {
    const oldPanierDetail = await Panier_detail.findOne({
      where: {
        [Op.and]: [{ pro_id }, { pan_id }],
      },
    });

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

router.put("/", async (req, res) => {
  const { pro_id, action } = req.body;
  const pan_id = req.session.panierId;
  try {
    let panierDetail = await Panier_detail.findOne({
      where: {
        [Op.and]: [{ pro_id }, { pan_id }],
      },
    });
    const quantite = await Quantite.sum("qua_nbre", {
      where: { pro_id },
    });
    if (quantite) {
      const newQuantite =
        action == "up" ? panierDetail.pad_qte + 1 : panierDetail.pad_qte - 1;
      if (quantite >= newQuantite) {
        const newpanierDetail = await panierDetail.update(
          {
            pad_qte: newQuantite,
          },
          { where: { pad_id: panierDetail.pad_id } }
        );
        if (newpanierDetail[0] == 1) {
          panierDetail = await Panier_detail.findOne({
            where: {
              [Op.and]: [{ pro_id }, { pan_id }],
            },
          });
          return res.status(200).json({ panierDetail });
        }
      }
    }
    return res.status(200).json(panierDetail);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
