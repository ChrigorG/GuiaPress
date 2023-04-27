const Sequelize = require("sequelize");
const connection = new Sequelize("guiapress", "root", "L@zag1228", {
    host: "127.0.0.1",
    dialect: "mysql"
});

module.exports = connection;