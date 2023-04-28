const express = require("express");
const router = express.Router();
const {
  Panier,
  Panier_detail,
  Commande,
  Client,
  Frais_port,
} = require("../../models");

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
            },
            {
              model:Commande,
              attributes:["com_id"],
              include:{
                model:Frais_port,
                attributes:["frp_libelle"]
              }
            }
        ]
    })
    
    // return res.json(panier)

    return res.render("panier/index",{panier});
    
  } catch (error) {}
  
});

module.exports = router;
