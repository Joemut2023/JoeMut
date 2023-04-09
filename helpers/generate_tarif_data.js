const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
var results = [];
const db = require("../models");
const {Tarif} = require("../models");
const tarif = require("../models/tarif");
fs.createReadStream(path.resolve(__dirname, "../datas/tarif.csv"))
  .pipe(csv({ separator: "\n", headers: ["tarif"] }))
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", () => {
    results.map(async (element) => {
        let tarif = element.tarif.split(';')
        await Tarif.create({
            tar_id:parseInt(tarif[0]),
            pro_id:parseInt(tarif[1]),
            tar_ht:parseFloat(tarif[2]),
            tar_ttc:parseFloat(tarif[3]),
            tar_debut:Date.parse(tarif[4]),
            tar_statut:parseInt(tarif[6]),
        });
    });
    
  });