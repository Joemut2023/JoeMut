var express = require('express')
var router = express.Router()

router.get('/', (req,res,next)=>{
    res.render('article/index')
})

module.exports = router