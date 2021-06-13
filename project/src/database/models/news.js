
'use strict'
module.exports = (sequelize, DataTypes) => {
  var News = sequelize.define('news', {
    mainImageURL: {
      	type : DataTypes.STRING,
      	allowNull : false,
    },
    issueDate : {
		type : DataTypes.DATE,
      	allowNull : false,
	}
  }, {
    

  })


  News.associate = (models) => {
	models.News.belongsTo(models.Publisher);
    models.News.hasMany(models.Page);
	models.News.hasMany(models.Keyword);
  }

  return News
}
