
'use strict'
module.exports = (sequelize, DataTypes) => {
  var Page = sequelize.define('page', {
    pageNumber: {
      	type : DataTypes.STRING,
      	allowNull : false,
    },
    pageImage : {
		type : DataTypes.STRING,
      	allowNull : false,
	},
	summary : {
		type : DataTypes.STRING,
		allowNull : true
	}
  })


  Page.associate = (models) => {
    models.Page.belongsTo(models.News);
    models.Page.hasOne(models.Keyword);
  }

  return Page
}
