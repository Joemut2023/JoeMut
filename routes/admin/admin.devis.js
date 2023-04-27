const express = require("express");
const router = express.Router();
const {
  Commande,
  Panier,
  Panier_detail,
  Client,
  Tarif,
  Frais_port,
  Produit,
  Media,
  Essayage,
  Sequelize,
  Adresse
} = require("../../models/");
const moment = require("moment");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");
const { PAGINATION_LIMIT_ADMIN } = require("../../helpers/utils_const");

router.get("/", async (req, res) => {
  let {page, start, end} = check_admin_paginate_value(req);
  try {
    let commandes_data = [];
   // let total_pad_ttc = 0;
    let commandes = await Commande.findAll({
    //  offset: 0, // specify the number of rows to skip
      //limit: 10, // specify the maximum number of rows to return
      attributes: [
        "com_id",
        "com_date",
        "com_debut_spectacle",
        "com_fin_spectacle",
        "pan_id",
        "frp_id",
        "com_adr_liv",
        "com_adr_fac",
        // include other columns from the Commande model that you want to return
        // ...
        // [
        //   Sequelize.fn("SUM", Sequelize.col("Panier.Panier_details.pad_ttc")),
        //   "total_pad_ttc",
        // ],
      ],
      include: [
        {
          model: Client,
        //  attributes: [], // do not select any columns from the Client model
        },
        {
          model: Frais_port,
          //attributes: [], // do not select any columns from the Frais_port model
        },
        //  { model: Essayage },
        {
          model: Panier,
       //   attributes: [], // do not select any columns from the Panier model
          include: [
            {
              model: Panier_detail,
             // attributes: [], // do not select any columns from the Panier_detail model
            },
          ],
        },
      ],
      //group: ["Commande.com_id"],
    });

    // console.log(commandes[0].getDataValue('total_pad_ttc') );
    for (let commande of commandes) {
      let pad_ttc = 0
      commande.Panier.Panier_details.forEach(pad => {
        pad_ttc = pad_ttc + pad.pad_ttc;
      });
      let paniers = await Panier.findOne({
        where: { pan_id: commande.pan_id },
        include: {
          model: Panier_detail,
        },
      });
      let essayages = await Essayage.findAll({
        where: {
          com_id: commande.com_id,
        },
      });
      let adress_liv = await Adresse.findOne({
        where:{
          adr_id:commande.com_adr_liv
        }
      })
      
      commandes_data.push({ commande, ...paniers, essayage: essayages,adresseLivraison:adress_liv,total_pad_ttc:pad_ttc });
    }
    console.log(commandes_data[0]);
    res.render("devis/index", {
      commandes: commandes_data,
      moment,
    });
  } catch (error) {
    console.log(error);
    return res.send("erreur");
  }
});

router.get('/:panier',async (req,res)=>{
  const panier = req.params.panier;
  try {
    const produits = await Panier_detail.findAll({
      include: [
        {
          model: Produit,
          attributes: ["pro_ref", "pro_libelle"],
          include: [{ model: Media, attributes: ["med_id", "med_ressource"] }],
        },
      ],
      where: { pan_id:panier },
    });
    return res.json(produits);
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
});

module.exports = router;
