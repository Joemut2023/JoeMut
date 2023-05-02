const express = require("express");
const router = express.Router();
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
    res.status(500).render("factures/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

module.exports = router;
