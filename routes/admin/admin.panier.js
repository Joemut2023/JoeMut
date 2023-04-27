const express = require("express");
const router = express.Router();
const { Panier, Panier_detail, Commande, Client } = require("../../models");

router.get("/", async function (req, res) {
  try {
    const panier = await Panier.findAll({
        include:[
            {
                model:Client,
                attributes:["cli_nom","cli_prenom"]
            },
            {
                model:Panier_detail,
                attributes:["pad_ttc"]
            }
        ]
    })
    
    // return res.json(commande)

    return res.render("panier/index",{panier});
    
  } catch (error) {}
  
});

module.exports = router;
