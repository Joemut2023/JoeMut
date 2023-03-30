var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/catalogue', function(req, res, next) {
  res.render('catalogue/index', { title: 'Express' });
});

module.exports = router;