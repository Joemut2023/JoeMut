var express = require('express')
var router = express.Router()

router.get('/:id', (req, res, next) => {
    res.render('article/index')
})

module.exports = router