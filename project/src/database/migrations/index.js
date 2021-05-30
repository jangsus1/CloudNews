const db = require('../models');

async function migrate() {
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true});
  await db.sequelize.sync({ force : true });
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', {raw: true});

}
migrate().then(() => process.exit()).catch(err => console.error(err))
