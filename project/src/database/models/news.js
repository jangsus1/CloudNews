
'use strict'
module.exports = (sequelize, DataTypes) => {
  var News = sequelize.define('news', {
    name: {
      type : DataTypes.STRING,
      allowNull : true,
    },
    date : {
		
	}
  }, {
    

  })

  Form.prototype.canDelete = async function(){
    const result = await sequelize.query(
      `SELECT COUNT(*) as cnt FROM surveys WHERE formId=:formId`, 
      { replacements: {formId: this.id}, raw: true, nest: true, type: sequelize.QueryTypes.SELECT }
    )
    return result[0].cnt == 0;
  }


  Form.associate = (models) => {
    models.Form.hasMany(models.Question);
    models.Form.hasMany(models.VisualGroup);
    models.Form.hasMany(models.Survey);
    models.Form.hasMany(models.Section);
  }

  return Form
}
