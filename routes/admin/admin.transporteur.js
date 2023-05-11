const express = require('express');
const router = express.Router();

router.get('/',async (req,res)=>{
    res.render('transporteur/index');
});
router.get('/add', (req,res)=>{
    res.render('transporteur/add');
})
module.exports = router;