
'use strict'
module.exports = (sequelize, DataTypes) => {
  var News = sequelize.define('news', {
    issueNumber: {
      	type : DataTypes.INTEGER,
      	allowNull : true,
    },
    issueDate : {
		type : DataTypes.DATE,
      	allowNull : false,
	}
  }, {
    

  })


  News.associate = (models) => {
	models.News.belongsTo(models.Publisher)
    models.News.hasMany(models.Page);
  }

  return News
}
