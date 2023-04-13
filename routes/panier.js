var express = require("express");
var router = express.Router();
const {Produit,Tarif,Media,Panier} = require('../models');

router.get("/", (req, res, next) => {
  res.locals.titre = "panier";
  res.render("panier/index");
});

router.post('/',async (req,res)=>{
  let userId = req.session.userId;
  if (!userId) {
   try {
    let panier = await Panier.create({
      cli_id:userId
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
