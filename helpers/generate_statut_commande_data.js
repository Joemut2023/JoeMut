const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
var results = [];
const db = require("../models");
const { Statut_commande } = require("../models");
fs.createReadStream(path.resolve(__dirname, "../datas/statut_commande.csv"))
  .pipe(csv({ separator: "\n", headers: ["statut"] }))
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", () => {
    //results.shift();
    results.map(async (data) => {
      await Statut_commande.create({
        stc_id:parseInt(data.statut.split(";")[0]),
        stc_libelle: data.statut.split(";")[1],
        stc_actif: parseInt(data.statut.split(";")[2]),
      });
    });
    // console.log(results[0].titre.split(";"));
  });
