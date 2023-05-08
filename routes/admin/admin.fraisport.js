const express = require("express");
const router = express.Router();
const { Frais_port, Mode_liv_essayage, Mode_liv_spectacle } = require("../../models");
const { PAGINATION_LIMIT } = require("../../helpers/utils_const");

router.get("/", async (req, res) => {

    try {

        const fraisPort = await Frais_port.findAll({
            include: [
                {
                    model: Mode_liv_essayage,
                    required: true,
                    attributes: ["mle_libelle"],
                },
                {
                    model: Mode_liv_spectacle,
                    required: true,
                    attributes: ["mls_libelle"],
                },
            ],
        })
        //return res.json(fraisPort)
        res.render("fraisPort/index", {
            fraisPort,
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
// post 
router.get("/ajouter", async (req, res) => {
    try {
        const liv_essayage = await Mode_liv_essayage.findAll()
        const liv_spectacle = await Mode_liv_spectacle.findAll()

        res.render("fraisPort/ajouter", {
            liv_essayage,
            liv_spectacle
        });

    } catch (error) {

    }
});

router.post("/ajouter", async (req, res) => {
    const { frp_debut, frp_fin, frp_actif, frp_default, frp_ht, frp_ttc, frp_libelle, frp_description, mls_id, mle_id } = req.body

    try {

        const liv_essayage = await Mode_liv_essayage.findAll()
        const liv_spectacle = await Mode_liv_spectacle.findAll()

        if (frp_debut == "" || frp_fin == "" || frp_actif == "" || frp_default == "" || frp_ht == "" || frp_ttc == "" || frp_libelle == "" || frp_description == "") {
            {
                return res.render({
                    error: true,
                    errorMsg: "Veillez remplir tout les champs",
                });
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
            frp_description: frp_description,
            mle_id: mle_id,
            mls_id: mls_id

        })

        return res.render("fraisPort/ajouter", {
            success: true,
            newFrais,
            liv_essayage,
            liv_spectacle
        })


    } catch (error) {
        console.error(error);
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

        const liv_essayage = await Mode_liv_essayage.findAll()
        const liv_spectacle = await Mode_liv_spectacle.findAll()
        const fraisPort = await Frais_port.findOne({
            where: {
                frp_id: req.params.id,
            },
        });

        const fraisPortId = fraisPort.frp_id
        // return res.json({
        //     fraisPortId,
        //     fraisPort,
        //     liv_essayage,
        //     liv_spectacle
        // })
        return res.render("fraisPort/editer", {
            fraisPortId,
            fraisPort,
            liv_essayage,
            liv_spectacle
        });
    } catch (error) {
        error = "une erreur est survenue";
        return res.render("fraisPort/editer", {
            error,
        });
    }
});

router.post("/edit/:id", async (req, res) => {
    const { frp_debut, frp_fin, frp_actif, frp_default, frp_ht, frp_ttc, frp_libelle, frp_description, mls_id, mle_id } = req.body

    try {

        const updatedFrais = await Frais_port.update({
            frp_debut: frp_debut,
            frp_fin: frp_fin,
            frp_actif: frp_actif,
            frp_default: frp_default,
            frp_ht: frp_ht,
            frp_ttc: frp_ttc,
            frp_libelle: frp_libelle,
            frp_description: frp_description,
            mle_id: mle_id,
            mls_id: mls_id

        }, { where: { frp_id: req.params.id } })


        return res.redirect("/admin/frais-port")


    } catch (error) {
        console.error(error);
        return res.status(500).render("fraisPort/editer", {
            message: 'Une erreur est survenue lors de la récupération des types de catégories.',
            error,
            success: false
        }
        );
    }
})

module.exports = router