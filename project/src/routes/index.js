var express = require('express');
var router = express.Router();
const DefaultController = require('../controllers/default');
/* GET home page. */


router.get('/', DefaultController.getMainPage);


router.get('/publishers/:pid', DefaultController.getNewsPage);

module.exports = router;
