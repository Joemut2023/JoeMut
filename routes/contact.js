var express = require("express");
var router = express.Router();

/* GET creation. */
router.get("/", function (req, res, next) {
  res.render("default/contact");
});

module.exports = router;
