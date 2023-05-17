const Sequelize = require("sequelize");
const connection = new Sequelize("guiapress", "root", "L@zag1228", {
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "-04:00"    // para salvar a data baseado no fuso horario
});

module.exports = connection;