//Model
const sequelize = require("sequelize");
const connection = require("../database/database");

const user = connection.define('users',{
    login:{ 
        type: sequelize.STRING,
        allowNull: false
    },
    //Slug é uma parte da URL compreendida
    password: {
        type: sequelize.STRING,
        allowNull: false
    }
});

user.sync({force: false});

module.exports = user;