var express = require("express");
var router = express.Router();

router.get("/:id", (req, res, next) => {
  res.locals.titre = "article";
  res.render("article/index");
});

module.exports = router;
