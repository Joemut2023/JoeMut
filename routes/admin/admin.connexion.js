const express = require('express');
const router = express.Router();

//app.set("layout", path.join(__dirname, "views/layout/layout"));
//app.set("views", path.join(__dirname, "views/admin"));
router.get('/',(req,res)=>{
    res.render('login/index');
});

module.exports = router;