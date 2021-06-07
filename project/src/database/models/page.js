
'use strict'
module.exports = (sequelize, DataTypes) => {
  var Page = sequelize.define('page', {
    pageNumber: {
      	type : DataTypes.INTEGER,
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
	models.Page.hasMany(models.Keyword);
  }

  return Page
}
