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
      await Frais_port.create({
        mle_id: parseInt(data.frais.split(";")[1]),
        mls_id: parseInt(data.frais.split(";")[2]),
        frp_libelle: data.frais.split(";")[3],
        frp_description: data.frais.split(";")[4],
        frp_img: data.frais.split(";")[5],
        frp_ht: parseFloat(data.frais.split(";")[6].replace(",", ".")),
        frp_ttc: parseFloat(data.frais.split(";")[7].replace(",", ".")),
        // frp_debut: data.frais.split(";")[9],
        // frp_fin: data.frais.split(";")[8],
        frp_activ: parseInt(data.frais.split(";")[10]),
        frp_default: parseInt(data.frais.split(";")[11]),
      });
      //   console.log(data.frais.split(";")[8]);
    });

    // console.log(results[1].frais.split(";"));
  });
