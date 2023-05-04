const express = require("express");
const router = express.Router();
const { Adresse } = require("../../models");
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

// post
router.get("/add", async (req, res) => {
  res.render("adresses/ajoutAdresse")
})

module.exports = router;
