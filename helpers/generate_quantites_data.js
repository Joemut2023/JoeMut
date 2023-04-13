const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
var results = [];
const { Quantite } = require("../models");
fs.createReadStream(path.resolve(__dirname, "../datas/quantite.csv"))
    .pipe(csv({ separator: "\n", headers: ["quantite"] }))
    .on("data", (data) => {
        results.push(data);
    })
    .on("end", () => {
        results.shift();
        results.map(async (data) => {

            await Quantite.create({
                tai_id: parseInt(data.quantite.split(";")[0]),
                pro_id: parseInt(data.quantite.split(";")[1]),
                qua_nbre: parseInt(data.quantite.split(";")[2]),

            });
            // console.log(data.taille.split(";")[0]);
        });
    });
