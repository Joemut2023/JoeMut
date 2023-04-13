const express = require("express");
const router = express.Router();
const {Adresse,Frais_port} = require('../models');

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
      return res.render("commander/index",{
        adresses,
        mode_livraisons:mode_livraisons
      });
    }else{
      return res.render('commander/index',{
        mode_livraisons:mode_livraisons
      });
    }
  } catch (error) {
    console.log(error);
    return res.render('commander/index');
  }
});
module.exports = router;
