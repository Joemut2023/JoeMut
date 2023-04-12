var express = require("express");
var router = express.Router();

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
