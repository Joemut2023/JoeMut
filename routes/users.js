var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  res.render("users/index");
});

router.get("/identite", function (req, res, next) {
  res.render("users/identite");
});

router.get("/nouvelleAdresse", function (req, res, next) {
  res.render("users/nouvelleAdresse");
});

router.get("/donnee", function (req, res, next) {
  res.render("users/donnee");
});
router.get("/historique", function (req, res, next) {
  res.render("users/historique");
});
router.get("/reduction", function (req, res, next) {
  res.render("users/reduction");
});
router.get("/adresses", function (req, res, next) {
  res.render("users/adresses");
});

module.exports = router;
