const express = require('express');
const router = express.Router();
const {Document,Commande} = require('../../models');
const {TYPE_DOCUMENT_FACTURE} = require('../../helpers/utils_const');
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
            doc_date:new Date(new Date().setDate(new Date().getDate())),
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
module.exports = router;