const sequalize = require('../config/connection'); // import the connection to the database
const User = require('./user'); // import the User model
const Blog = require('./blog'); // import the Blog model
const Comment = require('./comment'); // import the Comment model


User.hasMany(Comment, { foreignKey: 'user_id', onDelete: 'CASCADE' });// create a one-to-many relationship between User and Comment
Comment.belongsTo(User, { foreignKey: 'user_id' }); // create a one-to-one relationship between Comment and User

User.hasMany(Blog, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // create a one-to-many relationship between User and Blog
Blog.belongsTo(User, { foreignKey: 'user_id' }); // create a one-to-one relationship between Blog and User

Blog.hasMany(Comment, { foreignKey: 'blog_id', onDelete: 'CASCADE' }); // create a one-to-many relationship between Blog and Comment
Comment.belongsTo(Blog, { foreignKey: 'blog_id' }); // create a one-to-one relationship between Comment and Blog


module.exports = { User, Blog, Comment }; // export the User, Blog, and Comment models


