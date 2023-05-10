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
  User
} = require("../../models/");
const moment = require("moment");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");
const { PAGINATION_LIMIT_ADMIN } = require("../../helpers/utils_const");

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
    console.log(commandes_data[0].commande.Chronologies[0].Statut_commande.stc_libelle);
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
        "com_ttc"
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
          model:Document
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
    res.render("devis/view",{
      commande,
      adresse_livraion,
      adresse_facturation,
      adresses,
      moment,
      statutCommandes
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
module.exports = router;
