const express = require("express");
const router = express.Router();
const { Type_categorie, Categorie } = require("../../models");
const { PAGINATION_LIMIT } = require("../../helpers/utils_const");

router.get("/", async (req, res) => {

    try {
        const listeType = await Type_categorie.findAll({
            // include: [{
            //     model: Categorie,
            //     where: { cat_id: Sequelize.col('tyc_id') }
            // }]
        });

        res.render("categories/index", {
            listeType,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).render("categories/index",
            { message: 'Une erreur est survenue lors de la récupération des types de catégories.', error }
        );
    }

})

module.exports = router