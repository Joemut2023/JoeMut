const express = require('express');
const router = express.Router();
const {Detail_expedition,Retour,Produit,Commande} = require('../../models');
router.get('/',async (req,res)=>{
    
    try {
        res.render('produits.location/index');
    } catch (error) {
        res.render('produits.location/index',{
            error
        });
    }
})

module.exports = router;