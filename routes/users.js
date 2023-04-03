var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  res.render("users/index");
});

router.get("/identite", function (req, res, next) {
  res.render("users/identite");
});

router.get("/adresse", function (req, res, next) {
  res.render("users/adresse");
});

router.get("/donnee", function (req, res, next) {
  res.render("users/donnee");
});
router.get("/historique", function (req, res, next) {
  res.render("users/historique");
});
router.get("/bons", function (req, res, next) {
  res.render("users/bons");
});

module.exports = router;
