var express = require('express')
var router = express.Router()

router.get('/:id', (res,req,next) => {
    res.render('panier/index')
})

module.exports = router