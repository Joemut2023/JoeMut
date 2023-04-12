const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
var results = [];
const db = require("../models");
const { Frais_port } = require("../models");
fs.createReadStream(path.resolve(__dirname, "../datas/frais_port.csv"))
  .pipe(csv({ separator: "\n", headers: ["frais"] }))
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", () => {
    results.shift();
    results.map(async (data) => {


      const debut = data.frais.split(";")[8];
      const dateArr = debut.split("-");
      const date_debut = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);

      const fin = data.frais.split(";")[9];
      const finArr = fin.split("-");
      const date_fin = new Date(finArr[0], finArr[1] - 1, finArr[2]);

      await Frais_port.create({
        mle_id: parseInt(data.frais.split(";")[1]),
        mls_id: parseInt(data.frais.split(";")[2]),
        frp_libelle: data.frais.split(";")[3],
        frp_description: data.frais.split(";")[4],
        frp_img: data.frais.split(";")[5],
        frp_ht: parseFloat(data.frais.split(";")[6].replace(",", ".")),
        frp_ttc: parseFloat(data.frais.split(";")[7].replace(",", ".")),
        frp_debut: date_debut,
        frp_fin: date_fin,
        frp_activ: parseInt(data.frais.split(";")[10]),
        frp_default: parseInt(data.frais.split(";")[11]),
      });
      //   console.log(data.frais.split(";")[8]);
    });
  });
