const express = require("express");
const router = express.Router();
const {
  Panier,
  Panier_detail,
  Commande,
  Client,
  Frais_port,
  Titre,
  Produit,
  Media,
  Quantite,
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
router.get('/:id',async function(req,res){
  const id = req.params.id

  try {
    const panier = await Panier.findOne({
      where: { pan_id: id },
      include: [
        {
          model: Client,
          attributes: ["cli_nom", "cli_prenom", "cli_mail", "tit_id"],
        },
        {
          model: Panier_detail,
          attributes: ["pad_ttc"],
        },
        {
          model: Commande,
          attributes: ["com_id", "com_ttc", "com_date"],
          include: {
            model: Frais_port,
            attributes: ["frp_libelle"],
          },
        },
      ],
    });
    const titre = await Titre.findOne({where:{tit_id:panier.Client.tit_id}})

    const panier_detail = await Panier_detail.findAll({
      where: { pan_id: panier.pan_id },
      include: [
        {
          model: Produit,
          attributes: ["pro_libelle", "pro_ref"],
          include: [
            { model: Media, attributes: ["med_ressource"] },
            { model: Quantite, attributes: ["qua_nbre"] },
          ],
        }
      ],
    });
let stock_quantite = []
panier_detail.forEach(element => {
  let somme
  for (let index = 0; index < element.Produit.Quantites?.length; index++) {
     somme = somme + element.Produit.Quantites[index]?.qua_nbre;

      stock_quantite.push({
        qty: somme,
      });
    }
});

  //  return  res.json(stock_quantite)
    return res.render("panier/detail",{titre,panier,panier_detail});
    
  } catch (error) {}
})

module.exports = router;
