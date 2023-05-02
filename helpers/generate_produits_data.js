const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
var results = [];
const db = require("../models");
const {Produit} = require("../models");
fs.createReadStream(path.resolve(__dirname, "../datas/produit.csv"))
  .pipe(csv({ separator: "\n", headers: ["produit"] }))
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", () => {
    results.map(async (element) => {
        let produit = element.produit.split(';')
        await Produit.create({
            pro_id:parseInt(produit[0]),
            cat_id:parseInt(produit[1]),
            pro_ref:produit[2],
            pro_libelle:produit[3],
            pro_details:produit[4],
            pro_new_collect:parseInt(produit[5]),
            pro_en_avant:parseInt(produit[6]),
            pro_comment:produit[7],
            pro_statut:1,
        });
    });
    
  });