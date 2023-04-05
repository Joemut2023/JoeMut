const fs = require("fs");
const csv = require("csv-parser");
const path = require('path');
let results = [];
fs.createReadStream(path.resolve(__dirname, '../datas/customers.csv'))
.pipe(csv({separator:"\n",headers:['titre','prenom','nom','email']}))
.on("data", (data) => { results.push(data)})
.on('end',()=>{
    results.map(element => {
        console.log(element.titre.split(";"));
    })
});
// .on('end',()=>{console.log(results[1].titre.split(';'));});

module.exports = results