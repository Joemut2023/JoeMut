var express = require("express");
var router = express.Router();
const { Frais_port } = require("../models");

router.get("/", async (req, res) => {
  const FraisPort = await Frais_port.findOne({ where: { frp_default: true } });
  res.render("default/index", {
    FraisPort: FraisPort,
  });
});

module.exports = router;
