const express = require('express');
const router = express.Router();
const {Document,Commande,Facturation,Paiement,Client,Chronologie,Adresse,Expedition,Panier_detail,Transporteur,Produit,Quantite,Taille} = require('../../models');
const {TYPE_DOCUMENT_FACTURE, TYPE_DOCUMENT_BON_ESSAYAGE, TYPE_DOCUMENT_BON_LIVRAISON,ECHEANCE_A_RECEPTION,STATUT_FACTURE_BROUILLON, STATUT_COMMANDE_COM_VALIDEE} = require('../../helpers/utils_const');
const { Op, where } = require('sequelize');
const today = new Date(new Date().setDate(new Date().getDate()));
const send_mail_confirmation = require("../../helpers/send_mail_confirmation");
const get_commande_data = require("../../helpers/get_commande_data");
const ejs = require("ejs");
const generate_pdf_func = require('../../helpers/generate_pdf_func');
const send_mail_func = require('../../helpers/send_mail_func');
const fs = require('fs');
const path = require('path');
const flash_message = require('../../helpers/flash_message');
const erroMsg = "Quelque chose s'est mal passé."
const moment = require('moment');

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
            });
            req.session.flash = {message:"Votre facture vient d'être généré ",type:"success"}
        }else{
            req.session.flash = {message:"Une facture exite déjà pour cette commande ",type:"danger"}
        }
        res.redirect(`/admin/devis/view/${com_id}`);
    } catch (error) {
        req.session.flash = {message:erroMsg,type:"danger"}
        res.redirect(`/admin/devis/view/${com_id}`);
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
        req.session.flash = {message:"Bon d'essayage crée avec succée, le pdf sera généré lors de l'envoi du mail au client",type:"success"}
        res.redirect(`/admin/devis`);
    } catch (error) {
        req.session.flash = {message:erroMsg,type:"danger"}
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
        req.session.flash = {message:"Bon de livraison créé, le pdf sera généré lors de l'envoi du mail au client",type:"success"}
        res.redirect(`/admin/devis`);
    } catch (error) {
        req.session.flash = {message:erroMsg,type:"danger"}
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
            req.session.flash = {message:"Un nouveau dévis vient d'être généré et envoyer au client par email.",type:"success"}
            res.redirect(`/admin/devis/view/${commande.com_id}`);
        });
    } catch (error) {
        req.session.flash = {message:erroMsg,type:"danger"}
        res.redirect(`/admin/devis/view/${com_id}`);
    }
});
router.post('/bon-essayage-pdf',async (req,res)=>{
    const {com_id} = req.body;
    try {
        let commande = await Commande.findOne({
            attributes:['com_id','com_num'],
            include:[{model:Client,attributes:['cli_mail']}]
        },{where:{com_id},order:[['doc_date','DESC']]});

        let ejsFile = fs.readFileSync(
            path.join(__dirname, "../../mailTemplate/essayage.ejs"),
            "utf8"
        );
        let html = ejs.render(ejsFile);
        let bon_essayage_arr = await Document.findAll({
            attributes:['doc_id','doc_ref'],
            where:{
                [Op.and]:[{tdo_id:TYPE_DOCUMENT_BON_ESSAYAGE},{com_id}]
            },
            order:[['doc_date','DESC']]
        });
        
        if (bon_essayage_arr) { 
            const DOCUMENT_NAME = bon_essayage_arr[0].doc_ref;
            let bon_essayage = bon_essayage_arr[0];
            generate_pdf_func(`${process.env.APP_URL}admin/bon-essayage/${bon_essayage.doc_id}`,`../public/pdf/bon_essayage/${DOCUMENT_NAME}.pdf`).then(data=>{
                send_mail_func(DOCUMENT_NAME,`../public/pdf/bon_essayage/${DOCUMENT_NAME}.pdf`,commande.Client.cli_mail,`Bon d'essayage AES`,html).then(()=>{
                    req.session.flash = {message:"Le bon d'essayage vient d'être envoyé au client.",type:"success"} 
                    res.redirect(`/admin/devis/view/${commande.com_id}`);
                })
            })  
        }else{
            req.session.flash = {message:"Cette commande n'a pas encore de bon d'essayage.",type:"danger"}
            res.redirect(`/admin/devis/view/${commande.com_id}`);   
        }
    } catch (error) {
       req.session.flash = {message:erroMsg,type:"danger"}
       res.redirect(`/admin/devis/view/${com_id}`);
    }
});
router.post('/bon-livraison-pdf',async (req,res)=>{
    const {com_id,doc_id} = req.body; 
    try {
        let bon_livraison_arr = await Document.findAll({
            attributes:['doc_ref','com_id','doc_id'],
            where:{
                [Op.and]:[{doc_id},{com_id}]
            },
            order:[['doc_date','DESC']]
        });
        let commande = await Commande.findOne({
            attributes:['com_id','com_num','com_adr_liv','pan_id'],
            include:[{model:Client,attributes:['cli_mail']}],
            where:{com_id}
        });
        let adresse = await Adresse.findOne({
            where: { adr_id: commande.com_adr_liv },
        });
        let expedition = await Expedition.findOne({
            attributes:['trs_id','exp_id'],
            include:[{model:Transporteur}],
            where:{com_id:commande.com_id}
        });
        let panierDetails = await Panier_detail.findAll({
            include: [
              {
                model: Produit,
                attributes: ["pro_ref", "pro_libelle"],
                include: {
                  model: Quantite,
                  attributes: ["qua_nbre"],
                  include: { model: Taille, attributes: ["tai_libelle"] },
                },
              },
            ],
            where: { pan_id: commande.pan_id },
        });
        let ejsFile = fs.readFileSync(
            path.join(__dirname, "../../mailTemplate/livraison_mail_content.ejs"),
            "utf8"
        );
        
        if (bon_livraison_arr) { 
            let bon_livraison = bon_livraison_arr[0];
            let html = ejs.render(ejsFile,{bon_livraison,commande,moment,adresse,expedition,panierDetails});     
            const DOCUMENT_NAME = bon_livraison.doc_ref;
            generate_pdf_func(`${process.env.APP_URL}admin/bon-livraison/${bon_livraison.doc_id}`,`../public/pdf/bon_livraison/${DOCUMENT_NAME}.pdf`).then(data=>{
                send_mail_func(DOCUMENT_NAME,`../public/pdf/bon_livraison/${DOCUMENT_NAME}.pdf`,commande.Client.cli_mail,`Bon de livraison AES`,html).then(()=>{
                    req.session.flash = {message:"Le bon de livraison vient d'être envoyé au client.",type:"success"} 
                    res.redirect(`/admin/devis/view/${com_id}`);
                })
            })  
        }else{
            req.session.flash = {message:"Cette commande n'a pas encore de bon de livraison.",type:"danger"}
            res.redirect(`/admin/devis/view/${com_id}`);   
        }
    } catch (error) {
       // console.log(error);
        req.session.flash = {message:erroMsg,type:"danger"}
        res.redirect(`/admin/devis/view/${com_id}`);
    }
})
module.exports = router;