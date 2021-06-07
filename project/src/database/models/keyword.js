'use strict'
module.exports = (sequelize, DataTypes) => {
  var Keyword = sequelize.define('keyword', {
    word: {
      	type : DataTypes.STRING,
      	allowNull : true,
    },
    count : {
		type : DataTypes.INTEGER,
      	allowNull : false,
	},
	rank : {
    	type : DataTypes.INTEGER,
		allowNull : false,
	}
  })


  Keyword.associate = (models) => {
    models.Keyword.belongsTo(models.Page);
  }

  return Keyword
}
