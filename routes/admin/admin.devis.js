const express = require("express");
const router = express.Router();
const {
  Commande,
  Panier,
  Panier_detail,
  Client,
  Tarif,
  Frais_port,
  Produit,
  Media,
  Essayage,
  Sequelize,
  Adresse,
  Mode_liv_essayage,
  Mode_liv_spectacle,
  Titre,
  Quantite,
  Apply,
  Promo,
  Chronologie,
  Statut_commande,
  Document,
  User,
  Type_document,
  Paiement,
  Moyen_paiement,
  Transporteur,
  Expedition,
  Detail_expedition
} = require("../../models/");
const moment = require("moment");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");
const { PAGINATION_LIMIT_ADMIN, TYPE_DOCUMENT_FACTURE } = require("../../helpers/utils_const");

router.get("/", async (req, res) => {
  let {page, start, end} = check_admin_paginate_value(req);
  try {
    let commandes_data = [];
    let commandes = await Commande.findAll({
      offset: start,
      limit: PAGINATION_LIMIT_ADMIN,
      attributes: [
        "com_id",
        "com_date",
        "com_debut_spectacle",
        "com_fin_spectacle",
        "pan_id",
        "frp_id",
        "com_adr_liv",
        "com_adr_fac",
        "com_num"
      ],
      include: [
        {
          model: Client,
        },
        {
          model: Frais_port,
          include :[
            {
              model:Mode_liv_essayage
            },
            {
              model:Mode_liv_spectacle
            }
          ]
        },
        {
          model: Panier,
          include: [
            {
              model: Panier_detail,
            },
          ],
        },
        {
          model:Chronologie,
          include:[
            {
              model:Statut_commande
            }
          ],
          
        }
      ],
      order: [[{ model: Chronologie }, 'chr_date', 'DESC']]
      //group: ["Commande.com_id"],
    });
    let commandesNbr = await Commande.findAndCountAll();
    // datas complementaire de la requete
    for (let commande of commandes) {
      let pad_ttc = 0
      commande.Panier.Panier_details.forEach(pad => {
        pad_ttc += pad.pad_ttc * pad.pad_qte;
      });
      let paniers = await Panier.findOne({
        where: { pan_id: commande.pan_id },
        include: {
          model: Panier_detail,
        },
      });
      let essayages = await Essayage.findAll({
        where: {
          com_id: commande.com_id,
        },
      });
      let adress_liv = await Adresse.findOne({
        where:{
          adr_id:commande.com_adr_liv
        }
      })  
      commandes_data.push({ commande, ...paniers, essayage: essayages,adresseLivraison:adress_liv,total_pad_ttc:pad_ttc });
    }
    let nbrPages = Math.ceil(commandesNbr.count / PAGINATION_LIMIT_ADMIN);
    res.render("devis/index", {
      commandes: commandes_data,
      moment,
      pageActive: page,
      start,
      end,
      nbrPages
    });
  } catch (error) {
    console.log(error);
    return res.send("erreur");
  }
});

/**
 * @param panier Numeric
 * @returns [Array] liste des panier détails pour une commande
 */
router.get('/:panier',async (req,res)=>{
  const panier = req.params.panier;
  try {
    const produits = await Panier_detail.findAll({
      include: [
        {
          model: Produit,
          attributes: ["pro_ref", "pro_libelle"],
          include: [{ model: Media, attributes: ["med_id", "med_ressource"] }],
        },
      ],
      where: { pan_id:panier },
    });
    return res.json(produits);
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
});

router.get('/view/:commandeId',async (req,res)=>{
  const {commandeId} = req.params;
  try {
    let commande = await Commande.findOne({
      where:{
        com_id:commandeId
      },
      attributes: [
        "com_id",
        "com_date",
        "com_debut_spectacle",
        "com_fin_spectacle",
        "pan_id",
        "frp_id",
        "com_adr_liv",
        "com_adr_fac",
        "com_remise",
        "com_port",
        "com_frais",
        "com_ht",
        "com_tva",
        "com_ttc",
        "com_num"
      ],
      include: [
        {
          model: Client,
          include:[
            {
              model:Titre
            }
          ]
        },
        {
          model: Frais_port,
          include :[
            {
              model:Mode_liv_essayage
            },
            {
              model:Mode_liv_spectacle
            }
          ]
        },
        {
          model: Panier,
          include: [
            {
              model: Panier_detail,
              include:[{
                model:Produit,
                include:[
                {
                  model:Media
                },
                {
                  model:Quantite
                },
                {
                  model:Apply,
                  include:[
                    {
                      model:Promo
                    }
                  ]
                }
              ]
              }]
            },
          ],
        },
        {
          model:Essayage
        },
        {
          model:Document,
          include:[
            {
            model:Type_document
            },
            {
              model:Paiement
            }
          ]
        },
        {
          model:Chronologie,
          include:[
            {
              model:Statut_commande
            },
            {
              model:User
            }
          ]
        },
      ]
    });
    let adresses = await Adresse.findAll({
      cli_id:commande.cli_id
    }) 
    let adresse_livraion = await Adresse.findOne({
      where:{adr_id:commande.com_adr_liv}
    });
    let adresse_facturation = await Adresse.findOne({
      where:{adr_id:commande.com_adr_fac}
    });
    let statutCommandes = await Statut_commande.findAll();
    let moyen_paiements = await Moyen_paiement.findAll();
    let paiements = await Paiement.findAll({
      include:[
        {
          model:Moyen_paiement
        },
        {
          model:Document,
          include:[{
            model:Type_document
          }]
        }
      ],
      where:{
        com_id:commande.com_id
      }
    });
    let factures = await Document.findAll({
      where:{
        tdo_id:TYPE_DOCUMENT_FACTURE
      }
    });
    let transporteurs = await Transporteur.findAll();
    let expeditions = await Expedition.findAll({
      include:[
        {
          model:Transporteur
        }
      ],
      where:{com_id:commandeId}
    });
    res.render("devis/view",{
      commande,
      adresse_livraion,
      adresse_facturation,
      adresses,
      moment,
      statutCommandes,
      moyen_paiements,
      paiements,
      factures,
      transporteurs,
      expeditions
    });
  } catch (error) {
    res.render("devis/view",{
      error:true
    });
  }
  
})
/**
 * ajout date essayage
 */
router.post('/commande/add-essayage',async (req,res)=>{
  const {com_id,ess_repetition} = req.body;
  try {
    await Essayage.create({
      com_id,
      ess_repetition
    });
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    //gestion erreur
    res.redirect(`/admin/devis/view/${com_id}`);
  }
});
router.post('/commande/delete/essayage',async (req,res)=>{
  const {com_id,ess_id} = req.body;
  try {
    await Essayage.destroy({
      where:{
        ess_id
      }
    });
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    
  }
})
router.post('/commande/update-adresse-facturation',async(req,res)=>{
  const {adresse,com_id} = req.body;
  try {
    let commande = await Commande.update(
    {
      com_adr_fac:adresse
    },
    {where:{com_id}});
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    console.log(error);
    //res.redirect(`/admin/devis/view/${com_id}`);
  }
})
router.post('/commande/update-adresse-livraison',async(req,res)=>{
  const {adresse,com_id} = req.body;
  try {
    let commande = await Commande.update(
    {
      com_adr_liv:adresse
    },
    {where:{com_id}});
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    res.redirect(`/admin/devis/view/${com_id}`);
  }
})
router.post('/commande/update-panier-detail',async (req,res)=>{
  const {pad_id,pad_qte,com_id} = req.body;
  
  try {
    await Panier_detail.update({
      pad_qte
    },{where:{pad_id}});
    let commande = await Commande.findOne({where:{com_id}});
    let panierDetail = await Panier_detail.findOne({where:{pad_id}});
    let panierDetails = await Panier_detail.findAll({
      where:{pan_id:panierDetail.pan_id}
    });
    var somme_commande_ht = 0;
    panierDetails.forEach(panierDetail => {
      somme_commande_ht += panierDetail.pad_ht * panierDetail.pad_qte
    });
    let somme_commande_ttc = somme_commande_ht + commande?.com_tva + commande?.com_port + commande?.com_frais
    let updatedCommande = await Commande.update({
      com_ht:somme_commande_ht,
      com_ttc:somme_commande_ttc
    },{where:{com_id}});
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    console.log(error);
   // res.redirect(`/admin/devis/view/${com_id}`);
  }
})
router.post('/commande/delete-panier-detail',async (req,res)=>{
  const {com_id,pad_id} = req.body;
  try {
    await Panier_detail.destroy({
      where:{
        pad_id
      }
    });
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    res.redirect(`/admin/devis/view/${com_id}`);
  }
})
router.post('/commande/update-statut',async (req,res)=>{
  const {com_id,stc_id} = req.body;
  const usr_id = req.session.adminId;

  try {
    let chronologie = await Chronologie.create({
      com_id,
      stc_id,
      usr_id,
      chr_date:new Date(new Date().setDate(new Date().getDate()))
    });
  } catch (error) {
    
  }
  res.redirect(`/admin/devis/view/${com_id}`);
});
router.post('/commande-delete-statut',async (req,res)=>{
  const {com_id,chr_id} = req.body;
  try {
    await Chronologie.destroy({
      where:{
        chr_id
      }
    });
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    
  }
})
router.post('/commande/update-date-debut',async (req,res)=>{
  const {com_debut_spectacle,com_id} = req.body;
  try {
    let updatedCommande = await Commande.update({
      com_debut_spectacle
    },{where:{com_id}});
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    res.redirect(`/admin/devis/view/${com_id}`);
  }
});
router.post('/commande/update-date-fin',async (req,res)=>{
  const {com_fin_spectacle,com_id} = req.body;
  try {
    let updatedCommande = await Commande.update({
      com_fin_spectacle
    },{where:{com_id}});
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    res.redirect(`/admin/devis/view/${com_id}`);
  }
});
router.post('/commande-add-paiement-for-document',async (req,res)=>{
  const {doc_id,com_id,pai_montant,pai_ref,mop_id} = req.body;
  const usr_id = req.session.adminId;
  try {
    let paiement_item = await Paiement.create({
      doc_id,
      usr_id,
      mop_id,
      com_id,
      pai_ref,
      pai_montant,
      pai_date:new Date(new Date().setDate(new Date().getDate()))
    });
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    console.log(error);
  }
});
router.post('/commande-add-doc-comment', async (req,res)=>{
  const {doc_comment,com_id,doc_id} = req.body;
  try {
    await Document.update({
      doc_comment
    },{where:{doc_id}});
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    console.log(error);
  }
});
router.post('/commande-add-facture-paiement',async (req,res)=>{
  const {com_id,pai_date,mop_id,pai_ref,pai_montant,doc_id} = req.body

  res.redirect(`/admin/devis/view/${com_id}`);
});
router.post('/commande-add-transporteur', async (req,res)=>{
  const {exp_poids,exp_suivi,com_id,trs_id,doc_id} = req.body;
  try {
    let commande = await Commande.findOne({
      attributes:['pan_id','cli_id'],
      where:{com_id}
    });
    let panier_details = await Panier_detail.findAll({
      where:{pan_id:commande.pan_id}
    });
    let docId = doc_id ? doc_id:null;
    let expSuivi = exp_suivi ? exp_suivi : null
    let expedition = await Expedition.create(
      {
      ste_id:1,
      trs_id,
      cli_id:commande.cli_id,
      doc_id:docId,
      exp_poids,
      exp_depart:new Date(new Date().setDate(new Date().getDate())),
      exp_suivi:expSuivi,
      com_id:com_id
    });
    panier_details.forEach(async (panier_detail) =>{
      await Detail_expedition.create({
        pro_id:panier_detail.pro_id,
        exp_id:expedition.exp_id,
        dex_nbre:panier_detail.pad_qte
      });
    })
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    res.redirect(`/admin/devis/view/${com_id}`);
  }
})
router.post('/commande-retour', async (req,res)=>{
  const {com_id,pro_id,ret_nbr,ret_date} = req.body;
  res.redirect(`/admin/devis/view/${com_id}`);
})
module.exports = router;
