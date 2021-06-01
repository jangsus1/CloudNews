
'use strict'
module.exports = (sequelize, DataTypes) => {
  var Keyword = sequelize.define('keyword', {
	word : {
		type : DataTypes.STRING,
		allowNull : true,
	}
  })


  Keyword.associate = (models) => {
    models.Keyword.belongsTo(models.News);
    models.Keyword.belongsTo(models.Page);
  }

  return Keyword
}