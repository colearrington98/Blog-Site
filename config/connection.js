const Sequalize = require('sequelize'); // import the Sequalize constructor from the sequelize package
require ('dotenv').config(); // import the dotenv package

const sequelize = new Sequalize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, { // create a new instance of the Sequelize constructor
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize; // export the sequelize instance