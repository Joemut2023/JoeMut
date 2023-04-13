var express = require("express");
var router = express.Router();


router.get("/", async (req, res, next) => {
    res.locals.titre = "error";
    res.render("error/serverError");
})
router.get("/404",async function (re,res){
    res.locals.titre = "error";
    res.render("error/404")
})
module.exports = router;
