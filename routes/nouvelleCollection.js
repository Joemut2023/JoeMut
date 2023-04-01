const express = require('express')
const router = express.Router();

router.get('/', async(req, res) => {
    res.render("nouvelleCollection/index");
})
module.exports = router;