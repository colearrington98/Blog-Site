const {Model, DataTypes} = require('sequelize'); // import the Model class and DataTypes object from the sequelize package
const sequelize = require('../config/connection'); // import our connection to the database

class Comment extends Model {} // create a new class that extends the Model class

Comment.init( // initialize the Comment model
 {
     id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
     },
     username: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
     },
     password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
             len: [8],
         },
     },
 },
 {
     sequelize,
     timestamps: True,
     freezeTableName: true,
     underscored: true,
     modelName: 'Comment',
 }
);


    

module.exports = Comment;