const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
var results = [];
const db = require("../models");
const { Media } = require("../models");
fs.createReadStream(path.resolve(__dirname, "../datas/media.csv"))
  .pipe(csv({ separator: "\n", headers: ["titre"] }))
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", () => {
     results.shift();
     results.map(async(media)=>{
        await Media.create({
          pro_id: parseInt(media.titre.split(";")[1]),
          tym_id: parseInt(media.titre.split(";")[2]),
          med_libelle: media.titre.split(";")[3],
          med_ressource: media.titre.split(";")[4],
        });
     })
    // console.log(results[0].titre.split(";"));
    

     
  });
