const express = require('express');
const router = express.Router();

router.get('/',async (req,res)=>{
    res.render('produits.location/index');
})

module.exports = router;