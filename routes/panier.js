var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.locals.titre = "panier";
  res.render("panier/index");
});

module.exports = router;
