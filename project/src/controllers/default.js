//const models = require('../database/models')
const DefaultController = {}


DefaultController.getMainPage = (req, res, next) => {
	res.render('pages/main')
}

DefaultController.getNews = async (req, res, next) => {
	const pid = req.params.pid;
	
	const newsList = [];
	res.render('pages/news', {newsList, pid});
}

DefaultController.getPage = async (req, res, next) => {
	
	
	res.render('pages/page');
}



module.exports = DefaultController