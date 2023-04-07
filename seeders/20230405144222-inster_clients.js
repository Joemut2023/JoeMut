"use strict";
// import fs from "fs";
// import csv from "csv-parser";
// import path from "path";
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const { MME, M } = require("../helpers/titre");
let results = ["erre"];

// const getClients = (path) => {
//   try {
//     fs.createReadStream(path)
//       .pipe(
//         csv({ separator: "\n", headers: ["titre", "prenom", "nom", "email"] })
//       )
//       .on("data", (data) => {
//         var results ;
//         results.push(data);
//         // console.log(results);
//       })
//       .on("end", () => {
//         console.log("CSV file successfully processed");
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// getClients(path.resolve(__dirname, "../datas/customers.csv"));

// console.log(results.length);




fs.createReadStream(path.resolve(__dirname, "../datas/customers.csv"))
      .pipe(
        csv({ separator: "\n", headers: ["titre", "prenom", "nom", "email"] })
      )
      .on("data", (data) => {
        results.push(data);
        console.log(results);
      })
      .on("end", () => {
        
       
    
      });

//  console.log(results);
 
/** @type {import('sequelize-cli').Migration} */
            module.exports = {
          async up(queryInterface, Sequelize){
                     results.shift();
        await queryInterface.bulkInsert("Clients", [
          results.map((client) => {
            return {
              tit_id: client.titre.split(";")[0] === "Mme" ? MME : M,
              cli_prenom: client.titre.split(";")[1],
              cli_nom: client.titre.split(";")[2],
              cli_mail: client.titre.split(";")[3],
            };
          }),
        ]);

              },
              async down(queryInterface, Sequelize){

              }
            }


