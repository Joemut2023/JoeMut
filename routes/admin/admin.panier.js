const express = require("express");
const router = express.Router();
const {
  Panier,
  Panier_detail,
  Commande,
  Client,
  Frais_port,
  Titre,
  Produit,
  Media,
  Quantite,
  Tarif,
  Promo,
  Apply
} = require("../../models");
const { PAGINATION_LIMIT_ADMIN, TYPE_PROMO_POURCENTAGE } = require("../../helpers/utils_const");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");

router.get("/", async function (req, res) {
  let { page, start, end } = check_admin_paginate_value(req);
  try {
    const panier = await Panier.findAll({
      offset: start,
      limit: PAGINATION_LIMIT_ADMIN,
      include: [
        {
          model: Client,
          attributes: ["cli_nom", "cli_prenom"],
        },
        {
          model: Panier_detail,
          attributes: ["pad_ttc"],
        },
        {
          model: Commande,
          attributes: ["com_id", "com_ttc", "com_date"],
          include: {
            model: Frais_port,
            attributes: ["frp_libelle", "frp_ttc"],
          },
        },
      ],
    });

    //to have length of panier
        const allPaniers = await Panier.findAll();
    
let nbrPages = Math.ceil(allPaniers.length / PAGINATION_LIMIT_ADMIN);
    return res.render("panier/index", {
      panier,
      nbrPages,
      pageActive: page,
      start,
      end,
      panierNbr: allPaniers.length,
    });
    
  } catch (error) {}
  
});
router.get('/:id',async function(req,res){
  const id = req.params.id

  try {
    const panier = await Panier.findOne({
      where: { pan_id: id },
      include: [
        {
          model: Client,
          attributes: ["cli_nom", "cli_prenom", "cli_mail", "tit_id"],
        },
        {
          model: Panier_detail,
          attributes: ["pad_ttc"],
        },
        {
          model: Commande,
          attributes: ["com_id", "com_ttc", "com_date"],
          include: {
            model: Frais_port,
            attributes: ["frp_libelle","frp_ttc"],
          },
        },
      ],
    });
    const titre = await Titre.findOne({
      where: { tit_id: panier.Client.tit_id },
    });

    const panier_detail = await Panier_detail.findAll({
      where: { pan_id: panier.pan_id },
      include: [
        {
          model: Produit,
          attributes: ["pro_libelle", "pro_ref","pro_id"],
          include: [
            { model: Media, attributes: ["med_ressource"] },
            { model: Quantite, attributes: ["qua_nbre"] },
          ],
        },
      ],
    });

    const somme_ttc = await Panier_detail.sum("pad_ttc", {
      where: { pan_id: id },
    });
     
    let sumQty = [];
    for (let index = 0; index < panier_detail.length; index++) {

     const totalqty = await Quantite.sum("qua_nbre",{where:{pro_id:panier_detail[index].Produit.pro_id}}); 
     sumQty.push({
       id: panier_detail[index].Produit.pro_id,
       qty: totalqty,
     });
      
    }
    //  res.json(sumQty);
    // return res.json(panier_detail[0]);
    return res.render("panier/detail", {
      titre,
      panier,
      panier_detail,
      somme_ttc,
      sumQty
    });
  } catch (error) {}
});
router.post('/add-panier-detail',async (req,res)=>{
  const {pro_id,pan_id,com_id,pad_qte} = req.body;
  try {
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
    let commande = await Commande.findOne({where:{com_id}});
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
    let panierDetails = await Panier_detail.findAll({
      where:{pan_id}
    });
    var somme_commande_ht = 0;
    panierDetails.forEach(panierDetail => {
      somme_commande_ht += panierDetail.pad_ht * pad_qte
    });

    let somme_commande_ttc = somme_commande_ht + commande?.com_tva + commande?.com_port + commande?.com_frais
    let updatedCommande = await Commande.update({
      com_ht:somme_commande_ht,
      com_ttc:somme_commande_ttc
    },{where:{com_id}});
    req.session.flash = {message:"Ajouté avec succés",type:"success"};
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    req.session.flash = {message:"Une erreur s'est produite, assurez vous d'avoir renseigné les champs nécessaire et entré un produit existant",type:"danger"};
    res.redirect(`/admin/devis/view/${com_id}`);
  }
});
router.post('/add-remise',async (req,res)=>{
  const {type_promo,prm_valeur,com_id,pad_id,pro_id} = req.body;
  try {
    var remise,totalHt;
    const panierDetail = await Panier_detail.findOne({
      where:{pad_id:pad_id}
    });
    totalHt = (panierDetail.pad_qte * panierDetail.pad_ht);
    if (parseInt(type_promo) === TYPE_PROMO_POURCENTAGE  ) {
      remise = parseFloat(totalHt * (prm_valeur/100));
      
      var promo = await Promo.create({
        prm_pourcent:parseInt(prm_valeur),
        prm_debut:new Date(new Date().setDate(new Date().getDate())),
        prm_fin:new Date(new Date().setDate(new Date().getDate())),
        prm_actif:true
      })
    }else{
      remise = prm_valeur;
      var promo = await Promo.create({
        prm_valeur:parseFloat(prm_valeur),
        prm_debut:new Date(new Date().setDate(new Date().getDate())),
        prm_fin:new Date(new Date().setDate(new Date().getDate())),
        prm_actif:true
      })
    }
    let applies = Apply.create({
      prm_id:promo.prm_id,
      pro_id:parseInt(pro_id)
    });
    let panier_detail = await Panier_detail.update({
      prm_id:promo.prm_id,
      pad_remise:remise
    },{where:{pad_id:pad_id}});
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (error) {
    //console.log(error);
    res.redirect(`/admin/devis/view/${com_id}`);
  }
});
router.post('/add-commande-remise',async (req,res)=>{
  const {prm_name,prm_valeur,type_promo,com_id} = req.body;
  var promo;
  var remise=parseFloat(prm_valeur);
  try {
    let commande = await Commande.findOne({
      where:{com_id}
    });
    if (parseInt(type_promo) === TYPE_PROMO_POURCENTAGE) {
      remise = parseFloat(parseFloat(commande.com_ht) * (remise/100)).toFixed(2);
      promo = await Promo.create({
        prm_code:prm_name,
        prm_pourcent:parseInt(prm_valeur),
        prm_debut:new Date(new Date().setDate(new Date().getDate())),
        prm_fin:new Date(new Date().setDate(new Date().getDate())),
        prm_actif:true,
        prm_commande:true
      })
    } else {
      promo = await Promo.create({
        prm_code:prm_name,
        prm_valeur:parseFloat(prm_valeur),
        prm_debut:new Date(new Date().setDate(new Date().getDate())),
        prm_fin:new Date(new Date().setDate(new Date().getDate())),
        prm_actif:true,
        prm_commande:true
      })
    }

    let updatedCommande = await Commande.update({
      com_remise:remise,
      com_code_promo:prm_name
    },{where:{com_id:com_id}});

  } catch (error) {
    
  }
 res.redirect(`/admin/devis/view/${com_id}`);
})

module.exports = router;
