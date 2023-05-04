const express = require("express");
const router = express.Router();
const { Adresse, Client } = require("../../models");
const { PAGINATION_LIMIT_ADMIN } = require("../../helpers/utils_const");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");

router.get("/", async (req, res) => {
  let { page, start, end } = check_admin_paginate_value(req);
  try {
    const adresses = await Adresse.findAll({
      offset: start,
      limit: PAGINATION_LIMIT_ADMIN,
    });
    const allAdresses = await Adresse.findAll();
    let nbrPages = Math.ceil(allAdresses.length / PAGINATION_LIMIT_ADMIN);
    res.render("adresses/index", {
      adresses,
      nbrPages,
      pageActive: page,
      start,
      end,
      produitsNbr: allAdresses.length,
    });
  } catch (error) {
    res.status(500).render("factures/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});


router.get("/add", async (req, res) => {
  res.render("adresses/ajoutAdresse")
})

router.post("/add", async (req, res)=>{
  res.locals.titre = "nouvelle adresse"
  let error, success

  const {
    cli_mail,  
    adr_structure,
    adr_nom,
    adr_prenom,
    adr_societe,
    adr_adresse,
    adr_comp,
    adr_cp,
    adr_ville,
    adr_num_tva,
    adr_phone,
    adr_pays} = req.body

    const chekInput = (input) => {
      return input !== "" ? true : false;
    };

    if (
      chekInput(cli_mail) &&
      chekInput(adr_nom) &&
      chekInput(adr_prenom) &&
      chekInput(adr_adresse) &&
      chekInput(adr_cp) &&
      chekInput(adr_ville) &&
      chekInput(adr_pays)
    ) {
      try {
        let cli_id_from_mail = Client.findOne({
          where: {
            cli_mail,
          },
        });

        let adresse = Adresse.create({
          ...req.body,
          cli_id: cli_id_from_mail,
        });

        if (adresse) {
          success = "Adresse ajouté!";
          return res.render("adresses/ajoutAdresse", { success });
        }
      } catch (err) {
        error = "Erreur interne du serveur";
        return res.render("adresses/ajoutAdresse", {
          error,
        });
      }
    } else {
      error = "Veillez remplir tout les champs obligatoire";
      return res.render("adresses/ajoutAdresse", {
        error,
      });
    }
})

module.exports = router;
