const express = require("express");
const router = express.Router();
const { Taille } = require("../../models");
const { PAGINATION_LIMIT_ADMIN } = require("../../helpers/utils_const");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");

// router.get("/all", async (req, res) => {
//   try {
//     const taille = await Taille.findAll();
//     res.status(200).json(taille);
//   } catch (error) {}
// });

router.get("/", async (req, res) => {
  let { page, start, end } = check_admin_paginate_value(req);
  try {
    const Alltailles = await Taille.findAll();
    const tailles = await Taille.findAll({
      offset: start,
      limit: PAGINATION_LIMIT_ADMIN,
    });
    let nbrPages = Math.ceil(Alltailles.length / PAGINATION_LIMIT_ADMIN);
    res.render("tailles/index", {
      tailles,
      nbrPages,
      pageActive: page,
      start,
      end,
      taillesNbr: Alltailles.length,
    });
  } catch (error) {
    res.status(500).render("article/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

module.exports = router;
