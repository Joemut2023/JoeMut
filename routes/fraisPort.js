var express = require("express");
var router = express.Router();
const { Frais_port } = require("../models");

router.get("/", async (req, res) => {
  try {
    const fraisPort = await Frais_port.findOne({
      where: { frp_default: true },
    });
    return res.json(fraisPort);
  } catch (error) {}
});

module.exports = router;
