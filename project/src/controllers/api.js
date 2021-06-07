const APIController = {};
const models = require('../database/models');
const {Op} = require('sequelize');


APIController.getNewsByFilter = async (req, res, next) => {
	const pid = req.params.pid;
	const {start, end, keyword, page, perPage} = req.query;
	
	
	const includeClause = keyword ? {
			model : models.Keyword,
			where : {
				word : keyword
			}
	} : null;
	
	const [pagination, newsList] = await models.News.paginate({
		page : page,
		perPage : perPage,
		where : {
			issueDate : {
				$between: [start, end]
			}
		},
		include : includeClause,
		order : [['issueDate', 'DESC']]
	});
	res.json({pagination, newsList});
	
	
}


module.exports = APIController;