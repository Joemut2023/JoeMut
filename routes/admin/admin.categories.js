const express = require("express");
const router = express.Router();
const { Type_categorie, Categorie } = require("../../models");
const { PAGINATION_LIMIT } = require("../../helpers/utils_const");
const Form = require("../../helpers/components/form");

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
router.get('/add', (req, res) => {

    let formObj = new Form([{ element: 'input', type: 'text', value: '', name: 'tyc_libelle', label: 'nom de la catégorie', attributes: `data-id="${1}"` }]);
    formObj.textarea({ element: 'textarea', type: 'text', value: '', name: 'tyc_libelle', label: 'description catégorie', attributes: `data-id="${2}"` });

    res.render("categories/add", {
        formObj
    });
})
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


module.exports = router