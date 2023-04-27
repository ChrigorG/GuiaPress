//Model
const sequelize = require("sequelize");
const connection = require("../database/database");
const category = require("../categories/category");

const articles = connection.define('articles',{
    title:{ 
        type: sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: sequelize.STRING,
        allowNull: false
    },
    body: {
        type: sequelize.TEXT,
        allowNull: false
    }
});

//Relacionamento 1 para N 
category.hasMany(articles);
//Relacionamento 1 para 1
articles.belongsTo(category);

module.exports = articles;