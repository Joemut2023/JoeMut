var express = require("express");
var router = express.Router();


router.get("/", (req, res, next) => {
    res.locals.titre = "devis";
    res.render("mail/devis", {});
});

module.exports = router;