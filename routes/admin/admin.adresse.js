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
  let error, success;
  error = ""
  success = ""
  res.render("adresses/ajoutAdresse", {
    error,
    success
  });
});
router.post("/add", async (req, res) => {
  res.locals.titre = "nouvelle adresse";
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
    adr_pays,
  } = req.body;

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
      const { cli_id } = await Client.findOne({
        where: {
          cli_mail: cli_mail,
        },
      });

      let adresse = await Adresse.create({
        adr_structure: adr_structure,
        adr_nom: adr_nom,
        adr_prenom: adr_prenom,
        adr_societe: adr_societe,
        adr_adresse: adr_adresse,
        adr_comp: adr_comp,
        adr_cp: adr_cp,
        adr_ville: adr_ville,
        adr_num_tva: adr_num_tva,
        adr_phone: adr_phone,
        adr_pays: adr_pays,
        cli_id: cli_id,
      });

      if (adresse) {
        success = "Adresse ajouté!";
        res.redirect("/admin/adresse");
        // return res.render("adresses/ajoutAdresse", { success });
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
});
router.get('/byAjax/:id',async (req,res)=>{
  const {id} = req.params;
  try {
    let adresse = await Adresse.findOne({
      where:{adr_id:id}
    })
    if (!adresse) {
      res.status(501).json('aucune adresse');
    }else{
      res.status(200).json(adresse);
    }
  } catch (error) {
    res.json(error);
  }
})
router.post('/update-from-commande',async(req,res)=>{
  const {
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
    adr_pays,
    adr_id,
    com_id
  } = req.body;

  try {
    const updateAdresse = await Adresse.update(
      {
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
        adr_pays,
      },
      {
        where: {
          adr_id: adr_id,
        },
      }
    );
    res.redirect(`/admin/devis/view/${com_id}`);
  } catch (err) {
    res.redirect(`/admin/devis/view/${com_id}`);
  }
});
module.exports = router;
