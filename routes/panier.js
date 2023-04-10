var express = require("express");
var router = express.Router();
const {Produit,Tarif,Media} = require('../models');

router.get("/", (req, res, next) => {
  res.locals.titre = "panier";
  res.render("panier/index");
});
router.get('/:id',async (req,res)=>{
  let produit = await Produit.findByPk(parseInt(req.params.id),{
    include :[
      {model:Tarif,attributes:['tar_ttc','tar_ht']},
      {model:Media,attributes:['med_id','med_ressource']},
    ]
  });
  return res.json(produit);
})

module.exports = router;
