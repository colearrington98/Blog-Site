const {Model, DataTypes} = require('sequelize'); // import the Model class and DataTypes object from the sequelize package
const sequelize = require('../config/connection'); // import our connection to the database
const comment = require('./Comment'); // import the Comment model
const blog = require('./Blog'); // import the Blog model

class comment extends Model { // create a new class that extends the Model class

    static associate(models) {
        comment.hasMany(models.Blog, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
        });
        comment.hasMany(models.Comment, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
        });
    }
}

comment.init( // initialize the Comment model
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
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = comment;

