const express = require('express');
const router = express.Router();
const {Transporteur} = require('../../models');
router.get('/',async (req,res)=>{
    res.render('transporteur/index');
});
router.get('/add', (req,res)=>{
    res.render('transporteur/add');
});
router.post('/add',async (req,res)=>{
    const {trs_libelle} = req.body;
    try {
        await Transporteur.create({
            trs_libelle
        });
        res.render('transporteur/add',{
            notify:'Transporteur ajouté'
        });
    } catch (error) {
        
    }
})
module.exports = router;