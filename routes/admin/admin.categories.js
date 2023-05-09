const express = require("express");
const router = express.Router();
const { Type_categorie, Categorie } = require("../../models");
const { PAGINATION_LIMIT } = require("../../helpers/utils_const");
const Form = require("../../helpers/components/form");


//TYPES CATEGORIES
router.get("/", async (req, res) => {

    try {
        const listeType = await Type_categorie.findAll();

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

router.get("/ajout", async (req, res) => {
    res.render("categories/add")
})

router.post("/ajout", async (req, res) => {
    const { tyc_libelle } = req.body;

    try {
        if (tyc_libelle == "") {
            return res.render({ error: true, message: "Champs obligatoire" });
        }

        const typeCatExists = await Type_categorie.findOne({ where: { tyc_libelle } });
        if (typeCatExists) {
            return res.render({ message: 'ce type categories existe deja. Veuillez changer le nom' });
        } else {
            await Type_categorie.create({
                tyc_libelle: tyc_libelle
            });
            res.redirect("/admin/type-categories");
        }
    } catch (error) {
        console.error(error);
        res.status(500).render("categories/add",
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

        res.render("categories/edit", {
            findTyc
        })
    } catch (error) {
        console.error(error);
        res.status(500).render("categories/edit",
            { message: 'Une erreur est survenue lors de la récupération des types de catégories.', error }
        );
    }
})

router.post("/edit/:id", async (req, res) => {
    const { tyc_libelle } = req.body

    try {
        const updateTyc = await Type_categorie.update({
            tyc_libelle: tyc_libelle,

        }, { where: { tyc_id: req.params.id } })


        return res.redirect("/admin/type-categories")
    } catch (error) {

    }
})



//CATEGORIES
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const categorie = await Type_categorie.findByPk(id);
        const subcategories = await Categorie.findAll({
            where: { tyc_id: id },
            include: [{ model: Type_categorie }],
        });

        res.render("souscat/index", {
            subcategories,
            categorie,
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).render("souscat/index",
            {
                message: 'Une erreur est survenue lors de la récupération des catégories.',
                success: false,
                error
            }
        );
    }

});


router.get("/:id/edit", async (req, res) => {

    try {
        const findCat = await Categorie.findOne({
            where: {
                cat_id: req.params.id,
            },
        });

        res.render("souscat/editCat", {
            findCat
        })
    } catch (error) {
        console.error(error);
        res.status(500).render("souscat/editCat",
            { message: 'Une erreur est survenue lors de la récupération des types de catégories.', error }
        );
    }
})



router.get("/:id/post", async (req, res) => {
    res.render("souscat/editCat")
})



router.post("/:id/post", async (req, res) => {
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
        return res.redirect(`/admin/type-categories/${typeCat.tyc_id}`)
    } catch (error) {
        console.error(error);
        res.status(500).render("souscat/editCat",
            { message: 'Une erreur est survenue lors de la récupération des types de catégories.', error }
        );
    }
})


//
router.get("/:id/ajout", async (req, res) => {
    res.render("souscat/addCat")
})


router.post("/:id/ajout", async (req, res) => {
    const { cat_libelle, tyc_libelle } = req.body

    try {
        if (cat_libelle == "" || tyc_libelle == "") {
            return res.render({ error: true, message: "Champs obligatoire" });
        }

        // const findCat = await Categorie.findOne({
        //     where: {
        //         cat_id: req.params.id,
        //     },
        // });
        const typeCat = await Type_categorie.findOne({
            where: { tyc_id: findCat.tyc_id }
        })

        const CatExists = await Categorie.findOne({ where: { cat_libelle } });
        if (CatExists) {
            return res.render({ message: 'Cette existe deja. Veuillez changer le nom' });
        } else {
            await Categorie.create({
                cat_libelle: cat_libelle,
                tyc_libelle: req.body.tyc_libelle
            });
            return res.redirect(`/admin/type-categories/${typeCat.tyc_id}`)
        }
    } catch (error) {
        console.error(error);
        res.status(500).render("souscat/addCat",
            { message: 'Une erreur est survenue lors de la récupération des types de catégories.', error }
        );
    }

})














// router.get('/add', (req, res) => {

//     let formObj = new Form([{ element: 'input', type: 'text', value: '', name: 'tyc_libelle', label: 'nom de la catégorie', attributes: `data-id="${1}"` }]);
//     formObj.textarea({ element: 'textarea', type: 'text', value: '', name: 'tyc_libelle', label: 'description catégorie', attributes: `data-id="${2}"` });

//     res.render("categories/add", {
//         formObj
//     });
// })


module.exports = router