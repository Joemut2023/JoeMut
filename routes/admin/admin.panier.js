const express = require("express");
const router = express.Router();
const {
  Panier,
  Panier_detail,
  Commande,
  Client,
  Frais_port,
} = require("../../models");
const { PAGINATION_LIMIT_ADMIN } = require("../../helpers/utils_const");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");

router.get("/", async function (req, res) {
  let { page, start, end } = check_admin_paginate_value(req);
  try {
    const panier = await Panier.findAll({
      offset: start,
      limit: PAGINATION_LIMIT_ADMIN,
      include: [
        {
          model: Client,
          attributes: ["cli_nom", "cli_prenom"],
        },
        {
          model: Panier_detail,
          attributes: ["pad_ttc"],
        },
        {
          model: Commande,
          attributes: ["com_id", "com_ttc"],
          include: {
            model: Frais_port,
            attributes: ["frp_libelle"],
          },
        },
      ],
    });

    //to have length of panier
        const allPaniers = await Panier.findAll();
    
    // return res.json(panier)
let nbrPages = Math.ceil(allPaniers.length / PAGINATION_LIMIT_ADMIN);
    return res.render("panier/index", {
      panier,
      nbrPages,
      pageActive: page,
      start,
      end,
      panierNbr: allPaniers.length,
    });
    
  } catch (error) {}
  
});

module.exports = router;
