var express = require("express");
var router = express.Router();
const { Op } = require("sequelize");
const { Panier_detail, Apply, Tarif, Promo, Quantite } = require('../models');


router.get("/", async (req, res, next) => {
    const { pro_id, pad_qte } = req.body
    try {
        const oldPanierDetail = await Panier_detail.findOne({ where: { pro_id } });
        const quantite = await Quantite.findOne({ where: { pro_id } });
        if (!oldPanierDetail) {
            const promo = await Apply.findOne({
                where: { pro_id },
                include: [{
                    model: Promo,
                    attributes: ["prm_pourcent"],
                    where: { prm_actif: true }
                }]
            })
            let prm_id = promo ? promo.prm_id : null;
            let pad_remise = promo ? promo.Promo.prm_pourcent : null;
            const tarif = await Tarif.findOne({ where: { pro_id } });
            let tar_id = tarif.tar_id;
            let pad_ht = tarif.tar_ht;
            let pad_ttc = tarif.tar_ttc;
            console.log(tarif, "tarif");


            // if (quantite) {
            //     let quantiteDispo = quantite.qua_nbre;
            //     if (newQuantite > quantiteDispo) {
            //         return res.status(409).send(`La quantité disponible n'est que de ${quantiteDispo} articles`)
            //     }
            // }
            const panierDetail = await Panier_detail.create({
                pro_id, tar_id, prm_id, pan_id: req.session.panierId, pad_qte, pad_ht, pad_ttc, pad_remise
            })
            return res.status(201).json(panierDetail)
        }
        const pad_id = oldPanierDetail.pad_id
        const newQuantite = oldPanierDetail.pad_qte + pad_qte
        // if (quantite) {
        //     let quantiteDispo = quantite.qua_nbre;
        //     if (newQuantite > quantiteDispo) {
        //         return res.status(409).send(`La quantité disponible n'est que de ${quantiteDispo} articles`)
        //     }
        // }
        const panierDetail = await Panier_detail.update({
            pad_qte: newQuantite
        }, { where: { pad_id } })
        const newPanierDetail = await Panier_detail.findOne({ where: { pro_id } })

        return res.status(200).json({ panierDetail, newPanierDetail })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// router.put("/:id", async (req, res, next) => {
//     const pad_id = req.params.id
//     try {
//         const panierEdit = await Panier_detail.udpdate({ pad_qte }, { where: { pad_id } })
//         const NewPanier = await panierEdit.findOne({ where: { pad_id } })

//         res.status(200).json(NewPanier)
//     } catch (error) {
//         res.status(500).json({ error: error })
//     }
// })

module.exports = router

