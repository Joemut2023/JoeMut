var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.locals.titre = "mail";
  res.render("mail/index");
});

module.exports = router;
