//Model
const sequelize = require("sequelize");
const connection = require("../database/database");

const category = connection.define('categories',{
    title:{ 
        type: sequelize.STRING,
        allowNull: false
    },
    //Slug é uma parte da URL compreendida
    slug: {
        type: sequelize.STRING,
        allowNull: false
    },
    categoryId: {
        type: sequelize.INTEGER,
        allowNull: true
    }
});

category.sync({force: false});

module.exports = category;