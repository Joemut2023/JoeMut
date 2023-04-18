const express = require("express");
const router = express.Router();
const {Adresse,Frais_port,Panier, Commande,Panier_detail} = require('../models');
const createadress = require("../helpers/createadress");
const user_subscribe = require("../helpers/user_subscribe");
const user_login = require("../helpers/user_login");

router.get("/", async (req, res) => {
  res.locals.titre = "commander";
  let userId = req.session.userId;
  let {newadress} = req.query;
  if (newadress) {
    return res.render('commander/index');
  }
  try {
    const mode_livraisons = await Frais_port.findAll({
      where : {frp_actif:true}
    });
    if (userId) {
      const adresses = await Adresse.findAll({
        where: {
          cli_id: req.session.userId,
        },
      });
      if (adresses.length ===0) {
        return res.render("commander/index",{
          mode_livraisons:mode_livraisons
        });
      }else{
        return res.render("commander/index",{
          adresses,
          mode_livraisons:mode_livraisons
        });
      }
      
    }else{
      return res.render('commander/index',{
        mode_livraisons:mode_livraisons
      });
    }
  } catch (error) {
    res.status(500).render("error/serverError", {
      error: true,
      errorMsg: "Une erreur est survenue!",
      detailError: error,
    });
  }
});
router.post('/',async(req,res)=>{
  let userId = req.session.userId;
  let pan_id = req.session.panierId;
  let {frais, adresse,commande} = req.body;
  try {
    // récuperation du panier du user(panier, non commande)
    //enregistrement du panier dans la commande
    let panier = await Panier.findByPk(pan_id);
    let adress_item = await Adresse.findByPk(parseInt(adresse));
    const somme_ttc = await Panier_detail.sum('pad_ttc', { where: { pan_id} });
    const somme_ht = await Panier_detail.sum('pad_ht', { where: { pan_id} });
    let commande_item = await Commande.create({
        frp_id:frais.frais_port.frp_id,
        cli_id:userId,
        com_debut_spectacle:commande.commande_debut,
        com_fin_spectacle:commande.com_fin_spectacle,
        com_comment:commande.com_compl,
        com_adr_liv:adress_item.adr_id,
        com_adr_fac:adress_item.adr_id,
        pan_id:panier.pan_id,
        com_ht:somme_ht,
        com_ttc:somme_ttc,
        com_port:frais.frais_port,
        // com_frais:frais.frais_dossier
      });
      // normalement la valeur pour com_port et com_frais doivenet être calculé en bdd
    let new_panier = Panier.create({
        cli_id:userId
    }) 
    req.session.panierId = panier.pan_id;
    req.session.commandeId = commande_item.com_id;
    return res.json(new_panier);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
})
router.post('/add-adresse',async (req,res)=>{
  res.locals.titre = "commander";
  let userId = req.session.userId;
  createadress(req,res,'/commander',true);
});
router.post('/user-login',async (req,res)=>{
 user_login(req,res,'commander/index','/commander');
});
router.post('/user-subscribe',async (req,res)=>{
  user_subscribe(req,res,'commander/index','/commander');
});
module.exports = router;
