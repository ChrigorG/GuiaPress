const Sequelize = require("sequelize");
const connection = new Sequelize("guiapress", "root", "sua-senha", {
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "-03:00"    // para salvar a data baseado no fuso horario
});

module.exports = connection;