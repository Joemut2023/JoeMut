const express = require("express");
const router = express.Router();
const { Type_categorie, Categorie } = require("../../models");

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const categorie = await Type_categorie.findByPk(id);
        const subcategories = await Categorie.findAll({
            where: { tyc_id: id },
            include: [{ model: Type_categorie }],
        });

        res.render("categories/index", {
            subcategories,
            categorie,
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).render("categories/index",
            {
                message: 'Une erreur est survenue lors de la récupération des catégories.',
                success: false,
                error
            }
        );
    }

});


router.get("/edit/:id", async (req, res) => {

    try {
        const findCat = await Categorie.findOne({
            where: {
                cat_id: req.params.id,
            },
        });

        res.render("categories/editCat", {
            findCat
        })
    } catch (error) {
        console.error(error);
        res.status(500).render("categories/editCat",
            { message: 'Une erreur est survenue lors de la récupération des types de catégories.', error }
        );
    }
})

// router.get("/post/:id", async (req, res) => {
//     res.render("souscat/editCat")
// })

router.post("/edit/:id", async (req, res) => {
    const { cat_libelle } = req.body

    try {
        const findCat = await Categorie.findOne({
            where: {
                cat_id: req.params.id,
            },
        });
        const typeCat = await Type_categorie.findOne({
            where: { tyc_id: findCat.tyc_id }
        })
        const updateCat = await Categorie.update({
            cat_libelle: cat_libelle,

        }, { where: { cat_id: req.params.id } })
        return res.redirect(`/admin/categories/${typeCat.tyc_id}`)
    } catch (error) {
        console.error(error);
        res.status(500).render("categories/editCat",
            { message: 'Une erreur est survenue lors de la récupération des types de catégories.', error }
        );
    }
})


//
router.get("/ajout/:id", async (req, res) => {
    res.render("categories/addCat", { tyc_id: req.params.id })
})


router.post("/ajout", async (req, res) => {
    const { cat_libelle, tyc_id } = req.body
    console.log(req.body, "body");

    try {
        if (cat_libelle == "") {
            return res.render({ error: true, message: "Champs obligatoire" });
        }
        // const CatExists = await Categorie.findOne({ where: { cat_libelle } });
        // if (CatExists) {
        //     return res.render({ message: 'Cette categorie existe deja. Veuillez changer le nom' });
        // } else {
            await Categorie.create({
                cat_libelle,
                tyc_id
            });
            return res.redirect(`/admin/categories/${tyc_id}`)
        // }

    } catch (error) {
        console.error(error);
        res.status(500).render("categories/addCat",
            { message: 'Une erreur est survenue lors de la récupération des types de catégories.', error }
        );
    }

})
module.exports = router;