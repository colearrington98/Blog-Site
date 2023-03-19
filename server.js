const sequalize = require('./config/connection'); // import the connection to the database
const seedDatabase = require('./seeds/seed'); // import the seed function

sequelize.sync()
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((error) => {
    console.error('Unable to sync the models:', error);
  });

module.exports = sequelize;


