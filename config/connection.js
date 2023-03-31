const Sequalize = require('sequelize'); // import the Sequalize constructor from the sequelize package
require ('dotenv').config(); // import the dotenv package

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  } else {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
      }
    );
  }
 

module.exports = sequelize; // export the sequelize instance