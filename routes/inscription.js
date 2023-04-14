const express = require("express");
const { M, MME } = require("../helpers/titre");
const router = express.Router();
const { Client, Panier, Produit, Panier_detail } = require("../models");
const  {Op } = require("sequelize")
let bcrypt = require("bcryptjs");
const { ACTIF } = require("../helpers/utils_const");
router.get("/", (req, res, next) => {
  res.locals.titre = "inscription";
  res.render("inscription/index");
});
router.post("/", async (req, res, next) => {
  var { tit_id, cli_nom, cli_prenom, cli_mail, cli_pwd, panier_items } =
    req.body;
  tit_id = tit_id === "M" ? M : MME;
  try {
    if (
      cli_nom === "" ||
      cli_prenom === "" ||
      cli_mail === "" ||
      cli_pwd === ""
    ) {
      return res.json({
        error: true,
        errorMsg: "Veillez remplir tout les champs",
      });
    }
    const oldClient = await Client.findOne({
      where: { cli_mail },
    });
    if (oldClient) {
      return res.status(409).json({
        error: true,
        errorMsg: "Un utilisateur existe déjà avec ce mail",
      });
    }
    pwdhashed = await bcrypt.hash(cli_pwd, 10);
    let client = await Client.create({
      tit_id,
      cli_nom,
      cli_prenom,
      cli_mail,
      cli_pwd: pwdhashed,
    });

    //create for client panier
    let oldPanier = await Panier.findOne({ where: { cli_id: client.cli_id } });
    if (oldPanier) {
      return res.status(409).json({ msg: "vous avez un panier" });
    }
    let panier = await Panier.create({
      cli_id: client.cli_id,
    });

    // add in panier_detail
    // panier_items.forEach(async (item) => {
    //   let produit = await Produit.findByPk(item.pro_id, {
    //     include: [
    //       {
    //         model: Tarif,
    //         attributes: ["tar_ttc", "tar_id", "tar_ht"],
    //         where: {
    //           [Op.and]: [
    //             {
    //               pro_id: item.pro_id,
    //             },
    //             {
    //               tar_statut: ACTIF,
    //             },
    //           ],
    //         },
    //       },
    //     ],
    //   });
       
    //   res.json({produit})
    //   // insérer dans panier_details
    //   // let panier_detail = await Panier_detail.create({
    //   //   pro_id: produit.pro_id,
    //   //   tar_id: produit.Tarifs[0].tar_id,
    //   //   pan_id: panier.pan_id,
    //   //   pad_qte: item.pad_qte,
    //   //   pad_ht: produit.Tarifs[0].tar_ht,
    //   // });
    //   res.json({ panier_detail:panier_detail});
    // });

    req.session.panierId = panier.pan_id;
    req.session.userId = client.cli_id;
    res.locals.user = client;
    res.redirect(301, `/mon-compte`);
  } catch (error) {
    res.status(500).render("error/serverError", {
      error: true,
      errorMsg: "Une erreur est survenue!",
      detailError: error,
    });
  }
});

module.exports = router;
