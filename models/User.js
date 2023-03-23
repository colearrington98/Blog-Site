const { Model, DataTypes } = require('sequelize'); // import the Model class and DataTypes object from the sequelize package
const bycrypt = require('bcrypt'); // import bcrypt
const sequelize = require('../config/connection'); // import our connection to the database
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
     }, // define columns
     username: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
     },
     password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
             len: [4, 20]
         }
     }
    },
     {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bycrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData, options) {
                updatedUserData.password = await bycrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            } 
        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'User',
     }
    
  
);

module.exports = User;