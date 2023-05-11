const express = require('express');
const router = express.Router();

router.get('/',async (req,res)=>{
    res.render('transporteur/index');
});
module.exports = router;