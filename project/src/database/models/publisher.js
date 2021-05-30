
'use strict'
module.exports = (sequelize, DataTypes) => {
  var Publisher = sequelize.define('publisher', {
    name: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    agency : {
		type : DataTypes.STRING,
      	allowNull : false,
	}
  }, {
    

  })
  
  Publisher.associate = (models) => {
    models.Publisher.hasMany(models.News);
  }

  return Publisher
}
