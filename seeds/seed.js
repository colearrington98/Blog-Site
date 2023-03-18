const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');
const blogdata = require('./blogData.json');

const seedDatabase = async () => {

    sequelize.sync({ force: true });
    await User.bulkCreate(userData);
  
    process.exit(0);
  }
  
  module.exports = seedDatabase ();
  
  
  

  