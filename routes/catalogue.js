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
router.get('/:id',(req,res)=>{
  res.render('catalogue/bycategorie');
})

module.exports = router;