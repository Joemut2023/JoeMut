const express = require("express");
const router = express.Router();
const { Frais_port, Mode_liv_essayage, Mode_liv_spectacle } = require("../../models");
const { PAGINATION_LIMIT } = require("../../helpers/utils_const");
const Logger = require("../../helpers/Logger");

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
        Logger.error("/fraisPortBack : " + error.stack);
        res.status(500).render("fraisPort/index", {
            message: 'Une erreur est survenue lors de la récupération des types de catégories.',
            error,
            success: false
        }
        );
    }

})
// post 
router.get("/ajouter", (req, res) => {
    res.render("fraisPort/ajouter");
});

router.post("/ajouter", async (req, res) => {
    const { frp_debut, frp_fin, frp_actif, frp_default, frp_ht, frp_ttc, frp_libelle, frp_description } = req.body

    try {

        if (frp_debut == "" || frp_fin == "" || frp_actif == "" || frp_default == "" || frp_ht == "" || frp_ttc == "" || frp_libelle == "" || frp_description == "") {
            {
                return res.render("fraisPort/ajouter", {
                    error: true,
                    errorMsg: "Veillez remplir tout les champs",
                })
            }
        }


        const newFrais = await Frais_port.create({
            frp_debut: frp_debut,
            frp_fin: frp_fin,
            frp_actif: frp_actif,
            frp_default: frp_default,
            frp_ht: frp_ht,
            frp_ttc: frp_ttc,
            frp_libelle: frp_libelle,
            frp_description: frp_description
        })

        return res.redirect("/admin/frais-port")


    } catch (error) {
         Logger.error("/fraisPortBack : " + error.stack);
        return res.status(500).render("fraisPort/ajouter", {
            message: 'Une erreur est survenue lors de la récupération des types de catégories.',
            error,
            success: false
        }
        );
    }
})


router.get("/edit/:id", async function (req, res, next) {
    try {
        const fraisPortId = await Frais_port.findOne({
            where: {
                frp_id: req.params.id,
            },
        });
        return res.render("fraisPort/editer", {
            fraisPortId,
        });
    } catch (error) {
         Logger.error("/fraisPortBack : " + error.stack);
        error = "une erreur est survenue";
        return res.render("fraisPort/editer", {
            error,
        });
    }
});

router.post("/edit/:id", async (req, res) => {
    const { frp_debut, frp_fin, frp_actif, frp_default, frp_ht, frp_ttc, frp_libelle, frp_description } = req.body
    try {
        await Frais_port.update({
            frp_debut: frp_debut,
            frp_fin: frp_fin,
            frp_actif: frp_actif,
            frp_default: frp_default,
            frp_ht: frp_ht,
            frp_ttc: frp_ttc,
            frp_libelle: frp_libelle,
            frp_description: frp_description
        }, {
            where: {
                frp_id: req.params.id
            }
        })

        return res.redirect("/admin/frais-port")


    } catch (error) {
         Logger.error("/fraisPortBack : " + error.stack);
        return res.status(500).render("fraisPort/editer", {
            message: 'Une erreur est survenue lors de la récupération des types de catégories.',
            error,
            success: false
        }
        );
    }
})

router.get("/delete/:id", async (req, res) => {
    try {
        await Frais_port.destroy({
            where: {
                frp_id: req.params.id,
            },
        });
        const listeType = await Frais_port.findAll();
        return res.redirect("/admin/frais-port");
    } catch (error) {
         Logger.error("/fraisPortBack : " + error.stack);
        return res.render("fraisPort/index", {
            error: "une erreur est survenue",
        });
    }
});

module.exports = router