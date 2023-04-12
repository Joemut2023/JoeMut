var express = require("express");
var router = express.Router();
const { Adresse } = require("../models");
/* GET users listing. */
router.get("/", async (req, res, next) => {
  res.locals.titre = "mon_compte";
  res.render("users/index");
});
router.get("/identite", function (req, res, next) {
  res.locals.titre = "identite";
  res.render("users/identite");
});

router.get("/nouvelleAdresse", function (req, res, next) {
  res.locals.titre = "nouvelle adresse";
  res.render("users/nouvelleAdresse");
});

router.get("/adresses", async function (req, res, next) {
  try {
    const getAdresses = await Adresse.findAll({
      where: {
        cli_id: req.session.userId,
      },
    });
    // res.json({getAdresses})
    return res.render("users/adresses", {
      getAdresses,
    });
  } catch (error) {
    error = "une erreur est survenue";
    return res.render("users/adresses", {
      error,
    });
  }
});

router.post("/nouvelleAdresse", async (req, res) => {
  res.locals.titre = "nouvelle adresse";
  let error, success;
  const {
    adr_structure,
    adr_nom,
    adr_prenom,
    adr_societe,
    adr_adresse,
    adr_comp,
    adr_cp,
    adr_ville,
    adr_num_tva,
    adr_phone,
    adr_pays,
  } = req.body;
  const chekInput = (input) => {
    return input !== "" ? true : false;
  };
  if (
    chekInput(adr_nom) &&
    chekInput(adr_prenom) &&
    chekInput(adr_adresse) &&
    chekInput(adr_cp) &&
    chekInput(adr_ville) &&
    chekInput(adr_pays)
  ) {
    try {
      let adresse = Adresse.create({
        ...req.body,
        cli_id: req.session.userId,
      });
      if (adresse) {
        success = "Adresse ajouté!";
        return res.render("users/nouvelleAdresse", { success });
      }
    } catch (err) {
      error = "Erreur interne du serveur";
      return res.render("users/nouvelleAdresse", {
        error,
      });
    }
  } else {
    error = "Veillez remplir tout les champs obligatoire";
    return res.render("users/nouvelleAdresse", {
      error,
    });
  }
});
router.get("/donnee", function (req, res, next) {
  res.locals.titre = "informations";
  res.render("users/donnee");
});
router.get("/historique", function (req, res, next) {
  res.locals.titre = "historique";
  res.render("users/historique");
});
router.get("/reduction", function (req, res, next) {
  res.locals.titre = "reduction";
  res.render("users/reduction");
});
router.get("/avoirs", function (req, res, next) {
  res.locals.titre = "avoirs";
  res.render("users/avoirs");
});
router.get("/adresses", function (req, res, next) {
  res.locals.titre = "adresse";
  res.render("users/adresses");
});
router.get("/alert", function (req, res, next) {
  res.locals.titre = "alert";
  res.render("users/alert");
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  delete res.locals.user;
  res.redirect("/");
});

module.exports = router;
