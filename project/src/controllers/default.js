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