const express = require('express');
const router = express.Router();
const {Document,Commande} = require('../../models');
const {TYPE_DOCUMENT_FACTURE, TYPE_DOCUMENT_BON_ESSAYAGE, TYPE_DOCUMENT_BON_LIVRAISON} = require('../../helpers/utils_const');
const today = new Date(new Date().setDate(new Date().getDate()));
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
        })
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
        res.redirect(`/admin/devis/view/${com_id}`);
    } catch (error) {
        res.redirect(`/admin/devis/view/${com_id}`);
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
})
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
})
module.exports = router;