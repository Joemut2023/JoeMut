const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.locals.titre = "nouvelle collection";
  res.render("nouvelleCollection/index");
});
module.exports = router;
