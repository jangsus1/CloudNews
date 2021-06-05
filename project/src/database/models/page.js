
'use strict'
module.exports = (sequelize, DataTypes) => {
  var Page = sequelize.define('page', {
    pageNumber: {
      	type : DataTypes.STRING,
      	allowNull : false,
    },
    pageImageURL : {
		type : DataTypes.STRING,
      	allowNull : false,
	},
	wordcloudURL : {
		type : DataTypes.STRING,
		allowNull : true,
	}
  })


  Page.associate = (models) => {
    models.Page.belongsTo(models.News);
	models.News.hasMany(models.Ranking);
    models.Page.hasOne(models.Keyword);
  }

  return Page
}
