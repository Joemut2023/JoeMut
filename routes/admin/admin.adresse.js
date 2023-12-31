const express = require("express");
const router = express.Router();
const { Adresse, Client } = require("../../models");
const Logger = require("../../helpers/Logger");

router.get("/", async (req, res) => {
  const { cli_id } = req.query;
  try {
    const adresses = await Adresse.findAll({ where: { cli_id } });
    res.render("adresses/index", {
      adresses,
      cli_id,
    });
  } catch (error) {
    Logger.error(error.stack);
    res.status(500).render("addresses/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

router.get("/add/:id", async (req, res) => {
  const clients = await Client.findOne({
    where: { cli_id: req.params.id },
  });
  res.render("adresses/ajoutAdresse", { clients });
});

router.post("/add/:id", async (req, res) => {
  const id = req.params.id;
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
  } = req.body;
  try {
    const clients = await Client.findOne({
      where: { cli_id: id },
    });

    await Adresse.create({
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
      cli_id: clients.cli_id,
    });

    //res.render("adresses/index", { clients: clients });
    res.redirect(`/admin/adresse/?cli_id=${clients.cli_id}`);
  } catch (error) {
    Logger.error(error.stack);
    return res.render("adresses/ajoutAdresse", {
      message: "Erreur interne du serveur",
    });
  }
});

router.get("/edit/:id", async (req, res) => {
  const adresses = await Adresse.findOne({
    where: { adr_id: req.params.id },
  });
  const clients = await Client.findOne({
    where: { cli_id: adresses.cli_id },
  });
  res.render("adresses/editAdresse", { clients: clients, adresses: adresses });
});

router.post("/edit/:id", async (req, res) => {
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
  } = req.body;
  try {
    const adresses = await Adresse.findOne({
      where: { adr_id: req.params.id },
    });
    const clients = await Client.findOne({
      where: { cli_id: adresses.cli_id },
    });

    await Adresse.update(
      {
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
        // adr_id : req.params.id,
      },
      {
        where: {
          adr_id: req.params.id,
        },
      }
    );
    return res.redirect(`/admin/adresse/?cli_id=${clients.cli_id}`);
  } catch (error) {
    Logger.error(error.stack);
    return res.render("adresses/editAdresse", {
      message: "Erreur interne du serveur",
    });
  }
});

router.get("/byAjax/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let adresse = await Adresse.findOne({
      where: { adr_id: id },
    });
    if (!adresse) {
      res.status(501).json("aucune adresse");
    } else {
      res.status(200).json(adresse);
    }
  } catch (error) {
    Logger.error(error.stack);
    res.json(error);
  }
});
router.post("/update-from-commande", async (req, res) => {
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
    com_id,
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
  } catch (error) {
    Logger.error(error.stack);
    res.redirect(`/admin/devis/view/${com_id}`);
  }
});
module.exports = router;
