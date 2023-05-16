const express = require('express');
const router = express.Router();
const {Detail_expedition,Retour,Produit,Commande,Media,Expedition,Client} = require('../../models');
const moment = require("moment");
router.get('/',async (req,res)=>{
    
    try {
        let detail_expeditions = await Detail_expedition.findAll({
            include : [
                {
                    model:Retour
                },
                {
                    model:Produit,
                    attributes:['pro_libelle','pro_ref'],
                    include:[{
                        model:Media
                    }]
                },
                {
                    model:Expedition,
                    attributes:['com_id','exp_depart'],
                    include:[
                        {
                            model:Commande,
                            attributes:['com_num','com_fin_spectacle'],
                            include:[
                                {
                                    model:Client,
                                    attributes:['cli_nom','cli_prenom']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.render('produits.location/index',{
            detail_expeditions,
            moment
        });
    } catch (error) {
        res.render('produits.location/index',{
            error
        });
    }
})

module.exports = router;