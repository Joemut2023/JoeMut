var express = require("express");
var router = express.Router();

router.get("/", async (req, res, next) => {
    res.render("devis/index")

})

module.exports = router;