const express = require("express");
const router = express.Router();
const {Adresse} = require('../models');

router.get("/", async (req, res) => {
  res.locals.titre = "commander";
  let userId = req.session.userId;
  let {newadress} = req.query;
  if (newadress) {
    return res.render('commander/index');
  }
  try {
    if (userId) {
      const adresses = await Adresse.findAll({
        where: {
          cli_id: req.session.userId,
        },
      });
      return res.render("commander/index",{
        adresses
      });
    }else{
      return res.render('commander/index');
    }
  } catch (error) {
    return res.render('commander/index');
  }
});
module.exports = router;
