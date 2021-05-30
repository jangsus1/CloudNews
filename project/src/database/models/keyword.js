
'use strict'
module.exports = (sequelize, DataTypes) => {
  var Keyword = sequelize.define('keyword', {
	word1: {
		type : DataTypes.STRING,
		allowNull : true,
	},
	word2: {
      	type : DataTypes.STRING,
      	allowNull : true,
    },
	word3: {
      	type : DataTypes.STRING,
      	allowNull : true,
    },
	word4: {
      	type : DataTypes.STRING,
      	allowNull : true,
    },
	word5: {
      	type : DataTypes.STRING,
      	allowNull : true,
    },
	word6: {
      	type : DataTypes.STRING,
      	allowNull : true,
    },
	word7: {
      	type : DataTypes.STRING,
      	allowNull : true,
    },
	word8: {
      	type : DataTypes.STRING,
      	allowNull : true,
    },
	word9: {
      	type : DataTypes.STRING,
      	allowNull : true,
    },
	word10: {
      	type : DataTypes.STRING,
      	allowNull : true,
    },
    chart : {
		type : DataTypes.BLOB,
      	allowNull : false,
	},
	wordCloud : {
		type : DataTypes.BLOB,
		allowNull : false,
	}
  })


  Keyword.associate = (models) => {
    models.Keyword.belongsTo(models.News);
    models.Keyword.belongsTo(models.Page);
  }

  return Keyword
}
