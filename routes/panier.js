var express = require("express");
var router = express.Router();
const { Op } = require("sequelize");
const {Produit,Tarif,Media,Panier,Apply,Promo,Panier_detail} = require('../models');
const { ACTIF } = require("../helpers/utils_const");

router.get("/", async (req, res, next) => {
  res.locals.titre = "panier";

  try {
    const produitsPopulaires = await Produit.findAll({
      limit: 16,
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ttc"] },
      ],
      where: {
        pro_en_avant: 1,
      },
    });
    // res.json({ produitsPopulaires });
    return res.render("panier/index", {
      produitsPopulaires,
    });
  } catch (error) {}
});

router.post('/',async (req,res)=>{
  let userId = req.session.userId;
  let panier_details = req.body;
  let commandeTotalHt,commandeTotalTTc;
  let produits = [];
  if (userId) {
   try {
    let panier = await Panier.create({
      cli_id:userId
    });

    panier_details.items.forEach(async(item) => {
      //selectionnez les produits et leurs tarifs dont statut = 1
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
      // vérifier si le produit est en promo ==> Applies
      if (produit) {
        let enPromo = await Apply.findOne({
          include:[
            {
              model:Produit,
              attributes:['pro_id'],
              where:{
                pro_id:item.pro_id
              }
            },
            {
              model:Promo,
              attributes:['prm_id','prm_pourcent'],
              where:{
                prm_actif:ACTIF
              }
            }
          ],
        })

        if (enPromo) {
          // si oui recuperer l'id de la promo
          // récuperer le pourcentage de reduction de la promo (remise)
          console.log('en promo');
        } else {
          console.log(produit.Tarifs[0]);
          let pan_det = await Panier_detail.create({
            pro_id:produit.pro_id,
            tar_id:produit.Tarifs[0].tar_id,
            pan_id:panier.pan_id,
            pad_qte:item.pad_qte,
            pad_ht:produit.Tarifs[0].tar_ht,
          })
          // si non, laisser promo_id et remise à null dans panier_detail
          //console.log(pan_det);
        }
      }
      // après la boucle récuperer l'id du frais de port
      // insérer les valeurs dans la table Commande
      
    });
    
    
    
    
    

    
    res.status(201).json(panier);
   } catch (error) {
    res.status(500).json(error);
   }
  }else{
    return res.json('veillez vous authentifier');
  }
})
module.exports = router;
