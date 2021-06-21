const models = require('../database/models')
const DefaultController = {}
const {Op} = require('sequelize')


DefaultController.getMainPage = (req, res, next) => {
	res.render('pages/main')
}

DefaultController.getNews = async (req, res, next) => {
	const pid = req.params.pid;
	let [pagination, newsList] = [{}, []]
	try{
		[pagination, newsList] = await models.News.paginate({
			page : 1,
			perPage : 6,
			where : {
				publisherId : pid,
				issueDate : {
					[Op.gte] : "2020-01-01",
					[Op.lte] : "2022-01-01"
				}
			},
			include : {
				model : models.Keyword,
				where : {
					rank : [1,2,3]
				}
			},
			order : [['issueDate', 'DESC']]
		});
	} catch(e){
		console.error(e)
	}
	res.render('pages/news', {pagination, newsList, pid});
}

DefaultController.getPage = async (req, res, next) => {
	const nid = req.params.nid;
	const news = await models.News.findByPk(nid, {
		include : [{
			model : models.Page,
			include : models.Keyword
		}],
		order : [[models.Page, 'pageNumber', 'ASC'], [models.Page, models.Keyword, 'rank', 'ASC']],
		plain : true
		
	})
	const keywords = await news.getKeywords({order: [['rank', 'asc']]})
	res.render('pages/page', {news, keywords});
}



module.exports = DefaultController