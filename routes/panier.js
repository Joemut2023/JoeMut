var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.render("panier/index");
});

module.exports = router;
 