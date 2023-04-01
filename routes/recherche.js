var express = require('express')
var router = express.Router()

router.get('/', (req,res,next)=>{
    res.render("recherche/index")
})

module.exports = router