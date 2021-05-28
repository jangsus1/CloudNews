var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('pages/main');
});

router.get('/news/gb', (req, res, next) => {
	res.render('pages/page')
})

module.exports = router;
