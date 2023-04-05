"use strict";
import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { QueryInterface } from "sequelize";
const { MME, M } = require("../helpers/titre");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert("Clients", [
    //   {
    //     tit_id: M,
    //     cli_prenom: "trigo",
    //     cli_nom: "yod",
    //     cli_mail: "fdfd@gmail.com",
    //   },
    // ]);
    await QueryInterface
    let i = 0;
    var results = [];
    fs.createReadStream(path.resolve(__dirname, "../datas/customers.csv"))
      .pipe(
        csv({ separator: "\n", headers: ["titre", "prenom", "nom", "email"] })
      )
      .on("data", (data) => {
        results.push(data);
        console.log(results);
        i++;
      })
      .on("end", async () => {
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
      });
    // .o
    console.log(i);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
