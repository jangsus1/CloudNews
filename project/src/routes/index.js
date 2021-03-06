var express = require('express');
var router = express.Router();
const DefaultController = require('../controllers/default');
const APIController = require('../controllers/api');
/* GET home page. */


router.get('/', DefaultController.getMainPage);

router.get('/api/publishers/:pid/news', APIController.getNewsByFilter);

router.get('/news/:nid', DefaultController.getPage)

router.get('/publishers/:pid', DefaultController.getNews);

module.exports = router;
