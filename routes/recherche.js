var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.locals.titre = "recherche";
  res.render("recherche/index");
});

module.exports = router;
