const {Type_categorie,Categorie} = require('../models');
const getCategorie = async (req,res,next)=>{
    res.locals.titre = "Accueil"
    try {
        let type_categories = await Type_categorie.findAll({
            include:[{
                model:Categorie,
                attributes:[
                    'cat_id',
                    'cat_libelle'
                ]
            }]
        })
        if (type_categories.length === 0) {
            type_categories = []
        }
        res.locals = {
            type_categories:type_categories
        };
    } catch (error) {
        console.log(error);
    }
    next();
}
module.exports = getCategorie;