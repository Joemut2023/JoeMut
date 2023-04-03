var express = require("express");
var router = express.Router();

/* GET creation. */
router.get("/", function (req, res, next) {
  res.render("moncompte/donnee");
});

module.exports = router;
