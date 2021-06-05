
'use strict'
module.exports = (sequelize, DataTypes) => {
  var News = sequelize.define('news', {
    issueNumber: {
      	type : DataTypes.INTEGER,
      	allowNull : true,
    },
    issueDate : {
		type : DataTypes.STRING,
      	allowNull : false,
	}
  }, {
    

  })


  News.associate = (models) => {
	models.News.belongsTo(models.Publisher)
    models.News.hasMany(models.Page);
    models.News.hasOne(models.Keyword);
	models.Page.hasOne(models.Ranking);
  }

  return News
}
