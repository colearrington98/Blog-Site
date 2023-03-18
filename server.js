const sequelize = require('./config/connection'); // import the sequelize instance

sequelize.sync() // sync the models to the database
  .then(() => { // if the sync is successful, log a success message
    console.log('All models were synchronized successfully.'); // log a success message
  }) // if the sync is unsuccessful, log the error message
  .catch((error) => { // if the sync is unsuccessful, log the error message
    console.error('Unable to sync the models:', error); // log the error message
    }); // end then/catch

