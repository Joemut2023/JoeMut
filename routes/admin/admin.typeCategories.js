const express = require("express");
const router = express.Router();
const { Type_categorie, Categorie } = require("../../models");
const { PAGINATION_LIMIT } = require("../../helpers/utils_const");
const Form = require("../../helpers/components/form");
const { log } = require("console");


//TYPES CATEGORIES
router.get("/", async (req, res) => {

    try {
        const listeType = await Type_categorie.findAll();

        res.render("typeCategories/index", {
            listeType,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).render("typeCategories/index",
            { message: 'Une erreur est survenue lors de la récupération des types de catégories.', error }
        );
    }

})

router.get("/ajout", async (req, res) => {
    res.render("typeCategories/add")
})

router.post("/ajout", async (req, res) => {
    const { tyc_libelle, tyc_ordre } = req.body;

    try {
        if (tyc_libelle == "") {
            return res.render({ error: true, message: "Champs obligatoire" });
        }

        const typeCatExists = await Type_categorie.findOne({ where: { tyc_libelle } });
        if (typeCatExists) {
            return res.render({ message: 'ce type categories existe deja. Veuillez changer le nom' });
        } else {
            await Type_categorie.create({
                tyc_libelle: tyc_libelle,
                tyc_ordre: tyc_ordre
            });
            res.redirect("/admin/type-categories");
        }
    } catch (error) {
        console.error(error);
        res.status(500).render("typeCategories/add",
            { message: 'Une erreur est survenue lors de la récupération des types de catégories.', error }
        );
    }
});


router.get("/edit/:id", async (req, res) => {

    try {
        const findTyc = await Type_categorie.findOne({
            where: {
                tyc_id: req.params.id,
            },
        });

        res.render("typeCategories/edit", {
            findTyc
        })
    } catch (error) {
        console.error(error);
        res.status(500).render("typeCategories/edit",
            { message: 'Une erreur est survenue lors de la récupération des types de catégories.', error }
        );
    }
})

router.post("/edit/:id", async (req, res) => {
    const { tyc_libelle, tyc_ordre } = req.body

    try {
        const updateTyc = await Type_categorie.update({
            tyc_libelle: tyc_libelle,
            tyc_order: tyc_ordre

        }, { where: { tyc_id: req.params.id } })


        return res.redirect("/admin/type-categories")
    } catch (error) {

    }
})


router.get("/delete/:id", async (req, res, next) => {
    try {
        await Type_categorie.destroy({
            where: {
                tyc_id: req.params.id,
            },
        });
        const listeType = await Type_categorie.findAll();
        return res.redirect("/admin/type-categories");
    } catch (error) {
        return res.render("typeCategories/index", {
            error: "une erreur est survenue",
        });
    }
});







module.exports = router