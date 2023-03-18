const { Model, DataTypes } = require('sequelize'); // import the Model class and DataTypes object from the sequelize package
const bycrypt = require('bcrypt'); // import bcrypt
const sequelize = require('../config/connection'); // import our connection to the database
const comment = require('./Comment'); // import the Comment model
const blog = require('./Blog'); // import the Blog model

class User extends Model { // create a new class that extends the Model class
 checkPassword(loginPw) { // create a method that will check the password
     return bycrypt.compareSync(loginPw, this.password); // return the result of comparing the login password with the password stored in the database
 }
}

User.init( // initialize the User model
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
 
     hooks: {
         async beforeCreate(newUserData) {
             newUserData.password = await bycrypt.hash(newUserData.password, 10);
             return newUserData;
         } 
     },
     sequelize,
     freezeTableName: true,
     underscored: true,
     modelName: 'user',
 }
);

User.hasMany(Comment , { // create a one-to-many relationship between the User and Comment models
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    });

User.hasMany(Blog , { // create a one-to-many relationship between the User and Blog models
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    });
    

module.exports = User;
