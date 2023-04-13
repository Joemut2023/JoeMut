var express = require("express");
var router = express.Router();


router.get("/", async (req, res, next) => {
    res.locals.titre = "error";
    res.render("error/serverError");
})

module.exports = router;
