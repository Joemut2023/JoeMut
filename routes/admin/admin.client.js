const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const {
  Client,
  Titre,
  Commande,
  Panier,
  Adresse,
  Frais_port,
} = require("../../models");
const moment = require("moment");
const { PAGINATION_LIMIT_ADMIN } = require("../../helpers/utils_const");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");
router.get("/", async (req, res) => {
  let orderby = req.query.orderby;
  let { page, start, end } = check_admin_paginate_value(req);
  let orderCondition;
  let choix;
  let searchType = true;
  if (orderby === "NAàZ") {
    orderCondition = [["cli_nom", "ASC"]];
    choix = "Nom, A à Z";
  } else if (orderby === "NZàA") {
    orderCondition = [["cli_nom", "DESC"]];
    choix = "Nom, Z à A";
  } else if (orderby === "PAàZ") {
    orderCondition = [["cli_prenom", "ASC"]];
    choix = "Prénom, A à Z";
  } else if (orderby === "PZàN") {
    orderCondition = [["cli_prenom", "DESC"]];
    choix = "Prénom, Z à A";
  } else if (orderby === "DC") {
    orderCondition = [["cli_inscription", "ASC"]];
    choix = "Date d'inscription, croissante";
  } else if (orderby === "DD") {
    orderCondition = [["cli_inscription", "DESC"]];
    choix = "Date d'inscription, décroissante";
    orderCondition = [["cli_activation", "DESC"]];
    choix = "Client inactif";
  } else {
    orderCondition = [["cli_id", "ASC"]];
    choix = "Choisir";
  }

  try {
    const AllClients = await Client.findAll();
    const titres = await Titre.findAll();
    let nbrPages = Math.ceil(AllClients.length / PAGINATION_LIMIT_ADMIN);
    const clients = await Client.findAll({
      offset: start,
      limit: PAGINATION_LIMIT_ADMIN,
      include: [{ model: Titre, attributes: ["tit_libelle"] }],
      order: orderCondition,
    });

    res.render("client/index", {
      clients,
      titres,
      nbrPages,
      pageActive: page,
      start,
      end,
      moment,
      orderby,
      choix: choix,
      searchType,
      clientsNbr: AllClients.length,
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
      cli_activation: cli_activation ? cli_activation : false,
      cli_newsletter: cli_newsletter ? cli_newsletter : false,
      cli_inscription,
      cli_partenaire: cli_partenaire ? cli_partenaire : false,
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
    const clients = await Client.findOne({
      where: { cli_id },
    });
    res.render("client/updateClient", { titres, clients });
  } catch (error) {
    res.status(500).render("client/updateClient", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.post("/update", async (req, res) => {
  let {
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
      tit_id = clients.tit_id;
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
router.post("/updateByCheckbox", async (req, res) => {
  let { cli_activation, cli_newsletter, cli_partenaire, cli_id } =
    req.body.data;
  console.log(cli_id, "body", typeof cli_activation);
  try {
    const update = await Client.update(
      {
        cli_activation,
        cli_newsletter,
        cli_partenaire,
      },
      { where: { cli_id } }
    );
    console.log(update, "update");
    if (update[0] == 1) {
      return res
        .status(200)
        .send("les informations ont été mises à jour avec succès");
    }
    return res.status(200).send("requette echouée");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
router.get("/search", async (req, res) => {
  let choix;
  let clients;
  try {
    const titres = await Titre.findAll();
    if (req.query.cli_prenom) {
      clients = await Client.findAll({
        include: [{ model: Titre, attributes: ["tit_libelle"] }],
        where: { cli_prenom: { [Op.substring]: req.query.cli_prenom } },
      });
      return res.render("client/index", {
        clients,
        titres,
        moment,
        choix: choix,
        clientsNbr: clients.length,
      });
    } else if (req.query.cli_id) {
      clients = await Client.findAll({
        include: [{ model: Titre, attributes: ["tit_libelle"] }],
        where: { cli_id: req.query.cli_id },
      });
      return res.render("client/index", {
        clients,
        titres,
        moment,
        choix: choix,
        clientsNbr: clients.length,
      });
    } else if (req.query.cli_nom) {
      clients = await Client.findAll({
        include: [{ model: Titre, attributes: ["tit_libelle"] }],
        where: { cli_nom: { [Op.substring]: req.query.cli_nom } },
      });
      return res.render("client/index", {
        clients,
        titres,
        moment,
        choix: choix,
        clientsNbr: clients.length,
      });
    } else if (req.query.cli_num) {
      clients = await Client.findAll({
        include: [{ model: Titre, attributes: ["tit_libelle"] }],
        where: { cli_num: { [Op.substring]: req.query.cli_num } },
      });
      return res.render("client/index", {
        clients,
        titres,
        moment,
        choix: choix,
        clientsNbr: clients.length,
      });
    } else if (req.query.cli_mail) {
      clients = await Client.findAll({
        include: [{ model: Titre, attributes: ["tit_libelle"] }],
        where: { cli_mail: { [Op.substring]: req.query.cli_mail } },
      });
      return res.render("client/index", {
        clients,
        titres,
        moment,
        choix: choix,
        clientsNbr: clients.length,
      });
    } else if (req.query.tit_id) {
      clients = await Client.findAll({
        include: [{ model: Titre, attributes: ["tit_libelle"] }],
        where: { tit_id: req.query.tit_id },
      });
      return res.render("client/index", {
        clients,
        titres,
        moment,
        choix: choix,
        clientsNbr: clients.length,
      });
    } else if (req.query.cli_activation) {
      const activate = req.query.cli_activation == "true" ? true : false;
      clients = await Client.findAll({
        include: [{ model: Titre, attributes: ["tit_libelle"] }],
        where: { cli_activation: activate },
      });
      return res.render("client/index", {
        clients,
        titres,
        moment,
        choix: choix,
        clientsNbr: clients.length,
      });
    } else if (req.query.cli_newsletter) {
      const newsletter = req.query.cli_newsletter == "true" ? true : false;
      clients = await Client.findAll({
        include: [{ model: Titre, attributes: ["tit_libelle"] }],
        where: { cli_newsletter: newsletter },
      });
      return res.render("client/index", {
        clients,
        titres,
        moment,
        choix: choix,
        clientsNbr: clients.length,
      });
    } else if (req.query.cli_partenaire) {
      const partenaire = req.query.cli_partenaire == "true" ? true : false;
      clients = await Client.findAll({
        include: [{ model: Titre, attributes: ["tit_libelle"] }],
        where: { cli_partenaire: partenaire },
      });
      return res.render("client/index", {
        clients,
        titres,
        moment,
        choix: choix,
        clientsNbr: clients.length,
      });
    } else if (req.query.cli_debut <= req.query.cli_fin) {
      clients = await Client.findAll({
        include: [{ model: Titre, attributes: ["tit_libelle"] }],
        where: {
          cli_inscription: {
            [Op.between]: [req.query.cli_debut, req.query.cli_fin],
          },
        },
      });
      return res.render("client/index", {
        clients,
        titres,
        moment,
        choix: choix,
        clientsNbr: clients.length,
      });
    }
  } catch (error) {
    res.status(500).render("client/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

router.get("/infos", async (req, res) => {
  const cli_id = req.query.cli_id;
  let totalCommandes = 0;
  try {
    const clients = await Client.findOne({
      include: [{ model: Titre, attributes: ["tit_libelle"] }],
      where: { cli_id },
    });
    const commandes = await Commande.findAll({
      include: [{ model: Frais_port, attributes: ["frp_libelle"] }],
      where: { cli_id },
    });
    const paniers = await Panier.findAll({ where: { cli_id } });
    const adresses = await Adresse.findAll({ where: { cli_id } });
    commandes.map((element) => {
      totalCommandes = element.com_ttc;
    });
    res.render("client/details", {
      clients,
      commandes,
      paniers,
      adresses,
      moment,
      totalCommandes,
    });
  } catch (error) {
    res.status(500).render("client/details", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

module.exports = router;
