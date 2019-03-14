var Sequelize = require("sequelize");

var sequelize = new Sequelize("hortihub_db", "PoobChute", "Puggl3s1", {
  host: "aayz1m3bebw8nl.c8izr58rnvfm.us-east-1.rds.amazonaws.com",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;
