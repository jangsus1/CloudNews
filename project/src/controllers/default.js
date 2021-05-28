const models = require('../database/models')
const DefaultController = {}


DefaultController.getMainPage = (req, res, next) => {
	res.render('pages/main')
}



modules.export = defaultController