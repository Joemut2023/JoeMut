const express = require("express");
const { M, MME } = require("../helpers/titre");
const router = express.Router();
const { Client } = require("../models");
let bcrypt = require("bcryptjs");
router.get("/", (req, res, next) => {
  res.locals.titre = "inscription";
  res.render("inscription/index");
});
router.post("/", async (req, res, next) => {
  var { tit_id, cli_nom, cli_prenom, cli_mail, cli_pwd } = req.body;
  tit_id = tit_id === "M" ? M : MME;

  try {
    if (
      cli_nom === "" ||
      cli_prenom === "" ||
      cli_mail === "" ||
      cli_pwd === ""
    ) {
      return res.render("inscription/index", {
        error: true,
        errorMsg: "Veillez remplir tout les champs",
      });
    }
    const oldClient = await Client.findOne({
      where: { cli_mail },
    });
    if (oldClient) {
      return res.status(409).render("inscription/index", {
        error: true,
        errorMsg: "Un utilisateur existe déjà avec ce mail",
      });
    }
    pwdhashed = await bcrypt.hash(cli_pwd, 10);
    let client = await Client.create({
      tit_id,
      cli_nom,
      cli_prenom,
      cli_mail,
      cli_pwd: pwdhashed,
    });
    req.session.userId = client.cli_id;
    res.locals.user = client;
    res.redirect(301, `/mon-compte`);
  } catch (error) {
    res.render("inscription/index", {
      error: true,
      errorMsg: "Une erreur est survenue!",
    });
  }
});

module.exports = router;
