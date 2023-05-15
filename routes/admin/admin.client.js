const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { Client, Titre } = require("../../models");
const moment = require("moment");
const { PAGINATION_LIMIT_ADMIN } = require("../../helpers/utils_const");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");
router.get("/", async (req, res) => {
  let { page, start, end } = check_admin_paginate_value(req);
  try {
    const clients = await Client.findAll({
      offset: start,
      limit: PAGINATION_LIMIT_ADMIN,
      include: [{ model: Titre, attributes: ["tit_libelle"] }],
    });
    const AllClients = await Client.findAll();
    let nbrPages = Math.ceil(AllClients.length / PAGINATION_LIMIT_ADMIN);
    res.render("client/index", {
      clients,
      nbrPages,
      pageActive: page,
      start,
      end,
      moment,
      produitsNbr: AllClients.length,
    });
  } catch (error) {
    res.status(500).render("client/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.post("/delete", async (req, res) => {
  const cli_id = req.body.cli_id;
  try {
    await Client.destroy({ where: { cli_id } });
    res.redirect("/admin/clients");
  } catch (error) {
    res.status(500).render("client/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.get("/add", async (req, res) => {
  try {
    const titres = await Titre.findAll();
    res.render("client/addClient", { titres });
  } catch (error) {
    res.status(500).render("client/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.post("/add", async (req, res) => {
  const {
    cli_prenom,
    cli_nom,
    cli_pwd,
    cli_mail,
    cli_activation,
    tit_id,
    cli_newsletter,
    cli_partenaire,
    cli_fonction,
    cli_num,
  } = req.body;
  const cli_inscription = new Date(new Date().setDate(new Date().getDate()));
  try {
    const titres = await Titre.findAll();
    if (tit_id == "Sélectionner le titre") {
      const errorMsg = "Veillez sélectionner le titre!";
      return res.render("client/addClient", { errorMsg, titres });
    }
    const oldClient = await Client.findOne({ where: { cli_mail } });
    if (oldClient !== null) {
      const errorMsg = "cet utilisateur existe déjà";
      return res.render("client/addClient", { errorMsg, titres });
    }
    const pwd = await bcrypt.hash(cli_pwd, 10);
    const newClient = await Client.create({
      cli_prenom,
      cli_nom,
      cli_pwd: pwd,
      cli_mail,
      cli_activation,
      tit_id,
      cli_num,
      cli_fonction,
      cli_activation,
      cli_newsletter,
      cli_inscription,
      cli_partenaire,
    });
    if (newClient) {
      const succesMsg = "nouveau utilisateur créé et enregistré avec succès";
      return res.render("client/addClient", { titres, succesMsg });
    }
  } catch (error) {
    res.status(500).render("client/addClient", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

router.get("/update", async (req, res) => {
  const cli_id = req.query.cli_id;
  try {
    const titres = await Titre.findAll();
    const clients = await Client.findOne({ where: { cli_id } });
    res.render("client/updateClient", { titres, clients });
  } catch (error) {
    res.status(500).render("client/updateClient", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.post("/update", async (req, res) => {
  const {
    cli_prenom,
    cli_nom,
    cli_num,
    cli_pwd,
    cli_mail,
    cli_activation,
    tit_id,
    cli_newsletter,
    cli_id,
    cli_partenaire,
    cli_fonction,
  } = req.body;
  const activate = cli_activation == undefined ? false : cli_activation;
  const partenaire = cli_partenaire == undefined ? false : cli_partenaire;
  const newslletter = cli_newsletter == undefined ? false : cli_newsletter;
  const pwdhashed = cli_pwd ? await bcrypt.hash(cli_pwd, 10) : null;
  try {
    const titres = await Titre.findAll();
    let clients = await Client.findOne({ where: { cli_id } });
    if (tit_id == "Sélectionner le titre") {
      const nothingMsg = "Veillez sélectionner le titre!";
      return res.render("client/updateClient", { titres, clients, nothingMsg });
    }
    const update = await Client.update(
      {
        cli_prenom,
        cli_nom,
        cli_num,
        cli_pwd: pwdhashed,
        cli_mail,
        cli_activation: activate,
        tit_id,
        cli_newsletter: newslletter,
        cli_partenaire: partenaire,
        cli_fonction,
      },

      { where: { cli_id } }
    );
    clients = await Client.findOne({ where: { cli_id } });
    if (update[0] == 1) {
      const succesMsg = "les informations ont été mises à jour avec succès";
      return res.render("client/updateClient", { titres, clients, succesMsg });
    }
    const nothingMsg = "aucune nouvelle information trouvée ";
    res.render("client/updateClient", { titres, clients, nothingMsg });
  } catch (error) {
    res.status(500).render("client/updateClient", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

module.exports = router;
