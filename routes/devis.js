var express = require("express");
var router = express.Router();

router.get("/", async (req, res, next) => {
    res.render("devis/index")

})

module.exports = router;


// var express = require("express");
// var router = express.Router();
// const ejs = require("ejs");
// const fs = require("fs");
// const path = require("path");

// router.get("/", async (req, res, next) => {
//   console.log(req.session.commandeId);
//   let ejsdevis = fs.readFileSync(
//     path.join(__dirname, "../mailTemplate/devis.ejs"),
//     "utf8"
//   );
//   ejs.render(ejsdevis);
//   //res.render("devis/index");
// });

// module.exports = router;