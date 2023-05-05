const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { Promo } = require("../../models");
const { PAGINATION_LIMIT_ADMIN } = require("../../helpers/utils_const");
const check_admin_paginate_value = require("../../helpers/check_admin_paginate_value");

router.get("/", async (req, res) => {
  try {
    const promos = await Promo.findAll();
    res.render("promo/index", { promos });
  } catch (error) {
    res.status(500).render("promo/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.get("/add", async (req, res) => {
  try {
    // const promos = await Promo.findAll();
    res.render("promo/add");
  } catch (error) {
    res.status(500).render("promo/add", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
router.post("/add", async (req, res) => {
  console.log(req.body);
  try {
    // const promos = await Promo.findAll();
    res.render("promo/add");
  } catch (error) {
    res.status(500).render("promo/add", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

module.exports = router;
