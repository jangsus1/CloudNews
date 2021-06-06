var express = require('express');
var router = express.Router();
const DefaultController = require('../controllers/default');
const APIController = require('../controllers/api');
/* GET home page. */


router.get('/', DefaultController.getMainPage);

router.get('/api/news', APIController.getNewsByFilter);


router.get('/publishers/:pid', DefaultController.getNewsPage);

module.exports = router;
