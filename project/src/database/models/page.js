
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
  })


  Page.associate = (models) => {
    models.Page.belongsTo(models.News);
    models.Page.hasOne(models.Keyword);
  }

  return Page
}
