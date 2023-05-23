const { Type_categorie } = require("../models");
const { PETITS, ACCESSOIRES, MOYENS, GRANDS } = require("./type_categories");

(async()=>{
    await Type_categorie.update({
        tyc_ordre:3
    },{where:{tyc_id:GRANDS}});
    await Type_categorie.update({
        tyc_ordre:2
    },{where:{tyc_id:MOYENS}})

    await Type_categorie.update({
        tyc_ordre:1
    },{where:{tyc_id:PETITS}})

    await Type_categorie.update({
        tyc_ordre:4
    },{where:{tyc_id:ACCESSOIRES}})
})();