var express = require("express");
var router = express.Router();
const { Frais_port } = require("../models");
const Logger = require("../helpers/Logger");

router.get("/", async (req, res) => {
  try {
    const fraisPort = await Frais_port.findOne({
      where: { frp_default: true },
    });
    return res.json(fraisPort);
  } catch (error) { }
  Logger.error("/fraisPort : " + error.stack);
});




module.exports = router;
