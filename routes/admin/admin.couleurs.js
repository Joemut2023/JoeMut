const express = require("express");
const router = express.Router();
const { Couleur } = require("../../models");
const { PAGINATION_LIMIT_ADMIN } = require("../../helpers/utils_const");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");
router.get("/", async (req, res) => {
  let { page, start, end } = check_admin_paginate_value(req);
  try {
    const AllCouleurs = await Couleur.findAll();
    const Couleurs = await Couleur.findAll({
      offset: start,
      limit: PAGINATION_LIMIT_ADMIN,
    });
    let nbrPages = Math.ceil(AllCouleurs.length / PAGINATION_LIMIT_ADMIN);
    res.render("couleurs/index", {
      Couleurs,
      nbrPages,
      pageActive: page,
      start,
      end,
      taillesNbr: AllCouleurs.length,
    });
  } catch (error) {
    res.status(500).render("article/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

module.exports = router;
