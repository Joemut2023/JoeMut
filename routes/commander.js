const express = require("express");
const router = express.Router();
const {Adresse,Frais_port} = require('../models');
const createadress = require("../helpers/createadress");

router.get("/", async (req, res) => {
  res.locals.titre = "commander";
  let userId = req.session.userId;
  let {newadress} = req.query;
  if (newadress) {
    return res.render('commander/index');
  }
  try {
    const mode_livraisons = await Frais_port.findAll({
      where : {frp_actif:true}
    });
    if (userId) {
      const adresses = await Adresse.findAll({
        where: {
          cli_id: req.session.userId,
        },
      });
      if (adresses.length ===0) {
        return res.render("commander/index",{
          mode_livraisons:mode_livraisons
        });
      }else{
        return res.render("commander/index",{
          adresses,
          mode_livraisons:mode_livraisons
        });
      }
      
    }else{
      return res.render('commander/index',{
        mode_livraisons:mode_livraisons
      });
    }
  } catch (error) {
    res.status(500).render("error/serverError", {
      error: true,
      errorMsg: "Une erreur est survenue!",
      detailError: error,
    });
  }
});
router.post('/add-adresse',async (req,res)=>{
  res.locals.titre = "commander";
  let userId = req.session.userId;
  createadress(req,res,'/commander',true);
})
module.exports = router;
