var express = require("express");
var router = express.Router();

/* GET creation. */
router.get("/", function (req, res, next) {
  res.locals.titre = "creation";
  res.render("default/creation");
});

module.exports = router;
