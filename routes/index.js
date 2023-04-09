const express = require('express');
const router = express.Router();
const {Produit,Media} = require('../models');

/* GET home page. */
router.get('/', async (req, res, next)=> {
  res.locals.titre = "Accueil"
  const produits = await Produit.findAll({limit:10,
    order: [['pro_id', 'DESC'],],
    include:{model:Media,attributes:['med_id','med_ressource']}
  });
  console.log('log : ',produits[0].pro_id,produits[0].Media[0].med_ressource)
  console.table(produits[0].Media);
  res.render('default/index',{
    produits:produits
  });
});


module.exports = router;
