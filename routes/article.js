var express = require("express");
var router = express.Router();
const {Produit,Tarif,Media} = require('../models');
router.get("/:id", async (req, res, next) => {
  res.locals.titre = "article";
  console.log('test xhr',req.xhr);
  if(req.xhr){
    //the request is ajax call
    let produit = await Produit.findByPk(parseInt(req.params.id),{
      include :[
        {model:Tarif,attributes:['tar_ttc','tar_ht']},
        {model:Media,attributes:['med_id','med_ressource']},
      ]
    });
    return res.json(produit);
  }
  res.render("article/index");
});
/* router.get('/:id',async (req,res)=>{
  
}) */
module.exports = router;
