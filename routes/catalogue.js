var express = require('express');
var router = express.Router();
const { Categorie } = require("../models");

/* GET home page. */
router.get('/',async function(req, res, next) {
  try {
    const categories = await Categorie.findAll()
    return res.render("catalogue/index", { title: "Express" , categories: categories});
    
  } catch (error) {
     res.status(500).render("inscription/index", {
       error: true,
       errorMsg: "Une erreur est survenue!",
     });
  }
  
});
router.get('/:id',async (req,res)=>{
  const id = req.params.id;
  try {
    const categories = await Categorie.findAll()
    const categorie = await Categorie.findByPk(id);
    res.locals.titre = categorie.cat_libelle
    return res.render("catalogue/bycategorie", { title: "Express" , categories: categories,categorie:categorie});
  } catch (error) {
     res.status(500).render("inscription/index", {
       error: true,
       errorMsg: "Une erreur est survenue!",
     });
  }
  
})

module.exports = router;