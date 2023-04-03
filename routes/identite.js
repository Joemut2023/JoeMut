var express = require("express");
var router = express.Router();

/* GET creation. */
router.get("/", function (req, res, next) {
  res.render("moncompte/identite");
});

module.exports = router;
