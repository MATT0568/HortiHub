var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

var Plant = sequelize.define("plant", {
  routeName: Sequelize.STRING,
  name: Sequelize.STRING,
}, {
  freezeTableName: true
});


Plant.sync();

module.exports = Plant;
