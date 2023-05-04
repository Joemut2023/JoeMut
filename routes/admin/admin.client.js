const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { Client, Titre } = require("../../models");
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
      produitsNbr: AllClients.length,
    });
  } catch (error) {
    res.status(500).render("client/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.delete("/", async (req, res) => {
  console.log(req.params, "params");
  console.log(req.query, "query");
  try {
    // const client = Client.destroy({ where: { cli_id } });
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
  } catch (error) {}
  res.status(500).render("client/index", {
    error: true,
    errorMsg: "une erreur est survenue ",
  });
});
router.post("/add", async (req, res) => {
  const { cli_prenom, cli_nom, cli_pwd, cli_mail, cli_activation, tit_id } =
    req.body;
  const data = req.body;

  try {
    const titres = await Titre.findAll();
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

module.exports = router;
