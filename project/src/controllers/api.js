const APIController = {};
const models = require('../database/models');
const {Op} = require('sequelize');


APIController.getNewsByFilter = async (req, res, next) => {
	const pid = req.params.pid;
	let {start, end, keyword, page, perPage} = req.query;
	
	page = page || 1;
	perPage = perPage || 6;
	
	const includeClause = keyword ? {
		model : models.Keyword,
		where : {word : keyword, rank : {[Op.lte] : 10}},
		required : true
	} : null;
	
	const [pagination, newsList] = await models.News.paginate({
		page : page,
		perPage : perPage,
		where : {
			publisherId : pid,
			issueDate : {
				[Op.gte] : start,
				[Op.lte] : end
			}
		},
		include : includeClause,
		order : [['issueDate', 'DESC']]
	});
	let keywordList;
	keywordList = await Promise.all(
		newsList.map(async news => news.getKeywords({order : [['rank']], limit : 3}))
	)
	res.json({pagination, newsList, keywordList});
	
	
}


module.exports = APIController;