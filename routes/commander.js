const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.locals.titre = "commander";
  res.render("../views/commander");
});
module.exports = router;
