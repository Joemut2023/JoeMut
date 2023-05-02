const express = require("express");
const router = express.Router();
const { Frais_port, Mode_liv_essayage, Mode_liv_spectacle } = require("../../models");
const { PAGINATION_LIMIT } = require("../../helpers/utils_const");

router.get("/", async (req, res) => {
    const mle_id = req.query.mle_id
    const mls_id = req.query.mls_id

    try {

        const essayage = await Mode_liv_essayage.findByPk(mle_id)
        const spectacle = await Mode_liv_spectacle.findByPk(mls_id)
        const fraisPort = await Frais_port.findAll()

        res.render("fraisPort/index", {
            fraisPort,
            essayage,
            spectacle,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).render("fraisPort/index", {
            message: 'Une erreur est survenue lors de la récupération des types de catégories.',
            error,
            success: false
        }
        );
    }

})

module.exports = router