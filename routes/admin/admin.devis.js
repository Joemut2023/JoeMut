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
  Detail_expedition,
  Retour,
  Facturation
} = require("../../models/");
const moment = require("moment");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");
const { PAGINATION_LIMIT_ADMIN, TYPE_DOCUMENT_FACTURE, TYPE_DOCUMENT_DEVIS, TYPE_DOCUMENT_BON_ESSAYAGE,TYPE_DOCUMENT_BON_LIVRAISON } = require("../../helpers/utils_const");
const { Op, where } = require("sequelize");
const erroMsg = "Quelque chose s'est mal passé";
const updateMsg = "modifié avec succés"
const createMsg = "Créé avec succés";
const deleteMsg = "Supprimé avec succés";
const path = require('path');
router.get("/", async (req, res) => {
  let {page, start, end} = check_admin_paginate_value(req);
  try {
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
          
        },
        {
          model:Adresse,
          as:'com_adr_livraison',
          required:true,
        },
        {
          model:Adresse,
          as:'com_adr_facturation',
          required:true,
        },
        {
          model:Essayage
        }
      ],
      order: [['com_date', 'DESC']]
      //group: ["Commande.com_id"],
    });
    let statut_commandes = await Statut_commande.findAll();
    let commandesNbr = await Commande.findAndCountAll();
    // datas complementaire de la requete
    let nbrPages = Math.ceil(commandesNbr.count / PAGINATION_LIMIT_ADMIN);
    res.render("devis/index", {
      commandes,
      moment,
      pageActive: page,
      start,
      end,
      nbrPages,
      statut_commandes
    });
  } catch (error) {
    console.log(error);
    return res.render('devis/index',{
      error
    });
  }
});

router.post('/search',async (req,res)=>{
  let {page, start, end} = check_admin_paginate_value(req);
  var {com_num,doc_date,doc_date_2,ess_repetition,ess_repetition_2,cli_nom,
    cli_prenom,pro_ref,com_debut_spectacle,exp_depart,exp_depart_2,
    com_fin_spectacle,adr_structure,stc_id,adr_societe} = req.body
    
    const check_value_date_start = (data)=>{
      if (data == '') {
        return moment(new Date(2004, 0, 1)).format('YYYY-MM-DD')
      }else{
       return data
      }
    }
    const check_value_date_last = (data)=>{
      if (data=='') {
        return moment(new Date(2030, 0, 1)).format('YYYY-MM-DD');
      }else{
        return data
      }
    }
    const check_value = (column)=>{
      if(column == ''){
        return "%%"
      }else{
        return `%${column}%`
      }
    }

    try {
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
          "com_num",
        ],
        include: [
          {
            model: Client,
            where:{
              [Op.or]:{
                  cli_nom:{
                    [Op.like]:check_value(cli_nom)
                  },
                  cli_prenom:{
                    [Op.like]:check_value(cli_prenom)
                  }
              }
            }
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
                include:[
                  {
                    model:Produit,
                    attributes:['pro_ref'],
                    where:{
                      pro_ref:{
                        [Op.like]:check_value(pro_ref)
                      }
                    }
                  }
                ]
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
            where:{
              stc_id:{
                [Op.eq]:stc_id
              }
            }
          },
          {
            model:Adresse,
            as:'com_adr_livraison',
            required:true,
            where:{
                adr_structure:{
                  [Op.like]:check_value(adr_structure)
              },
            }
          },
          {
            model:Adresse,
            as:'com_adr_facturation',
            required:true,
            where:
            {
              [Op.or]:[
                {
                  adr_structure:{
                    [Op.like]:check_value(adr_structure)
                  }
                },
                {
                  adr_societe:{
                    [Op.like]:check_value(adr_societe)
                  }
                }
              ]
              ,
            }
          },
          {
            model:Essayage,
            where:{
              ess_repetition:{
                [Op.between]:[check_value_date_start(ess_repetition),check_value_date_last(ess_repetition_2)]
              }
            }
          },
          {
            model:Document,
            where:{
              [Op.and]:[
                {
                  doc_date:{
                    [Op.between]:[check_value_date_start(doc_date),check_value_date_last(doc_date_2)]
                  }
                },
                {tdo_id:TYPE_DOCUMENT_DEVIS}
              ]
            }
          },
          {
            model:Expedition,
            where:{
              exp_depart:{
                [Op.between]:[check_value_date_start(exp_depart),check_value_date_last(exp_depart_2)]
              }
            },
            required:false
          }
        ],
        where:{
          [Op.and]:{
            com_num:{
              [Op.like]:check_value(com_num)
            },
            com_debut_spectacle:{
              [Op.between]:[check_value_date_start(com_debut_spectacle),check_value_date_last('')]
            },
            com_fin_spectacle:{
              [Op.between]:[check_value_date_start(com_fin_spectacle),check_value_date_last('')]
            }
          }
        },
       // order: [[{ model: Chronologie }, 'chr_date', 'DESC']],
      });
      let statut_commandes = await Statut_commande.findAll();
      let commandesNbr = await Commande.findAndCountAll();
      let nbrPages = Math.ceil(commandesNbr.count / PAGINATION_LIMIT_ADMIN);
      res.render("devis/index", {
        commandes,
        moment,
        pageActive: page,
        start,
        end,
        nbrPages,
        statut_commandes,
        com_num,doc_date,doc_date_2,ess_repetition,ess_repetition_2,cli_nom,
        cli_prenom,pro_ref,com_debut_spectacle,exp_depart,exp_depart_2,
        com_fin_spectacle,adr_structure,stc_id,adr_societe
      });
    } catch (error) {
      res.render('devis/index',{
        error
      })
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
          attributes: ["pro_id","pro_ref", "pro_libelle"],
          include: [
            { model: Media, attributes: ["med_id", "med_ressource"] },
            {model:Quantite}
          ],
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

/**
 * @returns [NUMBER]
 */
router.get('/total-produit-en-sortie/:pro_id',async (req,res)=>{
  const {pro_id} = req.params;
  var total_retour = 0;
  try {
    const details_expeditions_total = await Detail_expedition.sum('dex_nbre',{
      where:{pro_id}
    });
    const details_expeditions = await Detail_expedition.findAll({
      where:{pro_id}
    });
    details_expeditions.forEach(async(dex)=>{
      let tot_retour = await Retour.sum('ret_nbre',{
        where:{dex_id:dex.dex_id}
      });
      total_retour += tot_retour;
    });
    let total = details_expeditions_total - total_retour;
    return res.json(total);
  } catch (error) {
    res.json(error);
  }
})

router.get('/view/:commandeId',async (req,res)=>{
  const {commandeId} = req.params;
  const retours = [];
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
        [Op.and]:{
          tdo_id:TYPE_DOCUMENT_FACTURE,
          com_id:commandeId
        }
      }
    });
    let transporteurs = await Transporteur.findAll();
    let expeditions = await Expedition.findAll({
      include:[
        {
          model:Transporteur
        },
        {
          model:Detail_expedition,
          include:[{
            model:Retour
          },
          {
            model:Produit,
            attributes:['pro_libelle']
          }
        ]
        }
      ],
      where:{com_id:commandeId}
    });
    let commande_client = await Client.findOne({
      attributes:['cli_id'],
      include:[
        {
          model:Commande,
          attributes:['com_id'],
          include:[
            {
              model:Document,
              attributes:['doc_id','tdo_id'],
              where:{tdo_id:TYPE_DOCUMENT_FACTURE},
              include:[{
                model:Paiement,
                attributes:['pai_montant']
              }]
            }
          ]
        }
      ],
      where:{cli_id:commande.Client.cli_id}
    });
    let total_commande = await Commande.findAll({
      attributes:['com_id'],
      where:{cli_id:commande.Client.cli_id}
    })
    
    let last_document_devis = await Document.findAll({
      attributes:['doc_ref'],
      where:{
        [Op.and]:[{tdo_id:TYPE_DOCUMENT_DEVIS},{com_id:commande.com_id}]
      },
      order:[['doc_date','DESC']]
    });

    let last_document_essayage = await Document.findAll({
      attributes:['doc_ref'],
      where:{
        [Op.and]:[{tdo_id:TYPE_DOCUMENT_BON_ESSAYAGE},{com_id:commande.com_id}]
      },
      order:[['doc_date','DESC']]
    });
    let last_document_livraison = await Document.findAll({
      attributes:['doc_ref','doc_id'],
      where:{
        [Op.and]:[{tdo_id:TYPE_DOCUMENT_BON_LIVRAISON},{com_id:commande.com_id}]
      },
      order:[['doc_date','DESC']]
    });
    return res.render("devis/view",{
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
      expeditions,
      commande_client,
      total_commande,
      last_document_devis,
      last_document_essayage,
      last_document_livraison
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
    req.session.flash = {message:"Date d'essayage créé",type:"success"};
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    //gestion erreur
    req.session.flash = {message:erroMsg,type:"danger"};
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
    req.session.flash = {message:"Date d'essayage supprimé",type:"success"};
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    req.session.flash = {message:erroMsg,type:"danger"};
    res.redirect(`/admin/devis/view/${com_id}`);
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
    req.session.flash = {message:updateMsg,type:"success"};
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    req.session.flash = {message:erroMsg,type:"danger"};
    res.redirect(`/admin/devis/view/${com_id}`);
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
    req.session.flash = {message:updateMsg,type:"success"};
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    req.session.flash = {message:erroMsg,type:"danger"};
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
    req.session.flash = {message:updateMsg,type:"success"};
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    req.session.flash = {message:erroMsg,type:"danger"};
    res.redirect(`/admin/devis/view/${com_id}`);
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
    req.session.flash = {message:deleteMsg,type:"success"};
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    req.session.flash = {message:erroMsg,type:"danger"};
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
    req.session.flash = {message:updateMsg,type:"success"};
  } catch (error) {
    req.session.flash = {message:erroMsg,type:"danger"};
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
    req.session.flash = {message:deleteMsg,type:"success"};
  } catch (error) {
    req.session.flash = {message:erroMsg,type:"danger"};
  }
  res.redirect(`/admin/devis/view/${com_id}`);
})
router.post('/commande/update-date-debut',async (req,res)=>{
  const {com_debut_spectacle,com_id} = req.body;
  try {
    let updatedCommande = await Commande.update({
      com_debut_spectacle
    },{where:{com_id}});
    req.session.flash = {message:updateMsg,type:"success"};
  } catch (error) {
    req.session.flash = {message:erroMsg,type:"success"};
  }
  res.redirect(`/admin/devis/view/${com_id}`);
});
router.post('/commande/update-date-fin',async (req,res)=>{
  const {com_fin_spectacle,com_id} = req.body;
  try {
    let updatedCommande = await Commande.update({
      com_fin_spectacle
    },{where:{com_id}});
    req.session.flash = {message:updateMsg,type:"success"};
  } catch (error) {
    req.session.flash = {message:erroMsg,type:"danger"};
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
    let fac_montant = await Paiement.sum('pai_montant',{
      where:{doc_id}
    });
    let facturation = await Facturation.update({
      fac_montant
    },{where:{com_id}});
    req.session.flash = {message:createMsg,type:"success"};
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    req.session.flash = {message:erroMsg,type:"danger"};
    res.redirect(`/admin/devis/view/${com_id}`);
  }
});
router.post('/commande-add-doc-comment', async (req,res)=>{
  const {doc_comment,com_id,doc_id} = req.body;
  try {
    await Document.update({
      doc_comment
    },{where:{doc_id}});
    req.session.flash = {message:createMsg,type:"success"};
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    req.session.flash = {message:erroMsg,type:"danger"};
  }
  res.redirect(`/admin/devis/view/${com_id}`);
});
router.post('/commande-add-facture-paiement',async (req,res)=>{
  const {com_id,pai_date,mop_id,pai_ref,pai_montant,doc_id} = req.body;
  const usr_id = req.session.adminId;
  try {
    let paiement = await Paiement.create({
      doc_id,
      usr_id,
      mop_id,
      pai_ref,
      pai_montant,
      pai_date,
      com_id
    });
    let fac_montant = await Paiement.sum('pai_montant',{
      where:{doc_id}
    });
    let facturation = await Facturation.update({
      fac_montant
    },{where:{com_id}});
    req.session.flash = {message:createMsg,type:"success"};
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
   req.session.flash = {message:erroMsg,type:"danger"};
   res.redirect(`/admin/devis/view/${com_id}`);
  }
});
router.post('/commande-add-transporteur', async (req,res)=>{
  const {exp_poids,exp_suivi,com_id,trs_id,doc_id,exp_cout} = req.body;
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
      exp_cout,
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
    req.session.flash = {message:createMsg,type:"success"};
   return res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
   req.session.flash = {message:erroMsg,type:"danger"};
   res.redirect(`/admin/devis/view/${com_id}`);
  }
});
router.post('/commande-retour', async (req,res)=>{
  const {com_id,pro_id,ret_nbre,ret_date} = req.body;
  const usr_id = req.session.adminId;
  // get dex_id
  try {
    let expedition = await Expedition.findOne({
      attributes:['exp_id'],
      where:{com_id:com_id}
    });
    let detail_exp = await Detail_expedition.findOne({
      where:{[Op.and]:[{pro_id},{exp_id:expedition.exp_id}]}
    });
    if (parseInt(ret_nbre) <= parseInt(detail_exp.dex_nbre)) {
      await Retour.create({
        usr_id,
        ret_nbre,
        ret_date,
        dex_id:detail_exp.dex_id
      });
      req.session.flash = {message:erroMsg,type:"success"};
      return res.redirect(`/admin/devis/view/${com_id}`);
    }else{
      req.session.flash = {message:"Valeur saisi est supérieur au nombre des produits expediés.",type:"danger"};// rendre l'erreur => session Error Flash
      return res.redirect(`/admin/devis/view/${com_id}`);
    }
  } catch (error) {
    req.session.flash = {message:erroMsg,type:"danger"};
    return res.redirect(`/admin/devis/view/${com_id}`);
  }
});
router.post('/commande-update-transporteur',async (req,res)=>{
  const {exp_cout,com_id,exp_id} = req.body;
  try {
    await Expedition.update({
      exp_cout
    },{where:{exp_id}});
    return res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    return res.redirect(`/admin/devis/view/${com_id}`);
  }
});
router.post('/commande-update-retour-comment',async (req,res)=>{
  const {ret_comment,ret_id,com_id} = req.body;
  try {
    await Retour.update({
      ret_comment
    },{where:{ret_id}});
    return res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    return res.redirect(`/admin/devis/view/${com_id}`);
  }
});
router.post('/commande-update-retour-nbr',async (req,res)=>{
  const {ret_id,com_id,dex_nbre,ret_nbre} = req.body;
  try {
    let retour = await Retour.findOne({
      where:{ret_id}
    });
    await Retour.update({
      ret_nbre
    },{where:{ret_id}});
    await Detail_expedition.update({
      dex_nbre
    },{where:{dex_id:retour.dex_id}});
    req.session.flash = {message:updateMsg,type:"success"};
    return res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    req.session.flash = {message:erroMsg,type:"danger"};
    return res.redirect(`/admin/devis/view/${com_id}`);
  }
})
module.exports = router;
