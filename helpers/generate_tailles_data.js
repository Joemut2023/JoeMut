const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
var results = [];
const { Taille } = require("../models");
fs.createReadStream(path.resolve(__dirname, "../datas/taille.csv"))
  .pipe(csv({ separator: "\n", headers: ["taille"] }))
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", () => {
    results.map(async (element) => {
      let taille = element.taille.split(";");
      await Taille.create({
        tai_id: taille[0],
        tai_libelle: taille[1],
        tai_ordre: parseInt(taille[2]),
      });
    });
  });
