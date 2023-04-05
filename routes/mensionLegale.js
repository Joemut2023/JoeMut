var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
    res.render('mensionLegale/index')
})

module.exports = router