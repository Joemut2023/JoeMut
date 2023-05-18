const express = require('express');
const router = express.Router();
const {Document,Commande,Facturation,Paiement,Client,Chronologie} = require('../../models');
const {TYPE_DOCUMENT_FACTURE, TYPE_DOCUMENT_BON_ESSAYAGE, TYPE_DOCUMENT_BON_LIVRAISON,ECHEANCE_A_RECEPTION,STATUT_FACTURE_BROUILLON, STATUT_COMMANDE_COM_VALIDEE} = require('../../helpers/utils_const');
const { Op, where } = require('sequelize');
const today = new Date(new Date().setDate(new Date().getDate()));
const send_mail_confirmation = require("../../helpers/send_mail_confirmation");
const get_commande_data = require("../../helpers/get_commande_data");

const create_document = async (tdo_id,usr_id,doc_date,com_id,callback)=>{
    let commande = await Commande.findOne({
        attributes:['com_num','com_id'],
        where:{com_id}
    });
    let document = await Document.create({
        tdo_id,
        usr_id,
        doc_date,
        com_id
    });
    callback(document,commande);
}
router.post('/facture',async (req,res)=>{
    const {com_id} = req.body;
    const usr_id = req.session.adminId
    try {
        let commande = await Commande.findOne({
            attributes:['com_num','com_id'],
            where:{com_id}
        });
        let document_exist = await Document.findOne({
            attributes:['doc_id'],
            where:{
                [Op.and]:[
                    {com_id},
                    {tdo_id:TYPE_DOCUMENT_FACTURE}
                ]
            }
        });
        if (!document_exist) {
            let document = await Document.create({
                tdo_id:TYPE_DOCUMENT_FACTURE,
                usr_id,
                doc_date:today,
                com_id:commande.com_id
            });
            let document_updated = await Document.update({
                doc_ref:`FAC-${document.doc_id}-${commande.com_num.trim()}`,
                doc_libelle:`FAC-${document.doc_id}-${commande.com_num.trim()}`
            },{where:{doc_id:document.doc_id}}); 
            let totalPaiment = await Paiement.sum('pai_montant',{
                where:{doc_id:document.doc_id}
            });
            let facturation = await Facturation.create({
                fac_montant:totalPaiment,
                usr_id,
                com_id,
                doc_id:document.doc_id,
                fac_date:today,
                ech_id:ECHEANCE_A_RECEPTION,
                stf_id:STATUT_FACTURE_BROUILLON
            })
        }
        res.redirect(`/admin/devis/view/${com_id}`);
    } catch (error) {
        console.log(error);
        //res.redirect(`/admin/devis/view/${com_id}`);
    }
});
router.post('/bon-essayage',async (req,res)=>{
    const {com_id} = req.body;
    const usr_id = req.session.adminId
    try {
        await create_document(TYPE_DOCUMENT_BON_ESSAYAGE,usr_id,today,com_id,async (document,commande)=>{
            let document_updated = await Document.update({
                doc_ref:`ESS-${document.doc_id}-${commande.com_num.trim()}`,
                doc_libelle:`ESS-${document.doc_id}-${commande.com_num.trim()}`
            },{where:{doc_id:document.doc_id}});
        });
        res.redirect(`/admin/devis`);
    } catch (error) {
        res.redirect(`/admin/devis`);
    }
});
router.post('/bon-livraison',async (req,res)=>{
    const {com_id} = req.body;
    const usr_id = req.session.adminId
    try {
        await create_document(TYPE_DOCUMENT_BON_LIVRAISON,usr_id,today,com_id,async (document,commande)=>{
            let document_updated = await Document.update({
                doc_ref:`LIV-${document.doc_id}-${commande.com_num.trim()}`,
                doc_libelle:`LIV-${document.doc_id}-${commande.com_num.trim()}`
            },{where:{doc_id:document.doc_id}});
        });
        res.redirect(`/admin/devis`);
    } catch (error) {
        res.redirect(`/admin/devis`);
    }
});
router.post('/devis-mail',async (req,res)=>{
    const  {com_id} = req.body;
    const usr_id = req.session.adminId;
    try {
        let commande = await Commande.findOne({
            attributes:['com_id','cli_id'],
        },{where:{com_id}});
        get_commande_data(com_id,async (
        commande,
        adresseLiv,
        adresseFac,
        panierDetails,
        essayage,
        modeLivraison,
        sous_total,
        taxe,
        totalTTC,
        totalHT,
        sous_totalCmd,
        produitsPopulaires,
        totalCmd,
        quantiteOfEachProduct,
        refCommande
        )=>{

            await send_mail_confirmation(
                res,
                req,
                commande,
                adresseLiv,
                adresseFac,
                panierDetails,
                essayage,
                modeLivraison,
                sous_total,
                taxe,
                totalTTC,
                totalHT
            );
            let chronologie = await Chronologie.create({
                com_id:commande.com_id,
                stc_id:STATUT_COMMANDE_COM_VALIDEE,
                usr_id,
                chr_date:new Date(new Date().setDate(new Date().getDate()))
            });
            res.redirect(`/admin/devis/view/${commande.com_id}`);
        });
    } catch (error) {
        
    }
})
module.exports = router;