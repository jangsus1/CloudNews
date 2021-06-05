'use strict'
module.exports = (sequelize, DataTypes) => {
  var Ranking = sequelize.define('ranking', {
    word: {
      	type : DataTypes.STRING,
      	allowNull : true,
    },
    count : {
		type : DataTypes.STRING,
      	allowNull : false,
	},
	rank : {
    	type : DataTypes.STRING,
		allowNull : false,
	}
  })


  Ranking.associate = (models) => {
	models.Ranking.belongsTo(models.News);
    models.Ranking.belongsTo(models.Page);
  }

  return Ranking
}
