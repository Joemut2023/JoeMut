const express = require("express");
const router = express.Router();
const { Client,Panier,
  Panier_detail,Commande,Produit,Tarif
} = require("../models");
let bcrypt = require("bcryptjs");
let {Op} = require('sequelize');

const { connexion } = require("../helpers/url");
const { ACTIF } = require("../helpers/utils_const");

router.get("/", async (req, res) => {
  res.locals.titre = "connexion";
  res.render(connexion);
});
router.post("/", async (req, res) => {
  const { credentials,panier_items } = req.body;
  try {
    const client = await Client.findOne({ where: {cli_mail : credentials.cli_mail } });
    if (!client) {
      return res.json('mot de passe incorrect');
    }
    const valid = await bcrypt.compare(credentials.cli_pwd, client.cli_pwd);
    if (!valid) {
      return res.json('mot de passe incorrect');
    }
    var panier = await Panier.findOne({
      include:[{
          model:Commande,
          required:false
        }],
      where:{cli_id:client.cli_id}
    });
    if (!panier) {
      panier = await Panier.create({
        cli_id:client.cli_id
      });

      if (panier_items && panier_items.length > 0) {
       let insert_panier_details =  async ()=>{
        panier_items.forEach(async (item) => {
          // récuperation du produit avec les bonnes infos
          let produit = await Produit.findByPk(item.pro_id,{
            include:[{
                model:Tarif,
                attributes: ["tar_ttc",'tar_id','tar_ht'],
                where: {
                  [Op.and]:[
                    {
                      pro_id:item.pro_id
                    },
                    {
                      tar_statut:ACTIF
                    }
                  ]
                }
              }],
          });
          // insérer dans panier_details
          let panier_dtl = await Panier_detail.create({
            pro_id:produit.pro_id,
            tar_id:produit.Tarifs[0].tar_id,
            pan_id:panier.pan_id,
            pad_qte:item.pad_qte,
            pad_ht:produit.Tarifs[0].tar_ht,
          })
        });
       }
       await insert_panier_details();
      }
      // si des données panier_details sont envoyés insérés dans la bd
    }else{
      if (panier_items.length > 0) {
        // supprimer tout les paniers details et insérer des nouveaux
      }
    }
    req.session.panierId = panier.pan_id;
    req.session.userId = client.cli_id;
    return res.json(panier.pan_id);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get('/panier-details/:pan_id',async (req,res)=>{
  let {pan_id} = req.params;
  try {
  var Panier_details = await Panier_detail.findAll({where:{pan_id:parseInt(pan_id)}});
    return res.json(Panier_details);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
  
})
module.exports = router;
