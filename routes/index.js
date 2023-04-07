var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.titre = "Accueil"
  res.render('default/index');
});


module.exports = router;
