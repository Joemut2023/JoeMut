var express = require("express");
var router = express.Router();

router.get("/:id", (req, res, next) => {
  res.render("panier/index");
});

module.exports = router;
 