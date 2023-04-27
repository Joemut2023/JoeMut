const express = require("express");
const router = express.Router();
const { Taille } = require("../../models");
<<<<<<< HEAD
const { PAGINATION_LIMIT_ADMIN } = require("../../helpers/utils_const");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");
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
=======
router.get("/", async (req, res) => {
  try {
    const tailles = await Taille.findAll();
    res.render("tailles/index", {
      tailles,
>>>>>>> rebase/Develop
    });
    // return res.status(200).json({ produits, quantiteOfEachProduct });
  } catch (error) {
    res.status(500).render("article/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
    console.log(error);
  }
});

module.exports = router;
