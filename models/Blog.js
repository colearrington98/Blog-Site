const {Model, DataTypes} = require('sequelize'); // import the Model class and DataTypes object from the sequelize package
const sequelize = require('../config/connection'); // import our connection to the database
const { User } = require('./User'); // import the User model

class Blog extends Model {} // create a new class that extends the Model class

Blog.init( // initialize the Blog model
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
    }
);

module.exports = Blog;
