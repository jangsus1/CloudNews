//const models = require('../database/models')
const DefaultController = {}


DefaultController.getMainPage = (req, res, next) => {
	res.render('pages/main')
}

DefaultController.getNewsPage = async (req, res, next) => {
	const publisherId = req.params.pid;
	
	const newsList = [];
	res.render('pages/news', newsList);
}



module.exports = DefaultController