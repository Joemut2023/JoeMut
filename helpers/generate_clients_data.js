const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
var results = [];
const db = require("../models");
const { Client } = require("../models");
fs.createReadStream(path.resolve(__dirname, "../datas/customers.csv"))
  .pipe(csv({ separator: "\n", headers: ["titre", "prenom", "nom", "email"] }))
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", () => {
    results.shift();
    results.map(async (element) => {
      await Client.create({
        tit_id: parseInt(element.titre.split(";")[0]),
        cli_prenom: element.titre.split(";")[1],
        cli_nom: element.titre.split(";")[2],
        cli_mail: element.titre.split(";")[3],
        cli_inscription: new Date(new Date().setDate(new Date().getDate())),
        cli_activation: true,
      });
    });
  });
