var express = require("express");
var router = express.Router();
const {Produit,Tarif,Media,Panier} = require('../models');

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
