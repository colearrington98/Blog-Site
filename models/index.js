const User = require('./user'); // import the User model
const Blog = require('./blog'); // import the Blog model
const Comment = require('./comment'); // import the Comment model


User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

Comment.belongsTo(Post, { foreignKey: 'post_id' });//
Post.hasMany(Comment, { foreignKey: 'post_id' }); // create associations between the models


module.exports = { User, Post, Comment }; // export the User, Post, and Comment models


