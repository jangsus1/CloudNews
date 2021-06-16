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
		include : {
			model : models.Page,
			include : models.Keyword
		},
		order : [[models.Page, 'pageNumber', 'ASC'], [models.Page, models.Keyword, 'rank', 'ASC']],
		plain : true
		
	})
	res.render('pages/page', {news});
}

DefaultController.getPrevPage = async (req, res, next) => {
	
}

DefaultController.getNextPage = async (req, res, next) => {
	let data = {};
	
	if (req.body) {
		data.page = parseInt(req.body.page) + 1;
		
		// get links from db by json.page
		switch (data.page) {
			case 2:
				data.pageImageURL = "무 야~ 호~";
				// data.wordcloudURL = "";
				break;
				
			case 3:
				data.pageImageURL = "그만큼 신나시는 거지~";
				break;
				
			case 4:
				data.pageImageURL = "응애 나 아기 나락";
				break;
				
			case 5:
				data.pageImageURL = "이 뉴스는 무료로 해줍니다.";
				break;
				
			default:
				data.pageImageURL = "●▅▇█▇▆▅▄▇";
		}
	}
	
	res.send(data);
}



module.exports = DefaultController