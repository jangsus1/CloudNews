const models = require('../models')
const seeder = async () => {
	const publishers = await models.Publisher.bulkCreate([{
		id : 1, 
		name : "국방일보",
		agency : "국방홍보원"
	},{
		id : 2, 
		name : "나라사랑신문",
		agency : "국가보훈처"
		
	},{
		id : 3, 
		name : "육사신보",
		agency : "육군사관학교"
		
	},{
		id : 4, 
		name : "공사신문",
		agency : "공군사관학교"
	}])
	
}

seeder().then(() => process.exit()).catch(err => console.error(err))